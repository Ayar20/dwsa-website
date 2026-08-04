"use client";

import React from "react";
import { Users, Star, MapPin, Briefcase, CheckCircle2 } from "lucide-react";
import { AlumniService } from "@/lib/institutionOS/AlumniService";

export default function AlumniNetworkPage() {
  const alumni = AlumniService.getAlumniDirectory();

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded bg-[#4ade80]/15 text-[#4ade80] text-[9px] font-black uppercase border border-[#4ade80]/30">ALUMNI NETWORK</span>
            <span className="text-[10px] text-[#8899b4]">InstitutionOS v3.6</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">DTA Alumni Network</h2>
          <p className="text-xs text-[#8899b4]">Stay connected with DTA graduates. Explore alumni stories, find mentors, and expand your professional network.</p>
        </div>
      </div>

      {/* Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Total Graduates", value: "347+", color: "text-[#d4a017]" },
          { label: "Countries Represented", value: "12", color: "text-[#4ade80]" },
          { label: "Active Mentors", value: "48", color: "text-white" },
          { label: "Avg. Placement Rate", value: "92%", color: "text-[#818cf8]" },
        ].map((s) => (
          <div key={s.label} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-4 space-y-1">
            <p className={`text-2xl font-extrabold ${s.color}`}>{s.value}</p>
            <p className="text-[10px] text-[#8899b4] font-bold uppercase">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Alumni Directory */}
      <div className="space-y-3">
        <h3 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
          <Users className="w-4 h-4 text-[#d4a017]" /> Alumni Directory
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {alumni.map((alum) => (
            <div key={alum.id} className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-5 space-y-3 hover:border-[#d4a017]/40 transition-all">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#d4a017] to-[#b8891a] text-[#030e1f] flex items-center justify-center font-black text-lg shrink-0">
                  {alum.avatar}
                </div>
                <div>
                  <p className="text-sm font-extrabold text-white">{alum.name}</p>
                  <p className="text-[10px] text-[#d4a017] font-bold">{alum.gradYear}</p>
                </div>
              </div>
              <div className="space-y-1 text-xs text-[#8899b4]">
                <p className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5 shrink-0" />{alum.currentRole}</p>
                <p className="font-bold text-white text-[10px]">{alum.company}</p>
                <p className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 shrink-0" />{alum.location}</p>
              </div>
              <p className="text-[10px] text-[#8899b4] italic leading-relaxed">&ldquo;{alum.bio}&rdquo;</p>
              <div className="pt-2 border-t border-[#1a2f4a] flex items-center justify-between">
                {alum.isMentorAvailable ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80] text-[9px] font-black">✓ Available to Mentor</span>
                ) : (
                  <span className="text-[9px] text-[#8899b4]">Not mentoring</span>
                )}
                <button className="text-[10px] font-black text-[#d4a017] hover:underline">Connect →</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
