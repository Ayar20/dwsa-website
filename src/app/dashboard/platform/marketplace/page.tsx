"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Store, BookOpen, Layers, FileCode, Sparkles, Shield, Cpu, Zap,
  CheckCircle2, ArrowUpRight, Search, Filter, Download, Check, Power
} from "lucide-react";
import { MarketplaceService, type CommercialModule } from "@/lib/institutionOS/MarketplaceService";

export default function EnterpriseMarketplacePage() {
  const [modules, setModules] = useState<CommercialModule[]>(MarketplaceService.getAllModules());
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [activatedModules, setActivatedModules] = useState<Record<string, boolean>>({
    mod_student_campus: true,
    mod_faculty_workspace: true,
    mod_icc_dashboard: true,
    mod_ai_assistant: true,
    mod_predictive_analytics: true,
    mod_recommendation_engine: true,
    mod_credential_verification: true,
  });

  const categories = [
    { key: "all", label: "All Modules", icon: "🌐" },
    { key: "core", label: "Core Platform", icon: "🎓" },
    { key: "intelligence", label: "Intelligence", icon: "🤖" },
    { key: "enterprise", label: "Enterprise", icon: "🏢" },
  ];

  const filteredModules = modules.filter((mod) => {
    const matchesCat = selectedCategory === "all" || mod.category === selectedCategory;
    const matchesSearch =
      mod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mod.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleActivation = (modId: string) => {
    setActivatedModules((prev) => ({
      ...prev,
      [modId]: !prev[modId],
    }));
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-[#061428] border border-[#d4a017]/20 p-6 sm:p-8 rounded-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#d4a017]/15 text-[#d4a017] text-[10px] font-black uppercase tracking-wider">
          <Store className="w-3 h-3" />
          <span>v4.1 — Enterprise Commercial Module Marketplace</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Enterprise Module Marketplace & Activation
        </h1>
        <p className="text-xs text-[#8899b4]">
          Discover, configure, and activate core platform suites, AI intelligence engines, and enterprise credential modules for customer tenant nodes.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 bg-[#061428] p-1.5 rounded-2xl border border-[#1a2f4a]">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setSelectedCategory(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                selectedCategory === cat.key
                  ? "bg-[#d4a017] text-[#030e1f] shadow-md"
                  : "text-[#8899b4] hover:text-white"
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        <div className="relative w-72">
          <Search className="w-4 h-4 text-[#8899b4] absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search marketplace modules..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#061428] border border-[#d4a017]/20 rounded-xl pl-10 pr-4 py-2 text-xs text-white placeholder-[#6b7a94] focus:outline-none focus:border-[#d4a017]"
          />
        </div>
      </div>

      {/* Module Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredModules.map((mod) => {
          const isActivated = !!activatedModules[mod.id];

          return (
            <div
              key={mod.id}
              className={`p-6 rounded-3xl bg-[#061428] border transition-all flex flex-col justify-between space-y-5 ${
                isActivated ? "border-[#4ade80]/40 shadow-lg shadow-[#4ade80]/5" : "border-[#1a2f4a]"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-[#030e1f] border border-[#d4a017]/30 flex items-center justify-center text-lg">
                    {mod.icon}
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase ${
                      isActivated
                        ? "bg-[#4ade80]/15 text-[#4ade80] border border-[#4ade80]/30"
                        : "bg-[#6b7a94]/15 text-[#6b7a94] border border-[#6b7a94]/30"
                    }`}
                  >
                    {isActivated ? "● Active" : "○ Inactive"}
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-white">{mod.name}</h3>
                  <p className="text-[11px] text-[#d4a017] font-bold mt-0.5">{mod.tagline}</p>
                </div>

                <p className="text-xs text-[#8899b4] leading-relaxed">{mod.description}</p>

                <div className="pt-2">
                  <span className="text-[10px] font-bold text-[#6b7a94] block uppercase mb-1">Included in Subscription Tiers:</span>
                  <div className="flex flex-wrap gap-1">
                    {mod.includedInTier.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-[#030e1f] text-[#4ade80] text-[9px] font-extrabold border border-[#1a2f4a] capitalize"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#1a2f4a] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#6b7a94] block">Standalone Value</span>
                  <span className="text-xs font-black text-white">${mod.standaloneMonthlyUSD}/mo</span>
                </div>

                <button
                  type="button"
                  onClick={() => toggleActivation(mod.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                    isActivated
                      ? "bg-[#f87171]/15 text-[#f87171] border border-[#f87171]/30 hover:bg-[#f87171]/30"
                      : "bg-[#4ade80] text-[#030e1f] hover:bg-[#86efac]"
                  }`}
                >
                  <Power className="w-3.5 h-3.5" />
                  {isActivated ? "Deactivate" : "Activate Module"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
