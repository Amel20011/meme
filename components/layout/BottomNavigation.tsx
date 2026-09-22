'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Calendar, BarChart2, User } from 'lucide-react';

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { name: 'Beranda', href: '/home', icon: Home },
  { name: 'Planner', href: '/planner', icon: Calendar },
  { name: 'Statistik', href: '/statistics', icon: BarChart2 },
  { name: 'Profil', href: '/profile', icon: User },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <div className="sticky bottom-0 z-40 w-full px-4 pt-2 pb-safe pointer-events-none">
      <nav
        aria-label="Navigasi Utama"
        className="w-full bg-white/95 backdrop-blur-md rounded-[26px] p-2 shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-black/[0.04] flex items-center justify-between pointer-events-auto"
      >
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href !== '/home' && pathname?.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.href}
              id={`nav-${item.name.toLowerCase()}`}
              className={`flex-1 flex items-center justify-center py-2.5 px-3 rounded-[20px] transition-all duration-200 ${
                isActive
                  ? 'bg-[#7C4DFF] text-white shadow-xs font-bold'
                  : 'text-gray-400 hover:text-gray-700 font-medium'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                {isActive && (
                  <span className="text-xs tracking-tight whitespace-nowrap animate-in fade-in zoom-in-95 duration-150">
                    {item.name}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
