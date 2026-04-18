"use client";
import React from "react";

export type Note = {
  id: string;
  text: string;
  date: string;
  emoji: string;
};

type NoteListProps = {
  notes: Note[];
  onDelete: (id: string) => void;
};

export default function NoteList({ notes, onDelete }: NoteListProps) {
  if (notes.length === 0) {
    return (
      <div className="text-center py-8 text-color opacity-60">
        Chưa có ghi chú nào. Hãy thêm ghi chú mới!
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {notes.map((note) => (
        <div 
          key={note.id} 
          className="flex items-center justify-between p-4 rounded-xl border border-color shadow-sm transition"
          style={{ backgroundColor: 'var(--card-bg)' }}
        >
          <div className="flex items-start gap-4 flex-1">
            <span className="text-xl mt-1">{note.emoji}</span>
            <div className="flex flex-col">
              <p className="font-medium text-color mb-1">{note.text}</p>
              <span className="text-xs text-color opacity-60">{note.date}</span>
            </div>
          </div>
          <button 
            onClick={() => onDelete(note.id)}
            className="ml-4 px-4 py-2 rounded-lg text-sm font-medium transition"
            style={{ color: 'var(--danger-color)', backgroundColor: 'transparent' }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
          >
            Xóa
          </button>
        </div>
      ))}
    </div>
  );
}
