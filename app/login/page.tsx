'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Sparkles, Mail, Lock, ArrowRight, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { APP_CONFIG } from '@/lib/constants/config';
import { useEduka } from '@/hooks/useEdukaStore';

export default function LoginPage() {
  const router = useRouter();
  const { updateUser } = useEduka();
  const [email, setEmail] = useState('budi.prakoso@eduka.id');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      updateUser({ email, name: email.split('@')[0].replace('.', ' ').toUpperCase() });
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

      {/* Main Login Card */}
      <div className="w-full max-w-[360px] mx-auto bg-white/90 backdrop-blur-md rounded-[32px] p-6 shadow-xl border border-black/[0.04]">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-extrabold text-[#171525] tracking-tight">
            Selamat Datang
          </h1>
          <p className="text-xs font-medium text-gray-500 mt-1">
            Masuk untuk melanjutkan proses belajar dan mempertahankan streak harianmu.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-3.5">
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1">Email Pelajar:</label>
            <div className="relative flex items-center">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                required
                className="w-full pl-10 pr-3.5 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-medium text-[#171525] focus:outline-hidden focus:border-[#7C4DFF]"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-gray-600">Kata Sandi:</label>
              <button
                type="button"
                onClick={() => alert('Fitur reset kata sandi telah dikirim ke email Anda.')}
                className="text-[11px] font-semibold text-[#7C4DFF] hover:underline"
              >
                Lupa sandi?
              </button>
            </div>
            <div className="relative flex items-center">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-10 pr-10 py-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-medium text-[#171525] focus:outline-hidden focus:border-[#7C4DFF]"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 rounded-[22px] bg-[#7C4DFF] hover:bg-[#6D3DF0] text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 active:scale-98 transition-all mt-2"
          >
            <span>{loading ? 'Menghubungkan...' : 'Masuk Sekarang'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5 flex items-center justify-center">
          <div className="border-t border-black/[0.06] w-full" />
          <span className="bg-white px-2 text-[10px] uppercase font-bold text-gray-400 absolute">
            Atau Lanjutkan Dengan
          </span>
        </div>

        {/* Social Buttons */}
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => router.push('/home')}
            className="py-2.5 rounded-xl border border-black/[0.06] bg-gray-50 text-xs font-bold text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-2"
          >
            <span>🌐 Google</span>
          </button>
          <button
            onClick={() => router.push('/home')}
            className="py-2.5 rounded-xl border border-black/[0.06] bg-gray-50 text-xs font-bold text-gray-700 hover:bg-gray-100 flex items-center justify-center gap-2"
          >
            <span>🍎 Apple</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pb-2">
        <p className="text-xs font-semibold text-gray-600">
          Belum memiliki akun?{' '}
          <Link href="/register" className="text-[#7C4DFF] font-extrabold hover:underline">
            Daftar Sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}
