"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Globe, Building2, UserPlus, BarChart3, Store, ShieldCheck,
  Cpu, Layers, Sparkles, X, ArrowLeft, Activity,
  Users, CreditCard, HeartPulse, CheckCircle2, Zap, Terminal, Database,
  Compass, TrendingUp,
} from "lucide-react";

interface PlatformSidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
  badge?: string;
}

const coreNavItems: NavItem[] = [
  { label: "Platform Overview", href: "/dashboard/platform", icon: Globe, badge: "CORE" },
  { label: "Tenant Registry", href: "/dashboard/platform/tenants", icon: Building2, badge: "TENANTS" },
  { label: "Provision Institution", href: "/dashboard/platform/provision", icon: UserPlus, badge: "WIZARD" },
  { label: "Platform Analytics", href: "/dashboard/platform/analytics", icon: BarChart3, badge: "GLOBAL" },
];

const commercialNavItems: NavItem[] = [
  { label: "Enterprise Marketplace", href: "/dashboard/platform/marketplace", icon: Store, badge: "v5.2" },
  { label: "Customer Success", href: "/dashboard/platform/customers", icon: Users, badge: "CRM" },
  { label: "Subscriptions & MRR", href: "/dashboard/platform/subscriptions", icon: CreditCard, badge: "MRR" },
  { label: "Customer Onboarding", href: "/dashboard/platform/onboarding", icon: CheckCircle2, badge: "WIZARD" },
  { label: "Tenant Health Monitoring", href: "/dashboard/platform/health", icon: HeartPulse, badge: "LIVE" },
];

const aiWorkforceNavItems: NavItem[] = [
  { label: "AI Workforce Registry", href: "/dashboard/platform/ai-workforce", icon: Sparkles, badge: "v5.2" },
  { label: "Atlas — Platform Agent", href: "/dashboard/platform/ai-agent", icon: Cpu, badge: "LIVE" },
];

const eipNavItems: NavItem[] = [
  { label: "Enterprise Integrations", href: "/dashboard/platform/integrations", icon: Zap, badge: "EIP" },
  { label: "Integration Intelligence", href: "/dashboard/platform/integration-intelligence", icon: Activity, badge: "HEALTH" },
  { label: "Deployment Templates", href: "/dashboard/platform/templates", icon: Layers, badge: "BUNDLES" },
  { label: "API Developer Centre", href: "/dashboard/platform/developers", icon: Terminal, badge: "REST" },
  { label: "Data Exchange & ETL", href: "/dashboard/platform/data-exchange", icon: Database, badge: "ETL" },
  { label: "Digital Partner Network", href: "/dashboard/platform/partners", icon: Users, badge: "ALLIANCE" },
];

const marketplaceEcosystemItems: NavItem[] = [
  { label: "Enterprise Marketplace", href: "/dashboard/platform/ecosystem", icon: Store, badge: "v5.2" },
  { label: "AI Agent Exchange", href: "/dashboard/platform/ai-marketplace", icon: Sparkles, badge: "AGENTS" },
  { label: "Partner Developer Portal", href: "/dashboard/platform/developers/partners", icon: Cpu, badge: "SDK" },
  { label: "Marketplace Intelligence", href: "/dashboard/platform/marketplace-intelligence", icon: BarChart3, badge: "GMV" },
  { label: "Certification Centre", href: "/dashboard/platform/certification", icon: ShieldCheck, badge: "CERTIFIED" },
  { label: "Marketplace Governance", href: "/dashboard/platform/marketplace-governance", icon: ShieldCheck, badge: "GOVERN" },
  { label: "Marketplace Finance", href: "/dashboard/platform/marketplace-finance", icon: CreditCard, badge: "REV" },
];

const digitalTransformationItems: NavItem[] = [
  { label: "Enterprise CRM", href: "/dashboard/platform/crm", icon: Users, badge: "CRM" },
  { label: "Transformation Pipeline", href: "/dashboard/platform/pipeline", icon: TrendingUp, badge: "DEALS" },
  { label: "Implementation Centre", href: "/dashboard/platform/implementation", icon: Layers, badge: "DEPLOY" },
  { label: "Sales Intelligence", href: "/dashboard/platform/sales-intelligence", icon: BarChart3, badge: "KPI" },
  { label: "Proposal Centre", href: "/dashboard/platform/proposals", icon: Store, badge: "SOW" },
  { label: "Maturity Assessment", href: "/dashboard/platform/assessment", icon: Compass, badge: "ASSESS" },
  { label: "Africa Expansion", href: "/dashboard/platform/africa", icon: Globe, badge: "AFRICA" },
  { label: "Customer Success Ops", href: "/dashboard/platform/customer-success", icon: HeartPulse, badge: "NPS" },
];

const skillsIntelligenceItems: NavItem[] = [
  { label: "Africa Workforce", href: "/dashboard/platform/workforce", icon: Globe, badge: "AFRICA" },
  { label: "Skills Marketplace", href: "/dashboard/platform/skills-market", icon: Store, badge: "SKILLS" },
];

const ALL_SECTIONS: { label: string; items: NavItem[] }[] = [
  { label: "Super Admin Console", items: coreNavItems },
  { label: "Commercial Operations", items: commercialNavItems },
  { label: "AI Digital Workforce", items: aiWorkforceNavItems },
  { label: "Digital Transformation & CRM", items: digitalTransformationItems },
  { label: "Marketplace Ecosystem", items: marketplaceEcosystemItems },
  { label: "Enterprise Integration Platform", items: eipNavItems },
  { label: "Skills Intelligence", items: skillsIntelligenceItems },
];

function NavSection({ label, items, pathname, setMobileOpen }: {
  label: string;
  items: NavItem[];
  pathname: string;
  setMobileOpen: (open: boolean) => void;
}) {
  return (
    <div className="space-y-0.5">
      <div className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white/60">
        {label}
      </div>
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
              isActive
                ? "bg-white/20 text-white font-bold border-l-4 border-white pl-2.5"
                : "text-white/80 hover:text-white hover:bg-white/10"
            }`}
            aria-current={isActive ? "page" : undefined}
          >
            <div className="flex items-center gap-2.5">
              <Icon
                className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-white/60"}`}
                aria-hidden="true"
              />
              <span className="truncate">{item.label}</span>
            </div>
            {item.badge && (
              <span
                className={`px-1.5 py-0.5 rounded text-[9px] font-black tracking-wider shrink-0 ${
                  isActive ? "bg-white/20 text-white" : "bg-white/15 text-white/90"
                }`}
              >
                {item.badge}
              </span>
            )}
          </Link>
        );
      })}
    </div>
  );
}

export default function PlatformSidebar({ mobileOpen, setMobileOpen }: PlatformSidebarProps) {
  const pathname = usePathname();

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#15803D] text-white select-none">
      {/* Brand Header */}
      <div className="px-4 py-5 border-b border-[#166534] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-md">
            <Globe className="w-4.5 h-4.5 text-[#15803D]" aria-hidden="true" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-black tracking-widest text-white/70 uppercase">InstitutionOS</span>
              <span className="px-1.5 py-0.5 rounded bg-white/20 text-white text-[8px] font-black tracking-widest">v5.2</span>
            </div>
            <p className="text-[11px] font-extrabold text-white tracking-tight">Platform Command Centre</p>
            <p className="text-[9px] text-white/60">Digital World Systems Africa</p>
          </div>
        </div>
        {mobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label="Close platform navigation"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-5" aria-label="Platform navigation">
        {ALL_SECTIONS.map((section) => (
          <NavSection
            key={section.label}
            label={section.label}
            items={section.items}
            pathname={pathname}
            setMobileOpen={setMobileOpen}
          />
        ))}
      </nav>

      {/* Footer Return Link */}
      <div className="px-4 py-3 border-t border-[#166534]">
        <Link
          href="/dashboard/admin"
          className="flex items-center gap-2 text-xs font-bold text-white/70 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        >
          <ArrowLeft className="w-4 h-4" aria-hidden="true" />
          <span>Switch to Executive ICC</span>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 h-screen sticky top-0 shrink-0 z-30" aria-label="Platform Command Centre navigation">
        <SidebarContent />
      </aside>

      {/* Mobile Backdrop */}
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
        aria-label="Platform navigation drawer"
      >
        <SidebarContent />
      </div>
    </>
  );
}
