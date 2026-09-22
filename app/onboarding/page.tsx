'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowRight, Sparkles, Check } from 'lucide-react';
import { APP_CONFIG, EducationLevelId } from '@/lib/constants/config';
import { OnboardingIllustration } from '@/components/illustrations/EducationalIllustrations';
import { useEduka } from '@/hooks/useEdukaStore';

export default function OnboardingPage() {
  const router = useRouter();
  const { setEducationLevel, user } = useEduka();
  const [currentStep, setCurrentStep] = useState(0);
  const [showLevelPicker, setShowLevelPicker] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<EducationLevelId>(user.educationLevel || 'SMA');

  const onboardingSlides = [
    {
      title: APP_CONFIG.name,
      subtitle: 'Belajar lebih terarah.\nTumbuh setiap hari.',
      highlight: 'Sistem 8 Bab & 80% Mastery',
    },
    {
      title: 'Active Recall & Spaced Repetition',
      subtitle: 'Tingkatkan retensi memori dengan kuis cerdas dan smart flashcards.',
      highlight: 'Metode Pembelajaran Terbukti',
    },
    {
      title: 'Study Planner & Target Harian',
      subtitle: 'Bangun konsistensi dengan streak belajar dan timer fokus Pomodoro.',
      highlight: 'Pantau Progres Nyata',
    },
    {
      title: 'Sertifikat & Hadiah Belajar',
      subtitle: 'Tuntaskan seluruh 8 bab dengan nilai ≥ 80% untuk membuka reward.',
      highlight: 'Apresiasi Pencapaianmu',
    },
  ];

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowLevelPicker(true);
    }
  };

  const handleStartLearning = () => {
    setEducationLevel(selectedLevel);
    router.push('/home');
  };

  return (
    <main className="w-full min-h-screen bg-gradient-to-b from-[#FDFBF7] via-[#F8EEFF] to-[#FFEBE5] flex flex-col justify-between p-6 relative overflow-hidden">
      {/* Decorative ambient blobs */}
      <div className="absolute -top-16 -left-16 w-52 h-52 rounded-full bg-[#E9D9FF] opacity-60 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-60 h-60 rounded-full bg-[#FFD1C1] opacity-50 blur-3xl pointer-events-none" />

      {/* Top Header Row with Skip button */}
      <div className="w-full flex items-center justify-between pt-2 z-10">
        <div className="flex items-center gap-1.5">
          <div className="w-7 h-7 rounded-xl bg-[#7C4DFF] flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="font-extrabold text-lg tracking-tight text-[#171525]">
            {APP_CONFIG.name}
          </span>
        </div>

        <button
          onClick={() => setShowLevelPicker(true)}
          className="text-xs font-bold text-gray-500 hover:text-[#7C4DFF] px-2.5 py-1 rounded-full hover:bg-black/[0.04] transition-colors"
        >
          Lewati
        </button>
      </div>

      {/* Center Illustration Area */}
      <div className="my-auto py-4 flex flex-col items-center justify-center z-10">
        <OnboardingIllustration className="w-full" />

        {/* Text Content */}
        <div className="text-center mt-6 px-2">
          {currentStep === 0 ? (
            <>
              <h1 className="text-3xl font-extrabold tracking-tight text-[#171525] mb-2">
                {APP_CONFIG.name}
              </h1>
              <p className="text-base font-medium text-gray-600 leading-snug whitespace-pre-line max-w-[280px] mx-auto">
                {onboardingSlides[0].subtitle}
              </p>
            </>
          ) : (
            <>
              <span className="inline-block px-3 py-1 rounded-full bg-[#E9D9FF] text-[#7C4DFF] text-[11px] font-bold mb-2">
                {onboardingSlides[currentStep].highlight}
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight text-[#171525] mb-2">
                {onboardingSlides[currentStep].title}
              </h2>
              <p className="text-sm font-medium text-gray-600 leading-snug max-w-[290px] mx-auto">
                {onboardingSlides[currentStep].subtitle}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Bottom Area: Pagination Dots & CTAs */}
      <div className="w-full flex flex-col items-center gap-5 pb-safe z-10">
        {/* Pagination Dots (4 dots, active dot becomes elongated capsule) */}
        <div className="flex items-center gap-2" aria-label="Pagination Indikator">
          {[0, 1, 2, 3].map((idx) => {
            const isActive = currentStep === idx;
            return (
              <button
                key={idx}
                onClick={() => setCurrentStep(idx)}
                aria-label={`Ke slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? 'w-7 h-2.5 bg-[#7C4DFF]'
                    : 'w-2.5 h-2.5 bg-gray-300 hover:bg-gray-400'
                }`}
              />
            );
          })}
        </div>

        {/* Primary & Secondary CTA */}
        <div className="w-full flex flex-col gap-2.5">
          <button
            id="btn-onboarding-start"
            onClick={handleNext}
            className="w-full py-4 rounded-[22px] bg-[#7C4DFF] hover:bg-[#6D3DF0] text-white font-extrabold text-[15px] shadow-[0_8px_20px_rgba(124,77,255,0.25)] flex items-center justify-center gap-2 active:scale-98 transition-all"
          >
            <span>{currentStep === 3 ? 'Pilih Jenjang & Mulai' : 'Mulai Belajar'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <Link
            id="btn-onboarding-login"
            href="/login"
            className="w-full py-2.5 text-center text-xs font-bold text-gray-600 hover:text-[#7C4DFF] transition-colors"
          >
            Sudah punya akun? <span className="text-[#7C4DFF] underline">Masuk</span>
          </Link>
        </div>
      </div>

      {/* Education Level Selection Modal (SD, SMP, SMA, SMK, KULIAH) */}
      {showLevelPicker && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
          <div className="w-full max-w-[380px] bg-white rounded-[32px] p-6 shadow-2xl border border-black/[0.04] animate-in fade-in zoom-in-95">
            <h3 className="text-xl font-extrabold text-[#171525] text-center mb-1">
              Pilih Jenjang Pendidikanmu
            </h3>
            <p className="text-xs text-gray-500 font-medium text-center mb-5">
              Setiap mata pelajaran memiliki 8 Bab lengkap siap dipelajari.
            </p>

            <div className="space-y-2 mb-6">
              {APP_CONFIG.levels.map((lvl) => {
                const isSelected = selectedLevel === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    onClick={() => setSelectedLevel(lvl.id as EducationLevelId)}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-[#7C4DFF] bg-[#F5F0FF] shadow-xs'
                        : 'border-black/[0.06] bg-gray-50/50 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{lvl.icon}</span>
                      <div>
                        <div className="text-sm font-extrabold text-[#171525]">
                          {lvl.name} ({lvl.shortName})
                        </div>
                        <div className="text-[11px] text-gray-500 font-medium">
                          {lvl.grades}
                        </div>
                      </div>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-[#7C4DFF] text-white flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleStartLearning}
              className="w-full py-3.5 rounded-2xl bg-[#7C4DFF] hover:bg-[#6D3DF0] text-white font-extrabold text-sm shadow-md active:scale-98 transition-all"
            >
              Mulai Belajar di {selectedLevel}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
