'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  Award,
  Lock,
  Unlock,
  CheckCircle2,
  AlertCircle,
  Download,
  Share2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  GraduationCap
} from 'lucide-react';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { useEduka } from '@/hooks/useEdukaStore';
import { getSubjectsByLevel } from '@/lib/data/educationData';
import { APP_CONFIG } from '@/lib/constants/config';

export default function RewardsPage() {
  const router = useRouter();
  const { user, getSubjectProgress, isSubjectRewardUnlocked, chapterProgress } = useEduka();
  const subjects = getSubjectsByLevel(user.educationLevel);
  const [selectedCertificateSubject, setSelectedCertificateSubject] = useState<string | null>(null);

  const badges = [
    {
      id: 'streak-10',
      title: 'Konsistensi 10 Hari',
      desc: 'Belajar berturut-turut tanpa terputus',
      icon: '🔥',
      unlocked: true,
    },
    {
      id: 'mastery-first',
      title: 'First 80% Mastery',
      desc: 'Mencapai skor kuis ≥ 80% pertama kali',
      icon: '🎯',
      unlocked: true,
    },
    {
      id: 'flashcard-pro',
      title: 'Active Recall Pro',
      desc: 'Menghafal 20+ rumus pintar dengan flashcards',
      icon: '⚡',
      unlocked: false,
    },
    {
      id: 'grandmaster',
      title: 'Grandmaster Kurikulum',
      desc: 'Tuntaskan seluruh 8 bab di 3 mata pelajaran',
      icon: '👑',
      unlocked: false,
    },
  ];

  return (
    <div className="flex-1 flex flex-col justify-between min-h-screen bg-[#FDFBF7]">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full px-5 pt-3.5 pb-2.5 flex items-center justify-between bg-[#FDFBF7]/90 backdrop-blur-md border-b border-black/[0.04]">
        <button
          onClick={() => router.back()}
          className="w-10 h-10 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center text-[#171525] shadow-xs active:scale-95 transition-transform"
          aria-label="Kembali"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <h1 className="font-extrabold text-base text-[#171525]">
          Sertifikat & Hadiah Belajar
        </h1>

        <div className="w-10" />
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 pt-3 pb-8 space-y-6">
        {/* Strict 80% Rule Banner */}
        <div className="p-4 rounded-[26px] bg-gradient-to-r from-[#7C4DFF] to-[#9066FF] text-white shadow-md relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-5 h-5 text-[#F6B6D8]" />
              <span className="text-xs font-black tracking-wider uppercase">
                Standar Kelulusan 80%
              </span>
            </div>
            <h2 className="text-lg font-extrabold leading-tight">
              Sertifikat Keahlian 8 Bab
            </h2>
            <p className="text-xs text-white/80 font-medium leading-relaxed mt-1">
              Sertifikat resmi hanya terbuka jika <strong>seluruh Bab 1 hingga Bab 8</strong> berhasil diselesaikan dengan nilai kuis <strong>minimal 80%</strong>.
            </p>
          </div>
        </div>

        {/* Certificates Section */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">
            Sertifikat Mata Pelajaran ({user.educationLevel})
          </h3>

          {subjects.map((sub) => {
            const isUnlocked = isSubjectRewardUnlocked(sub.id);
            const { completedCount, totalCount, percentage } = getSubjectProgress(sub.id);

            // Find incomplete chapters (<80%)
            const incompleteChapters = sub.chapters.filter(ch => {
              const prog = chapterProgress[ch.id];
              return !prog || prog.bestScore < APP_CONFIG.passingScore;
            });

            return (
              <div
                key={sub.id}
                className={`p-5 rounded-[28px] border transition-all ${
                  isUnlocked
                    ? 'bg-white border-[#10B981]/40 shadow-xs'
                    : 'bg-white border-black/[0.05] shadow-2xs'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                        isUnlocked
                          ? 'bg-[#D1FAE5] text-[#10B981]'
                          : 'bg-gray-100 text-gray-400'
                      }`}
                    >
                      {isUnlocked ? <Unlock className="w-6 h-6" /> : <Lock className="w-6 h-6" />}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-extrabold text-[15px] text-[#171525] truncate">
                          Sertifikat {sub.name}
                        </h4>
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                            isUnlocked
                              ? 'bg-[#D1FAE5] text-[#065F46]'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {isUnlocked ? 'TERBUKA' : 'TERKUNCI'}
                        </span>
                      </div>

                      <p className="text-xs text-gray-500 font-medium mt-0.5">
                        {completedCount}/{totalCount} Bab Tuntas (≥80%)
                      </p>

                      <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isUnlocked ? 'bg-[#10B981]' : 'bg-[#7C4DFF]'
                          }`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Conditional state: Unlocked Certificate CTA vs Incomplete chapters warning */}
                {isUnlocked ? (
                  <div className="mt-4 pt-3.5 border-t border-black/[0.04] flex items-center justify-between">
                    <span className="text-[11px] font-bold text-[#10B981] flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Siap Dicetak & Diunduh
                    </span>
                    <button
                      onClick={() => setSelectedCertificateSubject(sub.name)}
                      className="py-1.5 px-3 rounded-xl bg-[#10B981] text-white text-xs font-bold shadow-xs hover:bg-[#059669] active:scale-95 transition-all"
                    >
                      Lihat Sertifikat
                    </button>
                  </div>
                ) : (
                  <div className="mt-4 pt-3.5 border-t border-black/[0.04] space-y-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#D97706]">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{incompleteChapters.length} Bab belum memenuhi nilai 80%:</span>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      {incompleteChapters.slice(0, 4).map(ch => (
                        <Link
                          key={ch.id}
                          href={`/chapters/${ch.id}`}
                          className="px-2.5 py-1 rounded-lg bg-gray-50 hover:bg-[#E9D9FF] text-[10px] font-bold text-gray-700 hover:text-[#7C4DFF] border border-black/[0.04] flex items-center gap-1"
                        >
                          <span>B{ch.chapterNumber}: {ch.title.split(':')[0]}</span>
                          <ArrowRight className="w-2.5 h-2.5 opacity-60" />
                        </Link>
                      ))}
                      {incompleteChapters.length > 4 && (
                        <span className="text-[10px] text-gray-400 self-center">
                          +{incompleteChapters.length - 4} lainnya
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Achievement Badges */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider px-1">
            Lencana Pencapaian
          </h3>

          <div className="grid grid-cols-2 gap-2.5">
            {badges.map((b) => (
              <div
                key={b.id}
                className={`p-3.5 rounded-[22px] border transition-all ${
                  b.unlocked
                    ? 'bg-white border-black/[0.04] shadow-xs'
                    : 'bg-gray-50/70 border-black/[0.03] opacity-60'
                }`}
              >
                <div className="text-2xl mb-1">{b.icon}</div>
                <h4 className="font-extrabold text-xs text-[#171525]">{b.title}</h4>
                <p className="text-[10px] text-gray-500 font-medium leading-tight mt-0.5">
                  {b.desc}
                </p>
                <span className="inline-block mt-2 text-[9px] font-extrabold uppercase tracking-wider text-[#7C4DFF]">
                  {b.unlocked ? '✓ Diraih' : '🔒 Terkunci'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Certificate Modal */}
      {selectedCertificateSubject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="w-full max-w-[390px] bg-white rounded-[32px] p-6 shadow-2xl border-4 border-[#E9D9FF] flex flex-col text-center animate-in fade-in zoom-in-95 relative">
            <div className="absolute top-4 right-4">
              <button
                onClick={() => setSelectedCertificateSubject(null)}
                className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-black font-bold"
              >
                ✕
              </button>
            </div>

            {/* Certificate Header */}
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <Sparkles className="w-5 h-5 text-[#7C4DFF]" />
              <span className="text-xs font-black tracking-widest uppercase text-[#7C4DFF]">
                {APP_CONFIG.name} CERTIFICATE OF MASTERY
              </span>
            </div>

            <h3 className="text-xl font-black text-[#171525] mt-1">
              Sertifikat Keahlian Kurikulum
            </h3>

            <p className="text-xs text-gray-400 mt-1">Diberikan secara resmi kepada:</p>
            <div className="text-lg font-black text-[#7C4DFF] py-2 border-b border-black/[0.08] mb-3">
              {user.name}
            </div>

            <p className="text-xs text-gray-600 font-medium leading-relaxed mb-4">
              Telah berhasil menyelesaikan seluruh <strong>8 Bab</strong> materi dan kuis evaluasi <strong>{selectedCertificateSubject}</strong> jenjang <strong>{user.educationLevel}</strong> dengan standar nilai kelulusan di atas 80%.
            </p>

            <div className="p-3 rounded-2xl bg-gray-50 border border-black/[0.04] text-[11px] text-gray-500 font-medium mb-6 flex justify-between items-center">
              <span>Nomor Verifikasi:</span>
              <span className="font-mono font-bold text-gray-700">EDK-88294012</span>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={() => {
                  alert('🎉 Sertifikat berhasil diunduh ke perangkat Anda!');
                  setSelectedCertificateSubject(null);
                }}
                className="flex-1 py-3 rounded-2xl bg-[#7C4DFF] hover:bg-[#6D3DF0] text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-md"
              >
                <Download className="w-4 h-4" />
                <span>Unduh PDF</span>
              </button>

              <button
                onClick={() => {
                  alert('Tautan sertifikat disalin ke clipboard!');
                }}
                className="p-3 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold"
                title="Bagikan"
              >
                <Share2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      <BottomNavigation />
    </div>
  );
}
