"use client";

import React, { useState } from "react";
import {
  Megaphone, PlusCircle, Pin, Archive, Clock, CheckCircle2,
  AlertTriangle, AlertCircle, Info, Calendar, Users, BookOpen,
  GraduationCap, ChevronDown, Trash2, Eye,
} from "lucide-react";

const priorityConfig = {
  Information: { color: "#818cf8", bg: "bg-indigo-950/30", border: "border-indigo-800/30", icon: Info },
  Academic: { color: "#d4a017", bg: "bg-[#d4a017]/10", border: "border-[#d4a017]/30", icon: BookOpen },
  Urgent: { color: "#f59e0b", bg: "bg-amber-950/30", border: "border-amber-800/30", icon: AlertTriangle },
  Emergency: { color: "#f87171", bg: "bg-red-950/40", border: "border-red-800/40", icon: AlertCircle },
};

const targetOptions = [
  { label: "Entire Institution", icon: Users },
  { label: "Specific Programme", icon: GraduationCap },
  { label: "Specific Cohort", icon: Users },
  { label: "Specific Module", icon: BookOpen },
];

const existingAnnouncements = [
  {
    id: 1, title: "Week 4 Live Class Schedule Update",
    body: "Please note that the Thursday live class for Cohort Alpha has been rescheduled to Friday 10:00 WAT due to a conflict. All other sessions remain unchanged.",
    priority: "Academic" as const, target: "Cohort Alpha", date: "2 hours ago", status: "Published", pinned: true,
  },
  {
    id: 2, title: "GitHub Assignment Deadline Extended",
    body: "The Week 3 React To-Do App assignment deadline has been extended by 48 hours. New deadline: Sunday 23:59 WAT. Ensure all commits include proper commit messages.",
    priority: "Urgent" as const, target: "Cohort Alpha", date: "Yesterday", status: "Published", pinned: false,
  },
  {
    id: 3, title: "Introduction to TypeScript — Additional Resources",
    body: "I have uploaded supplementary TypeScript reading materials to the Resource Vault. Review the TypeScript Handbook sections on Generics before our next session.",
    priority: "Information" as const, target: "Entire Institution", date: "3 days ago", status: "Published", pinned: false,
  },
  {
    id: 4, title: "Capstone Project Guidelines — Week 8",
    body: "The capstone project specifications for Week 8 are now available. Please review the rubric in the Resource Vault and begin planning your project architecture.",
    priority: "Academic" as const, target: "Specific Programme", date: "1 week ago", status: "Draft", pinned: false,
  },
];

export default function AnnouncementsPage() {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: "", body: "", priority: "Information", target: "Entire Institution", scheduled: "" });
  const [saved, setSaved] = useState<string | null>(null);
  const [announcements, setAnnouncements] = useState(existingAnnouncements);

  const handlePublish = (mode: "publish" | "draft" | "schedule") => {
    setSaved(mode);
    setTimeout(() => { setSaved(null); setShowForm(false); setForm({ title: "", body: "", priority: "Information", target: "Entire Institution", scheduled: "" }); }, 2000);
  };

  const togglePin = (id: number) => {
    setAnnouncements((prev) => prev.map((a) => a.id === id ? { ...a, pinned: !a.pinned } : a));
  };

  const archiveAnnouncement = (id: number) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const sorted = [...announcements].sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-white">Institutional Announcements</h2>
          <p className="text-sm text-[#8899b4] mt-1">Communicate with learners, cohorts, and the institution</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="self-start flex items-center gap-2 px-4 py-2 rounded-xl bg-[#d4a017]/15 border border-[#d4a017]/40 text-[#d4a017] text-xs font-black hover:bg-[#d4a017]/25 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
        >
          <PlusCircle className="w-3.5 h-3.5" /> New Announcement
        </button>
      </div>

      {/* Priority Legend */}
      <div className="flex flex-wrap gap-3">
        {Object.entries(priorityConfig).map(([key, cfg]) => {
          const Icon = cfg.icon;
          return (
            <span key={key} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-black ${cfg.bg} ${cfg.border}`} style={{ color: cfg.color }}>
              <Icon className="w-3 h-3" aria-hidden="true" />
              {key}
            </span>
          );
        })}
      </div>

      {/* Create Form */}
      {showForm && (
        <div className="rounded-3xl bg-[#061428] border border-[#d4a017]/30 p-6 space-y-5">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-[#d4a017]" aria-hidden="true" />
            Create Announcement
          </h3>

          <div>
            <label className="block text-[9px] font-black text-[#8899b4] mb-1.5" htmlFor="ann-title">Title</label>
            <input
              id="ann-title"
              type="text"
              value={form.title}
              onChange={(e) => setForm((p) => ({ ...p, title: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white placeholder-[#8899b4] focus:outline-none focus:border-[#d4a017]/60 transition-all"
              placeholder="Announcement title…"
            />
          </div>

          <div>
            <label className="block text-[9px] font-black text-[#8899b4] mb-1.5" htmlFor="ann-body">Message</label>
            <textarea
              id="ann-body"
              rows={4}
              value={form.body}
              onChange={(e) => setForm((p) => ({ ...p, body: e.target.value }))}
              className="w-full px-3 py-2.5 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white placeholder-[#8899b4] focus:outline-none focus:border-[#d4a017]/60 transition-all resize-none"
              placeholder="Write your announcement here…"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[9px] font-black text-[#8899b4] mb-1.5" htmlFor="ann-priority">Priority Level</label>
              <select
                id="ann-priority"
                value={form.priority}
                onChange={(e) => setForm((p) => ({ ...p, priority: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white focus:outline-none focus:border-[#d4a017]/60 transition-all"
              >
                {Object.keys(priorityConfig).map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[9px] font-black text-[#8899b4] mb-1.5" htmlFor="ann-target">Target Audience</label>
              <select
                id="ann-target"
                value={form.target}
                onChange={(e) => setForm((p) => ({ ...p, target: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white focus:outline-none focus:border-[#d4a017]/60 transition-all"
              >
                {targetOptions.map((t) => <option key={t.label} value={t.label}>{t.label}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-[9px] font-black text-[#8899b4] mb-1.5" htmlFor="ann-schedule">Schedule (optional)</label>
              <input
                id="ann-schedule"
                type="datetime-local"
                value={form.scheduled}
                onChange={(e) => setForm((p) => ({ ...p, scheduled: e.target.value }))}
                className="w-full px-3 py-2.5 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white focus:outline-none focus:border-[#d4a017]/60 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button onClick={() => handlePublish("publish")} className="px-4 py-2 rounded-xl bg-[#4ade80]/15 border border-[#4ade80]/30 text-[#4ade80] text-[10px] font-black hover:bg-[#4ade80]/25 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4ade80]">
              Publish Now
            </button>
            <button onClick={() => handlePublish("draft")} className="px-4 py-2 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-[#8899b4] text-[10px] font-black hover:border-[#d4a017]/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]">
              Save Draft
            </button>
            <button onClick={() => handlePublish("schedule")} className="px-4 py-2 rounded-xl bg-[#818cf8]/15 border border-[#818cf8]/30 text-[#818cf8] text-[10px] font-black hover:bg-[#818cf8]/25 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#818cf8]">
              <Calendar className="w-3 h-3 inline mr-1" />Schedule
            </button>
            {saved && (
              <span className="flex items-center gap-1 text-[#4ade80] text-[10px] font-bold" role="status">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {saved === "publish" ? "Published!" : saved === "draft" ? "Saved as draft" : "Scheduled!"}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Announcements List */}
      <div className="space-y-4">
        {sorted.map((ann) => {
          const cfg = priorityConfig[ann.priority];
          const PriorityIcon = cfg.icon;
          return (
            <div key={ann.id} className={`rounded-3xl bg-[#061428] border transition-all ${ann.pinned ? "border-[#d4a017]/40" : "border-[#1a2f4a]"}`}>
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${cfg.bg} ${cfg.border}`}>
                    <PriorityIcon className="w-4.5 h-4.5" style={{ color: cfg.color }} aria-hidden="true" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      {ann.pinned && (
                        <Pin className="w-3 h-3 text-[#d4a017]" aria-label="Pinned announcement" />
                      )}
                      <h3 className="text-sm font-extrabold text-white">{ann.title}</h3>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black border ${cfg.bg} ${cfg.border}`} style={{ color: cfg.color }}>
                        {ann.priority}
                      </span>
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black border ${ann.status === "Published" ? "bg-[#4ade80]/10 border-[#4ade80]/30 text-[#4ade80]" : "bg-amber-950/30 border-amber-800/30 text-amber-400"}`}>
                        {ann.status}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#8899b4] leading-relaxed mb-2">{ann.body}</p>
                    <div className="flex items-center gap-3 text-[10px] text-[#8899b4]">
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {ann.target}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {ann.date}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5 shrink-0">
                    <button
                      onClick={() => togglePin(ann.id)}
                      className={`p-1.5 rounded-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] ${ann.pinned ? "text-[#d4a017] bg-[#d4a017]/10 border border-[#d4a017]/30" : "text-[#8899b4] hover:text-[#d4a017] bg-[#030e1f] border border-[#1a2f4a]"}`}
                      aria-label={ann.pinned ? "Unpin announcement" : "Pin announcement"}
                    >
                      <Pin className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => archiveAnnouncement(ann.id)}
                      className="p-1.5 rounded-lg bg-[#030e1f] border border-[#1a2f4a] text-[#8899b4] hover:text-red-400 hover:border-red-800/40 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                      aria-label="Archive announcement"
                    >
                      <Archive className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
