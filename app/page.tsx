"use client";

import { useState, useEffect } from "react";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Load theme from storage
    const savedTheme = localStorage.getItem("theme");
    const isDark = savedTheme === "dark";
    
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    
    if (newMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  // Only render the UI once we know the theme to prevent the ugly 1-second flash
  if (!mounted) {
    return <div className="min-h-screen bg-white dark:bg-zinc-950" />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 transition-colors duration-500">
      <Header darkMode={darkMode} toggleDarkMode={toggleTheme} />
      <main className="animate-in fade-in duration-700">
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}