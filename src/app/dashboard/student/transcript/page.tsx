"use client";

import React, { useState } from "react";
import {
  FileText, Download, ShieldCheck, CheckCircle2, Award, QrCode,
  GraduationCap, BookOpen, Star, Sparkles, Building2, Printer
} from "lucide-react";
import { TranscriptService } from "@/lib/institutionOS/TranscriptService";

export default function StudentTranscriptPage() {
  const transcript = TranscriptService.getTranscriptForStudent("std_01");
  const [downloading, setDownloading] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setToast("Official Digital Transcript PDF Downloaded Successfully!");
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#d4a017]/15 text-[#d4a017] text-[9px] font-black uppercase">OFFICIAL RECORD</span>
            <span className="text-[10px] text-[#8899b4]">InstitutionOS v3.5</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">Official Digital Transcript</h2>
          <p className="text-xs text-[#8899b4]">Verified academic transcript with module breakdown, GPA equivalent &amp; faculty assessment summary</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#d4a017] text-[#030e1f] text-xs font-extrabold hover:bg-[#b8891a] transition-all disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            {downloading ? "Generating PDF..." : "Download Verified PDF"}
          </button>
        </div>
      </div>

      {/* Transcript Document View */}
      <div className="rounded-3xl bg-[#061428] border border-[#d4a017]/40 p-6 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
        {/* Top Watermark Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-b border-[#1a2f4a] pb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#d4a017] to-[#b8891a] text-[#030e1f] flex items-center justify-center font-black text-2xl shrink-0 shadow-lg">
              DTA
            </div>
            <div>
              <h3 className="text-lg font-black text-white uppercase tracking-tight">Digital Technology Academy</h3>
              <p className="text-xs text-[#d4a017] font-bold">Digital World Systems Africa Ltd (DWSA)</p>
              <p className="text-[10px] text-[#8899b4]">Office of the Academic Registrar · Verification ID: {transcript.verificationCode}</p>
            </div>
          </div>

          <div className="text-left sm:text-right space-y-1">
            <span className="px-3 py-1 rounded-full bg-[#4ade80]/15 border border-[#4ade80]/30 text-[#4ade80] text-[10px] font-black uppercase inline-block">
              VERIFIED TRANSCRIPT
            </span>
            <p className="text-xs text-white font-bold">{transcript.transcriptId}</p>
            <p className="text-[10px] text-[#8899b4]">Issued: {transcript.issueDate}</p>
          </div>
        </div>

        {/* Student & Programme Overview Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#030e1f] p-5 rounded-2xl border border-[#1a2f4a] text-xs">
          <div>
            <span className="text-[9px] font-black text-[#8899b4] uppercase block">Learner Name</span>
            <span className="font-extrabold text-white">{transcript.studentName}</span>
          </div>
          <div>
            <span className="text-[9px] font-black text-[#8899b4] uppercase block">Enrolled Programme</span>
            <span className="font-extrabold text-[#d4a017]">{transcript.programmeTitle}</span>
          </div>
          <div>
            <span className="text-[9px] font-black text-[#8899b4] uppercase block">GPA Equivalent</span>
            <span className="font-extrabold text-[#4ade80]">{transcript.gpaEquivalent} / 4.00</span>
          </div>
          <div>
            <span className="text-[9px] font-black text-[#8899b4] uppercase block">Programme Completion</span>
            <span className="font-extrabold text-white">{transcript.completionPercentage}%</span>
          </div>
        </div>

        {/* Completed Modules Table */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#d4a017]" />
            Completed Coursework &amp; Academic Performance
          </h4>
          <div className="rounded-2xl border border-[#1a2f4a] overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#030e1f] text-[#8899b4] text-[10px] uppercase font-black tracking-wider border-b border-[#1a2f4a]">
                <tr>
                  <th className="p-3.5">Module Code</th>
                  <th className="p-3.5">Module Title</th>
                  <th className="p-3.5">Credits</th>
                  <th className="p-3.5">Score</th>
                  <th className="p-3.5 text-right">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1a2f4a] text-white">
                {transcript.modulesCompleted.map((m) => (
                  <tr key={m.code} className="hover:bg-[#0f223d]/40 transition-colors">
                    <td className="p-3.5 font-mono text-[10px] text-[#d4a017] font-bold">{m.code}</td>
                    <td className="p-3.5 font-bold">{m.title}</td>
                    <td className="p-3.5 text-[#8899b4]">{m.credits} Units</td>
                    <td className="p-3.5 font-bold">{m.score}%</td>
                    <td className="p-3.5 text-right font-black text-[#4ade80]">{m.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Competency Mastery Summary */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
            <Award className="w-4 h-4 text-[#4ade80]" />
            Verified Competencies &amp; Mastery Levels
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {transcript.competenciesSummary.map((c) => (
              <div key={c.name} className="bg-[#030e1f] p-3.5 rounded-xl border border-[#1a2f4a] space-y-1">
                <span className="text-[9px] font-black text-[#8899b4] uppercase block">{c.name}</span>
                <span className="text-sm font-extrabold text-white">{c.score}%</span>
                <span className="text-[9px] font-bold text-[#4ade80] block">{c.level}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Faculty Remarks & Registrar Verification Seal */}
        <div className="pt-4 border-t border-[#1a2f4a] flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1 max-w-lg">
            <span className="text-[9px] font-black text-[#d4a017] uppercase tracking-wider block">Faculty Assessment Summary</span>
            <p className="text-xs text-[#8899b4] leading-relaxed italic">&ldquo;{transcript.facultyRemarks}&rdquo;</p>
          </div>

          <div className="flex items-center gap-4 bg-[#030e1f] p-4 rounded-2xl border border-[#d4a017]/30 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017] flex items-center justify-center">
              <QrCode className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[9px] font-black text-[#4ade80] uppercase tracking-wider block">Cryptographic Seal</span>
              <span className="text-xs font-extrabold text-white">Verification Approved</span>
              <span className="text-[9px] text-[#8899b4] block">Scan QR for live validation</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
