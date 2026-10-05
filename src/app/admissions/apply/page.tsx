"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
  Send,
  Loader2,
  FileCheck2,
  User,
  Globe,
  Briefcase,
  HelpCircle,
  CreditCard,
  MessageCircle,
} from "lucide-react";

export default function AdmissionsApplyPage() {
  const { data: session, status: authStatus } = useSession();

  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [stateLoc, setStateLoc] = useState("");
  const [professionalBackground, setProfessionalBackground] = useState("");
  const [experienceLevel, setExperienceLevel] = useState<"BEGINNER" | "INTERMEDIATE" | "ADVANCED">("BEGINNER");
  const [preferredFormat, setPreferredFormat] = useState<"SELF_PACED" | "INSTRUCTOR_LED" | "HYBRID">("HYBRID");
  const [backgroundNotes, setBackgroundNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [fetchingApp, setFetchingApp] = useState(true);
  const [existingApplications, setExistingApplications] = useState<any[]>([]);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

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

  // Fetch candidate's existing application status if authenticated
  useEffect(() => {
    if (session?.user) {
      fetchExistingApp();
    } else {
      setFetchingApp(false);
    }
  }, [session]);

  const fetchExistingApp = async () => {
    try {
      const res = await fetch("/api/admissions/apply");
      if (res.ok) {
        const data = await res.json();
        if (data.applications) setExistingApplications(data.applications);
        if (data.user) {
          if (data.user.phone) setPhone(data.user.phone);
          if (data.user.country) setCountry(data.user.country);
          if (data.user.state) setStateLoc(data.user.state);
          if (data.user.professionalBackground) setProfessionalBackground(data.user.professionalBackground);
          if (data.user.experienceLevel) setExperienceLevel(data.user.experienceLevel);
          if (data.user.preferredFormat) setPreferredFormat(data.user.preferredFormat);
        }
      }
    } catch (err) {
      console.error("Failed to load existing application", err);
    } finally {
      setFetchingApp(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const res = await fetch("/api/admissions/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          programmeTitle: "Generative AI for Work & Productivity",
          phone,
          country,
          state: stateLoc,
          professionalBackground,
          experienceLevel,
          preferredFormat,
          backgroundNotes,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to submit application");

      setMessage({
        type: "success",
        text: "Your admissions application for DWSA Digital Technology Academy has been submitted successfully!",
      });
      fetchExistingApp();
    } catch (err: any) {
      setMessage({ type: "error", text: err.message });
    } finally {
      setLoading(false);
    }
  };

  const statusBadges: Record<string, { bg: string; text: string; border: string; label: string }> = {
    SUBMITTED: {
      bg: "bg-blue-950/80",
      text: "text-blue-300",
      border: "border-blue-500/50",
      label: "Application Submitted — Awaiting Review",
    },
    UNDER_REVIEW: {
      bg: "bg-[#FEFCE8]",
      text: "text-[#D4A017]",
      border: "border-[#D4A017]/40",
      label: "Under Review by DTA Admissions Office",
    },
    APPROVED: {
      bg: "bg-emerald-950/80",
      text: "text-emerald-300",
      border: "border-emerald-500/50",
      label: "Application Approved — Eligible for Programme Selection",
    },
    REJECTED: {
      bg: "bg-rose-950/80",
      text: "text-rose-300",
      border: "border-rose-500/50",
      label: "Application Decision Issued",
    },
    WITHDRAWN: {
      bg: "bg-slate-800",
      text: "text-slate-400",
      border: "border-slate-700",
      label: "Application Withdrawn",
    },
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans">
      <PublicNav />

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Banner Header */}
        <div className="bg-[#030e1f] text-white border border-[#D4A017]/30 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#D4A017]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4A017]/20 border border-[#D4A017]/50 text-[#D4A017] rounded-full text-[10px] font-extrabold uppercase tracking-widest">
              <GraduationCap className="w-3.5 h-3.5" />
              DWSA Digital Technology Academy — Cohort 2
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              Don&apos;t just use AI. <span className="text-[#D4A017]">Learn to build with it.</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
              A practical, project-driven Generative AI programme taking you from Beginner to AI Builder.
            </p>
            <div className="flex flex-wrap gap-4 pt-1 text-[10px] text-slate-300">
              <span className="flex items-center gap-1.5"><Clock className="w-3 h-3 text-[#D4A017]" /> Start: <strong className="text-white">Monday, 2 November 2026</strong></span>
              <span className="flex items-center gap-1.5"><Globe className="w-3 h-3 text-[#00d2ff]" /> Venue: <strong className="text-white">No 20 Okpoga Street, High Level, Makurdi, Benue State</strong></span>
            </div>
          </div>
        </div>

        {/* Unauthenticated → redirect to /register */}
        {authStatus === "unauthenticated" && (
          <div className="p-8 bg-white border border-slate-200 rounded-3xl text-center space-y-5 shadow-sm">
            <div className="w-12 h-12 bg-[#F0FDF4] border border-[#15803D]/30 rounded-2xl flex items-center justify-center mx-auto text-[#15803D]">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-extrabold text-[#0F172A]">Secure Your Seat — Cohort 2 is Coming</h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Create your free account, then complete your tuition payment via Paystack to unlock your digital campus workspace instantly.
                Ready to move from AI user to AI builder?
                {config.earlyBirdActive ? (
                  <span className="block mt-1 font-semibold text-[#15803D]">
                    🎉 Early Bird: ₦{config.earlyBirdPrice.toLocaleString()} (first {config.earlyBirdSeats} students) · Standard: ₦{config.standardPrice.toLocaleString()}
                  </span>
                ) : (
                  <span className="block mt-1 font-semibold text-[#15803D]">
                    Tuition: ₦{config.standardPrice.toLocaleString()}
                  </span>
                )}
              </p>
            </div>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white font-extrabold text-xs transition-all shadow-md"
            >
              <CreditCard className="w-4 h-4" />
              Register &amp; Pay via Paystack →
            </Link>
            <p className="text-[11px] text-slate-400">
              Already registered?{" "}
              <Link href="/login" className="text-[#15803D] font-bold hover:underline">
                Sign in to your dashboard
              </Link>
            </p>
          </div>
        )}


        {/* Loading Spinner */}
        {authStatus === "authenticated" && fetchingApp && (
          <div className="py-16 text-center text-slate-500 text-xs flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-[#15803D] animate-spin" />
            <span>Loading your admissions status...</span>
          </div>
        )}

        {/* Existing Applications Status Board */}
        {authStatus === "authenticated" && !fetchingApp && existingApplications.length > 0 && (
          <div className="p-6 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-sm">
            <h3 className="text-base font-extrabold text-[#0F172A] flex items-center gap-2 border-b border-slate-100 pb-3">
              <FileCheck2 className="w-5 h-5 text-[#15803D]" />
              My Active Admissions Applications
            </h3>

            <div className="space-y-3">
              {existingApplications.map((app) => {
                const b = statusBadges[app.status] || statusBadges.SUBMITTED;
                return (
                  <div
                    key={app.id}
                    className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div>
                      <span className="text-[10px] font-black tracking-widest text-slate-400 uppercase block">
                        {app.programme?.school || "School of Generative AI"}
                      </span>
                      <h4 className="text-sm font-extrabold text-[#0F172A]">
                        {app.programme?.title || "Generative AI for Work & Productivity"}
                      </h4>
                      <span className="text-[10px] text-slate-500">
                        Submitted: {new Date(app.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`px-3 py-1.5 rounded-xl border text-[10px] font-extrabold uppercase tracking-wider ${b.bg} ${b.text} ${b.border}`}
                      >
                        {b.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Application Form */}
        {authStatus === "authenticated" && !fetchingApp && (
          <div className="space-y-6">

            {/* ── PROGRAMME INFO CARD ── */}
            <div className="p-5 rounded-3xl bg-[#030e1f] border border-[#D4A017]/30 text-white space-y-4 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#D4A017]/20 border border-[#D4A017]/40 text-[#D4A017] text-[10px] font-black uppercase tracking-wider">
                    DWSA Digital Technology Academy — Cohort 2
                  </span>
                  <h3 className="text-base font-black text-white mt-2">
                    Don&apos;t just use AI. <span className="text-[#D4A017]">Learn to build with it.</span>
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    A practical, project-driven Generative AI programme taking you from Beginner to AI Builder.
                  </p>
                </div>
                <div className="shrink-0 text-right text-[10px] text-slate-400 space-y-1">
                  <div><Clock className="w-3 h-3 inline mr-1 text-[#D4A017]" /><strong className="text-white">Mon, 2 Nov 2026</strong></div>
                  <div><Globe className="w-3 h-3 inline mr-1 text-[#00d2ff]" /><strong className="text-white">Makurdi, Benue State</strong></div>
                </div>
              </div>

              {/* Curriculum tracks */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { color: "text-[#D4A017]", icon: "💡", title: "Foundations", items: ["GenAI Fundamentals", "Prompt Engineering", "AI for Business"] },
                  { color: "text-[#00d2ff]", icon: "🎨", title: "Creative AI", items: ["AI Image Generation", "AI Audio & Voice", "AI Video Generation"] },
                  { color: "text-[#4ade80]", icon: "</>", title: "AI Development", items: ["AI-Powered Apps", "APIs & LLM Integration", "AI Automation"] },
                  { color: "text-amber-400", icon: "🤖", title: "Advanced AI", items: ["AI Agents & Systems", "Fine-Tuning", "Production AI & Security"] },
                ].map((track) => (
                  <div key={track.title} className="p-2.5 bg-white/5 border border-white/10 rounded-xl space-y-1.5">
                    <span className={`text-[9px] font-black uppercase block ${track.color}`}>{track.icon} {track.title}</span>
                    <ul className="text-[9px] text-slate-300 space-y-0.5">
                      {track.items.map(i => <li key={i}>• {i}</li>)}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Promise */}
              <div className="flex flex-wrap items-center justify-center gap-2 text-[9px] font-black text-white pt-1">
                <span className="px-2.5 py-1 bg-[#15803D] rounded-full">LEARN</span>
                <span className="text-slate-400">→</span>
                <span className="px-2.5 py-1 bg-[#D4A017] text-[#030e1f] rounded-full">BUILD</span>
                <span className="text-slate-400">→</span>
                <span className="px-2.5 py-1 bg-[#00d2ff] text-[#030e1f] rounded-full">AUTOMATE</span>
                <span className="text-slate-400">→</span>
                <span className="px-2.5 py-1 bg-amber-500 text-[#030e1f] rounded-full">DEPLOY</span>
              </div>
            </div>

            {/* ── PAYSTACK PAYMENT CTA ── */}
            <div className="p-6 rounded-3xl bg-[#030e1f] border border-[#15803D]/40 text-white space-y-4 shadow-xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-[#15803D]/20 border border-[#15803D]/40 text-[#4ade80] text-[10px] font-black uppercase tracking-wider">
                  Step 2 — Payment Required
                </span>
              </div>
              <div>
                <h3 className="text-base font-black text-white">Secure Your Seat — Pay Tuition Now</h3>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  {config.earlyBirdActive ? (
                    <>
                      <span className="text-sm text-slate-400 line-through">₦{config.standardPrice.toLocaleString()}</span>
                      <span className="px-2 py-0.5 rounded-full bg-[#15803D]/30 border border-[#4ade80]/40 text-[#4ade80] text-[10px] font-black">
                        🎉 Early Bird: ₦{config.earlyBirdPrice.toLocaleString()} — First {config.earlyBirdSeats} Students
                      </span>
                    </>
                  ) : (
                    <span className="text-sm font-black text-white">
                      Tuition: ₦{config.standardPrice.toLocaleString()}
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  Payment activates your Cohort 2 enrolment and unlocks your full digital campus workspace immediately. Start: <strong className="text-white">Monday, 2 November 2026</strong>.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={config.paystackCheckoutUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white font-black text-xs flex items-center justify-center gap-2 transition-all shadow-md"
                >
                  <CreditCard className="w-4 h-4" />
                  {config.earlyBirdActive
                    ? `Pay Early Bird ₦${config.earlyBirdPrice.toLocaleString()} via Paystack →`
                    : `Pay ₦${config.standardPrice.toLocaleString()} via Paystack →`}
                </a>
                <a
                  href="https://wa.me/2347082135071"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  Questions? WhatsApp Us
                </a>
              </div>
              <p className="text-[10px] text-slate-400 text-center">
                Secure payment via Paystack · Card, Bank Transfer &amp; USSD accepted
              </p>
            </div>


          <form onSubmit={handleSubmit} className="p-6 sm:p-8 bg-white border border-slate-200 rounded-3xl space-y-6 shadow-sm">
            <div className="border-b border-slate-100 pb-4 space-y-1">
              <h2 className="text-lg font-extrabold text-[#0F172A]">
                Optional: Candidate Profile Form
              </h2>
              <p className="text-xs text-slate-500">
                Help us tailor your learning experience. This step is optional — payment above is what activates your enrolment.
              </p>
              <p className="text-[11px] text-slate-400">
                Logged in as: <strong className="text-[#0F172A]">{session.user.name || session.user.email}</strong> ({session.user.email})
              </p>
            </div>

            {message && (
              <div
                className={`p-4 rounded-2xl border text-xs font-semibold flex items-center gap-3 ${
                  message.type === "success"
                    ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-300"
                    : "bg-rose-950/80 border-rose-800/80 text-rose-300"
                }`}
              >
                {message.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <span>{message.text}</span>
              </div>
            )}

            {/* Target Programme — Cohort 2 */}
            <div className="p-4 bg-[#FEFCE8] border border-[#D4A017]/30 rounded-2xl space-y-1">
              <span className="text-[10px] font-extrabold text-[#D4A017] uppercase tracking-wider block">
                Target Programme — Cohort 2
              </span>
              <h3 className="text-sm font-extrabold text-[#0F172A]">
                DWSA Digital Technology Academy — Practical Generative AI Programme
              </h3>
              <p className="text-[11px] text-slate-600">
                From Foundations &amp; Creative AI → AI Development → Advanced AI &amp; Agentic Systems
              </p>
              <p className="text-[11px] text-slate-500 flex flex-wrap gap-3 pt-1">
                <span>📅 <strong>Start:</strong> Monday, 2 November 2026</span>
                <span>📍 <strong>Venue:</strong> No 20 Okpoga Street, High Level, Makurdi, Benue State</span>
              </p>
            </div>

            {/* Fields */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                    Phone / WhatsApp Number *
                  </label>
                  <input
                    type="tel"

                    required
                    placeholder="+234 800 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#15803D]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                    Country of Residence *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Nigeria, Ghana, Kenya"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#15803D]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                  State / Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Lagos State"
                  value={stateLoc}
                  onChange={(e) => setStateLoc(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#15803D]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                  Professional / Educational Background *
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Summarize your current work role, industry background, or educational degree..."
                  value={professionalBackground}
                  onChange={(e) => setProfessionalBackground(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#15803D]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                    AI &amp; Tech Experience Level
                  </label>
                  <select
                    value={experienceLevel}
                    onChange={(e: any) => setExperienceLevel(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#15803D]"
                  >
                    <option value="BEGINNER">Beginner (No prior coding / AI experience)</option>
                    <option value="INTERMEDIATE">Intermediate (Familiar with ChatGPT / basic tools)</option>
                    <option value="ADVANCED">Advanced (Developer / Data / Tech Professional)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                    Preferred Learning Format
                  </label>
                  <select
                    value={preferredFormat}
                    onChange={(e: any) => setPreferredFormat(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#15803D]"
                  >
                    <option value="HYBRID">Hybrid (Live Online Masterclasses + Self-Paced Labs)</option>
                    <option value="INSTRUCTOR_LED">100% Instructor-Led Live Masterclasses</option>
                    <option value="SELF_PACED">Self-Paced Guided Modules</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                  Additional Background Notes / Expectations
                </label>
                <input
                  type="text"
                  placeholder="Specific workplace AI tools or goals you wish to accomplish..."
                  value={backgroundNotes}
                  onChange={(e) => setBackgroundNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A] focus:outline-none focus:border-[#15803D]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-[#15803D] hover:bg-[#166534] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit DTA Admissions Application</span>
                  </>
                )}
              </button>
            </div>
          </form>
          </div>
        )}
      </main>

      <PublicFooter />
    </div>
  );
}
