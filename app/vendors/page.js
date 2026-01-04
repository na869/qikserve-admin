'use client';

import { useState } from 'react';

const mockVendors = [
  { id: 1, name: 'PlumbPerfect', service: 'Plumbing', status: 'Active', jobs: 25, rating: 4.8 },
  { id: 2, name: 'ElecTricks', service: 'Electrical', status: 'Active', jobs: 42, rating: 4.9 },
  { id: 3, name: 'CleanSweep', service: 'Cleaning', status: 'Inactive', jobs: 0, rating: 4.5 },
  { id: 4, name: 'HandyAndy', service: 'General Repair', status: 'Active', jobs: 15, rating: 4.7 },
  { id: 5, name: 'LawnLovers', service: 'Gardening', status: 'Active', jobs: 31, rating: 4.6 },
];

const statusStyles = {
  Active: 'bg-green-100 text-green-800',
  Inactive: 'bg-red-100 text-red-800',
};

export default function VendorsPage() {
  const [vendors, setVendors] = useState(mockVendors);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Vendor Management</h1>
        <p className="text-sm text-slate-500 mt-1">View, manage, and track your service vendors.</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Service</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Jobs Completed</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Rating</th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {vendors.map((vendor) => (
                <tr key={vendor.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{vendor.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{vendor.service}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusStyles[vendor.status]}`}>
                      {vendor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 text-center">{vendor.jobs}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">{vendor.rating} / 5.0</td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <a href="#" className="text-indigo-600 hover:text-indigo-900">Edit</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
