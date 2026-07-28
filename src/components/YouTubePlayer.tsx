"use client";

import React from "react";
import { PlayCircle, VideoOff, Clock, Sparkles } from "lucide-react";

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
      <div className="w-full aspect-video bg-slate-900 border border-slate-800 rounded-2xl flex flex-col items-center justify-center p-6 text-center space-y-3 shadow-xl">
        <div className="p-4 bg-slate-800/60 rounded-full text-slate-500 border border-slate-700/50">
          <VideoOff className="w-8 h-8" />
        </div>
        <h4 className="text-sm font-bold text-slate-300">No Video Stream Linked</h4>
        <p className="text-xs text-slate-500 max-w-sm">
          This module relies on reading assignments and code repository tasks. Check the lesson notes below.
        </p>
      </div>
    );
  }

  const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1&forced_quality=hd1080`;

  return (
    <div className="space-y-3">
      {/* Video Container */}
      <div className="relative w-full aspect-video bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl group">
        <iframe
          src={embedUrl}
          title={title || "DWSA Academy Video Lesson"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>

      {/* Video Info Bar */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <div className="flex items-center gap-2">
          <PlayCircle className="w-4 h-4 text-red-500" />
          <span className="font-semibold text-slate-200">{title || "DWSA HD Video Masterclass"}</span>
          {isFreePreview && (
            <span className="px-2 py-0.5 bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold rounded-full">
              Free Preview
            </span>
          )}
        </div>

        {durationMinutes && (
          <div className="flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>{durationMinutes} mins</span>
          </div>
        )}
      </div>
    </div>
  );
}
