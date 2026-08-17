"use client";

import React, { useState } from "react";
import {
  Activity, Search, Filter, GraduationCap, Award, DollarSign,
  ShieldCheck, Sparkles, Building2, Store, CheckCircle2, Clock
} from "lucide-react";

interface ActivityEvent {
  id: string;
  timestamp: string;
  category: "Learning" | "Approvals" | "Deployments" | "Marketplace" | "Certificates" | "Payments" | "AI";
  actor: string;
  action: string;
  details: string;
}

const authenticEvents: ActivityEvent[] = [
  {
    id: "act-1",
    timestamp: "Live",
    category: "Learning",
    actor: "Flagship Programme",
    action: "Cohort GENAI-WP-001 Registration",
    details: "Learners actively enrolling for Generative AI for Work & Productivity.",
  },
  {
    id: "act-2",
    timestamp: "Real-time",
    category: "Payments",
    actor: "Paystack & Corporate Banking",
    action: "Tuition Invoicing & Verification",
    details: "Automated payment reconciliation for Zenith, Fidelity, and UBA corporate bank accounts.",
  },
  {
    id: "act-3",
    timestamp: "Online",
    category: "AI",
    actor: "Google Gemini 2.0 Engine",
    action: "Aida AI Learning Agent Online",
    details: "Real-time interactive tutoring, curriculum explanations, and assignment reviews.",
  },
  {
    id: "act-4",
    timestamp: "Protected",
    category: "Certificates",
    actor: "DWSA Digital Registry",
    action: "Verifiable Credential Engine Active",
    details: "Cryptographic QR code verification active for DWSA Digital Technology Academy alumni.",
  },
];

export default function UniversalActivityTimeline() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = ["ALL", "Learning", "Approvals", "Deployments", "Marketplace", "Certificates", "Payments", "AI"];

  const filteredEvents = authenticEvents.filter((evt) => {
    const matchesCategory = selectedCategory === "ALL" || evt.category === selectedCategory;
    const matchesSearch =
      evt.action.toLowerCase().includes(query.toLowerCase()) ||
      evt.details.toLowerCase().includes(query.toLowerCase()) ||
      evt.actor.toLowerCase().includes(query.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-4 shadow-sm" aria-label="Universal Activity Timeline">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#F0FDF4] border border-[#15803D]/20 flex items-center justify-center">
            <Activity className="w-4 h-4 text-[#15803D]" aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-[#0F172A]">Universal Activity Timeline</h2>
            <p className="text-[10px] text-slate-500">Real-time InstitutionOS Operating Activity</p>
          </div>
        </div>

        {/* Filter Input */}
        <div className="relative min-w-[220px]">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search timeline..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#15803D]"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-[10px] font-bold">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-2.5 py-1 rounded-full border transition-all shrink-0 ${
              selectedCategory === cat
                ? "bg-[#15803D] text-white border-[#15803D]"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Timeline Stream */}
      <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
        {filteredEvents.length === 0 ? (
          <p className="text-xs text-slate-400 py-4">No events found matching your search criteria.</p>
        ) : (
          filteredEvents.map((item) => (
            <div key={item.id} className="relative space-y-1">
              <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-[#15803D] ring-4 ring-white" />
              <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold">
                <span className="uppercase tracking-wider text-[#15803D]">{item.category} · {item.actor}</span>
                <span>{item.timestamp}</span>
              </div>
              <p className="text-xs font-extrabold text-[#0F172A]">{item.action}</p>
              <p className="text-[11px] text-slate-500">{item.details}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
