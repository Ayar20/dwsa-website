"use client";

import React, { useState } from "react";
import { FacultyAIAgentService } from "@/lib/institutionOS/FacultyAIAgentService";
import {
  Sparkles, AlertTriangle, CheckCircle, BookOpen, BarChart2,
  Mail, ChevronRight, Zap, Clock, Users, Star, TrendingDown,
  MessageSquare, FileCheck
} from "lucide-react";

const priorityConfig = {
  critical: { color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/30", dot: "bg-red-400" },
  high: { color: "text-[#d4a017]", bg: "bg-[#d4a017]/10", border: "border-[#d4a017]/30", dot: "bg-[#d4a017]" },
  medium: { color: "text-[#818cf8]", bg: "bg-[#818cf8]/10", border: "border-[#818cf8]/30", dot: "bg-[#818cf8]" },
  low: { color: "text-[#4ade80]", bg: "bg-[#4ade80]/10", border: "border-[#4ade80]/30", dot: "bg-[#4ade80]" },
};

const typeIcons: Record<string, React.ReactNode> = {
  "at-risk": <AlertTriangle className="w-4 h-4" />,
  engagement: <TrendingDown className="w-4 h-4" />,
  grading: <FileCheck className="w-4 h-4" />,
  content: <BookOpen className="w-4 h-4" />,
  schedule: <Clock className="w-4 h-4" />,
};

export default function FacultyAIAgentPage() {
  const [draftVisible, setDraftVisible] = useState(false);
  const insights = FacultyAIAgentService.getProactiveInsights("faculty-001");
  const capabilities = FacultyAIAgentService.getCapabilities();
  const stats = FacultyAIAgentService.getAgentStats("faculty-001");
  const feedbackDraft = FacultyAIAgentService.generateFeedbackDraft("sub-001");

  return (
    <div className="min-h-screen space-y-6 pb-8">

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#030e1f] via-[#061428] to-[#0a1f40] border border-[#d4a017]/20 p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-[#d4a017]/5 via-transparent to-[#4ade80]/5" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4a017] via-[#f0c040] to-[#b8891a] flex items-center justify-center shadow-lg shadow-[#d4a017]/20">
              <Sparkles className="w-7 h-7 text-[#030e1f]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-xl font-black text-white tracking-tight">Sage — Your AI Teaching Agent</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#4ade80]/20 text-[#4ade80] text-[10px] font-black tracking-widest border border-[#4ade80]/30">ONLINE</span>
              </div>
              <p className="text-sm text-[#8899b4]">Monitors your cohort 24/7 · Surfaces what matters · Saves you ~{stats.avgTimeSavedPerWeekHrs}hrs/week</p>
            </div>
          </div>
          {/* Quick Stats */}
          <div className="flex items-center gap-4 text-center">
            {[
              { v: stats.atRiskFlagsRaised, l: "at-risk flags", c: "text-red-400" },
              { v: stats.gradingAssistReviews, l: "grading assists", c: "text-[#d4a017]" },
              { v: stats.lessonsAnalysed, l: "lessons analysed", c: "text-[#818cf8]" },
            ].map((s, i) => (
              <React.Fragment key={i}>
                {i > 0 && <div className="w-px h-8 bg-[#1a2f4a]" />}
                <div>
                  <div className={`text-lg font-black ${s.c}`}>{s.v}</div>
                  <div className="text-[10px] text-[#8899b4] font-bold">{s.l}</div>
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* LEFT: Capabilities + Grading Draft */}
        <div className="space-y-4">
          {/* Capabilities */}
          <div className="rounded-2xl bg-[#040f20] border border-[#1a2f4a] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#1a2f4a]">
              <h2 className="text-xs font-black text-[#8899b4] uppercase tracking-widest">Sage's Capabilities</h2>
            </div>
            <div className="p-3 space-y-1">
              {capabilities.map((cap) => (
                <div key={cap.id} className="flex items-start gap-3 px-3 py-2.5 rounded-xl hover:bg-[#0c1b33] transition-all">
                  <span className="text-xl mt-0.5">{cap.icon}</span>
                  <div>
                    <p className="text-xs font-bold text-white">{cap.name}</p>
                    <p className="text-[11px] text-[#6b7a94] leading-relaxed mt-0.5">{cap.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grading Assist Demo */}
          <div className="rounded-2xl bg-[#040f20] border border-[#1a2f4a] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#1a2f4a] flex items-center justify-between">
              <h2 className="text-xs font-black text-[#d4a017] uppercase tracking-widest">Grading Assist Preview</h2>
              <button
                onClick={() => setDraftVisible(!draftVisible)}
                className="text-[10px] font-bold text-[#818cf8] hover:text-white transition-all"
              >
                {draftVisible ? "Hide Draft" : "See AI Draft"}
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="text-xs font-bold text-white">Submission: Module 3 — Full-Stack CRUD App</p>
                  <p className="text-[11px] text-[#6b7a94]">Student: Amara Okonkwo · Submitted 2h ago</p>
                </div>
                <span className="px-2 py-1 rounded-lg bg-[#d4a017]/10 text-[#d4a017] text-[10px] font-black border border-[#d4a017]/20">PENDING</span>
              </div>
              {draftVisible && (
                <div className="p-3 rounded-xl bg-[#061428] border border-[#1a2f4a] space-y-2">
                  <p className="text-[10px] font-black text-[#818cf8] uppercase tracking-widest flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" /> AI-Generated Feedback Draft
                  </p>
                  <p className="text-xs text-[#c8d8f0] leading-relaxed whitespace-pre-line">{feedbackDraft}</p>
                  <div className="flex gap-2 pt-1">
                    <button className="flex-1 py-1.5 rounded-lg bg-[#4ade80]/20 text-[#4ade80] text-[11px] font-bold hover:bg-[#4ade80]/30 transition-all border border-[#4ade80]/30">
                      Approve & Send
                    </button>
                    <button className="flex-1 py-1.5 rounded-lg bg-[#0c1b33] text-[#8899b4] text-[11px] font-bold hover:bg-[#0f2240] transition-all border border-[#1a2f4a]">
                      Edit Draft
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Agent Performance */}
          <div className="rounded-2xl bg-[#040f20] border border-[#1a2f4a] p-4 space-y-3">
            <h3 className="text-xs font-black text-[#8899b4] uppercase tracking-widest">Sage's Impact</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Time saved / week", value: `${stats.avgTimeSavedPerWeekHrs}h` },
                { label: "Interventions triggered", value: stats.interventionsTriggered },
                { label: "Content suggestions", value: stats.contentSuggestions },
                { label: "Satisfaction score", value: "94%" },
              ].map((s) => (
                <div key={s.label} className="p-2.5 rounded-xl bg-[#061428] border border-[#1a2f4a] text-center">
                  <div className="text-base font-black text-white">{s.value}</div>
                  <div className="text-[10px] text-[#6b7a94] leading-tight mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Proactive Insights */}
        <div className="xl:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black text-white">Proactive Insights from Sage</h2>
            <span className="text-[10px] text-[#8899b4]">{insights.length} active insights · auto-refreshed</span>
          </div>

          {insights.map((insight) => {
            const cfg = priorityConfig[insight.priority];
            return (
              <div key={insight.id} className={`rounded-2xl bg-[#040f20] border ${cfg.border} overflow-hidden`}>
                <div className={`px-5 py-4 ${cfg.bg}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-xl ${cfg.bg} border ${cfg.border} flex items-center justify-center shrink-0 ${cfg.color}`}>
                        {typeIcons[insight.type]}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`flex items-center gap-1 text-[9px] font-black uppercase tracking-wider ${cfg.color}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                            {insight.priority}
                          </span>
                          <span className="text-[10px] text-[#6b7a94]">{insight.timestamp}</span>
                        </div>
                        <h3 className="text-sm font-black text-white">{insight.title}</h3>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="px-5 pb-5 pt-3 space-y-3">
                  <p className="text-xs text-[#8899b4] leading-relaxed">{insight.description}</p>
                  <div className="p-3 rounded-xl bg-[#061428] border border-[#1a2f4a]">
                    <div className="flex items-center gap-1.5 mb-1">
                      <Zap className="w-3 h-3 text-[#818cf8]" />
                      <p className="text-[10px] font-black text-[#818cf8] uppercase tracking-wider">Sage's Suggested Action</p>
                    </div>
                    <p className="text-xs text-[#c8d8f0]">{insight.suggestedAction}</p>
                  </div>
                  {insight.actionLabel && insight.actionHref && (
                    <a
                      href={insight.actionHref}
                      className={`inline-flex items-center gap-1.5 text-xs font-bold ${cfg.color} hover:underline`}
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                      {insight.actionLabel}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
