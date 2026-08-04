"use client";

import { LearningAnalyticsService } from "@/lib/institutionOS/LearningAnalyticsService";

const modules = LearningAnalyticsService.getModuleEffectiveness();
const health = LearningAnalyticsService.getCurriculumHealth();

function ScoreBar({ value, max = 100, color }: { value: number; max?: number; color: string }) {
  return (
    <div style={{ height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 3, flex: 1 }}>
      <div style={{ height: "100%", width: `${(value / max) * 100}%`, background: color, borderRadius: 3, transition: "width 0.5s ease" }} />
    </div>
  );
}

export default function LearningAnalyticsDashboardPage() {
  const trendConfig = {
    Rising: { color: "#4ade80", icon: "↑" },
    Stable: { color: "#d4a017", icon: "→" },
    Declining: { color: "#f87171", icon: "↓" },
  }[health.engagementTrend];

  const healthCards = [
    { label: "Curriculum Health", value: health.overallHealth, color: "#d4a017", icon: "🏛" },
    { label: "Content Quality", value: health.contentQuality, color: "#4ade80", icon: "📚" },
    { label: "Assessment Quality", value: health.assessmentQuality, color: "#d4a017", icon: "📝" },
    { label: "Learner Satisfaction", value: health.learnerSatisfaction, color: "#4ade80", icon: "⭐" },
    { label: "Graduation Forecast", value: health.graduationForecast, color: "#d4a017", icon: "🎓" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#030e1f", color: "#f0f4ff", fontFamily: "'Inter','Outfit',sans-serif", padding: "24px 28px" }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#f0f4ff", margin: "0 0 4px" }}>Institutional Learning Analytics</h1>
        <p style={{ color: "#6b7a94", fontSize: 14, margin: 0 }}>Academic quality metrics, module effectiveness, and programme health indicators.</p>
      </div>

      {/* Curriculum Health Snapshot */}
      <div style={{ background: "#060f21", border: "1px solid rgba(212,160,23,0.2)", borderRadius: 12, padding: "20px 24px", marginBottom: 24 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
          <div>
            <div style={{ color: "#d4a017", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Curriculum Health Snapshot</div>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ color: "#f0f4ff", fontSize: 36, fontWeight: 900 }}>{health.overallHealth}</span>
              <span style={{ color: "#6b7a94", fontSize: 16, alignSelf: "flex-end", marginBottom: 4 }}>/100</span>
            </div>
          </div>
          <div style={{ background: `${trendConfig.color}18`, border: `1px solid ${trendConfig.color}40`, borderRadius: 20, padding: "6px 16px", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ color: trendConfig.color, fontSize: 16, fontWeight: 800 }}>{trendConfig.icon}</span>
            <span style={{ color: trendConfig.color, fontSize: 13, fontWeight: 700 }}>Engagement {health.engagementTrend}</span>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 14 }}>
          {healthCards.map((c) => (
            <div key={c.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: 20, marginBottom: 6 }}>{c.icon}</div>
              <div style={{ color: c.color, fontSize: 22, fontWeight: 800, marginBottom: 4 }}>{c.value}%</div>
              <div style={{ color: "#6b7a94", fontSize: 11, fontWeight: 600 }}>{c.label}</div>
              <div style={{ marginTop: 8 }}><ScoreBar value={c.value} color={c.color} /></div>
            </div>
          ))}
        </div>
      </div>

      {/* Module Effectiveness Table */}
      <div style={{ background: "#060f21", border: "1px solid rgba(212,160,23,0.15)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(212,160,23,0.1)", background: "#050e1e" }}>
          <div style={{ color: "#d4a017", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Module Effectiveness Report</div>
        </div>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid rgba(212,160,23,0.1)" }}>
              {["Module", "Completion Rate", "Avg Grade", "Drop-off %", "Satisfaction", "Faculty Score"].map((h) => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "#6b7a94", fontSize: 11, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", background: "#050e1e", whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {modules.map((mod, i) => (
              <tr key={mod.moduleId} style={{ borderBottom: i < modules.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none" }}>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ color: "#f0f4ff", fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{mod.moduleTitle}</div>
                  <div style={{ color: "#4a5568", fontSize: 11 }}>{mod.moduleId}</div>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: mod.completionRate >= 90 ? "#4ade80" : "#d4a017", fontWeight: 700, fontSize: 13 }}>{mod.completionRate}%</span>
                    <ScoreBar value={mod.completionRate} color={mod.completionRate >= 90 ? "#4ade80" : "#d4a017"} />
                  </div>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ color: mod.avgGrade >= 80 ? "#4ade80" : "#d4a017", fontWeight: 700, fontSize: 13 }}>{mod.avgGrade}%</span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <span style={{ color: mod.dropOffRate >= 15 ? "#f87171" : mod.dropOffRate >= 8 ? "#d4a017" : "#4ade80", fontWeight: 700, fontSize: 13 }}>{mod.dropOffRate}%</span>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: "#d4a017", fontWeight: 700, fontSize: 13 }}>{mod.satisfactionScore}%</span>
                    <ScoreBar value={mod.satisfactionScore} color="#d4a017" />
                  </div>
                </td>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ color: mod.facultyEffectivenessScore >= 93 ? "#4ade80" : "#d4a017", fontWeight: 700, fontSize: 13 }}>{mod.facultyEffectivenessScore}%</span>
                    <ScoreBar value={mod.facultyEffectivenessScore} color={mod.facultyEffectivenessScore >= 93 ? "#4ade80" : "#d4a017"} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
