'use client';

import React, { useState } from 'react';
import { Compass, TrendingUp, Clock, CheckCircle2, Loader2, Circle, DollarSign } from 'lucide-react';
import { CareerPathwayService, LearningJourneyService } from '@/lib/institutionOS';

export default function StudentCareerPathwaysPage() {
  const pathways = CareerPathwayService.getPathways();
  const journey = LearningJourneyService.getJourneyRoadmap('learner-101');
  const [selectedPathway, setSelectedPathway] = useState<string>(pathways[0].id);

  const activePw = pathways.find(p => p.id === selectedPathway) || pathways[0];

  return (
    <div className="space-y-6 pb-12">
      {/* Page Header */}
      <div className="p-6 sm:p-8 bg-gradient-to-br from-[#15803D] to-[#0F172A] rounded-3xl shadow-xl">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-white/15 border border-white/30 text-white text-xs font-extrabold flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            CAREER PATHWAYS
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Career <span className="text-[#D4A017]">Pathways Explorer</span>
        </h1>
        <p className="text-sm text-white/70 mt-1">
          Personal Lifelong Learning Roadmap &amp; Target Role Alignment
        </p>
      </div>

      {/* Pathway Selector */}
      <div className="flex flex-wrap gap-2">
        {pathways.map((pw) => (
          <button
            key={pw.id}
            onClick={() => setSelectedPathway(pw.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all ${
              selectedPathway === pw.id
                ? 'bg-[#15803D] text-white border-[#15803D] shadow-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:border-[#15803D]/30 hover:text-[#15803D]'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            {pw.roleName}
          </button>
        ))}
      </div>

      {/* Pathway Overview Card */}
      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-black text-[#0F172A]">{activePw.roleName} Pathway</h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">{activePw.description}</p>
          </div>
          <div className="shrink-0 p-4 bg-[#FEFCE8] rounded-2xl border border-[#D4A017]/30 text-right">
            <div className="text-2xl font-black text-[#D4A017]">
              ${activePw.averageSalaryUSD.toLocaleString()}/yr
            </div>
            <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mt-1">
              Average African Salary
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#F0FDF4] border border-[#15803D]/20 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#15803D]/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-[#15803D]" />
            </div>
            <div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider">Market Demand</div>
              <div className="text-sm font-black text-[#15803D] mt-0.5">● {activePw.marketDemandLevel}</div>
            </div>
          </div>
          <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
              <Clock className="w-5 h-5 text-slate-600" />
            </div>
            <div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider">Est. Completion</div>
              <div className="text-sm font-black text-[#0F172A] mt-0.5">{activePw.estimatedCompletionWeeks} Weeks</div>
            </div>
          </div>
          <div className="bg-[#FEFCE8] border border-[#D4A017]/30 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white border border-[#D4A017]/20 flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-[#D4A017]" />
            </div>
            <div>
              <div className="text-[11px] text-slate-500 uppercase tracking-wider">Your Progress</div>
              <div className="text-sm font-black text-[#D4A017] mt-0.5">{journey.completionPercent}% Complete</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-500">
            <span>Overall Journey Progress</span>
            <span className="font-bold text-[#0F172A]">{journey.completionPercent}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{ width: `${journey.completionPercent}%`, background: 'linear-gradient(90deg, #15803D, #D4A017)' }}
            />
          </div>
        </div>

        {/* Milestone Timeline */}
        <div>
          <h3 className="text-xs font-black text-[#D4A017] uppercase tracking-widest mb-4">
            Learning Milestones
          </h3>
          <div className="space-y-3">
            {journey.milestones.map((m) => {
              const isCompleted = m.status === 'COMPLETED';
              const isInProgress = m.status === 'IN_PROGRESS';
              return (
                <div
                  key={m.id}
                  className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                    isCompleted
                      ? 'bg-[#F0FDF4] border-[#15803D]/20'
                      : isInProgress
                      ? 'bg-[#FEFCE8] border-[#D4A017]/30'
                      : 'bg-[#F8FAFC] border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isCompleted ? (
                      <CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0" />
                    ) : isInProgress ? (
                      <Loader2 className="w-5 h-5 text-[#D4A017] shrink-0 animate-spin" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 shrink-0" />
                    )}
                    <div>
                      <div className={`text-sm font-semibold ${isCompleted ? 'text-[#15803D]' : isInProgress ? 'text-[#D4A017]' : 'text-[#0F172A]'}`}>
                        {m.title}
                      </div>
                      <div className="text-[11px] text-slate-500 mt-0.5">Target: {m.targetCompetency}</div>
                    </div>
                  </div>
                  <span className="text-xs text-slate-400 shrink-0">{m.targetDate}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
