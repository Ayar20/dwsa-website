"use client";

import React from "react";
import { AIGovernanceMarketplaceService } from "@/lib/institutionOS/AIGovernanceMarketplaceService";
import {
  Sparkles, ShieldCheck, Cpu, Zap, CheckCircle2, ArrowUpRight, Layers
} from "lucide-react";

export default function AIAgentMarketplacePage() {
  const agents = AIGovernanceMarketplaceService.getAIAgents();

  return (
    <div className="min-h-screen space-y-6 pb-8">

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#030e1f] via-[#061428] to-[#0a1f40] border border-[#a78bfa]/25 p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-[#a78bfa]/5 via-transparent to-[#4ade80]/5" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#a78bfa] via-[#8b5cf6] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-[#8b5cf6]/20 text-white">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-xl font-black text-white tracking-tight">AI Agent Exchange</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#a78bfa]/20 text-[#a78bfa] text-[10px] font-black tracking-widest border border-[#a78bfa]/30">v4.4 AGENT EXCHANGE</span>
              </div>
              <p className="text-sm text-[#8899b4]">Deploy specialized institution-ready AI agents for Admissions, Finance, Grants & Faculty</p>
            </div>
          </div>
        </div>
      </div>

      {/* AI Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {agents.map((agent) => (
          <div key={agent.id} className="p-5 rounded-2xl bg-[#040f20] border border-[#1a2f4a] space-y-4 hover:border-[#a78bfa]/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <span className="px-2 py-0.5 rounded bg-[#a78bfa]/10 text-[#a78bfa] text-[9px] font-black uppercase border border-[#a78bfa]/30">
                  {agent.category}
                </span>
                <span className="text-[10px] text-[#4ade80] font-black">{agent.installStatus}</span>
              </div>

              <div>
                <h3 className="text-sm font-black text-white">{agent.name}</h3>
                <p className="text-[10px] text-[#6b7a94]">Provider: <span className="text-[#8899b4] font-bold">{agent.provider}</span></p>
              </div>

              <div className="space-y-1.5 pt-1">
                <p className="text-[10px] font-black text-[#6b7a94] uppercase">Capabilities:</p>
                <div className="flex flex-wrap gap-1">
                  {agent.capabilities.map((cap) => (
                    <span key={cap} className="px-2 py-0.5 rounded bg-[#061428] border border-[#1a2f4a] text-[10px] text-[#c8d8f0] font-bold">{cap}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#1a2f4a] space-y-2">
              <div className="flex items-center justify-between text-[10px] text-[#6b7a94]">
                <span>Est Tokens: <strong className="text-white">{agent.estimatedTokensPerQuery} / query</strong></span>
                <span>Safety: <strong className="text-[#38bdf8] font-bold">{agent.safetyClassification}</strong></span>
              </div>
              <button className="w-full py-2 rounded-xl bg-[#a78bfa]/20 text-[#a78bfa] border border-[#a78bfa]/30 hover:bg-[#a78bfa] hover:text-[#030e1f] text-xs font-black transition-all">
                Configure AI Agent
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
