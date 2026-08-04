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
  ExternalLink,
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
    <div className="min-h-screen bg-[#030e1f] text-[#f0f4ff] flex flex-col font-sans">
      
      {/* Shared Institutional Navigation Header */}
      <PublicNav />

      {/* 🏛️ INSTITUTIONAL HERO SECTION */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8 overflow-hidden">
        {/* Background Ambient Neon Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00d2ff]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[250px] bg-[#d4a017]/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Top Institutional Badge */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#061428] border border-[#d4a017]/40 text-[#d4a017] text-xs font-bold tracking-wide shadow-lg shadow-[#d4a017]/10">
          <GraduationCap className="w-4 h-4 text-[#d4a017]" />
          <span>DIGITAL TECHNOLOGY ACADEMY (DTA)</span>
          <span className="bg-[#d4a017] text-[#030e1f] px-2 py-0.5 rounded-full text-[10px] uppercase font-extrabold">
            DWSA HUMAN TALENT ENGINE
          </span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight max-w-5xl mx-auto leading-[1.12]">
          Digital Technology <span className="bg-gradient-to-r from-[#d4a017] via-[#f5d061] to-[#e5a910] bg-clip-text text-transparent">Academy (DTA)</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="text-lg sm:text-2xl font-bold text-[#d4a017] tracking-tight max-w-3xl mx-auto">
          Developing Africa&apos;s Next Generation of Technology Professionals
        </p>

        {/* Supporting Message */}
        <p className="text-[#8899b4] text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
          The Digital Technology Academy equips individuals, organizations, and institutions with practical knowledge, technical excellence, and innovation capabilities in emerging technologies.
        </p>

        {/* Primary Call-to-Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2 max-w-4xl mx-auto">
          <Link
            href="/programmes"
            className="px-6 py-3.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-[#d4a017] to-[#e5a910] text-[#030e1f] shadow-xl shadow-[#d4a017]/25 hover:scale-[1.02] transition-all flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" />
            Explore Programmes
          </Link>
          <Link
            href="/admissions"
            className="px-6 py-3.5 rounded-xl text-xs font-extrabold bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-[#030e1f] shadow-xl shadow-[#4ade80]/25 hover:scale-[1.02] transition-all flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            Apply for Admission
          </Link>
          <Link
            href="/corporate"
            className="px-6 py-3.5 rounded-xl text-xs font-bold bg-[#0f223d] hover:bg-[#16335a] border border-[#4ade80]/40 text-[#4ade80] transition-all flex items-center gap-2"
          >
            <Building2 className="w-4 h-4" />
            Corporate Learning
          </Link>
          <Link
            href="/ecosystem"
            className="px-6 py-3.5 rounded-xl text-xs font-bold bg-[#0f223d]/80 hover:bg-[#0f223d] border border-[#d4a017]/30 text-white transition-all flex items-center gap-2"
          >
            <Globe className="w-4 h-4 text-[#d4a017]" />
            Partner With DTA
          </Link>
        </div>

        {/* Hero Visual Card */}
        <div className="pt-8 max-w-4xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#d4a017]/40 shadow-2xl shadow-[#d4a017]/15">
            <Image
              src="/students_coding.jpg"
              alt="Digital Technology Academy Students & Professionals Coding"
              width={1200}
              height={600}
              className="w-full h-[320px] sm:h-[420px] object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#030e1f] via-[#030e1f]/40 to-transparent flex flex-col justify-end p-6 sm:p-8 text-left">
              <span className="text-[10px] uppercase font-extrabold tracking-widest text-[#d4a017] bg-[#061428]/80 backdrop-blur-md px-3 py-1 rounded-full w-fit mb-2 border border-[#d4a017]/30">
                REAL STUDENTS · REAL PROJECTS · REAL CAREERS
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white">
                Preparing Africa&apos;s Future AI Engineers & Software Architects
              </h3>
              <p className="text-xs sm:text-sm text-[#c8d8f0] mt-1 max-w-2xl">
                Hands-on experiential training combining AI integration, production software development, automated GitHub grading, and Paystack tuition administration.
              </p>
            </div>
          </div>
        </div>

        {/* 🌟 INSTITUTIONAL HIGHLIGHTS */}
        <div className="pt-10 max-w-5xl mx-auto">
          <div className="text-center mb-6 space-y-2">
            <span className="text-xs font-bold text-[#d4a017] uppercase tracking-widest">DTA Institutional Strengths</span>
            <h3 className="text-lg font-extrabold text-white">What Defines the Digital Technology Academy</h3>
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
                className="p-4 rounded-2xl bg-[#061428]/90 border border-[#d4a017]/20 hover:border-[#d4a017]/50 transition-all text-center space-y-1 card-hover"
              >
                <span className="block text-2xl" aria-hidden="true">{h.icon}</span>
                <span className="block text-[11px] font-bold text-white leading-tight">{h.label}</span>
                <span className="block text-[9px] text-[#d4a017] font-semibold">{h.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 📘 SECTION 1: ABOUT DTA PREVIEW */}
      <section className="py-16 bg-[#020914] border-y border-[#d4a017]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017] text-xs font-bold">
                <Compass className="w-3.5 h-3.5" />
                ABOUT THE ACADEMY
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                Addressing Africa&apos;s Technology Skills Gap Through <span className="text-[#d4a017]">Experiential Education</span>
              </h2>

              <p className="text-[#8899b4] text-sm leading-relaxed">
                Digital Technology Academy (DTA) is the education and human capability development arm of <strong className="text-white">Digital World Systems Africa Ltd (DWSA)</strong>. DTA bridges the gap between academic theory and real-world industrial execution.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-[#061428] border border-[#d4a017]/20 space-y-1">
                  <h4 className="text-sm font-bold text-[#d4a017]">Our Educational Philosophy</h4>
                  <p className="text-xs text-[#8899b4]">Project-first, AI-assisted learning where students build production software from Day 1.</p>
                </div>
                <div className="p-4 rounded-xl bg-[#061428] border border-[#4ade80]/20 space-y-1">
                  <h4 className="text-sm font-bold text-[#4ade80]">Industry Collaboration</h4>
                  <p className="text-xs text-[#8899b4]">Direct alignment with African enterprise tech needs, preparing job-ready engineering talent.</p>
                </div>
              </div>

              <div>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0f223d] hover:bg-[#16335a] border border-[#d4a017]/40 text-[#d4a017] font-bold text-xs transition-all"
                >
                  Read Our Story & Institutional Vision
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="bg-[#061428] border border-[#d4a017]/30 rounded-3xl p-8 space-y-6 shadow-xl">
              <h3 className="text-xl font-bold text-white border-b border-[#d4a017]/20 pb-3 flex items-center gap-2">
                <Award className="w-5 h-5 text-[#d4a017]" />
                The P.R.I.D.E. Conduct Standard
              </h3>

              <div className="space-y-4 text-xs">
                <div className="flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded bg-[#d4a017] text-[#030e1f] font-black text-xs">P</span>
                  <div>
                    <strong className="text-white block">Professionalism</strong>
                    <span className="text-[#8899b4]">Adhering to global engineering ethics and institutional excellence.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded bg-[#d4a017] text-[#030e1f] font-black text-xs" aria-label="R for Resilience">R</span>
                  <div>
                    <strong className="text-white block">Resilience</strong>
                    <span className="text-[#8899b4]">Solving complex algorithmic and architectural challenges with persistence.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded bg-[#4ade80] text-[#030e1f] font-black text-xs">I</span>
                  <div>
                    <strong className="text-white block">Integrity</strong>
                    <span className="text-[#8899b4]">Maintaining academic honesty, clean code standards, and transparent collaboration.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded bg-[#d4a017] text-[#030e1f] font-black text-xs">D</span>
                  <div>
                    <strong className="text-white block">Discipline</strong>
                    <span className="text-[#8899b4]">Consistent daily practice, automated GitHub PR submissions, and code reviews.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="px-2 py-0.5 rounded bg-[#4ade80] text-[#030e1f] font-black text-xs" aria-label="E for Excellence">E</span>
                  <div>
                    <strong className="text-white block">Excellence</strong>
                    <span className="text-[#8899b4]">Delivering production-grade applications that solve real African problems.</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 🏛️ SECTION 2: SCHOOLS & CENTRES (PLANNED ACADEMIC EXPANSION) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017] text-xs font-bold">
            <Building2 className="w-3.5 h-3.5" />
            INSTITUTIONAL ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Schools &amp; <span className="text-[#d4a017]">Centres</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#d4a017] font-bold uppercase tracking-widest">
            PLANNED ACADEMIC EXPANSION
          </p>
          <p className="text-xs sm:text-sm text-[#8899b4] max-w-2xl mx-auto">
            DTA is structured to launch dedicated academic schools and specialized research centres to cultivate technical leadership across Africa.
          </p>
        </div>

        {/* Academic Schools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "School of Artificial Intelligence",
              desc: "Deep learning, Natural Language Processing, Autonomous Agents, and Enterprise Generative AI Architectures.",
              badge: "Future Academic Expansion",
              icon: Cpu,
            },
            {
              title: "School of Blockchain & Digital Trust",
              desc: "Distributed Ledger Technology, Smart Contract Auditing, Cryptographic Systems, Zero-Knowledge Proofs, and Web3.",
              badge: "Future Academic Expansion",
              icon: ShieldCheck,
            },
            {
              title: "School of Software Engineering",
              desc: "Advanced Full-Stack Engineering, Cloud-Native Architectures, Microservices, and High-Scale Enterprise Systems.",
              badge: "Future Academic Expansion",
              icon: Code2,
            },
            {
              title: "School of Cybersecurity",
              desc: "Offensive & Defensive Security, Threat Intelligence, Infrastructure Defense, Ethical Hacking, and Compliance.",
              badge: "Future Academic Expansion",
              icon: ShieldCheck,
            },
            {
              title: "School of Data Intelligence",
              desc: "Big Data Pipelines, Predictive Analytics, Data Engineering, Spatial Analysis, and Decision Science for Enterprises.",
              badge: "Future Academic Expansion",
              icon: TrendingUp,
            },
            {
              title: "School of Emerging Technologies",
              desc: "Internet of Things (IoT), Edge Computing, Robotics, Spatial Computing, and Frontier Tech Innovation.",
              badge: "Future Academic Expansion",
              icon: Zap,
            },
          ].map((school) => {
            const Icon = school.icon;
            return (
              <div
                key={school.title}
                className="p-6 bg-[#061428] border border-[#d4a017]/20 rounded-2xl space-y-4 hover:border-[#d4a017]/50 transition-all hover:shadow-lg hover:shadow-[#d4a017]/10 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 bg-[#d4a017]/10 text-[#d4a017] rounded-xl border border-[#d4a017]/30">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-extrabold text-[#d4a017]/70 bg-[#d4a017]/10 border border-[#d4a017]/20 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {school.badge}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">{school.title}</h3>
                  <p className="text-xs text-[#8899b4] leading-relaxed">{school.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Centres Grid */}
        <div className="pt-6">
          <h3 className="text-xl font-extrabold text-white mb-6 text-center">
            Specialized Research &amp; Innovation Centres
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 rounded-2xl bg-[#0f223d]/80 border border-[#d4a017]/40 space-y-2">
              <span className="text-[10px] font-extrabold text-[#4ade80] bg-[#4ade80]/10 px-2 py-0.5 rounded-full border border-[#4ade80]/30 uppercase">
                Active Pillar
              </span>
              <h4 className="text-sm font-bold text-white">Innovation &amp; Research Centre (IRC)</h4>
              <p className="text-xs text-[#8899b4]">Applied AI research, student innovation projects, and technology showcases.</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#0f223d]/80 border border-[#d4a017]/20 space-y-2">
              <span className="text-[10px] font-extrabold text-[#d4a017]/70 bg-[#d4a017]/10 px-2 py-0.5 rounded-full border border-[#d4a017]/20 uppercase">Future Initiative</span>
              <h4 className="text-sm font-bold text-white">Centre for Digital Transformation</h4>
              <p className="text-xs text-[#8899b4]">Strategic advisory & workforce digital capability development for African institutions.</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#0f223d]/80 border border-[#d4a017]/30 space-y-2">
              <span className="text-[10px] font-extrabold text-[#d4a017] bg-[#d4a017]/10 px-2 py-0.5 rounded-full border border-[#d4a017]/30 uppercase">
                Future Initiative
              </span>
              <h4 className="text-sm font-bold text-white">Centre for Responsible AI</h4>
              <p className="text-xs text-[#8899b4]">Ethical AI governance, algorithmic fairness, and data privacy framework development.</p>
            </div>
            <div className="p-5 rounded-2xl bg-[#0f223d]/80 border border-[#4ade80]/30 space-y-2">
              <span className="text-[10px] font-extrabold text-[#4ade80] bg-[#4ade80]/10 px-2 py-0.5 rounded-full border border-[#4ade80]/30 uppercase">
                Future Initiative
              </span>
              <h4 className="text-sm font-bold text-white">Centre for Tech Entrepreneurship</h4>
              <p className="text-xs text-[#8899b4]">Incubating student tech startups and commercializing innovative African solutions.</p>
            </div>
          </div>
        </div>

        <div className="text-center pt-2">
          <Link
            href="/schools"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0f223d] hover:bg-[#16335a] border border-[#d4a017]/40 text-[#d4a017] font-bold text-xs transition-all"
          >
            Explore Complete Schools &amp; Centres Architecture
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* 🎓 SECTION 3: PROGRAMMES PREVIEW */}
      <section id="programmes-preview" className="py-16 bg-[#020914] border-y border-[#d4a017]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[#d4a017] text-xs font-bold uppercase tracking-widest">Academic &amp; Training Offerings</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">Academic <span className="text-[#d4a017]">Programmes</span></h2>
            <p className="text-xs sm:text-sm text-[#8899b4] max-w-2xl mx-auto">
              From intensive bootcamps to executive leadership and future diploma certifications, DTA offers structured learning pathways.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Programme Card 1 */}
            <div className="p-7 bg-[#061428] border-2 border-[#d4a017] rounded-3xl space-y-5 relative flex flex-col justify-between shadow-xl">
              <div className="space-y-4">
                <span className="px-3 py-1 bg-[#d4a017]/20 text-[#d4a017] text-[10px] font-extrabold rounded-full border border-[#d4a017]/40 uppercase tracking-wider">
                  ACTIVE BOOTCAMP · EARLY BIRD OPEN
                </span>
                <h3 className="text-xl font-black text-white">8-Week AI Coding Academy</h3>
                <p className="text-xs text-[#8899b4]">Master full-stack software development from zero with modern AI tools &amp; Next.js 19.</p>

                <div className="space-y-2 text-xs pt-2">
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-[#8899b4]">Duration:</span>
                    <strong className="text-white">8 Weeks Intensive</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-[#8899b4]">Mode:</span>
                    <strong className="text-white">Physical (Makurdi) + Virtual</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-[#8899b4]">Skill Level:</span>
                    <strong className="text-white">Beginner to Full-Stack</strong>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-[#8899b4]">Tuition:</span>
                    <strong className="text-[#d4a017]">Early Bird: ₦45,000</strong>
                  </div>
                </div>
              </div>

              <Link
                href="/admissions"
                className="w-full py-3 bg-gradient-to-r from-[#d4a017] to-[#e5a910] text-[#030e1f] font-extrabold rounded-xl text-xs text-center block shadow-lg shadow-[#d4a017]/20"
              >
                Apply for AI Coding Academy →
              </Link>
            </div>

            {/* Programme Card 2 */}
            <div className="p-7 bg-[#061428] border border-[#00d2ff]/30 rounded-3xl space-y-5 relative flex flex-col justify-between">
              <div className="space-y-4">
                <span className="px-3 py-1 bg-[#00d2ff]/20 text-[#00d2ff] text-[10px] font-extrabold rounded-full border border-[#00d2ff]/40 uppercase tracking-wider">
                  EXECUTIVE &amp; PROFESSIONAL
                </span>
                <h3 className="text-xl font-black text-white">Corporate AI Transformation</h3>
                <p className="text-xs text-[#8899b4]">Customized workforce upskilling, executive technology leadership, and AI workflow integration.</p>

                <div className="space-y-2 text-xs pt-2">
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-[#8899b4]">Format:</span>
                    <strong className="text-white">Customized Workshops</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-[#8899b4]">Audience:</span>
                    <strong className="text-white">Executives &amp; Teams</strong>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-[#8899b4]">Certificate:</span>
                    <strong className="text-[#00d2ff]">DWSA Executive Credential</strong>
                  </div>
                </div>
              </div>

              <Link
                href="/corporate"
                className="w-full py-3 bg-[#0f223d] hover:bg-[#16335a] border border-[#00d2ff]/40 text-[#00d2ff] font-bold rounded-xl text-xs text-center block"
              >
                Explore Corporate Training →
              </Link>
            </div>

            {/* Programme Card 3 */}
            <div className="p-7 bg-[#061428] border border-[#4ade80]/30 rounded-3xl space-y-5 relative flex flex-col justify-between">
              <div className="space-y-4">
                <span className="px-3 py-1 bg-[#4ade80]/20 text-[#4ade80] text-[10px] font-extrabold rounded-full border border-[#4ade80]/40 uppercase tracking-wider">
                  PLANNED INSTITUTIONAL EXPANSION
                </span>
                <h3 className="text-xl font-black text-white">Professional Diploma Tracks</h3>
                <p className="text-xs text-[#8899b4]">In-depth 6-month formal diploma certifications in AI Engineering, Software Architecture, and Cloud Systems.</p>

                <div className="space-y-2 text-xs pt-2">
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-[#8899b4]">Duration:</span>
                    <strong className="text-white">6 Months</strong>
                  </div>
                  <div className="flex justify-between border-b border-slate-800 pb-1.5">
                    <span className="text-[#8899b4]">Status:</span>
                    <strong className="text-[#4ade80]">Coming Soon</strong>
                  </div>
                  <div className="flex justify-between pb-1">
                    <span className="text-[#8899b4]">Credential:</span>
                    <strong className="text-white">DTA Professional Diploma</strong>
                  </div>
                </div>
              </div>

              <Link
                href="/programmes"
                className="w-full py-3 bg-[#0f223d] hover:bg-[#16335a] border border-[#4ade80]/30 text-[#4ade80] font-bold rounded-xl text-xs text-center block"
              >
                View All Programme Categories →
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* 💡 SECTION 4: INNOVATION & RESEARCH CENTRE (IRC) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017] text-xs font-bold">
              <Lightbulb className="w-3.5 h-3.5" />
              APPLIED RESEARCH &amp; INNOVATION
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Innovation &amp; <span className="text-[#d4a017]">Research Centre (IRC)</span>
            </h2>

            <p className="text-[#8899b4] text-sm leading-relaxed">
              IRC is DTA&apos;s focal point for applied research, AI experimentation, blockchain exploration, student innovation challenges, and technology incubation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#061428] border border-[#00d2ff]/20 rounded-xl space-y-1">
                <h4 className="text-sm font-bold text-[#00d2ff]">Annual Hackathons</h4>
                <p className="text-xs text-[#8899b4]">Competitive coding challenges solving real African logistics, fintech &amp; edtech problems.</p>
              </div>
              <div className="p-4 bg-[#061428] border border-[#d4a017]/20 rounded-xl space-y-1">
                <h4 className="text-sm font-bold text-[#d4a017]">Student Showcases</h4>
                <p className="text-xs text-[#8899b4]">Exhibiting production applications built by DTA graduates to corporate partners.</p>
              </div>
            </div>

            <div>
              <Link
                href="/innovation"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4a017] to-[#e5a910] text-[#030e1f] font-extrabold text-xs transition-all shadow-lg shadow-[#d4a017]/20"
              >
                Explore Innovation &amp; Research Centre (IRC)
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#061428] to-[#0a1e3a] border border-[#00d2ff]/30 rounded-3xl p-8 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2 border-b border-[#00d2ff]/20 pb-3">
              <Zap className="w-5 h-5 text-[#00d2ff]" />
              IRC Core Pillars &amp; Initiatives
            </h3>

            <ul className="space-y-4 text-xs text-[#c8d8f0]">
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#00d2ff] mt-1.5 shrink-0" />
                <div>
                  <strong className="text-white block">Applied AI Experimentation</strong>
                  <span className="text-[#8899b4]">Testing LLM agents, local language translation models, and automated code evaluation.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#d4a017] mt-1.5 shrink-0" />
                <div>
                  <strong className="text-white block">Blockchain &amp; Digital Trust Labs</strong>
                  <span className="text-[#8899b4]">Exploring smart contract security auditing, identity verification, and decentralized finance.</span>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#4ade80] mt-1.5 shrink-0" />
                <div>
                  <strong className="text-white block">Startup Incubation (Planned Expansion)</strong>
                  <span className="text-[#8899b4]">Supporting top graduate innovation projects with seed mentorship &amp; technical infrastructure.</span>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* 💼 SECTION 5: CAREER & ENTREPRENEURSHIP CENTRE */}
      <section className="py-16 bg-[#020914] border-y border-[#d4a017]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80] text-xs font-bold">
              <Briefcase className="w-3.5 h-3.5" />
              GRADUATE EMPLOYABILITY &amp; VENTURE CREATION
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Career &amp; <span className="text-[#d4a017]">Entrepreneurship Centre</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#8899b4] max-w-2xl mx-auto">
              DTA provides long-term learner support — preparing students for remote software engineering roles, freelancing, or launching their own technology ventures.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="p-6 bg-[#061428] border border-[#d4a017]/20 rounded-2xl space-y-3">
              <span className="text-2xl">🎯</span>
              <h4 className="text-base font-bold text-white">Career Guidance &amp; CV Support</h4>
              <p className="text-xs text-[#8899b4]">Optimizing developer GitHub profiles, technical resumes, and tech portfolio showcases.</p>
            </div>
            <div className="p-6 bg-[#061428] border border-[#00d2ff]/20 rounded-2xl space-y-3">
              <span className="text-2xl">⚡</span>
              <h4 className="text-base font-bold text-white">Internship Pathways</h4>
              <p className="text-xs text-[#8899b4]">Connecting top graduates with DWSA internal engineering projects &amp; partner companies.</p>
            </div>
            <div className="p-6 bg-[#061428] border border-[#4ade80]/20 rounded-2xl space-y-3">
              <span className="text-2xl">🚀</span>
              <h4 className="text-base font-bold text-white">Entrepreneurship &amp; Startups</h4>
              <p className="text-xs text-[#8899b4]">Coaching technical founders on MVP development, product architecture, and venture launch.</p>
            </div>
            <div className="p-6 bg-[#061428] border border-[#d4a017]/20 rounded-2xl space-y-3">
              <span className="text-2xl">🌍</span>
              <h4 className="text-base font-bold text-white">Industry Mentorship</h4>
              <p className="text-xs text-[#8899b4]">One-on-one guidance from experienced software architects and AI practitioners.</p>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0f223d] hover:bg-[#16335a] border border-[#4ade80]/40 text-[#4ade80] font-bold text-xs transition-all"
            >
              Explore Career &amp; Entrepreneurship Support
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 🏢 SECTION 6: CORPORATE LEARNING */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-gradient-to-br from-[#061428] via-[#091832] to-[#061428] border-2 border-[#00d2ff]/40 rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="max-w-3xl space-y-3">
            <span className="px-3 py-1 bg-[#00d2ff]/20 text-[#00d2ff] text-xs font-extrabold rounded-full border border-[#00d2ff]/40 uppercase tracking-wider">
              ENTERPRISE &amp; ORGANIZATIONAL UP-SKILLING
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              Corporate <span className="text-[#00d2ff]">Learning &amp; Workforce Training</span>
            </h2>
            <p className="text-sm text-[#8899b4] leading-relaxed">
              Empower your enterprise workforce with AI automation, cloud systems engineering, and cybersecurity awareness customized for African business models.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 bg-[#030e1f]/80 border border-[#00d2ff]/20 rounded-2xl space-y-2">
              <h4 className="text-sm font-bold text-white">AI Readiness Programmes</h4>
              <p className="text-xs text-[#8899b4]">Training non-technical staff and engineers to integrate Generative AI workflows.</p>
            </div>
            <div className="p-5 bg-[#030e1f]/80 border border-[#d4a017]/20 rounded-2xl space-y-2">
              <h4 className="text-sm font-bold text-white">Digital Transformation Training</h4>
              <p className="text-xs text-[#8899b4]">Modernizing legacy processes with cloud infrastructure &amp; automated data pipelines.</p>
            </div>
            <div className="p-5 bg-[#030e1f]/80 border border-[#4ade80]/20 rounded-2xl space-y-2">
              <h4 className="text-sm font-bold text-white">Cybersecurity Awareness</h4>
              <p className="text-xs text-[#8899b4]">Protecting organizational assets, customer data privacy, and NDPR compliance.</p>
            </div>
          </div>

          <div className="pt-2">
            <Link
              href="/corporate"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-xs font-extrabold bg-gradient-to-r from-[#00d2ff] to-[#00a2ff] text-[#030e1f] shadow-lg shadow-[#00d2ff]/25 hover:scale-[1.02] transition-all"
            >
              Request Corporate Training Proposal
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 📝 SECTION 7: ADMISSIONS & INTERNATIONAL STUDENTS */}
      <section className="py-16 bg-[#020914] border-y border-[#d4a017]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3">
            <span className="text-[#4ade80] text-xs font-bold uppercase tracking-widest">TRANSPARENT ADMISSIONS PROCESS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Admissions &amp; <span className="text-[#4ade80]">Enrollment</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#8899b4] max-w-2xl mx-auto">
              Applications are welcomed from learners across Africa and beyond. Flexible installment plans available.
            </p>
          </div>

          {/* 5 Step Admissions Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-center">
            {[
              { step: "01", title: "Select Programme", desc: "Choose your learning track and mode (Physical/Virtual)." },
              { step: "02", title: "Submit Application", desc: "Complete our online form with your background details." },
              { step: "03", title: "Choose Tuition Plan", desc: "Select Early Bird, Standard, or 2-part installment plan." },
              { step: "04", title: "Payment Confirmation", desc: "Receive automated invoice & transfer confirmation." },
              { step: "05", title: "Digital Campus Access", desc: "Log in to Student Workspace & start learning." },
            ].map((s) => (
              <div key={s.step} className="p-5 bg-[#061428] border border-[#4ade80]/30 rounded-2xl space-y-2 relative">
                <span className="text-2xl font-black text-[#4ade80] block">{s.step}</span>
                <h4 className="text-xs font-bold text-white">{s.title}</h4>
                <p className="text-[11px] text-[#8899b4]">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* International Students Callout */}
          <div className="p-6 bg-[#061428] border border-[#00d2ff]/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-extrabold text-[#00d2ff] bg-[#00d2ff]/10 px-2.5 py-0.5 rounded-full uppercase">
                PAN-AFRICAN REACH
              </span>
              <h4 className="text-base font-bold text-white">International Students &amp; Regional Applicants</h4>
              <p className="text-xs text-[#8899b4]">
                DTA welcomes applicants across Africa. Online live sessions provide full interactive access to instructors &amp; labs.
              </p>
            </div>
            <Link
              href="/admissions"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-[#030e1f] font-extrabold text-xs shrink-0"
            >
              Apply Online Now →
            </Link>
          </div>
        </div>
      </section>

      {/* 🚀 SECTION 8: DIGITAL CAMPUS PLACEHOLDER */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        <div className="p-8 sm:p-12 bg-[#061428] border-2 border-[#d4a017] rounded-3xl space-y-6 relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4a017]/20 border border-[#d4a017]/50 text-[#d4a017] text-xs font-extrabold uppercase tracking-wider">
            DIGITAL CAMPUS — LEARNER EXPERIENCE
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Enter the <span className="text-[#d4a017]">Digital Campus</span>
          </h2>

          <p className="text-xs sm:text-sm text-[#8899b4] max-w-2xl mx-auto leading-relaxed">
            Our unified student platform provides course access, automated GitHub code submission evaluation, grades, financial statements, and community collaboration.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left pt-2">
            <div className="p-4 bg-[#030e1f] border border-slate-800 rounded-xl">
              <span className="block text-xs font-bold text-[#d4a017]">Student Workspace</span>
              <span className="text-[11px] text-[#8899b4]">Active Live Feature</span>
            </div>
            <div className="p-4 bg-[#030e1f] border border-slate-800 rounded-xl">
              <span className="block text-xs font-bold text-[#00d2ff]">GitHub PR Grading</span>
              <span className="text-[11px] text-[#8899b4]">Active Live Feature</span>
            </div>
            <div className="p-4 bg-[#030e1f] border border-slate-800 rounded-xl">
              <span className="block text-xs font-bold text-[#4ade80]">Financial ERP</span>
              <span className="text-[11px] text-[#8899b4]">Active Live Feature</span>
            </div>
            <div className="p-4 bg-[#030e1f] border border-slate-800 rounded-xl">
              <span className="block text-xs font-bold text-slate-400">Learning Studio</span>
              <span className="text-[11px] text-[#4ade80]">Coming in Future Release</span>
            </div>
          </div>

          <div className="pt-4 flex flex-wrap justify-center gap-4">
            <Link
              href="/login"
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#d4a017] to-[#e5a910] text-[#030e1f] font-extrabold text-xs shadow-lg shadow-[#d4a017]/25"
            >
              Sign In to Digital Campus →
            </Link>
            <Link
              href="/campus"
              className="px-8 py-3.5 rounded-xl bg-[#0f223d] hover:bg-[#16335a] border border-[#d4a017]/40 text-[#d4a017] font-bold text-xs"
            >
              View Future Campus Architecture
            </Link>
          </div>
        </div>
      </section>

      {/* 📚 SECTION 9: KNOWLEDGE HUB PREVIEW */}
      <section className="py-16 bg-[#020914] border-y border-[#d4a017]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <span className="text-[#00d2ff] text-xs font-bold uppercase tracking-widest">THOUGHT LEADERSHIP &amp; INSIGHTS</span>
              <h2 className="text-3xl font-extrabold text-white">DTA <span className="text-[#d4a017]">Knowledge Hub</span></h2>
            </div>
            <Link
              href="/knowledge-hub"
              className="px-5 py-2.5 rounded-xl bg-[#0f223d] border border-[#d4a017]/40 text-[#d4a017] font-bold text-xs hover:bg-[#16335a] transition-all"
            >
              Explore Knowledge Hub →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#061428] border border-[#00d2ff]/20 rounded-2xl space-y-3">
              <span className="text-[10px] font-extrabold text-[#00d2ff] bg-[#00d2ff]/10 px-2.5 py-0.5 rounded-full uppercase">Technology Insight</span>
              <h4 className="text-base font-bold text-white">The AI Shift: How African Developers Leverage LLMs for Production Apps</h4>
              <p className="text-xs text-[#8899b4]">Analyzing how modern prompt engineering and AI assistants accelerate full-stack development cycles in emerging markets.</p>
            </div>
            <div className="p-6 bg-[#061428] border border-[#d4a017]/20 rounded-2xl space-y-3">
              <span className="text-[10px] font-extrabold text-[#d4a017] bg-[#d4a017]/10 px-2.5 py-0.5 rounded-full uppercase">Research Brief</span>
              <h4 className="text-base font-bold text-white">Blockchain &amp; Digital Trust Infrastructure in African Enterprise</h4>
              <p className="text-xs text-[#8899b4]">Examining distributed ledger technology applications in land registry, trade settlement, and supply chain verification.</p>
            </div>
            <div className="p-6 bg-[#061428] border border-[#4ade80]/20 rounded-2xl space-y-3">
              <span className="text-[10px] font-extrabold text-[#4ade80] bg-[#4ade80]/10 px-2.5 py-0.5 rounded-full uppercase">Report · Coming Soon</span>
              <h4 className="text-base font-bold text-white">Annual State of Digital Africa Report (2026 Edition)</h4>
              <p className="text-xs text-[#8899b4]">Comprehensive institutional survey mapping tech talent availability, AI adoption metrics, and software engineering growth across sub-Saharan Africa.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 🗺️ SECTION 10: BUILDING THE FUTURE (INSTITUTIONAL ROADMAP) */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017] text-xs font-bold">
            <Compass className="w-3.5 h-3.5" />
            LONG-TERM STRATEGIC DIRECTION
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Building the <span className="text-[#d4a017]">Future</span>
          </h2>
          <p className="text-xs text-[#8899b4] italic max-w-xl mx-auto">
            &quot;This roadmap represents DTA&apos;s long-term institutional vision and strategic direction.&quot;
          </p>
        </div>

        {/* Roadmap Timeline Flow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {[
            { stage: "STAGE 1", title: "Today's Academy", desc: "8-Week AI Bootcamps, automated PR grading, & corporate workshops.", active: true },
            { stage: "STAGE 2", title: "Expanded Academic Schools", desc: "Dedicated schools for AI, Blockchain, Software Engineering & Security.", active: false },
            { stage: "STAGE 3", title: "Innovation & Research Centre", desc: "Applied AI labs, startup incubation, & pan-African hackathons.", active: false },
            { stage: "STAGE 4", title: "Technology Institute", desc: "Formal diploma degrees & institutional research partnerships.", active: false },
            { stage: "STAGE 5", title: "Continental Centre of Excellence", desc: "Africa's premier hub for digital capability & frontier technology.", active: false },
          ].map((item, idx) => (
            <div
              key={item.stage}
              className={`p-5 rounded-2xl border text-left space-y-2 flex flex-col justify-between ${
                item.active
                  ? "bg-[#061428] border-[#d4a017] shadow-lg shadow-[#d4a017]/15"
                  : "bg-[#030e1f] border-slate-800"
              }`}
            >
              <div className="space-y-2">
                <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                  item.active ? "bg-[#d4a017] text-[#030e1f]" : "bg-slate-800 text-slate-400"
                }`}>
                  {item.stage}
                </span>
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <p className="text-[11px] text-[#8899b4] leading-relaxed">{item.desc}</p>
              </div>
              {idx < 4 && <ChevronRight className="w-4 h-4 text-[#d4a017] hidden md:block self-end mt-2" />}
            </div>
          ))}
        </div>
      </section>

      {/* 🌍 SECTION 11: DWSA ECOSYSTEM CALLOUT */}
      <section className="py-16 bg-[#020914] border-t border-[#d4a017]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
          <div className="space-y-3">
            <span className="text-[#00d2ff] text-xs font-bold uppercase tracking-widest">ONE INSTITUTION · FOUR PILLARS</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              The DWSA <span className="text-[#d4a017]">Ecosystem</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#8899b4] max-w-2xl mx-auto">
              Digital Technology Academy is part of Digital World Systems Africa Ltd, structured around four strategic business pillars.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
            <div className="p-5 bg-[#061428] border border-slate-800 rounded-2xl space-y-2">
              <span className="text-[10px] font-bold text-[#00d2ff] uppercase">PILLAR 1</span>
              <h4 className="text-sm font-bold text-white">Enterprise Technology</h4>
              <p className="text-xs text-[#8899b4]">EnterpriseOS, Educare, AgriOps &amp; custom software systems.</p>
            </div>
            <div className="p-5 bg-[#061428] border border-[#d4a017]/50 rounded-2xl space-y-2 shadow-md">
              <span className="text-[10px] font-extrabold text-[#d4a017] uppercase">PILLAR 2 (YOU ARE HERE)</span>
              <h4 className="text-sm font-bold text-white">Digital Technology Academy</h4>
              <p className="text-xs text-[#8899b4]">Human capability development, bootcamps &amp; digital campus.</p>
            </div>
            <div className="p-5 bg-[#061428] border border-slate-800 rounded-2xl space-y-2">
              <span className="text-[10px] font-bold text-[#4ade80] uppercase">PILLAR 3</span>
              <h4 className="text-sm font-bold text-white">Technology Consulting</h4>
              <p className="text-xs text-[#8899b4]">Digital transformation advisory &amp; IT infrastructure deployment.</p>
            </div>
            <div className="p-5 bg-[#061428] border border-slate-800 rounded-2xl space-y-2">
              <span className="text-[10px] font-bold text-[#00d2ff] uppercase">PILLAR 4</span>
              <h4 className="text-sm font-bold text-white">Research &amp; Innovation</h4>
              <p className="text-xs text-[#8899b4]">Pioneering AI systems, blockchain protocols &amp; frontier research.</p>
            </div>
          </div>

          <div>
            <Link
              href="/ecosystem"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0f223d] hover:bg-[#16335a] border border-[#d4a017]/40 text-[#d4a017] font-bold text-xs transition-all"
            >
              Explore Complete DWSA Ecosystem Architecture
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Shared Footer */}
      <PublicFooter />

    </div>
  );
}
