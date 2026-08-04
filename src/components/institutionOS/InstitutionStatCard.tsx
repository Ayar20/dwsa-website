"use client";

import React from "react";
import { LucideIcon } from "lucide-react";

interface InstitutionStatCardProps {
  label: string;
  value: string | number;
  subText?: string;
  color?: "gold" | "emerald" | "purple" | "white" | "red";
  icon?: LucideIcon;
  badge?: string;
}

export function InstitutionStatCard({ label, value, subText, color = "gold", icon: Icon, badge }: InstitutionStatCardProps) {
  const colorMap = {
    gold: "text-[#d4a017]",
    emerald: "text-[#4ade80]",
    purple: "text-[#818cf8]",
    white: "text-white",
    red: "text-red-400",
  };

  return (
    <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-4 space-y-2 hover:border-[#d4a017]/30 transition-all">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-extrabold text-[#8899b4] uppercase tracking-wider">{label}</span>
        {badge && (
          <span className="px-2 py-0.5 rounded bg-[#d4a017]/15 text-[#d4a017] text-[9px] font-black uppercase">
            {badge}
          </span>
        )}
        {Icon && <Icon className={`w-4 h-4 ${colorMap[color]}`} />}
      </div>
      <p className={`text-2xl font-extrabold ${colorMap[color]}`}>{value}</p>
      {subText && <p className="text-[10px] text-[#8899b4]">{subText}</p>}
    </div>
  );
}
