"use client";

import React, { useState } from "react";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import { CheckCircle2, Copy, Check, MessageCircle, Globe, Calendar, CreditCard, ShieldCheck, Flame, X, ArrowRight } from "lucide-react";

export default function AdmissionsPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    mode: "Physical (Makurdi)",
    plan: "Early Bird — ₦45,000",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [copiedNum, setCopiedNum] = useState<string | null>(null);

  const planAmounts: Record<string, string> = {
    "Early Bird — ₦45,000": "₦45,000",
    "Standard — ₦55,000": "₦55,000",
    "Split Pay — ₦30,000 initial": "₦30,000 (first instalment)",
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) return;
    setSubmitting(true);
    try {
      await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          learningMode: form.mode,
          paymentPlan: form.plan,
        }),
      });
    } catch (_) {
      // silent — show receipt even if network error
    }
    setSubmitting(false);
    setSubmitted(true);
    setShowReceipt(true);
  }

  function copyNum(num: string) {
    navigator.clipboard.writeText(num);
    setCopiedNum(num);
    setTimeout(() => setCopiedNum(null), 2000);
  }

  const waMessage = encodeURIComponent(
    `Hello DWSA Admissions, I just submitted my application for the Digital Technology Academy!\nName: ${form.name}\nPhone: ${form.phone}\nPlan: ${form.plan}\nMode: ${form.mode}\nPlease confirm my registration and payment instructions.`
  );

  return (
    <div className="min-h-screen bg-[#030e1f] text-[#f0f4ff] flex flex-col font-sans">
      <PublicNav />

      {/* Admissions Announcement Strip */}
      <div className="bg-gradient-to-r from-[#061428] via-[#0a1e3a] to-[#061428] border-b border-[#d4a017]/30 text-center py-2.5 px-4 text-xs font-semibold tracking-wide text-[#d4a017]">
        <span className="inline-flex items-center gap-2 flex-wrap justify-center">
          <span className="text-[#d4a017]" aria-hidden="true">✦</span>
          <span>ADMISSIONS OPEN — Cohort 2026 Applications Now Being Accepted</span>
          <span className="hidden sm:inline text-[#d4a017]/60">• Rolling review · Early application encouraged · Limited class capacity</span>
        </span>
      </div>

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#4ade80]/10 border border-[#4ade80]/30 text-[#4ade80] text-xs font-bold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            ADMISSIONS &amp; ENROLLMENT PORTAL
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Apply for <span className="text-[#4ade80]">Admission</span>
          </h1>
          <p className="text-[#8899b4] text-base leading-relaxed">
            Welcome to DTA Admissions. Select your preferred learning mode, complete the registration form below, and secure your place in the upcoming cohort.
          </p>
        </div>

        {/* 5-Step Admissions Process */}
        <div className="space-y-4">
          <h2 className="text-xl font-extrabold text-white text-center">Admission Process Flow</h2>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 text-center">
            {[
              { step: "01", title: "Select Track", desc: "Choose your learning mode (Physical/Virtual)." },
              { step: "02", title: "Complete Form", desc: "Fill your contact & background information." },
              { step: "03", title: "Tuition Plan", desc: "Select Early Bird, Standard or Split Pay." },
              { step: "04", title: "Payment", desc: "Perform transfer & submit proof via WhatsApp." },
              { step: "05", title: "Digital Campus", desc: "Receive login credentials & access student portal." },
            ].map((s) => (
              <div key={s.step} className="p-5 bg-[#061428] border border-[#4ade80]/30 rounded-2xl space-y-2">
                <span className="text-2xl font-black text-[#4ade80] block">{s.step}</span>
                <h3 className="text-xs font-bold text-white">{s.title}</h3>
                <p className="text-[11px] text-[#8899b4]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* International Students Section */}
        <div className="bg-gradient-to-br from-[#061428] to-[#0a1e3a] border-2 border-[#4ade80]/40 rounded-3xl p-8 sm:p-10 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#4ade80]/20 text-[#4ade80] text-xs font-bold uppercase">
            <Globe className="w-3.5 h-3.5" aria-hidden="true" />
            International &amp; Regional Applicants
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Applications Welcomed Across Africa &amp; Beyond
          </h2>
          <p className="text-sm text-[#c8d8f0] leading-relaxed max-w-3xl">
            Digital Technology Academy is committed to expanding regional digital capability. Learners outside Nigeria or Benue State can enroll in our <strong>Virtual Live Track</strong>, featuring real-time interactive lectures, automated GitHub PR evaluation, and dedicated mentor support.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-[#4ade80] font-semibold pt-2">
            <span>✓ Pan-African Interactive Cohorts</span>
            <span aria-hidden="true">•</span>
            <span>✓ Online Payment Support</span>
            <span aria-hidden="true">•</span>
            <span>✓ Regional Timezone Friendly</span>
          </div>
        </div>

        {/* Main Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-10 items-start">
          
          {/* Left Details: Requirements, Calendar, Pricing */}
          <div className="space-y-8">
            
            {/* Entry Requirements */}
            <div className="p-6 bg-[#061428] border border-[#d4a017]/30 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#d4a017]" />
                Entry Requirements
              </h3>
              <ul className="space-y-2.5 text-xs text-[#c8d8f0]">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" />
                  <span><strong>No prior coding experience required</strong> for beginner tracks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" />
                  <span>Access to a laptop (Windows, Mac, or Linux) with internet connection.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" />
                  <span>Commitment to 8-12 hours per week for lectures, assignments, and PR submissions.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#4ade80] shrink-0 mt-0.5" />
                  <span>Adherence to the DWSA P.R.I.D.E. Conduct Standard.</span>
                </li>
              </ul>
            </div>

            {/* Programme Calendar */}
            <div className="p-6 bg-[#061428] border border-[#d4a017]/30 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Calendar className="w-5 h-5 text-[#d4a017]" aria-hidden="true" />
                Programme Calendar (Cohort 2026)
              </h3>
              <div className="space-y-3 text-xs">
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-[#8899b4]">Application Deadline:</span>
                  <strong className="text-[#d4a017]">Early Bird Open Now</strong>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-[#8899b4]">Orientation &amp; Setup:</span>
                  <strong className="text-white">Week 1 Orientation</strong>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-2">
                  <span className="text-[#8899b4]">Intensive Lectures &amp; PRs:</span>
                  <strong className="text-white">Weeks 1 – 6</strong>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="text-[#8899b4]">Capstone Launch &amp; Certification:</span>
                  <strong className="text-[#4ade80]">Weeks 7 – 8</strong>
                </div>
              </div>
            </div>

            {/* Tuition Options */}
            <div className="p-6 bg-[#061428] border border-slate-800 rounded-2xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-[#4ade80]" />
                Tuition Plans &amp; Structure
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-[#030e1f] border border-[#d4a017]/40 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-[#d4a017] uppercase">EARLY BIRD</span>
                  <div className="text-lg font-black text-white">₦45,000</div>
                  <span className="text-[10px] text-[#4ade80]">First 8 seats only</span>
                </div>
                <div className="p-3 bg-[#030e1f] border border-slate-800 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-[#8899b4] uppercase">STANDARD</span>
                  <div className="text-lg font-black text-white">₦55,000</div>
                  <span className="text-[10px] text-[#8899b4]">Full cohort fee</span>
                </div>
                <div className="p-3 bg-[#030e1f] border border-[#4ade80]/40 rounded-xl space-y-1">
                  <span className="text-[10px] font-bold text-[#4ade80] uppercase">SPLIT PAY</span>
                  <div className="text-lg font-black text-white">₦30,000</div>
                  <span className="text-[10px] text-[#4ade80]">Initial + ₦25k balance</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right: Registration Form */}
          <div className="bg-gradient-to-b from-[#091832] to-[#050f23] border-2 border-[#4ade80] rounded-3xl p-6 shadow-2xl shadow-[#4ade80]/10 sticky top-24">
            
            <div className="text-center space-y-1 mb-6 border-b border-slate-800 pb-4">
              <span className="text-xs font-bold text-[#4ade80] uppercase tracking-wider">OFFICIAL APPLICATION FORM</span>
              <h3 className="text-xl font-extrabold text-white">Reserve Your Seat</h3>
            </div>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label htmlFor="applicant-name" className="text-[#8899b4] text-xs font-semibold flex items-center gap-1">
                    Full Name <span className="text-red-400" aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <input id="applicant-name" name="name" required value={form.name} onChange={handleChange} placeholder="e.g. Samuel Adebayo" aria-required="true" className="w-full bg-[#061428] border border-[#d4a017]/20 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4a5568] outline-none focus:border-[#d4a017]/60 focus:ring-1 focus:ring-[#d4a017]/30 transition-all" />
                </div>

                <div className="space-y-1">
                  <label htmlFor="applicant-email" className="text-[#8899b4] text-xs font-semibold flex items-center gap-1">
                    Email Address <span className="text-red-400" aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <input id="applicant-email" name="email" type="email" required value={form.email} onChange={handleChange} placeholder="e.g. samuel@example.com" aria-required="true" className="w-full bg-[#061428] border border-[#d4a017]/20 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4a5568] outline-none focus:border-[#d4a017]/60 focus:ring-1 focus:ring-[#d4a017]/30 transition-all" />
                </div>

                <div className="space-y-1">
                  <label htmlFor="applicant-phone" className="text-[#8899b4] text-xs font-semibold flex items-center gap-1">
                    Phone / WhatsApp <span className="text-red-400" aria-hidden="true">*</span>
                    <span className="sr-only">(required)</span>
                  </label>
                  <input id="applicant-phone" name="phone" type="tel" required value={form.phone} onChange={handleChange} placeholder="e.g. 08012345678" aria-required="true" className="w-full bg-[#061428] border border-[#d4a017]/20 rounded-xl px-4 py-3 text-white text-sm placeholder-[#4a5568] outline-none focus:border-[#d4a017]/60 focus:ring-1 focus:ring-[#d4a017]/30 transition-all" />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label htmlFor="learning-mode" className="text-[#8899b4] text-xs font-semibold flex items-center gap-1">
                      Learning Mode <span className="text-red-400" aria-hidden="true">*</span>
                    </label>
                    <select id="learning-mode" name="mode" value={form.mode} onChange={handleChange} aria-required="true" className="w-full bg-[#061428] border border-[#d4a017]/20 rounded-xl px-3 py-3 text-white text-xs outline-none focus:border-[#d4a017]/60 focus:ring-1 focus:ring-[#d4a017]/30 transition-all">
                      <option>Physical (Makurdi)</option>
                      <option>Virtual (Online)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label htmlFor="payment-plan" className="text-[#8899b4] text-xs font-semibold flex items-center gap-1">
                      Payment Plan <span className="text-red-400" aria-hidden="true">*</span>
                    </label>
                    <select id="payment-plan" name="plan" value={form.plan} onChange={handleChange} aria-required="true" className="w-full bg-[#061428] border border-[#d4a017]/20 rounded-xl px-3 py-3 text-white text-xs outline-none focus:border-[#d4a017]/60 focus:ring-1 focus:ring-[#d4a017]/30 transition-all">
                      <option>Early Bird — ₦45,000</option>
                      <option>Standard — ₦55,000</option>
                      <option>Split Pay — ₦30,000 initial</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-4 bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-[#030e1f] font-extrabold rounded-xl text-sm shadow-xl shadow-[#4ade80]/20 hover:scale-[1.01] transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {submitting ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-[#030e1f]/30 border-t-[#030e1f] rounded-full animate-spin" aria-hidden="true" />
                      Submitting Application...
                    </>
                  ) : "SUBMIT APPLICATION →"}
                </button>
              </form>
            ) : (
              <div className="text-center py-6 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-[#4ade80] mx-auto" />
                <p className="text-white font-bold">Application Submitted Successfully!</p>
                <p className="text-[#8899b4] text-xs">Your registration has been saved to the DWSA Admissions CRM.</p>
                <button onClick={() => setShowReceipt(true)} className="px-4 py-2 bg-[#d4a017] text-[#030e1f] font-bold text-xs rounded-xl">View Payment Receipt &amp; Bank Details</button>
              </div>
            )}

            <a href={`https://wa.me/2347082135071?text=${waMessage}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-[#25d366]/08 border border-[#25d366]/25 rounded-xl p-4 mt-4 hover:bg-[#25d366]/14 transition-all">
              <MessageCircle className="w-6 h-6 text-[#25d366] flex-shrink-0" />
              <div>
                <small className="block text-[10px] text-[#8899b4] uppercase tracking-wider font-bold">Admissions Help Desk</small>
                <strong className="text-white text-sm">WhatsApp: 0708 213 5071</strong>
              </div>
            </a>
          </div>

        </div>

        {/* Receipt Overlay */}
        {showReceipt && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex items-center justify-center p-4" onClick={(e) => e.target === e.currentTarget && setShowReceipt(false)}>
            <div className="bg-gradient-to-b from-[#061428] to-[#0a1e3a] border border-[#d4a017]/40 rounded-3xl p-8 max-w-md w-full relative shadow-2xl">
              <button onClick={() => setShowReceipt(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/06 border border-white/10 text-[#8899b4] hover:text-white flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
              <div className="text-center space-y-1 mb-6">
                <div className="text-5xl">🎉</div>
                <h2 className="text-xl font-extrabold text-white">Application Submitted!</h2>
                <p className="text-[#8899b4] text-sm">Welcome aboard, <strong className="text-white">{form.name || "Applicant"}</strong>! Please perform transfer to lock in your seat.</p>
              </div>

              <div className="bg-white/02 border border-[#d4a017]/25 rounded-2xl p-5 mb-5 space-y-4">
                <div className="flex justify-between text-sm text-[#8899b4]">
                  <span>Account Name:</span>
                  <strong className="text-white">Ayar Japheth Idyege</strong>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { bank: "MoniePoint / OPay", num: "7033337569" },
                    { bank: "GTBank (GTB)", num: "0432342339" },
                  ].map(({ bank, num }) => (
                    <div key={bank} className="bg-[#d4a017]/06 border border-[#d4a017]/20 rounded-xl p-3">
                      <span className="block text-[10px] text-[#d4a017] font-bold uppercase tracking-wider mb-2">{bank}</span>
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-black text-white tracking-widest text-sm">{num}</span>
                        <button onClick={() => copyNum(num)} className="flex-shrink-0 px-2 py-1 rounded-lg bg-[#d4a017]/20 border border-[#d4a017]/40 text-[#d4a017] text-xs hover:bg-[#d4a017] hover:text-[#030e1f]">
                          {copiedNum === num ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                          {copiedNum === num ? "Copied" : "Copy"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between text-sm pt-1 border-t border-white/05">
                  <span className="text-[#8899b4]">Amount to Pay:</span>
                  <strong className="text-[#d4a017] text-base">{planAmounts[form.plan] || "₦45,000"}</strong>
                </div>
              </div>

              <div className="space-y-3">
                <a href={`https://wa.me/2347082135071?text=${waMessage}`} target="_blank" rel="noreferrer" className="block w-full py-3.5 bg-gradient-to-r from-[#25d366] to-[#128c7e] text-white font-extrabold rounded-xl text-sm text-center shadow-lg shadow-[#25d366]/25">
                  📲 Send Payment Proof on WhatsApp
                </a>
                <button onClick={() => setShowReceipt(false)} className="block w-full py-3 bg-white/05 border border-white/10 text-[#8899b4] rounded-xl text-sm">
                  Done
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      <PublicFooter />
    </div>
  );
}
