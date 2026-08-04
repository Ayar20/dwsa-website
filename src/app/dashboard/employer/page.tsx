"use client";

import React from "react";
import { Search, ShieldCheck, CheckCircle2, Users, TrendingUp, Building2 } from "lucide-react";
import { EmployerService } from "@/lib/institutionOS/EmployerService";

export default function EmployerPortalPage() {
  const candidates = EmployerService.getCandidates();
  const stats = EmployerService.getRecruitmentStats();

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded bg-[#d4a017]/15 text-[#d4a017] text-[9px] font-black uppercase border border-[#d4a017]/30">EMPLOYER PORTAL</span>
          <span className="text-[10px] text-[#8899b4]">InstitutionOS v3.6 · Future-Ready</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white">Employer Recruitment Dashboard</h2>
        <p className="text-xs text-[#8899b4]">Browse verified DTA graduates, search candidate competencies, and schedule interviews — all in one workspace.</p>
      </div>

      {/* Recruitment Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Candidates Available", value: stats.totalCandidatesAvailable, color: "text-[#d4a017]" },
          { label: "Avg. Readiness Score", value: `${stats.avgReadinessScore}%`, color: "text-[#4ade80]" },
          { label: "Interviews Completed", value: stats.interviewsCompleted, color: "text-white" },
          { label: "Offers Accepted", value: stats.offersAccepted, color: "text-[#818cf8]" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-4 space-y-1">
            <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-[#8899b4] font-bold uppercase">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Candidate Search */}
      <div className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
          <Search className="w-4 h-4 text-[#d4a017]" /> Candidate Intelligence Database
        </h3>
        <div className="rounded-2xl border border-[#1a2f4a] overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#030e1f] text-[#8899b4] text-[10px] uppercase font-black tracking-wider border-b border-[#1a2f4a]">
              <tr>
                <th className="p-4">Candidate</th>
                <th className="p-4">Programme</th>
                <th className="p-4">GPA Eq.</th>
                <th className="p-4">Readiness</th>
                <th className="p-4">Top Skills</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a2f4a] text-white">
              {candidates.map((c) => (
                <tr key={c.id} className="hover:bg-[#0f223d]/40 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#d4a017] to-[#b8891a] text-[#030e1f] flex items-center justify-center font-black text-xs shrink-0">
                        {c.studentName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-extrabold text-white">{c.studentName}</p>
                        <p className="text-[9px] font-mono text-[#8899b4]">{c.verificationCode}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-[#8899b4] max-w-[160px] truncate">{c.programme}</td>
                  <td className="p-4 font-extrabold text-[#4ade80]">{c.gpaEquivalent}</td>
                  <td className="p-4 font-extrabold text-[#d4a017]">{c.readinessScore}%</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1">
                      {c.topSkills.slice(0, 3).map((sk) => (
                        <span key={sk} className="px-1.5 py-0.5 rounded bg-[#1a2f4a] text-[9px] text-[#8899b4] font-bold">{sk}</span>
                      ))}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase ${c.status === "Available" ? "bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80]" : c.status === "Hired" ? "bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017]" : "bg-[#818cf8]/10 border border-[#818cf8]/30 text-[#818cf8]"}`}>
                      {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
