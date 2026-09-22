'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ChevronLeft,
  CheckCircle2,
  Clock,
  ArrowRight,
  Award,
  AlertCircle,
  HelpCircle,
  Play
} from 'lucide-react';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { useEduka } from '@/hooks/useEdukaStore';
import { getSubjectsByLevel } from '@/lib/data/educationData';
import { APP_CONFIG } from '@/lib/constants/config';

export default function SubjectDetailPage() {
  const router = useRouter();
  const params = useParams();
  const subjectId = params.subjectId as string;
  const { user, getSubjectProgress, chapterProgress, isSubjectRewardUnlocked } = useEduka();

  const subjects = getSubjectsByLevel(user.educationLevel);
  const subject = subjects.find(s => s.id === subjectId) || subjects[0];

  if (!subject) {
    return (
      <div className="p-8 text-center">
        <p>Mata pelajaran tidak ditemukan.</p>
        <button onClick={() => router.push('/home')} className="mt-4 text-[#7C4DFF] font-bold">
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  const { completedCount, totalCount, percentage } = getSubjectProgress(subject.id);
  const rewardUnlocked = isSubjectRewardUnlocked(subject.id);

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

        <h1 className="font-extrabold text-base text-[#171525] truncate max-w-[200px]">
          {subject.name}
        </h1>

        <Link
          href="/rewards"
          className="w-10 h-10 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center text-[#7C4DFF] shadow-xs"
          title="Lihat Sertifikat"
        >
          <Award className="w-5 h-5" />
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 pt-3 pb-6 space-y-4">
        {/* Subject Hero Card */}
        <div
          className="p-5 rounded-[28px] border border-black/[0.04] shadow-xs relative overflow-hidden"
          style={{ backgroundColor: subject.color }}
        >
          <div className="relative z-10">
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/80 text-[11px] font-bold text-[#171525] mb-2">
              {subject.category} • 8 Bab
            </span>
            <h2 className="text-xl font-extrabold text-[#171525]">
              {subject.name}
            </h2>
            <p className="text-xs font-medium text-gray-700 mt-1 max-w-[280px]">
              {subject.description}
            </p>

            {/* Progress status */}
            <div className="mt-4 pt-3 border-t border-black/[0.06] flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold text-gray-700">
                  {completedCount} dari {totalCount} Bab Tuntas (≥ 80%)
                </span>
                <div className="w-48 bg-white/80 rounded-full h-2 mt-1 overflow-hidden">
                  <div
                    className="h-full bg-[#7C4DFF] rounded-full"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>

              <div className="text-right">
                <span className="text-xl font-extrabold text-[#7C4DFF]">
                  {percentage}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 80% Rule Notice */}
        <div className="p-3.5 rounded-2xl bg-white border border-black/[0.04] shadow-2xs flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#E9D9FF] flex items-center justify-center text-[#7C4DFF] shrink-0">
            <Award className="w-4 h-4" />
          </div>
          <div className="text-[11px] font-medium text-gray-600 leading-tight">
            <span className="font-bold text-[#171525]">Aturan Kelulusan 80%: </span>
            Bab dianggap tuntas bila skor kuis ≥ 80%. Reward sertifikat terkunci jika ada bab &lt; 80%.
          </div>
        </div>

        {/* Exactly BAB 1 to BAB 8 List */}
        <div className="space-y-2.5">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">
            Daftar Bab Kurikulum (BAB 1 — BAB 8)
          </h3>

          {subject.chapters.map((chapter) => {
            const prog = chapterProgress[chapter.id];
            const hasAttempted = !!prog;
            const score = prog?.bestScore || 0;
            const isCompleted = score >= APP_CONFIG.passingScore;

            return (
              <div
                key={chapter.id}
                className={`p-4 rounded-[24px] bg-white border transition-all ${
                  isCompleted
                    ? 'border-[#10B981]/30 shadow-2xs'
                    : hasAttempted
                    ? 'border-[#F59E0B]/30'
                    : 'border-black/[0.04]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    {/* Chapter Number Badge / Completion Check */}
                    <div
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 font-extrabold text-xs ${
                        isCompleted
                          ? 'bg-[#10B981] text-white shadow-xs'
                          : hasAttempted
                          ? 'bg-[#FEF3C7] text-[#D97706]'
                          : 'bg-[#F3F4F6] text-gray-600'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : `B${chapter.chapterNumber}`}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                          BAB {chapter.chapterNumber}
                        </span>
                        {hasAttempted && (
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              isCompleted
                                ? 'bg-[#D1FAE5] text-[#065F46]'
                                : 'bg-[#FEF3C7] text-[#92400E]'
                            }`}
                          >
                            Skor: {score}% {isCompleted ? '✓ Tuntas' : '⚠️ Perlu Diulang'}
                          </span>
                        )}
                      </div>

                      <h4 className="font-bold text-[14px] text-[#171525] truncate mt-0.5">
                        {chapter.title}
                      </h4>

                      <p className="text-[11px] text-gray-500 font-medium truncate mt-0.5">
                        {chapter.subtitle}
                      </p>

                      <div className="flex items-center gap-3 text-[11px] text-gray-400 font-medium mt-2">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" /> {chapter.readingDurationMinutes} menit
                        </span>
                        <span className="flex items-center gap-1">
                          <HelpCircle className="w-3 h-3" /> 5 Soal Kuis
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Action CTA */}
                  <div className="shrink-0 flex flex-col items-end gap-1.5">
                    <Link
                      href={`/chapters/${chapter.id}`}
                      className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center gap-1 active:scale-95 transition-all shadow-xs ${
                        isCompleted
                          ? 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          : 'bg-[#7C4DFF] hover:bg-[#6D3DF0] text-white'
                      }`}
                    >
                      <span>{isCompleted ? 'Review' : hasAttempted ? 'Ulangi' : 'Mulai'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
