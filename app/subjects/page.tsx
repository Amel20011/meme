'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  ArrowRight,
  BookOpen,
  Calculator,
  Zap,
  Dna,
  FlaskConical,
  TreePine,
  Globe,
  Code,
  GraduationCap
} from 'lucide-react';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { useEduka } from '@/hooks/useEdukaStore';
import { getSubjectsByLevel } from '@/lib/data/educationData';

function getSubjectIcon(name: string) {
  switch (name) {
    case 'Calculator': return Calculator;
    case 'Zap': return Zap;
    case 'BookOpen': return BookOpen;
    case 'Dna': return Dna;
    case 'FlaskConical': return FlaskConical;
    case 'TreePine': return TreePine;
    case 'Globe': return Globe;
    case 'Code': return Code;
    default: return GraduationCap;
  }
}

export default function SubjectsPage() {
  const router = useRouter();
  const { user, getSubjectProgress } = useEduka();
  const subjects = getSubjectsByLevel(user.educationLevel);

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
          Mata Pelajaran ({user.educationLevel})
        </h1>

        <div className="w-10" />
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 pt-3 pb-6 space-y-4">
        <div className="p-4 rounded-2xl bg-[#E9D9FF]/50 border border-[#7C4DFF]/10">
          <p className="text-xs font-bold text-[#7C4DFF]">
            🎓 Kurikulum Lengkap 8 Bab Terstruktur
          </p>
          <p className="text-[11px] text-gray-600 font-medium mt-0.5">
            Setiap mata pelajaran memiliki tepat 8 bab dengan kuis mastery nilai minimal 80%.
          </p>
        </div>

        <div className="space-y-3">
          {subjects.map((sub) => {
            const { completedCount, totalCount, percentage } = getSubjectProgress(sub.id);
            const Icon = getSubjectIcon(sub.iconName);

            return (
              <Link
                key={sub.id}
                href={`/subjects/${sub.id}`}
                className="block p-4 rounded-[26px] bg-white border border-black/[0.04] shadow-xs hover:border-[#7C4DFF]/30 transition-all group"
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-2xs"
                    style={{ backgroundColor: sub.color }}
                  >
                    <Icon className="w-6 h-6 text-[#171525]" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h2 className="font-bold text-[15px] text-[#171525] truncate">
                        {sub.name}
                      </h2>
                      <span className="text-xs font-bold text-[#7C4DFF] shrink-0">
                        {percentage}%
                      </span>
                    </div>

                    <p className="text-xs text-gray-500 font-medium line-clamp-1 mt-0.5">
                      {sub.description}
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mt-3 overflow-hidden">
                      <div
                        className="h-full bg-[#7C4DFF] rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400 mt-2">
                      <span>{completedCount} dari {totalCount} Bab Selesai (≥80%)</span>
                      <span className="flex items-center text-[#7C4DFF] group-hover:translate-x-1 transition-transform">
                        Buka Bab <ArrowRight className="w-3 h-3 ml-0.5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
