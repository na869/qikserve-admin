'use client';

import { useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

ModuleRegistry.registerModules([AllCommunityModule]);

const mockBookings = [
  {
    id: 'BK001',
    customer: 'John Doe',
    vendor: 'PlumbPerfect',
    service: 'Leaky Faucet Repair',
    date: '2024-07-25',
    status: 'Confirmed',
    amount: 75.0,
  },
  {
    id: 'BK002',
    customer: 'Jane Smith',
    vendor: 'ElecTricks',
    service: 'New Socket Installation',
    date: '2024-07-26',
    status: 'Pending',
    amount: 120.0,
  },
  {
    id: 'BK003',
    customer: 'Bob Johnson',
    vendor: 'CleanSweep',
    service: 'Deep House Cleaning',
    date: '2024-07-27',
    status: 'Completed',
    amount: 250.0,
  },
  {
    id: 'BK004',
    customer: 'Samantha Brown',
    vendor: 'PlumbPerfect',
    service: 'Clogged Drain',
    date: '2024-07-28',
    status: 'Cancelled',
    amount: 50.0,
  },
  {
    id: 'BK005',
    customer: 'Michael Williams',
    vendor: 'ElecTricks',
    service: 'Ceiling Fan Installation',
    date: '2024-07-29',
    status: 'Confirmed',
    amount: 150.0,
  },
];

const statusColors = {
  Pending: 'bg-yellow-200 text-yellow-800',
  Confirmed: 'bg-blue-200 text-blue-800',
  Completed: 'bg-green-200 text-green-800',
  Cancelled: 'bg-red-200 text-red-800',
};

export default function BookingsPage() {
  const [rowData] = useState(mockBookings);

  const [columnDefs] = useState([
    { headerName: 'Booking ID', field: 'id', filter: true, floatingFilter: true },
    { headerName: 'Customer', field: 'customer', filter: true, floatingFilter: true },
    { headerName: 'Vendor', field: 'vendor', filter: true, floatingFilter: true },
    { headerName: 'Service', field: 'service', filter: true, floatingFilter: true },
    { headerName: 'Date', field: 'date', filter: 'agDateColumnFilter' },
    {
      headerName: 'Status',
      field: 'status',
      cellRenderer: (params) => (
        <span
          className={`px-2 py-1 font-semibold leading-tight text-xs rounded-full ${
            statusColors[params.value]
          }`}>
          {params.value}
        </span>
      ),
      filter: true,
      floatingFilter: true,
    },
    {
      headerName: 'Amount',
      field: 'amount',
      valueFormatter: (params) => `$${params.value.toFixed(2)}`,
      filter: 'agNumberColumnFilter',
      floatingFilter: true,
    },
  ]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Bookings Management</h1>
        <p className="text-sm text-slate-500 mt-1">Oversee and manage all service bookings.</p>
      </div>

      <div className="ag-theme-alpine" style={{ height: 600, width: '100%' }}>
        <AgGridReact
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={{
            flex: 1,
            minWidth: 150,
            resizable: true,
            sortable: true,
          }}
          pagination={true}
          paginationPageSize={10}
          paginationPageSizeSelector={[10, 25, 50]}
          theme="legacy"
        />
      </div>
    </div>
  );
}
