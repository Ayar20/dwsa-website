'use client';

import React from 'react';
import { BookOpen, Users, ShieldCheck, Clock, Tag, TrendingUp } from 'lucide-react';
import { ProfessionalDevelopmentService } from '@/lib/institutionOS';

export default function StudentCPDPage() {
  const cpdRecords = ProfessionalDevelopmentService.getCPDRecords('learner-101');
  const memberships = ProfessionalDevelopmentService.getMemberships('learner-101');
  const totalCpdHours = cpdRecords.reduce((s, c) => s + c.cpdHoursEarned, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="p-6 sm:p-8 bg-gradient-to-br from-[#15803D] to-[#0F172A] rounded-3xl shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-white/15 border border-white/30 text-white text-xs font-extrabold flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5" />
            CPD CENTRE
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Continuous Professional <span className="text-[#D4A017]">Development</span>
        </h1>
        <p className="text-sm text-white/70 mt-1">
          CPD Hours Tracking, Professional Memberships &amp; Compliance Reminders
        </p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#FEFCE8] border border-[#D4A017]/30 rounded-2xl p-6 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-white border border-[#D4A017]/20 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6 text-[#D4A017]" />
          </div>
          <div>
            <div className="text-3xl font-black text-[#D4A017]">{totalCpdHours}<span className="text-base font-bold ml-1">hrs</span></div>
            <div className="text-xs text-slate-500 mt-0.5">CPD Hours Earned (2026)</div>
          </div>
        </div>
        <div className="bg-[#F0FDF4] border border-[#15803D]/20 rounded-2xl p-6 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-white border border-[#15803D]/20 flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-[#15803D]" />
          </div>
          <div>
            <div className="text-3xl font-black text-[#15803D]">{memberships.length}</div>
            <div className="text-xs text-slate-500 mt-0.5">Active Memberships</div>
          </div>
        </div>
        <div className="bg-[#F0FDF4] border border-[#15803D]/20 rounded-2xl p-6 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-2xl bg-white border border-[#15803D]/20 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-[#15803D]" />
          </div>
          <div>
            <div className="text-3xl font-black text-[#15803D]">100%</div>
            <div className="text-xs text-slate-500 mt-0.5">Compliance Status</div>
          </div>
        </div>
      </div>

      {/* CPD Activity Log */}
      <div>
        <h3 className="text-xs font-black text-[#D4A017] uppercase tracking-widest mb-4">
          CPD Activity Log
        </h3>
        <div className="space-y-3">
          {cpdRecords.map((r) => (
            <div
              key={r.id}
              className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-start justify-between gap-4"
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#F0FDF4] border border-[#15803D]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <BookOpen className="w-4 h-4 text-[#15803D]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A]">{r.activityTitle}</h4>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Provider: {r.provider} — {r.dateCompleted}
                  </div>
                  <span className="inline-block mt-2 px-2.5 py-0.5 rounded-md bg-[#FEFCE8] border border-[#D4A017]/30 text-[#D4A017] text-[10px] font-bold">
                    <Tag className="w-2.5 h-2.5 inline mr-1" />{r.category}
                  </span>
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-lg font-black text-[#15803D]">+{r.cpdHoursEarned}</div>
                <div className="text-[10px] text-slate-500">hrs</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Professional Memberships */}
      <div>
        <h3 className="text-xs font-black text-[#D4A017] uppercase tracking-widest mb-4">
          Professional Memberships
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {memberships.map((m) => (
            <div key={m.id} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-[#F0FDF4] border border-[#15803D]/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#15803D]" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#0F172A]">{m.organizationName}</h4>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Tier: <span className="font-semibold text-[#0F172A]">{m.membershipTier}</span> &nbsp;|&nbsp; ID: {m.memberId}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <span className="text-xs text-slate-400">Renewal: {m.renewalDate}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] text-[10px] font-black flex items-center gap-1">
                  ● {m.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
