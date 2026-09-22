'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ChevronLeft,
  User,
  Heart,
  Award,
  Settings,
  HelpCircle,
  LogOut,
  GraduationCap,
  Sparkles,
  Edit2,
  Check,
  RotateCcw
} from 'lucide-react';
import { BottomNavigation } from '@/components/layout/BottomNavigation';
import { useEduka } from '@/hooks/useEdukaStore';
import { APP_CONFIG, EducationLevelId } from '@/lib/constants/config';
import { formatSeconds } from '@/lib/utils/quizUtils';

export default function ProfilePage() {
  const router = useRouter();
  const { user, updateUser, hearts, secondsUntilNextHeart, refillHearts, resetDemoData } = useEduka();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user.name);
  const [level, setLevel] = useState<EducationLevelId>(user.educationLevel);
  const [gradeSemester, setGradeSemester] = useState(user.gradeSemester);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({ name, educationLevel: level, gradeSemester });
    setIsEditing(false);
    alert('Profil berhasil diperbarui!');
  };

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
          Profil Pelajar
        </h1>

        <button
          onClick={() => setIsEditing(!isEditing)}
          className="w-10 h-10 rounded-2xl bg-white border border-black/[0.06] flex items-center justify-center text-[#7C4DFF] shadow-xs active:scale-95 transition-transform"
          aria-label="Ubah Profil"
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 pt-3 pb-8 space-y-4">
        {/* User Card */}
        <div className="p-5 rounded-[28px] bg-white border border-black/[0.04] shadow-xs flex flex-col items-center text-center">
          <div className="relative mb-3">
            <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#7C4DFF] to-[#F6B6D8] p-1 shadow-md">
              <div className="w-full h-full rounded-full bg-white flex items-center justify-center text-[#7C4DFF] overflow-hidden">
                <User className="w-10 h-10" />
              </div>
            </div>
            <span className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#10B981] ring-2 ring-white flex items-center justify-center text-[10px] text-white font-bold">
              ✓
            </span>
          </div>

          <h2 className="text-xl font-extrabold text-[#171525]">
            {user.name}
          </h2>
          <p className="text-xs font-semibold text-gray-400 mt-0.5">
            {user.email}
          </p>

          <div className="flex items-center gap-2 mt-3">
            <span className="px-3 py-1 rounded-full bg-[#E9D9FF] text-[#7C4DFF] text-xs font-extrabold flex items-center gap-1">
              <GraduationCap className="w-3.5 h-3.5" />
              {user.educationLevel} • {user.gradeSemester}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#BFEBD7] text-[#065F46] text-xs font-extrabold">
              Active Member
            </span>
          </div>
        </div>

        {/* Heart Management Card */}
        <div className="p-5 rounded-[28px] bg-white border border-black/[0.04] shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-[#FF5A79] fill-[#FF5A79]" />
              <h3 className="font-extrabold text-sm text-[#171525]">Status Nyawa Belajar (Hati)</h3>
            </div>
            <span className="text-xs font-black text-[#171525]">{hearts.current} / 5</span>
          </div>

          {/* Heart symbols */}
          <div className="flex items-center gap-2 my-2">
            {[1, 2, 3, 4, 5].map(h => (
              <div
                key={h}
                className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-all ${
                  h <= hearts.current
                    ? 'bg-[#FFE4E8] text-[#FF5A79]'
                    : 'bg-gray-100 text-gray-300'
                }`}
              >
                <Heart className={`w-5 h-5 ${h <= hearts.current ? 'fill-[#FF5A79]' : ''}`} />
              </div>
            ))}
          </div>

          <div className="text-[11px] text-gray-500 font-medium mt-2 leading-relaxed">
            {hearts.current < 5 ? (
              <p>
                1 hati pulih otomatis setiap 1 menit. Pulih berikutnya dalam: <span className="font-mono font-bold text-[#7C4DFF]">{formatSeconds(secondsUntilNextHeart)}</span>
              </p>
            ) : (
              <p className="text-[#10B981] font-semibold">
                ✓ Nyawa belajar penuh (5/5). Siap untuk evaluasi kuis!
              </p>
            )}
          </div>

          {hearts.current < 5 && (
            <button
              onClick={() => refillHearts()}
              className="w-full mt-3 py-2.5 rounded-xl bg-[#E9D9FF] hover:bg-[#d8c0fc] text-[#7C4DFF] text-xs font-bold transition-all"
            >
              Isi Ulang 5 Hati Instan
            </button>
          )}
        </div>

        {/* Edit Profile Form Modal */}
        {isEditing && (
          <div className="p-5 rounded-[28px] bg-white border-2 border-[#7C4DFF]/30 shadow-md">
            <h3 className="text-sm font-extrabold text-[#171525] mb-3">Edit Biodata Pelajar</h3>
            <form onSubmit={handleSaveProfile} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">Nama Lengkap:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">Jenjang Pendidikan:</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value as EducationLevelId)}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold"
                >
                  {APP_CONFIG.levels.map(l => (
                    <option key={l.id} value={l.id}>{l.name} ({l.shortName})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 block mb-1">Kelas / Semester:</label>
                <input
                  type="text"
                  value={gradeSemester}
                  onChange={(e) => setGradeSemester(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-200 text-xs font-bold"
                  required
                />
              </div>

              <div className="flex gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-2.5 rounded-xl bg-gray-100 text-xs font-bold text-gray-600"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-[#7C4DFF] text-white text-xs font-bold shadow-xs"
                >
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Menu Links */}
        <div className="p-3 rounded-[28px] bg-white border border-black/[0.04] shadow-xs space-y-1">
          <Link
            href="/rewards"
            className="flex items-center justify-between p-3 rounded-2xl hover:bg-black/[0.03] transition-colors"
          >
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-[#7C4DFF]" />
              <span className="text-xs font-bold text-gray-700">Sertifikat & Hadiah Kelulusan</span>
            </div>
            <span className="text-xs text-gray-400">›</span>
          </Link>

          <Link
            href="/notifications"
            className="flex items-center justify-between p-3 rounded-2xl hover:bg-black/[0.03] transition-colors"
          >
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-gray-500" />
              <span className="text-xs font-bold text-gray-700">Pengaturan & Notifikasi</span>
            </div>
            <span className="text-xs text-gray-400">›</span>
          </Link>

          <button
            onClick={() => {
              if (confirm('Atur ulang seluruh data simulasi belajar ke kondisi awal?')) {
                resetDemoData();
                alert('Data demo berhasil direset.');
              }
            }}
            className="w-full flex items-center justify-between p-3 rounded-2xl hover:bg-black/[0.03] transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <RotateCcw className="w-5 h-5 text-gray-500" />
              <span className="text-xs font-bold text-gray-700">Reset Data Demo Belajar</span>
            </div>
            <span className="text-xs text-gray-400">›</span>
          </button>

          <Link
            href="/login"
            className="flex items-center justify-between p-3 rounded-2xl hover:bg-red-50 text-red-600 transition-colors"
          >
            <div className="flex items-center gap-3">
              <LogOut className="w-5 h-5" />
              <span className="text-xs font-bold">Keluar Akun (Logout)</span>
            </div>
            <span className="text-xs text-red-400">›</span>
          </Link>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
