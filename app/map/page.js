'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Mock data for vendors with locations
const vendors = [
  {
    id: 1,
    name: 'PlumbPerfect',
    position: [12.9716, 77.5946], // Bangalore
    specialty: 'Plumbing',
    status: 'Available',
  },
  {
    id: 2,
    name: 'ElecTricks',
    position: [12.9820, 77.6080],
    specialty: 'Electrical',
    status: 'Busy',
  },
  {
    id: 3,
    name: 'CleanSweep',
    position: [12.9615, 77.6200],
    specialty: 'Cleaning',
    status: 'Available',
  },
];

// Fix for default icon issue with Webpack
const defaultIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});


export default function LiveMapPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Live Vendor Map</h1>
        <p className="text-sm text-slate-500 mt-1">Track vendor locations and status in real-time.</p>
      </div>
    <div style={{ height: '600px', width: '100%' }} className="ag-theme-alpine"> 
      <MapContainer center={[12.9716, 77.5946]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {vendors.map(vendor => (
          <Marker key={vendor.id} position={vendor.position} icon={defaultIcon}>
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg">{vendor.name}</h3>
                <p className="text-md">{vendor.specialty}</p>
                <p className={`text-sm font-bold ${vendor.status === 'Available' ? 'text-green-500' : 'text-red-500'}`}>
                  {vendor.status}
                </p>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      </div>
    </div>
  );
}
