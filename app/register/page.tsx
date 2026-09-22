'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Mail, Lock, User, ArrowRight, Check } from 'lucide-react';
import { APP_CONFIG, EducationLevelId } from '@/lib/constants/config';
import { useEduka } from '@/hooks/useEdukaStore';

export default function RegisterPage() {
  const router = useRouter();
  const { updateUser } = useEduka();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [level, setLevel] = useState<EducationLevelId>('SMA');
  const [loading, setLoading] = useState(false);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      updateUser({
        name: name || 'Pelajar EDUKA',
        email: email || 'siswa@eduka.id',
        educationLevel: level,
      });
      setLoading(false);
      router.push('/home');
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col justify-between min-h-screen bg-gradient-to-b from-[#FDFBF7] via-[#F8EEFF] to-[#FFEBE5] p-6">
      {/* Top Brand */}
      <div className="pt-4 flex items-center justify-center gap-2">
        <div className="w-8 h-8 rounded-xl bg-[#7C4DFF] flex items-center justify-center text-white shadow-xs">
          <Sparkles className="w-4 h-4" />
        </div>
        <span className="font-extrabold text-xl tracking-tight text-[#171525]">
          {APP_CONFIG.name}
        </span>
      </div>

      {/* Main Register Card */}
      <div className="w-full max-w-[360px] mx-auto bg-white/90 backdrop-blur-md rounded-[32px] p-6 shadow-xl border border-black/[0.04]">
        <div className="text-center mb-5">
          <h1 className="text-2xl font-extrabold text-[#171525] tracking-tight">
            Mulai Akun Baru
          </h1>
          <p className="text-xs font-medium text-gray-500 mt-1">
            Bergabung dengan ribuan siswa cerdas dan mulai petualangan belajarmu.
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-3">
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1">Nama Lengkap:</label>
            <div className="relative flex items-center">
              <User className="w-4 h-4 text-gray-400 absolute left-3.5" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama panggilanmu"
                required
                className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-medium text-[#171525] focus:outline-hidden focus:border-[#7C4DFF]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1">Email:</label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                required
                className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-medium text-[#171525] focus:outline-hidden focus:border-[#7C4DFF]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1">Kata Sandi:</label>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimal 8 karakter"
                required
                className="w-full pl-10 pr-3.5 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-medium text-[#171525] focus:outline-hidden focus:border-[#7C4DFF]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1">Jenjang Pendidikan:</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value as EducationLevelId)}
              className="w-full px-3.5 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-bold text-[#171525] focus:outline-hidden focus:border-[#7C4DFF]"
            >
              {APP_CONFIG.levels.map(l => (
                <option key={l.id} value={l.id}>
                  {l.icon} {l.name} ({l.shortName})
                </option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-[22px] bg-[#7C4DFF] hover:bg-[#6D3DF0] text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all mt-3"
          >
            <span>{loading ? 'Mendaftarkan...' : 'Daftar Sekarang'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>

      {/* Footer */}
      <div className="text-center pb-2">
        <p className="text-xs font-semibold text-gray-600">
          Sudah memiliki akun?{' '}
          <Link href="/login" className="text-[#7C4DFF] font-extrabold hover:underline">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}
