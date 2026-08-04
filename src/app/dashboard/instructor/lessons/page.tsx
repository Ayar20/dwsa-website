"use client";

import React, { useState } from "react";
import {
  FileEdit, PlusCircle, Upload, Eye, Clock, CheckCircle2,
  BookOpen, Link as LinkIcon, FileText, Video, GitBranch,
  Library, Download, Search, Calendar,
} from "lucide-react";

const lessons = [
  { id: 1, title: "React Hooks Deep Dive", module: "React Fundamentals", cohort: "Cohort Alpha", status: "Published", statusColor: "text-[#4ade80]", statusBg: "bg-[#4ade80]/10 border-[#4ade80]/30", duration: "90 min", week: 3, attachments: ["Video", "GitHub", "Slides"] },
  { id: 2, title: "TypeScript Generics & Utility Types", module: "TypeScript", cohort: "Cohort Alpha", status: "Draft", statusColor: "text-amber-400", statusBg: "bg-amber-950/30 border-amber-800/30", duration: "75 min", week: 4, attachments: ["Slides", "Document"] },
  { id: 3, title: "Next.js App Router & SSR", module: "Next.js", cohort: "Cohort Beta", status: "Scheduled", statusColor: "text-[#818cf8]", statusBg: "bg-indigo-950/30 border-indigo-800/30", duration: "120 min", week: 4, attachments: ["Video", "GitHub", "Document", "External Link"] },
  { id: 4, title: "UI Component Architecture", module: "UI/UX Design", cohort: "Cohort Gamma", status: "Published", statusColor: "text-[#4ade80]", statusBg: "bg-[#4ade80]/10 border-[#4ade80]/30", duration: "60 min", week: 2, attachments: ["Slides", "External Link"] },
];

const vaultCategories = ["All", "Lesson Templates", "Curriculum Guides", "Assessment Rubrics", "Presentation Slides", "Coding Challenges", "Sample Projects", "Institutional Documents"];

const vaultResources = [
  { id: 1, title: "Full-Stack Curriculum Guide v2.0", category: "Curriculum Guides", type: "Document", size: "2.4 MB", updated: "2 weeks ago" },
  { id: 2, title: "React Assessment Rubric", category: "Assessment Rubrics", type: "Document", size: "840 KB", updated: "1 month ago" },
  { id: 3, title: "Week 1–4 Slide Deck", category: "Presentation Slides", type: "Slides", size: "18.2 MB", updated: "3 days ago" },
  { id: 4, title: "JavaScript Coding Challenge Pack", category: "Coding Challenges", type: "GitHub", size: "–", updated: "1 week ago" },
  { id: 5, title: "Lesson Plan Template", category: "Lesson Templates", type: "Document", size: "320 KB", updated: "2 months ago" },
  { id: 6, title: "E-Commerce Capstone Sample", category: "Sample Projects", type: "GitHub", size: "–", updated: "3 weeks ago" },
];

const attachmentIcon: Record<string, React.ElementType> = {
  Video,
  GitHub: GitBranch,
  Slides: FileText,
  Document: FileText,
  "External Link": LinkIcon,
};

export default function LessonsPage() {
  const [activeSection, setActiveSection] = useState<"lessons" | "vault">("lessons");
  const [vaultCategory, setVaultCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [showNewLesson, setShowNewLesson] = useState(false);
  const [newLesson, setNewLesson] = useState({ title: "", module: "", cohort: "", duration: "", outcomes: "", prerequisites: "" });

  const filteredVault = vaultResources.filter((r) => {
    const matchCat = vaultCategory === "All" || r.category === vaultCategory;
    const matchSearch = r.title.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Lesson Manager</h2>
          <p className="text-sm text-[#8899b4] mt-1">Create, publish, and manage lessons — plus access the Faculty Resource Vault</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => { setActiveSection("lessons"); }}
            className={`px-4 py-2 rounded-xl text-[11px] font-black border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] ${activeSection === "lessons" ? "bg-[#d4a017]/15 border-[#d4a017]/40 text-[#d4a017]" : "bg-[#061428] border-[#1a2f4a] text-[#8899b4]"}`}
            aria-pressed={activeSection === "lessons"}
          >
            Lessons
          </button>
          <button
            id="vault"
            onClick={() => { setActiveSection("vault"); }}
            className={`px-4 py-2 rounded-xl text-[11px] font-black border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] ${activeSection === "vault" ? "bg-[#d4a017]/15 border-[#d4a017]/40 text-[#d4a017]" : "bg-[#061428] border-[#1a2f4a] text-[#8899b4]"}`}
            aria-pressed={activeSection === "vault"}
          >
            Resource Vault
          </button>
        </div>
      </div>

      {activeSection === "lessons" && (
        <>
          {/* Quick Create */}
          <div className="flex justify-end">
            <button
              onClick={() => setShowNewLesson(!showNewLesson)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#d4a017]/15 border border-[#d4a017]/40 text-[#d4a017] text-xs font-black hover:bg-[#d4a017]/25 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
            >
              <PlusCircle className="w-3.5 h-3.5" /> Create Lesson
            </button>
          </div>

          {/* New Lesson Form */}
          {showNewLesson && (
            <div className="rounded-3xl bg-[#061428] border border-[#d4a017]/30 p-6 space-y-4">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <FileEdit className="w-4 h-4 text-[#d4a017]" />
                New Lesson
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { label: "Lesson Title", key: "title", placeholder: "e.g. React Hooks Deep Dive" },
                  { label: "Module", key: "module", placeholder: "e.g. React Fundamentals" },
                  { label: "Cohort", key: "cohort", placeholder: "e.g. Cohort Alpha" },
                  { label: "Duration (min)", key: "duration", placeholder: "e.g. 90" },
                ].map((f) => (
                  <div key={f.key}>
                    <label className="block text-[9px] font-black text-[#8899b4] mb-1" htmlFor={`new-${f.key}`}>{f.label}</label>
                    <input
                      id={`new-${f.key}`}
                      type="text"
                      value={newLesson[f.key as keyof typeof newLesson]}
                      onChange={(e) => setNewLesson((p) => ({ ...p, [f.key]: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white placeholder-[#8899b4] focus:outline-none focus:border-[#d4a017]/60 transition-all"
                      placeholder={f.placeholder}
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-[9px] font-black text-[#8899b4] mb-1" htmlFor="new-outcomes">Learning Outcomes</label>
                  <textarea id="new-outcomes" rows={2} className="w-full px-3 py-2.5 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white placeholder-[#8899b4] focus:outline-none focus:border-[#d4a017]/60 transition-all resize-none" placeholder="What will learners achieve?" value={newLesson.outcomes} onChange={(e) => setNewLesson((p) => ({ ...p, outcomes: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-[9px] font-black text-[#8899b4] mb-1" htmlFor="new-prereqs">Prerequisites</label>
                  <textarea id="new-prereqs" rows={2} className="w-full px-3 py-2.5 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white placeholder-[#8899b4] focus:outline-none focus:border-[#d4a017]/60 transition-all resize-none" placeholder="Required prior knowledge…" value={newLesson.prerequisites} onChange={(e) => setNewLesson((p) => ({ ...p, prerequisites: e.target.value }))} />
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <button className="px-4 py-2 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-[10px] font-black text-[#8899b4] hover:border-[#d4a017]/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]">Save Draft</button>
                <button className="px-4 py-2 rounded-xl bg-[#4ade80]/15 border border-[#4ade80]/30 text-[#4ade80] text-[10px] font-black hover:bg-[#4ade80]/25 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4ade80]">Publish Lesson</button>
                <button className="px-4 py-2 rounded-xl bg-[#818cf8]/15 border border-[#818cf8]/30 text-[#818cf8] text-[10px] font-black hover:bg-[#818cf8]/25 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#818cf8]">Schedule</button>
              </div>
            </div>
          )}

          {/* Lesson Cards */}
          <div className="space-y-4">
            {lessons.map((l) => (
              <div key={l.id} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] hover:border-[#d4a017]/30 p-5 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="text-sm font-extrabold text-white">{l.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black border ${l.statusBg} ${l.statusColor}`}>{l.status}</span>
                    </div>
                    <p className="text-[10px] text-[#8899b4]">{l.module} · {l.cohort} · Week {l.week} · {l.duration}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button className="p-2 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-[#8899b4] hover:text-[#d4a017] hover:border-[#d4a017]/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]" aria-label="Edit lesson"><FileEdit className="w-3.5 h-3.5" /></button>
                    <button className="p-2 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-[#8899b4] hover:text-[#4ade80] hover:border-[#4ade80]/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4ade80]" aria-label="Preview lesson"><Eye className="w-3.5 h-3.5" /></button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {l.attachments.map((att) => {
                    const Icon = attachmentIcon[att] || FileText;
                    return (
                      <span key={att} className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#030e1f] border border-[#1a2f4a] text-[9px] text-[#8899b4] font-semibold">
                        <Icon className="w-3 h-3" aria-hidden="true" />
                        {att}
                      </span>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Faculty Resource Vault */}
      {activeSection === "vault" && (
        <div className="space-y-6" id="vault">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8899b4]" aria-hidden="true" />
              <input type="search" placeholder="Search the resource vault…" value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#061428] border border-[#1a2f4a] text-xs text-white placeholder-[#8899b4] focus:outline-none focus:border-[#d4a017]/60 transition-all" />
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {vaultCategories.map((cat) => (
              <button key={cat} onClick={() => setVaultCategory(cat)} className={`px-3 py-1.5 rounded-xl text-[10px] font-black border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] ${vaultCategory === cat ? "bg-[#d4a017]/15 border-[#d4a017]/40 text-[#d4a017]" : "bg-[#061428] border-[#1a2f4a] text-[#8899b4] hover:border-[#d4a017]/30"}`} aria-pressed={vaultCategory === cat}>{cat}</button>
            ))}
          </div>
          <div className="space-y-3">
            {filteredVault.map((r) => (
              <div key={r.id} className="flex items-center justify-between rounded-2xl bg-[#061428] border border-[#1a2f4a] hover:border-[#d4a017]/30 p-4 transition-colors">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-9 h-9 rounded-xl bg-[#d4a017]/10 border border-[#d4a017]/20 flex items-center justify-center shrink-0">
                    <Library className="w-4 h-4 text-[#d4a017]" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">{r.title}</p>
                    <p className="text-[10px] text-[#8899b4]">{r.category} · {r.type} {r.size !== "–" ? `· ${r.size}` : ""} · Updated {r.updated}</p>
                  </div>
                </div>
                <button className="p-2 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-[#8899b4] hover:text-[#d4a017] hover:border-[#d4a017]/30 shrink-0 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]" aria-label={`Download ${r.title}`}>
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
