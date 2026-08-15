"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Calendar,
  Users,
  Plus,
  RefreshCw,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  UserCheck,
  Building2,
  Clock,
  Loader2,
  Edit,
} from "lucide-react";

export default function AdminCohortsPage() {
  const [showCohortModal, setShowCohortModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Cohort Form State
  const [editingCohort, setEditingCohort] = useState<any | null>(null);
  const [title, setTitle] = useState("Generative AI Cohort 1 (Alpha)");
  const [cohortCode, setCohortCode] = useState("GENAI-WP-001");
  const [programmeId, setProgrammeId] = useState("");
  const [startDate, setStartDate] = useState("2026-09-01");
  const [endDate, setEndDate] = useState("2026-10-31");
  const [capacity, setCapacity] = useState(30);
  const [instructorId, setInstructorId] = useState("");
  const [status, setStatus] = useState<"UPCOMING" | "ACTIVE" | "COMPLETED">("UPCOMING");

  // Assignment Form State
  const [assignAppId, setAssignAppId] = useState("");
  const [assignCohortId, setAssignCohortId] = useState("");
  const [paymentPlan, setPaymentPlan] = useState<"FULL_UPFRONT" | "INSTALLMENT">("FULL_UPFRONT");

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Fetch Cohorts
  const { data: cohortData, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-cohorts"],
    queryFn: async () => {
      const res = await fetch("/api/admin/cohorts");
      if (!res.ok) throw new Error("Failed to fetch cohorts");
      return res.json();
    },
  });

  // Fetch Approved Applications for Enrolment Assignment Bridge
  const { data: appData } = useQuery({
    queryKey: ["admin-approved-apps"],
    queryFn: async () => {
      const res = await fetch("/api/admin/applications?status=APPROVED");
      if (!res.ok) return { applications: [] };
      return res.json();
    },
  });

  // Fetch Programmes for Cohort creation
  const { data: progData } = useQuery({
    queryKey: ["admin-programmes-list"],
    queryFn: async () => {
      const res = await fetch("/api/admin/programmes");
      if (!res.ok) return { programmes: [] };
      return res.json();
    },
  });

  const cohorts = cohortData?.cohorts || [];
  const instructors = cohortData?.instructors || [];
  const approvedApps = appData?.applications || [];
  const programmes = progData?.programmes || [];

  const handleOpenCohortModal = (c?: any) => {
    if (c) {
      setEditingCohort(c);
      setTitle(c.title);
      setCohortCode(c.cohortCode || "GENAI-WP-001");
      setProgrammeId(c.programmeId || "");
      setStartDate(c.startDate ? new Date(c.startDate).toISOString().substring(0, 10) : "2026-09-01");
      setEndDate(c.endDate ? new Date(c.endDate).toISOString().substring(0, 10) : "2026-10-31");
      setCapacity(c.capacity || 30);
      setInstructorId(c.instructorId || "");
      setStatus(c.status || "UPCOMING");
    } else {
      setEditingCohort(null);
      setTitle("Generative AI Cohort 1 (Alpha)");
      setCohortCode("GENAI-WP-001");
      setProgrammeId(programmes[0]?.id || "");
      setStartDate("2026-09-01");
      setEndDate("2026-10-31");
      setCapacity(30);
      setInstructorId(instructors[0]?.id || "");
      setStatus("UPCOMING");
    }
    setShowCohortModal(true);
  };

  const handleSaveCohort = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setToast(null);

    try {
      const res = await fetch("/api/admin/cohorts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingCohort?.id,
          title,
          cohortCode,
          programmeId: programmeId || programmes[0]?.id,
          startDate,
          endDate,
          capacity: Number(capacity),
          instructorId: instructorId || undefined,
          status,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to save cohort");

      setToast({ type: "success", text: json.message });
      setShowCohortModal(false);
      refetch();
    } catch (err: any) {
      setToast({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleAssignCandidate = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setToast(null);

    try {
      const res = await fetch("/api/admin/enrolments/assign", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          applicationId: assignAppId,
          cohortId: assignCohortId || cohorts[0]?.id,
          paymentPlan,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to assign candidate to cohort");

      setToast({ type: "success", text: json.message });
      setShowAssignModal(false);
      refetch();
    } catch (err: any) {
      setToast({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center text-slate-500 text-xs flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-2 border-[#15803D] border-t-transparent rounded-full animate-spin" />
        <span className="font-extrabold text-[#0F172A]">Loading DTA Cohort Command Desk...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 bg-rose-950/20 border border-rose-800/40 rounded-3xl text-center space-y-3 max-w-md mx-auto my-10 text-rose-300">
        <ShieldAlert className="w-8 h-8 mx-auto text-rose-400" />
        <h3 className="text-base font-extrabold">Access Restricted</h3>
        <p className="text-xs text-slate-400">Admin privileges required to access Cohort Management.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FEFCE8] border border-[#D4A017]/30 text-[#D4A017] rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-2">
              <Sparkles className="w-3 h-3" /> DTA Operations Command
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
              Cohort Architecture <span className="text-[#15803D]">&amp; Enrolment Desk</span>
            </h1>
            <p className="text-xs text-slate-500 max-w-2xl mt-1">
              Initialize and manage initial flagship cohort <strong className="text-[#0F172A]">GENAI-WP-001</strong>, assign DTA Instructors, manage capacity bounds, and bridge approved admissions candidates to active enrolments.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setShowAssignModal(true)}
              className="px-4 py-2.5 bg-[#FEFCE8] border border-[#D4A017]/40 text-[#D4A017] hover:bg-amber-100 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all shadow-xs"
            >
              <UserCheck className="w-4 h-4" />
              Assign Candidate to Cohort
            </button>

            <button
              onClick={() => handleOpenCohortModal()}
              className="px-4 py-2.5 bg-[#15803D] hover:bg-[#166534] text-white rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Create New Cohort
            </button>
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

      {/* Cohorts List */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <h3 className="text-base font-extrabold text-[#0F172A] flex items-center gap-2 border-b border-slate-100 pb-3">
          <Calendar className="w-5 h-5 text-[#15803D]" />
          Configured Academic Cohorts ({cohorts.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {cohorts.map((c: any) => (
            <div
              key={c.id}
              className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200 space-y-4 flex flex-col justify-between hover:border-[#15803D]/40 transition-all shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-[#00d2ff] bg-[#030e1f] px-3 py-1 rounded-full font-mono border border-[#00d2ff]/30">
                    {c.cohortCode || "GENAI-WP-001"}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                      c.status === "ACTIVE"
                        ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                        : c.status === "UPCOMING"
                        ? "bg-amber-100 border-amber-300 text-amber-800"
                        : "bg-slate-200 border-slate-300 text-slate-700"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>

                <h4 className="text-lg font-extrabold text-[#0F172A]">{c.title}</h4>
                <p className="text-xs text-slate-500 font-medium">
                  Programme: <strong className="text-[#0F172A]">{c.programme?.title || "Generative AI for Work & Productivity"}</strong>
                </p>

                <div className="grid grid-cols-2 gap-3 text-xs pt-2 border-t border-slate-200/60">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Start Date</span>
                    <strong className="text-[#0F172A]">
                      {new Date(c.startDate).toLocaleDateString()}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">End Date</span>
                    <strong className="text-[#0F172A]">
                      {new Date(c.endDate).toLocaleDateString()}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Instructor</span>
                    <strong className="text-[#15803D]">
                      {c.instructor?.name || "Unassigned"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Enrolments / Cap</span>
                    <strong className="text-[#0F172A]">
                      {c._count?.enrollments || 0} / {c.capacity} Max
                    </strong>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-end">
                <button
                  onClick={() => handleOpenCohortModal(c)}
                  className="px-3.5 py-1.5 bg-white border border-slate-200 hover:border-[#15803D] text-[#0F172A] text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Edit className="w-3.5 h-3.5 text-[#15803D]" />
                  Edit Cohort Settings
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cohort Modal */}
      {showCohortModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <h3 className="text-lg font-extrabold text-[#0F172A]">
              {editingCohort ? "Edit Cohort Configuration" : "Initialize New DTA Cohort"}
            </h3>

            <form onSubmit={handleSaveCohort} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                    Cohort Code * (e.g. GENAI-WP-001)
                  </label>
                  <input
                    type="text"
                    required
                    value={cohortCode}
                    onChange={(e) => setCohortCode(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                    Cohort Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                  Target Programme *
                </label>
                <select
                  value={programmeId}
                  onChange={(e) => setProgrammeId(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A]"
                >
                  {programmes.map((p: any) => (
                    <option key={p.id} value={p.id}>
                      {p.title} ({p.school})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                    Start Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                    End Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                    Max Capacity
                  </label>
                  <input
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(Number(e.target.value))}
                    className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                    Assigned DTA Instructor
                  </label>
                  <select
                    value={instructorId}
                    onChange={(e) => setInstructorId(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A]"
                  >
                    <option value="">Select Instructor...</option>
                    {instructors.map((ins: any) => (
                      <option key={ins.id} value={ins.id}>
                        {ins.name || ins.email} ({ins.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                    Cohort Status
                  </label>
                  <select
                    value={status}
                    onChange={(e: any) => setStatus(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A]"
                  >
                    <option value="UPCOMING">UPCOMING</option>
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="COMPLETED">COMPLETED</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowCohortModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-[#15803D] hover:bg-[#166534] text-white rounded-xl text-xs font-extrabold flex items-center gap-2"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Cohort"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assignment Modal */}
      {showAssignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <h3 className="text-lg font-extrabold text-[#0F172A]">
              Assign Approved Candidate to Cohort
            </h3>

            <form onSubmit={handleAssignCandidate} className="space-y-4">
              <div>
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                  Select Approved Candidate Application *
                </label>
                <select
                  required
                  value={assignAppId}
                  onChange={(e) => setAssignAppId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A]"
                >
                  <option value="">Select Approved Candidate...</option>
                  {approvedApps.map((app: any) => (
                    <option key={app.id} value={app.id}>
                      {app.user?.name || app.user?.email} &mdash; {app.programme?.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                  Target Cohort *
                </label>
                <select
                  required
                  value={assignCohortId}
                  onChange={(e) => setAssignCohortId(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A]"
                >
                  <option value="">Select Cohort...</option>
                  {cohorts.map((c: any) => (
                    <option key={c.id} value={c.id}>
                      {c.cohortCode || "GENAI-WP-001"} &mdash; {c.title} ({c.status})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                  Tuition Payment Plan
                </label>
                <select
                  value={paymentPlan}
                  onChange={(e: any) => setPaymentPlan(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A]"
                >
                  <option value="FULL_UPFRONT">Full Upfront Payment</option>
                  <option value="INSTALLMENT">Installment Plan</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAssignModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving || !assignAppId}
                  className="px-6 py-2 bg-[#15803D] hover:bg-[#166534] text-white rounded-xl text-xs font-extrabold flex items-center gap-2"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Assign to Cohort"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
