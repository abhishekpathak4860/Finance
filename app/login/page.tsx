"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { ShieldCheck, Eye, ArrowRight, User, Mail } from "lucide-react";

export default function LoginPage() {
  const [formData, setFormData] = useState({ name: "", email: "", role: "viewer" });
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUser();
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      // SAVE TO GLOBAL CONTEXT
      setUser({
        name: formData.name,
        email: formData.email,
        role: formData.role
      });
      router.push("/dashboard");
    }, 800);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50 px-6 py-12 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-400 via-green-600 to-emerald-500" />

      <div className="w-full max-w-md z-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Finance<span className="text-green-600">Dash</span>
          </h1>
          <p className="text-gray-500 mt-2">Start managing your wealth today.</p>
        </div>

        <div className="bg-white p-8 rounded-[32px] shadow-xl border border-zinc-100">
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Name Input */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="border-2 border-black w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-2xl focus:ring-2 focus:ring-green-500/20 outline-none font-semibold"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
                <input
                  required
                  type="email"
                  placeholder="john@example.com"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-2xl focus:ring-2 focus:ring-green-500/20 outline-none font-semibold"
                />
              </div>
            </div>

            {/* Role Selection */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setFormData({...formData, role: "viewer"})}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                  formData.role === "viewer" ? "border-green-600 bg-green-50 text-green-700" : "border-gray-50 text-gray-400"
                }`}
              >
                <Eye size={20} /> <span className="text-xs font-bold">Viewer</span>
              </button>
              <button
                type="button"
                onClick={() => setFormData({...formData, role: "admin"})}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${
                  formData.role === "admin" ? "border-green-600 bg-green-50 text-green-700" : "border-gray-50 text-gray-400"
                }`}
              >
                <ShieldCheck size={20} /> <span className="text-xs font-bold">Admin</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-black py-4 rounded-2xl shadow-lg shadow-green-100 transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
            >
              {isLoading ? "Connecting..." : "Enter Dashboard"}
              <ArrowRight size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}