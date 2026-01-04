import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image'; // Ensure this import exists

export default function AssignVendorModal({ isOpen, onClose, booking, onAssign }) {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);

  // 1. SAFETY CHECK: If modal is closed, do not run anything.
  if (!isOpen || !booking) return null;

  useEffect(() => {
    let isMounted = true; // prevent state updates if component unmounts

    const fetchVendors = async () => {
      setLoading(true);
      try {
        // Standardize the service type (handle case sensitivity)
        const requiredService = booking.serviceType ? booking.serviceType.toLowerCase().trim() : 'general';
        
        console.log(`🔍 Searching for vendors with service: "${requiredService}"`);

        // Simple query: fetch ALL vendors, then filter in JS (Safest for now)
        const q = query(collection(db, 'vendors'));
        const snapshot = await getDocs(q);
        
        if (!isMounted) return;

        const matches = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter(v => {
            // Safe filter logic
            const vService = v.serviceType ? v.serviceType.toLowerCase().trim() : '';
            return vService === requiredService || vService === 'general'; // Allow 'general' vendors too
          });

        setVendors(matches);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchVendors();

    return () => { isMounted = false; };
  }, [isOpen]); // <--- CRITICAL FIX: Only run when 'isOpen' changes. NOT when 'booking' changes.

  const handleAssign = async () => {
    if (!selectedVendor) return;
    
    try {
      console.log("Assigning:", selectedVendor.agencyName);
      
      const bookingRef = doc(db, 'bookings', booking.id);
      await updateDoc(bookingRef, {
        status: 'assigned',
        vendorId: selectedVendor.id,
        vendorName: selectedVendor.agencyName,
        vendorPhone: selectedVendor.phone || "",
        updatedAt: serverTimestamp()
      });

      alert(`✅ Job assigned to ${selectedVendor.agencyName}`);
      onAssign(); // Refresh parent
      onClose();  // Close modal
    } catch (error) {
      console.error("Assignment failed:", error);
      alert("❌ Failed to assign: " + error.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col shadow-xl">
        
        {/* Header */}
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-lg">Assign Professional</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-red-500 text-2xl">&times;</button>
        </div>

        {/* Body */}
        <div className="p-4 overflow-y-auto flex-1">
          <p className="text-sm text-gray-500 mb-4">
            Finding partners for: <span className="font-bold text-gray-800">{booking.serviceDetails || booking.serviceType}</span>
          </p>

          {loading ? (
            <div className="text-center py-8 text-gray-400">Loading vendors...</div>
          ) : vendors.length === 0 ? (
            <div className="text-center py-8 bg-red-50 rounded-lg border border-red-100">
              <p className="text-red-600 font-medium">No vendors found.</p>
              <p className="text-xs text-red-500 mt-1">Check if vendors have serviceType: "{booking.serviceType}"</p>
            </div>
          ) : (
            <div className="space-y-3">
              {vendors.map((v) => (
                <div 
                  key={v.id}
                  onClick={() => setSelectedVendor(v)}
                  className={`p-3 border rounded-xl flex items-center gap-3 cursor-pointer transition-all ${
                    selectedVendor?.id === v.id ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'hover:bg-gray-50'
                  }`}
                >
                   {/* Fallback Image Logic directly in JSX to avoid config errors */}
                   <img 
                      src={v.photoURL || "https://via.placeholder.com/40"} 
                      alt={v.agencyName}
                      className="w-10 h-10 rounded-full object-cover bg-gray-200"
                   />
                   <div className="flex-1">
                     <h4 className="font-bold text-sm text-gray-900">{v.agencyName}</h4>
                     <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>⭐ {v.rating || 'New'}</span>
                        <span>•</span>
                        <span className={v.isOnline ? "text-green-600" : "text-gray-400"}>
                          {v.isOnline ? "Online" : "Offline"}
                        </span>
                     </div>
                   </div>
                   {selectedVendor?.id === v.id && <div className="text-blue-600">✔</div>}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50">
          <button
            onClick={handleAssign}
            disabled={!selectedVendor}
            className={`w-full py-3 rounded-xl font-bold text-white transition-all ${
              selectedVendor 
                ? 'bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-200' 
                : 'bg-gray-300 cursor-not-allowed'
            }`}
          >
            Confirm Assignment
          </button>
        </div>
      </div>
    </div>
  );
}