"use client";

import React, { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import {
  GraduationCap,
  ShieldAlert,
  ArrowRight,
  Mail,
  Lock,
  User,
  Phone,
  Sparkles,
  CheckCircle2,
  CreditCard,
  MessageCircle,
} from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<1 | 2>(1); // 1 = register, 2 = pay

  const [config, setConfig] = useState({
    standardPrice: 55000,
    earlyBirdPrice: 45000,
    earlyBirdSeats: 5,
    earlyBirdActive: true,
    paystackCheckoutUrl: "https://checkout.paystack.com/brihlvap5ybeaww",
  });

  useEffect(() => {
    fetch("/api/config")
      .then((res) => res.json())
      .then((data) => {
        if (data && !data.error) setConfig(data);
      })
      .catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          phone,
          programmeSlug: "generative-ai-for-work-and-productivity",
          paymentPlan: "FULL_UPFRONT",
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Registration failed");

      // Auto sign-in after registration
      await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      // Move to Step 2 — payment
      setStep(2);
    } catch (err: any) {
      setError(err.message || "Failed to register account");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col justify-center items-center p-4 relative font-sans py-12">
      <div className="w-full max-w-lg space-y-6 relative z-10">

        {/* Header Logo */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex p-3.5 bg-[#15803D] rounded-2xl shadow-sm mb-1 hover:scale-105 transition-transform text-white">
            <GraduationCap className="w-8 h-8" />
          </Link>
          <h1 className="text-2xl font-black text-[#0F172A] tracking-tight">
            {step === 1 ? (
              <>Join <span className="text-[#15803D]">DWSA Academy</span></>
            ) : (
              <>Complete Your <span className="text-[#15803D]">Enrolment</span></>
            )}
          </h1>
          <p className="text-xs text-slate-500 font-semibold tracking-wide max-w-md mx-auto">
            DWSA Digital Technology Academy · School of Generative Artificial Intelligence
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center gap-3">
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border transition-all ${
            step === 1
              ? "bg-[#15803D] text-white border-[#15803D]"
              : "bg-[#F0FDF4] text-[#15803D] border-[#15803D]/30"
          }`}>
            {step > 1 ? <CheckCircle2 className="w-3 h-3" /> : <span>1</span>}
            Create Account
          </div>
          <div className="w-6 h-px bg-slate-300" />
          <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border transition-all ${
            step === 2
              ? "bg-[#15803D] text-white border-[#15803D]"
              : "bg-white text-slate-400 border-slate-200"
          }`}>
            <span>2</span>
            Pay & Secure Seat
          </div>
        </div>

        {/* Programme Banner */}
        <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#15803D]/20 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-[#15803D] uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Flagship Programme
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-500">Cohort GENAI-WP-001</span>
          </div>
          <h3 className="text-sm font-extrabold text-[#0F172A]">Generative AI for Work &amp; Productivity</h3>
          <div className="flex items-center gap-2 flex-wrap mt-0.5">
            {config.earlyBirdActive ? (
              <>
                <span className="text-[11px] text-slate-400 line-through">₦{config.standardPrice.toLocaleString()}</span>
                <span className="px-2 py-0.5 rounded-full bg-[#15803D] text-white text-[10px] font-black">
                  Early Bird: ₦{config.earlyBirdPrice.toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500">· First {config.earlyBirdSeats} students only</span>
              </>
            ) : (
              <span className="text-[11px] font-bold text-[#15803D]">₦{config.standardPrice.toLocaleString()} Full Tuition</span>
            )}
          </div>
        </div>

        {/* ── STEP 1: Registration Form ── */}
        {step === 1 && (
          <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm space-y-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{error}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Full Name *</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Dr. Chidi Benson"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#15803D] focus:ring-1 focus:ring-[#15803D] transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Email Address *</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="chidi@example.com"
                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#15803D] focus:ring-1 focus:ring-[#15803D] transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Password *</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="password"
                      required
                      minLength={6}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="At least 6 characters"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#15803D] focus:ring-1 focus:ring-[#15803D] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#0F172A] mb-1.5">WhatsApp Number</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+234 800 000 0000"
                      className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-[#15803D] focus:ring-1 focus:ring-[#15803D] transition-all"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl text-xs font-extrabold bg-[#15803D] hover:bg-[#166534] text-white shadow-sm transition-all flex items-center justify-center gap-2 mt-2"
              >
                {loading ? "Creating Account..." : "Create Account & Continue to Payment"}
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="pt-4 border-t border-slate-100 text-center">
              <p className="text-xs text-slate-500">
                Already have an account?{" "}
                <Link href="/login" className="text-[#15803D] font-bold hover:underline">
                  Sign In to Digital Campus
                </Link>
              </p>
            </div>
          </div>
        )}

        {/* ── STEP 2: Payment ── */}
        {step === 2 && (
          <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm space-y-5">

            {/* Success notice */}
            <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#15803D]/30 flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#15803D] shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-extrabold text-[#0F172A]">Account Created Successfully! 🎉</p>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Welcome, <strong>{name}</strong>. Complete your payment below to secure your seat in Cohort GENAI-WP-001 and unlock your digital campus workspace.
                </p>
              </div>
            </div>

            {/* Invoice summary */}
            <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">Payment Summary</span>
                {config.earlyBirdActive && (
                  <span className="px-2 py-0.5 rounded-full bg-[#15803D] text-white text-[10px] font-black">
                    🎉 Early Bird — First {config.earlyBirdSeats} Students
                  </span>
                )}
              </div>
              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-600">Generative AI for Work &amp; Productivity</span>
                <div className="text-right">
                  {config.earlyBirdActive ? (
                    <>
                      <span className="text-[10px] text-slate-400 line-through block">₦{config.standardPrice.toLocaleString()}</span>
                      <span className="text-xs font-black text-[#15803D]">₦{config.earlyBirdPrice.toLocaleString()}</span>
                    </>
                  ) : (
                    <span className="text-xs font-black text-[#0F172A]">₦{config.standardPrice.toLocaleString()}</span>
                  )}
                </div>
              </div>
              <div className="flex justify-between items-center border-t border-slate-200 pt-2">
                <span className="text-xs font-extrabold text-[#0F172A]">Total Due Today</span>
                <span className="text-base font-black text-[#15803D]">
                  ₦{(config.earlyBirdActive ? config.earlyBirdPrice : config.standardPrice).toLocaleString()}
                </span>
              </div>
              {config.earlyBirdActive && (
                <p className="text-[10px] text-slate-500 pt-1 border-t border-slate-100">
                  Standard price after early bird slots fill: <strong className="text-[#0F172A]">₦{config.standardPrice.toLocaleString()}</strong>
                </p>
              )}
            </div>

            {/* Primary CTA — Paystack */}
            <a
              href={config.paystackCheckoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 rounded-xl text-sm font-black bg-[#15803D] hover:bg-[#166534] text-white shadow-md transition-all flex items-center justify-center gap-2"
            >
              <CreditCard className="w-5 h-5" />
              {config.earlyBirdActive
                ? `Pay Early Bird ₦${config.earlyBirdPrice.toLocaleString()} via Paystack →`
                : `Pay ₦${config.standardPrice.toLocaleString()} via Paystack Now →`}
            </a>

            <p className="text-[11px] text-center text-slate-500">
              Secure payment powered by Paystack · Card, Bank Transfer & USSD accepted
            </p>

            {/* WhatsApp support */}
            <div className="p-3.5 rounded-xl bg-[#FEFCE8] border border-[#D4A017]/30 flex items-center gap-3">
              <MessageCircle className="w-4 h-4 text-[#D4A017] shrink-0" />
              <p className="text-[11px] text-slate-700">
                Need help with payment?{" "}
                <a
                  href="https://wa.me/2347082135071"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#D4A017] font-extrabold hover:underline"
                >
                  Chat us on WhatsApp →
                </a>
              </p>
            </div>

            {/* Skip link */}
            <div className="text-center pt-1">
              <Link
                href="/dashboard/student"
                className="text-[11px] text-slate-400 hover:text-slate-600 transition-colors"
              >
                I'll pay later — Go to my dashboard →
              </Link>
            </div>
          </div>
        )}

        {/* Back link */}
        <div className="text-center">
          <Link href="/" className="text-xs text-slate-500 hover:text-[#15803D] transition-colors font-semibold">
            ← Back to Academy Overview
          </Link>
        </div>

      </div>
    </div>
  );
}
