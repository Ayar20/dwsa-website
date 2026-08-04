"use client";

import React from "react";
import { FolderOpen } from "lucide-react";

interface InstitutionEmptyStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
}

export function InstitutionEmptyState({
  title = "No Items Available",
  description = "There are currently no records or entries to display in this workspace.",
  action,
}: InstitutionEmptyStateProps) {
  return (
    <div className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-12 text-center space-y-3 flex flex-col items-center justify-center">
      <div className="w-12 h-12 rounded-2xl bg-[#1a2f4a]/50 text-[#8899b4] flex items-center justify-center">
        <FolderOpen className="w-6 h-6" />
      </div>
      <p className="text-sm font-extrabold text-white">{title}</p>
      <p className="text-xs text-[#8899b4] max-w-sm leading-relaxed">{description}</p>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
