"use client";

import React, { useState } from "react";
import { Sparkles, Send, BookOpen, Code, Briefcase, Star, Bookmark, Share2, RefreshCw, CheckCircle2 } from "lucide-react";
import { AIOrchestrator, AIResponse } from "@/lib/institutionOS/AIOrchestrator";
import { PromptLibraryService, PromptTemplate } from "@/lib/institutionOS/PromptLibraryService";
import { RecommendationService, AIRecommendation } from "@/lib/institutionOS/RecommendationService";

export default function StudentAIAssistantPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<Array<{ sender: "user" | "ai"; text: string; sources?: string[]; time: string }>>([
    {
      sender: "ai",
      text: "Hello! I am your AI Learning Companion. I can assist you with code reviews, study planning, assignment guidance, and career placement preparation. How can I help you today?",
      time: "10:00 AM",
    },
  ]);
  const [toast, setToast] = useState<string | null>(null);

  const prompts = PromptLibraryService.getPromptsForRole("Student");
  const recommendations = RecommendationService.getRecommendationsForRole("Student");

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || prompt;
    if (!query.trim()) return;

    const userTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setChatHistory((prev) => [...prev, { sender: "user", text: query, time: userTime }]);
    if (!textToSend) setPrompt("");
    setLoading(true);

    const res: AIResponse = await AIOrchestrator.processRequest(query, { role: "Student" });

    setChatHistory((prev) => [
      ...prev,
      {
        sender: "ai",
        text: res.response,
        sources: res.groundedSources,
        time: res.timestamp,
      },
    ]);
    setLoading(false);
  };

  const handlePromptClick = (p: PromptTemplate) => {
    PromptLibraryService.incrementUsage(p.id);
    handleSend(p.promptText);
  };

  return (
    <div className="space-y-8 pb-12">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#061428] border border-[#4ade80]/50 text-[#4ade80] text-xs font-extrabold shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {toast}
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded bg-[#818cf8]/15 text-[#818cf8] text-[9px] font-black uppercase border border-[#818cf8]/30">AI COMPANION</span>
          <span className="text-[10px] text-[#8899b4]">InstitutionOS v3.8 · Provider: {AIOrchestrator.getActiveProvider()}</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white">Student AI Learning Assistant</h2>
        <p className="text-xs text-[#8899b4]">Personalized learning coach, code reviewer, assignment guide &amp; career placement advisor</p>
      </div>

      {/* Recommendations & Quick Prompts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recommended Actions */}
        <div className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-5 space-y-3">
          <h3 className="text-xs font-extrabold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#d4a017]" /> AI Learning Recommendations
          </h3>
          <div className="space-y-2">
            {recommendations.map((rec) => (
              <div key={rec.id} className="p-3 rounded-2xl bg-[#030e1f] border border-[#1a2f4a] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-white">{rec.title}</span>
                  <span className="px-2 py-0.5 rounded bg-[#4ade80]/10 text-[#4ade80] text-[9px] font-black">{rec.impactScore}% Impact</span>
                </div>
                <p className="text-[10px] text-[#8899b4]">{rec.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Prompts */}
        <div className="lg:col-span-2 rounded-3xl bg-[#061428] border border-[#1a2f4a] p-5 space-y-3">
          <h3 className="text-xs font-extrabold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#818cf8]" /> Pre-Approved Learning Prompts
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {prompts.map((p) => (
              <button
                key={p.id}
                onClick={() => handlePromptClick(p)}
                className="text-left p-3 rounded-2xl bg-[#030e1f] border border-[#1a2f4a] hover:border-[#d4a017]/40 hover:bg-[#0f223d]/50 transition-all space-y-1 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white group-hover:text-[#d4a017]">{p.title}</span>
                  <span className="text-[9px] text-[#8899b4]">{p.usageCount} uses</span>
                </div>
                <p className="text-[9px] text-[#8899b4] line-clamp-1">{p.description}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Chat Interface */}
      <div className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4 flex flex-col h-[500px]">
        <div className="flex items-center justify-between border-b border-[#1a2f4a] pb-3">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#4ade80] animate-pulse" />
            <span className="text-xs font-extrabold text-white">AI Learning Companion (Active)</span>
          </div>
          <button
            onClick={() => {
              setToast("Conversation exported to Knowledge Centre!");
              setTimeout(() => setToast(null), 3000);
            }}
            className="text-[10px] font-bold text-[#d4a017] hover:underline flex items-center gap-1"
          >
            <Share2 className="w-3 h-3" /> Export Thread
          </button>
        </div>

        {/* Message Feed */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {chatHistory.map((m, i) => (
            <div key={i} className={`flex flex-col ${m.sender === "user" ? "items-end" : "items-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl p-4 space-y-2 ${
                  m.sender === "user"
                    ? "bg-gradient-to-r from-[#d4a017] to-[#b8891a] text-[#030e1f] font-semibold"
                    : "bg-[#030e1f] border border-[#1a2f4a] text-white"
                }`}
              >
                <p className="text-xs whitespace-pre-wrap leading-relaxed">{m.text}</p>
                {m.sources && m.sources.length > 0 && (
                  <div className="pt-2 border-t border-[#1a2f4a] text-[9px] text-[#8899b4]">
                    <span className="font-bold text-[#d4a017]">Grounded Sources:</span> {m.sources.join(", ")}
                  </div>
                )}
              </div>
              <span className="text-[9px] text-[#8899b4] mt-1 px-1">{m.time}</span>
            </div>
          ))}
          {loading && (
            <div className="flex items-center gap-2 text-xs text-[#d4a017] font-bold">
              <RefreshCw className="w-4 h-4 animate-spin" /> Synthesizing AI response...
            </div>
          )}
        </div>

        {/* Input Bar */}
        <div className="flex items-center gap-2 pt-3 border-t border-[#1a2f4a]">
          <input
            type="text"
            placeholder="Ask your AI learning companion anything..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 px-4 py-3 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white placeholder-[#8899b4] focus:outline-none focus:border-[#d4a017]"
          />
          <button
            onClick={() => handleSend()}
            disabled={loading || !prompt.trim()}
            className="px-5 py-3 rounded-xl bg-[#d4a017] text-[#030e1f] text-xs font-extrabold hover:bg-[#b8891a] transition-all disabled:opacity-50 flex items-center gap-2 shrink-0"
          >
            <Send className="w-3.5 h-3.5" /> Send
          </button>
        </div>
      </div>
    </div>
  );
}
