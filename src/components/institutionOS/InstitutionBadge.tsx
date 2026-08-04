"use client";

import React from "react";

interface InstitutionBadgeProps {
  children: React.ReactNode;
  variant?: "gold" | "emerald" | "purple" | "neutral" | "red";
  size?: "sm" | "md";
}

export function InstitutionBadge({ children, variant = "gold", size = "sm" }: InstitutionBadgeProps) {
  const styles = {
    gold: "bg-[#d4a017]/15 border-[#d4a017]/30 text-[#d4a017]",
    emerald: "bg-[#4ade80]/15 border-[#4ade80]/30 text-[#4ade80]",
    purple: "bg-[#818cf8]/15 border-[#818cf8]/30 text-[#818cf8]",
    neutral: "bg-[#1a2f4a] border-[#1a2f4a] text-[#8899b4]",
    red: "bg-red-500/10 border-red-500/30 text-red-400",
  };

  const sizes = {
    sm: "px-2.5 py-0.5 text-[9px]",
    md: "px-3 py-1 text-[10px]",
  };

  return (
    <span className={`inline-flex items-center rounded-full border font-black uppercase tracking-wider ${styles[variant]} ${sizes[size]}`}>
      {children}
    </span>
  );
}
