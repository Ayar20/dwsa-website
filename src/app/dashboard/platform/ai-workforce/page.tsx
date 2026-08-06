"use client";

import React from "react";
import { AIWorkforceService } from "@/lib/institutionOS/AIWorkforceService";
import {
  Sparkles, Globe, GraduationCap, BookOpen, ShieldCheck, User, ChevronRight, Star, Zap, Clock
} from "lucide-react";
import Link from "next/link";

const roleConfig: Record<string, { color: string; bg: string; border: string; gradient: string }> = {
  student: { color: "text-[#4ade80]", bg: "bg-[#4ade80]/10", border: "border-[#4ade80]/30", gradient: "from-[#4ade80] to-[#22c55e]" },
  faculty: { color: "text-[#d4a017]", bg: "bg-[#d4a017]/10", border: "border-[#d4a017]/30", gradient: "from-[#d4a017] to-[#f0c040]" },
  admin: { color: "text-[#38bdf8]", bg: "bg-[#38bdf8]/10", border: "border-[#38bdf8]/30", gradient: "from-[#38bdf8] to-[#0ea5e9]" },
  executive: { color: "text-[#a78bfa]", bg: "bg-[#a78bfa]/10", border: "border-[#a78bfa]/30", gradient: "from-[#a78bfa] to-[#8b5cf6]" },
  platform: { color: "text-[#f472b6]", bg: "bg-[#f472b6]/10", border: "border-[#f472b6]/30", gradient: "from-[#f472b6] to-[#ec4899]" },
};

export default function AIWorkforceRegistryPage() {
  const agents = AIWorkforceService.getAllAgents();
  const health = AIWorkforceService.getWorkforceHealth();

  return (
    <div className="min-h-screen space-y-6 pb-8">

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#030e1f] via-[#061428] to-[#0a1f40] border border-[#a78bfa]/20 p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-[#a78bfa]/5 via-transparent to-[#4ade80]/5" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#a78bfa] via-[#818cf8] to-[#6366f1] flex items-center justify-center shadow-lg shadow-[#818cf8]/20">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-xl font-black text-white tracking-tight">AI Digital Workforce Registry</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#4ade80]/20 text-[#4ade80] text-[10px] font-black tracking-widest border border-[#4ade80]/30">v4.2</span>
              </div>
              <p className="text-sm text-[#8899b4]">5 role-specific AI agents · {health.totalInteractionsToday.toLocaleString()} interactions today · {health.avgSatisfaction}% satisfaction</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center">
              <div className="text-2xl font-black text-[#4ade80]">{health.onlineAgents}/{health.totalAgents}</div>
              <div className="text-[10px] text-[#8899b4] font-bold">agents online</div>
            </div>
            <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80] text-[10px] font-black">
              <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
              {health.overallStatus.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Global Workforce Stats */}
        <div className="relative mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
          {[
            { label: "Total Interactions Today", value: health.totalInteractionsToday.toLocaleString() },
            { label: "Tokens Consumed Today", value: health.totalTokensToday },
            { label: "Avg Satisfaction Score", value: `${health.avgSatisfaction}%` },
          ].map((s) => (
            <div key={s.label} className="p-3 rounded-xl bg-[#061428] border border-[#1a2f4a] text-center">
              <div className="text-base font-black text-white">{s.value}</div>
              <div className="text-[10px] text-[#6b7a94]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {agents.map((agent) => {
          const cfg = roleConfig[agent.role];
          const route = AIWorkforceService.getAgentRouteByRole(agent.role);
          return (
            <div key={agent.id} className={`rounded-2xl bg-[#040f20] border ${cfg.border} overflow-hidden hover:border-opacity-60 transition-all group`}>
              {/* Card Header */}
              <div className={`p-5 ${cfg.bg}`}>
                <div className="flex items-start justify-between mb-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${cfg.gradient} flex items-center justify-center shadow-lg`}>
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" />
                    <span className="text-[10px] font-black text-[#4ade80]">
                      {agent.status.toUpperCase()}
                    </span>
                  </div>
                </div>
                <h3 className="text-sm font-black text-white mb-0.5">{agent.name}</h3>
                <p className="text-[11px] text-[#8899b4] leading-relaxed">{agent.description}</p>
              </div>

              {/* Capabilities */}
              <div className="px-5 pt-3 pb-2">
                <p className="text-[10px] font-black text-[#6b7a94] uppercase tracking-widest mb-2">Capabilities</p>
                <div className="flex flex-wrap gap-1.5">
                  {agent.capabilities.map((cap) => (
                    <span key={cap} className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border ${cfg.bg} ${cfg.border} ${cfg.color}`}>
                      {cap}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats Row */}
              <div className="px-5 py-3 border-t border-[#1a2f4a] grid grid-cols-3 gap-2 text-center">
                <div>
                  <div className="text-sm font-black text-white">{agent.totalInteractionsToday.toLocaleString()}</div>
                  <div className="text-[9px] text-[#6b7a94]">interactions</div>
                </div>
                <div>
                  <div className="text-sm font-black text-white">{agent.avgResponseMs}ms</div>
                  <div className="text-[9px] text-[#6b7a94]">avg response</div>
                </div>
                <div>
                  <div className="text-sm font-black text-[#4ade80]">{agent.satisfactionScore}%</div>
                  <div className="text-[9px] text-[#6b7a94]">satisfaction</div>
                </div>
              </div>

              {/* Data Access + CTA */}
              <div className="px-5 pb-5 space-y-3">
                <div>
                  <p className="text-[10px] font-black text-[#6b7a94] uppercase tracking-widest mb-1.5">Data Access</p>
                  <div className="flex flex-wrap gap-1">
                    {agent.dataAccess.map((d) => (
                      <span key={d} className="px-1.5 py-0.5 rounded bg-[#061428] border border-[#1a2f4a] text-[10px] text-[#6b7a94]">{d}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-[#6b7a94]">Model: <span className="font-bold text-[#8899b4]">{agent.modelProvider}</span> · {agent.version}</span>
                  <Link
                    href={route}
                    className={`flex items-center gap-1.5 text-xs font-bold ${cfg.color} hover:underline`}
                  >
                    Open Agent <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* v4.2 Release Note */}
      <div className="rounded-2xl bg-gradient-to-r from-[#a78bfa]/10 to-[#4ade80]/10 border border-[#a78bfa]/20 p-5">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-4 h-4 text-[#a78bfa]" />
          <h3 className="text-sm font-black text-white">InstitutionOS v4.2 — AI Digital Workforce Activated</h3>
          <span className="px-2 py-0.5 rounded-full bg-[#a78bfa]/20 text-[#a78bfa] text-[10px] font-black border border-[#a78bfa]/30">NEW</span>
        </div>
        <p className="text-xs text-[#8899b4] leading-relaxed max-w-3xl">
          5 role-specific AI agents — Aida (Student), Sage (Faculty), Pulse (Admin), Apex (Executive), and Atlas (Platform) — are now fully operational across all workspaces. Each agent is contextually aware of its user's role, has access to relevant institutional data, and operates on top of the existing AI Orchestrator, Knowledge Retrieval Engine, and Conversation Memory infrastructure.
        </p>
      </div>
    </div>
  );
}
