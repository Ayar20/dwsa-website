"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import StudentSidebar from "@/components/StudentSidebar";
import FacultySidebar from "@/components/FacultySidebar";
import ICCSidebar from "@/components/ICCSidebar";
import UniversalNotificationDrawer from "@/components/platform/UniversalNotificationDrawer";
import GlobalSearchModal from "@/components/platform/GlobalSearchModal";
import PrideModal from "@/components/PrideModal";
import PWAInstallBanner from "@/components/PWAInstallBanner";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { Menu, Bell, Search, GraduationCap, ShieldCheck, User, BookMarked } from "lucide-react";
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
      <div className="min-h-screen bg-[#030e1f] flex items-center justify-center text-[#8899b4] text-sm" role="status" aria-label="Loading workspace">
        <div className="flex flex-col items-center gap-3 animate-fadeInUp">
          <div className="w-10 h-10 border-3 border-[#d4a017] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-extrabold text-white tracking-wider">
            INITIALIZING DIGITAL CAMPUS...
          </span>
          <span className="text-[10px] text-[#8899b4]">Digital World Systems Africa Ltd</span>
        </div>
      </div>
    );
  }

  const isStudent = session?.user?.role === "STUDENT";
  const isInstructor = session?.user?.role === "INSTRUCTOR";

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
      ? "Lesson Manager"
      : pathname.includes("/profile")
      ? "Faculty Profile"
      : pathname.includes("/announcements")
      ? "Announcements"
      : pathname.includes("/competencies")
      ? "Competency Validation"
      : "Faculty Home";

    return (
      <div className="min-h-screen bg-[#030e1f] text-[#f0f4ff] flex font-sans">
        <FacultySidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <div className="flex-1 flex flex-col min-w-0 min-h-screen">
          {/* Faculty Workspace Top Header */}
          <header className="sticky top-0 z-30 bg-[#030e1f]/90 backdrop-blur-md border-b border-[#d4a017]/20 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-[#061428] border border-[#d4a017]/30 text-[#d4a017] hover:bg-[#d4a017] hover:text-[#030e1f] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
                aria-label="Open faculty navigation"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-[#8899b4]">
                  <span>Faculty Workspace</span>
                  <span aria-hidden="true">•</span>
                  <span className="text-[#d4a017] uppercase tracking-wider">InstitutionOS v3.1</span>
                </div>
                <h1 className="text-sm sm:text-base font-extrabold text-white tracking-tight">{facultyPageLabel}</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#061428] border border-[#4ade80]/30 text-[#4ade80] text-[10px] font-black tracking-wider">
                <BookMarked className="w-3.5 h-3.5" aria-hidden="true" />
                FACULTY
              </span>
              <button
                onClick={() => setNotifOpen(true)}
                className="p-2 rounded-xl bg-[#061428] border border-[#d4a017]/30 text-[#d4a017] hover:bg-[#0f223d] transition-all relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
                aria-label="View Campus Notifications"
                title="Universal Notifications"
              >
                <Bell className="w-4 h-4" aria-hidden="true" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#4ade80]" aria-hidden="true" />
              </button>
              <Link
                href="/dashboard/instructor/profile"
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-[#061428] border border-[#d4a017]/40 hover:border-[#d4a017] text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
              >
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#d4a017] to-[#e5a910] text-[#030e1f] flex items-center justify-center font-black text-xs shrink-0">
                  {session?.user?.name?.[0]?.toUpperCase() || "F"}
                </div>
                <span className="hidden md:inline text-xs font-extrabold text-white truncate max-w-[120px]">
                  {session?.user?.name?.split(" ")[0] || "Faculty"}
                </span>
              </Link>
            </div>
          </header>
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {children}
          </main>
        </div>
        <PWAInstallBanner />
      </div>
    );
  }

  // Institution Control Centre Shell for Administrators & Executive Leadership
  if (!isStudent && !isInstructor) {
    const iccPageLabel = pathname.includes("/ai-governance")
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
      ? "Academic Operations"
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
      : "Executive Dashboard";

    return (
      <div className="min-h-screen bg-[#030e1f] text-[#f0f4ff] flex font-sans">
        <ICCSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <div className="flex-1 flex flex-col min-w-0 min-h-screen">
          {/* Executive Header Bar */}
          <header className="sticky top-0 z-30 bg-[#030e1f]/90 backdrop-blur-md border-b border-[#d4a017]/25 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 rounded-xl bg-[#061428] border border-[#d4a017]/30 text-[#d4a017] hover:bg-[#d4a017] hover:text-[#030e1f] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
                aria-label="Open executive navigation"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-[#8899b4]">
                  <span>Institution Control Centre</span>
                  <span aria-hidden="true">•</span>
                  <span className="text-[#d4a017] uppercase tracking-wider">Powered by InstitutionOS v3.2</span>
                </div>
                <h1 className="text-sm sm:text-base font-extrabold text-white tracking-tight">{iccPageLabel}</h1>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#061428] border border-[#d4a017]/30 text-[#d4a017] text-[10px] font-black tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                EXECUTIVE
              </span>
              <button
                onClick={() => setNotifOpen(true)}
                className="p-2 rounded-xl bg-[#061428] border border-[#d4a017]/30 text-[#d4a017] hover:bg-[#0f223d] transition-all relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
                aria-label="View Institution Notifications"
                title="Universal Notifications"
              >
                <Bell className="w-4 h-4" aria-hidden="true" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#4ade80]" aria-hidden="true" />
              </button>
              <Link
                href="/dashboard/admin/settings"
                className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-[#061428] border border-[#d4a017]/40 hover:border-[#d4a017] text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
              >
                <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#d4a017] to-[#e5a910] text-[#030e1f] flex items-center justify-center font-black text-xs shrink-0">
                  {session?.user?.name?.[0]?.toUpperCase() || "E"}
                </div>
                <span className="hidden md:inline text-xs font-extrabold text-white truncate max-w-[120px]">
                  {session?.user?.name?.split(" ")[0] || "Executive"}
                </span>
              </Link>
            </div>
          </header>
          <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
            {children}
          </main>
        </div>
        <PrideModal isOpen={showPrideModal} onAccepted={() => setShowPrideModal(false)} />
        <PWAInstallBanner />
      </div>
    );
  }

  // Digital Campus Shell Layout for Students
  return (
    <div className="min-h-screen bg-[#030e1f] text-[#f0f4ff] flex font-sans">
      
      {/* Student Sidebar Navigation */}
      <StudentSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">

        {/* Institutional Campus Top Header Bar */}
        <header className="sticky top-0 z-30 bg-[#030e1f]/90 backdrop-blur-md border-b border-[#d4a017]/20 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Mobile Sidebar Toggle Button */}
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-[#061428] border border-[#d4a017]/30 text-[#d4a017] hover:bg-[#d4a017] hover:text-[#030e1f] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
              aria-label="Open campus navigation menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Breadcrumb / Section Header */}
            <div>
              <div className="flex items-center gap-2 text-[10px] font-bold text-[#8899b4]">
                <span>DTA Digital Campus</span>
                <span aria-hidden="true">•</span>
                <span className="text-[#d4a017] uppercase tracking-wider">InstitutionOS v3.0</span>
              </div>
              <h1 className="text-sm sm:text-base font-extrabold text-white tracking-tight">
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
                  : pathname.includes("/instructor/ai")
                  ? "Faculty AI Co-Pilot"
                  : pathname.includes("/student/inbox")
                  ? "My Campus Inbox"
                  : pathname.includes("/instructor/inbox")
                  ? "Faculty Inbox"
                  : pathname.includes("/knowledge")
                  ? "Institution Knowledge Centre"
                  : pathname.includes("/programme")
                  ? "My Programme Handbook"
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

          {/* Top Header Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSearchOpen(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#061428] border border-[#d4a017]/30 text-[#d4a017] hover:bg-[#0f223d] text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
            >
              <Search className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Search Library</span>
            </button>

            <button
              onClick={() => setNotifOpen(true)}
              className="p-2 rounded-xl bg-[#061428] border border-[#d4a017]/30 text-[#d4a017] hover:bg-[#0f223d] transition-all relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
              aria-label="View Campus Notices & Notifications"
              title="Campus Notifications"
            >
              <Bell className="w-4 h-4" aria-hidden="true" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#4ade80]" aria-hidden="true" />
            </button>

            <Link
              href="/dashboard/student/identity"
              className="flex items-center gap-2 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-[#061428] border border-[#d4a017]/40 hover:border-[#d4a017] text-white transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
            >
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-[#d4a017] to-[#e5a910] text-[#030e1f] flex items-center justify-center font-black text-xs shrink-0">
                {session?.user?.name?.[0]?.toUpperCase() || "S"}
              </div>
              <span className="hidden md:inline text-xs font-extrabold text-white truncate max-w-[120px]">
                {session?.user?.name?.split(" ")[0] || "Learner"}
              </span>
            </Link>
          </div>
        </header>

        {/* Content Container */}
        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          {children}
        </main>

      </div>

      <PrideModal isOpen={showPrideModal} onAccepted={() => setShowPrideModal(false)} />
      <PWAInstallBanner />
      <UniversalNotificationDrawer
        isOpen={notifOpen}
        onClose={() => setNotifOpen(false)}
        role={(session?.user?.role as any) || "STUDENT"}
      />
      <GlobalSearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
      />
    </div>
  );
}
