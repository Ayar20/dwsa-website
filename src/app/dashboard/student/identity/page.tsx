"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import {
  UserCheck,
  Award,
  BookOpen,
  GitPullRequest,
  CheckCircle2,
  Globe,
  Save,
  Target,
  Trophy,
  Sparkles,
} from "lucide-react";

export default function DigitalIdentityPage() {
  const { data: session } = useSession();
  const [goal, setGoal] = useState("Software Engineer");
  const [bio, setBio] = useState(
    "Full-stack software developer learner at Digital Technology Academy (DTA). Building production Next.js 19 and AI-integrated applications."
  );
  const [github, setGithub] = useState("Ayar20");
  const [portfolio, setPortfolio] = useState("https://ayar20.dev");
  const [linkedin, setLinkedin] = useState("");
  const [saved, setSaved] = useState(false);

  const goals = [
    "Software Engineer",
    "AI Engineer",
    "Blockchain Developer",
    "Build a Startup",
    "Freelance Internationally",
    "Advance Tech Career",
  ];

  const skills = [
    "Full-Stack Web Dev",
    "React 19 & Next.js App Router",
    "TypeScript",
    "AI Prompt Engineering",
    "Prisma ORM & Neon Postgres",
    "Git & GitHub Actions",
    "Tailwind CSS",
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-8 animate-fadeInUp max-w-4xl mx-auto">

      {/* Profile Banner */}
      <div className="p-6 sm:p-8 bg-gradient-to-br from-[#061428] via-[#091832] to-[#061428] border-2 border-[#d4a017] rounded-3xl space-y-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">

          {/* Avatar Initial Circle */}
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#d4a017] to-[#e5a910] text-[#030e1f] flex items-center justify-center font-black text-3xl shadow-lg shadow-[#d4a017]/25 shrink-0 border-2 border-white/20">
              {session?.user?.name?.[0]?.toUpperCase() || "S"}
            </div>
            <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-[#4ade80] border-2 border-[#030e1f] text-[#030e1f]" title="Active Student">
              <CheckCircle2 className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
          </div>

          <div className="space-y-2 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#d4a017]/15 border border-[#d4a017]/40 text-[#d4a017] text-xs font-extrabold">
                STUDENT LEARNER
              </span>
              <span className="px-3 py-1 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80] text-xs font-bold">
                Cohort 2026
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white truncate">
              {session?.user?.name || "Student Learner"}
            </h1>
            <p className="text-xs text-[#8899b4] truncate">{session?.user?.email}</p>
          </div>
        </div>

        {/* Goal Badge */}
        <div className="p-4 bg-[#030e1f] border border-[#d4a017]/30 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <Target className="w-5 h-5 text-[#d4a017] shrink-0" aria-hidden="true" />
            <div>
              <span className="text-[10px] font-bold text-[#8899b4] uppercase tracking-wider block">
                Primary Learning Goal
              </span>
              <strong className="text-sm font-bold text-white">{goal}</strong>
            </div>
          </div>
          <span className="text-[10px] font-bold text-[#4ade80] bg-[#4ade80]/10 border border-[#4ade80]/30 px-3 py-1 rounded-full">
            Goal Active
          </span>
        </div>
      </div>

      {/* Digital Identity Form */}
      <form onSubmit={handleSave} className="p-6 sm:p-8 bg-[#061428] border border-[#d4a017]/30 rounded-3xl space-y-6">
        <div className="flex items-center justify-between border-b border-[#d4a017]/20 pb-4">
          <div>
            <h2 className="text-xl font-extrabold text-white">Digital Identity Settings</h2>
            <p className="text-xs text-[#8899b4]">Your professional profile across DTA and InstitutionOS</p>
          </div>
          {saved && (
            <span className="text-xs font-bold text-[#4ade80] bg-[#4ade80]/10 border border-[#4ade80]/30 px-3 py-1 rounded-full flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Saved!
            </span>
          )}
        </div>

        {/* Learning Goal Selector */}
        <div className="space-y-2">
          <label htmlFor="goal-select" className="text-xs font-bold text-[#8899b4] uppercase tracking-wider block">
            Select Your Primary Career &amp; Learning Goal
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {goals.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGoal(g)}
                className={`p-3 rounded-xl border text-xs font-bold text-left transition-all ${
                  goal === g
                    ? "bg-[#d4a017]/20 border-[#d4a017] text-[#d4a017]"
                    : "bg-[#030e1f] border-slate-800 text-[#8899b4] hover:text-white"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {/* Bio */}
        <div className="space-y-2">
          <label htmlFor="bio-input" className="text-xs font-bold text-[#8899b4] uppercase tracking-wider block">
            Professional Summary
          </label>
          <textarea
            id="bio-input"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full bg-[#030e1f] border border-[#d4a017]/20 rounded-xl p-3 text-xs text-white placeholder-[#4a6080] outline-none focus:border-[#d4a017] focus:ring-1 focus:ring-[#d4a017]"
          />
        </div>

        {/* Social / Dev Links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label htmlFor="github-input" className="text-xs font-bold text-[#8899b4] uppercase tracking-wider block">
              GitHub Username
            </label>
            <input
              id="github-input"
              type="text"
              value={github}
              onChange={(e) => setGithub(e.target.value)}
              className="w-full bg-[#030e1f] border border-[#d4a017]/20 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-[#d4a017]"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="portfolio-input" className="text-xs font-bold text-[#8899b4] uppercase tracking-wider block">
              Portfolio URL
            </label>
            <input
              id="portfolio-input"
              type="url"
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              className="w-full bg-[#030e1f] border border-[#d4a017]/20 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-[#d4a017]"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="linkedin-input" className="text-xs font-bold text-[#8899b4] uppercase tracking-wider block">
              LinkedIn Handle (Optional)
            </label>
            <input
              id="linkedin-input"
              type="text"
              placeholder="e.g. ayar-idyege"
              value={linkedin}
              onChange={(e) => setLinkedin(e.target.value)}
              className="w-full bg-[#030e1f] border border-[#d4a017]/20 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-[#d4a017]"
            />
          </div>
        </div>

        {/* Skills Pills */}
        <div className="space-y-2 pt-2">
          <span className="text-xs font-bold text-[#8899b4] uppercase tracking-wider block">
            Core Competencies &amp; Technical Skills
          </span>
          <div className="flex flex-wrap gap-2">
            {skills.map((s) => (
              <span key={s} className="px-3 py-1 rounded-full bg-[#030e1f] border border-[#d4a017]/30 text-xs font-semibold text-[#d4a017]">
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="pt-2">
          <button
            type="submit"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#d4a017] to-[#e5a910] hover:from-[#e5a910] hover:to-[#d4a017] text-[#030e1f] font-extrabold text-xs shadow-lg shadow-[#d4a017]/20 flex items-center gap-2 btn-press"
          >
            <Save className="w-4 h-4" aria-hidden="true" /> Update Digital Identity
          </button>
        </div>
      </form>

    </div>
  );
}
