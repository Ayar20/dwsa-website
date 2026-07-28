"use client";

import React from "react";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { GraduationCap, LogOut, LayoutDashboard, ShieldCheck } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();

  const role = session?.user?.role || "STUDENT";
  const roleColors: Record<string, string> = {
    ADMIN: "bg-[#d4a017]/20 border-[#d4a017]/50 text-[#d4a017]",
    INSTRUCTOR: "bg-[#00d2ff]/20 border-[#00d2ff]/50 text-[#00d2ff]",
    STUDENT: "bg-[#4ade80]/20 border-[#4ade80]/50 text-[#4ade80]",
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#d4a017]/20 bg-[#030e1f]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Left Branding */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="p-2 bg-gradient-to-br from-[#d4a017] to-[#e5a910] rounded-xl shadow-lg shadow-[#d4a017]/20 group-hover:scale-105 transition-transform text-[#030e1f]">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight text-white group-hover:text-[#d4a017] transition-colors">
                DWSA <span className="text-[#d4a017]">Tech Academy</span>
              </span>
              <span className="block text-[9px] uppercase tracking-widest text-[#00d2ff] font-bold">
                RC 9718724 • Digital World Systems Africa
              </span>
            </div>
          </Link>

          {/* Navigation Links based on role */}
          {session && (
            <nav className="hidden md:flex items-center gap-3 pl-4 border-l border-slate-800">
              {role === "ADMIN" && (
                <>
                  <Link
                    href="/dashboard/admin"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-[#0f223d] flex items-center gap-2 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#d4a017]" />
                    Financial & Admin ERP
                  </Link>
                  <Link
                    href="/dashboard/admin/modules/editor"
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-[#0f223d] flex items-center gap-2 transition-colors"
                  >
                    <LayoutDashboard className="w-4 h-4 text-[#00d2ff]" />
                    Module Editor
                  </Link>
                </>
              )}

              <Link
                href="/dashboard/student"
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-300 hover:text-white hover:bg-[#0f223d] flex items-center gap-2 transition-colors"
              >
                <GraduationCap className="w-4 h-4 text-[#00d2ff]" />
                Student Workspace
              </Link>
            </nav>
          )}
        </div>

        {/* Right User Actions */}
        <div className="flex items-center gap-3">
          {session?.user ? (
            <div className="flex items-center gap-3">
              {/* Role Badge */}
              <span className={`px-2.5 py-0.5 rounded-full border text-[10px] font-extrabold tracking-wider uppercase ${roleColors[role] || roleColors.STUDENT}`}>
                {role}
              </span>

              {/* User Identity */}
              <div className="hidden sm:flex flex-col text-right">
                <span className="text-xs font-bold text-white leading-tight">
                  {session.user.name || "Student User"}
                </span>
                <span className="text-[10px] text-[#8899b4]">
                  {session.user.email}
                </span>
              </div>

              {/* Logout Button */}
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
        </div>
      </div>
    </header>
  );
}
