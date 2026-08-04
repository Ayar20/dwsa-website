"use client";

import React, { useState } from "react";
import {
  Users, GraduationCap, Award, BookOpen, Clock, Star,
  Search, ShieldCheck, CheckCircle2, PlusCircle, ExternalLink
} from "lucide-react";

const facultyList = [
  { id: 1, name: "Dr. Olumide Adeleke", title: "Senior Lead Instructor & Dean", school: "School of Software Engineering", load: "3 Modules · 120 Learners", rating: "4.9/5.0", research: "AI in Technical Education", status: "Active" },
  { id: 2, name: "Aisha Mohammed, MSc", title: "Lead Full-Stack Instructor", school: "School of Software Engineering", load: "2 Modules · 80 Learners", rating: "4.8/5.0", research: "Scalable Microfrontends", status: "Active" },
  { id: 3, name: "Prof. Amina Bello", title: "Professor of Data Science & AI", school: "School of Artificial Intelligence & Data", load: "2 Modules · 95 Learners", rating: "4.95/5.0", research: "LLM Fine-Tuning in Low-Resource Languages", status: "Active" },
  { id: 4, name: "Dr. Marcus Vance", title: "Head of Cryptographic Architecture", school: "School of Blockchain & Digital Trust", load: "1 Module · 60 Learners", rating: "4.7/5.0", research: "Zero-Knowledge Proofs in Enterprise Banking", status: "Active" },
];

export default function FacultyManagementPage() {
  const [search, setSearch] = useState("");

  const filtered = facultyList.filter(
    (f) => f.name.toLowerCase().includes(search.toLowerCase()) || f.school.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#d4a017]/15 text-[#d4a017] text-[9px] font-black uppercase">FACULTY DIRECTORY</span>
            <span className="text-[10px] text-[#8899b4]">InstitutionOS v3.2</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">Faculty Management Centre</h2>
          <p className="text-xs text-[#8899b4]">Institution-wide faculty directory, teaching load allocation, research governance &amp; performance ratings</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#d4a017] text-[#030e1f] text-xs font-extrabold hover:bg-[#b8891a] transition-all">
          <PlusCircle className="w-4 h-4" /> Appoint Faculty Member
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8899b4]" />
        <input
          type="search"
          placeholder="Search faculty by name or school..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#061428] border border-[#1a2f4a] text-xs text-white placeholder-[#8899b4] focus:outline-none focus:border-[#d4a017]"
        />
      </div>

      {/* Directory Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((f) => (
          <div key={f.id} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4 hover:border-[#d4a017]/30 transition-all">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#d4a017] to-[#b8891a] text-[#030e1f] font-black text-lg flex items-center justify-center shrink-0">
                  {f.name[0]}
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white">{f.name}</h3>
                  <p className="text-xs text-[#d4a017] font-bold">{f.title}</p>
                  <p className="text-[10px] text-[#8899b4] mt-0.5">{f.school}</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80] text-[9px] font-black">
                {f.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 bg-[#030e1f] p-3 rounded-xl border border-[#1a2f4a] text-xs">
              <div>
                <span className="text-[9px] font-black text-[#8899b4] uppercase block">Teaching Load</span>
                <span className="font-bold text-white">{f.load}</span>
              </div>
              <div>
                <span className="text-[9px] font-black text-[#8899b4] uppercase block">Student Rating</span>
                <span className="font-extrabold text-[#d4a017] flex items-center gap-1">
                  <Star className="w-3 h-3 fill-[#d4a017]" /> {f.rating}
                </span>
              </div>
            </div>

            <div className="text-xs">
              <span className="text-[9px] font-black text-[#8899b4] uppercase block">Active Research Topic</span>
              <span className="text-[#8899b4] font-semibold">{f.research}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
