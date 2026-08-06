"use client";

import React from "react";
import Link from "next/link";
import {
  HeartPulse, Activity, Cpu, Users, ShieldCheck, AlertCircle, CheckCircle2, TrendingUp
} from "lucide-react";
import { TenantHealthService } from "@/lib/institutionOS/TenantHealthService";

export default function TenantHealthDashboardPage() {
  const healthMonitors = TenantHealthService.getAllHealthMonitors();
  const avgHealth = TenantHealthService.getSystemAverageHealth();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-[#061428] border border-[#d4a017]/20 p-6 sm:p-8 rounded-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#d4a017]/15 text-[#d4a017] text-[10px] font-black uppercase tracking-wider">
          <HeartPulse className="w-3 h-3" />
          <span>v4.1 — Tenant Health & Adoption Dashboard</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Real-Time Institutional Health & Activity
        </h1>
        <p className="text-xs text-[#8899b4]">
          Continuous telemetry monitoring institution adoption rates, daily active users, learning & faculty engagement scores, and AI token consumption.
        </p>
      </div>

      {/* Primary KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-[#061428] border border-[#4ade80]/20 space-y-2">
          <span className="text-xs text-[#8899b4] font-bold block">System Average Health</span>
          <div className="text-3xl font-black text-[#4ade80]">{avgHealth}/100</div>
          <span className="text-[11px] text-[#4ade80] font-extrabold">All Tenants Healthy</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#061428] border border-[#d4a017]/20 space-y-2">
          <span className="text-xs text-[#8899b4] font-bold block">Total DAU (Active Today)</span>
          <div className="text-3xl font-black text-[#d4a017]">
            {healthMonitors.reduce((sum, h) => sum + h.activeUsersDAU, 0)}
          </div>
          <span className="text-[11px] text-[#8899b4]">Daily Active Users</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#061428] border border-[#a78bfa]/20 space-y-2">
          <span className="text-xs text-[#8899b4] font-bold block">Monthly AI Tokens</span>
          <div className="text-3xl font-black text-[#a78bfa]">
            {(
              healthMonitors.reduce((sum, h) => sum + h.aiTokensConsumedThisMonth, 0) / 1000000
            ).toFixed(2)}M
          </div>
          <span className="text-[11px] text-[#8899b4]">Tokens Consumed</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#061428] border border-[#4ade80]/20 space-y-2">
          <span className="text-xs text-[#8899b4] font-bold block">Support Health Score</span>
          <div className="text-3xl font-black text-white">
            {healthMonitors.filter((h) => h.supportIndicator === "green").length} / {healthMonitors.length}
          </div>
          <span className="text-[11px] text-[#4ade80] font-extrabold">Green Status</span>
        </div>
      </div>

      {/* Detailed Tenant Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {healthMonitors.map((h) => (
          <div key={h.tenantId} className="p-6 rounded-3xl bg-[#061428] border border-[#d4a017]/20 space-y-5">
            <div className="flex items-center justify-between border-b border-[#1a2f4a] pb-4">
              <div>
                <h3 className="text-base font-extrabold text-white">{h.tenantName}</h3>
                <span className="text-[10px] text-[#8899b4] font-mono">{h.tenantId}</span>
              </div>
              <span
                className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                  h.supportIndicator === "green"
                    ? "bg-[#4ade80]/15 text-[#4ade80] border border-[#4ade80]/30"
                    : "bg-[#d4a017]/15 text-[#d4a017] border border-[#d4a017]/30"
                }`}
              >
                ● {h.supportIndicator}
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#8899b4]">Adoption Rate</span>
                  <span className="font-bold text-[#4ade80]">{h.adoptionRatePercent}%</span>
                </div>
                <div className="w-full h-2 bg-[#030e1f] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#d4a017] to-[#4ade80]"
                    style={{ width: `${h.adoptionRatePercent}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#8899b4]">Learning Activity Score</span>
                  <span className="font-bold text-white">{h.learningActivityScore}/100</span>
                </div>
                <div className="w-full h-2 bg-[#030e1f] rounded-full overflow-hidden">
                  <div className="h-full bg-[#d4a017]" style={{ width: `${h.learningActivityScore}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#8899b4]">Faculty Activity Score</span>
                  <span className="font-bold text-white">{h.facultyActivityScore}/100</span>
                </div>
                <div className="w-full h-2 bg-[#030e1f] rounded-full overflow-hidden">
                  <div className="h-full bg-[#818cf8]" style={{ width: `${h.facultyActivityScore}%` }} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs border-t border-[#1a2f4a] pt-3 text-[11px]">
              <div>
                <span className="text-[#8899b4] block">Daily Active Users</span>
                <span className="font-bold text-white">{h.activeUsersDAU} DAU</span>
              </div>
              <div>
                <span className="text-[#8899b4] block">AI Tokens Used</span>
                <span className="font-bold text-[#a78bfa]">{(h.aiTokensConsumedThisMonth / 1000).toFixed(0)}k</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
