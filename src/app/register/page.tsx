"use client";

import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
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
  Building2,
  BookOpen,
} from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
          paymentPlan,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Registration failed");

      // Auto sign-in immediately after registration
      const loginRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (loginRes?.error) {
        // Fallback redirect to login
        router.push("/login");
      } else {
        router.push("/dashboard/student");
        router.refresh();
      }
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
            Register for <span className="text-[#15803D]">InstitutionOS</span>
          </h1>
          <p className="text-xs text-slate-500 font-semibold tracking-wide max-w-md mx-auto">
            DWSA Digital Technology Academy (DTA) · Academic Pillar of Digital World Systems Africa Ltd (RC 9718724)
          </p>
        </div>

        {/* Selected Programme Summary Banner */}
        <div className="p-4 rounded-2xl bg-[#F0FDF4] border border-[#15803D]/20 space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold text-[#15803D] uppercase tracking-wider flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Flagship Programme Enrolment
            </span>
            <span className="text-[10px] font-mono font-bold text-slate-500">Cohort GENAI-WP-001</span>
          </div>
          <h3 className="text-sm font-extrabold text-[#0F172A]">Generative AI for Work &amp; Productivity</h3>
          <p className="text-[11px] text-slate-600">8-Week Executive Live-Online Immersion · School of Generative Artificial Intelligence</p>
        </div>

        {/* Registration Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-7 shadow-sm space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Full Name</label>
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
              <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Email Address</label>
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
                <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Password</label>
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
                <label className="block text-xs font-bold text-[#0F172A] mb-1.5">Phone Number (Optional)</label>
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
              {loading ? "Registering & Preparing Workspace..." : "Create Account & Proceed to Workspace"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Already have an account */}
          <div className="pt-4 border-t border-slate-100 text-center space-y-2">
            <p className="text-xs text-slate-500">
              Already have an account?{" "}
              <Link href="/login" className="text-[#15803D] font-bold hover:underline">
                Sign In to Digital Campus
              </Link>
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="text-center">
          <Link href="/" className="text-xs text-slate-500 hover:text-[#15803D] transition-colors font-semibold">
            ← Back to Tech Academy Overview
          </Link>
        </div>
      </div>
    </div>
  );
}
