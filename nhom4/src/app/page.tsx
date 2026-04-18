"use client";

import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import NoteForm from "../components/NoteForm";
import NoteList, { Note } from "../components/NoteList";

const EMOJIS = ["📚", "⚡", "🔗", "🌙", "💾", "🚀", "💡", "🎯", "📌", "📝"];

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      try {
        setNotes(JSON.parse(savedNotes));
      } catch (e) {
        console.error("Failed to parse notes from local storage", e);
      }
    } else {
      // Default initial notes to match screenshot
      setNotes([
        { id: "1", text: "Học useState để quản lý state trong component", date: "17/04/2026, 20:00", emoji: "📚" },
        { id: "2", text: "Tìm hiểu useEffect xử lý side effects", date: "17/04/2026, 20:05", emoji: "⚡" },
        { id: "3", text: "Thực hành Context API chia sẻ dữ liệu", date: "17/04/2026, 20:10", emoji: "🔗" },
        { id: "4", text: "Thêm chức năng Dark / Light mode", date: "17/04/2026, 20:15", emoji: "🌙" },
        { id: "5", text: "Lưu dữ liệu vào localStorage bằng useEffect", date: "17/04/2026, 20:20", emoji: "💾" },
      ]);
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem("notes", JSON.stringify(notes));
    }
  }, [notes, loaded]);

  const addNote = (text: string) => {
    const newNote: Note = {
      id: Date.now().toString(),
      text,
      date: new Date().toLocaleString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit"
      }).replace(/:\d\d$/, ''), // To format similar to 20:00
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
    };
    setNotes([newNote, ...notes]);
  };

  const deleteNote = (id: string) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  if (!loaded) return null; // Avoid hydration mismatch on initial render

  return (
    <main className="max-w-4xl mx-auto p-4 md:p-8 w-full min-h-screen flex flex-col font-sans relative">
      <Header noteCount={notes.length} />
      <div className="flex-1 mt-4">
        <NoteForm addNote={addNote} />
        <NoteList notes={notes} onDelete={deleteNote} />
      </div>
    </main>
  );
}
