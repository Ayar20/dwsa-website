"use client";

import React from "react";

interface InstitutionCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "gold" | "emerald" | "accent";
  onClick?: () => void;
}

export function InstitutionCard({ children, className = "", variant = "default", onClick }: InstitutionCardProps) {
  const variantStyles = {
    default: "border-[#1a2f4a] hover:border-[#d4a017]/30",
    gold: "border-[#d4a017]/40 bg-gradient-to-br from-[#061428] via-[#0d1c33] to-[#061428]",
    emerald: "border-[#4ade80]/40 bg-gradient-to-br from-[#061428] to-[#0a261d]",
    accent: "border-[#818cf8]/40 bg-gradient-to-br from-[#061428] to-[#121c38]",
  };

  return (
    <div
      onClick={onClick}
      className={`rounded-3xl bg-[#061428] border p-6 shadow-xl transition-all ${variantStyles[variant]} ${onClick ? "cursor-pointer" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
