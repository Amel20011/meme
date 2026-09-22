'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Bookmark,
  MoreVertical,
  PlusCircle,
  Repeat,
  TrendingUp,
  Smile,
  ArrowRight,
  RotateCw,
  CheckCircle2,
  HelpCircle,
  X
} from 'lucide-react';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { FlashcardsHeroIllustration } from '@/components/illustrations/EducationalIllustrations';
import { useEduka } from '@/hooks/useEdukaStore';

export default function FlashcardsPage() {
  const router = useRouter();
  const { flashcards, updateFlashcardStatus } = useEduka();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const features = [
    {
      title: 'Create & Customize',
      desc: 'Buat kartu belajar mandiri sesuai rumus atau topik yang ingin kamu ingat.',
      icon: PlusCircle,
      bgColor: '#E9D9FF',
      iconColor: '#7C4DFF',
    },
    {
      title: 'Spaced Repetition',
      desc: 'Pengulangan berjeda otomatis untuk memindahkan memori jangka pendek ke jangka panjang.',
      icon: Repeat,
      bgColor: '#BFDFFF',
      iconColor: '#2563EB',
    },
    {
      title: 'Track & Improve',
      desc: 'Pantau kartu yang sudah dikuasai dan kartu yang masih memerlukan pengulangan.',
      icon: TrendingUp,
      bgColor: '#BFEBD7',
      iconColor: '#059669',
    },
    {
      title: 'Fun & Engaging',
      desc: 'Interaksi membalik kartu dengan visual yang nyaman dipandang.',
      icon: Smile,
      bgColor: '#FFD1C1',
      iconColor: '#EA580C',
    },
  ];

  const currentCard = flashcards[currentIndex] || flashcards[0];

  const handleNextCard = (status: 'learning' | 'mastered') => {
    if (currentCard) {
      updateFlashcardStatus(currentCard.id, status);
    }
    setIsFlipped(false);
    setShowHint(false);
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      // Completed round
      alert('🎉 Hebat! Kamu telah menyelesaikan seluruh set kartu flashcard ini!');
      setSessionActive(false);
      setCurrentIndex(0);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between min-h-screen bg-[#F6F9FE]">
      {/* Top Navigation Bar: Back, Bookmark, More */}
      <header className="sticky top-0 z-40 w-full px-5 pt-3.5 pb-2.5 flex items-center justify-between">
        <button
          id="btn-flashcards-back"
          onClick={() => router.back()}
          className="w-10 h-10 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center text-[#171525] shadow-xs active:scale-95 transition-transform"
          aria-label="Kembali"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
          Smart Flashcards
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
            onClick={() => alert('Pilihan: Tambah kartu baru atau impor deck materi.')}
            className="w-10 h-10 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center text-[#171525] shadow-xs active:scale-95 transition-transform"
            aria-label="Opsi Lainnya"
          >
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 px-5 pt-1 pb-6 space-y-4">
        {/* Hero Stacked Flashcards Illustration */}
        <div className="py-2">
          <FlashcardsHeroIllustration />
        </div>

        {/* Main White Card */}
        <div className="w-full bg-white rounded-[32px] p-6 shadow-[0_4px_30px_rgba(124,77,255,0.08)] border border-black/[0.04]">
          <h1 className="text-2xl font-extrabold tracking-tight text-[#171525] mb-1 text-center">
            Smart Flashcards
          </h1>
          <p className="text-xs font-medium text-gray-500 leading-relaxed text-center mb-6 max-w-[280px] mx-auto">
            Pelajari materi lebih cepat dengan active recall dan spaced repetition.
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
            id="btn-flashcards-start"
            onClick={() => setSessionActive(true)}
            className="w-full py-4 rounded-[22px] bg-[#7C4DFF] hover:bg-[#6D3DF0] text-white font-extrabold text-[15px] shadow-[0_8px_20px_rgba(124,77,255,0.25)] flex items-center justify-center gap-2 active:scale-98 transition-all"
          >
            <span>Mulai Flashcards</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>

      {/* Interactive Active Recall Flashcard Study Session Modal */}
      {sessionActive && currentCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="w-full max-w-[400px] bg-white rounded-[32px] p-6 shadow-2xl border border-black/[0.06] flex flex-col animate-in fade-in zoom-in-95">
            {/* Header with counter */}
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.04]">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#E9D9FF] text-[#7C4DFF] text-[11px] font-bold">
                  {currentCard.subjectName}
                </span>
                <span className="text-xs font-bold text-gray-400">
                  {currentIndex + 1} dari {flashcards.length}
                </span>
              </div>
              <button
                onClick={() => setSessionActive(false)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Flip Flashcard Box */}
            <div
              onClick={() => setIsFlipped(!isFlipped)}
              className="my-5 min-h-[220px] p-6 rounded-[26px] bg-gradient-to-br from-white to-[#F9F7FD] border-2 border-[#E9D9FF] shadow-sm flex flex-col justify-between cursor-pointer transition-all hover:border-[#7C4DFF] group relative select-none"
            >
              <div className="flex items-center justify-between text-[11px] font-semibold text-gray-400">
                <span>{isFlipped ? '💡 Jawaban / Penjelasan' : '❓ Pertanyaan / Konsep'}</span>
                <span className="flex items-center gap-1 text-[#7C4DFF]">
                  <RotateCw className="w-3.5 h-3.5 transition-transform group-hover:rotate-180" />
                  Ketuk untuk balik
                </span>
              </div>

              <div className="my-auto py-2">
                <p className="text-base font-bold text-[#171525] leading-relaxed whitespace-pre-line text-center">
                  {isFlipped ? currentCard.back : currentCard.front}
                </p>
              </div>

              {/* Hint section */}
              {currentCard.hint && !isFlipped && (
                <div className="pt-2 text-center">
                  {showHint ? (
                    <span className="text-[11px] text-amber-600 bg-amber-50 px-2 py-1 rounded-md">
                      Petunjuk: {currentCard.hint}
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowHint(true);
                      }}
                      className="text-[11px] text-gray-400 hover:text-gray-600 flex items-center gap-1 mx-auto"
                    >
                      <HelpCircle className="w-3.5 h-3.5" />
                      Tampilkan Petunjuk
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Action Buttons: Repeat or Mastered */}
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleNextCard('learning')}
                className="py-3 px-4 rounded-2xl bg-[#FFD1C1]/60 hover:bg-[#FFD1C1] text-[#9A3412] font-bold text-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Repeat className="w-4 h-4" />
                <span>Perlu Diulang</span>
              </button>

              <button
                onClick={() => handleNextCard('mastered')}
                className="py-3 px-4 rounded-2xl bg-[#7C4DFF] hover:bg-[#6D3DF0] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs active:scale-95 transition-all"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Sudah Hafal</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
