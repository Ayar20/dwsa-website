"use client";

import React from "react";
import { Activity, CheckCircle2, Clock, AlertTriangle, User, Award, BookOpen, DollarSign } from "lucide-react";
import { ActivityItem } from "@/types/institutionOS";

interface UniversalActivityTimelineProps {
  title?: string;
  items?: ActivityItem[];
}

const defaultTimelineItems: ActivityItem[] = [
  { id: "ACT-1", userId: "usr_1", userName: "Kofi Asante", role: "STUDENT", action: "Assignment Submitted", details: "React To-Do Application PR committed to GitHub main branch.", timestamp: "2 hours ago", category: "Assignments", status: "Success" },
  { id: "ACT-2", userId: "usr_2", userName: "Dr. Olumide Adeleke", role: "INSTRUCTOR", action: "PR Graded & Badge Awarded", details: "Approved week-3-api-integration PR with 94/100 score.", timestamp: "4 hours ago", category: "Academic", status: "Success" },
  { id: "ACT-3", userId: "usr_3", userName: "Paystack ERP Engine", role: "ADMIN", action: "Tuition Settlement Verified", details: "Settlement ₦4,800,000 auto-reconciled into DWSA treasury ledger.", timestamp: "Yesterday", category: "Finance", status: "Success" },
  { id: "ACT-4", userId: "usr_4", userName: "Executive Admin", role: "ADMIN", action: "Certificate Batch Signed", details: "Cryptographic sign-off completed for 3 Professional Diplomas.", timestamp: "Yesterday", category: "Executive", status: "Success" },
];

export default function UniversalActivityTimeline({ title = "Universal Activity History", items = defaultTimelineItems }: UniversalActivityTimelineProps) {
  return (
    <div className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4">
      <div className="flex items-center justify-between border-b border-[#1a2f4a] pb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#d4a017]" />
          <h3 className="text-sm font-extrabold text-white">{title}</h3>
        </div>
        <span className="text-[10px] text-[#8899b4]">InstitutionOS Event Bus Connected</span>
      </div>

      <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#1a2f4a]">
        {items.map((item) => (
          <div key={item.id} className="relative flex items-start gap-3">
            <span className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-[#d4a017] ring-4 ring-[#061428]" />
            <div className="flex-1 rounded-2xl bg-[#030e1f] border border-[#1a2f4a] p-4 space-y-1">
              <div className="flex items-center justify-between text-[10px]">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">{item.userName}</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#1a2f4a] text-[#8899b4] font-black uppercase text-[8px]">{item.role}</span>
                </div>
                <span className="text-[#8899b4]">{item.timestamp}</span>
              </div>
              <p className="text-xs font-extrabold text-[#d4a017]">{item.action}</p>
              <p className="text-[11px] text-[#8899b4] leading-relaxed">{item.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
