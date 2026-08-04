"use client";

import React, { useState } from "react";
import {
  FileText, Download, BarChart3, PieChart, TrendingUp, Calendar,
  CheckCircle2, DollarSign, Users, Award
} from "lucide-react";

const availableReports = [
  { id: 1, name: "Comprehensive Financial & Tuition Ledger Report (Q2 2026)", type: "Financial", size: "2.4 MB", date: "Aug 01, 2026" },
  { id: 2, name: "Student Attendance, Retention & Dropout Analytics", type: "Academic", size: "1.8 MB", date: "Jul 28, 2026" },
  { id: 3, name: "Faculty Teaching Load & Student Performance Ratings", type: "Faculty", size: "1.2 MB", date: "Jul 25, 2026" },
  { id: 4, name: "Admissions Pipeline & Conversion Rate Summary", type: "Admissions", size: "3.1 MB", date: "Jul 20, 2026" },
  { id: 5, name: "Certificate Registry & Cryptographic Verification Audit", type: "Registry", size: "950 KB", date: "Jul 15, 2026" },
];

export default function ReportsPage() {
  const [downloading, setDownloading] = useState<number | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const handleDownload = (id: number, name: string) => {
    setDownloading(id);
    setTimeout(() => {
      setDownloading(null);
      setToast(`Report Generated & Downloaded: "${name}"`);
      setTimeout(() => setToast(null), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#061428] border border-[#4ade80]/50 text-[#4ade80] text-xs font-extrabold shadow-2xl flex items-center gap-2 animate-fadeInUp">
          <CheckCircle2 className="w-4 h-4" />
          {toast}
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-[#d4a017]/15 text-[#d4a017] text-[9px] font-black uppercase">EXECUTIVE REPORTS</span>
          <span className="text-[10px] text-[#8899b4]">PDF &amp; Excel Export Ready</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white mt-1">Executive Reports Centre</h2>
        <p className="text-xs text-[#8899b4]">Generate, export, and download comprehensive institutional performance reports</p>
      </div>

      {/* Reports List */}
      <div className="space-y-3">
        {availableReports.map((r) => (
          <div key={r.id} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#d4a017]/30 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017] flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <span className="px-2 py-0.5 rounded bg-[#1a2f4a] text-[#8899b4] text-[9px] font-black uppercase">{r.type}</span>
                <h3 className="text-sm font-extrabold text-white mt-1">{r.name}</h3>
                <p className="text-[10px] text-[#8899b4]">Generated {r.date} · File Size: {r.size}</p>
              </div>
            </div>
            <button
              onClick={() => handleDownload(r.id, r.name)}
              disabled={downloading === r.id}
              className="px-4 py-2 rounded-xl bg-[#030e1f] border border-[#d4a017]/30 text-[#d4a017] text-xs font-bold hover:bg-[#d4a017] hover:text-[#030e1f] transition-all disabled:opacity-50 flex items-center gap-2 shrink-0"
            >
              <Download className="w-3.5 h-3.5" />
              {downloading === r.id ? "Exporting..." : "Export Report"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
