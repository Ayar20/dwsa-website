"use client";

import React, { useState } from "react";
import {
  BarChart3, TrendingUp, PieChart, Users, DollarSign, Award,
  CheckCircle2, Download, Filter, RefreshCw
} from "lucide-react";
import { AnalyticsPersistenceService } from "@/lib/institutionOS/AnalyticsPersistenceService";

export default function PersistentExecutiveAnalyticsPage() {
  const snapshots = AnalyticsPersistenceService.getSnapshots();
  const [toast, setToast] = useState<string | null>(null);

  const handleCaptureSnapshot = () => {
    AnalyticsPersistenceService.recordSnapshot("OverallInstitutionHealth", 95);
    setToast("New Institutional Analytics Snapshot Recorded Successfully!");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#061428] border border-[#4ade80]/50 text-[#4ade80] text-xs font-extrabold shadow-2xl flex items-center gap-2 animate-fadeInUp">
          <CheckCircle2 className="w-4 h-4" />
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#d4a017]/15 text-[#d4a017] text-[9px] font-black uppercase">ANALYTICS PERSISTENCE</span>
            <span className="text-[10px] text-[#8899b4]">InstitutionOS v3.5</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">Executive Analytics &amp; Snapshot Intelligence</h2>
          <p className="text-xs text-[#8899b4]">Persistent institutional performance metrics, monthly/quarterly trends &amp; graduate success data</p>
        </div>
        <button
          onClick={handleCaptureSnapshot}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#d4a017] text-[#030e1f] text-xs font-extrabold hover:bg-[#b8891a] transition-all shrink-0"
        >
          <RefreshCw className="w-4 h-4" /> Capture New Analytics Snapshot
        </button>
      </div>

      {/* Metric Snapshots Table */}
      <div className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
          <BarChart3 className="w-4 h-4 text-[#d4a017]" />
          Persistent Institutional Metric Snapshots
        </h3>

        <div className="rounded-2xl border border-[#1a2f4a] overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#030e1f] text-[#8899b4] text-[10px] uppercase font-black tracking-wider border-b border-[#1a2f4a]">
              <tr>
                <th className="p-4">Snapshot ID</th>
                <th className="p-4">Metric Indicator</th>
                <th className="p-4">Recorded Value</th>
                <th className="p-4 text-right">Captured Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a2f4a] text-white">
              {snapshots.map((s) => (
                <tr key={s.id} className="hover:bg-[#0f223d]/40 transition-colors">
                  <td className="p-4 font-mono text-[10px] text-[#d4a017] font-bold">{s.id}</td>
                  <td className="p-4 font-bold">{s.metric}</td>
                  <td className="p-4 font-black text-[#4ade80]">{s.value}%</td>
                  <td className="p-4 text-right text-[#8899b4] font-mono text-[10px]">{s.capturedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
