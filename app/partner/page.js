'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../lib/firebase';

export default function PartnerLogin() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const trimmedInput = phoneNumber.trim();

    if (!trimmedInput) {
      setError('Please enter your registered phone number.');
      setIsLoading(false);
      return;
    }

    console.log("Searching for:", trimmedInput);

    try {
      const vendorsRef = collection(db, 'vendors');
      const q = query(vendorsRef, where("phone", "==", trimmedInput));
      const querySnapshot = await getDocs(q);

      console.log("Docs found:", querySnapshot.size);

      if (querySnapshot.empty) {
        setError("Access Denied. Number not found in 'vendors' collection.");
      } else {
        const vendorDoc = querySnapshot.docs[0];
        const vendorData = vendorDoc.data();
        
        localStorage.setItem('vendorId', vendorDoc.id);
        if (vendorData.agencyName) {
            localStorage.setItem('agencyName', vendorData.agencyName);
        }

        router.push('/partner/dashboard');
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="w-full max-w-sm p-8 bg-gray-800 rounded-2xl shadow-xl space-y-6">
            <div className="text-center">
                <h2 className="text-3xl font-bold text-white">Partner Sign In</h2>
                <p className="mt-2 text-sm text-gray-400">Enter your 10-digit phone number to access your dashboard.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Registered Phone Number</label>
                    <div className="mt-1">
                        <input 
                            id="phone"
                            name="phone"
                            type="tel"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                            autoComplete="tel"
                            required
                            disabled={isLoading}
                            className="appearance-none block w-full px-4 py-3 rounded-md shadow-sm bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition disabled:opacity-50"
                            placeholder="9876543210"
                        />
                    </div>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-400 text-red-300 px-4 py-3 rounded-md text-sm">
                        <p>{error}</p>
                    </div>
                )}

                <div>
                    <button 
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-lg text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-transform transform hover:scale-105 disabled:bg-indigo-800 disabled:cursor-not-allowed disabled:scale-100">
                        {isLoading ? 'Signing In...' : 'Sign In'}
                    </button>
                </div>
            </form>
        </div>
    </div>
  );
}
