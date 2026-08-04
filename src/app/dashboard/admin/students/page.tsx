"use client";

import React, { useState } from "react";
import {
  TrendingUp, Users, AlertTriangle, CheckCircle2, Award, Search,
  Filter, BarChart3, ChevronRight, Activity, ArrowUpRight
} from "lucide-react";

const studentMetrics = [
  { label: "Overall Attendance Rate", value: "91.4%", change: "+2.1%", color: "#4ade80" },
  { label: "Cohort Retention Rate", value: "96.8%", change: "+1.5%", color: "#4ade80" },
  { label: "Completion Analytics", value: "88.2%", change: "+4.0%", color: "#d4a017" },
  { label: "Dropout Risk Flagged", value: "3 Students", change: "-2 this month", color: "text-amber-400" },
];

const studentList = [
  { id: 1, name: "Kofi Asante", cohort: "Cohort Alpha", attendance: "98%", prCount: 24, progress: 94, risk: "Low", status: "Top Performer" },
  { id: 2, name: "Aisha Ibrahim", cohort: "Cohort Beta", attendance: "92%", prCount: 18, progress: 86, risk: "Low", status: "Good" },
  { id: 3, name: "Chukwuemeka Adeyemi", cohort: "Cohort Alpha", attendance: "68%", prCount: 6, progress: 55, risk: "High", status: "Requires Intervention" },
  { id: 4, name: "Ngozi Okonkwo", cohort: "Cohort Gamma", attendance: "74%", prCount: 8, progress: 63, risk: "Medium", status: "Needs Support" },
  { id: 5, name: "Adaobi Nwosu", cohort: "Cohort Alpha", attendance: "96%", prCount: 21, progress: 91, risk: "Low", status: "Top Performer" },
];

export default function StudentSuccessPage() {
  const [search, setSearch] = useState("");
  const [filterRisk, setFilterRisk] = useState("All");

  const filtered = studentList.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.cohort.toLowerCase().includes(search.toLowerCase());
    const matchRisk = filterRisk === "All" || s.risk === filterRisk;
    return matchSearch && matchRisk;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-[#4ade80]/15 text-[#4ade80] text-[9px] font-black uppercase">STUDENT ANALYTICS</span>
          <span className="text-[10px] text-[#8899b4]">InstitutionOS v3.2</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white mt-1">Student Success Centre</h2>
        <p className="text-xs text-[#8899b4]">Executive learning analytics, attendance tracking, retention metrics, and dropout risk alerts</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {studentMetrics.map((m) => (
          <div key={m.label} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-5">
            <p className="text-[10px] font-black text-[#8899b4] uppercase">{m.label}</p>
            <p className="text-2xl font-extrabold text-white mt-1">{m.value}</p>
            <p className="text-[10px] font-bold text-[#4ade80] mt-0.5">{m.change}</p>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8899b4]" />
          <input
            type="search"
            placeholder="Search student by name or cohort..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#061428] border border-[#1a2f4a] text-xs text-white placeholder-[#8899b4] focus:outline-none focus:border-[#d4a017]"
          />
        </div>

        <div className="flex items-center gap-2">
          {["All", "Low", "Medium", "High"].map((r) => (
            <button
              key={r}
              onClick={() => setFilterRisk(r)}
              className={`px-3 py-1.5 rounded-xl text-[10px] font-black border transition-all ${
                filterRisk === r ? "bg-[#d4a017]/15 border-[#d4a017] text-[#d4a017]" : "bg-[#061428] border-[#1a2f4a] text-[#8899b4]"
              }`}
            >
              Risk: {r}
            </button>
          ))}
        </div>
      </div>

      {/* Student List */}
      <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#030e1f] text-[#8899b4] text-[10px] uppercase font-black tracking-wider border-b border-[#1a2f4a]">
            <tr>
              <th className="p-4">Student Name</th>
              <th className="p-4">Cohort</th>
              <th className="p-4">Attendance</th>
              <th className="p-4">GitHub PRs</th>
              <th className="p-4">Progress</th>
              <th className="p-4">Risk Level</th>
              <th className="p-4 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a2f4a] text-white">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-[#0f223d]/40 transition-colors">
                <td className="p-4 font-bold">{s.name}</td>
                <td className="p-4 text-[#8899b4]">{s.cohort}</td>
                <td className="p-4 font-extrabold text-[#4ade80]">{s.attendance}</td>
                <td className="p-4">{s.prCount} PRs</td>
                <td className="p-4 font-bold">{s.progress}%</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-black border ${
                    s.risk === "High" ? "bg-red-950/40 border-red-800/40 text-red-400" : s.risk === "Medium" ? "bg-amber-950/40 border-amber-800/40 text-amber-400" : "bg-[#4ade80]/10 border-[#4ade80]/30 text-[#4ade80]"
                  }`}>
                    {s.risk} Risk
                  </span>
                </td>
                <td className="p-4 text-right font-bold text-[#8899b4]">{s.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
