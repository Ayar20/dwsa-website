"use client";

import React from "react";
import { CertificationWorkflowService } from "@/lib/institutionOS/CertificationWorkflowService";
import { MarketplaceCertificationService } from "@/lib/institutionOS/MarketplaceCertificationService";
import {
  ShieldCheck, CheckCircle2, Award, FileCheck, Lock, Activity
} from "lucide-react";

export default function CertificationCentrePage() {
  const stages = CertificationWorkflowService.getWorkflowStages("ext-scorm-player-pro");
  const certBadge = MarketplaceCertificationService.getCertification("ext-scorm-player-pro");

  return (
    <div className="min-h-screen space-y-6 pb-8">

      {/* Hero Header */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#030e1f] via-[#061428] to-[#0a1f40] border border-[#4ade80]/25 p-6">
        <div className="absolute inset-0 bg-gradient-to-r from-[#4ade80]/5 via-transparent to-[#d4a017]/5" />
        <div className="relative flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#4ade80] via-[#10b981] to-[#047857] flex items-center justify-center shadow-lg shadow-[#4ade80]/20 text-white">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <h1 className="text-xl font-black text-white tracking-tight">Marketplace Certification Centre</h1>
                <span className="px-2 py-0.5 rounded-full bg-[#4ade80]/20 text-[#4ade80] text-[10px] font-black tracking-widest border border-[#4ade80]/30">7-STAGE VERIFICATION</span>
              </div>
              <p className="text-sm text-[#8899b4]">Security review, static code analysis, WCAG 2.1 AA accessibility & performance verification</p>
            </div>
          </div>
        </div>
      </div>

      {/* Certification Pipeline Stages */}
      <div className="rounded-2xl bg-[#040f20] border border-[#1a2f4a] p-6 space-y-4">
        <h2 className="text-sm font-black text-white flex items-center gap-2">
          <Award className="w-4 h-4 text-[#d4a017]" /> 7-Stage Certification Pipeline Audit
        </h2>

        <div className="space-y-3">
          {stages.map((stg, i) => (
            <div key={stg.stageName} className="p-4 rounded-xl bg-[#061428] border border-[#1a2f4a] flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-[#4ade80]/20 text-[#4ade80] flex items-center justify-center font-black text-xs">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-xs font-black text-white">{stg.stageName}</h3>
                  <p className="text-[10px] text-[#6b7a94]">Auditor: {stg.auditorName} · Completed: {stg.completedAt}</p>
                </div>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-[#4ade80]/20 text-[#4ade80] text-[10px] font-black border border-[#4ade80]/30 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> PASSED
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
