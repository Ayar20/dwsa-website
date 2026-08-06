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
  Briefcase,
  Layers,
  Settings,
  ShieldCheck,
  Building2,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Sparkles,
  FileCheck2,
  Lock,
} from "lucide-react";

interface ICCSidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

interface NavItem {
  label: string;
  href: string;
  badge?: string;
  badgeColor?: string;
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
      { label: "Apex — Executive AI Agent", href: "/dashboard/admin/ai-executive", badge: "v5.0", badgeColor: "bg-[#FEFCE8] text-[#D4A017] border border-[#D4A017]/30" },
      { label: "Executive AI Hub", href: "/dashboard/admin/ai", badge: "AI CORE", badgeColor: "bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20" },
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
      { label: "Financial ERP & BI", href: "/dashboard/admin/finance", badge: "ERP", badgeColor: "bg-[#FEFCE8] text-[#D4A017] border border-[#D4A017]/30" },
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
      { label: "AI Governance & Controls", href: "/dashboard/admin/ai-governance", badge: "POLICY", badgeColor: "bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20" },
      { label: "Automation Centre", href: "/dashboard/admin/automation" },
      { label: "Communications Hub", href: "/dashboard/admin/communications" },
      { label: "Executive Approvals", href: "/dashboard/admin/approvals", badge: "SIGN", badgeColor: "bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20" },
      { label: "Quality Assurance", href: "/dashboard/admin/quality" },
      { label: "Knowledge Centre", href: "/dashboard/admin/knowledge" },
      { label: "Operations Inbox", href: "/dashboard/admin/inbox" },
    ],
  },
  {
    title: "AI Digital Workforce & Integrations",
    icon: Sparkles,
    items: [
      { label: "Pulse — Admin AI Agent", href: "/dashboard/admin/ai-agent", badge: "v5.0", badgeColor: "bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20" },
      { label: "Apex — Executive AI Agent", href: "/dashboard/admin/ai-executive", badge: "v5.0", badgeColor: "bg-[#FEFCE8] text-[#D4A017] border border-[#D4A017]/30" },
      { label: "Executive Integrations", href: "/dashboard/admin/integrations", badge: "96.4%", badgeColor: "bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20" },
      { label: "AI Workforce Registry", href: "/dashboard/platform/ai-workforce" },
    ],
  },
  {
    title: "Institution Settings",
    icon: Settings,
    items: [
      { label: "Platform Administration", href: "/dashboard/admin/platform", badge: "SaaS", badgeColor: "bg-[#FEFCE8] text-[#D4A017] border border-[#D4A017]/30" },
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
    <div className="flex flex-col h-full bg-white text-[#0F172A] border-r border-slate-200 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#0F172A] p-0.5 shadow-md flex items-center justify-center shrink-0">
            <Building2 className="w-5 h-5 text-[#D4A017]" />
          </div>
          <div>
            <span className="text-[10px] font-black tracking-widest text-[#D4A017] uppercase block leading-none">
              INSTITUTION CONTROL
            </span>
            <span className="text-sm font-black text-[#0F172A] tracking-tight block">
              Executive Centre
            </span>
          </div>
        </div>
        <span className="px-2 py-0.5 rounded-md bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] text-[9px] font-black uppercase">
          v5.0 ICC
        </span>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">
        {navSections.map((section) => {
          const SectionIcon = section.icon;
          const isCollapsed = collapsedSections[section.title];
          const hasActiveChild = section.items.some((item) => pathname === item.href);

          return (
            <div key={section.title} className="space-y-1">
              <button
                onClick={() => toggleSection(section.title)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[11px] font-black uppercase tracking-wider transition-colors ${
                  hasActiveChild
                    ? "text-[#15803D] bg-[#F0FDF4]/50"
                    : "text-slate-400 hover:text-[#0F172A]"
                }`}
              >
                <div className="flex items-center gap-2">
                  <SectionIcon className={`w-3.5 h-3.5 ${hasActiveChild ? "text-[#15803D]" : "text-slate-400"}`} />
                  <span>{section.title}</span>
                </div>
                {isCollapsed ? (
                  <ChevronRight className="w-3.5 h-3.5 opacity-60" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                )}
              </button>

              {!isCollapsed && (
                <div className="space-y-0.5 pl-2">
                  {section.items.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                          isActive
                            ? "bg-[#15803D] text-white font-bold shadow-sm"
                            : "text-slate-600 hover:text-[#15803D] hover:bg-slate-50"
                        }`}
                      >
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span
                            className={`px-1.5 py-0.5 rounded text-[9px] font-black tracking-wider ${
                              isActive
                                ? "bg-white/20 text-white"
                                : item.badgeColor || "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}

        {/* System Active Status Pill */}
        <div className="pt-2">
          <div className="p-3 rounded-2xl bg-[#F8FAFC] border border-slate-200">
            <div className="flex items-center gap-2 text-[10px] font-extrabold text-[#15803D]">
              <span className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse" />
              SYSTEM ACTIVE · ALL MODULES READY
            </div>
          </div>
        </div>
      </div>

      {/* Executive Footer */}
      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <div className="flex items-center justify-between text-[10px]">
          <span className="font-bold text-[#0F172A]">Digital World Systems Africa</span>
          <span className="text-[#D4A017] font-black">v5.0 Executive</span>
        </div>
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
