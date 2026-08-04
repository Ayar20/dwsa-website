"use client";

import React from "react";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import { BookOpen, CheckCircle2, Clock, Award, ArrowRight, ShieldCheck } from "lucide-react";

export default function ProgrammesPage() {
  const categories = [
    {
      category: "INTENSIVE BOOTCAMPS (ACTIVE OFFERING)",
      items: [
        {
          title: "8-Week AI Coding Academy",
          subtitle: "From Zero to Full-Stack Software Developer with AI Integration",
          duration: "8 Weeks",
          mode: "Physical (Makurdi Lab) + Virtual Live",
          level: "Beginner to Full-Stack",
          outcomes: "Live portfolio, production web application deployed on Vercel, clean GitHub profile, DWSA Certificate (RC 9718724).",
          tuition: "Early Bird: ₦45,000 (First 8 seats) | Standard: ₦55,000 | Split Pay: ₦30k + ₦25k",
          active: true,
        },
      ],
    },
    {
      category: "FOUNDATION PROGRAMMES",
      items: [
        {
          title: "AI Fundamentals & Prompt Engineering",
          subtitle: "Mastering Generative AI, LLM prompting techniques, and modern AI developer tools",
          duration: "4 Weeks",
          mode: "Virtual Live",
          level: "Beginner",
          outcomes: "Ability to write advanced prompts, automate tasks with AI agents, and integrate AI into daily workflow.",
          tuition: "Standard Tuition Applies",
          active: false,
        },
        {
          title: "Modern Web Core (HTML5, CSS3, JavaScript ES6+)",
          subtitle: "Foundational software engineering principles for web technologies",
          duration: "4 Weeks",
          mode: "Physical + Virtual",
          level: "Beginner",
          outcomes: "Mastery of web standards, responsive design, JavaScript DOM manipulation, and Git version control.",
          tuition: "Standard Tuition Applies",
          active: false,
        },
      ],
    },
    {
      category: "PROFESSIONAL PROGRAMMES",
      items: [
        {
          title: "Full-Stack React 19 & Next.js App Architecture",
          subtitle: "Production-grade web application engineering with Neon PostgreSQL and Server Actions",
          duration: "6 Weeks",
          mode: "Virtual Live",
          level: "Intermediate",
          outcomes: "Building high-performance scalable web applications, REST APIs, database schemas, and cloud deployment.",
          tuition: "Professional Track Tuition",
          active: false,
        },
      ],
    },
    {
      category: "EXECUTIVE PROGRAMMES",
      items: [
        {
          title: "Technology Leadership & AI Governance for Executives",
          subtitle: "Strategic decision making, AI risk management, and digital transformation for decision makers",
          duration: "2 Weeks / Executive Intensive",
          mode: "Executive Hybrid",
          level: "Executive / Senior Management",
          outcomes: "AI roadmap development, ethical AI compliance, technology ROI evaluation, and organizational readiness.",
          tuition: "Executive Fee",
          active: false,
        },
      ],
    },
    {
      category: "CORPORATE LEARNING",
      items: [
        {
          title: "Enterprise AI Readiness & Workforce Upskilling",
          subtitle: "Tailored workshops for enterprise teams to adopt AI workflows and cloud automations",
          duration: "Customized Schedule",
          mode: "On-site / Corporate Virtual",
          level: "All Staff Levels",
          outcomes: "10x team productivity, secure data handling, and custom workflow automations.",
          tuition: "Enterprise Contract",
          active: false,
        },
      ],
    },
    {
      category: "CERTIFICATION PROGRAMMES",
      items: [
        {
          title: "DWSA Certified Full-Stack Engineer (DCFE)",
          subtitle: "Institutional certification verifying code quality, security standards, and production deployment competence",
          duration: "Evaluation Based",
          mode: "Automated GitHub PR Assessment",
          level: "Professional",
          outcomes: "Official DWSA Certificate (RC 9718724) with verification QR code and transcript.",
          tuition: "Included in Bootcamp / Standalone Exam",
          active: true,
        },
      ],
    },
    {
      category: "DIPLOMA PROGRAMMES (PLANNED EXPANSION)",
      items: [
        {
          title: "Professional Diploma in Software Engineering",
          subtitle: "Formal 6-month in-depth academic diploma covering algorithms, systems architecture & cloud infrastructure",
          duration: "6 Months",
          mode: "Hybrid Campus",
          level: "Comprehensive",
          outcomes: "Full professional diploma qualification, internship placement, and portfolio verification.",
          tuition: "Coming Soon",
          active: false,
          planned: true,
        },
        {
          title: "Post-Graduate Diploma in AI & Autonomous Systems",
          subtitle: "Advanced specialization in machine learning pipelines, agentic workflows, and neural networks",
          duration: "9 Months",
          mode: "Hybrid Campus",
          level: "Post-Graduate",
          outcomes: "Advanced research capstone, published white paper, and industry placement.",
          tuition: "Coming Soon",
          active: false,
          planned: true,
        },
      ],
    },
    {
      category: "FELLOWSHIP PROGRAMMES (PLANNED EXPANSION)",
      items: [
        {
          title: "DWSA Africa Tech Leadership Fellowship",
          subtitle: "Selective merit-based fellowship for top African technical talent driving innovation and open source",
          duration: "1 Year Fellowship",
          mode: "Full Campus / Research Lab",
          level: "Fellow / Senior",
          outcomes: "Stipend, research funding, incubator access, and direct industry mentorship.",
          tuition: "Fully Funded / Fellowship Award",
          active: false,
          planned: true,
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#030e1f] text-[#f0f4ff] flex flex-col font-sans">
      <PublicNav />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017] text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            ACADEMIC CATALOGUE
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Academic <span className="text-[#d4a017]">Programmes</span>
          </h1>
          <p className="text-[#8899b4] text-base leading-relaxed">
            The Digital Technology Academy offers structured educational pathways — from intensive bootcamps and corporate training to future formal diploma and fellowship qualifications.
          </p>
        </div>

        {/* Categories Loop */}
        <div className="space-y-12">
          {categories.map((cat) => (
            <div key={cat.category} className="space-y-6">
              <div className="border-b border-[#d4a017]/20 pb-3 flex items-center justify-between">
                <h2 className="text-sm font-extrabold text-[#d4a017] tracking-wider uppercase">{cat.category}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cat.items.map((item) => (
                  <div
                    key={item.title}
                    className={`p-7 rounded-3xl space-y-4 flex flex-col justify-between ${
                      item.active
                        ? "bg-[#061428] border-2 border-[#d4a017] shadow-xl shadow-[#d4a017]/10"
                        : ("planned" in item && item.planned)
                        ? "bg-[#030e1f] border border-[#d4a017]/20 opacity-90"
                        : "bg-[#061428] border border-slate-800"
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        {item.active && (
                          <span className="text-[9px] font-extrabold text-[#030e1f] bg-[#4ade80] px-3 py-1 rounded-full uppercase tracking-wider">
                            Active Offering · Enrolling Now
                          </span>
                        )}
                        {("planned" in item && item.planned) && (
                          <span className="text-[9px] font-extrabold text-[#d4a017] bg-[#d4a017]/10 border border-[#d4a017]/30 px-3 py-1 rounded-full uppercase tracking-wider">
                            Planned Institutional Expansion (Coming Soon)
                          </span>
                        )}
                      </div>

                      <h3 className="text-xl font-extrabold text-white">{item.title}</h3>
                      <p className="text-xs text-[#d4a017] font-semibold">{item.subtitle}</p>

                      <div className="space-y-2 text-xs pt-2">
                        <div className="flex justify-between border-b border-slate-800 pb-1.5">
                          <span className="text-[#8899b4]">Duration:</span>
                          <strong className="text-white">{item.duration}</strong>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-1.5">
                          <span className="text-[#8899b4]">Learning Mode:</span>
                          <strong className="text-white">{item.mode}</strong>
                        </div>
                        <div className="flex justify-between border-b border-slate-800 pb-1.5">
                          <span className="text-[#8899b4]">Skill Level:</span>
                          <strong className="text-white">{item.level}</strong>
                        </div>
                        <div className="pt-1">
                          <span className="text-[#8899b4] block mb-1">Target Outcomes:</span>
                          <p className="text-xs text-[#c8d8f0] leading-relaxed bg-[#030e1f] p-3 rounded-xl border border-slate-800">
                            {item.outcomes}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3">
                      {item.active ? (
                        <Link
                          href="/admissions"
                          className="w-full py-3 bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-[#030e1f] font-extrabold rounded-xl text-xs text-center block shadow-lg shadow-[#4ade80]/20"
                        >
                          Apply for This Programme →
                        </Link>
                      ) : (
                        <Link
                          href="/admissions"
                          className="w-full py-3 bg-[#0f223d] hover:bg-[#16335a] border border-[#d4a017]/40 text-[#d4a017] font-bold rounded-xl text-xs text-center block"
                        >
                          Express Interest / Enquire →
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </main>

      <PublicFooter />
    </div>
  );
}
