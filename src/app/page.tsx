"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import {
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Award,
  CheckCircle2,
  Globe,
  Building2,
  BookOpen,
  Sparkles,
  Zap,
  Bot,
  Send,
  ExternalLink,
  ChevronRight,
  MessageSquare,
  FileCheck2,
} from "lucide-react";

export default function HomePage() {
  const [leadModalOpen, setLeadModalOpen] = useState(false);
  const [selectedProgramme, setSelectedProgramme] = useState("Generative AI for Work & Productivity");

  const openLeadModal = (progTitle?: string) => {
    if (progTitle) setSelectedProgramme(progTitle);
    setLeadModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans">
      {/* Shared Institutional Navigation Header */}
      <PublicNav />

      {/* 🏛️ INSTITUTIONAL DTA HERO SECTION */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
        {/* Top Entity Branding Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-200 text-[#15803D] text-xs font-bold tracking-wide shadow-sm">
          <GraduationCap className="w-4 h-4 text-[#15803D]" />
          <span className="text-slate-[#0F172A]">DIGITAL WORLD SYSTEMS AFRICA LTD</span>
          <span aria-hidden="true">•</span>
          <span className="text-[#D4A017] uppercase tracking-wider font-extrabold">
            DTA SCHOOL OF GENERATIVE AI
          </span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight max-w-5xl mx-auto leading-[1.12]">
          DWSA Digital <span className="text-[#15803D]">Technology Academy</span>
        </h1>

        {/* Tagline & Focus */}
        <p className="text-lg sm:text-2xl font-bold text-[#D4A017] tracking-tight max-w-3xl mx-auto">
          &ldquo;We don&apos;t just teach AI. We put AI to work.&rdquo;
        </p>

        {/* Supporting Narrative */}
        <p className="text-slate-600 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
          InstitutionOS powers the digital learning and operational ecosystem of DWSA Digital Technology Academy (DTA). Our primary academic focus is the <strong className="text-[#0F172A]">School of Generative Artificial Intelligence</strong>, equipping individuals and enterprises with practical workplace AI capabilities.
        </p>

        {/* Primary Call-to-Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 max-w-4xl mx-auto">
          <Link
            href="/admissions/apply"
            className="px-6 py-3.5 rounded-xl text-xs font-extrabold bg-[#15803D] hover:bg-[#166534] text-white shadow-md transition-all flex items-center gap-2 hover:scale-[1.02]"
          >
            <CheckCircle2 className="w-4 h-4" />
            Register on InstitutionOS
          </Link>

          <button
            onClick={() => openLeadModal("Generative AI for Work & Productivity")}
            className="px-6 py-3.5 rounded-xl text-xs font-extrabold bg-[#FEFCE8] border border-[#D4A017]/40 text-[#D4A017] hover:bg-amber-100 shadow-sm transition-all flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-[#D4A017]" />
            Notify Me When Enrolment Opens
          </button>

          <a
            href="https://dws-africa.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="px-6 py-3.5 rounded-xl text-xs font-bold bg-white border border-slate-200 hover:border-[#15803D] text-[#0F172A] shadow-sm transition-all flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4 text-[#15803D]" />
            Talk to DWSA
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* Flagship Programme Hero Card */}
        <div className="pt-8 max-w-4xl mx-auto text-left">
          <div className="relative rounded-3xl overflow-hidden border border-[#D4A017]/30 bg-[#030e1f] text-white shadow-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
              <div>
                <span className="px-3 py-1 rounded-full bg-[#D4A017]/20 border border-[#D4A017]/50 text-[#D4A017] text-[10px] font-extrabold uppercase tracking-widest inline-flex items-center gap-1">
                  <Sparkles className="w-3 h-3" /> Flagship DTA AI Programme
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-white mt-2">
                  Generative AI for Work &amp; Productivity
                </h2>
              </div>
              <div className="shrink-0 text-right">
                <span className="text-xs text-slate-400 block font-medium">8-Week Practical Cohort</span>
                <span className="text-lg font-black text-[#00d2ff]">School of Generative AI</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Master workplace AI automation, prompt engineering, agentic workflows, custom GPT construction, and enterprise document intelligence. Designed specifically for working professionals, managers, and institutional leaders.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              <div className="p-3 bg-white/5 border border-white/10 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-[#D4A017] uppercase block">Delivery Format</span>
                <span className="text-xs font-bold text-white block">Online Live &amp; Hybrid</span>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-[#00d2ff] uppercase block">Cohort Code</span>
                <span className="text-xs font-bold text-white block">GENAI-WP-001</span>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-[#4ade80] uppercase block">Credentials</span>
                <span className="text-xs font-bold text-white block">DWSA Verified QR Diploma</span>
              </div>
              <div className="p-3 bg-white/5 border border-white/10 rounded-2xl space-y-1">
                <span className="text-[10px] font-bold text-amber-400 uppercase block">Practical Capstone</span>
                <span className="text-xs font-bold text-white block">Workplace AI Workflow</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-white/10">
              <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-[#4ade80]" />
                <span>Next Cohort Launching Soon</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => openLeadModal("Generative AI for Work & Productivity")}
                  className="px-5 py-2.5 bg-[#D4A017] hover:bg-[#e5a910] text-[#030e1f] font-black text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  Pre-Register Priority Interest
                </button>
                <Link
                  href="/admissions/apply"
                  className="px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs rounded-xl transition-all"
                >
                  Start Application
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* 🌟 DTA ACADEMY STRENGTHS */}
        <div className="pt-10 max-w-5xl mx-auto">
          <div className="text-center mb-6 space-y-2">
            <span className="text-xs font-bold text-[#D4A017] uppercase tracking-widest">
              Digital World Systems Africa Standard
            </span>
            <h3 className="text-lg font-extrabold text-[#0F172A]">
              Why Leading Professionals &amp; Institutions Choose DTA
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: "🤖", label: "Generative AI Focus", sub: "Workplace Productivity" },
              { icon: "🏭", label: "Practical Implementation", sub: "Production AI Workflows" },
              { icon: "📜", label: "QR Verifiable Credentials", sub: "Official DWSA Seal" },
              { icon: "🌍", label: "Pan-African Impact", sub: "Building Africa's Future" },
              { icon: "🏢", label: "Corporate AI Training", sub: "Workforce Transformation" },
              { icon: "⚡", label: "Automated Grading", sub: "GitHub PR Reviews" },
              { icon: "👨‍🏫", label: "Instructor Masterclasses", sub: "Live Expert Coaching" },
              { icon: "🌐", label: "InstitutionOS Platform", sub: "PWA Offline Access" },
            ].map((h) => (
              <div
                key={h.label}
                className="p-4 rounded-2xl bg-white border border-slate-200 hover:border-[#15803D]/40 transition-all text-center space-y-1 shadow-sm"
              >
                <span className="block text-2xl" aria-hidden="true">{h.icon}</span>
                <span className="block text-[11px] font-bold text-[#0F172A] leading-tight">{h.label}</span>
                <span className="block text-[9px] text-[#15803D] font-semibold">{h.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📘 SECTION 1: ABOUT DTA & DWSA RELATIONSHIP */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEFCE8] border border-[#D4A017]/30 text-[#D4A017] text-xs font-bold">
                <Building2 className="w-3.5 h-3.5" />
                ABOUT THE ACADEMY
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] leading-tight">
                Digital World Systems Africa Ltd &mdash; <span className="text-[#15803D]">Digital Technology Academy</span>
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed">
                DWSA Digital Technology Academy (DTA) is the specialized educational arm of <strong className="text-[#0F172A]">Digital World Systems Africa Ltd (RC 9718724)</strong>. We bridge the gap between AI theory and real workplace execution.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-1">
                  <h4 className="text-sm font-bold text-[#D4A017]">1. AI Training</h4>
                  <p className="text-xs text-slate-500">Equipping individuals, professionals, and teams with practical Generative AI mastery.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-1">
                  <h4 className="text-sm font-bold text-[#15803D]">2. AI Implementation</h4>
                  <p className="text-xs text-slate-500">Helping African organizations design, deploy, and scale custom AI workplace workflows.</p>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/admissions/apply"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white font-bold text-xs transition-all shadow-sm"
                >
                  Register on InstitutionOS
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* P.R.I.D.E. Conduct Standard */}
            <div className="bg-[#030e1f] border border-[#D4A017]/30 rounded-3xl p-8 space-y-6 shadow-xl text-white">
              <h3 className="text-xl font-bold text-white border-b border-white/10 pb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#D4A017]" />
                The P.R.I.D.E. Conduct Standard
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded bg-[#D4A017] text-[#030e1f] font-black text-xs">P</span>
                  <div>
                    <strong className="text-white block">Professionalism</strong>
                    <span className="text-slate-400">Adhering to global technology ethics and institutional excellence.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded bg-[#D4A017] text-[#030e1f] font-black text-xs">R</span>
                  <div>
                    <strong className="text-white block">Resilience</strong>
                    <span className="text-slate-400">Solving complex workplace AI and automation challenges with persistence.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded bg-[#15803D] text-white font-black text-xs">I</span>
                  <div>
                    <strong className="text-white block">Integrity</strong>
                    <span className="text-slate-400">Maintaining academic honesty, responsible AI usage, and transparent collaboration.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded bg-[#D4A017] text-[#030e1f] font-black text-xs">D</span>
                  <div>
                    <strong className="text-white block">Discipline</strong>
                    <span className="text-slate-400">Consistent practice, automated code/prompt reviews, and capstone delivery.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded bg-[#15803D] text-white font-black text-xs">E</span>
                  <div>
                    <strong className="text-white block">Excellence</strong>
                    <span className="text-slate-400">Delivering production-grade AI solutions that solve real African economic problems.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shared Public Footer */}
      <PublicFooter />

      {/* Lead Capture Priority Modal */}
      <LeadCaptureModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        defaultProgramme={selectedProgramme}
      />
    </div>
  );
}
