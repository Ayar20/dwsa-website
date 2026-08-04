"use client";

import React from "react";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import { Briefcase, CheckCircle2, Award, Zap, Globe, ArrowRight, ShieldCheck } from "lucide-react";

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-[#030e1f] text-[#f0f4ff] flex flex-col font-sans">
      <PublicNav />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80] text-xs font-bold">
            <Briefcase className="w-3.5 h-3.5" />
            EMPLOYABILITY &amp; VENTURE LAUNCH
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Career &amp; <span className="text-[#d4a017]">Entrepreneurship Centre</span>
          </h1>
          <p className="text-[#8899b4] text-base leading-relaxed">
            DTA is committed to long-term learner success. We prepare software engineering graduates for remote global tech roles, freelancing, and launching technical startup ventures across Africa.
          </p>
        </div>

        {/* 6 Support Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-7 bg-[#061428] border border-[#d4a017]/30 rounded-3xl space-y-3">
            <div className="text-3xl">🎯</div>
            <h3 className="text-lg font-bold text-white">Career Guidance &amp; Portfolio Prep</h3>
            <p className="text-xs text-[#8899b4] leading-relaxed">
              One-on-one technical resume optimization, GitHub profile polishing, LinkedIn positioning, and mock technical interview preparation.
            </p>
          </div>

          <div className="p-7 bg-[#061428] border border-[#d4a017]/30 rounded-3xl space-y-3">
            <div className="text-3xl">⚡</div>
            <h3 className="text-lg font-bold text-white">Internship Pathways</h3>
            <p className="text-xs text-[#8899b4] leading-relaxed">
              Connecting top graduates with internal engineering projects at Digital World Systems Africa Ltd and our network of enterprise partners.
            </p>
          </div>

          <div className="p-7 bg-[#061428] border border-[#4ade80]/30 rounded-3xl space-y-3">
            <div className="text-3xl">🚀</div>
            <h3 className="text-lg font-bold text-white">Entrepreneurship &amp; Incubation</h3>
            <p className="text-xs text-[#8899b4] leading-relaxed">
              Coaching student technical founders on MVP development, product-market fit, cloud infrastructure setup, and pitch deck refinement.
            </p>
          </div>

          <div className="p-7 bg-[#061428] border border-slate-800 rounded-3xl space-y-3">
            <div className="text-3xl">💼</div>
            <h3 className="text-lg font-bold text-white">Freelancing &amp; Remote Work</h3>
            <p className="text-xs text-[#8899b4] leading-relaxed">
              Teaching developers how to win global remote contracts on platforms like Upwork, Toptal, and GitHub Marketplace with international client communication skills.
            </p>
          </div>

          <div className="p-7 bg-[#061428] border border-slate-800 rounded-3xl space-y-3">
            <div className="text-3xl">🌍</div>
            <h3 className="text-lg font-bold text-white">Industry Mentorship</h3>
            <p className="text-xs text-[#8899b4] leading-relaxed">
              Regular mentorship sessions with senior software architects, AI researchers, and CTOs across the African technology ecosystem.
            </p>
          </div>

          <div className="p-7 bg-[#061428] border border-slate-800 rounded-3xl space-y-3">
            <div className="text-3xl">📜</div>
            <h3 className="text-lg font-bold text-white">Verified Certificate Credentials</h3>
            <p className="text-xs text-[#8899b4] leading-relaxed">
              Graduates receive an official DWSA Certificate of Completion (RC 9718724) with online QR verification for employers.
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#020914] border border-[#d4a017]/30 rounded-3xl p-8 sm:p-12 text-center space-y-4">
          <h2 className="text-2xl font-bold text-white">Build Your Tech Career With DWSA</h2>
          <p className="text-xs text-[#8899b4]">Join Cohort 2026 and access dedicated career support</p>
          <div className="pt-2">
            <Link href="/admissions" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-[#030e1f] font-extrabold text-xs shadow-lg shadow-[#4ade80]/20">
              Apply for Admission →
            </Link>
          </div>
        </div>

      </main>

      <PublicFooter />
    </div>
  );
}
