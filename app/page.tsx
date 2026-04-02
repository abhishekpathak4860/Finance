"use client";

import Features from "@/components/Features";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";

// app/page.tsx
export default function Home() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-green-100">
      <Header />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
