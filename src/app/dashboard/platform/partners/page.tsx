"use client";

import React from "react";
import {
  Users, Globe, Building2, GraduationCap, ShieldCheck, ArrowUpRight, Award, Zap
} from "lucide-react";

const partners = [
  { id: "p-01", name: "Federal Ministry of Education (Nigeria)", category: "Government", status: "Active Alliance", activeProjects: 4, jointProgrammes: "National Graduate Skill Registry & NUC Accreditation Engine" },
  { id: "p-02", name: "Microsoft Africa Development Centre", category: "Technology", status: "Strategic Partner", activeProjects: 6, jointProgrammes: "M365 Cloud Academy & Azure AI Certification" },
  { id: "p-03", name: "Google for Education Africa", category: "Technology", status: "Strategic Partner", activeProjects: 3, jointProgrammes: "Google Workspace & Android Dev Ecosystem" },
  { id: "p-04", name: "Paystack / Stripe Financial Technologies", category: "Corporate", status: "Financial Partner", activeProjects: 2, jointProgrammes: "Pan-African Tuition Settlement Infrastructure" },
  { id: "p-05", name: "African Development Bank (AfDB)", category: "Research", status: "Funding Partner", activeProjects: 2, jointProgrammes: "Digital Youth Employability Initiative (DYEP 2026)" },
];

export default function DigitalPartnerNetworkPage() {
  return (
    <div className="min-h-screen space-y-6 pb-8">

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#030e1f] via-[#061428] to-[#0a1f40] border border-[#d4a017]/25 p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-[#d4a017]/5 via-transparent to-[#f472b6]/5" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#f472b6] via-[#ec4899] to-[#db2777] flex items-center justify-center shadow-lg shadow-[#f472b6]/20 text-white">
              <Users className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-xl font-black text-white tracking-tight">Digital Partner Network & Alliance Engine</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#f472b6]/20 text-[#f472b6] text-[10px] font-black tracking-widest border border-[#f472b6]/30">PAN-AFRICAN ALLIANCE</span>
              </div>
              <p className="text-sm text-[#8899b4]">Governments, corporate sponsors, technology vendors & research institutes powering African education</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-3 py-1.5 rounded-xl bg-[#d4a017] text-[#030e1f] text-xs font-black hover:bg-[#b8860b]">
              + Onboard New Partner
            </button>
          </div>
        </div>
      </div>

      {/* Partner Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {partners.map((p) => (
          <div key={p.id} className="p-5 rounded-2xl bg-[#040f20] border border-[#1a2f4a] space-y-4 hover:border-[#d4a017]/40 transition-all flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-2 py-0.5 rounded bg-[#d4a017]/10 text-[#d4a017] text-[9px] font-black uppercase border border-[#d4a017]/30">
                  {p.category}
                </span>
                <span className="text-[10px] text-[#4ade80] font-black">{p.status}</span>
              </div>

              <h3 className="text-sm font-black text-white">{p.name}</h3>
              <p className="text-xs text-[#8899b4]">Joint Programme: <span className="text-[#c8d8f0] font-bold">{p.jointProgrammes}</span></p>
            </div>

            <div className="pt-3 border-t border-[#1a2f4a] flex items-center justify-between text-xs">
              <span className="text-[#6b7a94]">Active Projects: <strong className="text-white">{p.activeProjects}</strong></span>
              <button className="text-[#d4a017] font-bold hover:underline flex items-center gap-1">
                View Partner Profile <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
