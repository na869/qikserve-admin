'use client';

import { useState, useEffect, useCallback } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { collection, onSnapshot, query, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../../lib/firebase'; // Adjusted path

// A modal component for assigning vendors
const AssignVendorModal = ({ booking, vendors, onAssign, onClose }) => {
    const [selectedVendor, setSelectedVendor] = useState('');

    if (!booking) return null;

    const handleAssign = () => {
        if (!selectedVendor) {
            alert('Please select a vendor.');
            return;
        }
        const [vendorId, vendorName] = selectedVendor.split('|');
        onAssign(vendorId, vendorName);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-sm w-full">
                <h2 className="text-2xl font-bold mb-4">Assign Vendor</h2>
                <p className="mb-2">Booking ID: <span className="font-mono">{booking.id}</span></p>
                <p className="mb-4">Service: <span className="font-semibold">{booking.serviceDetails}</span></p>
                
                <div className="mb-6">
                    <label htmlFor="vendor" className="block text-sm font-medium text-gray-700">Available Vendors</label>
                    <select 
                        id="vendor"
                        value={selectedVendor}
                        onChange={(e) => setSelectedVendor(e.target.value)}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">-- Select a Vendor --</option>
                        {vendors.map(v => (
                            <option key={v.id} value={`${v.id}|${v.name}`}>{v.name} ({v.specialty})</option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end space-x-4">
                    <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300">Cancel</button>
                    <button type="button" onClick={handleAssign} className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">Assign</button>
                </div>
            </div>
        </div>
    );
};

const statusColors = {
  pending: 'bg-yellow-200 text-yellow-800',
  assigned: 'bg-blue-200 text-blue-800',
  completed: 'bg-green-200 text-green-800',
  cancelled: 'bg-red-200 text-red-800',
};

// Main Page Component
export default function BookingsPage() {
  const [gridApi, setGridApi] = useState(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  
  // Hardcoded vendors for now. This can be fetched from Firestore later.
  const [vendors] = useState([
    {id: 'vend_01', name: 'PlumbPerfect', specialty: 'Plumbing'},
    {id: 'vend_02', name: 'ElecTricks', specialty: 'Electrical'},
    {id: 'vend_03', name: 'CleanSweep', specialty: 'Cleaning'},
    {id: 'vend_04', name: 'HandyAndy', specialty: 'Appliances'},
  ]);

  const onGridReady = useCallback((params) => {
    setGridApi(params.api);
  }, []);

  useEffect(() => {
    if (!gridApi) return;

    const q = query(collection(db, "bookings"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const bookingsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      gridApi.setRowData(bookingsData);
    });

    return () => unsubscribe();
  }, [gridApi]);

  const handleOpenAssignModal = (data) => {
    setSelectedBooking(data);
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

  const columnDefs = [
    { headerName: 'Actions', field: 'id', pinned: 'left', width: 120, cellRenderer: params => {
        if (params.data.status === 'pending') {
            return <button onClick={() => handleOpenAssignModal(params.data)} className="bg-blue-500 text-white text-xs font-bold py-1 px-2 rounded hover:bg-blue-700">Assign</button>
        }
        return null;
    }},
    { headerName: 'Booking ID', field: 'id', filter: true, width: 150 },
    { headerName: 'Customer', field: 'customerName', filter: true },
    { headerName: 'Status', field: 'status', cellRenderer: params => (
        params.value && <span className={`px-2 py-1 font-semibold leading-tight text-xs rounded-full capitalize ${statusColors[params.value.toLowerCase()] || 'bg-gray-200'}`}>{params.value}</span>
    ) },
    { headerName: 'Assigned To', field: 'vendorName', filter: true },
    { headerName: 'Service', field: 'serviceDetails', filter: true },
    { headerName: 'Date', field: 'date', filter: 'agDateColumnFilter' },
    { headerName: 'Amount', field: 'price', valueFormatter: params => `₹${Number(params.value || 0).toFixed(2)}` },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Bookings Management</h1>
        <p className="text-sm text-slate-500 mt-1">Oversee and manage all service bookings.</p>
      </div>

      <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
        <AgGridReact
          columnDefs={columnDefs}
          onGridReady={onGridReady}
          rowData={[]}
          defaultColDef={{ flex: 1, minWidth: 150, resizable: true, sortable: true, floatingFilter: true }}
          pagination={true}
          paginationPageSize={20}
        />
      </div>

      <AssignVendorModal 
        booking={selectedBooking}
        vendors={vendors}
        onAssign={handleAssignVendor}
        onClose={handleCloseAssignModal}
      />
    </div>
  );
}
