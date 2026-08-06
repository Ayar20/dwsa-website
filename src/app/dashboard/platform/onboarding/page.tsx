"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2, Building2, Palette, BookOpen, Layers, ShieldCheck, ArrowRight, ArrowLeft, Zap, Sparkles
} from "lucide-react";
import { OnboardingService } from "@/lib/institutionOS/OnboardingService";

export default function EnterpriseOnboardingPage() {
  const [state, setState] = useState(OnboardingService.getInitialState());

  const currentStep = state.steps[state.currentStepIndex];

  const handleNext = () => {
    if (state.currentStepIndex < state.steps.length - 1) {
      const nextIdx = state.currentStepIndex + 1;
      const updatedSteps = [...state.steps];
      updatedSteps[state.currentStepIndex].isCompleted = true;
      setState({ ...state, currentStepIndex: nextIdx, steps: updatedSteps });
    }
  };

  const handlePrev = () => {
    if (state.currentStepIndex > 0) {
      setState({ ...state, currentStepIndex: state.currentStepIndex - 1 });
    }
  };

  const toggleModule = (mod: string) => {
    const exists = state.selectedModules.includes(mod);
    const updated = exists
      ? state.selectedModules.filter((m) => m !== mod)
      : [...state.selectedModules, mod];
    setState({ ...state, selectedModules: updated });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="bg-[#061428] border border-[#d4a017]/20 p-6 sm:p-8 rounded-3xl space-y-2">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#d4a017]/15 text-[#d4a017] text-[10px] font-black uppercase tracking-wider">
          <CheckCircle2 className="w-3 h-3" />
          <span>v4.1 — Enterprise Customer Onboarding Centre</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          Customer Onboarding & Deployment Readiness
        </h1>
        <p className="text-xs text-[#8899b4]">
          5-step customer onboarding workflow for discovering, configuring, activating, and launching educational institutions.
        </p>
      </div>

      {/* Stepper Header */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
        {state.steps.map((s, idx) => {
          const isActive = idx === state.currentStepIndex;
          const isDone = s.isCompleted;

          return (
            <button
              key={s.id}
              onClick={() => setState({ ...state, currentStepIndex: idx })}
              className={`flex items-center gap-2 px-4 py-3 rounded-2xl border text-xs font-bold shrink-0 transition-all ${
                isActive
                  ? "bg-[#d4a017]/15 text-[#d4a017] border-[#d4a017]"
                  : isDone
                  ? "bg-[#4ade80]/10 text-[#4ade80] border-[#4ade80]/30"
                  : "bg-[#061428] text-[#6b7a94] border-[#1a2f4a]"
              }`}
            >
              <span className="text-sm">{isDone ? "✓" : s.icon}</span>
              <span>{s.title}</span>
            </button>
          );
        })}
      </div>

      {/* Step Content Card */}
      <div className="bg-[#061428] border border-[#d4a017]/20 p-6 sm:p-8 rounded-3xl space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-[#1a2f4a]">
          <div className="w-10 h-10 rounded-xl bg-[#d4a017]/15 text-[#d4a017] flex items-center justify-center text-lg font-black">
            {currentStep.icon}
          </div>
          <div>
            <h2 className="text-lg font-extrabold text-white">{currentStep.title}</h2>
            <p className="text-xs text-[#8899b4]">{currentStep.description}</p>
          </div>
        </div>

        {/* Step 1: Info */}
        {state.currentStepIndex === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#aab4c4] mb-1">Institution Name</label>
              <input
                type="text"
                placeholder="e.g. Covenant Technology University"
                value={state.organizationInfo.institutionName}
                onChange={(e) =>
                  setState({
                    ...state,
                    organizationInfo: { ...state.organizationInfo, institutionName: e.target.value },
                  })
                }
                className="w-full bg-[#030e1f] border border-[#d4a017]/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a017]"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#aab4c4] mb-1">Institution Type</label>
              <select
                value={state.organizationInfo.institutionType}
                onChange={(e) =>
                  setState({
                    ...state,
                    organizationInfo: { ...state.organizationInfo, institutionType: e.target.value as any },
                  })
                }
                className="w-full bg-[#030e1f] border border-[#d4a017]/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a017]"
              >
                <option value="university">University</option>
                <option value="polytechnic">Polytechnic</option>
                <option value="college">College</option>
                <option value="corporate">Corporate Academy</option>
                <option value="government">Government Institution</option>
              </select>
            </div>
          </div>
        )}

        {/* Step 2: Branding */}
        {state.currentStepIndex === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#aab4c4] mb-1">Primary Color</label>
              <input
                type="color"
                value={state.brandingSetup.primaryColor}
                onChange={(e) =>
                  setState({
                    ...state,
                    brandingSetup: { ...state.brandingSetup, primaryColor: e.target.value },
                  })
                }
                className="w-full h-10 bg-[#030e1f] border border-[#d4a017]/20 rounded-xl px-2 py-1 cursor-pointer"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#aab4c4] mb-1">Secondary Color</label>
              <input
                type="color"
                value={state.brandingSetup.secondaryColor}
                onChange={(e) =>
                  setState({
                    ...state,
                    brandingSetup: { ...state.brandingSetup, secondaryColor: e.target.value },
                  })
                }
                className="w-full h-10 bg-[#030e1f] border border-[#d4a017]/20 rounded-xl px-2 py-1 cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Step 3: Academic */}
        {state.currentStepIndex === 2 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-[#aab4c4] mb-1">Academic Calendar Structure</label>
              <input
                type="text"
                value={state.academicConfig.academicCalendar}
                onChange={(e) =>
                  setState({
                    ...state,
                    academicConfig: { ...state.academicConfig, academicCalendar: e.target.value },
                  })
                }
                className="w-full bg-[#030e1f] border border-[#d4a017]/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a017]"
              />
            </div>
            <div>
              <label className="block font-bold text-[#aab4c4] mb-1">Grading Structure</label>
              <input
                type="text"
                value={state.academicConfig.gradingStructure}
                onChange={(e) =>
                  setState({
                    ...state,
                    academicConfig: { ...state.academicConfig, gradingStructure: e.target.value },
                  })
                }
                className="w-full bg-[#030e1f] border border-[#d4a017]/20 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#d4a017]"
              />
            </div>
          </div>
        )}

        {/* Step 4: Modules Selection */}
        {state.currentStepIndex === 3 && (
          <div className="space-y-3">
            <p className="text-xs text-[#8899b4]">Toggle active enterprise modules for this customer account:</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                "Digital Campus",
                "Faculty Workspace",
                "Institution Control Centre",
                "AI Intelligence",
                "Digital Credentials",
                "Career Centre",
                "Research Centre",
                "Community",
                "Analytics",
              ].map((mod) => {
                const isSelected = state.selectedModules.includes(mod);
                return (
                  <button
                    key={mod}
                    type="button"
                    onClick={() => toggleModule(mod)}
                    className={`p-3.5 rounded-2xl border text-left text-xs font-bold flex items-center justify-between transition-all ${
                      isSelected
                        ? "bg-[#4ade80]/15 text-[#4ade80] border-[#4ade80]/40"
                        : "bg-[#030e1f] text-[#6b7a94] border-[#1a2f4a]"
                    }`}
                  >
                    <span>{mod}</span>
                    <span>{isSelected ? "✓" : "—"}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 5: Deployment Readiness Checklist */}
        {state.currentStepIndex === 4 && (
          <div className="space-y-4">
            <h3 className="text-sm font-extrabold text-white">Deployment Readiness Audit</h3>
            <div className="space-y-2">
              {[
                { title: "Configuration Complete", isDone: state.readinessChecklist.configurationComplete },
                { title: "Branding & Colors Ready", isDone: state.readinessChecklist.brandingReady },
                { title: "Administrator & Faculty Accounts Ready", isDone: state.readinessChecklist.usersReady },
                { title: "Payment & AI Integrations Verified", isDone: state.readinessChecklist.integrationsReady },
              ].map((item) => (
                <div
                  key={item.title}
                  className="p-3.5 rounded-xl bg-[#030e1f] border border-[#1a2f4a] flex items-center justify-between text-xs"
                >
                  <span className="font-bold text-white">{item.title}</span>
                  <span className="font-extrabold text-[#4ade80]">✓ Ready</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-[#1a2f4a]">
          <button
            type="button"
            disabled={state.currentStepIndex === 0}
            onClick={handlePrev}
            className="px-5 py-2.5 rounded-2xl bg-[#030e1f] border border-[#1a2f4a] text-xs font-bold text-[#aab4c4] hover:text-white disabled:opacity-50 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>

          {state.currentStepIndex < state.steps.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-6 py-2.5 rounded-2xl bg-[#d4a017] text-[#030e1f] text-xs font-black uppercase tracking-wider hover:bg-[#f0c040] flex items-center gap-2"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <Link
              href="/dashboard/platform/tenants"
              className="px-8 py-3 rounded-2xl bg-gradient-to-r from-[#4ade80] to-[#16a34a] text-[#030e1f] font-black text-xs uppercase tracking-wider shadow-lg shadow-[#4ade80]/20 flex items-center gap-2"
            >
              🚀 Launch Customer Institution Node
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
