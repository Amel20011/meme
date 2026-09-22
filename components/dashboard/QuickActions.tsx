'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Timer, CheckSquare, FileText, Layers } from 'lucide-react';
import { PomodoroModal } from './PomodoroModal';
import { TaskModal } from './TaskModal';
import { NotesModal } from './NotesModal';

export function QuickActions() {
  const router = useRouter();
  const [pomodoroOpen, setPomodoroOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);

  const actions = [
    {
      id: 'action-pomodoro',
      title: 'Pomodoro',
      icon: Timer,
      bgColor: '#E9D9FF', // Soft lavender
      iconColor: '#7C4DFF',
      onClick: () => setPomodoroOpen(true),
    },
    {
      id: 'action-tasks',
      title: 'Daftar Tugas',
      icon: CheckSquare,
      bgColor: '#BFEBD7', // Mint
      iconColor: '#059669',
      onClick: () => setTaskOpen(true),
    },
    {
      id: 'action-notes',
      title: 'Catatan',
      icon: FileText,
      bgColor: '#FFD1C1', // Peach
      iconColor: '#EA580C',
      onClick: () => setNotesOpen(true),
    },
    {
      id: 'action-flashcards',
      title: 'Flashcards',
      icon: Layers,
      bgColor: '#BFDFFF', // Sky
      iconColor: '#2563EB',
      onClick: () => router.push('/flashcards'),
    },
  ];

  return (
    <>
      <div className="w-full">
        <h2 className="text-[17px] font-bold tracking-tight text-[#171525] mb-3 px-1">
          Aksi Cepat
        </h2>

        <div className="grid grid-cols-4 gap-2.5">
          {actions.map((act) => {
            const Icon = act.icon;
            return (
              <button
                key={act.id}
                id={act.id}
                onClick={act.onClick}
                className="flex flex-col items-center gap-2 p-3 rounded-[24px] bg-white border border-black/[0.04] shadow-[0_2px_12px_rgba(0,0,0,0.03)] hover:-translate-y-0.5 active:scale-95 transition-all text-center group"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105"
                  style={{ backgroundColor: act.bgColor }}
                >
                  <Icon className="w-5 h-5" style={{ color: act.iconColor }} />
                </div>
                <span className="text-[11px] font-bold text-gray-700 leading-tight">
                  {act.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Modals */}
      <PomodoroModal isOpen={pomodoroOpen} onClose={() => setPomodoroOpen(false)} />
      <TaskModal isOpen={taskOpen} onClose={() => setTaskOpen(false)} />
      <NotesModal isOpen={notesOpen} onClose={() => setNotesOpen(false)} />
    </>
  );
}
