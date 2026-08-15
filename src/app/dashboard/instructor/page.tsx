"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import FacultyTeachingInsights from "@/components/intelligence/FacultyTeachingInsights";
import CompetencyRadar from "@/components/intelligence/CompetencyRadar";
import {
  GitPullRequest,
  CheckCircle2,
  XCircle,
  ExternalLink,
  RefreshCw,
  Award,
  BookOpen,
  Clock,
  TrendingUp,
  Star,
  Users,
  Flame,
  Calendar,
  AlertOctagon,
} from "lucide-react";

export default function FacultyHomePage() {
  const { data: session } = useSession();
  const [gradingScore, setGradingScore] = useState<Record<string, string>>({});
  const [gradingFeedback, setGradingFeedback] = useState<Record<string, string>>({});
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Fetch live instructor submissions from /api/instructor/submissions
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["instructor-submissions"],
    queryFn: async () => {
      const res = await fetch("/api/instructor/submissions");
      if (!res.ok) throw new Error("Failed to load instructor submissions");
      return res.json();
    },
  });

  const handleGradeSubmission = async (submissionId: string, status: "APPROVED" | "REJECTED") => {
    setActionLoading(submissionId);
    setMessage(null);

    const gradeStr = gradingScore[submissionId];
    const feedback = gradingFeedback[submissionId];

    try {
      const res = await fetch("/api/admin/grade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          submissionId,
          status,
          grade: gradeStr || undefined,
          feedback: feedback || undefined,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to submit grade");

      setMessage({ type: "success", text: `Submission marked as ${status} successfully!` });
      refetch();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Grading error" });
    } finally {
      setActionLoading(null);
    }
  };

  const firstName = session?.user?.name?.split(" ")[0] || "Faculty";
  const now = new Date();
  const submissions = data?.submissions || [];
  const pendingSubmissions = submissions.filter((s: any) => s.status === "PENDING");

  return (
    <div className="space-y-8 pb-12 animate-fadeInUp">
      {/* Institutional Mission Banner */}
      <div className="rounded-3xl bg-[#F0FDF4] border border-[#15803D]/20 px-6 py-5 flex items-center gap-4 shadow-sm">
        <div className="w-10 h-10 rounded-2xl bg-[#15803D] flex items-center justify-center shrink-0">
          <Flame className="w-5 h-5 text-white" aria-hidden="true" />
        </div>
        <div>
          <p className="text-[10px] font-black text-[#15803D] tracking-[0.2em] uppercase mb-0.5">DTA Institutional Mission</p>
          <p className="text-sm font-bold text-[#0F172A] leading-snug">
            Building Africa&apos;s digital future — School of Generative Artificial Intelligence.
          </p>
        </div>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] text-[10px] font-black tracking-widest uppercase">
              Faculty Workspace
            </span>
            <span className="px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] text-[10px] font-black tracking-widest uppercase">
              GENAI-WP-001 Instructors
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A]">
            Welcome back, {firstName} 👋
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            Cohort PR grading queue &amp; academic evaluation desk
          </p>
        </div>
        <button
          onClick={() => refetch()}
          className="self-start flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-[#0F172A] text-xs font-bold hover:bg-slate-50 transition-all shadow-sm"
        >
          <RefreshCw className="w-3.5 h-3.5 text-[#15803D]" /> Refresh Submissions
        </button>
      </div>

      {/* Toast Alert */}
      {message && (
        <div
          className={`p-4 rounded-2xl border text-xs font-bold flex items-center gap-2 ${
            message.type === "success"
              ? "bg-[#F0FDF4] border-[#15803D]/30 text-[#15803D]"
              : "bg-red-50 border-red-200 text-red-700"
          }`}
        >
          {message.type === "success" ? <CheckCircle2 className="w-4 h-4" /> : <AlertOctagon className="w-4 h-4" />}
          {message.text}
        </div>
      )}

      {/* Teaching Insights */}
      <FacultyTeachingInsights />
      <CompetencyRadar title="Cohort Competency Validation Overview" />

      {/* PR Submissions Grading Desk */}
      <section aria-labelledby="grading-desk-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 id="grading-desk-heading" className="text-base font-extrabold text-[#0F172A] flex items-center gap-2">
            <GitPullRequest className="w-5 h-5 text-[#15803D]" />
            Student GitHub PR Submissions Queue ({pendingSubmissions.length} Pending)
          </h3>
        </div>

        <div className="space-y-4">
          {isLoading ? (
            <div className="p-8 text-center text-slate-500 text-xs font-bold bg-white rounded-2xl border border-slate-200">
              Loading cohort submissions…
            </div>
          ) : submissions.length === 0 ? (
            <div className="p-8 text-center text-slate-500 text-xs font-semibold bg-white rounded-2xl border border-slate-200 shadow-sm">
              ✓ No pending GitHub PR submissions in your assigned cohorts.
            </div>
          ) : (
            submissions.map((sub: any) => {
              const isPending = sub.status === "PENDING";

              return (
                <div key={sub.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-xs font-black text-[#0F172A]">{sub.studentName}</span>
                      <span className="text-[10px] text-slate-400 font-mono ml-2">({sub.studentEmail})</span>
                      <p className="text-xs font-bold text-[#15803D] mt-0.5">{sub.assignmentTitle} · {sub.moduleTitle}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2.5 py-1 rounded-full text-[9px] font-black border ${
                          sub.status === "APPROVED"
                            ? "bg-[#F0FDF4] border-[#15803D]/30 text-[#15803D]"
                            : sub.status === "REJECTED"
                            ? "bg-red-50 border-red-200 text-red-700"
                            : "bg-[#FEFCE8] border-[#D4A017]/30 text-[#D4A017]"
                        }`}
                      >
                        {sub.status}
                      </span>
                      {sub.githubPRUrl && (
                        <a
                          href={sub.githubPRUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#0F172A] text-[10px] font-extrabold flex items-center gap-1.5 transition-colors"
                        >
                          Review PR on GitHub <ExternalLink className="w-3 h-3 text-[#15803D]" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[10px] font-extrabold text-slate-600 mb-1">Grade / Score</label>
                      <input
                        type="text"
                        placeholder="e.g. 85% or PASS"
                        value={gradingScore[sub.id] || sub.grade || ""}
                        onChange={(e) => setGradingScore((p) => ({ ...p, [sub.id]: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-[#0F172A] focus:ring-2 focus:ring-[#15803D] focus:outline-none"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[10px] font-extrabold text-slate-600 mb-1">Faculty Feedback</label>
                      <input
                        type="text"
                        placeholder="Excellent prompt engineering & code structure..."
                        value={gradingFeedback[sub.id] || sub.feedback || ""}
                        onChange={(e) => setGradingFeedback((p) => ({ ...p, [sub.id]: e.target.value }))}
                        className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-[#0F172A] focus:ring-2 focus:ring-[#15803D] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => handleGradeSubmission(sub.id, "APPROVED")}
                      disabled={actionLoading === sub.id}
                      className="px-4 py-2 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-black flex items-center gap-1.5 shadow-sm disabled:opacity-50 transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> Approve Submission
                    </button>
                    <button
                      onClick={() => handleGradeSubmission(sub.id, "REJECTED")}
                      disabled={actionLoading === sub.id}
                      className="px-4 py-2 rounded-xl bg-red-50 border border-red-200 text-red-700 hover:bg-red-100 text-xs font-bold flex items-center gap-1.5 disabled:opacity-50 transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" /> Reject Submission
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
