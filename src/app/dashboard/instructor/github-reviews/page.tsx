"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  GitPullRequest, Search, Filter, CheckCircle2, XCircle,
  Clock, ExternalLink, ChevronDown, Star, MessageSquare,
  GitCommit, FileCode, Award, SlidersHorizontal, RefreshCw,
} from "lucide-react";

const submissions = [
  {
    id: 1, student: "Chukwuemeka Adeyemi", cohort: "Cohort Alpha",
    repo: "week-3-react-todo-app", assignment: "React To-Do Application",
    submitted: "2 hours ago", status: "Pending", statusColor: "text-amber-400",
    statusBg: "bg-amber-950/30 border-amber-800/30",
    filesChanged: 8, commits: 12, branch: "main",
  },
  {
    id: 2, student: "Aisha Ibrahim", cohort: "Cohort Beta",
    repo: "week-2-js-calculator", assignment: "JavaScript Calculator",
    submitted: "5 hours ago", status: "Pending", statusColor: "text-amber-400",
    statusBg: "bg-amber-950/30 border-amber-800/30",
    filesChanged: 4, commits: 7, branch: "feature/calculator",
  },
  {
    id: 3, student: "Kofi Asante", cohort: "Cohort Alpha",
    repo: "week-3-api-integration", assignment: "REST API Integration Lab",
    submitted: "18 hours ago", status: "Approved", statusColor: "text-[#4ade80]",
    statusBg: "bg-[#4ade80]/10 border-[#4ade80]/30",
    filesChanged: 11, commits: 19, branch: "main",
  },
  {
    id: 4, student: "Ngozi Okonkwo", cohort: "Cohort Gamma",
    repo: "week-1-html-portfolio", assignment: "Personal Portfolio Page",
    submitted: "1 day ago", status: "Changes Requested", statusColor: "text-red-400",
    statusBg: "bg-red-950/30 border-red-800/30",
    filesChanged: 3, commits: 5, branch: "main",
  },
  {
    id: 5, student: "Yusuf Al-Farouq", cohort: "Cohort Beta",
    repo: "week-2-dom-manipulation", assignment: "DOM Manipulation Project",
    submitted: "2 days ago", status: "Approved", statusColor: "text-[#4ade80]",
    statusBg: "bg-[#4ade80]/10 border-[#4ade80]/30",
    filesChanged: 6, commits: 9, branch: "main",
  },
  {
    id: 6, student: "Adaobi Nwosu", cohort: "Cohort Alpha",
    repo: "week-3-typescript-basics", assignment: "TypeScript Foundations",
    submitted: "3 days ago", status: "Pending", statusColor: "text-amber-400",
    statusBg: "bg-amber-950/30 border-amber-800/30",
    filesChanged: 9, commits: 14, branch: "ts-refactor",
  },
];

const statusFilters = ["All", "Pending", "Approved", "Changes Requested", "Rejected"];

export default function GitHubReviewsPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<Record<number, string>>({});
  const [actionMsg, setActionMsg] = useState<{ id: number; type: string } | null>(null);

  const filtered = submissions.filter((s) => {
    const matchSearch =
      s.student.toLowerCase().includes(search.toLowerCase()) ||
      s.repo.toLowerCase().includes(search.toLowerCase()) ||
      s.assignment.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const pending = submissions.filter((s) => s.status === "Pending").length;

  const handleAction = (id: number, type: string) => {
    setActionMsg({ id, type });
    setTimeout(() => setActionMsg(null), 2500);
    setActiveCard(null);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">GitHub Review Centre</h2>
          <p className="text-sm text-[#8899b4] mt-1">DTA&apos;s signature PR review workflow — professional code assessment queue</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-amber-950/30 border border-amber-800/30 text-amber-400 text-[10px] font-black">
            {pending} Pending Reviews
          </span>
          <button className="p-2 rounded-xl bg-[#061428] border border-[#1a2f4a] text-[#8899b4] hover:text-[#d4a017] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]" aria-label="Refresh reviews">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8899b4]" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search by student, repository, or assignment…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#061428] border border-[#1a2f4a] text-xs text-white placeholder-[#8899b4] focus:outline-none focus:border-[#d4a017]/60 focus:ring-1 focus:ring-[#d4a017]/40 transition-all"
            aria-label="Search PR submissions"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {statusFilters.map((f) => (
            <button
              key={f}
              onClick={() => setStatusFilter(f)}
              className={`px-3 py-2 rounded-xl text-[10px] font-black border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] ${
                statusFilter === f
                  ? "bg-[#d4a017]/15 border-[#d4a017]/40 text-[#d4a017]"
                  : "bg-[#061428] border-[#1a2f4a] text-[#8899b4] hover:border-[#d4a017]/30"
              }`}
              aria-pressed={statusFilter === f}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Toast message */}
      {actionMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#061428] border border-[#4ade80]/40 text-[#4ade80] text-xs font-bold shadow-xl animate-fadeInUp" role="status">
          ✓ Action recorded: {actionMsg.type} — ID #{actionMsg.id}
        </div>
      )}

      {/* Submission Cards */}
      <div className="space-y-4">
        {filtered.length === 0 && (
          <div className="text-center py-16 text-[#8899b4] text-sm">
            No submissions match your filters.
          </div>
        )}
        {filtered.map((sub) => (
          <div
            key={sub.id}
            className={`rounded-3xl bg-[#061428] border transition-all duration-200 ${
              activeCard === sub.id ? "border-[#d4a017]/50" : "border-[#1a2f4a] hover:border-[#d4a017]/30"
            }`}
          >
            {/* Card Header */}
            <div
              className="flex items-center justify-between p-5 cursor-pointer"
              onClick={() => setActiveCard(activeCard === sub.id ? null : sub.id)}
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-[#d4a017]/10 border border-[#d4a017]/30 flex items-center justify-center shrink-0">
                  <GitPullRequest className="w-5 h-5 text-[#d4a017]" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-extrabold text-white">{sub.student}</p>
                    <span className="text-[10px] text-[#8899b4]">{sub.cohort}</span>
                  </div>
                  <p className="text-[11px] text-[#d4a017] font-bold truncate">{sub.repo}</p>
                  <p className="text-[10px] text-[#8899b4]">{sub.assignment} · {sub.submitted}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border ${sub.statusBg} ${sub.statusColor}`}>
                  {sub.status}
                </span>
                <div className="flex items-center gap-3 text-[10px] text-[#8899b4] hidden sm:flex">
                  <span className="flex items-center gap-1"><FileCode className="w-3 h-3" />{sub.filesChanged} files</span>
                  <span className="flex items-center gap-1"><GitCommit className="w-3 h-3" />{sub.commits} commits</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-[#8899b4] transition-transform ${activeCard === sub.id ? "rotate-180" : ""}`} aria-hidden="true" />
              </div>
            </div>

            {/* Expanded Panel */}
            {activeCard === sub.id && (
              <div className="border-t border-[#1a2f4a] p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <a
                    href={`https://github.com/Ayar20/${sub.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-[10px] font-bold text-[#8899b4] hover:text-[#d4a017] hover:border-[#d4a017]/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    View on GitHub
                  </a>
                  <span className="text-[10px] text-[#8899b4]">Branch: <code className="text-[#d4a017]">{sub.branch}</code></span>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-[#8899b4] mb-1.5" htmlFor={`feedback-${sub.id}`}>
                    Review Feedback / Competency Notes
                  </label>
                  <textarea
                    id={`feedback-${sub.id}`}
                    rows={3}
                    value={feedback[sub.id] || ""}
                    onChange={(e) => setFeedback((prev) => ({ ...prev, [sub.id]: e.target.value }))}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white placeholder-[#8899b4] focus:outline-none focus:border-[#d4a017]/60 focus:ring-1 focus:ring-[#d4a017]/40 transition-all resize-none"
                    placeholder="Leave inline feedback, competency observations, or notes for this learner…"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={() => handleAction(sub.id, "Approved")} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80] text-[10px] font-black hover:bg-[#4ade80]/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4ade80]">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Approve
                  </button>
                  <button onClick={() => handleAction(sub.id, "Changes Requested")} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-950/30 border border-amber-800/30 text-amber-400 text-[10px] font-black hover:bg-amber-950/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400">
                    <MessageSquare className="w-3.5 h-3.5" /> Request Changes
                  </button>
                  <button onClick={() => handleAction(sub.id, "Rejected")} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-950/30 border border-red-800/30 text-red-400 text-[10px] font-black hover:bg-red-950/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400">
                    <XCircle className="w-3.5 h-3.5" /> Reject
                  </button>
                  <button onClick={() => handleAction(sub.id, "Excellence Badge Awarded")} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017] text-[10px] font-black hover:bg-[#d4a017]/20 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]">
                    <Award className="w-3.5 h-3.5" /> Award Excellence Badge
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
