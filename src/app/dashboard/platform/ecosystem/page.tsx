"use client";

import React, { useState } from "react";
import { ExtensionRegistryService, ExtensionItem } from "@/lib/institutionOS/ExtensionRegistryService";
import { MarketplaceAnalyticsService } from "@/lib/institutionOS/MarketplaceAnalyticsService";
import {
  Store, Search, Star, Download, ShieldCheck, CheckCircle2, Zap, Settings,
  BookOpen, Building2, HeartPulse, Library, DollarSign, Activity, Layers
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  BookOpen, Building2, HeartPulse, Library, DollarSign, Activity, Layers, Store
};

export default function EcosystemMarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedExtension, setSelectedExtension] = useState<ExtensionItem | null>(null);

  const extensions = ExtensionRegistryService.getAllExtensions();
  const globalStats = MarketplaceAnalyticsService.getGlobalStats();

  const filteredExtensions = extensions.filter((ext) => {
    const matchesCat = selectedCategory === "all" || ext.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = ext.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ext.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ext.publisher.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen space-y-6 pb-8">

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#030e1f] via-[#061428] to-[#0a1f40] border border-[#d4a017]/25 p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-[#d4a017]/5 via-transparent to-[#4ade80]/5" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4a017] via-[#b8860b] to-[#996515] flex items-center justify-center shadow-lg shadow-[#d4a017]/20 text-[#030e1f]">
              <Store className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-xl font-black text-white tracking-tight">InstitutionOS Extension Marketplace</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#4ade80]/20 text-[#4ade80] text-[10px] font-black tracking-widest border border-[#4ade80]/30">v4.4 ECOSYSTEM</span>
              </div>
              <p className="text-sm text-[#8899b4]">Discover, install, and manage institutional extensions, plugins & domain modules</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-center">
            <div>
              <div className="text-xl font-black text-white">{globalStats.totalExtensionsCount}</div>
              <div className="text-[10px] text-[#8899b4] font-bold">Extensions</div>
            </div>
            <div className="w-px h-8 bg-[#1a2f4a]" />
            <div>
              <div className="text-xl font-black text-[#4ade80]">{globalStats.overallCSAT} / 5.0</div>
              <div className="text-[10px] text-[#8899b4] font-bold">Average CSAT</div>
            </div>
          </div>
        </div>
      </div>

      {/* Search & Category Filters */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#6b7a94] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search extensions by title, publisher, or domain..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#040f20] border border-[#1a2f4a] text-xs text-white placeholder-[#6b7a94] focus:outline-none focus:border-[#d4a017]"
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {["all", "academic", "hostel", "healthcare", "library", "finance"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold capitalize whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[#d4a017] text-[#030e1f] shadow-md shadow-[#d4a017]/20"
                  : "bg-[#040f20] text-[#8899b4] border border-[#1a2f4a] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Extension Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredExtensions.map((ext) => {
          const IconComp = iconMap[ext.icon] || Store;
          return (
            <div key={ext.id} className="p-5 rounded-2xl bg-[#040f20] border border-[#1a2f4a] hover:border-[#d4a017]/40 transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#061428] border border-[#1a2f4a] flex items-center justify-center text-[#d4a017] group-hover:scale-105 transition-all">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="px-2 py-0.5 rounded bg-[#d4a017]/10 text-[#d4a017] text-[9px] font-black uppercase border border-[#d4a017]/30">
                      {ext.category}
                    </span>
                    <span className="text-[10px] text-[#6b7a94]">{ext.version}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-black text-white group-hover:text-[#d4a017] transition-colors">{ext.name}</h3>
                  <p className="text-[10px] text-[#6b7a94] font-extrabold">{ext.publisher}</p>
                </div>

                <p className="text-xs text-[#8899b4] leading-relaxed">{ext.description}</p>
              </div>

              <div className="pt-3 border-t border-[#1a2f4a] space-y-3">
                <div className="flex items-center justify-between text-[10px] text-[#6b7a94]">
                  <span className="flex items-center gap-1 font-bold text-white">
                    <Star className="w-3 h-3 text-[#d4a017] fill-[#d4a017]" /> {ext.averageRating} ({ext.downloads.toLocaleString()} installs)
                  </span>
                  <span className="font-black text-[#4ade80] uppercase">
                    {ext.priceMonthlyUSD === 0 ? "FREE" : `$${ext.priceMonthlyUSD}/mo`}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${
                    ext.installStatus === "installed" ? "bg-[#4ade80]/20 text-[#4ade80]" : "bg-[#d4a017]/20 text-[#d4a017]"
                  }`}>
                    {ext.installStatus}
                  </span>
                  <button
                    onClick={() => setSelectedExtension(ext)}
                    className="px-3 py-1.5 rounded-xl bg-[#061428] border border-[#d4a017]/40 hover:bg-[#d4a017] hover:text-[#030e1f] text-[#d4a017] text-xs font-bold transition-all"
                  >
                    Manage Extension
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Drawer Modal */}
      {selectedExtension && (
        <div className="fixed inset-0 bg-[#020914]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-lg w-full rounded-2xl bg-[#040f20] border border-[#d4a017]/40 p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-sm font-black text-white">{selectedExtension.name}</h3>
                <p className="text-[10px] text-[#6b7a94]">Publisher: {selectedExtension.publisher} · {selectedExtension.version}</p>
              </div>
              <button onClick={() => setSelectedExtension(null)} className="text-[#6b7a94] hover:text-white font-bold">✕</button>
            </div>

            <div className="p-3 rounded-xl bg-[#061428] border border-[#1a2f4a] space-y-1">
              <p className="text-[10px] font-black text-[#d4a017] uppercase">Required Permissions:</p>
              <div className="flex flex-wrap gap-1">
                {selectedExtension.permissionsRequired.map((p) => (
                  <span key={p} className="px-2 py-0.5 rounded bg-[#0a1f40] text-[10px] text-[#38bdf8] font-bold">{p}</span>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button onClick={() => setSelectedExtension(null)} className="px-4 py-2 rounded-xl bg-[#061428] text-xs font-bold text-[#8899b4]">
                Close
              </button>
              <button onClick={() => setSelectedExtension(null)} className="px-4 py-2 rounded-xl bg-[#d4a017] text-[#030e1f] text-xs font-black">
                Save & Configure
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
