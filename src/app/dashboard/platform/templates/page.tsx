"use client";

import React, { useState } from "react";
import { TemplateProvisioningService } from "@/lib/institutionOS/TemplateProvisioningService";
import {
  Layers, CheckCircle2, Zap, ArrowRight, ShieldCheck, Globe, Building2, GraduationCap, Award
} from "lucide-react";

export default function IntegrationTemplatesPage() {
  const templates = TemplateProvisioningService.getTemplates();
  const [selectedTenant, setSelectedTenant] = useState("tenant_dta_001");
  const [provisionMessage, setProvisionMessage] = useState<string | null>(null);

  const handleProvision = (templateId: string) => {
    const res = TemplateProvisioningService.provisionTemplateToTenant(templateId, selectedTenant);
    setProvisionMessage(res.message);
    setTimeout(() => setProvisionMessage(null), 6000);
  };

  return (
    <div className="min-h-screen space-y-6 pb-8">

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#030e1f] via-[#061428] to-[#0a1f40] border border-[#d4a017]/25 p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-[#d4a017]/5 via-transparent to-[#818cf8]/5" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#818cf8] via-[#6366f1] to-[#4f46e5] flex items-center justify-center shadow-lg shadow-[#818cf8]/20 text-white">
              <Layers className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-xl font-black text-white tracking-tight">Integration Deployment Templates</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#818cf8]/20 text-[#818cf8] text-[10px] font-black tracking-widest border border-[#818cf8]/30">ONE-CLICK PROVISIONING</span>
              </div>
              <p className="text-sm text-[#8899b4]">Pre-packaged integration bundles for Universities, Corporate Academies, Government & Training Orgs</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-[#061428] p-2.5 rounded-xl border border-[#1a2f4a]">
            <span className="text-[10px] text-[#6b7a94] font-bold uppercase">Target Tenant:</span>
            <select
              value={selectedTenant}
              onChange={(e) => setSelectedTenant(e.target.value)}
              className="bg-[#040f20] border border-[#1a2f4a] text-xs font-bold text-white rounded-lg px-2.5 py-1 focus:outline-none focus:border-[#d4a017]"
            >
              <option value="tenant_dta_001">Digital Technology Academy (DTA)</option>
              <option value="tenant_wabs_002">West Africa Business School</option>
              <option value="tenant_pati_003">Pan-African Tech Institute</option>
            </select>
          </div>
        </div>
      </div>

      {/* Provision Notification */}
      {provisionMessage && (
        <div className="p-4 rounded-xl bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80] text-xs font-bold flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{provisionMessage}</span>
        </div>
      )}

      {/* Templates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {templates.map((tpl) => (
          <div key={tpl.id} className="rounded-2xl bg-[#040f20] border border-[#1a2f4a] p-6 space-y-4 hover:border-[#d4a017]/40 transition-all flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <span className="px-2 py-0.5 rounded bg-[#d4a017]/10 text-[#d4a017] text-[9px] font-black uppercase border border-[#d4a017]/30">
                    {tpl.targetSector}
                  </span>
                  <h3 className="text-base font-black text-white mt-1">{tpl.name}</h3>
                </div>
                <span className="text-[10px] text-[#6b7a94] flex items-center gap-1 font-bold">
                  <Zap className="w-3 h-3 text-[#d4a017]" /> ~{tpl.estimatedSetupMinutes} mins setup
                </span>
              </div>

              <p className="text-xs text-[#8899b4] leading-relaxed">{tpl.description}</p>

              <div className="space-y-2 pt-2">
                <p className="text-[10px] font-black text-[#6b7a94] uppercase tracking-wider">Included Connectors ({tpl.includedConnectors.length}):</p>
                <div className="flex flex-wrap gap-1.5">
                  {tpl.includedConnectors.map((c) => (
                    <span key={c} className="px-2.5 py-1 rounded-lg bg-[#061428] border border-[#1a2f4a] text-[11px] text-[#c8d8f0] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#4ade80]" /> {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#1a2f4a] flex items-center justify-between">
              <span className="text-[10px] text-[#6b7a94]">Auto-configures tenant credentials & permissions</span>
              <button
                onClick={() => handleProvision(tpl.id)}
                className="px-4 py-2 rounded-xl bg-[#d4a017] text-[#030e1f] text-xs font-black hover:bg-[#b8860b] transition-all flex items-center gap-1.5"
              >
                Provision to Tenant <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
