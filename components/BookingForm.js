'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { XMarkIcon } from '@heroicons/react/24/solid';

export default function BookingForm({ category, serviceName, price, onClose }) {
    const router = useRouter();
    const [formData, setFormData] = useState({ date: '', address: '' });
    const [isLoading, setIsLoading] = useState(false);
    // New state for handling in-component feedback
    const [formStatus, setFormStatus] = useState({ type: '', message: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setFormStatus({ type: '', message: '' }); // Reset status on new submission

        if (!formData.date || !formData.address.trim()) {
            setFormStatus({ type: 'error', message: 'Please fill in all required fields: Date and Address.' });
            setIsLoading(false);
            return;
        }

        const bookingPayload = {
            customerName: "Guest User",
            serviceType: category || "general",
            serviceDetails: serviceName || "Standard Service",
            amount: price || 0,
            bookingDate: formData.date,
            address: formData.address,
            status: 'pending',
            createdAt: serverTimestamp(),
            vendorId: null,
            vendorName: null,
        };

        console.log('Attempting to Save Payload:', bookingPayload);

        try {
            await addDoc(collection(db, 'bookings'), bookingPayload);
            
            // Set success message
            setFormStatus({ type: 'success', message: 'Booking successful! Redirecting...' });
            setIsLoading(false);

            // Redirect after a short delay so the user can see the message
            setTimeout(() => {
                onClose();
                router.push('/customer/bookings');
            }, 2000);

        } catch (error) {
            console.error("Firestore Save Error:", error);
            // Set error message
            setFormStatus({ type: 'error', message: `Booking Failed: ${error.message}` });
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-auto">
                <div className="p-5 border-b border-gray-200 flex justify-between items-center">
                     <div>
                        <h2 className="text-xl font-bold text-slate-800">Confirm Booking</h2>
                        <p className="text-sm text-slate-500">{serviceName} - ₹{price}</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-full hover:bg-slate-100">
                        <XMarkIcon className="w-6 h-6 text-slate-600"/>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                    <input type="date" name="date" value={formData.date} onChange={handleInputChange} className="w-full p-3 border border-slate-300 rounded-lg" required />
                    <textarea name="address" placeholder="Enter your full address" value={formData.address} onChange={handleInputChange} className="w-full p-3 border border-slate-300 rounded-lg" rows="3" required />
                    
                    {/* Status Message Area */}
                    {formStatus.message && (
                        <div className={`p-3 rounded-lg text-center font-medium ${formStatus.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {formStatus.message}
                        </div>
                    )}

                    <button type="submit" disabled={isLoading || formStatus.type === 'success'} className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:bg-indigo-700 disabled:bg-indigo-300 disabled:cursor-not-allowed transition-all">
                        {isLoading ? 'Processing...' : `Confirm & Pay ₹${price}`}
                    </button>
                </form>
            </div>
        </div>
    );
}
