"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
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
  ExternalLink,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  BarChart3,
  Target,
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
    color: "#d4a017",
    bg: "bg-[#d4a017]/10",
    border: "border-[#d4a017]/40",
  },
  {
    id: 2,
    type: "high",
    icon: Video,
    title: "Live Class in 45 Minutes",
    desc: "React Fundamentals – Cohort Alpha",
    action: "Prepare Session",
    href: "/dashboard/instructor/cohorts",
    color: "#4ade80",
    bg: "bg-[#4ade80]/10",
    border: "border-[#4ade80]/40",
  },
  {
    id: 3,
    type: "high",
    icon: ClipboardCheck,
    title: "5 Assignments Awaiting Grading",
    desc: "Week 3 Lab submissions – due today",
    action: "Start Grading",
    href: "/dashboard/instructor/assessments",
    color: "#f87171",
    bg: "bg-red-950/30",
    border: "border-red-800/40",
  },
  {
    id: 4,
    type: "medium",
    icon: AlertTriangle,
    title: "3 At-Risk Learners Identified",
    desc: "No login activity in 7+ days",
    action: "View Learners",
    href: "/dashboard/instructor/learners",
    color: "#f59e0b",
    bg: "bg-amber-950/30",
    border: "border-amber-800/40",
  },
  {
    id: 5,
    type: "medium",
    icon: MessageSquare,
    title: "12 New Student Messages",
    desc: "4 urgent – awaiting your response",
    action: "View Messages",
    href: "/dashboard/instructor/learners",
    color: "#818cf8",
    bg: "bg-indigo-950/30",
    border: "border-indigo-800/40",
  },
  {
    id: 6,
    type: "low",
    icon: Bell,
    title: "Announcement Draft Pending",
    desc: "Week 4 Schedule – not yet published",
    action: "Publish Now",
    href: "/dashboard/instructor/announcements",
    color: "#8899b4",
    bg: "bg-[#061428]",
    border: "border-[#1a2f4a]",
  },
];

const atRiskLearners = [
  {
    id: 1,
    name: "Emeka Okafor",
    cohort: "Cohort Alpha",
    risk: "Critical",
    riskColor: "text-red-400",
    riskBg: "bg-red-950/40 border-red-800/40",
    indicators: ["No login (9 days)", "3 missed assignments", "0 GitHub commits"],
    progress: 12,
  },
  {
    id: 2,
    name: "Fatima Al-Hassan",
    cohort: "Cohort Beta",
    risk: "High",
    riskColor: "text-amber-400",
    riskBg: "bg-amber-950/30 border-amber-800/30",
    indicators: ["Low attendance (40%)", "Low PR activity", "1 failed assessment"],
    progress: 28,
  },
  {
    id: 3,
    name: "David Mensah",
    cohort: "Cohort Alpha",
    risk: "Medium",
    riskColor: "text-yellow-400",
    riskBg: "bg-yellow-950/20 border-yellow-800/30",
    indicators: ["Declining progress", "2 late submissions"],
    progress: 45,
  },
];

const kpiMetrics = [
  { label: "PR Reviews Completed", value: "47", sub: "This month", icon: GitPullRequest, color: "#d4a017" },
  { label: "Avg Review Time", value: "2.4h", sub: "↓ 0.6h from last month", icon: Clock, color: "#4ade80" },
  { label: "Assignments Published", value: "12", sub: "Across 3 cohorts", icon: FileText, color: "#818cf8" },
  { label: "Live Sessions Conducted", value: "8", sub: "This month", icon: Video, color: "#60a5fa" },
  { label: "Student Satisfaction", value: "4.8/5", sub: "↑ 0.2 from last month", icon: Star, color: "#d4a017" },
  { label: "Learner Completion Rate", value: "73%", sub: "Cohort average", icon: TrendingUp, color: "#4ade80" },
  { label: "Office Hour Participation", value: "89%", sub: "Active bookings", icon: Users, color: "#f87171" },
  { label: "Teaching Consistency", value: "96%", sub: "Sessions delivered on time", icon: Shield, color: "#4ade80" },
];

const teachingCalendar = [
  { time: "09:00", title: "React Fundamentals – Cohort Alpha", type: "live", typeColor: "text-[#4ade80]", typeBg: "bg-[#4ade80]/10 border-[#4ade80]/30" },
  { time: "11:00", title: "Office Hours – Open Session", type: "office-hours", typeColor: "text-[#818cf8]", typeBg: "bg-indigo-950/30 border-indigo-800/30" },
  { time: "14:00", title: "Next.js Advanced Patterns – Cohort Beta", type: "live", typeColor: "text-[#4ade80]", typeBg: "bg-[#4ade80]/10 border-[#4ade80]/30" },
  { time: "16:30", title: "Faculty Team Meeting", type: "meeting", typeColor: "text-[#d4a017]", typeBg: "bg-[#d4a017]/10 border-[#d4a017]/30" },
  { time: "18:00", title: "Week 4 Capstone Review – Cohort Alpha", type: "assessment", typeColor: "text-red-400", typeBg: "bg-red-950/30 border-red-800/30" },
];

const recognitionBadges = [
  { title: "Mentor of the Month", icon: Star, color: "#d4a017", earned: true },
  { title: "PR Review Champion", icon: GitPullRequest, color: "#4ade80", earned: true },
  { title: "Curriculum Contributor", icon: BookOpen, color: "#818cf8", earned: true },
  { title: "Innovation Leader", icon: Zap, color: "#f59e0b", earned: false },
  { title: "Research Excellence", icon: Activity, color: "#60a5fa", earned: false },
  { title: "Outstanding Service", icon: Award, color: "#d4a017", earned: false },
];

const quickStats = [
  { label: "Modules Teaching", value: "3", icon: BookOpen },
  { label: "Students Assigned", value: "64", icon: Users },
  { label: "Projects Under Review", value: "8", icon: GitPullRequest },
  { label: "Avg Learner Progress", value: "67%", icon: TrendingUp },
];

const quickActions = [
  { label: "Start Live Session", icon: Video, href: "/dashboard/instructor/cohorts", color: "#4ade80" },
  { label: "Review PRs", icon: GitPullRequest, href: "/dashboard/instructor/github-reviews", color: "#d4a017" },
  { label: "Create Assignment", icon: PlusCircle, href: "/dashboard/instructor/assessments", color: "#818cf8" },
  { label: "Upload Lesson", icon: Upload, href: "/dashboard/instructor/lessons", color: "#60a5fa" },
  { label: "Post Announcement", icon: Bell, href: "/dashboard/instructor/announcements", color: "#f59e0b" },
  { label: "Download Reports", icon: Download, href: "/dashboard/instructor/learners", color: "#f87171" },
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
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#0d1e0d] via-[#0a1628] to-[#030e1f] border border-[#4ade80]/20 px-6 py-5">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#4ade80]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#d4a017]/5 rounded-full blur-3xl" />
        </div>
        <div className="relative flex items-center gap-4">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#4ade80]/20 to-[#d4a017]/20 border border-[#4ade80]/30 flex items-center justify-center shrink-0">
            <Flame className="w-5 h-5 text-[#4ade80]" aria-hidden="true" />
          </div>
          <div>
            <p className="text-[10px] font-black text-[#4ade80] tracking-[0.2em] uppercase mb-0.5">DTA Institutional Mission</p>
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
            <span className="px-3 py-1 rounded-full bg-[#d4a017]/15 border border-[#d4a017]/30 text-[#d4a017] text-[10px] font-black tracking-widest uppercase">
              Faculty Workspace
            </span>
            <span className="px-3 py-1 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/25 text-[#4ade80] text-[10px] font-black tracking-widest uppercase">
              Academic Operations Centre
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {greeting}, {firstName} 👋
          </h2>
          <p className="text-sm text-[#8899b4] mt-1">
            Today is{" "}
            <span className="text-[#d4a017] font-semibold">
              {now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
            </span>
            {" "}· Academic Week 4
          </p>
        </div>
        <button
          onClick={handleRefresh}
          className="self-start flex items-center gap-2 px-4 py-2 rounded-xl bg-[#061428] border border-[#d4a017]/30 text-[#d4a017] text-xs font-bold hover:bg-[#0f223d] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
          aria-label="Refresh faculty workspace data"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}`} aria-hidden="true" />
          Refresh
        </button>
      </div>

      {/* ─── Quick Stats Row ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {quickStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.label} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-4 flex flex-col gap-2">
              <Icon className="w-5 h-5 text-[#d4a017]" aria-hidden="true" />
              <p className="text-2xl font-extrabold text-white">{stat.value}</p>
              <p className="text-[10px] text-[#8899b4] font-semibold leading-tight">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* ─── Today's Priorities Command Centre ────────────────────────────── */}
      <section aria-labelledby="priorities-heading">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 id="priorities-heading" className="text-base font-extrabold text-white">Today&apos;s Priorities</h3>
            <p className="text-[11px] text-[#8899b4]">Your academic operations command centre — items requiring immediate attention</p>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-red-950/40 border border-red-800/40 text-red-400 text-[10px] font-black">
            {todayPriorities.filter(p => p.type === "urgent" || p.type === "high").length} Urgent
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {todayPriorities.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`rounded-2xl ${item.bg} border ${item.border} p-4 flex flex-col gap-3 hover:scale-[1.01] transition-transform`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}20`, border: `1px solid ${item.color}40` }}>
                    <Icon className="w-4.5 h-4.5" style={{ color: item.color }} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-extrabold text-white leading-snug">{item.title}</p>
                    <p className="text-[10px] text-[#8899b4] mt-0.5">{item.desc}</p>
                  </div>
                </div>
                <Link
                  href={item.href}
                  className="flex items-center justify-between px-3 py-2 rounded-xl text-[10px] font-black tracking-wider transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
                  style={{ backgroundColor: `${item.color}15`, color: item.color, border: `1px solid ${item.color}30` }}
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
              <h3 id="atrisk-heading" className="text-base font-extrabold text-white flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400" aria-hidden="true" />
                At-Risk Learner Intelligence
              </h3>
              <p className="text-[11px] text-[#8899b4]">Learners requiring immediate faculty intervention</p>
            </div>
            <Link href="/dashboard/instructor/learners" className="text-[10px] font-black text-[#d4a017] hover:text-white flex items-center gap-1 transition-colors">
              View All <ChevronRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </div>
          <div className="space-y-3">
            {atRiskLearners.map((learner) => (
              <div key={learner.id} className={`rounded-2xl border p-4 ${learner.riskBg}`}>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-[#061428] border border-[#1a2f4a] flex items-center justify-center text-xs font-black text-white">
                        {learner.name[0]}
                      </div>
                      <div>
                        <p className="text-xs font-extrabold text-white">{learner.name}</p>
                        <p className="text-[10px] text-[#8899b4]">{learner.cohort}</p>
                      </div>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${learner.riskBg} ${learner.riskColor}`}>
                    {learner.risk}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {learner.indicators.map((ind) => (
                    <span key={ind} className="px-2 py-0.5 rounded-lg bg-[#030e1f]/60 border border-[#1a2f4a] text-[9px] text-[#8899b4] font-semibold">
                      {ind}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-1.5 rounded-full bg-[#030e1f]/60 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#d4a017] to-[#4ade80] transition-all"
                      style={{ width: `${learner.progress}%` }}
                      role="progressbar"
                      aria-valuenow={learner.progress}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-label={`${learner.name} learning progress: ${learner.progress}%`}
                    />
                  </div>
                  <span className="text-[10px] font-black text-[#8899b4] shrink-0">{learner.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Teaching Calendar */}
        <section aria-labelledby="calendar-heading">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 id="calendar-heading" className="text-base font-extrabold text-white flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#d4a017]" aria-hidden="true" />
                Today&apos;s Teaching Schedule
              </h3>
              <p className="text-[11px] text-[#8899b4]">Your academic timetable for today</p>
            </div>
            <Link href="/dashboard/instructor/cohorts" className="text-[10px] font-black text-[#d4a017] hover:text-white flex items-center gap-1 transition-colors">
              Full Calendar <ChevronRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </div>
          <div className="space-y-3">
            {teachingCalendar.map((event, i) => (
              <div key={i} className={`rounded-2xl border p-4 bg-[#061428] flex items-start gap-4`}>
                <div className="text-right shrink-0 w-12">
                  <p className="text-xs font-black text-[#d4a017]">{event.time}</p>
                </div>
                <div className="w-px self-stretch bg-[#1a2f4a] shrink-0" aria-hidden="true" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-white leading-snug">{event.title}</p>
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
          <h3 id="kpi-heading" className="text-base font-extrabold text-white">Faculty Productivity Dashboard</h3>
          <p className="text-[11px] text-[#8899b4]">Your professional academic performance metrics for this month</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {kpiMetrics.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <div key={kpi.label} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-4 hover:border-[#d4a017]/30 transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${kpi.color}20`, border: `1px solid ${kpi.color}30` }}>
                    <Icon className="w-4 h-4" style={{ color: kpi.color }} aria-hidden="true" />
                  </div>
                </div>
                <p className="text-xl font-extrabold text-white">{kpi.value}</p>
                <p className="text-[10px] font-bold text-white mt-0.5 leading-tight">{kpi.label}</p>
                <p className="text-[9px] text-[#8899b4] mt-0.5">{kpi.sub}</p>
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
            <h3 id="recognition-heading" className="text-base font-extrabold text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-[#d4a017]" aria-hidden="true" />
              Faculty Recognition
            </h3>
            <p className="text-[11px] text-[#8899b4]">Institutional achievement badges earned and in progress</p>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {recognitionBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.title}
                  className={`rounded-2xl p-3 text-center border transition-all ${
                    badge.earned
                      ? "bg-[#061428] border-[#d4a017]/30 hover:border-[#d4a017]/60"
                      : "bg-[#030e1f]/60 border-[#1a2f4a] opacity-50"
                  }`}
                  title={badge.earned ? `${badge.title} — Earned` : `${badge.title} — Not yet earned`}
                >
                  <div
                    className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center"
                    style={{ backgroundColor: `${badge.color}20`, border: `1px solid ${badge.color}40` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: badge.color }} aria-hidden="true" />
                  </div>
                  <p className="text-[9px] font-bold text-[#8899b4] leading-tight">{badge.title}</p>
                  {badge.earned && (
                    <span className="inline-block mt-1 text-[8px] font-black text-[#4ade80]">✓ EARNED</span>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Quick Actions */}
        <section aria-labelledby="quickactions-heading">
          <div className="mb-4">
            <h3 id="quickactions-heading" className="text-base font-extrabold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-[#d4a017]" aria-hidden="true" />
              Quick Actions
            </h3>
            <p className="text-[11px] text-[#8899b4]">Frequent academic operations — launch instantly</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {quickActions.map((action) => {
              const Icon = action.icon;
              return (
                <Link
                  key={action.label}
                  href={action.href}
                  className="rounded-2xl p-4 bg-[#061428] border border-[#1a2f4a] hover:border-[#d4a017]/40 flex flex-col items-center gap-2.5 text-center transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${action.color}15`, border: `1px solid ${action.color}30` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: action.color }} aria-hidden="true" />
                  </div>
                  <span className="text-[10px] font-bold text-[#8899b4] leading-tight">{action.label}</span>
                </Link>
              );
            })}
          </div>
        </section>
      </div>

      {/* ─── DTA Faculty AI Assistant Preview ─────────────────────────────── */}
      <section aria-labelledby="ai-heading">
        <div className="rounded-3xl bg-gradient-to-br from-[#0d1628] via-[#061428] to-[#030e1f] border border-[#d4a017]/25 p-6 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#d4a017]/4 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-60 h-60 bg-[#4ade80]/4 rounded-full blur-3xl" />
          </div>
          <div className="relative">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#d4a017] to-[#4ade80] flex items-center justify-center shrink-0 shadow-lg">
                <Sparkles className="w-6 h-6 text-[#030e1f]" aria-hidden="true" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 id="ai-heading" className="text-base font-extrabold text-white">DTA Faculty AI Assistant</h3>
                  <span className="px-2 py-0.5 rounded-full bg-[#d4a017]/15 border border-[#d4a017]/30 text-[#d4a017] text-[9px] font-black tracking-widest">COMING SOON</span>
                </div>
                <p className="text-[11px] text-[#8899b4]">Your intelligent academic operations partner — powered by DTA AI</p>
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
                <div key={cap} className="flex items-center gap-2 px-3 py-2.5 rounded-xl bg-[#030e1f]/60 border border-[#d4a017]/15">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d4a017] shrink-0" aria-hidden="true" />
                  <span className="text-[10px] text-[#8899b4] font-semibold leading-tight">{cap}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
