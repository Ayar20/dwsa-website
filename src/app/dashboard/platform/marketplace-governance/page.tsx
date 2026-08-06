"use client";

import React from "react";
import { MarketplaceGovernanceService } from "@/lib/institutionOS/MarketplaceGovernanceService";
import {
  ShieldAlert, CheckCircle2, AlertTriangle, FileCheck, RefreshCw, X
} from "lucide-react";

export default function MarketplaceGovernancePage() {
  const approvalQueue = MarketplaceGovernanceService.getApprovalQueue();

  return (
    <div className="min-h-screen space-y-6 pb-8">
      <div className="rounded-2xl bg-[#040f20] border border-[#d4a017]/20 p-6 space-y-2">
        <h1 className="text-xl font-black text-white flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-[#d4a017]" /> Marketplace Governance & Approval Centre
        </h1>
        <p className="text-xs text-[#8899b4]">Review pending third-party extensions, AI agents, security scan flags, and policy compliance enforcement.</p>
      </div>

      <div className="space-y-4">
        <h2 className="text-sm font-black text-white">Pending Approval Queue ({approvalQueue.length})</h2>
        <div className="space-y-3">
          {approvalQueue.map((item) => (
            <div key={item.id} className="p-4 rounded-2xl bg-[#040f20] border border-[#1a2f4a] flex items-center justify-between gap-4">
              <div>
                <span className="px-2 py-0.5 rounded bg-[#d4a017]/10 text-[#d4a017] text-[9px] font-black uppercase">
                  {item.itemType}
                </span>
                <h3 className="text-xs font-black text-white mt-1">{item.name}</h3>
                <p className="text-[10px] text-[#6b7a94]">Publisher: {item.publisher} · Submitted: {item.submissionDate}</p>
              </div>

              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-xl bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold hover:bg-red-500 hover:text-white">
                  Reject / Flag
                </button>
                <button className="px-3 py-1.5 rounded-xl bg-[#4ade80] text-[#030e1f] text-xs font-black hover:bg-[#22c55e]">
                  Approve & Certify
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
