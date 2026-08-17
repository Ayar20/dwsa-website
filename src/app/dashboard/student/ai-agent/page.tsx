"use client";

import React, { useState } from "react";
import { StudentAIAgentService } from "@/lib/institutionOS/StudentAIAgentService";
import {
  Sparkles, Send, Brain, BookOpen, Briefcase, FileText, Heart,
  Calendar, ChevronRight, BarChart2, Zap, MessageSquare, Star, Clock,
  Loader2, AlertCircle, CheckCircle2, RotateCcw
} from "lucide-react";
import { requestAI } from "@/lib/ai-client";

interface ChatMessage {
  id: string;
  role: "student" | "agent";
  content: string;
  timestamp: string;
  agentCapability?: string;
  groundedSources?: string[];
  action?: { label: string; href: string };
}

export default function StudentAIAgentPage() {
  const [inputValue, setInputValue] = useState("");
  const [activeCapability, setActiveCapability] = useState("tutor");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const capabilities = StudentAIAgentService.getCapabilities();

  // Dynamic live chat state
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "msg-welcome",
      role: "agent",
      content: "Hello! I am Aida, your dedicated AI Learning Agent at DWSA Digital Technology Academy. How can I assist you with your curriculum, assignments, project code, or career development today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      agentCapability: "Academic Tutor",
    },
  ]);

  const [questionsCount, setQuestionsCount] = useState(0);

  const capabilityIcons: Record<string, React.ReactNode> = {
    tutor: <Brain className="w-4 h-4" />,
    planner: <Calendar className="w-4 h-4" />,
    career: <Briefcase className="w-4 h-4" />,
    assessment: <FileText className="w-4 h-4" />,
    wellbeing: <Heart className="w-4 h-4" />,
  };

  const activeCapObj = capabilities.find((c) => c.id === activeCapability) || capabilities[0];

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const timeNow = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: "student",
      content: query,
      timestamp: timeNow,
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue("");
    setIsLoading(true);
    setErrorMsg(null);

    try {
      const capabilityPrefix = `[Capability Focus: ${activeCapObj.name}] `;
      const res = await requestAI(`${capabilityPrefix}${query}`, "Student");

      const agentMsg: ChatMessage = {
        id: `agent-${Date.now()}`,
        role: "agent",
        content: res.response,
        timestamp: res.timestamp || timeNow,
        agentCapability: activeCapObj.name,
        groundedSources: res.groundedSources,
      };

      setMessages((prev) => [...prev, agentMsg]);
      setQuestionsCount((prev) => prev + 1);
    } catch (err: any) {
      setErrorMsg(err.message || "Failed to reach Aida AI Agent. Please check your network or try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: `msg-welcome-${Date.now()}`,
        role: "agent",
        content: `Switched mode to ${activeCapObj.name}. What would you like to explore or solve together?`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        agentCapability: activeCapObj.name,
      },
    ]);
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
                <span className="px-2 py-0.5 rounded-full bg-[#4ade80]/20 text-[#4ade80] text-[10px] font-black tracking-widest border border-[#4ade80]/30">
                  LIVE · GEMINI 2.0
                </span>
              </div>
              <p className="text-sm text-[#8899b4]">Powered by InstitutionOS AI Workforce · Personalized to your DWSA curriculum</p>
            </div>
          </div>

          {/* Real-time Session Indicator */}
          <div className="flex items-center gap-4 text-center">
            <div>
              <div className="text-lg font-black text-[#4ade80]">{questionsCount}</div>
              <div className="text-[10px] text-[#8899b4] font-bold">queries answered</div>
            </div>
            <div className="w-px h-8 bg-[#1a2f4a]" />
            <div>
              <div className="text-lg font-black text-white">{activeCapObj.name}</div>
              <div className="text-[10px] text-[#8899b4] font-bold">active capability</div>
            </div>
            <div className="w-px h-8 bg-[#1a2f4a]" />
            <div>
              <div className="text-lg font-black text-[#818cf8]">100%</div>
              <div className="text-[10px] text-[#8899b4] font-bold">uptime</div>
            </div>
          </div>
        </div>

        {/* Dynamic Capability Banner */}
        <div className="relative mt-4 p-3.5 rounded-xl bg-[#4ade80]/10 border border-[#4ade80]/20 flex items-start gap-3">
          <Zap className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-bold text-[#4ade80] mb-0.5">Active Mode: {activeCapObj.name}</p>
            <p className="text-xs text-[#c8d8f0]">{activeCapObj.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT: Capability Selector + Stats */}
        <div className="space-y-4">
          {/* Capability Tabs */}
          <div className="rounded-2xl bg-[#040f20] border border-[#1a2f4a] overflow-hidden">
            <div className="px-4 py-3 border-b border-[#1a2f4a] flex items-center justify-between">
              <h2 className="text-xs font-black text-[#8899b4] uppercase tracking-widest">Agent Capabilities</h2>
              <span className="text-[10px] text-[#4ade80] font-mono">5 Ready</span>
            </div>
            <div className="p-3 space-y-1">
              {capabilities.map((cap) => (
                <button
                  key={cap.id}
                  onClick={() => {
                    setActiveCapability(cap.id);
                  }}
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

          {/* Suggested Prompts for active capability */}
          <div className="rounded-2xl bg-[#040f20] border border-[#1a2f4a] p-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{activeCapObj.icon}</span>
              <div>
                <h3 className="text-sm font-black text-white">{activeCapObj.name}</h3>
                <p className="text-[10px] text-[#8899b4]">One-click instant prompts</p>
              </div>
            </div>
            <div className="space-y-1.5 pt-1">
              {activeCapObj.examplePrompts.map((prompt, i) => (
                <button
                  key={i}
                  disabled={isLoading}
                  onClick={() => handleSendMessage(prompt)}
                  className="w-full text-left text-xs text-[#818cf8] hover:text-white px-2.5 py-2 rounded-lg bg-[#061428]/60 hover:bg-[#0c1b33] border border-[#1a2f4a] transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <span className="text-[#4ade80] font-bold">→</span>
                  <span className="truncate">{prompt}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Clear / New Conversation Button */}
          <button
            onClick={handleResetChat}
            className="w-full py-2.5 px-4 rounded-xl border border-[#1a2f4a] bg-[#040f20] hover:bg-[#0c1b33] text-xs font-bold text-[#8899b4] hover:text-white flex items-center justify-center gap-2 transition-all"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Start New Session
          </button>
        </div>

        {/* RIGHT: Chat Interface */}
        <div className="xl:col-span-2 rounded-2xl bg-[#040f20] border border-[#1a2f4a] flex flex-col" style={{ minHeight: "640px" }}>
          {/* Chat Header */}
          <div className="px-5 py-4 border-b border-[#1a2f4a] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4ade80] to-[#22c55e] flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <p className="text-xs font-black text-white">Aida ({activeCapObj.name})</p>
                <p className="text-[10px] text-[#4ade80]">● Connected to Gemini API Gateway</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-[#6b7a94]">
              <Clock className="w-3 h-3" />
              Active Session
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4 max-h-[500px]">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "student" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] space-y-1.5 ${msg.role === "student" ? "items-end" : "items-start"} flex flex-col`}>
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
                  <div
                    className={`px-4 py-3 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                      msg.role === "student"
                        ? "bg-gradient-to-br from-[#818cf8]/30 to-[#818cf8]/10 text-white border border-[#818cf8]/30 rounded-tr-sm"
                        : "bg-[#061428] border border-[#1a2f4a] text-[#c8d8f0] rounded-tl-sm"
                    }`}
                  >
                    {msg.content}
                  </div>

                  {msg.groundedSources && msg.groundedSources.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1">
                      {msg.groundedSources.map((src, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-[#030e1f] border border-[#1a2f4a] text-[9px] text-[#8899b4]">
                          📚 {src}
                        </span>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] text-[#4a5568]">{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="p-4 rounded-2xl bg-[#061428] border border-[#1a2f4a] text-[#4ade80] text-xs flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-[#4ade80]" />
                  <span>Aida is synthesizing guidance for you…</span>
                </div>
              </div>
            )}

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-950/40 border border-red-800 text-red-300 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="px-5 py-4 border-t border-[#1a2f4a]"
          >
            <div className="flex items-center gap-3 p-3 rounded-xl bg-[#061428] border border-[#1a2f4a] focus-within:border-[#4ade80]/40 transition-all">
              <div className="text-[#4ade80]">{capabilityIcons[activeCapability]}</div>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Ask Aida anything (${activeCapObj.name})...`}
                className="flex-1 bg-transparent text-sm text-white placeholder:text-[#4a5568] outline-none"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="p-2 rounded-lg bg-[#4ade80] hover:bg-[#22c55e] text-[#030e1f] font-bold transition-all shrink-0 disabled:opacity-40"
                aria-label="Send message"
              >
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-[#4a5568] text-center mt-2">
              InstitutionOS AI Companion · Generates real-time assistance via Google Gemini
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
