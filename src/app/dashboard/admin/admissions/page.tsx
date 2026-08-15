"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  FileCheck2,
  Users,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldAlert,
  Sparkles,
  RefreshCw,
  Award,
  Filter,
} from "lucide-react";

export default function AdminAdmissionsPage() {
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [filterText, setFilterText] = useState<string>("");
  const [reviewNotes, setReviewNotes] = useState<Record<string, string>>({});
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-applications", statusFilter],
    queryFn: async () => {
      const url = statusFilter ? `/api/admin/applications?status=${statusFilter}` : "/api/admin/applications";
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch applications");
      return res.json();
    },
  });

  const handleUpdateStatus = async (applicationId: string, newStatus: string) => {
    setActionLoading(applicationId);
    setToast(null);

    try {
      const res = await fetch("/api/admin/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId,
          status: newStatus,
          reviewNotes: reviewNotes[applicationId] || "Reviewed by DTA Admissions Office.",
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to update application status");

      setToast({ type: "success", text: `Application status updated to ${newStatus}.` });
      refetch();
    } catch (err: any) {
      setToast({ type: "error", text: err.message });
    } finally {
      setActionLoading(null);
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center text-slate-500 text-xs flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-2 border-[#15803D] border-t-transparent rounded-full animate-spin" />
        <span className="font-extrabold text-[#0F172A]">Loading DTA Admissions Registry...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 bg-rose-950/20 border border-rose-800/40 rounded-3xl text-center space-y-3 max-w-md mx-auto my-10 text-rose-300">
        <ShieldAlert className="w-8 h-8 mx-auto text-rose-400" />
        <h3 className="text-base font-extrabold">Access Restricted</h3>
        <p className="text-xs text-slate-400">Admin privileges required to access the Admissions Command Centre.</p>
      </div>
    );
  }

  const applications = data?.applications || [];

  const filteredApps = applications.filter((app: any) => {
    const term = filterText.toLowerCase();
    return (
      app.user?.name?.toLowerCase().includes(term) ||
      app.user?.email?.toLowerCase().includes(term) ||
      app.user?.country?.toLowerCase().includes(term) ||
      app.programme?.title?.toLowerCase().includes(term)
    );
  });

  const totalSubmitted = applications.filter((a: any) => a.status === "SUBMITTED").length;
  const totalUnderReview = applications.filter((a: any) => a.status === "UNDER_REVIEW").length;
  const totalApproved = applications.filter((a: any) => a.status === "APPROVED").length;

  return (
    <div className="space-y-8">
      {/* Executive Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FEFCE8] border border-[#D4A017]/30 text-[#D4A017] rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-2">
              <Sparkles className="w-3 h-3" /> DTA Operations Command
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
              Admissions Application <span className="text-[#15803D]">Review Desk</span>
            </h1>
            <p className="text-xs text-slate-500 max-w-2xl mt-1">
              Review incoming candidate applications for the School of Generative Artificial Intelligence, evaluate candidate backgrounds, and issue admission decisions.
            </p>
          </div>

          <button
            onClick={() => refetch()}
            className="px-4 py-2.5 bg-[#15803D] hover:bg-[#166534] text-white rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all shadow-sm w-fit"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Refresh Registry
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-slate-100">
          <div className="p-4 bg-[#F8FAFC] border border-slate-200 rounded-2xl">
            <span className="text-[10px] font-extrabold text-slate-400 uppercase block">Total Candidates</span>
            <span className="text-2xl font-black text-[#0F172A]">{applications.length}</span>
          </div>
          <div className="p-4 bg-blue-50/50 border border-blue-200 rounded-2xl">
            <span className="text-[10px] font-extrabold text-blue-600 uppercase block">Submitted</span>
            <span className="text-2xl font-black text-blue-700">{totalSubmitted}</span>
          </div>
          <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-2xl">
            <span className="text-[10px] font-extrabold text-amber-600 uppercase block">Under Review</span>
            <span className="text-2xl font-black text-amber-700">{totalUnderReview}</span>
          </div>
          <div className="p-4 bg-emerald-50/50 border border-emerald-200 rounded-2xl">
            <span className="text-[10px] font-extrabold text-emerald-600 uppercase block">Approved</span>
            <span className="text-2xl font-black text-emerald-700">{totalApproved}</span>
          </div>
        </div>
      </div>

      {/* Toast Alert */}
      {toast && (
        <div
          className={`p-4 rounded-2xl border text-xs font-semibold flex items-center gap-3 ${
            toast.type === "success"
              ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-300"
              : "bg-rose-950/80 border-rose-800/80 text-rose-300"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          )}
          <span>{toast.text}</span>
        </div>
      )}

      {/* Main Table Desk */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-5">
          <h3 className="text-base font-extrabold text-[#0F172A] flex items-center gap-2">
            <FileCheck2 className="w-5 h-5 text-[#15803D]" />
            Candidate Admissions Registry
          </h3>

          <div className="flex items-center gap-3">
            {/* Filter Dropdown */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] font-semibold"
            >
              <option value="">All Statuses</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search name, email, country..."
                value={filterText}
                onChange={(e) => setFilterText(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#15803D]"
              />
            </div>
          </div>
        </div>

        {/* Applications List */}
        {filteredApps.length === 0 ? (
          <div className="py-12 text-center text-slate-400 space-y-2">
            <Users className="w-8 h-8 mx-auto text-slate-300" />
            <p className="text-xs font-semibold">No admissions applications found matching your criteria.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredApps.map((app: any) => (
              <div
                key={app.id}
                className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-4 hover:border-[#15803D]/40 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-200/60 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-extrabold text-[#0F172A]">{app.user?.name || "Candidate"}</h4>
                      <span className="text-[10px] text-slate-400 font-mono">({app.user?.email})</span>
                    </div>
                    <p className="text-xs text-slate-500">
                      Location: <strong className="text-[#0F172A]">{app.user?.country || "Nigeria"}</strong> {app.user?.state && `(${app.user.state})`} • Phone: <span className="font-mono">{app.user?.phone || "N/A"}</span>
                    </p>
                  </div>

                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                        app.status === "APPROVED"
                          ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                          : app.status === "UNDER_REVIEW"
                          ? "bg-amber-100 border-amber-300 text-amber-800"
                          : app.status === "REJECTED"
                          ? "bg-rose-100 border-rose-300 text-rose-800"
                          : "bg-blue-100 border-blue-300 text-blue-800"
                      }`}
                    >
                      {app.status}
                    </span>
                  </div>
                </div>

                {/* Candidate Background */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                    <span className="text-[9px] font-black text-slate-400 uppercase block">Programme</span>
                    <span className="font-extrabold text-[#0F172A] block">{app.programme?.title}</span>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                    <span className="text-[9px] font-black text-slate-400 uppercase block">Experience &amp; Format</span>
                    <span className="font-semibold text-slate-700 block">
                      {app.user?.experienceLevel || "BEGINNER"} • {app.user?.preferredFormat || "HYBRID"}
                    </span>
                  </div>
                  <div className="p-3 bg-white border border-slate-200 rounded-xl space-y-1">
                    <span className="text-[9px] font-black text-slate-400 uppercase block">Professional Background</span>
                    <span className="text-slate-600 line-clamp-2">{app.user?.professionalBackground || "No background details submitted"}</span>
                  </div>
                </div>

                {/* Review Notes & Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <input
                    type="text"
                    placeholder="Instructor / Admin review notes..."
                    value={reviewNotes[app.id] || ""}
                    onChange={(e) => setReviewNotes((prev) => ({ ...prev, [app.id]: e.target.value }))}
                    className="w-full sm:w-80 px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#15803D]"
                  />

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleUpdateStatus(app.id, "UNDER_REVIEW")}
                      disabled={actionLoading === app.id}
                      className="px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-bold hover:bg-amber-100 transition-all"
                    >
                      Under Review
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(app.id, "REJECTED")}
                      disabled={actionLoading === app.id}
                      className="px-3 py-1.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-[11px] font-bold hover:bg-rose-100 transition-all"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(app.id, "APPROVED")}
                      disabled={actionLoading === app.id}
                      className="px-4 py-1.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-[11px] font-extrabold shadow-sm transition-all flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Approve Candidate
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
