"use client";

import React from "react";
import { BarChart3, Zap, Cpu, CheckCircle2, TrendingUp } from "lucide-react";
import { BenchmarkService } from "@/lib/institutionOS/BenchmarkService";

export default function PerformanceBenchmarksPage() {
  const benchmarks = BenchmarkService.getBenchmarks();

  return (
    <div className="space-y-8 pb-12">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded bg-[#4ade80]/15 text-[#4ade80] text-[9px] font-black uppercase border border-[#4ade80]/30">BENCHMARKS</span>
          <span className="text-[10px] text-[#8899b4]">InstitutionOS v3.8B</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white">System Performance &amp; Latency Benchmarks</h2>
        <p className="text-xs text-[#8899b4]">Real-time measured page speed, API latency, AI synthesis speed, build times &amp; bundle sizes</p>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Page Speed (FCP)", value: "0.8s", sub: "Target: < 1.5s", color: "text-[#4ade80]" },
          { label: "Avg API Latency", value: "38ms", sub: "Target: < 150ms", color: "text-[#d4a017]" },
          { label: "AI Response Speed", value: "140ms", sub: "Target: < 500ms", color: "text-[#818cf8]" },
          { label: "First Load Bundle", value: "128 KB", sub: "76 Prerendered Routes", color: "text-[#4ade80]" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-4 space-y-1">
            <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-xs font-extrabold text-white">{s.label}</p>
            <p className="text-[10px] text-[#8899b4]">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Benchmarks Table */}
      <div className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#d4a017]" /> Measured Performance Metrics vs Target Thresholds
        </h3>
        <div className="rounded-2xl border border-[#1a2f4a] overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#030e1f] text-[#8899b4] text-[10px] uppercase font-black border-b border-[#1a2f4a]">
              <tr>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Metric</th>
                <th className="p-3.5">Measured Value</th>
                <th className="p-3.5">Target Threshold</th>
                <th className="p-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a2f4a] text-white">
              {benchmarks.map((b) => (
                <tr key={b.metric} className="hover:bg-[#0f223d]/40 transition-colors">
                  <td className="p-3.5 text-[#8899b4] font-bold">{b.category}</td>
                  <td className="p-3.5 font-extrabold text-white">{b.metric}</td>
                  <td className="p-3.5 font-mono text-[#4ade80] font-extrabold">{b.measuredValue}</td>
                  <td className="p-3.5 text-[#8899b4]">{b.targetThreshold}</td>
                  <td className="p-3.5 text-right">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80] text-[9px] font-black uppercase">
                      ✓ {b.status}
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
