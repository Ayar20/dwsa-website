"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { TimestampedNote, LessonProgressService } from "@/lib/institutionOS/LessonProgressService";

interface VideoPlayerProps {
  lessonId: string;
  title: string;
  videoUrl: string;
  transcript: string;
  nextLessonTitle?: string;
  onLessonComplete?: () => void;
  onNextLesson?: () => void;
  onPrevLesson?: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export function StudentVideoPlayer({
  lessonId, title, videoUrl, transcript,
  nextLessonTitle, onLessonComplete, onNextLesson, onPrevLesson,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [volume, setVolume] = useState(1);
  const [showTranscript, setShowTranscript] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [notes, setNotes] = useState<TimestampedNote[]>([]);
  const [completed, setCompleted] = useState(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setNotes(LessonProgressService.getNotesForLesson(lessonId));
    setCompleted(LessonProgressService.isLessonCompleted(lessonId));
  }, [lessonId]);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying((p) => !p);
  }, [isPlaying]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.code === "Space") { e.preventDefault(); togglePlay(); }
      if (e.code === "ArrowRight" && videoRef.current) videoRef.current.currentTime += 10;
      if (e.code === "ArrowLeft" && videoRef.current) videoRef.current.currentTime -= 10;
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [togglePlay]);

  const handleTimeUpdate = () => setCurrentTime(videoRef.current?.currentTime ?? 0);
  const handleDurationChange = () => setDuration(videoRef.current?.duration ?? 0);

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const t = Number(e.target.value);
    if (videoRef.current) videoRef.current.currentTime = t;
    setCurrentTime(t);
  };

  const changeSpeed = (s: number) => {
    setSpeed(s);
    if (videoRef.current) videoRef.current.playbackRate = s;
    setShowSpeedMenu(false);
  };

  const addNote = () => {
    if (!newNote.trim()) return;
    const note = LessonProgressService.addNote(lessonId, currentTime, newNote.trim());
    setNotes((prev) => [note, ...prev]);
    setNewNote("");
  };

  const togglePiP = async () => {
    if (videoRef.current) {
      if (document.pictureInPictureElement) await document.exitPictureInPicture();
      else await videoRef.current.requestPictureInPicture();
    }
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const handleComplete = () => {
    const state = LessonProgressService.toggleLessonComplete(lessonId);
    setCompleted(state);
    if (state) onLessonComplete?.();
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div ref={containerRef} style={{ background: "#030e1f", borderRadius: "12px", overflow: "hidden", border: "1px solid rgba(212,160,23,0.2)" }}>
      {/* Video Area */}
      <div style={{ position: "relative", background: "#000", aspectRatio: "16/9" }}>
        <video
          ref={videoRef}
          src={videoUrl}
          style={{ width: "100%", height: "100%", display: "block" }}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleDurationChange}
          onEnded={() => setIsPlaying(false)}
          onClick={togglePlay}
        />
        {!isPlaying && (
          <button
            onClick={togglePlay}
            aria-label="Play video"
            style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", background: "transparent", border: "none", cursor: "pointer" }}
          >
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(212,160,23,0.9)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 32px rgba(212,160,23,0.5)" }}>
              <span style={{ color: "#030e1f", fontSize: 28, marginLeft: 4 }}>▶</span>
            </div>
          </button>
        )}
      </div>

      {/* Control Bar */}
      <div style={{ padding: "12px 16px", background: "#050f20" }}>
        {/* Seek Bar */}
        <div style={{ marginBottom: 10, position: "relative" }}>
          <div style={{ height: 4, background: "rgba(255,255,255,0.15)", borderRadius: 2, position: "relative" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: "linear-gradient(90deg,#d4a017,#f0c040)", borderRadius: 2, transition: "width 0.1s" }} />
          </div>
          <input
            type="range" min={0} max={duration || 100} value={currentTime}
            onChange={handleSeek} step={0.1}
            aria-label="Video seek bar"
            style={{ position: "absolute", inset: 0, opacity: 0, cursor: "pointer", width: "100%", margin: 0 }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
          {/* Play/Pause */}
          <button onClick={togglePlay} aria-label={isPlaying ? "Pause" : "Play"} style={ctrlBtn}>
            {isPlaying ? "⏸" : "▶"}
          </button>

          {/* Skip Backward */}
          <button onClick={() => { if (videoRef.current) videoRef.current.currentTime -= 10; }} aria-label="Rewind 10s" style={ctrlBtn}>⟪ 10s</button>

          {/* Skip Forward */}
          <button onClick={() => { if (videoRef.current) videoRef.current.currentTime += 10; }} aria-label="Forward 10s" style={ctrlBtn}>10s ⟫</button>

          {/* Time */}
          <span style={{ color: "#aab4c4", fontSize: 13, fontFamily: "monospace", minWidth: 90 }}>
            {formatTime(currentTime)} / {formatTime(duration)}
          </span>

          <div style={{ flex: 1 }} />

          {/* Volume */}
          <input
            type="range" min={0} max={1} step={0.1} value={volume}
            aria-label="Volume"
            onChange={(e) => { const v = Number(e.target.value); setVolume(v); if (videoRef.current) videoRef.current.volume = v; }}
            style={{ width: 80, accentColor: "#d4a017" }}
          />

          {/* Speed */}
          <div style={{ position: "relative" }}>
            <button onClick={() => setShowSpeedMenu((v) => !v)} style={ctrlBtn}>{speed}×</button>
            {showSpeedMenu && (
              <div style={{ position: "absolute", bottom: "100%", right: 0, background: "#0c1a30", border: "1px solid rgba(212,160,23,0.3)", borderRadius: 8, padding: "4px 0", zIndex: 50 }}>
                {[0.5, 0.75, 1, 1.25, 1.5, 1.75, 2].map((s) => (
                  <button key={s} onClick={() => changeSpeed(s)} style={{ display: "block", width: "100%", padding: "6px 18px", background: speed === s ? "rgba(212,160,23,0.15)" : "transparent", color: speed === s ? "#d4a017" : "#aab4c4", border: "none", cursor: "pointer", fontSize: 13, textAlign: "left", whiteSpace: "nowrap" }}>
                    {s}×
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Transcript Toggle */}
          <button onClick={() => setShowTranscript((v) => !v)} style={{ ...ctrlBtn, color: showTranscript ? "#d4a017" : "#aab4c4" }} aria-label="Toggle transcript">📄</button>

          {/* Notes Toggle */}
          <button onClick={() => setShowNotes((v) => !v)} style={{ ...ctrlBtn, color: showNotes ? "#d4a017" : "#aab4c4" }} aria-label="Toggle notes">✏️</button>

          {/* PiP */}
          <button onClick={togglePiP} style={ctrlBtn} aria-label="Picture-in-picture">⧉</button>

          {/* Fullscreen */}
          <button onClick={toggleFullscreen} style={ctrlBtn} aria-label="Toggle fullscreen">{isFullscreen ? "⊠" : "⛶"}</button>
        </div>
      </div>

      {/* Transcript Panel */}
      {showTranscript && (
        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(212,160,23,0.15)", background: "#060f21" }}>
          <h4 style={{ color: "#d4a017", fontSize: 13, fontWeight: 700, marginBottom: 10, letterSpacing: "0.08em", textTransform: "uppercase" }}>Lesson Transcript</h4>
          <p style={{ color: "#aab4c4", fontSize: 14, lineHeight: 1.7 }}>{transcript}</p>
        </div>
      )}

      {/* Notes Panel */}
      {showNotes && (
        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(212,160,23,0.15)", background: "#060f21" }}>
          <h4 style={{ color: "#d4a017", fontSize: 13, fontWeight: 700, marginBottom: 12, letterSpacing: "0.08em", textTransform: "uppercase" }}>Timestamped Notes</h4>
          <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
            <input
              type="text" value={newNote} onChange={(e) => setNewNote(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addNote()}
              placeholder={`Add note at ${formatTime(currentTime)}…`}
              style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(212,160,23,0.25)", borderRadius: 8, padding: "8px 12px", color: "#f0f4ff", fontSize: 13, outline: "none" }}
            />
            <button onClick={addNote} style={{ background: "#d4a017", color: "#030e1f", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>Add</button>
          </div>
          {notes.map((n) => (
            <div key={n.id} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
              <span style={{ background: "rgba(212,160,23,0.15)", color: "#d4a017", borderRadius: 6, padding: "2px 8px", fontSize: 11, fontFamily: "monospace", whiteSpace: "nowrap", flexShrink: 0 }}>{n.timestampFormatted}</span>
              <p style={{ color: "#aab4c4", fontSize: 13, lineHeight: 1.6, margin: 0 }}>{n.noteText}</p>
            </div>
          ))}
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(212,160,23,0.1)", background: "#050f20", display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
        <button onClick={onPrevLesson} style={{ background: "rgba(255,255,255,0.06)", color: "#aab4c4", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13 }}>← Previous</button>
        <button
          onClick={handleComplete}
          style={{ background: completed ? "rgba(74,222,128,0.15)" : "rgba(212,160,23,0.12)", color: completed ? "#4ade80" : "#d4a017", border: `1px solid ${completed ? "rgba(74,222,128,0.3)" : "rgba(212,160,23,0.3)"}`, borderRadius: 8, padding: "8px 20px", cursor: "pointer", fontWeight: 700, fontSize: 13, transition: "all 0.2s" }}
        >
          {completed ? "✓ Completed" : "Mark as Complete"}
        </button>
        <div style={{ flex: 1 }} />
        {nextLessonTitle && (
          <button onClick={onNextLesson} style={{ background: "linear-gradient(135deg,#d4a017,#b88a0e)", color: "#030e1f", border: "none", borderRadius: 8, padding: "8px 20px", cursor: "pointer", fontWeight: 700, fontSize: 13 }}>
            Next: {nextLessonTitle} →
          </button>
        )}
      </div>
    </div>
  );
}

const ctrlBtn: React.CSSProperties = {
  background: "transparent",
  border: "none",
  color: "#aab4c4",
  cursor: "pointer",
  fontSize: 14,
  padding: "4px 6px",
  borderRadius: 4,
  transition: "color 0.2s",
  whiteSpace: "nowrap",
};
