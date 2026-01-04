'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, UsersIcon, CalendarIcon, MapIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const navLinks = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Vendors', href: '/vendors', icon: UsersIcon },
  { name: 'Bookings', href: '/bookings', icon: CalendarIcon },
  { name: 'Live Map', href: '/map', icon: MapIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-neutral-100 text-neutral-800 flex flex-col flex-shrink-0 border-r border-neutral-200">
      <div className="h-20 flex items-center px-6">
        <h1 className="text-2xl font-bold text-primary">QikServe</h1>
      </div>
      <nav className="flex-1 p-4 space-y-2">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? 'bg-primary text-white shadow-lg shadow-primary/50'
                  : 'text-neutral-500 hover:bg-neutral-200 hover:text-primary'
              }`}>
              <link.icon className="h-6 w-6" />
              <span className="font-semibold text-sm tracking-wide">{link.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
