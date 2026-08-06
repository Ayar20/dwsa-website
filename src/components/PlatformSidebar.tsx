"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Globe, Building2, UserPlus, BarChart3, Store, ShieldCheck,
  Cpu, Layers, Sparkles, ChevronRight, X, ArrowLeft, Activity,
  Users, CreditCard, HeartPulse, CheckCircle2, Zap, Terminal, Database,
  Compass, TrendingUp
} from "lucide-react";

interface PlatformSidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const badgeEmerald = "bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20";
const badgeGold = "bg-[#FEFCE8] text-[#D4A017] border border-[#D4A017]/30";
const badgeSlate = "bg-slate-100 text-slate-600 border border-slate-200";

const coreNavItems = [
  { label: "Platform Overview", href: "/dashboard/platform", icon: Globe, badge: "CORE", badgeColor: badgeGold },
  { label: "Tenant Registry", href: "/dashboard/platform/tenants", icon: Building2, badge: "TENANTS", badgeColor: badgeEmerald },
  { label: "Provision Institution", href: "/dashboard/platform/provision", icon: UserPlus, badge: "WIZARD", badgeColor: badgeEmerald },
  { label: "Platform Analytics", href: "/dashboard/platform/analytics", icon: BarChart3, badge: "GLOBAL", badgeColor: badgeGold },
];

const commercialNavItems = [
  { label: "Enterprise Marketplace", href: "/dashboard/platform/marketplace", icon: Store, badge: "v5.0", badgeColor: badgeEmerald },
  { label: "Customer Success", href: "/dashboard/platform/customers", icon: Users, badge: "CRM", badgeColor: badgeSlate },
  { label: "Subscriptions & MRR", href: "/dashboard/platform/subscriptions", icon: CreditCard, badge: "MRR", badgeColor: badgeEmerald },
  { label: "Customer Onboarding", href: "/dashboard/platform/onboarding", icon: CheckCircle2, badge: "WIZARD", badgeColor: badgeEmerald },
  { label: "Tenant Health Monitoring", href: "/dashboard/platform/health", icon: HeartPulse, badge: "LIVE", badgeColor: badgeEmerald },
];

const aiWorkforceNavItems = [
  { label: "AI Workforce Registry", href: "/dashboard/platform/ai-workforce", icon: Sparkles, badge: "v5.0", badgeColor: badgeGold },
  { label: "Atlas — Platform Agent", href: "/dashboard/platform/ai-agent", icon: Cpu, badge: "LIVE", badgeColor: badgeEmerald },
];

const eipNavItems = [
  { label: "Enterprise Integrations", href: "/dashboard/platform/integrations", icon: Zap, badge: "EIP", badgeColor: badgeGold },
  { label: "Integration Intelligence", href: "/dashboard/platform/integration-intelligence", icon: Activity, badge: "HEALTH", badgeColor: badgeEmerald },
  { label: "Deployment Templates", href: "/dashboard/platform/templates", icon: Layers, badge: "BUNDLES", badgeColor: badgeSlate },
  { label: "API Developer Centre", href: "/dashboard/platform/developers", icon: Terminal, badge: "REST", badgeColor: badgeSlate },
  { label: "Data Exchange & ETL", href: "/dashboard/platform/data-exchange", icon: Database, badge: "ETL", badgeColor: badgeEmerald },
  { label: "Digital Partner Network", href: "/dashboard/platform/partners", icon: Users, badge: "ALLIANCE", badgeColor: badgeGold },
];

const marketplaceEcosystemItems = [
  { label: "Enterprise Marketplace", href: "/dashboard/platform/ecosystem", icon: Store, badge: "v5.0", badgeColor: badgeGold },
  { label: "AI Agent Exchange", href: "/dashboard/platform/ai-marketplace", icon: Sparkles, badge: "AGENTS", badgeColor: badgeEmerald },
  { label: "Partner Developer Portal", href: "/dashboard/platform/developers/partners", icon: Cpu, badge: "SDK", badgeColor: badgeSlate },
  { label: "Marketplace Intelligence", href: "/dashboard/platform/marketplace-intelligence", icon: BarChart3, badge: "GMV", badgeColor: badgeEmerald },
  { label: "Certification Centre", href: "/dashboard/platform/certification", icon: ShieldCheck, badge: "CERTIFIED", badgeColor: badgeEmerald },
  { label: "Marketplace Governance", href: "/dashboard/platform/marketplace-governance", icon: ShieldCheck, badge: "GOVERN", badgeColor: badgeGold },
  { label: "Marketplace Finance", href: "/dashboard/platform/marketplace-finance", icon: CreditCard, badge: "REV", badgeColor: badgeEmerald },
];

const digitalTransformationItems = [
  { label: "Enterprise CRM", href: "/dashboard/platform/crm", icon: Users, badge: "CRM", badgeColor: badgeGold },
  { label: "Transformation Pipeline", href: "/dashboard/platform/pipeline", icon: TrendingUp, badge: "DEALS", badgeColor: badgeEmerald },
  { label: "Implementation Centre", href: "/dashboard/platform/implementation", icon: Layers, badge: "DEPLOY", badgeColor: badgeSlate },
  { label: "Sales Intelligence", href: "/dashboard/platform/sales-intelligence", icon: BarChart3, badge: "KPI", badgeColor: badgeEmerald },
  { label: "Proposal Centre", href: "/dashboard/platform/proposals", icon: Store, badge: "SOW", badgeColor: badgeGold },
  { label: "Maturity Assessment", href: "/dashboard/platform/assessment", icon: Compass, badge: "ASSESS", badgeColor: badgeEmerald },
  { label: "Africa Expansion", href: "/dashboard/platform/africa", icon: Globe, badge: "AFRICA", badgeColor: badgeEmerald },
  { label: "Customer Success Ops", href: "/dashboard/platform/customer-success", icon: HeartPulse, badge: "NPS", badgeColor: badgeEmerald },
];

const skillsIntelligenceItems = [
  { label: "Africa Workforce", href: "/dashboard/platform/workforce", icon: Globe, badge: "AFRICA", badgeColor: badgeGold },
  { label: "Skills Marketplace", href: "/dashboard/platform/skills-market", icon: Store, badge: "SKILLS", badgeColor: badgeEmerald },
];

export default function PlatformSidebar({ mobileOpen, setMobileOpen }: PlatformSidebarProps) {
  const pathname = usePathname();

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white text-[#0F172A] border-r border-slate-200 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#0F172A] p-0.5 shadow-md flex items-center justify-center shrink-0">
            <Globe className="w-5 h-5 text-[#15803D]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black tracking-wider text-[#0F172A] uppercase">InstitutionOS</span>
              <span className="px-1.5 py-0.5 rounded bg-[#F0FDF4] text-[#15803D] text-[8px] font-black tracking-widest border border-[#15803D]/20">v5.0</span>
            </div>
            <p className="text-[10px] font-extrabold text-[#15803D] tracking-tight">Platform Command Centre</p>
            <p className="text-[9px] text-slate-500">Digital World Systems Africa</p>
          </div>
        </div>
        {mobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-xl text-slate-400 hover:text-[#0F172A] hover:bg-slate-100 transition-all"
            aria-label="Close platform navigation"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {/* Core Section */}
        <div className="space-y-1">
          <div className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
            Super Admin Console
          </div>
          {coreNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#15803D] text-white font-bold shadow-sm"
                    : "text-slate-600 hover:text-[#15803D] hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-black tracking-wider ${isActive ? "bg-white/20 text-white" : item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Commercial Operations Section */}
        <div className="space-y-1">
          <div className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#D4A017]">
            Commercial Operations
          </div>
          {commercialNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#15803D] text-white font-bold shadow-sm"
                    : "text-slate-600 hover:text-[#15803D] hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-black tracking-wider ${isActive ? "bg-white/20 text-white" : item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* AI Digital Workforce Section */}
        <div className="space-y-1">
          <div className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#15803D]">
            AI Digital Workforce
          </div>
          {aiWorkforceNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#15803D] text-white font-bold shadow-sm"
                    : "text-slate-600 hover:text-[#15803D] hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-[#15803D]"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-black tracking-wider ${isActive ? "bg-white/20 text-white" : item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Digital Transformation Section */}
        <div className="space-y-1">
          <div className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#D4A017]">
            Digital Transformation &amp; CRM
          </div>
          {digitalTransformationItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#15803D] text-white font-bold shadow-sm"
                    : "text-slate-600 hover:text-[#15803D] hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-black tracking-wider ${isActive ? "bg-white/20 text-white" : item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Marketplace Ecosystem Section */}
        <div className="space-y-1">
          <div className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-slate-400">
            Marketplace Ecosystem
          </div>
          {marketplaceEcosystemItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#15803D] text-white font-bold shadow-sm"
                    : "text-slate-600 hover:text-[#15803D] hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-black tracking-wider ${isActive ? "bg-white/20 text-white" : item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* EIP Section */}
        <div className="space-y-1">
          <div className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#15803D]">
            Enterprise Integration Platform
          </div>
          {eipNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#15803D] text-white font-bold shadow-sm"
                    : "text-slate-600 hover:text-[#15803D] hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-black tracking-wider ${isActive ? "bg-white/20 text-white" : item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Skills Intelligence Section */}
        <div className="space-y-1">
          <div className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#D4A017]">
            Skills Intelligence
          </div>
          {skillsIntelligenceItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? "bg-[#15803D] text-white font-bold shadow-sm"
                    : "text-slate-600 hover:text-[#15803D] hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-black tracking-wider ${isActive ? "bg-white/20 text-white" : item.badgeColor}`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer Return Link */}
      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <Link
          href="/dashboard/admin"
          className="flex items-center gap-2 text-xs font-bold text-slate-600 hover:text-[#15803D] transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-[#15803D]" />
          <span>Switch to Executive ICC</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 h-screen sticky top-0 shrink-0 z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-y-0 left-0 w-72 z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <SidebarContent />
      </div>
    </>
  );
}
