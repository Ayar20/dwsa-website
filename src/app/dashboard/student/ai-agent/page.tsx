"use client";

import React, { useState } from "react";
import { StudentAIAgentService } from "@/lib/institutionOS/StudentAIAgentService";
import {
  Sparkles, Send, Brain, BookOpen, Briefcase, FileText, Heart,
  Calendar, ChevronRight, BarChart2, Zap, MessageSquare, Star, Clock
} from "lucide-react";

export default function StudentAIAgentPage() {
  const [inputValue, setInputValue] = useState("");
  const [activeCapability, setActiveCapability] = useState("tutor");
  const capabilities = StudentAIAgentService.getCapabilities();
  const messages = StudentAIAgentService.getConversationHistory("student-001");
  const pulse = StudentAIAgentService.getLearningPulse("student-001");
  const stats = StudentAIAgentService.getAgentStats();

  const capabilityIcons: Record<string, React.ReactNode> = {
    tutor: <Brain className="w-4 h-4" />,
    planner: <Calendar className="w-4 h-4" />,
    career: <Briefcase className="w-4 h-4" />,
    assessment: <FileText className="w-4 h-4" />,
    wellbeing: <Heart className="w-4 h-4" />,
  };

  return (
    <div className="min-h-screen space-y-6 pb-8">

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#030e1f] via-[#061428] to-[#0a1f40] border border-[#4ade80]/20 p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4ade80]/5 via-transparent to-[#818cf8]/5" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4ade80] via-[#22c55e] to-[#16a34a] flex items-center justify-center shadow-lg shadow-[#4ade80]/20">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-xl font-black text-white tracking-tight">Aida — Your AI Learning Agent</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#4ade80]/20 text-[#4ade80] text-[10px] font-black tracking-widest border border-[#4ade80]/30">ONLINE</span>
              </div>
              <p className="text-sm text-[#8899b4]">Powered by InstitutionOS AI Workforce · Always learning with you</p>
            </div>
          </div>
          {/* Learning Pulse */}
          <div className="flex items-center gap-4 text-center">
            <div>
              <div className="text-lg font-black text-[#4ade80]">{pulse.studyStreakDays}</div>
              <div className="text-[10px] text-[#8899b4] font-bold">day streak</div>
            </div>
            <div className="w-px h-8 bg-[#1a2f4a]" />
            <div>
              <div className="text-lg font-black text-white">{pulse.completionRate}%</div>
              <div className="text-[10px] text-[#8899b4] font-bold">completed</div>
            </div>
            <div className="w-px h-8 bg-[#1a2f4a]" />
            <div>
              <div className="text-lg font-black text-[#818cf8]">{pulse.aiConfidenceScore}%</div>
              <div className="text-[10px] text-[#8899b4] font-bold">AI confidence</div>
            </div>
          </div>
        </div>

        {/* Recommended Action */}
        <div className="relative mt-4 p-3.5 rounded-xl bg-[#4ade80]/10 border border-[#4ade80]/20 flex items-start gap-3">
          <Zap className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-[#4ade80] mb-0.5">Aida's Recommendation for Today</p>
            <p className="text-xs text-[#c8d8f0]">{pulse.recommendedNextAction}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

        {/* LEFT: Capability Selector + Stats */}
        <div className="space-y-4">
          {/* Capability Tabs */}
          <div className="rounded-2xl bg-[#040f20] border border-[#1a2f4a] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#1a2f4a]">
              <h2 className="text-xs font-black text-[#8899b4] uppercase tracking-widest">Agent Capabilities</h2>
            </div>
            <div className="p-3 space-y-1">
              {capabilities.map((cap) => (
                <button
                  key={cap.id}
                  onClick={() => setActiveCapability(cap.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-all ${
                    activeCapability === cap.id
                      ? "bg-gradient-to-r from-[#4ade80]/20 to-[#4ade80]/5 text-white border border-[#4ade80]/30"
                      : "text-[#6b7a94] hover:text-white hover:bg-[#0c1b33]"
                  }`}
                >
                  <span className="text-base">{cap.icon}</span>
                  <span>{cap.name}</span>
                  {activeCapability === cap.id && <ChevronRight className="w-3 h-3 text-[#4ade80] ml-auto" />}
                </button>
              ))}
            </div>
          </div>

          {/* Capability Detail */}
          {capabilities.filter((c) => c.id === activeCapability).map((cap) => (
            <div key={cap.id} className="rounded-2xl bg-[#040f20] border border-[#1a2f4a] p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{cap.icon}</span>
                <h3 className="text-sm font-black text-white">{cap.name}</h3>
              </div>
              <p className="text-xs text-[#8899b4] leading-relaxed">{cap.description}</p>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-[#6b7a94] uppercase tracking-widest">Try asking:</p>
                {cap.examplePrompts.map((prompt, i) => (
                  <button
                    key={i}
                    onClick={() => setInputValue(prompt)}
                    className="w-full text-left text-xs text-[#818cf8] hover:text-white px-2 py-1.5 rounded-lg hover:bg-[#0c1b33] transition-all flex items-center gap-2"
                  >
                    <span className="text-[#4ade80]">→</span> {prompt}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Agent Stats */}
          <div className="rounded-2xl bg-[#040f20] border border-[#1a2f4a] p-4 space-y-3">
            <h3 className="text-xs font-black text-[#8899b4] uppercase tracking-widest">Your AI Stats</h3>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Questions answered", value: stats.questionsAnswered },
                { label: "Study sessions", value: stats.studySessionsPlanned },
                { label: "Assessment reviews", value: stats.assessmentReviews },
                { label: "Career interactions", value: stats.careerInteractions },
              ].map((s) => (
                <div key={s.label} className="p-2.5 rounded-xl bg-[#061428] border border-[#1a2f4a] text-center">
                  <div className="text-lg font-black text-white">{s.value}</div>
                  <div className="text-[10px] text-[#6b7a94]">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between p-2 rounded-xl bg-[#061428] border border-[#4ade80]/20">
              <div className="flex items-center gap-1.5 text-[10px] text-[#8899b4]">
                <Star className="w-3 h-3 text-[#d4a017]" />
                Satisfaction Score
              </div>
              <span className="text-sm font-black text-[#4ade80]">{stats.satisfactionScore}%</span>
            </div>
          </div>
        </div>

        {/* RIGHT: Chat Interface */}
        <div className="xl:col-span-2 rounded-2xl bg-[#040f20] border border-[#1a2f4a] flex flex-col" style={{ minHeight: "600px" }}>
          {/* Chat Header */}
          <div className="px-5 py-4 border-b border-[#1a2f4a] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4ade80] to-[#22c55e] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-black text-white">Aida</p>
                <p className="text-[10px] text-[#4ade80]">● Online · responds in ~{stats.avgResponseTime}</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-[#6b7a94]">
              <Clock className="w-3 h-3" />
              Today's session
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "student" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[80%] space-y-2 ${msg.role === "student" ? "items-end" : "items-start"} flex flex-col`}>
                  {msg.role === "agent" && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#4ade80] to-[#22c55e] flex items-center justify-center">
                        <Sparkles className="w-2.5 h-2.5 text-white" />
                      </div>
                      <span className="text-[10px] font-black text-[#4ade80]">Aida</span>
                      {msg.agentCapability && (
                        <span className="px-1.5 py-0.5 rounded bg-[#4ade80]/10 text-[#4ade80] text-[9px] font-bold border border-[#4ade80]/20 uppercase">
                          {msg.agentCapability}
                        </span>
                      )}
                    </div>
                  )}
                  <div className={`px-4 py-3 rounded-2xl text-xs leading-relaxed ${
                    msg.role === "student"
                      ? "bg-gradient-to-br from-[#818cf8]/30 to-[#818cf8]/10 text-white border border-[#818cf8]/30 rounded-tr-sm"
                      : "bg-[#061428] border border-[#1a2f4a] text-[#c8d8f0] rounded-tl-sm"
                  }`}>
                    {msg.content}
                  </div>
                  {msg.actionable && msg.action && (
                    <a
                      href={msg.action.href}
                      className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#4ade80] hover:underline"
                    >
                      <ChevronRight className="w-3 h-3" /> {msg.action.label}
                    </a>
                  )}
                  <span className="text-[10px] text-[#4a5568]">{msg.timestamp}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Input Bar */}
          <div className="px-5 py-4 border-t border-[#1a2f4a]">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#061428] border border-[#1a2f4a] focus-within:border-[#4ade80]/40 transition-all">
              <div className="text-[#4ade80]">{capabilityIcons[activeCapability]}</div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Ask Aida anything about ${capabilities.find(c => c.id === activeCapability)?.name || "your studies"}...`}
                className="flex-1 bg-transparent text-sm text-white placeholder:text-[#4a5568] outline-none"
              />
              <button
                className="p-2 rounded-lg bg-[#4ade80] text-[#030e1f] hover:bg-[#22c55e] transition-all shrink-0"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-[#4a5568] text-center mt-2">
              Aida is powered by InstitutionOS AI · Responses are personalised to your learning data
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
