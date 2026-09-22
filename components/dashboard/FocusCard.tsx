'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Calculator, CheckCircle2 } from 'lucide-react';
import { useEduka } from '@/hooks/useEdukaStore';
import { getSubjectsByLevel } from '@/lib/data/educationData';

export function FocusCard() {
  const { user, chapterProgress } = useEduka();
  const subjects = getSubjectsByLevel(user.educationLevel);

  // Default focus chapter (matches prompt example: "Matematika — Persamaan Linear", "Belajar dan latihan soal", 75%)
  const primarySubject = subjects[0] || subjects.find(s => s.name.toLowerCase().includes('matematika')) || subjects[0];
  const targetChapter = primarySubject?.chapters[1] || primarySubject?.chapters[0];

  const targetProgress = targetChapter ? chapterProgress[targetChapter.id] : undefined;
  const currentPercentage = targetProgress ? targetProgress.bestScore : 75;
  const isDone = currentPercentage >= 80;

  // Circular progress SVG values
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (currentPercentage / 100) * circumference;

  return (
    <div className="w-full bg-white rounded-[26px] p-5 shadow-[0_4px_24px_rgba(124,77,255,0.06)] border border-black/[0.04]">
      {/* Header Row */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[17px] font-bold tracking-tight text-[#171525]">
          Fokus Hari Ini
        </h2>
        <Link
          href={`/subjects/${primarySubject.id}`}
          className="text-xs font-semibold text-[#7C4DFF] hover:underline flex items-center gap-0.5"
        >
          <span>Lihat semua</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Main Focus Content */}
      <div className="flex items-center justify-between gap-4">
        {/* Left Info */}
        <div className="flex items-start gap-3.5 flex-1 min-w-0">
          <div className="w-12 h-12 rounded-2xl bg-[#E9D9FF] flex items-center justify-center shrink-0 shadow-xs">
            <Calculator className="w-6 h-6 text-[#7C4DFF]" />
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-[15px] text-[#171525] truncate">
              {primarySubject.name} — {targetChapter ? targetChapter.title.split(':')[0] : 'Persamaan Linear'}
            </h3>
            <p className="text-xs text-gray-500 font-medium truncate mt-0.5">
              Belajar dan latihan soal
            </p>

            {/* Linear Progress Bar */}
            <div className="w-full bg-[#F3F4F6] rounded-full h-2 mt-2.5 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  isDone ? 'bg-[#10B981]' : 'bg-[#7C4DFF]'
                }`}
                style={{ width: `${Math.min(100, currentPercentage)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Circular Progress Display */}
        <div className="relative w-14 h-14 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 60 60">
            {/* Background ring */}
            <circle
              cx="30"
              cy="30"
              r={radius}
              stroke="#F3F4F6"
              strokeWidth="5"
              fill="transparent"
            />
            {/* Progress stroke */}
            <circle
              cx="30"
              cy="30"
              r={radius}
              stroke={isDone ? '#10B981' : '#7C4DFF'}
              strokeWidth="5"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-700 ease-out"
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center text-center">
            {isDone ? (
              <CheckCircle2 className="w-5 h-5 text-[#10B981]" />
            ) : (
              <span className="text-[12px] font-extrabold text-[#171525]">
                {currentPercentage}%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="mt-4 pt-3.5 border-t border-black/[0.04] flex items-center justify-between">
        <span className="text-[11px] text-gray-500 font-medium">
          {isDone ? '✓ Bab ini telah memenuhi syarat kelulusan 80%' : 'Butuh ≥ 80% untuk membuka hadiah bab'}
        </span>
        <Link
          href={`/chapters/${targetChapter ? targetChapter.id : 'sma-matematika-bab-2'}`}
          className="py-1.5 px-3 rounded-xl bg-[#7C4DFF] hover:bg-[#6D3DF0] text-white text-xs font-bold transition-transform active:scale-95 shadow-xs"
        >
          {isDone ? 'Ulangi Kuis' : 'Lanjutkan'}
        </Link>
      </div>
    </div>
  );
}
