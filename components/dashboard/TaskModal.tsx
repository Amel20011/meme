'use client';

import React, { useState } from 'react';
import { X, Plus, CheckCircle2, Circle, Trash2, ListTodo } from 'lucide-react';
import { useEduka } from '@/hooks/useEdukaStore';

interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TaskModal({ isOpen, onClose }: TaskModalProps) {
  const { tasks, addTask, toggleTask, deleteTask } = useEduka();
  const [newTitle, setNewTitle] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    addTask(newTitle.trim(), priority);
    setNewTitle('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-[400px] max-h-[85vh] bg-white rounded-[30px] p-6 shadow-2xl border border-black/[0.06] flex flex-col animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-black/[0.04]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#BFEBD7] flex items-center justify-center text-[#059669]">
              <ListTodo className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base text-[#171525]">Daftar Tugas Belajar</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-black"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-2">
          <div className="flex gap-2">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Tambah target belajar..."
              className="flex-1 px-3.5 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-medium focus:outline-hidden focus:border-[#7C4DFF]"
            />
            <button
              type="submit"
              className="py-2.5 px-3.5 rounded-2xl bg-[#7C4DFF] text-white text-xs font-bold hover:bg-[#6D3DF0] active:scale-95 transition-all flex items-center justify-center"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-semibold text-gray-500">
            <span>Prioritas:</span>
            {(['low', 'medium', 'high'] as const).map(p => (
              <button
                type="button"
                key={p}
                onClick={() => setPriority(p)}
                className={`px-2 py-0.5 rounded-md capitalize transition-all ${
                  priority === p ? 'bg-[#7C4DFF] text-white font-bold' : 'bg-gray-100 text-gray-600'
                }`}
              >
                {p === 'low' ? 'Rendah' : p === 'medium' ? 'Sedang' : 'Tinggi'}
              </button>
            ))}
          </div>
        </form>

        {/* Task List */}
        <div className="mt-4 flex-1 overflow-y-auto space-y-2 pr-1 max-h-[300px]">
          {tasks.length === 0 ? (
            <p className="text-center text-xs text-gray-400 py-6">
              Belum ada tugas belajar. Tambahkan target belajarmu hari ini!
            </p>
          ) : (
            tasks.map(task => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 rounded-2xl bg-gray-50/80 border border-black/[0.03] hover:bg-gray-100/70 transition-colors"
              >
                <button
                  onClick={() => toggleTask(task.id)}
                  className="flex items-center gap-3 text-left flex-1 min-w-0"
                >
                  {task.completed ? (
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  ) : (
                    <Circle className="w-4 h-4 text-gray-300 shrink-0" />
                  )}
                  <span
                    className={`text-xs font-semibold truncate ${
                      task.completed ? 'line-through text-gray-400' : 'text-[#171525]'
                    }`}
                  >
                    {task.title}
                  </span>
                </button>

                <button
                  onClick={() => deleteTask(task.id)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-black/[0.04] flex items-center justify-between text-[11px] text-gray-500 font-medium">
          <span>{tasks.filter(t => t.completed).length} dari {tasks.length} terselesaikan</span>
          <button
            onClick={onClose}
            className="font-bold text-[#7C4DFF] hover:underline"
          >
            Selesai
          </button>
        </div>
      </div>
    </div>
  );
}
