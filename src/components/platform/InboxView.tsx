"use client";

import React, { useState } from "react";
import { Star, Paperclip, CheckCircle2, Inbox } from "lucide-react";
import { InboxService, InboxRole } from "@/lib/institutionOS/InboxService";

const categoryColors: Record<string, string> = {
  ActionRequired: "bg-red-500/10 text-red-400 border-red-500/30",
  Academic: "bg-[#818cf8]/10 text-[#818cf8] border-[#818cf8]/30",
  Finance: "bg-[#4ade80]/10 text-[#4ade80] border-[#4ade80]/30",
  Community: "bg-[#d4a017]/10 text-[#d4a017] border-[#d4a017]/30",
  Career: "bg-[#fb923c]/10 text-[#fb923c] border-[#fb923c]/30",
  Research: "bg-[#38bdf8]/10 text-[#38bdf8] border-[#38bdf8]/30",
  Information: "bg-[#1a2f4a] text-[#8899b4] border-[#1a2f4a]",
};

interface InboxViewProps {
  role: InboxRole;
  title: string;
  badge: string;
  badgeColor: string;
}

export function InboxView({ role, title, badge, badgeColor }: InboxViewProps) {
  const [messages, setMessages] = useState(() => InboxService.getMessages(role));
  const unread = messages.filter(m => !m.isRead).length;

  const handleRead = (id: string) => {
    InboxService.markRead(role, id);
    setMessages(InboxService.getMessages(role));
  };

  const handleStar = (id: string) => {
    InboxService.toggleStar(role, id);
    setMessages(InboxService.getMessages(role));
  };

  return (
    <div className="space-y-8 pb-12">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className={`px-2.5 py-0.5 rounded text-[9px] font-black uppercase border ${badgeColor}`}>{badge}</span>
          <span className="text-[10px] text-[#8899b4]">InstitutionOS v3.7</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white">{title}</h2>
        <p className="text-xs text-[#8899b4]">{unread} unread message{unread !== 1 ? "s" : ""} · Categorised by type, priority &amp; action required</p>
      </div>

      {/* Quick filters */}
      <div className="flex flex-wrap gap-2">
        {["All", "ActionRequired", "Academic", "Finance", "Career", "Community"].map(f => (
          <button key={f} className="px-3 py-1.5 rounded-xl text-[10px] font-bold bg-[#061428] border border-[#1a2f4a] text-[#8899b4] hover:border-[#d4a017]/40 hover:text-white transition-all">{f === "ActionRequired" ? "Action Required" : f}</button>
        ))}
      </div>

      <div className="space-y-2">
        {messages.map(m => (
          <div
            key={m.id}
            onClick={() => handleRead(m.id)}
            className={`rounded-2xl border p-4 cursor-pointer transition-all ${!m.isRead ? "bg-[#061428] border-[#d4a017]/30" : "bg-[#030e1f] border-[#1a2f4a] opacity-80"} hover:border-[#d4a017]/50`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${!m.isRead ? "bg-[#d4a017]" : "bg-transparent"}`} />
              <div className="flex-1 space-y-1 min-w-0">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className={`text-xs font-extrabold ${!m.isRead ? "text-white" : "text-[#8899b4]"}`}>{m.from}</p>
                    <span className={`px-2 py-0.5 rounded-full border text-[9px] font-black uppercase ${categoryColors[m.category] ?? ""}`}>{m.category === "ActionRequired" ? "Action Required" : m.category}</span>
                  </div>
                  <p className="text-[9px] text-[#8899b4] shrink-0">{m.receivedAt}</p>
                </div>
                <p className={`text-xs ${!m.isRead ? "font-bold text-white" : "text-[#8899b4]"}`}>{m.subject}</p>
                <p className="text-[10px] text-[#8899b4] truncate">{m.preview}</p>
                <div className="flex items-center gap-3 pt-1">
                  {m.attachments > 0 && <span className="flex items-center gap-1 text-[9px] text-[#8899b4]"><Paperclip className="w-3 h-3" />{m.attachments}</span>}
                  <button onClick={e => { e.stopPropagation(); handleStar(m.id); }} className={`flex items-center gap-1 text-[9px] font-bold transition-colors ${m.isStarred ? "text-[#d4a017]" : "text-[#8899b4] hover:text-[#d4a017]"}`}>
                    <Star className={`w-3 h-3 ${m.isStarred ? "fill-[#d4a017]" : ""}`} />
                    {m.isStarred ? "Starred" : "Star"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
