"use client";

import React from "react";
import Link from "next/link";
import {
  GraduationCap,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Globe,
} from "lucide-react";

// Clean, accessible SVG icons for social channels
function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.12 8.44 9.88v-6.99H7.9v-2.89h2.54V9.8c0-2.51 1.49-3.89 3.78-3.89 1.09 0 2.23.19 2.23.19v2.47h-1.26c-1.24 0-1.63.77-1.63 1.56v1.88h2.78l-.45 2.89h-2.33v6.99C18.34 21.12 22 16.99 22 12z"/>
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

function TiktokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68a6.34 6.34 0 0 0 10.86 4.49A6.27 6.27 0 0 0 15.8 15V8.55a8.3 8.3 0 0 0 5.2 1.83V6.93a4.85 4.85 0 0 1-1.41-.24z"/>
    </svg>
  );
}

export default function PublicFooter() {
  const socialLinks = [
    {
      href: "https://www.facebook.com/digitalworldsystemsafrica",
      label: "DWSA on Facebook",
      icon: FacebookIcon,
      name: "Facebook",
    },
    {
      href: "https://www.instagram.com/digitalworld_africa",
      label: "DWSA on Instagram",
      icon: InstagramIcon,
      name: "Instagram",
    },
    {
      href: "https://x.com/dwsafrica",
      label: "DWSA on X (Twitter)",
      icon: TwitterIcon,
      name: "X (Twitter)",
    },
    {
      href: "https://www.tiktok.com/@digitalwealth_sysafrica",
      label: "DWSA on TikTok",
      icon: TiktokIcon,
      name: "TikTok",
    },
    {
      href: "https://www.youtube.com/@digitalworldsystemsafrica",
      label: "DWSA on YouTube",
      icon: YoutubeIcon,
      name: "YouTube",
    },
    {
      href: "https://www.linkedin.com/company/dwsafrica",
      label: "DWSA on LinkedIn",
      icon: LinkedinIcon,
      name: "LinkedIn",
    },
    {
      href: "https://github.com/dwsafrica",
      label: "DWSA on GitHub",
      icon: GithubIcon,
      name: "GitHub",
    },
  ];

  return (
    <footer className="mt-auto border-t border-[#d4a017]/20 bg-[#020914] pt-14 pb-8 px-4 sm:px-6 lg:px-8 text-xs text-[#8899b4]">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Top Footer Banner: Parent Brand Alignment */}
        <div className="bg-[#061428] border border-[#d4a017]/30 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-[#d4a017] to-[#e5a910] rounded-xl text-[#030e1f]">
                <GraduationCap className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white tracking-tight">
                  Digital Technology Academy (DTA)
                </h3>
                <p className="text-xs text-[#d4a017] font-bold">
                  Developing Africa&apos;s Next Generation of Technology Professionals
                </p>
              </div>
            </div>

            <p className="text-xs text-[#c8d8f0] leading-relaxed max-w-2xl pt-1">
              The Digital Technology Academy is the education and human capability development arm of{" "}
              <strong className="text-white">Digital World Systems Africa Ltd</strong>, empowering
              individuals, organizations, and institutions with practical skills in emerging technologies.
            </p>
          </div>

          {/* Parent Organization Box */}
          <div className="lg:text-right shrink-0 bg-[#030e1f] border border-[#d4a017]/30 p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-extrabold text-[#d4a017] uppercase tracking-wider block">
              PARENT ORGANIZATION
            </span>
            <strong className="text-sm font-extrabold text-white block">
              Digital World Systems Africa Ltd
            </strong>
            <span className="text-xs text-[#d4a017] font-bold block">
              Building Africa&apos;s Digital Future
            </span>
            <span className="text-[10px] text-slate-400 block pt-0.5">
              CAC Registered Company: RC 9718724
            </span>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Col 1: Connect With DWSA */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white border-b border-[#d4a017]/30 pb-2">
              Connect With DWSA
            </h4>

            <p className="text-xs text-[#8899b4] leading-relaxed">
              Stay connected with Digital World Systems Africa Ltd for Technology Insights, Admissions Updates,
              Innovation News, Research Publications, Events, Career Opportunities, and Product Announcements.
            </p>

            {/* Social Media Links */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-bold text-[#d4a017] uppercase tracking-widest block">
                Official DWSA Ecosystem Channels
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {socialLinks.map(({ href, label, icon: Icon, name }) => (
                  <a
                    key={name}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    title={label}
                    className="p-2.5 bg-[#061428] border border-[#d4a017]/30 text-[#d4a017] hover:bg-[#d4a017] hover:text-[#030e1f] rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017]"
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    <span className="hidden sm:inline">{name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-1.5 text-[11px] pt-2">
              <div className="flex items-center gap-2 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-[#d4a017] shrink-0" aria-hidden="true" />
                <span>Technology Hub & Lab: Makurdi, Benue State, Nigeria</span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-[#4ade80] shrink-0" aria-hidden="true" />
                <a
                  href="https://wa.me/2347082135071"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#4ade80] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4ade80] rounded"
                >
                  WhatsApp Support: +234 708 213 5071
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Digital Campus Navigation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-[#d4a017]/30 pb-2">
              Digital Campus
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About DTA" },
                { href: "/programmes", label: "Programmes" },
                { href: "/admissions", label: "Admissions & Apply", highlight: true },
                { href: "/login", label: "Digital Campus (Portal)" },
              ].map(({ href, label, highlight }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] rounded ${
                      highlight
                        ? "text-[#4ade80] font-semibold hover:text-[#4ade80]/80"
                        : "hover:text-[#d4a017]"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Academic & Innovation */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white border-b border-[#d4a017]/30 pb-2">
              Academic & Innovation
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/schools", label: "Schools & Centres" },
                { href: "/innovation", label: "Innovation & Research (IRC)" },
                { href: "/careers", label: "Career & Entrepreneurship" },
                { href: "/knowledge-hub", label: "Knowledge Hub" },
                { href: "/corporate", label: "Corporate Learning" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="hover:text-[#d4a017] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] rounded"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: DWSA Corporate */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#d4a017] border-b border-[#d4a017]/30 pb-2">
              DWSA Corporate
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/ecosystem"
                  className="hover:text-[#d4a017] transition-colors font-semibold text-[#d4a017]/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] rounded"
                >
                  DWSA Ecosystem (4 Pillars)
                </Link>
              </li>
              {[
                { href: "https://dws-africa.vercel.app", label: "DWSA Corporate Site" },
                { href: "https://dws-africa.vercel.app/governance", label: "Governance" },
                { href: "https://dws-africa.vercel.app/research", label: "Research & Dev" },
                { href: "https://dwsa-enterpriseos.vercel.app", label: "Enterprise OS" },
              ].map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#d4a017] transition-colors flex items-center gap-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d4a017] rounded"
                  >
                    {label} <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#55667e]">
          <div>
            &copy; {new Date().getFullYear()} Digital World Systems Africa Ltd (RC 9718724). All rights reserved.
          </div>
          <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
            <span>A Strategic Pillar of Digital World Systems Africa Ltd</span>
            <span aria-hidden="true">•</span>
            <a
              href="https://wa.me/2347082135071"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#4ade80] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4ade80] rounded"
            >
              WhatsApp Support
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
