"use client";

import React, { useState } from "react";
import { FacultyAIAgentService } from "@/lib/institutionOS/FacultyAIAgentService";
import {
  Sparkles, AlertTriangle, CheckCircle, BookOpen, BarChart2,
  Mail, ChevronRight, Zap, Clock, Users, Star, TrendingDown,
  MessageSquare, FileCheck, Send, Loader2, RefreshCw, CheckCircle2
} from "lucide-react";
import { requestAI } from "@/lib/ai-client";

export default function FacultyAIAgentPage() {
  const [promptInput, setPromptInput] = useState("");
  const [activeTask, setActiveTask] = useState<"grading" | "rubric" | "lesson" | "feedback">("grading");
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiOutput, setAiOutput] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const capabilities = FacultyAIAgentService.getCapabilities();

  const handleGenerate = async (customPrompt?: string) => {
    const query = (customPrompt || promptInput).trim();
    if (!query || isGenerating) return;

    setIsGenerating(true);
    setAiOutput(null);

    try {
      const res = await requestAI(`[Faculty Task: ${activeTask.toUpperCase()}] ${query}`, "Faculty");
      setAiOutput(res.response);
      setToast("AI recommendation generated successfully!");
      setTimeout(() => setToast(null), 3000);
    } catch (err: any) {
      setAiOutput(`Failed to generate: ${err.message || "Please try again."}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const sampleTasks = {
    grading: "Generate a constructive grading rubric and feedback breakdown for a Capstone Full-Stack Generative AI project submission.",
    rubric: "Create a 4-tier assessment rubric (Exemplary, Proficient, Developing, Unsatisfactory) for prompt engineering and model fine-tuning.",
    lesson: "Analyze the 4-week Generative AI syllabus and suggest 3 interactive hands-on lab exercises for Nigerian enterprise professionals.",
    feedback: "Draft an encouraging mid-cohort check-in message to students with action items for mastering modern LLM application workflows.",
  };

  return (
    <div className="min-h-screen space-y-6 pb-8">
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#061428] border border-[#4ade80]/50 text-[#4ade80] text-xs font-extrabold shadow-2xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {toast}
        </div>
      )}

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
                <h1 className="text-xl font-black text-white tracking-tight">Sage — Faculty AI Teaching Co-Pilot</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#4ade80]/20 text-[#4ade80] text-[10px] font-black tracking-widest border border-[#4ade80]/30">
                  LIVE · GEMINI
                </span>
              </div>
              <p className="text-sm text-[#8899b4]">Automates grading rubrics, lesson synthesis &amp; student feedback generation</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-center">
            <div>
              <div className="text-lg font-black text-[#d4a017]">24/7</div>
              <div className="text-[10px] text-[#8899b4] font-bold">Faculty Co-Pilot</div>
            </div>
            <div className="w-px h-8 bg-[#1a2f4a]" />
            <div>
              <div className="text-lg font-black text-white">Gemini 2.0</div>
              <div className="text-[10px] text-[#8899b4] font-bold">Model Engine</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT: Capabilities & Presets */}
        <div className="space-y-4">
          <div className="rounded-2xl bg-[#040f20] border border-[#1a2f4a] p-4 space-y-3">
            <h2 className="text-xs font-black text-[#8899b4] uppercase tracking-widest">Teaching Tools</h2>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: "grading", label: "Grading Assist", icon: <FileCheck className="w-3.5 h-3.5" /> },
                { id: "rubric", label: "Rubric Builder", icon: <BarChart2 className="w-3.5 h-3.5" /> },
                { id: "lesson", label: "Lesson Lab Ideas", icon: <BookOpen className="w-3.5 h-3.5" /> },
                { id: "feedback", label: "Cohort Broadcast", icon: <Mail className="w-3.5 h-3.5" /> },
              ].map((task) => (
                <button
                  key={task.id}
                  onClick={() => {
                    setActiveTask(task.id as any);
                    setPromptInput(sampleTasks[task.id as keyof typeof sampleTasks]);
                  }}
                  className={`p-3 rounded-xl text-left text-xs font-bold transition-all flex flex-col gap-1.5 ${
                    activeTask === task.id
                      ? "bg-[#d4a017]/20 border border-[#d4a017]/40 text-white"
                      : "bg-[#061428] border border-[#1a2f4a] text-[#8899b4] hover:text-white hover:border-slate-700"
                  }`}
                >
                  <div className="text-[#d4a017]">{task.icon}</div>
                  <span>{task.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl bg-[#040f20] border border-[#1a2f4a] p-4 space-y-3">
            <h2 className="text-xs font-black text-[#8899b4] uppercase tracking-widest">Active Capabilities</h2>
            <div className="space-y-2">
              {capabilities.map((c) => (
                <div key={c.id} className="p-2.5 rounded-xl bg-[#061428] border border-[#1a2f4a] text-xs space-y-0.5">
                  <p className="font-bold text-white flex items-center gap-1.5">
                    <span>{c.icon}</span> {c.name}
                  </p>
                  <p className="text-[11px] text-[#6b7a94]">{c.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Interactive AI Co-Pilot Console */}
        <div className="xl:col-span-2 rounded-2xl bg-[#040f20] border border-[#1a2f4a] p-6 space-y-5">
          <div className="flex items-center justify-between border-b border-[#1a2f4a] pb-4">
            <div>
              <h2 className="text-base font-black text-white">Interactive Faculty Assistant Console</h2>
              <p className="text-xs text-[#8899b4] mt-0.5">Specify teaching materials, code tasks, or student questions to synthesize instant solutions.</p>
            </div>
            <button
              onClick={() => handleGenerate(sampleTasks[activeTask])}
              disabled={isGenerating}
              className="px-3 py-1.5 rounded-xl bg-[#061428] border border-[#1a2f4a] text-xs font-bold text-[#d4a017] hover:bg-[#0c1b33] flex items-center gap-1.5 disabled:opacity-50"
            >
              <Zap className="w-3.5 h-3.5" /> Load Preset
            </button>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-black text-[#8899b4] uppercase tracking-wider">
              Instruction / Prompt
            </label>
            <textarea
              rows={4}
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="e.g. Draft feedback for a student who completed Module 2 Python Generative AI assignment..."
              className="w-full p-4 rounded-xl bg-[#061428] border border-[#1a2f4a] text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[#d4a017]"
            />
          </div>

          <div className="flex justify-end">
            <button
              onClick={() => handleGenerate()}
              disabled={isGenerating || !promptInput.trim()}
              className="px-6 py-3 rounded-xl bg-[#d4a017] hover:bg-[#b8891a] text-[#030e1f] text-xs font-black flex items-center gap-2 disabled:opacity-50 transition-all shadow-md"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Synthesizing with Sage AI…
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  Generate Teaching Deliverable
                </>
              )}
            </button>
          </div>

          {/* AI Response Preview */}
          {aiOutput && (
            <div className="p-5 rounded-2xl bg-[#061428] border border-[#d4a017]/30 space-y-3 mt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-[#d4a017] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" /> Sage AI Deliverable Output
                </span>
                <span className="text-[10px] text-[#8899b4]">Grounded by DWSA Institutional Schema</span>
              </div>
              <div className="text-xs text-[#c8d8f0] leading-relaxed whitespace-pre-wrap font-sans bg-[#030e1f] p-4 rounded-xl border border-[#1a2f4a]">
                {aiOutput}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
