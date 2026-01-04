'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { collection, onSnapshot, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../../lib/firebase';

const getStatusStyles = (status) => {
    switch (status) {
        case 'assigned': return 'bg-blue-500/10 text-blue-300 border-blue-400';
        case 'in-progress': return 'bg-yellow-500/10 text-yellow-300 border-yellow-400';
        default: return 'bg-gray-600/50 text-gray-300 border-gray-500';
    }
};

const JobCard = ({ booking }) => (
    <div className="bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-700 hover:border-indigo-500 transition-all duration-300">
        <div className="p-6">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm text-gray-400">{booking.serviceType}</p>
                    <p className="text-xl font-bold text-white">{booking.customerName}</p>
                    <p className="text-sm text-gray-300 mt-1">{booking.address}</p>
                </div>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusStyles(booking.status)}`}>
                    {booking.status}
                </span>
            </div>
            <div className="mt-6">
                <Link href={`/partner/job/${booking.id}`}>
                    <span className="block w-full text-center py-3 px-4 border border-transparent rounded-full shadow-md text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 transition-transform transform hover:scale-105">
                        View Job
                    </span>
                </Link>
            </div>
        </div>
    </div>
);

export default function PartnerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [vendorId, setVendorId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem('vendorId');
    if (id) {
        setVendorId(id);
    } else {
        // Handle case where vendorId is not in localStorage, maybe redirect to login
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!vendorId) return;

    setLoading(true);
    const bookingsRef = collection(db, 'bookings');
    const q = query(
        bookingsRef, 
        where("vendorId", "==", vendorId),
        where("status", "!=", "completed"),
        orderBy("status"), 
        orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const jobsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setJobs(jobsData);
        setLoading(false);
    }, (error) => {
        console.error("Error fetching jobs:", error);
        setLoading(false);
    });

    return () => unsubscribe();
  }, [vendorId]);

  if (loading) {
    return <div className="text-center py-10 text-gray-400">Loading available jobs...</div>;
  }

  return (
    <div className="space-y-8">
        <div>
            <h2 className="text-3xl font-bold text-white">Active Jobs</h2>
            <p className="text-gray-400 mt-1">Here are your currently assigned and in-progress jobs.</p>
        </div>

      {jobs.length > 0 ? (
        <div className="space-y-6">
          {jobs.map(job => <JobCard key={job.id} booking={job} />)}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-800 rounded-2xl border-2 border-dashed border-gray-700">
            <svg className="mx-auto h-12 w-12 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            <h3 className="mt-4 text-lg font-semibold text-white">No Active Jobs</h3>
            <p className="mt-1 text-sm text-gray-400">When a new job is assigned to you, it will appear here.</p>
        </div>
      )}
    </div>
  );
}
