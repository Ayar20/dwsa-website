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
      <div className="w-full aspect-video rounded-3xl bg-slate-50 border border-slate-200 flex flex-col items-center justify-center p-8 text-center space-y-4 shadow-xs">
        <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 flex items-center justify-center shadow-xs">
          <VideoOff className="w-7 h-7 text-slate-400" />
        </div>
        <div>
          <h4 className="text-sm font-extrabold text-[#0F172A]">No Video Stream Linked</h4>
          <p className="text-xs text-slate-500 max-w-xs mx-auto mt-1 leading-relaxed">
            This module relies on reading assignments and code tasks. Review the lesson notes below.
          </p>
        </div>
      </div>
    );
  }

  const embedUrl = `https://www.youtube-nocookie.com/embed/${youtubeId}?rel=0&modestbranding=1&forced_quality=hd1080`;

  return (
    <div className="space-y-3">
      {/* Video Container */}
      <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-slate-200 shadow-md bg-black">
        <iframe
          src={embedUrl}
          title={title || "DWSA Academy Video Lesson"}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="w-full h-full border-0"
        />
      </div>

      {/* Video Info Bar */}
      <div className="flex items-center justify-between px-4 py-3 rounded-2xl bg-white border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative shrink-0">
            <PlayCircle className="w-4 h-4 text-red-600" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-600 rounded-full animate-pulse" />
          </div>
          <span className="text-xs font-extrabold text-[#0F172A] truncate">{title || "DWSA HD Video Masterclass"}</span>
          {isFreePreview && (
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] shrink-0">
              Free Preview
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0 ml-3">
          <span className="px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest bg-slate-100 border border-slate-200 text-slate-700">
            1080p HD
          </span>

          {durationMinutes && (
            <div className="flex items-center gap-1 text-[11px] text-slate-500 font-semibold">
              <Clock className="w-3.5 h-3.5 text-slate-400" />
              <span>{durationMinutes} min</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
