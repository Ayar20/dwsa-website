"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Bell, X, Check, ShieldCheck, DollarSign, Sparkles, GraduationCap,
  Store, Lock, ArrowRight, Filter, AlertCircle, Info, CheckCircle2
} from "lucide-react";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: "Academic" | "Finance" | "AI" | "Marketplace" | "Transformation" | "Security";
  priority: "High" | "Medium" | "Low";
  time: string;
  read: boolean;
  ctaText?: string;
  ctaHref?: string;
}

const initialNotifications: NotificationItem[] = [
  {
    id: "n1",
    title: "Flagship Cohort Registration Active",
    message: "Enrolments for Generative AI for Work & Productivity (GENAI-WP-001) are open.",
    category: "Academic",
    priority: "High",
    time: "Live",
    read: false,
    ctaText: "View Enrolment",
    ctaHref: "/dashboard/student",
  },
  {
    id: "n2",
    title: "Paystack & Corporate Bank Gateway Active",
    message: "Tuition collection enabled for Zenith Bank, Fidelity Bank, and UBA corporate accounts.",
    category: "Finance",
    priority: "High",
    time: "Active",
    read: false,
    ctaText: "Payment Details",
    ctaHref: "/dashboard/student",
  },
  {
    id: "n3",
    title: "Google Gemini 2.0 AI Companion Online",
    message: "Aida (Student) and Sage (Faculty) agents connected to Google Generative AI gateway.",
    category: "AI",
    priority: "Medium",
    time: "Online",
    read: false,
    ctaText: "Launch AI Agent",
    ctaHref: "/dashboard/student/ai-agent",
  },
  {
    id: "n4",
    title: "Digital Certificate Verification Active",
    message: "Cryptographic QR certificate verification engine running for DWSA graduates.",
    category: "Security",
    priority: "Low",
    time: "Protected",
    read: false,
    ctaText: "Verify Certificates",
    ctaHref: "/certificates",
  },
];

interface UniversalNotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  role?: "STUDENT" | "INSTRUCTOR" | "ADMIN" | "SUPER_ADMIN";
}

export default function UniversalNotificationDrawer({
  isOpen,
  onClose,
  role = "ADMIN",
}: UniversalNotificationDrawerProps) {
  const [items, setItems] = useState<NotificationItem[]>(initialNotifications);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");

  const categories = ["ALL", "Academic", "Finance", "AI", "Marketplace", "Transformation", "Security"];

  const markAllRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const markAsRead = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const filteredItems = items.filter((item) => {
    if (selectedCategory === "ALL") return true;
    return item.category === selectedCategory;
  });

  const unreadCount = items.filter((i) => !i.read).length;

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex justify-end animate-fadeIn"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Universal Notifications"
    >
      <div
        className="w-full max-w-md bg-white border-l border-slate-200 h-full flex flex-col shadow-2xl animate-fadeInLeft"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-[#F8FAFC]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] flex items-center justify-center relative shadow-xs">
              <Bell className="w-4 h-4" aria-hidden="true" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-[#15803D] ring-2 ring-white" />
              )}
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-[#0F172A] tracking-tight">
                Universal Notifications
              </h2>
              <p className="text-[10px] text-slate-500 font-bold">
                IUX Smart Dispatch · {unreadCount} Unread
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="text-[10px] font-extrabold text-[#15803D] hover:underline"
              >
                Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-[#0F172A] hover:bg-slate-100 transition-colors"
              aria-label="Close notification drawer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Tabs Filter */}
        <div className="px-4 py-2.5 border-b border-slate-100 bg-white flex items-center gap-1.5 overflow-x-auto text-[10px] font-bold">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-2.5 py-1 rounded-full border transition-all shrink-0 ${
                selectedCategory === cat
                  ? "bg-[#15803D] text-white border-[#15803D]"
                  : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <CheckCircle2 className="w-8 h-8 text-[#15803D] mx-auto" />
              <p className="text-xs font-bold text-[#0F172A]">All caught up!</p>
              <p className="text-[10px] text-slate-500">No notifications in {selectedCategory} category.</p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => markAsRead(item.id)}
                className={`p-4 rounded-2xl border transition-all space-y-2 cursor-pointer ${
                  !item.read
                    ? "bg-[#F0FDF4]/60 border-[#15803D]/20 shadow-xs"
                    : "bg-white border-slate-200 opacity-80"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                        item.priority === "High"
                          ? "bg-red-100 text-red-700 border border-red-200"
                          : item.priority === "Medium"
                          ? "bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20"
                          : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}
                    >
                      {item.priority}
                    </span>
                    <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                      {item.category}
                    </span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold">{item.time}</span>
                </div>

                <div>
                  <h3 className="text-xs font-extrabold text-[#0F172A] leading-snug">{item.title}</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">{item.message}</p>
                </div>

                {/* Actionable CTA Button */}
                {item.ctaText && item.ctaHref && (
                  <div className="pt-1">
                    <Link
                      href={item.ctaHref}
                      onClick={onClose}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-[10px] font-bold shadow-xs transition-all"
                    >
                      <span>{item.ctaText}</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t border-slate-200 bg-[#F8FAFC] flex items-center justify-between text-[10px] text-slate-500 font-semibold">
          <span>InstitutionOS v5.3 IUX Notification Core</span>
          <span className="text-[#15803D] font-bold">100% Operational</span>
        </div>
      </div>
    </div>
  );
}
