"use client";

import React from "react";
import { Activity, TrendingUp, Users, DollarSign, Award, GraduationCap, Sparkles } from "lucide-react";
import { AnalyticsEngine, InstitutionAnalyticsData } from "@/lib/institutionOS/AnalyticsEngine";

interface ExecutiveAcademicInsightsProps {
  institutionData?: InstitutionAnalyticsData;
}

const defaultInstitutionData: InstitutionAnalyticsData = {
  activeStudents: 482,
  facultyCount: 34,
  retentionRatePercentage: 96,
  completionRatePercentage: 88,
  admissionsConversionPercentage: 74,
  graduateEmployabilityPercentage: 92,
  tuitionRevenueCollectedNaira: 48250000,
};

export default function ExecutiveAcademicInsights({ institutionData = defaultInstitutionData }: ExecutiveAcademicInsightsProps) {
  const healthScore = AnalyticsEngine.calculateInstitutionHealth(institutionData);

  return (
    <div className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-[#1a2f4a] pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#d4a017]" />
          <div>
            <h3 className="text-sm font-extrabold text-white">Executive Academic Intelligence Summary</h3>
            <p className="text-[10px] text-[#8899b4]">Institutional performance index, retention, conversion &amp; employability</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80] text-[10px] font-black">
          Institution Performance Index: {healthScore} / 100
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-2xl bg-[#030e1f] border border-[#1a2f4a] p-4 space-y-1">
          <span className="text-[9px] font-black text-[#8899b4] uppercase">Student Retention</span>
          <p className="text-xl font-extrabold text-[#4ade80]">{institutionData.retentionRatePercentage}%</p>
          <p className="text-[9px] text-[#8899b4]">Cohort Alpha to Delta</p>
        </div>

        <div className="rounded-2xl bg-[#030e1f] border border-[#1a2f4a] p-4 space-y-1">
          <span className="text-[9px] font-black text-[#8899b4] uppercase">Admissions Conversion</span>
          <p className="text-xl font-extrabold text-[#d4a017]">{institutionData.admissionsConversionPercentage}%</p>
          <p className="text-[9px] text-[#8899b4]">Applicant to Enrolled</p>
        </div>

        <div className="rounded-2xl bg-[#030e1f] border border-[#1a2f4a] p-4 space-y-1">
          <span className="text-[9px] font-black text-[#8899b4] uppercase">Graduate Employability</span>
          <p className="text-xl font-extrabold text-[#4ade80]">{institutionData.graduateEmployabilityPercentage}%</p>
          <p className="text-[9px] text-[#8899b4]">6-Month Placement Rate</p>
        </div>

        <div className="rounded-2xl bg-[#030e1f] border border-[#1a2f4a] p-4 space-y-1">
          <span className="text-[9px] font-black text-[#8899b4] uppercase">Tuition Revenue Yield</span>
          <p className="text-xl font-extrabold text-white">₦{(institutionData.tuitionRevenueCollectedNaira / 1000000).toFixed(1)}M</p>
          <p className="text-[9px] text-[#4ade80]">+22.5% YoY Growth</p>
        </div>
      </div>
    </div>
  );
}
