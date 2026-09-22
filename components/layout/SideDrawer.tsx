'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  X,
  BookOpen,
  Award,
  Clock,
  Sparkles,
  RotateCcw,
  Heart,
  ChevronRight,
  GraduationCap
} from 'lucide-react';
import { APP_CONFIG, EducationLevelId } from '@/lib/constants/config';
import { useEduka } from '@/hooks/useEdukaStore';

interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SideDrawer({ isOpen, onClose }: SideDrawerProps) {
  const pathname = usePathname();
  const { user, setEducationLevel, refillHearts, resetDemoData, hearts } = useEduka();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center pointer-events-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Container (aligned to the 440px mobile frame) */}
      <div className="w-full max-w-[440px] h-full relative flex justify-start pointer-events-none">
        <div className="w-[300px] h-full bg-[#FDFBF7] shadow-2xl flex flex-col pointer-events-auto p-5 overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-black/[0.06]">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#7C4DFF] flex items-center justify-center text-white">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-base tracking-tight text-[#171525]">{APP_CONFIG.name}</h3>
                <p className="text-[11px] text-gray-500 font-medium">Navigasi Cepat</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-black/[0.05] flex items-center justify-center text-gray-500 hover:text-black"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Education Level Switcher */}
          <div className="mt-5">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Jenjang Pendidikan
            </label>
            <div className="grid grid-cols-2 gap-1.5">
              {APP_CONFIG.levels.map(lvl => {
                const isSelected = user.educationLevel === lvl.id;
                return (
                  <button
                    key={lvl.id}
                    onClick={() => {
                      setEducationLevel(lvl.id as EducationLevelId);
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold flex items-center gap-1.5 border transition-all ${
                      isSelected
                        ? 'bg-[#7C4DFF] text-white border-[#7C4DFF] shadow-xs'
                        : 'bg-white text-gray-700 border-black/[0.06] hover:bg-gray-50'
                    }`}
                  >
                    <span>{lvl.icon}</span>
                    <span>{lvl.shortName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="mt-6 flex-1 space-y-1">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Menu Utama
            </label>

            <Link
              href="/home"
              onClick={onClose}
              className={`flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition-colors ${
                pathname === '/home' ? 'bg-[#E9D9FF] text-[#7C4DFF]' : 'text-gray-700 hover:bg-black/[0.03]'
              }`}
            >
              <div className="flex items-center gap-3">
                <BookOpen className="w-4 h-4" />
                <span>Beranda & Mata Pelajaran</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-40" />
            </Link>

            <Link
              href="/subjects"
              onClick={onClose}
              className={`flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition-colors ${
                pathname === '/subjects' ? 'bg-[#E9D9FF] text-[#7C4DFF]' : 'text-gray-700 hover:bg-black/[0.03]'
              }`}
            >
              <div className="flex items-center gap-3">
                <GraduationCap className="w-4 h-4" />
                <span>Semua 8 Bab Materi</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-40" />
            </Link>

            <Link
              href="/rewards"
              onClick={onClose}
              className={`flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition-colors ${
                pathname === '/rewards' ? 'bg-[#E9D9FF] text-[#7C4DFF]' : 'text-gray-700 hover:bg-black/[0.03]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Award className="w-4 h-4" />
                <span>Sertifikat & Hadiah (Aturan 80%)</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-40" />
            </Link>

            <Link
              href="/notifications"
              onClick={onClose}
              className={`flex items-center justify-between p-3 rounded-2xl text-sm font-semibold transition-colors ${
                pathname === '/notifications' ? 'bg-[#E9D9FF] text-[#7C4DFF]' : 'text-gray-700 hover:bg-black/[0.03]'
              }`}
            >
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4" />
                <span>Pemberitahuan</span>
              </div>
              <ChevronRight className="w-4 h-4 opacity-40" />
            </Link>
          </div>

          {/* Quick Actions / Reset Tools */}
          <div className="pt-4 border-t border-black/[0.06] space-y-2">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-1">
              Opsi Uji Coba
            </label>

            {hearts.current < 5 && (
              <button
                onClick={() => {
                  refillHearts();
                }}
                className="w-full py-2.5 px-3 rounded-2xl bg-white border border-[#F6B6D8] text-xs font-bold text-[#171525] flex items-center justify-center gap-2 hover:bg-[#FDF2F8]"
              >
                <Heart className="w-4 h-4 fill-[#FF5A79] text-[#FF5A79]" />
                <span>Isi Ulang 5 Hati (Instan)</span>
              </button>
            )}

            <button
              onClick={() => {
                if (confirm('Atur ulang seluruh data simulasi ke awal?')) {
                  resetDemoData();
                  onClose();
                }
              }}
              className="w-full py-2.5 px-3 rounded-2xl bg-white border border-black/[0.08] text-xs font-bold text-gray-600 flex items-center justify-center gap-2 hover:bg-gray-100"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Data Demo</span>
            </button>

            <div className="text-center pt-2">
              <span className="text-[11px] text-gray-400">
                {APP_CONFIG.name} v{APP_CONFIG.version}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
