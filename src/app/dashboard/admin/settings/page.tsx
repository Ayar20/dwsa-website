"use client";

import React, { useState, useEffect } from "react";
import {
  Settings, Building2, Lock, Bell, Mail, Database, Shield,
  CheckCircle2, RefreshCw, Cpu, Loader2
} from "lucide-react";

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Pricing Form State
  const [standardPrice, setStandardPrice] = useState(55000);
  const [earlyBirdPrice, setEarlyBirdPrice] = useState(45000);
  const [earlyBirdSeats, setEarlyBirdSeats] = useState(5);
  const [earlyBirdActive, setEarlyBirdActive] = useState(true);
  const [paystackCheckoutUrl, setPaystackCheckoutUrl] = useState("https://checkout.paystack.com/brihlvap5ybeaww");

  // Load active settings from DB
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/settings");
      if (res.ok) {
        const data = await res.json();
        if (data.standardPrice !== undefined) setStandardPrice(data.standardPrice);
        if (data.earlyBirdPrice !== undefined) setEarlyBirdPrice(data.earlyBirdPrice);
        if (data.earlyBirdSeats !== undefined) setEarlyBirdSeats(data.earlyBirdSeats);
        if (data.earlyBirdActive !== undefined) setEarlyBirdActive(data.earlyBirdActive);
        if (data.paystackCheckoutUrl) setPaystackCheckoutUrl(data.paystackCheckoutUrl);
      }
    } catch (err: any) {
      console.error("Failed to load settings:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      const res = await fetch("/api/admin/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          standardPrice: Number(standardPrice),
          earlyBirdPrice: Number(earlyBirdPrice),
          earlyBirdSeats: Number(earlyBirdSeats),
          earlyBirdActive: Boolean(earlyBirdActive),
          paystackCheckoutUrl: paystackCheckoutUrl.trim(),
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to save settings");

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to save settings");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Toast Alert */}
      {saved && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3.5 rounded-2xl bg-[#061428] border border-[#4ade80]/50 text-[#4ade80] text-xs font-extrabold shadow-2xl flex items-center gap-2 animate-fadeInUp">
          <CheckCircle2 className="w-4 h-4" />
          Settings Saved &amp; Propagated to Database &amp; Live Campus!
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded bg-[#d4a017]/15 text-[#d4a017] text-[9px] font-black uppercase">SYSTEM CONFIGURATION</span>
          <span className="text-[10px] text-[#8899b4]">InstitutionOS v3.2 - Database-Backed</span>
        </div>
        <h2 className="text-2xl font-extrabold text-white mt-1">System &amp; Campus Settings</h2>
        <p className="text-xs text-[#8899b4]">Configure live pricing, early bird discounts, Paystack gateway, branding, and multi-tenant policies</p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/50 text-red-300 text-xs font-semibold">
          {error}
        </div>
      )}

      {/* Settings Grid */}
      <div className="space-y-6">

        {/* Pricing & Early Bird Database Control */}
        <div className="rounded-2xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <span className="text-base">🎓</span>
              Live Cohort Pricing &amp; Early Bird Control
            </h3>
            <div className="flex items-center gap-2">
              {loading && <Loader2 className="w-3.5 h-3.5 text-[#d4a017] animate-spin" />}
              <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider border ${
                earlyBirdActive
                  ? "bg-[#15803D]/20 border-[#4ade80]/30 text-[#4ade80]"
                  : "bg-slate-800 border-slate-700 text-slate-400"
              }`}>
                {earlyBirdActive ? "Early Bird Discount Active" : "Standard Price Only"}
              </span>
            </div>
          </div>

          <p className="text-[11px] text-[#8899b4] leading-relaxed">
            Changes saved here are stored in the PostgreSQL database and update immediately across the homepage, registration, and admissions pages.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-black text-[#8899b4] uppercase mb-1">
                Standard / Full Tuition (NGN)
              </label>
              <input
                type="number"
                value={standardPrice}
                onChange={(e) => setStandardPrice(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white font-mono focus:outline-none focus:border-[#4ade80]"
              />
              <p className="text-[10px] text-[#8899b4] mt-1">Displayed with strikethrough when Early Bird is active</p>
            </div>

            <div>
              <label className="block text-[10px] font-black text-[#8899b4] uppercase mb-1">
                Early Bird Price (NGN)
              </label>
              <input
                type="number"
                value={earlyBirdPrice}
                onChange={(e) => setEarlyBirdPrice(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-[#030e1f] border border-[#4ade80]/40 text-xs text-[#4ade80] font-mono focus:outline-none focus:border-[#4ade80]"
              />
              <p className="text-[10px] text-[#8899b4] mt-1">Active discounted price shown on all CTAs and invoices</p>
            </div>

            <div>
              <label className="block text-[10px] font-black text-[#8899b4] uppercase mb-1">
                Early Bird Seat Limit
              </label>
              <input
                type="number"
                min={1}
                value={earlyBirdSeats}
                onChange={(e) => setEarlyBirdSeats(Number(e.target.value))}
                className="w-full px-3 py-2.5 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white font-mono focus:outline-none focus:border-[#4ade80]"
              />
              <p className="text-[10px] text-[#8899b4] mt-1">Displays "First {earlyBirdSeats} students only" badge on site</p>
            </div>

            <div>
              <label className="block text-[10px] font-black text-[#8899b4] uppercase mb-1">
                Early Bird Discount Status
              </label>
              <select
                value={earlyBirdActive ? "active" : "inactive"}
                onChange={(e) => setEarlyBirdActive(e.target.value === "active")}
                className="w-full px-3 py-2.5 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white focus:outline-none focus:border-[#4ade80]"
              >
                <option value="active">Active - Show strikethrough and Early Bird discount</option>
                <option value="inactive">Inactive - Show standard price only without strikethrough</option>
              </select>
              <p className="text-[10px] text-[#8899b4] mt-1">Toggle strikethrough and discount badges on/off sitewide</p>
            </div>
          </div>

          <div>
            <label className="block text-[10px] font-black text-[#8899b4] uppercase mb-1">
              Paystack Checkout URL
            </label>
            <input
              type="url"
              value={paystackCheckoutUrl}
              onChange={(e) => setPaystackCheckoutUrl(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white font-mono focus:outline-none focus:border-[#4ade80]"
            />
            <p className="text-[10px] text-[#8899b4] mt-1">The live Paystack checkout link that all payment buttons direct students to</p>
          </div>
        </div>

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
                defaultValue="NGN (Nigerian Naira)"
                className="w-full px-3 py-2 rounded-xl bg-[#030e1f] border border-[#1a2f4a] text-xs text-white"
              />
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 rounded-xl bg-[#d4a017] hover:bg-[#b8891a] text-[#030e1f] text-xs font-extrabold transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                Saving to Database...
              </>
            ) : (
              "Save All Settings"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
