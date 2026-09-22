'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, Bell, Heart, Sparkles } from 'lucide-react';
import { APP_CONFIG } from '@/lib/constants/config';
import { useHearts, useEduka } from '@/hooks/useEdukaStore';
import { SideDrawer } from './SideDrawer';
import { formatSeconds } from '@/lib/utils/quizUtils';

export function TopHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { hearts, secondsUntilNextHeart } = useHearts();
  const { notifications } = useEduka();

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FDFBF7]/90 backdrop-blur-md px-5 pt-3.5 pb-2.5 flex items-center justify-between border-b border-black/[0.03]">
        {/* Left: Hamburger Icon */}
        <button
          id="btn-header-menu"
          onClick={() => setDrawerOpen(true)}
          className="w-10 h-10 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center text-[#171525] shadow-xs active:scale-95 transition-transform"
          aria-label="Buka menu navigasi"
        >
          <Menu className="w-5 h-5 text-[#171525]" />
        </button>

        {/* Center: EDUKA Logo */}
        <Link href="/home" className="flex items-center gap-1.5 focus:outline-hidden">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-[#7C4DFF] to-[#A78BFA] flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="font-extrabold text-[19px] tracking-tight text-[#171525]">
            {APP_CONFIG.name}
          </span>
        </Link>

        {/* Right: Hearts Counter & Notification Icon */}
        <div className="flex items-center gap-2">
          {/* Heart indicator with recovery countdown */}
          <Link
            href="/profile"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white border border-black/[0.06] shadow-xs hover:border-[#F6B6D8] transition-colors"
            title={hearts.current < 5 ? `Pulih 1 hati dalam ${formatSeconds(secondsUntilNextHeart)}` : 'Hati Penuh (5/5)'}
          >
            <Heart className={`w-4 h-4 ${hearts.current > 0 ? 'fill-[#FF5A79] text-[#FF5A79]' : 'text-gray-400'}`} />
            <span className="text-xs font-bold text-[#171525]">{hearts.current}</span>
            {hearts.current < 5 && (
              <span className="text-[10px] text-gray-500 font-medium ml-0.5 font-mono">
                {formatSeconds(secondsUntilNextHeart)}
              </span>
            )}
          </Link>

          {/* Notification Button with pink badge */}
          <Link
            id="btn-header-notification"
            href="/notifications"
            className="relative w-10 h-10 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center text-[#171525] shadow-xs active:scale-95 transition-transform"
            aria-label="Lihat notifikasi"
          >
            <Bell className="w-5 h-5 text-[#171525]" />
            {unreadCount > 0 && (
              <span className="absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full bg-[#F6B6D8] ring-2 ring-white animate-pulse" />
            )}
          </Link>
        </div>
      </header>

      {/* Side Navigation Drawer */}
      <SideDrawer isOpen={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
