"use client";

import React, { useState } from "react";
import { AdminAIAgentService } from "@/lib/institutionOS/AdminAIAgentService";
import {
  Sparkles, AlertTriangle, CheckCircle2, BarChart2, Clock,
  ChevronRight, Zap, Shield, DollarSign, GraduationCap, Users,
  FileText, Cpu, TrendingUp
} from "lucide-react";

const severityConfig = {
  critical: { color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30", badge: "bg-red-500/20 text-red-400" },
  warning: { color: "text-[#d4a017]", bg: "bg-[#d4a017]/10", border: "border-[#d4a017]/30", badge: "bg-[#d4a017]/20 text-[#d4a017]" },
  info: { color: "text-[#818cf8]", bg: "bg-[#818cf8]/10", border: "border-[#818cf8]/30", badge: "bg-[#818cf8]/20 text-[#818cf8]" },
};

const categoryIcons: Record<string, React.ReactNode> = {
  compliance: <Shield className="w-4 h-4" />,
  finance: <DollarSign className="w-4 h-4" />,
  academic: <GraduationCap className="w-4 h-4" />,
  operations: <Cpu className="w-4 h-4" />,
  staff: <Users className="w-4 h-4" />,
};

const priorityColors = {
  urgent: "text-red-400 bg-red-500/10 border-red-500/30",
  high: "text-[#d4a017] bg-[#d4a017]/10 border-[#d4a017]/30",
  normal: "text-[#4ade80] bg-[#4ade80]/10 border-[#4ade80]/30",
};

export default function AdminAIAgentPage() {
  const alerts = AdminAIAgentService.getOperationalAlerts("tenant-dta-001");
  const tasks = AdminAIAgentService.getAIPrioritisedTasks("admin-001");
  const health = AdminAIAgentService.getInstitutionHealthSnapshot("tenant-dta-001");

  const healthDimensions = [
    { label: "Enrolment", value: health.enrollmentHealth, color: "#4ade80" },
    { label: "Academic", value: health.academicHealth, color: "#818cf8" },
    { label: "Financial", value: health.financialHealth, color: "#d4a017" },
    { label: "Compliance", value: health.complianceHealth, color: "#38bdf8" },
    { label: "Staff", value: health.staffHealth, color: "#4ade80" },
  ];

  return (
    <div className="min-h-screen space-y-6 pb-8">

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#030e1f] via-[#061428] to-[#0a1f40] border border-[#38bdf8]/20 p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-[#38bdf8]/5 via-transparent to-[#818cf8]/5" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#38bdf8] via-[#0ea5e9] to-[#0284c7] flex items-center justify-center shadow-lg shadow-[#38bdf8]/20">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-xl font-black text-white tracking-tight">Pulse — AI Operations Agent</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#4ade80]/20 text-[#4ade80] text-[10px] font-black tracking-widest border border-[#4ade80]/30">ONLINE</span>
              </div>
              <p className="text-sm text-[#8899b4]">Monitors operations, compliance &amp; finance · Prioritises your day · Generates reports on demand</p>
            </div>
          </div>
          {/* Institution Health Score */}
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-3xl font-black text-white">{health.overallScore}</div>
              <div className="text-[10px] text-[#8899b4] font-bold">/100 health score</div>
            </div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold ${
              health.trend === "improving" ? "bg-[#4ade80]/10 border-[#4ade80]/30 text-[#4ade80]" : "bg-[#d4a017]/10 border-[#d4a017]/30 text-[#d4a017]"
            }`}>
              <TrendingUp className="w-3.5 h-3.5" />
              {health.trend}
            </div>
          </div>
        </div>
      </div>

      {/* Institution Health Dimensions */}
      <div className="rounded-2xl bg-[#040f20] border border-[#1a2f4a] p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-black text-white">Institution Health Snapshot</h2>
          <span className="text-[10px] text-[#6b7a94]">AI-generated · Updated now</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {healthDimensions.map((dim) => (
            <div key={dim.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-[#8899b4]">{dim.label}</span>
                <span className="text-xs font-black text-white">{dim.value}%</span>
              </div>
              <div className="h-2 rounded-full bg-[#0c1b33] overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${dim.value}%`, backgroundColor: dim.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Operational Alerts */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              Operational Alerts
            </h2>
            <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-black border border-red-500/30">
              {alerts.filter(a => !a.resolved).length} open
            </span>
          </div>

          {alerts.map((alert) => {
            const cfg = severityConfig[alert.severity];
            return (
              <div key={alert.id} className={`rounded-2xl bg-[#040f20] border ${cfg.border} overflow-hidden`}>
                <div className={`px-4 py-3 ${cfg.bg} flex items-center justify-between`}>
                  <div className="flex items-center gap-2.5">
                    <div className={`${cfg.color}`}>{categoryIcons[alert.category]}</div>
                    <div>
                      <span className={`text-[9px] font-black uppercase tracking-widest ${cfg.color}`}>{alert.category}</span>
                      <h3 className="text-xs font-black text-white">{alert.title}</h3>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${cfg.badge}`}>{alert.severity}</span>
                </div>
                <div className="px-4 pb-4 pt-3 space-y-2">
                  <p className="text-xs text-[#8899b4] leading-relaxed">{alert.detail}</p>
                  {alert.resolution && (
                    <div className="p-2.5 rounded-xl bg-[#061428] border border-[#1a2f4a]">
                      <p className="text-[10px] font-bold text-[#818cf8] mb-0.5 flex items-center gap-1"><Zap className="w-3 h-3" /> Pulse's Resolution</p>
                      <p className="text-[11px] text-[#c8d8f0]">{alert.resolution}</p>
                    </div>
                  )}
                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] text-[#4a5568] flex items-center gap-1"><Clock className="w-3 h-3" />{alert.timestamp}</span>
                    <button className="text-[11px] font-bold text-[#4ade80] hover:underline flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Mark Resolved
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* AI-Prioritised Task Queue */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#38bdf8]" />
              AI-Prioritised Tasks
            </h2>
            <span className="text-[10px] text-[#6b7a94]">Ranked by impact · AI curated</span>
          </div>

          {tasks.map((task, index) => (
            <div key={task.id} className="rounded-2xl bg-[#040f20] border border-[#1a2f4a] p-4 space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-7 h-7 rounded-xl bg-[#0c1b33] border border-[#1a2f4a] flex items-center justify-center shrink-0">
                  <span className="text-xs font-black text-[#6b7a94]">{index + 1}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-xs font-black text-white">{task.title}</h3>
                    {task.aiGenerated && (
                      <span className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-[#818cf8]/10 text-[#818cf8] text-[9px] font-bold border border-[#818cf8]/20">
                        <Sparkles className="w-2.5 h-2.5" /> AI
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-[#8899b4] leading-relaxed">{task.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-0.5 rounded-lg border text-[10px] font-bold ${priorityColors[task.priority]}`}>
                    {task.priority}
                  </span>
                  <span className="text-[10px] text-[#6b7a94] flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Due: {task.dueDate}
                  </span>
                </div>
                <button className="text-[11px] font-bold text-[#38bdf8] hover:underline flex items-center gap-1">
                  Start <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}

          {/* Generate Report CTA */}
          <div className="rounded-2xl bg-gradient-to-r from-[#38bdf8]/10 to-[#818cf8]/10 border border-[#38bdf8]/20 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-[#38bdf8]" />
              <div>
                <p className="text-xs font-black text-white">Generate Q1 Institutional Report</p>
                <p className="text-[11px] text-[#8899b4]">Pulse will compile all KPIs, outcomes &amp; financials automatically</p>
              </div>
            </div>
            <button className="px-3 py-2 rounded-xl bg-[#38bdf8]/20 text-[#38bdf8] text-xs font-bold hover:bg-[#38bdf8]/30 transition-all border border-[#38bdf8]/30 shrink-0">
              Generate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
