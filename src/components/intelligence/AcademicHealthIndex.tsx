"use client";

import React from "react";
import { Activity, CheckCircle2, ShieldCheck, TrendingUp } from "lucide-react";
import { AnalyticsEngine, InstitutionAnalyticsData } from "@/lib/institutionOS/AnalyticsEngine";

interface AcademicHealthIndexProps {
  data?: InstitutionAnalyticsData;
}

const defaultData: InstitutionAnalyticsData = {
  activeStudents: 482,
  facultyCount: 34,
  retentionRatePercentage: 96,
  completionRatePercentage: 88,
  admissionsConversionPercentage: 74,
  graduateEmployabilityPercentage: 92,
  tuitionRevenueCollectedNaira: 48250000,
};

export default function AcademicHealthIndex({ data = defaultData }: AcademicHealthIndexProps) {
  const healthScore = AnalyticsEngine.calculateInstitutionHealth(data);

  return (
    <div className="rounded-3xl bg-gradient-to-br from-[#15803D] to-[#0F172A] border border-[#15803D]/20 p-6 space-y-4 shadow-xl text-white">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/15 border border-white/20 text-[#D4A017] flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded bg-white/15 text-white text-[9px] font-black uppercase">SYSTEM HEALTH</span>
              <span className="text-[10px] text-white/70">InstitutionOS v5.1</span>
            </div>
            <h3 className="text-base font-extrabold text-white">Academic Health Index Engine</h3>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white/10 px-5 py-3 rounded-2xl border border-white/20">
          <div>
            <span className="text-[9px] font-black text-white/70 uppercase block">Institutional Health Score</span>
            <span className="text-2xl font-black text-white">{healthScore} <span className="text-xs text-white/70">/ 100</span></span>
          </div>
          <span className="px-3 py-1 rounded-full bg-white text-[#15803D] text-xs font-black">
            OPTIMAL
          </span>
        </div>
      </div>
    </div>
  );
}
