'use client';

import BottomNav from '../../components/BottomNav';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Home', href: '/customer', icon: HomeIcon },
  { name: 'Bookings', href: '/customer/bookings', icon: ClipboardDocumentListIcon },
  { name: 'Profile', href: '/customer/profile', icon: UserCircleIcon },
];

export default function CustomerLayout({ children }) {
  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      <div className="flex-1 overflow-y-auto">
        {/* Add padding-bottom to ensure content is not hidden behind the fixed bottom nav */}
        <main className="pb-20">
          <div className="py-8 px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
      <BottomNav navigation={navigation} />
    </div>
  );
}
