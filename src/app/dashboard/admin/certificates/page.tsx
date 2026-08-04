"use client";

import React, { useState } from "react";
import {
  Award, Shield, CheckCircle2, QrCode, Lock, Search,
  Download, Eye, Sparkles, Building2, ExternalLink
} from "lucide-react";

const certificates = [
  { id: "CERT-2026-8801", student: "Kofi Asante", programme: "Full-Stack Software Engineering (DLX)", issueDate: "Aug 01, 2026", hash: "0x8f2a...9c4b", status: "Verified & Issued", type: "Professional Diploma" },
  { id: "CERT-2026-8802", student: "Aisha Ibrahim", programme: "Full-Stack Software Engineering (DLX)", issueDate: "Aug 01, 2026", hash: "0x3e1d...7a9f", status: "Verified & Issued", type: "Professional Diploma" },
  { id: "CERT-2026-8803", student: "Adaobi Nwosu", programme: "Full-Stack Software Engineering (DLX)", issueDate: "Aug 02, 2026", hash: "0x9b4c...2e8d", status: "Verified & Issued", type: "Professional Diploma" },
  { id: "CERT-2026-8804", student: "Zainab Al-Mansoor", programme: "AI & Data Engineering Track", issueDate: "Pending Approval", hash: "0x0000...0000", status: "Awaiting Sign-off", type: "Competency Certificate" },
];

export default function CertificateAuthorityPage() {
  const [search, setSearch] = useState("");

  const filtered = certificates.filter(
    (c) => c.student.toLowerCase().includes(search.toLowerCase()) || c.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#d4a017]/15 text-[#d4a017] text-[9px] font-black uppercase">CERTIFICATE AUTHORITY</span>
            <span className="text-[10px] text-[#8899b4]">Cryptographic Verification</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">Certificate Authority &amp; Registry</h2>
          <p className="text-xs text-[#8899b4]">Issue, verify, and manage QR-coded digital certificates &amp; blockchain-ready diplomas</p>
        </div>
      </div>

      {/* Verification Seal Preview Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0d1628] to-[#030e1f] border border-[#d4a017]/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#d4a017]/15 border border-[#d4a017]/40 flex items-center justify-center text-[#d4a017]">
            <Award className="w-8 h-8" />
          </div>
          <div>
            <span className="text-[10px] font-black text-[#d4a017] uppercase tracking-wider">Cryptographic Institution Seal</span>
            <h3 className="text-lg font-extrabold text-white">Digital Technology Academy Verification Engine</h3>
            <p className="text-xs text-[#8899b4]">Every issued certificate contains an immutable hash and instant QR validation link.</p>
          </div>
        </div>
        <div className="px-4 py-2 rounded-2xl bg-[#030e1f] border border-[#4ade80]/30 text-[#4ade80] text-xs font-black flex items-center gap-2">
          <Shield className="w-4 h-4" /> BLOCKCHAIN-READY HASH ENGINES ACTIVE
        </div>
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8899b4]" />
        <input
          type="search"
          placeholder="Search certificate by student or ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#061428] border border-[#1a2f4a] text-xs text-white placeholder-[#8899b4] focus:outline-none focus:border-[#d4a017]"
        />
      </div>

      {/* Certificate Table */}
      <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-[#030e1f] text-[#8899b4] text-[10px] uppercase font-black tracking-wider border-b border-[#1a2f4a]">
            <tr>
              <th className="p-4">Certificate ID</th>
              <th className="p-4">Graduate Student</th>
              <th className="p-4">Type</th>
              <th className="p-4">Cryptographic Hash</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1a2f4a] text-white">
            {filtered.map((c) => (
              <tr key={c.id} className="hover:bg-[#0f223d]/40 transition-colors">
                <td className="p-4 font-mono font-bold text-[#d4a017]">{c.id}</td>
                <td className="p-4 font-bold">{c.student}</td>
                <td className="p-4 text-[#8899b4]">{c.type}</td>
                <td className="p-4 font-mono text-[10px] text-[#8899b4]">{c.hash}</td>
                <td className="p-4">
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-black border ${
                    c.status === "Verified & Issued" ? "bg-[#4ade80]/10 border-[#4ade80]/30 text-[#4ade80]" : "bg-amber-950/30 border-amber-800/30 text-amber-400"
                  }`}>
                    {c.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <button className="px-3 py-1.5 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-[#8899b4] text-[10px] font-bold hover:text-white hover:border-[#d4a017]">
                    View Certificate
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
