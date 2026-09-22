'use client';

import React from 'react';
import Link from 'next/link';
import {
  Calculator,
  Zap,
  BookOpen,
  Dna,
  FlaskConical,
  TreePine,
  Globe,
  Code,
  ArrowRight,
  GraduationCap
} from 'lucide-react';
import { useEduka } from '@/hooks/useEdukaStore';
import { getSubjectsByLevel } from '@/lib/data/educationData';

// Map icon string to Lucide component
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

export function SubjectCarousel() {
  const { user, getSubjectProgress } = useEduka();
  const subjects = getSubjectsByLevel(user.educationLevel);

  return (
    <div className="w-full">
      {/* Title Header */}
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-[17px] font-bold tracking-tight text-[#171525]">
          Mata Pelajaran
        </h2>
        <Link
          href="/subjects"
          className="text-xs font-semibold text-[#7C4DFF] hover:underline flex items-center gap-0.5"
        >
          <span>Lihat semua</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Horizontal Carousel */}
      <div className="flex gap-3.5 overflow-x-auto no-scrollbar pb-2 pt-1 -mx-5 px-5">
        {subjects.map((subject) => {
          const { completedCount, totalCount, percentage } = getSubjectProgress(subject.id);
          const Icon = getSubjectIcon(subject.iconName);

          return (
            <Link
              key={subject.id}
              href={`/subjects/${subject.id}`}
              id={`subject-card-${subject.slug}`}
              className="shrink-0 w-[150px] p-4 rounded-[26px] border border-black/[0.04] shadow-[0_4px_16px_rgba(0,0,0,0.03)] flex flex-col justify-between transition-all hover:-translate-y-1 active:scale-95 bg-white relative overflow-hidden group"
            >
              {/* Pastel Tint background layer */}
              <div
                className="absolute inset-0 opacity-40 transition-opacity group-hover:opacity-60"
                style={{ backgroundColor: subject.color }}
              />

              <div className="relative z-10">
                {/* Icon wrapper */}
                <div className="w-11 h-11 rounded-2xl bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs mb-3 text-[#171525]">
                  <Icon className="w-5 h-5 text-[#7C4DFF]" />
                </div>

                {/* Name */}
                <h3 className="font-bold text-[14px] text-[#171525] line-clamp-1">
                  {subject.name}
                </h3>
                <p className="text-[11px] text-gray-500 font-medium mt-0.5">
                  {completedCount}/{totalCount} Bab Selesai
                </p>
              </div>

              {/* Progress Bar & Percentage */}
              <div className="relative z-10 mt-4">
                <div className="flex items-center justify-between text-[11px] font-bold text-gray-700 mb-1.5">
                  <span>Progres</span>
                  <span className="text-[#7C4DFF]">{percentage}%</span>
                </div>
                <div className="w-full bg-black/[0.06] rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-[#7C4DFF] rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
