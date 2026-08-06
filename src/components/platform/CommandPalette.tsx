"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Search, Sparkles, Command, ArrowRight, UserPlus, BookOpen, Award,
  ShieldCheck, Briefcase, FileCheck, Layers, Building2, Store, Zap,
  Globe, Users, GraduationCap, DollarSign, Settings, Clock, Star,
  X, ChevronRight, HelpCircle, CheckCircle2, Terminal, Activity
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  userRole?: "STUDENT" | "INSTRUCTOR" | "ADMIN" | "SUPER_ADMIN";
}

interface PaletteItem {
  id: string;
  title: string;
  category: "Navigation" | "Commands" | "Entities" | "AI Suggestions";
  description?: string;
  href?: string;
  action?: () => void;
  icon: React.ElementType;
  badge?: string;
  roles?: string[];
  pinned?: boolean;
}

export default function CommandPalette({ isOpen, onClose, userRole = "ADMIN" }: CommandPaletteProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [pinnedIds, setPinnedIds] = useState<string[]>(["nav-student-identity", "cmd-cert", "nav-icc"]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load recent searches from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("iux_recent_searches");
      if (saved) setRecentSearches(JSON.parse(saved));
    } catch (e) {
      // Ignore storage errors
    }
  }, []);

  // Auto-focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  // Master Palette Items List
  const allItems: PaletteItem[] = useMemo(() => [
    // ── COMMANDS ──
    {
      id: "cmd-cert",
      title: "Issue Verifiable Certificate",
      category: "Commands",
      description: "Generate QR + Cryptographic academic diploma",
      href: "/dashboard/admin/certificates",
      icon: Award,
      badge: "ACTION",
      roles: ["ADMIN", "SUPER_ADMIN"],
    },
    {
      id: "cmd-provision",
      title: "Provision New Institution",
      category: "Commands",
      description: "Launch multi-tenant campus wizard",
      href: "/dashboard/platform/provision",
      icon: UserPlus,
      badge: "WIZARD",
      roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
      id: "cmd-crm",
      title: "Open Enterprise CRM",
      category: "Commands",
      description: "Manage institution lead pipeline & deals",
      href: "/dashboard/platform/crm",
      icon: Users,
      badge: "CRM",
      roles: ["SUPER_ADMIN", "ADMIN"],
    },
    {
      id: "cmd-[#15803D]",
      title: "View Digital Skills Passport",
      category: "Commands",
      description: "Inspect learner verified competency radar",
      href: "/dashboard/student/skills",
      icon: ShieldCheck,
      badge: "PASSPORT",
      roles: ["STUDENT", "INSTRUCTOR", "ADMIN"],
    },
    {
      id: "cmd-report",
      title: "Generate Executive Report",
      category: "Commands",
      description: "Download academic & financial BI summary",
      href: "/dashboard/admin/reports",
      icon: FileCheck,
      badge: "BI",
      roles: ["ADMIN", "SUPER_ADMIN"],
    },
    {
      id: "cmd-live-session",
      title: "Launch Live Class Session",
      category: "Commands",
      description: "Start real-time cohort stream & attendance",
      href: "/dashboard/instructor/cohorts#live-classes",
      icon: Zap,
      badge: "LIVE",
      roles: ["INSTRUCTOR", "ADMIN"],
    },

    // ── NAVIGATION ──
    {
      id: "nav-icc",
      title: "Executive Dashboard (ICC)",
      category: "Navigation",
      description: "Institution Control Centre",
      href: "/dashboard/admin",
      icon: Building2,
      badge: "ICC",
    },
    {
      id: "nav-platform",
      title: "Platform Command Centre",
      category: "Navigation",
      description: "Global Multi-Tenant Administration",
      href: "/dashboard/platform",
      icon: Globe,
      badge: "SUPER ADMIN",
    },
    {
      id: "nav-[#15803D]-home",
      title: "Faculty Workspace Home",
      category: "Navigation",
      description: "Academic Delivery & Cohort Management",
      href: "/dashboard/instructor",
      icon: BookOpen,
      badge: "FACULTY",
    },
    {
      id: "nav-student-home",
      title: "Student Campus Home",
      category: "Navigation",
      description: "Digital Learning Workspace",
      href: "/dashboard/student",
      icon: GraduationCap,
      badge: "CAMPUS",
    },
    {
      id: "nav-marketplace",
      title: "Enterprise Extension Marketplace",
      category: "Navigation",
      description: "v5.2 Certified Module Registry",
      href: "/dashboard/platform/marketplace",
      icon: Store,
      badge: "MARKETPLACE",
    },
    {
      id: "nav-student-identity",
      title: "Digital Identity Workspace",
      category: "Navigation",
      description: "Verified Learner Credentials & Profile",
      href: "/dashboard/student/identity",
      icon: ShieldCheck,
      badge: "IDENTITY",
    },
    {
      id: "nav-academic",
      title: "Learning Analytics & Governance",
      category: "Navigation",
      description: "Institutional Academic Performance",
      href: "/dashboard/admin/academic",
      icon: Activity,
    },
    {
      id: "nav-finance",
      title: "Financial ERP & Business Intelligence",
      category: "Navigation",
      description: "Tuition, Paystack & MRR Tracking",
      href: "/dashboard/admin/finance",
      icon: DollarSign,
    },

    // ── ENTITIES & AI SUGGESTIONS ──
    {
      id: "entity-delta",
      title: "Cohort Delta (AI & Blockchain Engineering)",
      category: "Entities",
      description: "Active Cohort · 128 Learners Enrolled",
      href: "/dashboard/instructor/cohorts",
      icon: GraduationCap,
      badge: "COHORT",
    },
    {
      id: "ai-apex",
      title: "Apex — Executive AI Agent",
      category: "AI Suggestions",
      description: "Strategic Institutional AI Advisory",
      href: "/dashboard/admin/ai-executive",
      icon: Sparkles,
      badge: "AI AGENT",
    },
    {
      id: "ai-sage",
      title: "Sage — AI Teaching Agent",
      category: "AI Suggestions",
      description: "Automated PR Review & Lesson Studio",
      href: "/dashboard/instructor/ai-agent",
      icon: Sparkles,
      badge: "AI AGENT",
    },
    {
      id: "ai-aida",
      title: "Aida — Student Learning Agent",
      category: "AI Suggestions",
      description: "24/7 Coding Tutor & Homework Help",
      href: "/dashboard/student/ai-agent",
      icon: Sparkles,
      badge: "AI AGENT",
    },
  ], []);

  // Filter items based on query & scoring
  const filteredItems = useMemo(() => {
    if (!query.trim()) {
      // Default view: Pinned + AI Suggestions + Core Commands
      return allItems.filter((item) => {
        if (pinnedIds.includes(item.id)) return true;
        if (item.category === "AI Suggestions") return true;
        if (item.category === "Commands") return true;
        return false;
      });
    }

    const q = query.toLowerCase();
    return allItems
      .filter((item) => {
        return (
          item.title.toLowerCase().includes(q) ||
          (item.description && item.description.toLowerCase().includes(q)) ||
          item.category.toLowerCase().includes(q)
        );
      })
      .slice(0, 12);
  }, [query, allItems, pinnedIds]);

  // Keep selected index within bounds
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Execute selected item
  const handleSelect = (item: PaletteItem) => {
    // Save to recent searches
    try {
      const updated = [item.title, ...recentSearches.filter((s) => s !== item.title)].slice(0, 5);
      setRecentSearches(updated);
      localStorage.setItem("iux_recent_searches", JSON.stringify(updated));
    } catch (e) {
      // Ignore
    }

    onClose();
    if (item.action) {
      item.action();
    } else if (item.href) {
      router.push(item.href);
    }
  };

  // Toggle Pinned Status
  const togglePin = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setPinnedIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      handleSelect(filteredItems[selectedIndex]);
    } else if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Universal Command Palette"
    >
      <div
        className="w-full max-w-2xl bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh] animate-fadeInUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-[#F8FAFC]">
          <Search className="w-5 h-5 text-[#15803D] shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command or search (Pages, Students, Courses, Certificates)..."
            className="flex-1 bg-transparent border-none text-sm font-semibold text-[#0F172A] placeholder-slate-400 focus:outline-none focus:ring-0"
            aria-label="Search prompt"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-1 text-slate-400 hover:text-slate-600 rounded-lg text-xs"
              aria-label="Clear input"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 bg-white border border-slate-200 text-[10px] font-black text-slate-500 rounded-md shadow-xs">
            ESC
          </kbd>
        </div>

        {/* Quick Recent Searches Chips (When no query typed) */}
        {!query && recentSearches.length > 0 && (
          <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-100 flex items-center gap-2 overflow-x-auto text-[11px]">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-400 font-bold text-[10px] uppercase tracking-wider">Recent:</span>
            {recentSearches.map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="px-2.5 py-0.5 rounded-full bg-white border border-slate-200 text-slate-600 font-semibold hover:border-[#15803D] hover:text-[#15803D] transition-colors shrink-0"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <Sparkles className="w-8 h-8 text-[#15803D] mx-auto animate-pulse" />
              <p className="text-xs font-bold text-[#0F172A]">No exact match found for &ldquo;{query}&rdquo;</p>
              <p className="text-[11px] text-slate-500">Try searching for &quot;Certificates&quot;, &quot;CRM&quot;, &quot;Faculty&quot;, or &quot;Skills&quot;</p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              const isPinned = pinnedIds.includes(item.id);

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center justify-between p-3 rounded-2xl cursor-pointer transition-all ${
                    isSelected
                      ? "bg-[#F0FDF4] border border-[#15803D]/20 shadow-xs"
                      : "bg-white border border-transparent hover:bg-slate-50"
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? "bg-[#15803D] text-white" : "bg-slate-100 text-[#15803D]"
                    }`}>
                      <Icon className="w-4 h-4" aria-hidden="true" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-extrabold truncate ${isSelected ? "text-[#15803D]" : "text-[#0F172A]"}`}>
                          {item.title}
                        </span>
                        {item.badge && (
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <p className="text-[10px] text-slate-500 truncate">{item.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => togglePin(e, item.id)}
                      className={`p-1 rounded-md transition-colors ${
                        isPinned ? "text-[#15803D]" : "text-slate-300 hover:text-slate-500"
                      }`}
                      title={isPinned ? "Unpin item" : "Pin item to top"}
                    >
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </button>
                    {isSelected && (
                      <ChevronRight className="w-4 h-4 text-[#15803D]" aria-hidden="true" />
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Bar */}
        <div className="px-4 py-3 border-t border-slate-200 bg-[#F8FAFC] flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-500">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-semibold">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[#0F172A] font-bold">↑</kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[#0F172A] font-bold">↓</kbd>
              Navigate
            </span>
            <span className="flex items-center gap-1 font-semibold">
              <kbd className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[#0F172A] font-bold">↵</kbd>
              Select
            </span>
          </div>
          <div className="flex items-center gap-1.5 font-bold text-[#15803D]">
            <Command className="w-3 h-3" />
            <span>InstitutionOS v5.3 IUX Command Center</span>
          </div>
        </div>
      </div>
    </div>
  );
}
