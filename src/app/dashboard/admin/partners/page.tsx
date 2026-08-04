"use client";

import React from "react";
import { Building2, TrendingUp, CheckCircle2, RefreshCw, Globe } from "lucide-react";
import { PartnershipService } from "@/lib/institutionOS/PartnershipService";

export default function IndustryPartnersPage() {
  const partners = PartnershipService.getPartners();
  const totalValue = partners.reduce((a, p) => a + p.annualValueNaira, 0);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded bg-[#d4a017]/15 text-[#d4a017] text-[9px] font-black uppercase border border-[#d4a017]/30">EXECUTIVE OPERATIONS</span>
            <span className="text-[10px] text-[#8899b4]">ICC v3.6</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Industry Partnership Centre</h2>
          <p className="text-xs text-[#8899b4]">Manage corporate partners, government agencies, technology vendors &amp; international institutional agreements</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#d4a017] text-[#030e1f] text-xs font-extrabold hover:bg-[#b8891a] transition-all shrink-0">
          <Building2 className="w-4 h-4" /> Add New Partner
        </button>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-4 space-y-1">
          <p className="text-2xl font-extrabold text-[#d4a017]">{partners.length}</p>
          <p className="text-[10px] text-[#8899b4] font-bold uppercase">Active Partners</p>
        </div>
        <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-4 space-y-1">
          <p className="text-2xl font-extrabold text-[#4ade80]">₦{(totalValue / 1000000).toFixed(1)}M</p>
          <p className="text-[10px] text-[#8899b4] font-bold uppercase">Total Annual Value</p>
        </div>
        <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-4 space-y-1">
          <p className="text-2xl font-extrabold text-white">{partners.reduce((a, p) => a + p.activeProjectsCount, 0)}</p>
          <p className="text-[10px] text-[#8899b4] font-bold uppercase">Active Projects</p>
        </div>
        <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-4 space-y-1">
          <p className="text-2xl font-extrabold text-[#818cf8]">4</p>
          <p className="text-[10px] text-[#8899b4] font-bold uppercase">Partner Types</p>
        </div>
      </div>

      {/* Partners Table */}
      <div className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#d4a017]" /> Active Institutional Partners
        </h3>
        <div className="rounded-2xl border border-[#1a2f4a] overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#030e1f] text-[#8899b4] text-[10px] uppercase font-black tracking-wider border-b border-[#1a2f4a]">
              <tr>
                <th className="p-4">Partner</th>
                <th className="p-4">Type</th>
                <th className="p-4">Annual Value</th>
                <th className="p-4">Projects</th>
                <th className="p-4">Renewal</th>
                <th className="p-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a2f4a] text-white">
              {partners.map((p) => (
                <tr key={p.id} className="hover:bg-[#0f223d]/40 transition-colors">
                  <td className="p-4">
                    <p className="font-extrabold text-white">{p.partnerName}</p>
                    <p className="text-[9px] text-[#8899b4]">{p.contactPerson}</p>
                  </td>
                  <td className="p-4 text-[#8899b4]">{p.partnerType}</td>
                  <td className="p-4 font-extrabold text-[#4ade80]">₦{(p.annualValueNaira / 1000000).toFixed(1)}M</td>
                  <td className="p-4 font-bold text-white">{p.activeProjectsCount}</td>
                  <td className="p-4 text-[#8899b4] font-mono text-[10px]">{p.renewalDate}</td>
                  <td className="p-4 text-right">
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase ${p.status === "Active" ? "bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80]" : "bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017]"}`}>
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
