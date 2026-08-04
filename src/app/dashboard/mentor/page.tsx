"use client";

import React from "react";
import { Calendar, MessageSquare, CheckCircle2, Users, Clock, BookOpen } from "lucide-react";
import { MentorService } from "@/lib/institutionOS/MentorService";

export default function MentorHubPage() {
  const sessions = MentorService.getMentoringSessions();

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded bg-[#818cf8]/15 text-[#818cf8] text-[9px] font-black uppercase border border-[#818cf8]/30">MENTOR HUB</span>
          <span className="text-[10px] text-[#8899b4]">InstitutionOS v3.6</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white">Mentor Operations Hub</h2>
        <p className="text-xs text-[#8899b4]">Assigned students, mentoring sessions, availability calendar &amp; career coaching notes</p>
      </div>

      {/* Mentor Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Active Mentees", value: "4", color: "text-[#d4a017]" },
          { label: "Sessions This Month", value: "9", color: "text-[#4ade80]" },
          { label: "Avg. Satisfaction", value: "4.9/5", color: "text-white" },
          { label: "Sessions Completed", value: "31", color: "text-[#818cf8]" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-4 space-y-1">
            <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-[#8899b4] font-bold uppercase">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Upcoming Sessions */}
      <div className="space-y-3">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#d4a017]" /> Mentoring Sessions
        </h3>
        <div className="space-y-3">
          {sessions.map((s) => (
            <div key={s.id} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#d4a017]/40 transition-all">
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.status === "Completed" ? "bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80]" : s.status === "Upcoming" ? "bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017]" : "bg-[#818cf8]/10 border border-[#818cf8]/30 text-[#818cf8]"}`}>
                  {s.status === "Completed" ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-extrabold text-white">{s.sessionTopic}</p>
                  <p className="text-xs text-[#d4a017] font-bold">{s.studentName}</p>
                  <p className="text-[10px] text-[#8899b4]">{s.programme}</p>
                  {s.notes && <p className="text-[10px] text-[#8899b4] italic">&ldquo;{s.notes}&rdquo;</p>}
                </div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <p className="text-xs font-bold text-white">{s.scheduledTime}</p>
                <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase ${s.status === "Completed" ? "bg-[#4ade80]/10 text-[#4ade80]" : "bg-[#d4a017]/10 text-[#d4a017]"}`}>{s.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
