"use client";

import React, { use } from "react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import {
  ShieldCheck,
  Award,
  CheckCircle2,
  XCircle,
  Building2,
  Calendar,
  Sparkles,
  ExternalLink,
  GraduationCap,
  FileCheck,
  Flame,
  Globe,
} from "lucide-react";

export default function CertificateVerificationPage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = use(params);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["verify-certificate", code],
    queryFn: async () => {
      const res = await fetch(`/api/certificates/verify/${encodeURIComponent(code)}`);
      if (!res.ok) {
        const errorJson = await res.json().catch(() => ({}));
        throw new Error(errorJson.error || "Credential verification failed");
      }
      return res.json();
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030e1f] flex flex-col items-center justify-center p-6 text-center text-white">
        <div className="relative w-16 h-16 mb-4">
          <div className="absolute inset-0 rounded-full border-4 border-[#d4a017]/20" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#d4a017] border-r-[#00d2ff] animate-spin" />
          <ShieldCheck className="w-6 h-6 text-[#d4a017] absolute inset-0 m-auto" />
        </div>
        <h1 className="text-lg font-bold text-white">Verifying Credential Authenticity</h1>
        <p className="text-xs text-[#8899b4] mt-1 font-mono">Querying DWSA DTA Senate Registry…</p>
      </div>
    );
  }

  if (isError || !data || !data.valid) {
    return (
      <div className="min-h-screen bg-[#030e1f] flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full p-8 rounded-3xl bg-[#061428] border border-red-800/40 text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-red-950/60 border border-red-800/50 flex items-center justify-center mx-auto text-red-400">
            <XCircle className="w-8 h-8" />
          </div>
          <div>
            <span className="px-3 py-1 rounded-full bg-red-950/60 border border-red-800/60 text-red-400 text-[10px] font-black uppercase tracking-wider">
              Verification Failed
            </span>
            <h1 className="text-xl font-extrabold text-white mt-3">Unverified Credential</h1>
            <p className="text-xs text-[#8899b4] mt-2 leading-relaxed">
              The verification code <code className="text-red-300 bg-red-950/80 px-2 py-0.5 rounded font-mono">{code}</code> does not match any valid record issued by DWSA Digital Technology Academy.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#0f223d] border border-slate-700 text-white text-xs font-bold hover:bg-[#1a355c] transition-all"
            >
              Return to DTA Main Site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const { credential } = data;

  return (
    <div className="min-h-screen bg-[#030e1f] py-12 px-4 flex flex-col items-center justify-center">
      <div className="max-w-2xl w-full space-y-6">
        {/* Top Institution Banner */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80] text-[10px] font-black uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" />
            Official Verified Credential
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            DWSA Digital Technology Academy
          </h1>
          <p className="text-xs text-[#8899b4]">
            Digital World Systems Africa Ltd — *"Building Africa&apos;s Digital Future"* (RC 9718724)
          </p>
        </div>

        {/* Certificate Card Badge */}
        <div className="rounded-3xl bg-[#061428] border border-[#d4a017]/40 p-8 sm:p-10 space-y-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-[#d4a017]/10 to-transparent rounded-bl-full pointer-events-none" />

          <div className="flex items-center justify-between border-b border-[#1a2f4a] pb-6">
            <div>
              <span className="text-[10px] font-mono text-[#d4a017] uppercase tracking-wider block">Academic Unit</span>
              <p className="text-sm font-extrabold text-white">{credential.school}</p>
            </div>
            <div className="px-3 py-1 rounded-full bg-[#4ade80]/15 border border-[#4ade80]/40 text-[#4ade80] text-xs font-black flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> VALID CREDENTIAL
            </div>
          </div>

          {/* Recipient Snapshot */}
          <div className="text-center space-y-3 py-4">
            <span className="text-[11px] font-semibold text-[#8899b4] uppercase tracking-widest">This certifies that</span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#d4a017] tracking-tight">
              {credential.recipientName}
            </h2>
            <p className="text-xs text-[#8899b4] leading-relaxed max-w-lg mx-auto">
              has successfully satisfied all academic requirements, module assessments, and practical AI project evaluations to be awarded the
            </p>
            <div className="p-4 rounded-2xl bg-[#030e1f] border border-[#1a2f4a] inline-block mt-2">
              <p className="text-base sm:text-lg font-black text-white">{credential.certificateType}</p>
              <p className="text-xs font-bold text-[#00d2ff] mt-0.5">{credential.programmeTitle}</p>
            </div>
          </div>

          {/* Verification Details Metadata Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#1a2f4a] text-xs">
            <div>
              <span className="text-[10px] text-[#8899b4] font-semibold uppercase block">Certificate Number</span>
              <strong className="font-mono text-white text-xs">{credential.certificateNumber}</strong>
            </div>
            <div>
              <span className="text-[10px] text-[#8899b4] font-semibold uppercase block">Verification Code</span>
              <strong className="font-mono text-[#00d2ff] text-xs">{credential.verificationCode}</strong>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[10px] text-[#8899b4] font-semibold uppercase block">Date of Issue</span>
              <strong className="text-white text-xs">{new Date(credential.issueDate).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</strong>
            </div>
          </div>

          {/* Senate Signatory */}
          <div className="flex justify-between items-end pt-4 border-t border-[#1a2f4a] text-[11px]">
            <div>
              <span className="text-[10px] text-[#8899b4] font-semibold block">Issuing Authority</span>
              <strong className="text-white">{credential.signatoryName}</strong>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-[#8899b4] font-semibold block">Operating Entity</span>
              <strong className="text-[#8899b4]">{credential.operatingEntity}</strong>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-[11px] text-[#8899b4] flex items-center justify-center gap-4">
          <Link href="/" className="hover:text-white transition-colors flex items-center gap-1">
            <Globe className="w-3.5 h-3.5" /> DTA Campus Portal
          </Link>
          <span>·</span>
          <span>Security Verified</span>
        </div>
      </div>
    </div>
  );
}
