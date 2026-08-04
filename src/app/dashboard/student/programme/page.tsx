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
  Beginner: { color: "#4ade80", bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.25)" },
  Intermediate: { color: "#d4a017", bg: "rgba(212,160,23,0.1)", border: "rgba(212,160,23,0.25)" },
  Advanced: { color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.25)" },
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
    <div style={{ minHeight: "100vh", background: "#030e1f", color: "#f0f4ff", fontFamily: "'Inter','Outfit',sans-serif", padding: "24px 28px" }}>
      {/* Page Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: "#f0f4ff", margin: 0, marginBottom: 4 }}>My Learning Workspace</h1>
          <p style={{ color: "#6b7a94", fontSize: 14, margin: 0 }}>Project-First Digital Technology Programme · Full-Stack Engineering Track</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setActiveView("workspace")} style={{ padding: "9px 20px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, background: activeView === "workspace" ? "#d4a017" : "rgba(255,255,255,0.06)", color: activeView === "workspace" ? "#030e1f" : "#aab4c4", transition: "all 0.2s" }}>
            📚 Workspace
          </button>
          <button onClick={() => setActiveView("dashboard")} style={{ padding: "9px 20px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 700, fontSize: 13, background: activeView === "dashboard" ? "#d4a017" : "rgba(255,255,255,0.06)", color: activeView === "dashboard" ? "#030e1f" : "#aab4c4", transition: "all 0.2s" }}>
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
        <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 20, alignItems: "start" }}>
          {/* Lesson Navigation Sidebar */}
          <div style={{ background: "#060f21", border: "1px solid rgba(212,160,23,0.15)", borderRadius: 12, overflow: "hidden", position: "sticky", top: 24 }}>
            <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(212,160,23,0.1)", background: "#050e1e" }}>
              <div style={{ color: "#d4a017", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>Programme Lessons</div>
              <div style={{ color: "#6b7a94", fontSize: 11, marginTop: 4 }}>{completedLessons.size}/{lessons.length} completed</div>
              <div style={{ height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 2, marginTop: 8 }}>
                <div style={{ height: "100%", width: `${(completedLessons.size / lessons.length) * 100}%`, background: "linear-gradient(90deg,#d4a017,#4ade80)", borderRadius: 2, transition: "width 0.4s" }} />
              </div>
            </div>
            <div style={{ padding: "8px 0" }}>
              {lessons.map((lesson) => {
                const isActive = lesson.id === activeLessonId;
                const isDone = completedLessons.has(lesson.id);
                return (
                  <button key={lesson.id} onClick={() => setActiveLessonId(lesson.id)} style={{ width: "100%", textAlign: "left", padding: "12px 16px", background: isActive ? "rgba(212,160,23,0.1)" : "transparent", border: "none", borderLeft: `3px solid ${isActive ? "#d4a017" : "transparent"}`, cursor: "pointer", transition: "all 0.2s", display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${isDone ? "#4ade80" : isActive ? "#d4a017" : "rgba(255,255,255,0.2)"}`, background: isDone ? "rgba(74,222,128,0.15)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, color: isDone ? "#4ade80" : "#6b7a94", flexShrink: 0, marginTop: 2, fontWeight: 700 }}>{isDone ? "✓" : ""}</div>
                    <div>
                      <div style={{ color: isActive ? "#d4a017" : "#aab4c4", fontSize: 12, fontWeight: isActive ? 700 : 500, lineHeight: 1.4, marginBottom: 3 }}>{lesson.title}</div>
                      <div style={{ color: "#4a5568", fontSize: 10 }}>{lesson.durationMinutes} min · {lesson.difficulty}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content Area */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Lesson Header */}
            {activeLesson && (
              <div style={{ background: "#060f21", border: "1px solid rgba(212,160,23,0.2)", borderRadius: 12, padding: "20px 24px" }}>
                <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                  <span style={{ background: diff.bg, color: diff.color, border: `1px solid ${diff.border}`, borderRadius: 20, padding: "3px 12px", fontSize: 11, fontWeight: 700 }}>{activeLesson.difficulty}</span>
                  <span style={{ background: "rgba(255,255,255,0.05)", color: "#6b7a94", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "3px 12px", fontSize: 11 }}>⏱ {activeLesson.durationMinutes} min</span>
                  {activeLesson.prerequisite && <span style={{ background: "rgba(212,160,23,0.08)", color: "#d4a017", border: "1px solid rgba(212,160,23,0.2)", borderRadius: 20, padding: "3px 12px", fontSize: 11 }}>Prereq: {activeLesson.prerequisite}</span>}
                  <span style={{ background: "rgba(255,255,255,0.04)", color: "#6b7a94", borderRadius: 20, padding: "3px 12px", fontSize: 11, border: "1px solid rgba(255,255,255,0.08)" }}>{activeLesson.moduleTitle}</span>
                </div>
                <h2 style={{ color: "#f0f4ff", fontSize: 20, fontWeight: 800, margin: "0 0 8px" }}>{activeLesson.title}</h2>
                <p style={{ color: "#aab4c4", fontSize: 14, lineHeight: 1.6, margin: "0 0 16px" }}>{activeLesson.description}</p>
                {/* Objectives */}
                <div style={{ background: "rgba(212,160,23,0.06)", border: "1px solid rgba(212,160,23,0.15)", borderRadius: 8, padding: "12px 16px" }}>
                  <div style={{ color: "#d4a017", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>Lesson Objectives</div>
                  <ul style={{ margin: 0, paddingLeft: 18 }}>
                    {activeLesson.checklist.map((obj, i) => (
                      <li key={i} style={{ color: "#aab4c4", fontSize: 13, lineHeight: 1.7 }}>{obj}</li>
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
              <div style={{ background: "#060f21", border: "1px solid rgba(212,160,23,0.15)", borderRadius: 12, padding: "18px 20px" }}>
                <div style={{ color: "#aab4c4", fontSize: 13, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 12 }}>📎 Lesson Resources</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {activeLesson.resources.map((res) => (
                    <a key={res.id} href={res.url} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, textDecoration: "none", transition: "border-color 0.2s" }}>
                      <span style={{ fontSize: 18 }}>{res.type === "PDF" ? "📄" : "📦"}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ color: "#f0f4ff", fontSize: 13, fontWeight: 600 }}>{res.name}</div>
                        <div style={{ color: "#4a5568", fontSize: 11 }}>{res.size}</div>
                      </div>
                      <span style={{ color: "#d4a017", fontSize: 12, fontWeight: 700 }}>↓ Download</span>
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
