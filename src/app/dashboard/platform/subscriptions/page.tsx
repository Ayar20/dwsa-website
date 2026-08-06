"use client";

import React from "react";
import Link from "next/link";
import {
  CreditCard, DollarSign, Calendar, ShieldCheck, CheckCircle2, TrendingUp, RefreshCw
} from "lucide-react";
import { SubscriptionAnalyticsService } from "@/lib/institutionOS/SubscriptionAnalyticsService";

export default function SubscriptionsPage() {
  const metrics = SubscriptionAnalyticsService.getMetrics();
  const subscriptions = SubscriptionAnalyticsService.getAllSubscriptions();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-[#061428] border border-[#d4a017]/20 p-6 sm:p-8 rounded-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#d4a017]/15 text-[#d4a017] text-[10px] font-black uppercase tracking-wider">
          <CreditCard className="w-3 h-3" />
          <span>v4.1 — Subscription Management Centre</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Subscriptions & Commercial Revenue Engine
        </h1>
        <p className="text-xs text-[#8899b4]">
          Track active institutional subscriptions, MRR/ARR revenue, user capacity limits, and renewal dates across all customer accounts.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-[#061428] border border-[#d4a017]/20 space-y-2">
          <span className="text-xs text-[#8899b4] font-bold block">Monthly Recurring Revenue</span>
          <div className="text-3xl font-black text-white">${metrics.totalMRR.toLocaleString()}</div>
          <span className="text-[11px] text-[#4ade80] font-extrabold">+18.4% MoM</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#061428] border border-[#4ade80]/20 space-y-2">
          <span className="text-xs text-[#8899b4] font-bold block">Annual Recurring Revenue</span>
          <div className="text-3xl font-black text-[#4ade80]">${metrics.totalARR.toLocaleString()}</div>
          <span className="text-[11px] text-[#8899b4]">Contracted ARR</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#061428] border border-[#d4a017]/20 space-y-2">
          <span className="text-xs text-[#8899b4] font-bold block">Active Subscriptions</span>
          <div className="text-3xl font-black text-[#d4a017]">{metrics.activeSubscriptions}</div>
          <span className="text-[11px] text-[#8899b4]">{metrics.trialSubscriptions} trial subscription</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#061428] border border-[#a78bfa]/20 space-y-2">
          <span className="text-xs text-[#8899b4] font-bold block">Avg Revenue Per Tenant</span>
          <div className="text-3xl font-black text-[#a78bfa]">${metrics.averageRevenuePerUser.toLocaleString()}</div>
          <span className="text-[11px] text-[#8899b4]">Monthly ARPU</span>
        </div>
      </div>

      {/* Active Subscriptions Table */}
      <div className="bg-[#061428] border border-[#d4a017]/20 rounded-3xl p-6 space-y-6">
        <div>
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-[#d4a017]" />
            Active Institutional Subscriptions
          </h3>
          <p className="text-xs text-[#8899b4]">Institutional plan details, user capacity, enabled modules, and renewal schedules</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#030e1f] border-b border-[#1a2f4a] text-[#6b7a94] uppercase tracking-wider text-[10px] font-bold">
                <th className="py-3.5 px-4">Institution</th>
                <th className="py-3.5 px-4">Tier</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">User Capacity</th>
                <th className="py-3.5 px-4">Monthly Value</th>
                <th className="py-3.5 px-4">Renewal Date</th>
                <th className="py-3.5 px-4">Auto Renew</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a2f4a]">
              {subscriptions.map((s) => (
                <tr key={s.tenantId} className="hover:bg-[#0c1b33] transition-colors">
                  <td className="py-3.5 px-4 font-bold text-white">{s.tenantName}</td>
                  <td className="py-3.5 px-4 font-extrabold text-[#d4a017] capitalize">{s.tier}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                        s.status === "active"
                          ? "bg-[#4ade80]/15 text-[#4ade80] border border-[#4ade80]/30"
                          : "bg-[#d4a017]/15 text-[#d4a017] border border-[#d4a017]/30"
                      }`}
                    >
                      {s.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-white">
                      {s.currentUsers.toLocaleString()} / {s.userCapacity >= 999999 ? "∞" : s.userCapacity.toLocaleString()}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-black text-[#4ade80]">${s.monthlyValueUSD.toLocaleString()}</td>
                  <td className="py-3.5 px-4 text-[#aab4c4]">{s.renewalDate}</td>
                  <td className="py-3.5 px-4 font-extrabold text-[#4ade80]">{s.autoRenew ? "✓ Enabled" : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
