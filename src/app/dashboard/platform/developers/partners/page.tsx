"use client";

import React from "react";
import { DeveloperOrganizationService } from "@/lib/institutionOS/DeveloperOrganizationService";
import { ExtensionSDKService } from "@/lib/institutionOS/ExtensionSDKService";
import {
  Code, Building2, ShieldCheck, Download, Star, Terminal, ArrowUpRight, CheckCircle2
} from "lucide-react";

export default function PartnerDeveloperPortalPage() {
  const orgs = DeveloperOrganizationService.getOrganizations();
  const sdkVersion = ExtensionSDKService.getSDKVersion();

  return (
    <div className="min-h-screen space-y-6 pb-8">

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#030e1f] via-[#061428] to-[#0a1f40] border border-[#d4a017]/25 p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-[#d4a017]/5 via-transparent to-[#38bdf8]/5" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#38bdf8] via-[#0284c7] to-[#0369a1] flex items-center justify-center shadow-lg shadow-[#38bdf8]/20 text-white">
              <Code className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-xl font-black text-white tracking-tight">Partner Developer Portal</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#38bdf8]/20 text-[#38bdf8] text-[10px] font-black tracking-widest border border-[#38bdf8]/30">{sdkVersion}</span>
              </div>
              <p className="text-sm text-[#8899b4]">Build, certify, and monetize third-party extensions, AI agents, and domain plugins</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-xl bg-[#d4a017] text-[#030e1f] text-xs font-black hover:bg-[#b8860b] flex items-center gap-1.5">
              <Download className="w-4 h-4" /> Download Extension SDK
            </button>
          </div>
        </div>
      </div>

      {/* Developer Orgs Table */}
      <div className="rounded-2xl bg-[#040f20] border border-[#1a2f4a] p-6 space-y-4">
        <h2 className="text-sm font-black text-white flex items-center gap-2">
          <Building2 className="w-4 h-4 text-[#d4a017]" /> Registered Developer Organizations ({orgs.length})
        </h2>

        <div className="space-y-3">
          {orgs.map((org) => (
            <div key={org.id} className="p-4 rounded-xl bg-[#061428] border border-[#1a2f4a] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-black text-white">{org.name}</h3>
                  <span className="px-2 py-0.5 rounded bg-[#4ade80]/20 text-[#4ade80] text-[8px] font-black">{org.verificationStatus}</span>
                </div>
                <p className="text-[10px] text-[#6b7a94]">Type: {org.type} · Country: {org.country} · Website: {org.website}</p>
              </div>

              <div className="flex items-center gap-4 text-right">
                <div>
                  <div className="text-xs font-black text-white">{org.publishedExtensionsCount} Ext / {org.publishedAIAgentsCount} AI</div>
                  <div className="text-[9px] text-[#6b7a94]">Published Items</div>
                </div>
                <div>
                  <div className="text-xs font-black text-[#4ade80]">{org.totalDownloads.toLocaleString()}</div>
                  <div className="text-[9px] text-[#6b7a94]">Total Installs</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
