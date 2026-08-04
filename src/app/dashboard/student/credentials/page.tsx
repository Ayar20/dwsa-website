"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Award, ShieldCheck, CheckCircle2, ExternalLink, QrCode, Lock,
  Search, Download, Eye, Sparkles, Building2, Cpu
} from "lucide-react";
import { CredentialService } from "@/lib/institutionOS/CredentialService";

export default function DigitalCredentialWalletPage() {
  const credentials = CredentialService.getStudentCredentials("std_01");
  const [search, setSearch] = useState("");

  const filtered = credentials.filter(
    (c) => c.title.toLowerCase().includes(search.toLowerCase()) || c.verificationCode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#4ade80]/15 text-[#4ade80] text-[9px] font-black uppercase">DIGITAL WALLET</span>
            <span className="text-[10px] text-[#8899b4]">InstitutionOS v3.5</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">Digital Credential Wallet</h2>
          <p className="text-xs text-[#8899b4]">Your lifelong verifiable academic diplomas, competency certificates, and cryptographic badges</p>
        </div>
        <Link
          href="/dashboard/student/transcript"
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#d4a017] text-[#030e1f] text-xs font-extrabold hover:bg-[#b8891a] transition-all shrink-0"
        >
          <Award className="w-4 h-4" /> View Digital Transcript
        </Link>
      </div>

      {/* Blockchain Verification Status Card */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0d1628] via-[#061428] to-[#030e1f] border border-[#d4a017]/30 p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#d4a017]/15 border border-[#d4a017]/40 text-[#d4a017] flex items-center justify-center shrink-0">
            <Cpu className="w-7 h-7" />
          </div>
          <div>
            <span className="text-[9px] font-black text-[#d4a017] uppercase tracking-wider">Blockchain Verification Adapter</span>
            <h3 className="text-base font-extrabold text-white">Cryptographic Hash Verification Engine Active</h3>
            <p className="text-xs text-[#8899b4]">Credentials contain immutable cryptographic hashes ready for Polygon / Enterprise blockchain verification.</p>
          </div>
        </div>
        <span className="px-3.5 py-1.5 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80] text-xs font-black shrink-0">
          ✓ 100% VERIFIED REGISTRY
        </span>
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8899b4]" />
        <input
          type="search"
          placeholder="Search credentials by title or code..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#061428] border border-[#1a2f4a] text-xs text-white placeholder-[#8899b4] focus:outline-none focus:border-[#d4a017]"
        />
      </div>

      {/* Credentials List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map((c) => (
          <div key={c.id} className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4 hover:border-[#d4a017]/40 transition-all shadow-lg flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded bg-[#d4a017]/15 text-[#d4a017] text-[9px] font-black uppercase">
                  {c.certificateType}
                </span>
                <span className="px-2 py-0.5 rounded bg-[#4ade80]/10 text-[#4ade80] text-[8px] font-black uppercase">
                  {c.verificationStatus}
                </span>
              </div>

              <h3 className="text-sm font-extrabold text-white leading-snug">{c.title}</h3>
              <p className="text-[10px] text-[#8899b4]">Issued by: {c.issuedBy} · {c.issuedAt}</p>
            </div>

            <div className="pt-4 border-t border-[#1a2f4a] space-y-2">
              <div className="flex items-center justify-between text-[10px] text-[#8899b4]">
                <span>Code: <strong className="text-white font-mono">{c.verificationCode}</strong></span>
                <QrCode className="w-3.5 h-3.5 text-[#d4a017]" />
              </div>
              <p className="text-[9px] font-mono text-[#8899b4] truncate">Hash: {c.cryptographicHash}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
