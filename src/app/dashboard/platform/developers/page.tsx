"use client";

import React, { useState } from "react";
import { APIManagementService } from "@/lib/institutionOS/APIManagementService";
import { APIUsageAnalyticsService } from "@/lib/institutionOS/APIUsageAnalyticsService";
import {
  Code, Key, Webhook, ShieldCheck, Terminal, Download, Activity, Play,
  Copy, Check, Clock, Layers
} from "lucide-react";

export default function APIDeveloperCentrePage() {
  const [activeTab, setActiveTab] = useState<"keys" | "webhooks" | "oauth" | "explorer">("keys");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const apiKeys = APIManagementService.getAPIKeys("tenant_dta_001");
  const webhooks = APIManagementService.getWebhooks("tenant_dta_001");
  const oauthClients = APIManagementService.getOAuthClients("tenant_dta_001");
  const usageStats = APIUsageAnalyticsService.getUsageSummary("tenant_dta_001");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(text);
    setTimeout(() => setCopiedKey(null), 3000);
  };

  return (
    <div className="min-h-screen space-y-6 pb-8">

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#030e1f] via-[#061428] to-[#0a1f40] border border-[#d4a017]/25 p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-[#d4a017]/5 via-transparent to-[#38bdf8]/5" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#38bdf8] via-[#0284c7] to-[#0369a1] flex items-center justify-center shadow-lg shadow-[#38bdf8]/20 text-white">
              <Terminal className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-xl font-black text-white tracking-tight">InstitutionOS API Developer Centre</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#38bdf8]/20 text-[#38bdf8] text-[10px] font-black tracking-widest border border-[#38bdf8]/30">v4.3 REST & Webhooks</span>
              </div>
              <p className="text-sm text-[#8899b4]">Manage API keys, Webhooks, OAuth 2.0 clients, rate limiting policies & REST Explorer</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-center">
            <div>
              <div className="text-xl font-black text-[#4ade80]">{usageStats.requestsToday.toLocaleString()}</div>
              <div className="text-[10px] text-[#8899b4] font-bold">API Requests Today</div>
            </div>
            <div className="w-px h-8 bg-[#1a2f4a]" />
            <div>
              <div className="text-xl font-black text-white">{usageStats.p99LatencyMs}ms</div>
              <div className="text-[10px] text-[#8899b4] font-bold">P99 Latency</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="relative mt-5 flex items-center gap-2 border-t border-[#1a2f4a] pt-4">
          {[
            { id: "keys", label: "API Keys", icon: Key },
            { id: "webhooks", label: "Webhook Manager", icon: Webhook },
            { id: "oauth", label: "OAuth Clients", icon: ShieldCheck },
            { id: "explorer", label: "REST API Explorer", icon: Terminal },
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
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab 1: API Keys */}
      {activeTab === "keys" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-white flex items-center gap-2">
              <Key className="w-4 h-4 text-[#d4a017]" /> Active API Keys ({apiKeys.length})
            </h2>
            <button className="px-3 py-1.5 rounded-xl bg-[#d4a017] text-[#030e1f] text-xs font-black hover:bg-[#b8860b]">
              + Generate New API Key
            </button>
          </div>

          <div className="space-y-3">
            {apiKeys.map((key) => (
              <div key={key.id} className="p-4 rounded-2xl bg-[#040f20] border border-[#1a2f4a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-black text-white">{key.name}</h3>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-black ${key.status === "active" ? "bg-[#4ade80]/20 text-[#4ade80]" : "bg-red-500/20 text-red-400"}`}>
                      {key.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-[10px] text-[#6b7a94]">Prefix: <code className="text-[#38bdf8] font-mono">{key.keyPrefix}****************</code> · Rate Limit: {key.rateLimitPerMin} req/min</p>
                  <div className="flex gap-1 pt-1">
                    {key.scopes.map((s) => (
                      <span key={s} className="px-1.5 py-0.5 rounded bg-[#061428] border border-[#1a2f4a] text-[9px] text-[#6b7a94]">{s}</span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => copyToClipboard(key.keyPrefix)}
                    className="p-2 rounded-xl bg-[#061428] border border-[#1a2f4a] text-[#6b7a94] hover:text-white transition-all"
                    title="Copy Key Prefix"
                  >
                    {copiedKey === key.keyPrefix ? <Check className="w-4 h-4 text-[#4ade80]" /> : <Copy className="w-4 h-4" />}
                  </button>
                  <button className="px-3 py-1.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/30 text-xs font-bold hover:bg-red-500 hover:text-white">
                    Revoke Key
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Webhooks */}
      {activeTab === "webhooks" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-white flex items-center gap-2">
              <Webhook className="w-4 h-4 text-[#38bdf8]" /> Webhook Endpoints ({webhooks.length})
            </h2>
            <button className="px-3 py-1.5 rounded-xl bg-[#38bdf8] text-[#030e1f] text-xs font-black hover:bg-[#0284c7]">
              + Register Endpoint
            </button>
          </div>

          <div className="space-y-3">
            {webhooks.map((wh) => (
              <div key={wh.id} className="p-4 rounded-2xl bg-[#040f20] border border-[#1a2f4a] space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <code className="text-xs font-mono text-[#38bdf8] font-bold">{wh.url}</code>
                    <p className="text-[10px] text-[#6b7a94]">Last Delivery: {wh.lastDelivery}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black ${wh.status === "active" ? "bg-[#4ade80]/20 text-[#4ade80]" : "bg-red-500/20 text-red-400"}`}>
                    {wh.status.toUpperCase()} ({wh.successRate}% Success)
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px]">
                  <div className="flex gap-1">
                    {wh.events.map((e) => (
                      <span key={e} className="px-2 py-0.5 rounded bg-[#061428] border border-[#1a2f4a] text-[#8899b4] font-bold">{e}</span>
                    ))}
                  </div>
                  <button className="text-[#d4a017] hover:underline font-bold">Test Payload</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: OAuth Clients */}
      {activeTab === "oauth" && (
        <div className="space-y-4">
          <h2 className="text-sm font-black text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#4ade80]" /> OAuth 2.0 Clients ({oauthClients.length})
          </h2>

          <div className="space-y-3">
            {oauthClients.map((client) => (
              <div key={client.clientId} className="p-4 rounded-2xl bg-[#040f20] border border-[#1a2f4a] space-y-2">
                <h3 className="text-xs font-black text-white">{client.name}</h3>
                <p className="text-[10px] text-[#6b7a94]">Client ID: <code className="text-[#4ade80] font-mono">{client.clientId}</code></p>
                <div className="text-[10px] text-[#8899b4]">Redirect URIs: {client.redirectUris.join(", ")}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: REST API Explorer */}
      {activeTab === "explorer" && (
        <div className="rounded-2xl bg-[#040f20] border border-[#1a2f4a] p-6 space-y-4">
          <h2 className="text-sm font-black text-white flex items-center gap-2">
            <Terminal className="w-4 h-4 text-[#d4a017]" /> Interactive REST API Explorer
          </h2>

          <div className="p-4 rounded-xl bg-[#061428] border border-[#1a2f4a] font-mono text-xs text-[#c8d8f0] space-y-2">
            <div className="text-[#8899b4]">// GET /api/v4/students?tenant_id=tenant_dta_001</div>
            <div className="text-[#4ade80]">curl -X GET "https://dwsa.africa/api/v4/students" \</div>
            <div className="text-[#38bdf8]">  -H "Authorization: Bearer dwsa_live_9f83..." \</div>
            <div className="text-[#38bdf8]">  -H "Content-Type: application/json"</div>
          </div>

          <div className="flex justify-end">
            <button className="px-4 py-2 rounded-xl bg-[#d4a017] text-[#030e1f] text-xs font-black hover:bg-[#b8860b]">
              Execute Test Request
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
