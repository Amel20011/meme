'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Bookmark,
  MoreVertical,
  CalendarCheck,
  Target,
  LineChart,
  BellRing,
  ArrowRight,
  CheckCircle2,
  X
} from 'lucide-react';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { PlannerHeroIllustration } from '@/components/illustrations/EducationalIllustrations';
import { useEduka } from '@/hooks/useEdukaStore';

export default function PlannerPage() {
  const router = useRouter();
  const { user, updateUser, addTask } = useEduka();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedGoalMinutes, setSelectedGoalMinutes] = useState(user.dailyGoalMinutes || 45);
  const [targetSubject, setTargetSubject] = useState('Matematika');
  const [reminderTime, setReminderTime] = useState('16:00');
  const [scheduleSaved, setScheduleSaved] = useState(false);

  const features = [
    {
      title: 'Personalized Study Plan',
      desc: 'Dapatkan rencana belajar yang menyesuaikan mata pelajaran dan waktumu.',
      icon: CalendarCheck,
      bgColor: '#E9D9FF',
      iconColor: '#7C4DFF',
    },
    {
      title: 'Goal Setting',
      desc: 'Tetapkan target harian, mingguan, dan bulanan.',
      icon: Target,
      bgColor: '#FFD1C1',
      iconColor: '#EA580C',
    },
    {
      title: 'Progress Tracking',
      desc: 'Lihat perkembangan belajarmu melalui statistik.',
      icon: LineChart,
      bgColor: '#BFEBD7',
      iconColor: '#059669',
    },
    {
      title: 'Smart Reminders',
      desc: 'Jangan lewatkan sesi belajar dengan pengingat.',
      icon: BellRing,
      bgColor: '#BFDFFF',
      iconColor: '#2563EB',
    },
  ];

  const handleSavePlan = () => {
    updateUser({ dailyGoalMinutes: selectedGoalMinutes });
    addTask(`Target belajar ${targetSubject} (${selectedGoalMinutes} menit)`, 'high');
    setScheduleSaved(true);
    setTimeout(() => {
      setScheduleSaved(false);
      setShowScheduleModal(false);
    }, 1200);
  };

  return (
    <div className="flex-1 flex flex-col justify-between min-h-screen bg-[#F8F5FF]">
      {/* Top Navigation Bar: Back, Bookmark, More */}
      <header className="sticky top-0 z-40 w-full px-5 pt-3.5 pb-2.5 flex items-center justify-between">
        <button
          id="btn-planner-back"
          onClick={() => router.back()}
          className="w-10 h-10 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center text-[#171525] shadow-xs active:scale-95 transition-transform"
          aria-label="Kembali"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Rencana Belajar
        </span>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsBookmarked(!isBookmarked)}
            className="w-10 h-10 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center text-[#171525] shadow-xs active:scale-95 transition-transform"
            aria-label="Simpan bookmark"
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-[#7C4DFF] text-[#7C4DFF]' : 'text-gray-600'}`} />
          </button>
          <button
            onClick={() => alert('Pilihan: Bagikan rencana belajar atau sinkronkan dengan Google Calendar.')}
            className="w-10 h-10 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center text-[#171525] shadow-xs active:scale-95 transition-transform"
            aria-label="Opsi Lainnya"
          >
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-5 pt-1 pb-6 space-y-4">
        {/* Hero Illustration */}
        <div className="py-2">
          <PlannerHeroIllustration />
        </div>

        {/* Main White Card */}
        <div className="w-full bg-white rounded-[32px] p-6 shadow-[0_4px_30px_rgba(124,77,255,0.08)] border border-black/[0.04]">
          <h1 className="text-2xl font-extrabold tracking-tight text-[#171525] mb-1 text-center">
            Study Planner
          </h1>
          <p className="text-xs font-medium text-gray-500 leading-relaxed text-center mb-6 max-w-[280px] mx-auto">
            Atur jadwal belajar, tetapkan target, dan pantau perkembanganmu.
          </p>

          {/* Feature Rows */}
          <div className="space-y-3.5 mb-6">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="flex items-start gap-3.5 p-3 rounded-2xl bg-gray-50/70 border border-black/[0.03] hover:bg-gray-100/60 transition-colors"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-2xs"
                    style={{ backgroundColor: feat.bgColor }}
                  >
                    <Icon className="w-5 h-5" style={{ color: feat.iconColor }} />
                  </div>
                  <div>
                    <h2 className="text-[13px] font-bold text-[#171525]">
                      {feat.title}
                    </h2>
                    <p className="text-[11px] text-gray-500 font-medium leading-snug mt-0.5">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Primary CTA Button */}
          <button
            id="btn-planner-start"
            onClick={() => setShowScheduleModal(true)}
            className="w-full py-4 rounded-[22px] bg-[#7C4DFF] hover:bg-[#6D3DF0] text-white font-extrabold text-[15px] shadow-[0_8px_20px_rgba(124,77,255,0.25)] flex items-center justify-center gap-2 active:scale-98 transition-all"
          >
            <span>Mulai Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Interactive Goal & Schedule Builder Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-[380px] bg-white rounded-[32px] p-6 shadow-2xl border border-black/[0.06] animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.04]">
              <h3 className="font-extrabold text-base text-[#171525]">
                Susun Jadwal Belajarmu
              </h3>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {scheduleSaved ? (
              <div className="py-8 flex flex-col items-center justify-center text-center">
                <CheckCircle2 className="w-12 h-12 text-[#10B981] mb-2 animate-bounce" />
                <h4 className="font-extrabold text-base text-[#171525]">Rencana Berhasil Disimpan!</h4>
                <p className="text-xs text-gray-500 mt-1">Target harian otomatis dimasukkan ke daftar tugasmu.</p>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-1.5">
                    Target Waktu Belajar Harian:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[30, 45, 60].map(mins => (
                      <button
                        key={mins}
                        onClick={() => setSelectedGoalMinutes(mins)}
                        className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                          selectedGoalMinutes === mins
                            ? 'bg-[#7C4DFF] text-white border-[#7C4DFF]'
                            : 'bg-gray-50 text-gray-700 border-gray-200'
                        }`}
                      >
                        {mins} Menit
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-1.5">
                    Fokus Mata Pelajaran:
                  </label>
                  <select
                    value={targetSubject}
                    onChange={(e) => setTargetSubject(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-[#171525] focus:outline-hidden focus:border-[#7C4DFF]"
                  >
                    <option value="Matematika">Matematika</option>
                    <option value="Fisika">Fisika</option>
                    <option value="Bahasa Inggris">Bahasa Inggris</option>
                    <option value="Biologi">Biologi</option>
                    <option value="Kimia">Kimia</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-600 block mb-1.5">
                    Pengingat Belajar Harian:
                  </label>
                  <input
                    type="time"
                    value={reminderTime}
                    onChange={(e) => setReminderTime(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold text-[#171525]"
                  />
                </div>

                <button
                  onClick={handleSavePlan}
                  className="w-full py-3.5 rounded-2xl bg-[#7C4DFF] hover:bg-[#6D3DF0] text-white font-extrabold text-xs shadow-md mt-2"
                >
                  Terapkan Rencana Belajar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
