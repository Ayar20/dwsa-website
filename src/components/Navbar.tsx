"use client";

import React, { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  LogOut,
  LayoutDashboard,
  FilePen,
  ArrowLeft,
  Menu,
  X,
  ExternalLink,
} from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const role = session?.user?.role || "STUDENT";

  const roleColors: Record<string, string> = {
    ADMIN: "bg-[#d4a017]/20 border-[#d4a017]/50 text-[#d4a017]",
    INSTRUCTOR: "bg-[#00d2ff]/20 border-[#00d2ff]/50 text-[#00d2ff]",
    STUDENT: "bg-[#4ade80]/20 border-[#4ade80]/50 text-[#4ade80]",
  };

  const isAdminErpActive = pathname === "/dashboard/admin";
  const isModuleEditorActive = pathname === "/dashboard/admin/modules/editor";
  const isStudentActive = pathname === "/dashboard/student";

  const navLinks = (
    <>
      {role === "ADMIN" && (
        <>
          <Link
            href="/dashboard/admin"
            onClick={() => setMobileOpen(false)}
            className={`px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all border ${
              isAdminErpActive
                ? "bg-[#d4a017]/20 border-[#d4a017]/50 text-[#d4a017] shadow-sm"
                : "border-transparent text-slate-300 hover:text-white hover:bg-[#0f223d]"
            }`}
          >
            <LayoutDashboard
              className={`w-4 h-4 ${isAdminErpActive ? "text-[#d4a017]" : "text-[#d4a017]/70"}`}
            />
            Financial &amp; Admin ERP
          </Link>
          <Link
            href="/dashboard/admin/modules/editor"
            onClick={() => setMobileOpen(false)}
            className={`px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all border ${
              isModuleEditorActive
                ? "bg-[#00d2ff]/20 border-[#00d2ff]/50 text-[#00d2ff] shadow-sm"
                : "border-transparent text-slate-300 hover:text-white hover:bg-[#0f223d]"
            }`}
          >
            <FilePen
              className={`w-4 h-4 ${isModuleEditorActive ? "text-[#00d2ff]" : "text-[#00d2ff]/70"}`}
            />
            Module Editor
          </Link>
        </>
      )}

      <Link
        href="/dashboard/student"
        onClick={() => setMobileOpen(false)}
        className={`px-3 py-2 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all border ${
          isStudentActive
            ? "bg-[#0f223d] border-[#00d2ff]/40 text-[#00d2ff] shadow-sm"
            : "border-transparent text-slate-300 hover:text-white hover:bg-[#0f223d]"
        }`}
      >
        <GraduationCap className="w-4 h-4 text-[#00d2ff]" />
        Student Workspace
      </Link>

      <a
        href="https://dws-africa.vercel.app"
        target="_blank"
        rel="noreferrer"
        onClick={() => setMobileOpen(false)}
        className="px-3 py-2 rounded-xl text-xs font-bold bg-[#0f223d] hover:bg-[#16335a] border border-[#d4a017]/40 text-[#d4a017] transition-all flex items-center gap-1.5 md:hidden"
      >
        <ExternalLink className="w-3.5 h-3.5" />
        Main Site
      </a>
    </>
  );

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-[#d4a017]/20 bg-[#030e1f]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* ── Left: Branding ── */}
          <div className="flex items-center gap-4 min-w-0">
            <Link href="/" className="flex items-center gap-3 group shrink-0">
              <div className="p-2 bg-gradient-to-br from-[#d4a017] to-[#e5a910] rounded-xl shadow-lg shadow-[#d4a017]/20 group-hover:scale-105 transition-transform text-[#030e1f]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="hidden sm:block">
                <span className="font-extrabold text-base tracking-tight text-white group-hover:text-[#d4a017] transition-colors">
                  DWSA <span className="text-[#d4a017]">Tech Academy</span>
                </span>
                <span className="block text-[9px] uppercase tracking-widest text-[#00d2ff] font-bold">
                  RC 9718724 • Digital World Systems Africa
                </span>
              </div>
              {/* Mobile brand shortname */}
              <div className="sm:hidden">
                <span className="font-extrabold text-sm tracking-tight text-white">
                  DWSA <span className="text-[#d4a017]">Academy</span>
                </span>
              </div>
            </Link>

            {/* Desktop nav links */}
            {session && (
              <nav className="hidden md:flex items-center gap-2 pl-4 border-l border-slate-800">
                {navLinks}
              </nav>
            )}
          </div>

          {/* ── Right: Actions ── */}
          <div className="flex items-center gap-2">
            {/* Main Site — desktop only */}
            <a
              href="https://dws-africa.vercel.app"
              target="_blank"
              rel="noreferrer"
              className="hidden md:flex px-3.5 py-1.5 rounded-xl text-xs font-bold bg-[#0f223d] hover:bg-[#16335a] border border-[#d4a017]/40 text-[#d4a017] transition-all items-center gap-1.5 shadow-sm"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Main Site</span>
            </a>

            {session?.user ? (
              <div className="flex items-center gap-2">
                {/* Role badge */}
                <span
                  className={`hidden sm:inline-flex px-2.5 py-0.5 rounded-full border text-[10px] font-extrabold tracking-wider uppercase ${
                    roleColors[role] || roleColors.STUDENT
                  }`}
                >
                  {role}
                </span>

                {/* User name — desktop */}
                <div className="hidden lg:flex flex-col text-right">
                  <span className="text-xs font-bold text-white leading-tight">
                    {session.user.name || "Student"}
                  </span>
                  <span className="text-[10px] text-[#8899b4]">{session.user.email}</span>
                </div>

                {/* Logout */}
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-950/40 rounded-xl transition-all border border-transparent hover:border-red-900/40"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-gradient-to-r from-[#d4a017] to-[#e5a910] hover:from-[#e5a910] hover:to-[#d4a017] text-[#030e1f] rounded-xl text-xs font-extrabold transition-all shadow-md shadow-[#d4a017]/20"
              >
                Sign In
              </Link>
            )}

            {/* Hamburger — mobile only, only when logged in */}
            {session && (
              <button
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden p-2 rounded-xl border border-[#1e3a5f] text-[#8899b4] hover:text-white hover:bg-[#0f223d] transition-all"
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        {mobileOpen && session && (
          <div
            className="md:hidden border-t border-[#1e3a5f] bg-[#030e1f]/98 backdrop-blur-xl px-4 py-4 space-y-2"
            style={{ animation: "slideDown 0.2s ease-out" }}
          >
            {/* User info strip */}
            <div className="flex items-center gap-3 pb-3 mb-2 border-b border-[#1e3a5f]">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-[10px] font-black border"
                style={{
                  background: "rgba(212,160,23,0.15)",
                  borderColor: "rgba(212,160,23,0.3)",
                  color: "#d4a017",
                }}
              >
                {(session.user?.name || "U").charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">
                  {session.user?.name || "User"}
                </p>
                <p className="text-[10px] text-[#8899b4]">{session.user?.email}</p>
              </div>
              <span
                className={`ml-auto px-2.5 py-0.5 rounded-full border text-[10px] font-extrabold tracking-wider uppercase ${
                  roleColors[role] || roleColors.STUDENT
                }`}
              >
                {role}
              </span>
            </div>

            {/* Nav links */}
            <div className="flex flex-col gap-1.5">{navLinks}</div>

            {/* Logout */}
            <button
              onClick={() => { setMobileOpen(false); signOut({ callbackUrl: "/login" }); }}
              className="w-full mt-2 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border border-red-900/40 text-red-400 hover:bg-red-950/30 transition-all"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        )}
      </header>

      {/* Backdrop overlay for mobile drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
}
