"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  ArrowRight,
  Menu,
  X,
  Sparkles,
} from "lucide-react";

export default function PublicNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close mobile nav on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Add shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Programmes", href: "/programmes" },
    { name: "Schools & Centres", href: "/schools" },
    { name: "Admissions", href: "/admissions" },
    { name: "Corporate Learning", href: "/corporate" },
    { name: "Innovation (IRC)", href: "/innovation" },
    { name: "Careers", href: "/careers" },
    { name: "Knowledge Hub", href: "/knowledge-hub" },
    { name: "Ecosystem", href: "/ecosystem" },
  ];

  return (
    <>
      {/* ⚡ Announcement Bar */}
      <div
        role="banner"
        className="bg-[#F0FDF4] border-b border-[#15803D]/20 text-center py-2 px-4 text-xs font-semibold tracking-wide text-[#15803D]"
      >
        <span className="inline-flex items-center gap-2 flex-wrap justify-center">
          <Sparkles className="w-3.5 h-3.5 text-[#15803D] animate-pulse" aria-hidden="true" />
          <span>ADMISSIONS OPEN: Cohort 2026 — Early Application Encouraged</span>
          <span className="hidden sm:inline text-slate-400">• CAC Registered Company: RC 9718724</span>
        </span>
      </div>

      {/* 🧭 Header */}
      <header
        className={`border-b border-slate-200 bg-white/95 backdrop-blur-xl sticky top-0 z-50 transition-shadow duration-300 ${
          scrolled ? "shadow-sm" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">

          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] rounded-xl"
            aria-label="Digital Technology Academy — Home"
          >
            <div className="p-2 sm:p-2.5 bg-[#15803D] rounded-xl shadow-sm text-white font-extrabold">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-[#0F172A] flex items-center gap-1.5">
                DWSA <span className="text-[#15803D]">Tech Academy</span>
              </span>
              <span className="hidden sm:block text-[9px] uppercase tracking-widest text-slate-500 font-bold">
                A Strategic Pillar of Digital World Systems Africa Ltd
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-medium text-slate-600" aria-label="Main navigation">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-all py-1.5 px-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D] ${
                    isActive
                      ? "text-[#15803D] font-bold bg-[#F0FDF4] border border-[#15803D]/20"
                      : "hover:text-[#15803D] hover:bg-slate-50"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-2">
            <Link
              href="/admissions"
              className="hidden sm:inline-flex px-3.5 py-2 rounded-xl text-xs font-extrabold bg-[#15803D] hover:bg-[#166534] text-white shadow-sm transition-all items-center gap-1.5 btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
            >
              Apply Now
            </Link>

            <Link
              href="/login"
              className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs font-bold bg-white border border-slate-200 text-[#0F172A] hover:bg-slate-50 shadow-sm transition-all flex items-center gap-1.5 btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
            >
              <span>Digital Campus</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#15803D]" aria-hidden="true" />
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 rounded-xl border border-slate-200 text-slate-600 hover:text-[#0F172A] hover:bg-slate-100 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
              aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <nav
            id="mobile-nav"
            aria-label="Mobile navigation"
            className="lg:hidden border-t border-slate-200 bg-white px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto animate-slideDown shadow-lg"
          >
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-3 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? "bg-[#F0FDF4] text-[#15803D] border border-[#15803D]/20"
                      : "text-slate-600 hover:bg-slate-50 hover:text-[#15803D]"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="pt-3 flex flex-col gap-2 border-t border-slate-100 mt-2">
              <Link
                href="/admissions"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center px-4 py-2.5 rounded-xl text-xs font-extrabold bg-[#15803D] text-white"
              >
                Apply Now
              </Link>
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center px-4 py-2.5 rounded-xl text-xs font-extrabold bg-white border border-slate-200 text-[#0F172A]"
              >
                Sign In to Digital Campus
              </Link>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
