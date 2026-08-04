"use client";

import React from "react";
import Link from "next/link";
import { Compass, Home, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030e1f] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d4a017]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full text-center space-y-6 relative z-10">
        <div className="w-20 h-20 rounded-3xl bg-[#061428] border border-[#d4a017]/40 text-[#d4a017] flex items-center justify-center mx-auto shadow-2xl">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-[#d4a017]/15 border border-[#d4a017]/40 text-[#d4a017] text-[10px] font-black uppercase tracking-widest">
            ERROR 404 — PAGE NOT FOUND
          </span>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Institutional Resource Unavailable</h1>
          <p className="text-xs text-[#8899b4] leading-relaxed">
            The requested campus page or institutional route does not exist or has been relocated within the InstitutionOS registry.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/dashboard/student"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#d4a017] text-[#030e1f] text-xs font-extrabold hover:bg-[#b8891a] transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Return to Campus Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#061428] border border-[#1a2f4a] text-xs text-[#8899b4] font-bold hover:text-white hover:border-[#d4a017]/40 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Previous Page
          </button>
        </div>

        <p className="text-[10px] text-[#8899b4]">InstitutionOS v3.8A Enterprise Platform</p>
      </div>
    </div>
  );
}
