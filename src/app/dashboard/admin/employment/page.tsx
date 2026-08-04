"use client";

import React from "react";
import { TrendingUp, Briefcase, Award, Users, DollarSign, Building2 } from "lucide-react";
import { EmployerService } from "@/lib/institutionOS/EmployerService";

export default function ExecutiveEmploymentIntelligencePage() {
  const stats = EmployerService.getRecruitmentStats();

  const metrics = [
    { label: "Graduate Employment Rate", value: "92%", sub: "+4% vs previous cohort", color: "text-[#4ade80]" },
    { label: "Internships Completed", value: "48", sub: "Across 12 companies", color: "text-[#d4a017]" },
    { label: "Average Starting Salary", value: "₦980K", sub: "Per month (graduate median)", color: "text-white" },
    { label: "Employer Satisfaction", value: "4.8/5", sub: "Based on 24 employer surveys", color: "text-[#818cf8]" },
    { label: "Hiring Companies (Q3)", value: "34", sub: "Active recruitment pipeline", color: "text-[#4ade80]" },
    { label: "Graduate Success Index", value: "96%", sub: "Employed within 6 months", color: "text-[#d4a017]" },
  ];

  const topHiringCompanies = [
    { name: "First Bank PLC", hires: 6, type: "FinTech Engineering" },
    { name: "MTN Group", hires: 5, type: "Frontend & Cloud Engineering" },
    { name: "Paystack", hires: 4, type: "DevOps & Software Engineering" },
    { name: "Access Bank Digital", hires: 3, type: "Blockchain & Smart Contracts" },
    { name: "Google Africa Labs", hires: 2, type: "AI & Data Engineering" },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded bg-[#4ade80]/15 text-[#4ade80] text-[9px] font-black uppercase border border-[#4ade80]/30">EXECUTIVE INTELLIGENCE</span>
          <span className="text-[10px] text-[#8899b4]">ICC v3.6</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white">Graduate Employment Intelligence</h2>
        <p className="text-xs text-[#8899b4]">Real-time placement analytics, salary benchmarks, employer satisfaction &amp; graduate success metrics</p>
      </div>

      {/* 6-Metric Intelligence Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-5 space-y-1 hover:border-[#d4a017]/40 transition-all">
            <p className={`text-2xl font-extrabold ${m.color}`}>{m.value}</p>
            <p className="text-xs font-extrabold text-white">{m.label}</p>
            <p className="text-[10px] text-[#8899b4]">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Top Hiring Companies */}
      <div className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#d4a017]" /> Top Hiring Employers (Q3 2026)
        </h3>
        <div className="space-y-3">
          {topHiringCompanies.map((c, i) => (
            <div key={c.name} className="flex items-center justify-between p-3 rounded-xl bg-[#030e1f] border border-[#1a2f4a]">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-[#d4a017]/15 text-[#d4a017] text-[10px] font-black flex items-center justify-center shrink-0">#{i + 1}</span>
                <div>
                  <p className="text-xs font-extrabold text-white">{c.name}</p>
                  <p className="text-[10px] text-[#8899b4]">{c.type}</p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80] text-xs font-black">{c.hires} Hires</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
