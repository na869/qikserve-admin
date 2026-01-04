import React, { useState, useEffect } from 'react';
import { collection, query, getDocs, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function AssignVendorModal({ isOpen, onClose, booking, onAssign }) {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  // SAFETY 1: Stop immediately if closed
  if (!isOpen || !booking) return null;

  useEffect(() => {
    let isMounted = true;

    const fetchVendors = async () => {
      setLoading(true);
      try {
        console.log("Fetching vendors...");
        // SAFETY 2: Simple query, no complex logic in useEffect
        const q = query(collection(db, 'vendors'));
        const snapshot = await getDocs(q);
        
        if (!isMounted) return;

        // Filter in JavaScript to avoid Firestore index errors
        const requiredService = booking.serviceType ? booking.serviceType.toLowerCase() : '';
        const matches = snapshot.docs
          .map(d => ({ id: d.id, ...d.data() }))
          .filter(v => {
             const vService = v.serviceType ? v.serviceType.toLowerCase() : '';
             return vService === requiredService || vService === 'general';
          });

        setVendors(matches);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchVendors();

    return () => { isMounted = false; };
  }, [isOpen]); // <--- CRITICAL: Only run when 'isOpen' changes.

  const handleAssign = async () => {
    if (!selectedVendor) return;
    try {
      await updateDoc(doc(db, 'bookings', booking.id), {
        status: 'assigned',
        vendorId: selectedVendor.id,
        vendorName: selectedVendor.agencyName,
        vendorPhone: selectedVendor.phone || "",
        updatedAt: serverTimestamp()
      });
      alert(`✅ Assigned to ${selectedVendor.agencyName}`);
      onAssign();
      onClose();
    } catch (e) {
      alert("Error: " + e.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-lg">Assign Vendor</h3>
          <button onClick={onClose} className="text-gray-500 text-2xl">&times;</button>
        </div>
        
        {loading ? <p>Loading...</p> : (
          <div className="space-y-2">
            {vendors.map(v => (
              <div 
                key={v.id} 
                onClick={() => setSelectedVendor(v)}
                className={`p-3 border rounded cursor-pointer ${selectedVendor?.id === v.id ? 'bg-blue-50 border-blue-500' : ''}`}
              >
                <div className="font-bold">{v.agencyName}</div>
                <div className="text-xs text-gray-500">
                   {v.isOnline ? "🟢 Online" : "⚫ Offline"} • ⭐ {v.rating || 'New'}
                </div>
              </div>
            ))}
            {vendors.length === 0 && <p className="text-red-500">No matching vendors found.</p>}
          </div>
        )}

        <button 
          onClick={handleAssign}
          disabled={!selectedVendor}
          className="w-full mt-4 bg-blue-600 text-white py-3 rounded-lg font-bold disabled:bg-gray-300"
        >
          Confirm Assignment
        </button>
      </div>
    </div>
  );
}