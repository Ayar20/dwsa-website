"use client";

import React, { useState } from "react";
import { PlatformAIAgentService } from "@/lib/institutionOS/PlatformAIAgentService";
import {
  Sparkles, AlertTriangle, TrendingUp, HeartPulse, ShieldAlert,
  Users, Zap, Play, Pause, ChevronRight, Globe, Activity, Clock, Star
} from "lucide-react";

const signalConfig = {
  "churn-risk": { color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30", badge: "bg-red-500/20 text-red-400", icon: AlertTriangle },
  growth: { color: "text-[#4ade80]", bg: "bg-[#4ade80]/10", border: "border-[#4ade80]/30", badge: "bg-[#4ade80]/20 text-[#4ade80]", icon: TrendingUp },
  performance: { color: "text-[#818cf8]", bg: "bg-[#818cf8]/10", border: "border-[#818cf8]/30", badge: "bg-[#818cf8]/20 text-[#818cf8]", icon: Activity },
  compliance: { color: "text-[#d4a017]", bg: "bg-[#d4a017]/10", border: "border-[#d4a017]/30", badge: "bg-[#d4a017]/20 text-[#d4a017]", icon: ShieldAlert },
  support: { color: "text-[#38bdf8]", bg: "bg-[#38bdf8]/10", border: "border-[#38bdf8]/30", badge: "bg-[#38bdf8]/20 text-[#38bdf8]", icon: HeartPulse },
};

const automationStatus = {
  active: { color: "text-[#4ade80]", bg: "bg-[#4ade80]/10", border: "border-[#4ade80]/30", dot: "bg-[#4ade80]" },
  triggered: { color: "text-[#d4a017]", bg: "bg-[#d4a017]/10", border: "border-[#d4a017]/30", dot: "bg-[#d4a017] animate-pulse" },
  paused: { color: "text-[#6b7a94]", bg: "bg-[#1a2f4a]/50", border: "border-[#1a2f4a]", dot: "bg-[#6b7a94]" },
};

export default function PlatformAIAgentPage() {
  const pulse = PlatformAIAgentService.getGlobalPulse();
  const signals = PlatformAIAgentService.getTenantAISignals();
  const automations = PlatformAIAgentService.getPlatformAutomations();
  const workforceStats = PlatformAIAgentService.getAIWorkforceStats();

  return (
    <div className="min-h-screen space-y-6 pb-8">

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#030e1f] via-[#061428] to-[#0a1f40] border border-[#a78bfa]/20 p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-[#a78bfa]/5 via-transparent to-[#38bdf8]/5" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#a78bfa] via-[#8b5cf6] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-[#8b5cf6]/20">
              <Globe className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-xl font-black text-white tracking-tight">Atlas — Platform Operator Agent</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#4ade80]/20 text-[#4ade80] text-[10px] font-black tracking-widest border border-[#4ade80]/30">ONLINE</span>
              </div>
              <p className="text-sm text-[#8899b4]">Global tenant intelligence · Churn prevention · Platform automation orchestration</p>
            </div>
          </div>
          {/* Platform Health */}
          <div className="flex items-center gap-4 text-center">
            {[
              { v: pulse.totalTenants, l: "tenants", c: "text-white" },
              { v: pulse.totalActiveUsers.toLocaleString(), l: "active users", c: "text-[#4ade80]" },
              { v: `${pulse.platformHealthScore}%`, l: "health", c: "text-[#a78bfa]" },
            ].map((s, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="w-px h-8 bg-[#1a2f4a]" />}
                <div>
                  <div className={`text-xl font-black ${s.c}`}>{s.v}</div>
                  <div className="text-[10px] text-[#8899b4] font-bold">{s.l}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Global Pulse Bar */}
        <div className="relative mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "AI Requests Today", value: pulse.aiRequestsToday.toLocaleString(), color: "text-[#818cf8]" },
            { label: "Tokens This Month", value: pulse.tokensConsumedMonth, color: "text-[#38bdf8]" },
            { label: "Churn Risks", value: pulse.churnRiskCount, color: "text-red-400" },
            { label: "Avg Onboarding Days", value: `${pulse.avgOnboardingDays}d`, color: "text-[#4ade80]" },
          ].map((m) => (
            <div key={m.label} className="p-3 rounded-xl bg-[#061428] border border-[#1a2f4a] text-center">
              <div className={`text-base font-black ${m.color}`}>{m.value}</div>
              <div className="text-[10px] text-[#6b7a94]">{m.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Tenant AI Signals */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-[#a78bfa]" /> Tenant AI Signals
            </h2>
            <span className="text-[10px] text-[#6b7a94]">{signals.length} signals detected</span>
          </div>

          {signals.map((signal) => {
            const cfg = signalConfig[signal.signalType];
            const SignalIcon = cfg.icon;
            return (
              <div key={signal.tenantId} className={`rounded-2xl bg-[#040f20] border ${cfg.border} overflow-hidden`}>
                <div className={`px-4 py-3 ${cfg.bg} flex items-center justify-between`}>
                  <div className="flex items-center gap-2.5">
                    <SignalIcon className={`w-4 h-4 ${cfg.color}`} />
                    <div>
                      <p className="text-[10px] font-black text-[#8899b4]">{signal.tenantName}</p>
                      <h3 className="text-xs font-black text-white">{signal.title}</h3>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${cfg.badge}`}>{signal.signalType}</span>
                </div>
                <div className="px-4 pb-4 pt-3 space-y-2.5">
                  <p className="text-xs text-[#8899b4] leading-relaxed">{signal.detail}</p>
                  <div className="p-2.5 rounded-xl bg-[#061428] border border-[#1a2f4a]">
                    <p className="text-[10px] font-black text-[#a78bfa] mb-0.5 flex items-center gap-1"><Zap className="w-3 h-3" /> Atlas's Suggested Action</p>
                    <p className="text-[11px] text-[#c8d8f0]">{signal.suggestedAction}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#4a5568] flex items-center gap-1"><Clock className="w-3 h-3" />{signal.detectedAt}</span>
                    <button className={`text-[11px] font-bold ${cfg.color} hover:underline flex items-center gap-1`}>
                      Take Action <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Platform Automations */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#d4a017]" /> Platform Automations
            </h2>
            <span className="text-[10px] text-[#6b7a94]">{automations.filter(a => a.status === "active").length} active rules</span>
          </div>

          {automations.map((auto) => {
            const cfg = automationStatus[auto.status];
            return (
              <div key={auto.id} className="rounded-2xl bg-[#040f20] border border-[#1a2f4a] p-4 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`flex items-center gap-1.5 px-2 py-0.5 rounded border text-[9px] font-black ${cfg.bg} ${cfg.border} ${cfg.color}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {auto.status.toUpperCase()}
                      </span>
                      <span className="text-[10px] text-[#6b7a94]">triggered {auto.timesTriggered}×</span>
                    </div>
                    <h3 className="text-xs font-black text-white">{auto.name}</h3>
                  </div>
                  <button className={`p-2 rounded-xl ${auto.status === "paused" ? "bg-[#4ade80]/10 text-[#4ade80] border border-[#4ade80]/30 hover:bg-[#4ade80]/20" : "bg-[#1a2f4a]/50 text-[#6b7a94] border border-[#1a2f4a] hover:bg-[#1a2f4a]"} transition-all`}>
                    {auto.status === "paused" ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                  </button>
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-start gap-2">
                    <span className="text-[10px] font-black text-[#6b7a94] w-10 shrink-0 mt-0.5">WHEN</span>
                    <p className="text-[11px] text-[#8899b4]">{auto.trigger}</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[10px] font-black text-[#a78bfa] w-10 shrink-0 mt-0.5">THEN</span>
                    <p className="text-[11px] text-[#c8d8f0]">{auto.action}</p>
                  </div>
                </div>
                {auto.lastTriggered && (
                  <p className="text-[10px] text-[#4a5568] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Last triggered: {auto.lastTriggered}
                  </p>
                )}
              </div>
            );
          })}

          {/* AI Workforce Global Stats */}
          <div className="rounded-2xl bg-gradient-to-r from-[#a78bfa]/10 to-[#38bdf8]/10 border border-[#a78bfa]/20 p-4 space-y-3">
            <h3 className="text-xs font-black text-[#a78bfa] uppercase tracking-widest flex items-center gap-1.5">
              <Star className="w-3.5 h-3.5" /> AI Workforce · Global Stats
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Student agent sessions", value: workforceStats.studentAgentSessions.toLocaleString() },
                { label: "Faculty insights", value: workforceStats.facultyAgentInsights.toLocaleString() },
                { label: "Admin alerts", value: workforceStats.adminAgentAlerts },
                { label: "Executive briefings", value: workforceStats.executiveBriefingsGenerated },
                { label: "Tokens today", value: workforceStats.totalTokensConsumedToday },
                { label: "Satisfaction", value: `${workforceStats.agentSatisfactionScore}%` },
              ].map((s) => (
                <div key={s.label} className="p-2.5 rounded-xl bg-[#061428] border border-[#1a2f4a]">
                  <div className="text-sm font-black text-white">{s.value}</div>
                  <div className="text-[10px] text-[#6b7a94]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
