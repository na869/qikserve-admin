'use client';

import { usePathname } from 'next/navigation';
import Sidebar from './Sidebar';

export default function MainLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen bg-neutral-DEFAULT">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
