"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import {
  GraduationCap,
  Sparkles,
  CheckCircle2,
  Clock,
  ArrowRight,
  BookOpen,
  Building2,
  Calendar,
  Users,
  ShieldCheck,
  Play,
  Lock,
  Loader2,
  Send,
} from "lucide-react";

export default function ProgrammeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const [programme, setProgramme] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [leadModalOpen, setLeadModalOpen] = useState(false);

  useEffect(() => {
    fetchProgramme();
  }, [resolvedParams.slug]);

  const fetchProgramme = async () => {
    try {
      const res = await fetch(`/api/programmes/${resolvedParams.slug}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error("Programme not found or is currently an unpublished draft.");
        throw new Error("Failed to load programme details");
      }
      const data = await res.json();
      setProgramme(data.programme);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] flex flex-col font-sans">
      <PublicNav />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 space-y-10">
        {loading && (
          <div className="py-24 text-center text-slate-500 text-xs flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-[#15803D] animate-spin" />
            <span>Loading Programme Syllabus...</span>
          </div>
        )}

        {error && (
          <div className="p-8 bg-[#030e1f] text-white border border-[#D4A017]/30 rounded-3xl text-center space-y-4 max-w-lg mx-auto my-12 shadow-xl">
            <div className="w-12 h-12 bg-amber-950/80 border border-amber-500/50 rounded-2xl flex items-center justify-center mx-auto text-[#D4A017]">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-extrabold text-white">Programme Unavailable</h2>
            <p className="text-xs text-slate-300 leading-relaxed">{error}</p>
            <div className="pt-2">
              <Link
                href="/programmes"
                className="px-6 py-2.5 bg-[#15803D] hover:bg-[#166534] text-white text-xs font-bold rounded-xl transition-all inline-block"
              >
                Return to Programme Catalogue
              </Link>
            </div>
          </div>
        )}

        {!loading && !error && programme && (
          <>
            {/* Header Hero Banner */}
            <div className="bg-[#030e1f] text-white border border-[#D4A017]/30 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-2xl space-y-6">
              <div className="absolute -top-24 -right-24 w-60 h-60 bg-[#D4A017]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#D4A017]/20 border border-[#D4A017]/50 text-[#D4A017] rounded-full text-[10px] font-extrabold uppercase tracking-widest">
                  <Sparkles className="w-3.5 h-3.5" />
                  {programme.school}
                </div>

                <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
                  {programme.title}
                </h1>

                <p className="text-xs sm:text-base text-slate-300 max-w-3xl leading-relaxed">
                  {programme.description}
                </p>

                {/* Key Metrics Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10">
                  <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
                    <span className="text-[10px] font-bold text-[#D4A017] uppercase block">Duration</span>
                    <span className="text-xs font-bold text-white block">{programme.durationWeeks} Weeks</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
                    <span className="text-[10px] font-bold text-[#00d2ff] uppercase block">Delivery Mode</span>
                    <span className="text-xs font-bold text-white block">{programme.deliveryMode}</span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
                    <span className="text-[10px] font-bold text-[#4ade80] uppercase block">Tuition Price</span>
                    <span className="text-xs font-bold text-white block">
                      ₦{Number(programme.price).toLocaleString()}
                    </span>
                  </div>
                  <div className="p-3 bg-white/5 border border-white/10 rounded-2xl">
                    <span className="text-[10px] font-bold text-amber-300 uppercase block">Early Bird</span>
                    <span className="text-xs font-bold text-white block">
                      {programme.earlyBirdPrice ? `₦${Number(programme.earlyBirdPrice).toLocaleString()}` : "N/A"}
                    </span>
                  </div>
                </div>

                {/* CTA Action Row */}
                <div className="flex flex-wrap items-center gap-3 pt-4">
                  <Link
                    href="/admissions/apply"
                    className="px-6 py-3 bg-[#15803D] hover:bg-[#166534] text-white font-black text-xs rounded-xl transition-all shadow-md flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    Register on InstitutionOS
                  </Link>

                  <button
                    onClick={() => setLeadModalOpen(true)}
                    className="px-6 py-3 bg-[#FEFCE8] border border-[#D4A017]/40 text-[#D4A017] hover:bg-amber-100 font-extrabold text-xs rounded-xl transition-all flex items-center gap-2"
                  >
                    <Send className="w-4 h-4 text-[#D4A017]" />
                    Notify Me When Enrolment Opens
                  </button>
                </div>
              </div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column: Objectives & Syllabus */}
              <div className="lg:col-span-2 space-y-8">
                {/* Learning Objectives */}
                {programme.objectives && programme.objectives.length > 0 && (
                  <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-sm">
                    <h3 className="text-base font-extrabold text-[#0F172A] flex items-center gap-2 border-b border-slate-100 pb-3">
                      <CheckCircle2 className="w-5 h-5 text-[#15803D]" />
                      Programme Learning Objectives &amp; Workplace Outcomes
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {programme.objectives.map((obj: string, idx: number) => (
                        <div key={idx} className="p-3 bg-[#F8FAFC] border border-slate-200 rounded-2xl flex items-start gap-2.5">
                          <span className="px-2 py-0.5 bg-[#15803D] text-white font-extrabold text-[10px] rounded-lg">
                            {idx + 1}
                          </span>
                          <span className="text-xs text-slate-700 font-medium leading-snug">{obj}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Modules Curriculum Accordion */}
                <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-3xl space-y-4 shadow-sm">
                  <h3 className="text-base font-extrabold text-[#0F172A] flex items-center gap-2 border-b border-slate-100 pb-3">
                    <BookOpen className="w-5 h-5 text-[#15803D]" />
                    Curriculum Syllabus &amp; Video Modules ({programme.modules?.length || 0} Modules)
                  </h3>

                  {programme.modules && programme.modules.length > 0 ? (
                    <div className="space-y-3">
                      {programme.modules.map((mod: any) => (
                        <div
                          key={mod.id}
                          className="p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                        >
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-black text-[#15803D] uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                                Module {mod.order}
                              </span>
                              {mod.isFreePreview && (
                                <span className="text-[10px] font-extrabold text-[#D4A017] bg-[#FEFCE8] border border-[#D4A017]/30 px-2 py-0.5 rounded-full">
                                  Free Public Preview
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm font-extrabold text-[#0F172A]">{mod.title}</h4>
                            {mod.durationMinutes && (
                              <span className="text-[11px] text-slate-500 font-medium block">
                                Duration: {mod.durationMinutes} Mins
                              </span>
                            )}
                          </div>

                          <div>
                            {mod.isFreePreview ? (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#15803D] text-white text-[11px] font-bold">
                                <Play className="w-3.5 h-3.5" /> Preview Lesson
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 text-slate-400 text-[11px] font-semibold">
                                <Lock className="w-3.5 h-3.5" /> Enrolled Access Only
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 py-4 text-center">
                      Detailed module lessons are being configured for this programme.
                    </p>
                  )}
                </div>
              </div>

              {/* Right Column: Upcoming Cohorts Widget */}
              <div className="space-y-6">
                <div className="p-6 bg-[#030e1f] text-white border border-[#D4A017]/30 rounded-3xl space-y-4 shadow-xl">
                  <h3 className="text-base font-extrabold text-white flex items-center gap-2 border-b border-white/10 pb-3">
                    <Calendar className="w-5 h-5 text-[#D4A017]" />
                    Upcoming DTA Cohorts
                  </h3>

                  {programme.cohorts && programme.cohorts.length > 0 ? (
                    <div className="space-y-3">
                      {programme.cohorts.map((cohort: any) => (
                        <div
                          key={cohort.id}
                          className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-[#00d2ff] font-mono">
                              {cohort.cohortCode}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
                              {cohort.status}
                            </span>
                          </div>
                          <h4 className="text-xs font-bold text-white">{cohort.title}</h4>
                          <div className="text-[11px] text-slate-300 space-y-1">
                            <p>Starts: <strong className="text-white">{new Date(cohort.startDate).toLocaleDateString()}</strong></p>
                            <p>Ends: <strong className="text-white">{new Date(cohort.endDate).toLocaleDateString()}</strong></p>
                            <p>Capacity: <strong className="text-[#D4A017]">{cohort.capacity} Candidates Max</strong></p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 py-3">
                      Initial cohort <strong className="text-[#D4A017]">GENAI-WP-001</strong> registration launching soon.
                    </p>
                  )}

                  <div className="pt-2">
                    <Link
                      href="/admissions/apply"
                      className="w-full py-3 bg-[#15803D] hover:bg-[#166534] text-white font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all text-center block shadow-md"
                    >
                      Apply for Next Cohort
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>

      <PublicFooter />

      <LeadCaptureModal
        isOpen={leadModalOpen}
        onClose={() => setLeadModalOpen(false)}
        defaultProgramme={programme?.title || "Generative AI for Work & Productivity"}
      />
    </div>
  );
}
