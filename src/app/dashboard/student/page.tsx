"use client";

import React, { useState } from "react";
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
} from "lucide-react";

export default function StudentDashboardPage() {
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [prUrls, setPrUrls] = useState<Record<string, string>>({});
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [paying, setPaying] = useState(false);

  // Fetch Dashboard Data
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
      <div className="py-20 text-center text-[#8899b4] text-xs flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-[#d4a017] border-t-transparent rounded-full animate-spin" />
        <span>Loading video lessons & curriculum feed...</span>
      </div>
    );
  }

  if (isError || !data || !data.enrolled) {
    return (
      <div className="p-8 bg-[#061428] border border-[#d4a017]/30 rounded-2xl text-center space-y-4">
        <AlertTriangle className="w-10 h-10 text-[#d4a017] mx-auto" />
        <h2 className="text-lg font-bold text-white">Enrollment Required</h2>
        <p className="text-xs text-[#8899b4] max-w-md mx-auto">
          You are not currently registered in an active DWSA cohort. Please contact administration or sign in with an enrolled student account.
        </p>
      </div>
    );
  }

  const { enrollment, track, progressPercent } = data;
  const isSuspended = enrollment.status === "SUSPENDED";
  const modules = track?.modules || [];
  const activeModule = modules.find((m: any) => m.id === selectedModuleId) || modules[0];

  const outstandingBalance = Math.max(0, enrollment.totalAmount - enrollment.amountPaid);

  // Handle GitHub PR Submission
  const handleSubmitPR = async (assignmentId: string) => {
    const url = prUrls[assignmentId];
    setSubmittingId(assignmentId);
    setMessage(null);

    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          assignmentId,
          githubPRUrl: url,
        }),
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

  // Handle Payment Checkout
  const handlePayInstallment = async (amountToPay: number) => {
    setPaying(true);
    setMessage(null);

    try {
      const res = await fetch("/api/payments/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          enrollmentId: enrollment.id,
          amount: amountToPay,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Payment checkout failed");

      if (json.checkoutUrl) {
        window.location.href = json.checkoutUrl;
      }
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Payment error" });
      setPaying(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Account Lock Banner for Suspended Students */}
      {isSuspended && (
        <div className="p-6 bg-amber-950/70 border border-amber-800/80 rounded-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-amber-900/60 text-amber-300 rounded-xl border border-amber-700/60 shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-amber-200">
                Account Status: SUSPENDED (Installment Overdue)
              </h3>
              <p className="text-xs text-amber-300/80 mt-1 max-w-xl">
                Your video lesson feeds and assignment access are locked. Settle your outstanding balance to restore full workspace privileges.
              </p>
            </div>
          </div>

          <button
            onClick={() => handlePayInstallment(outstandingBalance || 80000)}
            disabled={paying}
            className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-extrabold rounded-xl text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2 shrink-0"
          >
            <CreditCard className="w-4 h-4" />
            {paying ? "Processing..." : `Pay Installment (₦${(outstandingBalance || 80000).toLocaleString()})`}
          </button>
        </div>
      )}

      {/* Global Message Alert */}
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

      {/* Top Banner (Progress & Financial Widget) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 bg-[#061428] border border-[#d4a017]/30 rounded-2xl space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#8899b4] uppercase tracking-wider">Cohort Progress</span>
            <Sparkles className="w-4 h-4 text-[#d4a017]" />
          </div>
          <div>
            <div className="flex items-baseline justify-between mb-2">
              <span className="text-2xl font-black text-white">{progressPercent}%</span>
              <span className="text-[10px] text-[#8899b4]">Track Completion</span>
            </div>
            <div className="w-full bg-[#030e1f] rounded-full h-2.5 overflow-hidden border border-[#d4a017]/20">
              <div
                className="bg-gradient-to-r from-[#d4a017] to-[#00d2ff] h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <p className="text-[11px] text-[#8899b4]">
            Cohort: <strong className="text-white">{enrollment.cohort.title}</strong>
          </p>
        </div>

        <div className="p-6 bg-[#061428] border border-[#00d2ff]/30 rounded-2xl space-y-4 shadow-xl md:col-span-2 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#00d2ff]" />
              <span className="text-xs font-semibold text-[#8899b4] uppercase tracking-wider">Tuition Financial Status</span>
            </div>
            <span
              className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                enrollment.status === "ACTIVE"
                  ? "bg-emerald-950/80 border-emerald-500/50 text-[#4ade80]"
                  : enrollment.status === "SUSPENDED"
                  ? "bg-amber-950/80 border-amber-500/50 text-[#d4a017]"
                  : "bg-[#0f223d] border-slate-700 text-[#8899b4]"
              }`}
            >
              {enrollment.status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-[#d4a017]/10 py-3">
            <div>
              <span className="text-[10px] text-[#8899b4] block">Payment Plan</span>
              <span className="text-xs font-bold text-white">{enrollment.paymentPlan}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#8899b4] block">Total Paid</span>
              <span className="text-xs font-bold text-[#4ade80]">₦{enrollment.amountPaid.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-[10px] text-[#8899b4] block">Outstanding Balance</span>
              <span className="text-xs font-bold text-[#d4a017]">₦{outstandingBalance.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <p className="text-[10px] text-[#8899b4]">
              {enrollment.paymentPlan === "INSTALLMENT"
                ? "Installment deposits unlock modular access in milestones."
                : "Full tuition paid in advance."}
            </p>

            {outstandingBalance > 0 && !isSuspended && (
              <button
                onClick={() => handlePayInstallment(outstandingBalance)}
                disabled={paying}
                className="px-4 py-2 bg-gradient-to-r from-[#d4a017] to-[#e5a910] text-[#030e1f] font-extrabold rounded-xl text-xs transition-all shadow-md shadow-[#d4a017]/20"
              >
                {paying ? "Processing..." : `Pay Next Installment (₦${outstandingBalance.toLocaleString()})`}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Split Layout: YouTube Video Player (Left) & Playlist Sidebar (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column: YouTube Player + Lesson Notes + Assignments */}
        <div className="lg:col-span-2 space-y-6">
          {activeModule ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
              {/* 1. YouTube Video Player Pinned at Top */}
              <YouTubePlayer
                youtubeId={activeModule.youtubeId}
                title={activeModule.title}
                durationMinutes={activeModule.durationMinutes}
                isFreePreview={activeModule.isFreePreview}
              />

              {/* 2. Lesson Header & Starter Repo Button */}
              <div className="border-b border-slate-800 pb-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase tracking-wider font-bold text-blue-400">
                    Module {activeModule.order} Lesson Masterclass
                  </span>
                  {activeModule.githubStarterRepo && (
                    <a
                      href={activeModule.githubStarterRepo}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-colors border border-slate-700/60"
                    >
                      <Code className="w-3.5 h-3.5 text-blue-400" />
                      Starter Repo
                      <ExternalLink className="w-3 h-3 text-slate-500" />
                    </a>
                  )}
                </div>
                <h2 className="text-xl font-extrabold text-white">{activeModule.title}</h2>
              </div>

              {/* 3. Lesson Markdown Content */}
              <div className="prose prose-invert max-w-none text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-5 rounded-xl border border-slate-800/80 whitespace-pre-wrap">
                {activeModule.contentMarkdown}
              </div>

              {/* 4. Assignments & GitHub PR Submission Engine */}
              <div className="space-y-4 pt-2">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <GitPullRequest className="w-4 h-4 text-purple-400" />
                  Module Assignments & Code PR Submissions
                </h4>

                {activeModule.assignments?.length === 0 ? (
                  <p className="text-xs text-slate-500 italic">No assignments configured for this module.</p>
                ) : (
                  <div className="space-y-4">
                    {activeModule.assignments.map((assignment: any) => {
                      const userSubmission = assignment.submissions?.[0];
                      const isApproved = userSubmission?.status === "APPROVED";
                      const isRejected = userSubmission?.status === "REJECTED";

                      return (
                        <div
                          key={assignment.id}
                          className="p-5 bg-slate-950 border border-slate-800 rounded-xl space-y-4"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h5 className="text-xs font-bold text-white flex items-center gap-2">
                                {assignment.title}
                                {assignment.githubPRRequired && (
                                  <span className="px-2 py-0.5 bg-purple-950 text-purple-400 border border-purple-800 text-[9px] font-bold rounded-md">
                                    PR Required
                                  </span>
                                )}
                              </h5>
                              <p className="text-[11px] text-slate-400 mt-1">{assignment.instructions}</p>
                            </div>

                            {userSubmission && (
                              <span
                                className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border uppercase tracking-wider shrink-0 ${
                                  isApproved
                                    ? "bg-emerald-950 border-emerald-800 text-emerald-400"
                                    : isRejected
                                    ? "bg-red-950 border-red-800 text-red-400"
                                    : "bg-amber-950 border-amber-800 text-amber-400"
                                }`}
                              >
                                {userSubmission.status}
                              </span>
                            )}
                          </div>

                          {userSubmission?.feedback && (
                            <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs space-y-1">
                              <span className="font-bold text-slate-300 text-[10px] uppercase">Instructor Feedback:</span>
                              <p className="text-slate-400 italic text-xs">{userSubmission.feedback}</p>
                              {userSubmission.grade && (
                                <span className="text-blue-400 font-semibold block text-[11px]">
                                  Grade: {userSubmission.grade}
                                </span>
                              )}
                            </div>
                          )}

                          {!isApproved && !isSuspended && (
                            <div className="space-y-2 pt-2 border-t border-slate-900">
                              <label className="block text-[11px] font-semibold text-slate-400">
                                {assignment.githubPRRequired
                                  ? "Submit GitHub Pull Request URL:"
                                  : "Submit Code Repository Link:"}
                              </label>
                              <div className="flex gap-2">
                                <input
                                  type="url"
                                  placeholder={
                                    assignment.githubPRRequired
                                      ? "https://github.com/owner/repo/pull/1"
                                      : "https://github.com/owner/repo"
                                  }
                                  value={prUrls[assignment.id] ?? userSubmission?.githubPRUrl ?? ""}
                                  onChange={(e) =>
                                    setPrUrls((prev) => ({ ...prev, [assignment.id]: e.target.value }))
                                  }
                                  className="flex-1 px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-blue-500"
                                />
                                <button
                                  onClick={() => handleSubmitPR(assignment.id)}
                                  disabled={submittingId === assignment.id}
                                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white font-semibold rounded-xl text-xs transition-all shadow-md shadow-purple-600/20 flex items-center gap-1.5 shrink-0"
                                >
                                  <Send className="w-3.5 h-3.5" />
                                  {submittingId === assignment.id ? "Validating..." : "Submit PR"}
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
            <div className="p-8 text-center text-slate-500 text-xs bg-slate-900 border border-slate-800 rounded-2xl">
              Select a module from the playlist sidebar to stream the video.
            </div>
          )}
        </div>

        {/* Right Sidebar: Cohort Module Playlist Feed */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-1 flex items-center justify-between">
            <span>Cohort Module Playlist</span>
            <span className="text-[10px] text-slate-500 font-normal">{modules.length} Lessons</span>
          </h3>

          <div className="space-y-2.5">
            {modules.map((mod: any) => {
              const isSelected = activeModule?.id === mod.id;
              const hasCompleted = mod.assignments?.every((a: any) =>
                a.submissions?.some((s: any) => s.status === "APPROVED")
              );

              return (
                <button
                  key={mod.id}
                  onClick={() => !isSuspended && setSelectedModuleId(mod.id)}
                  disabled={isSuspended}
                  className={`w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between group ${
                    isSelected
                      ? "bg-blue-950/40 border-blue-600/70 text-white shadow-lg shadow-blue-950/40"
                      : "bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                  } ${isSuspended ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">
                      {hasCompleted ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      ) : (
                        <PlayCircle className={`w-4 h-4 ${isSelected ? "text-red-500" : "text-slate-500"}`} />
                      )}
                    </div>

                    <div>
                      <span className="block text-xs font-bold leading-tight group-hover:text-white transition-colors">
                        {mod.title}
                      </span>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-1">
                        {mod.durationMinutes && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {mod.durationMinutes}m
                          </span>
                        )}
                        <span>• {mod.assignments?.length || 0} Task(s)</span>
                      </div>
                    </div>
                  </div>

                  <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? "text-blue-400" : "text-slate-600"}`} />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
