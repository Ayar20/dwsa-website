"use client";

import React, { useState } from "react";
import { Sparkles, Send, TrendingUp, RefreshCw, FileText, CheckCircle2, Building2 } from "lucide-react";
import { AIOrchestrator } from "@/lib/institutionOS/AIOrchestrator";
import { PromptLibraryService } from "@/lib/institutionOS/PromptLibraryService";

export default function ExecutiveAIAssistantPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [briefing, setBriefing] = useState<string | null>(null);

  const prompts = PromptLibraryService.getPromptsForRole("Admin");

  const handleGenerate = async (text?: string) => {
    const query = text || prompt;
    if (!query.trim()) return;

    setLoading(true);
    const res = await AIOrchestrator.processRequest(query, { role: "Admin" });
    setBriefing(res.response);
    setLoading(false);
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded bg-[#d4a017]/15 text-[#d4a017] text-[9px] font-black uppercase border border-[#d4a017]/30">EXECUTIVE AI</span>
          <span className="text-[10px] text-[#8899b4]">InstitutionOS v3.8 · Provider: {AIOrchestrator.getActiveProvider()}</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white">Executive AI Advisory Hub</h2>
        <p className="text-xs text-[#8899b4]">Executive briefings, institution health analysis, revenue insights &amp; natural-language report synthesis</p>
      </div>

      {/* Prompts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {prompts.map((p) => (
          <button
            key={p.id}
            onClick={() => {
              setPrompt(p.promptText);
              handleGenerate(p.promptText);
            }}
            className="text-left p-4 rounded-3xl bg-[#061428] border border-[#1a2f4a] hover:border-[#d4a017]/40 transition-all space-y-2 group"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-white group-hover:text-[#d4a017]">{p.title}</span>
              <span className="px-2 py-0.5 rounded bg-[#d4a017]/10 text-[#d4a017] text-[9px] font-black">v{p.version}</span>
            </div>
            <p className="text-[10px] text-[#8899b4]">{p.description}</p>
          </button>
        ))}
      </div>

      {/* Executive Briefing Generator */}
      <div className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#d4a017]" /> Natural-Language Executive Intelligence Generator
        </h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Ask Executive AI (e.g. 'Synthesize Q3 revenue trends and graduate placement rate into a board briefing')..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
            className="w-full px-4 py-3 rounded-2xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white placeholder-[#8899b4] focus:outline-none focus:border-[#d4a017]"
          />
          <button
            onClick={() => handleGenerate()}
            disabled={loading || !prompt.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#d4a017] text-[#030e1f] text-xs font-extrabold hover:bg-[#b8891a] transition-all disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {loading ? "Synthesizing Executive Report..." : "Synthesize Report"}
          </button>
        </div>

        {briefing && (
          <div className="pt-4 border-t border-[#1a2f4a] space-y-2">
            <span className="text-[10px] font-black text-[#d4a017] uppercase tracking-wider">Executive Advisory Briefing:</span>
            <div className="p-4 rounded-2xl bg-[#030e1f] border border-[#d4a017]/30 text-xs text-white leading-relaxed whitespace-pre-wrap font-sans">
              {briefing}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
