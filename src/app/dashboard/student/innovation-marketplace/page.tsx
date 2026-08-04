"use client";

import React, { useState } from "react";
import { Heart, Eye, ExternalLink, Rocket, GitBranch, Sparkles, CheckCircle2 } from "lucide-react";
import { InnovationMarketplaceService } from "@/lib/institutionOS/InnovationMarketplaceService";

const categoryColors: Record<string, string> = {
  "Startup Idea": "bg-[#d4a017]/15 text-[#d4a017] border-[#d4a017]/30",
  "Capstone Project": "bg-[#4ade80]/15 text-[#4ade80] border-[#4ade80]/30",
  "AI Project": "bg-[#818cf8]/15 text-[#818cf8] border-[#818cf8]/30",
  "Research Paper": "bg-[#fb923c]/15 text-[#fb923c] border-[#fb923c]/30",
  "Open Source": "bg-[#38bdf8]/15 text-[#38bdf8] border-[#38bdf8]/30",
};

export default function InnovationMarketplacePage() {
  const [submissions, setSubmissions] = useState(() => InnovationMarketplaceService.getSubmissions());
  const [toast, setToast] = useState<string | null>(null);

  const handleLike = (id: string) => {
    InnovationMarketplaceService.likeSubmission(id);
    setSubmissions(InnovationMarketplaceService.getSubmissions());
  };

  return (
    <div className="space-y-8 pb-12">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#061428] border border-[#4ade80]/50 text-[#4ade80] text-xs font-extrabold shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded bg-[#818cf8]/15 text-[#818cf8] text-[9px] font-black uppercase border border-[#818cf8]/30">INNOVATION ECOSYSTEM</span>
            <span className="text-[10px] text-[#8899b4]">v3.6</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Innovation Marketplace</h2>
          <p className="text-xs text-[#8899b4]">Publish your startup ideas, capstones, research &amp; open-source projects for investor &amp; industry review</p>
        </div>
        <button
          onClick={() => { setToast("Project submission form coming soon!"); setTimeout(() => setToast(null), 3000); }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#d4a017] text-[#030e1f] text-xs font-extrabold hover:bg-[#b8891a] transition-all shrink-0"
        >
          <Rocket className="w-4 h-4" /> Submit Your Project
        </button>
      </div>

      {/* Submissions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {submissions.map((sub) => (
          <div key={sub.id} className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-5 space-y-4 hover:border-[#d4a017]/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-black uppercase ${categoryColors[sub.category] ?? "bg-[#1a2f4a] text-[#8899b4]"}`}>
                  {sub.category}
                </span>
                {sub.status === "Featured" && (
                  <span className="px-2 py-0.5 rounded bg-[#d4a017]/20 text-[#d4a017] text-[9px] font-black uppercase">★ FEATURED</span>
                )}
              </div>
              <h3 className="text-sm font-extrabold text-white leading-snug">{sub.title}</h3>
              <p className="text-[10px] text-[#8899b4] leading-relaxed line-clamp-3">{sub.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {sub.techStack.map((t) => (
                  <span key={t} className="px-2 py-0.5 rounded-full bg-[#1a2f4a] text-[9px] text-[#8899b4] font-bold">{t}</span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-[#1a2f4a] space-y-3">
              <p className="text-[10px] text-[#8899b4]">by <span className="text-white font-bold">{sub.studentName}</span> · {sub.submittedAt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-[10px] text-[#8899b4]">
                  <button onClick={() => handleLike(sub.id)} className="flex items-center gap-1 hover:text-[#d4a017] transition-colors">
                    <Heart className="w-3.5 h-3.5" /> {sub.likes}
                  </button>
                  <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" /> {sub.views}</span>
                  {sub.fundingInterest && <span className="text-[#4ade80] font-bold">💡 Funding Open</span>}
                </div>
                {sub.liveUrl && (
                  <a href={sub.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-[10px] text-[#d4a017] font-bold hover:underline">
                    <ExternalLink className="w-3 h-3" /> Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
