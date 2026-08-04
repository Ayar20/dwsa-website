"use client";

import React, { useState } from "react";
import {
  Library,
  BookOpen,
  FileText,
  Code,
  Download,
  ExternalLink,
  Search,
  Sparkles,
  Cpu,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function DigitalResourceLibraryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "All",
    "Artificial Intelligence",
    "Software Engineering",
    "Blockchain & Trust",
    "Templates & Starters",
    "Research Papers",
  ];

  const resources = [
    {
      title: "DWSA AI Developer Workflow Guide (2026 Edition)",
      category: "Artificial Intelligence",
      type: "PDF Guide",
      size: "2.4 MB",
      desc: "Comprehensive manual on LLM prompt engineering, agentic debugging, Cursor/Copilot integration, and code synthesis standards.",
      downloadUrl: "#",
    },
    {
      title: "Full-Stack React 19 & Next.js Starter Architecture",
      category: "Software Engineering",
      type: "GitHub Starter Repo",
      size: "Source Code",
      desc: "Official DWSA production boilerplate pre-configured with NextAuth.js, Neon Postgres Prisma client, Tailwind CSS, and TypeScript.",
      downloadUrl: "https://github.com/Ayar20",
    },
    {
      title: "P.R.I.D.E. Code Quality & PR Review Checklist",
      category: "Software Engineering",
      type: "Cheat Sheet",
      size: "1.1 MB",
      desc: "Step-by-step checklist used by DTA instructors to evaluate student Pull Requests, code security, and architectural hygiene.",
      downloadUrl: "#",
    },
    {
      title: "Zero-Knowledge & Decentralized Identity White Paper",
      category: "Blockchain & Trust",
      type: "Research Paper",
      size: "4.8 MB",
      desc: "DWSA Research report on cryptographic privacy protocols, DID standards, and land title verification systems for African markets.",
      downloadUrl: "#",
    },
    {
      title: "Neon Postgres Database Migration & Prisma Cheat Sheet",
      category: "Software Engineering",
      type: "Reference Manual",
      size: "1.8 MB",
      desc: "Reference manual for SQL schema modeling, indexing strategy, pooled database connection URIs, and Prisma CLI workflows.",
      downloadUrl: "#",
    },
    {
      title: "Paystack Payment Gateway Webhook Integration Blueprint",
      category: "Templates & Starters",
      type: "Code Blueprint",
      size: "Source Code",
      desc: "Production code pattern for handling Paystack event webhooks, HMAC signature validation, and database status updates.",
      downloadUrl: "#",
    },
  ];

  const filteredResources = resources.filter((r) => {
    const matchesCat = selectedCategory === "All" || r.category === selectedCategory;
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.desc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fadeInUp">

      {/* Header */}
      <div className="bg-gradient-to-br from-[#061428] via-[#091832] to-[#061428] border-2 border-[#d4a017] rounded-3xl p-6 sm:p-10 space-y-4 shadow-xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#d4a017]/15 border border-[#d4a017]/40 text-[#d4a017] text-xs font-extrabold">
          <Library className="w-4 h-4" aria-hidden="true" />
          INSTITUTIONAL KNOWLEDGE REPOSITORY
        </div>

        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Digital Resource <span className="text-[#d4a017]">Library</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#8899b4] mt-2 max-w-3xl leading-relaxed">
            Curated white papers, developer blueprints, code starter repos, cheat sheets, and technical documentation provided by DTA engineering faculty.
          </p>
        </div>

        {/* Search Input */}
        <div className="pt-2 max-w-xl">
          <div className="relative">
            <Search className="w-4 h-4 text-[#8899b4] absolute left-3.5 top-1/2 -translate-y-1/2" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search library by topic, tool, or keyword…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#030e1f] border border-[#d4a017]/30 rounded-xl pl-10 pr-4 py-3 text-xs text-white placeholder-[#4a6080] outline-none focus:border-[#d4a017] focus:ring-1 focus:ring-[#d4a017]"
            />
          </div>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#d4a017]/20 pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedCategory === cat
                ? "bg-[#d4a017] text-[#030e1f] shadow-md shadow-[#d4a017]/20"
                : "bg-[#061428] border border-slate-800 text-[#8899b4] hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Resource Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((res) => (
          <div
            key={res.title}
            className="p-6 bg-[#061428] border border-slate-800 rounded-3xl space-y-4 hover:border-[#d4a017]/40 transition-all flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-extrabold text-[#d4a017] bg-[#d4a017]/10 px-2.5 py-0.5 rounded-full border border-[#d4a017]/30 uppercase">
                  {res.type}
                </span>
                <span className="text-[10px] text-[#8899b4] font-semibold">{res.size}</span>
              </div>
              <h3 className="text-base font-bold text-white leading-snug">{res.title}</h3>
              <p className="text-xs text-[#8899b4] leading-relaxed">{res.desc}</p>
            </div>

            <div className="pt-3 border-t border-slate-800">
              <a
                href={res.downloadUrl}
                target={res.downloadUrl.startsWith("http") ? "_blank" : "_self"}
                rel="noreferrer"
                className="w-full py-2.5 rounded-xl bg-[#0f223d] hover:bg-[#16335a] border border-[#d4a017]/40 text-[#d4a017] font-bold text-xs flex items-center justify-center gap-2 transition-all"
              >
                {res.downloadUrl.startsWith("http") ? (
                  <>
                    <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" /> Open External Resource
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" aria-hidden="true" /> Download Asset
                  </>
                )}
              </a>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
