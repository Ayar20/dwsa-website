"use client";

import React, { useState } from "react";
import { ExecutiveAIAgentService } from "@/lib/institutionOS/ExecutiveAIAgentService";
import {
  Sparkles, TrendingUp, TrendingDown, Minus, ChevronRight,
  Target, Zap, AlertCircle, Lightbulb, Calendar, BarChart2, Star
} from "lucide-react";

const trendIcon = { up: TrendingUp, down: TrendingDown, flat: Minus };
const trendColor = { up: "text-[#4ade80]", down: "text-red-400", flat: "text-[#8899b4]" };
const categoryColor: Record<string, string> = {
  revenue: "text-[#4ade80] bg-[#4ade80]/10 border-[#4ade80]/20",
  academic: "text-[#818cf8] bg-[#818cf8]/10 border-[#818cf8]/20",
  operational: "text-[#38bdf8] bg-[#38bdf8]/10 border-[#38bdf8]/20",
  strategic: "text-[#d4a017] bg-[#d4a017]/10 border-[#d4a017]/20",
};
const horizonColor: Record<string, string> = {
  immediate: "text-red-400 bg-red-500/10 border-red-500/30",
  "90-day": "text-[#d4a017] bg-[#d4a017]/10 border-[#d4a017]/30",
  annual: "text-[#818cf8] bg-[#818cf8]/10 border-[#818cf8]/30",
};

export default function ExecutiveAIAgentPage() {
  const [expandedRec, setExpandedRec] = useState<string | null>("rec-001");
  const kpis = ExecutiveAIAgentService.getExecutiveKPIs("tenant-dta-001");
  const recommendations = ExecutiveAIAgentService.getStrategicRecommendations("tenant-dta-001");
  const briefing = ExecutiveAIAgentService.getDailyBriefing("tenant-dta-001");

  return (
    <div className="min-h-screen space-y-6 pb-8">

      {/* Hero — Daily Briefing */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#030e1f] via-[#061428] to-[#0a1f40] border border-[#d4a017]/20 p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-[#d4a017]/5 via-transparent to-[#a78bfa]/5" />
        <div className="relative space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#a78bfa] via-[#8b5cf6] to-[#7c3aed] flex items-center justify-center shadow-lg shadow-[#8b5cf6]/20">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h1 className="text-xl font-black text-white tracking-tight">Apex — Executive Intelligence Agent</h1>
                  <span className="px-2 py-0.5 rounded-full bg-[#4ade80]/20 text-[#4ade80] text-[10px] font-black tracking-widest border border-[#4ade80]/30">ONLINE</span>
                </div>
                <p className="text-sm text-[#8899b4]">Strategic intelligence · Market signals · C-suite briefings</p>
              </div>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#a78bfa]/10 border border-[#a78bfa]/30 text-[#a78bfa] text-[10px] font-black">
              <Calendar className="w-3.5 h-3.5" />
              {briefing.date}
            </div>
          </div>

          {/* Today's Headline */}
          <div className="p-4 rounded-xl bg-[#061428] border border-[#d4a017]/20">
            <p className="text-[10px] font-black text-[#d4a017] uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Star className="w-3 h-3" /> Today's Executive Headline
            </p>
            <p className="text-sm font-bold text-white leading-relaxed">{briefing.headline}</p>
          </div>

          {/* Highlights + Risks */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Key Highlights */}
            <div className="sm:col-span-2 space-y-1">
              <p className="text-[10px] font-black text-[#4ade80] uppercase tracking-widest mb-2">Key Highlights</p>
              {briefing.keyHighlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[#4ade80] text-xs mt-0.5">✓</span>
                  <p className="text-xs text-[#c8d8f0]">{h}</p>
                </div>
              ))}
            </div>
            {/* Risk Flags */}
            <div className="space-y-1">
              <p className="text-[10px] font-black text-[#d4a017] uppercase tracking-widest mb-2">Risk Flags</p>
              {briefing.riskFlags.map((r, i) => (
                <div key={i} className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-bold ${
                  r.severity === "red" ? "bg-red-500/10 text-red-400" :
                  r.severity === "amber" ? "bg-[#d4a017]/10 text-[#d4a017]" :
                  "bg-[#4ade80]/10 text-[#4ade80]"
                }`}>
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    r.severity === "red" ? "bg-red-400" :
                    r.severity === "amber" ? "bg-[#d4a017]" : "bg-[#4ade80]"
                  }`} />
                  <span className="text-[11px]">{r.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* KPI Dashboard */}
      <div>
        <h2 className="text-sm font-black text-white mb-3 flex items-center gap-2">
          <BarChart2 className="w-4 h-4 text-[#a78bfa]" /> Executive KPI Dashboard
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {kpis.map((kpi) => {
            const TrendIcon = trendIcon[kpi.trend];
            return (
              <div key={kpi.id} className="rounded-2xl bg-[#040f20] border border-[#1a2f4a] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded border text-[10px] font-bold ${categoryColor[kpi.category]}`}>
                    {kpi.category}
                  </span>
                  <TrendIcon className={`w-4 h-4 ${trendColor[kpi.trend]}`} />
                </div>
                <div>
                  <div className="text-2xl font-black text-white tracking-tight">{kpi.value}</div>
                  <div className="text-xs font-bold text-[#8899b4] mt-0.5">{kpi.label}</div>
                  <div className={`text-[11px] font-bold mt-1 ${trendColor[kpi.trend]}`}>{kpi.change}</div>
                </div>
                <div className="p-2.5 rounded-xl bg-[#061428] border border-[#1a2f4a]">
                  <p className="text-[10px] font-black text-[#a78bfa] flex items-center gap-1 mb-0.5">
                    <Sparkles className="w-2.5 h-2.5" /> Apex's Insight
                  </p>
                  <p className="text-[11px] text-[#8899b4] leading-relaxed">{kpi.aiInsight}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Strategic Recommendations */}
      <div>
        <h2 className="text-sm font-black text-white mb-3 flex items-center gap-2">
          <Target className="w-4 h-4 text-[#d4a017]" /> Strategic Recommendations
        </h2>
        <div className="space-y-3">
          {recommendations.map((rec) => (
            <div key={rec.id} className="rounded-2xl bg-[#040f20] border border-[#1a2f4a] overflow-hidden">
              <button
                onClick={() => setExpandedRec(expandedRec === rec.id ? null : rec.id)}
                className="w-full px-5 py-4 flex items-center justify-between gap-4 hover:bg-[#061428] transition-all"
              >
                <div className="flex items-center gap-3 text-left">
                  <div className="w-8 h-8 rounded-xl bg-[#a78bfa]/10 border border-[#a78bfa]/20 flex items-center justify-center shrink-0">
                    <Lightbulb className="w-4 h-4 text-[#a78bfa]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                      <h3 className="text-xs font-black text-white">{rec.title}</h3>
                      <span className={`px-2 py-0.5 rounded border text-[9px] font-bold ${horizonColor[rec.timeHorizon]}`}>
                        {rec.timeHorizon}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#d4a017] font-bold">{rec.expectedImpact}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="text-xs font-black text-white">{rec.confidence}%</div>
                    <div className="text-[10px] text-[#6b7a94]">confidence</div>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-[#6b7a94] transition-transform ${expandedRec === rec.id ? "rotate-90" : ""}`} />
                </div>
              </button>
              {expandedRec === rec.id && (
                <div className="px-5 pb-5 space-y-3 border-t border-[#1a2f4a] pt-4">
                  <p className="text-xs text-[#8899b4] leading-relaxed">{rec.rationale}</p>
                  <div>
                    <p className="text-[10px] font-black text-[#6b7a94] uppercase tracking-widest mb-1.5">Data Sources</p>
                    <div className="flex flex-wrap gap-1.5">
                      {rec.dataPoints.map((dp, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-lg bg-[#061428] border border-[#1a2f4a] text-[11px] text-[#8899b4]">
                          {dp}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button className="px-3 py-2 rounded-xl bg-[#a78bfa]/20 text-[#a78bfa] text-xs font-bold hover:bg-[#a78bfa]/30 transition-all border border-[#a78bfa]/30">
                      Build Business Case
                    </button>
                    <button className="px-3 py-2 rounded-xl bg-[#061428] text-[#8899b4] text-xs font-bold hover:bg-[#0c1b33] transition-all border border-[#1a2f4a]">
                      Add to Strategy Board
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Opportunities */}
      <div className="rounded-2xl bg-gradient-to-r from-[#d4a017]/10 to-[#a78bfa]/10 border border-[#d4a017]/20 p-5">
        <h3 className="text-xs font-black text-[#d4a017] uppercase tracking-widest mb-3 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5" /> Apex-Identified Opportunities
        </h3>
        <div className="space-y-2">
          {briefing.opportunities.map((opp, i) => (
            <div key={i} className="flex items-start gap-2.5">
              <span className="text-[#d4a017] text-sm shrink-0 mt-0.5">◆</span>
              <p className="text-xs text-[#c8d8f0]">{opp}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
