"use client";

import React, { useState } from "react";
import { X, Sparkles, CheckCircle2, Send, Loader2 } from "lucide-react";

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProgramme?: string;
}

export default function LeadCaptureModal({
  isOpen,
  onClose,
  defaultProgramme = "Generative AI for Work & Productivity",
}: LeadCaptureModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [programmeInterest, setProgrammeInterest] = useState(defaultProgramme);
  const [source, setSource] = useState("Direct Website");
  const [campaign, setCampaign] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          programmeInterest,
          source,
          campaign: campaign || undefined,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to submit lead");

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#030e1f] border border-[#d4a017]/30 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden">
        {/* Ambient Glow Effects */}
        <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#d4a017]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-[#00d2ff]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900/60 border border-slate-800 transition-all hover:scale-105"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {success ? (
          <div className="py-8 text-center space-y-4 animate-fadeInUp">
            <div className="w-14 h-14 bg-emerald-950/80 border border-emerald-500/50 rounded-2xl flex items-center justify-center mx-auto text-emerald-400 shadow-lg shadow-emerald-950/50">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-extrabold text-white">Application Pre-Registration Saved!</h3>
            <p className="text-xs text-[#8899b4] leading-relaxed max-w-sm mx-auto">
              Thank you, <strong className="text-white">{name}</strong>. You have been prioritized for enrolment in{" "}
              <strong className="text-[#d4a017]">{programmeInterest}</strong>. Our admissions office will contact you via email/WhatsApp as soon as formal enrolment opens.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2.5 bg-gradient-to-r from-[#d4a017] to-[#e5a910] hover:from-[#e5a910] hover:to-[#d4a017] text-[#030e1f] font-extrabold rounded-xl text-xs transition-all shadow-md shadow-[#d4a017]/20"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
            {/* Header */}
            <div className="space-y-1.5 border-b border-[#d4a017]/20 pb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017] rounded-full text-[10px] font-extrabold uppercase tracking-widest">
                <Sparkles className="w-3 h-3" />
                <span>DWSA Digital Technology Academy</span>
              </div>
              <h2 className="text-xl font-black text-white tracking-tight">
                Notify Me When <span className="text-[#d4a017]">Enrolment Opens</span>
              </h2>
              <p className="text-xs text-[#8899b4]">
                Be the first to secure early-bird priority access for the upcoming cohort.
              </p>
            </div>

            {error && (
              <div className="p-3 bg-rose-950/80 border border-rose-800/80 rounded-xl text-xs text-rose-300">
                {error}
              </div>
            )}

            {/* Inputs */}
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-extrabold text-[#8899b4] uppercase tracking-wider mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Adaeze Okonkwo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#061428] border border-[#d4a017]/30 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00d2ff]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-extrabold text-[#8899b4] uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="adaeze@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#061428] border border-[#d4a017]/30 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00d2ff]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-[#8899b4] uppercase tracking-wider mb-1">
                    Phone / WhatsApp
                  </label>
                  <input
                    type="tel"
                    placeholder="+234 800 000 0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#061428] border border-[#d4a017]/30 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00d2ff]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-[#8899b4] uppercase tracking-wider mb-1">
                  Programme of Interest
                </label>
                <select
                  value={programmeInterest}
                  onChange={(e) => setProgrammeInterest(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#061428] border border-[#d4a017]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#00d2ff]"
                >
                  <option value="Generative AI for Work & Productivity">Generative AI for Work & Productivity (Flagship)</option>
                  <option value="AI Foundations">AI Foundations</option>
                  <option value="Prompt Engineering">Prompt Engineering</option>
                  <option value="AI for Business">AI for Business</option>
                  <option value="AI for Creators">AI for Creators</option>
                  <option value="AI for Educators & Researchers">AI for Educators & Researchers</option>
                  <option value="AI Development & Coding">AI Development & Coding</option>
                  <option value="AI Innovation">AI Innovation</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-extrabold text-[#8899b4] uppercase tracking-wider mb-1">
                    How did you hear about DWSA?
                  </label>
                  <select
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#061428] border border-[#d4a017]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#00d2ff]"
                  >
                    <option value="Direct Website">Direct Website</option>
                    <option value="Facebook">Facebook</option>
                    <option value="Instagram">Instagram</option>
                    <option value="X">X (Twitter)</option>
                    <option value="TikTok">TikTok</option>
                    <option value="YouTube">YouTube</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Referral">Referral / Recommendation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-[#8899b4] uppercase tracking-wider mb-1">
                    Campaign Code (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. GENAI-SEPT-2026"
                    value={campaign}
                    onChange={(e) => setCampaign(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#061428] border border-[#d4a017]/30 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#00d2ff]"
                  />
                </div>
              </div>
            </div>

            {/* Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-[#d4a017] to-[#e5a910] hover:from-[#e5a910] hover:to-[#d4a017] text-[#030e1f] font-black text-xs uppercase tracking-wider rounded-xl transition-all shadow-lg shadow-[#d4a017]/25 flex items-center justify-center gap-2 hover:scale-[1.01]"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Saving Priority Interest...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Get Early Priority Notification</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
