"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import {
  GraduationCap,
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Code2,
  Cpu,
  Award,
  CheckCircle2,
  Zap,
  Globe,
  Users,
  Sparkles,
  BookOpen,
  Building2,
  Lightbulb,
  Briefcase,
  Layers,
  ChevronRight,
  TrendingUp,
  FileText,
  Compass,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans">
      
      {/* Shared Institutional Navigation Header */}
      <PublicNav />

      {/* 🏛️ INSTITUTIONAL HERO SECTION */}
      <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">

        {/* Top Institutional Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white border border-slate-200 text-[#15803D] text-xs font-bold tracking-wide shadow-sm">
          <GraduationCap className="w-4 h-4 text-[#15803D]" />
          <span>DIGITAL TECHNOLOGY ACADEMY (DTA)</span>
          <span className="bg-[#15803D] text-white px-2 py-0.5 rounded-full text-[10px] uppercase font-extrabold">
            DWSA HUMAN TALENT ENGINE
          </span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#0F172A] tracking-tight max-w-5xl mx-auto leading-[1.12]">
          Digital Technology <span className="text-[#15803D]">Academy (DTA)</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-lg sm:text-2xl font-bold text-[#15803D] tracking-tight max-w-3xl mx-auto">
          Developing Africa&apos;s Next Generation of Technology Professionals
        </p>

        {/* Supporting Message */}
        <p className="text-slate-600 text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
          The Digital Technology Academy equips individuals, organizations, and institutions with practical knowledge, technical excellence, and innovation capabilities in emerging technologies.
        </p>

        {/* Primary Call-to-Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 max-w-4xl mx-auto">
          <Link
            href="/programmes"
            className="px-6 py-3.5 rounded-xl text-xs font-extrabold bg-[#15803D] hover:bg-[#166534] text-white shadow-sm transition-all flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Explore Programmes
          </Link>
          <Link
            href="/admissions"
            className="px-6 py-3.5 rounded-xl text-xs font-extrabold bg-[#FEFCE8] border border-[#D4A017]/40 text-[#D4A017] hover:bg-amber-100 shadow-sm transition-all flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Apply for Admission
          </Link>
          <Link
            href="/corporate"
            className="px-6 py-3.5 rounded-xl text-xs font-bold bg-white border border-slate-200 hover:border-[#15803D] text-[#0F172A] shadow-sm transition-all flex items-center gap-2"
          >
            <Building2 className="w-4 h-4 text-[#15803D]" />
            Corporate Learning
          </Link>
          <Link
            href="/ecosystem"
            className="px-6 py-3.5 rounded-xl text-xs font-bold bg-white border border-slate-200 hover:border-[#D4A017] text-[#0F172A] shadow-sm transition-all flex items-center gap-2"
          >
            <Globe className="w-4 h-4 text-[#D4A017]" />
            Partner With DTA
          </Link>
        </div>

        {/* Hero Visual Card */}
        <div className="pt-8 max-w-4xl mx-auto">
          <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
            <Image
              src="/students_coding.jpg"
              alt="Digital Technology Academy Students & Professionals Coding"
              width={1200}
              height={600}
              className="w-full h-[320px] sm:h-[420px] object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent flex flex-col justify-end p-6 sm:p-8 text-left text-white">
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#D4A017] bg-white/10 backdrop-blur-md px-3 py-1 rounded-full w-fit mb-2 border border-white/20">
                REAL STUDENTS · REAL PROJECTS · REAL CAREERS
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Preparing Africa&apos;s Future AI Engineers &amp; Software Architects
              </h3>
              <p className="text-xs sm:text-sm text-slate-200 mt-1 max-w-2xl">
                Hands-on experiential training combining AI integration, production software development, automated GitHub grading, and Paystack tuition administration.
              </p>
            </div>
          </div>
        </div>

        {/* 🌟 INSTITUTIONAL HIGHLIGHTS */}
        <div className="pt-10 max-w-5xl mx-auto">
          <div className="text-center mb-6 space-y-2">
            <span className="text-xs font-bold text-[#D4A017] uppercase tracking-widest">DTA Institutional Strengths</span>
            <h3 className="text-lg font-extrabold text-[#0F172A]">What Defines the Digital Technology Academy</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { icon: "🎓", label: "Practical Technology Education", sub: "Project-First Learning" },
              { icon: "🏭", label: "Industry-Focused Training", sub: "Real-World Standards" },
              { icon: "🤖", label: "AI & Blockchain Focus", sub: "Emerging Technologies" },
              { icon: "🌍", label: "Pan-African Vision", sub: "Continent-Wide Impact" },
              { icon: "🏢", label: "Corporate Learning", sub: "Enterprise Upskilling" },
              { icon: "💡", label: "Innovation & Research", sub: "Applied Technology" },
              { icon: "🚀", label: "Career Transformation", sub: "From Zero to Engineer" },
              { icon: "🏛️", label: "Technology Leadership", sub: "Digital Future Builders" },
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

      {/* 📘 SECTION 1: ABOUT DTA PREVIEW */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEFCE8] border border-[#D4A017]/30 text-[#D4A017] text-xs font-bold">
                <Compass className="w-3.5 h-3.5" />
                ABOUT THE ACADEMY
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] leading-tight">
                Addressing Africa&apos;s Technology Skills Gap Through <span className="text-[#15803D]">Experiential Education</span>
              </h2>

              <p className="text-slate-600 text-sm leading-relaxed">
                Digital Technology Academy (DTA) is the education and human capability development arm of <strong className="text-[#0F172A]">Digital World Systems Africa Ltd (DWSA)</strong>. DTA bridges the gap between academic theory and real-world industrial execution.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-1">
                  <h4 className="text-sm font-bold text-[#D4A017]">Our Educational Philosophy</h4>
                  <p className="text-xs text-slate-500">Project-first, AI-assisted learning where students build production software from Day 1.</p>
                </div>
                <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-1">
                  <h4 className="text-sm font-bold text-[#15803D]">Industry Collaboration</h4>
                  <p className="text-xs text-slate-500">Direct alignment with African enterprise tech needs, preparing job-ready engineering talent.</p>
                </div>
              </div>

              <div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-slate-200 hover:border-[#15803D] text-[#0F172A] font-bold text-xs transition-all shadow-sm"
                >
                  Read Our Story &amp; Institutional Vision
                  <ArrowRight className="w-4 h-4 text-[#15803D]" />
                </Link>
              </div>
            </div>

            <div className="bg-[#F8FAFC] border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#0F172A] border-b border-slate-200 pb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#D4A017]" />
                The P.R.I.D.E. Conduct Standard
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded bg-[#D4A017] text-white font-black text-xs">P</span>
                  <div>
                    <strong className="text-[#0F172A] block">Professionalism</strong>
                    <span className="text-slate-500">Adhering to global engineering ethics and institutional excellence.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded bg-[#D4A017] text-white font-black text-xs">R</span>
                  <div>
                    <strong className="text-[#0F172A] block">Resilience</strong>
                    <span className="text-slate-500">Solving complex algorithmic and architectural challenges with persistence.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded bg-[#15803D] text-white font-black text-xs">I</span>
                  <div>
                    <strong className="text-[#0F172A] block">Integrity</strong>
                    <span className="text-slate-500">Maintaining academic honesty, clean code standards, and transparent collaboration.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded bg-[#D4A017] text-white font-black text-xs">D</span>
                  <div>
                    <strong className="text-[#0F172A] block">Discipline</strong>
                    <span className="text-slate-500">Consistent daily practice, automated GitHub PR submissions, and code reviews.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded bg-[#15803D] text-white font-black text-xs">E</span>
                  <div>
                    <strong className="text-[#0F172A] block">Excellence</strong>
                    <span className="text-slate-500">Delivering production-grade applications that solve real African problems.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 🏛️ SECTION 2: SCHOOLS & CENTRES */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] text-xs font-bold">
            <Building2 className="w-3.5 h-3.5" />
            ACADEMIC STRUCTURE
          </div>
          <h2 className="text-3xl font-extrabold text-[#0F172A]">Schools &amp; Academic Centres</h2>
          <p className="text-slate-500 text-sm max-w-2xl mx-auto">
            Organized into specialized schools offering targeted capability building from foundational engineering to executive leadership.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "School of Software Engineering",
              icon: Code2,
              desc: "Frontend, Backend, Fullstack, Mobile Development, Microservices, and DevOps Engineering.",
              badge: "ENGINEERING",
              href: "/schools",
            },
            {
              title: "School of AI & Data Science",
              icon: Cpu,
              desc: "Machine Learning, Deep Learning, Applied AI Integration, LLM Prompt Engineering, and Data Analytics.",
              badge: "AI CORE",
              href: "/schools",
            },
            {
              title: "School of Cloud & Cybersecurity",
              icon: ShieldCheck,
              desc: "Cloud Infrastructure, System Architecture, DevSecOps, Cyber Defense, and Infrastructure as Code.",
              badge: "SECURITY",
              href: "/schools",
            },
            {
              title: "School of Digital Business",
              icon: Briefcase,
              desc: "Product Management, Digital Transformation, Technology Entrepreneurship, and Enterprise Architecture.",
              badge: "BUSINESS",
              href: "/schools",
            },
          ].map((school) => {
            const Icon = school.icon;
            return (
              <div
                key={school.title}
                className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-[#15803D]/40 transition-all"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#F0FDF4] border border-[#15803D]/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#15803D]" />
                  </div>
                  <span className="text-[9px] font-black tracking-widest text-[#15803D] uppercase">
                    {school.badge}
                  </span>
                  <h3 className="text-base font-extrabold text-[#0F172A] leading-snug">{school.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{school.desc}</p>
                </div>
                <Link
                  href={school.href}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15803D] hover:underline pt-2"
                >
                  Learn More <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* 🚀 SECTION 3: CORE PROGRAMMES PREVIEW */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FEFCE8] border border-[#D4A017]/30 text-[#D4A017] text-xs font-bold">
              <BookOpen className="w-3.5 h-3.5" />
              CAPABILITY BUILDING
            </div>
            <h2 className="text-3xl font-extrabold text-[#0F172A]">Core Educational Programmes</h2>
            <p className="text-slate-500 text-sm max-w-2xl mx-auto">
              Structured learning pathways designed for career starters, working professionals, and corporate teams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Software Engineering Immersion",
                duration: "24 Weeks · Intensive",
                desc: "Complete end-to-end software development program covering React, Next.js, Node.js, Databases, Git, and Production Deployment.",
                level: "Full Immersion",
                action: "View Track Syllabus",
                href: "/programmes",
              },
              {
                title: "AI Integration & Data Science",
                duration: "16 Weeks · Executive",
                desc: "Practical artificial intelligence training focused on integrating LLMs, building AI-powered web applications, and data pipeline construction.",
                level: "Advanced",
                action: "View Track Syllabus",
                href: "/programmes",
              },
              {
                title: "Corporate Upskilling & Capability",
                duration: "Custom Duration",
                desc: "Tailored enterprise technology training programs for financial institutions, government agencies, and tech enterprises across Africa.",
                level: "Enterprise",
                action: "Explore Corporate Solutions",
                href: "/corporate",
              },
            ].map((prog) => (
              <div
                key={prog.title}
                className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200 shadow-sm flex flex-col justify-between space-y-4 hover:border-[#15803D]/40 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-black text-[#15803D] uppercase tracking-widest bg-[#F0FDF4] px-2.5 py-1 rounded-full border border-[#15803D]/20">
                      {prog.level}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">{prog.duration}</span>
                  </div>
                  <h3 className="text-lg font-extrabold text-[#0F172A]">{prog.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{prog.desc}</p>
                </div>
                <Link
                  href={prog.href}
                  className="inline-flex items-center justify-between px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-[#0F172A] hover:bg-slate-50 transition-all shadow-xs"
                >
                  <span>{prog.action}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#15803D]" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shared Public Footer */}
      <PublicFooter />
    </div>
  );
}
