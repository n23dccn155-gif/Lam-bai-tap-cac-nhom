"use client";
import React from "react";
import { useTheme } from "../context/ThemeContext";

type HeaderProps = {
  noteCount: number;
};

export default function Header({ noteCount }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex justify-between items-center py-4 px-6 mb-6 shadow-sm rounded-b-xl" style={{ backgroundColor: 'var(--header-bg)' }}>
      <div className="flex items-center gap-2">
        <span className="text-2xl">📝</span>
        <h1 className="text-xl font-bold text-color">Ghi Chú Cá Nhân</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="px-3 py-1 rounded-full text-sm font-semibold !text-white" style={{ backgroundColor: 'var(--primary-color)' }}>
          {noteCount} ghi chú
        </span>
        <button 
          onClick={toggleTheme} 
          className="w-10 h-10 rounded-full flex items-center justify-center border border-color shadow-sm hover:opacity-80 transition bg-card text-xl"
          aria-label="Toggle theme"
        >
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </header>
  );
}
