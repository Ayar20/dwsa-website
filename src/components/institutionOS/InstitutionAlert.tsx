"use client";

import React from "react";
import { CheckCircle2, AlertTriangle, Info, XCircle } from "lucide-react";

interface InstitutionAlertProps {
  type?: "success" | "warning" | "info" | "error";
  title: string;
  message?: string;
  onClose?: () => void;
}

export function InstitutionAlert({ type = "success", title, message, onClose }: InstitutionAlertProps) {
  const styles = {
    success: "bg-[#061428] border-[#4ade80]/50 text-[#4ade80]",
    warning: "bg-[#061428] border-[#d4a017]/50 text-[#d4a017]",
    info: "bg-[#061428] border-[#818cf8]/50 text-[#818cf8]",
    error: "bg-[#061428] border-red-500/50 text-red-400",
  };

  const Icon = type === "success" ? CheckCircle2 : type === "warning" ? AlertTriangle : type === "error" ? XCircle : Info;

  return (
    <div className={`p-4 rounded-2xl border shadow-xl flex items-start justify-between gap-3 text-xs ${styles[type]}`}>
      <div className="flex items-start gap-2.5">
        <Icon className="w-4 h-4 mt-0.5 shrink-0" />
        <div className="space-y-0.5">
          <p className="font-extrabold">{title}</p>
          {message && <p className="text-[10px] text-[#8899b4]">{message}</p>}
        </div>
      </div>
      {onClose && (
        <button onClick={onClose} className="text-[#8899b4] hover:text-white text-xs font-bold">
          ✕
        </button>
      )}
    </div>
  );
}
