"use client";
import React, { useState } from "react";
import Link from "next/link";
import { 
  GraduationCap, 
  ArrowRight, 
  ShieldCheck, 
  CreditCard, 
  Code2, 
  Cpu, 
  Award, 
  CheckCircle2, 
  Terminal, 
  Zap, 
  Globe, 
  Users, 
  Sparkles,
  ExternalLink,
  BookOpen,
  Menu,
  X
} from "lucide-react";

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
    <div className="min-h-screen bg-[#030e1f] text-[#f0f4ff] flex flex-col font-sans selection:bg-[#00d2ff] selection:text-[#030e1f]">
      
      {/* ⚡ Top Urgent Announcement Bar */}
      <div className="bg-gradient-to-r from-[#061428] via-[#0f2a4a] to-[#061428] border-b border-[#00d2ff]/30 text-center py-2 px-4 text-xs font-semibold tracking-wide text-[#00d2ff]">
        <span className="inline-flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#d4a017] animate-pulse" />
          <span>ADMISSIONS OPEN: Cohort 2026 — Early Bird Pricing Available!</span>
          <span className="hidden sm:inline text-[#d4a017]">• CAC Registered Company: RC 9718724</span>
        </span>
      </div>

      {/* 🧭 Navigation Header */}
      <header className="border-b border-[#d4a017]/20 bg-[#030e1f]/90 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 bg-gradient-to-br from-[#d4a017] to-[#e5a910] rounded-xl shadow-lg shadow-[#d4a017]/20 text-[#030e1f] font-extrabold">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white flex items-center gap-1.5">
                DWSA <span className="text-[#d4a017]">Tech Academy</span>
              </span>
              <span className="hidden sm:block text-[10px] uppercase tracking-widest text-[#00d2ff] font-semibold">
                Digital World Systems Africa Ltd (RC 9718724)
              </span>
            </div>
          </div>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6 text-xs font-medium text-[#8899b4]">
            <a href="#features" className="hover:text-[#00d2ff] transition-colors">Features</a>
            <a href="#curriculum" className="hover:text-[#00d2ff] transition-colors">Curriculum</a>
            <a href="#tuition" className="hover:text-[#00d2ff] transition-colors">Tuition & Plans</a>
            <a href="https://dws-africa.vercel.app" target="_blank" rel="noreferrer" className="hover:text-[#d4a017] transition-colors flex items-center gap-1">
              Main Site <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/login"
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#d4a017] to-[#e5a910] hover:from-[#e5a910] hover:to-[#d4a017] text-[#030e1f] shadow-lg shadow-[#d4a017]/25 transition-all flex items-center gap-1.5"
            >
              <span className="hidden sm:inline">Portal </span>Login
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileMenuOpen(v => !v)}
              className="md:hidden p-2 rounded-xl border border-[#1e3a5f] text-[#8899b4] hover:text-white hover:bg-[#0f223d] transition-all"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-[#1e3a5f] bg-[#030e1f]/98 backdrop-blur-xl px-4 py-4 space-y-1">
            {["#features","#curriculum","#tuition"].map((href, i) => (
              <a
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 rounded-xl text-sm font-semibold text-[#c8d8f0] hover:bg-[#0f223d] hover:text-white transition-all"
              >
                {["Features","Curriculum","Tuition & Plans"][i]}
              </a>
            ))}
            <a
              href="https://dws-africa.vercel.app"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-[#d4a017] hover:bg-[#0f223d] transition-all"
            >
              Main Site <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </header>

      {/* 🚀 Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8 overflow-hidden">
        {/* Background Ambient Neon Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#00d2ff]/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[250px] bg-[#d4a017]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-[#061428] border border-[#00d2ff]/40 text-[#00d2ff] text-xs font-bold tracking-wide shadow-lg shadow-[#00d2ff]/10">
          <Award className="w-4 h-4 text-[#d4a017]" />
          <span>FROM ZERO TO FULL-STACK IN 8 WEEKS</span>
          <span className="bg-[#d4a017] text-[#030e1f] px-2 py-0.5 rounded-full text-[10px] uppercase font-extrabold">
            AI BOOTCAMP
          </span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight max-w-5xl mx-auto leading-[1.15]">
          Master Software Engineering & Build the Future with <span className="bg-gradient-to-r from-[#d4a017] via-[#f5d061] to-[#00d2ff] bg-clip-text text-transparent">AI Technology</span>
        </h1>

        <p className="text-[#8899b4] text-sm sm:text-base max-w-3xl mx-auto leading-relaxed">
          DWSA Tech Academy is the engineering institute of <strong className="text-white">Digital World Systems Africa Ltd (RC 9718724)</strong>. Master modern software development, leverage AI tools, submit code via automated GitHub evaluation, and pay flexibly via Paystack.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            href="/login"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-extrabold bg-gradient-to-r from-[#d4a017] to-[#e5a910] text-[#030e1f] shadow-xl shadow-[#d4a017]/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
          >
            Enter Student Workspace
            <ArrowRight className="w-4.5 h-4.5" />
          </Link>
          <a
            href="#tuition"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-sm font-bold bg-[#0f223d]/80 hover:bg-[#0f223d] border border-[#00d2ff]/30 text-white transition-all flex items-center justify-center gap-2"
          >
            <CreditCard className="w-4 h-4 text-[#00d2ff]" />
            View Tuition & Installment Plans
          </a>
        </div>

        {/* 📊 Key Stats Banner */}
        <div className="pt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="p-4 rounded-2xl bg-[#061428]/80 border border-[#d4a017]/20 text-center space-y-1">
            <span className="block text-2xl font-black text-[#d4a017]">8 Weeks</span>
            <span className="text-[11px] text-[#8899b4]">Intensive Bootcamp</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#061428]/80 border border-[#00d2ff]/20 text-center space-y-1">
            <span className="block text-2xl font-black text-[#00d2ff]">100%</span>
            <span className="text-[11px] text-[#8899b4]">Real App Build</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#061428]/80 border border-[#d4a017]/20 text-center space-y-1">
            <span className="block text-2xl font-black text-white">GitHub PR</span>
            <span className="text-[11px] text-[#8899b4]">Automated Code Grading</span>
          </div>
          <div className="p-4 rounded-2xl bg-[#061428]/80 border border-[#00d2ff]/20 text-center space-y-1">
            <span className="block text-2xl font-black text-[#4ade80]">CAC Verified</span>
            <span className="text-[11px] text-[#8899b4]">RC 9718724 Certificate</span>
          </div>
        </div>
      </section>

      {/* 🛡️ Core Feature Grid */}
      <section id="features" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
            Engineered for <span className="text-[#d4a017]">World-Class Standards</span>
          </h2>
          <p className="text-xs sm:text-sm text-[#8899b4] max-w-xl mx-auto">
            Our platform provides automated grading workflows, real-world industry tools, and transparent financial administration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-7 bg-[#0f223d]/70 border border-[#00d2ff]/30 rounded-2xl space-y-4 hover:border-[#00d2ff] transition-all hover:shadow-lg hover:shadow-[#00d2ff]/10">
            <div className="p-3.5 bg-[#00d2ff]/10 text-[#00d2ff] rounded-xl w-fit border border-[#00d2ff]/40">
              <Code2 className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">GitHub PR Submission Engine</h3>
            <p className="text-xs text-[#8899b4] leading-relaxed">
              Submit your code via real production Pull Request links. Our REST API automatically verifies repository access, tests code quality, and dispatches reviews directly to instructor desks.
            </p>
          </div>

          <div className="p-7 bg-[#0f223d]/70 border border-[#d4a017]/30 rounded-2xl space-y-4 hover:border-[#d4a017] transition-all hover:shadow-lg hover:shadow-[#d4a017]/10">
            <div className="p-3.5 bg-[#d4a017]/10 text-[#d4a017] rounded-xl w-fit border border-[#d4a017]/40">
              <CreditCard className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">Automated Paystack Installments</h3>
            <p className="text-xs text-[#8899b4] leading-relaxed">
              Pay in full upfront (₦180,000) or start with a deposit (₦100,000). Automated Paystack webhook integration activates your module access immediately upon payment.
            </p>
          </div>

          <div className="p-7 bg-[#0f223d]/70 border border-[#4ade80]/30 rounded-2xl space-y-4 hover:border-[#4ade80] transition-all hover:shadow-lg hover:shadow-[#4ade80]/10">
            <div className="p-3.5 bg-[#4ade80]/10 text-[#4ade80] rounded-xl w-fit border border-[#4ade80]/40">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white">P.R.I.D.E. Conduct Standard</h3>
            <p className="text-xs text-[#8899b4] leading-relaxed">
              Our mandatory code of conduct enforces Professionalism, Resilience, Integrity, Discipline, and Excellence across all learning cohorts and collaborative engineering projects.
            </p>
          </div>
        </div>
      </section>

      {/* 📚 Curriculum Modules Showcase */}
      <section id="curriculum" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <span className="text-[#00d2ff] text-xs font-bold uppercase tracking-widest">Comprehensive 8-Week Curriculum</span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">What You Will <span className="text-[#d4a017]">Master</span></h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 bg-[#061428] border border-[#d4a017]/20 rounded-2xl space-y-3">
            <div className="text-xs font-bold text-[#d4a017] uppercase tracking-wider">Module 01</div>
            <h4 className="text-base font-bold text-white">Modern Web & AI Core</h4>
            <p className="text-xs text-[#8899b4]">HTML5, CSS3, JavaScript ES6+, Prompt Engineering, Vercel & Git Workflow.</p>
          </div>

          <div className="p-6 bg-[#061428] border border-[#00d2ff]/20 rounded-2xl space-y-3">
            <div className="text-xs font-bold text-[#00d2ff] uppercase tracking-wider">Module 02</div>
            <h4 className="text-base font-bold text-white">Full-Stack React & Next.js</h4>
            <p className="text-xs text-[#8899b4]">React 19, Next.js App Router, TailwindCSS, Server Actions & Neon PostgreSQL.</p>
          </div>

          <div className="p-6 bg-[#061428] border border-[#d4a017]/20 rounded-2xl space-y-3">
            <div className="text-xs font-bold text-[#d4a017] uppercase tracking-wider">Module 03</div>
            <h4 className="text-base font-bold text-white">AI Tools & Automation</h4>
            <p className="text-xs text-[#8899b4]">Building AI Assistants, API integrations, Gemini AI SDK & Automations.</p>
          </div>

          <div className="p-6 bg-[#061428] border border-[#4ade80]/20 rounded-2xl space-y-3">
            <div className="text-xs font-bold text-[#4ade80] uppercase tracking-wider">Module 04</div>
            <h4 className="text-base font-bold text-white">Capstone Production Launch</h4>
            <p className="text-xs text-[#8899b4]">Building & deploying a production full-stack web application + Portfolio verification.</p>
          </div>
        </div>
      </section>

      {/* 💳 Tuition & Payment Showcase */}
      <section id="tuition" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-3">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white">Tuition Plans & Automated Paystack Checkout</h2>
          <p className="text-xs sm:text-sm text-[#8899b4]">Choose the payment structure that fits your financial roadmap.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Full Upfront Card */}
          <div className="p-8 bg-[#061428] border-2 border-[#d4a017] rounded-3xl space-y-6 relative flex flex-col justify-between shadow-2xl shadow-[#d4a017]/10">
            <div className="space-y-4">
              <span className="px-3.5 py-1 bg-[#d4a017]/20 text-[#d4a017] text-xs font-extrabold rounded-full border border-[#d4a017]/40 uppercase tracking-wider">
                Full Upfront Plan (Recommended)
              </span>
              <div>
                <span className="text-4xl sm:text-5xl font-black text-white">₦180,000</span>
                <span className="text-xs text-[#8899b4] block mt-1">One-time full cohort tuition payment</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-200">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4ade80]" />
                  Instant full access to all curriculum modules & assignments
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4ade80]" />
                  Priority GitHub PR code reviews & 1-on-1 instructor support
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4ade80]" />
                  Official DWSA Certificate of Completion (RC 9718724)
                </li>
              </ul>
            </div>
            <Link
              href="/login"
              className="w-full py-3.5 bg-gradient-to-r from-[#d4a017] to-[#e5a910] hover:from-[#e5a910] hover:to-[#d4a017] text-[#030e1f] font-extrabold rounded-xl text-xs text-center transition-all shadow-lg shadow-[#d4a017]/20"
            >
              Enroll Full Upfront →
            </Link>
          </div>

          {/* Installment Plan Card */}
          <div className="p-8 bg-[#061428] border border-[#00d2ff]/40 rounded-3xl space-y-6 relative flex flex-col justify-between">
            <div className="space-y-4">
              <span className="px-3.5 py-1 bg-[#00d2ff]/20 text-[#00d2ff] text-xs font-extrabold rounded-full border border-[#00d2ff]/40 uppercase tracking-wider">
                2-Part Installment Plan
              </span>
              <div>
                <span className="text-4xl sm:text-5xl font-black text-white">₦100,000</span>
                <span className="text-xs text-[#8899b4] block mt-1">Initial deposit (₦80,000 balance due Week 4)</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-200">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00d2ff]" />
                  Unlocks Modules 1 & 2 immediately upon payment
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00d2ff]" />
                  Pay balance anytime via automated Paystack portal link
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00d2ff]" />
                  Full certification upon final installment completion
                </li>
              </ul>
            </div>
            <Link
              href="/login"
              className="w-full py-3.5 bg-[#0f223d] hover:bg-[#16335a] border border-[#00d2ff]/40 text-[#00d2ff] font-bold rounded-xl text-xs text-center transition-all"
            >
              Enroll with Installment Deposit →
            </Link>
          </div>
        </div>
      </section>

      {/* 🏛️ World-Class Footer */}
      <footer className="mt-auto border-t border-[#d4a017]/20 bg-[#020914] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#8899b4]">
          <div className="space-y-1.5 text-center md:text-left">
            <div className="font-extrabold text-sm text-white flex items-center justify-center md:justify-start gap-2">
              <span>Digital World Systems Africa Ltd</span>
              <span className="text-[#d4a017] font-semibold">(RC 9718724)</span>
            </div>
            <p>Enterprise Software · AI Systems · Tech Training Institute · Makurdi, Benue State</p>
          </div>

          <div className="flex items-center gap-6">
            <a href="https://dws-africa.vercel.app" target="_blank" rel="noreferrer" className="hover:text-[#d4a017]">Company Site</a>
            <a href="https://dws-africa.vercel.app/apply" target="_blank" rel="noreferrer" className="hover:text-[#00d2ff]">Direct Advert & Apply</a>
            <a href="https://wa.me/2347082135071" target="_blank" rel="noreferrer" className="hover:text-[#4ade80]">WhatsApp Support</a>
          </div>
        </div>
        <div className="text-center text-[11px] text-[#55667e] mt-8 pt-6 border-t border-slate-900">
          &copy; {new Date().getFullYear()} Digital World Systems Africa Ltd (RC 9718724). All rights reserved.
        </div>
      </footer>

    </div>
  );
}
