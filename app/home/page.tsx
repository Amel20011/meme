'use client';

import React from 'react';
import { TopHeader } from '@/components/layout/TopHeader';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { MascotAvatar } from '@/components/illustrations/EducationalIllustrations';
import { FocusCard } from '@/components/dashboard/FocusCard';
import { StreakCard } from '@/components/dashboard/StreakCard';
import { SubjectCarousel } from '@/components/dashboard/SubjectCarousel';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { useUser } from '@/hooks/useEdukaStore';

export default function HomePage() {
  const { user } = useUser();

  // Dynamic friendly greeting based on time of day (WIB)
  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours >= 5 && hours < 11) return 'Selamat pagi';
    if (hours >= 11 && hours < 15) return 'Selamat siang';
    if (hours >= 15 && hours < 18) return 'Selamat sore';
    return 'Selamat malam';
  };

  return (
    <div className="flex-1 flex flex-col justify-between min-h-screen bg-[#FDFBF7]">
      {/* Top Header */}
      <TopHeader />

      {/* Main Dashboard Content */}
      <main className="flex-1 px-5 pt-3 pb-6 space-y-5">
        {/* User Greeting Section */}
        <section className="flex items-center justify-between pt-1">
          <div className="min-w-0 pr-3">
            <h1 className="text-xl font-extrabold tracking-tight text-[#171525] truncate">
              {getGreeting()}, {user.name ? user.name.split(' ')[0] : 'Siswa'}!
            </h1>
            <p className="text-xs font-semibold text-gray-500 mt-0.5">
              Yuk lanjutkan belajar hari ini
            </p>
          </div>

          {/* Right side: Friendly Mascot / Avatar */}
          <MascotAvatar className="shrink-0" />
        </section>

        {/* Today's Focus Card */}
        <section>
          <FocusCard />
        </section>

        {/* Study Streak Card */}
        <section>
          <StreakCard />
        </section>

        {/* Subjects Horizontal Carousel */}
        <section>
          <SubjectCarousel />
        </section>

        {/* Quick Actions (Pomodoro, Tasks, Notes, Flashcards) */}
        <section>
          <QuickActions />
        </section>
      </main>

      {/* Fixed/Floating Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
