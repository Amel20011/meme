'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import confetti from 'canvas-confetti';
import {
  ChevronLeft,
  Heart,
  HelpCircle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  RotateCcw,
  Award,
  Sparkles,
  AlertTriangle
} from 'lucide-react';
import { useEduka } from '@/hooks/useEdukaStore';
import { getSubjectsByLevel } from '@/lib/data/educationData';
import { APP_CONFIG } from '@/lib/constants/config';
import { formatSeconds } from '@/lib/utils/quizUtils';

export default function QuizEnginePage() {
  const router = useRouter();
  const params = useParams();
  const chapterId = params.quizId as string;
  const { user, recordQuizResult, refillHearts, deductHeart, hearts, secondsUntilNextHeart } = useEduka();

  // Find target chapter
  const subjects = getSubjectsByLevel(user.educationLevel);
  let targetChapter = subjects[0]?.chapters[0];
  let targetSubject = subjects[0];

  for (const sub of subjects) {
    const ch = sub.chapters.find(c => c.id === chapterId);
    if (ch) {
      targetSubject = sub;
      targetChapter = ch;
      break;
    }
  }

  const questions = targetChapter?.sampleQuestions || [];

  // Quiz active state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);

  // If no questions found
  if (questions.length === 0) {
    return (
      <div className="p-8 text-center min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7]">
        <HelpCircle className="w-12 h-12 text-gray-400 mb-2" />
        <h2 className="font-extrabold text-lg text-[#171525]">Kuis tidak ditemukan</h2>
        <button
          onClick={() => router.push('/home')}
          className="mt-4 px-5 py-2.5 rounded-2xl bg-[#7C4DFF] text-white font-bold text-xs"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  // If hearts are empty and quiz is not yet finished
  if (hearts.current <= 0 && !isFinished) {
    return (
      <div className="p-8 text-center min-h-screen flex flex-col items-center justify-center bg-[#FDFBF7]">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-red-500 mb-4 animate-bounce">
          <Heart className="w-8 h-8 fill-red-500" />
        </div>
        <h2 className="text-xl font-extrabold text-[#171525] mb-1">
          Nyawa Belajar Habis (0/5)
        </h2>
        <p className="text-xs text-gray-500 font-medium max-w-[280px] mb-4">
          Kamu membutuhkan minimal 1 hati untuk mengerjakan kuis. 1 hati pulih setiap 1 menit.
        </p>

        <div className="p-3 rounded-2xl bg-white border border-black/[0.06] shadow-2xs mb-6 font-mono text-sm font-bold text-[#7C4DFF]">
          Pulih dalam: {formatSeconds(secondsUntilNextHeart)}
        </div>

        <div className="flex flex-col gap-2 w-full max-w-[280px]">
          <button
            onClick={() => refillHearts()}
            className="w-full py-3.5 rounded-2xl bg-[#7C4DFF] hover:bg-[#6D3DF0] text-white font-bold text-xs shadow-md"
          >
            Isi Ulang 5 Hati (Instan)
          </button>
          <button
            onClick={() => router.back()}
            className="w-full py-3 text-gray-600 font-semibold text-xs hover:text-black"
          >
            Kembali ke Materi
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];
  const isCorrect = selectedOption === currentQ.correctAnswer;

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedOption(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsAnswerSubmitted(true);
    setAnswers(prev => ({ ...prev, [currentIndex]: selectedOption }));

    if (selectedOption !== currentQ.correctAnswer) {
      // Deduct 1 heart
      deductHeart();
    }
  };

  const handleNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      // Calculate final score
      let correctCount = 0;
      questions.forEach((q, idx) => {
        if (answers[idx] === q.correctAnswer) {
          correctCount++;
        }
      });
      // Include current question if submitted
      if (selectedOption === currentQ.correctAnswer) {
        correctCount++;
      }

      const scorePercent = Math.round((correctCount / questions.length) * 100);
      const passed = scorePercent >= APP_CONFIG.passingScore;

      recordQuizResult({
        chapterId: targetChapter.id,
        subjectId: targetSubject.id,
        chapterTitle: targetChapter.title,
        subjectName: targetSubject.name,
        score: scorePercent,
        passed,
        totalQuestions: questions.length,
        correctAnswers: correctCount,
      });

      setIsFinished(true);

      // Trigger Confetti celebration if 80% passing grade achieved!
      if (passed) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#7C4DFF', '#F6B6D8', '#BFEBD7', '#FFB86B'],
          });
        } catch {
          // ignore
        }
      }
    }
  };

  // ================= RESULTS SCREEN =================
  if (isFinished) {
    let correctCount = 0;
    questions.forEach((q, idx) => {
      if (answers[idx] === q.correctAnswer) correctCount++;
    });
    const finalScore = Math.round((correctCount / questions.length) * 100);
    const passed = finalScore >= APP_CONFIG.passingScore;

    return (
      <div className="flex-1 flex flex-col justify-between min-h-screen bg-[#FDFBF7] p-5">
        <header className="pt-2 flex items-center justify-between">
          <button
            onClick={() => router.push(`/subjects/${targetSubject.id}`)}
            className="w-10 h-10 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center text-[#171525] shadow-xs"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold text-gray-400">Hasil Evaluasi Bab</span>
          <div className="w-10" />
        </header>

        <div className="my-auto py-6 flex flex-col items-center text-center">
          {/* Result Trophy / Badge */}
          <div
            className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg mb-4 ${
              passed ? 'bg-[#10B981]/15 text-[#10B981]' : 'bg-[#F59E0B]/15 text-[#F59E0B]'
            }`}
          >
            {passed ? <Award className="w-12 h-12" /> : <AlertTriangle className="w-12 h-12" />}
          </div>

          <span
            className={`px-3 py-1 rounded-full text-xs font-extrabold mb-2 ${
              passed ? 'bg-[#D1FAE5] text-[#065F46]' : 'bg-[#FEF3C7] text-[#92400E]'
            }`}
          >
            {passed ? '✓ MEMENUHI ATURAN KELULUSAN 80%' : '⚠️ BELUM MEMENUHI SYARAT KELULUSAN'}
          </span>

          <h2 className="text-3xl font-extrabold tracking-tight text-[#171525] mb-1">
            Skor Kuis: {finalScore}%
          </h2>

          <p className="text-xs text-gray-500 font-medium max-w-[280px] leading-relaxed mb-6">
            {passed
              ? `Luar biasa! Kamu menjawab ${correctCount} dari ${questions.length} soal dengan tepat. Status bab ini sekarang tuntas.`
              : `Kamu baru menjawab ${correctCount} dari ${questions.length} soal. Minimal nilai kelulusan adalah ${APP_CONFIG.passingScore}% untuk membuka hadiah bab.`}
          </p>

          {/* Score Stats Summary Box */}
          <div className="w-full max-w-[340px] p-4 rounded-2xl bg-white border border-black/[0.04] shadow-xs space-y-2 mb-6 text-left">
            <div className="flex items-center justify-between text-xs font-bold text-gray-600">
              <span>Mata Pelajaran:</span>
              <span className="text-[#171525]">{targetSubject.name}</span>
            </div>
            <div className="flex items-center justify-between text-xs font-bold text-gray-600">
              <span>Bab Kurikulum:</span>
              <span className="text-[#171525]">BAB {targetChapter.chapterNumber}</span>
            </div>
            <div className="flex items-center justify-between text-xs font-bold text-gray-600">
              <span>Jawaban Benar:</span>
              <span className="text-[#10B981]">{correctCount} / {questions.length}</span>
            </div>
            <div className="flex items-center justify-between text-xs font-bold text-gray-600">
              <span>Sisa Nyawa (Hati):</span>
              <span className="text-[#FF5A79] flex items-center gap-1 font-mono">
                <Heart className="w-3.5 h-3.5 fill-[#FF5A79]" /> {hearts.current}/5
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full max-w-[340px] flex flex-col gap-2.5">
            {!passed ? (
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setSelectedOption(null);
                  setIsAnswerSubmitted(false);
                  setAnswers({});
                  setIsFinished(false);
                }}
                className="w-full py-4 rounded-[22px] bg-[#7C4DFF] hover:bg-[#6D3DF0] text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Ulangi Kuis Bab (Coba Lagi)</span>
              </button>
            ) : (
              <button
                onClick={() => router.push(`/subjects/${targetSubject.id}`)}
                className="w-full py-4 rounded-[22px] bg-[#7C4DFF] hover:bg-[#6D3DF0] text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all"
              >
                <span>Lanjutkan ke Bab Berikutnya</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => router.push('/rewards')}
              className="w-full py-2.5 text-xs font-bold text-[#7C4DFF] hover:underline"
            >
              Cek Status Sertifikat & Hadiah
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= ACTIVE QUESTION SCREEN =================
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="flex-1 flex flex-col justify-between min-h-screen bg-[#FDFBF7]">
      {/* Top Header with Heart Counter & Progress */}
      <header className="sticky top-0 z-40 w-full px-5 pt-3.5 pb-2.5 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-black/[0.04]">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={() => {
              if (confirm('Keluar dari sesi kuis? Progres sesi saat ini tidak akan tersimpan.')) {
                router.back();
              }
            }}
            className="w-10 h-10 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center text-[#171525] shadow-xs"
            aria-label="Tutup kuis"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Heart count with animated state */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-black/[0.06] shadow-xs">
            <Heart className={`w-4 h-4 ${hearts.current > 0 ? 'fill-[#FF5A79] text-[#FF5A79] animate-pulse' : 'text-gray-400'}`} />
            <span className="text-xs font-black text-[#171525]">{hearts.current}/5</span>
            {hearts.current < 5 && (
              <span className="text-[10px] text-gray-500 font-mono ml-1">
                ({formatSeconds(secondsUntilNextHeart)})
              </span>
            )}
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="flex items-center justify-between text-[11px] font-bold text-gray-400 mb-1.5">
          <span>Soal {currentIndex + 1} dari {questions.length}</span>
          <span>Target ≥ 80%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
          <div
            className="h-full bg-[#7C4DFF] rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* Main Question Body */}
      <main className="flex-1 px-5 pt-4 pb-28 space-y-4">
        {/* Question Text Card */}
        <div className="p-5 rounded-[26px] bg-white border border-black/[0.04] shadow-xs">
          <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#E9D9FF] text-[#7C4DFF] text-[10px] font-extrabold mb-2.5">
            BAB {targetChapter.chapterNumber} • SOAL {currentIndex + 1}
          </span>
          <h2 className="text-base font-bold text-[#171525] leading-relaxed">
            {currentQ.question}
          </h2>
        </div>

        {/* Options List */}
        <div className="space-y-2.5">
          {currentQ.options.map((option, idx) => {
            const letter = ['A', 'B', 'C', 'D'][idx];
            const isSelected = selectedOption === idx;

            // Feedback colors when answer is submitted
            let optionStyles = 'bg-white border-black/[0.06] text-gray-700 hover:bg-gray-50';
            if (isAnswerSubmitted) {
              if (idx === currentQ.correctAnswer) {
                optionStyles = 'bg-[#D1FAE5] border-[#10B981] text-[#065F46] font-bold shadow-xs';
              } else if (isSelected) {
                optionStyles = 'bg-[#FEE2E2] border-[#EF4444] text-[#991B1B] font-bold';
              } else {
                optionStyles = 'bg-gray-50 border-gray-200 text-gray-400 opacity-60';
              }
            } else if (isSelected) {
              optionStyles = 'bg-[#F4EFFF] border-[#7C4DFF] text-[#7C4DFF] font-bold shadow-xs';
            }

            return (
              <button
                key={idx}
                disabled={isAnswerSubmitted}
                onClick={() => handleSelectOption(idx)}
                className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all active:scale-98 ${optionStyles}`}
              >
                <div className="flex items-center gap-3 flex-1 pr-2">
                  <span
                    className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 ${
                      isSelected && !isAnswerSubmitted
                        ? 'bg-[#7C4DFF] text-white'
                        : 'bg-black/[0.04] text-gray-600'
                    }`}
                  >
                    {letter}
                  </span>
                  <span className="text-xs font-semibold leading-relaxed">
                    {option}
                  </span>
                </div>

                {isAnswerSubmitted && idx === currentQ.correctAnswer && (
                  <CheckCircle2 className="w-5 h-5 text-[#10B981] shrink-0" />
                )}
                {isAnswerSubmitted && isSelected && idx !== currentQ.correctAnswer && (
                  <XCircle className="w-5 h-5 text-[#EF4444] shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Card (Appears after submission) */}
        {isAnswerSubmitted && (
          <div
            className={`p-4 rounded-[22px] border animate-in fade-in duration-200 ${
              isCorrect
                ? 'bg-[#D1FAE5]/60 border-[#10B981]/30 text-[#065F46]'
                : 'bg-[#FEE2E2]/60 border-[#EF4444]/30 text-[#991B1B]'
            }`}
          >
            <div className="flex items-center gap-2 text-xs font-black mb-1">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Jawaban Tepat!</span>
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4" />
                  <span>Jawaban Kurang Tepat (-1 Hati)</span>
                </>
              )}
            </div>
            <p className="text-[11px] font-medium leading-relaxed mt-1">
              <span className="font-bold">Pembahasan: </span>
              {currentQ.explanation}
            </p>
          </div>
        )}
      </main>

      {/* Bottom Floating Control Bar */}
      <div className="fixed bottom-0 z-40 w-full max-w-[440px] px-5 py-3.5 bg-white/95 backdrop-blur-md border-t border-black/[0.04] shadow-lg">
        {!isAnswerSubmitted ? (
          <button
            id="btn-quiz-check"
            disabled={selectedOption === null}
            onClick={handleSubmitAnswer}
            className={`w-full py-4 rounded-[22px] font-extrabold text-[15px] flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 ${
              selectedOption !== null
                ? 'bg-[#7C4DFF] hover:bg-[#6D3DF0] text-white'
                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
            }`}
          >
            <span>Periksa Jawaban</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        ) : (
          <button
            id="btn-quiz-next"
            onClick={handleNextQuestion}
            className="w-full py-4 rounded-[22px] bg-[#7C4DFF] hover:bg-[#6D3DF0] text-white font-extrabold text-[15px] shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all"
          >
            <span>{currentIndex < questions.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Kuis'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
