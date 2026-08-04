"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  GraduationCap,
  ArrowRight,
  ExternalLink,
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
        className="bg-gradient-to-r from-[#061428] via-[#0f2a4a] to-[#061428] border-b border-[#d4a017]/30 text-center py-2 px-4 text-xs font-semibold tracking-wide text-[#d4a017]"
      >
        <span className="inline-flex items-center gap-2 flex-wrap justify-center">
          <Sparkles className="w-3.5 h-3.5 text-[#d4a017] animate-pulse" aria-hidden="true" />
          <span>ADMISSIONS OPEN: Cohort 2026 — Early Application Encouraged</span>
          <span className="hidden sm:inline text-[#d4a017]/70">• CAC Registered Company: RC 9718724</span>
        </span>
      </div>

      {/* 🧭 Header */}
      <header
        className={`border-b border-[#d4a017]/20 bg-[#030e1f]/95 backdrop-blur-xl sticky top-0 z-50 transition-shadow duration-300 ${
          scrolled ? "shadow-lg shadow-[#030e1f]/80" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">

          {/* Brand */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030e1f] rounded-xl"
            aria-label="Digital Technology Academy — Home"
          >
            <div className="p-2 sm:p-2.5 bg-gradient-to-br from-[#d4a017] to-[#e5a910] rounded-xl shadow-lg shadow-[#d4a017]/20 text-[#030e1f] font-extrabold">
              <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
            </div>
            <div>
              <span className="font-extrabold text-base sm:text-lg tracking-tight text-white flex items-center gap-1.5">
                DWSA <span className="text-[#d4a017]">Tech Academy</span>
              </span>
              <span className="hidden sm:block text-[9px] uppercase tracking-widest text-[#c8d8f0]/70 font-bold">
                A Strategic Pillar of Digital World Systems Africa Ltd
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 text-xs font-medium text-[#8899b4]" aria-label="Main navigation">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition-all py-1.5 px-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] ${
                    isActive
                      ? "text-[#d4a017] font-bold bg-[#d4a017]/10 border border-[#d4a017]/30"
                      : "hover:text-[#d4a017] hover:bg-[#d4a017]/5"
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
              className="hidden sm:inline-flex px-3.5 py-2 rounded-xl text-xs font-extrabold bg-gradient-to-r from-[#4ade80] to-[#22c55e] hover:from-[#22c55e] hover:to-[#4ade80] text-[#030e1f] shadow-lg shadow-[#4ade80]/20 transition-all items-center gap-1.5 btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4ade80]"
            >
              Apply Now
            </Link>

            <Link
              href="/login"
              className="px-3.5 py-2 sm:px-4 sm:py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-[#d4a017] to-[#e5a910] hover:from-[#e5a910] hover:to-[#d4a017] text-[#030e1f] shadow-lg shadow-[#d4a017]/25 transition-all flex items-center gap-1.5 btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
            >
              <span>Digital Campus</span>
              <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Link>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="lg:hidden p-2 rounded-xl border border-[#1e3a5f] text-[#8899b4] hover:text-white hover:bg-[#0f223d] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
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
            className="lg:hidden border-t border-[#1e3a5f] bg-[#030e1f]/98 backdrop-blur-xl px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto animate-slideDown"
          >
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] ${
                    isActive
                      ? "bg-[#d4a017]/15 text-[#d4a017] border border-[#d4a017]/30"
                      : "text-[#c8d8f0] hover:bg-[#0f223d] hover:text-white"
                  }`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="pt-3 border-t border-[#1e3a5f] flex flex-col gap-2">
              <Link
                href="/admissions"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center px-4 py-3 rounded-xl text-xs font-extrabold bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-[#030e1f] btn-press"
              >
                Apply for Admission
              </Link>
              <a
                href="https://dws-africa.vercel.app"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold text-[#d4a017] border border-[#d4a017]/30 bg-[#0f223d] hover:bg-[#16335a] transition-all"
              >
                Main DWSA Website <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </nav>
        )}
      </header>
    </>
  );
}
