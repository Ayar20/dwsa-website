"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Building2, LayoutDashboard, Compass, Activity, Bell,
  GraduationCap, BookOpen, Layers, Users, Calendar, UserCheck,
  UserPlus, FileCheck, Award, Briefcase, FileText, FlaskConical,
  DollarSign, CreditCard, PieChart, Lightbulb, Shield,
  Settings, Cpu, ChevronDown, ChevronRight, X, Sparkles, SlidersHorizontal,
  GitBranch, HelpCircle, FileCode, CheckCircle2, ShieldCheck, Lock, Database,
  Zap, Mail
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
      { label: "Digital Twin & Intelligence", href: "/dashboard/admin/intelligence", badge: "AI", badgeColor: "bg-[#d4a017]/20 text-[#d4a017]" },
      { label: "Persistent Analytics", href: "/dashboard/admin/analytics", badge: "Snapshots", badgeColor: "bg-[#4ade80]/20 text-[#4ade80]" },
      { label: "Executive Reports", href: "/dashboard/admin/reports" },
    ],
  },
  {
    title: "Academic Operations",
    icon: GraduationCap,
    items: [
      { label: "Academic Operations", href: "/dashboard/admin/academic" },
      { label: "Module & Track Editor", href: "/dashboard/admin/modules/editor" },
      { label: "Student Success Centre", href: "/dashboard/admin/students" },
    ],
  },
  {
    title: "Admissions & Registry",
    icon: UserPlus,
    items: [
      { label: "Admissions Command", href: "/dashboard/admin/admissions", badge: "Live Pipeline", badgeColor: "bg-[#4ade80]/20 text-[#4ade80]" },
      { label: "Certificate Authority", href: "/dashboard/admin/certificates" },
    ],
  },
  {
    title: "Faculty Administration",
    icon: Users,
    items: [
      { label: "Faculty Management", href: "/dashboard/admin/faculty" },
    ],
  },
  {
    title: "Finance & Business Intelligence",
    icon: DollarSign,
    items: [
      { label: "Financial ERP & Ledger", href: "/dashboard/admin/finance", badge: "ERP Core", badgeColor: "bg-[#4ade80]/20 text-[#4ade80]" },
    ],
  },
  {
    title: "Research & Innovation",
    icon: FlaskConical,
    items: [
      { label: "Research & Innovation", href: "/dashboard/admin/research" },
    ],
  },
  {
    title: "Governance & Compliance",
    icon: ShieldCheck,
    items: [
      { label: "Governance & Audit", href: "/dashboard/admin/governance" },
    ],
  },
  {
    title: "Enterprise Engagement",
    icon: Users,
    items: [
      { label: "Industry Partners Centre", href: "/dashboard/admin/partners", badge: "NEW", badgeColor: "bg-[#d4a017]/20 text-[#d4a017]" },
      { label: "Employment Intelligence", href: "/dashboard/admin/employment", badge: "NEW", badgeColor: "bg-[#4ade80]/20 text-[#4ade80]" },
      { label: "Employer Portal", href: "/dashboard/employer" },
      { label: "Alumni Network", href: "/dashboard/alumni" },
    ],
  },
  {
    title: "Operational Intelligence",
    icon: Zap,
    items: [
      { label: "Executive AI Advisory", href: "/dashboard/admin/ai", badge: "AI CORE", badgeColor: "bg-[#d4a017]/20 text-[#d4a017]" },
      { label: "AI Governance & Controls", href: "/dashboard/admin/ai-governance", badge: "POLICY", badgeColor: "bg-[#818cf8]/20 text-[#818cf8]" },
      { label: "Automation Centre", href: "/dashboard/admin/automation", badge: "ENGINE", badgeColor: "bg-[#818cf8]/20 text-[#818cf8]" },
      { label: "Communications Hub", href: "/dashboard/admin/communications", badge: "BROADCAST", badgeColor: "bg-[#d4a017]/20 text-[#d4a017]" },
      { label: "Executive Approvals", href: "/dashboard/admin/approvals", badge: "SIGN", badgeColor: "bg-[#4ade80]/20 text-[#4ade80]" },
      { label: "Quality Assurance", href: "/dashboard/admin/quality" },
      { label: "Knowledge Centre", href: "/dashboard/admin/knowledge" },
      { label: "Operations Inbox", href: "/dashboard/admin/inbox" },
    ],
  },
  {
    title: "Institution Settings",
    icon: Settings,
    items: [
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
    <div className="flex flex-col h-full bg-[#061428] text-[#f0f4ff] border-r border-[#d4a017]/20 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#1a2f4a] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#d4a017] to-[#b8891a] p-0.5 shadow-lg shadow-[#d4a017]/10 flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-[#030e1f] rounded-[14px] flex items-center justify-center">
              <Building2 className="w-5 h-5 text-[#d4a017]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black tracking-wider text-white uppercase">DTA Academy</span>
              <span className="px-1.5 py-0.5 rounded bg-[#d4a017]/15 text-[#d4a017] text-[8px] font-black tracking-widest border border-[#d4a017]/30">ICC</span>
            </div>
            <p className="text-[10px] font-extrabold text-[#d4a017] tracking-tight">Institution Control Centre</p>
            <p className="text-[9px] text-[#8899b4]">Powered by InstitutionOS v3.2</p>
          </div>
        </div>
        {mobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-xl text-[#8899b4] hover:text-white hover:bg-[#0f223d] transition-all"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 custom-scrollbar">
        {navSections.map((section) => {
          const SectionIcon = section.icon;
          const isCollapsed = collapsedSections[section.title];
          const hasActiveChild = section.items.some(
            (item) => pathname === item.href || (item.href !== "/dashboard/admin" && pathname.startsWith(item.href))
          );

          return (
            <div key={section.title} className="space-y-1">
              <button
                onClick={() => toggleSection(section.title)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all ${
                  hasActiveChild ? "text-[#d4a017]" : "text-[#8899b4] hover:text-white"
                }`}
              >
                <div className="flex items-center gap-2">
                  <SectionIcon className={`w-3.5 h-3.5 ${hasActiveChild ? "text-[#d4a017]" : "text-[#8899b4]"}`} />
                  <span>{section.title}</span>
                </div>
                {isCollapsed ? (
                  <ChevronRight className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>

              {!isCollapsed && (
                <div className="ml-3 pl-3 border-l border-[#1a2f4a] space-y-1 mt-1">
                  {section.items.map((item) => {
                    const isActive =
                      pathname === item.href || (item.href !== "/dashboard/admin" && pathname.startsWith(item.href));
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] ${
                          isActive
                            ? "bg-[#d4a017]/15 text-[#d4a017] border border-[#d4a017]/30 font-bold"
                            : "text-[#8899b4] hover:text-white hover:bg-[#0f223d]/60"
                        }`}
                      >
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span className={`px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-wider shrink-0 ${item.badgeColor || "bg-[#030e1f] text-[#8899b4]"}`}>
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

        {/* InstitutionOS Foundation Indicator */}
        <div className="pt-4 mt-6 border-t border-[#1a2f4a] px-3">
          <div className="rounded-2xl bg-[#030e1f] border border-[#d4a017]/25 p-3.5 space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#d4a017]" />
              <span className="text-[10px] font-black text-white tracking-wider uppercase">InstitutionOS Multi-Tenant</span>
            </div>
            <p className="text-[10px] text-[#8899b4] leading-relaxed">
              Enterprise Multi-Tenant Operating System architecture ready for polytechnics, universities, and corporate academies.
            </p>
            <div className="flex items-center gap-1.5 pt-1 text-[9px] font-black text-[#4ade80]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
              SYSTEM ACTIVE · ALL MODULES READY
            </div>
          </div>
        </div>
      </div>

      {/* Executive Footer */}
      <div className="p-4 border-t border-[#1a2f4a] bg-[#030e1f]/50">
        <div className="flex items-center justify-between text-[10px] text-[#8899b4]">
          <span className="font-bold text-white">Digital World Systems Africa</span>
          <span className="text-[#d4a017] font-black">v3.2A Executive</span>
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
          className="fixed inset-0 bg-[#030e1f]/80 backdrop-blur-sm z-40 lg:hidden"
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
