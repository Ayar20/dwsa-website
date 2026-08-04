"use client";

import React, { useState } from "react";
import {
  ClipboardCheck, Download, CheckCircle2, Clock, Star,
  Filter, ChevronDown, FileText, FlaskConical, Award,
  GitPullRequest, BarChart3, TrendingUp, Users,
} from "lucide-react";

const tabs = ["Assignments", "Quizzes", "Labs", "Capstones", "PR Reviews"];

const assignments = [
  { id: 1, title: "React To-Do Application", cohort: "Cohort Alpha", submitted: 18, graded: 12, dueDate: "Today", weight: "20%", status: "Open", statusColor: "text-amber-400", statusBg: "bg-amber-950/30 border-amber-800/30" },
  { id: 2, title: "JavaScript Calculator", cohort: "Cohort Beta", submitted: 14, graded: 14, dueDate: "Last Week", weight: "15%", status: "Closed", statusColor: "text-[#4ade80]", statusBg: "bg-[#4ade80]/10 border-[#4ade80]/30" },
  { id: 3, title: "Personal Portfolio Page", cohort: "Cohort Gamma", submitted: 10, graded: 4, dueDate: "3 Days Ago", weight: "10%", status: "Grading", statusColor: "text-[#818cf8]", statusBg: "bg-indigo-950/30 border-indigo-800/30" },
  { id: 4, title: "TypeScript Foundations", cohort: "Cohort Alpha", submitted: 20, graded: 0, dueDate: "Tomorrow", weight: "25%", status: "Open", statusColor: "text-amber-400", statusBg: "bg-amber-950/30 border-amber-800/30" },
];

const gradingQueue = [
  { name: "Chukwuemeka Adeyemi", assignment: "React To-Do App", cohort: "Cohort Alpha", score: "", draft: true },
  { name: "Aisha Ibrahim", assignment: "React To-Do App", cohort: "Cohort Alpha", score: "82", draft: false },
  { name: "Yusuf Al-Farouq", assignment: "TypeScript Foundations", cohort: "Cohort Alpha", score: "", draft: true },
  { name: "Adaobi Nwosu", assignment: "TypeScript Foundations", cohort: "Cohort Alpha", score: "91", draft: false },
];

export default function AssessmentsPage() {
  const [activeTab, setActiveTab] = useState("Assignments");
  const [scores, setScores] = useState<Record<string, string>>({});
  const [comments, setComments] = useState<Record<string, string>>({});
  const [saved, setSaved] = useState<string | null>(null);

  const handleSave = (key: string) => {
    setSaved(key);
    setTimeout(() => setSaved(null), 2000);
  };

  const overallStats = [
    { label: "Total Assessments", value: "24", icon: FileText, color: "#d4a017" },
    { label: "Graded This Week", value: "37", icon: CheckCircle2, color: "#4ade80" },
    { label: "Pending Grading", value: "12", icon: Clock, color: "#f59e0b" },
    { label: "Avg Student Score", value: "74%", icon: TrendingUp, color: "#818cf8" },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Assessment Centre</h2>
          <p className="text-sm text-[#8899b4] mt-1">Unified grading workspace — manage all academic assessments</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#061428] border border-[#d4a017]/30 text-[#d4a017] text-xs font-bold hover:bg-[#0f223d] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]">
          <Download className="w-3.5 h-3.5" /> Export Grades
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {overallStats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${s.color}20`, border: `1px solid ${s.color}30` }}>
                <Icon className="w-4 h-4" style={{ color: s.color }} aria-hidden="true" />
              </div>
              <p className="text-2xl font-extrabold text-white">{s.value}</p>
              <p className="text-[10px] text-[#8899b4] font-semibold leading-tight mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 flex-wrap" role="tablist">
        {tabs.map((tab) => (
          <button
            key={tab}
            role="tab"
            aria-selected={activeTab === tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-xl text-[11px] font-black border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] ${
              activeTab === tab
                ? "bg-[#d4a017]/15 border-[#d4a017]/40 text-[#d4a017]"
                : "bg-[#061428] border-[#1a2f4a] text-[#8899b4] hover:border-[#d4a017]/30"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Assignment List */}
      <section aria-labelledby="assignments-heading">
        <h3 id="assignments-heading" className="text-sm font-extrabold text-white mb-4">{activeTab}</h3>
        <div className="space-y-3">
          {assignments.map((a) => (
            <div key={a.id} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-4 hover:border-[#d4a017]/30 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h4 className="text-sm font-extrabold text-white">{a.title}</h4>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-black border ${a.statusBg} ${a.statusColor}`}>{a.status}</span>
                  </div>
                  <p className="text-[10px] text-[#8899b4]">{a.cohort} · Due: {a.dueDate} · Weight: {a.weight}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-extrabold text-white">{a.graded}/{a.submitted}</p>
                  <p className="text-[9px] text-[#8899b4]">graded</p>
                </div>
              </div>
              <div className="mt-3">
                <div className="h-1.5 rounded-full bg-[#030e1f] overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#d4a017] to-[#4ade80]"
                    style={{ width: a.submitted > 0 ? `${(a.graded / a.submitted) * 100}%` : "0%" }}
                    role="progressbar"
                    aria-valuenow={a.submitted > 0 ? Math.round((a.graded / a.submitted) * 100) : 0}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`Grading progress for ${a.title}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grading Queue */}
      <section aria-labelledby="grading-heading" id="assignments">
        <h3 id="grading-heading" className="text-sm font-extrabold text-white mb-4 flex items-center gap-2">
          <ClipboardCheck className="w-4 h-4 text-[#d4a017]" aria-hidden="true" />
          Grading Queue
        </h3>
        <div className="space-y-4">
          {gradingQueue.map((item, i) => {
            const key = `${i}-${item.name}`;
            return (
              <div key={key} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-sm font-extrabold text-white">{item.name}</p>
                    <p className="text-[10px] text-[#8899b4]">{item.assignment} · {item.cohort}</p>
                  </div>
                  {item.draft ? (
                    <span className="px-2.5 py-1 rounded-full bg-[#061428] border border-[#1a2f4a] text-[#8899b4] text-[9px] font-black">DRAFT</span>
                  ) : (
                    <span className="px-2.5 py-1 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80] text-[9px] font-black">SUBMITTED</span>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[9px] font-black text-[#8899b4] mb-1.5" htmlFor={`score-${key}`}>Score (/100)</label>
                    <input
                      id={`score-${key}`}
                      type="number"
                      min={0}
                      max={100}
                      value={scores[key] ?? item.score}
                      onChange={(e) => setScores((p) => ({ ...p, [key]: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white focus:outline-none focus:border-[#d4a017]/60 transition-all"
                      aria-label={`Score for ${item.name}`}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-[9px] font-black text-[#8899b4] mb-1.5" htmlFor={`comment-${key}`}>Feedback Comment</label>
                    <input
                      id={`comment-${key}`}
                      type="text"
                      value={comments[key] || ""}
                      onChange={(e) => setComments((p) => ({ ...p, [key]: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white placeholder-[#8899b4] focus:outline-none focus:border-[#d4a017]/60 transition-all"
                      placeholder="Great work on component structure. Consider..."
                      aria-label={`Feedback for ${item.name}`}
                    />
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => handleSave(key)}
                    className="px-3 py-2 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-[10px] font-black text-[#8899b4] hover:border-[#d4a017]/40 hover:text-[#d4a017] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
                  >
                    Save Draft
                  </button>
                  <button
                    onClick={() => handleSave(key)}
                    className="px-3 py-2 rounded-xl bg-[#d4a017]/15 border border-[#d4a017]/40 text-[#d4a017] text-[10px] font-black hover:bg-[#d4a017]/25 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
                  >
                    Final Submit
                  </button>
                  {saved === key && (
                    <span className="flex items-center gap-1 text-[#4ade80] text-[10px] font-bold" role="status">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Saved
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
