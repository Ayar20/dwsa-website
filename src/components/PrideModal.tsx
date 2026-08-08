"use client";

import React, { useState } from "react";
import { ShieldCheck, CheckCircle2, Award, HeartHandshake, Zap, Compass } from "lucide-react";
import { useSession } from "next-auth/react";

interface PrideModalProps {
  isOpen: boolean;
  onAccepted: () => void;
}

export default function PrideModal({ isOpen, onAccepted }: PrideModalProps) {
  const { update } = useSession();
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleAccept = async () => {
    if (!agreed) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/student/accept-pride", {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Failed to save agreement.");
      }

      // Refresh session state
      await update();
      onAccepted();
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 flex items-center gap-4">
          <div className="p-3 bg-blue-600/20 text-blue-400 rounded-xl border border-blue-500/30">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white tracking-wide">
              DWSA Academy P.R.I.D.E. Code of Conduct
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Required for all enrolled students prior to entering the learning workspace.
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-slate-300 text-sm">
          <p className="text-slate-400 text-xs">
            As a candidate of Digital World Systems Africa (DWSA) Academy, you are expected to embody our core operational values throughout your cohort journey:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 flex gap-3">
              <Award className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white text-xs">P - Professionalism</h4>
                <p className="text-xs text-slate-400 mt-1">Maintain respect, clear communication, and professional behavior in all peer interactions.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 flex gap-3">
              <Zap className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white text-xs">R - Resilience</h4>
                <p className="text-xs text-slate-400 mt-1">Embrace complex debugging challenges and view technical failure as an iteration step.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 flex gap-3">
              <HeartHandshake className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white text-xs">I - Integrity</h4>
                <p className="text-xs text-slate-400 mt-1">Submit authentic work. Plagiarism or un-attributed code borrowing will result in review.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 flex gap-3">
              <Compass className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white text-xs">D - Discipline</h4>
                <p className="text-xs text-slate-400 mt-1">Adhere strictly to project deadlines, module milestones, and installment schedules.</p>
              </div>
            </div>

            <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700/50 md:col-span-2 flex gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-white text-xs">E - Excellence</h4>
                <p className="text-xs text-slate-400 mt-1">Strive for production-ready code quality, comprehensive documentation, and clean architecture.</p>
              </div>
            </div>
          </div>

          {error && (
            <div className="p-3 bg-red-950/50 border border-red-800/50 text-red-300 rounded-xl text-xs">
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-800 bg-slate-900/90 flex flex-col sm:flex-row items-center justify-between gap-4">
          <label className="flex items-start gap-3 cursor-pointer select-none text-xs text-slate-300">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500 focus:ring-offset-slate-900"
            />
            <span>I have read, understood, and agree to abide by the DWSA Academy P.R.I.D.E Code of Conduct.</span>
          </label>

          <button
            onClick={handleAccept}
            disabled={!agreed || loading}
            className={`w-full sm:w-auto px-6 py-2.5 rounded-xl font-medium text-xs transition-all flex items-center justify-center gap-2 shrink-0 ${
              agreed && !loading
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25 hover:from-blue-500 hover:to-indigo-500"
                : "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50"
            }`}
          >
            {loading ? "Saving Agreement..." : "Accept & Enter Workspace"}
          </button>
        </div>
      </div>
    </div>
  );
}
