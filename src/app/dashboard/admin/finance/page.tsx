"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  DollarSign,
  Users,
  AlertOctagon,
  Search,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  RefreshCw,
  Building2,
  CreditCard,
  Send,
  Eye,
  Check,
} from "lucide-react";

export default function FinancialERPPage() {
  const [filterText, setFilterText] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Fetch real payment records from /api/admin/payments
  const { data: paymentsData, isLoading: paymentsLoading, refetch: refetchPayments } = useQuery({
    queryKey: ["admin-payments", statusFilter],
    queryFn: async () => {
      const url = statusFilter !== "ALL" ? `/api/admin/payments?status=${statusFilter}` : "/api/admin/payments";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch payment records");
      return res.json();
    },
  });

  // Fetch dashboard stats from /api/admin/dashboard
  const { data: statsData } = useQuery({
    queryKey: ["admin-dashboard-stats"],
    queryFn: async () => {
      const res = await fetch("/api/admin/dashboard");
      if (!res.ok) return {};
      return res.json();
    },
  });

  const handleVerifyManualPayment = async (paymentId: string) => {
    setActionLoading(`verify-${paymentId}`);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/payments/${paymentId}/verify`, {
        method: "POST",
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to verify payment");

      setMessage({ type: "success", text: json.message || "Payment verified successfully. Enrollment activated!" });
      refetchPayments();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Verification error" });
    } finally {
      setActionLoading(null);
    }
  };

  const handleRejectManualPayment = async (paymentId: string) => {
    const reason = prompt("Enter reason for payment rejection:", "Deposit reference unverified");
    if (!reason) return;

    setActionLoading(`reject-${paymentId}`);
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/payments/${paymentId}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reason }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to reject payment");

      setMessage({ type: "success", text: json.message || "Payment record rejected." });
      refetchPayments();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Rejection error" });
    } finally {
      setActionLoading(null);
    }
  };

  const payments = paymentsData?.payments || [];

  const filteredPayments = payments.filter((item: any) => {
    const learnerName = item.enrollment?.user?.name?.toLowerCase() || "";
    const learnerEmail = item.enrollment?.user?.email?.toLowerCase() || "";
    const ref = item.providerRef?.toLowerCase() || "";
    const search = filterText.toLowerCase();
    return learnerName.includes(search) || learnerEmail.includes(search) || ref.includes(search);
  });

  const totalSuccessful = payments
    .filter((p: any) => p.status === "SUCCESSFUL")
    .reduce((sum: number, p: any) => sum + Number(p.amount || 0), 0);

  const pendingVerificationCount = payments.filter((p: any) => p.status === "PENDING_VERIFICATION").length;

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#15803D]/15 text-[#15803D] text-[9px] font-black uppercase">
              DTA FINANCE DESK
            </span>
            <span className="text-[10px] text-slate-500">InstitutionOS Phase 3</span>
          </div>
          <h2 className="text-2xl font-extrabold text-[#0F172A] mt-1">Financial ERP &amp; Payment Ledger</h2>
          <p className="text-xs text-slate-500">Real-time Paystack transaction log &amp; manual bank deposit verification desk</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => refetchPayments()}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-slate-200 text-[#0F172A] text-xs font-bold hover:bg-slate-50 transition-all shadow-sm"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#15803D]" /> Refresh Payments
          </button>
        </div>
      </div>

      {/* Toast Alert */}
      {message && (
        <div
          className={`p-4 rounded-2xl border text-xs font-bold flex items-center justify-between gap-2 animate-fadeInUp ${
            message.type === "success"
              ? "bg-[#F0FDF4] border-[#15803D]/30 text-[#15803D]"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          <div className="flex items-center gap-2">
            {message.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertOctagon className="w-4 h-4" />}
            {message.text}
          </div>
        </div>
      )}

      {/* Financial Aggregates */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-slate-500 uppercase">Verified Tuition Revenue</span>
            <DollarSign className="w-4 h-4 text-[#15803D]" />
          </div>
          <p className="text-2xl font-extrabold text-[#0F172A]">₦{totalSuccessful.toLocaleString()}</p>
          <p className="text-[10px] text-[#15803D] font-bold mt-1">Verified via Paystack &amp; Bank</p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-slate-500 uppercase">Pending Manual Verification</span>
            <Building2 className="w-4 h-4 text-[#D4A017]" />
          </div>
          <p className="text-2xl font-extrabold text-[#0F172A]">{pendingVerificationCount}</p>
          <p className="text-[10px] text-[#D4A017] font-bold mt-1">Awaiting Admin Review</p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-slate-500 uppercase">Total Payment Records</span>
            <CreditCard className="w-4 h-4 text-[#15803D]" />
          </div>
          <p className="text-2xl font-extrabold text-[#0F172A]">{payments.length}</p>
          <p className="text-[10px] text-slate-500 font-bold mt-1">Audit Logged</p>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-black text-slate-500 uppercase">Flagship Cohort</span>
            <Users className="w-4 h-4 text-[#15803D]" />
          </div>
          <p className="text-2xl font-extrabold text-[#0F172A]">GENAI-WP-001</p>
          <p className="text-[10px] text-[#15803D] font-bold mt-1">Active AI Cohort</p>
        </div>
      </div>

      {/* Payment Records Table & Manual Verification Queue */}
      <section aria-labelledby="payments-heading" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <h3 id="payments-heading" className="text-sm font-extrabold text-[#0F172A] flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#15803D]" />
              Tuition Transactions &amp; Verification Desk
            </h3>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-2.5 py-1 rounded-lg border border-slate-200 text-xs font-bold text-[#0F172A] bg-white focus:outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="PENDING_VERIFICATION">Pending Verification Only</option>
              <option value="SUCCESSFUL">Successful Only</option>
              <option value="INITIATED">Initiated Only</option>
              <option value="FAILED">Failed Only</option>
            </select>
          </div>

          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="search"
              placeholder="Search learner, email, ref…"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-white border border-slate-200 text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#15803D]"
            />
          </div>
        </div>

        <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 text-[10px] uppercase font-black tracking-wider border-b border-slate-200">
                <tr>
                  <th className="p-4">Learner</th>
                  <th className="p-4">Provider / Reference</th>
                  <th className="p-4">Cohort</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[#0F172A]">
                {paymentsLoading ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500 text-xs font-bold">
                      Loading payment transaction records…
                    </td>
                  </tr>
                ) : filteredPayments.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-slate-500 text-xs">
                      No transaction records found matching your filter criteria.
                    </td>
                  </tr>
                ) : (
                  filteredPayments.map((p: any) => {
                    const learner = p.enrollment?.user;
                    const cohort = p.enrollment?.cohort;
                    const isPendingVerification = p.status === "PENDING_VERIFICATION";

                    return (
                      <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="p-4 font-bold">
                          <div>{learner?.name || "Learner"}</div>
                          <div className="text-[10px] text-slate-500 font-normal">{learner?.email}</div>
                        </td>
                        <td className="p-4 font-mono text-[11px]">
                          <span className="px-2 py-0.5 rounded bg-slate-100 font-sans font-bold text-[9px] mr-1.5">
                            {p.provider}
                          </span>
                          <span className="text-slate-700">{p.providerRef || "N/A"}</span>
                        </td>
                        <td className="p-4 text-slate-600 font-mono text-[11px]">
                          {cohort?.cohortCode || "GENAI-WP-001"}
                        </td>
                        <td className="p-4 font-extrabold text-[#15803D]">
                          ₦{Number(p.amount).toLocaleString()}
                        </td>
                        <td className="p-4 text-slate-500 text-[11px]">
                          {new Date(p.paymentDate).toLocaleDateString()}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-2.5 py-1 rounded-full text-[9px] font-black border ${
                              p.status === "SUCCESSFUL"
                                ? "bg-[#F0FDF4] border-[#15803D]/30 text-[#15803D]"
                                : p.status === "PENDING_VERIFICATION"
                                ? "bg-[#FEFCE8] border-[#D4A017]/30 text-[#D4A017]"
                                : "bg-slate-100 border-slate-200 text-slate-600"
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          {isPendingVerification ? (
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleVerifyManualPayment(p.id)}
                                disabled={actionLoading === `verify-${p.id}`}
                                className="px-2.5 py-1 rounded-lg bg-[#15803D] hover:bg-[#166534] text-white text-[10px] font-extrabold flex items-center gap-1 shadow-sm disabled:opacity-50"
                              >
                                <Check className="w-3 h-3" /> Approve
                              </button>
                              <button
                                onClick={() => handleRejectManualPayment(p.id)}
                                disabled={actionLoading === `reject-${p.id}`}
                                className="px-2.5 py-1 rounded-lg bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 text-[10px] font-bold disabled:opacity-50"
                              >
                                Reject
                              </button>
                            </div>
                          ) : (
                            <span className="text-[10px] text-slate-400 italic">
                              {p.verifiedBy ? `By ${p.verifiedBy}` : "System Automated"}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
