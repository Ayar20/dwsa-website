"use client";

import React, { useState } from "react";
import {
  UserPlus, Search, Filter, CheckCircle2, Clock, XCircle,
  Mail, Phone, Globe, Award, Briefcase, GraduationCap, ChevronRight,
  Send, ShieldCheck, ChevronDown, Download, Layers
} from "lucide-react";

type PipelineStage =
  | "Application Received"
  | "Under Review"
  | "Interview Scheduled"
  | "Offer Issued"
  | "Offer Accepted"
  | "Enrollment Completed";

interface Applicant {
  id: number;
  name: string;
  email: string;
  country: string;
  state: string;
  programme: string;
  cohort: string;
  scholarship: boolean;
  corporateSponsor: string | null;
  stage: PipelineStage;
  appliedDate: string;
  score: number;
}

const pipelineStages: PipelineStage[] = [
  "Application Received",
  "Under Review",
  "Interview Scheduled",
  "Offer Issued",
  "Offer Accepted",
  "Enrollment Completed",
];

const initialApplicants: Applicant[] = [
  { id: 1, name: "Olamide Bakare", email: "olamide.b@example.com", country: "Nigeria", state: "Lagos", programme: "Full-Stack Software Engineering", cohort: "Cohort Delta", scholarship: true, corporateSponsor: null, stage: "Under Review", appliedDate: "2 days ago", score: 88 },
  { id: 2, name: "Kwame Mensah", email: "kwame.m@example.com", country: "Ghana", state: "Accra", programme: "Full-Stack Software Engineering", cohort: "Cohort Delta", scholarship: false, corporateSponsor: "MTN Ghana", stage: "Interview Scheduled", appliedDate: "3 days ago", score: 92 },
  { id: 3, name: "Zainab Al-Mansoor", email: "zainab.a@example.com", country: "Kenya", state: "Nairobi", programme: "AI & Data Engineering", cohort: "Cohort Delta", scholarship: true, corporateSponsor: null, stage: "Offer Issued", appliedDate: "5 days ago", score: 95 },
  { id: 4, name: "Emeka Nwosu", email: "emeka.n@example.com", country: "Nigeria", state: "Enugu", programme: "Blockchain & Digital Trust", cohort: "Cohort Delta", scholarship: false, corporateSponsor: "Access Bank", stage: "Offer Accepted", appliedDate: "1 week ago", score: 90 },
  { id: 5, name: "Fatima Bello", email: "fatima.b@example.com", country: "Nigeria", state: "Kano", programme: "Full-Stack Software Engineering", cohort: "Cohort Delta", scholarship: true, corporateSponsor: null, stage: "Application Received", appliedDate: "Today", score: 84 },
  { id: 6, name: "David Okonjo", email: "david.o@example.com", country: "Nigeria", state: "Abuja", programme: "AI & Data Engineering", cohort: "Cohort Delta", scholarship: false, corporateSponsor: null, stage: "Enrollment Completed", appliedDate: "2 weeks ago", score: 96 },
];

export default function AdmissionsPage() {
  const [applicants, setApplicants] = useState<Applicant[]>(initialApplicants);
  const [search, setSearch] = useState("");
  const [selectedProgramme, setSelectedProgramme] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [selectedStage, setSelectedStage] = useState("All");
  const [activeApplicant, setActiveApplicant] = useState<Applicant | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const filtered = applicants.filter((a) => {
    const matchSearch =
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase());
    const matchProg = selectedProgramme === "All" || a.programme === selectedProgramme;
    const matchCountry = selectedCountry === "All" || a.country === selectedCountry;
    const matchStage = selectedStage === "All" || a.stage === selectedStage;
    return matchSearch && matchProg && matchCountry && matchStage;
  });

  const moveStage = (id: number, nextStage: PipelineStage) => {
    setApplicants((prev) =>
      prev.map((a) => (a.id === id ? { ...a, stage: nextStage } : a))
    );
    setToastMsg(`Applicant stage updated to "${nextStage}"`);
    setTimeout(() => setToastMsg(null), 2500);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Toast Alert */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#061428] border border-[#4ade80]/50 text-[#4ade80] text-xs font-extrabold shadow-2xl flex items-center gap-2 animate-fadeInUp">
          <CheckCircle2 className="w-4 h-4" />
          {toastMsg}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#d4a017]/15 text-[#d4a017] text-[9px] font-black uppercase">ADMISSIONS PIPELINE</span>
            <span className="text-[10px] text-[#8899b4]">CRM Ready</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">Admissions Command Centre</h2>
          <p className="text-xs text-[#8899b4]">Manage 6-stage application pipeline, scholarships, corporate sponsorships &amp; enrollment</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-[#061428] border border-[#1a2f4a] text-[#8899b4] text-xs font-bold hover:text-white transition-all">
            <Download className="w-3.5 h-3.5" /> Export Pipeline CSV
          </button>
        </div>
      </div>

      {/* Search & Multi-Filter Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8899b4]" />
          <input
            type="search"
            placeholder="Search applicants by name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#061428] border border-[#1a2f4a] text-xs text-white placeholder-[#8899b4] focus:outline-none focus:border-[#d4a017]/60"
          />
        </div>

        <select
          value={selectedProgramme}
          onChange={(e) => setSelectedProgramme(e.target.value)}
          className="px-3 py-2.5 rounded-xl bg-[#061428] border border-[#1a2f4a] text-xs text-white focus:outline-none focus:border-[#d4a017]/60"
        >
          <option value="All">All Programmes</option>
          <option value="Full-Stack Software Engineering">Full-Stack Software Engineering</option>
          <option value="AI & Data Engineering">AI &amp; Data Engineering</option>
          <option value="Blockchain & Digital Trust">Blockchain &amp; Digital Trust</option>
        </select>

        <select
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
          className="px-3 py-2.5 rounded-xl bg-[#061428] border border-[#1a2f4a] text-xs text-white focus:outline-none focus:border-[#d4a017]/60"
        >
          <option value="All">All Countries</option>
          <option value="Nigeria">Nigeria</option>
          <option value="Ghana">Ghana</option>
          <option value="Kenya">Kenya</option>
        </select>

        <select
          value={selectedStage}
          onChange={(e) => setSelectedStage(e.target.value)}
          className="px-3 py-2.5 rounded-xl bg-[#061428] border border-[#1a2f4a] text-xs text-white focus:outline-none focus:border-[#d4a017]/60"
        >
          <option value="All">All Pipeline Stages</option>
          {pipelineStages.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      {/* Pipeline Kanban Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {pipelineStages.map((stage) => {
          const count = applicants.filter((a) => a.stage === stage).length;
          return (
            <div
              key={stage}
              onClick={() => setSelectedStage(selectedStage === stage ? "All" : stage)}
              className={`rounded-2xl p-3 border transition-all cursor-pointer ${
                selectedStage === stage
                  ? "bg-[#d4a017]/15 border-[#d4a017] text-[#d4a017]"
                  : "bg-[#061428] border-[#1a2f4a] hover:border-[#d4a017]/40"
              }`}
            >
              <p className="text-[9px] font-black uppercase text-[#8899b4] truncate">{stage}</p>
              <p className="text-xl font-extrabold text-white mt-1">{count}</p>
            </div>
          );
        })}
      </div>

      {/* Applicant Cards List */}
      <div className="space-y-3">
        {filtered.length === 0 ? (
          <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-12 text-center text-[#8899b4] text-xs">
            No applicants match your filter options.
          </div>
        ) : (
          filtered.map((a) => (
            <div key={a.id} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] hover:border-[#d4a017]/30 transition-all p-5">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017] flex items-center justify-center font-black text-base shrink-0">
                    {a.name[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm font-extrabold text-white">{a.name}</h3>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017] text-[9px] font-black">
                        {a.stage}
                      </span>
                      {a.scholarship && (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80] text-[9px] font-black">
                          Scholarship Applicant
                        </span>
                      )}
                      {a.corporateSponsor && (
                        <span className="px-2.5 py-0.5 rounded-full bg-indigo-950/40 border border-indigo-800/40 text-indigo-400 text-[9px] font-black">
                          Sponsor: {a.corporateSponsor}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#8899b4] mt-0.5">{a.programme} · {a.cohort}</p>
                    <div className="flex items-center gap-3 text-[10px] text-[#8899b4] mt-1">
                      <span><Globe className="w-3 h-3 inline mr-1" />{a.state}, {a.country}</span>
                      <span>• Applied {a.appliedDate}</span>
                      <span>• Assessment Score: <strong className="text-white">{a.score}/100</strong></span>
                    </div>
                  </div>
                </div>

                {/* Stage Advancement Action Bar */}
                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  {a.stage !== "Enrollment Completed" && (
                    <select
                      value={a.stage}
                      onChange={(e) => moveStage(a.id, e.target.value as PipelineStage)}
                      className="px-3 py-1.5 rounded-xl bg-[#030e1f] border border-[#d4a017]/30 text-[#d4a017] text-[10px] font-extrabold focus:outline-none"
                    >
                      {pipelineStages.map((stg) => (
                        <option key={stg} value={stg}>Advance to: {stg}</option>
                      ))}
                    </select>
                  )}

                  {a.stage === "Enrollment Completed" && (
                    <span className="px-3 py-1.5 rounded-xl bg-[#4ade80]/15 border border-[#4ade80]/30 text-[#4ade80] text-[10px] font-black flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> ENROLLED LEARNER
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
