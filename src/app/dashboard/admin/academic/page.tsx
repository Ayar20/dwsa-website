"use client";

import React, { useState } from "react";
import {
  GraduationCap, BookOpen, Layers, Calendar, Users, PlusCircle,
  Edit3, CheckCircle2, Clock, Search, ChevronRight, Download,
  Building2, Globe, Shield, Sparkles, Folder
} from "lucide-react";

const schools = [
  { id: 1, name: "School of Software Engineering", dean: "Dr. Olumide Adeleke", programmes: 3, students: 240, status: "Active" },
  { id: 2, name: "School of Artificial Intelligence & Data", dean: "Prof. Amina Bello", programmes: 2, students: 142, status: "Active" },
  { id: 3, name: "School of Blockchain & Digital Trust", dean: "Dr. Marcus Vance", programmes: 2, students: 100, status: "Active" },
];

const programmes = [
  { id: 1, title: "Full-Stack Software Engineering (DLX)", school: "School of Software Engineering", duration: "24 Weeks", credits: 60, status: "Active", cohort: "Cohort Alpha & Beta" },
  { id: 2, title: "AI & Data Engineering Track", school: "School of Artificial Intelligence & Data", duration: "16 Weeks", credits: 40, status: "Active", cohort: "Cohort Gamma" },
  { id: 3, title: "Blockchain & Smart Contract Architecture", school: "School of Blockchain & Digital Trust", duration: "12 Weeks", credits: 30, status: "Enrolling", cohort: "Cohort Delta" },
];

const academicCalendar = [
  { term: "Trimester 2 (2026)", start: "May 01, 2026", end: "Aug 30, 2026", status: "In Progress" },
  { term: "Trimester 3 (2026)", start: "Sep 07, 2026", end: "Dec 20, 2026", status: "Upcoming" },
];

export default function AcademicOperationsPage() {
  const [activeTab, setActiveTab] = useState<"schools" | "programmes" | "calendar">("schools");
  const [showModal, setShowModal] = useState(false);
  const [newItemName, setNewItemName] = useState("");
  const [toast, setToast] = useState<string | null>(null);

  const handleCreate = () => {
    if (!newItemName) return;
    setShowModal(false);
    setToast(`New Academic Item "${newItemName}" created successfully!`);
    setNewItemName("");
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Toast Alert */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#061428] border border-[#4ade80]/50 text-[#4ade80] text-xs font-extrabold shadow-2xl flex items-center gap-2 animate-fadeInUp">
          <CheckCircle2 className="w-4 h-4" />
          {toast}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-[#d4a017]/15 text-[#d4a017] text-[9px] font-black uppercase">ACADEMIC GOVERNANCE</span>
            <span className="text-[10px] text-[#8899b4]">InstitutionOS v3.2</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white mt-1">Academic Operations Centre</h2>
          <p className="text-xs text-[#8899b4]">Manage Schools, Academic Programmes, Curriculum Tracks, and Institutional Calendar</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#d4a017] text-[#030e1f] text-xs font-extrabold hover:bg-[#b8891a] transition-all"
        >
          <PlusCircle className="w-4 h-4" /> Add Academic Unit
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#1a2f4a] pb-3" role="tablist">
        {[
          { key: "schools", label: "Schools & Departments", icon: Building2 },
          { key: "programmes", label: "Programmes & Tracks", icon: BookOpen },
          { key: "calendar", label: "Academic Calendar", icon: Calendar },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveTab(tab.key as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] ${
                isActive
                  ? "bg-[#d4a017]/15 border border-[#d4a017]/40 text-[#d4a017]"
                  : "text-[#8899b4] hover:text-white hover:bg-[#061428]"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Schools Section */}
      {activeTab === "schools" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {schools.map((school) => (
            <div key={school.id} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4 hover:border-[#d4a017]/30 transition-all">
              <div className="w-10 h-10 rounded-xl bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017] flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-extrabold text-white">{school.name}</h3>
                <p className="text-xs text-[#8899b4] mt-0.5">Dean: {school.dean}</p>
              </div>
              <div className="flex items-center justify-between text-xs border-t border-[#1a2f4a] pt-3 text-[#8899b4]">
                <span>{school.programmes} Programmes</span>
                <span className="text-white font-bold">{school.students} Students</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Programmes Section */}
      {activeTab === "programmes" && (
        <div className="space-y-3">
          {programmes.map((prog) => (
            <div key={prog.id} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-[#1a2f4a] text-[#d4a017] text-[9px] font-black">{prog.school}</span>
                  <span className="px-2 py-0.5 rounded bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80] text-[9px] font-black">{prog.status}</span>
                </div>
                <h3 className="text-sm font-extrabold text-white mt-1">{prog.title}</h3>
                <p className="text-xs text-[#8899b4] mt-0.5">Duration: {prog.duration} · Credits: {prog.credits} · Active: {prog.cohort}</p>
              </div>
              <button className="px-3 py-1.5 rounded-xl bg-[#030e1f] border border-[#d4a017]/30 text-[#d4a017] text-xs font-bold hover:bg-[#d4a017] hover:text-[#030e1f] transition-all">
                Edit Curriculum Track
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Calendar Section */}
      {activeTab === "calendar" && (
        <div className="space-y-3">
          {academicCalendar.map((cal) => (
            <div key={cal.term} className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-5 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-extrabold text-white">{cal.term}</h3>
                <p className="text-xs text-[#8899b4] mt-0.5">{cal.start} — {cal.end}</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80] text-xs font-bold">
                {cal.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Modal Placeholder */}
      {showModal && (
        <div className="fixed inset-0 bg-[#030e1f]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#061428] border border-[#d4a017]/40 rounded-3xl p-6 max-w-md w-full space-y-4">
            <h3 className="text-base font-extrabold text-white">Create New Academic Unit</h3>
            <input
              type="text"
              placeholder="e.g. School of Cybersecurity & Cloud Infrastructure"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white focus:outline-none focus:border-[#d4a017]"
            />
            <div className="flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl bg-[#030e1f] text-[#8899b4] text-xs font-bold">Cancel</button>
              <button onClick={handleCreate} className="px-4 py-2 rounded-xl bg-[#d4a017] text-[#030e1f] text-xs font-extrabold">Create Unit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
