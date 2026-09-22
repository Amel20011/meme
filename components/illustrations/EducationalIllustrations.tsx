'use client';

import React from 'react';

/**
 * Onboarding Center Illustration:
 * Educational stationery, open book, pencils, floating cards, translucent badges, pastel sparkles.
 */
export function OnboardingIllustration({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Soft pastel ambient glow background */}
      <div className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-[#E9D9FF] via-[#FFD1C1]/60 to-[#F6B6D8]/50 blur-2xl -z-10" />

      <svg
        viewBox="0 0 340 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto max-w-[320px] drop-shadow-md"
      >
        {/* Soft Background Cloud/Disk */}
        <circle cx="170" cy="150" r="120" fill="url(#diskGradient)" fillOpacity="0.35" />
        <circle cx="250" cy="80" r="38" fill="#E9D9FF" fillOpacity="0.6" />
        <circle cx="75" cy="190" r="28" fill="#BFEBD7" fillOpacity="0.5" />

        {/* Floating Card Top Left: Formula/Math */}
        <g className="animate-pulse" style={{ animationDuration: '4s' }}>
          <rect
            x="40"
            y="65"
            width="82"
            height="58"
            rx="16"
            fill="#FFFFFF"
            filter="url(#shadowCard)"
          />
          <circle cx="60" cy="84" r="8" fill="#E9D9FF" />
          <path d="M57 84H63M60 81V87" stroke="#7C4DFF" strokeWidth="1.8" strokeLinecap="round" />
          <rect x="74" y="80" width="34" height="4" rx="2" fill="#E5E7EB" />
          <rect x="56" y="98" width="52" height="4" rx="2" fill="#F3E8FF" />
          <rect x="56" y="106" width="36" height="4" rx="2" fill="#F3E8FF" />
        </g>

        {/* Floating Card Top Right: Progress 100% */}
        <g>
          <rect
            x="215"
            y="45"
            width="86"
            height="56"
            rx="16"
            fill="#FFFFFF"
            filter="url(#shadowCard)"
          />
          <circle cx="236" cy="65" r="9" fill="#BFEBD7" />
          <path d="M233 65L235.5 67.5L239.5 63" stroke="#059669" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="252" y="61" width="35" height="5" rx="2.5" fill="#171525" fillOpacity="0.75" />
          <rect x="228" y="80" width="60" height="6" rx="3" fill="#F3F4F6" />
          <rect x="228" y="80" width="48" height="6" rx="3" fill="#7C4DFF" />
        </g>

        {/* Central Book - Spine & Open Pages */}
        {/* Book shadow */}
        <ellipse cx="170" cy="245" rx="100" ry="18" fill="#171525" fillOpacity="0.08" />

        {/* Book Base Cover */}
        <path
          d="M70 205C115 195 160 215 170 220C180 215 225 195 270 205L276 226C230 216 182 235 170 238C158 235 110 216 64 226L70 205Z"
          fill="#5B21B6"
        />

        {/* Left Open Page */}
        <path
          d="M74 165C118 152 162 172 170 178V226C162 220 118 200 74 212V165Z"
          fill="url(#leftPageGrad)"
        />
        {/* Left Page Lines */}
        <rect x="94" y="174" width="54" height="4" rx="2" fill="#DDD6FE" />
        <rect x="94" y="184" width="46" height="4" rx="2" fill="#EDE9FE" />
        <rect x="94" y="194" width="38" height="4" rx="2" fill="#EDE9FE" />

        {/* Right Open Page */}
        <path
          d="M266 165C222 152 178 172 170 178V226C178 220 222 200 266 212V165Z"
          fill="#FFFFFF"
        />
        {/* Right Page Content */}
        <rect x="190" y="174" width="56" height="4" rx="2" fill="#FBCFE8" />
        <rect x="190" y="184" width="48" height="4" rx="2" fill="#FCE7F3" />
        <circle cx="220" cy="202" r="7" fill="#FFD1C1" />

        {/* Center Spine Divider */}
        <line x1="170" y1="176" x2="170" y2="232" stroke="#7C4DFF" strokeWidth="2.5" strokeLinecap="round" />

        {/* Large Decorative Pencil Across */}
        <g transform="rotate(-32 170 140)">
          {/* Pencil Body */}
          <rect x="120" y="115" width="80" height="18" rx="3" fill="#FFB86B" />
          <rect x="120" y="121" width="80" height="6" fill="#F59E0B" />
          {/* Eraser */}
          <rect x="196" y="115" width="16" height="18" rx="4" fill="#F6B6D8" />
          <rect x="194" y="115" width="4" height="18" fill="#E5E7EB" />
          {/* Sharpened tip */}
          <path d="M120 115L98 124L120 133V115Z" fill="#FDE68A" />
          <path d="M104 121.5L98 124L104 126.5V121.5Z" fill="#1F2937" />
        </g>

        {/* Translucent Floating Geometry & Sparkles */}
        <circle cx="282" cy="142" r="14" fill="#BFDFFF" fillOpacity="0.75" />
        <circle cx="56" cy="140" r="10" fill="#FFD1C1" fillOpacity="0.8" />

        {/* Sparkle 1 */}
        <path
          d="M170 65C170 73 176 77 184 77C176 77 170 81 170 89C170 81 164 77 156 77C164 77 170 73 170 65Z"
          fill="#7C4DFF"
        />
        {/* Sparkle 2 */}
        <path
          d="M125 42C125 47 129 50 134 50C129 50 125 53 125 58C125 53 121 50 116 50C121 50 125 47 125 42Z"
          fill="#F6B6D8"
        />

        <defs>
          <linearGradient id="diskGradient" x1="50" y1="50" x2="290" y2="250" gradientUnits="userSpaceOnUse">
            <stop stopColor="#E9D9FF" />
            <stop offset="0.5" stopColor="#F6B6D8" />
            <stop offset="1" stopColor="#FFD1C1" />
          </linearGradient>
          <linearGradient id="leftPageGrad" x1="74" y1="165" x2="170" y2="226" gradientUnits="userSpaceOnUse">
            <stop stopColor="#F5F3FF" />
            <stop offset="1" stopColor="#FFFFFF" />
          </linearGradient>
          <filter id="shadowCard" x="30" y="38" width="110" height="90" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#7C4DFF" floodOpacity="0.12" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}

/**
 * Friendly Educational Mascot / Avatar for Home Dashboard Top Bar
 */
export function MascotAvatar({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#E9D9FF] via-[#F6B6D8] to-[#FFD1C1] p-0.5 shadow-sm flex items-center justify-center">
        <div className="w-full h-full rounded-[14px] bg-white/90 backdrop-blur-xs flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 44 44" fill="none" className="w-8 h-8">
            {/* Friendly Little Owl / Mascot Character */}
            <circle cx="22" cy="23" r="14" fill="#7C4DFF" />
            {/* Belly */}
            <ellipse cx="22" cy="27" rx="8" ry="7" fill="#E9D9FF" />
            {/* Left Eye */}
            <circle cx="17.5" cy="19.5" r="4.2" fill="#FFFFFF" />
            <circle cx="18" cy="19.5" r="2" fill="#171525" />
            <circle cx="18.8" cy="18.7" r="0.8" fill="#FFFFFF" />
            {/* Right Eye */}
            <circle cx="26.5" cy="19.5" r="4.2" fill="#FFFFFF" />
            <circle cx="26" cy="19.5" r="2" fill="#171525" />
            <circle cx="26.8" cy="18.7" r="0.8" fill="#FFFFFF" />
            {/* Cute Beak */}
            <polygon points="22,22 20.2,25 23.8,25" fill="#FFB86B" />
            {/* Graduation Cap */}
            <polygon points="22,6 31,11 22,14 13,11" fill="#171525" />
            <rect x="18" y="12" width="8" height="3" rx="1.5" fill="#374151" />
            <path d="M30 11.5V17L31.5 18" stroke="#FFB86B" strokeWidth="1.2" strokeLinecap="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/**
 * Screen 3: Study Planner Hero Illustration
 * Target, book, arrow, educational elements, purple/pink pastel palette.
 */
export function PlannerHeroIllustration({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="w-full max-w-[280px] h-[190px] relative flex items-center justify-center">
        {/* Soft background aura */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#E9D9FF]/70 via-[#FFD1C1]/50 to-[#F6B6D8]/60 rounded-3xl blur-xl -z-10" />

        <svg viewBox="0 0 280 190" fill="none" className="w-full h-full">
          {/* Calendar Plate behind */}
          <rect x="36" y="24" width="90" height="96" rx="18" fill="#FFFFFF" fillOpacity="0.9" />
          <rect x="36" y="24" width="90" height="24" rx="14" fill="#7C4DFF" />
          <circle cx="56" cy="36" r="3" fill="#FFFFFF" />
          <circle cx="106" cy="36" r="3" fill="#FFFFFF" />
          <rect x="48" y="60" width="16" height="8" rx="2" fill="#E9D9FF" />
          <rect x="73" y="60" width="16" height="8" rx="2" fill="#E9D9FF" />
          <rect x="98" y="60" width="16" height="8" rx="2" fill="#BFEBD7" />
          <rect x="48" y="76" width="16" height="8" rx="2" fill="#F6B6D8" />
          <rect x="73" y="76" width="16" height="8" rx="2" fill="#7C4DFF" />
          <rect x="98" y="76" width="16" height="8" rx="2" fill="#E9D9FF" />
          <rect x="48" y="92" width="40" height="6" rx="3" fill="#F3F4F6" />

          {/* Central Target Board */}
          <circle cx="180" cy="95" r="62" fill="#FFFFFF" />
          <circle cx="180" cy="95" r="50" fill="#E9D9FF" fillOpacity="0.6" />
          <circle cx="180" cy="95" r="36" fill="#F6B6D8" fillOpacity="0.75" />
          <circle cx="180" cy="95" r="22" fill="#FFFFFF" />
          <circle cx="180" cy="95" r="10" fill="#7C4DFF" />

          {/* Arrow Hitting Bullseye */}
          <g transform="rotate(-36 180 95)">
            <line x1="180" y1="95" x2="250" y2="95" stroke="#171525" strokeWidth="4" strokeLinecap="round" />
            <polygon points="176,95 186,90 186,100" fill="#FFB86B" />
            <polygon points="245,88 258,95 245,102" fill="#7C4DFF" />
          </g>

          {/* Floating Checklist Badge */}
          <g>
            <rect x="125" y="125" width="110" height="42" rx="14" fill="#FFFFFF" filter="url(#plShadow)" />
            <circle cx="145" cy="146" r="10" fill="#BFEBD7" />
            <path d="M141 146L144 149L149 143" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="164" y="141" width="56" height="5" rx="2.5" fill="#171525" fillOpacity="0.8" />
            <rect x="164" y="150" width="38" height="4" rx="2" fill="#9CA3AF" />
          </g>

          {/* Floating Little Star Sparkles */}
          <path d="M242 35C242 40 245 42 250 42C245 42 242 45 242 50C242 45 239 42 234 42C239 42 242 40 242 35Z" fill="#FFB86B" />
          <path d="M30 135C30 139 33 141 37 141C33 141 30 144 30 148C30 144 27 141 23 141C27 141 30 139 30 135Z" fill="#F6B6D8" />

          <defs>
            <filter id="plShadow" x="115" y="118" width="130" height="60" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#7C4DFF" floodOpacity="0.12" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}

/**
 * Screen 4: Smart Flashcards Hero Illustration
 * Stacked educational flashcards with soft 3D rotation, pastel badges.
 */
export function FlashcardsHeroIllustration({ className = '' }: { className?: string }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <div className="w-full max-w-[280px] h-[190px] relative flex items-center justify-center">
        {/* Soft background aura */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#BFDFFF]/50 via-[#E9D9FF]/60 to-[#FFD1C1]/50 rounded-3xl blur-xl -z-10" />

        <svg viewBox="0 0 280 190" fill="none" className="w-full h-full">
          {/* Card 3 (Bottom) */}
          <g transform="rotate(10 140 100)">
            <rect x="75" y="45" width="130" height="96" rx="20" fill="#FFD1C1" fillOpacity="0.8" />
          </g>

          {/* Card 2 (Middle) */}
          <g transform="rotate(-8 140 96)">
            <rect x="72" y="42" width="136" height="98" rx="20" fill="#E9D9FF" />
            <rect x="88" y="60" width="40" height="6" rx="3" fill="#C4B5FD" />
            <rect x="88" y="74" width="90" height="6" rx="3" fill="#DDD6FE" />
          </g>

          {/* Card 1 (Front Active Flashcard) */}
          <g filter="url(#fcShadow)">
            <rect x="70" y="38" width="140" height="104" rx="22" fill="#FFFFFF" />
            {/* Subject Pill Badge */}
            <rect x="86" y="52" width="56" height="18" rx="9" fill="#BFEBD7" />
            <circle cx="95" cy="61" r="3" fill="#059669" />
            <rect x="103" y="58" width="30" height="5" rx="2" fill="#065F46" />

            {/* Question lines */}
            <rect x="86" y="80" width="108" height="6" rx="3" fill="#171525" fillOpacity="0.8" />
            <rect x="86" y="92" width="80" height="6" rx="3" fill="#171525" fillOpacity="0.5" />

            {/* Active Recall flip indicator icon */}
            <circle cx="188" cy="120" r="11" fill="#7C4DFF" />
            <path
              d="M185 117L191 120L185 123"
              stroke="#FFFFFF"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>

          {/* Floating Brain / Sparkles */}
          <circle cx="48" cy="70" r="16" fill="#F6B6D8" fillOpacity="0.7" />
          <path d="M43 70H53M48 65V75" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

          <circle cx="236" cy="85" r="14" fill="#BFDFFF" fillOpacity="0.8" />
          <path d="M232 85L235 88L241 82" stroke="#1D4ED8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />

          <path d="M140 18C140 22 143 24 147 24C143 24 140 26 140 30C140 26 137 24 133 24C137 24 140 22 140 18Z" fill="#7C4DFF" />

          <defs>
            <filter id="fcShadow" x="55" y="28" width="170" height="135" filterUnits="userSpaceOnUse">
              <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#7C4DFF" floodOpacity="0.14" />
            </filter>
          </defs>
        </svg>
      </div>
    </div>
  );
}
