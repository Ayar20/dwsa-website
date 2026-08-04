"use client";

import React, { useEffect } from "react";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // Log error to telemetry
    console.error("InstitutionOS Global Error Caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#030e1f] text-white flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="max-w-md w-full text-center space-y-6 relative z-10">
        <div className="w-20 h-20 rounded-3xl bg-[#061428] border border-red-500/40 text-red-400 flex items-center justify-center mx-auto shadow-2xl">
          <AlertTriangle className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-[10px] font-black uppercase tracking-widest">
            SYSTEM EXCEPTION ENCOUNTERED
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Temporary Operational Exception</h1>
          <p className="text-xs text-[#8899b4] leading-relaxed">
            An isolated exception occurred while rendering this campus view. InstitutionOS recovery engine is ready to retry.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#d4a017] text-[#030e1f] text-xs font-extrabold hover:bg-[#b8891a] transition-all flex items-center justify-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Retry Request
          </button>
          <a
            href="/dashboard/student"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#061428] border border-[#1a2f4a] text-xs text-[#8899b4] font-bold hover:text-white hover:border-[#d4a017]/40 transition-all flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" /> Campus Home
          </a>
        </div>

        {error.digest && <p className="text-[9px] text-[#8899b4] font-mono">Digest ID: {error.digest}</p>}
      </div>
    </div>
  );
}
