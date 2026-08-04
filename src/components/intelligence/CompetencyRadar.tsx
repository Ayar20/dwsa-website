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
    <div className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-[#1a2f4a] pb-3">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#d4a017]" />
          <div>
            <h3 className="text-sm font-extrabold text-white">{title}</h3>
            <p className="text-[10px] text-[#8899b4]">Evaluated across 8 core institutional competencies</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80] text-[10px] font-black">
          Overall Proficiency: {avgScore}%
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
        {competencies.map((c) => (
          <div key={c.name} className="rounded-2xl bg-[#030e1f] border border-[#1a2f4a] p-3.5 space-y-2 hover:border-[#d4a017]/30 transition-all">
            <div className="flex items-center justify-between text-xs">
              <span className="font-extrabold text-white">{c.name}</span>
              <span className="text-[10px] font-black text-[#d4a017]">{c.score}% · {c.level}</span>
            </div>
            <div className="h-1.5 rounded-full bg-[#061428] overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#d4a017] to-[#4ade80] transition-all"
                style={{ width: `${c.score}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
