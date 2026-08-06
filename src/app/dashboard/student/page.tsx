"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import YouTubePlayer from "@/components/YouTubePlayer";
import StudentSuccessDashboard from "@/components/intelligence/StudentSuccessDashboard";
import CompetencyRadar from "@/components/intelligence/CompetencyRadar";
import LearningTimeline from "@/components/intelligence/LearningTimeline";
import AchievementEngine from "@/components/intelligence/AchievementEngine";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  Code,
  CreditCard,
  ExternalLink,
  GitPullRequest,
  Lock,
  AlertTriangle,
  Send,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  PlayCircle,
  Trophy,
  Zap,
  Star,
  Target,
  TrendingUp,
  Award,
  Users,
  BarChart3,
  Flame,
  GraduationCap,
} from "lucide-react";

// ─── Animated Progress Ring ──────────────────────────────────────────────────
function ProgressRing({ percent }: { percent: number }) {
  const r = 52;
  const circ = 2 * Math.PI * r;
  const dash = (percent / 100) * circ;
  return (
    <svg width="130" height="130" className="rotate-[-90deg]">
      <circle cx="65" cy="65" r={r} fill="none" stroke="#E2E8F0" strokeWidth="10" />
      <circle
        cx="65"
        cy="65"
        r={r}
        fill="none"
        stroke="url(#ringGrad)"
        strokeWidth="10"
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
        style={{ transition: "stroke-dasharray 1s ease" }}
      />
      <defs>
        <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#15803D" />
          <stop offset="100%" stopColor="#D4A017" />
        </linearGradient>
      </defs>
    </svg>
  );
}

// ─── Stat Card ────────────────────────────────────────────────────────────────
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  accent,
}: {
  icon: React.ElementType;
  label: string;
  value: string | number;
  sub?: string;
  accent: string;
}) {
  return (
    <div
      className="relative p-5 rounded-2xl border overflow-hidden group hover:scale-[1.02] transition-transform duration-300 bg-white shadow-sm"
      style={{ borderColor: `${accent}33` }}
    >
      <div className="flex items-start justify-between relative">
        <div
          className="p-2.5 rounded-xl border"
          style={{
            background: `${accent}18`,
            borderColor: `${accent}44`,
          }}
        >
          <Icon className="w-4 h-4" style={{ color: accent }} />
        </div>
      </div>
      <div className="mt-4 relative">
        <div className="text-2xl font-black text-[#0F172A] leading-none">{value}</div>
        <div className="text-[10px] font-semibold uppercase tracking-wider mt-1" style={{ color: accent }}>
          {label}
        </div>
        {sub && <div className="text-[10px] text-slate-500 mt-0.5">{sub}</div>}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function StudentDashboardPage() {
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [prUrls, setPrUrls] = useState<Record<string, string>>({});
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [paying, setPaying] = useState(false);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["student-dashboard"],
    queryFn: async () => {
      const res = await fetch("/api/student/dashboard");
      if (!res.ok) throw new Error("Failed to load dashboard data");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#15803D] border-r-[#D4A017] animate-spin" />
          <div className="absolute inset-3 rounded-full bg-[#F0FDF4] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#15803D]" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-[#0F172A]">Initialising Workspace</p>
          <p className="text-[11px] text-slate-500 mt-1">Loading your cohort curriculum & lessons…</p>
        </div>
      </div>
    );
  }

  if (isError || !data || !data.enrolled) {
    return (
      <div className="max-w-lg mx-auto mt-16">
        <div className="p-8 rounded-3xl border border-slate-200 bg-white text-center space-y-5 shadow-sm">
          <div className="mx-auto w-16 h-16 rounded-2xl bg-[#FEFCE8] flex items-center justify-center border border-[#D4A017]/30">
            <AlertTriangle className="w-8 h-8 text-[#D4A017]" />
          </div>
          <div>
            <h2 className="text-xl font-black text-[#0F172A]">Enrollment Required</h2>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed max-w-sm mx-auto">
              You are not registered in an active DWSA cohort. Please contact administration
              or sign in with an enrolled student account.
            </p>
          </div>
          <div className="flex gap-3 pt-2 justify-center">
            <div className="px-3 py-1.5 rounded-lg bg-[#F0FDF4] border border-[#15803D]/20 text-[10px] font-bold text-[#15803D] flex items-center gap-1.5">
              <BookOpen className="w-3 h-3" /> DWSA Academy
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#F0FDF4] border border-[#15803D]/20 text-[10px] font-bold text-[#15803D] flex items-center gap-1.5">
              <Users className="w-3 h-3" /> Contact Admin
            </div>
          </div>
        </div>
      </div>
    );
  }

  const { enrollment, track, progressPercent } = data;
  const isSuspended = enrollment.status === "SUSPENDED";
  const modules = track?.modules || [];
  const activeModule = modules.find((m: any) => m.id === selectedModuleId) || modules[0];
  const outstandingBalance = Math.max(0, enrollment.totalAmount - enrollment.amountPaid);
  const completedCount = modules.filter((m: any) =>
    m.assignments?.every((a: any) => a.submissions?.some((s: any) => s.status === "APPROVED"))
  ).length;

  const handleSubmitPR = async (assignmentId: string) => {
    const url = prUrls[assignmentId];
    setSubmittingId(assignmentId);
    setMessage(null);
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ assignmentId, githubPRUrl: url }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Submission failed");
      setMessage({ type: "success", text: "Pull Request submitted successfully for grading!" });
      refetch();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to submit PR" });
    } finally {
      setSubmittingId(null);
    }
  };

  const handlePayInstallment = async (amountToPay: number) => {
    setPaying(true);
    setMessage(null);
    try {
      const res = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enrollmentId: enrollment.id, amount: amountToPay }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Payment checkout failed");
      if (json.checkoutUrl) window.location.href = json.checkoutUrl;
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Payment error" });
      setPaying(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-fadeInUp">

      {/* ── 1. CAMPUS HOME INSTITUTIONAL WELCOME BANNER — IEDS v2.0 ── */}
      <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-3xl space-y-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] text-xs font-extrabold flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" aria-hidden="true" />
                DIGITAL CAMPUS WORKSPACE
              </span>
              <span className="px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] text-xs font-bold">
                Cohort 2026 Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
              Welcome to Campus Home, <span className="text-[#15803D]">{enrollment.studentName || "Learner"}</span> 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl">
              You are enrolled in the <strong className="text-[#0F172A]">{track?.title || "8-Week AI Coding Academy"}</strong>. Your coursework, live code grading engine, and digital identity are active.
            </p>
          </div>

          {/* Learning Goal Pill */}
          <div className="shrink-0 p-4 bg-[#F0FDF4] border border-[#15803D]/20 rounded-2xl space-y-1.5 min-w-[200px]">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Primary Learning Goal
            </span>
            <strong className="text-xs font-extrabold text-[#0F172A] flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#15803D]" aria-hidden="true" />
              Software Engineer
            </strong>
            <Link
              href="/dashboard/student/identity"
              className="text-[10px] text-[#15803D] font-semibold hover:underline block pt-0.5"
            >
              Update Digital Identity →
            </Link>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
          <a
            href="#my-learning"
            className="px-4 py-2 rounded-xl bg-[#15803D] text-white font-extrabold shadow-sm transition-all btn-press flex items-center gap-1.5 hover:bg-[#166534]"
          >
            <BookOpen className="w-3.5 h-3.5" aria-hidden="true" /> Continue Learning
          </a>
          <Link
            href="/dashboard/student/programme"
            className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-[#0F172A] font-bold transition-all flex items-center gap-1.5"
          >
            <GraduationCap className="w-3.5 h-3.5 text-[#15803D]" aria-hidden="true" /> My Programme
          </Link>
          <a
            href="#assignments"
            className="px-4 py-2 rounded-xl bg-[#F0FDF4] hover:bg-[#dcfce7] border border-[#15803D]/20 text-[#15803D] font-bold transition-all flex items-center gap-1.5"
          >
            <GitPullRequest className="w-3.5 h-3.5" aria-hidden="true" /> Submit PR
          </a>
          <Link
            href="/dashboard/student/resources"
            className="px-4 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 font-bold transition-all flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#15803D]" aria-hidden="true" /> Resource Library
          </Link>
        </div>
      </div>

      {/* ── ACADEMIC INTELLIGENCE LAYER (v3.4) ── */}
      <StudentSuccessDashboard studentName={enrollment.studentName} />
      <CompetencyRadar />
      <LearningTimeline />
      <AchievementEngine />

      {/* ── 2. MY LEARNING JOURNEY ROADMAP ── */}
      <div className="p-6 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-[#0F172A] flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#15803D]" aria-hidden="true" />
              My Learning Journey
            </h2>
            <p className="text-xs text-slate-500">Your institutional academic progression roadmap</p>
          </div>
          <span className="text-xs font-bold text-[#15803D] bg-[#F0FDF4] border border-[#15803D]/20 px-3 py-1 rounded-full">
            Stage 4: Active Learning
          </span>
        </div>

        {/* Progression Stage Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 text-center pt-2">
          {[
            { stage: "01. Application", status: "completed" },
            { stage: "02. Admission", status: "completed" },
            { stage: "03. Orientation", status: "completed" },
            { stage: "04. Active Learning", status: "current" },
            { stage: "05. PR Evaluation", status: "upcoming" },
            { stage: "06. Certification", status: "upcoming" },
            { stage: "07. Career Launch", status: "upcoming" },
          ].map((s) => (
            <div
              key={s.stage}
              className={`p-2.5 rounded-xl border text-[11px] font-bold transition-all ${
                s.status === "completed"
                  ? "bg-[#F0FDF4] border-[#15803D]/30 text-[#15803D]"
                  : s.status === "current"
                  ? "bg-[#FEFCE8] border-[#D4A017] text-[#D4A017] shadow-sm"
                  : "bg-slate-50 border-slate-200 text-slate-400"
              }`}
            >
              {s.status === "completed" && <span className="block text-[9px] text-[#15803D]">✓ Done</span>}
              {s.status === "current" && <span className="block text-[9px] text-[#D4A017]">● Active Now</span>}
              {s.status === "upcoming" && <span className="block text-[9px] text-slate-400">○ Pending</span>}
              <span className="truncate block mt-0.5">{s.stage}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Suspension Banner ── */}
      {isSuspended && (
        <div
          className="relative p-6 rounded-2xl border overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
          style={{
            background: "#FFFBEB",
            borderColor: "#F59E0B",
          }}
        >
          <div className="flex items-start gap-4 relative">
            <div className="p-3 bg-amber-100 text-amber-700 rounded-xl border border-amber-200 shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-amber-900">Account Suspended — Installment Overdue</h3>
              <p className="text-xs text-amber-800/80 mt-1 max-w-xl leading-relaxed">
                Your video lessons and assignment access are locked. Settle your outstanding balance to restore full workspace privileges.
              </p>
            </div>
          </div>
          <button
            onClick={() => handlePayInstallment(outstandingBalance || 80000)}
            disabled={paying}
            className="relative w-full md:w-auto px-6 py-3 font-extrabold rounded-xl text-xs shadow-lg transition-all flex items-center justify-center gap-2 shrink-0 bg-[#F59E0B] text-white hover:bg-[#D97706]"
          >
            <CreditCard className="w-4 h-4" />
            {paying ? "Processing…" : `Pay Now — ₦${(outstandingBalance || 80000).toLocaleString()}`}
          </button>
        </div>
      )}

      {/* ── Flash Message ── */}
      {message && (
        <div
          className={`p-4 rounded-2xl border text-xs flex items-center gap-3 animate-fadeIn ${
            message.type === "success"
              ? "bg-[#F0FDF4] border-[#15803D]/20 text-[#15803D]"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-[#15803D] shrink-0" />
          ) : (
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
          )}
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      {/* ── Hero Stats Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Progress Ring Card */}
        <div className="col-span-2 sm:col-span-1 relative p-5 rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
          <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">Track Progress</div>
          <div className="relative flex items-center justify-center">
            <ProgressRing percent={progressPercent} />
            <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
              <span className="text-2xl font-black text-[#0F172A]">{progressPercent}%</span>
              <span className="text-[9px] text-slate-500 font-semibold">Complete</span>
            </div>
          </div>
          <div className="mt-3 text-center">
            <div className="text-[10px] text-slate-500">
              Cohort: <span className="text-[#0F172A] font-bold">{enrollment.cohort?.title || "DWSA Cohort"}</span>
            </div>
          </div>
        </div>

        <StatCard icon={Trophy} label="Modules Done" value={`${completedCount}/${modules.length}`} sub="Completed lessons" accent="#D4A017" />
        <StatCard
          icon={BarChart3}
          label="Total Paid"
          value={`₦${enrollment.amountPaid.toLocaleString()}`}
          sub={enrollment.paymentPlan}
          accent="#15803D"
        />
        <StatCard
          icon={outstandingBalance > 0 ? Flame : Award}
          label={outstandingBalance > 0 ? "Balance Due" : "Fully Paid"}
          value={outstandingBalance > 0 ? `₦${outstandingBalance.toLocaleString()}` : "✓ Cleared"}
          sub={outstandingBalance > 0 ? "Outstanding" : "No balance"}
          accent={outstandingBalance > 0 ? "#DC2626" : "#15803D"}
        />
      </div>

      {/* ── 3. MEET YOUR MENTOR & CAMPUS NEWS ROW ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Meet Your Mentor Card */}
        <div className="p-6 bg-white border border-slate-200 rounded-3xl space-y-4 flex flex-col justify-between shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-[#D4A017] bg-[#FEFCE8] px-2.5 py-0.5 rounded-full border border-[#D4A017]/30 uppercase">
                ACADEMIC FACULTY MENTOR
              </span>
              <span className="text-[10px] text-[#15803D] font-bold uppercase">Office Hours Active</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#15803D] text-white flex items-center justify-center font-black text-xl shadow-md shrink-0">
                AJ
              </div>
              <div>
                <h3 className="text-base font-bold text-[#0F172A]">Ayar Japheth Idyege</h3>
                <p className="text-xs text-[#15803D] font-semibold">Lead Software Architect &amp; DTA Faculty Instructor</p>
                <p className="text-[11px] text-slate-500 mt-0.5">Office Hours: Mon–Fri, 2:00 PM – 6:00 PM WAT</p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <a
              href="https://wa.me/2347082135071?text=Hello%20Ayar%20Japheth%2C%20I%20want%20to%20request%20a%20PR%20review%20or%20mentorship%20session"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl bg-[#F0FDF4] hover:bg-[#15803D] hover:text-white border border-[#15803D]/20 text-[#15803D] font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <Users className="w-3.5 h-3.5" aria-hidden="true" /> Request 1-on-1 PR Review Session
            </a>
          </div>
        </div>

        {/* Campus News Widget */}
        <div className="p-6 bg-white border border-slate-200 rounded-3xl space-y-4 flex flex-col justify-between shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-[#15803D] bg-[#F0FDF4] px-2.5 py-0.5 rounded-full border border-[#15803D]/20 uppercase">
                INSTITUTIONAL NEWS
              </span>
              <Link href="/knowledge-hub" className="text-[10px] text-[#15803D] font-bold hover:underline">
                View All News →
              </Link>
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-[#F8FAFC] border border-slate-200 rounded-xl space-y-1">
                <span className="text-[9px] text-[#D4A017] font-bold uppercase">ANNOUNCEMENT</span>
                <h4 className="text-xs font-bold text-[#0F172A] leading-snug">
                  Annual Pan-African Student Hackathon Announced for Cohort 2026
                </h4>
                <p className="text-[11px] text-slate-500">Top 3 winning capstone projects will receive seed mentorship and DWSA cloud infrastructure credits.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── Financial Status Panel ── */}
      <div className="relative p-6 rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl border border-[#D4A017]/30 bg-[#FEFCE8]">
              <CreditCard className="w-5 h-5 text-[#D4A017]" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-[#0F172A]">Tuition Financial Overview</h3>
              <p className="text-[11px] text-slate-500 mt-0.5">
                {enrollment.paymentPlan === "INSTALLMENT"
                  ? "Installment plan — milestones unlock modular access"
                  : "Full tuition paid in advance — all access granted"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                enrollment.status === "ACTIVE"
                  ? "bg-[#F0FDF4] border-[#15803D]/20 text-[#15803D]"
                  : enrollment.status === "SUSPENDED"
                  ? "bg-[#FEFCE8] border-[#D4A017]/30 text-[#D4A017]"
                  : "bg-slate-100 border-slate-200 text-slate-500"
              }`}
            >
              {enrollment.status}
            </span>

            {outstandingBalance > 0 && !isSuspended && (
              <button
                onClick={() => handlePayInstallment(outstandingBalance)}
                disabled={paying}
                className="px-5 py-2.5 font-extrabold rounded-xl text-xs transition-all flex items-center gap-2 shadow-sm btn-press bg-[#D4A017] text-white hover:bg-[#B8860B]"
              >
                <CreditCard className="w-3.5 h-3.5" />
                {paying ? "Processing…" : `Pay ₦${outstandingBalance.toLocaleString()}`}
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-5 space-y-2">
          <div className="flex justify-between text-[10px] text-slate-500">
            <span>Payment Progress</span>
            <span className="text-[#0F172A] font-bold">
              ₦{enrollment.amountPaid.toLocaleString()} / ₦{enrollment.totalAmount.toLocaleString()}
            </span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${Math.min(100, (enrollment.amountPaid / enrollment.totalAmount) * 100)}%`,
                background: "linear-gradient(90deg, #15803D, #D4A017)",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Main Content: Player + Sidebar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left: Video Player + Lesson Content */}
        <div className="lg:col-span-2 space-y-5">
          {activeModule ? (
            <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
              {/* Video */}
              <div className="p-5 pb-3">
                <YouTubePlayer
                  youtubeId={activeModule.youtubeId}
                  title={activeModule.title}
                  durationMinutes={activeModule.durationMinutes}
                  isFreePreview={activeModule.isFreePreview}
                />
              </div>

              {/* Lesson Header */}
              <div className="px-5 py-4 border-t border-slate-100">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border bg-[#FEFCE8] border-[#D4A017]/40 text-[#D4A017]">
                      Module {activeModule.order}
                    </span>
                    <span className="text-[10px] text-[#15803D] font-bold uppercase tracking-wider">
                      HD Masterclass
                    </span>
                  </div>
                  {activeModule.githubStarterRepo && (
                    <a
                      href={activeModule.githubStarterRepo}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105 border bg-[#F0FDF4] border-[#15803D]/20 text-[#15803D] hover:bg-[#15803D] hover:text-white"
                    >
                      <Code className="w-3.5 h-3.5" />
                      Starter Repo
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  )}
                </div>
                <h2 className="text-xl font-black text-[#0F172A] mt-3">{activeModule.title}</h2>
              </div>

              {/* Lesson Notes */}
              <div className="mx-5 mb-5 p-5 rounded-xl text-xs leading-relaxed whitespace-pre-wrap border border-slate-200 bg-[#F8FAFC] text-[#334155]" style={{ fontFamily: "'JetBrains Mono','Fira Code',monospace", fontSize: "11.5px", lineHeight: "1.8" }}>
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-slate-200">
                  <BookOpen className="w-3.5 h-3.5 text-[#15803D]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#15803D]">
                    Lesson Notes
                  </span>
                </div>
                {activeModule.contentMarkdown}
              </div>

              {/* Assignments */}
              <div className="px-5 pb-5 space-y-4">
                <h4 className="text-xs font-black text-[#0F172A] uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-slate-100">
                  <div className="p-1.5 rounded-lg bg-[#F0FDF4] border border-[#15803D]/20">
                    <GitPullRequest className="w-3.5 h-3.5 text-[#15803D]" />
                  </div>
                  Assignments & Code Submissions
                </h4>

                {activeModule.assignments?.length === 0 ? (
                  <div className="py-8 text-center">
                    <div className="w-10 h-10 mx-auto rounded-xl bg-[#F0FDF4] border border-[#15803D]/20 flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-5 h-5 text-[#15803D]" />
                    </div>
                    <p className="text-xs text-slate-500">No assignments for this module.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activeModule.assignments.map((assignment: any) => {
                      const sub = assignment.submissions?.[0];
                      const isApproved = sub?.status === "APPROVED";
                      const isRejected = sub?.status === "REJECTED";
                      const isPending = sub && !isApproved && !isRejected;

                      return (
                        <div
                          key={assignment.id}
                          className={`p-5 rounded-xl border space-y-4 transition-all ${
                            isApproved
                              ? "bg-[#F0FDF4] border-[#15803D]/20"
                              : isRejected
                              ? "bg-red-50 border-red-200"
                              : isPending
                              ? "bg-[#FEFCE8] border-[#D4A017]/30"
                              : "bg-[#F8FAFC] border-slate-200"
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h5 className="text-xs font-black text-[#0F172A] flex items-center gap-2 flex-wrap">
                                {assignment.title}
                                {assignment.githubPRRequired && (
                                  <span className="px-2 py-0.5 bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20 text-[9px] font-bold rounded-md">
                                    PR Required
                                  </span>
                                )}
                              </h5>
                              <p className="text-[11px] text-slate-600 mt-1.5 leading-relaxed">
                                {assignment.instructions}
                              </p>
                            </div>
                            {sub && (
                              <span
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-black border uppercase tracking-wider shrink-0 ${
                                  isApproved
                                    ? "bg-[#F0FDF4] border-[#15803D]/20 text-[#15803D]"
                                    : isRejected
                                    ? "bg-red-50 border-red-200 text-red-700"
                                    : "bg-[#FEFCE8] border-[#D4A017]/30 text-[#D4A017]"
                                }`}
                              >
                                {sub.status}
                              </span>
                            )}
                          </div>

                          {sub?.feedback && (
                            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-1.5">
                              <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">
                                Instructor Feedback
                              </span>
                              <p className="text-xs text-[#334155] italic leading-relaxed">{sub.feedback}</p>
                              {sub.grade && (
                                <div className="flex items-center gap-1.5 mt-1">
                                  <Star className="w-3 h-3 text-[#D4A017]" />
                                  <span className="text-[#D4A017] font-black text-xs">Grade: {sub.grade}</span>
                                </div>
                              )}
                            </div>
                          )}

                          {!isApproved && !isSuspended && (
                            <div className="space-y-2 pt-1 border-t border-slate-200">
                              <label className="block text-[11px] font-bold text-slate-600">
                                {assignment.githubPRRequired
                                  ? "Submit GitHub Pull Request URL"
                                  : "Submit Code Repository Link"}
                              </label>
                              <div className="flex gap-2">
                                <input
                                  type="url"
                                  placeholder={
                                    assignment.githubPRRequired
                                      ? "https://github.com/owner/repo/pull/1"
                                      : "https://github.com/owner/repo"
                                  }
                                  value={prUrls[assignment.id] ?? sub?.githubPRUrl ?? ""}
                                  onChange={(e) =>
                                    setPrUrls((prev) => ({ ...prev, [assignment.id]: e.target.value }))
                                  }
                                  className="flex-1 px-3 py-2.5 rounded-xl text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none transition-all border border-slate-200 focus:border-[#15803D] bg-white"
                                />
                                <button
                                  onClick={() => handleSubmitPR(assignment.id)}
                                  disabled={submittingId === assignment.id}
                                  className="px-4 py-2 font-extrabold rounded-xl text-xs transition-all flex items-center gap-1.5 shrink-0 disabled:opacity-60 bg-[#15803D] text-white hover:bg-[#166534]"
                                >
                                  <Send className="w-3.5 h-3.5" />
                                  {submittingId === assignment.id ? "Validating…" : "Submit PR"}
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-2xl border border-slate-200 bg-white flex flex-col items-center justify-center min-h-[400px] text-center p-10 space-y-4 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-[#F0FDF4] border border-[#15803D]/20 flex items-center justify-center">
                <PlayCircle className="w-8 h-8 text-[#15803D]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#0F172A]">Ready to Learn?</h3>
                <p className="text-xs text-slate-500 mt-1">Select a module from the playlist to begin streaming.</p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Module Playlist Sidebar */}
        <div className="space-y-3">
          {/* Sidebar Header */}
          <div className="p-4 rounded-2xl border border-slate-200 bg-white flex items-center justify-between shadow-sm">
            <div>
              <h3 className="text-xs font-black text-[#0F172A] flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#15803D]" />
                Cohort Playlist
              </h3>
              <p className="text-[10px] text-slate-500 mt-0.5">
                {completedCount} of {modules.length} completed
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="text-[10px] font-black text-[#15803D]">{progressPercent}%</div>
              <TrendingUp className="w-3.5 h-3.5 text-[#15803D]" />
            </div>
          </div>

          {/* Mini overall progress */}
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${progressPercent}%`,
                background: "linear-gradient(90deg, #15803D, #D4A017)",
              }}
            />
          </div>

          {/* Module List */}
          <div className="space-y-2">
            {modules.map((mod: any, idx: number) => {
              const isSelected = activeModule?.id === mod.id;
              const hasCompleted = mod.assignments?.every((a: any) =>
                a.submissions?.some((s: any) => s.status === "APPROVED")
              );

              return (
                <button
                  key={mod.id}
                  onClick={() => !isSuspended && setSelectedModuleId(mod.id)}
                  disabled={isSuspended}
                  className={`w-full p-4 rounded-xl border text-left transition-all group relative overflow-hidden ${
                    isSuspended ? "opacity-40 cursor-not-allowed" : "hover:shadow-sm"
                  } ${
                    isSelected
                      ? "bg-[#F0FDF4] border-[#15803D]/40 shadow-sm"
                      : "bg-white border-slate-200 hover:border-[#15803D]/30"
                  }`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#15803D] rounded-r-full" />
                  )}

                  <div className="flex items-start gap-3">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border text-[10px] font-black mt-0.5 ${
                      hasCompleted
                        ? "bg-[#F0FDF4] border-[#15803D]/30 text-[#15803D]"
                        : isSelected
                        ? "bg-[#F0FDF4] border-[#15803D]/40 text-[#15803D]"
                        : "bg-slate-50 border-slate-200 text-slate-500"
                    }`}>
                      {hasCompleted ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : isSelected ? (
                        <PlayCircle className="w-3.5 h-3.5" />
                      ) : (
                        <span>{String(idx + 1).padStart(2, "0")}</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <span className={`block text-xs font-bold leading-tight truncate transition-colors ${
                        isSelected ? "text-[#15803D]" : "text-[#0F172A]"
                      }`}>
                        {mod.title}
                      </span>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1">
                        {mod.durationMinutes && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-2.5 h-2.5" />
                            {mod.durationMinutes}m
                          </span>
                        )}
                        <span>•</span>
                        <span>{mod.assignments?.length || 0} task(s)</span>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-3.5 h-3.5 shrink-0 mt-1 transition-colors ${
                        isSelected ? "text-[#15803D]" : "text-slate-400"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom CTA if suspended */}
          {isSuspended && (
            <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50 text-center space-y-3">
              <Lock className="w-5 h-5 text-amber-600 mx-auto" />
              <p className="text-[11px] text-amber-700 leading-relaxed">
                Modules locked. Clear your balance to resume access.
              </p>
              <button
                onClick={() => handlePayInstallment(outstandingBalance || 80000)}
                disabled={paying}
                className="w-full py-2.5 rounded-xl text-xs font-extrabold transition-all bg-[#D4A017] text-white hover:bg-[#B8860B]"
              >
                {paying ? "Processing…" : `Unlock — ₦${(outstandingBalance || 80000).toLocaleString()}`}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
