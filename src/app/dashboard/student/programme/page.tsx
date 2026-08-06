"use client";

import { useState } from "react";
import { CourseDeliveryService } from "@/lib/institutionOS/CourseDeliveryService";
import { LearningExperienceService } from "@/lib/institutionOS/LearningExperienceService";
import { StudyPlannerService } from "@/lib/institutionOS/StudyPlannerService";
import { StudentVideoPlayer } from "@/components/learning/StudentVideoPlayer";
import { CodingLab } from "@/components/learning/CodingLab";
import { StudyDashboardPanel } from "@/components/learning/StudyDashboardPanel";

const lessons = CourseDeliveryService.getAllLessons();
const metrics = LearningExperienceService.getMetrics();
const recommendations = LearningExperienceService.getStudyRecommendations();
const productivityPattern = LearningExperienceService.getProductivityPattern();
const weeklyGoals = StudyPlannerService.getWeeklyGoals();

const difficultyConfig = {
  Beginner: { color: "#15803D", bg: "#F0FDF4", border: "#15803D/30" },
  Intermediate: { color: "#D4A017", bg: "#FEFCE8", border: "#D4A017/30" },
  Advanced: { color: "#DC2626", bg: "#FEF2F2", border: "#DC2626/30" },
};

export default function LearningWorkspacePage() {
  const [activeLessonId, setActiveLessonId] = useState(lessons[0]?.id ?? "");
  const [activeView, setActiveView] = useState<"workspace" | "dashboard">("workspace");
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());

  const activeLesson = CourseDeliveryService.getLessonById(activeLessonId) ?? lessons[0];
  const activeLessonIndex = lessons.findIndex((l) => l.id === activeLessonId);
  const nextLesson = lessons[activeLessonIndex + 1];
  const prevLesson = lessons[activeLessonIndex - 1];

  const handleComplete = () => setCompletedLessons((prev) => { const s = new Set(prev); s.has(activeLessonId) ? s.delete(activeLessonId) : s.add(activeLessonId); return s; });
  const diff = activeLesson ? difficultyConfig[activeLesson.difficulty] : difficultyConfig.Intermediate;

  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", color: "#0F172A", fontFamily: "'Inter','Outfit',sans-serif", padding: "8px 0" }}>
      {/* Page Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#0F172A", margin: 0, marginBottom: 4 }}>My Learning Workspace</h1>
          <p style={{ color: "#64748B", fontSize: 14, margin: 0 }}>Project-First Digital Technology Programme · Full-Stack Engineering Track</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={() => setActiveView("workspace")} style={{ padding: "10px 22px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, background: activeView === "workspace" ? "#15803D" : "#FFFFFF", color: activeView === "workspace" ? "#FFFFFF" : "#64748B", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", transition: "all 0.2s" }}>
            📚 Workspace
          </button>
          <button onClick={() => setActiveView("dashboard")} style={{ padding: "10px 22px", borderRadius: 10, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, background: activeView === "dashboard" ? "#15803D" : "#FFFFFF", color: activeView === "dashboard" ? "#FFFFFF" : "#64748B", boxShadow: "0 2px 8px rgba(0,0,0,0.04)", transition: "all 0.2s" }}>
            📊 Study Dashboard
          </button>
        </div>
      </div>

      {activeView === "dashboard" && (
        <StudyDashboardPanel
          streakDays={metrics.currentStreakDays}
          weeklyMinutes={metrics.weeklyStudyMinutes}
          dailyMinutesToday={metrics.dailyStudyMinutesToday}
          consistencyScore={metrics.consistencyScore}
          completionForecastDays={metrics.completionForecastDays}
          productivityPattern={productivityPattern}
          studyGoals={weeklyGoals}
          recommendations={recommendations.map((r) => ({ type: r.type, title: r.title, rationale: r.rationale, estimatedMinutes: r.estimatedMinutes, priority: r.priority }))}
        />
      )}

      {activeView === "workspace" && (
        <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 24, alignItems: "start" }}>
          {/* Lesson Navigation Sidebar */}
          <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 16, overflow: "hidden", position: "sticky", top: 80, boxShadow: "0 4px 16px rgba(0,0,0,0.03)" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid #E2E8F0", background: "#F0FDF4" }}>
              <div style={{ color: "#15803D", fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase" }}>Programme Lessons</div>
              <div style={{ color: "#64748B", fontSize: 12, marginTop: 4, fontWeight: 600 }}>{completedLessons.size}/{lessons.length} completed</div>
              <div style={{ height: 6, background: "#E2E8F0", borderRadius: 3, marginTop: 8 }}>
                <div style={{ height: "100%", width: `${(completedLessons.size / lessons.length) * 100}%`, background: "#15803D", borderRadius: 3, transition: "width 0.4s" }} />
              </div>
            </div>
            <div style={{ padding: "8px 0" }}>
              {lessons.map((lesson) => {
                const isActive = lesson.id === activeLessonId;
                const isDone = completedLessons.has(lesson.id);
                return (
                  <button key={lesson.id} onClick={() => setActiveLessonId(lesson.id)} style={{ width: "100%", textAlign: "left", padding: "14px 20px", background: isActive ? "#F0FDF4" : "transparent", border: "none", borderLeft: `4px solid ${isActive ? "#15803D" : "transparent"}`, cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", border: `2px solid ${isDone ? "#15803D" : isActive ? "#15803D" : "#CBD5E1"}`, background: isDone ? "#15803D" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: isDone ? "#FFFFFF" : "#64748B", flexShrink: 0, marginTop: 2, fontWeight: 800 }}>{isDone ? "✓" : ""}</div>
                    <div>
                      <div style={{ color: isActive ? "#15803D" : "#0F172A", fontSize: 13, fontWeight: isActive ? 800 : 600, lineHeight: 1.4, marginBottom: 3 }}>{lesson.title}</div>
                      <div style={{ color: "#64748B", fontSize: 11 }}>{lesson.durationMinutes} min · {lesson.difficulty}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content Area */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Lesson Header */}
            {activeLesson && (
              <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 16, padding: "24px 28px", boxShadow: "0 4px 16px rgba(0,0,0,0.03)" }}>
                <div style={{ display: "flex", gap: 10, marginBottom: 14, flexWrap: "wrap" }}>
                  <span style={{ background: diff.bg, color: diff.color, border: `1px solid ${diff.border}`, borderRadius: 20, padding: "4px 14px", fontSize: 11, fontWeight: 800 }}>{activeLesson.difficulty}</span>
                  <span style={{ background: "#F1F5F9", color: "#475569", border: "1px solid #E2E8F0", borderRadius: 20, padding: "4px 14px", fontSize: 11, fontWeight: 600 }}>⏱ {activeLesson.durationMinutes} min</span>
                  {activeLesson.prerequisite && <span style={{ background: "#FEFCE8", color: "#D4A017", border: "1px solid #D4A017/30", borderRadius: 20, padding: "4px 14px", fontSize: 11, fontWeight: 700 }}>Prereq: {activeLesson.prerequisite}</span>}
                  <span style={{ background: "#F1F5F9", color: "#475569", borderRadius: 20, padding: "4px 14px", fontSize: 11, border: "1px solid #E2E8F0", fontWeight: 600 }}>{activeLesson.moduleTitle}</span>
                </div>
                <h2 style={{ color: "#0F172A", fontSize: 22, fontWeight: 800, margin: "0 0 10px" }}>{activeLesson.title}</h2>
                <p style={{ color: "#334155", fontSize: 14, lineHeight: 1.7, margin: "0 0 20px" }}>{activeLesson.description}</p>
                {/* Objectives */}
                <div style={{ background: "#F0FDF4", border: "1px solid #15803D/20", borderRadius: 12, padding: "16px 20px" }}>
                  <div style={{ color: "#15803D", fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Lesson Objectives</div>
                  <ul style={{ margin: 0, paddingLeft: 20 }}>
                    {activeLesson.checklist.map((obj, i) => (
                      <li key={i} style={{ color: "#334155", fontSize: 13, lineHeight: 1.8, fontWeight: 500 }}>{obj}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Video Player */}
            {activeLesson && (
              <StudentVideoPlayer
                lessonId={activeLesson.id}
                title={activeLesson.title}
                videoUrl={activeLesson.videoUrl}
                transcript={activeLesson.transcript}
                nextLessonTitle={nextLesson?.title}
                onLessonComplete={handleComplete}
                onNextLesson={() => nextLesson && setActiveLessonId(nextLesson.id)}
                onPrevLesson={() => prevLesson && setActiveLessonId(prevLesson.id)}
              />
            )}

            {/* CodingLab */}
            {activeLesson && (
              <CodingLab
                lessonId={activeLesson.id}
                title={`${activeLesson.title} — Practical Lab`}
                instructions={`Use the concepts from this lesson to complete the following practical implementation. Clone the starter repository and follow each task step-by-step. ${activeLesson.description}`}
                starterTemplateUrl={activeLesson.starterTemplateUrl}
                expectedOutput={activeLesson.expectedOutput ?? "See rubric for detailed grading criteria."}
                rubric={[
                  "Code structure follows Next.js App Router file-system conventions correctly.",
                  "TypeScript types are explicitly defined with no implicit 'any' usage.",
                  "Component responsibilities are cleanly separated — no mixed concerns.",
                  "All async data fetching is performed at the Server Component layer.",
                  "Pull Request description clearly explains implementation decisions.",
                ]}
                instructorTip="Run `npx next dev` locally first and inspect the Network tab to verify zero client-side data fetches before submitting your PR."
                tasks={activeLesson.checklist.map((desc, i) => ({ id: `TASK-${i}`, description: desc, completed: false }))}
              />
            )}

            {/* Downloadable Resources */}
            {activeLesson && activeLesson.resources.length > 0 && (
              <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: 16, padding: "20px 24px", boxShadow: "0 4px 16px rgba(0,0,0,0.03)" }}>
                <div style={{ color: "#15803D", fontSize: 12, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>📎 Lesson Resources</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {activeLesson.resources.map((res) => (
                    <a key={res.id} href={res.url} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 18px", background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 10, textDecoration: "none", transition: "border-color 0.2s" }}>
                      <span style={{ fontSize: 20 }}>{res.type === "PDF" ? "📄" : "📦"}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: "#0F172A", fontSize: 13, fontWeight: 700 }}>{res.name}</div>
                        <div style={{ color: "#64748B", fontSize: 11 }}>{res.size}</div>
                      </div>
                      <span style={{ color: "#15803D", fontSize: 12, fontWeight: 800 }}>↓ Download</span>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
