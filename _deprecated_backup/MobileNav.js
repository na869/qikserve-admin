'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function MobileNav({ navigation }) {
  const pathname = usePathname();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <nav className="grid grid-cols-4 gap-x-2">
        {navigation.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={classNames(
              pathname === item.href
                ? 'text-indigo-600 border-indigo-500'
                : 'text-gray-500 hover:text-indigo-600',
              'flex flex-col items-center justify-center p-2 text-xs font-medium border-t-2 border-transparent'
            )}
          >
            <item.icon className="h-6 w-6 mb-1" aria-hidden="true" />
            <span className="truncate">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
