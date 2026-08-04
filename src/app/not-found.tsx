"use client";

import Link from "next/link";
import { GraduationCap, Home, ArrowLeft, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#030e1f] flex flex-col items-center justify-center px-4 text-center relative overflow-hidden">

      {/* Background glow orbs */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#d4a017]/5 rounded-full blur-3xl pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-[#061428]/80 rounded-full blur-2xl pointer-events-none"
      />

      <div className="relative z-10 space-y-8 max-w-2xl animate-fadeInUp">

        {/* Brand Mark */}
        <div className="flex items-center justify-center gap-3">
          <div className="p-3 bg-gradient-to-br from-[#d4a017] to-[#e5a910] rounded-2xl shadow-lg shadow-[#d4a017]/25 text-[#030e1f]">
            <GraduationCap className="w-7 h-7" aria-hidden="true" />
          </div>
          <span className="font-extrabold text-xl text-white tracking-tight">
            DWSA <span className="text-[#d4a017]">Tech Academy</span>
          </span>
        </div>

        {/* 404 Heading */}
        <div className="space-y-3">
          <div
            className="text-[120px] sm:text-[160px] font-black leading-none tracking-tighter select-none"
            style={{
              background: "linear-gradient(135deg, #d4a017 0%, #f5d061 40%, #e5a910 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
            aria-hidden="true"
          >
            404
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Page Not Found
          </h1>
          <p className="text-[#8899b4] text-sm sm:text-base leading-relaxed max-w-lg mx-auto">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
            Let&apos;s get you back on track.
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#d4a017]/30 to-transparent" />
          <Compass className="w-5 h-5 text-[#d4a017]/50" aria-hidden="true" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-[#d4a017]/30 to-transparent" />
        </div>

        {/* Navigation Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#d4a017] to-[#e5a910] hover:from-[#e5a910] hover:to-[#d4a017] text-[#030e1f] font-extrabold text-sm shadow-lg shadow-[#d4a017]/25 transition-all btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030e1f]"
          >
            <Home className="w-4 h-4" aria-hidden="true" />
            Back to Home
          </Link>

          <Link
            href="/programmes"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#0f223d] hover:bg-[#16335a] border border-[#d4a017]/30 text-[#d4a017] font-bold text-sm transition-all btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030e1f]"
          >
            View Programmes
          </Link>

          <Link
            href="/admissions"
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#0f223d] hover:bg-[#16335a] border border-[#4ade80]/30 text-[#4ade80] font-bold text-sm transition-all btn-press focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4ade80] focus-visible:ring-offset-2 focus-visible:ring-offset-[#030e1f]"
          >
            Apply for Admission
          </Link>
        </div>

        {/* Quick Links */}
        <div className="pt-2 text-xs text-[#55667e]">
          <span>Quick links: </span>
          {[
            { href: "/about", label: "About" },
            { href: "/schools", label: "Schools" },
            { href: "/innovation", label: "Innovation" },
            { href: "/careers", label: "Careers" },
            { href: "/login", label: "Digital Campus" },
          ].map((link, i) => (
            <span key={link.href}>
              {i > 0 && <span className="mx-1.5" aria-hidden="true">·</span>}
              <Link
                href={link.href}
                className="hover:text-[#d4a017] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#d4a017] rounded"
              >
                {link.label}
              </Link>
            </span>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-[11px] text-[#2a3d5a] pb-8">
          &copy; {new Date().getFullYear()} Digital World Systems Africa Ltd (RC 9718724)
        </p>

      </div>
    </div>
  );
}
