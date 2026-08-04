"use client";

import React, { useState } from "react";
import { Zap, CheckCircle2, Clock, AlertTriangle, RefreshCw, Play, Pause } from "lucide-react";
import { WorkflowEngine } from "@/lib/institutionOS/WorkflowEngine";
import { AutomationAnalyticsService } from "@/lib/institutionOS/AutomationAnalyticsService";

const statusColor: Record<string, string> = {
  Running: "bg-[#4ade80]/10 border-[#4ade80]/30 text-[#4ade80]",
  Completed: "bg-[#d4a017]/10 border-[#d4a017]/30 text-[#d4a017]",
  Rejected: "bg-red-500/10 border-red-500/30 text-red-400",
  "On Hold": "bg-[#818cf8]/10 border-[#818cf8]/30 text-[#818cf8]",
};

export default function AutomationCentrePage() {
  const workflows = WorkflowEngine.getAllWorkflows();
  const metrics = AutomationAnalyticsService.getOperationalMetrics();
  const tasks = AutomationAnalyticsService.getScheduledTasks();

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded bg-[#818cf8]/15 text-[#818cf8] text-[9px] font-black uppercase border border-[#818cf8]/30">AUTOMATION ENGINE</span>
          <span className="text-[10px] text-[#8899b4]">InstitutionOS v3.7</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white">Automation & Workflow Centre</h2>
        <p className="text-xs text-[#8899b4]">Monitor active workflows, scheduled tasks, automation logs &amp; operational efficiency metrics</p>
      </div>

      {/* Operational Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className={`rounded-2xl bg-[#061428] border p-4 space-y-1 ${m.status === "Warning" ? "border-[#d4a017]/40" : "border-[#1a2f4a]"}`}>
            <p className="text-[9px] font-black text-[#8899b4] uppercase">{m.label}</p>
            <p className={`text-xl font-extrabold ${m.status === "Healthy" ? "text-[#4ade80]" : m.status === "Warning" ? "text-[#d4a017]" : "text-red-400"}`}>{m.value}</p>
            <p className="text-[9px] text-[#8899b4]">{m.detail}</p>
          </div>
        ))}
      </div>

      {/* Active Workflows */}
      <div className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
          <Zap className="w-4 h-4 text-[#d4a017]" /> Institutional Workflow Registry
        </h3>
        <div className="space-y-3">
          {workflows.map((wf) => (
            <div key={wf.id} className="rounded-2xl bg-[#030e1f] border border-[#1a2f4a] p-4 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-extrabold text-white">{wf.title}</p>
                  <p className="text-[10px] text-[#8899b4]">Initiated by: {wf.initiatedBy} · {wf.createdAt}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-black uppercase ${statusColor[wf.status] ?? ""}`}>{wf.status}</span>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black ${wf.priority === "High" ? "bg-red-500/10 text-red-400" : "bg-[#1a2f4a] text-[#8899b4]"}`}>{wf.priority}</span>
                </div>
              </div>

              {/* Stage Progress Bar */}
              <div className="flex items-center gap-1">
                {wf.stages.map((s, i) => (
                  <div key={i} className="flex items-center gap-1 flex-1">
                    <div className={`h-1.5 flex-1 rounded-full ${s.status === "Approved" ? "bg-[#4ade80]" : s.status === "Pending" ? "bg-[#1a2f4a]" : "bg-red-500"}`} />
                    {i < wf.stages.length - 1 && <div className="w-1 h-1 rounded-full bg-[#1a2f4a] shrink-0" />}
                  </div>
                ))}
              </div>
              <p className="text-[9px] text-[#8899b4]">Stage {wf.currentStage}/{wf.totalStages} · {wf.stages[wf.currentStage - 1]?.title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Scheduled Tasks */}
      <div className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#4ade80]" /> Scheduled Automation Tasks
        </h3>
        <div className="rounded-2xl border border-[#1a2f4a] overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#030e1f] text-[#8899b4] text-[10px] uppercase font-black tracking-wider border-b border-[#1a2f4a]">
              <tr>
                <th className="p-3.5">Task</th>
                <th className="p-3.5">Schedule</th>
                <th className="p-3.5">Last Run</th>
                <th className="p-3.5">Next Run</th>
                <th className="p-3.5">Runs</th>
                <th className="p-3.5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a2f4a] text-white">
              {tasks.map((t) => (
                <tr key={t.id} className="hover:bg-[#0f223d]/40 transition-colors">
                  <td className="p-3.5 font-bold">{t.name}</td>
                  <td className="p-3.5 text-[#8899b4] text-[10px]">{t.schedule}</td>
                  <td className="p-3.5 text-[10px] text-[#8899b4]">{t.lastRun}</td>
                  <td className="p-3.5 text-[10px] text-[#d4a017] font-bold">{t.nextRun}</td>
                  <td className="p-3.5 text-[#4ade80] font-extrabold">{t.runCount}</td>
                  <td className="p-3.5 text-right">
                    <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-black uppercase ${t.status === "Active" ? "bg-[#4ade80]/10 border-[#4ade80]/30 text-[#4ade80]" : t.status === "Paused" ? "bg-[#d4a017]/10 border-[#d4a017]/30 text-[#d4a017]" : "bg-red-500/10 border-red-500/30 text-red-400"}`}>{t.status}</span>
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
