"use client";

import React, { useState } from "react";
import {
  Briefcase, Search, Sparkles, CheckCircle2, BookmarkPlus,
  SendHorizonal, TrendingUp, MapPin, Clock, Star
} from "lucide-react";
import { CareerPlacementService } from "@/lib/institutionOS/CareerPlacementService";

const studentSkills = ["React", "TypeScript", "Next.js", "Node.js", "GitHub Actions", "PostgreSQL"];

export default function CareerPlacementPage() {
  const [jobs, setJobs] = useState(() => CareerPlacementService.getOpportunities());
  const [toast, setToast] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const handleApply = (id: string) => {
    CareerPlacementService.applyToJob(id);
    setJobs(CareerPlacementService.getOpportunities());
    setToast("Application submitted! The employer has been notified.");
    setTimeout(() => setToast(null), 3000);
  };

  const filtered = jobs.filter(
    (j) => j.title.toLowerCase().includes(search.toLowerCase()) || j.companyName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#061428] border border-[#4ade80]/50 text-[#4ade80] text-xs font-extrabold shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {toast}
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded bg-[#d4a017]/15 text-[#d4a017] text-[9px] font-black uppercase">ENTERPRISE ENGAGEMENT</span>
          <span className="text-[10px] text-[#8899b4]">v3.6</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white">Career Placement Centre</h2>
        <p className="text-xs text-[#8899b4]">AI-matched job opportunities, internship listings &amp; graduate programmes tailored to your skill profile</p>
      </div>

      {/* Your Skills Banner */}
      <div className="rounded-2xl bg-[#061428] border border-[#d4a017]/30 p-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <span className="text-[10px] font-black text-[#d4a017] uppercase shrink-0">Your Verified Skills:</span>
        <div className="flex flex-wrap gap-2">
          {studentSkills.map((s) => (
            <span key={s} className="px-2.5 py-0.5 rounded-full bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017] text-[10px] font-bold">{s}</span>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8899b4]" />
        <input
          type="search"
          placeholder="Search roles, companies..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#061428] border border-[#1a2f4a] text-xs text-white placeholder-[#8899b4] focus:outline-none focus:border-[#d4a017]"
        />
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {filtered.map((job) => (
          <div key={job.id} className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-5 flex flex-col sm:flex-row sm:items-start gap-4 hover:border-[#d4a017]/40 transition-all shadow-lg">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#d4a017] to-[#b8891a] text-[#030e1f] flex items-center justify-center font-black text-sm shrink-0">
              {job.companyLogo}
            </div>
            <div className="flex-1 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-sm font-extrabold text-white">{job.title}</h3>
                <span className="px-2 py-0.5 rounded bg-[#4ade80]/10 border border-[#4ade80]/20 text-[#4ade80] text-[9px] font-black">{job.matchPercentage}% MATCH</span>
              </div>
              <p className="text-xs text-[#d4a017] font-bold">{job.companyName}</p>
              <div className="flex flex-wrap gap-3 text-[10px] text-[#8899b4]">
                <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{job.location}</span>
                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{job.type}</span>
                <span className="font-bold text-white">{job.salaryRange}</span>
              </div>

              {/* Skills Comparison */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {job.skillsRequired.map((sk) => (
                  <span key={sk} className={`px-2 py-0.5 rounded-full text-[9px] font-bold border ${studentSkills.includes(sk) ? "bg-[#4ade80]/10 border-[#4ade80]/30 text-[#4ade80]" : "bg-[#1a2f4a] border-[#1a2f4a] text-[#8899b4]"}`}>
                    {studentSkills.includes(sk) ? "✓ " : ""}{sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex sm:flex-col gap-2 shrink-0">
              <button
                onClick={() => handleApply(job.id)}
                disabled={job.status === "Applied"}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#d4a017] text-[#030e1f] text-xs font-extrabold hover:bg-[#b8891a] transition-all disabled:opacity-50"
              >
                <SendHorizonal className="w-3.5 h-3.5" />
                {job.status === "Applied" ? "Applied ✓" : "Apply Now"}
              </button>
              <span className="text-[9px] text-[#8899b4] text-center">{job.postedDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
