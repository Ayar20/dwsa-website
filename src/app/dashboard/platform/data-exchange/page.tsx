"use client";

import React, { useState } from "react";
import { DataPipelineService } from "@/lib/institutionOS/DataPipelineService";
import {
  Database, Upload, Download, RefreshCw, FileText, CheckCircle2,
  AlertTriangle, ArrowRight, Layers, FileCode
} from "lucide-react";

export default function DataExchangeCentrePage() {
  const [activeStep, setActiveStep] = useState<"pipelines" | "import" | "export">("pipelines");

  const pipelines = DataPipelineService.getPipelines("tenant_dta_001");

  return (
    <div className="min-h-screen space-y-6 pb-8">

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#030e1f] via-[#061428] to-[#0a1f40] border border-[#d4a017]/25 p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-[#d4a017]/5 via-transparent to-[#4ade80]/5" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4ade80] via-[#10b981] to-[#047857] flex items-center justify-center shadow-lg shadow-[#4ade80]/20 text-white">
              <Database className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-xl font-black text-white tracking-tight">Data Exchange & Migration Hub</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#4ade80]/20 text-[#4ade80] text-[10px] font-black tracking-widest border border-[#4ade80]/30">ETL PIPELINES</span>
              </div>
              <p className="text-sm text-[#8899b4]">Bulk institutional data import/export, schema mapping, migration wizard & conflict validation</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-3 py-1.5 rounded-xl bg-[#d4a017] text-[#030e1f] text-xs font-black hover:bg-[#b8860b] flex items-center gap-1.5">
              <Upload className="w-3.5 h-3.5" /> Start New Data Import
            </button>
          </div>
        </div>
      </div>

      {/* Pipeline Cards */}
      <div className="space-y-4">
        <h2 className="text-sm font-black text-white flex items-center gap-2">
          <Layers className="w-4 h-4 text-[#d4a017]" /> Active ETL Pipelines & Migrations ({pipelines.length})
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pipelines.map((p) => (
            <div key={p.id} className="p-5 rounded-2xl bg-[#040f20] border border-[#1a2f4a] space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="px-2 py-0.5 rounded bg-[#061428] border border-[#1a2f4a] text-[10px] text-[#38bdf8] font-bold">
                    {p.sourceType} → {p.targetModule}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[8px] font-black ${p.status === "COMPLETED" ? "bg-[#4ade80]/20 text-[#4ade80]" : "bg-[#d4a017]/20 text-[#d4a017]"}`}>
                    {p.status}
                  </span>
                </div>
                <h3 className="text-xs font-black text-white">{p.name}</h3>
                <p className="text-[10px] text-[#6b7a94]">Mapped fields: {p.totalMappedFields} · Last Run: {p.lastRunDate}</p>
              </div>

              <button className="w-full py-1.5 rounded-xl bg-[#061428] border border-[#1a2f4a] hover:border-[#d4a017] text-xs font-bold text-[#8899b4] hover:text-white transition-all flex items-center justify-center gap-1">
                View Pipeline Schema <ArrowRight className="w-3.5 h-3.5 text-[#d4a017]" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
