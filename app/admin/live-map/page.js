'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Mock vendor data with locations
const vendors = [
  { id: 1, name: 'Vendor A', position: [28.6139, 77.2090], jobs: 5, status: 'Online' },
  { id: 2, name: 'Vendor B', position: [28.5355, 77.3910], jobs: 3, status: 'Offline' },
  { id: 3, name: 'Vendor C', position: [28.4595, 77.0266], jobs: 8, status: 'Online' },
  { id: 4, name: 'Vendor D', position: [28.6692, 77.4538], jobs: 2, status: 'On a Job' },
  { id: 5, name: 'Vendor E', position: [28.7041, 77.1025], jobs: 10, status: 'Online' },
];

// Custom icon for vendors
const vendorIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

export default function LiveMapPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Live Vendor Map</h1>
        <p className="text-sm text-slate-500 mt-1">Track your vendors in real-time.</p>
      </div>

      <div className="h-[600px] w-full bg-white border border-slate-200 rounded-lg shadow-sm">
        <MapContainer center={[28.6139, 77.2090]} zoom={10} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {vendors.map(vendor => (
            <Marker key={vendor.id} position={vendor.position} icon={vendorIcon}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-bold text-lg">{vendor.name}</h3>
                  <p>Status: {vendor.status}</p>
                  <p>Active Jobs: {vendor.jobs}</p>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}
