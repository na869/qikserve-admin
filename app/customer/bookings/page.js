'use client';

import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from '../../lib/firebase'; // Assuming you have a firebase config file

const statusStyles = {
  pending: 'bg-yellow-100 text-yellow-800',
  assigned: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
};

export default function BookingsPage() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "bookings"), where("customerName", "==", "Guest User"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const bookingsData = [];
      querySnapshot.forEach((doc) => {
        bookingsData.push({ id: doc.id, ...doc.data() });
      });
      setBookings(bookingsData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="sticky top-0 bg-white shadow-sm z-10 p-4">
        <h1 className="text-xl font-bold">My Bookings</h1>
      </header>

      <main className="p-4">
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking.id} className="bg-slate-50 border border-slate-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold capitalize">{booking.serviceType.replace('-', ' ')}</h3>
                  <p className="text-sm text-gray-600">{booking.serviceDetails}</p>
                  <p className="text-sm text-gray-500">{booking.date}</p>
                </div>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[booking.status]}`}>
                  {booking.status}
                </span>
              </div>
              {booking.vendorName && (
                <p className="text-sm text-gray-600 mt-2">Vendor: {booking.vendorName}</p>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
