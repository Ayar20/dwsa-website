"use client";

import React, { useState } from "react";
import { Sparkles, Send, BookOpen, CheckCircle2, RefreshCw, FileText, Award, Users } from "lucide-react";
import { AIOrchestrator } from "@/lib/institutionOS/AIOrchestrator";
import { PromptLibraryService } from "@/lib/institutionOS/PromptLibraryService";

export default function FacultyAIAssistantPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const prompts = PromptLibraryService.getPromptsForRole("Faculty");

  const handleGenerate = async (customText?: string) => {
    const query = customText || prompt;
    if (!query.trim()) return;

    setLoading(true);
    const res = await AIOrchestrator.processRequest(query, { role: "Faculty" });
    setResponse(res.response);
    setLoading(false);
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded bg-[#4ade80]/15 text-[#4ade80] text-[9px] font-black uppercase border border-[#4ade80]/30">FACULTY AI</span>
          <span className="text-[10px] text-[#8899b4]">InstitutionOS v3.8 · Provider: {AIOrchestrator.getActiveProvider()}</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white">Faculty AI Co-Pilot</h2>
        <p className="text-xs text-[#8899b4]">Lesson planning, assessment generator, rubric builder, assignment feedback &amp; student intervention advisor</p>
      </div>

      {/* Faculty Prompt Library */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold text-white flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-[#4ade80]" /> Pre-Approved Teaching &amp; Assessment Prompts
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {prompts.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                setPrompt(p.promptText);
                handleGenerate(p.promptText);
              }}
              className="text-left p-4 rounded-2xl bg-[#061428] border border-[#1a2f4a] hover:border-[#4ade80]/40 transition-all space-y-2 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-white group-hover:text-[#4ade80]">{p.title}</span>
                <span className="px-2 py-0.5 rounded bg-[#4ade80]/10 text-[#4ade80] text-[9px] font-black">v{p.version}</span>
              </div>
              <p className="text-[10px] text-[#8899b4] line-clamp-2">{p.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Generator Workspace */}
      <div className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#4ade80]" /> AI Teaching Assistant Workspace
        </h3>
        <div className="space-y-3">
          <textarea
            rows={3}
            placeholder="Enter your instruction (e.g., 'Generate a 4-criterion grading rubric for Next.js App Router PR submissions')..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full p-4 rounded-2xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white placeholder-[#8899b4] focus:outline-none focus:border-[#4ade80]"
          />
          <button
            onClick={() => handleGenerate()}
            disabled={loading || !prompt.trim()}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#4ade80] text-[#030e1f] text-xs font-extrabold hover:bg-[#38c46c] transition-all disabled:opacity-50"
          >
            {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            {loading ? "Generating Output..." : "Generate AI Output"}
          </button>
        </div>

        {response && (
          <div className="pt-4 border-t border-[#1a2f4a] space-y-2">
            <span className="text-[10px] font-black text-[#4ade80] uppercase tracking-wider">AI Generated Result:</span>
            <div className="p-4 rounded-2xl bg-[#030e1f] border border-[#4ade80]/30 text-xs text-white leading-relaxed font-mono whitespace-pre-wrap">
              {response}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
