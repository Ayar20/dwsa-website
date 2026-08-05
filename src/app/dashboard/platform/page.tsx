"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Globe, Building2, Users, GraduationCap, Award, DollarSign, ShieldCheck,
  Activity, ArrowUpRight, Cpu, Layers, Sparkles, CheckCircle2, Zap, Server,
  BarChart3, Store, ArrowRight, UserPlus
} from "lucide-react";
import { TenantService } from "@/lib/institutionOS/TenantService";
import { PlatformMetricsService } from "@/lib/institutionOS/PlatformMetricsService";
import { SubscriptionService } from "@/lib/institutionOS/SubscriptionService";
import { UsageAnalyticsService } from "@/lib/institutionOS/UsageAnalyticsService";

export default function PlatformCommandCentrePage() {
  const tenants = TenantService.getAllTenants();
  const snapshot = PlatformMetricsService.getSnapshot();
  const usage = UsageAnalyticsService.getTenantActivity();
  const plans = SubscriptionService.getCatalog();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#061428] via-[#0b213f] to-[#030e1f] border border-[#d4a017]/30 p-6 sm:p-8 shadow-2xl">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#d4a017]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d4a017]/15 border border-[#d4a017]/30 text-[#d4a017] text-xs font-black tracking-wider uppercase">
              <Globe className="w-3.5 h-3.5" />
              <span>Multi-Tenant Enterprise Operating System</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              InstitutionOS Platform Command Centre
            </h1>
            <p className="text-sm text-[#aab4c4] max-w-2xl leading-relaxed">
              Global governance, institution provisioning, licensing, cross-tenant analytics, and infrastructure health for Digital World Systems Africa enterprise platform deployments.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <Link
              href="/dashboard/platform/provision"
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#d4a017] to-[#f0c040] text-[#030e1f] font-black text-xs tracking-wider uppercase shadow-lg shadow-[#d4a017]/20 hover:scale-105 transition-all flex items-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Provision Institution
            </Link>
            <Link
              href="/dashboard/platform/tenants"
              className="px-5 py-3 rounded-2xl bg-[#061428] border border-[#d4a017]/40 text-[#f0f4ff] hover:text-white font-bold text-xs tracking-wider uppercase hover:border-[#d4a017] transition-all flex items-center gap-2"
            >
              <Building2 className="w-4 h-4 text-[#d4a017]" />
              Tenant Registry ({tenants.length})
            </Link>
          </div>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-[#061428] border border-[#d4a017]/20 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8899b4]">
            <span className="font-bold">Active Institutions</span>
            <Building2 className="w-4 h-4 text-[#d4a017]" />
          </div>
          <div className="text-3xl font-black text-white">{snapshot.totalInstitutions}</div>
          <div className="flex items-center gap-1.5 text-[11px] text-[#4ade80] font-extrabold">
            <span>Flagship: Digital Technology Academy</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-[#061428] border border-[#4ade80]/20 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8899b4]">
            <span className="font-bold">Total Platform Learners</span>
            <GraduationCap className="w-4 h-4 text-[#4ade80]" />
          </div>
          <div className="text-3xl font-black text-[#4ade80]">{snapshot.totalLearners.toLocaleString()}</div>
          <div className="text-[11px] text-[#8899b4]">Across all active tenants</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#061428] border border-[#d4a017]/20 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8899b4]">
            <span className="font-bold">Monthly Recurring Revenue</span>
            <DollarSign className="w-4 h-4 text-[#d4a017]" />
          </div>
          <div className="text-3xl font-black text-white">${snapshot.revenueThisMonthUSD.toLocaleString()}</div>
          <div className="text-[11px] text-[#4ade80] font-extrabold">+{snapshot.revenueGrowthPercent}% MoM growth</div>
        </div>

        <div className="p-5 rounded-2xl bg-[#061428] border border-[#a78bfa]/20 space-y-2">
          <div className="flex items-center justify-between text-xs text-[#8899b4]">
            <span className="font-bold">Platform Availability</span>
            <Activity className="w-4 h-4 text-[#a78bfa]" />
          </div>
          <div className="text-3xl font-black text-[#a78bfa]">{snapshot.platformAvailabilityPercent}%</div>
          <div className="text-[11px] text-[#4ade80] font-extrabold">SLA Target 99.9% Met</div>
        </div>
      </div>

      {/* Registered Institutions Summary */}
      <div className="p-6 rounded-3xl bg-[#061428] border border-[#d4a017]/20 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#d4a017]" />
              Active Institution Registry
            </h2>
            <p className="text-xs text-[#8899b4]">Overview of all institutions powered by InstitutionOS</p>
          </div>
          <Link
            href="/dashboard/platform/tenants"
            className="text-xs font-bold text-[#d4a017] hover:underline flex items-center gap-1"
          >
            View Full Registry <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tenants.map((t) => {
            const tenantUsage = usage.find((u) => u.tenantId === t.id);
            return (
              <div
                key={t.id}
                className="p-5 rounded-2xl bg-[#030e1f] border border-[#d4a017]/20 space-y-4 hover:border-[#d4a017] transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm"
                      style={{
                        backgroundColor: `${t.brand.primaryColor}20`,
                        color: t.brand.primaryColor,
                        border: `1px solid ${t.brand.primaryColor}40`,
                      }}
                    >
                      {t.brand.shortName[0]}
                    </div>
                    <div>
                      <h3 className="text-sm font-extrabold text-white">{t.name}</h3>
                      <p className="text-[11px] text-[#8899b4]">@{t.slug} • {t.country}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs border-t border-b border-[#1a2f4a] py-3">
                  <div>
                    <span className="text-[#8899b4] block text-[10px] uppercase font-bold">Tier</span>
                    <span className="font-extrabold text-[#d4a017] capitalize">{t.tier}</span>
                  </div>
                  <div>
                    <span className="text-[#8899b4] block text-[10px] uppercase font-bold">Status</span>
                    <span className="font-extrabold text-[#4ade80] capitalize">{t.status}</span>
                  </div>
                  <div>
                    <span className="text-[#8899b4] block text-[10px] uppercase font-bold">Learners</span>
                    <span className="font-bold text-white">{tenantUsage?.mau ?? "—"}</span>
                  </div>
                  <div>
                    <span className="text-[#8899b4] block text-[10px] uppercase font-bold">AI Provider</span>
                    <span className="font-bold text-white uppercase">{t.settings.ai.provider}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="text-[11px] text-[#8899b4]">{t.domains[0]?.domain ?? "Internal Domain"}</span>
                  <Link
                    href={`/dashboard/platform/tenants?tenant=${t.id}`}
                    className="text-[#d4a017] font-extrabold hover:underline"
                  >
                    Manage →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Platform Infrastructure & AI Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Global Platform AI Assistant Overview */}
        <div className="p-6 rounded-3xl bg-[#061428] border border-[#d4a017]/20 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#d4a017]/15 text-[#d4a017]">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">Global AI Orchestrator</h3>
                <p className="text-xs text-[#8899b4]">Provider abstraction across Gemini, OpenAI, & Azure</p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded-full bg-[#4ade80]/15 text-[#4ade80] text-[10px] font-black uppercase border border-[#4ade80]/30">
              Active
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-[#030e1f] border border-[#1a2f4a] flex items-center justify-between">
              <span className="text-[#aab4c4] font-medium">Monthly Token Consumption</span>
              <span className="font-black text-white">{(snapshot.aiRequestsThisMonth * 12).toLocaleString()} Tokens</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#030e1f] border border-[#1a2f4a] flex items-center justify-between">
              <span className="text-[#aab4c4] font-medium">Active Prompt Libraries</span>
              <span className="font-black text-[#d4a017]">48 Enterprise Libraries</span>
            </div>
            <div className="p-3.5 rounded-xl bg-[#030e1f] border border-[#1a2f4a] flex items-center justify-between">
              <span className="text-[#aab4c4] font-medium">Knowledge Bases Connected</span>
              <span className="font-black text-[#4ade80]">3 Institutional RAG Repos</span>
            </div>
          </div>
        </div>

        {/* Multi-Tenant Licensing Tiers */}
        <div className="p-6 rounded-3xl bg-[#061428] border border-[#d4a017]/20 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[#4ade80]/15 text-[#4ade80]">
                <Store className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-extrabold text-white">Enterprise Licensing Plans</h3>
                <p className="text-xs text-[#8899b4]">Commercial licensing tiers across Africa</p>
              </div>
            </div>
            <Link href="/dashboard/platform/analytics" className="text-xs font-extrabold text-[#d4a017] hover:underline">
              Analytics →
            </Link>
          </div>

          <div className="space-y-3">
            {plans.slice(0, 3).map((plan) => (
              <div key={plan.tier} className="p-3.5 rounded-xl bg-[#030e1f] border border-[#1a2f4a] flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-white text-xs block">{plan.name}</span>
                  <span className="text-[10px] text-[#8899b4]">Up to {plan.maxLearners >= 999999 ? "Unlimited" : plan.maxLearners} Learners</span>
                </div>
                <span className="font-black text-[#d4a017] text-sm">
                  {plan.monthlyUSD === 0 ? "Custom" : `$${plan.monthlyUSD}/mo`}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
