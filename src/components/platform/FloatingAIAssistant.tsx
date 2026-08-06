"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, X, MessageSquare, ArrowRight, Bot, ChevronUp, CheckCircle2 } from "lucide-react";

interface FloatingAIAssistantProps {
  userRole?: "STUDENT" | "INSTRUCTOR" | "ADMIN" | "SUPER_ADMIN";
}

export default function FloatingAIAssistant({ userRole = "STUDENT" }: FloatingAIAssistantProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [inputQuery, setInputQuery] = useState("");
  const [messages, setMessages] = useState<{ sender: "user" | "ai"; text: string }[]>([
    {
      sender: "ai",
      text: "Hello! I am your InstitutionOS IUX Assistant. How can I assist you with your current workspace?",
    },
  ]);

  // Page-aware prompt suggestions
  const getPromptSuggestions = () => {
    if (userRole === "STUDENT") {
      return [
        "What should I do next in my track?",
        "Summarise my current coding assignment",
        "Check my Skills Passport score",
      ];
    }
    if (userRole === "INSTRUCTOR") {
      return [
        "Summarise Cohort Delta progress",
        "Generate lesson outline for Module 5",
        "Check unreviewed GitHub PRs",
      ];
    }
    if (userRole === "SUPER_ADMIN") {
      return [
        "Check platform health & MRR",
        "Provision new tenant wizard",
        "Review Enterprise Marketplace status",
      ];
    }
    return [
      "Summarise institutional health score",
      "Generate executive report draft",
      "Check compliance & approval queue",
    ];
  };

  const suggestions = getPromptSuggestions();

  // Agent target based on role
  const getAgentInfo = () => {
    if (userRole === "STUDENT") return { name: "Aida", href: "/dashboard/student/ai-agent" };
    if (userRole === "INSTRUCTOR") return { name: "Sage", href: "/dashboard/instructor/ai-agent" };
    if (userRole === "SUPER_ADMIN") return { name: "Atlas", href: "/dashboard/platform/ai-agent" };
    return { name: "Apex", href: "/dashboard/admin/ai-executive" };
  };

  const agent = getAgentInfo();

  const handleSend = (textToSend?: string) => {
    const q = textToSend || inputQuery;
    if (!q.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: q }]);
    setInputQuery("");

    setTimeout(() => {
      let reply = `Here is an intelligent overview regarding "${q}": All academic modules are active, performance is optimal, and 0 critical risks are flagged.`;
      if (q.includes("next")) reply = "Recommended Next Action: Review your latest PR submissions and inspect your Skills Passport Radar.";
      if (q.includes("report")) reply = "Executive BI Summary: Academic compliance is at 96%, Paystack revenue settlement is confirmed, and SLA is 99.99%.";
      
      setMessages((prev) => [...prev, { sender: "ai", text: reply }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Trigger Button (Bottom-Right) */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 px-4 py-3 rounded-full bg-[#15803D] hover:bg-[#166534] text-white shadow-2xl flex items-center gap-2.5 transition-all btn-press border border-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
          aria-label="Open Floating AI Assistant"
          title="IUX Floating AI Assistant"
        >
          <Sparkles className="w-4 h-4 animate-pulse" />
          <span className="text-xs font-black tracking-wider uppercase">AI Assistant</span>
        </button>
      )}

      {/* Floating Assistant Drawer Popup */}
      {isOpen && (
        <div
          className="fixed bottom-6 right-6 z-50 w-full max-w-sm bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[500px] animate-fadeInUp"
          role="dialog"
          aria-label="AI Assistant"
        >
          {/* Header */}
          <div className="p-4 bg-[#15803D] text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div>
                <h3 className="text-xs font-extrabold leading-none">IUX AI Co-Pilot</h3>
                <p className="text-[9px] text-white/70">Connected to {agent.name} Agent</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close assistant"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8FAFC]">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                    m.sender === "user"
                      ? "bg-[#15803D] text-white rounded-br-none"
                      : "bg-white border border-slate-200 text-[#0F172A] rounded-bl-none shadow-xs"
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-3 py-2 bg-white border-t border-slate-100 flex items-center gap-1.5 overflow-x-auto">
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => handleSend(s)}
                className="px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-[10px] font-semibold hover:border-[#15803D] hover:text-[#15803D] transition-colors shrink-0"
              >
                {s}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask AI assistant..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#15803D]"
            />
            <button
              onClick={() => handleSend()}
              className="p-2 rounded-xl bg-[#15803D] text-white hover:bg-[#166534] transition-all shrink-0"
              aria-label="Send query"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Full Agent Link */}
          <div className="px-4 py-2 bg-[#F8FAFC] border-t border-slate-100 flex items-center justify-between text-[10px]">
            <span className="text-slate-500 font-semibold">Page-Aware Context Active</span>
            <Link
              href={agent.href}
              onClick={() => setIsOpen(false)}
              className="text-[#15803D] font-extrabold hover:underline"
            >
              Open Full {agent.name} Agent →
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
