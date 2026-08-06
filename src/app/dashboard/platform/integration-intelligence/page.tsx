"use client";

import React, { useState } from "react";
import { IntegrationHealthService } from "@/lib/institutionOS/IntegrationHealthService";
import { DependencyGraphService } from "@/lib/institutionOS/DependencyGraphService";
import { SyncMonitoringService } from "@/lib/institutionOS/SyncMonitoringService";
import { RecoveryService } from "@/lib/institutionOS/RecoveryService";
import {
  Activity, ShieldCheck, AlertTriangle, CheckCircle2, Clock, RotateCw,
  GitBranch, ArrowRight, RefreshCw, Zap, Server, ChevronRight
} from "lucide-react";

const healthBadge: Record<string, { color: string; bg: string; border: string }> = {
  excellent: { color: "text-[#4ade80]", bg: "bg-[#4ade80]/10", border: "border-[#4ade80]/30" },
  healthy: { color: "text-[#4ade80]", bg: "bg-[#4ade80]/10", border: "border-[#4ade80]/30" },
  warning: { color: "text-[#d4a017]", bg: "bg-[#d4a017]/10", border: "border-[#d4a017]/30" },
  critical: { color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30" },
  offline: { color: "text-[#6b7a94]", bg: "bg-[#1a2f4a]", border: "border-[#1a2f4a]" },
};

export default function IntegrationIntelligencePage() {
  const [activeTab, setActiveTab] = useState<"health" | "graph" | "timeline" | "recovery">("health");

  const overallHealth = IntegrationHealthService.getOverallHealthScore();
  const connectorHealths = IntegrationHealthService.getConnectorHealthSummaries();
  const workflowNodes = DependencyGraphService.getInstitutionalWorkflowGraph();
  const syncTimeline = SyncMonitoringService.getSyncTimeline();
  const failedSyncs = RecoveryService.getFailedSyncRecords();
  const recoveryStats = RecoveryService.getRecoveryStats();

  return (
    <div className="min-h-screen space-y-6 pb-8">

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#030e1f] via-[#061428] to-[#0a1f40] border border-[#d4a017]/25 p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-[#d4a017]/5 via-transparent to-[#4ade80]/5" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4ade80] via-[#22c55e] to-[#15803d] flex items-center justify-center shadow-lg shadow-[#4ade80]/20 text-[#030e1f]">
              <Activity className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-xl font-black text-white tracking-tight">Integration Intelligence & Recovery</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#4ade80]/20 text-[#4ade80] text-[10px] font-black tracking-widest border border-[#4ade80]/30">v4.3A EIP</span>
              </div>
              <p className="text-sm text-[#8899b4]">Real-time health monitoring, visual dependency graph, sync timeline & automated retry recovery engine</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-center">
            <div>
              <div className="text-2xl font-black text-[#4ade80]">{overallHealth}%</div>
              <div className="text-[10px] text-[#8899b4] font-bold">Overall EIP Health</div>
            </div>
            <div className="w-px h-8 bg-[#1a2f4a]" />
            <div>
              <div className="text-2xl font-black text-white">{connectorHealths.length}</div>
              <div className="text-[10px] text-[#8899b4] font-bold">Active Connectors</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="relative mt-5 flex items-center gap-2 border-t border-[#1a2f4a] pt-4">
          {[
            { id: "health", label: "Health Dashboard", icon: Activity },
            { id: "graph", label: "Dependency Graph", icon: GitBranch },
            { id: "timeline", label: "Sync Timeline", icon: Clock },
            { id: "recovery", label: "Retry & Recovery", icon: RotateCw, badge: failedSyncs.length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-black transition-all ${
                  isActive
                    ? "bg-[#d4a017] text-[#030e1f] shadow-md shadow-[#d4a017]/20"
                    : "bg-[#061428] text-[#8899b4] border border-[#1a2f4a] hover:text-white"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.badge !== undefined && tab.badge > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full bg-red-500 text-white text-[9px] font-black">{tab.badge}</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: Health Dashboard */}
      {activeTab === "health" && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {connectorHealths.map((item) => {
            const cfg = healthBadge[item.category];
            return (
              <div key={item.connectorId} className="rounded-2xl bg-[#040f20] border border-[#1a2f4a] p-5 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-sm font-black text-white">{item.connectorName}</h3>
                    <p className="text-[10px] text-[#6b7a94]">Frequency: {item.syncFrequency}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${cfg.bg} ${cfg.color} border ${cfg.border}`}>
                    {item.category}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-center">
                  <div className="p-2.5 rounded-xl bg-[#061428] border border-[#1a2f4a]">
                    <div className="text-base font-black text-white">{item.healthScore}%</div>
                    <div className="text-[9px] text-[#6b7a94]">Health Score</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-[#061428] border border-[#1a2f4a]">
                    <div className="text-base font-black text-[#4ade80]">{item.responseTimeMs}ms</div>
                    <div className="text-[9px] text-[#6b7a94]">Avg Latency</div>
                  </div>
                </div>

                <div className="space-y-1.5 text-[10px] text-[#8899b4]">
                  <div className="flex justify-between">
                    <span>Uptime Availability:</span>
                    <span className="font-bold text-white">{item.availabilityPercent}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Successful Sync:</span>
                    <span className="font-bold text-[#4ade80]">{item.lastSuccessfulSync}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Auth Status:</span>
                    <span className={`font-bold ${item.authStatus === "VALID" ? "text-[#4ade80]" : "text-[#d4a017]"}`}>{item.authStatus}</span>
                  </div>
                  {item.lastFailure && (
                    <div className="p-2 rounded bg-red-500/10 border border-red-500/20 text-red-400 text-[10px]">
                      ⚠️ {item.lastFailure}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Tab 2: Visual Dependency Graph */}
      {activeTab === "graph" && (
        <div className="space-y-6">
          <div className="rounded-2xl bg-[#040f20] border border-[#1a2f4a] p-6 space-y-4">
            <div>
              <h2 className="text-sm font-black text-white flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-[#d4a017]" /> Institutional Workflow Dependency Model
              </h2>
              <p className="text-xs text-[#8899b4]">Visualizing how core integrations feed downstream academic, financial, and credential operations</p>
            </div>

            <div className="space-y-3 pt-2">
              {workflowNodes.map((node, i) => (
                <div key={node.id} className="relative flex items-center gap-4 p-4 rounded-xl bg-[#061428] border border-[#1a2f4a]">
                  <div className="w-8 h-8 rounded-xl bg-[#d4a017]/20 text-[#d4a017] flex items-center justify-center font-black text-xs shrink-0 border border-[#d4a017]/40">
                    {node.stepNumber}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h3 className="text-xs font-black text-white">{node.label}</h3>
                      <span className={`px-2 py-0.5 rounded text-[8px] font-black ${node.status === "OPERATIONAL" ? "bg-[#4ade80]/20 text-[#4ade80]" : "bg-[#d4a017]/20 text-[#d4a017]"}`}>
                        {node.status}
                      </span>
                    </div>
                    <p className="text-[10px] text-[#6b7a94]">Connector: <span className="text-[#8899b4] font-bold">{node.connectorName}</span></p>
                  </div>
                  {node.downstreamImpacts.length > 0 && (
                    <div className="hidden md:flex flex-col items-end text-right shrink-0">
                      <span className="text-[9px] text-[#6b7a94] uppercase font-bold">Downstream Impact</span>
                      <span className="text-[10px] text-[#38bdf8] font-bold">{node.downstreamImpacts.join(" → ")}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Sync Timeline */}
      {activeTab === "timeline" && (
        <div className="rounded-2xl bg-[#040f20] border border-[#1a2f4a] p-6 space-y-4">
          <h2 className="text-sm font-black text-white flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#38bdf8]" /> Live Synchronization Timeline & History
          </h2>

          <div className="space-y-3">
            {syncTimeline.map((evt) => (
              <div key={evt.id} className="p-4 rounded-xl bg-[#061428] border border-[#1a2f4a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${evt.status === "SUCCESS" ? "bg-[#4ade80]" : "bg-red-500"}`} />
                  <div>
                    <h3 className="text-xs font-black text-white">{evt.connectorName}</h3>
                    <p className="text-[10px] text-[#6b7a94]">{evt.tenantName} · Started: {evt.startTime} · Duration: {(evt.durationMs / 1000).toFixed(1)}s</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-right">
                  <div>
                    <div className="text-xs font-black text-white">{evt.recordsProcessed.toLocaleString()}</div>
                    <div className="text-[9px] text-[#6b7a94]">records synced</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black ${evt.status === "SUCCESS" ? "bg-[#4ade80]/20 text-[#4ade80]" : "bg-red-500/20 text-red-400"}`}>
                    {evt.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Retry & Recovery Centre */}
      {activeTab === "recovery" && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#040f20] border border-[#1a2f4a] text-center">
              <div className="text-xl font-black text-[#d4a017]">{recoveryStats.pendingRetries}</div>
              <div className="text-[10px] text-[#6b7a94]">Pending Retries</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#040f20] border border-[#1a2f4a] text-center">
              <div className="text-xl font-black text-[#4ade80]">{recoveryStats.completedRetries}</div>
              <div className="text-[10px] text-[#6b7a94]">Completed Retries</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#040f20] border border-[#1a2f4a] text-center">
              <div className="text-xl font-black text-red-400">{recoveryStats.escalatedFailures}</div>
              <div className="text-[10px] text-[#6b7a94]">Escalated Failures</div>
            </div>
            <div className="p-4 rounded-2xl bg-[#040f20] border border-[#1a2f4a] text-center">
              <div className="text-xl font-black text-[#4ade80]">{recoveryStats.recoverySuccessRate}%</div>
              <div className="text-[10px] text-[#6b7a94]">Recovery Success Rate</div>
            </div>
          </div>

          <div className="space-y-4">
            {failedSyncs.map((rec) => (
              <div key={rec.id} className="rounded-2xl bg-[#040f20] border border-red-500/30 p-5 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="px-2 py-0.5 rounded bg-red-500/20 text-red-400 text-[9px] font-black uppercase">
                      {rec.escalationStatus.replace(/_/g, " ")}
                    </span>
                    <h3 className="text-sm font-black text-white mt-1">{rec.connectorName} — {rec.tenantName}</h3>
                  </div>
                  <button className="px-3 py-1.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500 hover:text-white text-xs font-bold transition-all flex items-center gap-1">
                    <RefreshCw className="w-3.5 h-3.5" /> Force Retry
                  </button>
                </div>

                <div className="p-3 rounded-xl bg-[#061428] border border-[#1a2f4a] space-y-1">
                  <p className="text-[10px] font-black text-red-400">Failure Reason:</p>
                  <p className="text-xs text-[#c8d8f0]">{rec.failureReason}</p>
                </div>

                <div className="p-3 rounded-xl bg-[#061428] border border-[#1a2f4a] space-y-1">
                  <p className="text-[10px] font-black text-[#d4a017]">Recommended Action:</p>
                  <p className="text-xs text-[#c8d8f0]">{rec.recommendedAction}</p>
                </div>

                <div className="flex items-center justify-between text-[10px] text-[#6b7a94]">
                  <span>Retry Schedule: <strong className="text-[#38bdf8]">{rec.retrySchedule}</strong></span>
                  <span>Attempt: <strong className="text-white">{rec.retryCount} / {rec.maxRetries}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
