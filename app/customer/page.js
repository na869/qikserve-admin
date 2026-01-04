'use client';

import { useRouter } from 'next/navigation';
import { Home, Settings, Droplets, Wind, Wrench } from 'lucide-react';

const services = [
  { id: 'cleaning', name: 'Cleaning', icon: <Home className="w-8 h-8" /> },
  { id: 'ac-repair', name: 'AC Repair', icon: <Wind className="w-8 h-8" /> },
  { id: 'plumbing', name: 'Plumbing', icon: <Droplets className="w-8 h-8" /> },
  { id: 'appliances', name: 'Appliances', icon: <Wrench className="w-8 h-8" /> },
];

export default function CustomerHomePage() {
  const router = useRouter();

  const handleServiceClick = (serviceId) => {
    router.push(`/customer/book/${serviceId}`);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="sticky top-0 bg-white shadow-sm z-10 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Hi, Guest!</h1>
        <Settings className="w-6 h-6" />
      </header>

      <main className="p-4">
        <div className="relative bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg p-8 mb-8 text-center overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <h2 className="relative text-3xl font-bold">Home Services at your Doorstep</h2>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex flex-col items-center justify-center text-center cursor-pointer hover:shadow-lg transition-shadow duration-300"
              onClick={() => handleServiceClick(service.id)}
            >
              <div className="text-indigo-500 mb-2">{service.icon}</div>
              <h3 className="font-semibold">{service.name}</h3>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
