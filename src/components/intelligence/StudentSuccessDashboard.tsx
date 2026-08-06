"use client";

import React from "react";
import {
  TrendingUp, Award, Activity, CheckCircle2, Clock, Zap, Sparkles,
  ArrowUpRight, AlertTriangle, ShieldCheck
} from "lucide-react";
import { AnalyticsEngine, StudentAnalyticsData } from "@/lib/institutionOS/AnalyticsEngine";
import { RecommendationEngine } from "@/lib/institutionOS/RecommendationEngine";

interface StudentSuccessDashboardProps {
  studentData?: StudentAnalyticsData;
  studentName?: string;
}

const defaultStudentData: StudentAnalyticsData = {
  progressPercentage: 88,
  assignmentsCompleted: 9,
  totalAssignments: 10,
  attendanceRate: 96,
  engagementScore: 92,
  prsSubmitted: 24,
  prsApproved: 22,
};

export default function StudentSuccessDashboard({
  studentData = defaultStudentData,
  studentName = "Kofi Asante",
}: StudentSuccessDashboardProps) {
  const completionRate = AnalyticsEngine.calculateCompletionRate(studentData);
  const riskCategory = AnalyticsEngine.calculateRisk(
    studentData.attendanceRate,
    completionRate,
    studentData.engagementScore
  );

  const recommendations = RecommendationEngine.getRecommendationsForRole("STUDENT");

  const riskColorMap = {
    Excellent: { text: "text-[#15803D]", bg: "bg-[#F0FDF4]", border: "border-[#15803D]/30" },
    Healthy: { text: "text-[#15803D]", bg: "bg-[#F0FDF4]", border: "border-[#15803D]/30" },
    Monitor: { text: "text-[#D4A017]", bg: "bg-[#FEFCE8]", border: "border-[#D4A017]/30" },
    "At Risk": { text: "text-amber-700", bg: "bg-amber-50", border: "border-amber-200" },
    Critical: { text: "text-red-700", bg: "bg-red-50", border: "border-red-200" },
  };

  const currentRiskStyle = riskColorMap[riskCategory];

  return (
    <div className="space-y-6">
      {/* Risk & Velocity Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Academic Health Category */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-2 shadow-sm">
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Academic Risk Status</span>
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${currentRiskStyle.bg} ${currentRiskStyle.border} ${currentRiskStyle.text}`}>
              {riskCategory}
            </span>
            <ShieldCheck className={`w-5 h-5 ${currentRiskStyle.text}`} />
          </div>
          <p className="text-[10px] text-slate-500">Composite model: Attendance + Completion + Engagement</p>
        </div>

        {/* Engagement Score */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-2 shadow-sm">
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Engagement Index</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-[#0F172A]">{studentData.engagementScore}</span>
            <span className="text-[10px] font-bold text-[#15803D]">+4.5% vs Cohort Avg</span>
          </div>
          <p className="text-[10px] text-slate-500">High activity on LMS &amp; GitHub</p>
        </div>

        {/* Learning Velocity */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-2 shadow-sm">
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">Learning Velocity</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-[#D4A017]">1.4x</span>
            <Zap className="w-4 h-4 text-[#D4A017]" />
          </div>
          <p className="text-[10px] text-slate-500">Pace relative to module timeline</p>
        </div>

        {/* PR Approval Yield */}
        <div className="rounded-2xl bg-white border border-slate-200 p-5 space-y-2 shadow-sm">
          <span className="text-[9px] font-black text-slate-500 uppercase tracking-wider">PR Pass Rate</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-[#15803D]">
              {Math.round((studentData.prsApproved / Math.max(1, studentData.prsSubmitted)) * 100)}%
            </span>
            <span className="text-[10px] text-slate-500 font-bold">{studentData.prsApproved}/{studentData.prsSubmitted} PRs</span>
          </div>
          <p className="text-[10px] text-slate-500">GitHub PR quality score</p>
        </div>
      </div>

      {/* Recommended Next Actions (AI Rules Engine) */}
      <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4A017]" />
            <h3 className="text-sm font-extrabold text-[#0F172A]">Recommended Next Actions</h3>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#FEFCE8] text-[#D4A017] border border-[#D4A017]/30 text-[8px] font-black uppercase">
            AI Rules Engine
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {recommendations.map((rec) => (
            <div key={rec.id} className="rounded-2xl bg-[#F8FAFC] border border-slate-200 p-4 space-y-2 hover:border-[#15803D]/40 transition-all flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[8px] font-black uppercase">{rec.category}</span>
                <h4 className="text-xs font-extrabold text-[#0F172A] mt-1.5 leading-snug">{rec.title}</h4>
                <p className="text-[10px] text-slate-600 mt-1 leading-relaxed">{rec.description}</p>
              </div>
              <a
                href={rec.actionUrl}
                className="text-[10px] font-extrabold text-[#15803D] hover:underline flex items-center gap-1 pt-2 border-t border-slate-200"
              >
                {rec.actionText} <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
