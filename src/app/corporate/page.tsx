"use client";

import React, { useState } from "react";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import { Building2, CheckCircle2, ShieldCheck, Cpu, Zap, ArrowRight, MessageCircle } from "lucide-react";

export default function CorporatePage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-[#030e1f] text-[#f0f4ff] flex flex-col font-sans">
      <PublicNav />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017] text-xs font-bold">
            <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
            ENTERPRISE &amp; ORGANIZATIONAL UP-SKILLING
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Corporate <span className="text-[#d4a017]">Learning</span>
          </h1>
          <p className="text-[#8899b4] text-base leading-relaxed">
            DWSA Corporate Learning equips enterprise teams, government agencies, and financial institutions with custom technical training, AI workflow integration, and digital transformation capability.
          </p>
        </div>

        {/* Corporate Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="p-8 bg-[#061428] border border-[#d4a017]/30 rounded-3xl space-y-4">
            <div className="p-3 bg-[#d4a017]/10 text-[#d4a017] rounded-xl w-fit border border-[#d4a017]/30">
              <Cpu className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-xl font-bold text-white">AI Readiness &amp; Adoption Workshops</h3>
            <p className="text-xs text-[#8899b4] leading-relaxed">
              Empower your non-technical personnel and engineering teams to safely integrate Generative AI tools, prompt engineering workflows, and automated LLM assistants into daily operations.
            </p>
            <ul className="space-y-2 text-xs text-[#c8d8f0] pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#d4a017]" aria-hidden="true" /> 10x Staff Productivity Gains</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#d4a017]" aria-hidden="true" /> Enterprise Data Privacy Protection</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#d4a017]" aria-hidden="true" /> Custom Workflow Automation Pipelines</li>
            </ul>
          </div>

          <div className="p-8 bg-[#061428] border border-[#d4a017]/30 rounded-3xl space-y-4">
            <div className="p-3 bg-[#d4a017]/10 text-[#d4a017] rounded-xl w-fit border border-[#d4a017]/30">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Digital Transformation Training</h3>
            <p className="text-xs text-[#8899b4] leading-relaxed">
              Modernizing legacy business processes with cloud-native architectures, microservices, automated data engineering, and agile software development standards.
            </p>
            <ul className="space-y-2 text-xs text-[#c8d8f0] pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#d4a017]" /> Legacy System Migration Strategies</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#d4a017]" /> Cloud Infrastructure Best Practices</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#d4a017]" /> Data-Driven Decision Science</li>
            </ul>
          </div>

          <div className="p-8 bg-[#061428] border border-[#4ade80]/30 rounded-3xl space-y-4">
            <div className="p-3 bg-[#4ade80]/10 text-[#4ade80] rounded-xl w-fit border border-[#4ade80]/30">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Cybersecurity &amp; NDPR Awareness</h3>
            <p className="text-xs text-[#8899b4] leading-relaxed">
              Educating staff on threat intelligence, phishing defense, data protection regulations (NDPR/GDPR), and secure coding practices to safeguard organizational assets.
            </p>
            <ul className="space-y-2 text-xs text-[#c8d8f0] pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#4ade80]" /> Regulatory Compliance Frameworks</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#4ade80]" /> Employee Threat Resilience Training</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-[#4ade80]" /> Secure System Architecture Audits</li>
            </ul>
          </div>

          <div className="p-8 bg-[#061428] border border-slate-800 rounded-3xl space-y-4">
            <div className="p-3 bg-slate-800 text-white rounded-xl w-fit border border-slate-700">
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Executive Technology Leadership</h3>
            <p className="text-xs text-[#8899b4] leading-relaxed">
              Intensive executive briefings for Board Members, CEOs, and C-Suite leaders navigating AI disruption, blockchain innovation, and strategic tech investments.
            </p>
            <ul className="space-y-2 text-xs text-[#c8d8f0] pt-2">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-white" /> Technology ROI &amp; Investment Planning</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-white" /> Ethical AI Governance &amp; Risk Mitigation</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-3.5 h-3.5 text-white" /> Pan-African Market Positioning</li>
            </ul>
          </div>

        </div>

        {/* Corporate Inquiry Box */}
        <div className="bg-gradient-to-br from-[#061428] to-[#091832] border-2 border-[#d4a017] rounded-3xl p-8 sm:p-12 space-y-6 text-center max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Request a Customized <span className="text-[#d4a017]">Corporate Training Proposal</span>
          </h2>
          <p className="text-xs text-[#8899b4]">
            Our corporate solutions team will tailor a training curriculum for your organization&apos;s specific tech stack and strategic objectives.
          </p>

          {!submitted ? (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4 text-left max-w-lg mx-auto pt-2">
              <div className="space-y-1">
                <label htmlFor="corp-org" className="text-[#8899b4] text-xs font-semibold">Organization / Company Name <span className="text-red-400" aria-hidden="true">*</span></label>
                <input id="corp-org" required placeholder="e.g. First Bank Nigeria" className="w-full bg-[#061428] border border-[#d4a017]/20 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-[#d4a017]/60 focus:ring-1 focus:ring-[#d4a017]/30 transition-all" />
              </div>
              <div className="space-y-1">
                <label htmlFor="corp-email" className="text-[#8899b4] text-xs font-semibold">Corporate Email Address <span className="text-red-400" aria-hidden="true">*</span></label>
                <input id="corp-email" required type="email" placeholder="e.g. training@company.com" className="w-full bg-[#061428] border border-[#d4a017]/20 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-[#d4a017]/60 focus:ring-1 focus:ring-[#d4a017]/30 transition-all" />
              </div>
              <div className="space-y-1">
                <label htmlFor="corp-phone" className="text-[#8899b4] text-xs font-semibold">Phone / WhatsApp Number <span className="text-red-400" aria-hidden="true">*</span></label>
                <input id="corp-phone" required type="tel" placeholder="e.g. 08012345678" className="w-full bg-[#061428] border border-[#d4a017]/20 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-[#d4a017]/60 focus:ring-1 focus:ring-[#d4a017]/30 transition-all" />
              </div>
              <div className="space-y-1">
                <label htmlFor="corp-training" className="text-[#8899b4] text-xs font-semibold">Training Interest</label>
                <select id="corp-training" className="w-full bg-[#061428] border border-[#d4a017]/20 rounded-xl px-4 py-3 text-white text-xs outline-none focus:border-[#d4a017]/60 focus:ring-1 focus:ring-[#d4a017]/30 transition-all">
                  <option>AI Readiness &amp; Adoption Workshops</option>
                  <option>Digital Transformation Training</option>
                  <option>Cybersecurity &amp; NDPR Awareness</option>
                  <option>Executive Technology Leadership</option>
                  <option>Custom Workforce Development</option>
                </select>
              </div>
              <button type="submit" className="w-full py-4 bg-gradient-to-r from-[#d4a017] to-[#e5a910] hover:from-[#e5a910] hover:to-[#d4a017] text-[#030e1f] font-extrabold rounded-xl text-xs shadow-lg shadow-[#d4a017]/20 transition-all btn-press">
                SUBMIT CORPORATE PROPOSAL REQUEST →
              </button>
            </form>
          ) : (
            <div className="p-6 bg-[#030e1f] border border-[#4ade80]/40 rounded-2xl space-y-2">
              <CheckCircle2 className="w-10 h-10 text-[#4ade80] mx-auto" aria-hidden="true" />
              <h4 className="text-base font-bold text-white">Proposal Request Received!</h4>
              <p className="text-xs text-[#8899b4]">A DWSA corporate representative will reach out to your team within 24 hours.</p>
            </div>
          )}

          <div className="pt-2">
            <a href="https://wa.me/2347082135071?text=Hello%20DWSA%20Corporate%20Learning%20Team%2C%20we%20want%20to%20discuss%20training%20for%20our%20organization" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold text-[#4ade80] hover:text-[#4ade80]/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4ade80] rounded">
              <MessageCircle className="w-4 h-4" aria-hidden="true" /> Or Chat Directly With Corporate Desk on WhatsApp
            </a>
          </div>
        </div>

      </main>

      <PublicFooter />
    </div>
  );
}
