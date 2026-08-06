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
    <div style={{ background: "#FFFFFF", border: "1px solid #E2E8F0", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.04)" }}>
      {/* Header */}
      <div style={{ padding: "16px 24px", borderBottom: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: 14, background: "#F0FDF4" }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: "#15803D", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>⚡</div>
        <div>
          <div style={{ color: "#15803D", fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 2 }}>CodingLab</div>
          <div style={{ color: "#0F172A", fontSize: 16, fontWeight: 800 }}>{title}</div>
        </div>
        <div style={{ marginLeft: "auto", background: allDone ? "#F0FDF4" : "#FFFFFF", border: `1px solid ${allDone ? "#15803D" : "#CBD5E1"}`, borderRadius: 20, padding: "4px 14px", fontSize: 12, fontWeight: 700, color: allDone ? "#15803D" : "#475569" }}>
          {completedCount}/{tasks.length} Tasks
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", minHeight: 420 }}>
        {/* Left: Tab Panels */}
        <div style={{ borderRight: "1px solid #E2E8F0" }}>
          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: "1px solid #E2E8F0", background: "#F8FAFC" }}>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{ flex: 1, padding: "12px 0", background: "transparent", border: "none", cursor: "pointer", fontSize: 13, fontWeight: activeTab === tab.key ? 700 : 500, color: activeTab === tab.key ? "#15803D" : "#64748B", borderBottom: `2px solid ${activeTab === tab.key ? "#15803D" : "transparent"}`, transition: "all 0.2s" }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div style={{ padding: 24 }}>
            {activeTab === "instructions" && (
              <div>
                {starterTemplateUrl && (
                  <a href={starterTemplateUrl} target="_blank" rel="noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#F0FDF4", border: "1px solid #15803D/30", borderRadius: 8, padding: "9px 16px", color: "#15803D", fontSize: 13, fontWeight: 700, textDecoration: "none", marginBottom: 16 }}>
                    🔗 Open Starter Repository on GitHub
                  </a>
                )}
                <p style={{ color: "#334155", fontSize: 14, lineHeight: 1.8, margin: 0 }}>{instructions}</p>
                {instructorTip && (
                  <div style={{ marginTop: 20, background: "#FEFCE8", border: "1px solid #D4A017/40", borderRadius: 10, padding: "14px 18px" }}>
                    <div style={{ color: "#D4A017", fontSize: 11, fontWeight: 800, marginBottom: 6, letterSpacing: "0.08em" }}>💡 INSTRUCTOR TIP</div>
                    <p style={{ color: "#0F172A", fontSize: 13, lineHeight: 1.7, margin: 0, fontWeight: 500 }}>{instructorTip}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "rubric" && (
              <div>
                <div style={{ color: "#64748B", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Marking Criteria</div>
                {rubric.map((criterion, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 26, height: 26, borderRadius: 8, background: "#F0FDF4", border: "1px solid #15803D/30", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 800, color: "#15803D", flexShrink: 0, marginTop: 1 }}>{i + 1}</div>
                    <p style={{ color: "#334155", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{criterion}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "output" && (
              <div>
                <div style={{ color: "#64748B", fontSize: 12, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 14 }}>Expected Output</div>
                <div style={{ background: "#0F172A", border: "1px solid #1E293B", borderRadius: 10, padding: "16px 18px", fontFamily: "monospace", fontSize: 13, color: "#4ADE80", lineHeight: 1.7, whiteSpace: "pre-wrap" }}>
                  {expectedOutput}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right: Task Checklist + Submission */}
        <div style={{ padding: 24, display: "flex", flexDirection: "column", gap: 16, background: "#F8FAFC" }}>
          <div>
            <div style={{ color: "#64748B", fontSize: 11, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 14 }}>Task Checklist</div>
            {tasks.map((task) => (
              <label key={task.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", marginBottom: 14 }}>
                <div
                  onClick={() => toggleTask(task.id)}
                  role="checkbox"
                  aria-checked={task.completed}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === " " && toggleTask(task.id)}
                  style={{ width: 20, height: 20, borderRadius: 6, border: `2px solid ${task.completed ? "#15803D" : "#CBD5E1"}`, background: task.completed ? "#15803D" : "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, cursor: "pointer", transition: "all 0.2s", marginTop: 2 }}
                >
                  {task.completed && <span style={{ color: "#FFFFFF", fontSize: 12, fontWeight: 800 }}>✓</span>}
                </div>
                <span style={{ color: task.completed ? "#94A3B8" : "#0F172A", fontSize: 13, lineHeight: 1.6, textDecoration: task.completed ? "line-through" : "none", transition: "all 0.2s", fontWeight: task.completed ? 500 : 600 }}>
                  {task.description}
                </span>
              </label>
            ))}
          </div>

          {/* Progress Bar */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ color: "#64748B", fontSize: 11, fontWeight: 700 }}>Progress</span>
              <span style={{ color: "#15803D", fontSize: 11, fontWeight: 800 }}>{Math.round((completedCount / tasks.length) * 100)}%</span>
            </div>
            <div style={{ height: 8, background: "#E2E8F0", borderRadius: 4 }}>
              <div style={{ height: "100%", width: `${(completedCount / tasks.length) * 100}%`, background: "#15803D", borderRadius: 4, transition: "width 0.4s ease" }} />
            </div>
          </div>

          {/* Submit */}
          <div style={{ marginTop: "auto" }}>
            {submitted ? (
              <div style={{ background: "#F0FDF4", border: "1px solid #15803D/30", borderRadius: 12, padding: "16px", textAlign: "center" }}>
                <div style={{ fontSize: 24, marginBottom: 6 }}>🎉</div>
                <div style={{ color: "#15803D", fontWeight: 800, fontSize: 14 }}>Submitted for Review</div>
                <div style={{ color: "#64748B", fontSize: 12, marginTop: 4 }}>Your instructor will review your PR submission.</div>
              </div>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!allDone}
                style={{ width: "100%", padding: "12px 0", background: allDone ? "#15803D" : "#E2E8F0", color: allDone ? "#FFFFFF" : "#94A3B8", border: "none", borderRadius: 10, cursor: allDone ? "pointer" : "not-allowed", fontWeight: 700, fontSize: 14, transition: "all 0.2s" }}
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
