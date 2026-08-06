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
  ];

  return (
    <footer className="mt-auto border-t border-slate-800 bg-[#0F172A] pt-14 pb-8 px-4 sm:px-6 lg:px-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto space-y-12">

        {/* Top Footer Banner: Parent Brand Alignment */}
        <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#15803D] rounded-xl text-white">
                <GraduationCap className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <h3 className="text-lg font-black text-white tracking-tight">
                  Digital Technology Academy (DTA)
                </h3>
                <p className="text-xs text-[#D4A017] font-bold">
                  Developing Africa&apos;s Next Generation of Technology Professionals
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed max-w-2xl pt-1">
              The Digital Technology Academy is the education and human capability development arm of{" "}
              <strong className="text-white">Digital World Systems Africa Ltd</strong>, empowering
              individuals, organizations, and institutions with practical skills in emerging technologies.
            </p>
          </div>

          {/* Parent Organization Box */}
          <div className="lg:text-right shrink-0 bg-[#0F172A] border border-slate-700 p-4 rounded-xl space-y-1">
            <span className="text-[10px] font-extrabold text-[#D4A017] uppercase tracking-wider block">
              PARENT ORGANIZATION
            </span>
            <strong className="text-sm font-extrabold text-white block">
              Digital World Systems Africa Ltd
            </strong>
            <span className="text-xs text-[#15803D] font-bold block">
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
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Connect With DWSA
            </h4>

            <p className="text-xs text-slate-400 leading-relaxed">
              Stay connected with Digital World Systems Africa Ltd for Technology Insights, Admissions Updates,
              Innovation News, Research Publications, Events, Career Opportunities, and Product Announcements.
            </p>

            {/* Social Media Links */}
            <div className="space-y-2 pt-1">
              <span className="text-[10px] font-bold text-[#D4A017] uppercase tracking-widest block">
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
                    className="p-2.5 bg-slate-800 border border-slate-700 text-white hover:bg-[#15803D] hover:border-[#15803D] rounded-xl transition-all flex items-center gap-1.5 text-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#15803D]"
                  >
                    <Icon className="w-4 h-4" aria-hidden="true" />
                    <span>{name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Col 2: Strategic Pillars */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Strategic Pillars
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/programmes" className="hover:text-[#15803D] transition-colors">
                  Digital Technology Academy
                </Link>
              </li>
              <li>
                <Link href="/corporate" className="hover:text-[#15803D] transition-colors">
                  Corporate Learning &amp; Upskilling
                </Link>
              </li>
              <li>
                <Link href="/innovation" className="hover:text-[#15803D] transition-colors">
                  Innovation Research Centre
                </Link>
              </li>
              <li>
                <Link href="/ecosystem" className="hover:text-[#15803D] transition-colors">
                  Enterprise Solutions &amp; Software
                </Link>
              </li>
              <li>
                <Link href="/knowledge-hub" className="hover:text-[#15803D] transition-colors">
                  Technology Insights &amp; Publications
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Academic Schools */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Academic Schools
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/schools" className="hover:text-[#15803D] transition-colors">
                  School of Software Engineering
                </Link>
              </li>
              <li>
                <Link href="/schools" className="hover:text-[#15803D] transition-colors">
                  School of AI &amp; Data Science
                </Link>
              </li>
              <li>
                <Link href="/schools" className="hover:text-[#15803D] transition-colors">
                  School of Cloud &amp; Cybersecurity
                </Link>
              </li>
              <li>
                <Link href="/schools" className="hover:text-[#15803D] transition-colors">
                  School of Digital Business &amp; Product
                </Link>
              </li>
              <li>
                <Link href="/schools" className="hover:text-[#15803D] transition-colors">
                  School of Executive Education
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Corporate & Compliance */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Corporate &amp; Contact
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#15803D] shrink-0 mt-0.5" aria-hidden="true" />
                <span>DWSA Headquarters, Abuja / Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#15803D] shrink-0" aria-hidden="true" />
                <a href="mailto:info@dwsafrica.com" className="hover:text-white transition-colors">
                  info@dwsafrica.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-3.5 h-3.5 text-[#15803D] shrink-0" aria-hidden="true" />
                <a href="https://dwsafrica.com" target="_blank" rel="noreferrer" className="hover:text-white transition-colors">
                  dwsafrica.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal Copyright Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400">
          <p>
            © {new Date().getFullYear()} <strong className="text-white">Digital World Systems Africa Ltd</strong>. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:text-white transition-colors">About Us</Link>
            <Link href="/careers" className="hover:text-white transition-colors">Careers</Link>
            <Link href="/login" className="hover:text-[#15803D] font-bold text-white transition-colors">Digital Campus Login</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
