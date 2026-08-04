"use client";

import React, { useState } from "react";
import { ShieldCheck, Cpu, Sliders, CheckCircle2, AlertTriangle, RefreshCw, Lock } from "lucide-react";
import { AIGovernanceService, AIGovernanceConfig } from "@/lib/institutionOS/AIGovernanceService";
import { AIOrchestrator, LLMProvider } from "@/lib/institutionOS/AIOrchestrator";
import { AIAnalyticsService } from "@/lib/institutionOS/AIAnalyticsService";

export default function AIGovernanceCentrePage() {
  const [config, setConfig] = useState<AIGovernanceConfig>(() => AIGovernanceService.getConfig());
  const [logs] = useState(() => AIGovernanceService.getAuditLogs());
  const analytics = AIAnalyticsService.getAnalyticsSummary();
  const [toast, setToast] = useState<string | null>(null);

  const handleProviderChange = (provider: LLMProvider) => {
    AIOrchestrator.setActiveProvider(provider);
    const updated = AIGovernanceService.updateConfig({ activeProvider: provider });
    setConfig(updated);
    setToast(`Active LLM Provider switched to ${provider}`);
    setTimeout(() => setToast(null), 3000);
  };

  const toggleModeration = () => {
    const updated = AIGovernanceService.updateConfig({ contentModerationEnabled: !config.contentModerationEnabled });
    setConfig(updated);
    setToast(`Content Moderation ${updated.contentModerationEnabled ? "Enabled" : "Disabled"}`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#061428] border border-[#4ade80]/50 text-[#4ade80] text-xs font-extrabold shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {toast}
        </div>
      )}

      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded bg-[#818cf8]/15 text-[#818cf8] text-[9px] font-black uppercase border border-[#818cf8]/30">AI GOVERNANCE</span>
          <span className="text-[10px] text-[#8899b4]">InstitutionOS v3.8</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white">AI Governance &amp; Controls Centre</h2>
        <p className="text-xs text-[#8899b4]">LLM provider abstraction, prompt policy enforcement, token rate limits &amp; moderation audit logging</p>
      </div>

      {/* Provider Switcher */}
      <div className="rounded-3xl bg-[#061428] border border-[#818cf8]/30 p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#818cf8]" /> Active Enterprise LLM Provider Selection
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {(["Gemini", "OpenAI", "AzureOpenAI", "Anthropic"] as LLMProvider[]).map((prov) => (
            <button
              key={prov}
              onClick={() => handleProviderChange(prov)}
              className={`p-4 rounded-2xl border text-left transition-all ${
                config.activeProvider === prov
                  ? "bg-[#818cf8]/15 border-[#818cf8] text-white shadow-lg"
                  : "bg-[#030e1f] border-[#1a2f4a] text-[#8899b4] hover:border-[#818cf8]/40"
              }`}
            >
              <p className="text-xs font-extrabold">{prov}</p>
              <p className="text-[9px] mt-1">{config.activeProvider === prov ? "✓ Active Provider" : "Available Engine"}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Analytics & Quota Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total AI Queries (Month)", value: analytics.totalQueriesThisMonth, color: "text-[#818cf8]" },
          { label: "Avg Latency", value: `${analytics.avgResponseTimeMs}ms`, color: "text-[#4ade80]" },
          { label: "Satisfaction Index", value: `${analytics.satisfactionRate}%`, color: "text-[#d4a017]" },
          { label: "Content Moderation", value: config.contentModerationEnabled ? "Active" : "Disabled", color: "text-[#4ade80]" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-4 space-y-1">
            <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-[#8899b4] font-bold uppercase">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Audit Log Table */}
      <div className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#4ade80]" /> AI Safety &amp; Moderation Audit Log
          </h3>
          <button
            onClick={toggleModeration}
            className="text-xs font-extrabold text-[#818cf8] border border-[#818cf8]/30 px-3 py-1.5 rounded-xl hover:bg-[#818cf8]/10 transition-all"
          >
            Toggle Moderation ({config.contentModerationEnabled ? "ON" : "OFF"})
          </button>
        </div>

        <div className="rounded-2xl border border-[#1a2f4a] overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#030e1f] text-[#8899b4] text-[10px] uppercase font-black border-b border-[#1a2f4a]">
              <tr>
                <th className="p-3.5">Log ID</th>
                <th className="p-3.5">Timestamp</th>
                <th className="p-3.5">Role</th>
                <th className="p-3.5">Query Snippet</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a2f4a] text-white">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-[#0f223d]/40 transition-colors">
                  <td className="p-3.5 font-mono text-[10px] text-[#8899b4]">{log.id}</td>
                  <td className="p-3.5 text-[10px] text-[#8899b4]">{log.timestamp}</td>
                  <td className="p-3.5 font-bold">{log.role}</td>
                  <td className="p-3.5 text-[#8899b4] max-w-[200px] truncate">{log.querySnippet}</td>
                  <td className="p-3.5 text-right">
                    <span
                      className={`px-2.5 py-0.5 rounded-full border text-[9px] font-black uppercase ${
                        log.actionTaken === "Passed"
                          ? "bg-[#4ade80]/10 border-[#4ade80]/30 text-[#4ade80]"
                          : "bg-[#d4a017]/10 border-[#d4a017]/30 text-[#d4a017]"
                      }`}
                    >
                      {log.actionTaken}
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
