"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Award,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Code2,
  FileText,
  Briefcase,
  GitPullRequest,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function MyProgrammePage() {
  const modules = [
    { num: "01", title: "AI Fundamentals & Prompt Engineering", duration: "1 Week", desc: "Mastering Generative AI tools, LLM prompting techniques, automated developer workflows, and agentic debugging." },
    { num: "02", title: "Modern Web Core (HTML5, CSS3, ES6+)", duration: "1 Week", desc: "Foundational software engineering principles, responsive layout math, DOM manipulation, and Git version control." },
    { num: "03", title: "Full-Stack React 19 & Next.js App Router", duration: "2 Weeks", desc: "Server Components, Server Actions, state management, client hooks, and production UI component architecture." },
    { num: "04", title: "Serverless Databases & Neon Postgres", duration: "1 Week", desc: "Prisma ORM schema design, SQL migrations, relation modeling, and serverless database connection pooling." },
    { num: "05", title: "Authentication, Paystack & REST APIs", duration: "1 Week", desc: "NextAuth.js authentication flow, Paystack payment webhooks, RESTful API endpoints, and secure middleware." },
    { num: "06", title: "Capstone Project & Production Deployment", duration: "2 Weeks", desc: "Building and deploying a full-stack production web application to Vercel, automated GitHub PR grading, and certificate issue." },
  ];

  return (
    <div className="space-y-8 animate-fadeInUp">

      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#061428] via-[#091832] to-[#061428] border-2 border-[#d4a017] rounded-3xl p-6 sm:p-10 space-y-4 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4a017]/15 border border-[#d4a017]/40 text-[#d4a017] text-xs font-extrabold">
            <GraduationCap className="w-4 h-4" aria-hidden="true" />
            ACADEMIC HANDBOOK &amp; SYLLABUS
          </div>
          <span className="text-xs font-bold text-[#4ade80] bg-[#4ade80]/10 border border-[#4ade80]/30 px-3 py-1 rounded-full uppercase">
            Official Cohort 2026 Curriculum
          </span>
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            8-Week AI Coding <span className="text-[#d4a017]">Academy</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#8899b4] mt-2 max-w-3xl leading-relaxed">
            From Zero to Full-Stack Software Developer with AI Integration. Delivered by Digital Technology Academy (DTA) — a flagship institution of <strong className="text-white">Digital World Systems Africa Ltd (RC 9718724)</strong>.
          </p>
        </div>

        {/* Quick Specs Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs">
          <div className="p-3 rounded-xl bg-[#030e1f] border border-[#d4a017]/30 space-y-1">
            <span className="text-[10px] text-[#8899b4] uppercase font-bold block">DURATION</span>
            <strong className="text-white text-sm">8 Weeks Intensive</strong>
          </div>
          <div className="p-3 rounded-xl bg-[#030e1f] border border-[#d4a017]/30 space-y-1">
            <span className="text-[10px] text-[#8899b4] uppercase font-bold block">LEARNING MODE</span>
            <strong className="text-white text-sm">Physical + Virtual</strong>
          </div>
          <div className="p-3 rounded-xl bg-[#030e1f] border border-[#d4a017]/30 space-y-1">
            <span className="text-[10px] text-[#8899b4] uppercase font-bold block">GRADING ENGINE</span>
            <strong className="text-[#4ade80] text-sm">GitHub PR Automated</strong>
          </div>
          <div className="p-3 rounded-xl bg-[#030e1f] border border-[#d4a017]/30 space-y-1">
            <span className="text-[10px] text-[#8899b4] uppercase font-bold block">QUALIFICATION</span>
            <strong className="text-[#d4a017] text-sm">DCFE Certificate</strong>
          </div>
        </div>
      </div>

      {/* Curriculum Roadmap */}
      <div className="space-y-4">
        <div className="border-b border-[#d4a017]/20 pb-3 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-extrabold text-white">Curriculum Modules</h2>
            <p className="text-xs text-[#8899b4]">Structured 6-part technical progression</p>
          </div>
          <span className="text-xs font-bold text-[#d4a017]">{modules.length} Modules</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((m) => (
            <div
              key={m.num}
              className="p-6 bg-[#061428] border border-slate-800 rounded-2xl space-y-3 hover:border-[#d4a017]/40 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#d4a017] px-2.5 py-0.5 rounded-lg bg-[#d4a017]/10 border border-[#d4a017]/30">
                    MODULE {m.num}
                  </span>
                  <span className="text-[11px] text-[#8899b4] font-semibold flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#d4a017]" aria-hidden="true" /> {m.duration}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white">{m.title}</h3>
                <p className="text-xs text-[#8899b4] leading-relaxed">{m.desc}</p>
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[#4ade80] font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" /> Practical Lab Included
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Graduation Requirements & Certification */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-[#061428] border border-[#d4a017]/30 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#d4a017]/15 text-[#d4a017] rounded-xl border border-[#d4a017]/30">
              <ShieldCheck className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Graduation Requirements</h3>
              <p className="text-xs text-[#8899b4]">Mandatory criteria to earn your DWSA qualification</p>
            </div>
          </div>
          <ul className="space-y-2.5 text-xs text-[#c8d8f0]">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" aria-hidden="true" />
              <span>Complete all 6 module coding assignments with approved status.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" aria-hidden="true" />
              <span>Submit production capstone Pull Request to DWSA GitHub grading engine.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" aria-hidden="true" />
              <span>Deploy live full-stack web application to Vercel production.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" aria-hidden="true" />
              <span>Abide by the official P.R.I.D.E. Conduct Standard.</span>
            </li>
          </ul>
        </div>

        <div className="p-6 bg-[#061428] border border-[#4ade80]/30 rounded-2xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#4ade80]/15 text-[#4ade80] rounded-xl border border-[#4ade80]/30">
              <Award className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">DWSA Institutional Credential</h3>
              <p className="text-xs text-[#8899b4]">Verified Certificate of Completion (RC 9718724)</p>
            </div>
          </div>
          <p className="text-xs text-[#8899b4] leading-relaxed">
            Graduates receive an official, QR-verifiable certificate confirming competence in Full-Stack Software Engineering, Next.js App Router, Neon Postgres, and AI Developer Workflows.
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard/student#assignments"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#d4a017] to-[#e5a910] text-[#030e1f] font-extrabold text-xs shadow-md shadow-[#d4a017]/20 btn-press"
            >
              Go to Submissions Desk <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}
