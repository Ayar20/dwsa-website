"use client";

import React from "react";
import {
  Link2, CheckCircle2, Globe, Mail, BookOpen, Layers, ShieldCheck,
  ExternalLink, RefreshCw
} from "lucide-react";

const connectedApps = [
  { name: "GitHub Account", category: "Version Control & PRs", status: "CONNECTED", details: "@student-dev-dta", lastSync: "10 mins ago" },
  { name: "LinkedIn Profile", category: "Career & Credentials", status: "CONNECTED", details: "Verified Credential Sync Active", lastSync: "2 days ago" },
  { name: "Google Workspace for Education", category: "Cloud Drive & Email", status: "CONNECTED", details: "student@dta.edu.ng", lastSync: "Just now" },
  { name: "Microsoft OneDrive & M365", category: "Document Storage", status: "AVAILABLE", details: "Not Linked", lastSync: "N/A" },
  { name: "My Digital Portfolio", category: "Employability Showcase", status: "CONNECTED", details: "portfolio.dta.edu.ng/student", lastSync: "1 day ago" },
];

export default function StudentConnectedAppsPage() {
  return (
    <div className="min-h-screen space-y-6 pb-8">
      {/* Header */}
      <div className="rounded-2xl bg-[#040f20] border border-[#d4a017]/20 p-6 space-y-2">
        <h1 className="text-xl font-black text-white flex items-center gap-2">
          <Link2 className="w-5 h-5 text-[#4ade80]" /> Student Connected Apps & Services
        </h1>
        <p className="text-xs text-[#8899b4]">Manage your connected GitHub, LinkedIn, Google Drive, and Portfolio accounts for seamless learning and career sync.</p>
      </div>

      {/* Connected Apps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {connectedApps.map((app) => (
          <div key={app.name} className="p-4 rounded-2xl bg-[#040f20] border border-[#1a2f4a] flex items-center justify-between gap-4">
            <div>
              <span className="text-[9px] font-black text-[#8899b4] uppercase">{app.category}</span>
              <h3 className="text-xs font-black text-white">{app.name}</h3>
              <p className="text-[10px] text-[#6b7a94]">{app.details} · Last Sync: {app.lastSync}</p>
            </div>
            <button className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              app.status === "CONNECTED"
                ? "bg-[#4ade80]/10 text-[#4ade80] border border-[#4ade80]/30"
                : "bg-[#d4a017] text-[#030e1f] font-black hover:bg-[#b8860b]"
            }`}>
              {app.status === "CONNECTED" ? "Connected" : "Connect Account"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
