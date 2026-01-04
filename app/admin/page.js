'use client';

import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, orderBy, limit } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { CurrencyRupeeIcon, UserGroupIcon, BellAlertIcon } from '@heroicons/react/24/outline';

const StatCard = ({ title, value, trend, icon, iconContainerColor }) => (
  <div className="bg-neutral-100 border border-neutral-200 rounded-xl p-6 shadow-sm flex items-center space-x-4 hover:shadow-lg transition-shadow duration-300">
    <div className={`rounded-lg p-4 ${iconContainerColor}`}>
      {icon}
    </div>
    <div>
        <p className="text-sm font-semibold text-neutral-500 uppercase tracking-wider">{title}</p>
        <div className="flex items-baseline space-x-2">
            <p className="text-3xl font-bold text-neutral-800">{value}</p>
            {trend && <p className="text-sm font-bold text-green-500">{trend}</p>}
        </div>
    </div>
  </div>
);

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    newCustomers: 0,
  });
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "bookings"), where("status", "==", "pending"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const bookingsData = [];
      querySnapshot.forEach((doc) => {
        bookingsData.push({ id: doc.id, ...doc.data() });
      });
      console.log("Admin Fetched Bookings:", bookingsData);
      setRecentBookings(bookingsData);

      // Basic stats calculation (can be expanded)
      setStats({
        totalRevenue: bookingsData.reduce((acc, booking) => acc + (booking.price || 0), 0),
        totalBookings: bookingsData.length,
        newCustomers: new Set(bookingsData.map(b => b.customerName)).size,
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-800">
      <main className="p-4 sm:p-6 lg:p-10">
        <h1 className="text-4xl font-extrabold text-neutral-900 tracking-tight mb-4">Dashboard</h1>
        <p className="text-lg text-neutral-500 mb-10">Welcome back, here&apos;s a snapshot of your business.</p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <StatCard 
                title="Total Revenue"
                value={`₹${stats.totalRevenue.toLocaleString()}`}
                icon={<CurrencyRupeeIcon className="h-8 w-8 text-green-600" />}
                iconContainerColor="bg-green-100"
            />
            <StatCard 
                title="Total Bookings"
                value={stats.totalBookings}
                icon={<UserGroupIcon className="h-8 w-8 text-blue-600" />}
                iconContainerColor="bg-blue-100"
            />
            <StatCard 
                title="New Customers"
                value={stats.newCustomers}
                icon={<BellAlertIcon className="h-8 w-8 text-amber-600" />}
                iconContainerColor="bg-amber-100"
            />
        </div>

        {/* Recent Bookings Table */}
        <div className="bg-neutral-100 border border-neutral-200 rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-neutral-900 mb-6">Recent Bookings</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-neutral-200">
              <thead className="bg-neutral-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Customer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Service</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">{booking.customerName}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 capitalize">{booking.serviceType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${booking.status === 'completed' ? 'bg-green-100 text-green-800' : booking.status === 'confirmed' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'}`}>
                            {booking.status}
                        </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
