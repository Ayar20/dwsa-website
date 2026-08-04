"use client";

import React from "react";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import { GraduationCap, ArrowRight, Code2, LayoutDashboard, Award, CheckCircle2, ShieldCheck, Users, Sparkles } from "lucide-react";

export default function CampusPage() {
  const modules = [
    { name: "Student Dashboard & Financial ERP", status: "Active Live Feature", statusColor: "text-[#4ade80] bg-[#4ade80]/10 border-[#4ade80]/30", desc: "View module progress, tuition payment status, and Paystack installment receipts." },
    { name: "GitHub PR Code Grading Engine", status: "Active Live Feature", statusColor: "text-[#4ade80] bg-[#4ade80]/10 border-[#4ade80]/30", desc: "Submit production Pull Request links for automated repository testing and instructor review." },
    { name: "Verified Certificates & Badges", status: "Active Live Feature", statusColor: "text-[#4ade80] bg-[#4ade80]/10 border-[#4ade80]/30", desc: "Digital QR-verifiable certificates of completion issued upon capstone launch." },
    { name: "Interactive Learning Studio", status: "Coming in Future Release", statusColor: "text-[#d4a017] bg-[#d4a017]/10 border-[#d4a017]/30", desc: "Integrated browser code environment, video lectures, and live code playground." },
    { name: "Innovation Hub & Hackathon Desk", status: "Coming in Future Release", statusColor: "text-[#d4a017] bg-[#d4a017]/10 border-[#d4a017]/30", desc: "Collaborative project incubator, teammate matching, and hackathon submission portal." },
    { name: "Community Developer Forums", status: "Coming in Future Release", statusColor: "text-[#d4a017] bg-[#d4a017]/10 border-[#d4a017]/30", desc: "Pan-African developer chat, code debugging channels, and alumni network." },
  ];

  return (
    <div className="min-h-screen bg-[#030e1f] text-[#f0f4ff] flex flex-col font-sans">
      <PublicNav />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017] text-xs font-bold">
            <GraduationCap className="w-3.5 h-3.5" />
            UNIFIED LEARNER EXPERIENCE
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            The DTA <span className="text-[#d4a017]">Digital Campus</span>
          </h1>
          <p className="text-[#8899b4] text-base leading-relaxed">
            The Digital Campus is DTA&apos;s learner operating environment — uniting coursework, automated GitHub code evaluation, financial ERP, and career progress tracking.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((m) => (
            <div key={m.name} className="p-7 bg-[#061428] border border-slate-800 rounded-3xl space-y-3 flex flex-col justify-between">
              <div className="space-y-3">
                <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border uppercase tracking-wider ${m.statusColor}`}>
                  {m.status}
                </span>
                <h3 className="text-lg font-bold text-white">{m.name}</h3>
                <p className="text-xs text-[#8899b4] leading-relaxed">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Sign In CTA */}
        <div className="bg-gradient-to-br from-[#061428] via-[#091832] to-[#061428] border-2 border-[#d4a017] rounded-3xl p-8 sm:p-12 text-center space-y-6 shadow-xl max-w-3xl mx-auto">
          <div className="p-3 bg-[#d4a017]/20 text-[#d4a017] rounded-2xl w-fit mx-auto border border-[#d4a017]/40">
            <GraduationCap className="w-8 h-8" />
          </div>

          <h2 className="text-3xl font-extrabold text-white">Already Enrolled in Cohort 2026?</h2>
          <p className="text-xs text-[#8899b4]">Sign in to access your Student Workspace, module assignments, and GitHub PR submission desk.</p>

          <div className="pt-2">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#d4a017] to-[#e5a910] text-[#030e1f] font-extrabold text-sm shadow-xl shadow-[#d4a017]/25 hover:scale-[1.02] transition-all"
            >
              Enter Digital Campus Workspace →
            </Link>
          </div>
        </div>

      </main>

      <PublicFooter />
    </div>
  );
}
