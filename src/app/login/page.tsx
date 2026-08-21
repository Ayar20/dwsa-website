"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GraduationCap, ShieldAlert, ArrowRight, Mail, Lock } from "lucide-react";
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
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    } else {
      if (email.toLowerCase().includes("admin")) {
        router.push("/dashboard/admin");
      } else if (email.toLowerCase().includes("instructor")) {
        router.push("/dashboard/instructor");
      } else {
        router.push("/dashboard/student");
      }
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col justify-center items-center p-4 relative font-sans">
      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Header Logo */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex p-3.5 bg-[#15803D] rounded-2xl shadow-sm mb-1 hover:scale-105 transition-transform text-white">
            <GraduationCap className="w-8 h-8" />
          </Link>
          <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">
            DWSA <span className="text-[#15803D]">Digital Campus</span>
          </h1>
          <p className="text-xs text-slate-500 font-semibold tracking-wide">
            Welcome to the Digital Campus of the Digital Technology Academy, a strategic pillar of Digital World Systems Africa Ltd (RC 9718724).
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@dwsa.edu"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#15803D] focus:ring-1 focus:ring-[#15803D] transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#15803D] focus:ring-1 focus:ring-[#15803D] transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl text-xs font-extrabold bg-[#15803D] hover:bg-[#166534] text-white shadow-sm transition-all flex items-center justify-center gap-2"
            >
              {loading ? "Authenticating..." : "Sign In to Portal"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* New Applicant / Register Link */}
          <div className="p-3.5 bg-[#F0FDF4] border border-[#15803D]/20 rounded-2xl flex items-center justify-between text-xs">
            <div>
              <p className="font-extrabold text-[#0F172A]">New Applicant?</p>
              <p className="text-[11px] text-slate-500">Register for Cohort 2026</p>
            </div>
            <Link
              href="/register"
              className="px-3.5 py-1.5 bg-[#15803D] hover:bg-[#166534] text-white font-extrabold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-1"
            >
              <span>Register</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link href="/" className="text-xs text-slate-500 hover:text-[#15803D] transition-colors font-semibold">
            ← Back to Tech Academy Overview
          </Link>
        </div>
      </div>
    </div>
  );
}
