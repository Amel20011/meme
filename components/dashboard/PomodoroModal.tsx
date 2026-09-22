'use client';

import React, { useState, useEffect } from 'react';
import { X, Play, Pause, RotateCcw, Coffee, BookOpen, Volume2 } from 'lucide-react';
import { formatSeconds } from '@/lib/utils/quizUtils';

interface PomodoroModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function PomodoroModal({ isOpen, onClose }: PomodoroModalProps) {
  const [mode, setMode] = useState<'focus' | 'break'>('focus');
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  // Play gentle web audio chime
  const playChime = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(880, audioCtx.currentTime + 0.3); // A5
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.8);
    } catch {
      // AudioContext may be restricted before user gesture
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setSecondsLeft(prev => {
          if (prev <= 1) {
            setIsActive(false);
            playChime();
            if (mode === 'focus') {
              alert('🎉 Sesi Fokus 25 menit selesai! Istirahat 5 menit sekarang.');
              setMode('break');
              return 5 * 60;
            } else {
              alert('☕ Waktu istirahat selesai! Siap untuk kembali fokus?');
              setMode('focus');
              return 25 * 60;
            }
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, mode]);

  if (!isOpen) return null;

  const totalTime = mode === 'focus' ? 25 * 60 : 5 * 60;
  const progressPercent = ((totalTime - secondsLeft) / totalTime) * 100;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-[380px] bg-white rounded-[30px] p-6 shadow-2xl border border-black/[0.06] animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-black/[0.04]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#E9D9FF] flex items-center justify-center text-[#7C4DFF]">
              <BookOpen className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base text-[#171525]">Timer Pomodoro</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-black"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Mode Switcher */}
        <div className="flex p-1 bg-[#F3F4F6] rounded-2xl mt-4">
          <button
            onClick={() => {
              setMode('focus');
              setIsActive(false);
              setSecondsLeft(25 * 60);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'focus' ? 'bg-white text-[#7C4DFF] shadow-xs' : 'text-gray-500'
            }`}
          >
            Fokus (25m)
          </button>
          <button
            onClick={() => {
              setMode('break');
              setIsActive(false);
              setSecondsLeft(5 * 60);
            }}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              mode === 'break' ? 'bg-white text-[#059669] shadow-xs' : 'text-gray-500'
            }`}
          >
            Istirahat (5m)
          </button>
        </div>

        {/* Big Countdown Display */}
        <div className="flex flex-col items-center justify-center my-8">
          <div className="relative w-44 h-44 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke="#F3F4F6"
                strokeWidth="6"
                fill="transparent"
              />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke={mode === 'focus' ? '#7C4DFF' : '#10B981'}
                strokeWidth="6"
                strokeDasharray={2 * Math.PI * 42}
                strokeDashoffset={(2 * Math.PI * 42) * (1 - progressPercent / 100)}
                strokeLinecap="round"
                fill="transparent"
                className="transition-all duration-500"
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-3xl font-extrabold font-mono tracking-tight text-[#171525]">
                {formatSeconds(secondsLeft)}
              </span>
              <span className="text-[11px] font-semibold text-gray-400 mt-1 uppercase tracking-wider">
                {mode === 'focus' ? 'Sesi Belajar' : 'Istirahat'}
              </span>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={() => {
              setIsActive(!isActive);
              if (!isActive) playChime();
            }}
            className={`py-3 px-6 rounded-2xl font-bold text-sm flex items-center gap-2 text-white shadow-md active:scale-95 transition-all ${
              mode === 'focus' ? 'bg-[#7C4DFF] hover:bg-[#6D3DF0]' : 'bg-[#10B981] hover:bg-[#059669]'
            }`}
          >
            {isActive ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white" />}
            <span>{isActive ? 'Jeda' : 'Mulai'}</span>
          </button>

          <button
            onClick={() => {
              setIsActive(false);
              setSecondsLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
            }}
            className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 active:scale-95 transition-all"
            title="Reset Timer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={playChime}
            className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-gray-600 hover:bg-gray-200 active:scale-95 transition-all"
            title="Test Chime Sound"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
