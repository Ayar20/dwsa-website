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
    Completed: { color: "#15803D", bg: "#F0FDF4", border: "#15803D/20", icon: "✓" },
    "In Progress": { color: "#D4A017", bg: "#FEFCE8", border: "#D4A017/30", icon: "▶" },
    Upcoming: { color: "#64748B", bg: "#F8FAFC", border: "#E2E8F0", icon: "○" },
  }[status];

  return (
    <div style={{ background: statusConfig.bg, border: `1px solid ${statusConfig.border}`, borderRadius: 12, padding: "14px 18px", marginBottom: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
        <div style={{ width: 26, height: 26, borderRadius: "50%", background: statusConfig.bg, border: `2px solid ${statusConfig.color}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: statusConfig.color, fontWeight: 800, flexShrink: 0 }}>{statusConfig.icon}</div>
        <div style={{ flex: 1 }}>
          <div style={{ color: "#0F172A", fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{taskTitle}</div>
          <div style={{ color: "#64748B", fontSize: 11 }}>{day} · {targetMinutes} min target</div>
        </div>
        <div style={{ color: statusConfig.color, fontSize: 12, fontWeight: 800 }}>{status === "Upcoming" ? "--" : `${pct}%`}</div>
      </div>
      {status !== "Upcoming" && (
        <div style={{ height: 6, background: "#E2E8F0", borderRadius: 3 }}>
          <div style={{ height: "100%", width: `${pct}%`, background: "#15803D", borderRadius: 3, transition: "width 0.4s" }} />
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
  const priorityColor = { High: "#D4A017", Medium: "#15803D", Low: "#64748B" }[priority];
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 12, padding: "16px 18px", marginBottom: 12, display: "flex", gap: 14, alignItems: "flex-start", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
      <div style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }}>{icons[type]}</div>
      <div style={{ flex: 1 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4, flexWrap: "wrap" }}>
          <span style={{ color: "#0F172A", fontSize: 14, fontWeight: 700 }}>{title}</span>
          <span style={{ background: `${priorityColor}15`, color: priorityColor, border: `1px solid ${priorityColor}30`, borderRadius: 20, padding: "2px 10px", fontSize: 10, fontWeight: 800 }}>{priority}</span>
        </div>
        <div style={{ color: "#475569", fontSize: 12, lineHeight: 1.6 }}>{rationale}</div>
      </div>
      <div style={{ color: "#D4A017", fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{estimatedMinutes}m</div>
    </div>
  );
}

interface MiniBarProps { label: string; minutes: number; max: number; }
function MiniBar({ label, minutes, max }: MiniBarProps) {
  const pct = max > 0 ? Math.round((minutes / max) * 100) : 0;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
      <div style={{ height: 80, width: 24, background: "#F1F5F9", borderRadius: 6, position: "relative", display: "flex", alignItems: "flex-end" }}>
        <div style={{ width: "100%", height: `${pct}%`, background: "#15803D", borderRadius: 6, transition: "height 0.5s ease" }} />
      </div>
      <span style={{ color: "#64748B", fontSize: 10, fontWeight: 700 }}>{label}</span>
      <span style={{ color: "#0F172A", fontSize: 10, fontWeight: 800 }}>{minutes}m</span>
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
    { label: "Study Streak", value: `${streakDays} Days`, icon: "🔥", color: "#D4A017" },
    { label: "Today", value: `${dailyMinutesToday} min`, icon: "⏱", color: "#15803D" },
    { label: "This Week", value: `${weeklyMinutes} min`, icon: "📅", color: "#15803D" },
    { label: "Consistency", value: `${consistencyScore}%`, icon: "💪", color: "#15803D" },
    { label: "Programme ETA", value: `${completionForecastDays} days`, icon: "🎯", color: "#D4A017" },
  ];

  return (
    <div>
      {/* Stat Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 14, marginBottom: 24 }}>
        {statCards.map((s) => (
          <div key={s.label} style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 14, padding: "16px 18px", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ color: s.color, fontSize: 22, fontWeight: 800, marginBottom: 2 }}>{s.value}</div>
            <div style={{ color: "#64748B", fontSize: 11, fontWeight: 700 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Weekly Activity Bar Chart */}
      <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 16, padding: "20px 24px", marginBottom: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
        <div style={{ color: "#15803D", fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>Weekly Study Activity</div>
        <div style={{ display: "flex", gap: 18, alignItems: "flex-end", justifyContent: "center" }}>
          {productivityPattern.map((p) => <MiniBar key={p.label} label={p.label} minutes={p.minutes} max={maxMinutes} />)}
        </div>
      </div>

      {/* Tab Toggle */}
      <div style={{ display: "flex", background: "#F1F5F9", borderRadius: 10, padding: 4, marginBottom: 20 }}>
        {(["plan", "recs"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{ flex: 1, padding: "10px 0", background: tab === t ? "#15803D" : "transparent", color: tab === t ? "#FFFFFF" : "#64748B", border: "none", borderRadius: 8, cursor: "pointer", fontSize: 13, fontWeight: 800, transition: "all 0.2s" }}>
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
