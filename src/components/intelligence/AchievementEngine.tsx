"use client";

import React from "react";
import { Award, Star, Zap, CheckCircle2, Shield, Flame, BookOpen, GitBranch, Users, Sparkles } from "lucide-react";

export interface AchievementBadge {
  id: string;
  title: string;
  category: "Academic" | "DevOps" | "Engagement" | "Leadership" | "AI";
  earned: boolean;
  earnedDate?: string;
  iconName: string;
  color: string;
}

const defaultBadges: AchievementBadge[] = [
  { id: "B-1", title: "First Assignment Completed", category: "Academic", earned: true, earnedDate: "May 2026", iconName: "CheckCircle2", color: "#15803D" },
  { id: "B-2", title: "Git & GitHub Master", category: "DevOps", earned: true, earnedDate: "Jun 2026", iconName: "GitBranch", color: "#D4A017" },
  { id: "B-3", title: "Consistency Champion (14 Days)", category: "Engagement", earned: true, earnedDate: "Jul 2026", iconName: "Flame", color: "#D4A017" },
  { id: "B-4", title: "100% Attendance Excellence", category: "Engagement", earned: true, earnedDate: "Jul 2026", iconName: "Award", color: "#15803D" },
  { id: "B-5", title: "AI Prompt Engineering Explorer", category: "AI", earned: true, earnedDate: "Aug 2026", iconName: "Sparkles", color: "#15803D" },
  { id: "B-6", title: "Peer Collaboration Advocate", category: "Leadership", earned: false, iconName: "Users", color: "#D4A017" },
  { id: "B-7", title: "Capstone Innovation Award", category: "Academic", earned: false, iconName: "Star", color: "#D4A017" },
  { id: "B-8", title: "Institutional Research Contributor", category: "Leadership", earned: false, iconName: "Shield", color: "#0F172A" },
];

export default function AchievementEngine({ badges = defaultBadges }: { badges?: AchievementBadge[] }) {
  const earnedCount = badges.filter((b) => b.earned).length;

  return (
    <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-4 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <Award className="w-5 h-5 text-[#D4A017]" />
          <div>
            <h3 className="text-sm font-extrabold text-[#0F172A]">Institutional Achievement Badges</h3>
            <p className="text-[10px] text-slate-500">Earned badges, certifications &amp; academic milestones</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#FEFCE8] border border-[#D4A017]/30 text-[#D4A017] text-[10px] font-black">
          {earnedCount} / {badges.length} Badges Earned
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {badges.map((b) => (
          <div
            key={b.id}
            className={`rounded-2xl p-4 text-center border transition-all ${
              b.earned
                ? "bg-[#F8FAFC] border-slate-200 hover:border-[#15803D]/40 shadow-sm"
                : "bg-slate-50 border-slate-100 opacity-50"
            }`}
          >
            <div
              className="w-10 h-10 rounded-xl mx-auto mb-2 flex items-center justify-center"
              style={{ backgroundColor: `${b.color}15`, border: `1px solid ${b.color}30` }}
            >
              <Award className="w-5 h-5" style={{ color: b.earned ? b.color : "#94A3B8" }} />
            </div>
            <p className="text-xs font-extrabold text-[#0F172A] leading-tight">{b.title}</p>
            <p className="text-[9px] font-black mt-1" style={{ color: b.earned ? "#15803D" : "#94A3B8" }}>
              {b.earned ? `✓ EARNED · ${b.earnedDate}` : "Locked"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
