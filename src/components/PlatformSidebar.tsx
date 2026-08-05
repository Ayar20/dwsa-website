"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Globe, Building2, UserPlus, BarChart3, Store, ShieldCheck,
  Cpu, Layers, Sparkles, ChevronRight, X, ArrowLeft, Activity
} from "lucide-react";

interface PlatformSidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

const navItems = [
  { label: "Platform Overview", href: "/dashboard/platform", icon: Globe, badge: "CORE", badgeColor: "bg-[#d4a017]/20 text-[#d4a017]" },
  { label: "Tenant Registry", href: "/dashboard/platform/tenants", icon: Building2, badge: "MULTI-TENANT", badgeColor: "bg-[#4ade80]/20 text-[#4ade80]" },
  { label: "Provision Institution", href: "/dashboard/platform/provision", icon: UserPlus, badge: "WIZARD", badgeColor: "bg-[#a78bfa]/20 text-[#a78bfa]" },
  { label: "Platform Analytics", href: "/dashboard/platform/analytics", icon: BarChart3, badge: "GLOBAL", badgeColor: "bg-[#d4a017]/20 text-[#d4a017]" },
  { label: "Marketplace Blueprints", href: "/dashboard/platform/marketplace", icon: Store, badge: "v4.0", badgeColor: "bg-[#4ade80]/20 text-[#4ade80]" },
];

export default function PlatformSidebar({ mobileOpen, setMobileOpen }: PlatformSidebarProps) {
  const pathname = usePathname();

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#050d1a] text-[#f0f4ff] border-r border-[#d4a017]/25 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#1a2f4a] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#d4a017] via-[#f0c040] to-[#b8891a] p-0.5 shadow-lg shadow-[#d4a017]/15 flex items-center justify-center shrink-0">
            <div className="w-full h-full bg-[#030e1f] rounded-[14px] flex items-center justify-center">
              <Globe className="w-5 h-5 text-[#d4a017]" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black tracking-wider text-white uppercase">InstitutionOS</span>
              <span className="px-1.5 py-0.5 rounded bg-[#d4a017]/20 text-[#d4a017] text-[8px] font-black tracking-widest border border-[#d4a017]/40">v4.0</span>
            </div>
            <p className="text-[10px] font-extrabold text-[#d4a017] tracking-tight">Platform Command Centre</p>
            <p className="text-[9px] text-[#8899b4]">Digital World Systems Africa</p>
          </div>
        </div>
        {mobileOpen && (
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden p-1.5 rounded-xl text-[#8899b4] hover:text-white hover:bg-[#0f223d] transition-all"
            aria-label="Close platform navigation"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1.5 custom-scrollbar">
        <div className="px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#6b7a94]">
          Super Admin Console
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href || (item.href !== "/dashboard/platform" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                isActive
                  ? "bg-gradient-to-r from-[#d4a017]/20 to-[#d4a017]/5 text-white border border-[#d4a017]/40 shadow-sm"
                  : "text-[#aab4c4] hover:text-white hover:bg-[#0c1b33]"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${isActive ? "text-[#d4a017]" : "text-[#6b7a94]"}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`px-1.5 py-0.5 rounded text-[9px] font-black tracking-wider ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}

        <div className="pt-6 px-3">
          <div className="p-3.5 rounded-xl bg-[#08152b] border border-[#d4a017]/20 space-y-2">
            <div className="flex items-center gap-2 text-[10px] font-bold text-[#d4a017]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>FLAGSHIP TENANT</span>
            </div>
            <p className="text-[11px] font-extrabold text-white">Digital Technology Academy</p>
            <p className="text-[10px] text-[#6b7a94]">Tenant ID: tenant_dta_001</p>
            <Link
              href="/dashboard/admin"
              className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#4ade80] hover:underline pt-1"
            >
              <ArrowLeft className="w-3 h-3" />
              Switch to DTA ICC Admin
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[#1a2f4a] bg-[#030914]">
        <div className="flex items-center justify-between text-[10px] text-[#6b7a94]">
          <span className="font-semibold">Platform Status</span>
          <span className="inline-flex items-center gap-1 text-[#4ade80] font-extrabold">
            <span className="w-1.5 h-1.5 rounded-full bg-[#4ade80] animate-pulse" />
            99.97% Operational
          </span>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 h-screen sticky top-0">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="relative w-72 max-w-full h-full z-10">
            <SidebarContent />
          </div>
        </div>
      )}
    </>
  );
}
