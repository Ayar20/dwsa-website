"use client";

import React from "react";
import Link from "next/link";
import { GraduationCap, Home, ArrowRight, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col items-center justify-center p-6 relative font-sans">
      <div className="max-w-md w-full text-center space-y-6 relative z-10">
        <Link href="/" className="inline-flex p-4 bg-[#15803D] rounded-2xl shadow-sm text-white mb-2">
          <GraduationCap className="w-10 h-10" />
        </Link>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-[#FEFCE8] border border-[#D4A017]/30 text-[#D4A017] text-[10px] font-black uppercase tracking-widest">
            ERROR 404 — PAGE NOT FOUND
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">Institutional Resource Unavailable</h1>
          <p className="text-xs text-slate-500 leading-relaxed">
            The requested campus page or institutional route does not exist or has been relocated within the InstitutionOS registry.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/dashboard/student"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-[#15803D] text-white text-xs font-extrabold hover:bg-[#166534] shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Student Campus
          </Link>
          <Link
            href="/register"
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-white border border-slate-200 text-xs font-extrabold text-[#0F172A] hover:bg-slate-50 shadow-sm transition-all flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-[#15803D]" /> Register / Sign Up
          </Link>
        </div>

        <p className="text-[10px] text-slate-400 font-mono">
          DWSA Digital Technology Academy · InstitutionOS
        </p>
      </div>
    </div>
  );
}

