"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  Home,
  Users,
  BookOpen,
  Video,
  ClipboardCheck,
  UserCheck,
  GitPullRequest,
  CalendarCheck,
  BarChart3,
  FileEdit,
  Library,
  ClipboardList,
  Megaphone,
  FlaskConical,
  Lightbulb,
  Globe,
  UserCircle,
  Settings,
  HelpCircle,
  LogOut,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  ShieldCheck,
  Award,
  BookMarked,
  Mail,
} from "lucide-react";

interface FacultySidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export default function FacultySidebar({ mobileOpen, setMobileOpen }: FacultySidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);

  const navSections = [
    {
      title: "ACADEMIC OPERATIONS",
      items: [
        { href: "/dashboard/instructor", label: "Faculty Home", icon: Home },
        { href: "/dashboard/instructor/ai", label: "Faculty AI Assistant", icon: Sparkles },
        { href: "/dashboard/instructor/ai-agent", label: "Sage — AI Agent", icon: Sparkles },
        { href: "/dashboard/instructor/integrations", label: "Integrations Hub", icon: Sparkles },
        { href: "/dashboard/instructor/inbox", label: "Faculty Inbox", icon: Mail },
        { href: "/dashboard/instructor/cohorts", label: "My Cohorts", icon: Users },
        { href: "/dashboard/instructor/lessons", label: "Teaching Modules", icon: BookOpen },
        { href: "/dashboard/instructor/cohorts#live-classes", label: "Live Classes", icon: Video },
        { href: "/dashboard/instructor/assessments", label: "Assessments", icon: ClipboardCheck },
      ],
    },
    {
      title: "LEARNER MANAGEMENT",
      items: [
        { href: "/dashboard/instructor/learners", label: "Learners", icon: UserCheck },
        { href: "/dashboard/instructor/github-reviews", label: "GitHub Reviews", icon: GitPullRequest },
        { href: "/dashboard/instructor/learners#attendance", label: "Attendance", icon: CalendarCheck },
        { href: "/dashboard/instructor/learners#analytics", label: "Performance Analytics", icon: BarChart3 },
      ],
    },
    {
      title: "ACADEMIC CONTENT",
      items: [
        { href: "/dashboard/instructor/lessons", label: "Lesson Manager", icon: FileEdit },
        { href: "/dashboard/instructor/lessons#vault", label: "Resource Vault", icon: Library },
        { href: "/dashboard/admin/knowledge", label: "Teaching Resources", icon: BookOpen },
        { href: "/dashboard/instructor/assessments#assignments", label: "Assignments", icon: ClipboardList },
        { href: "/dashboard/instructor/announcements", label: "Announcements", icon: Megaphone },
        { href: "/dashboard/instructor/skills", label: "Skills Intelligence", icon: BarChart3 },
        { href: "/dashboard/instructor/pathways", label: "Programme Skills Mapping", icon: ShieldCheck },
        { href: "/dashboard/instructor/competencies", label: "Competency Validation", icon: ShieldCheck },
      ],
    },
    {
      title: "PROFESSIONAL DEVELOPMENT",
      items: [
        { href: "/dashboard/instructor/profile#research", label: "Research", icon: FlaskConical },
        { href: "/innovation", label: "Innovation Centre", icon: Lightbulb },
        { href: "/dashboard/instructor/profile#recognition", label: "Faculty Recognition", icon: Award },
      ],
    },
    {
      title: "INDUSTRY & ENGAGEMENT",
      items: [
        { href: "/dashboard/mentor", label: "Mentoring Hub", icon: UserCheck },
        { href: "/dashboard/student/innovation-marketplace", label: "Innovation Marketplace", icon: Lightbulb },
        { href: "https://www.skool.com/digital-wealth-systems-africa-6803/", label: "Faculty Community", icon: Globe, external: true },
      ],
    },
    {
      title: "ACCOUNT",
      items: [
        { href: "/dashboard/instructor/profile", label: "Faculty Profile", icon: UserCircle },
        { href: "/dashboard/instructor/profile#settings", label: "Settings", icon: Settings },
        { href: "https://wa.me/2347082135071", label: "Support Desk", icon: HelpCircle, external: true },
      ],
    },
  ];

  const sidebarWidth = collapsed ? "w-20" : "w-64";

  const isActive = (href: string) => {
    if (href.includes("#")) return pathname === href.split("#")[0];
    return pathname === href;
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#15803D] text-white select-none">
      {/* Logo / Branding */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-[#166534] ${collapsed ? "justify-center" : ""}`}>
        <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-md">
          <BookMarked className="w-4.5 h-4.5 text-[#15803D]" aria-hidden="true" />
        </div>
        {!collapsed && (
          <div>
            <div className="text-[10px] font-black text-white/70 tracking-widest uppercase leading-none">DTA</div>
            <div className="text-[11px] font-extrabold text-white leading-tight">Faculty Workspace</div>
            <div className="text-[9px] text-white/60 tracking-wide">InstitutionOS v5.2</div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-5" aria-label="Faculty navigation">
        {navSections.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <p className="px-2 pb-1.5 text-[9px] font-black text-white/60 tracking-[0.15em] uppercase">
                {section.title}
              </p>
            )}
            <ul className="space-y-0.5" role="list">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                const linkProps = (item as any).external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {};
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      {...linkProps}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${
                        active
                          ? "bg-white/20 text-white font-bold border-l-4 border-white pl-2.5"
                          : "text-white/80 hover:text-white hover:bg-white/10 border border-transparent"
                      } ${collapsed ? "justify-center" : ""}`}
                      aria-current={active ? "page" : undefined}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon
                        className={`shrink-0 transition-colors ${collapsed ? "w-5 h-5" : "w-4 h-4"} ${
                          active ? "text-white" : "text-white/70 group-hover:text-white"
                        }`}
                        aria-hidden="true"
                      />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                      {!collapsed && active && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-white shrink-0" aria-hidden="true" />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* DTA Faculty AI Assistant Slot */}
      <div className="px-3 py-3 border-t border-[#166534]">
        {!collapsed ? (
          <div className="rounded-2xl bg-[#166534] border border-white/20 p-3">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-white/20 flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-white" aria-hidden="true" />
              </div>
              <span className="text-[10px] font-black text-white tracking-wide">DTA FACULTY AI</span>
            </div>
            <p className="text-[9px] text-white/70 leading-relaxed">Generate lessons, analyse cohorts &amp; more</p>
            <div className="mt-2 px-2 py-1 rounded-lg bg-white/10 border border-white/20 text-[9px] font-black text-white tracking-widest text-center">
              ACTIVE HUB
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/20 flex items-center justify-center" title="DTA Faculty AI Assistant">
              <Sparkles className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
          </div>
        )}
      </div>

      {/* Faculty Identity Footer */}
      <div className={`px-3 py-3 border-t border-[#166534] ${collapsed ? "flex flex-col items-center gap-2" : "flex items-center gap-3"}`}>
        <div className="w-8 h-8 rounded-xl bg-white text-[#15803D] flex items-center justify-center font-black text-sm shrink-0">
          {session?.user?.name?.[0]?.toUpperCase() || "F"}
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-xs font-extrabold text-white truncate">{session?.user?.name || "Faculty"}</p>
            <p className="text-[10px] text-white/70 font-bold">Instructor · DTA</p>
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="p-1.5 rounded-lg text-white/60 hover:text-red-300 hover:bg-red-900/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
          aria-label="Sign out"
          title="Sign out"
        >
          <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>

      {/* Collapse Toggle — desktop only */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden lg:flex items-center justify-center gap-2 px-4 py-2.5 border-t border-[#166534] text-white/60 hover:text-white text-[10px] font-bold tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        aria-label={collapsed ? "Expand faculty sidebar" : "Collapse faculty sidebar"}
      >
        {collapsed ? (
          <ChevronRight className="w-4 h-4" aria-hidden="true" />
        ) : (
          <>
            <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            <span>Collapse</span>
          </>
        )}
      </button>
    </div>
  );

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Faculty navigation drawer"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#166534] bg-[#15803D]">
          <span className="text-xs font-black text-white tracking-widest uppercase">Faculty Workspace</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
            aria-label="Close faculty navigation"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
        <div className="flex-1 overflow-hidden">
          <SidebarContent />
        </div>
      </aside>

      {/* Desktop Fixed Sidebar */}
      <aside
        className={`hidden lg:flex flex-col ${sidebarWidth} shrink-0 bg-[#15803D] min-h-screen sticky top-0 transition-all duration-300 ease-in-out`}
        aria-label="Faculty navigation"
      >
        <SidebarContent />
      </aside>
    </>
  );
}
