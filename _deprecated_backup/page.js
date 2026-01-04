'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, doc, updateDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import AssignVendorModal from '@/components/AssignVendorModal';

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    const q = query(collection(db, 'bookings'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBookings(bookingsData);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching bookings:", error);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenAssignModal = (booking) => {
    setSelectedBooking(booking);
    setIsAssignModalOpen(true);
  };

  const handleCloseAssignModal = () => {
    setSelectedBooking(null);
    setIsAssignModalOpen(false);
  };

  const handleAssignVendor = async (vendorId, vendorName) => {
    if (!selectedBooking) return;

    const bookingRef = doc(db, "bookings", selectedBooking.id);
    try {
      await updateDoc(bookingRef, {
        status: 'assigned',
        vendorId: vendorId,
        vendorName: vendorName,
        assignedAt: serverTimestamp()
      });
      handleCloseAssignModal();
    } catch (error) {
      console.error("Error assigning vendor: ", error);
      alert('Failed to assign vendor.');
    }
  };

  const getStatusComponent = (booking) => {
    switch (booking.status) {
      case 'pending':
        return (
          <button 
            onClick={() => handleOpenAssignModal(booking)}
            className="bg-yellow-400 text-white px-3 py-1 rounded-full text-xs font-semibold hover:bg-yellow-500 transition-colors whitespace-nowrap"
          >
            Assign Vendor
          </button>
        );
      case 'assigned':
        return (
          <div className="inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-full whitespace-nowrap">
            <span>Assigned to:&nbsp;</span>
            <span className="font-semibold">{booking.vendorName || 'N/A'}</span>
          </div>
        );
      case 'completed':
        return (
            <div className="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full">
                Completed
            </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="p-6 sm:p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Manage Bookings</h1>
      </div>
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          {loading ? (
             <div className="text-center py-16"><p className="text-gray-500">Loading bookings...</p></div>
          ) : bookings.length === 0 ? (
            <div className="text-center py-16"><p className="text-gray-500">No bookings found.</p></div>
          ) : (
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3">Customer</th>
                  <th scope="col" className="px-6 py-3">Service</th>
                  <th scope="col" className="px-6 py-3">Location</th>
                  <th scope="col" className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map(booking => (
                  <tr key={booking.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{booking.customerName}</td>
                    <td className="px-6 py-4">{booking.serviceType}</td>
                    <td className="px-6 py-4">
                      {booking.location && booking.location.latitude ? (
                        <a 
                          href={`https://www.google.com/maps?q=${booking.location.latitude},${booking.location.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline whitespace-nowrap"
                        >
                          📍 View Map
                        </a>
                      ) : (
                        <span className="text-gray-400">Not available</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusComponent(booking)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      <AssignVendorModal 
        isOpen={isAssignModalOpen}
        onClose={handleCloseAssignModal}
        booking={selectedBooking}
        onAssign={handleAssignVendor}
      />
    </div>
  );
}
