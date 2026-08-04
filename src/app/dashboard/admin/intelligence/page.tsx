"use client";

import React from "react";
import {
  Sparkles, Activity, TrendingUp, Users, DollarSign, Cpu,
  Globe, Shield, BarChart3, PieChart, Layers
} from "lucide-react";

export default function DigitalTwinPage() {
  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-[#d4a017]/15 text-[#d4a017] text-[9px] font-black uppercase">INSTITUTION DIGITAL TWIN</span>
          <span className="text-[10px] text-[#8899b4]">InstitutionOS v3.2</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white mt-1">Institution Digital Twin &amp; Predictive Intelligence</h2>
        <p className="text-xs text-[#8899b4]">Real-time digital twin representation, predictive enrollment modeling, and financial scenario forecasting</p>
      </div>

      {/* Hero Twin Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0d1628] via-[#061428] to-[#030e1f] border border-[#d4a017]/30 p-8 space-y-4 shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-[#d4a017]/15 border border-[#d4a017]/40 text-[#d4a017] flex items-center justify-center">
              <Cpu className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-white">Digital Twin Kernel Active</h3>
              <p className="text-xs text-[#4ade80] font-bold flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#4ade80] animate-pulse" /> Synchronized with Real-Time Campus Operations
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017] text-[10px] font-black uppercase">
            SIMULATION ENGINE v3.2
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-[#1a2f4a]">
          <div className="bg-[#030e1f] p-4 rounded-2xl border border-[#1a2f4a] space-y-1">
            <span className="text-[9px] font-black text-[#8899b4] uppercase">Predictive Enrolment (Q3 2026)</span>
            <p className="text-xl font-extrabold text-white">+18.5% Growth Projected</p>
            <p className="text-[10px] text-[#4ade80]">Est. 570 Enrolled Learners</p>
          </div>

          <div className="bg-[#030e1f] p-4 rounded-2xl border border-[#1a2f4a] space-y-1">
            <span className="text-[9px] font-black text-[#8899b4] uppercase">Revenue Forecast (FY 2026)</span>
            <p className="text-xl font-extrabold text-[#4ade80]">₦64.8M Projected</p>
            <p className="text-[10px] text-[#8899b4]">Based on current retention + Delta pipeline</p>
          </div>

          <div className="bg-[#030e1f] p-4 rounded-2xl border border-[#1a2f4a] space-y-1">
            <span className="text-[9px] font-black text-[#8899b4] uppercase">Graduate Employment Probability</span>
            <p className="text-xl font-extrabold text-[#d4a017]">94.1% Model Confidence</p>
            <p className="text-[10px] text-[#4ade80]">Top demand: React, Node, AI Pipelines</p>
          </div>
        </div>
      </div>

      {/* Scenario Planning Hub */}
      <div className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4">
        <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#d4a017]" />
          Executive Scenario Simulation Workspace
        </h3>
        <p className="text-xs text-[#8899b4]">Simulate tuition adjustment impact, faculty expansion models, and scholarship allocation strategies.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="rounded-2xl bg-[#030e1f] border border-[#1a2f4a] p-5 space-y-3">
            <p className="text-xs font-extrabold text-white">Scenario A: 15% Tuition Increase + 20% Scholarship Fund</p>
            <p className="text-[10px] text-[#8899b4]">Simulates revenue vs enrollment elasticity for Cohort Epsilon.</p>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-[#1a2f4a]">
              <span className="text-[#4ade80] font-bold">+₦7.2M Net Revenue</span>
              <span className="text-[#8899b4]">Elasticity: Low Risk</span>
            </div>
          </div>

          <div className="rounded-2xl bg-[#030e1f] border border-[#1a2f4a] p-5 space-y-3">
            <p className="text-xs font-extrabold text-white">Scenario B: Add School of Cybersecurity in Q4 2026</p>
            <p className="text-[10px] text-[#8899b4]">Simulates Capex vs Opex for 4 new faculty members + 80 learners.</p>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-[#1a2f4a]">
              <span className="text-[#d4a017] font-bold">Break-even in 5.2 Months</span>
              <span className="text-[#8899b4]">ROI: High Growth</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
