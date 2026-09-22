'use client';

import React, { useState } from 'react';
import { X, Plus, FileText, Trash2, Save } from 'lucide-react';
import { useEduka } from '@/hooks/useEdukaStore';

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotesModal({ isOpen, onClose }: NotesModalProps) {
  const { notes, saveNote, deleteNote } = useEduka();
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(notes[0]?.id || null);
  const [title, setTitle] = useState(notes[0]?.title || '');
  const [content, setContent] = useState(notes[0]?.content || '');
  const [subject, setSubject] = useState(notes[0]?.subjectName || 'Matematika');

  if (!isOpen) return null;

  const handleSelect = (id: string) => {
    const note = notes.find(n => n.id === id);
    if (note) {
      setSelectedNoteId(note.id);
      setTitle(note.title);
      setContent(note.content);
      setSubject(note.subjectName);
    }
  };

  const handleNewNote = () => {
    setSelectedNoteId(null);
    setTitle('');
    setContent('');
    setSubject('Catatan Umum');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    saveNote(selectedNoteId, title.trim(), content.trim(), subject);
    alert('Catatan berhasil disimpan!');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
      <div className="w-full max-w-[420px] max-h-[90vh] bg-white rounded-[30px] p-6 shadow-2xl border border-black/[0.06] flex flex-col animate-in fade-in zoom-in-95">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-black/[0.04]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#FFD1C1] flex items-center justify-center text-[#EA580C]">
              <FileText className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-base text-[#171525]">Catatan Belajar Pintar</h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 hover:text-black"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Existing Notes Carousel / Chips */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto no-scrollbar pb-1">
          <button
            type="button"
            onClick={handleNewNote}
            className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold border flex items-center gap-1 transition-all ${
              selectedNoteId === null
                ? 'bg-[#7C4DFF] text-white border-[#7C4DFF]'
                : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Baru</span>
          </button>

          {notes.map(n => (
            <button
              type="button"
              key={n.id}
              onClick={() => handleSelect(n.id)}
              className={`shrink-0 px-3 py-1.5 rounded-xl text-xs font-bold border truncate max-w-[130px] transition-all ${
                selectedNoteId === n.id
                  ? 'bg-[#7C4DFF] text-white border-[#7C4DFF]'
                  : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {n.title}
            </button>
          ))}
        </div>

        {/* Editor Form */}
        <form onSubmit={handleSave} className="mt-4 flex flex-col flex-1 gap-2.5">
          <div className="flex gap-2">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Judul Catatan..."
              className="flex-1 px-3.5 py-2 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-bold text-[#171525] focus:outline-hidden focus:border-[#7C4DFF]"
              required
            />
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Mata Pelajaran"
              className="w-28 px-3 py-2 rounded-2xl bg-gray-50 border border-gray-200 text-[11px] font-semibold text-gray-600 focus:outline-hidden focus:border-[#7C4DFF]"
            />
          </div>

          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tuliskan intisari materi, rumus cepat, atau poin hafalan di sini..."
            rows={7}
            className="w-full p-3.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs font-medium text-[#171525] focus:outline-hidden focus:border-[#7C4DFF] resize-none leading-relaxed"
          />

          <div className="flex items-center justify-between pt-2">
            {selectedNoteId && (
              <button
                type="button"
                onClick={() => {
                  if (confirm('Hapus catatan ini?')) {
                    deleteNote(selectedNoteId);
                    handleNewNote();
                  }
                }}
                className="py-2 px-3 rounded-xl text-xs font-semibold text-red-500 hover:bg-red-50 flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Hapus</span>
              </button>
            )}

            <button
              type="submit"
              className="ml-auto py-2.5 px-5 rounded-2xl bg-[#7C4DFF] hover:bg-[#6D3DF0] text-white text-xs font-bold flex items-center gap-1.5 shadow-xs active:scale-95 transition-all"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Simpan Catatan</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
