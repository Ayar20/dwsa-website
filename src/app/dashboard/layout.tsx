"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import StudentSidebar from "@/components/StudentSidebar";
import FacultySidebar from "@/components/FacultySidebar";
import ICCSidebar from "@/components/ICCSidebar";
import PlatformSidebar from "@/components/PlatformSidebar";
import UniversalNotificationDrawer from "@/components/platform/UniversalNotificationDrawer";
import CommandPalette from "@/components/platform/CommandPalette";
import QuickActionsDock from "@/components/platform/QuickActionsDock";
import FloatingAIAssistant from "@/components/platform/FloatingAIAssistant";
import PrideModal from "@/components/PrideModal";
import PWAInstallBanner from "@/components/PWAInstallBanner";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, Bell, Search, GraduationCap, ShieldCheck, User, BookMarked, Command } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const [showPrideModal, setShowPrideModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  // Global Ctrl+K / ⌘K keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated" && session?.user) {
      if (session.user.role === "STUDENT" && !session.user.prideAccepted) {
        setShowPrideModal(true);
      } else {
        setShowPrideModal(false);
      }
    }
  }, [session, status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center text-slate-500 text-sm" role="status" aria-label="Loading workspace">
        <div className="flex flex-col items-center gap-3 animate-fadeInUp">
          <div className="w-10 h-10 border-3 border-[#15803D] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-extrabold text-[#0F172A] tracking-wider">
            INITIALIZING INSTITUTIONOS v5.3 (IUX)...
          </span>
          <span className="text-[10px] text-slate-400">Digital World Systems Africa Ltd</span>
        </div>
      </div>
    );
  }

  const isStudent = session?.user?.role === "STUDENT";
  const isInstructor = session?.user?.role === "INSTRUCTOR";
  const isPlatformRoute = pathname.startsWith("/dashboard/platform");
  const userRole = isStudent ? "STUDENT" : isInstructor ? "INSTRUCTOR" : isPlatformRoute ? "SUPER_ADMIN" : "ADMIN";

  // Platform Command Centre Shell for Super Admins / Platform Routes
  if (isPlatformRoute) {
    const platformPageLabel = pathname.includes("/onboarding")
      ? "Customer Onboarding Centre"
      : pathname.includes("/subscriptions")
      ? "Subscription & MRR Management"
      : pathname.includes("/health")
      ? "Tenant Health Monitoring"
      : pathname.includes("/customers")
      ? "Customer Success Centre"
      : pathname.includes("/tenants")
      ? "Institution Registry"
      : pathname.includes("/provision")
      ? "Provision Institution Wizard"
      : pathname.includes("/analytics")
      ? "Platform Analytics & Consumption"
      : pathname.includes("/ecosystem")
      ? "Enterprise Extension Marketplace"
      : pathname.includes("/ai-marketplace")
      ? "AI Agent Exchange"
      : pathname.includes("/marketplace-intelligence")
      ? "Marketplace Executive Intelligence"
      : pathname.includes("/certification")
      ? "Marketplace Certification Centre"
      : pathname.includes("/marketplace-governance")
      ? "Marketplace Governance Centre"
      : pathname.includes("/marketplace-finance")
      ? "Marketplace Financial Operations"
      : pathname.includes("/marketplace")
      ? "Enterprise Module Marketplace"
      : pathname.includes("/ai-workforce")
      ? "AI Digital Workforce Registry"
      : pathname.includes("/ai-agent")
      ? "Atlas — Platform Operator Agent"
      : pathname.includes("/integrations")
      ? "Enterprise Integration Marketplace"
      : pathname.includes("/integration-intelligence")
      ? "Integration Intelligence & Recovery"
      : pathname.includes("/templates")
      ? "Deployment Templates & Provisioning"
      : pathname.includes("/developers")
      ? "API Developer Centre"
      : pathname.includes("/data-exchange")
      ? "Data Exchange & Migration Hub"
      : pathname.includes("/partners")
      ? "Digital Partner Network"
      : pathname.includes("/crm")
      ? "Enterprise CRM"
      : pathname.includes("/pipeline")
      ? "Transformation Pipeline"
      : pathname.includes("/implementation")
      ? "Implementation Command Centre"
      : pathname.includes("/sales-intelligence")
      ? "Sales Intelligence"
      : pathname.includes("/proposals")
      ? "Proposal Centre"
      : pathname.includes("/assessment")
      ? "Digital Transformation Assessment"
      : pathname.includes("/africa")
      ? "Africa Expansion Centre"
      : pathname.includes("/customer-success")
      ? "Customer Success Operations"
      : pathname.includes("/workforce")
      ? "Africa Workforce Intelligence"
      : pathname.includes("/skills-market")
      ? "Skills Marketplace"
      : "Platform Command Centre";

    return (
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex font-sans">
        <PlatformSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-[#F8FAFC]">
          {/* Platform Header Bar */}
          <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-[#0F172A] hover:bg-slate-200 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
                aria-label="Open platform navigation"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                  <span>InstitutionOS Platform</span>
                  <span aria-hidden="true">•</span>
                  <span className="text-[#15803D] uppercase tracking-wider font-extrabold">v5.3 IUX</span>
                </div>
                <h1 className="text-sm sm:text-base font-extrabold text-[#0F172A] tracking-tight">{platformPageLabel}</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#15803D] text-slate-600 hover:text-[#15803D] text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
              >
                <Search className="w-3.5 h-3.5 text-[#15803D]" aria-hidden="true" />
                <span>Command Center</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-black text-slate-400">⌘K</kbd>
              </button>
              <button
                onClick={() => setNotifOpen(true)}
                className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-[#0F172A] hover:bg-slate-200 transition-all relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
                aria-label="View Platform Notifications"
                title="Universal Notifications"
              >
                <Bell className="w-4 h-4" aria-hidden="true" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#15803D]" aria-hidden="true" />
              </button>
            </div>
          </header>
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
            <QuickActionsDock userRole="SUPER_ADMIN" />
            {children}
          </main>
        </div>
        <UniversalNotificationDrawer isOpen={notifOpen} onClose={() => setNotifOpen(false)} role="SUPER_ADMIN" />
        <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} userRole="SUPER_ADMIN" />
        <FloatingAIAssistant userRole="SUPER_ADMIN" />
        <PWAInstallBanner />
      </div>
    );
  }

  // Faculty Workspace Shell for Instructors
  if (isInstructor) {
    const facultyPageLabel = pathname.includes("/cohorts")
      ? "My Cohorts"
      : pathname.includes("/github-reviews")
      ? "GitHub Review Centre"
      : pathname.includes("/assessments")
      ? "Assessment Centre"
      : pathname.includes("/learners")
      ? "Learner Analytics"
      : pathname.includes("/lessons")
      ? "Faculty Lesson Studio"
      : pathname.includes("/profile")
      ? "Faculty Profile"
      : pathname.includes("/announcements")
      ? "Announcements"
      : pathname.includes("/competencies")
      ? "Competency Validation"
      : pathname.includes("/ai-agent")
      ? "Sage — AI Teaching Agent"
      : pathname.includes("/integrations")
      ? "Faculty Connected Academic Workspace"
      : "Faculty Home";

    return (
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex font-sans">
        <FacultySidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-[#F8FAFC]">
          {/* Faculty Workspace Top Header */}
          <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-[#0F172A] hover:bg-slate-200 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
                aria-label="Open faculty navigation"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                  <span>Faculty Workspace</span>
                  <span aria-hidden="true">•</span>
                  <span className="text-[#15803D] uppercase tracking-wider font-extrabold">InstitutionOS v5.3 IUX</span>
                </div>
                <h1 className="text-sm sm:text-base font-extrabold text-[#0F172A] tracking-tight">{facultyPageLabel}</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#15803D] text-slate-600 hover:text-[#15803D] text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
              >
                <Search className="w-3.5 h-3.5 text-[#15803D]" aria-hidden="true" />
                <span>Search</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-black text-slate-400">⌘K</kbd>
              </button>
              <button
                onClick={() => setNotifOpen(true)}
                className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-[#0F172A] hover:bg-slate-200 transition-all relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
                aria-label="View Campus Notifications"
                title="Universal Notifications"
              >
                <Bell className="w-4 h-4" aria-hidden="true" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#15803D]" aria-hidden="true" />
              </button>
              <Link
                href="/dashboard/instructor/profile"
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 border border-slate-200 hover:border-[#15803D] text-[#0F172A] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
              >
                <div className="w-6 h-6 rounded-lg bg-[#15803D] text-white flex items-center justify-center font-black text-xs shrink-0">
                  {session?.user?.name?.[0]?.toUpperCase() || "F"}
                </div>
                <span className="hidden md:inline text-xs font-extrabold text-[#0F172A] truncate max-w-[120px]">
                  {session?.user?.name?.split(" ")[0] || "Faculty"}
                </span>
              </Link>
            </div>
          </header>
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
            <QuickActionsDock userRole="INSTRUCTOR" />
            {children}
          </main>
        </div>
        <UniversalNotificationDrawer isOpen={notifOpen} onClose={() => setNotifOpen(false)} role="INSTRUCTOR" />
        <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} userRole="INSTRUCTOR" />
        <FloatingAIAssistant userRole="INSTRUCTOR" />
        <PWAInstallBanner />
      </div>
    );
  }

  // Institution Control Centre Shell for Administrators & Executive Leadership
  if (!isStudent && !isInstructor) {
    const iccPageLabel = pathname.includes("/platform")
      ? "Platform Administration Centre"
      : pathname.includes("/operations")
      ? "Platform Health & Operations Dashboard"
      : pathname.includes("/deployment")
      ? "Deployment Readiness Inspector"
      : pathname.includes("/benchmarks")
      ? "Performance Benchmarks Dashboard"
      : pathname.includes("/ai-governance")
      ? "AI Governance & Controls Centre"
      : pathname.includes("/admin/ai")
      ? "Executive AI Advisory Hub"
      : pathname.includes("/automation")
      ? "Automation & Workflow Centre"
      : pathname.includes("/communications")
      ? "Communications Centre"
      : pathname.includes("/approvals")
      ? "Executive Approval Centre"
      : pathname.includes("/quality")
      ? "Quality Assurance Centre"
      : pathname.includes("/knowledge")
      ? "Institution Knowledge Centre"
      : pathname.includes("/admin/inbox")
      ? "Executive Operations Inbox"
      : pathname.includes("/intelligence")
      ? "Digital Twin & Intelligence"
      : pathname.includes("/analytics")
      ? "Persistent Executive Analytics"
      : pathname.includes("/partners")
      ? "Industry Partnership Centre"
      : pathname.includes("/employment")
      ? "Graduate Employment Intelligence"
      : pathname.includes("/reports")
      ? "Executive Reports"
      : pathname.includes("/academic")
      ? "Institutional Learning Analytics"
      : pathname.includes("/modules/editor")
      ? "Module & Track Editor"
      : pathname.includes("/students")
      ? "Student Success Centre"
      : pathname.includes("/admissions")
      ? "Admissions Command Centre"
      : pathname.includes("/certificates")
      ? "Certificate Authority"
      : pathname.includes("/faculty")
      ? "Faculty Management Centre"
      : pathname.includes("/finance")
      ? "Financial ERP & Business Intelligence"
      : pathname.includes("/research")
      ? "Research & Innovation Management"
      : pathname.includes("/governance")
      ? "Governance & Compliance Centre"
      : pathname.includes("/settings")
      ? "Institution Settings"
      : pathname.includes("/ai-agent")
      ? "Pulse — Admin Operations Agent"
      : pathname.includes("/ai-executive")
      ? "Apex — Executive Intelligence Agent"
      : "Executive Dashboard";

    return (
      <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex font-sans">
        <ICCSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-[#F8FAFC]">
          {/* Executive Header Bar */}
          <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-slate-100 border border-slate-200 text-[#0F172A] hover:bg-slate-200 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
                aria-label="Open executive navigation"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                  <span>Institution Control Centre</span>
                  <span aria-hidden="true">•</span>
                  <span className="text-[#15803D] uppercase tracking-wider font-extrabold">InstitutionOS v5.3 IUX</span>
                </div>
                <h1 className="text-sm sm:text-base font-extrabold text-[#0F172A] tracking-tight">{iccPageLabel}</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSearchOpen(true)}
                className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#15803D] text-slate-600 hover:text-[#15803D] text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
              >
                <Search className="w-3.5 h-3.5 text-[#15803D]" aria-hidden="true" />
                <span>Command Center</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-black text-slate-400">⌘K</kbd>
              </button>
              <button
                onClick={() => setNotifOpen(true)}
                className="p-2 rounded-xl bg-slate-100 border border-slate-200 text-[#0F172A] hover:bg-slate-200 transition-all relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
                aria-label="View Institution Notifications"
                title="Universal Notifications"
              >
                <Bell className="w-4 h-4" aria-hidden="true" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#15803D]" aria-hidden="true" />
              </button>
              <Link
                href="/dashboard/admin/settings"
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 border border-slate-200 hover:border-[#15803D] text-[#0F172A] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
              >
                <div className="w-6 h-6 rounded-lg bg-[#0F172A] text-white flex items-center justify-center font-black text-xs shrink-0">
                  {session?.user?.name?.[0]?.toUpperCase() || "E"}
                </div>
                <span className="hidden md:inline text-xs font-extrabold text-[#0F172A] truncate max-w-[120px]">
                  {session?.user?.name?.split(" ")[0] || "Executive"}
                </span>
              </Link>
            </div>
          </header>
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
            <QuickActionsDock userRole="ADMIN" />
            {children}
          </main>
        </div>
        <PrideModal isOpen={showPrideModal} onAccepted={() => setShowPrideModal(false)} />
        <UniversalNotificationDrawer isOpen={notifOpen} onClose={() => setNotifOpen(false)} role="ADMIN" />
        <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} userRole="ADMIN" />
        <FloatingAIAssistant userRole="ADMIN" />
        <PWAInstallBanner />
      </div>
    );
  }

  // Digital Campus Shell Layout for Students
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex font-sans">
      <StudentSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      <div className="flex-1 flex flex-col min-w-0 min-h-screen bg-[#F8FAFC]">
        {/* Institutional Campus Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] hover:bg-[#15803D] hover:text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
              aria-label="Open campus navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                <span>DTA Digital Campus</span>
                <span aria-hidden="true">•</span>
                <span className="text-[#15803D] uppercase tracking-wider font-extrabold">InstitutionOS v5.3 IUX</span>
              </div>
              <h1 className="text-sm sm:text-base font-extrabold text-[#0F172A] tracking-tight">
                {pathname.includes("/transcript")
                  ? "Official Digital Transcript"
                  : pathname.includes("/credentials")
                  ? "Digital Credential Wallet"
                  : pathname.includes("/employability")
                  ? "Employability & Career Centre"
                  : pathname.includes("/careers")
                  ? "Career Placement Centre"
                  : pathname.includes("/innovation-marketplace")
                  ? "Innovation Marketplace"
                  : pathname.includes("/alumni")
                  ? "DTA Alumni Network"
                  : pathname.includes("/employer")
                  ? "Employer Recruitment Portal"
                  : pathname.includes("/mentor")
                  ? "Mentor Operations Hub"
                  : pathname.includes("/student/ai")
                  ? "Student AI Learning Assistant"
                  : pathname.includes("/student/ai-agent")
                  ? "Aida — AI Learning Agent"
                  : pathname.includes("/student/integrations")
                  ? "Student Connected Apps & Services"
                  : pathname.includes("/instructor/ai")
                  ? "Faculty AI Co-Pilot"
                  : pathname.includes("/instructor/ai-agent")
                  ? "Sage — AI Teaching Agent"
                  : pathname.includes("/student/inbox")
                  ? "My Campus Inbox"
                  : pathname.includes("/instructor/inbox")
                  ? "Faculty Inbox"
                  : pathname.includes("/knowledge")
                  ? "Institution Knowledge Centre"
                  : pathname.includes("/programme")
                  ? "My Learning Workspace"
                  : pathname.includes("/identity")
                  ? "Digital Identity Workspace"
                  : pathname.includes("/resources")
                  ? "Digital Resource Library"
                  : pathname.includes("/calendar")
                  ? "Learning Calendar"
                  : "Campus Home"}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 hover:border-[#15803D] text-slate-600 hover:text-[#15803D] text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
            >
              <Search className="w-3.5 h-3.5 text-[#15803D]" aria-hidden="true" />
              <span>Command Center</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-black text-slate-400">⌘K</kbd>
            </button>

            <button
              onClick={() => setNotifOpen(true)}
              className="p-2 rounded-xl bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] hover:bg-[#15803D] hover:text-white transition-all relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
              aria-label="View Campus Notices & Notifications"
              title="Campus Notifications"
            >
              <Bell className="w-4 h-4" aria-hidden="true" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#15803D]" aria-hidden="true" />
            </button>

            <Link
              href="/dashboard/student/identity"
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-white border border-slate-200 hover:border-[#15803D] text-[#0F172A] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] shadow-xs"
            >
              <div className="w-6 h-6 rounded-lg bg-[#15803D] text-white flex items-center justify-center font-black text-xs shrink-0">
                {session?.user?.name?.[0]?.toUpperCase() || "S"}
              </div>
              <span className="hidden md:inline text-xs font-extrabold text-[#0F172A] truncate max-w-[120px]">
                {session?.user?.name?.split(" ")[0] || "Learner"}
              </span>
            </Link>
          </div>
        </header>

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
          <QuickActionsDock userRole="STUDENT" />
          {children}
        </main>
      </div>

      <PrideModal isOpen={showPrideModal} onAccepted={() => setShowPrideModal(false)} />
      <PWAInstallBanner />
      <UniversalNotificationDrawer
        isOpen={notifOpen}
        onClose={() => setNotifOpen(false)}
        role="STUDENT"
      />
      <CommandPalette
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        userRole="STUDENT"
      />
      <FloatingAIAssistant userRole="STUDENT" />
    </div>
  );
}
