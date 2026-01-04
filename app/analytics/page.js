'use client';

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

// Mock Data (as requested)
const revenueData = [
  { name: 'Jan', revenue: 4000, expenses: 2400 },
  { name: 'Feb', revenue: 3000, expenses: 1398 },
  { name: 'Mar', revenue: 5000, expenses: 9800 },
  { name: 'Apr', revenue: 4780, expenses: 3908 },
  { name: 'May', revenue: 5890, expenses: 4800 },
  { name: 'Jun', revenue: 4390, expenses: 3800 },
  { name: 'Jul', revenue: 5490, expenses: 4300 },
  { name: 'Aug', revenue: 6020, expenses: 4400 },
  { name: 'Sep', revenue: 6800, expenses: 4600 },
  { name: 'Oct', revenue: 7800, expenses: 5000 },
  { name: 'Nov', revenue: 8200, expenses: 5200 },
  { name: 'Dec', revenue: 9500, expenses: 5500 },
];

const serviceDistributionData = [
    { name: 'Cleaning', value: 45 },
    { name: 'Plumbing', value: 25 },
    { name: 'Electrical', value: 15 },
    { name: 'Carpentry', value: 10 },
    { name: 'Other', value: 5 },
];

const userActivityData = [
  { name: 'New Users', value: 400 },
  { name: 'Returning Users', value: 1200 },
];

const topVendorsData = [
    { name: 'Vendor A', jobs: 120 },
    { name: 'Vendor B', jobs: 98 },
    { name: 'Vendor C', jobs: 86 },
    { name: 'Vendor D', jobs: 75 },
    { name: 'Vendor E', jobs: 60 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A230FF'];

export default function AnalyticsPage() {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900">Analytics Dashboard</h1>
                    <p className="text-sm text-slate-500 mt-1">Insights into your business performance.</p>
                </div>
                <div className="flex items-center gap-2 mt-4 sm:mt-0">
                    <select className="bg-white border border-slate-200 rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <option>Last 30 days</option>
                        <option>Last 90 days</option>
                        <option>Last 12 months</option>
                    </select>
                    <button className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-md text-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        Export Data
                    </button>
                </div>
            </div>

            {/* Main Chart: Revenue and Expenses */}
            <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-6 mb-8">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="font-semibold text-lg text-slate-800">Revenue & Expenses</h2>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-indigo-500"></div>
                            <span className="text-sm text-slate-600">Revenue</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-slate-300"></div>
                            <span className="text-sm text-slate-600">Expenses</span>
                        </div>
                    </div>
                </div>
                <div style={{ width: '100%', height: '400px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={revenueData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis dataKey="name" fontSize={12} tick={{ fill: '#6b7280' }} stroke="#d1d5db" />
                            <YAxis fontSize={12} tick={{ fill: '#6b7280' }} stroke="#d1d5db" tickFormatter={(value) => `$${value / 1000}k`} />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }}
                                labelStyle={{ fontWeight: 'bold', color: '#1f2937' }}
                                formatter={(value, name) => [`$${value.toLocaleString()}`, name.charAt(0).toUpperCase() + name.slice(1)]}
                            />
                            <Area type="monotone" dataKey="revenue" stackId="1" strokeWidth={2} stroke="#6366f1" fill="#c7d2fe" />
                            <Area type="monotone" dataKey="expenses" stackId="1" strokeWidth={2} stroke="#9ca3af" fill="#e5e7eb" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Grid for other stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Services Distribution Chart */}
                <div className="lg:col-span-1 bg-white border border-slate-200 rounded-lg shadow-sm p-6">
                    <h3 className="font-semibold text-slate-800 mb-4">Services Distribution</h3>
                    <div style={{ width: '100%', height: '300px' }}>
                        <ResponsiveContainer>
                            <PieChart>
                                <Pie data={serviceDistributionData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8" paddingAngle={5} dataKey="value" labelLine={false}>
                                    {serviceDistributionData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip formatter={(value, name) => [`${value}%`, name]} />
                                <Legend iconType="circle" wrapperStyle={{ fontSize: '14px' }}/>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Top Performing Vendors */}
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg shadow-sm p-6">
                    <h3 className="font-semibold text-slate-800 mb-4">Top Performing Vendors</h3>
                    <ul className="space-y-4">
                        {topVendorsData.map((vendor, index) => (
                            <li key={index} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-500">{index + 1}</div>
                                    <div>
                                        <p className="font-medium text-slate-800">{vendor.name}</p>
                                        <p className="text-xs text-slate-500">{`Completed ${vendor.jobs} jobs`}</p>
                                    </div>
                                </div>
                                <span className="font-semibold text-slate-700">{vendor.jobs}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
