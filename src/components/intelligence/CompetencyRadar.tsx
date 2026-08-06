"use client";

import React from "react";
import { Shield, Sparkles, CheckCircle2 } from "lucide-react";

interface CompetencyScore {
  name: string;
  score: number; // 0 - 100
  level: "Proficient" | "Advanced" | "Expert";
}

const defaultCompetencies: CompetencyScore[] = [
  { name: "Programming & Syntax", score: 92, level: "Advanced" },
  { name: "Problem Solving & Algorithmic", score: 88, level: "Advanced" },
  { name: "Collaboration & Teamwork", score: 95, level: "Expert" },
  { name: "Communication & Pitching", score: 85, level: "Proficient" },
  { name: "Version Control & GitHub", score: 98, level: "Expert" },
  { name: "Software Design & Architecture", score: 82, level: "Proficient" },
  { name: "AI Literacy & Prompting", score: 90, level: "Advanced" },
  { name: "Professional Practice & Ethics", score: 96, level: "Expert" },
];

export default function CompetencyRadar({
  competencies = defaultCompetencies,
  title = "DTA Competency Radar & Skill Profiler",
}: {
  competencies?: CompetencyScore[];
  title?: string;
}) {
  const avgScore = Math.round(
    competencies.reduce((acc, c) => acc + c.score, 0) / competencies.length
  );

  return (
    <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-4 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#15803D]" />
          <div>
            <h3 className="text-sm font-extrabold text-[#0F172A]">{title}</h3>
            <p className="text-[10px] text-slate-500">Evaluated across 8 core institutional competencies</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] text-[10px] font-black">
          Overall Proficiency: {avgScore}%
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        {competencies.map((c) => (
          <div key={c.name} className="rounded-2xl bg-[#F8FAFC] border border-slate-200 p-3.5 space-y-2 hover:border-[#15803D]/30 transition-all">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-[#0F172A]">{c.name}</span>
              <span className="text-[10px] font-black text-[#15803D]">{c.score}% · {c.level}</span>
            </div>
            <div className="h-1.5 rounded-full bg-slate-200 overflow-hidden">
              <div
                className="h-full rounded-full bg-[#15803D] transition-all"
                style={{ width: `${c.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
