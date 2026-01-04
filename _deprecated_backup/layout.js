'use client';

import { useState, useEffect } from 'react';

export default function PartnerLayout({ children }) {
  const [isOnline, setIsOnline] = useState(true);

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans">
      <div className="max-w-md mx-auto">
        <header className="bg-gray-800 p-4 shadow-md sticky top-0">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-gray-100">Partner Console</h1>
            <div className="flex items-center space-x-3">
              <span className={`text-sm font-medium ${isOnline ? 'text-green-400' : 'text-gray-500'}`}>
                Status: {isOnline ? 'Online' : 'Offline'}
              </span>
              <button 
                onClick={() => setIsOnline(!isOnline)}
                className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 ${isOnline ? 'bg-green-500' : 'bg-gray-600'}`}>
                <span aria-hidden="true"
                  className={`inline-block h-5 w-5 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200 ${isOnline ? 'translate-x-5' : 'translate-x-0'}`}></span>
              </button>
            </div>
          </div>
        </header>
        <main className="p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
