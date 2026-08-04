"use client";

import React, { useState } from "react";
import { CheckCircle2, Clock, AlertTriangle, PenLine, ThumbsUp, ThumbsDown } from "lucide-react";
import { ApprovalService } from "@/lib/institutionOS/ApprovalService";

const categoryColors: Record<string, string> = {
  Certificate: "bg-[#d4a017]/15 text-[#d4a017] border-[#d4a017]/30",
  Finance: "bg-[#4ade80]/15 text-[#4ade80] border-[#4ade80]/30",
  Partnership: "bg-[#818cf8]/15 text-[#818cf8] border-[#818cf8]/30",
  Scholarship: "bg-[#fb923c]/15 text-[#fb923c] border-[#fb923c]/30",
  Research: "bg-[#38bdf8]/15 text-[#38bdf8] border-[#38bdf8]/30",
};

export default function ExecutiveApprovalCentrePage() {
  const [approvals, setApprovals] = useState(() => ApprovalService.getAll());
  const [toast, setToast] = useState<string | null>(null);

  const handleAction = (id: string, action: "approve" | "reject") => {
    if (action === "approve") ApprovalService.approve(id, "Approved by Executive Director via InstitutionOS.");
    else ApprovalService.reject(id, "Rejected by Executive Director. See comments for details.");
    setApprovals(ApprovalService.getAll());
    setToast(`Item ${action === "approve" ? "Approved" : "Rejected"} Successfully`);
    setTimeout(() => setToast(null), 3000);
  };

  const pending = approvals.filter(a => a.status === "Pending");

  return (
    <div className="space-y-8 pb-12">
      {toast && <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#061428] border border-[#4ade80]/50 text-[#4ade80] text-xs font-extrabold shadow-2xl flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />{toast}</div>}

      <div>
        <div className="flex items-center gap-2 mb-1"><span className="px-2.5 py-0.5 rounded bg-[#d4a017]/15 text-[#d4a017] text-[9px] font-black uppercase border border-[#d4a017]/30">EXECUTIVE OPS</span><span className="text-[10px] text-[#8899b4]">v3.7</span></div>
        <h2 className="text-2xl font-extrabold text-white">Executive Approval Centre</h2>
        <p className="text-xs text-[#8899b4]">Central workspace for certificates, finance, partnerships, research &amp; policy approvals with digital signature</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[{ l: "Pending Approval", v: pending.length, c: "text-[#d4a017]" }, { l: "Approved This Month", v: approvals.filter(a => a.status === "Approved").length, c: "text-[#4ade80]" }, { l: "Urgent Items", v: pending.filter(a => a.priority === "Urgent").length, c: "text-red-400" }, { l: "Avg Resolution Time", v: "1.4 Days", c: "text-white" }].map(s => (
          <div key={s.l} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-4 space-y-1">
            <p className={`text-2xl font-extrabold ${s.c}`}>{s.v}</p>
            <p className="text-[10px] text-[#8899b4] font-bold uppercase">{s.l}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {approvals.map(a => (
          <div key={a.id} className={`rounded-3xl bg-[#061428] border p-5 space-y-3 hover:border-[#d4a017]/40 transition-all ${a.priority === "Urgent" && a.status === "Pending" ? "border-[#d4a017]/40" : "border-[#1a2f4a]"}`}>
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-black uppercase ${categoryColors[a.category] ?? "bg-[#1a2f4a] text-[#8899b4] border-[#1a2f4a]"}`}>{a.category}</span>
                  {a.priority === "Urgent" && <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 text-[9px] font-black uppercase">⚡ URGENT</span>}
                  {a.signaturePlaceholder && <span className="px-2 py-0.5 rounded bg-[#818cf8]/10 text-[#818cf8] text-[9px] font-bold">🖊 Signature Required</span>}
                </div>
                <h3 className="text-sm font-extrabold text-white">{a.title}</h3>
                <p className="text-[10px] text-[#8899b4]">Submitted by: {a.submittedBy} · {a.submittedAt}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-black uppercase ${a.status === "Approved" ? "bg-[#4ade80]/10 border-[#4ade80]/30 text-[#4ade80]" : a.status === "Rejected" ? "bg-red-500/10 border-red-500/30 text-red-400" : "bg-[#d4a017]/10 border-[#d4a017]/30 text-[#d4a017]"}`}>{a.status}</span>
              </div>
            </div>

            {a.comments.length > 0 && (
              <div className="bg-[#030e1f] rounded-xl p-3 text-[10px] text-[#8899b4] italic space-y-1">
                {a.comments.map((c, i) => <p key={i}>&ldquo;{c}&rdquo;</p>)}
              </div>
            )}

            {a.status === "Pending" && (
              <div className="flex items-center gap-2 pt-1">
                <button onClick={() => handleAction(a.id, "approve")} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80] text-xs font-extrabold hover:bg-[#4ade80]/20 transition-all">
                  <ThumbsUp className="w-3.5 h-3.5" /> Approve
                </button>
                <button onClick={() => handleAction(a.id, "reject")} className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-extrabold hover:bg-red-500/20 transition-all">
                  <ThumbsDown className="w-3.5 h-3.5" /> Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
