"use client";

import React, { useState } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  Video,
  GitPullRequest,
  Users,
  Trophy,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export default function LearningCalendarPage() {
  const [filter, setFilter] = useState("All");

  const events = [
    {
      id: 1,
      title: "Live Masterclass: React 19 Server Actions & Neon Postgres",
      category: "Live Class",
      date: "August 6, 2026",
      time: "5:00 PM - 7:00 PM WAT",
      instructor: "Lead Architect, DWSA",
      location: "Virtual Live Room (Zoom) + Makurdi Lab",
      status: "Upcoming",
      tagColor: "text-[#d4a017] bg-[#d4a017]/10 border-[#d4a017]/30",
    },
    {
      id: 2,
      title: "Module 3 Assignment Deadline: Next.js App Router PR",
      category: "Deadline",
      date: "August 8, 2026",
      time: "11:59 PM WAT",
      instructor: "Automated PR Grading Engine",
      location: "GitHub Submissions Desk",
      status: "Required",
      tagColor: "text-[#f87171] bg-red-950/40 border-red-800/40",
    },
    {
      id: 3,
      title: "AI Developer Tools & Prompting Workshop",
      category: "Workshop",
      date: "August 12, 2026",
      time: "3:00 PM - 5:00 PM WAT",
      instructor: "AI Faculty Team",
      location: "Virtual Live Room",
      status: "Open",
      tagColor: "text-[#4ade80] bg-[#4ade80]/10 border-[#4ade80]/30",
    },
    {
      id: 4,
      title: "Instructor Office Hours & 1-on-1 PR Review",
      category: "Office Hours",
      date: "August 15, 2026",
      time: "2:00 PM - 6:00 PM WAT",
      instructor: "DTA Engineering Faculty",
      location: "Makurdi Lab / Discord Voice",
      status: "Available",
      tagColor: "text-white bg-white/10 border-white/30",
    },
    {
      id: 5,
      title: "Annual Pan-African Student Hackathon (Preparation Sprint)",
      category: "Hackathon",
      date: "August 20, 2026",
      time: "Full Day Event",
      instructor: "Innovation & Research Centre (IRC)",
      location: "Hybrid (Physical + Virtual)",
      status: "Registration Open",
      tagColor: "text-[#d4a017] bg-[#d4a017]/10 border-[#d4a017]/30",
    },
  ];

  const filteredEvents = events.filter((e) => filter === "All" || e.category === filter);

  return (
    <div className="space-y-8 animate-fadeInUp">

      {/* Header */}
      <div className="bg-gradient-to-br from-[#061428] via-[#091832] to-[#061428] border-2 border-[#d4a017] rounded-3xl p-6 sm:p-10 space-y-4 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4a017]/15 border border-[#d4a017]/40 text-[#d4a017] text-xs font-extrabold">
          <CalendarIcon className="w-4 h-4" aria-hidden="true" />
          ACADEMIC &amp; EVENT SCHEDULE
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Learning <span className="text-[#d4a017]">Calendar</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#8899b4] mt-2 max-w-3xl leading-relaxed">
            Live classes, assignment submission deadlines, instructor office hours, workshops, and hackathon schedules for Cohort 2026.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#d4a017]/20 pb-4">
        {["All", "Live Class", "Deadline", "Workshop", "Office Hours", "Hackathon"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              filter === cat
                ? "bg-[#d4a017] text-[#030e1f] shadow-md shadow-[#d4a017]/20"
                : "bg-[#061428] border border-slate-800 text-[#8899b4] hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Events List */}
      <div className="space-y-4">
        {filteredEvents.map((ev) => (
          <div
            key={ev.id}
            className="p-6 bg-[#061428] border border-slate-800 rounded-2xl space-y-3 hover:border-[#d4a017]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${ev.tagColor}`}>
                  {ev.category}
                </span>
                <span className="text-xs font-bold text-[#d4a017]">{ev.date}</span>
                <span className="text-xs text-[#8899b4]">• {ev.time}</span>
              </div>
              <h3 className="text-base font-bold text-white leading-snug">{ev.title}</h3>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#8899b4]">
                <span>Instructor: <strong className="text-white">{ev.instructor}</strong></span>
                <span>Venue: <strong className="text-slate-300">{ev.location}</strong></span>
              </div>
            </div>

            <div className="shrink-0">
              <span className="px-4 py-2 rounded-xl bg-[#030e1f] border border-[#d4a017]/30 text-[#d4a017] font-bold text-xs inline-block">
                {ev.status}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
