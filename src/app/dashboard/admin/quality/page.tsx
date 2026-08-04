"use client";

import React, { useState } from "react";
import { TrendingUp, TrendingDown, Minus, Award, BarChart2, CheckCircle2 } from "lucide-react";
import { QualityService } from "@/lib/institutionOS/QualityService";

export default function QualityAssuranceCentrePage() {
  const metrics = QualityService.getMetrics();
  const overall = QualityService.getOverallScore();

  return (
    <div className="space-y-8 pb-12">
      <div>
        <div className="flex items-center gap-2 mb-1"><span className="px-2.5 py-0.5 rounded bg-[#4ade80]/15 text-[#4ade80] text-[9px] font-black uppercase border border-[#4ade80]/30">QA CENTRE</span><span className="text-[10px] text-[#8899b4]">InstitutionOS v3.7</span></div>
        <h2 className="text-2xl font-extrabold text-white">Quality Assurance Centre</h2>
        <p className="text-xs text-[#8899b4]">Institution-wide quality metrics, continuous improvement tracking &amp; industry alignment scores</p>
      </div>

      {/* Overall QA Score */}
      <div className="rounded-3xl bg-gradient-to-br from-[#061428] to-[#0f223d] border border-[#4ade80]/30 p-6 flex flex-col sm:flex-row sm:items-center gap-6">
        <div className="w-24 h-24 rounded-2xl bg-[#4ade80]/10 border-2 border-[#4ade80]/40 flex items-center justify-center shrink-0">
          <div className="text-center">
            <p className="text-3xl font-extrabold text-[#4ade80]">{overall}</p>
            <p className="text-[9px] font-black text-[#4ade80] opacity-70">/100</p>
          </div>
        </div>
        <div className="space-y-1">
          <p className="text-lg font-extrabold text-white">Institution Quality Index</p>
          <p className="text-xs text-[#8899b4]">Composite score across all 6 quality assurance domains. Above benchmark in all areas.</p>
          <div className="w-full bg-[#1a2f4a] rounded-full h-2 mt-2">
            <div className="h-2 rounded-full bg-[#4ade80] transition-all" style={{ width: `${overall}%` }} />
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((m) => {
          const TrendIcon = m.trend === "Improving" ? TrendingUp : m.trend === "Declining" ? TrendingDown : Minus;
          const trendColor = m.trend === "Improving" ? "text-[#4ade80]" : m.trend === "Declining" ? "text-red-400" : "text-[#8899b4]";
          const aboveBenchmark = m.score >= m.benchmark;
          return (
            <div key={m.id} className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-5 space-y-4 hover:border-[#d4a017]/30 transition-all">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <h3 className="text-xs font-extrabold text-white">{m.area}</h3>
                  <p className="text-[10px] text-[#8899b4]">Last assessed: {m.lastAssessed}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <TrendIcon className={`w-4 h-4 ${trendColor}`} />
                  <span className={`text-[10px] font-bold ${trendColor}`}>{m.trend}</span>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xl font-extrabold text-white">{m.score}<span className="text-sm text-[#8899b4]">/100</span></span>
                  <span className={`text-[10px] font-bold ${aboveBenchmark ? "text-[#4ade80]" : "text-[#d4a017]"}`}>
                    Benchmark: {m.benchmark} {aboveBenchmark ? "✓" : "⚠"}
                  </span>
                </div>
                <div className="w-full bg-[#1a2f4a] rounded-full h-2">
                  <div className={`h-2 rounded-full transition-all ${aboveBenchmark ? "bg-[#4ade80]" : "bg-[#d4a017]"}`} style={{ width: `${m.score}%` }} />
                </div>
              </div>

              <p className="text-[10px] text-[#8899b4] italic leading-relaxed">{m.notes}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
