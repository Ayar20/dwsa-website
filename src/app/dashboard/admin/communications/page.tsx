"use client";

import React, { useState } from "react";
import { Mail, MessageSquare, Send, CheckCircle2, Users, Filter } from "lucide-react";
import { CommunicationService } from "@/lib/institutionOS/CommunicationService";

const channelIcon: Record<string, string> = {
  Email: "✉️", SMS: "📱", WhatsApp: "💬", PushNotification: "🔔", InApp: "🖥️", Announcement: "📢",
};

export default function CommunicationCentrePage() {
  const [records, setRecords] = useState(() => CommunicationService.getAll());
  const [toast, setToast] = useState<string | null>(null);

  const handleBroadcast = () => {
    CommunicationService.sendBroadcast({ subject: "System Test Broadcast", body: "Test message.", channel: "InApp", audience: "Institution", sentBy: "Executive Director", sentAt: new Date().toLocaleDateString() });
    setRecords(CommunicationService.getAll());
    setToast("Broadcast sent to entire institution!");
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      {toast && <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#061428] border border-[#4ade80]/50 text-[#4ade80] text-xs font-extrabold shadow-2xl flex items-center gap-2"><CheckCircle2 className="w-4 h-4" />{toast}</div>}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1"><span className="px-2.5 py-0.5 rounded bg-[#d4a017]/15 text-[#d4a017] text-[9px] font-black uppercase border border-[#d4a017]/30">COMMS ENGINE</span><span className="text-[10px] text-[#8899b4]">v3.7</span></div>
          <h2 className="text-2xl font-extrabold text-white">Communications Centre</h2>
          <p className="text-xs text-[#8899b4]">Unified multi-channel broadcast hub across Email, SMS, WhatsApp, Push &amp; In-App</p>
        </div>
        <button onClick={handleBroadcast} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#d4a017] text-[#030e1f] text-xs font-extrabold hover:bg-[#b8891a] transition-all shrink-0">
          <Send className="w-4 h-4" /> New Broadcast
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[{ l: "Messages Sent", v: records.filter(r => r.status === "Sent").length, c: "text-[#4ade80]" }, { l: "Scheduled", v: records.filter(r => r.status === "Scheduled").length, c: "text-[#d4a017]" }, { l: "Avg Delivery Rate", v: "98%", c: "text-white" }, { l: "Avg Open Rate", v: "82%", c: "text-[#818cf8]" }].map(s => (
          <div key={s.l} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-4 space-y-1">
            <p className={`text-2xl font-extrabold ${s.c}`}>{s.v}</p>
            <p className="text-[10px] text-[#8899b4] font-bold uppercase">{s.l}</p>
          </div>
        ))}
      </div>

      {/* Message Log Table */}
      <div className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2"><Mail className="w-4 h-4 text-[#d4a017]" />Communication Log</h3>
        <div className="rounded-2xl border border-[#1a2f4a] overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#030e1f] text-[#8899b4] text-[10px] uppercase font-black border-b border-[#1a2f4a]">
              <tr><th className="p-3.5">Channel</th><th className="p-3.5">Subject</th><th className="p-3.5">Audience</th><th className="p-3.5">Delivery</th><th className="p-3.5">Open Rate</th><th className="p-3.5 text-right">Status</th></tr>
            </thead>
            <tbody className="divide-y divide-[#1a2f4a] text-white">
              {records.map(r => (
                <tr key={r.id} className="hover:bg-[#0f223d]/40 transition-colors">
                  <td className="p-3.5 text-base">{channelIcon[r.channel]}</td>
                  <td className="p-3.5 font-bold max-w-[180px] truncate">{r.subject}</td>
                  <td className="p-3.5 text-[#8899b4]">{r.audience}</td>
                  <td className="p-3.5 font-extrabold text-[#4ade80]">{r.deliveryRate > 0 ? `${r.deliveryRate}%` : "—"}</td>
                  <td className="p-3.5 font-bold text-white">{r.openRate > 0 ? `${r.openRate}%` : "—"}</td>
                  <td className="p-3.5 text-right"><span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-black uppercase ${r.status === "Sent" ? "bg-[#4ade80]/10 border-[#4ade80]/30 text-[#4ade80]" : r.status === "Scheduled" ? "bg-[#d4a017]/10 border-[#d4a017]/30 text-[#d4a017]" : "bg-[#1a2f4a] text-[#8899b4] border-[#1a2f4a]"}`}>{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
