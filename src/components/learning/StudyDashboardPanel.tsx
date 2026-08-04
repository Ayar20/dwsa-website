"use client";

import { useState } from "react";

interface StudyGoalItemProps {
  day: string;
  targetMinutes: number;
  completedMinutes: number;
  taskTitle: string;
  status: "Completed" | "In Progress" | "Upcoming";
}

function StudyGoalItem({ day, targetMinutes, completedMinutes, taskTitle, status }: StudyGoalItemProps) {
  const pct = Math.min(100, Math.round((completedMinutes / targetMinutes) * 100));
  const statusConfig = {
    Completed: { color: "#4ade80", bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.25)", icon: "✓" },
    "In Progress": { color: "#d4a017", bg: "rgba(212,160,23,0.1)", border: "rgba(212,160,23,0.25)", icon: "▶" },
    Upcoming: { color: "#6b7a94", bg: "rgba(255,255,255,0.03)", border: "rgba(255,255,255,0.08)", icon: "○" },
  }[status];

  return (
    <div style={{ background: statusConfig.bg, border: `1px solid ${statusConfig.border}`, borderRadius: 10, padding: "14px 16px", marginBottom: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
        <div style={{ width: 24, height: 24, borderRadius: "50%", background: statusConfig.bg, border: `2px solid ${statusConfig.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: statusConfig.color, fontWeight: 700, flexShrink: 0 }}>{statusConfig.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ color: "#f0f4ff", fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{taskTitle}</div>
          <div style={{ color: "#6b7a94", fontSize: 11 }}>{day} · {targetMinutes} min target</div>
        </div>
        <div style={{ color: statusConfig.color, fontSize: 12, fontWeight: 700 }}>{status === "Upcoming" ? "--" : `${pct}%`}</div>
      </div>
      {status !== "Upcoming" && (
        <div style={{ height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 2 }}>
          <div style={{ height: "100%", width: `${pct}%`, background: pct === 100 ? "#4ade80" : "linear-gradient(90deg,#d4a017,#f0c040)", borderRadius: 2, transition: "width 0.4s" }} />
        </div>
      )}
    </div>
  );
}

interface StudyRecommendationProps {
  type: "Lesson" | "Practice" | "Revision" | "Project" | "Rest";
  title: string;
  rationale: string;
  estimatedMinutes: number;
  priority: "High" | "Medium" | "Low";
}

function RecommendationCard({ type, title, rationale, estimatedMinutes, priority }: StudyRecommendationProps) {
  const icons = { Lesson: "📹", Practice: "⚡", Revision: "🔄", Project: "🏗️", Rest: "😴" };
  const priorityColor = { High: "#d4a017", Medium: "#4ade80", Low: "#6b7a94" }[priority];
  return (
    <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "14px 16px", marginBottom: 10, display: "flex", gap: 12, alignItems: "flex-start" }}>
      <div style={{ fontSize: 22, flexShrink: 0, marginTop: 2 }}>{icons[type]}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4, flexWrap: "wrap" }}>
          <span style={{ color: "#f0f4ff", fontSize: 13, fontWeight: 600 }}>{title}</span>
          <span style={{ background: `${priorityColor}18`, color: priorityColor, border: `1px solid ${priorityColor}40`, borderRadius: 20, padding: "1px 9px", fontSize: 10, fontWeight: 700 }}>{priority}</span>
        </div>
        <div style={{ color: "#6b7a94", fontSize: 12, lineHeight: 1.5 }}>{rationale}</div>
      </div>
      <div style={{ color: "#d4a017", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>{estimatedMinutes}m</div>
    </div>
  );
}

interface MiniBarProps { label: string; minutes: number; max: number; }
function MiniBar({ label, minutes, max }: MiniBarProps) {
  const pct = max > 0 ? Math.round((minutes / max) * 100) : 0;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ height: 80, width: 24, background: "rgba(255,255,255,0.06)", borderRadius: 4, position: "relative", display: "flex", alignItems: "flex-end" }}>
        <div style={{ width: "100%", height: `${pct}%`, background: "linear-gradient(180deg,#d4a017,#b88a0e)", borderRadius: 4, transition: "height 0.5s ease" }} />
      </div>
      <span style={{ color: "#6b7a94", fontSize: 10, fontWeight: 600 }}>{label}</span>
      <span style={{ color: "#aab4c4", fontSize: 10 }}>{minutes}m</span>
    </div>
  );
}

interface StudyDashboardPanelProps {
  streakDays: number;
  weeklyMinutes: number;
  dailyMinutesToday: number;
  consistencyScore: number;
  completionForecastDays: number;
  productivityPattern: { label: string; minutes: number }[];
  studyGoals: { id: string; day: string; targetMinutes: number; completedMinutes: number; taskTitle: string; status: "Completed" | "In Progress" | "Upcoming" }[];
  recommendations: StudyRecommendationProps[];
}

export function StudyDashboardPanel({
  streakDays, weeklyMinutes, dailyMinutesToday, consistencyScore,
  completionForecastDays, productivityPattern, studyGoals, recommendations,
}: StudyDashboardPanelProps) {
  const [tab, setTab] = useState<"plan" | "recs">("plan");
  const maxMinutes = Math.max(...productivityPattern.map((p) => p.minutes), 1);

  const statCards = [
    { label: "Study Streak", value: `${streakDays} Days`, icon: "🔥", color: "#d4a017" },
    { label: "Today", value: `${dailyMinutesToday} min`, icon: "⏱", color: "#4ade80" },
    { label: "This Week", value: `${weeklyMinutes} min`, icon: "📅", color: "#d4a017" },
    { label: "Consistency", value: `${consistencyScore}%`, icon: "💪", color: "#4ade80" },
    { label: "Programme ETA", value: `${completionForecastDays} days`, icon: "🎯", color: "#d4a017" },
  ];

  return (
    <div>
      {/* Stat Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", gap: 12, marginBottom: 20 }}>
        {statCards.map((s) => (
          <div key={s.label} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "14px 16px" }}>
            <div style={{ fontSize: 20, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ color: s.color, fontSize: 20, fontWeight: 800, marginBottom: 2 }}>{s.value}</div>
            <div style={{ color: "#6b7a94", fontSize: 11, fontWeight: 600 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Weekly Activity Bar Chart */}
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "16px 20px", marginBottom: 20 }}>
        <div style={{ color: "#aab4c4", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Weekly Study Activity</div>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-end", justifyContent: "center" }}>
          {productivityPattern.map((p) => <MiniBar key={p.label} label={p.label} minutes={p.minutes} max={maxMinutes} />)}
        </div>
      </div>

      {/* Tab Toggle */}
      <div style={{ display: "flex", background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: 3, marginBottom: 16 }}>
        {(["plan", "recs"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "8px 0", background: tab === t ? "#d4a017" : "transparent", color: tab === t ? "#030e1f" : "#6b7a94", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 700, transition: "all 0.2s" }}>
            {t === "plan" ? "📅 Weekly Plan" : "💡 AI Recommendations"}
          </button>
        ))}
      </div>

      {tab === "plan" && (
        <div>
          {studyGoals.map((g) => <StudyGoalItem key={g.id} {...g} />)}
        </div>
      )}

      {tab === "recs" && (
        <div>
          {recommendations.map((r, i) => <RecommendationCard key={i} {...r} />)}
        </div>
      )}
    </div>
  );
}
