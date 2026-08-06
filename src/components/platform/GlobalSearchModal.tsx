"use client";

import React from "react";
import CommandPalette from "./CommandPalette";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: "STUDENT" | "INSTRUCTOR" | "ADMIN" | "SUPER_ADMIN";
}

/**
 * GlobalSearchModal now forwards directly to the v5.3 IUX Command Palette.
 * Preserves 100% backwards compatibility with existing workspace shell imports.
 */
export default function GlobalSearchModal({ isOpen, onClose, userRole }: GlobalSearchModalProps) {
  return <CommandPalette isOpen={isOpen} onClose={onClose} userRole={userRole} />;
}
