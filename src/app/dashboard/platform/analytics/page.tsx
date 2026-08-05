"use client";

import React from "react";
import Link from "next/link";
import {
  BarChart3, Globe, Activity, Users, GraduationCap, Award, DollarSign,
  Cpu, HardDrive, ShieldCheck, TrendingUp, CheckCircle2
} from "lucide-react";
import { TenantAnalyticsService } from "@/lib/institutionOS/TenantAnalyticsService";
import { PlatformMetricsService } from "@/lib/institutionOS/PlatformMetricsService";

export default function PlatformAnalyticsPage() {
  const summary = TenantAnalyticsService.getPlatformAdoptionSummary();
  const healthScores = TenantAnalyticsService.getTenantHealthScores();
  const usageSeries = TenantAnalyticsService.getUsageSeries();
  const snapshot = PlatformMetricsService.getSnapshot();

  const maxSessions = Math.max(...usageSeries.map((u) => u.activeSessions));

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-[#061428] border border-[#d4a017]/20 p-6 sm:p-8 rounded-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#d4a017]/15 text-[#d4a017] text-[10px] font-black uppercase tracking-wider">
          <BarChart3 className="w-3 h-3" />
          <span>Phase 8 — Platform Analytics & Consumption</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Platform-Wide Intelligence & Health
        </h1>
        <p className="text-xs text-[#8899b4]">
          Cross-tenant metrics, learner adoption rates, AI token consumption, employment placements, and infrastructure load.
        </p>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-[#061428] border border-[#d4a017]/20 space-y-2">
          <span className="text-xs text-[#8899b4] font-bold block">Onboarded Institutions</span>
          <div className="text-3xl font-black text-white">{summary.totalTenants}</div>
          <span className="text-[11px] text-[#4ade80] font-extrabold">100% Operational</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#061428] border border-[#4ade80]/20 space-y-2">
          <span className="text-xs text-[#8899b4] font-bold block">Learner Placement Rate</span>
          <div className="text-3xl font-black text-[#4ade80]">{summary.employmentPlacementRatePercent}%</div>
          <span className="text-[11px] text-[#4ade80] font-extrabold">Graduate Employability</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#061428] border border-[#d4a017]/20 space-y-2">
          <span className="text-xs text-[#8899b4] font-bold block">Platform Health Score</span>
          <div className="text-3xl font-black text-[#d4a017]">{summary.platformAverageHealthScore}/100</div>
          <span className="text-[11px] text-[#8899b4]">Cross-tenant average</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#061428] border border-[#a78bfa]/20 space-y-2">
          <span className="text-xs text-[#8899b4] font-bold block">Monthly AI Requests</span>
          <div className="text-3xl font-black text-[#a78bfa]">{(summary.monthlyAiRequests / 1000).toFixed(0)}k</div>
          <span className="text-[11px] text-[#8899b4]">Gemini 2.0 Flash Core</span>
        </div>
      </div>

      {/* 7-Day Active Session Consumption Chart */}
      <div className="p-6 rounded-3xl bg-[#061428] border border-[#d4a017]/20 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-[#d4a017]" />
              7-Day Active Session Consumption
            </h3>
            <p className="text-xs text-[#8899b4]">Real-time daily active user traffic pattern across all tenant nodes</p>
          </div>
        </div>

        <div className="flex items-end gap-3 sm:gap-6 pt-4 h-40">
          {usageSeries.map((u) => {
            const heightPct = maxSessions > 0 ? (u.activeSessions / maxSessions) * 100 : 0;
            return (
              <div key={u.date} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-[10px] font-bold text-[#d4a017]">{u.activeSessions}</span>
                <div className="w-full bg-[#030e1f] rounded-t-lg h-32 flex items-end overflow-hidden">
                  <div
                    className="w-full bg-gradient-to-t from-[#d4a017] to-[#f0c040] rounded-t-lg transition-all duration-500"
                    style={{ height: `${heightPct}%` }}
                  />
                </div>
                <span className="text-[10px] text-[#6b7a94] font-bold">{u.date}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tenant Health Scorecard Table */}
      <div className="p-6 rounded-3xl bg-[#061428] border border-[#d4a017]/20 space-y-6">
        <div>
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#4ade80]" />
            Tenant Health & Adoption Scorecards
          </h3>
          <p className="text-xs text-[#8899b4]">Individual adoption ratios, learner engagement, and API health scores</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#030e1f] border-b border-[#1a2f4a] text-[#6b7a94] uppercase tracking-wider text-[10px] font-bold">
                <th className="py-3 px-4">Tenant</th>
                <th className="py-3 px-4">Health Score</th>
                <th className="py-3 px-4">Adoption %</th>
                <th className="py-3 px-4">Faculty Engagement</th>
                <th className="py-3 px-4">API Health</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a2f4a]">
              {healthScores.map((h) => (
                <tr key={h.tenantId} className="hover:bg-[#0c1b33] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">{h.tenantName}</td>
                  <td className="py-3.5 px-4">
                    <span className="font-black text-[#d4a017] text-sm">{h.overallScore}/100</span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-[#4ade80]">{h.adoptionPercent}%</td>
                  <td className="py-3.5 px-4 text-[#aab4c4]">{h.facultyEngagementScore}%</td>
                  <td className="py-3.5 px-4 text-[#aab4c4]">{h.apiHealthScore}%</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        h.status === "healthy"
                          ? "bg-[#4ade80]/15 text-[#4ade80] border border-[#4ade80]/30"
                          : "bg-[#d4a017]/15 text-[#d4a017] border border-[#d4a017]/30"
                      }`}
                    >
                      {h.status.replace("_", " ")}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
