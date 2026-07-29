"use client";

import React from "react";
import { PlayCircle, VideoOff, Clock, Sparkles, Wifi } from "lucide-react";

interface YouTubePlayerProps {
  youtubeId?: string | null;
  title?: string;
  durationMinutes?: number | null;
  isFreePreview?: boolean;
}

export default function YouTubePlayer({
  youtubeId,
  title,
  durationMinutes,
  isFreePreview,
}: YouTubePlayerProps) {
  if (!youtubeId) {
    return (
      <div
        className="w-full aspect-video rounded-2xl flex flex-col items-center justify-center p-8 text-center space-y-4 border relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(6,20,40,0.95) 0%, rgba(3,14,31,0.98) 100%)",
          borderColor: "#1e3a5f",
          boxShadow: "inset 0 0 60px rgba(0,0,0,0.5)",
        }}
      >
        {/* Background grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(#00d2ff 1px, transparent 1px), linear-gradient(90deg, #00d2ff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative space-y-3">
          <div
            className="mx-auto w-14 h-14 rounded-2xl flex items-center justify-center border"
            style={{
              background: "rgba(212,160,23,0.1)",
              borderColor: "#d4a01730",
            }}
          >
            <VideoOff className="w-7 h-7 text-[#8899b4]" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">No Video Stream Linked</h4>
            <p className="text-xs text-[#8899b4] max-w-xs mx-auto mt-1 leading-relaxed">
              This module relies on reading assignments and code tasks. Review the lesson notes below.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1&forced_quality=hd1080`;

  return (
    <div className="space-y-3">
      {/* Video Container with premium frame */}
      <div
        className="relative w-full aspect-video rounded-2xl overflow-hidden border"
        style={{
          borderColor: "#d4a01730",
          boxShadow: "0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,160,23,0.08), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Glow effect behind video */}
        <div
          className="absolute -inset-1 rounded-2xl opacity-30 blur-xl -z-10"
          style={{ background: "linear-gradient(135deg, #d4a01720, #00d2ff10)" }}
        />

        <iframe
          src={embedUrl}
          title={title || "DWSA Academy Video Lesson"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>

      {/* Video Info Bar */}
      <div
        className="flex items-center justify-between px-4 py-3 rounded-xl border"
        style={{
          background: "rgba(6,20,40,0.6)",
          borderColor: "#1e3a5f",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          {/* Live Dot */}
          <div className="relative shrink-0">
            <PlayCircle className="w-4 h-4 text-red-500" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </div>
          <span className="text-xs font-bold text-white truncate">{title || "DWSA HD Video Masterclass"}</span>
          {isFreePreview && (
            <span
              className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider border shrink-0"
              style={{
                background: "rgba(74,222,128,0.1)",
                borderColor: "#4ade8040",
                color: "#4ade80",
              }}
            >
              Free Preview
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0 ml-3">
          {/* HD badge */}
          <span
            className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest border"
            style={{
              background: "rgba(0,210,255,0.08)",
              borderColor: "#00d2ff30",
              color: "#00d2ff",
            }}
          >
            1080p HD
          </span>

          {durationMinutes && (
            <div className="flex items-center gap-1 text-[11px] text-[#8899b4]">
              <Clock className="w-3 h-3 text-[#8899b4]" />
              <span>{durationMinutes} min</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
