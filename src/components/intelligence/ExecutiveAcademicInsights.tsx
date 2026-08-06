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
    <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-4 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#15803D]" />
          <div>
            <h3 className="text-sm font-extrabold text-[#0F172A]">Executive Academic Intelligence Summary</h3>
            <p className="text-[10px] text-slate-500">Institutional performance index, retention, conversion &amp; employability</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] text-[10px] font-black">
          Performance Index: {healthScore} / 100
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200 p-4 space-y-1">
          <span className="text-[9px] font-black text-slate-500 uppercase">Student Retention</span>
          <p className="text-xl font-extrabold text-[#15803D]">{institutionData.retentionRatePercentage}%</p>
          <p className="text-[9px] text-slate-500">Cohort Alpha to Delta</p>
        </div>

        <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200 p-4 space-y-1">
          <span className="text-[9px] font-black text-slate-500 uppercase">Admissions Conversion</span>
          <p className="text-xl font-extrabold text-[#D4A017]">{institutionData.admissionsConversionPercentage}%</p>
          <p className="text-[9px] text-slate-500">Applicant to Enrolled</p>
        </div>

        <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200 p-4 space-y-1">
          <span className="text-[9px] font-black text-slate-500 uppercase">Graduate Employability</span>
          <p className="text-xl font-extrabold text-[#15803D]">{institutionData.graduateEmployabilityPercentage}%</p>
          <p className="text-[9px] text-slate-500">6-Month Placement Rate</p>
        </div>

        <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200 p-4 space-y-1">
          <span className="text-[9px] font-black text-slate-500 uppercase">Tuition Revenue Yield</span>
          <p className="text-xl font-extrabold text-[#0F172A]">₦{(institutionData.tuitionRevenueCollectedNaira / 1000000).toFixed(1)}M</p>
          <p className="text-[9px] text-[#15803D] font-bold">Paystack Verified</p>
        </div>
      </div>
    </div>
  );
}
