'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Flame,
  Award,
  Clock,
  TrendingUp,
  Target,
  Sparkles,
  BarChart3
} from 'lucide-react';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { useEduka } from '@/hooks/useEdukaStore';
import { getSubjectsByLevel } from '@/lib/data/educationData';
import { APP_CONFIG } from '@/lib/constants/config';

export default function StatisticsPage() {
  const router = useRouter();
  const { user, streak, chapterProgress, getSubjectProgress } = useEduka();
  const subjects = getSubjectsByLevel(user.educationLevel);

  // Calculate overall metrics
  const progressEntries = Object.values(chapterProgress);
  const totalCompletedChapters = progressEntries.filter(p => p.bestScore >= APP_CONFIG.passingScore).length;
  const totalAttemptedQuizzes = progressEntries.length;
  const avgScore = totalAttemptedQuizzes > 0
    ? Math.round(progressEntries.reduce((acc, curr) => acc + curr.bestScore, 0) / totalAttemptedQuizzes)
    : 84;

  const weeklyHours = [
    { day: 'Sen', hours: 1.5, percent: 60 },
    { day: 'Sel', hours: 2.2, percent: 85 },
    { day: 'Rab', hours: 1.8, percent: 70 },
    { day: 'Kam', hours: 2.5, percent: 100 },
    { day: 'Jum', hours: 2.0, percent: 80 },
    { day: 'Sab', hours: 3.1, percent: 95 },
    { day: 'Min', hours: 1.2, percent: 50 },
  ];

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
          Statistik Belajar
        </h1>

        <div className="w-10" />
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 pt-3 pb-8 space-y-4">
        {/* Top Summary Bento Cards */}
        <div className="grid grid-cols-2 gap-3">
          {/* Streak Card */}
          <div className="p-4 rounded-[26px] bg-white border border-black/[0.04] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500">Study Streak</span>
              <div className="w-7 h-7 rounded-xl bg-[#FFD1C1]/60 flex items-center justify-center text-[#EA580C]">
                <Flame className="w-4 h-4 fill-[#EA580C]" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-black text-[#171525]">{streak.currentStreak}</span>
              <span className="text-xs text-gray-500 font-semibold ml-1">Hari</span>
              <p className="text-[10px] text-gray-400 font-medium mt-0.5">Rekor terbaik: {streak.longestStreak} hari</p>
            </div>
          </div>

          {/* Average Score Card */}
          <div className="p-4 rounded-[26px] bg-white border border-black/[0.04] shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-500">Rata-rata Skor</span>
              <div className="w-7 h-7 rounded-xl bg-[#E9D9FF] flex items-center justify-center text-[#7C4DFF]">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3">
              <span className="text-2xl font-black text-[#7C4DFF]">{avgScore}%</span>
              <p className="text-[10px] text-[#10B981] font-bold mt-0.5">Di atas standar 80%</p>
            </div>
          </div>
        </div>

        {/* Weekly Study Activity Bar Chart */}
        <div className="p-5 rounded-[28px] bg-white border border-black/[0.04] shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-extrabold text-[#171525]">Aktivitas Mingguan</h2>
              <p className="text-[11px] text-gray-500 font-medium">Total 14.3 jam belajar minggu ini</p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#BFEBD7]/70 text-[#065F46]">
              +18% vs minggu lalu
            </span>
          </div>

          {/* Vertical Bars */}
          <div className="flex items-end justify-between gap-2 h-36 pt-4 pb-1">
            {weeklyHours.map((wh) => (
              <div key={wh.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                <div className="w-full max-w-[28px] bg-gray-100 rounded-xl relative flex flex-col justify-end h-28 overflow-hidden">
                  <div
                    className="w-full bg-[#7C4DFF] rounded-xl transition-all duration-500 hover:bg-[#6D3DF0]"
                    style={{ height: `${wh.percent}%` }}
                    title={`${wh.hours} jam`}
                  />
                </div>
                <span className="text-[11px] font-bold text-gray-400">{wh.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 80% Mastery Progress Section */}
        <div className="p-5 rounded-[28px] bg-white border border-black/[0.04] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-extrabold text-[#171525]">
              Penguasaan Bab (Syarat Nilai ≥ 80%)
            </h2>
            <Target className="w-4 h-4 text-[#7C4DFF]" />
          </div>

          <p className="text-xs text-gray-500 font-medium leading-relaxed mb-4">
            Kamu telah menuntaskan <strong>{totalCompletedChapters} bab</strong> dengan skor evaluasi di atas 80%.
          </p>

          <div className="space-y-3">
            {subjects.map((sub) => {
              const { completedCount, totalCount, percentage } = getSubjectProgress(sub.id);
              return (
                <div key={sub.id} className="space-y-1">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-[#171525]">{sub.name}</span>
                    <span className="text-gray-500">{completedCount} / {totalCount} Bab ({percentage}%)</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-[#7C4DFF] rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
