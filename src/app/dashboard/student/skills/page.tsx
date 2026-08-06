'use client';

import React, { useState } from 'react';
import { BadgeCheck, Target, FolderOpen, Award, CheckCircle2, ExternalLink } from 'lucide-react';
import { SkillsPassportService, SkillsAssessmentService, CompetencyEvidenceService, MicroCredentialService } from '@/lib/institutionOS';

export default function StudentSkillsPassportPage() {
  const [activeTab, setActiveTab] = useState<'passport' | 'assessments' | 'evidence' | 'badges'>('passport');
  const passport = SkillsPassportService.getPassportForLearner('learner-101');
  const assessments = SkillsAssessmentService.getAssessmentsForLearner('learner-101');
  const evidence = CompetencyEvidenceService.getEvidenceList('learner-101');
  const badges = MicroCredentialService.getBadgesForLearner('learner-101');

  const tabs = [
    { key: 'passport' as const, label: 'Skills Passport', icon: BadgeCheck },
    { key: 'assessments' as const, label: 'Competency Radar', icon: Target },
    { key: 'evidence' as const, label: 'Verified Evidence', icon: FolderOpen },
    { key: 'badges' as const, label: 'Micro Credentials', icon: Award },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header — IEDS v2.0 */}
      <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] text-xs font-extrabold flex items-center gap-1.5">
            <BadgeCheck className="w-3.5 h-3.5" aria-hidden="true" />
            SKILLS PASSPORT
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          Digital Skills Passport
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Verified Competencies, Learning History &amp; Career Readiness Score
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                isActive
                  ? 'bg-[#15803D] text-white border-[#15803D] shadow-sm'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-[#15803D]/30 hover:text-[#15803D]'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* PASSPORT TAB */}
      {activeTab === 'passport' && (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div>
              <div className="text-[11px] font-black text-[#D4A017] tracking-widest uppercase mb-1">
                Digital Skills Passport
              </div>
              <h2 className="text-2xl font-black text-[#0F172A]">{passport.learnerName}</h2>
              <p className="text-sm text-slate-500 mt-1">
                {passport.institutionName} — <span className="font-mono text-xs">{passport.passportId}</span>
              </p>
            </div>
            <div className="shrink-0 text-right p-4 bg-[#F0FDF4] rounded-2xl border border-[#15803D]/20">
              <div className="text-4xl font-black text-[#15803D]">{passport.careerReadinessScore}%</div>
              <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-1">
                Career Readiness
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Verified Competencies', value: passport.verifiedCompetenciesCount, color: '#15803D' },
              { label: 'Micro Credentials', value: passport.microCredentialsCount, color: '#D4A017' },
              { label: 'Industry Certifications', value: passport.industryCertificationsCount, color: '#15803D' },
              { label: 'Maturity Level', value: passport.overallMaturityLevel, color: '#0F172A' },
            ].map((stat) => (
              <div key={stat.label} className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-4 text-center">
                <div className="text-xl font-black" style={{ color: stat.color }}>{stat.value}</div>
                <div className="text-[11px] text-slate-500 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-3">
            <span className="text-xs text-slate-400">Issued: {passport.issuedDate}</span>
            <a
              href={passport.qrVerificationUrl}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-bold text-[#15803D] flex items-center gap-1.5 hover:underline"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Verify Cryptographic Proof
            </a>
          </div>
        </div>
      )}

      {/* ASSESSMENTS TAB */}
      {activeTab === 'assessments' && (
        <div className="space-y-4">
          {assessments.map((a) => (
            <div key={a.skillId} className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-base font-bold text-[#0F172A]">{a.skillName}</h3>
                  <span className="text-xs text-slate-500">{a.gapAnalysis}</span>
                </div>
                <span className="text-2xl font-black text-[#15803D]">{a.verifiedScore}%</span>
              </div>

              <div className="mb-3">
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${a.verifiedScore}%`, background: 'linear-gradient(90deg, #15803D, #D4A017)' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                {[
                  { label: 'Self Score', value: `${a.selfScore}%`, color: '#0F172A' },
                  { label: 'Faculty Score', value: `${a.facultyScore}%`, color: '#0F172A' },
                  { label: 'Employer Score', value: `${a.employerScore}%`, color: '#0F172A' },
                  { label: 'AI Score', value: `${a.aiScore}%`, color: '#D4A017' },
                ].map((item) => (
                  <div key={item.label} className="bg-[#F8FAFC] rounded-xl p-3 text-center border border-slate-100">
                    <div className="text-[10px] text-slate-500 mb-1">{item.label}</div>
                    <div className="font-black" style={{ color: item.color }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* EVIDENCE TAB */}
      {activeTab === 'evidence' && (
        <div className="space-y-3">
          {evidence.map((e) => (
            <div key={e.id} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm flex items-start justify-between gap-4">
              <div>
                <h3 className="text-sm font-bold text-[#0F172A] mb-1">{e.title}</h3>
                <p className="text-xs text-slate-500">{e.description}</p>
                <div className="flex gap-2 mt-2 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md bg-[#FEFCE8] border border-[#D4A017]/30 text-[#D4A017] text-[10px] font-bold">
                    {e.evidenceType}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] text-[10px] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5" /> {e.verificationBadge}
                  </span>
                </div>
              </div>
              {e.externalLink && (
                <a
                  href={e.externalLink}
                  target="_blank"
                  rel="noreferrer"
                  className="shrink-0 text-xs font-bold text-[#15803D] hover:underline flex items-center gap-1"
                >
                  View <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      )}

      {/* BADGES TAB */}
      {activeTab === 'badges' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((b) => (
            <div key={b.id} className="bg-white border border-slate-200 rounded-2xl p-6 text-center shadow-sm hover:border-[#D4A017]/40 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-[#FEFCE8] border border-[#D4A017]/30 flex items-center justify-center mx-auto mb-3">
                <Award className="w-7 h-7 text-[#D4A017]" />
              </div>
              <h3 className="text-sm font-bold text-[#0F172A] mb-1">{b.badgeName}</h3>
              <span className="text-xs font-black text-[#D4A017] uppercase tracking-wider">{b.level} LEVEL</span>
              <div className="text-xs text-slate-500 mt-3">Issuer: {b.issuer}</div>
              <div className="text-[10px] text-slate-400 mt-1 font-mono truncate">{b.verificationHash}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
