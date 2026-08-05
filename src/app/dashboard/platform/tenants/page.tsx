"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Building2, Globe, Shield, RefreshCw, Archive, CheckCircle2,
  AlertTriangle, Eye, UserPlus, Sliders, HardDrive, Clock, Search
} from "lucide-react";
import { TenantService } from "@/lib/institutionOS/TenantService";
import { UsageAnalyticsService } from "@/lib/institutionOS/UsageAnalyticsService";
import { TenantConfigurationService } from "@/lib/institutionOS/TenantConfigurationService";
import type { Tenant } from "@/types/tenant";

export default function TenantRegistryPage() {
  const [tenantList, setTenantList] = useState<Tenant[]>(TenantService.getAllTenants());
  const [selectedTenantId, setSelectedTenantId] = useState<string | null>(tenantList[0]?.id ?? null);
  const [searchQuery, setSearchQuery] = useState("");
  const [cloneModalTenant, setCloneModalTenant] = useState<Tenant | null>(null);
  const [cloneName, setCloneName] = useState("");
  const [notification, setNotification] = useState<string | null>(null);

  const usageData = UsageAnalyticsService.getTenantActivity();
  const selectedTenant = tenantList.find((t) => t.id === selectedTenantId);

  const filteredTenants = tenantList.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleStatus = (id: string) => {
    setTenantList((prev) =>
      prev.map((t) => {
        if (t.id !== id) return t;
        const nextStatus = t.status === "active" ? "suspended" : "active";
        return { ...t, status: nextStatus };
      })
    );
    setNotification(`Tenant status updated successfully.`);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleClone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cloneModalTenant || !cloneName.trim()) return;
    const res = TenantConfigurationService.cloneConfiguration(cloneModalTenant.id, cloneName);
    if (res.success) {
      setNotification(`Cloned configuration from ${cloneModalTenant.name} into ${cloneName}.`);
      setCloneModalTenant(null);
      setCloneName("");
    }
    setTimeout(() => setNotification(null), 4000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#061428] border border-[#d4a017]/20 p-6 rounded-3xl">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#d4a017]/15 text-[#d4a017] text-[10px] font-black uppercase tracking-wider mb-2">
            <Building2 className="w-3 h-3" />
            <span>Phase 3 — Institution Registry</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">Institution Registry & Governance</h1>
          <p className="text-xs text-[#8899b4]">Inspect, manage, activate, suspend, and clone tenant configurations across all registered institutions.</p>
        </div>
        <Link
          href="/dashboard/platform/provision"
          className="px-5 py-2.5 rounded-2xl bg-[#d4a017] text-[#030e1f] font-black text-xs uppercase tracking-wider hover:bg-[#f0c040] transition-all flex items-center gap-2 shrink-0"
        >
          <UserPlus className="w-4 h-4" />
          Provision Institution
        </Link>
      </div>

      {notification && (
        <div className="p-4 rounded-2xl bg-[#4ade80]/15 border border-[#4ade80]/30 text-[#4ade80] text-xs font-bold animate-fadeIn">
          ✓ {notification}
        </div>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tenant List */}
        <div className="lg:col-span-2 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#8899b4] absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search institutions by name, slug, or country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#061428] border border-[#d4a017]/20 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#6b7a94] focus:outline-none focus:border-[#d4a017]"
            />
          </div>

          <div className="bg-[#061428] border border-[#d4a017]/20 rounded-2xl overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="bg-[#030e1f] border-b border-[#1a2f4a] text-[#6b7a94] uppercase tracking-wider text-[10px] font-bold">
                  <th className="py-3.5 px-4">Institution</th>
                  <th className="py-3.5 px-4">Type</th>
                  <th className="py-3.5 px-4">Tier</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4">Learners</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a2f4a]">
                {filteredTenants.map((t) => {
                  const activity = usageData.find((u) => u.tenantId === t.id);
                  const isSelected = selectedTenantId === t.id;

                  return (
                    <tr
                      key={t.id}
                      onClick={() => setSelectedTenantId(t.id)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? "bg-[#d4a017]/10" : "hover:bg-[#0c1b33]"
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs"
                            style={{
                              backgroundColor: `${t.brand.primaryColor}20`,
                              color: t.brand.primaryColor,
                              border: `1px solid ${t.brand.primaryColor}40`,
                            }}
                          >
                            {t.brand.shortName[0]}
                          </div>
                          <div>
                            <span className="font-bold text-white block">{t.name}</span>
                            <span className="text-[10px] text-[#6b7a94]">@{t.slug} • {t.country}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 capitalize text-[#aab4c4]">{t.type}</td>
                      <td className="py-3.5 px-4">
                        <span className="font-extrabold text-[#d4a017] capitalize">{t.tier}</span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                            t.status === "active"
                              ? "bg-[#4ade80]/15 text-[#4ade80] border border-[#4ade80]/30"
                              : "bg-[#f87171]/15 text-[#f87171] border border-[#f87171]/30"
                          }`}
                        >
                          {t.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-bold text-white">{activity?.mau ?? "—"}</td>
                      <td className="py-3.5 px-4 text-right space-x-1" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => toggleStatus(t.id)}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold ${
                            t.status === "active"
                              ? "bg-[#f87171]/15 text-[#f87171] hover:bg-[#f87171]/30"
                              : "bg-[#4ade80]/15 text-[#4ade80] hover:bg-[#4ade80]/30"
                          }`}
                        >
                          {t.status === "active" ? "Suspend" : "Activate"}
                        </button>
                        <button
                          onClick={() => setCloneModalTenant(t)}
                          className="px-2.5 py-1 rounded-lg bg-[#d4a017]/15 text-[#d4a017] text-[10px] font-extrabold hover:bg-[#d4a017]/30"
                        >
                          Clone
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Tenant Inspector Drawer */}
        {selectedTenant ? (
          <div className="bg-[#061428] border border-[#d4a017]/20 rounded-2xl p-5 space-y-5 h-fit sticky top-24">
            <div className="flex items-center gap-3 border-b border-[#1a2f4a] pb-4">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center font-black text-lg"
                style={{
                  backgroundColor: `${selectedTenant.brand.primaryColor}20`,
                  color: selectedTenant.brand.primaryColor,
                  border: `1px solid ${selectedTenant.brand.primaryColor}50`,
                }}
              >
                {selectedTenant.brand.shortName[0]}
              </div>
              <div>
                <h3 className="text-base font-black text-white">{selectedTenant.name}</h3>
                <p className="text-xs text-[#8899b4]">Legal: {selectedTenant.legalName}</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-[#1a2f4a]">
                <span className="text-[#8899b4]">Tenant ID</span>
                <span className="font-mono text-white text-[11px]">{selectedTenant.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1a2f4a]">
                <span className="text-[#8899b4]">Region & Timezone</span>
                <span className="font-bold text-white">{selectedTenant.region} ({selectedTenant.timezone})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1a2f4a]">
                <span className="text-[#8899b4]">Domain</span>
                <span className="font-bold text-[#d4a017]">{selectedTenant.domains[0]?.domain ?? "Internal"}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1a2f4a]">
                <span className="text-[#8899b4]">AI Model</span>
                <span className="font-bold text-white uppercase">{selectedTenant.settings.ai.provider} ({selectedTenant.settings.ai.modelId})</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#1a2f4a]">
                <span className="text-[#8899b4]">Payment Gateway</span>
                <span className="font-bold text-[#4ade80] uppercase">{selectedTenant.settings.payments.provider}</span>
              </div>
            </div>

            <div>
              <span className="text-[10px] font-black uppercase text-[#8899b4] block mb-2">Enabled Module Flags</span>
              <div className="flex flex-wrap gap-1.5">
                {Object.entries(selectedTenant.features)
                  .filter(([, v]) => v)
                  .map(([k]) => (
                    <span
                      key={k}
                      className="px-2 py-0.5 rounded bg-[#4ade80]/15 text-[#4ade80] text-[9px] font-extrabold border border-[#4ade80]/30"
                    >
                      {k.replace(/([A-Z])/g, " $1").trim()}
                    </span>
                  ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {/* Clone Configuration Modal */}
      {cloneModalTenant && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-[#061428] border border-[#d4a017]/30 rounded-3xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-lg font-black text-white">Clone Configuration</h3>
            <p className="text-xs text-[#8899b4]">
              Copy all academic settings, feature flags, AI presets, and theme tokens from <strong className="text-white">{cloneModalTenant.name}</strong> to a new institution profile.
            </p>

            <form onSubmit={handleClone} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold text-[#aab4c4] mb-1">New Institution Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Covenant Technology Institute"
                  value={cloneName}
                  onChange={(e) => setCloneName(e.target.value)}
                  className="w-full bg-[#030e1f] border border-[#d4a017]/30 rounded-xl px-3.5 py-2 text-xs text-white focus:outline-none focus:border-[#d4a017]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setCloneModalTenant(null)}
                  className="px-4 py-2 rounded-xl bg-transparent border border-[#1a2f4a] text-xs font-bold text-[#aab4c4] hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#d4a017] text-[#030e1f] text-xs font-black uppercase"
                >
                  Confirm Clone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
