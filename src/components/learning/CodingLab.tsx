"use client";

import { useState } from "react";

interface CodingTask {
  id: string;
  description: string;
  completed: boolean;
}

interface CodingLabProps {
  lessonId: string;
  title: string;
  instructions: string;
  starterTemplateUrl?: string;
  expectedOutput: string;
  rubric: string[];
  instructorTip: string;
  tasks: CodingTask[];
}

export function CodingLab({
  title, instructions, starterTemplateUrl, expectedOutput, rubric, instructorTip, tasks: initialTasks,
}: CodingLabProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState<"instructions" | "rubric" | "output">("instructions");

  const completedCount = tasks.filter((t) => t.completed).length;
  const allDone = completedCount === tasks.length;

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleSubmit = () => setSubmitted(true);

  const tabs = [
    { key: "instructions", label: "Instructions" },
    { key: "rubric", label: "Rubric" },
    { key: "output", label: "Expected Output" },
  ] as const;

  return (
    <div style={{ background: "#060f21", border: "1px solid rgba(212,160,23,0.2)", borderRadius: 12, overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(212,160,23,0.15)", display: "flex", alignItems: "center", gap: 12, background: "#050e1e" }}>
        <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(212,160,23,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>⚡</div>
        <div>
          <div style={{ color: "#d4a017", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>CodingLab</div>
          <div style={{ color: "#f0f4ff", fontSize: 15, fontWeight: 700 }}>{title}</div>
        </div>
        <div style={{ marginLeft: "auto", background: allDone ? "rgba(74,222,128,0.12)" : "rgba(212,160,23,0.1)", border: `1px solid ${allDone ? "rgba(74,222,128,0.3)" : "rgba(212,160,23,0.25)"}`, borderRadius: 20, padding: "4px 14px", fontSize: 12, fontWeight: 700, color: allDone ? "#4ade80" : "#d4a017" }}>
          {completedCount}/{tasks.length} Tasks
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", minHeight: 420 }}>
        {/* Left: Tab Panels */}
        <div style={{ borderRight: "1px solid rgba(212,160,23,0.1)" }}>
          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid rgba(212,160,23,0.1)" }}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{ flex: 1, padding: "11px 0", background: "transparent", border: "none", cursor: "pointer", fontSize: 13, fontWeight: activeTab === tab.key ? 700 : 500, color: activeTab === tab.key ? "#d4a017" : "#6b7a94", borderBottom: `2px solid ${activeTab === tab.key ? "#d4a017" : "transparent"}`, transition: "all 0.2s" }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ padding: 20 }}>
            {activeTab === "instructions" && (
              <div>
                {starterTemplateUrl && (
                  <a href={starterTemplateUrl} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.25)", borderRadius: 8, padding: "8px 16px", color: "#4ade80", fontSize: 13, fontWeight: 700, textDecoration: "none", marginBottom: 16 }}>
                    🔗 Open Starter Repository on GitHub
                  </a>
                )}
                <p style={{ color: "#aab4c4", fontSize: 14, lineHeight: 1.8, margin: 0 }}>{instructions}</p>
                {instructorTip && (
                  <div style={{ marginTop: 16, background: "rgba(212,160,23,0.07)", border: "1px solid rgba(212,160,23,0.2)", borderRadius: 8, padding: "12px 16px" }}>
                    <div style={{ color: "#d4a017", fontSize: 12, fontWeight: 700, marginBottom: 6, letterSpacing: "0.08em" }}>💡 INSTRUCTOR TIP</div>
                    <p style={{ color: "#aab4c4", fontSize: 13, lineHeight: 1.7, margin: 0 }}>{instructorTip}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "rubric" && (
              <div>
                <div style={{ color: "#6b7a94", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Marking Criteria</div>
                {rubric.map((criterion, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 6, background: "rgba(212,160,23,0.12)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#d4a017", flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                    <p style={{ color: "#aab4c4", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{criterion}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "output" && (
              <div>
                <div style={{ color: "#6b7a94", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 12 }}>Expected Output</div>
                <div style={{ background: "#030e1f", border: "1px solid rgba(74,222,128,0.2)", borderRadius: 8, padding: "14px 16px", fontFamily: "monospace", fontSize: 13, color: "#4ade80", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                  {expectedOutput}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Task Checklist + Submission */}
        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <div style={{ color: "#6b7a94", fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Task Checklist</div>
            {tasks.map((task) => (
              <label key={task.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 12 }}>
                <div
                  onClick={() => toggleTask(task.id)}
                  role="checkbox"
                  aria-checked={task.completed}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === " " && toggleTask(task.id)}
                  style={{ width: 20, height: 20, borderRadius: 5, border: `2px solid ${task.completed ? "#4ade80" : "rgba(212,160,23,0.4)"}`, background: task.completed ? "rgba(74,222,128,0.15)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer", transition: "all 0.2s", marginTop: 2 }}
                >
                  {task.completed && <span style={{ color: "#4ade80", fontSize: 12, fontWeight: 700 }}>✓</span>}
                </div>
                <span style={{ color: task.completed ? "#6b7a94" : "#aab4c4", fontSize: 13, lineHeight: 1.6, textDecoration: task.completed ? "line-through" : "none", transition: "all 0.2s" }}>
                  {task.description}
                </span>
              </label>
            ))}
          </div>

          {/* Progress Bar */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ color: "#6b7a94", fontSize: 11, fontWeight: 600 }}>Progress</span>
              <span style={{ color: "#d4a017", fontSize: 11, fontWeight: 700 }}>{Math.round((completedCount / tasks.length) * 100)}%</span>
            </div>
            <div style={{ height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 3 }}>
              <div style={{ height: "100%", width: `${(completedCount / tasks.length) * 100}%`, background: "linear-gradient(90deg,#d4a017,#4ade80)", borderRadius: 3, transition: "width 0.4s ease" }} />
            </div>
          </div>

          {/* Submit */}
          <div style={{ marginTop: "auto" }}>
            {submitted ? (
              <div style={{ background: "rgba(74,222,128,0.1)", border: "1px solid rgba(74,222,128,0.3)", borderRadius: 10, padding: "14px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>🎉</div>
                <div style={{ color: "#4ade80", fontWeight: 700, fontSize: 14 }}>Submitted for Review</div>
                <div style={{ color: "#6b7a94", fontSize: 12, marginTop: 4 }}>Your instructor will review your PR submission.</div>
              </div>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!allDone}
                style={{ width: "100%", padding: "12px 0", background: allDone ? "linear-gradient(135deg,#d4a017,#b88a0e)" : "rgba(255,255,255,0.06)", color: allDone ? "#030e1f" : "#4a5568", border: "none", borderRadius: 10, cursor: allDone ? "pointer" : "not-allowed", fontWeight: 700, fontSize: 14, transition: "all 0.3s" }}
              >
                {allDone ? "🚀 Submit for Review" : `Complete ${tasks.length - completedCount} more task${tasks.length - completedCount !== 1 ? "s" : ""} to submit`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
