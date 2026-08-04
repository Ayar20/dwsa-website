"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Users, TrendingUp, Calendar, MessageSquare, BarChart3,
  Download, ChevronRight, Video, AlertTriangle, CheckCircle2, Clock,
} from "lucide-react";

const cohorts = [
  {
    id: 1, name: "Cohort Alpha", programme: "Full-Stack Web Development",
    learners: 24, startDate: "March 2025", completion: 72, attendance: 88,
    avgPerformance: 74, risk: "Low", riskColor: "text-[#4ade80]", riskBg: "bg-[#4ade80]/10 border-[#4ade80]/30",
    completionColor: "from-[#d4a017] to-[#4ade80]",
  },
  {
    id: 2, name: "Cohort Beta", programme: "Full-Stack Web Development",
    learners: 20, startDate: "May 2025", completion: 45, attendance: 79,
    avgPerformance: 62, risk: "Medium", riskColor: "text-amber-400", riskBg: "bg-amber-950/30 border-amber-800/30",
    completionColor: "from-[#d4a017] to-amber-400",
  },
  {
    id: 3, name: "Cohort Gamma", programme: "UI/UX Design Fundamentals",
    learners: 18, startDate: "June 2025", completion: 28, attendance: 91,
    avgPerformance: 81, risk: "Low", riskColor: "text-[#4ade80]", riskBg: "bg-[#4ade80]/10 border-[#4ade80]/30",
    completionColor: "from-[#d4a017] to-[#4ade80]",
  },
  {
    id: 4, name: "Cohort Delta", programme: "AI & Data Foundations",
    learners: 15, startDate: "July 2025", completion: 10, attendance: 65,
    avgPerformance: 55, risk: "High", riskColor: "text-red-400", riskBg: "bg-red-950/30 border-red-800/30",
    completionColor: "from-red-500 to-amber-400",
  },
];

export default function CohortsPage() {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">My Cohorts</h2>
          <p className="text-sm text-[#8899b4] mt-1">Manage and monitor your assigned learner groups</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-black text-[#8899b4]">
          <span className="px-3 py-1.5 rounded-xl bg-[#061428] border border-[#1a2f4a]">
            {cohorts.length} Active Cohorts
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-[#061428] border border-[#1a2f4a]">
            {cohorts.reduce((a, c) => a + c.learners, 0)} Total Learners
          </span>
        </div>
      </div>

      {/* Cohort Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {cohorts.map((cohort) => (
          <div
            key={cohort.id}
            className={`rounded-3xl bg-[#061428] border transition-all duration-200 p-6 cursor-pointer ${
              selected === cohort.id ? "border-[#d4a017]/60 shadow-lg shadow-[#d4a017]/10" : "border-[#1a2f4a] hover:border-[#d4a017]/30"
            }`}
            onClick={() => setSelected(selected === cohort.id ? null : cohort.id)}
          >
            {/* Cohort Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[10px] font-black text-[#d4a017] tracking-wider uppercase mb-1">{cohort.programme}</p>
                <h3 className="text-lg font-extrabold text-white">{cohort.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Calendar className="w-3 h-3 text-[#8899b4]" aria-hidden="true" />
                  <span className="text-[11px] text-[#8899b4]">Started {cohort.startDate}</span>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border ${cohort.riskBg} ${cohort.riskColor}`}>
                {cohort.risk} Risk
              </span>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: "Learners", value: cohort.learners, icon: Users },
                { label: "Attendance", value: `${cohort.attendance}%`, icon: CheckCircle2 },
                { label: "Avg Score", value: `${cohort.avgPerformance}%`, icon: BarChart3 },
              ].map((s) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="rounded-xl bg-[#030e1f]/60 border border-[#1a2f4a] p-3 text-center">
                    <Icon className="w-4 h-4 text-[#d4a017] mx-auto mb-1" aria-hidden="true" />
                    <p className="text-sm font-extrabold text-white">{s.value}</p>
                    <p className="text-[9px] text-[#8899b4]">{s.label}</p>
                  </div>
                );
              })}
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between text-[10px] font-bold mb-1.5">
                <span className="text-[#8899b4]">Programme Completion</span>
                <span className="text-white">{cohort.completion}%</span>
              </div>
              <div className="h-2 rounded-full bg-[#030e1f] overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${cohort.completionColor}`}
                  style={{ width: `${cohort.completion}%` }}
                  role="progressbar"
                  aria-valuenow={cohort.completion}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${cohort.name} completion: ${cohort.completion}%`}
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              {[
                { label: "View Learners", icon: Users, href: "/dashboard/instructor/learners" },
                { label: "Message Cohort", icon: MessageSquare, href: "#" },
                { label: "Schedule Class", icon: Video, href: "#" },
                { label: "Export Attendance", icon: Download, href: "#" },
                { label: "View Analytics", icon: BarChart3, href: "/dashboard/instructor/learners#analytics" },
              ].map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.label}
                    href={action.href}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-[#030e1f]/60 border border-[#1a2f4a] text-[10px] font-bold text-[#8899b4] hover:text-[#d4a017] hover:border-[#d4a017]/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
                  >
                    <Icon className="w-3 h-3" aria-hidden="true" />
                    {action.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Live Classes Section */}
      <section aria-labelledby="live-classes-heading" id="live-classes">
        <h3 id="live-classes-heading" className="text-base font-extrabold text-white mb-4 flex items-center gap-2">
          <Video className="w-4 h-4 text-[#4ade80]" aria-hidden="true" />
          Upcoming Live Classes
        </h3>
        <div className="rounded-3xl bg-[#061428] border border-[#1a2f4a] divide-y divide-[#1a2f4a]">
          {[
            { title: "React Fundamentals – Session 7", cohort: "Cohort Alpha", date: "Today, 14:00", duration: "90 min", status: "Starting Soon" },
            { title: "Next.js Routing & SSR", cohort: "Cohort Beta", date: "Tomorrow, 10:00", duration: "120 min", status: "Scheduled" },
            { title: "TypeScript Deep Dive", cohort: "Cohort Gamma", date: "Wed, 09:00", duration: "90 min", status: "Scheduled" },
          ].map((cls, i) => (
            <div key={i} className="flex items-center justify-between p-4 gap-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#4ade80]/10 border border-[#4ade80]/30 flex items-center justify-center shrink-0">
                  <Video className="w-4 h-4 text-[#4ade80]" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-xs font-extrabold text-white">{cls.title}</p>
                  <p className="text-[10px] text-[#8899b4]">{cls.cohort} · {cls.date} · {cls.duration}</p>
                </div>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-[9px] font-black border shrink-0 ${
                cls.status === "Starting Soon"
                  ? "bg-[#4ade80]/10 border-[#4ade80]/30 text-[#4ade80]"
                  : "bg-[#061428] border-[#1a2f4a] text-[#8899b4]"
              }`}>
                {cls.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
