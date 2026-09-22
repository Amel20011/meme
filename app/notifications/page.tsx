'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Bell,
  Clock,
  Award,
  Heart,
  Flame,
  CheckCircle2
} from 'lucide-react';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { useEduka } from '@/hooks/useEdukaStore';

export default function NotificationsPage() {
  const router = useRouter();
  const { notifications, markNotificationRead } = useEduka();

  const getIcon = (type: string) => {
    switch (type) {
      case 'streak': return <Flame className="w-4 h-4 text-[#EA580C] fill-[#EA580C]" />;
      case 'reward': return <Award className="w-4 h-4 text-[#7C4DFF]" />;
      case 'quiz': return <Heart className="w-4 h-4 text-[#FF5A79] fill-[#FF5A79]" />;
      default: return <Clock className="w-4 h-4 text-[#2563EB]" />;
    }
  };

  const markAllRead = () => {
    notifications.forEach(n => markNotificationRead(n.id));
  };

  return (
    <div className="flex-1 flex flex-col justify-between min-h-screen bg-[#FDFBF7]">
      {/* Top Header */}
      <header className="sticky top-0 z-40 w-full px-5 pt-3.5 pb-2.5 flex items-center justify-between bg-[#FDFBF7]/90 backdrop-blur-md border-b border-black/[0.04]">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center text-[#171525] shadow-xs active:scale-95 transition-transform"
          aria-label="Kembali"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h1 className="font-extrabold text-base text-[#171525]">
          Pemberitahuan
        </h1>

        <button
          onClick={markAllRead}
          className="text-xs font-bold text-[#7C4DFF] hover:underline"
        >
          Tandai Baca
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 pt-3 pb-8 space-y-3">
        {notifications.length === 0 ? (
          <div className="py-12 text-center">
            <Bell className="w-10 h-10 text-gray-300 mx-auto mb-2" />
            <p className="text-xs font-bold text-gray-500">Tidak ada notifikasi baru</p>
          </div>
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => markNotificationRead(notif.id)}
              className={`p-4 rounded-[24px] border transition-all cursor-pointer ${
                notif.read
                  ? 'bg-white/70 border-black/[0.03] opacity-75'
                  : 'bg-white border-[#7C4DFF]/20 shadow-xs'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gray-50 border border-black/[0.04] flex items-center justify-center shrink-0">
                  {getIcon(notif.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-extrabold text-[#171525] truncate">
                      {notif.title}
                    </h3>
                    {!notif.read && (
                      <span className="w-2 h-2 rounded-full bg-[#F6B6D8] shrink-0" />
                    )}
                  </div>

                  <p className="text-[11px] text-gray-600 font-medium leading-snug mt-0.5">
                    {notif.message}
                  </p>

                  <span className="text-[10px] text-gray-400 font-semibold block mt-2">
                    {new Date(notif.timestamp).toLocaleDateString('id-ID', {
                      day: 'numeric',
                      month: 'short',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </main>

      <BottomNavigation />
    </div>
  );
}
