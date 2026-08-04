"use client";

import React, { useState } from "react";
import Link from "next/link";
import ExecutiveAcademicInsights from "@/components/intelligence/ExecutiveAcademicInsights";
import AcademicHealthIndex from "@/components/intelligence/AcademicHealthIndex";
import {
  Building2, Activity, ShieldCheck, Sparkles, TrendingUp, Users,
  GraduationCap, DollarSign, Award, Calendar, CheckCircle2, Clock,
  AlertTriangle, ArrowUpRight, ChevronRight, Inbox, Briefcase, FileCheck,
  FlaskConical, Globe, Zap, Layers, RefreshCw, BarChart3, Database,
  Cpu, Lock, Check, X, Bell
} from "lucide-react";

const healthPillars = [
  { name: "Academic Excellence", score: 94, status: "Optimal", color: "#4ade80" },
  { name: "Admissions Performance", score: 88, status: "Strong", color: "#d4a017" },
  { name: "Financial Health", score: 96, status: "Optimal", color: "#4ade80" },
  { name: "Research & Innovation", score: 82, status: "Growing", color: "#818cf8" },
  { name: "Digital Infrastructure", score: 99, status: "Optimal", color: "#4ade80" },
  { name: "Governance & Compliance", score: 95, status: "Compliant", color: "#4ade80" },
];

const overallHealthScore = Math.round(
  healthPillars.reduce((acc, p) => acc + p.score, 0) / healthPillars.length
);

const strategicKPIs = [
  { label: "Active Learners", value: "482", change: "+14.2%", trend: "up", icon: Users, color: "#d4a017", subText: "Across 4 Active Cohorts" },
  { label: "Faculty Members", value: "34", change: "+2 this month", trend: "up", icon: GraduationCap, color: "#4ade80", subText: "98% On-Time Grading" },
  { label: "Total Revenue", value: "₦48.2M", change: "+22.5% YoY", trend: "up", icon: DollarSign, color: "#4ade80", subText: "Paystack + Corporate" },
  { label: "Admissions Pipeline", value: "128", change: "42 Under Review", trend: "up", icon: Activity, color: "#818cf8", subText: "Cohort Delta Enrolling" },
  { label: "Certificates Issued", value: "312", change: "100% Verifiable", trend: "up", icon: Award, color: "#d4a017", subText: "QR + Cryptographic Seal" },
  { label: "Graduate Employability", value: "92.4%", change: "+3.1%", trend: "up", icon: Briefcase, color: "#4ade80", subText: "6-Month Placement Rate" },
  { label: "Learner Satisfaction", value: "4.9 / 5.0", change: "NPS +78", trend: "up", icon: Sparkles, color: "#d4a017", subText: "94% Response Rate" },
  { label: "Research & Innovation", value: "18 Projects", change: "6 Patent Drafts", trend: "up", icon: FlaskConical, color: "#818cf8", subText: "DWSA Innovation Labs" },
];

const executiveInboxItems = [
  { id: 1, title: "12 Professional Certificates Awaiting Sign-off", category: "Registry", priority: "High", time: "10 mins ago", type: "approval" },
  { id: 2, title: "Cohort Delta Faculty Allocation Request", category: "Academic", priority: "Medium", time: "45 mins ago", type: "review" },
  { id: 3, title: "Corporate Training Grant Proposal — First Bank PLC", category: "Corporate", priority: "High", time: "2 hours ago", type: "approval" },
  { id: 4, title: "Scholarship Application Batch (Cohort Alpha)", category: "Admissions", priority: "Medium", time: "4 hours ago", type: "review" },
  { id: 5, title: "Quarterly ISO 27001 Compliance Audit Ready", category: "Governance", priority: "Low", time: "Yesterday", type: "info" },
];

const timelineMilestones = [
  { date: "AUG 15", title: "Cohort Delta Applications Close", category: "Admissions", status: "Upcoming", color: "#d4a017" },
  { date: "AUG 22", title: "Cohort Alpha Capstone Presentation & Demo Day", category: "Academic", status: "Scheduled", color: "#4ade80" },
  { date: "SEP 01", title: "DWSA African Tech Summit 2026 Keynote", category: "Corporate", status: "Confirmed", color: "#818cf8" },
  { date: "SEP 10", title: "Faculty Research & Innovation Grants Announcement", category: "Research", status: "Planning", color: "#d4a017" },
];

const corporatePillars = [
  { name: "Enterprise Tech Deployments", clients: "14 Enterprises", revenue: "₦28.5M", growth: "+35%" },
  { name: "Corporate Talent Development", clients: "8 Banks & Telcos", revenue: "₦14.2M", growth: "+28%" },
  { name: "Institutional Consulting", clients: "3 Government Agencies", revenue: "₦5.5M", growth: "+12%" },
];

const platformStatus = [
  { service: "Identity Provider & NextAuth", status: "Operational", uptime: "99.99%" },
  { service: "Paystack Payment Gateway", status: "Operational", uptime: "100%" },
  { service: "PostgreSQL & Prisma Engine", status: "Optimal", uptime: "99.95%" },
  { service: "Serwist PWA & Service Workers", status: "Active", uptime: "100%" },
];

export default function ExecutiveDashboardPage() {
  const [inboxState, setInboxState] = useState(executiveInboxItems);
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  const handleAction = (id: number, actionName: string) => {
    setInboxState((prev) => prev.filter((item) => item.id !== id));
    setActionMessage(`Action processed: ${actionName}`);
    setTimeout(() => setActionMessage(null), 3000);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Toast Alert */}
      {actionMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#061428] border border-[#4ade80]/50 text-[#4ade80] text-xs font-extrabold shadow-2xl flex items-center gap-2 animate-fadeInUp">
          <CheckCircle2 className="w-4 h-4" />
          {actionMessage}
        </div>
      )}

      {/* Top Banner: Mission & Executive Control Header */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0d1628] via-[#061428] to-[#030e1f] border border-[#d4a017]/30 p-6 sm:p-8 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d4a017]/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#d4a017]/15 border border-[#d4a017]/40 text-[#d4a017] text-[10px] font-black uppercase tracking-widest">
                EXECUTIVE OPERATING SYSTEM
              </span>
              <span className="text-[10px] text-[#8899b4] font-bold">• InstitutionOS v3.2A</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Institution Control Centre (ICC)
            </h1>
            <p className="text-xs sm:text-sm text-[#8899b4] leading-relaxed">
              Strategic visibility, academic governance, financial intelligence, and multi-tenant operating control for Digital Technology Academy.
            </p>
          </div>

          {/* Institutional Health Gauge Card */}
          <div className="rounded-2xl bg-[#030e1f]/80 border border-[#d4a017]/30 p-5 flex items-center gap-5 shrink-0 shadow-lg">
            <div className="relative flex items-center justify-center">
              <svg viewBox="0 0 80 80" className="w-20 h-20" aria-hidden="true">
                <circle cx="40" cy="40" r="32" fill="none" stroke="#1a2f4a" strokeWidth="8" />
                <circle
                  cx="40" cy="40" r="32" fill="none"
                  stroke="#4ade80" strokeWidth="8"
                  strokeDasharray={`${2 * Math.PI * 32 * overallHealthScore / 100} ${2 * Math.PI * 32 * (100 - overallHealthScore) / 100}`}
                  strokeLinecap="round"
                  transform="rotate(-90 40 40)"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-xl font-extrabold text-white">{overallHealthScore}</span>
                <span className="block text-[8px] font-black text-[#8899b4] uppercase">/ 100</span>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-black text-[#d4a017] tracking-wider uppercase">Institutional Health</p>
              <p className="text-sm font-extrabold text-white mt-0.5">EXCELLENT</p>
              <p className="text-[10px] text-[#4ade80] font-bold flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3 h-3" /> All 6 Pillars Compliant
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── ACADEMIC INTELLIGENCE LAYER (v3.4) ── */}
      <AcademicHealthIndex />
      <ExecutiveAcademicInsights />

      {/* ── OPERATIONAL INTELLIGENCE & AUTOMATION (v3.7) ── */}
      <div className="rounded-3xl bg-[#061428] border border-[#818cf8]/30 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#818cf8]/15 border border-[#818cf8]/30 flex items-center justify-center">
              <Zap className="w-4 h-4 text-[#818cf8]" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white">Operational Intelligence & Automation Engine</h2>
              <p className="text-[10px] text-[#8899b4]">InstitutionOS v3.7 · Operational Health & Automation Status</p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80] text-[9px] font-black uppercase">
            AUTOMATION ACTIVE
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: "Institution Capacity", value: "96%", sub: "482 / 500 Active Seats", color: "text-[#d4a017]" },
            { label: "Automation Status", value: "94%", sub: "4 Tasks Active · 2 Workflows", color: "text-[#4ade80]" },
            { label: "Workflow Health", value: "100%", sub: "0 Failed Processes", color: "text-[#4ade80]" },
            { label: "Comms Delivery Rate", value: "98.1%", sub: "Multi-Channel Broadcast Hub", color: "text-[#818cf8]" },
            { label: "Pending Approvals", value: "4 Items", sub: "Signature & Review Queue", color: "text-[#d4a017]" },
            { label: "Upcoming Risks", value: "1 Conflict", sub: "Schedule Collision Flagged", color: "text-red-400" },
            { label: "Operational Efficiency", value: "94%", sub: "Automated Resolution Index", color: "text-[#4ade80]" },
            { label: "Readiness Index", value: "92 / 100", sub: "System-Wide Health Score", color: "text-white" },
          ].map((op) => (
            <div key={op.label} className="rounded-2xl bg-[#030e1f] border border-[#1a2f4a] p-3.5 space-y-1">
              <p className="text-[9px] font-black text-[#8899b4] uppercase">{op.label}</p>
              <p className={`text-xl font-extrabold ${op.color}`}>{op.value}</p>
              <p className="text-[9px] text-[#8899b4]">{op.sub}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Enhancement 5: Executive AI Briefing */}
      <div className="rounded-3xl bg-[#061428] border border-[#d4a017]/30 p-6 space-y-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-[#d4a017]/15 border border-[#d4a017]/30 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-[#d4a017]" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white">Executive Intelligence Briefing</h2>
              <p className="text-[10px] text-[#8899b4]">AI Executive Advisory · Updated 08:00 WAT Today</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017] text-[9px] font-black uppercase">
            INTELLIGENCE PREVIEW
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="space-y-2 bg-[#030e1f]/60 p-4 rounded-2xl border border-[#1a2f4a]">
            <p className="text-[10px] font-black text-[#d4a017] uppercase tracking-wider">Good Morning, Executive.</p>
            <ul className="space-y-1.5 text-xs text-[#8899b4]">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
                <strong className="text-white">Admissions:</strong> Applications increased +14.2% this week (Cohort Delta).
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
                <strong className="text-white">Faculty:</strong> Grading completion on target (98% on-time PR reviews).
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80]" />
                <strong className="text-white">Finance:</strong> Tuition revenue remains 22.5% above target.
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <strong className="text-white">Intervention:</strong> 3 learners in Cohort Alpha require academic support.
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-[#d4a017]/10 to-[#030e1f] p-4 rounded-2xl border border-[#d4a017]/30 flex flex-col justify-between">
            <div>
              <p className="text-[10px] font-black text-[#d4a017] uppercase tracking-wider">Today&apos;s Strategic Recommendation</p>
              <p className="text-xs font-extrabold text-white mt-1 leading-snug">
                &ldquo;Review enrolment trends for the School of Blockchain &amp; Digital Trust to allocate additional faculty before Cohort Delta launch.&rdquo;
              </p>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <Link
                href="/dashboard/admin/intelligence"
                className="px-3 py-1.5 rounded-xl bg-[#d4a017] text-[#030e1f] text-[10px] font-black hover:bg-[#b8891a] transition-all flex items-center gap-1"
              >
                Open Digital Twin <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Enhancement 2: Multi-Dimensional Health Index Grid */}
      <div className="space-y-4">
        <h2 className="text-sm font-extrabold text-white uppercase tracking-wider flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#d4a017]" />
          Executive Health Index Breakdown
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {healthPillars.map((pillar) => (
            <div key={pillar.name} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-4 space-y-2 hover:border-[#d4a017]/40 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-[#8899b4] uppercase tracking-wider">{pillar.status}</span>
                <span className="text-xs font-extrabold" style={{ color: pillar.color }}>{pillar.score}%</span>
              </div>
              <p className="text-xs font-extrabold text-white leading-tight">{pillar.name}</p>
              <div className="h-1.5 rounded-full bg-[#030e1f] overflow-hidden">
                <div className="h-full rounded-full transition-all" style={{ width: `${pillar.score}%`, backgroundColor: pillar.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Strategic KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {strategicKPIs.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.label} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-5 hover:border-[#d4a017]/40 transition-all shadow-md group">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${kpi.color}15`, border: `1px solid ${kpi.color}30` }}>
                  <Icon className="w-5 h-5" style={{ color: kpi.color }} />
                </div>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80]">
                  {kpi.change}
                </span>
              </div>
              <p className="text-2xl font-extrabold text-white tracking-tight">{kpi.value}</p>
              <p className="text-xs font-extrabold text-white mt-0.5">{kpi.label}</p>
              <p className="text-[10px] text-[#8899b4] mt-1 font-semibold">{kpi.subText}</p>
            </div>
          );
        })}
      </div>

      {/* Enhancement 3 & 4: Executive Inbox + Institutional Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Executive Inbox */}
        <div className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1a2f4a] pb-4">
            <div className="flex items-center gap-2">
              <Inbox className="w-5 h-5 text-[#d4a017]" />
              <div>
                <h3 className="text-sm font-extrabold text-white">Executive Decision Inbox</h3>
                <p className="text-[10px] text-[#8899b4]">Items requiring executive sign-off or decision</p>
              </div>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#d4a017]/15 border border-[#d4a017]/30 text-[#d4a017] text-[10px] font-black">
              {inboxState.length} PENDING
            </span>
          </div>

          <div className="space-y-3">
            {inboxState.length === 0 ? (
              <div className="py-8 text-center text-[#8899b4] text-xs">
                ✓ Executive Inbox is clear. No pending items.
              </div>
            ) : (
              inboxState.map((item) => (
                <div key={item.id} className="rounded-2xl bg-[#030e1f] border border-[#1a2f4a] p-4 space-y-2 hover:border-[#d4a017]/30 transition-all">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded bg-[#1a2f4a] text-[#8899b4] text-[9px] font-black uppercase">{item.category}</span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase ${item.priority === "High" ? "bg-amber-950/40 text-amber-400 border border-amber-800/40" : "bg-indigo-950/40 text-indigo-400"}`}>
                          {item.priority}
                        </span>
                      </div>
                      <p className="text-xs font-extrabold text-white">{item.title}</p>
                      <p className="text-[10px] text-[#8899b4] mt-0.5">{item.time}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleAction(item.id, "Approved & Signed")}
                        className="p-1.5 rounded-lg bg-[#4ade80]/15 border border-[#4ade80]/30 text-[#4ade80] hover:bg-[#4ade80]/30 transition-all"
                        title="Approve"
                      >
                        <Check className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleAction(item.id, "Deferred for Review")}
                        className="p-1.5 rounded-lg bg-[#1a2f4a] text-[#8899b4] hover:text-white transition-all"
                        title="Defer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Institutional Timeline */}
        <div className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1a2f4a] pb-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#d4a017]" />
              <div>
                <h3 className="text-sm font-extrabold text-white">Strategic Institutional Timeline</h3>
                <p className="text-[10px] text-[#8899b4]">Upcoming key academic &amp; corporate milestones</p>
              </div>
            </div>
            <Link href="/dashboard/admin/academic" className="text-[10px] font-extrabold text-[#d4a017] hover:underline flex items-center gap-1">
              View Calendar <ChevronRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="space-y-3">
            {timelineMilestones.map((m) => (
              <div key={m.title} className="flex items-center gap-4 rounded-2xl bg-[#030e1f] border border-[#1a2f4a] p-3.5 hover:border-[#d4a017]/30 transition-all">
                <div className="w-12 h-12 rounded-xl bg-[#061428] border border-[#d4a017]/30 flex flex-col items-center justify-center shrink-0">
                  <span className="text-[10px] font-black text-[#d4a017]">{m.date.split(" ")[0]}</span>
                  <span className="text-xs font-black text-white">{m.date.split(" ")[1]}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black text-[#8899b4] uppercase">{m.category}</span>
                    <span className="w-1 h-1 rounded-full bg-[#8899b4]" />
                    <span className="text-[9px] font-black" style={{ color: m.color }}>{m.status}</span>
                  </div>
                  <p className="text-xs font-extrabold text-white truncate">{m.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhancement 9: Corporate Intelligence (DWSA Ecosystem Integration) */}
      <div className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#1a2f4a] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-[#d4a017]" />
              <h3 className="text-sm font-extrabold text-white">DWSA Corporate &amp; Ecosystem Intelligence</h3>
            </div>
            <p className="text-[10px] text-[#8899b4]">Enterprise tech deployment, corporate training &amp; institutional consulting</p>
          </div>
          <span className="px-3 py-1 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-[#d4a017] text-[10px] font-black">
            Total Ecosystem Revenue: ₦48.2M
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {corporatePillars.map((p) => (
            <div key={p.name} className="rounded-2xl bg-[#030e1f] border border-[#1a2f4a] p-4 space-y-2">
              <p className="text-xs font-extrabold text-white">{p.name}</p>
              <div className="flex items-baseline justify-between">
                <span className="text-lg font-black text-[#4ade80]">{p.revenue}</span>
                <span className="text-[10px] font-bold text-[#d4a017]">{p.growth}</span>
              </div>
              <p className="text-[10px] text-[#8899b4]">{p.clients}</p>
            </div>
          ))}
        </div>
      </div>

      {/* System Infrastructure & Navigation Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Module Navigation Hub */}
        <div className="lg:col-span-2 rounded-3xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#d4a017]" />
            Institution Control Centre Modules
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { title: "Financial ERP", href: "/dashboard/admin/finance", icon: DollarSign, badge: "Core ERP" },
              { title: "Admissions Pipeline", href: "/dashboard/admin/admissions", icon: Activity, badge: "Pipeline" },
              { title: "Academic Ops", href: "/dashboard/admin/academic", icon: GraduationCap, badge: "Curriculum" },
              { title: "Faculty Centre", href: "/dashboard/admin/faculty", icon: Users, badge: "Directory" },
              { title: "Student Success", href: "/dashboard/admin/students", icon: TrendingUp, badge: "Analytics" },
              { title: "Certificate Auth", href: "/dashboard/admin/certificates", icon: Award, badge: "QR Seal" },
              { title: "Research & Innovation", href: "/dashboard/admin/research", icon: FlaskConical, badge: "Labs" },
              { title: "Governance & Audit", href: "/dashboard/admin/governance", icon: ShieldCheck, badge: "Audit" },
              { title: "System Settings", href: "/dashboard/admin/settings", icon: Cpu, badge: "Config" },
            ].map((mod) => {
              const Icon = mod.icon;
              return (
                <Link
                  key={mod.title}
                  href={mod.href}
                  className="rounded-2xl bg-[#030e1f] border border-[#1a2f4a] p-4 hover:border-[#d4a017]/40 hover:bg-[#0f223d]/50 transition-all space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <div className="w-8 h-8 rounded-xl bg-[#d4a017]/10 border border-[#d4a017]/25 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4 text-[#d4a017]" />
                    </div>
                    <span className="text-[8px] font-black px-1.5 py-0.5 rounded bg-[#1a2f4a] text-[#8899b4]">{mod.badge}</span>
                  </div>
                  <p className="text-xs font-extrabold text-white group-hover:text-[#d4a017] transition-colors">{mod.title}</p>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Platform Status */}
        <div className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#4ade80]" />
            Infrastructure Status
          </h3>

          <div className="space-y-3">
            {platformStatus.map((ps) => (
              <div key={ps.service} className="rounded-xl bg-[#030e1f] border border-[#1a2f4a] p-3 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-white">{ps.service}</p>
                  <p className="text-[10px] text-[#4ade80] font-semibold flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
                    {ps.status}
                  </p>
                </div>
                <span className="text-[10px] font-black text-[#8899b4]">{ps.uptime}</span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-[#1a2f4a] flex items-center justify-between text-[10px] text-[#8899b4]">
            <span>InstitutionOS Kernel v3.2A</span>
            <span className="text-[#4ade80] font-bold">100% HEALTHY</span>
          </div>
        </div>
      </div>
    </div>
  );
}
