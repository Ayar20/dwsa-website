"use client";

import React, { useState } from "react";
import {
  Settings, Building2, Lock, Bell, Mail, Database, Shield,
  CheckCircle2, RefreshCw, Cpu
} from "lucide-react";

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Toast Alert */}
      {saved && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl bg-[#061428] border border-[#4ade80]/50 text-[#4ade80] text-xs font-extrabold shadow-2xl flex items-center gap-2 animate-fadeInUp">
          <CheckCircle2 className="w-4 h-4" />
          Settings Saved &amp; Propagated Across Campus!
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-[#d4a017]/15 text-[#d4a017] text-[9px] font-black uppercase">SYSTEM CONFIGURATION</span>
          <span className="text-[10px] text-[#8899b4]">InstitutionOS v3.2</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white mt-1">System &amp; Campus Settings</h2>
        <p className="text-xs text-[#8899b4]">Configure branding, payment gateways, notification channels, security policies, and multi-tenant keys</p>
      </div>

      {/* Settings Grid */}
      <div className="space-y-6">
        {/* Brand & Identity */}
        <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#d4a017]" />
            Institutional Brand &amp; Identity
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-[#8899b4] uppercase mb-1">Institution Name</label>
              <input
                type="text"
                defaultValue="Digital Technology Academy (DTA)"
                className="w-full px-3 py-2 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-[#8899b4] uppercase mb-1">Parent Corporate Entity</label>
              <input
                type="text"
                defaultValue="Digital World Systems Africa Ltd (DWSA)"
                className="w-full px-3 py-2 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Payment Configuration */}
        <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4">
          <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#4ade80]" />
            Paystack &amp; ERP Gateway Settings
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-[#8899b4] uppercase mb-1">Paystack Public Key</label>
              <input
                type="text"
                defaultValue="pk_live_dta_************************"
                className="w-full px-3 py-2 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white font-mono"
              />
            </div>
            <div>
              <label className="block text-[10px] font-black text-[#8899b4] uppercase mb-1">Default Currency</label>
              <input
                type="text"
                defaultValue="NGN (Nigerian Naira ₦)"
                className="w-full px-3 py-2 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Pricing & Early Bird Settings */}
        <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <span className="text-base">🎓</span>
              Cohort Pricing &amp; Early Bird Control
            </h3>
            <span className="px-2 py-0.5 rounded-full bg-[#15803D]/20 border border-[#4ade80]/30 text-[#4ade80] text-[9px] font-black uppercase tracking-wider">
              GENAI-WP-001 Active
            </span>
          </div>

          <p className="text-[11px] text-[#8899b4] leading-relaxed">
            Controls the pricing displayed across the homepage, registration, and admissions pages. The standard price shows as strikethrough when early bird is active.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-[#8899b4] uppercase mb-1">
                Standard / Full Tuition (₦)
              </label>
              <input
                type="number"
                defaultValue={55000}
                className="w-full px-3 py-2 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white font-mono"
              />
              <p className="text-[10px] text-[#8899b4] mt-1">Displayed with strikethrough when early bird is active</p>
            </div>
            <div>
              <label className="block text-[10px] font-black text-[#8899b4] uppercase mb-1">
                Early Bird Price (₦)
              </label>
              <input
                type="number"
                defaultValue={45000}
                className="w-full px-3 py-2 rounded-xl bg-[#030e1f] border border-[#4ade80]/40 text-xs text-[#4ade80] font-mono"
              />
              <p className="text-[10px] text-[#8899b4] mt-1">Active discounted price shown on all CTAs</p>
            </div>
            <div>
              <label className="block text-[10px] font-black text-[#8899b4] uppercase mb-1">
                Early Bird Seat Limit
              </label>
              <input
                type="number"
                defaultValue={5}
                min={1}
                className="w-full px-3 py-2 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white font-mono"
              />
              <p className="text-[10px] text-[#8899b4] mt-1">Shows "First X students only" on pricing badges</p>
            </div>
            <div>
              <label className="block text-[10px] font-black text-[#8899b4] uppercase mb-1">
                Early Bird Status
              </label>
              <select
                defaultValue="active"
                className="w-full px-3 py-2 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white"
              >
                <option value="active">✅ Active — Show early bird pricing &amp; strikethrough</option>
                <option value="inactive">❌ Inactive — Show standard price only (no strikethrough)</option>
              </select>
              <p className="text-[10px] text-[#8899b4] mt-1">Toggle strikethrough &amp; early bird badge on/off sitewide</p>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-[#8899b4] uppercase mb-1">
              Paystack Checkout URL
            </label>
            <input
              type="url"
              defaultValue="https://checkout.paystack.com/brihlvap5ybeaww"
              className="w-full px-3 py-2 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white font-mono"
            />
            <p className="text-[10px] text-[#8899b4] mt-1">The direct Paystack link used on all "Pay Now" buttons across the site</p>
          </div>

          <div className="p-3 rounded-xl bg-[#D4A017]/10 border border-[#D4A017]/30 text-[11px] text-[#D4A017] leading-relaxed">
            ⚠️ <strong>Note:</strong> Pricing is currently hardcoded. Saving here records your intent — a database-driven config update is needed to make changes reflect live without redeployment.
          </div>
        </div>

        {/* Action button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2.5 rounded-xl bg-[#d4a017] text-[#030e1f] text-xs font-extrabold hover:bg-[#b8891a] transition-all"
          >
            Save All Settings
          </button>
        </div>
      </div>
    </div>
  );
}
