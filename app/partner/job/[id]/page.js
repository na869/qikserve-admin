'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { MapPinIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline';

const getStatusStyles = (status) => {
    switch (status) {
        case 'assigned': return 'bg-blue-500/10 text-blue-300 border-blue-400';
        case 'in-progress': return 'bg-yellow-500/10 text-yellow-300 border-yellow-400';
        case 'completed': return 'bg-green-500/10 text-green-300 border-green-400';
        default: return 'bg-gray-600/50 text-gray-300 border-gray-500';
    }
};

export default function JobDetailsPage() {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const { id: jobId } = useParams();

  useEffect(() => {
    if (!jobId) return;

    const jobRef = doc(db, 'bookings', jobId);
    const unsubscribe = onSnapshot(jobRef, (doc) => {
      if (doc.exists()) {
        setJob({ id: doc.id, ...doc.data() });
      } else {
        // Handle job not found
        console.error("No such job!");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [jobId]);

  const handleUpdateStatus = async (newStatus) => {
    setUpdating(true);
    const jobRef = doc(db, 'bookings', jobId);
    try {
        await updateDoc(jobRef, { status: newStatus });
        // The onSnapshot listener will automatically update the local state
    } catch (error) {
        console.error("Error updating job status: ", error);
    } finally {
        setUpdating(false);
    }
  };

  if (loading) {
    return <div className="text-center py-10 text-gray-400">Loading job details...</div>;
  }

  if (!job) {
    return <div className="text-center py-10 text-red-400">Job not found.</div>;
  }

  const mapLink = `https://www.google.com/maps?q=${encodeURIComponent(job.address)}`;

  return (
    <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
        <div className="p-6 sm:p-8 space-y-6">
            {/* Header */}
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-bold text-white">Job Details</h1>
                    <p className="text-gray-300 mt-1">For {job.customerName}</p>
                </div>
                <span className={`px-4 py-1.5 text-sm font-bold rounded-full border ${getStatusStyles(job.status)}`}>
                    {job.status}
                </span>
            </div>

            {/* Address & Map */}
            <div className="border-t border-b border-gray-700 py-6 space-y-4">
                <h2 className="text-lg font-semibold text-gray-200 flex items-center"><MapPinIcon className="h-6 w-6 mr-3 text-gray-400"/>Address</h2>
                <p className="text-gray-300 pl-9">{job.address}</p>
                <a href={mapLink} target="_blank" rel="noopener noreferrer" className="inline-block pl-9 text-indigo-400 hover:text-indigo-300 font-medium transition-colors">
                    Open in Google Maps &rarr;
                </a>
            </div>

            {/* Instructions */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-200 flex items-center"><ClipboardDocumentIcon className="h-6 w-6 mr-3 text-gray-400"/>Instructions</h2>
                <p className="text-gray-300 pl-9 max-w-prose">
                    {job.instructions || "No specific instructions provided."}
                </p>
            </div>

             {/* Action Buttons */}
             <div className="pt-6 border-t border-gray-700">
                {job.status === 'assigned' && (
                    <button 
                        onClick={() => handleUpdateStatus('in-progress')}
                        disabled={updating}
                        className="w-full flex justify-center py-4 px-4 border border-transparent rounded-full shadow-lg text-md font-bold text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-yellow-500 disabled:opacity-50 transition">
                        {updating ? 'Updating...' : 'Start Job'}
                    </button>
                )}
                {job.status === 'in-progress' && (
                     <button 
                        onClick={() => handleUpdateStatus('completed')}
                        disabled={updating}
                        className="w-full flex justify-center py-4 px-4 border border-transparent rounded-full shadow-lg text-md font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500 disabled:opacity-50 transition">
                        {updating ? 'Updating...' : 'Complete Job'}
                    </button>
                )}
             </div>
        </div>
    </div>
  );
}
