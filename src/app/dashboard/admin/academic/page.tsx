"use client";

import { LearningAnalyticsService } from "@/lib/institutionOS/LearningAnalyticsService";

const modules = LearningAnalyticsService.getModuleEffectiveness();
const health = LearningAnalyticsService.getCurriculumHealth();

function ScoreBar({ value, max = 100, color }: { value: number; max?: number; color: string }) {
  return (
    <div className="h-1.5 bg-slate-100 rounded-full flex-1 overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${(value / max) * 100}%`, backgroundColor: color }}
      />
    </div>
  );
}

export default function LearningAnalyticsDashboardPage() {
  const trendConfig = {
    Rising: { color: "#15803D", bg: "#F0FDF4", border: "border-[#15803D]/20", icon: "↑" },
    Stable: { color: "#15803D", bg: "#F0FDF4", border: "border-[#15803D]/20", icon: "→" },
    Declining: { color: "#DC2626", bg: "#FEF2F2", border: "border-red-200", icon: "↓" },
  }[health.engagementTrend];

  const healthCards = [
    { label: "Curriculum Health", value: health.overallHealth, color: "#15803D", icon: "🏛" },
    { label: "Content Quality", value: health.contentQuality, color: "#15803D", icon: "📚" },
    { label: "Assessment Quality", value: health.assessmentQuality, color: "#15803D", icon: "📝" },
    { label: "Learner Satisfaction", value: health.learnerSatisfaction, color: "#15803D", icon: "⭐" },
    { label: "Graduation Forecast", value: health.graduationForecast, color: "#15803D", icon: "🎓" },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header — IEDS v2.0 */}
      <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-3xl shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] text-xs font-extrabold flex items-center gap-1.5 uppercase tracking-wider">
            Academic Intelligence
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
          Institutional Learning Analytics
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Academic quality metrics, module effectiveness, and programme health indicators.
        </p>
      </div>

      {/* Curriculum Health Snapshot */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="text-[11px] font-extrabold text-[#15803D] tracking-widest uppercase mb-1">
              Curriculum Health Snapshot
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black text-[#0F172A]">{health.overallHealth}</span>
              <span className="text-sm font-bold text-slate-400">/100</span>
            </div>
          </div>
          <div className={`px-4 py-2 rounded-2xl ${trendConfig.bg} border ${trendConfig.border} flex items-center gap-2 text-xs font-extrabold`} style={{ color: trendConfig.color }}>
            <span className="text-sm">{trendConfig.icon}</span>
            <span>Engagement {health.engagementTrend}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {healthCards.map((c) => (
            <div key={c.label} className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <div className="text-lg">{c.icon}</div>
              <div className="text-2xl font-black text-[#0F172A]">{c.value}%</div>
              <div className="text-[11px] font-bold text-slate-500">{c.label}</div>
              <ScoreBar value={c.value} color={c.color} />
            </div>
          ))}
        </div>
      </div>

      {/* Module Effectiveness Table */}
      <div className="bg-white border border-slate-200 rounded-3xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 bg-slate-50 flex items-center justify-between">
          <h2 className="text-xs font-extrabold text-[#15803D] uppercase tracking-widest">
            Module Effectiveness Report
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider">
                {["Module", "Completion Rate", "Avg Grade", "Drop-off %", "Satisfaction", "Faculty Score"].map((h) => (
                  <th key={h} className="px-5 py-3.5 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs text-[#0F172A]">
              {modules.map((mod) => (
                <tr key={mod.moduleId} className="hover:bg-slate-50 transition-colors">
                  <td className="px-5 py-4">
                    <div className="font-extrabold text-[#0F172A]">{mod.moduleTitle}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{mod.moduleId}</div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-[#15803D]">{mod.completionRate}%</span>
                      <ScoreBar value={mod.completionRate} color="#15803D" />
                    </div>
                  </td>
                  <td className="px-5 py-4 font-extrabold text-[#15803D]">{mod.avgGrade}%</td>
                  <td className="px-5 py-4 font-extrabold text-slate-700">{mod.dropOffRate}%</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-[#15803D]">{mod.satisfactionScore}%</span>
                      <ScoreBar value={mod.satisfactionScore} color="#15803D" />
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-[#15803D]">{mod.facultyEffectivenessScore}%</span>
                      <ScoreBar value={mod.facultyEffectivenessScore} color="#15803D" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
