"use client";

import React from "react";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import { GraduationCap, ArrowRight, ShieldCheck, Award, Compass, Globe, Users, Target, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#030e1f] text-[#f0f4ff] flex flex-col font-sans">
      <PublicNav />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        
        {/* Hero */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017] text-xs font-bold">
            <Compass className="w-3.5 h-3.5" />
            INSTITUTIONAL PROFILE
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            About Digital Technology <span className="text-[#d4a017]">Academy</span>
          </h1>
          <p className="text-[#8899b4] text-base leading-relaxed">
            Digital Technology Academy (DTA) is the education and human capability development engine of <strong className="text-white">Digital World Systems Africa Ltd (RC 9718724)</strong>. We exist to develop Africa&apos;s next generation of technology professionals, innovators, and digital leaders.
          </p>
        </div>

        {/* Vision & Mission Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 bg-[#061428] border-2 border-[#d4a017]/40 rounded-3xl space-y-4 shadow-xl">
            <div className="p-3 bg-[#d4a017]/15 text-[#d4a017] rounded-xl w-fit border border-[#d4a017]/40">
              <Globe className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-white">Our Vision</h2>
            <p className="text-sm text-[#c8d8f0] leading-relaxed">
              To become Africa&apos;s premier digital campus and technology institute — recognized globally for cultivating high-caliber software engineers, AI practitioners, blockchain specialists, and digital entrepreneurs who drive Africa&apos;s digital transformation.
            </p>
          </div>

          <div className="p-8 bg-[#061428] border-2 border-[#4ade80]/40 rounded-3xl space-y-4 shadow-xl">
            <div className="p-3 bg-[#4ade80]/15 text-[#4ade80] rounded-xl w-fit border border-[#4ade80]/40">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-white">Our Mission</h2>
            <p className="text-sm text-[#c8d8f0] leading-relaxed">
              To equip individuals, organizations, and institutions with practical technical knowledge, rigorous engineering discipline, and innovation capabilities in emerging technologies through project-first experiential learning.
            </p>
          </div>
        </div>

        {/* Our Story & DWSA Alignment */}
        <div className="bg-[#020914] border border-[#d4a017]/20 rounded-3xl p-8 sm:p-12 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Our Story &amp; <span className="text-[#d4a017]">Institutional Mandate</span>
          </h2>
          <div className="space-y-4 text-sm text-[#8899b4] leading-relaxed">
            <p>
              Across Africa, the demand for production-ready software engineers and emerging tech specialists far outpaces supply. Traditional academic curricula often lag behind industrial realities, while superficial online tutorials fail to instill engineering discipline.
            </p>
            <p>
              Digital World Systems Africa Ltd established DTA as one of its four strategic pillars specifically to address this capability gap. DTA is built on the conviction that Africa must not merely consume technology, but actively build the digital infrastructure of tomorrow.
            </p>
            <p>
              Through our technology lab in Makurdi, Benue State, and online live sessions across the continent, DTA combines AI integration, automated GitHub Pull Request evaluation, and direct corporate mentorship to turn zero-experience learners into full-stack engineers.
            </p>
          </div>
        </div>

        {/* Part of the DWSA Ecosystem Section */}
        <div className="bg-gradient-to-br from-[#061428] via-[#091832] to-[#061428] border-2 border-[#d4a017] rounded-3xl p-8 sm:p-12 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-extrabold text-[#d4a017] uppercase tracking-wider">STRATEGIC ALIGNMENT</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Part of the <span className="text-[#d4a017]">DWSA Ecosystem</span>
            </h2>
          </div>

          <p className="text-sm text-[#c8d8f0] leading-relaxed max-w-3xl">
            Digital Technology Academy is one of the four strategic pillars of <strong>Digital World Systems Africa Ltd</strong>. Together, the four pillars advance Africa&apos;s digital transformation by delivering technology solutions, developing talent, providing strategic consulting, and driving research and innovation.
          </p>

          <div className="p-6 bg-[#030e1f] border border-[#d4a017]/30 rounded-2xl space-y-4">
            <span className="text-[10px] font-extrabold text-[#d4a017] uppercase tracking-widest block text-center">Institutional Hierarchy</span>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-center text-xs font-bold">
              <span className="px-4 py-2 rounded-xl bg-[#d4a017] text-[#030e1f] font-black">Digital World Systems Africa Ltd</span>
              <span className="text-[#d4a017]" aria-hidden="true">↓</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
                <span className="p-2 rounded-lg bg-[#061428] border border-slate-700 text-slate-300">Enterprise Technology</span>
                <span className="p-2 rounded-lg bg-[#d4a017]/20 border border-[#d4a017] text-[#d4a017]">Digital Technology Academy</span>
                <span className="p-2 rounded-lg bg-[#061428] border border-slate-700 text-slate-300">Technology Consulting</span>
                <span className="p-2 rounded-lg bg-[#061428] border border-slate-700 text-slate-300">Research &amp; Innovation</span>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <a
              href="https://dws-africa.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#0f223d] hover:bg-[#16335a] border border-[#d4a017]/50 text-[#d4a017] font-extrabold text-xs transition-all"
            >
              Explore DWSA Main Website →
            </a>
          </div>
        </div>

        {/* Educational Philosophy & Practical Learning */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="p-6 bg-[#061428] border border-[#d4a017]/30 rounded-2xl space-y-3">
            <span className="text-2xl">🧠</span>
            <h3 className="text-base font-bold text-white">Project-First Learning</h3>
            <p className="text-xs text-[#8899b4] leading-relaxed">
              Theory is immediately applied. Every learner builds live, production-grade web applications, personal portfolios, and cloud deployments from day one.
            </p>
          </div>

          <div className="p-6 bg-[#061428] border border-[#d4a017]/20 rounded-2xl space-y-3">
            <span className="text-2xl">⚙️</span>
            <h3 className="text-base font-bold text-white">AI Technology Integration</h3>
            <p className="text-xs text-[#8899b4] leading-relaxed">
              We teach modern software engineering alongside AI assistant tools (LLM prompting, code synthesis, agentic debugging) to multiply developer productivity 10x.
            </p>
          </div>

          <div className="p-6 bg-[#061428] border border-[#4ade80]/30 rounded-2xl space-y-3">
            <span className="text-2xl">🛡️</span>
            <h3 className="text-base font-bold text-white">Automated Code Reviews</h3>
            <p className="text-xs text-[#8899b4] leading-relaxed">
              Submissions undergo automated GitHub Pull Request evaluation and instructor review, enforcing clean code, security standards, and industry best practices.
            </p>
          </div>
        </div>

        {/* P.R.I.D.E. Conduct Standard */}
        <div className="bg-[#061428] border border-[#d4a017]/40 rounded-3xl p-8 space-y-6">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <span className="text-xs font-bold text-[#d4a017] uppercase tracking-wider">CULTURE &amp; VALUES</span>
            <h2 className="text-2xl font-extrabold text-white">The P.R.I.D.E. Conduct Standard</h2>
            <p className="text-xs text-[#8899b4]">Every student, instructor, and staff member abides by five core principles.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
            <div className="p-4 bg-[#030e1f] border border-[#d4a017]/30 rounded-xl space-y-2">
              <span className="text-xl font-black text-[#d4a017]">P</span>
              <h4 className="text-xs font-bold text-white">Professionalism</h4>
              <p className="text-[11px] text-[#8899b4]">Global engineering ethics and institutional excellence.</p>
            </div>
            <div className="p-4 bg-[#030e1f] border border-[#d4a017]/30 rounded-xl space-y-2">
              <span className="text-xl font-black text-[#d4a017]">R</span>
              <h4 className="text-xs font-bold text-white">Resilience</h4>
              <p className="text-[11px] text-[#8899b4]">Persistent problem-solving through debugging and iteration.</p>
            </div>
            <div className="p-4 bg-[#030e1f] border border-[#4ade80]/30 rounded-xl space-y-2">
              <span className="text-xl font-black text-[#4ade80]">I</span>
              <h4 className="text-xs font-bold text-white">Integrity</h4>
              <p className="text-[11px] text-[#8899b4]">Academic honesty, clean code, and transparent collaboration.</p>
            </div>
            <div className="p-4 bg-[#030e1f] border border-[#d4a017]/30 rounded-xl space-y-2">
              <span className="text-xl font-black text-[#d4a017]">D</span>
              <h4 className="text-xs font-bold text-white">Discipline</h4>
              <p className="text-[11px] text-[#8899b4]">Consistent practice, automated PR reviews, and deadlines.</p>
            </div>
            <div className="p-4 bg-[#030e1f] border border-[#4ade80]/30 rounded-xl space-y-2">
              <span className="text-xl font-black text-[#4ade80]">E</span>
              <h4 className="text-xs font-bold text-white">Excellence</h4>
              <p className="text-[11px] text-[#8899b4]">Building production applications that solve real African problems.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4 pt-4">
          <h3 className="text-2xl font-bold text-white">Ready to Begin Your Tech Journey?</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/admissions" className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-[#030e1f] font-extrabold text-xs shadow-lg shadow-[#4ade80]/20">
              Apply for Admission →
            </Link>
            <Link href="/programmes" className="px-8 py-3.5 rounded-xl bg-[#0f223d] border border-[#d4a017]/40 text-[#d4a017] font-bold text-xs">
              Explore Programmes
            </Link>
          </div>
        </div>

      </main>

      <PublicFooter />
    </div>
  );
}
