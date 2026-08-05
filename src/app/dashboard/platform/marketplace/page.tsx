"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Store, BookOpen, Layers, FileCode, Sparkles, Shield, Cpu, Zap,
  CheckCircle2, ArrowUpRight, Search, Filter, Download
} from "lucide-react";

export interface BlueprintCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  itemCount: number;
}

export interface MarketplaceBlueprint {
  id: string;
  categoryId: string;
  title: string;
  publisher: string;
  description: string;
  version: string;
  downloads: number;
  rating: number;
  tags: string[];
}

const CATEGORIES: BlueprintCategory[] = [
  { id: "academic", name: "Academic Templates", icon: "📚", description: "Curriculum structures, course outlines, & module schemas", itemCount: 12 },
  { id: "blueprints", name: "Programme Blueprints", icon: "🗺", description: "Turnkey degree & diploma programme track definitions", itemCount: 8 },
  { id: "policy", name: "Policy Packs", icon: "⚖️", description: "Academic integrity, PRIDE honor codes, & accreditation governance", itemCount: 6 },
  { id: "certificates", name: "Certificate Templates", icon: "📜", description: "SVG certificate frames, cryptographic hash layouts, & QR seals", itemCount: 15 },
  { id: "ai_prompts", name: "AI Prompt Packs", icon: "🤖", description: "System prompts for code review, tutoring, & automated grading", itemCount: 24 },
  { id: "automation", name: "Automation Recipes", icon: "⚡", description: "Workflow triggers, Webhook actions, & automated email rules", itemCount: 18 },
  { id: "rubrics", name: "Assessment Rubrics", icon: "📊", description: "GitHub PR grading criteria, project rubrics, & oral defence standards", itemCount: 10 },
  { id: "projects", name: "Industry Projects", icon: "💼", description: "Real-world capstone specs from DWSA & industry partners", itemCount: 16 },
  { id: "research", name: "Research Templates", icon: "🔬", description: "Grant proposals, ethics clearance forms, & journal formats", itemCount: 9 },
  { id: "plugins", name: "Plugin Integrations", icon: "🔌", description: "Connectors for Paystack, Termii, GitHub, & Canvas LMS", itemCount: 7 },
];

const BLUEPRINTS: MarketplaceBlueprint[] = [
  {
    id: "bp-001",
    categoryId: "blueprints",
    title: "Software Engineering Professional Diploma Blueprint",
    publisher: "Digital Technology Academy",
    description: "24-week full-stack engineering curriculum schema including 4 modules, 18 lessons, and 3 capstone projects.",
    version: "v3.2",
    downloads: 142,
    rating: 4.9,
    tags: ["Full-Stack", "React", "Node", "PostgreSQL"],
  },
  {
    id: "bp-002",
    categoryId: "ai_prompts",
    title: "Autonomous GitHub PR Senior Engineer Assessment Suite",
    publisher: "DWSA AI Lab",
    description: "Battle-tested Gemini prompt package for evaluating code quality, architecture, unit tests, and performance.",
    version: "v4.0",
    downloads: 310,
    rating: 5.0,
    tags: ["AI Grading", "GitHub", "Gemini 2.0"],
  },
  {
    id: "bp-003",
    categoryId: "policy",
    title: "PRIDE Integrity & Academic Honor Governance Pack",
    publisher: "DTA Governance Board",
    description: "Comprehensive student code of conduct policy, pledge modal schema, and violation response workflows.",
    version: "v2.1",
    downloads: 88,
    rating: 4.8,
    tags: ["Governance", "PRIDE Code", "Ethics"],
  },
  {
    id: "bp-004",
    categoryId: "certificates",
    title: "Cryptographic SHA-256 Gold Foil Certificate Frame",
    publisher: "InstitutionOS Design",
    description: "High-security digital certificate layout with QR verification seal and blockchain hash watermark.",
    version: "v1.4",
    downloads: 205,
    rating: 4.9,
    tags: ["Certificates", "QR", "Blockchain"],
  },
];

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBlueprints = BLUEPRINTS.filter((bp) => {
    const matchesCat = selectedCategory === "all" || bp.categoryId === selectedCategory;
    const matchesSearch =
      bp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bp.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-[#061428] border border-[#d4a017]/20 p-6 sm:p-8 rounded-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#d4a017]/15 text-[#d4a017] text-[10px] font-black uppercase tracking-wider">
          <Store className="w-3 h-3" />
          <span>Phase 9 — Institution Marketplace Architecture</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          InstitutionOS Marketplace Foundation
        </h1>
        <p className="text-xs text-[#8899b4]">
          Architecture preview for sharing academic templates, programme blueprints, AI prompt packs, policy packs, and plugin connectors across institutions.
        </p>
      </div>

      {/* Category Grid */}
      <div className="space-y-3">
        <h3 className="text-xs font-extrabold text-[#6b7a94] uppercase tracking-wider">10 Marketplace Categories</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
              selectedCategory === "all"
                ? "bg-[#d4a017]/20 border-[#d4a017] text-white"
                : "bg-[#061428] border-[#1a2f4a] text-[#8899b4] hover:text-white"
            }`}
          >
            <span className="block text-sm mb-1">🌐</span>
            <span>All Categories</span>
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`p-3 rounded-xl border text-left text-xs font-bold transition-all ${
                selectedCategory === cat.id
                  ? "bg-[#d4a017]/20 border-[#d4a017] text-white"
                  : "bg-[#061428] border-[#1a2f4a] text-[#8899b4] hover:text-white"
              }`}
            >
              <span className="block text-sm mb-1">{cat.icon}</span>
              <span className="truncate block">{cat.name}</span>
              <span className="text-[9px] text-[#6b7a94] block font-normal">{cat.itemCount} blueprints</span>
            </button>
          ))}
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#8899b4] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search blueprints by title, tag, or spec..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#061428] border border-[#d4a017]/20 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-[#6b7a94] focus:outline-none focus:border-[#d4a017]"
          />
        </div>
        <span className="text-xs text-[#8899b4] font-bold">
          Showing {filteredBlueprints.length} Architecture Blueprints
        </span>
      </div>

      {/* Blueprint Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBlueprints.map((bp) => (
          <div key={bp.id} className="p-5 rounded-2xl bg-[#061428] border border-[#d4a017]/20 space-y-3 hover:border-[#d4a017] transition-all">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-[#d4a017]/15 text-[#d4a017] text-[10px] font-black uppercase border border-[#d4a017]/30">
                {bp.publisher}
              </span>
              <span className="text-xs text-[#4ade80] font-black">★ {bp.rating} ({bp.downloads} downloads)</span>
            </div>

            <div>
              <h4 className="text-sm font-extrabold text-white">{bp.title}</h4>
              <p className="text-xs text-[#8899b4] mt-1 leading-relaxed">{bp.description}</p>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-1">
              {bp.tags.map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded bg-[#030e1f] text-[#aab4c4] text-[9px] font-bold border border-[#1a2f4a]">
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#1a2f4a] text-xs">
              <span className="text-[10px] text-[#6b7a94] font-mono">{bp.version}</span>
              <button
                disabled
                className="px-3 py-1.5 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-[#8899b4] text-[11px] font-bold cursor-not-allowed flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                Import Blueprint (Architecture Only)
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
