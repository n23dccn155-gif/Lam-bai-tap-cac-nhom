"use client";
import React, { useState } from "react";

type NoteFormProps = {
  addNote: (text: string) => void;
};

export default function NoteForm({ addNote }: NoteFormProps) {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addNote(text);
      setText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Nhập ghi chú mới..."
        className="flex-1 px-4 py-3 rounded-xl border border-color outline-none text-color transition"
        style={{ backgroundColor: 'var(--input-bg)', borderColor: 'var(--border-color)' }}
      />
      <button 
        type="submit" 
        className="px-6 py-3 rounded-xl font-medium transition hover:opacity-90 flex items-center justify-center !text-white shadow-sm"
        style={{ backgroundColor: 'var(--primary-color)' }}
      >
        + Thêm
      </button>
    </form>
  );
}
