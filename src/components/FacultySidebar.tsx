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
        { href: "/dashboard/instructor/assessments#assignments", label: "Assignments", icon: ClipboardList },
        { href: "/dashboard/instructor/announcements", label: "Announcements", icon: Megaphone },
        { href: "/dashboard/instructor/competencies", label: "Competency Validation", icon: ShieldCheck },
      ],
    },
    {
      title: "PROFESSIONAL DEVELOPMENT",
      items: [
        { href: "/dashboard/instructor/profile#research", label: "Research", icon: FlaskConical },
        { href: "/innovation", label: "Innovation Centre", icon: Lightbulb },
        { href: "https://www.skool.com/digital-wealth-systems-africa-6803/", label: "Faculty Community", icon: Globe, external: true },
        { href: "/dashboard/instructor/profile#recognition", label: "Faculty Recognition", icon: Award },
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
    <div className="flex flex-col h-full">
      {/* Logo / Branding */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-[#d4a017]/20 ${collapsed ? "justify-center" : ""}`}>
        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#d4a017] to-[#b8891a] flex items-center justify-center shrink-0 shadow-lg">
          <BookMarked className="w-4.5 h-4.5 text-[#030e1f]" aria-hidden="true" />
        </div>
        {!collapsed && (
          <div>
            <div className="text-[10px] font-black text-[#d4a017] tracking-widest uppercase leading-none">DTA</div>
            <div className="text-[11px] font-extrabold text-white leading-tight">Faculty Workspace</div>
            <div className="text-[9px] text-[#8899b4] tracking-wide">InstitutionOS v3.1</div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-5" aria-label="Faculty navigation">
        {navSections.map((section) => (
          <div key={section.title}>
            {!collapsed && (
              <p className="px-2 pb-1.5 text-[9px] font-black text-[#8899b4] tracking-[0.15em] uppercase">
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
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] ${
                        active
                          ? "bg-[#d4a017]/15 text-[#d4a017] border border-[#d4a017]/40"
                          : "text-[#8899b4] hover:text-white hover:bg-[#061428] border border-transparent"
                      } ${collapsed ? "justify-center" : ""}`}
                      aria-current={active ? "page" : undefined}
                      title={collapsed ? item.label : undefined}
                    >
                      <Icon
                        className={`shrink-0 transition-colors ${collapsed ? "w-5 h-5" : "w-4 h-4"} ${
                          active ? "text-[#d4a017]" : "text-[#8899b4] group-hover:text-[#d4a017]"
                        }`}
                        aria-hidden="true"
                      />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                      {!collapsed && active && (
                        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#d4a017] shrink-0" aria-hidden="true" />
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
      <div className="px-3 py-3 border-t border-[#d4a017]/20">
        {!collapsed ? (
          <div className="rounded-2xl bg-gradient-to-br from-[#d4a017]/10 to-[#4ade80]/10 border border-[#d4a017]/25 p-3">
            <div className="flex items-center gap-2 mb-1.5">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#d4a017] to-[#4ade80] flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-[#030e1f]" aria-hidden="true" />
              </div>
              <span className="text-[10px] font-black text-white tracking-wide">DTA FACULTY AI</span>
            </div>
            <p className="text-[9px] text-[#8899b4] leading-relaxed">Generate lessons, analyse cohorts & more</p>
            <div className="mt-2 px-2 py-1 rounded-lg bg-[#d4a017]/10 border border-[#d4a017]/20 text-[9px] font-black text-[#d4a017] tracking-widest text-center">
              COMING SOON
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#d4a017]/20 to-[#4ade80]/20 border border-[#d4a017]/30 flex items-center justify-center" title="DTA Faculty AI Assistant — Coming Soon">
              <Sparkles className="w-4 h-4 text-[#d4a017]" aria-hidden="true" />
            </div>
          </div>
        )}
      </div>

      {/* Faculty Identity Footer */}
      <div className={`px-3 py-3 border-t border-[#d4a017]/20 ${collapsed ? "flex flex-col items-center gap-2" : "flex items-center gap-3"}`}>
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#d4a017] to-[#b8891a] flex items-center justify-center font-black text-sm text-[#030e1f] shrink-0">
          {session?.user?.name?.[0]?.toUpperCase() || "F"}
        </div>
        {!collapsed && (
          <div className="flex-1 min-w-0">
            <p className="text-xs font-extrabold text-white truncate">{session?.user?.name || "Faculty"}</p>
            <p className="text-[10px] text-[#d4a017] font-bold">Instructor · DTA</p>
          </div>
        )}
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="p-1.5 rounded-lg text-[#8899b4] hover:text-red-400 hover:bg-red-950/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500"
          aria-label="Sign out"
          title="Sign out"
        >
          <LogOut className="w-3.5 h-3.5" aria-hidden="true" />
        </button>
      </div>

      {/* Collapse Toggle — desktop only */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden lg:flex items-center justify-center gap-2 px-4 py-2.5 border-t border-[#d4a017]/20 text-[#8899b4] hover:text-[#d4a017] text-[10px] font-bold tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
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
          className="fixed inset-0 bg-[#020914]/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-[#020914] border-r border-[#d4a017]/20 flex flex-col transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-label="Faculty navigation drawer"
      >
        <div className="flex items-center justify-between px-4 py-3 border-b border-[#d4a017]/20">
          <span className="text-xs font-black text-[#d4a017] tracking-widest uppercase">Faculty Workspace</span>
          <button
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg text-[#8899b4] hover:text-white hover:bg-[#061428] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
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
        className={`hidden lg:flex flex-col ${sidebarWidth} shrink-0 bg-[#020914] border-r border-[#d4a017]/20 min-h-screen sticky top-0 transition-all duration-300 ease-in-out`}
        aria-label="Faculty navigation"
      >
        <SidebarContent />
      </aside>
    </>
  );
}
