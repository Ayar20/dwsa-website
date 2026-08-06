"use client";

import React from "react";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import { GraduationCap, ArrowRight, ShieldCheck, Award, Compass, Globe, Users, Target, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans">
      <PublicNav />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        
        {/* Hero */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FEFCE8] border border-[#D4A017]/30 text-[#D4A017] text-xs font-bold">
            <Compass className="w-3.5 h-3.5" />
            INSTITUTIONAL PROFILE
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#0F172A] tracking-tight leading-tight">
            About Digital Technology <span className="text-[#15803D]">Academy</span>
          </h1>
          <p className="text-slate-600 text-base leading-relaxed">
            Digital Technology Academy (DTA) is the education and human capability development engine of <strong className="text-[#0F172A]">Digital World Systems Africa Ltd (RC 9718724)</strong>. We exist to develop Africa&apos;s next generation of technology professionals, innovators, and digital leaders.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-sm hover:border-[#D4A017]/40 transition-all">
            <div className="p-3 bg-[#FEFCE8] text-[#D4A017] rounded-xl w-fit border border-[#D4A017]/30">
              <Globe className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#0F172A]">Our Vision</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              To become Africa&apos;s premier digital campus and technology institute — recognized globally for cultivating high-caliber software engineers, AI practitioners, blockchain specialists, and digital entrepreneurs who drive Africa&apos;s digital transformation.
            </p>
          </div>

          <div className="p-8 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-sm hover:border-[#15803D]/40 transition-all">
            <div className="p-3 bg-[#F0FDF4] text-[#15803D] rounded-xl w-fit border border-[#15803D]/20">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#0F172A]">Our Mission</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              To equip individuals, organizations, and institutions with practical technical knowledge, rigorous engineering discipline, and innovation capabilities in emerging technologies through project-first experiential learning.
            </p>
          </div>
        </div>

        {/* Our Story & DWSA Alignment */}
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 space-y-6 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
            Our Story &amp; <span className="text-[#15803D]">Institutional Mandate</span>
          </h2>
          <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
            <p>
              Across Africa, the demand for production-ready software engineers and emerging tech specialists far outpaces supply. Traditional academic curricula often lag behind industrial realities, while superficial online tutorials fail to instill engineering discipline.
            </p>
            <p>
              Digital Technology Academy (DTA) was established by Digital World Systems Africa Ltd to address this gap directly through hands-on experiential education, automated GitHub assessment pipelines, and real-world project portfolios.
            </p>
          </div>
        </div>

        {/* P.R.I.D.E. Conduct Standard */}
        <div className="bg-[#F8FAFC] border border-slate-200 rounded-3xl p-8 space-y-6">
          <h2 className="text-2xl font-extrabold text-[#0F172A] flex items-center gap-2">
            <Award className="w-6 h-6 text-[#D4A017]" />
            The P.R.I.D.E. Conduct Standard
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            {[
              { letter: "P", name: "Professionalism", desc: "Global engineering ethics & institutional excellence", color: "bg-[#D4A017]" },
              { letter: "R", name: "Resilience", desc: "Solving complex algorithmic challenges with persistence", color: "bg-[#D4A017]" },
              { letter: "I", name: "Integrity", desc: "Academic honesty & clean code standards", color: "bg-[#15803D]" },
              { letter: "D", name: "Discipline", desc: "Daily practice & automated GitHub PR reviews", color: "bg-[#D4A017]" },
              { letter: "E", name: "Excellence", desc: "Delivering production-grade applications", color: "bg-[#15803D]" },
            ].map((p) => (
              <div key={p.letter} className="p-4 bg-white border border-slate-200 rounded-2xl space-y-2 text-center shadow-xs">
                <span className={`w-8 h-8 rounded-lg ${p.color} text-white font-black text-sm flex items-center justify-center mx-auto`}>
                  {p.letter}
                </span>
                <strong className="block text-xs text-[#0F172A]">{p.name}</strong>
                <p className="text-[10px] text-slate-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center p-8 bg-[#15803D] rounded-3xl text-white space-y-4 shadow-xl">
          <h2 className="text-2xl font-black">Ready to Start Your Engineering Journey?</h2>
          <p className="text-sm text-white/80 max-w-xl mx-auto">
            Join Cohort 2026 and acquire high-demand digital skills in software engineering, AI, and digital business.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/admissions"
              className="px-6 py-3 rounded-xl bg-white text-[#15803D] font-extrabold text-xs shadow-sm hover:bg-slate-100 transition-all"
            >
              Apply for Admission
            </Link>
            <Link
              href="/programmes"
              className="px-6 py-3 rounded-xl bg-white/10 border border-white/30 text-white font-bold text-xs hover:bg-white/20 transition-all"
            >
              Explore Tracks
            </Link>
          </div>
        </div>

      </main>

      <PublicFooter />
    </div>
  );
}
