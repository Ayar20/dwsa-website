"use client";

import React, { useState } from "react";
import {
  ShieldCheck, Lock, FileText, Activity, CheckCircle2, AlertTriangle,
  Search, Eye, Shield, Key
} from "lucide-react";

const auditLogs = [
  { id: 1, action: "Payment Override Approved", actor: "Executive Admin", target: "Kofi Asante (Cohort Alpha)", timestamp: "10 mins ago", ip: "197.210.64.12" },
  { id: 2, action: "Faculty Appointment Updated", actor: "Academic Registrar", target: "Dr. Olumide Adeleke", timestamp: "1 hour ago", ip: "197.210.64.12" },
  { id: 3, action: "Certificate Batch Signed", actor: "Executive Admin", target: "3 Professional Diplomas", timestamp: "3 hours ago", ip: "197.210.64.12" },
  { id: 4, action: "User Role Escalation", actor: "System Security Kernel", target: "Aisha Ibrahim (INSTRUCTOR)", timestamp: "Yesterday", ip: "127.0.0.1" },
];

const governancePolicies = [
  { title: "DWSA Academic Operations Manual 2026", status: "Ratified", code: "POL-ACAD-01" },
  { title: "Student Data Privacy & GDPR Policy", status: "Ratified", code: "POL-PRIV-04" },
  { title: "Faculty Code of Ethics & Conduct", status: "Ratified", code: "POL-GOV-02" },
  { title: "Financial Controls & ERP Audit Guidelines", status: "Under Review", code: "POL-FIN-09" },
];

export default function GovernancePage() {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-[#4ade80]/15 text-[#4ade80] text-[9px] font-black uppercase">GOVERNANCE &amp; AUDIT</span>
          <span className="text-[10px] text-[#8899b4]">DWSA Corporate Compliance</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white mt-1">Governance &amp; Compliance Centre</h2>
        <p className="text-xs text-[#8899b4]">System audit logs, institutional policies, risk register, and enterprise role permissions</p>
      </div>

      {/* Policies */}
      <div className="space-y-4">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
          <FileText className="w-4 h-4 text-[#d4a017]" />
          Ratified Institutional Policies
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {governancePolicies.map((p) => (
            <div key={p.code} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-5 flex items-center justify-between">
              <div>
                <span className="text-[9px] font-mono text-[#d4a017] font-bold">{p.code}</span>
                <h4 className="text-xs font-extrabold text-white mt-0.5">{p.title}</h4>
              </div>
              <span className={`px-2 py-0.5 rounded text-[9px] font-black border ${p.status === "Ratified" ? "bg-[#4ade80]/10 border-[#4ade80]/30 text-[#4ade80]" : "bg-amber-950/30 text-amber-400"}`}>
                {p.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Log */}
      <div className="space-y-4">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#4ade80]" />
          System Activity &amp; Executive Audit Log
        </h3>
        <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#030e1f] text-[#8899b4] text-[10px] uppercase font-black tracking-wider border-b border-[#1a2f4a]">
              <tr>
                <th className="p-4">Action</th>
                <th className="p-4">Actor</th>
                <th className="p-4">Target Entity</th>
                <th className="p-4">Timestamp</th>
                <th className="p-4 text-right">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a2f4a] text-white">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#0f223d]/40 transition-colors">
                  <td className="p-4 font-bold text-[#d4a017]">{log.action}</td>
                  <td className="p-4">{log.actor}</td>
                  <td className="p-4 text-[#8899b4]">{log.target}</td>
                  <td className="p-4 text-[#8899b4]">{log.timestamp}</td>
                  <td className="p-4 text-right font-mono text-[10px] text-[#8899b4]">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
