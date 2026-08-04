"use client";

import React, { useState } from "react";
import {
  Users, TrendingUp, TrendingDown, AlertTriangle, CheckCircle2,
  GitPullRequest, CalendarCheck, BarChart3, Search, ChevronRight,
  Activity, Clock, Star, Flame,
} from "lucide-react";

const learners = [
  { id: 1, name: "Kofi Asante", cohort: "Cohort Alpha", progress: 91, attendance: 96, github: 24, assignments: "9/9", status: "Excellent", statusColor: "text-[#4ade80]", statusBg: "bg-[#4ade80]/10 border-[#4ade80]/30", lastSeen: "Today", risk: "None" },
  { id: 2, name: "Aisha Ibrahim", cohort: "Cohort Beta", progress: 78, attendance: 84, github: 17, assignments: "7/8", status: "Good", statusColor: "text-[#d4a017]", statusBg: "bg-[#d4a017]/10 border-[#d4a017]/30", lastSeen: "Yesterday", risk: "None" },
  { id: 3, name: "Yusuf Al-Farouq", cohort: "Cohort Beta", progress: 72, attendance: 80, github: 14, assignments: "6/8", status: "Good", statusColor: "text-[#d4a017]", statusBg: "bg-[#d4a017]/10 border-[#d4a017]/30", lastSeen: "2 days ago", risk: "None" },
  { id: 4, name: "Ngozi Okonkwo", cohort: "Cohort Gamma", progress: 63, attendance: 71, github: 8, assignments: "5/8", status: "Needs Support", statusColor: "text-amber-400", statusBg: "bg-amber-950/30 border-amber-800/30", lastSeen: "4 days ago", risk: "Medium" },
  { id: 5, name: "Chukwuemeka Adeyemi", cohort: "Cohort Alpha", progress: 55, attendance: 68, github: 5, assignments: "4/8", status: "At Risk", statusColor: "text-red-400", statusBg: "bg-red-950/30 border-red-800/30", lastSeen: "5 days ago", risk: "High" },
  { id: 6, name: "Fatima Al-Hassan", cohort: "Cohort Beta", progress: 28, attendance: 40, github: 2, assignments: "2/8", status: "Critical", statusColor: "text-red-500", statusBg: "bg-red-950/40 border-red-700/40", lastSeen: "9 days ago", risk: "Critical" },
  { id: 7, name: "David Mensah", cohort: "Cohort Alpha", progress: 45, attendance: 60, github: 6, assignments: "3/8", status: "At Risk", statusColor: "text-red-400", statusBg: "bg-red-950/30 border-red-800/30", lastSeen: "6 days ago", risk: "High" },
  { id: 8, name: "Adaobi Nwosu", cohort: "Cohort Alpha", progress: 88, attendance: 92, github: 21, assignments: "8/9", status: "Excellent", statusColor: "text-[#4ade80]", statusBg: "bg-[#4ade80]/10 border-[#4ade80]/30", lastSeen: "Today", risk: "None" },
];

const cohortStats = [
  { label: "Total Learners", value: "64", icon: Users, color: "#d4a017" },
  { label: "Active Today", value: "41", icon: Activity, color: "#4ade80" },
  { label: "At Risk", value: "7", icon: AlertTriangle, color: "#f87171" },
  { label: "Avg Progress", value: "67%", icon: TrendingUp, color: "#818cf8" },
];

const mentorNoteFields = ["Leadership potential", "Communication skills", "Career interests", "Internship readiness", "Technical strengths", "Areas requiring support"];

export default function LearnersPage() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "atrisk" | "top">("all");
  const [selectedLearner, setSelectedLearner] = useState<number | null>(null);
  const [mentorNotes, setMentorNotes] = useState<Record<string, string>>({});
  const [noteSaved, setNoteSaved] = useState(false);

  const filtered = learners
    .filter((l) => {
      const matchSearch =
        l.name.toLowerCase().includes(search.toLowerCase()) ||
        l.cohort.toLowerCase().includes(search.toLowerCase());
      const matchTab =
        activeTab === "all" ||
        (activeTab === "atrisk" && (l.risk === "High" || l.risk === "Critical" || l.risk === "Medium")) ||
        (activeTab === "top" && l.progress >= 80);
      return matchSearch && matchTab;
    });

  const handleNoteSave = () => {
    setNoteSaved(true);
    setTimeout(() => setNoteSaved(false), 2000);
  };

  return (
    <div className="space-y-8 pb-12" id="analytics">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-white">Learner Analytics</h2>
        <p className="text-sm text-[#8899b4] mt-1">Monitor learner performance, identify at-risk students, and provide targeted support</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {cohortStats.map((s) => {
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

      {/* Progress Charts Placeholder */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Completion Rate", value: 67, color: "#d4a017" },
          { label: "Submission Rate", value: 74, color: "#4ade80" },
          { label: "GitHub Activity", value: 58, color: "#818cf8" },
        ].map((chart) => (
          <div key={chart.label} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-4">
            <p className="text-[10px] font-black text-[#8899b4] mb-3">{chart.label}</p>
            <div className="relative flex items-center justify-center mb-3">
              <svg viewBox="0 0 80 80" className="w-20 h-20" aria-hidden="true">
                <circle cx="40" cy="40" r="32" fill="none" stroke="#1a2f4a" strokeWidth="8" />
                <circle
                  cx="40" cy="40" r="32" fill="none"
                  stroke={chart.color} strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 32 * chart.value / 100} ${2 * Math.PI * 32 * (100 - chart.value) / 100}`}
                  strokeLinecap="round"
                  transform="rotate(-90 40 40)"
                />
              </svg>
              <span className="absolute text-lg font-extrabold text-white">{chart.value}%</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#030e1f] overflow-hidden">
              <div className="h-full rounded-full transition-all" style={{ width: `${chart.value}%`, backgroundColor: chart.color }} />
            </div>
          </div>
        ))}
      </div>

      {/* Search + Filter Tabs */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8899b4]" aria-hidden="true" />
          <input
            type="search"
            placeholder="Search learners…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#061428] border border-[#1a2f4a] text-xs text-white placeholder-[#8899b4] focus:outline-none focus:border-[#d4a017]/60 transition-all"
          />
        </div>
        <div className="flex gap-2" role="tablist">
          {[["all", "All Learners"], ["atrisk", "⚠ At-Risk"], ["top", "★ Top Performers"]] .map(([val, label]) => (
            <button
              key={val}
              role="tab"
              aria-selected={activeTab === val}
              onClick={() => setActiveTab(val as any)}
              className={`px-3 py-2 rounded-xl text-[10px] font-black border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] whitespace-nowrap ${
                activeTab === val
                  ? "bg-[#d4a017]/15 border-[#d4a017]/40 text-[#d4a017]"
                  : "bg-[#061428] border-[#1a2f4a] text-[#8899b4] hover:border-[#d4a017]/30"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Learner Table */}
      <section aria-labelledby="learners-table-heading" id="attendance">
        <h3 id="learners-table-heading" className="sr-only">Learner List</h3>
        <div className="space-y-3">
          {filtered.map((l) => (
            <div key={l.id} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] hover:border-[#d4a017]/30 transition-colors">
              <div
                className="flex items-center gap-4 p-4 cursor-pointer"
                onClick={() => setSelectedLearner(selectedLearner === l.id ? null : l.id)}
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#d4a017] to-[#b8891a] flex items-center justify-center font-black text-sm text-[#030e1f] shrink-0">
                  {l.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-xs font-extrabold text-white">{l.name}</p>
                    <span className="text-[10px] text-[#8899b4]">{l.cohort}</span>
                  </div>
                  <div className="flex items-center gap-3 mt-1 flex-wrap">
                    <span className="text-[9px] text-[#8899b4]">Progress: <span className="text-white font-bold">{l.progress}%</span></span>
                    <span className="text-[9px] text-[#8899b4]">Attendance: <span className="text-white font-bold">{l.attendance}%</span></span>
                    <span className="text-[9px] text-[#8899b4]">GitHub: <span className="text-white font-bold">{l.github} commits</span></span>
                    <span className="text-[9px] text-[#8899b4]">Last seen: <span className="text-white font-bold">{l.lastSeen}</span></span>
                  </div>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border shrink-0 ${l.statusBg} ${l.statusColor}`}>
                  {l.status}
                </span>
              </div>
              {/* Expanded: Mentor Notes */}
              {selectedLearner === l.id && (
                <div className="border-t border-[#1a2f4a] p-5 space-y-4">
                  <p className="text-xs font-black text-[#d4a017] tracking-wider uppercase">Private Mentor Notes</p>
                  <p className="text-[10px] text-[#8899b4]">Confidential observations — visible to Faculty and Administrators only.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {mentorNoteFields.map((field) => {
                      const noteKey = `${l.id}-${field}`;
                      return (
                        <div key={field}>
                          <label className="block text-[9px] font-black text-[#8899b4] mb-1" htmlFor={`note-${noteKey}`}>{field}</label>
                          <input
                            id={`note-${noteKey}`}
                            type="text"
                            value={mentorNotes[noteKey] || ""}
                            onChange={(e) => setMentorNotes((p) => ({ ...p, [noteKey]: e.target.value }))}
                            className="w-full px-3 py-2 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white placeholder-[#8899b4] focus:outline-none focus:border-[#d4a017]/60 transition-all"
                            placeholder={`Add observation about ${field.toLowerCase()}…`}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleNoteSave}
                      className="px-4 py-2 rounded-xl bg-[#d4a017]/15 border border-[#d4a017]/40 text-[#d4a017] text-[10px] font-black hover:bg-[#d4a017]/25 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
                    >
                      Save Mentor Notes
                    </button>
                    {noteSaved && <span className="text-[#4ade80] text-[10px] font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Saved</span>}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
