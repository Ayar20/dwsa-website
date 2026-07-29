"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  DollarSign,
  Users,
  AlertOctagon,
  FileCheck,
  Search,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  ExternalLink,
  GitPullRequest,
  RefreshCw,
  SlidersHorizontal,
  Building2,
  TrendingUp,
  CreditCard,
  UserCheck,
  Sparkles,
  Award,
} from "lucide-react";

export default function AdminDashboardPage() {
  const [filterText, setFilterText] = useState("");
  const [gradingFeedback, setGradingFeedback] = useState<Record<string, string>>({});
  const [gradingScore, setGradingScore] = useState<Record<string, string>>({});
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Fetch Admin ERP Data
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const res = await fetch("/api/admin/dashboard");
      if (!res.ok) throw new Error("Unauthorized or failed to fetch admin data.");
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="py-24 text-center text-[#8899b4] text-xs flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 border-2 border-[#d4a017] border-t-transparent rounded-full animate-spin glow-gold-sm" />
          <Building2 className="w-5 h-5 text-[#d4a017] absolute inset-0 m-auto" />
        </div>
        <span className="font-bold tracking-wider text-sm text-white">Loading Financial ERP & Student Records...</span>
        <span className="text-[11px] text-[#00d2ff]">Digital World Systems Africa Management Portal</span>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-10 dwsa-glass-card rounded-3xl text-center space-y-4 max-w-xl mx-auto my-12 border border-[#d4a017]/30">
        <div className="w-14 h-14 bg-red-950/60 border border-red-800/60 rounded-2xl flex items-center justify-center mx-auto text-red-400">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-extrabold text-white">Access Forbidden</h2>
        <p className="text-xs text-[#8899b4] leading-relaxed">
          You must be signed in with an <strong className="text-[#d4a017]">ADMIN</strong> or <strong className="text-[#00d2ff]">INSTRUCTOR</strong> account to access the DWSA Financial ERP.
        </p>
      </div>
    );
  }

  const { stats, ledger = [], pendingSubmissions = [] } = data;

  // Filtered Student Ledger
  const filteredLedger = ledger.filter(
    (item: any) =>
      item.name?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.email?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.cohort?.toLowerCase().includes(filterText.toLowerCase())
  );

  // Financial aggregates
  const totalTuitionCommitted = ledger.reduce((acc: number, curr: any) => acc + (curr.totalAmount || 0), 0);
  const totalTuitionPaid = ledger.reduce((acc: number, curr: any) => acc + (curr.amountPaid || 0), 0);
  const collectionPercentage = totalTuitionCommitted > 0 ? Math.round((totalTuitionPaid / totalTuitionCommitted) * 100) : 0;

  // Toggle Override Access
  const handleToggleAccess = async (enrollmentId: string, currentStatus: string) => {
    const newStatus = currentStatus === "ACTIVE" ? "SUSPENDED" : "ACTIVE";
    setActionLoading(`override-${enrollmentId}`);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/override", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enrollmentId,
          status: newStatus,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to update enrollment status");

      setMessage({ type: "success", text: `Student access updated to ${newStatus}.` });
      refetch();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setActionLoading(null);
    }
  };

  // Grade Submission Action
  const handleGradeSubmission = async (submissionId: string, status: "APPROVED" | "REJECTED") => {
    setActionLoading(`grade-${submissionId}`);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId,
          status,
          grade: gradingScore[submissionId] || (status === "APPROVED" ? "A (Pass)" : "Re-submit"),
          feedback: gradingFeedback[submissionId] || "Reviewed by DWSA instructor.",
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to submit grade");

      setMessage({ type: "success", text: `Submission marked as ${status}.` });
      refetch();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner & Executive Header */}
      <div className="dwsa-glass-card rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        {/* Background Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#d4a017]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-[#00d2ff]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#d4a017]/20 border border-[#d4a017]/50 text-[#d4a017] rounded-full text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                <Sparkles className="w-3 h-3" />
                Executive Desk & Financial ERP
              </span>
              <span className="px-3 py-1 bg-[#00d2ff]/20 border border-[#00d2ff]/50 text-[#00d2ff] rounded-full text-[10px] font-extrabold uppercase tracking-widest">
                DWSA Tech Academy
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Financial ERP <span className="text-gold-gradient">& Command Center</span>
            </h1>
            <p className="text-xs text-[#8899b4] max-w-2xl leading-relaxed">
              Real-time financial revenue tracking, candidate enrollment ledger, milestone access override control, and code pull request evaluation desk.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => refetch()}
              className="px-4 py-2.5 bg-gradient-to-r from-[#d4a017] to-[#e5a910] hover:from-[#e5a910] hover:to-[#d4a017] text-[#030e1f] font-extrabold rounded-xl text-xs flex items-center gap-2 transition-all shadow-lg shadow-[#d4a017]/20 hover:scale-[1.02] shrink-0"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Refresh ERP Ledger
            </button>
          </div>
        </div>
      </div>

      {/* Global Toast Alerts */}
      {message && (
        <div
          className={`p-4 rounded-2xl border text-xs font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200 ${
            message.type === "success"
              ? "bg-emerald-950/70 border-emerald-500/50 text-emerald-300 shadow-lg shadow-emerald-950/50"
              : "bg-red-950/70 border-red-500/50 text-red-300 shadow-lg shadow-red-950/50"
          }`}
        >
          {message.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* --- Executive KPI Metrics Cards --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="dwsa-glass-card rounded-2xl p-5 space-y-3 relative overflow-hidden group hover:border-[#d4a017]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-[#8899b4] uppercase tracking-wider">Total Revenue</span>
            <div className="p-2.5 bg-[#d4a017]/20 text-[#d4a017] border border-[#d4a017]/40 rounded-xl group-hover:scale-110 transition-transform">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-black text-white tracking-tight">₦{(stats?.totalRevenue || 0).toLocaleString()}</p>
            <div className="flex items-center gap-1.5 mt-1 text-[10px] text-emerald-400 font-bold">
              <TrendingUp className="w-3 h-3" />
              <span>{collectionPercentage}% tuition collected</span>
            </div>
          </div>
        </div>

        {/* Active Candidates */}
        <div className="dwsa-glass-card-cyan rounded-2xl p-5 space-y-3 relative overflow-hidden group hover:border-[#00d2ff]/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-[#8899b4] uppercase tracking-wider">Active Students</span>
            <div className="p-2.5 bg-[#00d2ff]/20 text-[#00d2ff] border border-[#00d2ff]/40 rounded-xl group-hover:scale-110 transition-transform">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-black text-white tracking-tight">{stats?.activeStudents || 0}</p>
            <p className="text-[10px] text-[#00d2ff] mt-1 font-semibold">Full workspace access granted</p>
          </div>
        </div>

        {/* Suspended Accounts */}
        <div className="dwsa-glass-card rounded-2xl p-5 space-y-3 relative overflow-hidden group hover:border-amber-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-[#8899b4] uppercase tracking-wider">Suspended Accounts</span>
            <div className="p-2.5 bg-amber-500/20 text-amber-400 border border-amber-500/40 rounded-xl group-hover:scale-110 transition-transform">
              <AlertOctagon className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-black text-white tracking-tight">{stats?.suspendedStudents || 0}</p>
            <p className="text-[10px] text-amber-400 mt-1 font-semibold">Overdue installment milestones</p>
          </div>
        </div>

        {/* Pending PR Submissions */}
        <div className="dwsa-glass-card-cyan rounded-2xl p-5 space-y-3 relative overflow-hidden group hover:border-purple-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-[#8899b4] uppercase tracking-wider">Pending PR Reviews</span>
            <div className="p-2.5 bg-purple-500/20 text-purple-400 border border-purple-500/40 rounded-xl group-hover:scale-110 transition-transform">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-black text-white tracking-tight">{stats?.pendingSubmissions || 0}</p>
            <p className="text-[10px] text-purple-400 mt-1 font-semibold">Awaiting instructor evaluation</p>
          </div>
        </div>
      </div>

      {/* --- Financial Ledger Table Desk --- */}
      <div className="dwsa-glass-card rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#d4a017]/20 pb-5">
          <div className="space-y-1">
            <h3 className="text-lg font-extrabold text-white flex items-center gap-2.5">
              <CreditCard className="w-5 h-5 text-[#d4a017]" />
              Student Financial Ledger & Access Control Desk
            </h3>
            <p className="text-xs text-[#8899b4]">
              Candidate registration directory, payment plan status, tuition audit, and instant 1-click manual access toggles.
            </p>
          </div>

          {/* Search Filter input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#8899b4] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search candidate name, email..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[#061428] border border-[#d4a017]/30 rounded-xl text-xs text-white placeholder-[#8899b4] focus:outline-none focus:border-[#00d2ff] focus:ring-1 focus:ring-[#00d2ff] transition-all"
            />
          </div>
        </div>

        {/* Collection Progress Bar */}
        <div className="bg-[#061428] border border-[#d4a017]/20 rounded-2xl p-4 space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-[#8899b4] flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-[#00d2ff]" />
              Tuition Ingestion Progress:
            </span>
            <span className="text-white">
              <strong className="text-[#d4a017]">₦{totalTuitionPaid.toLocaleString()}</strong> / ₦{totalTuitionCommitted.toLocaleString()} ({collectionPercentage}%)
            </span>
          </div>
          <div className="w-full bg-[#030e1f] h-2.5 rounded-full overflow-hidden border border-slate-800">
            <div
              className="h-full bg-gradient-to-r from-[#d4a017] to-[#00d2ff] transition-all duration-500 rounded-full"
              style={{ width: `${Math.min(collectionPercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto rounded-2xl border border-[#d4a017]/20">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-[#061428] text-[10px] uppercase tracking-wider font-extrabold text-[#8899b4] border-b border-[#d4a017]/20">
              <tr>
                <th className="p-4">Candidate Identity</th>
                <th className="p-4">Cohort</th>
                <th className="p-4">Payment Plan</th>
                <th className="p-4">Tuition Total</th>
                <th className="p-4">Amount Paid</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Access Override</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-[#030e1f]/60">
              {filteredLedger.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-[#8899b4]">
                    <Users className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                    No matching candidate student records found.
                  </td>
                </tr>
              ) : (
                filteredLedger.map((student: any) => (
                  <tr key={student.enrollmentId} className="hover:bg-[#0f223d]/70 transition-colors group">
                    <td className="p-4">
                      <span className="font-extrabold text-white block group-hover:text-[#d4a017] transition-colors">
                        {student.name}
                      </span>
                      <span className="text-[10px] text-[#8899b4] font-mono">{student.email}</span>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-[#0f223d] border border-slate-700 rounded-lg text-[10px] font-bold text-slate-200">
                        {student.cohort}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017] rounded-lg text-[10px] font-extrabold uppercase">
                        {student.paymentPlan}
                      </span>
                    </td>
                    <td className="p-4 font-bold text-slate-200">
                      ₦{student.totalAmount.toLocaleString()}
                    </td>
                    <td className="p-4 font-black text-emerald-400">
                      ₦{student.amountPaid.toLocaleString()}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border shadow-sm ${
                          student.status === "ACTIVE"
                            ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-400 shadow-emerald-950/50"
                            : student.status === "SUSPENDED"
                            ? "bg-amber-950/80 border-amber-500/50 text-amber-400 shadow-amber-950/50"
                            : "bg-slate-800 border-slate-700 text-slate-400"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleToggleAccess(student.enrollmentId, student.status)}
                        disabled={actionLoading === `override-${student.enrollmentId}`}
                        className={`px-3.5 py-1.5 rounded-xl text-[10px] font-extrabold tracking-wide border transition-all shadow-sm ${
                          student.status === "ACTIVE"
                            ? "bg-amber-950/40 hover:bg-amber-900/60 border-amber-500/50 text-amber-300 hover:scale-105"
                            : "bg-[#00d2ff]/10 hover:bg-[#00d2ff]/20 border-[#00d2ff]/50 text-[#00d2ff] hover:scale-105"
                        }`}
                      >
                        {actionLoading === `override-${student.enrollmentId}`
                          ? "Updating..."
                          : student.status === "ACTIVE"
                          ? "Suspend Access"
                          : "Override & Grant Access"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Assignment Grading Desk --- */}
      <div className="dwsa-glass-card rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="border-b border-[#d4a017]/20 pb-5">
          <h3 className="text-lg font-extrabold text-white flex items-center gap-2.5">
            <GitPullRequest className="w-5 h-5 text-purple-400" />
            Assignment Grading Desk (Pending Student Pull Requests)
          </h3>
          <p className="text-xs text-[#8899b4] mt-1">
            Review student pull request links, evaluate code quality, issue official instructor feedback, and grade assignments.
          </p>
        </div>

        {pendingSubmissions.length === 0 ? (
          <div className="p-10 text-center bg-[#061428]/80 border border-[#d4a017]/20 rounded-2xl space-y-3">
            <div className="w-12 h-12 bg-emerald-950/60 border border-emerald-500/40 rounded-2xl flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-extrabold text-white">Grading Desk Clear</h4>
            <p className="text-xs text-[#8899b4]">All submitted student Pull Requests have been evaluated and graded.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingSubmissions.map((sub: any) => (
              <div
                key={sub.id}
                className="p-6 bg-[#061428] border border-[#d4a017]/25 rounded-2xl space-y-5 shadow-lg relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-purple-950/80 border border-purple-500/40 text-purple-300 rounded-md text-[9px] font-extrabold uppercase tracking-wider">
                        {sub.assignment?.module?.title}
                      </span>
                    </div>
                    <h4 className="text-sm font-extrabold text-white">{sub.assignment?.title}</h4>
                    <p className="text-xs text-[#8899b4]">
                      Candidate: <strong className="text-white">{sub.user?.name}</strong> (<span className="text-[#00d2ff]">{sub.user?.email}</span>)
                    </p>
                  </div>

                  {sub.githubPRUrl && (
                    <a
                      href={sub.githubPRUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-[#00d2ff]/10 hover:bg-[#00d2ff]/20 border border-[#00d2ff]/40 text-[#00d2ff] rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all hover:scale-105 w-fit"
                    >
                      <GitPullRequest className="w-4 h-4" />
                      View GitHub PR
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-extrabold text-[#8899b4] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-[#d4a017]" />
                      Grade / Score:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. A (Excellence) or 95%"
                      value={gradingScore[sub.id] || ""}
                      onChange={(e) =>
                        setGradingScore((prev) => ({ ...prev, [sub.id]: e.target.value }))
                      }
                      className="w-full px-3.5 py-2.5 bg-[#030e1f] border border-[#d4a017]/30 rounded-xl text-xs text-white placeholder-[#8899b4] focus:outline-none focus:border-[#00d2ff]"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-extrabold text-[#8899b4] uppercase tracking-wider mb-1.5">
                      Instructor Review Notes:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Clean commit architecture, tests passing."
                      value={gradingFeedback[sub.id] || ""}
                      onChange={(e) =>
                        setGradingFeedback((prev) => ({ ...prev, [sub.id]: e.target.value }))
                      }
                      className="w-full px-3.5 py-2.5 bg-[#030e1f] border border-[#d4a017]/30 rounded-xl text-xs text-white placeholder-[#8899b4] focus:outline-none focus:border-[#00d2ff]"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => handleGradeSubmission(sub.id, "REJECTED")}
                    disabled={actionLoading === `grade-${sub.id}`}
                    className="px-4 py-2 bg-rose-950/60 hover:bg-rose-900/80 border border-rose-800/80 text-rose-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <XCircle className="w-4 h-4" />
                    Reject Submission
                  </button>

                  <button
                    onClick={() => handleGradeSubmission(sub.id, "APPROVED")}
                    disabled={actionLoading === `grade-${sub.id}`}
                    className="px-5 py-2 bg-gradient-to-r from-[#d4a017] to-[#e5a910] hover:from-[#e5a910] hover:to-[#d4a017] text-[#030e1f] rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-lg shadow-[#d4a017]/20 hover:scale-105"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Approve & Pass Grade
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

