'use client';

import React from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ChevronLeft,
  BookOpen,
  CheckCircle2,
  Clock,
  Lightbulb,
  ArrowRight,
  HelpCircle,
  Award
} from 'lucide-react';
import { useEduka } from '@/hooks/useEdukaStore';
import { getSubjectsByLevel } from '@/lib/data/educationData';
import { APP_CONFIG } from '@/lib/constants/config';

export default function ChapterDetailPage() {
  const router = useRouter();
  const params = useParams();
  const chapterId = params.chapterId as string;
  const { user, chapterProgress, canTakeQuiz, hearts } = useEduka();

  // Find chapter across subjects for current level
  const subjects = getSubjectsByLevel(user.educationLevel);
  let foundSubject = subjects[0];
  let foundChapter = subjects[0]?.chapters[0];

  for (const sub of subjects) {
    const ch = sub.chapters.find(c => c.id === chapterId);
    if (ch) {
      foundSubject = sub;
      foundChapter = ch;
      break;
    }
  }

  const prog = chapterProgress[foundChapter.id];
  const currentScore = prog?.bestScore || 0;
  const isCompleted = currentScore >= APP_CONFIG.passingScore;

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

        <span className="text-xs font-bold text-gray-500 truncate max-w-[200px]">
          {foundSubject.name} — BAB {foundChapter.chapterNumber}
        </span>

        <div className="w-10" />
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-5 pt-3 pb-24 space-y-4">
        {/* Title Block */}
        <div>
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#E9D9FF] text-[#7C4DFF] text-[11px] font-bold mb-2">
            BAB {foundChapter.chapterNumber} • {foundSubject.name}
          </span>
          <h1 className="text-2xl font-extrabold text-[#171525] leading-tight">
            {foundChapter.title}
          </h1>
          <p className="text-xs font-semibold text-gray-500 mt-1">
            {foundChapter.subtitle}
          </p>

          <div className="flex items-center gap-4 text-xs font-semibold text-gray-400 mt-3 pt-3 border-t border-black/[0.04]">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#7C4DFF]" />
              {foundChapter.readingDurationMinutes} Menit Membaca
            </span>
            <span className="flex items-center gap-1.5">
              <HelpCircle className="w-4 h-4 text-[#7C4DFF]" />
              5 Soal Evaluasi Kuis
            </span>
          </div>
        </div>

        {/* Current Score / Passing status if attempted */}
        {prog && (
          <div
            className={`p-4 rounded-2xl border flex items-center justify-between ${
              isCompleted
                ? 'bg-[#D1FAE5]/60 border-[#10B981]/30 text-[#065F46]'
                : 'bg-[#FEF3C7]/60 border-[#F59E0B]/30 text-[#92400E]'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {isCompleted ? <CheckCircle2 className="w-5 h-5" /> : <Award className="w-5 h-5" />}
              <div>
                <span className="text-xs font-bold block">
                  {isCompleted ? 'Bab Ini Telah Tuntas!' : 'Skor Belum Mencapai 80%'}
                </span>
                <span className="text-[11px] font-medium opacity-90">
                  Skor terbaik: {currentScore}% ({isCompleted ? 'Memenuhi syarat kelulusan' : 'Silakan ulangi kuis untuk membuka reward'})
                </span>
              </div>
            </div>
            <span className="text-lg font-black">{currentScore}%</span>
          </div>
        )}

        {/* Learning Material Card */}
        <section className="p-5 rounded-[26px] bg-white border border-black/[0.04] shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-sm font-extrabold text-[#171525]">
            <BookOpen className="w-4 h-4 text-[#7C4DFF]" />
            <span>Rangkuman Materi Utama</span>
          </div>
          <p className="text-xs text-gray-700 font-medium leading-relaxed">
            {foundChapter.summary}
          </p>
        </section>

        {/* Key Formulas & Tips */}
        <section className="p-5 rounded-[26px] bg-white border border-black/[0.04] shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-sm font-extrabold text-[#171525]">
            <Lightbulb className="w-4 h-4 text-[#F59E0B]" />
            <span>Poin Inti & Rumus Cepat</span>
          </div>
          <ul className="space-y-2">
            {foundChapter.keyPoints.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-gray-700 font-medium leading-relaxed">
                <span className="w-5 h-5 rounded-full bg-[#E9D9FF] text-[#7C4DFF] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>
      </main>

      {/* Fixed Bottom CTA to Start Chapter Quiz */}
      <div className="fixed bottom-0 z-40 w-full max-w-[440px] px-5 py-3.5 bg-white/95 backdrop-blur-md border-t border-black/[0.04] shadow-lg">
        <Link
          href={`/quiz/${foundChapter.id}`}
          className={`w-full py-4 rounded-[22px] font-extrabold text-[15px] flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 ${
            canTakeQuiz
              ? 'bg-[#7C4DFF] hover:bg-[#6D3DF0] text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          <span>{isCompleted ? 'Ulangi Kuis Bab Ini' : 'Mulai Kuis Bab (Target ≥ 80%)'}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
        {!canTakeQuiz && (
          <p className="text-[11px] text-center text-red-500 font-semibold mt-1.5">
            ❤️ Nyawa habis (0/5). Tunggu pemulihan timer atau isi ulang di menu drawer!
          </p>
        )}
      </div>
    </div>
  );
}
