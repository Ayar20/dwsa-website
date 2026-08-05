"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  UserPlus, Building2, Palette, BookOpen, Layers, CheckCircle2, ArrowRight, ArrowLeft, Globe, ShieldCheck
} from "lucide-react";
import { TenantProvisioningService } from "@/lib/institutionOS/TenantProvisioningService";
import type { TenantType, SubscriptionTier } from "@/types/tenant";

export default function ProvisionWizardPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 1: Info
    name: "",
    legalName: "",
    country: "Nigeria",
    state: "Lagos",
    type: "university" as TenantType,
    website: "",
    adminName: "",
    adminEmail: "",
    // Step 2: Branding
    shortName: "",
    tagline: "",
    primaryColor: "#d4a017",
    secondaryColor: "#4ade80",
    accentColor: "#f0c040",
    fontFamily: "Inter, sans-serif",
    // Step 3: Academic
    semestersPerYear: "2",
    cohortCycleWeeks: "24",
    gradingScale: "4.0 GPA",
    timezone: "Africa/Lagos",
    currency: "NGN",
    // Step 4: Modules
    admissions: true,
    learning: true,
    faculty: true,
    finance: true,
    research: true,
    innovation: true,
    community: true,
    alumni: true,
    ai: true,
    marketplace: true,
    // Step 5: Tier
    tier: "professional" as SubscriptionTier,
  });

  const [isProvisioning, setIsProvisioning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const steps = [
    { label: "Institution Details", icon: "🏛", desc: "Name, type, country, & administrator" },
    { label: "Brand Identity", icon: "🎨", desc: "Logo, colors, and typography" },
    { label: "Academic Config", icon: "📚", desc: "Calendar, grading scale, & currency" },
    { label: "Platform Modules", icon: "⚡", desc: "Enable/disable module flags" },
    { label: "Deployment & Launch", icon: "🚀", desc: "Review and provision tenant" },
  ];

  const handleModuleToggle = (moduleKey: keyof typeof formData) => {
    setFormData((prev) => ({
      ...prev,
      [moduleKey]: !prev[moduleKey],
    }));
  };

  const executeProvision = () => {
    setIsProvisioning(true);
    setTimeout(() => {
      setIsProvisioning(false);
      setIsCompleted(true);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#061428] border border-[#d4a017]/20 p-6 sm:p-8 rounded-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#d4a017]/15 text-[#d4a017] text-[10px] font-black uppercase tracking-wider">
          <UserPlus className="w-3 h-3" />
          <span>Phase 4 — Enterprise Institution Onboarding</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Provision New Educational Institution
        </h1>
        <p className="text-xs text-[#8899b4]">
          Deploy a complete isolated multi-tenant institution node powered by InstitutionOS v4.0.
        </p>
      </div>

      {/* Step Stepper */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
        {steps.map((step, idx) => {
          const isActive = idx === currentStep;
          const isDone = idx < currentStep || isCompleted;

          return (
            <button
              key={step.label}
              onClick={() => idx <= currentStep && setCurrentStep(idx)}
              className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl border text-xs font-bold shrink-0 transition-all ${
                isActive
                  ? "bg-[#d4a017]/15 text-[#d4a017] border-[#d4a017]"
                  : isDone
                  ? "bg-[#4ade80]/10 text-[#4ade80] border-[#4ade80]/30"
                  : "bg-[#061428] text-[#6b7a94] border-[#1a2f4a]"
              }`}
            >
              <span className="text-sm">{isDone ? "✓" : step.icon}</span>
              <span>{step.label}</span>
            </button>
          );
        })}
      </div>

      {/* Step Form Body */}
      <div className="bg-[#061428] border border-[#d4a017]/20 p-6 sm:p-8 rounded-3xl space-y-6">
        {isCompleted ? (
          <div className="text-center py-10 space-y-4 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-[#4ade80]/20 text-[#4ade80] flex items-center justify-center mx-auto text-2xl font-black">
              ✓
            </div>
            <h2 className="text-2xl font-black text-white">Institution Provisioned Successfully!</h2>
            <p className="text-xs text-[#8899b4] max-w-md mx-auto">
              <strong className="text-white">{formData.name || "New Institution"}</strong> has been initialized with database isolation, domain routing, custom branding, and admin privileges.
            </p>
            <div className="pt-4 flex justify-center gap-4">
              <Link
                href="/dashboard/platform/tenants"
                className="px-6 py-3 rounded-2xl bg-[#d4a017] text-[#030e1f] font-black text-xs uppercase tracking-wider hover:bg-[#f0c040]"
              >
                Go to Tenant Registry →
              </Link>
            </div>
          </div>
        ) : isProvisioning ? (
          <div className="text-center py-16 space-y-4">
            <div className="w-12 h-12 border-4 border-[#d4a017] border-t-transparent rounded-full animate-spin mx-auto" />
            <h3 className="text-lg font-black text-white">Provisioning Tenant Infrastructure...</h3>
            <p className="text-xs text-[#8899b4]">Generating tenant database schema, domain routing, and administrator credentials...</p>
          </div>
        ) : (
          <>
            {/* Step 1: Info */}
            {currentStep === 0 && (
              <div className="space-y-4">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <span>🏛</span> 1. Institution & Administrator Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#aab4c4] mb-1">Institution Display Name *</label>
                    <input
                      type="text"
                      placeholder="e.g. Pan-Atlantic Tech Institute"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#030e1f] border border-[#d4a017]/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a017]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#aab4c4] mb-1">Legal Entity Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Pan-Atlantic University Ltd"
                      value={formData.legalName}
                      onChange={(e) => setFormData({ ...formData, legalName: e.target.value })}
                      className="w-full bg-[#030e1f] border border-[#d4a017]/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a017]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#aab4c4] mb-1">Institution Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value as TenantType })}
                      className="w-full bg-[#030e1f] border border-[#d4a017]/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a017]"
                    >
                      <option value="university">University</option>
                      <option value="polytechnic">Polytechnic</option>
                      <option value="college">College</option>
                      <option value="academy">Training Academy</option>
                      <option value="corporate">Corporate Academy</option>
                      <option value="government">Government Institution</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#aab4c4] mb-1">Country / Region</label>
                    <input
                      type="text"
                      value={formData.country}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-[#030e1f] border border-[#d4a017]/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a017]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#aab4c4] mb-1">Primary Admin Name *</label>
                    <input
                      type="text"
                      placeholder="Dr. Admin Name"
                      value={formData.adminName}
                      onChange={(e) => setFormData({ ...formData, adminName: e.target.value })}
                      className="w-full bg-[#030e1f] border border-[#d4a017]/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a017]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#aab4c4] mb-1">Primary Admin Email *</label>
                    <input
                      type="email"
                      placeholder="admin@institution.edu.ng"
                      value={formData.adminEmail}
                      onChange={(e) => setFormData({ ...formData, adminEmail: e.target.value })}
                      className="w-full bg-[#030e1f] border border-[#d4a017]/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a017]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Branding */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <span>🎨</span> 2. Brand Identity & Colors
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#aab4c4] mb-1">Short Name / Abbreviation</label>
                    <input
                      type="text"
                      placeholder="e.g. PATI"
                      value={formData.shortName}
                      onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                      className="w-full bg-[#030e1f] border border-[#d4a017]/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a017]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#aab4c4] mb-1">Tagline</label>
                    <input
                      type="text"
                      placeholder="e.g. Excellence in Technology"
                      value={formData.tagline}
                      onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                      className="w-full bg-[#030e1f] border border-[#d4a017]/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a017]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#aab4c4] mb-1">Primary Color (Hex)</label>
                    <input
                      type="color"
                      value={formData.primaryColor}
                      onChange={(e) => setFormData({ ...formData, primaryColor: e.target.value })}
                      className="w-full h-10 bg-[#030e1f] border border-[#d4a017]/20 rounded-xl px-2 py-1 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#aab4c4] mb-1">Secondary Color (Hex)</label>
                    <input
                      type="color"
                      value={formData.secondaryColor}
                      onChange={(e) => setFormData({ ...formData, secondaryColor: e.target.value })}
                      className="w-full h-10 bg-[#030e1f] border border-[#d4a017]/20 rounded-xl px-2 py-1 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Academic */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <span>📚</span> 3. Academic Calendar & Configuration
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#aab4c4] mb-1">Semesters Per Year</label>
                    <input
                      type="number"
                      value={formData.semestersPerYear}
                      onChange={(e) => setFormData({ ...formData, semestersPerYear: e.target.value })}
                      className="w-full bg-[#030e1f] border border-[#d4a017]/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a017]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#aab4c4] mb-1">Grading Scale</label>
                    <input
                      type="text"
                      value={formData.gradingScale}
                      onChange={(e) => setFormData({ ...formData, gradingScale: e.target.value })}
                      className="w-full bg-[#030e1f] border border-[#d4a017]/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a017]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#aab4c4] mb-1">Timezone</label>
                    <input
                      type="text"
                      value={formData.timezone}
                      onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                      className="w-full bg-[#030e1f] border border-[#d4a017]/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a017]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#aab4c4] mb-1">Currency</label>
                    <input
                      type="text"
                      value={formData.currency}
                      onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                      className="w-full bg-[#030e1f] border border-[#d4a017]/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a017]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Modules */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <span>⚡</span> 4. Platform Feature Flags & Modules
                </h3>
                <p className="text-xs text-[#8899b4]">Enable or disable modules individually for this institution node.</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { key: "admissions", label: "Admissions Command" },
                    { key: "learning", label: "LMS Learning Engine" },
                    { key: "faculty", label: "Faculty Workspace" },
                    { key: "finance", label: "Finance & ERP" },
                    { key: "research", label: "Research Management" },
                    { key: "innovation", label: "Innovation Marketplace" },
                    { key: "community", label: "Community & Alumni" },
                    { key: "ai", label: "AI Assistant" },
                    { key: "marketplace", label: "Marketplace Blueprints" },
                  ].map((item) => {
                    const isChecked = formData[item.key as keyof typeof formData] as boolean;
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => handleModuleToggle(item.key as keyof typeof formData)}
                        className={`p-3.5 rounded-2xl border text-left text-xs font-bold flex items-center justify-between transition-all ${
                          isChecked
                            ? "bg-[#4ade80]/15 text-[#4ade80] border-[#4ade80]/40"
                            : "bg-[#030e1f] text-[#6b7a94] border-[#1a2f4a]"
                        }`}
                      >
                        <span>{item.label}</span>
                        <span>{isChecked ? "✓" : "—"}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 5: Summary */}
            {currentStep === 4 && (
              <div className="space-y-4">
                <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                  <span>🚀</span> 5. Deployment Summary & Confirmation
                </h3>
                <div className="p-4 rounded-2xl bg-[#030e1f] border border-[#d4a017]/20 space-y-3 text-xs">
                  <div className="flex justify-between border-b border-[#1a2f4a] pb-2">
                    <span className="text-[#8899b4]">Institution Name</span>
                    <span className="font-bold text-white">{formData.name || "Pan-Atlantic Tech Institute"}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#1a2f4a] pb-2">
                    <span className="text-[#8899b4]">Type & Tier</span>
                    <span className="font-bold text-[#d4a017] capitalize">{formData.type} • {formData.tier}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#1a2f4a] pb-2">
                    <span className="text-[#8899b4]">Administrator</span>
                    <span className="font-bold text-white">{formData.adminName || "Admin"} ({formData.adminEmail || "admin@edu.ng"})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8899b4]">Region & Currency</span>
                    <span className="font-bold text-white">{formData.country} ({formData.currency})</span>
                  </div>
                </div>
              </div>
            )}

            {/* Stepper Navigation Buttons */}
            <div className="flex items-center justify-between pt-6 border-t border-[#1a2f4a]">
              {currentStep > 0 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((s) => s - 1)}
                  className="px-5 py-2.5 rounded-2xl bg-[#030e1f] border border-[#1a2f4a] text-xs font-bold text-[#aab4c4] hover:text-white flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
                </button>
              ) : <div />}

              {currentStep < steps.length - 1 ? (
                <button
                  type="button"
                  onClick={() => setCurrentStep((s) => s + 1)}
                  className="px-6 py-2.5 rounded-2xl bg-[#d4a017] text-[#030e1f] text-xs font-black uppercase tracking-wider hover:bg-[#f0c040] flex items-center gap-2"
                >
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={executeProvision}
                  className="px-8 py-3 rounded-2xl bg-gradient-to-r from-[#4ade80] to-[#16a34a] text-[#030e1f] font-black text-xs uppercase tracking-wider shadow-lg shadow-[#4ade80]/20 flex items-center gap-2"
                >
                  🚀 Provision Institution Node
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
