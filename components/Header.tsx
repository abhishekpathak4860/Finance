"use client";
import { Sun, Moon } from "lucide-react";

export default function Header({ darkMode, toggleDarkMode }: { darkMode: boolean, toggleDarkMode: () => void }) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <h1 className="text-xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          Finance<span className="text-green-600">Dash</span>
        </h1>

        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-600 dark:text-zinc-400">
          <a href="#" className="hover:text-green-600 transition-colors">Features</a>
          <a href="#" className="hover:text-green-600 transition-colors">Pricing</a>
          <a href="#" className="hover:text-green-600 transition-colors">About</a>
        </nav>

        <div className="flex items-center gap-4">
          <button 
            onClick={toggleDarkMode}
            className="p-2.5 rounded-xl bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-700 transition-all active:scale-90"
          >
            {darkMode ? (
              <Sun size={18} className="text-yellow-500 fill-yellow-500" />
            ) : (
              <Moon size={18} className="text-gray-600" />
            )}
          </button>

          <a href="/login" className="text-sm font-bold text-gray-700 dark:text-zinc-300 hover:text-green-600 transition-colors">
            Sign in
          </a>
        </div>
      </div>
    </header>
  );
}