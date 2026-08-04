"use client";

import React from "react";
import {
  Briefcase, Zap, GitBranch, Award, CheckCircle2, TrendingUp,
  Sparkles, ExternalLink, ArrowUpRight, ShieldCheck, Target
} from "lucide-react";
import { EmployabilityService } from "@/lib/institutionOS/EmployabilityService";

export default function EmployabilityCentrePage() {
  const profile = EmployabilityService.getProfileForStudent("std_01");

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-[#4ade80]/15 text-[#4ade80] text-[9px] font-black uppercase">CAREER INTELLIGENCE</span>
          <span className="text-[10px] text-[#8899b4]">DWSA Corporate Placement</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white mt-1">Employability &amp; Career Readiness Centre</h2>
        <p className="text-xs text-[#8899b4]">Automated portfolio review, GitHub code quality index, interview readiness &amp; employer matching</p>
      </div>

      {/* Main Readiness Gauge Hero Card */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0d1628] via-[#061428] to-[#030e1f] border border-[#d4a017]/30 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-2xl">
        <div className="space-y-2">
          <span className="px-3 py-1 rounded-full bg-[#4ade80]/15 border border-[#4ade80]/30 text-[#4ade80] text-[10px] font-black uppercase">
            {profile.employmentProjection}
          </span>
          <h3 className="text-xl font-black text-white">Overall Career Readiness Score</h3>
          <p className="text-xs text-[#8899b4] max-w-xl">
            Calculated across technical PR submissions, portfolio completeness, GitHub commit consistency, and faculty assessment.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-[#030e1f] p-5 rounded-2xl border border-[#d4a017]/30 shrink-0">
          <div className="text-center">
            <span className="text-3xl font-black text-[#4ade80]">{profile.overallReadinessScore}%</span>
            <span className="text-[9px] font-black text-[#8899b4] uppercase block mt-0.5">Career Index</span>
          </div>
          <ShieldCheck className="w-8 h-8 text-[#4ade80]" />
        </div>
      </div>

      {/* 4 Readiness Pillars Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-5 space-y-2">
          <span className="text-[9px] font-black text-[#8899b4] uppercase">Technical Proficiency</span>
          <p className="text-2xl font-extrabold text-[#d4a017]">{profile.technicalScore}%</p>
          <p className="text-[10px] text-[#4ade80]">React, Node &amp; TypeScript Mastery</p>
        </div>

        <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-5 space-y-2">
          <span className="text-[9px] font-black text-[#8899b4] uppercase">GitHub Code Quality</span>
          <p className="text-2xl font-extrabold text-[#4ade80]">{profile.githubScore}%</p>
          <p className="text-[10px] text-[#8899b4]">24 Commits · Zero Lint Errors</p>
        </div>

        <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-5 space-y-2">
          <span className="text-[9px] font-black text-[#8899b4] uppercase">Portfolio Completeness</span>
          <p className="text-2xl font-extrabold text-white">{profile.portfolioScore}%</p>
          <p className="text-[10px] text-[#8899b4]">3 Production Projects Deployed</p>
        </div>

        <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-5 space-y-2">
          <span className="text-[9px] font-black text-[#8899b4] uppercase">Interview Readiness</span>
          <p className="text-2xl font-extrabold text-[#818cf8]">{profile.interviewReadinessScore}%</p>
          <p className="text-[10px] text-[#8899b4]">System Design &amp; Soft Skills</p>
        </div>
      </div>

      {/* Recommended Career Paths & Action Plan */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-[#d4a017]" />
            Recommended Corporate Career Roles
          </h3>
          <div className="space-y-2">
            {profile.recommendedCareerPaths.map((path) => (
              <div key={path} className="rounded-xl bg-[#030e1f] border border-[#1a2f4a] p-3 text-xs font-bold text-white flex items-center justify-between">
                <span>{path}</span>
                <span className="text-[9px] font-black text-[#4ade80] px-2 py-0.5 rounded bg-[#4ade80]/10">MATCH</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#4ade80]" />
            Suggested Placement Action Plan
          </h3>
          <div className="space-y-2">
            {profile.suggestedActionItems.map((item) => (
              <div key={item} className="rounded-xl bg-[#030e1f] border border-[#1a2f4a] p-3 text-xs text-[#8899b4] flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
