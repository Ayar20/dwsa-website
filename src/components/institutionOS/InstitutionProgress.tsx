"use client";

import React from "react";

interface InstitutionProgressProps {
  value: number;
  max?: number;
  label?: string;
  color?: "gold" | "emerald" | "purple";
  showValue?: boolean;
}

export function InstitutionProgress({ value, max = 100, label, color = "gold", showValue = true }: InstitutionProgressProps) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const barColors = {
    gold: "bg-[#d4a017]",
    emerald: "bg-[#4ade80]",
    purple: "bg-[#818cf8]",
  };

  return (
    <div className="space-y-1.5 w-full">
      {(label || showValue) && (
        <div className="flex items-center justify-between text-[10px] font-bold">
          {label && <span className="text-[#8899b4] uppercase tracking-wider">{label}</span>}
          {showValue && <span className="text-white font-mono">{percentage}%</span>}
        </div>
      )}
      <div className="w-full bg-[#1a2f4a] rounded-full h-2 overflow-hidden">
        <div
          className={`h-2 rounded-full transition-all duration-500 ${barColors[color]}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
