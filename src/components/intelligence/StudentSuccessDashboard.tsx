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
    Excellent: { text: "text-[#4ade80]", bg: "bg-[#4ade80]/10", border: "border-[#4ade80]/30" },
    Healthy: { text: "text-[#4ade80]", bg: "bg-[#4ade80]/10", border: "border-[#4ade80]/30" },
    Monitor: { text: "text-[#d4a017]", bg: "bg-[#d4a017]/10", border: "border-[#d4a017]/30" },
    "At Risk": { text: "text-amber-400", bg: "bg-amber-950/30", border: "border-amber-800/30" },
    Critical: { text: "text-red-400", bg: "bg-red-950/40", border: "border-red-800/40" },
  };

  const currentRiskStyle = riskColorMap[riskCategory];

  return (
    <div className="space-y-6">
      {/* Risk & Velocity Header Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Academic Health Category */}
        <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-5 space-y-2">
          <span className="text-[9px] font-black text-[#8899b4] uppercase tracking-wider">Academic Risk Status</span>
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold border ${currentRiskStyle.bg} ${currentRiskStyle.border} ${currentRiskStyle.text}`}>
              {riskCategory}
            </span>
            <ShieldCheck className={`w-5 h-5 ${currentRiskStyle.text}`} />
          </div>
          <p className="text-[10px] text-[#8899b4]">Composite model: Attendance + Completion + Engagement</p>
        </div>

        {/* Engagement Score */}
        <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-5 space-y-2">
          <span className="text-[9px] font-black text-[#8899b4] uppercase tracking-wider">Engagement Index</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-white">{studentData.engagementScore}</span>
            <span className="text-[10px] font-bold text-[#4ade80]">+4.5% vs Cohort Avg</span>
          </div>
          <p className="text-[10px] text-[#8899b4]">High activity on LMS &amp; GitHub</p>
        </div>

        {/* Learning Velocity */}
        <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-5 space-y-2">
          <span className="text-[9px] font-black text-[#8899b4] uppercase tracking-wider">Learning Velocity</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-[#d4a017]">1.4x</span>
            <Zap className="w-4 h-4 text-[#d4a017]" />
          </div>
          <p className="text-[10px] text-[#8899b4]">Pace relative to module timeline</p>
        </div>

        {/* PR Approval Yield */}
        <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-5 space-y-2">
          <span className="text-[9px] font-black text-[#8899b4] uppercase tracking-wider">PR Pass Rate</span>
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-[#4ade80]">
              {Math.round((studentData.prsApproved / Math.max(1, studentData.prsSubmitted)) * 100)}%
            </span>
            <span className="text-[10px] text-[#8899b4] font-bold">{studentData.prsApproved}/{studentData.prsSubmitted} PRs</span>
          </div>
          <p className="text-[10px] text-[#8899b4]">GitHub PR quality score</p>
        </div>
      </div>

      {/* Recommended Next Actions (AI Rules Engine) */}
      <div className="rounded-3xl bg-[#061428] border border-[#d4a017]/30 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#1a2f4a] pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#d4a017]" />
            <h3 className="text-sm font-extrabold text-white">Recommended Next Actions</h3>
          </div>
          <span className="px-2 py-0.5 rounded bg-[#d4a017]/15 text-[#d4a017] text-[8px] font-black uppercase">
            AI Rules Engine
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {recommendations.map((rec) => (
            <div key={rec.id} className="rounded-2xl bg-[#030e1f] border border-[#1a2f4a] p-4 space-y-2 hover:border-[#d4a017]/40 transition-all flex flex-col justify-between">
              <div>
                <span className="px-2 py-0.5 rounded bg-[#1a2f4a] text-[#8899b4] text-[8px] font-black uppercase">{rec.category}</span>
                <h4 className="text-xs font-extrabold text-white mt-1.5 leading-snug">{rec.title}</h4>
                <p className="text-[10px] text-[#8899b4] mt-1 leading-relaxed">{rec.description}</p>
              </div>
              <a
                href={rec.actionUrl}
                className="text-[10px] font-extrabold text-[#d4a017] hover:underline flex items-center gap-1 pt-2 border-t border-[#1a2f4a]"
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
