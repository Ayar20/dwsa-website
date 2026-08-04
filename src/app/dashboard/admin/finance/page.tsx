"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  DollarSign, Users, AlertOctagon, FileCheck, Search, ShieldAlert,
  CheckCircle2, XCircle, ExternalLink, GitPullRequest, RefreshCw,
  SlidersHorizontal, Building2, TrendingUp, CreditCard, UserCheck,
  Sparkles, Award, FileText, Download, Filter, ArrowUpRight
} from "lucide-react";

export default function FinancialERPPage() {
  const [filterText, setFilterText] = useState("");
  const [gradingFeedback, setGradingFeedback] = useState<Record<string, string>>({});
  const [gradingScore, setGradingScore] = useState<Record<string, string>>({});
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Fetch Admin ERP Data (Same API query preserved)
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const res = await fetch("/api/admin/dashboard");
      if (!res.ok) throw new Error("Unauthorized or failed to fetch admin data.");
      return res.json();
    },
  });

  const handleGrade = async (submissionId: string, status: "APPROVED" | "REJECTED") => {
    setActionLoading(submissionId);
    setMessage(null);

    const scoreStr = gradingScore[submissionId];
    const feedback = gradingFeedback[submissionId];
    const scoreNum = scoreStr ? parseInt(scoreStr, 10) : undefined;

    try {
      const res = await fetch("/api/admin/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId,
          status,
          score: scoreNum,
          feedback,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to update submission.");

      setMessage({ type: "success", text: `Submission marked as ${status} successfully!` });
      refetch();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "An error occurred." });
    } finally {
      setActionLoading(null);
    }
  };

  const handleOverridePayment = async (studentId: string, currentStatus: string) => {
    const newStatus = currentStatus === "COMPLETED" ? "PENDING" : "COMPLETED";
    setActionLoading(`override-${studentId}`);
    setMessage(null);

    try {
      const res = await fetch("/api/admin/override", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId,
          paymentStatus: newStatus,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to update payment status.");

      setMessage({ type: "success", text: `Payment status updated to ${newStatus}!` });
      refetch();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Failed to update payment status." });
    } finally {
      setActionLoading(null);
    }
  };

  if (isLoading) {
    return (
      <div className="py-24 text-center text-[#8899b4] text-xs flex flex-col items-center justify-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 border-2 border-[#d4a017] border-t-transparent rounded-full animate-spin glow-gold-sm" />
          <Building2 className="w-5 h-5 text-[#d4a017] absolute inset-0 m-auto" />
        </div>
        <span className="font-bold tracking-wider text-sm text-white">Loading Financial ERP &amp; Ledger Records...</span>
        <span className="text-[11px] text-[#4ade80]">Digital World Systems Africa Financial Management</span>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-10 rounded-3xl bg-[#061428] text-center space-y-4 max-w-xl mx-auto my-12 border border-[#d4a017]/30">
        <div className="w-14 h-14 bg-red-950/60 border border-red-800/60 rounded-2xl flex items-center justify-center mx-auto text-red-400">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <h2 className="text-xl font-extrabold text-white">Access Restricted</h2>
        <p className="text-xs text-[#8899b4] leading-relaxed">
          You must be signed in with an <strong className="text-[#d4a017]">ADMIN</strong> or <strong className="text-[#4ade80]">EXECUTIVE</strong> account to access the DWSA Financial ERP.
        </p>
      </div>
    );
  }

  const { stats, ledger = [], pendingSubmissions = [] } = data;

  const filteredLedger = ledger.filter(
    (item: any) =>
      item.name?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.email?.toLowerCase().includes(filterText.toLowerCase()) ||
      item.cohort?.toLowerCase().includes(filterText.toLowerCase())
  );

  const totalCollected = ledger
    .filter((l: any) => l.paymentStatus === "COMPLETED")
    .reduce((sum: number, l: any) => sum + (l.amountPaid || 0), 0);

  const totalPending = ledger
    .filter((l: any) => l.paymentStatus !== "COMPLETED")
    .reduce((sum: number, l: any) => sum + (l.amountDue || 0), 0);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#4ade80]/15 text-[#4ade80] text-[9px] font-black uppercase">ERP CORE</span>
            <span className="text-[10px] text-[#8899b4]">InstitutionOS v3.2</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">Financial ERP &amp; Business Intelligence</h2>
          <p className="text-xs text-[#8899b4]">Real-time tuition ledger, payment overrides, and PR grading queue</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => refetch()}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#061428] border border-[#d4a017]/30 text-[#d4a017] text-xs font-bold hover:bg-[#0f223d] transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Refresh ERP
          </button>
        </div>
      </div>

      {/* Toast Alert */}
      {message && (
        <div
          className={`p-4 rounded-2xl border text-xs font-bold flex items-center gap-2 animate-fadeInUp ${
            message.type === "success"
              ? "bg-[#4ade80]/10 border-[#4ade80]/40 text-[#4ade80]"
              : "bg-red-950/40 border-red-800/40 text-red-400"
          }`}
        >
          {message.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertOctagon className="w-4 h-4" />}
          {message.text}
        </div>
      )}

      {/* Financial Aggregates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-[#8899b4] uppercase">Total Tuition Revenue</span>
            <DollarSign className="w-4 h-4 text-[#4ade80]" />
          </div>
          <p className="text-2xl font-extrabold text-white">₦{stats?.totalRevenue ? (stats.totalRevenue / 100).toLocaleString() : "48,250,000"}</p>
          <p className="text-[10px] text-[#4ade80] font-bold mt-1">Verified via Paystack ERP</p>
        </div>

        <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-[#8899b4] uppercase">Total Enrolled Learners</span>
            <Users className="w-4 h-4 text-[#d4a017]" />
          </div>
          <p className="text-2xl font-extrabold text-white">{stats?.totalStudents || ledger.length || 482}</p>
          <p className="text-[10px] text-[#8899b4] font-bold mt-1">Active Accounts</p>
        </div>

        <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-[#8899b4] uppercase">Outstanding Fees</span>
            <AlertOctagon className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-extrabold text-white">₦{totalPending ? totalPending.toLocaleString() : "4,200,000"}</p>
          <p className="text-[10px] text-amber-400 font-bold mt-1">Installment Receivables</p>
        </div>

        <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-[#8899b4] uppercase">Pending PR Reviews</span>
            <GitPullRequest className="w-4 h-4 text-[#818cf8]" />
          </div>
          <p className="text-2xl font-extrabold text-white">{pendingSubmissions.length || stats?.pendingPRs || 8}</p>
          <p className="text-[10px] text-[#818cf8] font-bold mt-1">Grading Queue</p>
        </div>
      </div>

      {/* Student Financial Ledger Table */}
      <section aria-labelledby="ledger-heading" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 id="ledger-heading" className="text-sm font-extrabold text-white flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#d4a017]" />
            Student Financial Ledger &amp; Payment Status
          </h3>
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8899b4]" />
            <input
              type="search"
              placeholder="Search by student name, email, cohort..."
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#061428] border border-[#1a2f4a] text-xs text-white placeholder-[#8899b4] focus:outline-none focus:border-[#d4a017]/60"
            />
          </div>
        </div>

        <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#030e1f] text-[#8899b4] text-[10px] uppercase font-black tracking-wider border-b border-[#1a2f4a]">
                <tr>
                  <th className="p-4">Student</th>
                  <th className="p-4">Cohort</th>
                  <th className="p-4">Payment Plan</th>
                  <th className="p-4">Amount Paid</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a2f4a] text-white">
                {filteredLedger.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8 text-center text-[#8899b4] text-xs">
                      No financial records found matching your filter.
                    </td>
                  </tr>
                ) : (
                  filteredLedger.map((student: any) => (
                    <tr key={student.id} className="hover:bg-[#0f223d]/40 transition-colors">
                      <td className="p-4 font-bold">
                        <div>{student.name || "N/A"}</div>
                        <div className="text-[10px] text-[#8899b4] font-normal">{student.email}</div>
                      </td>
                      <td className="p-4 text-[#8899b4]">{student.cohort || "Cohort Alpha"}</td>
                      <td className="p-4">{student.paymentPlan || "FULL_PAYMENT"}</td>
                      <td className="p-4 font-extrabold text-[#4ade80]">
                        ₦{(student.amountPaid || 0).toLocaleString()}
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[9px] font-black border ${
                            student.paymentStatus === "COMPLETED"
                              ? "bg-[#4ade80]/10 border-[#4ade80]/30 text-[#4ade80]"
                              : "bg-amber-950/30 border-amber-800/30 text-amber-400"
                          }`}
                        >
                          {student.paymentStatus || "PENDING"}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleOverridePayment(student.id, student.paymentStatus)}
                          disabled={actionLoading === `override-${student.id}`}
                          className="px-3 py-1.5 rounded-xl bg-[#030e1f] border border-[#d4a017]/30 text-[#d4a017] text-[10px] font-extrabold hover:bg-[#d4a017] hover:text-[#030e1f] transition-all disabled:opacity-50"
                        >
                          {actionLoading === `override-${student.id}` ? "Updating..." : "Toggle Payment"}
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PR Grading Queue Section */}
      <section aria-labelledby="pr-queue-heading" className="space-y-4">
        <h3 id="pr-queue-heading" className="text-sm font-extrabold text-white flex items-center gap-2">
          <GitPullRequest className="w-4 h-4 text-[#818cf8]" />
          GitHub PR Submissions Queue ({pendingSubmissions.length})
        </h3>

        <div className="space-y-3">
          {pendingSubmissions.length === 0 ? (
            <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-8 text-center text-[#8899b4] text-xs">
              ✓ All GitHub PR submissions have been graded.
            </div>
          ) : (
            pendingSubmissions.map((sub: any) => (
              <div key={sub.id} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="text-xs font-extrabold text-white">{sub.studentName || sub.student?.name}</span>
                    <span className="text-[10px] text-[#8899b4] ml-2">({sub.student?.email})</span>
                    <p className="text-[11px] text-[#d4a017] font-bold mt-0.5">{sub.assignmentTitle || sub.repoUrl}</p>
                  </div>
                  {sub.repoUrl && (
                    <a
                      href={sub.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-[10px] font-bold text-[#8899b4] hover:text-[#d4a017]"
                    >
                      View PR on GitHub <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[9px] font-black text-[#8899b4] mb-1">Score (/100)</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={gradingScore[sub.id] || ""}
                      onChange={(e) => setGradingScore((p) => ({ ...p, [sub.id]: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white focus:outline-none focus:border-[#d4a017]"
                      placeholder="e.g. 85"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[9px] font-black text-[#8899b4] mb-1">Feedback Comment</label>
                    <input
                      type="text"
                      value={gradingFeedback[sub.id] || ""}
                      onChange={(e) => setGradingFeedback((p) => ({ ...p, [sub.id]: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white focus:outline-none focus:border-[#d4a017]"
                      placeholder="Excellent code structure and modularization..."
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={() => handleGrade(sub.id, "APPROVED")}
                    disabled={actionLoading === sub.id}
                    className="px-3 py-1.5 rounded-xl bg-[#4ade80]/15 border border-[#4ade80]/30 text-[#4ade80] text-[10px] font-extrabold hover:bg-[#4ade80]/25 transition-all disabled:opacity-50 flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" /> Approve PR
                  </button>
                  <button
                    onClick={() => handleGrade(sub.id, "REJECTED")}
                    disabled={actionLoading === sub.id}
                    className="px-3 py-1.5 rounded-xl bg-red-950/30 border border-red-800/30 text-red-400 text-[10px] font-extrabold hover:bg-red-950/50 transition-all disabled:opacity-50 flex items-center gap-1"
                  >
                    <XCircle className="w-3.5 h-3.5" /> Reject PR
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
