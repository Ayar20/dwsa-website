"use client";

import React, { useState } from "react";
import {
  Sparkles, AlertTriangle, CheckCircle2, BarChart2, Clock,
  ChevronRight, Zap, Shield, DollarSign, GraduationCap, Users,
  FileText, Cpu, TrendingUp, Send, Loader2, RefreshCw
} from "lucide-react";
import { requestAI } from "@/lib/ai-client";

export default function AdminAIAgentPage() {
  const [promptInput, setPromptInput] = useState("");
  const [activeDomain, setActiveDomain] = useState<"operations" | "compliance" | "finance" | "academic">("operations");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const handleGenerate = async (customPrompt?: string) => {
    const query = (customPrompt || promptInput).trim();
    if (!query || isGenerating) return;

    setIsGenerating(true);
    setAiReport(null);

    try {
      const res = await requestAI(`[Institutional Admin Task: ${activeDomain.toUpperCase()}] ${query}`, "Admin");
      setAiReport(res.response);
      setToast("Executive briefing generated successfully!");
      setTimeout(() => setToast(null), 3000);
    } catch (err: any) {
      setAiReport(`Failed to generate: ${err.message || "Please check server environment."}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const domainPresets = {
    operations: "Generate an operational health audit for DWSA Digital Technology Academy, assessing cohort progression, attendance benchmarks, and LMS server uptime.",
    compliance: "Evaluate accreditation compliance and Nigerian data privacy standards (NDPR) for learner identity records and certificate issuance pipelines.",
    finance: "Analyze tuition payment reconciliation across Paystack and Corporate Bank transfers (Zenith, Fidelity, UBA), and project cashflow for upcoming cohorts.",
    academic: "Synthesize academic quality metrics, learner completion milestones, and curriculum alignment for the Generative AI for Work & Productivity programme.",
  };

  return (
    <div className="min-h-screen space-y-6 pb-8">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#061428] border border-[#4ade80]/50 text-[#4ade80] text-xs font-extrabold shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {toast}
        </div>
      )}

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#030e1f] via-[#061428] to-[#0a1f40] border border-[#38bdf8]/20 p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-[#38bdf8]/5 via-transparent to-[#818cf8]/5" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] flex items-center justify-center shadow-lg shadow-[#38bdf8]/20">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-xl font-black text-white tracking-tight">Pulse — Institutional Operations AI Agent</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#4ade80]/20 text-[#4ade80] text-[10px] font-black tracking-widest border border-[#4ade80]/30">
                  LIVE · GEMINI
                </span>
              </div>
              <p className="text-sm text-[#8899b4]">Monitors operations, compliance &amp; finance · Synthesizes administrative reports on demand</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-center">
            <div>
              <div className="text-lg font-black text-[#38bdf8]">Real-time</div>
              <div className="text-[10px] text-[#8899b4] font-bold">Admin AI Core</div>
            </div>
            <div className="w-px h-8 bg-[#1a2f4a]" />
            <div>
              <div className="text-lg font-black text-white">Gemini 2.0</div>
              <div className="text-[10px] text-[#8899b4] font-bold">Engine</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT: Operational Domains */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-[#040f20] border border-[#1a2f4a] p-4 space-y-3">
            <h2 className="text-xs font-black text-[#8899b4] uppercase tracking-widest">Operational Domains</h2>
            <div className="space-y-1.5">
              {[
                { id: "operations", label: "Operations Health", icon: <Cpu className="w-3.5 h-3.5" />, desc: "Cohort milestones & LMS uptime" },
                { id: "finance", label: "Tuition & Reconciliation", icon: <DollarSign className="w-3.5 h-3.5" />, desc: "Paystack & bank ledger analysis" },
                { id: "compliance", label: "Accreditation & NDPR", icon: <Shield className="w-3.5 h-3.5" />, desc: "Regulatory & policy checks" },
                { id: "academic", label: "Academic Performance", icon: <GraduationCap className="w-3.5 h-3.5" />, desc: "Curriculum quality & completion" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveDomain(item.id as any);
                    setPromptInput(domainPresets[item.id as keyof typeof domainPresets]);
                  }}
                  className={`w-full p-3 rounded-xl text-left text-xs font-bold transition-all flex items-start gap-2.5 ${
                    activeDomain === item.id
                      ? "bg-[#38bdf8]/20 border border-[#38bdf8]/40 text-white"
                      : "bg-[#061428] border border-[#1a2f4a] text-[#8899b4] hover:text-white"
                  }`}
                >
                  <div className="text-[#38bdf8] mt-0.5">{item.icon}</div>
                  <div>
                    <p className="font-black text-white">{item.label}</p>
                    <p className="text-[11px] text-[#6b7a94] mt-0.5">{item.desc}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Interactive AI Console */}
        <div className="xl:col-span-2 rounded-2xl bg-[#040f20] border border-[#1a2f4a] p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-[#1a2f4a] pb-4">
            <div>
              <h2 className="text-base font-black text-white">Administrative Intelligence Console</h2>
              <p className="text-xs text-[#8899b4] mt-0.5">Generate real-time executive summaries, audit logs, or operational directives.</p>
            </div>
            <button
              onClick={() => handleGenerate(domainPresets[activeDomain])}
              disabled={isGenerating}
              className="px-3 py-1.5 rounded-xl bg-[#061428] border border-[#1a2f4a] text-xs font-bold text-[#38bdf8] hover:bg-[#0c1b33] flex items-center gap-1.5 disabled:opacity-50"
            >
              <Zap className="w-3.5 h-3.5" /> Load Preset
            </button>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-black text-[#8899b4] uppercase tracking-wider">
              Directive / Query
            </label>
            <textarea
              rows={4}
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="e.g. Generate a weekly operations review for cohort GENAI-WP-001..."
              className="w-full p-4 rounded-xl bg-[#061428] border border-[#1a2f4a] text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#38bdf8]"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => handleGenerate()}
              disabled={isGenerating || !promptInput.trim()}
              className="px-6 py-3 rounded-xl bg-[#38bdf8] hover:bg-[#0ea5e9] text-[#030e1f] text-xs font-black flex items-center gap-2 disabled:opacity-50 transition-all shadow-md"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Generating Executive Briefing…
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Synthesize Report
                </>
              )}
            </button>
          </div>

          {/* AI Output */}
          {aiReport && (
            <div className="p-5 rounded-2xl bg-[#061428] border border-[#38bdf8]/30 space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#38bdf8] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Pulse AI Strategic Intelligence Briefing
                </span>
                <span className="text-[10px] text-[#8899b4]">Grounded by DWSA Institutional Knowledge</span>
              </div>
              <div className="text-xs text-[#c8d8f0] leading-relaxed whitespace-pre-wrap font-sans bg-[#030e1f] p-4 rounded-xl border border-[#1a2f4a]">
                {aiReport}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
