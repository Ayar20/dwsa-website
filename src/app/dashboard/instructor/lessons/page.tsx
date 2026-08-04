"use client";

import { useState } from "react";
import { FacultyTeachingService } from "@/lib/institutionOS/FacultyTeachingService";

const lessons = FacultyTeachingService.getStudioLessons();

const statusConfig = {
  Published: { color: "#4ade80", bg: "rgba(74,222,128,0.1)", border: "rgba(74,222,128,0.25)" },
  Draft: { color: "#d4a017", bg: "rgba(212,160,23,0.1)", border: "rgba(212,160,23,0.25)" },
  Archived: { color: "#6b7a94", bg: "rgba(255,255,255,0.06)", border: "rgba(255,255,255,0.12)" },
};

function StatPill({ label, value, color }: { label: string; value: string | number; color: string }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div style={{ color, fontSize: 18, fontWeight: 800, lineHeight: 1 }}>{value}</div>
      <div style={{ color: "#6b7a94", fontSize: 10, marginTop: 3, whiteSpace: "nowrap" }}>{label}</div>
    </div>
  );
}

export default function FacultyLessonStudioPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<"All" | "Published" | "Draft" | "Archived">("All");
  const [liveEngagement] = useState({
    activeStudents: 47,
    pollsCompleted: 3,
    questionsRaised: 12,
    avgAttentionScore: 88,
  });

  const filtered = lessons.filter((l) => filterStatus === "All" || l.status === filterStatus);
  const selectedLesson = selectedId ? lessons.find((l) => l.id === selectedId) : null;
  const totalPublished = lessons.filter((l) => l.status === "Published").length;
  const avgCompletion = Math.round(lessons.filter((l) => l.completionRate > 0).reduce((a, l) => a + l.completionRate, 0) / (lessons.filter((l) => l.completionRate > 0).length || 1));
  const totalQuestions = lessons.reduce((a, l) => a + l.questionsAsked, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#030e1f", color: "#f0f4ff", fontFamily: "'Inter','Outfit',sans-serif", padding: "24px 28px" }}>
      {/* Page Header */}
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 24, fontWeight: 800, color: "#f0f4ff", margin: "0 0 4px" }}>Faculty Lesson Studio</h1>
        <p style={{ color: "#6b7a94", fontSize: 14, margin: 0 }}>Publish, manage, and analyse your lessons. Engage your classroom in real time.</p>
      </div>

      {/* Summary Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12, marginBottom: 24 }}>
        {[
          { label: "Published Lessons", value: totalPublished, icon: "✅", color: "#4ade80" },
          { label: "Avg Completion Rate", value: `${avgCompletion}%`, icon: "📈", color: "#d4a017" },
          { label: "Student Questions", value: totalQuestions, icon: "❓", color: "#d4a017" },
          { label: "Live Students Now", value: liveEngagement.activeStudents, icon: "🟢", color: "#4ade80" },
        ].map((s) => (
          <div key={s.label} style={{ background: "#060f21", border: "1px solid rgba(212,160,23,0.15)", borderRadius: 12, padding: "16px 18px", display: "flex", gap: 12, alignItems: "center" }}>
            <span style={{ fontSize: 24 }}>{s.icon}</span>
            <div>
              <div style={{ color: s.color, fontSize: 22, fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: "#6b7a94", fontSize: 11, marginTop: 2 }}>{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: selectedLesson ? "1fr 380px" : "1fr", gap: 20, alignItems: "start" }}>
        {/* Lesson Table */}
        <div>
          {/* Filter + Actions */}
          <div style={{ display: "flex", gap: 8, marginBottom: 14, flexWrap: "wrap", alignItems: "center" }}>
            {(["All", "Published", "Draft", "Archived"] as const).map((f) => (
              <button key={f} onClick={() => setFilterStatus(f)} style={{ padding: "7px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 12, fontWeight: 700, background: filterStatus === f ? "#d4a017" : "rgba(255,255,255,0.06)", color: filterStatus === f ? "#030e1f" : "#6b7a94", transition: "all 0.2s" }}>{f}</button>
            ))}
            <div style={{ flex: 1 }} />
            <button style={{ padding: "7px 18px", borderRadius: 8, border: "1px solid rgba(212,160,23,0.3)", background: "rgba(212,160,23,0.1)", color: "#d4a017", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>+ New Lesson</button>
          </div>

          <div style={{ background: "#060f21", border: "1px solid rgba(212,160,23,0.15)", borderRadius: 12, overflow: "hidden" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid rgba(212,160,23,0.12)" }}>
                  {["Lesson", "Status", "Cohort", "Completion", "Drop-off", "Questions", ""].map((h) => (
                    <th key={h} style={{ padding: "12px 16px", textAlign: "left", color: "#6b7a94", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", background: "#050e1e", whiteSpace: "nowrap" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((lesson, i) => {
                  const sc = statusConfig[lesson.status];
                  const isSelected = selectedId === lesson.id;
                  return (
                    <tr key={lesson.id} style={{ borderBottom: i < filtered.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none", background: isSelected ? "rgba(212,160,23,0.06)" : "transparent", cursor: "pointer" }} onClick={() => setSelectedId(isSelected ? null : lesson.id)}>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ color: "#f0f4ff", fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{lesson.title}</div>
                        <div style={{ color: "#4a5568", fontSize: 11 }}>{lesson.module} · v{lesson.version} · Updated {lesson.lastUpdated}</div>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ background: sc.bg, color: sc.color, border: `1px solid ${sc.border}`, borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>{lesson.status}</span>
                      </td>
                      <td style={{ padding: "14px 16px", color: "#aab4c4", fontSize: 13 }}>{lesson.cohort}</td>
                      <td style={{ padding: "14px 16px" }}>
                        {lesson.completionRate > 0 ? (
                          <div>
                            <div style={{ color: "#d4a017", fontSize: 13, fontWeight: 700, marginBottom: 4 }}>{lesson.completionRate}%</div>
                            <div style={{ height: 4, width: 80, background: "rgba(255,255,255,0.07)", borderRadius: 2 }}>
                              <div style={{ height: "100%", width: `${lesson.completionRate}%`, background: lesson.completionRate >= 90 ? "#4ade80" : "#d4a017", borderRadius: 2 }} />
                            </div>
                          </div>
                        ) : <span style={{ color: "#4a5568", fontSize: 12 }}>—</span>}
                      </td>
                      <td style={{ padding: "14px 16px", color: "#aab4c4", fontSize: 12 }}>{lesson.dropOffPoint}</td>
                      <td style={{ padding: "14px 16px", color: "#aab4c4", fontSize: 13 }}>{lesson.questionsAsked > 0 ? lesson.questionsAsked : "—"}</td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button style={{ background: "transparent", border: "1px solid rgba(212,160,23,0.25)", borderRadius: 6, padding: "5px 10px", color: "#d4a017", cursor: "pointer", fontSize: 11 }}>Edit</button>
                          <button style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 6, padding: "5px 10px", color: "#6b7a94", cursor: "pointer", fontSize: 11 }}>Clone</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lesson Detail / Analytics Panel */}
        {selectedLesson && (
          <div style={{ background: "#060f21", border: "1px solid rgba(212,160,23,0.2)", borderRadius: 12, overflow: "hidden", position: "sticky", top: 24 }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(212,160,23,0.1)", background: "#050e1e" }}>
              <div style={{ color: "#d4a017", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 4 }}>Lesson Analytics</div>
              <div style={{ color: "#f0f4ff", fontSize: 15, fontWeight: 700 }}>{selectedLesson.title}</div>
            </div>
            <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 20 }}>
              {/* Stats Grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, textAlign: "center" }}>
                <StatPill label="Completion" value={`${selectedLesson.completionRate}%`} color="#4ade80" />
                <StatPill label="Avg Time" value={`${selectedLesson.avgCompletionTimeMinutes}m`} color="#d4a017" />
                <StatPill label="Downloads" value={selectedLesson.downloadsCount} color="#d4a017" />
              </div>

              {/* Drop-off Point */}
              <div style={{ background: "rgba(248,113,113,0.06)", border: "1px solid rgba(248,113,113,0.15)", borderRadius: 8, padding: "12px 14px" }}>
                <div style={{ color: "#f87171", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>⚠ Primary Drop-off Point</div>
                <div style={{ color: "#aab4c4", fontSize: 13 }}>{selectedLesson.dropOffPoint}</div>
                <div style={{ color: "#6b7a94", fontSize: 11, marginTop: 4 }}>Consider adding a checkpoint activity or clearer explanation at this timestamp.</div>
              </div>

              {/* Student Questions */}
              <div>
                <div style={{ color: "#6b7a94", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>Questions Asked</div>
                <div style={{ background: "rgba(212,160,23,0.08)", border: "1px solid rgba(212,160,23,0.2)", borderRadius: 8, padding: "12px 14px", color: "#d4a017", fontSize: 22, fontWeight: 800, textAlign: "center" }}>{selectedLesson.questionsAsked}</div>
              </div>

              {/* Live Classroom Engagement Panel */}
              <div style={{ background: "rgba(74,222,128,0.06)", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 10, padding: "14px 16px" }}>
                <div style={{ color: "#4ade80", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>🟢 Live Classroom</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <StatPill label="Active Students" value={liveEngagement.activeStudents} color="#4ade80" />
                  <StatPill label="Polls Completed" value={liveEngagement.pollsCompleted} color="#4ade80" />
                  <StatPill label="Questions Raised" value={liveEngagement.questionsRaised} color="#d4a017" />
                  <StatPill label="Attention Score" value={`${liveEngagement.avgAttentionScore}%`} color="#d4a017" />
                </div>
                <button style={{ width: "100%", marginTop: 14, padding: "10px 0", background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 8, color: "#4ade80", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>
                  📡 Launch Live Session
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
