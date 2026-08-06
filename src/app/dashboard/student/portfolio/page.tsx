'use client';

import React from 'react';
import { Briefcase, Star, CheckCircle2, Lightbulb, FileText } from 'lucide-react';
import { PortfolioAssessmentService, CompetencyEvidenceService } from '@/lib/institutionOS';

export default function StudentPortfolioBuilderPage() {
  const report = PortfolioAssessmentService.getReportForLearner('learner-101');
  const evidence = CompetencyEvidenceService.getEvidenceList('learner-101');

  const scoreItems = [
    { label: 'GitHub Code Quality', score: report.githubQualityScore },
    { label: 'Project Complexity', score: report.projectComplexityScore },
    { label: 'Innovation Level', score: report.innovationScore },
    { label: 'Research Depth', score: report.researchScore },
    { label: 'Technical Writing', score: report.technicalWritingScore },
    { label: 'Presentation & Demo', score: report.presentationScore },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header — IEDS v2.0 */}
      <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] text-xs font-extrabold flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5" aria-hidden="true" />
            PORTFOLIO BUILDER
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          Professional Portfolio Builder
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          GitHub Sync, Verified Projects, AI Score &amp; Portfolio Publishing
        </p>
      </div>

      {/* Portfolio Rating Banner */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-black text-[#15803D] tracking-widest uppercase mb-1">
              Portfolio Score &amp; Rank
            </div>
            <div className="text-4xl font-black text-[#0F172A]">{report.overallPortfolioScore}<span className="text-xl text-slate-400">/100</span></div>
            <p className="text-sm text-[#15803D] font-semibold mt-1 flex items-center gap-1.5">
              <Star className="w-4 h-4" />
              Top {100 - report.portfolioRankPercentile}% among African Engineering Graduates
            </p>
          </div>
          <button className="shrink-0 px-6 py-3 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white font-bold text-sm flex items-center gap-2 transition-all shadow-sm">
            <FileText className="w-4 h-4" />
            Generate Verified Resume PDF
          </button>
        </div>

        {/* Overall progress bar */}
        <div className="mt-6 space-y-1.5">
          <div className="flex justify-between text-xs text-slate-500">
            <span>Overall Portfolio Score</span>
            <span className="font-bold text-[#0F172A]">{report.overallPortfolioScore}%</span>
          </div>
          <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${report.overallPortfolioScore}%`, background: 'linear-gradient(90deg, #15803D, #D4A017)' }}
            />
          </div>
        </div>
      </div>

      {/* Score Breakdown Grid */}
      <div>
        <h3 className="text-xs font-black text-[#D4A017] uppercase tracking-widest mb-4">
          Portfolio Audit Scorecard
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {scoreItems.map((item) => (
            <div key={item.label} className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
              <div className="text-xs text-slate-500 mb-3">{item.label}</div>
              <div className="text-2xl font-black text-[#15803D] mb-3">{item.score}%</div>
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${item.score}%`,
                    background: item.score >= 80
                      ? '#15803D'
                      : item.score >= 60
                      ? '#D4A017'
                      : '#DC2626',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strengths & Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="bg-white border border-[#15803D]/20 rounded-2xl p-6 shadow-sm">
          <h4 className="text-sm font-black text-[#15803D] flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-4 h-4" /> Verified Strengths
          </h4>
          <ul className="space-y-2">
            {report.strengths.map((s: string, i: number) => (
              <li key={i} className="text-sm text-[#334155] flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] shrink-0 mt-2" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white border border-[#D4A017]/20 rounded-2xl p-6 shadow-sm">
          <h4 className="text-sm font-black text-[#D4A017] flex items-center gap-2 mb-4">
            <Lightbulb className="w-4 h-4" /> AI Recommendations
          </h4>
          <ul className="space-y-2">
            {report.recommendations.map((r: string, i: number) => (
              <li key={i} className="text-sm text-[#334155] flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A017] shrink-0 mt-2" />
                {r}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
