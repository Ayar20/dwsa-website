"use client";

import React from "react";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import { Layers, Globe, GraduationCap, Building2, Lightbulb, ExternalLink, ShieldCheck, ArrowRight } from "lucide-react";

export default function EcosystemPage() {
  return (
    <div className="min-h-screen bg-[#030e1f] text-[#f0f4ff] flex flex-col font-sans">
      <PublicNav />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017] text-xs font-bold">
            <Layers className="w-3.5 h-3.5" />
            CORPORATE ARCHITECTURE
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            The DWSA <span className="text-[#d4a017]">Ecosystem</span>
          </h1>
          <p className="text-[#8899b4] text-base leading-relaxed">
            Digital World Systems Africa Ltd (RC 9718724) is a multi-pillar technology institution building Africa&apos;s digital infrastructure through software systems, capability development, consulting, and frontier research.
          </p>
        </div>

        {/* Corporate Hierarchy Diagram */}
        <div className="p-8 sm:p-12 bg-[#061428] border-2 border-[#d4a017] rounded-3xl space-y-8 text-center shadow-xl">
          <div className="inline-flex items-center gap-3 bg-[#030e1f] border border-[#d4a017]/50 px-6 py-3 rounded-2xl">
            <Globe className="w-6 h-6 text-[#d4a017]" />
            <div className="text-left">
              <h2 className="text-lg font-black text-white">Digital World Systems Africa Ltd</h2>
              <span className="text-[10px] text-[#d4a017]/70 font-bold uppercase">CAC Registered Corporate Entity • RC 9718724</span>
            </div>
          </div>

          <p className="text-xs text-[#8899b4] max-w-xl mx-auto">
            Our operations are structured around four strategic pillars. Strategic technology domains — including Artificial Intelligence and Blockchain — support every pillar.
          </p>

          {/* 4 Pillars Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left pt-4">
            
            <div className="p-6 bg-[#030e1f] border border-[#d4a017]/30 rounded-2xl space-y-3">
              <span className="text-[10px] font-extrabold text-[#d4a017] uppercase tracking-wider">PILLAR 1</span>
              <h3 className="text-base font-bold text-white">Enterprise Technology</h3>
              <p className="text-xs text-[#8899b4] leading-relaxed">
                Building proprietary enterprise operating systems including EnterpriseOS, Educare School System, AgriOps, and Julsona Hotel Management.
              </p>
              <a href="https://dwsa-enterpriseos.vercel.app" target="_blank" rel="noreferrer" className="text-xs font-bold text-[#d4a017] flex items-center gap-1 pt-1 hover:text-[#e5a910] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] rounded">
                Explore Enterprise OS <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </div>

            <div className="p-6 bg-[#030e1f] border-2 border-[#d4a017] rounded-2xl space-y-3 shadow-lg shadow-[#d4a017]/10">
              <span className="text-[10px] font-extrabold text-[#d4a017] uppercase tracking-wider">PILLAR 2 (THIS PORTAL)</span>
              <h3 className="text-base font-bold text-white">Digital Technology Academy</h3>
              <p className="text-xs text-[#8899b4] leading-relaxed">
                Human capability development engine preparing full-stack software engineers, AI developers, and digital leaders for Africa.
              </p>
              <Link href="/about" className="text-xs font-bold text-[#d4a017] flex items-center gap-1 pt-1">
                About DTA <ArrowRight className="w-3 h-3" />
              </Link>
            </div>

            <div className="p-6 bg-[#030e1f] border border-[#4ade80]/30 rounded-2xl space-y-3">
              <span className="text-[10px] font-extrabold text-[#4ade80] uppercase tracking-wider">PILLAR 3</span>
              <h3 className="text-base font-bold text-white">Technology Consulting</h3>
              <p className="text-xs text-[#8899b4] leading-relaxed">
                Advising government bodies, financial institutions, and corporations on digital transformation, IT infrastructure, and compliance.
              </p>
              <a href="https://dws-africa.vercel.app" target="_blank" rel="noreferrer" className="text-xs font-bold text-[#4ade80] flex items-center gap-1 pt-1">
                Corporate Site <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <div className="p-6 bg-[#030e1f] border border-[#d4a017]/30 rounded-2xl space-y-3">
              <span className="text-[10px] font-extrabold text-[#d4a017] uppercase tracking-wider">PILLAR 4</span>
              <h3 className="text-base font-bold text-white">Research &amp; Innovation</h3>
              <p className="text-xs text-[#8899b4] leading-relaxed">
                Pioneering applied AI models, blockchain protocol analysis, distributed trust systems, and open frontier technology research.
              </p>
              <a href="https://dws-africa.vercel.app/research" target="_blank" rel="noreferrer" className="text-xs font-bold text-[#d4a017] flex items-center gap-1 pt-1">
                Explore Research Page <ExternalLink className="w-3 h-3" />
              </a>
            </div>

          </div>
        </div>

        {/* Corporate Governance Callout */}
        <div className="bg-[#020914] border border-[#d4a017]/20 rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <span className="text-[10px] font-extrabold text-[#d4a017] uppercase tracking-wider">INSTITUTIONAL GOVERNANCE</span>
            <h3 className="text-xl font-bold text-white">Institutional Leadership &amp; Governance</h3>
            <p className="text-xs text-[#8899b4]">
              DWSA operates under a formal governance structure, ethics board, and responsible innovation framework.
            </p>
          </div>
          <a
            href="https://dws-africa.vercel.app/governance"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3 rounded-xl bg-[#0f223d] border border-[#d4a017]/40 text-[#d4a017] font-bold text-xs shrink-0 flex items-center gap-2"
          >
            View DWSA Governance <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </main>

      <PublicFooter />
    </div>
  );
}
