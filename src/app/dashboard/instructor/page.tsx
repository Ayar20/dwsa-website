"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import FacultyTeachingInsights from "@/components/intelligence/FacultyTeachingInsights";
import CompetencyRadar from "@/components/intelligence/CompetencyRadar";
import {
  AlertCircle,
  GitPullRequest,
  ClipboardCheck,
  Video,
  MessageSquare,
  Users,
  Bell,
  BookOpen,
  Clock,
  TrendingUp,
  Award,
  Star,
  Zap,
  ChevronRight,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Flame,
  Shield,
  Calendar,
  FileText,
  Upload,
  Download,
  PlusCircle,
  RefreshCw,
  Activity,
} from "lucide-react";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const todayPriorities = [
  {
    id: 1,
    type: "urgent",
    icon: GitPullRequest,
    title: "8 GitHub PRs Pending Review",
    desc: "Oldest submission: 18 hours ago",
    action: "Review PRs",
    href: "/dashboard/instructor/github-reviews",
    color: "#D4A017",
    bg: "bg-[#FEFCE8]",
    border: "border-[#D4A017]/40",
  },
  {
    id: 2,
    type: "high",
    icon: Video,
    title: "Live Class in 45 Minutes",
    desc: "React Fundamentals – Cohort Alpha",
    action: "Prepare Session",
    href: "/dashboard/instructor/cohorts",
    color: "#15803D",
    bg: "bg-[#F0FDF4]",
    border: "border-[#15803D]/30",
  },
  {
    id: 3,
    type: "high",
    icon: ClipboardCheck,
    title: "5 Assignments Awaiting Grading",
    desc: "Week 3 Lab submissions – due today",
    action: "Start Grading",
    href: "/dashboard/instructor/assessments",
    color: "#DC2626",
    bg: "bg-red-50",
    border: "border-red-200",
  },
  {
    id: 4,
    type: "medium",
    icon: AlertTriangle,
    title: "3 At-Risk Learners Identified",
    desc: "No login activity in 7+ days",
    action: "View Learners",
    href: "/dashboard/instructor/learners",
    color: "#D4A017",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
  {
    id: 5,
    type: "medium",
    icon: MessageSquare,
    title: "12 New Student Messages",
    desc: "4 urgent – awaiting your response",
    action: "View Messages",
    href: "/dashboard/instructor/learners",
    color: "#15803D",
    bg: "bg-[#F0FDF4]",
    border: "border-[#15803D]/20",
  },
  {
    id: 6,
    type: "low",
    icon: Bell,
    title: "Announcement Draft Pending",
    desc: "Week 4 Schedule – not yet published",
    action: "Publish Now",
    href: "/dashboard/instructor/announcements",
    color: "#64748B",
    bg: "bg-slate-50",
    border: "border-slate-200",
  },
];

const atRiskLearners = [
  {
    id: 1,
    name: "Emeka Okafor",
    cohort: "Cohort Alpha",
    risk: "Critical",
    riskColor: "text-red-700",
    riskBg: "bg-red-50 border-red-200",
    indicators: ["No login (9 days)", "3 missed assignments", "0 GitHub commits"],
    progress: 12,
  },
  {
    id: 2,
    name: "Fatima Al-Hassan",
    cohort: "Cohort Beta",
    risk: "High",
    riskColor: "text-amber-800",
    riskBg: "bg-amber-50 border-amber-200",
    indicators: ["Low attendance (40%)", "Low PR activity", "1 failed assessment"],
    progress: 28,
  },
  {
    id: 3,
    name: "David Mensah",
    cohort: "Cohort Alpha",
    risk: "Medium",
    riskColor: "text-yellow-800",
    riskBg: "bg-yellow-50 border-yellow-200",
    indicators: ["Declining progress", "2 late submissions"],
    progress: 45,
  },
];

const kpiMetrics = [
  { label: "PR Reviews Completed", value: "47", sub: "This month", icon: GitPullRequest, color: "#D4A017" },
  { label: "Avg Review Time", value: "2.4h", sub: "↓ 0.6h from last month", icon: Clock, color: "#15803D" },
  { label: "Assignments Published", value: "12", sub: "Across 3 cohorts", icon: FileText, color: "#15803D" },
  { label: "Live Sessions Conducted", value: "8", sub: "This month", icon: Video, color: "#15803D" },
  { label: "Student Satisfaction", value: "4.8/5", sub: "↑ 0.2 from last month", icon: Star, color: "#D4A017" },
  { label: "Learner Completion Rate", value: "73%", sub: "Cohort average", icon: TrendingUp, color: "#15803D" },
  { label: "Office Hour Participation", value: "89%", sub: "Active bookings", icon: Users, color: "#15803D" },
  { label: "Teaching Consistency", value: "96%", sub: "Sessions delivered on time", icon: Shield, color: "#15803D" },
];

const teachingCalendar = [
  { time: "09:00", title: "React Fundamentals – Cohort Alpha", type: "live", typeColor: "text-[#15803D]", typeBg: "bg-[#F0FDF4] border-[#15803D]/20" },
  { time: "11:00", title: "Office Hours – Open Session", type: "office-hours", typeColor: "text-[#15803D]", typeBg: "bg-[#F0FDF4] border-[#15803D]/20" },
  { time: "14:00", title: "Next.js Advanced Patterns – Cohort Beta", type: "live", typeColor: "text-[#15803D]", typeBg: "bg-[#F0FDF4] border-[#15803D]/20" },
  { time: "16:30", title: "Faculty Team Meeting", type: "meeting", typeColor: "text-[#D4A017]", typeBg: "bg-[#FEFCE8] border-[#D4A017]/30" },
  { time: "18:00", title: "Week 4 Capstone Review – Cohort Alpha", type: "assessment", typeColor: "text-red-700", typeBg: "bg-red-50 border-red-200" },
];

const recognitionBadges = [
  { title: "Mentor of the Month", icon: Star, color: "#D4A017", earned: true },
  { title: "PR Review Champion", icon: GitPullRequest, color: "#15803D", earned: true },
  { title: "Curriculum Contributor", icon: BookOpen, color: "#15803D", earned: true },
  { title: "Innovation Leader", icon: Zap, color: "#D4A017", earned: false },
  { title: "Research Excellence", icon: Activity, color: "#15803D", earned: false },
  { title: "Outstanding Service", icon: Award, color: "#D4A017", earned: false },
];

const quickStats = [
  { label: "Modules Teaching", value: "3", icon: BookOpen },
  { label: "Students Assigned", value: "64", icon: Users },
  { label: "Projects Under Review", value: "8", icon: GitPullRequest },
  { label: "Avg Learner Progress", value: "67%", icon: TrendingUp },
];

const quickActions = [
  { label: "Start Live Session", icon: Video, href: "/dashboard/instructor/cohorts", color: "#15803D" },
  { label: "Review PRs", icon: GitPullRequest, href: "/dashboard/instructor/github-reviews", color: "#D4A017" },
  { label: "Create Assignment", icon: PlusCircle, href: "/dashboard/instructor/assessments", color: "#15803D" },
  { label: "Upload Lesson", icon: Upload, href: "/dashboard/instructor/lessons", color: "#15803D" },
  { label: "Post Announcement", icon: Bell, href: "/dashboard/instructor/announcements", color: "#D4A017" },
  { label: "Download Reports", icon: Download, href: "/dashboard/instructor/learners", color: "#64748B" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function FacultyHomePage() {
  const { data: session } = useSession();
  const [refreshing, setRefreshing] = useState(false);

  const firstName = session?.user?.name?.split(" ")[0] || "Faculty";
  const now = new Date();
  const hour = now.getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1200);
  };

  return (
    <div className="space-y-8 pb-12">

      {/* ─── Institutional Mission Banner ─────────────────────────────────── */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#15803D] to-[#0F172A] border border-[#15803D]/20 px-6 py-6 shadow-xl text-white">
        <div className="relative flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
            <Flame className="w-5 h-5 text-[#D4A017]" aria-hidden="true" />
          </div>
          <div>
            <p className="text-[10px] font-black text-[#D4A017] tracking-[0.2em] uppercase mb-0.5">DTA Institutional Mission</p>
            <p className="text-sm font-bold text-white leading-snug">
              Your work today contributes to building Africa&apos;s next generation of technology professionals.
            </p>
          </div>
        </div>
      </div>

      {/* ─── Faculty Welcome Header ────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#FEFCE8] border border-[#D4A017]/30 text-[#D4A017] text-[10px] font-black tracking-widest uppercase">
              Faculty Workspace
            </span>
            <span className="px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] text-[10px] font-black tracking-widest uppercase">
              Academic Operations Centre
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
            {greeting}, {firstName} 👋
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Today is{" "}
            <span className="text-[#D4A017] font-semibold">
              {now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </span>
            {" "}· Academic Week 4
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="self-start flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-[#0F172A] text-xs font-bold hover:bg-slate-50 transition-all shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
          aria-label="Refresh faculty workspace data"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} aria-hidden="true" />
          Refresh
        </button>
      </div>

      {/* ─── ACADEMIC INTELLIGENCE LAYER ─── */}
      <FacultyTeachingInsights />
      <CompetencyRadar title="Cohort Competency Validation Overview" />

      {/* ─── Quick Stats Row ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-2xl bg-white border border-slate-200 p-4 flex flex-col gap-2 shadow-sm">
              <Icon className="w-5 h-5 text-[#15803D]" aria-hidden="true" />
              <p className="text-2xl font-extrabold text-[#0F172A]">{stat.value}</p>
              <p className="text-[10px] text-slate-500 font-semibold leading-tight">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* ─── Today's Priorities Command Centre ────────────────────────────── */}
      <section aria-labelledby="priorities-heading">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 id="priorities-heading" className="text-base font-extrabold text-[#0F172A]">Today&apos;s Priorities</h3>
            <p className="text-[11px] text-slate-500">Your academic operations command centre — items requiring immediate attention</p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-red-50 border border-red-200 text-red-700 text-[10px] font-black">
            {todayPriorities.filter(p => p.type === "urgent" || p.type === "high").length} Urgent
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {todayPriorities.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`rounded-2xl ${item.bg} border ${item.border} p-4 flex flex-col gap-3 shadow-sm hover:scale-[1.01] transition-transform`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 bg-white border border-slate-200 shadow-xs">
                    <Icon className="w-4.5 h-4.5" style={{ color: item.color }} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-extrabold text-[#0F172A] leading-snug">{item.title}</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">{item.desc}</p>
                  </div>
                </div>
                <Link
                  href={item.href}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-[10px] font-black tracking-wider transition-all bg-white border border-slate-200 text-[#0F172A] hover:bg-slate-50 shadow-xs"
                >
                  {item.action}
                  <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Two Column Layout ─────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* At-Risk Learner Intelligence */}
        <section aria-labelledby="atrisk-heading">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 id="atrisk-heading" className="text-base font-extrabold text-[#0F172A] flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-600" aria-hidden="true" />
                At-Risk Learner Intelligence
              </h3>
              <p className="text-[11px] text-slate-500">Learners requiring immediate faculty intervention</p>
            </div>
            <Link href="/dashboard/instructor/learners" className="text-[10px] font-black text-[#15803D] hover:underline flex items-center gap-1 transition-colors">
              View All <ChevronRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </div>
          <div className="space-y-3">
            {atRiskLearners.map((learner) => (
              <div key={learner.id} className={`rounded-2xl border p-4 bg-white shadow-sm ${learner.riskBg}`}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-[#F0FDF4] border border-[#15803D]/20 flex items-center justify-center text-xs font-black text-[#15803D]">
                      {learner.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-extrabold text-[#0F172A]">{learner.name}</p>
                      <p className="text-[10px] text-slate-500">{learner.cohort}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${learner.riskBg} ${learner.riskColor}`}>
                    {learner.risk}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {learner.indicators.map((ind) => (
                    <span key={ind} className="px-2 py-0.5 rounded-lg bg-slate-100 border border-slate-200 text-[9px] text-slate-600 font-semibold">
                      {ind}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#D4A017] to-[#15803D] transition-all"
                      style={{ width: `${learner.progress}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-black text-slate-500 shrink-0">{learner.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Teaching Calendar */}
        <section aria-labelledby="calendar-heading">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 id="calendar-heading" className="text-base font-extrabold text-[#0F172A] flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#D4A017]" aria-hidden="true" />
                Today&apos;s Teaching Schedule
              </h3>
              <p className="text-[11px] text-slate-500">Your academic timetable for today</p>
            </div>
            <Link href="/dashboard/instructor/cohorts" className="text-[10px] font-black text-[#15803D] hover:underline flex items-center gap-1 transition-colors">
              Full Calendar <ChevronRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </div>
          <div className="space-y-3">
            {teachingCalendar.map((event, i) => (
              <div key={i} className="rounded-2xl border border-slate-200 p-4 bg-white shadow-sm flex items-start gap-4">
                <div className="text-right shrink-0 w-12">
                  <p className="text-xs font-black text-[#D4A017]">{event.time}</p>
                </div>
                <div className="w-px self-stretch bg-slate-200 shrink-0" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-[#0F172A] leading-snug">{event.title}</p>
                  <span className={`inline-block mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-black border ${event.typeBg} ${event.typeColor}`}>
                    {event.type.replace("-", " ").toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* ─── Faculty Productivity KPI Dashboard ───────────────────────────── */}
      <section aria-labelledby="kpi-heading">
        <div className="mb-4">
          <h3 id="kpi-heading" className="text-base font-extrabold text-[#0F172A]">Faculty Productivity Dashboard</h3>
          <p className="text-[11px] text-slate-500">Your professional academic performance metrics for this month</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {kpiMetrics.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="rounded-2xl bg-white border border-slate-200 p-4 shadow-sm hover:border-[#15803D]/40 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center bg-[#F8FAFC] border border-slate-200">
                    <Icon className="w-4 h-4" style={{ color: kpi.color }} aria-hidden="true" />
                  </div>
                </div>
                <p className="text-xl font-extrabold text-[#0F172A]">{kpi.value}</p>
                <p className="text-[10px] font-bold text-[#0F172A] mt-0.5 leading-tight">{kpi.label}</p>
                <p className="text-[9px] text-slate-500 mt-0.5">{kpi.sub}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ─── Faculty Recognition & Quick Actions ──────────────────────────── */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* Faculty Recognition */}
        <section aria-labelledby="recognition-heading">
          <div className="mb-4">
            <h3 id="recognition-heading" className="text-base font-extrabold text-[#0F172A] flex items-center gap-2">
              <Award className="w-4 h-4 text-[#D4A017]" aria-hidden="true" />
              Faculty Recognition
            </h3>
            <p className="text-[11px] text-slate-500">Institutional achievement badges earned and in progress</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {recognitionBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.title}
                  className={`rounded-2xl p-3 text-center border transition-all ${
                    badge.earned
                      ? "bg-white border-[#D4A017]/40 shadow-sm"
                      : "bg-slate-50 border-slate-200 opacity-50"
                  }`}
                  title={badge.earned ? `${badge.title} — Earned` : `${badge.title} — Not yet earned`}
                >
                  <div
                    className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center bg-[#FEFCE8] border border-[#D4A017]/30"
                  >
                    <Icon className="w-5 h-5 text-[#D4A017]" aria-hidden="true" />
                  </div>
                  <p className="text-[9px] font-bold text-[#0F172A] leading-tight">{badge.title}</p>
                  {badge.earned && (
                    <span className="inline-block mt-1 text-[8px] font-black text-[#15803D]">✓ EARNED</span>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick Actions */}
        <section aria-labelledby="quickactions-heading">
          <div className="mb-4">
            <h3 id="quickactions-heading" className="text-base font-extrabold text-[#0F172A] flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#15803D]" aria-hidden="true" />
              Quick Actions
            </h3>
            <p className="text-[11px] text-slate-500">Frequent academic operations — launch instantly</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="rounded-2xl p-4 bg-white border border-slate-200 hover:border-[#15803D]/40 flex flex-col items-center gap-2.5 text-center transition-all hover:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#F0FDF4] border border-[#15803D]/20"
                  >
                    <Icon className="w-5 h-5 text-[#15803D]" aria-hidden="true" />
                  </div>
                  <span className="text-[10px] font-bold text-[#0F172A] leading-tight">{action.label}</span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>

      {/* ─── DTA Faculty AI Assistant Preview ─────────────────────────────── */}
      <section aria-labelledby="ai-heading">
        <div className="rounded-3xl bg-white border border-slate-200 p-6 relative overflow-hidden shadow-sm">
          <div className="relative">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-[#FEFCE8] border border-[#D4A017]/30 flex items-center justify-center shrink-0">
                <Sparkles className="w-6 h-6 text-[#D4A017]" aria-hidden="true" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 id="ai-heading" className="text-base font-extrabold text-[#0F172A]">DTA Faculty AI Assistant</h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] text-[9px] font-black tracking-widest">ACTIVE HUB</span>
                </div>
                <p className="text-[11px] text-slate-500">Your intelligent academic operations partner — powered by DTA AI</p>
              </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                "Generate lesson outlines",
                "Suggest assessments",
                "Draft announcements",
                "Recommend learner interventions",
                "Review curriculum alignment",
                "Analyse cohort performance",
                "Generate teaching reports",
                "InstitutionOS Federation",
              ].map((cap) => (
                <div key={cap} className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#F8FAFC] border border-slate-200">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#15803D] shrink-0" aria-hidden="true" />
                  <span className="text-[10px] text-slate-600 font-semibold leading-tight">{cap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
