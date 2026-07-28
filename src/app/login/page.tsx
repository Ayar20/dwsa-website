"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GraduationCap, ShieldAlert, ArrowRight, Mail, Lock, UserCheck, Sparkles, Building2 } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("Invalid credentials. Use Quick Login buttons below for testing.");
      setLoading(false);
    } else {
      router.push("/dashboard/student");
      router.refresh();
    }
  };

  const handleQuickLogin = (emailVal: string, passVal: string, targetPath: string = "/dashboard/student") => {
    setEmail(emailVal);
    setPassword(passVal);
    setLoading(true);
    setError(null);

    signIn("credentials", {
      email: emailVal,
      password: passVal,
      redirect: false,
    }).then((res) => {
      if (res?.error) {
        setError(res.error);
        setLoading(false);
      } else {
        router.push(targetPath);
        router.refresh();
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#030e1f] text-[#f0f4ff] flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      {/* Background Ambient Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#00d2ff]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#d4a017]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Header Logo */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex p-3 bg-gradient-to-br from-[#d4a017] to-[#e5a910] rounded-2xl shadow-xl shadow-[#d4a017]/25 mb-1 hover:scale-105 transition-transform">
            <GraduationCap className="w-8 h-8 text-[#030e1f]" />
          </Link>
          <h1 className="text-2xl font-black text-white tracking-tight">
            DWSA <span className="text-[#d4a017]">Tech Academy</span> Portal
          </h1>
          <p className="text-xs text-[#00d2ff] font-semibold tracking-wide">
            Digital World Systems Africa Ltd (RC 9718724)
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#061428]/90 border border-[#d4a017]/30 rounded-3xl p-7 shadow-2xl backdrop-blur-xl space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-950/70 border border-red-800/80 rounded-xl text-xs text-red-300 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-400" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#8899b4] absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@dwsa.edu"
                  className="w-full pl-10 pr-4 py-3 bg-[#030e1f] border border-[#00d2ff]/30 rounded-xl text-xs text-white placeholder-[#8899b4] focus:outline-none focus:border-[#00d2ff] focus:ring-1 focus:ring-[#00d2ff] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#8899b4] absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-[#030e1f] border border-[#00d2ff]/30 rounded-xl text-xs text-white placeholder-[#8899b4] focus:outline-none focus:border-[#00d2ff] focus:ring-1 focus:ring-[#00d2ff] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-[#d4a017] to-[#e5a910] hover:from-[#e5a910] hover:to-[#d4a017] text-[#030e1f] shadow-lg shadow-[#d4a017]/25 transition-all flex items-center justify-center gap-2"
            >
              {loading ? "Authenticating..." : "Sign In to Portal"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Demo Logins */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <span className="block text-[11px] font-bold text-center text-[#8899b4] uppercase tracking-wider">
              Quick Demo Access
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickLogin("student@dwsa.edu", "password123", "/dashboard/student")}
                className="py-2.5 px-3 bg-[#0f223d] hover:bg-[#16335a] border border-[#00d2ff]/30 rounded-xl text-[11px] font-bold text-[#00d2ff] flex items-center justify-center gap-1.5 transition-all"
              >
                <UserCheck className="w-3.5 h-3.5" />
                Student Workspace
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin("admin@dwsa.edu", "admin123", "/dashboard/admin")}
                className="py-2.5 px-3 bg-[#0f223d] hover:bg-[#16335a] border border-[#d4a017]/30 rounded-xl text-[11px] font-bold text-[#d4a017] flex items-center justify-center gap-1.5 transition-all"
              >
                <Building2 className="w-3.5 h-3.5" />
                Instructor Portal
              </button>
            </div>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link href="/" className="text-xs text-[#8899b4] hover:text-white transition-colors">
            ← Back to Tech Academy Overview
          </Link>
        </div>
      </div>
    </div>
  );
}
