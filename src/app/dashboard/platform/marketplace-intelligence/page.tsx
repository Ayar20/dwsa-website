"use client";

import React from "react";
import { MarketplaceExecutiveAnalyticsService } from "@/lib/institutionOS/MarketplaceExecutiveAnalyticsService";
import { MarketplaceRevenueService } from "@/lib/institutionOS/MarketplaceRevenueService";
import {
  Activity, DollarSign, TrendingUp, Users, ShieldCheck, Award, Zap, BarChart3
} from "lucide-react";

export default function MarketplaceIntelligencePage() {
  const metrics = MarketplaceExecutiveAnalyticsService.getExecutiveMetrics();
  const revenue = MarketplaceRevenueService.getRevenueSummary();

  return (
    <div className="min-h-screen space-y-6 pb-8">

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#030e1f] via-[#061428] to-[#0a1f40] border border-[#d4a017]/25 p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-[#d4a017]/5 via-transparent to-[#4ade80]/5" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4a017] via-[#b8860b] to-[#996515] flex items-center justify-center shadow-lg shadow-[#d4a017]/20 text-[#030e1f]">
              <BarChart3 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-xl font-black text-white tracking-tight">Marketplace Executive Intelligence</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#4ade80]/20 text-[#4ade80] text-[10px] font-black tracking-widest border border-[#4ade80]/30">v4.4A ANALYTICS</span>
              </div>
              <p className="text-sm text-[#8899b4]">Global marketplace GMV, developer economy growth, adoption trends & certification coverage</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-center">
            <div>
              <div className="text-2xl font-black text-[#4ade80]">${revenue.grossMarketplaceVolumeUSD.toLocaleString()}</div>
              <div className="text-[10px] text-[#8899b4] font-bold">Gross Marketplace GMV</div>
            </div>
          </div>
        </div>
      </div>

      {/* Executive Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Platform Commission (20%)", value: `$${revenue.platformCommissionUSD.toLocaleString()}`, color: "text-[#d4a017]" },
          { label: "Developer Payouts (80%)", value: `$${revenue.developerEarningsUSD.toLocaleString()}`, color: "text-[#4ade80]" },
          { label: "Active Developer Orgs", value: metrics.activeDeveloperOrganizations, color: "text-[#38bdf8]" },
          { label: "Certified Coverage", value: `${metrics.certifiedExtensionsRatePercent}%`, color: "text-[#4ade80]" },
        ].map((s) => (
          <div key={s.label} className="p-4 rounded-2xl bg-[#040f20] border border-[#1a2f4a] text-center">
            <div className={`text-base font-black ${s.color}`}>{s.value}</div>
            <div className="text-[10px] text-[#6b7a94] mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
