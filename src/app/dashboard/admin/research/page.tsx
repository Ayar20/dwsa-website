"use client";

import React, { useState } from "react";
import {
  FlaskConical, Sparkles, Lightbulb, BookOpen, Globe, Award,
  Shield, PlusCircle, CheckCircle2, ChevronRight
} from "lucide-react";

const researchProjects = [
  { id: 1, title: "LLM Fine-Tuning for African Banking Codebases", lead: "Prof. Amina Bello", budget: "₦8.5M", status: "Active", publication: "In Review" },
  { id: 2, title: "Zero-Knowledge Cryptographic Authentication Protocol", lead: "Dr. Marcus Vance", budget: "₦12.0M", status: "Active", publication: "Published" },
  { id: 3, title: "Distributed High-Throughput Microservice Architecture", lead: "Aisha Mohammed, MSc", budget: "₦5.0M", status: "Planning", publication: "Draft" },
];

const innovationChallenges = [
  { title: "DWSA Fintech Hackathon 2026", participants: "12 Teams", prize: "₦3.0M Seed Grant", status: "Registration Open" },
  { title: "AI for Agriculture Challenge", participants: "8 Teams", prize: "₦2.5M Seed Grant", status: "In Progress" },
];

export default function ResearchPage() {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#818cf8]/15 text-[#818cf8] text-[9px] font-black uppercase">RESEARCH &amp; INNOVATION</span>
            <span className="text-[10px] text-[#8899b4]">DWSA Labs</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">Research &amp; Innovation Management</h2>
          <p className="text-xs text-[#8899b4]">Manage institutional research grants, publications, innovation challenges &amp; tech incubation</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#d4a017] text-[#030e1f] text-xs font-extrabold hover:bg-[#b8891a] transition-all">
          <PlusCircle className="w-4 h-4" /> New Research Proposal
        </button>
      </div>

      {/* Projects */}
      <div className="space-y-4">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
          <FlaskConical className="w-4 h-4 text-[#818cf8]" />
          Active Institutional Research Projects
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {researchProjects.map((p) => (
            <div key={p.id} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-5 space-y-3 hover:border-[#818cf8]/40 transition-all">
              <span className="px-2.5 py-0.5 rounded bg-[#818cf8]/15 text-[#818cf8] text-[9px] font-black">{p.status}</span>
              <h4 className="text-sm font-extrabold text-white leading-snug">{p.title}</h4>
              <p className="text-xs text-[#8899b4]">Lead: {p.lead}</p>
              <div className="flex items-center justify-between text-xs border-t border-[#1a2f4a] pt-2 text-[#8899b4]">
                <span>Grant: <strong className="text-white">{p.budget}</strong></span>
                <span>Publication: <strong className="text-[#4ade80]">{p.publication}</strong></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Innovation Challenges */}
      <div className="space-y-4">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-[#d4a017]" />
          Technology Innovation Challenges &amp; Hackathons
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {innovationChallenges.map((ic) => (
            <div key={ic.title} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-5 space-y-3 flex items-center justify-between">
              <div>
                <span className="px-2.5 py-0.5 rounded bg-[#d4a017]/15 text-[#d4a017] text-[9px] font-black">{ic.status}</span>
                <h4 className="text-sm font-extrabold text-white mt-1">{ic.title}</h4>
                <p className="text-xs text-[#8899b4]">{ic.participants} · Prize Pool: {ic.prize}</p>
              </div>
              <button className="px-3 py-1.5 rounded-xl bg-[#030e1f] border border-[#d4a017]/30 text-[#d4a017] text-xs font-bold hover:bg-[#d4a017] hover:text-[#030e1f] transition-all">
                Manage
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
