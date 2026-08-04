"use client";

import React from "react";

interface InstitutionSkeletonProps {
  height?: string;
  className?: string;
}

export function InstitutionSkeleton({ height = "h-12", className = "" }: InstitutionSkeletonProps) {
  return (
    <div className={`w-full rounded-2xl bg-[#0f223d]/60 animate-pulse border border-[#1a2f4a]/50 ${height} ${className}`} />
  );
}
