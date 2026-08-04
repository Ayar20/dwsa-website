"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import YouTubePlayer from "@/components/YouTubePlayer";
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
      <circle cx="65" cy="65" r={r} fill="none" stroke="#0f223d" strokeWidth="10" />
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
          <stop offset="0%" stopColor="#d4a017" />
          <stop offset="100%" stopColor="#00d2ff" />
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
      className="relative p-5 rounded-2xl border overflow-hidden group hover:scale-[1.02] transition-transform duration-300"
      style={{
        background: "rgba(6,20,40,0.7)",
        borderColor: `${accent}33`,
        backdropFilter: "blur(12px)",
        boxShadow: `0 4px 24px ${accent}11`,
      }}
    >
      {/* Glow blob */}
      <div
        className="absolute -top-4 -right-4 w-20 h-20 rounded-full opacity-20 blur-2xl group-hover:opacity-30 transition-opacity"
        style={{ background: accent }}
      />
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
        <div className="text-2xl font-black text-white leading-none">{value}</div>
        <div className="text-[10px] font-semibold uppercase tracking-wider mt-1" style={{ color: accent }}>
          {label}
        </div>
        {sub && <div className="text-[10px] text-[#8899b4] mt-0.5">{sub}</div>}
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
        {/* Premium loader */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-[#0f223d]" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#d4a017] border-r-[#00d2ff] animate-spin" />
          <div className="absolute inset-3 rounded-full bg-gradient-to-br from-[#d4a017]/20 to-[#00d2ff]/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#d4a017]" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-white">Initialising Workspace</p>
          <p className="text-[11px] text-[#8899b4] mt-1">Loading your cohort curriculum & lessons…</p>
        </div>
      </div>
    );
  }

  if (isError || !data || !data.enrolled) {
    return (
      <div className="max-w-lg mx-auto mt-16">
        <div
          className="p-8 rounded-3xl border text-center space-y-5"
          style={{
            background: "rgba(6,20,40,0.8)",
            borderColor: "#d4a01733",
            backdropFilter: "blur(20px)",
            boxShadow: "0 20px 60px rgba(212,160,23,0.08)",
          }}
        >
          <div className="mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d4a017]/20 to-[#00d2ff]/10 flex items-center justify-center border border-[#d4a017]/30">
            <AlertTriangle className="w-8 h-8 text-[#d4a017]" />
          </div>
          <div>
            <h2 className="text-xl font-black text-white">Enrollment Required</h2>
            <p className="text-xs text-[#8899b4] mt-2 leading-relaxed max-w-sm mx-auto">
              You are not registered in an active DWSA cohort. Please contact administration
              or sign in with an enrolled student account.
            </p>
          </div>
          <div className="flex gap-3 pt-2 justify-center">
            <div className="px-3 py-1.5 rounded-lg bg-[#0f223d] border border-[#d4a017]/30 text-[10px] font-bold text-[#d4a017] flex items-center gap-1.5">
              <BookOpen className="w-3 h-3" /> DWSA Academy
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-[#0f223d] border border-[#00d2ff]/30 text-[10px] font-bold text-[#00d2ff] flex items-center gap-1.5">
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

      {/* ── 1. CAMPUS HOME INSTITUTIONAL WELCOME BANNER ── */}
      <div className="p-6 sm:p-8 bg-gradient-to-br from-[#061428] via-[#091832] to-[#061428] border-2 border-[#d4a017] rounded-3xl space-y-5 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#d4a017]/15 border border-[#d4a017]/40 text-[#d4a017] text-xs font-extrabold flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" aria-hidden="true" />
                DIGITAL CAMPUS WORKSPACE
              </span>
              <span className="px-3 py-1 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80] text-xs font-bold">
                Cohort 2026 Active
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Welcome to Campus Home, <span className="text-[#d4a017]">{enrollment.studentName || "Learner"}</span> 👋
            </h1>
            <p className="text-xs sm:text-sm text-[#8899b4] leading-relaxed max-w-2xl">
              You are enrolled in the <strong>{track?.title || "8-Week AI Coding Academy"}</strong>. Your coursework, live code grading engine, and digital identity are active.
            </p>
          </div>

          {/* Learning Goal Pill */}
          <div className="shrink-0 p-4 bg-[#030e1f] border border-[#d4a017]/30 rounded-2xl space-y-1.5 min-w-[200px]">
            <span className="text-[10px] font-bold text-[#8899b4] uppercase tracking-wider block">
              Primary Learning Goal
            </span>
            <strong className="text-xs font-extrabold text-white flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#d4a017]" aria-hidden="true" />
              Software Engineer
            </strong>
            <Link
              href="/dashboard/student/identity"
              className="text-[10px] text-[#d4a017] font-semibold hover:underline block pt-0.5"
            >
              Update Digital Identity →
            </Link>
          </div>
        </div>

        {/* Quick Actions Bar */}
        <div className="pt-3 border-t border-[#d4a017]/20 flex flex-wrap items-center gap-2 text-xs">
          <a
            href="#my-learning"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#d4a017] to-[#e5a910] hover:from-[#e5a910] hover:to-[#d4a017] text-[#030e1f] font-extrabold shadow-md shadow-[#d4a017]/20 transition-all btn-press flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" aria-hidden="true" /> Continue Learning
          </a>
          <Link
            href="/dashboard/student/programme"
            className="px-4 py-2 rounded-xl bg-[#0f223d] hover:bg-[#16335a] border border-[#d4a017]/40 text-[#d4a017] font-bold transition-all flex items-center gap-1.5"
          >
            <GraduationCap className="w-3.5 h-3.5" aria-hidden="true" /> My Programme
          </Link>
          <a
            href="#assignments"
            className="px-4 py-2 rounded-xl bg-[#0f223d] hover:bg-[#16335a] border border-purple-500/40 text-purple-300 font-bold transition-all flex items-center gap-1.5"
          >
            <GitPullRequest className="w-3.5 h-3.5" aria-hidden="true" /> Submit PR
          </a>
          <Link
            href="/dashboard/student/resources"
            className="px-4 py-2 rounded-xl bg-[#0f223d] hover:bg-[#16335a] border border-slate-700 text-slate-300 font-bold transition-all flex items-center gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5" aria-hidden="true" /> Resource Library
          </Link>
        </div>
      </div>

      {/* ── 2. MY LEARNING JOURNEY ROADMAP ── */}
      <div className="p-6 bg-[#061428] border border-[#d4a017]/30 rounded-3xl space-y-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#d4a017]" aria-hidden="true" />
              My Learning Journey
            </h2>
            <p className="text-xs text-[#8899b4]">Your institutional academic progression roadmap</p>
          </div>
          <span className="text-xs font-bold text-[#4ade80] bg-[#4ade80]/10 border border-[#4ade80]/30 px-3 py-1 rounded-full">
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
                  ? "bg-[#4ade80]/10 border-[#4ade80]/30 text-[#4ade80]"
                  : s.status === "current"
                  ? "bg-[#d4a017]/20 border-[#d4a017] text-[#d4a017] shadow-md shadow-[#d4a017]/10"
                  : "bg-[#030e1f] border-slate-800 text-slate-500"
              }`}
            >
              {s.status === "completed" && <span className="block text-[9px] text-[#4ade80]">✓ Done</span>}
              {s.status === "current" && <span className="block text-[9px] text-[#d4a017]">● Active Now</span>}
              {s.status === "upcoming" && <span className="block text-[9px] text-slate-500">○ Pending</span>}
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
            background: "linear-gradient(135deg, rgba(120,53,15,0.5) 0%, rgba(92,26,0,0.4) 100%)",
            borderColor: "#f59e0b66",
            boxShadow: "0 8px 32px rgba(245,158,11,0.15)",
          }}
        >
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: "repeating-linear-gradient(45deg, #f59e0b 0, #f59e0b 1px, transparent 0, transparent 50%)",
              backgroundSize: "10px 10px",
            }}
          />
          <div className="flex items-start gap-4 relative">
            <div className="p-3 bg-amber-900/60 text-amber-300 rounded-xl border border-amber-700/60 shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-amber-200">Account Suspended — Installment Overdue</h3>
              <p className="text-xs text-amber-300/80 mt-1 max-w-xl leading-relaxed">
                Your video lessons and assignment access are locked. Settle your outstanding balance to restore full workspace privileges.
              </p>
            </div>
          </div>
          <button
            onClick={() => handlePayInstallment(outstandingBalance || 80000)}
            disabled={paying}
            className="relative w-full md:w-auto px-6 py-3 font-extrabold rounded-xl text-xs shadow-lg transition-all flex items-center justify-center gap-2 shrink-0"
            style={{
              background: "linear-gradient(135deg, #f59e0b, #d97706)",
              color: "#1c0a00",
              boxShadow: "0 4px 20px rgba(245,158,11,0.3)",
            }}
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
              ? "bg-emerald-950/60 border-emerald-600/40 text-emerald-300"
              : "bg-red-950/60 border-red-600/40 text-red-300"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
          )}
          <span className="font-medium">{message.text}</span>
        </div>
      )}

      {/* ── Hero Stats Row ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Progress Ring Card */}
        <div
          className="col-span-2 sm:col-span-1 relative p-5 rounded-2xl border overflow-hidden"
          style={{
            background: "rgba(6,20,40,0.8)",
            borderColor: "#d4a01730",
            backdropFilter: "blur(16px)",
            boxShadow: "0 8px 32px rgba(212,160,23,0.08)",
          }}
        >
          <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-[#d4a017] opacity-10 blur-3xl" />
          <div className="text-[10px] font-bold uppercase tracking-widest text-[#8899b4] mb-3">Track Progress</div>
          <div className="relative flex items-center justify-center">
            <ProgressRing percent={progressPercent} />
            <div className="absolute inset-0 flex flex-col items-center justify-center rotate-0">
              <span className="text-2xl font-black text-white">{progressPercent}%</span>
              <span className="text-[9px] text-[#8899b4] font-semibold">Complete</span>
            </div>
          </div>
          <div className="mt-3 text-center">
            <div className="text-[10px] text-[#8899b4]">
              Cohort: <span className="text-white font-bold">{enrollment.cohort?.title || "DWSA Cohort"}</span>
            </div>
          </div>
        </div>

        <StatCard icon={Trophy} label="Modules Done" value={`${completedCount}/${modules.length}`} sub="Completed lessons" accent="#d4a017" />
        <StatCard
          icon={BarChart3}
          label="Total Paid"
          value={`₦${enrollment.amountPaid.toLocaleString()}`}
          sub={enrollment.paymentPlan}
          accent="#4ade80"
        />
        <StatCard
          icon={outstandingBalance > 0 ? Flame : Award}
          label={outstandingBalance > 0 ? "Balance Due" : "Fully Paid"}
          value={outstandingBalance > 0 ? `₦${outstandingBalance.toLocaleString()}` : "✓ Cleared"}
          sub={outstandingBalance > 0 ? "Outstanding" : "No balance"}
          accent={outstandingBalance > 0 ? "#f87171" : "#4ade80"}
        />
      </div>

      {/* ── 3. MEET YOUR MENTOR & CAMPUS NEWS ROW ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Meet Your Mentor Card */}
        <div className="p-6 bg-[#061428] border border-[#d4a017]/30 rounded-3xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-[#d4a017] bg-[#d4a017]/10 px-2.5 py-0.5 rounded-full border border-[#d4a017]/30 uppercase">
                ACADEMIC FACULTY MENTOR
              </span>
              <span className="text-[10px] text-[#4ade80] font-bold uppercase">Office Hours Active</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4a017] to-[#e5a910] text-[#030e1f] flex items-center justify-center font-black text-xl shadow-md shrink-0">
                AJ
              </div>
              <div>
                <h3 className="text-base font-bold text-white">Ayar Japheth Idyege</h3>
                <p className="text-xs text-[#d4a017] font-semibold">Lead Software Architect &amp; DTA Faculty Instructor</p>
                <p className="text-[11px] text-[#8899b4] mt-0.5">Office Hours: Mon–Fri, 2:00 PM – 6:00 PM WAT</p>
              </div>
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
            <a
              href="https://wa.me/2347082135071?text=Hello%20Ayar%20Japheth%2C%20I%20want%20to%20request%20a%20PR%20review%20or%20mentorship%20session"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2.5 rounded-xl bg-[#0f223d] hover:bg-[#16335a] border border-[#d4a017]/40 text-[#d4a017] font-bold text-xs flex items-center justify-center gap-2 transition-all"
            >
              <Users className="w-3.5 h-3.5" aria-hidden="true" /> Request 1-on-1 PR Review Session
            </a>
          </div>
        </div>

        {/* Campus News Widget */}
        <div className="p-6 bg-[#061428] border border-slate-800 rounded-3xl space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold text-[#4ade80] bg-[#4ade80]/10 px-2.5 py-0.5 rounded-full border border-[#4ade80]/30 uppercase">
                INSTITUTIONAL NEWS
              </span>
              <Link href="/knowledge-hub" className="text-[10px] text-[#d4a017] font-bold hover:underline">
                View All News →
              </Link>
            </div>

            <div className="space-y-2">
              <div className="p-3 bg-[#030e1f] border border-slate-800 rounded-xl space-y-1">
                <span className="text-[9px] text-[#d4a017] font-bold uppercase">ANNOUNCEMENT</span>
                <h4 className="text-xs font-bold text-white leading-snug">
                  Annual Pan-African Student Hackathon Announced for Cohort 2026
                </h4>
                <p className="text-[11px] text-[#8899b4]">Top 3 winning capstone projects will receive seed mentorship and DWSA cloud infrastructure credits.</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* ── Financial Status Panel ── */}
      <div
        className="relative p-6 rounded-2xl border overflow-hidden"
        style={{
          background: "rgba(6,20,40,0.75)",
          borderColor: "#d4a01722",
          backdropFilter: "blur(16px)",
          boxShadow: "0 8px 40px rgba(212,160,23,0.05)",
        }}
      >
        {/* Decorative gradient strip */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#d4a017] to-transparent opacity-60" />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl border border-[#d4a017]/30 bg-[#d4a017]/10">
              <CreditCard className="w-5 h-5 text-[#d4a017]" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white">Tuition Financial Overview</h3>
              <p className="text-[11px] text-[#8899b4] mt-0.5">
                {enrollment.paymentPlan === "INSTALLMENT"
                  ? "Installment plan — milestones unlock modular access"
                  : "Full tuition paid in advance — all access granted"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Status Badge */}
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                enrollment.status === "ACTIVE"
                  ? "bg-emerald-950/80 border-emerald-500/40 text-[#4ade80]"
                  : enrollment.status === "SUSPENDED"
                  ? "bg-amber-950/80 border-amber-500/40 text-[#d4a017]"
                  : "bg-[#0f223d] border-slate-700 text-[#8899b4]"
              }`}
            >
              {enrollment.status}
            </span>

            {outstandingBalance > 0 && !isSuspended && (
              <button
                onClick={() => handlePayInstallment(outstandingBalance)}
                disabled={paying}
                className="px-5 py-2.5 font-extrabold rounded-xl text-xs transition-all flex items-center gap-2 shadow-md btn-press"
                style={{
                  background: "linear-gradient(135deg, #d4a017, #e5b520)",
                  color: "#030e1f",
                  boxShadow: "0 4px 16px rgba(212,160,23,0.25)",
                }}
              >
                <CreditCard className="w-3.5 h-3.5" />
                {paying ? "Processing…" : `Pay ₦${outstandingBalance.toLocaleString()}`}
              </button>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-5 space-y-2">
          <div className="flex justify-between text-[10px] text-[#8899b4]">
            <span>Payment Progress</span>
            <span className="text-white font-bold">
              ₦{enrollment.amountPaid.toLocaleString()} / ₦{enrollment.totalAmount.toLocaleString()}
            </span>
          </div>
          <div className="h-2 bg-[#030e1f] rounded-full overflow-hidden border border-[#d4a017]/10">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${Math.min(100, (enrollment.amountPaid / enrollment.totalAmount) * 100)}%`,
                background: "linear-gradient(90deg, #d4a017, #4ade80)",
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
            <div
              className="rounded-2xl border overflow-hidden"
              style={{
                background: "rgba(6,20,40,0.85)",
                borderColor: "#d4a01720",
                backdropFilter: "blur(16px)",
                boxShadow: "0 16px 64px rgba(0,0,0,0.4)",
              }}
            >
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
              <div className="px-5 py-4 border-t border-[#d4a017]/10">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border"
                      style={{
                        background: "#d4a01715",
                        borderColor: "#d4a01740",
                        color: "#d4a017",
                      }}
                    >
                      Module {activeModule.order}
                    </span>
                    <span className="text-[10px] text-[#00d2ff] font-bold uppercase tracking-wider">
                      HD Masterclass
                    </span>
                  </div>
                  {activeModule.githubStarterRepo && (
                    <a
                      href={activeModule.githubStarterRepo}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all hover:scale-105 border"
                      style={{
                        background: "#0f223d",
                        borderColor: "#00d2ff33",
                        color: "#00d2ff",
                      }}
                    >
                      <Code className="w-3.5 h-3.5" />
                      Starter Repo
                      <ExternalLink className="w-3 h-3 opacity-60" />
                    </a>
                  )}
                </div>
                <h2 className="text-xl font-black text-white mt-3">{activeModule.title}</h2>
              </div>

              {/* Lesson Notes */}
              <div
                className="mx-5 mb-5 p-5 rounded-xl text-xs leading-relaxed whitespace-pre-wrap border"
                style={{
                  background: "rgba(3,14,31,0.7)",
                  borderColor: "#d4a01715",
                  color: "#c8d8f0",
                  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                  fontSize: "11.5px",
                  lineHeight: "1.8",
                }}
              >
                <div className="flex items-center gap-2 mb-3 pb-3 border-b border-[#d4a017]/10">
                  <BookOpen className="w-3.5 h-3.5 text-[#d4a017]" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#d4a017]">
                    Lesson Notes
                  </span>
                </div>
                {activeModule.contentMarkdown}
              </div>

              {/* Assignments */}
              <div className="px-5 pb-5 space-y-4">
                <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2 pb-3 border-b border-[#d4a017]/10">
                  <div className="p-1.5 rounded-lg bg-purple-950/60 border border-purple-800/40">
                    <GitPullRequest className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                  Assignments & Code Submissions
                </h4>

                {activeModule.assignments?.length === 0 ? (
                  <div className="py-8 text-center">
                    <div className="w-10 h-10 mx-auto rounded-xl bg-[#0f223d] border border-slate-800 flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-5 h-5 text-[#4ade80]" />
                    </div>
                    <p className="text-xs text-[#8899b4]">No assignments for this module.</p>
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
                          className="p-5 rounded-xl border space-y-4 transition-all"
                          style={{
                            background: isApproved
                              ? "rgba(16,46,30,0.7)"
                              : isRejected
                              ? "rgba(46,16,16,0.7)"
                              : "rgba(10,20,40,0.6)",
                            borderColor: isApproved
                              ? "#4ade8030"
                              : isRejected
                              ? "#f8717130"
                              : isPending
                              ? "#d4a01730"
                              : "#1e3a5f",
                          }}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1">
                              <h5 className="text-xs font-black text-white flex items-center gap-2 flex-wrap">
                                {assignment.title}
                                {assignment.githubPRRequired && (
                                  <span className="px-2 py-0.5 bg-purple-950/80 text-purple-400 border border-purple-800/60 text-[9px] font-bold rounded-md">
                                    PR Required
                                  </span>
                                )}
                              </h5>
                              <p className="text-[11px] text-[#8899b4] mt-1.5 leading-relaxed">
                                {assignment.instructions}
                              </p>
                            </div>
                            {sub && (
                              <span
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-black border uppercase tracking-wider shrink-0 ${
                                  isApproved
                                    ? "bg-emerald-950 border-emerald-700/50 text-[#4ade80]"
                                    : isRejected
                                    ? "bg-red-950 border-red-700/50 text-[#f87171]"
                                    : "bg-amber-950 border-amber-700/50 text-[#d4a017]"
                                }`}
                              >
                                {sub.status}
                              </span>
                            )}
                          </div>

                          {sub?.feedback && (
                            <div
                              className="p-4 rounded-xl border space-y-1.5"
                              style={{ background: "rgba(3,14,31,0.6)", borderColor: "#1e3a5f" }}
                            >
                              <span className="text-[10px] font-black text-[#8899b4] uppercase tracking-wider block">
                                Instructor Feedback
                              </span>
                              <p className="text-xs text-[#c8d8f0] italic leading-relaxed">{sub.feedback}</p>
                              {sub.grade && (
                                <div className="flex items-center gap-1.5 mt-1">
                                  <Star className="w-3 h-3 text-[#d4a017]" />
                                  <span className="text-[#00d2ff] font-black text-xs">Grade: {sub.grade}</span>
                                </div>
                              )}
                            </div>
                          )}

                          {!isApproved && !isSuspended && (
                            <div className="space-y-2 pt-1 border-t border-[#1e3a5f]">
                              <label className="block text-[11px] font-bold text-[#8899b4]">
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
                                  className="flex-1 px-3 py-2.5 rounded-xl text-xs text-white placeholder-[#4a6080] focus:outline-none transition-all border"
                                  style={{
                                    background: "rgba(3,14,31,0.8)",
                                    borderColor: "#1e3a5f",
                                  }}
                                  onFocus={(e) => (e.target.style.borderColor = "#d4a017")}
                                  onBlur={(e) => (e.target.style.borderColor = "#1e3a5f")}
                                />
                                <button
                                  onClick={() => handleSubmitPR(assignment.id)}
                                  disabled={submittingId === assignment.id}
                                  className="px-4 py-2 font-extrabold rounded-xl text-xs transition-all flex items-center gap-1.5 shrink-0 disabled:opacity-60"
                                  style={{
                                    background: "linear-gradient(135deg, #7c3aed, #6d28d9)",
                                    color: "#fff",
                                    boxShadow: "0 4px 16px rgba(124,58,237,0.25)",
                                  }}
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
            <div
              className="rounded-2xl border flex flex-col items-center justify-center min-h-[400px] text-center p-10 space-y-4"
              style={{
                background: "rgba(6,20,40,0.7)",
                borderColor: "#d4a01720",
                backdropFilter: "blur(16px)",
              }}
            >
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d4a017]/20 to-[#00d2ff]/10 border border-[#d4a017]/20 flex items-center justify-center">
                <PlayCircle className="w-8 h-8 text-[#d4a017]" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Ready to Learn?</h3>
                <p className="text-xs text-[#8899b4] mt-1">Select a module from the playlist to begin streaming.</p>
              </div>
            </div>
          )}
        </div>

        {/* Right: Module Playlist Sidebar */}
        <div className="space-y-3">
          {/* Sidebar Header */}
          <div
            className="p-4 rounded-2xl border flex items-center justify-between"
            style={{
              background: "rgba(6,20,40,0.8)",
              borderColor: "#d4a01722",
              backdropFilter: "blur(16px)",
            }}
          >
            <div>
              <h3 className="text-xs font-black text-white flex items-center gap-2">
                <Zap className="w-3.5 h-3.5 text-[#d4a017]" />
                Cohort Playlist
              </h3>
              <p className="text-[10px] text-[#8899b4] mt-0.5">
                {completedCount} of {modules.length} completed
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="text-[10px] font-black text-[#d4a017]">{progressPercent}%</div>
              <TrendingUp className="w-3.5 h-3.5 text-[#d4a017]" />
            </div>
          </div>

          {/* Mini overall progress */}
          <div className="h-1.5 bg-[#030e1f] rounded-full overflow-hidden border border-[#d4a017]/10">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${progressPercent}%`,
                background: "linear-gradient(90deg, #d4a017, #00d2ff)",
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
                    isSuspended ? "opacity-40 cursor-not-allowed" : "hover:scale-[1.01]"
                  }`}
                  style={{
                    background: isSelected
                      ? "linear-gradient(135deg, rgba(212,160,23,0.12), rgba(0,210,255,0.08))"
                      : "rgba(6,20,40,0.6)",
                    borderColor: isSelected ? "#d4a01750" : "#1e3a5f",
                    boxShadow: isSelected ? "0 4px 20px rgba(212,160,23,0.10)" : "none",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#d4a017] to-[#00d2ff] rounded-r-full" />
                  )}

                  <div className="flex items-start gap-3">
                    {/* Module Number / Status Icon */}
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border text-[10px] font-black mt-0.5"
                      style={{
                        background: hasCompleted
                          ? "rgba(74,222,128,0.1)"
                          : isSelected
                          ? "rgba(212,160,23,0.15)"
                          : "rgba(15,34,61,0.8)",
                        borderColor: hasCompleted
                          ? "#4ade8040"
                          : isSelected
                          ? "#d4a01740"
                          : "#1e3a5f",
                        color: hasCompleted
                          ? "#4ade80"
                          : isSelected
                          ? "#d4a017"
                          : "#8899b4",
                      }}
                    >
                      {hasCompleted ? (
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      ) : isSelected ? (
                        <PlayCircle className="w-3.5 h-3.5" />
                      ) : (
                        <span>{String(idx + 1).padStart(2, "0")}</span>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <span
                        className="block text-xs font-bold leading-tight truncate transition-colors"
                        style={{ color: isSelected ? "#ffffff" : "#c8d8f0" }}
                      >
                        {mod.title}
                      </span>
                      <div className="flex items-center gap-2 text-[10px] text-[#8899b4] mt-1">
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
                      className="w-3.5 h-3.5 shrink-0 mt-1 transition-colors"
                      style={{ color: isSelected ? "#d4a017" : "#4a6080" }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Bottom CTA if suspended */}
          {isSuspended && (
            <div
              className="p-4 rounded-2xl border text-center space-y-3"
              style={{
                background: "rgba(92,26,0,0.3)",
                borderColor: "#f59e0b30",
              }}
            >
              <Lock className="w-5 h-5 text-amber-400 mx-auto" />
              <p className="text-[11px] text-amber-300/80 leading-relaxed">
                Modules locked. Clear your balance to resume access.
              </p>
              <button
                onClick={() => handlePayInstallment(outstandingBalance || 80000)}
                disabled={paying}
                className="w-full py-2.5 rounded-xl text-xs font-extrabold transition-all"
                style={{
                  background: "linear-gradient(135deg, #f59e0b, #d97706)",
                  color: "#1c0a00",
                }}
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
