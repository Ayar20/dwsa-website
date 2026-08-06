"use client";

import React, { useState } from "react";
import { IntegrationRegistryService } from "@/lib/institutionOS/IntegrationRegistryService";
import { IntegrationMarketplaceService, MarketplaceConnectorPackage } from "@/lib/institutionOS/IntegrationMarketplaceService";
import {
  Globe, ShieldCheck, Mail, BookOpen, Layers, Video, Users, CreditCard,
  DollarSign, Database, Activity, Search, CheckCircle2, AlertCircle, ArrowUpRight,
  Settings, Zap, Sparkles, Filter, Download
} from "lucide-react";

const categoryBadges: Record<string, { label: string; bg: string; color: string }> = {
  government: { label: "Government", bg: "bg-[#d4a017]/10", color: "text-[#d4a017]" },
  enterprise: { label: "Enterprise", bg: "bg-[#818cf8]/10", color: "text-[#818cf8]" },
  learning: { label: "Learning (LMS)", bg: "bg-[#4ade80]/10", color: "text-[#4ade80]" },
  communication: { label: "Communication", bg: "bg-[#38bdf8]/10", color: "text-[#38bdf8]" },
  payments: { label: "Payments", bg: "bg-[#f472b6]/10", color: "text-[#f472b6]" },
  storage: { label: "Storage Archive", bg: "bg-[#a78bfa]/10", color: "text-[#a78bfa]" },
  analytics: { label: "Analytics", bg: "bg-[#fb923c]/10", color: "text-[#fb923c]" },
};

const iconMap: Record<string, React.ElementType> = {
  ShieldCheck, FileCheck: ShieldCheck, Mail, Globe, BookOpen, Layers, Video, Users, CreditCard, DollarSign, Database, Activity
};

export default function IntegrationManagementPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedPackage, setSelectedPackage] = useState<MarketplaceConnectorPackage | null>(null);

  const packages = IntegrationMarketplaceService.getPackages();

  const filteredPackages = packages.filter((pkg) => {
    const matchesCat = selectedCategory === "all" || pkg.category === selectedCategory;
    const matchesSearch = pkg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pkg.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          pkg.publisher.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen space-y-6 pb-8">

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#030e1f] via-[#061428] to-[#0a1f40] border border-[#d4a017]/25 p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-[#d4a017]/5 via-transparent to-[#4ade80]/5" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4a017] via-[#b8860b] to-[#996515] flex items-center justify-center shadow-lg shadow-[#d4a017]/20">
              <Zap className="w-7 h-7 text-[#030e1f]" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-xl font-black text-white tracking-tight">Enterprise Integration Marketplace</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#4ade80]/20 text-[#4ade80] text-[10px] font-black tracking-widest border border-[#4ade80]/30">v4.3A</span>
              </div>
              <p className="text-sm text-[#8899b4]">Connect government registries, LMS platforms, enterprise SSO, payment hubs & communications</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-center">
              <div className="text-xl font-black text-white">{packages.length}</div>
              <div className="text-[10px] text-[#8899b4] font-bold">connectors</div>
            </div>
            <div className="w-px h-8 bg-[#1a2f4a]" />
            <div className="text-center">
              <div className="text-xl font-black text-[#4ade80]">96.4%</div>
              <div className="text-[10px] text-[#8899b4] font-bold">overall health</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#6b7a94] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search connectors by name, publisher, or capability..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#040f20] border border-[#1a2f4a] text-xs text-white placeholder-[#6b7a94] focus:outline-none focus:border-[#d4a017]"
          />
        </div>
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
          {["all", "government", "enterprise", "learning", "communication", "payments", "storage", "analytics"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold capitalize whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[#d4a017] text-[#030e1f] shadow-md shadow-[#d4a017]/20"
                  : "bg-[#040f20] text-[#8899b4] border border-[#1a2f4a] hover:text-white hover:border-[#d4a017]/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Connectors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filteredPackages.map((pkg) => {
          const IconComp = iconMap[pkg.icon] || Globe;
          const cat = categoryBadges[pkg.category];

          return (
            <div key={pkg.id} className="rounded-2xl bg-[#040f20] border border-[#1a2f4a] hover:border-[#d4a017]/50 transition-all p-5 flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#061428] border border-[#1a2f4a] flex items-center justify-center text-[#d4a017] group-hover:border-[#d4a017]/50 group-hover:scale-105 transition-all">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${cat.bg} ${cat.color}`}>
                      {cat.label}
                    </span>
                    <span className="text-[10px] text-[#6b7a94]">{pkg.version}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-black text-white group-hover:text-[#d4a017] transition-colors">{pkg.name}</h3>
                  <p className="text-[10px] text-[#6b7a94] font-extrabold">{pkg.publisher}</p>
                </div>

                <p className="text-xs text-[#8899b4] leading-relaxed">{pkg.description}</p>
              </div>

              <div className="pt-3 border-t border-[#1a2f4a] space-y-3">
                <div className="flex items-center justify-between text-[10px] text-[#6b7a94]">
                  <span>Permissions: <strong className="text-[#8899b4]">{pkg.requiredPermissions.length} granted</strong></span>
                  <span>Tier: <strong className="text-[#4ade80] uppercase font-black">{pkg.supportedTier}</strong></span>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`flex items-center gap-1 text-[10px] font-black uppercase ${
                    pkg.installStatus === "installed" ? "text-[#4ade80]" : "text-[#d4a017]"
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${pkg.installStatus === "installed" ? "bg-[#4ade80]" : "bg-[#d4a017]"}`} />
                    {pkg.installStatus.replace("_", " ")}
                  </span>

                  <button
                    onClick={() => setSelectedPackage(pkg)}
                    className="px-3 py-1.5 rounded-xl bg-[#061428] border border-[#d4a017]/40 hover:bg-[#d4a017] hover:text-[#030e1f] text-[#d4a017] text-xs font-bold transition-all flex items-center gap-1"
                  >
                    <Settings className="w-3.5 h-3.5" /> Configure
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Config Modal Preview */}
      {selectedPackage && (
        <div className="fixed inset-0 bg-[#020914]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="max-w-lg w-full rounded-2xl bg-[#040f20] border border-[#d4a017]/40 p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#061428] border border-[#d4a017]/30 flex items-center justify-center text-[#d4a017]">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-black text-white">{selectedPackage.name}</h3>
                  <p className="text-[10px] text-[#6b7a94]">Publisher: {selectedPackage.publisher} · {selectedPackage.version}</p>
                </div>
              </div>
              <button onClick={() => setSelectedPackage(null)} className="text-[#6b7a94] hover:text-white text-sm font-bold">✕</button>
            </div>

            <div className="space-y-3 pt-2">
              <div className="p-3 rounded-xl bg-[#061428] border border-[#1a2f4a]">
                <p className="text-[10px] font-black text-[#6b7a94] uppercase tracking-wider mb-1">Required Permissions</p>
                <div className="flex flex-wrap gap-1">
                  {selectedPackage.requiredPermissions.map((perm) => (
                    <span key={perm} className="px-2 py-0.5 rounded bg-[#0a1f40] text-[10px] text-[#38bdf8] border border-[#38bdf8]/30">{perm}</span>
                  ))}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#061428] border border-[#1a2f4a] space-y-2">
                <p className="text-[10px] font-black text-[#6b7a94] uppercase tracking-wider">Tenant Provisioning Status</p>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8899b4]">Flagship Tenant (DTA)</span>
                  <span className="text-[#4ade80] font-bold">INSTALLED & ACTIVE</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#8899b4]">Sync Frequency</span>
                  <span className="text-white font-bold">Real-time / Instant</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button onClick={() => setSelectedPackage(null)} className="px-4 py-2 rounded-xl bg-[#061428] border border-[#1a2f4a] text-xs font-bold text-[#8899b4] hover:text-white">
                Close
              </button>
              <button onClick={() => setSelectedPackage(null)} className="px-4 py-2 rounded-xl bg-[#d4a017] text-[#030e1f] text-xs font-black hover:bg-[#b8860b]">
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
