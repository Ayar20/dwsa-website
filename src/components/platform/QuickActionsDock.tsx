"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Zap, Play, Code2, Upload, ShieldCheck, Video, CheckSquare,
  FileText, UserPlus, Building2, Store, HeartPulse, Sparkles, ChevronRight
} from "lucide-react";

interface QuickActionItem {
  id: string;
  label: string;
  href: string;
  icon: React.ElementType;
  description: string;
}

interface QuickActionsDockProps {
  userRole?: "STUDENT" | "INSTRUCTOR" | "ADMIN" | "SUPER_ADMIN";
}

export default function QuickActionsDock({ userRole = "STUDENT" }: QuickActionsDockProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  // Role-Aware Quick Actions
  const roleActions: Record<string, QuickActionItem[]> = {
    STUDENT: [
      { id: "s1", label: "Resume Lesson", href: "/dashboard/student/programme", icon: Play, description: "Continue learning module" },
      { id: "s2", label: "Continue Coding Lab", href: "/dashboard/student/programme#lab", icon: Code2, description: "Open browser IDE & tasks" },
      { id: "s3", label: "Submit PR", href: "/dashboard/student#assignments", icon: Upload, description: "Submit GitHub pull request" },
      { id: "s4", label: "Skills Passport", href: "/dashboard/student/skills", icon: ShieldCheck, description: "Inspect verified radar" },
    ],
    INSTRUCTOR: [
      { id: "f1", label: "Create Lesson", href: "/dashboard/instructor/lessons", icon: FileText, description: "Faculty lesson manager" },
      { id: "f2", label: "Launch Live Session", href: "/dashboard/instructor/cohorts#live-classes", icon: Video, description: "Start stream & attendance" },
      { id: "f3", label: "Review PRs", href: "/dashboard/instructor/github-reviews", icon: CheckSquare, description: "Evaluate learner commits" },
      { id: "f4", label: "Approve Grades", href: "/dashboard/instructor/assessments", icon: ShieldCheck, description: "Finalise assessment cohort" },
    ],
    ADMIN: [
      { id: "e1", label: "Generate Report", href: "/dashboard/admin/reports", icon: FileText, description: "Executive academic BI" },
      { id: "e2", label: "Approve Requests", href: "/dashboard/admin/approvals", icon: CheckSquare, description: "Executive signature queue" },
      { id: "e3", label: "Review Health", href: "/dashboard/admin/operations", icon: HeartPulse, description: "System operational status" },
      { id: "e4", label: "Open Financial BI", href: "/dashboard/admin/finance", icon: Building2, description: "Tuition & ERP metrics" },
    ],
    SUPER_ADMIN: [
      { id: "p1", label: "Provision Tenant", href: "/dashboard/platform/provision", icon: UserPlus, description: "Institution onboard wizard" },
      { id: "p2", label: "Open Marketplace", href: "/dashboard/platform/marketplace", icon: Store, description: "Enterprise module registry" },
      { id: "p3", label: "Customer Success", href: "/dashboard/platform/customers", icon: HeartPulse, description: "Tenant health & MRR" },
      { id: "p4", label: "Transformation SOW", href: "/dashboard/platform/assessment", icon: Sparkles, description: "Enterprise maturity score" },
    ],
  };

  const activeActions = roleActions[userRole] || roleActions["STUDENT"];

  // Context awareness hint based on active pathname
  const getContextHint = () => {
    if (pathname.includes("/student/identity")) return { text: "Viewing Digital Identity", suggestion: "Update portfolio resume PDF", link: "/dashboard/student/portfolio" };
    if (pathname.includes("/instructor/cohorts")) return { text: "Viewing My Cohorts", suggestion: "Check GitHub PR grading queue", link: "/dashboard/instructor/github-reviews" };
    if (pathname.includes("/admin/finance")) return { text: "Viewing Financial ERP", suggestion: "Review corporate grant proposals", link: "/dashboard/admin/approvals" };
    if (pathname.includes("/platform/tenants")) return { text: "Viewing Tenant Registry", suggestion: "Provision next institution seat", link: "/dashboard/platform/provision" };
    return null;
  };

  const contextHint = getContextHint();

  return (
    <aside
      className="rounded-3xl bg-white border border-slate-200 p-5 shadow-sm space-y-4"
      aria-label="Role-Aware Quick Actions Toolbar"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#F0FDF4] border border-[#15803D]/20 flex items-center justify-center">
            <Zap className="w-4 h-4 text-[#15803D]" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-xs font-black text-[#0F172A] tracking-wide uppercase">
              IUX Quick Actions
            </h2>
            <p className="text-[10px] text-slate-500">Role-Tailored Shortcuts · {userRole}</p>
          </div>
        </div>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-[10px] font-bold text-[#15803D] hover:underline"
        >
          {collapsed ? "Expand" : "Collapse"}
        </button>
      </div>

      {/* Context Awareness Pill (No dead ends) */}
      {contextHint && !collapsed && (
        <div className="p-3 rounded-2xl bg-[#F0FDF4] border border-[#15803D]/20 flex items-center justify-between text-[11px]">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#15803D] shrink-0" />
            <span className="text-slate-600 font-semibold">
              <strong className="text-[#0F172A]">{contextHint.text}:</strong> {contextHint.suggestion}
            </span>
          </div>
          <Link
            href={contextHint.link}
            className="text-[10px] font-black text-[#15803D] hover:underline flex items-center gap-0.5 shrink-0"
          >
            Go <ChevronRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* Actions Grid */}
      {!collapsed && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {activeActions.map((act) => {
            const Icon = act.icon;
            return (
              <Link
                key={act.id}
                href={act.href}
                className="p-3 rounded-2xl bg-slate-50 hover:bg-[#F0FDF4] border border-slate-200 hover:border-[#15803D]/30 transition-all space-y-1 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
              >
                <div className="flex items-center justify-between">
                  <Icon className="w-4 h-4 text-[#15803D] group-hover:scale-110 transition-transform" />
                  <ChevronRight className="w-3 h-3 text-slate-300 group-hover:text-[#15803D]" />
                </div>
                <p className="text-xs font-extrabold text-[#0F172A] group-hover:text-[#15803D] transition-colors">
                  {act.label}
                </p>
                <p className="text-[9px] text-slate-500 truncate">{act.description}</p>
              </Link>
            );
          })}
        </div>
      )}
    </aside>
  );
}
