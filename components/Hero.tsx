import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-zinc-950 pb-24 pt-16 sm:pt-20 transition-colors duration-500">
      {/* Background Glow for Dark Mode */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-green-500/5 via-transparent to-transparent dark:from-green-500/10 opacity-0 dark:opacity-100 pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 text-center relative z-10">
        
        {/* Modern Soft Badge */}
        <div className="mx-auto mb-8 flex max-w-fit items-center gap-2 rounded-full border border-green-100 dark:border-green-900/30 bg-green-50 dark:bg-green-900/10 px-4 py-2 text-xs sm:text-sm font-bold text-green-700 dark:text-green-400 animate-bounce">
          <span className="flex h-2 w-2 rounded-full bg-green-600 animate-pulse" />
          NEW: AI-POWERED INSIGHTS
        </div>

        <h2 className="mx-auto max-w-4xl text-4xl font-black tracking-tighter text-gray-900 dark:text-white sm:text-7xl leading-[1.1]">
          Manage your finances <br className="hidden sm:block" />
          <span className="text-green-600">without the headache.</span>
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-base sm:text-lg leading-relaxed text-gray-500 dark:text-zinc-400 font-medium px-2">
          The all-in-one dashboard to track income, monitor expenses, and
          visualize your wealth. Built for clarity and speed.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          <Link href="/login" className="w-full sm:w-auto">
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-10 py-5 text-lg font-bold text-white shadow-xl shadow-green-200 dark:shadow-green-900/20 hover:bg-green-700 transition-all active:scale-95">
              Start for free
              <ArrowRight size={20} />
            </button>
          </Link>

          <button className="w-full sm:w-auto flex items-center justify-center gap-2 rounded-2xl bg-white dark:bg-zinc-900 px-10 py-5 text-lg font-bold text-gray-900 dark:text-white border border-gray-100 dark:border-zinc-800 shadow-sm hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all active:scale-95">
            <Play size={18} className="text-green-600" fill="currentColor" />
            View Demo
          </button>
        </div>

        <div className="mt-20 opacity-40 hidden sm:block">
          <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-400 dark:text-zinc-500">Trusted by 10,000+ users worldwide</p>
        </div>
      </div>
    </section>
  );
}