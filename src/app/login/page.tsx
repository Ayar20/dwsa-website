"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { GraduationCap, ShieldAlert, ArrowRight, Mail, Lock, UserCheck, Building2 } from "lucide-react";
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

          {/* Quick Demo Logins */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <span className="block text-[11px] font-bold text-center text-slate-400 uppercase tracking-wider">
              Quick Demo Access
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickLogin("student@dwsa.edu", "student123", "/dashboard/student")}
                className="py-2.5 px-3 bg-[#F0FDF4] hover:bg-emerald-100 border border-[#15803D]/20 rounded-xl text-[11px] font-bold text-[#15803D] flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <UserCheck className="w-3.5 h-3.5" />
                Student Workspace
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin("admin@dwsa.edu", "admin123", "/dashboard/admin")}
                className="py-2.5 px-3 bg-[#FEFCE8] hover:bg-amber-100 border border-[#D4A017]/30 rounded-xl text-[11px] font-bold text-[#D4A017] flex items-center justify-center gap-1.5 transition-all shadow-xs"
              >
                <Building2 className="w-3.5 h-3.5" />
                Executive Portal
              </button>
            </div>
            <div className="text-[10px] text-slate-500 text-center space-y-0.5 font-mono pt-1">
              <p>Student: <span className="text-[#15803D] font-bold">student@dwsa.edu</span> / <span className="text-[#0F172A]">student123</span></p>
              <p>Admin: <span className="text-[#D4A017] font-bold">admin@dwsa.edu</span> / <span className="text-[#0F172A]">admin123</span></p>
            </div>
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
