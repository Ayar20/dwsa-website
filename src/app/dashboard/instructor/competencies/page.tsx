"use client";

import React, { useState } from "react";
import {
  Shield, CheckCircle2, Clock, AlertTriangle, ChevronDown,
  GitPullRequest, Code, Database, Layers, TestTube, Sparkles,
  Award, Users, Search,
} from "lucide-react";

type CompetencyStatus = "Verified" | "Pending" | "Needs Improvement";

interface Competency {
  id: number;
  skill: string;
  category: string;
  icon: React.ElementType;
  iconColor: string;
  description: string;
}

interface LearnerCompetency {
  learnerId: number;
  learnerName: string;
  cohort: string;
  competencies: Record<number, CompetencyStatus>;
}

const competencies: Competency[] = [
  { id: 1, skill: "Git & GitHub", category: "DevOps", icon: GitPullRequest, iconColor: "#d4a017", description: "Version control, branching, PR workflows, collaboration" },
  { id: 2, skill: "React Development", category: "Frontend", icon: Code, iconColor: "#4ade80", description: "Components, hooks, state management, lifecycle" },
  { id: 3, skill: "Next.js", category: "Frontend", icon: Layers, iconColor: "#818cf8", description: "App Router, SSR, SSG, API routes, optimisation" },
  { id: 4, skill: "TypeScript", category: "Language", icon: Code, iconColor: "#60a5fa", description: "Types, interfaces, generics, utility types" },
  { id: 5, skill: "REST APIs", category: "Backend", icon: Database, iconColor: "#f59e0b", description: "HTTP methods, authentication, JSON, error handling" },
  { id: 6, skill: "PostgreSQL", category: "Database", icon: Database, iconColor: "#4ade80", description: "Schema design, queries, relations, Prisma ORM" },
  { id: 7, skill: "AI Prompt Engineering", category: "AI/ML", icon: Sparkles, iconColor: "#d4a017", description: "Effective prompting, RAG basics, AI-assisted development" },
  { id: 8, skill: "Software Testing", category: "Quality", icon: TestTube, iconColor: "#f87171", description: "Unit tests, integration tests, TDD fundamentals" },
];

const statusConfig: Record<CompetencyStatus, { label: string; color: string; bg: string; border: string; icon: React.ElementType }> = {
  Verified: { label: "Verified", color: "text-[#4ade80]", bg: "bg-[#4ade80]/10", border: "border-[#4ade80]/30", icon: CheckCircle2 },
  Pending: { label: "Pending", color: "text-amber-400", bg: "bg-amber-950/30", border: "border-amber-800/30", icon: Clock },
  "Needs Improvement": { label: "Needs Improvement", color: "text-red-400", bg: "bg-red-950/30", border: "border-red-800/30", icon: AlertTriangle },
};

const statusCycle: CompetencyStatus[] = ["Pending", "Verified", "Needs Improvement"];

const initialLearnerData: LearnerCompetency[] = [
  { learnerId: 1, learnerName: "Kofi Asante", cohort: "Cohort Alpha", competencies: { 1: "Verified", 2: "Verified", 3: "Verified", 4: "Pending", 5: "Verified", 6: "Pending", 7: "Pending", 8: "Needs Improvement" } },
  { learnerId: 2, learnerName: "Aisha Ibrahim", cohort: "Cohort Beta", competencies: { 1: "Verified", 2: "Pending", 3: "Pending", 4: "Needs Improvement", 5: "Pending", 6: "Needs Improvement", 7: "Pending", 8: "Pending" } },
  { learnerId: 3, learnerName: "Adaobi Nwosu", cohort: "Cohort Alpha", competencies: { 1: "Verified", 2: "Verified", 3: "Pending", 4: "Verified", 5: "Verified", 6: "Pending", 7: "Pending", 8: "Pending" } },
  { learnerId: 4, learnerName: "Yusuf Al-Farouq", cohort: "Cohort Beta", competencies: { 1: "Verified", 2: "Needs Improvement", 3: "Pending", 4: "Pending", 5: "Needs Improvement", 6: "Pending", 7: "Pending", 8: "Needs Improvement" } },
];

const categories = ["All", "Frontend", "Backend", "DevOps", "Language", "Database", "AI/ML", "Quality"];

export default function CompetenciesPage() {
  const [learnerData, setLearnerData] = useState<LearnerCompetency[]>(initialLearnerData);
  const [expandedLearner, setExpandedLearner] = useState<number | null>(null);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [savedId, setSavedId] = useState<number | null>(null);

  const filteredCompetencies = competencies.filter((c) => {
    const matchCat = categoryFilter === "All" || c.category === categoryFilter;
    return matchCat;
  });

  const filteredLearners = learnerData.filter((l) =>
    l.learnerName.toLowerCase().includes(search.toLowerCase()) ||
    l.cohort.toLowerCase().includes(search.toLowerCase())
  );

  const cycleStatus = (learnerId: number, compId: number) => {
    setLearnerData((prev) =>
      prev.map((l) => {
        if (l.learnerId !== learnerId) return l;
        const current = l.competencies[compId] || "Pending";
        const nextIdx = (statusCycle.indexOf(current) + 1) % statusCycle.length;
        return { ...l, competencies: { ...l.competencies, [compId]: statusCycle[nextIdx] } };
      })
    );
  };

  const handleSave = (learnerId: number) => {
    setSavedId(learnerId);
    setTimeout(() => setSavedId(null), 2000);
  };

  const getVerifiedCount = (lc: LearnerCompetency) =>
    Object.values(lc.competencies).filter((s) => s === "Verified").length;

  // Institution-wide stats
  const totalVerified = learnerData.reduce((sum, l) => sum + getVerifiedCount(l), 0);
  const totalCompetencies = learnerData.length * competencies.length;
  const verificationRate = Math.round((totalVerified / totalCompetencies) * 100);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-extrabold text-white">Competency Validation Framework</h2>
        <p className="text-sm text-[#8899b4] mt-1">
          Verify and track learner competencies — connects to Competency Passport, Digital Portfolio &amp; Verified Certificates
        </p>
      </div>

      {/* Framework Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Competency Areas", value: String(competencies.length), color: "#d4a017", icon: Shield },
          { label: "Learners Tracked", value: String(learnerData.length), color: "#4ade80", icon: Users },
          { label: "Total Verified", value: String(totalVerified), color: "#818cf8", icon: CheckCircle2 },
          { label: "Verification Rate", value: `${verificationRate}%`, color: "#60a5fa", icon: Award },
        ].map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${s.color}20`, border: `1px solid ${s.color}30` }}>
                <Icon className="w-4 h-4" style={{ color: s.color }} aria-hidden="true" />
              </div>
              <p className="text-2xl font-extrabold text-white">{s.value}</p>
              <p className="text-[10px] text-[#8899b4] font-semibold leading-tight mt-0.5">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Competency Framework Overview */}
      <section aria-labelledby="framework-heading">
        <div className="flex items-center justify-between mb-4">
          <h3 id="framework-heading" className="text-sm font-extrabold text-white">DTA Competency Framework</h3>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`px-2.5 py-1 rounded-xl text-[9px] font-black border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] ${
                  categoryFilter === cat
                    ? "bg-[#d4a017]/15 border-[#d4a017]/40 text-[#d4a017]"
                    : "bg-[#061428] border-[#1a2f4a] text-[#8899b4] hover:border-[#d4a017]/30"
                }`}
                aria-pressed={categoryFilter === cat}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {filteredCompetencies.map((comp) => {
            const Icon = comp.icon;
            return (
              <div key={comp.id} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-4 hover:border-[#d4a017]/30 transition-colors">
                <div className="flex items-start gap-3 mb-2">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${comp.iconColor}20`, border: `1px solid ${comp.iconColor}30` }}>
                    <Icon className="w-4 h-4" style={{ color: comp.iconColor }} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-extrabold text-white leading-snug">{comp.skill}</p>
                    <p className="text-[9px] text-[#8899b4] font-semibold">{comp.category}</p>
                  </div>
                </div>
                <p className="text-[9px] text-[#8899b4] leading-relaxed">{comp.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Learner Competency Validation */}
      <section aria-labelledby="validation-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 id="validation-heading" className="text-sm font-extrabold text-white">Learner Competency Validation</h3>
            <p className="text-[11px] text-[#8899b4]">Click any status badge to cycle through: Pending → Verified → Needs Improvement</p>
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8899b4]" aria-hidden="true" />
            <input
              type="search"
              placeholder="Search learners…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#061428] border border-[#1a2f4a] text-xs text-white placeholder-[#8899b4] focus:outline-none focus:border-[#d4a017]/60 transition-all"
              aria-label="Search learners"
            />
          </div>
        </div>

        {/* Status Legend */}
        <div className="flex flex-wrap gap-2 mb-4">
          {Object.entries(statusConfig).map(([key, cfg]) => {
            const Icon = cfg.icon;
            return (
              <span key={key} className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-[9px] font-black ${cfg.bg} ${cfg.border} ${cfg.color}`}>
                <Icon className="w-3 h-3" aria-hidden="true" /> {cfg.label}
              </span>
            );
          })}
        </div>

        <div className="space-y-4">
          {filteredLearners.map((learner) => {
            const verified = getVerifiedCount(learner);
            const pct = Math.round((verified / competencies.length) * 100);
            return (
              <div key={learner.learnerId} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] hover:border-[#d4a017]/30 transition-colors">
                {/* Learner Header */}
                <div
                  className="flex items-center gap-4 p-4 cursor-pointer"
                  onClick={() => setExpandedLearner(expandedLearner === learner.learnerId ? null : learner.learnerId)}
                >
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#d4a017] to-[#b8891a] flex items-center justify-center font-black text-sm text-[#030e1f] shrink-0">
                    {learner.learnerName[0]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-xs font-extrabold text-white">{learner.learnerName}</p>
                      <span className="text-[10px] text-[#8899b4]">{learner.cohort}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-1.5">
                      <div className="flex-1 h-1.5 rounded-full bg-[#030e1f] overflow-hidden max-w-32">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-[#d4a017] to-[#4ade80]"
                          style={{ width: `${pct}%` }}
                          role="progressbar"
                          aria-valuenow={pct}
                          aria-valuemin={0}
                          aria-valuemax={100}
                          aria-label={`${learner.learnerName} competency progress: ${pct}%`}
                        />
                      </div>
                      <span className="text-[10px] font-bold text-[#8899b4]">{verified}/{competencies.length} verified</span>
                    </div>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-[#8899b4] transition-transform ${expandedLearner === learner.learnerId ? "rotate-180" : ""}`} aria-hidden="true" />
                </div>

                {/* Expanded Competency Grid */}
                {expandedLearner === learner.learnerId && (
                  <div className="border-t border-[#1a2f4a] p-5 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      {competencies.map((comp) => {
                        const status = learner.competencies[comp.id] || "Pending";
                        const cfg = statusConfig[status];
                        const StatusIcon = cfg.icon;
                        const CompIcon = comp.icon;
                        return (
                          <button
                            key={comp.id}
                            onClick={() => cycleStatus(learner.learnerId, comp.id)}
                            className={`rounded-xl p-3 text-left border transition-all hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] ${cfg.bg} ${cfg.border}`}
                            aria-label={`${comp.skill} for ${learner.learnerName}: ${status}. Click to change.`}
                          >
                            <div className="flex items-center justify-between mb-1.5">
                              <CompIcon className="w-3.5 h-3.5" style={{ color: comp.iconColor }} aria-hidden="true" />
                              <StatusIcon className={`w-3.5 h-3.5 ${cfg.color}`} aria-hidden="true" />
                            </div>
                            <p className="text-[10px] font-bold text-white leading-tight">{comp.skill}</p>
                            <p className={`text-[9px] font-black mt-0.5 ${cfg.color}`}>{cfg.label}</p>
                          </button>
                        );
                      })}
                    </div>
                    <div className="flex items-center gap-3 pt-1">
                      <button
                        onClick={() => handleSave(learner.learnerId)}
                        className="px-4 py-2 rounded-xl bg-[#d4a017]/15 border border-[#d4a017]/40 text-[#d4a017] text-[10px] font-black hover:bg-[#d4a017]/25 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
                      >
                        Save to Competency Passport
                      </button>
                      {savedId === learner.learnerId && (
                        <span className="flex items-center gap-1 text-[#4ade80] text-[10px] font-bold" role="status">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Saved
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
