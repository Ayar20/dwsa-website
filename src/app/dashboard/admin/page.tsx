"use client";

import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
} from "lucide-react";

export default function AdminDashboardPage() {
  const queryClient = useQueryClient();
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
      <div className="py-20 text-center text-[#8899b4] text-xs flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#d4a017] border-t-transparent rounded-full animate-spin" />
        <span>Loading Financial ERP & Student Records...</span>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-8 bg-[#061428] border border-[#d4a017]/30 rounded-2xl text-center space-y-3">
        <ShieldAlert className="w-10 h-10 text-red-400 mx-auto" />
        <h2 className="text-lg font-bold text-white">Access Forbidden</h2>
        <p className="text-xs text-[#8899b4]">
          You must be signed in with an ADMIN or INSTRUCTOR account to access the Financial ERP.
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
      {/* Page Title & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Financial ERP & Executive Desk
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            DWSA Academy Management Portal — Student Ledger, Revenue Tracking, & Code Grading
          </p>
        </div>

        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all w-fit"
        >
          <RefreshCw className="w-3.5 h-3.5 text-purple-400" />
          Refresh ERP Data
        </button>
      </div>

      {/* Global Alerts */}
      {message && (
        <div
          className={`p-4 rounded-xl border text-xs flex items-center gap-3 ${
            message.type === "success"
              ? "bg-emerald-950/60 border-emerald-800/60 text-emerald-300"
              : "bg-red-950/60 border-red-800/60 text-red-300"
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

      {/* Feature C Part 1: Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Total Revenue</span>
            <div className="p-2 bg-emerald-950 text-emerald-400 border border-emerald-800/60 rounded-lg">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">₦{(stats?.totalRevenue || 0).toLocaleString()}</p>
          <p className="text-[10px] text-slate-500">Collected via Paystack & direct transfers</p>
        </div>

        {/* Active Students */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Active Students</span>
            <div className="p-2 bg-blue-950 text-blue-400 border border-blue-800/60 rounded-lg">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">{stats?.activeStudents || 0}</p>
          <p className="text-[10px] text-slate-500">Full workspace access granted</p>
        </div>

        {/* Suspended Accounts */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Suspended Accounts</span>
            <div className="p-2 bg-amber-950 text-amber-400 border border-amber-800/60 rounded-lg">
              <AlertOctagon className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">{stats?.suspendedStudents || 0}</p>
          <p className="text-[10px] text-slate-500">Overdue milestone installments</p>
        </div>

        {/* Pending Submissions */}
        <div className="p-5 bg-slate-900 border border-slate-800 rounded-2xl space-y-2 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Pending PR Submissions</span>
            <div className="p-2 bg-purple-950 text-purple-400 border border-purple-800/60 rounded-lg">
              <FileCheck className="w-4 h-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-white">{stats?.pendingSubmissions || 0}</p>
          <p className="text-[10px] text-slate-500">Awaiting instructor review & grade</p>
        </div>
      </div>

      {/* Feature C Part 2: Financial Ledger Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-blue-400" />
              Student Financial Ledger & Access Control Desk
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Comprehensive list of all registered candidates, payment plan breakdown, and 1-click manual access toggles.
            </p>
          </div>

          {/* Search Filter input */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Filter by name, email..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Ledger Table */}
        <div className="overflow-x-auto border border-slate-800 rounded-xl">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-[10px] uppercase tracking-wider font-bold text-slate-400 border-b border-slate-800">
              <tr>
                <th className="p-3.5">Candidate Details</th>
                <th className="p-3.5">Cohort</th>
                <th className="p-3.5">Plan</th>
                <th className="p-3.5">Tuition Total</th>
                <th className="p-3.5">Amount Paid</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Access Override Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 bg-slate-900/50">
              {filteredLedger.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-6 text-center text-slate-500">
                    No matching student records found.
                  </td>
                </tr>
              ) : (
                filteredLedger.map((student: any) => (
                  <tr key={student.enrollmentId} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5">
                      <span className="font-bold text-white block">{student.name}</span>
                      <span className="text-[10px] text-slate-400">{student.email}</span>
                    </td>
                    <td className="p-3.5 text-slate-300">{student.cohort}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px] font-semibold">
                        {student.paymentPlan}
                      </span>
                    </td>
                    <td className="p-3.5 font-semibold text-slate-200">
                      ₦{student.totalAmount.toLocaleString()}
                    </td>
                    <td className="p-3.5 font-bold text-emerald-400">
                      ₦{student.amountPaid.toLocaleString()}
                    </td>
                    <td className="p-3.5">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase border ${
                          student.status === "ACTIVE"
                            ? "bg-emerald-950 border-emerald-800 text-emerald-400"
                            : student.status === "SUSPENDED"
                            ? "bg-amber-950 border-amber-800 text-amber-400"
                            : "bg-slate-800 border-slate-700 text-slate-400"
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-right">
                      <button
                        onClick={() => handleToggleAccess(student.enrollmentId, student.status)}
                        disabled={actionLoading === `override-${student.enrollmentId}`}
                        className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all ${
                          student.status === "ACTIVE"
                            ? "bg-amber-950/60 hover:bg-amber-900 border-amber-800/80 text-amber-300"
                            : "bg-emerald-950/60 hover:bg-emerald-900 border-emerald-800/80 text-emerald-300"
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

      {/* Feature C Part 3: Assignment Grading Desk */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
        <div>
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <GitPullRequest className="w-4 h-4 text-purple-400" />
            Assignment Grading Desk (Pending PR Submissions)
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Review student pull request links, evaluate code quality, write instructor feedback, and set grades.
          </p>
        </div>

        {pendingSubmissions.length === 0 ? (
          <div className="p-8 text-center bg-slate-950/60 border border-slate-800 rounded-xl space-y-2">
            <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
            <h4 className="text-xs font-bold text-white">Grading Desk Clear</h4>
            <p className="text-[11px] text-slate-500">All submitted student Pull Requests have been evaluated.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingSubmissions.map((sub: any) => (
              <div
                key={sub.id}
                className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-900 pb-3">
                  <div>
                    <span className="text-[10px] text-purple-400 uppercase font-bold tracking-wider">
                      {sub.assignment?.module?.title}
                    </span>
                    <h4 className="text-xs font-bold text-white">{sub.assignment?.title}</h4>
                    <p className="text-[10px] text-slate-400">
                      Submitted by: <strong className="text-slate-200">{sub.user?.name}</strong> ({sub.user?.email})
                    </p>
                  </div>

                  {sub.githubPRUrl && (
                    <a
                      href={sub.githubPRUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-purple-950 hover:bg-purple-900 border border-purple-800 text-purple-300 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors w-fit"
                    >
                      <GitPullRequest className="w-3.5 h-3.5" />
                      View GitHub PR
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Grade / Score:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. A (Excellence) or 95%"
                      value={gradingScore[sub.id] || ""}
                      onChange={(e) =>
                        setGradingScore((prev) => ({ ...prev, [sub.id]: e.target.value }))
                      }
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Instructor Feedback & Review Notes:
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Great PR structure, clean commit messages."
                      value={gradingFeedback[sub.id] || ""}
                      onChange={(e) =>
                        setGradingFeedback((prev) => ({ ...prev, [sub.id]: e.target.value }))
                      }
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    onClick={() => handleGradeSubmission(sub.id, "REJECTED")}
                    disabled={actionLoading === `grade-${sub.id}`}
                    className="px-4 py-2 bg-red-950/80 hover:bg-red-900 border border-red-800 text-red-300 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    Reject Submission
                  </button>

                  <button
                    onClick={() => handleGradeSubmission(sub.id, "APPROVED")}
                    disabled={actionLoading === `grade-${sub.id}`}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Approve Submission
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
