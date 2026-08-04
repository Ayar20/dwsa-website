"use client";

import React from "react";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import { Lightbulb, Zap, ShieldCheck, Cpu, Code2, Globe, ArrowRight } from "lucide-react";

export default function InnovationPage() {
  return (
    <div className="min-h-screen bg-[#030e1f] text-[#f0f4ff] flex flex-col font-sans">
      <PublicNav />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017] text-xs font-bold">
            <Lightbulb className="w-3.5 h-3.5" />
            RESEARCH &amp; FRONTIER LABS
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Innovation &amp; <span className="text-[#d4a017]">Research Centre (IRC)</span>
          </h1>
          <p className="text-[#8899b4] text-base leading-relaxed">
            IRC is DTA&apos;s focal point for applied research, AI experimentation, blockchain exploration, student innovation challenges, and tech incubation for Africa.
          </p>
        </div>

        {/* Pillars of IRC */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 bg-[#061428] border border-[#d4a017]/30 rounded-3xl space-y-4">
            <div className="p-3 bg-[#d4a017]/15 text-[#d4a017] rounded-xl w-fit">
              <Cpu className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-extrabold text-[#4ade80] bg-[#4ade80]/10 px-2.5 py-0.5 rounded-full border border-[#4ade80]/30 uppercase">
              ACTIVE RESEARCH PILLAR
            </span>
            <h3 className="text-xl font-bold text-white">Applied AI Experimentation</h3>
            <p className="text-xs text-[#8899b4] leading-relaxed">
              Evaluating local African LLM fine-tuning, automated code evaluation pipelines, agentic workflows, and domain-specific generative models.
            </p>
          </div>

          <div className="p-7 bg-[#061428] border border-[#d4a017]/30 rounded-3xl space-y-4">
            <div className="p-3 bg-[#d4a017]/15 text-[#d4a017] rounded-xl w-fit">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-extrabold text-[#d4a017] bg-[#d4a017]/10 px-2.5 py-0.5 rounded-full border border-[#d4a017]/30 uppercase">
              ACTIVE RESEARCH PILLAR
            </span>
            <h3 className="text-xl font-bold text-white">Blockchain &amp; Digital Trust</h3>
            <p className="text-xs text-[#8899b4] leading-relaxed">
              Investigating smart contract security verification, decentralized identity (DID) for African civic records, and zero-knowledge privacy protocols.
            </p>
          </div>

          <div className="p-7 bg-[#061428] border border-[#4ade80]/30 rounded-3xl space-y-4">
            <div className="p-3 bg-[#4ade80]/15 text-[#4ade80] rounded-xl w-fit">
              <Zap className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-extrabold text-[#d4a017] bg-[#d4a017]/10 px-2.5 py-0.5 rounded-full border border-[#d4a017]/30 uppercase">
              FUTURE INITIATIVE
            </span>
            <h3 className="text-xl font-bold text-white">Startup Incubation</h3>
            <p className="text-xs text-[#8899b4] leading-relaxed">
              Providing top DTA graduate engineering teams with seed technical mentorship, cloud infrastructure credits, and investor access.
            </p>
          </div>
        </div>

        {/* Hackathons & Student Showcase */}
        <div className="bg-[#020914] border border-[#d4a017]/20 rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#d4a017] uppercase tracking-wider">PRACTICAL INNOVATION IN ACTION</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Hackathons &amp; Student Showcase</h2>
            <p className="text-xs text-[#8899b4]">Where DTA learners deploy real code to solve real challenges.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-6 bg-[#061428] border border-slate-800 rounded-2xl space-y-3">
              <span className="text-xs font-extrabold text-[#4ade80] bg-[#4ade80]/10 px-2.5 py-0.5 rounded-full uppercase">ANNUAL EVENT</span>
              <h3 className="text-lg font-bold text-white">Annual Pan-African Hackathon</h3>
              <p className="text-xs text-[#8899b4] leading-relaxed">
                A 48-hour competitive sprint bringing together DTA students and external developers to build solution prototypes in FinTech, EdTech, AgriTech, and Health Tech.
              </p>
            </div>

            <div className="p-6 bg-[#061428] border border-slate-800 rounded-2xl space-y-3">
              <span className="text-xs font-extrabold text-[#d4a017] bg-[#d4a017]/10 px-2.5 py-0.5 rounded-full uppercase">STUDENT EXCELLENCE</span>
              <h3 className="text-lg font-bold text-white">Student Innovation Showcase</h3>
              <p className="text-xs text-[#8899b4] leading-relaxed">
                At the conclusion of every 8-week cohort, top capstone projects are presented to DWSA engineering leads and industry partners for potential deployment or recruitment.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-br from-[#061428] to-[#0f2a4a] border border-[#d4a017]/30 rounded-3xl p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold text-white">Partner With IRC on Applied Research</h3>
          <p className="text-xs text-[#8899b4] max-w-xl mx-auto">
            We collaborate with universities, technology companies, and government institutions on joint research and innovation initiatives.
          </p>
          <div className="pt-2">
            <a
              href="https://dws-africa.vercel.app/research"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#d4a017] to-[#e5a910] text-[#030e1f] font-extrabold text-xs shadow-lg shadow-[#d4a017]/20"
            >
              Explore DWSA Research &amp; Development →
            </a>
          </div>
        </div>

      </main>

      <PublicFooter />
    </div>
  );
}
