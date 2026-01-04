'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Star } from 'lucide-react';
import BookingForm from '../../components/BookingForm';

const SUB_SERVICES = {
  cleaning: [
    { name: 'Bathroom Cleaning', price: 499, rating: 4.8 },
    { name: 'Full Home Deep Clean', price: 2499, rating: 4.9 },
    { name: 'Kitchen Cleaning', price: 699, rating: 4.7 },
  ],
  'ac-repair': [
    { name: 'AC Service', price: 599, rating: 4.8 },
    { name: 'AC Installation', price: 1500, rating: 4.9 },
    { name: 'AC Uninstallation', price: 800, rating: 4.7 },
  ],
  plumbing: [
    { name: 'Leaky Faucet Repair', price: 399, rating: 4.8 },
    { name: 'Clogged Drain', price: 499, rating: 4.7 },
    { name: 'Toilet Repair', price: 599, rating: 4.9 },
  ],
  appliances: [
    { name: 'Refrigerator Repair', price: 799, rating: 4.8 },
    { name: 'Washing Machine Repair', price: 699, rating: 4.9 },
    { name: 'Microwave Repair', price: 499, rating: 4.7 },
  ],
};

export default function ServiceMenuPage() {
  const params = useParams();
  const { serviceId } = params;
  const subServices = SUB_SERVICES[serviceId] || [];

  const [isBookingFormOpen, setIsBookingFormOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  const handleAddClick = (service) => {
    setSelectedService(service);
    setIsBookingFormOpen(true);
  };

  const closeBookingForm = () => {
    setIsBookingFormOpen(false);
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="sticky top-0 bg-white shadow-sm z-10 p-4">
        <h1 className="text-xl font-bold capitalize">{serviceId.replace('-', ' ')}</h1>
      </header>

      <main className="p-4">
        <div className="space-y-4">
          {subServices.map((service) => (
            <div key={service.name} className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex justify-between items-center">
              <div>
                <h3 className="font-bold">{service.name}</h3>
                <p className="text-sm text-gray-600">₹{service.price}</p>
                <div className="flex items-center text-sm">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" />
                  <span>{service.rating}</span>
                </div>
              </div>
              <button
                onClick={() => handleAddClick(service)}
                className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600"
              >
                Add
              </button>
            </div>
          ))}
        </div>
      </main>

      {isBookingFormOpen && selectedService && (
        <BookingForm
          serviceName={selectedService.name}
          price={selectedService.price}
          serviceType={serviceId}
          onClose={closeBookingForm}
        />
      )}
    </div>
  );
}
