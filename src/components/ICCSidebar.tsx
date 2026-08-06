"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  DollarSign,
  GraduationCap,
  Users,
  Layers,
  Settings,
  ShieldCheck,
  Building2,
  ChevronDown,
  ChevronRight,
  Sparkles,
  X,
} from "lucide-react";

interface ICCSidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

interface NavSection {
  title: string;
  icon: React.ElementType;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    title: "Executive Overview",
    icon: LayoutDashboard,
    items: [
      { label: "Executive Dashboard", href: "/dashboard/admin" },
      { label: "Apex — Executive AI Agent", href: "/dashboard/admin/ai-executive", badge: "v5.2" },
      { label: "Executive AI Hub", href: "/dashboard/admin/ai", badge: "AI" },
      { label: "Strategic Intelligence", href: "/dashboard/admin/intelligence" },
      { label: "Executive Reports", href: "/dashboard/admin/reports" },
      { label: "Persistent Analytics", href: "/dashboard/admin/analytics" },
    ],
  },
  {
    title: "Academic & Student Governance",
    icon: GraduationCap,
    items: [
      { label: "Learning Analytics", href: "/dashboard/admin/academic" },
      { label: "Admissions Command", href: "/dashboard/admin/admissions" },
      { label: "Student Success Centre", href: "/dashboard/admin/students" },
      { label: "Faculty Management", href: "/dashboard/admin/faculty" },
      { label: "Module & Track Editor", href: "/dashboard/admin/modules/editor" },
      { label: "Certificate Authority", href: "/dashboard/admin/certificates" },
      { label: "Research & Innovation", href: "/dashboard/admin/research" },
    ],
  },
  {
    title: "Finance & Market Intelligence",
    icon: DollarSign,
    items: [
      { label: "Financial ERP & BI", href: "/dashboard/admin/finance", badge: "ERP" },
      { label: "Industry Partnerships", href: "/dashboard/admin/partners" },
      { label: "Graduate Employment", href: "/dashboard/admin/employment" },
      { label: "Workforce Intelligence", href: "/dashboard/admin/workforce" },
      { label: "Skills Intelligence", href: "/dashboard/admin/skills" },
    ],
  },
  {
    title: "Operations & Governance",
    icon: Layers,
    items: [
      { label: "Platform Health", href: "/dashboard/admin/operations" },
      { label: "Deployment Inspector", href: "/dashboard/admin/deployment" },
      { label: "Performance Benchmarks", href: "/dashboard/admin/benchmarks" },
      { label: "Governance & Compliance", href: "/dashboard/admin/governance" },
      { label: "AI Governance & Controls", href: "/dashboard/admin/ai-governance", badge: "POLICY" },
      { label: "Automation Centre", href: "/dashboard/admin/automation" },
      { label: "Communications Hub", href: "/dashboard/admin/communications" },
      { label: "Executive Approvals", href: "/dashboard/admin/approvals", badge: "SIGN" },
      { label: "Quality Assurance", href: "/dashboard/admin/quality" },
      { label: "Knowledge Centre", href: "/dashboard/admin/knowledge" },
      { label: "Operations Inbox", href: "/dashboard/admin/inbox" },
    ],
  },
  {
    title: "AI Digital Workforce",
    icon: Sparkles,
    items: [
      { label: "Pulse — Admin AI Agent", href: "/dashboard/admin/ai-agent", badge: "v5.2" },
      { label: "Apex — Executive AI Agent", href: "/dashboard/admin/ai-executive", badge: "v5.2" },
      { label: "Executive Integrations", href: "/dashboard/admin/integrations", badge: "EIP" },
      { label: "AI Workforce Registry", href: "/dashboard/platform/ai-workforce" },
    ],
  },
  {
    title: "Institution Settings",
    icon: Settings,
    items: [
      { label: "Platform Administration", href: "/dashboard/admin/platform", badge: "SaaS" },
      { label: "System & Campus Settings", href: "/dashboard/admin/settings" },
    ],
  },
];

export default function ICCSidebar({ mobileOpen, setMobileOpen }: ICCSidebarProps) {
  const pathname = usePathname();
  const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (title: string) => {
    setCollapsedSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#15803D] text-white select-none">
      {/* Brand Header */}
      <div className="px-4 py-5 border-b border-[#166534] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-md">
            <Building2 className="w-4.5 h-4.5 text-[#15803D]" aria-hidden="true" />
          </div>
          <div>
            <span className="text-[10px] font-black tracking-widest text-white/70 uppercase block leading-none">
              INSTITUTION CONTROL
            </span>
            <span className="text-[11px] font-extrabold text-white tracking-tight block">
              Executive Centre
            </span>
            <span className="text-[9px] text-white/60 tracking-wide">InstitutionOS v5.2</span>
          </div>
        </div>
        {mobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label="Close ICC navigation"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Navigation Sections */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-4" aria-label="ICC navigation">
        {navSections.map((section) => {
          const SectionIcon = section.icon;
          const isCollapsed = collapsedSections[section.title];
          const hasActiveChild = section.items.some((item) => pathname === item.href);

          return (
            <div key={section.title} className="space-y-0.5">
              <button
                onClick={() => toggleSection(section.title)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
                  hasActiveChild
                    ? "text-white bg-white/15"
                    : "text-white/60 hover:text-white hover:bg-white/10"
                }`}
                aria-expanded={!isCollapsed}
              >
                <div className="flex items-center gap-2">
                  <SectionIcon
                    className={`w-3.5 h-3.5 ${hasActiveChild ? "text-white" : "text-white/60"}`}
                    aria-hidden="true"
                  />
                  <span>{section.title}</span>
                </div>
                {isCollapsed ? (
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" aria-hidden="true" />
                )}
              </button>

              {!isCollapsed && (
                <ul className="space-y-0.5 pl-2" role="list">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
                            isActive
                              ? "bg-white/20 text-white font-bold border-l-4 border-white pl-2.5"
                              : "text-white/80 hover:text-white hover:bg-white/10"
                          }`}
                          aria-current={isActive ? "page" : undefined}
                        >
                          <span className="truncate">{item.label}</span>
                          {item.badge && (
                            <span
                              className={`px-1.5 py-0.5 rounded text-[9px] font-black tracking-wider ${
                                isActive
                                  ? "bg-white/20 text-white"
                                  : "bg-white/15 text-white/90"
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          );
        })}

        {/* System Status Pill */}
        <div className="pt-2">
          <div className="p-3 rounded-2xl bg-[#166534] border border-white/20">
            <div className="flex items-center gap-2 text-[10px] font-extrabold text-white">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" aria-hidden="true" />
              SYSTEM ACTIVE · ALL MODULES READY
            </div>
          </div>
        </div>
      </nav>

      {/* Executive Footer */}
      <div className="px-4 py-3 border-t border-[#166534]">
        <div className="flex items-center justify-between text-[10px]">
          <span className="font-bold text-white/80">Digital World Systems Africa</span>
          <span className="font-black text-white/60">ICC v5.2</span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 h-screen sticky top-0 shrink-0 z-30" aria-label="ICC navigation">
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
        aria-label="ICC navigation drawer"
      >
        <SidebarContent />
      </div>
    </>
  );
}
