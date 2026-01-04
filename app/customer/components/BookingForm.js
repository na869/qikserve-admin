'use client';

import { useState } from 'react';
import { collection, addDoc } from "firebase/firestore"; 
import { db } from '../../lib/firebase';

export default function BookingForm({ serviceName, price, serviceType, onClose }) {
  const [customerName, setCustomerName] = useState('Guest User');
  const [address, setAddress] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bookingDetails = {
      customerName,
      address,
      date,
      serviceType,
      serviceDetails: serviceName,
      price,
      status: 'pending',
    };
    
    try {
      const docRef = await addDoc(collection(db, "bookings"), bookingDetails);
      console.log("Document written with ID: ", docRef.id);
      alert("✅ BOOKING SAVED! Click OK to continue.");
      window.location.href = '/customer/bookings'; // Hard redirect
    } catch (e) {
      console.error("Error adding document: ", e);
      alert(`Booking Failed: ${e.message}`);
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Book Service</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="service" className="block text-sm font-medium text-gray-700">Service</label>
            <input type="text" id="service" value={`${serviceName} - ₹${price}`} readOnly className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
            <textarea id="address" value={address} onChange={(e) => setAddress(e.target.value)} required rows="3" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
            <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
            <button type="submit" className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">Book Now</button>
          </div>
        </form>
      </div>
    </div>
  );
}
