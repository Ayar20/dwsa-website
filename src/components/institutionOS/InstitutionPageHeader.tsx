"use client";

import React from "react";
import { InstitutionBadge } from "./InstitutionBadge";

interface InstitutionPageHeaderProps {
  badgeText: string;
  badgeVariant?: "gold" | "emerald" | "purple" | "neutral" | "red";
  systemTag?: string;
  title: string;
  description: string;
  actionButton?: React.ReactNode;
}

export function InstitutionPageHeader({
  badgeText,
  badgeVariant = "gold",
  systemTag = "InstitutionOS v3.8A",
  title,
  description,
  actionButton,
}: InstitutionPageHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div className="space-y-1">
        <div className="flex items-center gap-2 mb-1">
          <InstitutionBadge variant={badgeVariant}>{badgeText}</InstitutionBadge>
          <span className="text-[10px] text-[#8899b4] font-semibold">• {systemTag}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{title}</h1>
        <p className="text-xs sm:text-sm text-[#8899b4] max-w-3xl leading-relaxed">{description}</p>
      </div>
      {actionButton && <div className="shrink-0">{actionButton}</div>}
    </div>
  );
}
