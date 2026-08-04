"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import {
  UserCircle, Star, Award, BookOpen, GitBranch, Clock,
  FlaskConical, Globe, CheckCircle2, Edit3, BarChart3,
  Users, GitPullRequest, Video, Lightbulb, Shield, Zap,
} from "lucide-react";

const expertiseAreas = ["React.js", "Next.js", "TypeScript", "Node.js", "PostgreSQL", "REST APIs", "UI/UX Design", "Git & GitHub"];

const techStack = ["React", "Next.js", "TypeScript", "Node.js", "Express", "PostgreSQL", "Prisma", "Tailwind CSS", "Git", "Figma"];

const qualifications = [
  "BSc Computer Science — University of Lagos",
  "MSc Software Engineering — Covenant University",
  "AWS Certified Solutions Architect",
  "Google UX Design Certificate",
];

const recognitionBadges = [
  { title: "Mentor of the Month", icon: Star, color: "#d4a017", earned: true, date: "July 2025" },
  { title: "PR Review Champion", icon: GitPullRequest, color: "#4ade80", earned: true, date: "June 2025" },
  { title: "Curriculum Contributor", icon: BookOpen, color: "#818cf8", earned: true, date: "May 2025" },
  { title: "Innovation Leader", icon: Zap, color: "#f59e0b", earned: false, date: null },
  { title: "Research Excellence", icon: FlaskConical, color: "#60a5fa", earned: false, date: null },
  { title: "Community Builder", icon: Users, color: "#4ade80", earned: false, date: null },
  { title: "Outstanding Faculty Service", icon: Award, color: "#d4a017", earned: false, date: null },
];

const teachingStats = [
  { label: "Courses Taught", value: "6", icon: BookOpen, color: "#d4a017" },
  { label: "Students Taught", value: "187", icon: Users, color: "#4ade80" },
  { label: "Projects Supervised", value: "94", icon: GitPullRequest, color: "#818cf8" },
  { label: "Live Sessions", value: "48", icon: Video, color: "#60a5fa" },
  { label: "Avg Satisfaction", value: "4.8/5", icon: Star, color: "#f59e0b" },
  { label: "Completion Rate", value: "73%", icon: BarChart3, color: "#4ade80" },
];

const researchAreas = [
  { title: "AI in Technical Education", status: "Active", statusColor: "text-[#4ade80]", statusBg: "bg-[#4ade80]/10 border-[#4ade80]/30" },
  { title: "Full-Stack Curriculum Design for African Contexts", status: "Active", statusColor: "text-[#4ade80]", statusBg: "bg-[#4ade80]/10 border-[#4ade80]/30" },
  { title: "Open Source Contribution in Emerging Markets", status: "Planning", statusColor: "text-amber-400", statusBg: "bg-amber-950/30 border-amber-800/30" },
];

const innovationModules = [
  { label: "Research Projects", icon: FlaskConical, coming: false },
  { label: "Innovation Challenges", icon: Lightbulb, coming: false },
  { label: "Publications", icon: BookOpen, coming: true },
  { label: "Conference Papers", icon: Globe, coming: true },
  { label: "Industry Collaboration", icon: Users, coming: true },
  { label: "Grant Opportunities", icon: Shield, coming: true },
];

export default function FacultyProfilePage() {
  const { data: session } = useSession();
  const [activeSection, setActiveSection] = useState<"profile" | "research" | "recognition" | "settings">("profile");
  const [bio, setBio] = useState("Experienced software engineer and educator dedicated to building Africa's next generation of technology professionals. Specialising in full-stack web development, TypeScript, and modern JavaScript frameworks.");
  const [officeHours, setOfficeHours] = useState("Monday & Wednesday, 16:00–18:00 WAT");
  const [editingBio, setEditingBio] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);

  const name = session?.user?.name || "Faculty Member";
  const initial = name[0]?.toUpperCase() || "F";

  const handleSave = () => {
    setEditingBio(false);
    setSavedMsg(true);
    setTimeout(() => setSavedMsg(false), 2000);
  };

  const sections = [
    { key: "profile", label: "Profile" },
    { key: "research", label: "Research & Innovation" },
    { key: "recognition", label: "Recognition" },
    { key: "settings", label: "Settings" },
  ] as const;

  return (
    <div className="space-y-8 pb-12">
      {/* Header Card */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0d1628] to-[#061428] border border-[#d4a017]/25 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#d4a017] to-[#b8891a] flex items-center justify-center font-black text-3xl text-[#030e1f] shrink-0 shadow-lg">
            {initial}
          </div>
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-extrabold text-white">{name}</h2>
            <p className="text-sm text-[#d4a017] font-bold mt-0.5">Instructor · Digital Technology Academy</p>
            <p className="text-[11px] text-[#8899b4] mt-1">Faculty Workspace · InstitutionOS v3.1</p>
            <div className="flex flex-wrap gap-2 mt-3">
              {expertiseAreas.slice(0, 5).map((area) => (
                <span key={area} className="px-2.5 py-1 rounded-lg bg-[#d4a017]/10 border border-[#d4a017]/20 text-[9px] font-bold text-[#d4a017]">
                  {area}
                </span>
              ))}
              {expertiseAreas.length > 5 && (
                <span className="px-2.5 py-1 rounded-lg bg-[#061428] border border-[#1a2f4a] text-[9px] font-bold text-[#8899b4]">
                  +{expertiseAreas.length - 5} more
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2 shrink-0">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#4ade80]/10 border border-[#4ade80]/25">
              <div className="w-2 h-2 rounded-full bg-[#4ade80]" aria-hidden="true" />
              <span className="text-[10px] font-black text-[#4ade80]">AVAILABLE</span>
            </div>
            <div className="flex items-center gap-1.5 text-[10px] text-[#8899b4]">
              <Clock className="w-3 h-3" aria-hidden="true" />
              <span>{officeHours}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Section Tabs */}
      <div className="flex gap-2 flex-wrap" role="tablist">
        {sections.map(({ key, label }) => (
          <button
            key={key}
            role="tab"
            aria-selected={activeSection === key}
            onClick={() => setActiveSection(key)}
            className={`px-4 py-2 rounded-xl text-[11px] font-black border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] ${
              activeSection === key
                ? "bg-[#d4a017]/15 border-[#d4a017]/40 text-[#d4a017]"
                : "bg-[#061428] border-[#1a2f4a] text-[#8899b4] hover:border-[#d4a017]/30"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Profile Section */}
      {activeSection === "profile" && (
        <div className="space-y-6">
          {/* Teaching Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {teachingStats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-4">
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center mb-3" style={{ backgroundColor: `${s.color}20`, border: `1px solid ${s.color}30` }}>
                    <Icon className="w-4 h-4" style={{ color: s.color }} aria-hidden="true" />
                  </div>
                  <p className="text-xl font-extrabold text-white">{s.value}</p>
                  <p className="text-[10px] text-[#8899b4] font-semibold leading-tight mt-0.5">{s.label}</p>
                </div>
              );
            })}
          </div>

          {/* Biography */}
          <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-5">
            <div className="flex items-center justify-between mb-3">
              <p className="text-xs font-black text-[#d4a017] tracking-wider uppercase">Biography</p>
              <button onClick={() => setEditingBio(!editingBio)} className="flex items-center gap-1.5 text-[10px] font-bold text-[#8899b4] hover:text-[#d4a017] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] rounded px-1">
                <Edit3 className="w-3 h-3" /> Edit
              </button>
            </div>
            {editingBio ? (
              <div className="space-y-3">
                <textarea rows={4} value={bio} onChange={(e) => setBio(e.target.value)} className="w-full px-3 py-2.5 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white focus:outline-none focus:border-[#d4a017]/60 transition-all resize-none" />
                <div className="flex items-center gap-2">
                  <button onClick={handleSave} className="px-3 py-2 rounded-xl bg-[#d4a017]/15 border border-[#d4a017]/40 text-[#d4a017] text-[10px] font-black hover:bg-[#d4a017]/25 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]">Save</button>
                  <button onClick={() => setEditingBio(false)} className="px-3 py-2 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-[#8899b4] text-[10px] font-black hover:border-[#d4a017]/30 transition-all">Cancel</button>
                  {savedMsg && <span className="text-[#4ade80] text-[10px] font-bold flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Saved</span>}
                </div>
              </div>
            ) : (
              <p className="text-xs text-[#8899b4] leading-relaxed">{bio}</p>
            )}
          </div>

          {/* Qualifications */}
          <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-5">
            <p className="text-xs font-black text-[#d4a017] tracking-wider uppercase mb-3">Qualifications & Certifications</p>
            <ul className="space-y-2">
              {qualifications.map((q) => (
                <li key={q} className="flex items-center gap-2.5 text-xs text-[#8899b4]">
                  <CheckCircle2 className="w-4 h-4 text-[#4ade80] shrink-0" aria-hidden="true" />
                  {q}
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack */}
          <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-5">
            <p className="text-xs font-black text-[#d4a017] tracking-wider uppercase mb-3">Technology Stack</p>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span key={tech} className="px-3 py-1.5 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-[10px] font-bold text-[#8899b4]">{tech}</span>
              ))}
            </div>
          </div>

          {/* Office Hours */}
          <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-5">
            <p className="text-xs font-black text-[#d4a017] tracking-wider uppercase mb-3">Office Hours</p>
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs text-white font-bold">{officeHours}</p>
              <button onClick={() => {}} className="text-[10px] font-bold text-[#8899b4] hover:text-[#d4a017] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] rounded px-1 flex items-center gap-1">
                <Edit3 className="w-3 h-3" /> Edit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Research & Innovation Section */}
      {activeSection === "research" && (
        <div className="space-y-6" id="research">
          <div className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-6">
            <p className="text-xs font-black text-[#d4a017] tracking-wider uppercase mb-4">Research Interests & Projects</p>
            <div className="space-y-3">
              {researchAreas.map((r) => (
                <div key={r.title} className="flex items-center justify-between rounded-2xl bg-[#030e1f]/60 border border-[#1a2f4a] p-4">
                  <div className="flex items-center gap-3">
                    <FlaskConical className="w-4 h-4 text-[#818cf8]" aria-hidden="true" />
                    <span className="text-xs font-bold text-white">{r.title}</span>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-[9px] font-black border ${r.statusBg} ${r.statusColor}`}>{r.status}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {innovationModules.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.label} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-4 flex flex-col items-center text-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-[#818cf8]/10 border border-[#818cf8]/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-[#818cf8]" aria-hidden="true" />
                  </div>
                  <p className="text-[10px] font-bold text-[#8899b4] leading-tight">{m.label}</p>
                  {m.coming && (
                    <span className="px-2 py-0.5 rounded-full bg-[#030e1f] border border-[#1a2f4a] text-[8px] font-black text-[#8899b4]">COMING SOON</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Recognition Section */}
      {activeSection === "recognition" && (
        <div className="space-y-6" id="recognition">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {recognitionBadges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.title}
                  className={`rounded-2xl p-4 text-center border transition-all ${
                    badge.earned
                      ? "bg-[#061428] border-[#d4a017]/30 hover:border-[#d4a017]/60"
                      : "bg-[#030e1f]/40 border-[#1a2f4a] opacity-50"
                  }`}
                >
                  <div className="w-12 h-12 rounded-xl mx-auto mb-3 flex items-center justify-center" style={{ backgroundColor: `${badge.color}20`, border: `1px solid ${badge.color}40` }}>
                    <Icon className="w-6 h-6" style={{ color: badge.color }} aria-hidden="true" />
                  </div>
                  <p className="text-[10px] font-bold text-[#8899b4] leading-tight">{badge.title}</p>
                  {badge.earned ? (
                    <p className="text-[9px] font-black text-[#4ade80] mt-1">✓ EARNED · {badge.date}</p>
                  ) : (
                    <p className="text-[9px] text-[#8899b4] mt-1">Not yet earned</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Settings Section */}
      {activeSection === "settings" && (
        <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4" id="settings">
          <p className="text-xs font-black text-[#d4a017] tracking-wider uppercase">Account & Notification Settings</p>
          {["Email Notifications", "PR Review Alerts", "Learner At-Risk Alerts", "Announcement Reminders", "Live Session Reminders", "Faculty Community Digest"].map((setting, i) => (
            <div key={setting} className="flex items-center justify-between py-3 border-b border-[#1a2f4a] last:border-b-0">
              <span className="text-xs font-semibold text-[#8899b4]">{setting}</span>
              <button
                className="w-10 h-5 rounded-full bg-[#d4a017] relative transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
                role="switch"
                aria-checked={i % 3 !== 0}
                aria-label={`Toggle ${setting}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-[#030e1f] transition-all ${i % 3 !== 0 ? "left-5" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
