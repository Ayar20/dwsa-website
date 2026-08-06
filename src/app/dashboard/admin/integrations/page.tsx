"use client";

import React from "react";
import { IntegrationHealthService } from "@/lib/institutionOS/IntegrationHealthService";
import { PlatformConnectivityService } from "@/lib/institutionOS/PlatformConnectivityService";
import {
  Activity, ShieldCheck, Zap, AlertCircle, ArrowUpRight, CheckCircle2,
  Lock, RefreshCw, Sparkles, Server, Clock, ChevronRight
} from "lucide-react";

export default function ExecutiveIntegrationIntelligencePage() {
  const connectivityScore = IntegrationHealthService.getOverallHealthScore();
  const services = PlatformConnectivityService.getGlobalServiceStatuses();

  return (
    <div className="min-h-screen space-y-6 pb-8">

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#030e1f] via-[#061428] to-[#0a1f40] border border-[#d4a017]/30 p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-[#d4a017]/5 via-transparent to-[#4ade80]/5" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4a017] via-[#b8860b] to-[#996515] flex items-center justify-center shadow-lg shadow-[#d4a017]/20 text-[#030e1f]">
              <Zap className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-xl font-black text-white tracking-tight">Executive Integration Intelligence</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#4ade80]/20 text-[#4ade80] text-[10px] font-black tracking-widest border border-[#4ade80]/30">v4.3A EIP OPERATIONAL</span>
              </div>
              <p className="text-sm text-[#8899b4]">Executive connectivity score, mission-critical services health, compliance & security alerts</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-center">
            <div>
              <div className="text-3xl font-black text-[#4ade80]">{connectivityScore}%</div>
              <div className="text-[10px] text-[#8899b4] font-bold">Platform Connectivity Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Executive Overview Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Mission-Critical Systems", value: "6 / 6 Connected", color: "text-[#4ade80]" },
          { label: "Avg Sync Latency", value: "42.5ms", color: "text-[#38bdf8]" },
          { label: "Security & Certificate Alerts", value: "1 Expiring Soon", color: "text-[#d4a017]" },
          { label: "Compliance Verification", value: "98.6% Compliant", color: "text-[#4ade80]" },
        ].map((s) => (
          <div key={s.label} className="p-4 rounded-2xl bg-[#040f20] border border-[#1a2f4a] text-center">
            <div className={`text-base font-black ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-[#6b7a94] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Mission-Critical Service Health Table */}
      <div className="rounded-2xl bg-[#040f20] border border-[#1a2f4a] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-black text-white flex items-center gap-2">
            <Server className="w-4 h-4 text-[#d4a017]" /> Mission-Critical System Status & SLAs
          </h2>
          <span className="text-[10px] text-[#6b7a94] font-bold">Live SLA Monitoring</span>
        </div>

        <div className="space-y-3">
          {services.map((svc) => (
            <div key={svc.serviceName} className="p-4 rounded-xl bg-[#061428] border border-[#1a2f4a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-black text-white">{svc.serviceName}</h3>
                  <span className="px-1.5 py-0.5 rounded bg-[#0a1f40] text-[9px] text-[#38bdf8] border border-[#38bdf8]/30 font-bold">{svc.category}</span>
                </div>
                <p className="text-[10px] text-[#6b7a94] font-mono">{svc.endpoint} · Checked {svc.lastCheckedAt}</p>
              </div>

              <div className="flex items-center gap-4 text-right">
                <div>
                  <div className="text-xs font-black text-[#4ade80]">{svc.uptime30d}%</div>
                  <div className="text-[9px] text-[#6b7a94]">30-day uptime SLA</div>
                </div>
                <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black ${
                  svc.status === "ONLINE" ? "bg-[#4ade80]/20 text-[#4ade80]" : "bg-[#d4a017]/20 text-[#d4a017]"
                }`}>
                  {svc.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Executive Recommendation */}
      <div className="rounded-2xl bg-gradient-to-r from-[#d4a017]/10 to-[#4ade80]/10 border border-[#d4a017]/30 p-5 space-y-2">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#d4a017]" />
          <h3 className="text-xs font-black text-[#d4a017] uppercase tracking-wider">Apex AI Executive Integration Recommendation</h3>
        </div>
        <p className="text-xs text-[#c8d8f0] leading-relaxed">
          "Moodle REST token expires in 6 days. Rotating this token now will prevent an estimated 12-minute outage during tomorrow's scheduled gradebook synchronization window. All other 5 mission-critical integrations (NIMC, Paystack, M365, Google, Zoom) are operating at 100% SLA."
        </p>
      </div>
    </div>
  );
}
