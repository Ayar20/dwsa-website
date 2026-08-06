"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  Home,
  BookOpen,
  GraduationCap,
  GitPullRequest,
  Library,
  Calendar as CalendarIcon,
  Lightbulb,
  Users,
  Briefcase,
  Newspaper,
  UserCheck,
  Award,
  HelpCircle,
  LogOut,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  X,
  Menu,
  ShieldCheck,
  Mail,
} from "lucide-react";

interface StudentSidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export default function StudentSidebar({ mobileOpen, setMobileOpen }: StudentSidebarProps) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [collapsed, setCollapsed] = useState(false);

  const navSections = [
    {
      title: "CAMPUS CORE",
      items: [
        { href: "/dashboard/student", label: "Campus Home", icon: Home },
        { href: "/dashboard/student/ai", label: "AI Learning Assistant", icon: Sparkles },
        { href: "/dashboard/student/ai-agent", label: "Aida — AI Agent", icon: Sparkles },
        { href: "/dashboard/student/integrations", label: "Connected Apps", icon: Sparkles },
        { href: "/dashboard/student/programme", label: "My Programme", icon: GraduationCap },
        { href: "/dashboard/student#my-learning", label: "My Learning", icon: BookOpen },
        { href: "/dashboard/student#assignments", label: "Assignments & PRs", icon: GitPullRequest },
      ],
    },
    {
      title: "SKILLS & CAREER",
      items: [
        { href: "/dashboard/student/skills", label: "Skills Passport", icon: Award },
        { href: "/dashboard/student/pathways", label: "Career Pathways", icon: Briefcase },
        { href: "/dashboard/student/portfolio", label: "Professional Portfolio", icon: UserCheck },
        { href: "/dashboard/student/cpd", label: "CPD Centre", icon: ShieldCheck },
      ],
    },
    {
      title: "CREDENTIALS & CAREER",
      items: [
        { href: "/dashboard/student/credentials", label: "Credential Wallet", icon: ShieldCheck },
        { href: "/dashboard/student/transcript", label: "Digital Transcript", icon: Award },
        { href: "/dashboard/student/employability", label: "Employability Centre", icon: Briefcase },
        { href: "/dashboard/student/careers", label: "Career Placement Centre", icon: Briefcase },
      ],
    },
    {
      title: "INNOVATION & COMMUNITY",
      items: [
        { href: "/dashboard/student/innovation-marketplace", label: "Innovation Marketplace", icon: Sparkles },
        { href: "/dashboard/alumni", label: "Alumni Network", icon: Users },
        { href: "https://www.skool.com/digital-wealth-systems-africa-6803/", label: "Community Forum", icon: Users, external: true },
      ],
    },
    {
      title: "CAMPUS LIFE",
      items: [
        { href: "/dashboard/student/inbox", label: "My Inbox", icon: Mail },
        { href: "/dashboard/student/resources", label: "Resource Library", icon: Library },
        { href: "/dashboard/student/calendar", label: "Learning Calendar", icon: CalendarIcon },
        { href: "/dashboard/admin/knowledge", label: "Knowledge Centre", icon: BookOpen },
        { href: "/knowledge-hub", label: "Campus News", icon: Newspaper, external: false },
      ],
    },
    {
      title: "ACCOUNT & IDENTITY",
      items: [
        { href: "/dashboard/student/identity", label: "Digital Identity", icon: UserCheck },
        { href: "/dashboard/student#certificates", label: "Certificates & Badges", icon: Award },
        { href: "https://wa.me/2347082135071", label: "Support Desk", icon: HelpCircle, external: true },
      ],
    },
  ];

  const sidebarWidth = collapsed ? "w-20" : "w-64";

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-[#0F172A]/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container — Deep Emerald Theme */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-[#15803D] border-r border-[#166534] text-white z-50 transition-all duration-300 flex flex-col justify-between ${sidebarWidth} ${
          mobileOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0"
        }`}
        aria-label="Campus Navigation"
      >
        {/* Header Branding */}
        <div className="p-4 border-b border-[#166534] flex items-center justify-between">
          <Link
            href="/dashboard/student"
            className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017] rounded-xl p-1"
          >
            <div className="p-2.5 bg-white text-[#15803D] rounded-xl shadow-md shrink-0">
              <GraduationCap className="w-5 h-5" aria-hidden="true" />
            </div>
            {(!collapsed || mobileOpen) && (
              <div className="flex flex-col min-w-0">
                <span className="font-extrabold text-sm text-white tracking-tight leading-tight truncate">
                  DWSA <span className="text-[#D4A017]">Campus</span>
                </span>
                <span className="text-[9px] text-[#F0FDF4]/80 font-bold uppercase tracking-wider">
                  Cohort 2026
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Collapse Toggle */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-lg bg-[#166534] text-white hover:bg-[#14532D] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017]"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>

          {/* Mobile Close Toggle */}
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-lg bg-[#166534] text-white hover:bg-[#14532D]"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation Body */}
        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-6 scrollbar-thin scrollbar-thumb-white/20">
          {navSections.map((section) => (
            <div key={section.title} className="space-y-1.5">
              {(!collapsed || mobileOpen) && (
                <span className="text-[10px] font-extrabold text-[#F0FDF4]/70 uppercase tracking-widest px-3 block">
                  {section.title}
                </span>
              )}
              <ul className="space-y-1">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;

                  const linkContent = (
                    <div
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                        isActive
                          ? "bg-[#166534] text-white font-bold border-l-4 border-[#D4A017] shadow-sm pl-2.5"
                          : "text-white/90 hover:text-white hover:bg-[#166534]/60"
                      } ${collapsed && !mobileOpen ? "justify-center" : ""}`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-[#D4A017]" : "text-white/80"}`} aria-hidden="true" />
                      {(!collapsed || mobileOpen) && (
                        <span className="truncate flex-1">{item.label}</span>
                      )}
                      {isActive && (!collapsed || mobileOpen) && (
                        <div className="w-1.5 h-1.5 rounded-full bg-[#D4A017] shrink-0" aria-hidden="true" />
                      )}
                    </div>
                  );

                  return (
                    <li key={item.label}>
                      {item.external ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noreferrer"
                          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017] rounded-xl"
                          onClick={() => setMobileOpen(false)}
                        >
                          {linkContent}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A017] rounded-xl"
                          onClick={() => setMobileOpen(false)}
                        >
                          {linkContent}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}

          {/* DTA AI Assistant Card */}
          <div className="pt-2">
            <div
              className={`p-3 bg-[#166534] border border-[#D4A017]/40 rounded-2xl space-y-2 relative overflow-hidden ${
                collapsed && !mobileOpen ? "text-center" : ""
              }`}
            >
              <div className="flex items-center gap-2 text-[#D4A017]">
                <Sparkles className="w-4 h-4 shrink-0" aria-hidden="true" />
                {(!collapsed || mobileOpen) && (
                  <span className="text-xs font-extrabold text-white">DTA AI Assistant</span>
                )}
              </div>
              {(!collapsed || mobileOpen) && (
                <>
                  <p className="text-[10px] text-[#F0FDF4]/90 leading-relaxed">
                    Personalized AI code tutor &amp; learning assistant.
                  </p>
                  <span className="inline-block px-2.5 py-0.5 rounded-full bg-white/20 border border-white/30 text-[9px] font-extrabold text-[#D4A017] uppercase tracking-wider">
                    v5.0A Active
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer User Info & Logout */}
        <div className="p-3 border-t border-[#166534] bg-[#14532D]/80 space-y-2">
          {(!collapsed || mobileOpen) && session?.user && (
            <div className="px-2 py-1 flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-lg bg-white text-[#15803D] flex items-center justify-center font-bold text-xs shrink-0">
                  {session.user.name?.[0]?.toUpperCase() || "S"}
                </div>
                <div className="min-w-0">
                  <span className="block text-xs font-bold text-white truncate leading-tight">
                    {session.user.name || "Student Learner"}
                  </span>
                  <span className="block text-[9px] text-[#F0FDF4]/70 truncate">
                    {session.user.email}
                  </span>
                </div>
              </div>
            </div>
          )}

          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold text-red-200 hover:bg-red-900/40 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 ${
              collapsed && !mobileOpen ? "justify-center" : ""
            }`}
            aria-label="Log out of Digital Campus"
          >
            <LogOut className="w-4 h-4 shrink-0" aria-hidden="true" />
            {(!collapsed || mobileOpen) && <span>Log Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
