"use client";

import React, { useEffect, useState } from "react";
import { Compass, CheckCircle2, Clock, Award, BookOpen, GitBranch, UserCheck, ShieldCheck } from "lucide-react";
import { eventBus } from "@/lib/institutionOS/EventBus";
import { EventBusPayload } from "@/types/institutionOS";

interface Milestone {
  id: string;
  title: string;
  stage: string;
  date: string;
  status: "Completed" | "In Progress" | "Upcoming";
  icon: React.ElementType;
}

const defaultMilestones: Milestone[] = [
  { id: "M-1", title: "Institutional Admission & Enrollment", stage: "Admissions", date: "May 01, 2026", status: "Completed", icon: UserCheck },
  { id: "M-2", title: "Campus Orientation & Pride Honor Code", stage: "Onboarding", date: "May 05, 2026", status: "Completed", icon: ShieldCheck },
  { id: "M-3", title: "Module 1: React Fundamentals & Hooks", stage: "Academic", date: "May 20, 2026", status: "Completed", icon: BookOpen },
  { id: "M-4", title: "First GitHub PR Assessment Approved", stage: "Assessment", date: "Jun 10, 2026", status: "Completed", icon: GitBranch },
  { id: "M-5", title: "Module 2: TypeScript & Generics", stage: "Academic", date: "Jul 15, 2026", status: "Completed", icon: BookOpen },
  { id: "M-6", title: "Module 3: Next.js App Router & SSR", stage: "Academic", date: "Aug 01, 2026", status: "In Progress", icon: Compass },
  { id: "M-7", title: "Capstone Project Demo & Verification", stage: "Capstone", date: "Aug 22, 2026", status: "Upcoming", icon: Award },
  { id: "M-8", title: "Graduation & Cryptographic Diploma Sign-off", stage: "Graduation", date: "Sep 01, 2026", status: "Upcoming", icon: Award },
];

export default function LearningTimeline({ milestones = defaultMilestones }: { milestones?: Milestone[] }) {
  const [liveEvents, setLiveEvents] = useState<EventBusPayload[]>([]);

  useEffect(() => {
    const unsub = eventBus.subscribe("AssignmentSubmitted", (evt) => {
      setLiveEvents((prev) => [evt, ...prev]);
    });
    return () => unsub();
  }, []);

  return (
    <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-4 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Compass className="w-5 h-5 text-[#15803D]" />
          <div>
            <h3 className="text-sm font-extrabold text-[#0F172A]">Learner Academic Journey &amp; Milestones</h3>
            <p className="text-[10px] text-slate-500">Event-driven progress tracking across program lifecycle</p>
          </div>
        </div>
        <span className="px-2.5 py-0.5 rounded bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] text-[9px] font-black uppercase">
          EVENTBUS CONNECTED
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
        {milestones.map((m) => {
          const Icon = m.icon;
          const isCompleted = m.status === "Completed";
          const isInProgress = m.status === "In Progress";
          return (
            <div
              key={m.id}
              className={`rounded-2xl p-4 border transition-all space-y-2 relative ${
                isCompleted
                  ? "bg-[#F0FDF4] border-[#15803D]/30"
                  : isInProgress
                  ? "bg-[#FEFCE8] border-[#D4A017]/40"
                  : "bg-slate-50 border-slate-200 opacity-60"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                  isCompleted ? "bg-[#F0FDF4] border border-[#15803D]/30" : isInProgress ? "bg-[#FEFCE8] border border-[#D4A017]/30" : "bg-slate-100 border border-slate-200"
                }`}>
                  <Icon className={`w-4 h-4 ${isCompleted ? "text-[#15803D]" : isInProgress ? "text-[#D4A017]" : "text-slate-400"}`} />
                </div>
                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                  isCompleted ? "bg-[#F0FDF4] text-[#15803D]" : isInProgress ? "bg-[#FEFCE8] text-[#D4A017]" : "bg-slate-100 text-slate-500"
                }`}>
                  {m.status}
                </span>
              </div>
              <p className="text-xs font-extrabold text-[#0F172A] leading-snug">{m.title}</p>
              <p className="text-[9px] text-slate-500">{m.stage} · {m.date}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
