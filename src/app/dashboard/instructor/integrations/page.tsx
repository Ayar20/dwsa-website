"use client";

import React from "react";
import {
  Link2, CheckCircle2, Video, BookOpen, Layers, Users, Globe, RefreshCw
} from "lucide-react";

const facultyConnectors = [
  { name: "Google Classroom", category: "LMS & Roster Sync", status: "CONNECTED", detail: "Synchronising 4 Active Cohorts", lastSync: "4 mins ago" },
  { name: "Microsoft Teams Education", category: "Virtual Classroom & Messaging", status: "CONNECTED", detail: "Channels Auto-Synced", lastSync: "8 mins ago" },
  { name: "GitHub Classroom", category: "Automated PR Grading Engine", status: "CONNECTED", detail: "12 Submissions Evaluated Today", lastSync: "Just now" },
  { name: "Google Drive Resource Vault", category: "Teaching Content & Slides", status: "CONNECTED", detail: "Vault Size: 4.2 GB", lastSync: "1 hour ago" },
  { name: "Zoom Communications", category: "Live Class Conferencing", status: "CONNECTED", detail: "Auto-recording Enabled", lastSync: "Real-time" },
];

export default function FacultyIntegrationsPage() {
  return (
    <div className="min-h-screen space-y-6 pb-8">
      {/* Header */}
      <div className="rounded-2xl bg-[#040f20] border border-[#d4a017]/20 p-6 space-y-2">
        <h1 className="text-xl font-black text-white flex items-center gap-2">
          <Link2 className="w-5 h-5 text-[#d4a017]" /> Faculty Connected Academic Workspace
        </h1>
        <p className="text-xs text-[#8899b4]">Connect your Google Classroom, Microsoft Teams, GitHub Classroom, and Zoom accounts to streamline cohort management.</p>
      </div>

      {/* Connectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {facultyConnectors.map((c) => (
          <div key={c.name} className="p-4 rounded-2xl bg-[#040f20] border border-[#1a2f4a] flex items-center justify-between gap-4">
            <div>
              <span className="text-[9px] font-black text-[#d4a017] uppercase">{c.category}</span>
              <h3 className="text-xs font-black text-white">{c.name}</h3>
              <p className="text-[10px] text-[#6b7a94]">{c.detail} · Last Sync: {c.lastSync}</p>
            </div>
            <span className="px-2.5 py-1 rounded-lg bg-[#4ade80]/20 text-[#4ade80] text-[10px] font-black border border-[#4ade80]/30">
              ACTIVE
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
