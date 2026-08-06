"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users, Building2, ShieldCheck, Mail, Calendar, TrendingUp, CheckCircle2, AlertTriangle, Sparkles
} from "lucide-react";
import { CustomerSuccessService, type CustomerAccount } from "@/lib/institutionOS/CustomerSuccessService";

export default function CustomerSuccessPage() {
  const [accounts, setAccounts] = useState<CustomerAccount[]>(CustomerSuccessService.getAllAccounts());
  const summary = CustomerSuccessService.getSummary();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-[#061428] border border-[#d4a017]/20 p-6 sm:p-8 rounded-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#d4a017]/15 text-[#d4a017] text-[10px] font-black uppercase tracking-wider">
          <Users className="w-3 h-3" />
          <span>v4.1 — Enterprise Customer Success Centre</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Customer Success & Account Relationship Management
        </h1>
        <p className="text-xs text-[#8899b4]">
          Manage institutional account owners, implementation milestones, support indicators, contract renewals, and growth expansion opportunities.
        </p>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-[#061428] border border-[#d4a017]/20 space-y-2">
          <span className="text-xs text-[#8899b4] font-bold block">Managed Institutions</span>
          <div className="text-3xl font-black text-white">{summary.totalAccounts}</div>
          <span className="text-[11px] text-[#4ade80] font-extrabold">{summary.greenHealthAccounts} Green Health</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#061428] border border-[#4ade80]/20 space-y-2">
          <span className="text-xs text-[#8899b4] font-bold block">Avg Implementation %</span>
          <div className="text-3xl font-black text-[#4ade80]">{summary.averageImplementationPercent}%</div>
          <span className="text-[11px] text-[#8899b4]">Onboarding Progress</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#061428] border border-[#a78bfa]/20 space-y-2">
          <span className="text-xs text-[#8899b4] font-bold block">Avg Usage Score</span>
          <div className="text-3xl font-black text-[#a78bfa]">{summary.averageUsageScore}/100</div>
          <span className="text-[11px] text-[#8899b4]">Platform Engagement</span>
        </div>

        <div className="p-5 rounded-2xl bg-[#061428] border border-[#d4a017]/20 space-y-2">
          <span className="text-xs text-[#8899b4] font-bold block">Open Support Tickets</span>
          <div className="text-3xl font-black text-[#d4a017]">{summary.totalTicketsOpen}</div>
          <span className="text-[11px] text-[#4ade80] font-extrabold">Within SLA Target</span>
        </div>
      </div>

      {/* Customer Accounts Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accounts.map((acc) => (
          <div key={acc.id} className="p-6 rounded-3xl bg-[#061428] border border-[#d4a017]/20 space-y-5 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-[#1a2f4a] pb-4">
                <div>
                  <h3 className="text-base font-extrabold text-white">{acc.institutionName}</h3>
                  <span className="text-[10px] text-[#d4a017] font-extrabold uppercase">{acc.tier} Tier</span>
                </div>
                <span
                  className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                    acc.supportStatus === "green"
                      ? "bg-[#4ade80]/15 text-[#4ade80] border border-[#4ade80]/30"
                      : "bg-[#d4a017]/15 text-[#d4a017] border border-[#d4a017]/30"
                  }`}
                >
                  ● {acc.supportStatus}
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#8899b4]">Account Owner</span>
                  <span className="font-bold text-white">{acc.accountOwner}</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#8899b4]">Implementation</span>
                  <span className="font-bold text-[#4ade80]">{acc.implementationProgressPercent}%</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#8899b4]">Usage Score</span>
                  <span className="font-bold text-[#a78bfa]">{acc.usageScore}/100</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-[#8899b4]">Monthly Value</span>
                  <span className="font-bold text-[#d4a017]">${acc.monthlyValueUSD}/mo</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#030e1f] border border-[#1a2f4a] space-y-1">
                <span className="text-[10px] font-extrabold text-[#d4a017] uppercase block">Growth Opportunity</span>
                <p className="text-[11px] text-[#aab4c4] leading-relaxed">{acc.growthOpportunity}</p>
              </div>
            </div>

            <div className="pt-3 border-t border-[#1a2f4a] flex items-center justify-between text-[11px]">
              <span className="text-[#8899b4]">Renews: {acc.contractRenewalDate}</span>
              <a
                href={`mailto:${acc.accountOwnerEmail}`}
                className="text-[#d4a017] font-extrabold hover:underline flex items-center gap-1"
              >
                <Mail className="w-3 h-3" /> Contact Owner
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
