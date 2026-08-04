"use client";

import React, { useState } from "react";
import { BookOpen, Search, FileText, CheckCircle2, Tag } from "lucide-react";
import { KnowledgeService } from "@/lib/institutionOS/KnowledgeService";

const categoryColors: Record<string, string> = {
  Policy: "bg-[#d4a017]/15 text-[#d4a017] border-[#d4a017]/30",
  Procedure: "bg-[#4ade80]/15 text-[#4ade80] border-[#4ade80]/30",
  Template: "bg-[#818cf8]/15 text-[#818cf8] border-[#818cf8]/30",
  Guideline: "bg-[#fb923c]/15 text-[#fb923c] border-[#fb923c]/30",
  Research: "bg-[#38bdf8]/15 text-[#38bdf8] border-[#38bdf8]/30",
  "Teaching Resource": "bg-[#a78bfa]/15 text-[#a78bfa] border-[#a78bfa]/30",
  "Operational Manual": "bg-[#f472b6]/15 text-[#f472b6] border-[#f472b6]/30",
};

export default function KnowledgeCentrePage() {
  const [query, setQuery] = useState("");
  const articles = query.trim() ? KnowledgeService.search(query) : KnowledgeService.getAll();

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1"><span className="px-2.5 py-0.5 rounded bg-[#818cf8]/15 text-[#818cf8] text-[9px] font-black uppercase border border-[#818cf8]/30">KNOWLEDGE ENGINE</span><span className="text-[10px] text-[#8899b4]">v3.7</span></div>
          <h2 className="text-2xl font-extrabold text-white">Institution Knowledge Centre</h2>
          <p className="text-xs text-[#8899b4]">Policies, procedures, templates, research, teaching resources &amp; operational manuals — all versioned &amp; searchable</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#d4a017] text-[#030e1f] text-xs font-extrabold hover:bg-[#b8891a] transition-all shrink-0">
          <FileText className="w-4 h-4" /> New Article
        </button>
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8899b4]" />
        <input type="search" placeholder="Search knowledge base..." value={query} onChange={e => setQuery(e.target.value)} className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#061428] border border-[#1a2f4a] text-xs text-white placeholder-[#8899b4] focus:outline-none focus:border-[#d4a017]" />
      </div>

      {/* Articles */}
      <div className="space-y-3">
        {articles.map(a => (
          <div key={a.id} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-5 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:border-[#d4a017]/30 transition-all">
            <div className="space-y-2 flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-black uppercase ${categoryColors[a.category] ?? "bg-[#1a2f4a] text-[#8899b4]"}`}>{a.category}</span>
                <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-black uppercase ${a.status === "Approved" ? "bg-[#4ade80]/10 border-[#4ade80]/30 text-[#4ade80]" : "bg-[#d4a017]/10 border-[#d4a017]/30 text-[#d4a017]"}`}>{a.status}</span>
              </div>
              <h3 className="text-sm font-extrabold text-white">{a.title}</h3>
              <p className="text-[10px] text-[#8899b4] leading-relaxed">{a.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {a.tags.map(t => <span key={t} className="px-2 py-0.5 rounded-full bg-[#1a2f4a] text-[9px] text-[#8899b4] font-bold flex items-center gap-1"><Tag className="w-2.5 h-2.5" />{t}</span>)}
              </div>
            </div>
            <div className="text-right shrink-0 space-y-1">
              <p className="text-xs font-black text-[#d4a017]">v{a.version}</p>
              <p className="text-[10px] text-[#8899b4]">{a.author}</p>
              <p className="text-[9px] text-[#8899b4]">{a.lastUpdated}</p>
              <button className="text-[10px] font-black text-[#d4a017] hover:underline">View →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
