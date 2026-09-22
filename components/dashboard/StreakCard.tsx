'use client';

import React from 'react';
import { Flame, Check } from 'lucide-react';
import { useEduka } from '@/hooks/useEdukaStore';

export function StreakCard() {
  const { streak } = useEduka();

  return (
    <div className="w-full bg-white rounded-[26px] p-5 shadow-[0_4px_24px_rgba(124,77,255,0.06)] border border-black/[0.04]">
      {/* Title Header */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[17px] font-bold tracking-tight text-[#171525]">
          Study Streak
        </span>
        <div className="flex items-center gap-1 py-1 px-2.5 rounded-full bg-[#FFD1C1]/50 border border-[#FFB86B]/30">
          <Flame className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" />
          <span className="text-xs font-bold text-[#171525]">Aktif</span>
        </div>
      </div>

      {/* Streak Big Counter */}
      <div className="flex items-baseline gap-2 mb-4">
        <span className="text-4xl font-extrabold tracking-tight text-[#171525]">
          {streak.currentStreak}
        </span>
        <span className="text-sm font-semibold text-gray-500">
          hari berturut-turut
        </span>
      </div>

      {/* Weekly S M T W T F S Indicators */}
      <div className="flex items-center justify-between pt-2">
        {streak.weeklyDays.map((item, idx) => {
          return (
            <div key={`${item.day}-${idx}`} className="flex flex-col items-center gap-1.5">
              <span className="text-[11px] font-bold text-gray-400">
                {item.day}
              </span>

              {/* Status Indicator Icon */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                  item.completed
                    ? 'bg-[#7C4DFF] text-white shadow-xs'
                    : 'bg-[#F3F4F6] text-transparent border border-black/[0.04]'
                }`}
              >
                {item.completed && <Check className="w-4 h-4 stroke-[2.5]" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
