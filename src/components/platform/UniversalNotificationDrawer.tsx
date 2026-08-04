"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Bell, X, Check, CheckCheck, Archive, Filter, Sparkles,
  BookOpen, Users, DollarSign, Award, Shield, ChevronRight
} from "lucide-react";
import { notificationService } from "@/lib/institutionOS/NotificationService";
import { PlatformNotification, UserRole, NotificationCategory } from "@/types/institutionOS";

interface UniversalNotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  role: UserRole;
}

const categoryColors: Record<NotificationCategory, string> = {
  Academic: "#d4a017",
  Admissions: "#818cf8",
  Assignments: "#4ade80",
  Finance: "#4ade80",
  Research: "#818cf8",
  Corporate: "#d4a017",
  Executive: "#d4a017",
  Security: "#f87171",
  System: "#8899b4",
  Community: "#4ade80",
};

export default function UniversalNotificationDrawer({ isOpen, onClose, role }: UniversalNotificationDrawerProps) {
  const [notifications, setNotifications] = useState<PlatformNotification[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    if (isOpen) {
      setNotifications(notificationService.getNotificationsForRole(role));
    }
  }, [isOpen, role]);

  if (!isOpen) return null;

  const filtered = notifications.filter(
    (n) => activeCategory === "All" || n.category === activeCategory
  );

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const handleMarkRead = (id: string) => {
    notificationService.markAsRead(id);
    setNotifications(notificationService.getNotificationsForRole(role));
  };

  const handleMarkAllRead = () => {
    notificationService.markAllAsRead(role);
    setNotifications(notificationService.getNotificationsForRole(role));
  };

  const handleArchive = (id: string) => {
    notificationService.archiveNotification(id);
    setNotifications(notificationService.getNotificationsForRole(role));
  };

  const categories = ["All", "Academic", "Assignments", "Finance", "Executive", "Security"];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#030e1f]/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#061428] border-l border-[#d4a017]/30 text-[#f0f4ff] shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-5 border-b border-[#1a2f4a] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#d4a017]/15 border border-[#d4a017]/30 text-[#d4a017] flex items-center justify-center relative">
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#4ade80] text-[#030e1f] text-[9px] font-black flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              <div>
                <h2 className="text-sm font-extrabold text-white">Universal Notification Centre</h2>
                <p className="text-[10px] text-[#8899b4]">Role context: <strong className="text-[#d4a017]">{role}</strong></p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-[#8899b4] hover:text-white hover:bg-[#0f223d] transition-all"
              aria-label="Close notifications"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Action & Filter Toolbar */}
          <div className="p-4 border-b border-[#1a2f4a] bg-[#030e1f]/60 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[10px] text-[#8899b4] font-bold">{unreadCount} Unread Notifications</span>
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-[10px] font-extrabold text-[#d4a017] hover:underline flex items-center gap-1"
                >
                  <CheckCheck className="w-3.5 h-3.5" /> Mark All as Read
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-2.5 py-1 rounded-xl text-[9px] font-black border transition-all ${
                    activeCategory === cat
                      ? "bg-[#d4a017]/15 border-[#d4a017] text-[#d4a017]"
                      : "bg-[#061428] border-[#1a2f4a] text-[#8899b4] hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
            {filtered.length === 0 ? (
              <div className="py-16 text-center text-[#8899b4] text-xs">
                ✓ No notifications in this category.
              </div>
            ) : (
              filtered.map((n) => {
                const color = categoryColors[n.category] || "#d4a017";
                return (
                  <div
                    key={n.id}
                    className={`rounded-2xl p-4 border transition-all space-y-2 relative ${
                      !n.isRead
                        ? "bg-[#030e1f] border-[#d4a017]/40"
                        : "bg-[#061428]/60 border-[#1a2f4a]"
                    }`}
                  >
                    {!n.isRead && (
                      <span className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#4ade80]" />
                    )}

                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[8px] font-black uppercase" style={{ backgroundColor: `${color}20`, color, border: `1px solid ${color}40` }}>
                        {n.category}
                      </span>
                      <span className="text-[9px] font-black uppercase text-amber-400">{n.priority}</span>
                      <span className="text-[9px] text-[#8899b4] ml-auto">{n.timestamp}</span>
                    </div>

                    <h3 className="text-xs font-extrabold text-white pr-4">{n.title}</h3>
                    <p className="text-[11px] text-[#8899b4] leading-relaxed">{n.message}</p>

                    <div className="flex items-center justify-between pt-2 border-t border-[#1a2f4a] text-[10px]">
                      {n.actionUrl ? (
                        <Link
                          href={n.actionUrl}
                          onClick={() => {
                            handleMarkRead(n.id);
                            onClose();
                          }}
                          className="font-extrabold text-[#d4a017] hover:underline flex items-center gap-1"
                        >
                          {n.actionText || "View Action"} <ChevronRight className="w-3 h-3" />
                        </Link>
                      ) : (
                        <span />
                      )}

                      <div className="flex items-center gap-2">
                        {!n.isRead && (
                          <button
                            onClick={() => handleMarkRead(n.id)}
                            className="text-[#8899b4] hover:text-[#4ade80] transition-colors"
                            title="Mark as read"
                          >
                            <Check className="w-3.5 h-3.5" />
                          </button>
                        )}
                        <button
                          onClick={() => handleArchive(n.id)}
                          className="text-[#8899b4] hover:text-red-400 transition-colors"
                          title="Archive"
                        >
                          <Archive className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-[#1a2f4a] bg-[#030e1f] text-center">
            <p className="text-[9px] text-[#8899b4]">InstitutionOS Universal Event Listener Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}
