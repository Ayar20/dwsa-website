"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import YouTubePlayer from "@/components/YouTubePlayer";
import {
  BookOpen,
  CheckCircle2,
  Clock,
  CreditCard,
  Lock,
  Sparkles,
  Target,
  Building2,
  Copy,
  Check,
  RefreshCw,
  GraduationCap,
  Video,
  Award,
  HelpCircle,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  FileCheck,
} from "lucide-react";

export default function StudentDashboardPage() {
  const searchParams = useSearchParams();
  const paymentStatus = searchParams.get("payment");
  const paymentRef = searchParams.get("ref");

  const [activeTab, setActiveTab] = useState<"curriculum" | "live" | "quizzes" | "credentials">("curriculum");
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ type: "success" | "error" | "info"; text: string } | null>(null);

  // Quiz Attempt State
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [isSubmittingQuiz, setIsSubmittingQuiz] = useState(false);
  const [quizResult, setQuizResult] = useState<{ score: number; passed: boolean; passScore: number } | null>(null);

  // Payment states
  const [paymentTab, setPaymentTab] = useState<"paystack" | "bank">("paystack");
  const [isInitializingPaystack, setIsInitializingPaystack] = useState(false);
  const [depositRefInput, setDepositRefInput] = useState("");
  const [isSubmittingDeposit, setIsSubmittingDeposit] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);
  const [registeringPlan, setRegisteringPlan] = useState<"FULL_UPFRONT" | "INSTALLMENT">("FULL_UPFRONT");
  const [isRegisteringCohort, setIsRegisteringCohort] = useState(false);

  // 1. Student Main Dashboard Data
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["student-dashboard"],
    queryFn: async () => {
      const res = await fetch("/api/student/dashboard");
      if (!res.ok) throw new Error("Failed to load dashboard data");
      return res.json();
    },
  });

  // 2. Student Live Classes Data (Only fetched if ENROLLED)
  const { data: liveClassesData } = useQuery({
    queryKey: ["student-live-classes"],
    queryFn: async () => {
      const res = await fetch("/api/student/live-classes");
      if (!res.ok) return { liveClasses: [] };
      return res.json();
    },
    enabled: !!data?.enrolled,
  });

  // 3. Active Quiz Data
  const { data: quizData, refetch: refetchQuiz } = useQuery({
    queryKey: ["student-assessment", activeQuizId],
    queryFn: async () => {
      if (!activeQuizId) return null;
      const res = await fetch(`/api/student/assessments/${activeQuizId}`);
      if (!res.ok) throw new Error("Failed to load assessment");
      return res.json();
    },
    enabled: !!activeQuizId && !!data?.enrolled,
  });

  useEffect(() => {
    if (paymentStatus === "processing" && paymentRef) {
      setMessage({
        type: "info",
        text: `Payment reference ${paymentRef} received. Server webhook verification in progress. Please refresh to access workspace.`,
      });
    }
  }, [paymentStatus, paymentRef]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6">
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200" />
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#15803D] border-r-[#D4A017] animate-spin" />
          <div className="absolute inset-3 rounded-full bg-[#F0FDF4] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-[#15803D]" />
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm font-bold text-[#0F172A]">Initialising Workspace</p>
          <p className="text-[11px] text-slate-500 mt-1">Loading your cohort curriculum & lessons…</p>
        </div>
      </div>
    );
  }

  // Handle Unenrolled / Pending Payment State
  if (isError || !data || !data.enrolled) {
    const isPendingPayment = data?.enrollmentStatus === "PENDING_PAYMENT";
    const enrollment = data?.enrollment;
    const totalAmount = Number(enrollment?.totalAmount) || 150000;
    const amountPaid = Number(enrollment?.amountPaid) || 0;
    const outstandingBalance = totalAmount - amountPaid;

    const handlePaystackCheckout = async () => {
      if (!enrollment?.id) return;
      setIsInitializingPaystack(true);
      setMessage(null);
      try {
        const res = await fetch("/api/payments/initialize", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ enrollmentId: enrollment.id }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Payment checkout failed");

        if (json.checkoutUrl) {
          window.location.href = json.checkoutUrl;
        } else {
          throw new Error("No authorization URL returned from payment server");
        }
      } catch (err: any) {
        setMessage({ type: "error", text: err.message || "Payment initialization failed" });
        setIsInitializingPaystack(false);
      }
    };

    const handleBankDepositSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!enrollment?.id || !depositRefInput.trim()) return;
      setIsSubmittingDeposit(true);
      setMessage(null);
      try {
        const res = await fetch("/api/admin/payments/manual", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            enrollmentId: enrollment.id,
            depositReference: depositRefInput.trim(),
          }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to submit bank deposit reference");

        setMessage({
          type: "success",
          text: "Bank transfer claim submitted successfully! A DTA Administrator will verify your payment shortly.",
        });
        setDepositRefInput("");
        refetch();
      } catch (err: any) {
        setMessage({ type: "error", text: err.message || "Failed to submit deposit claim" });
      } finally {
        setIsSubmittingDeposit(false);
      }
    };

    const handleSelfEnroll = async () => {
      setIsRegisteringCohort(true);
      setMessage(null);
      try {
        const res = await fetch("/api/student/enroll", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            programmeSlug: "generative-ai-for-work-and-productivity",
            paymentPlan: registeringPlan,
          }),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Failed to register enrolment");
        setMessage({
          type: "success",
          text: "Registration successful! Please complete tuition payment to unlock your workspace.",
        });
        refetch();
      } catch (err: any) {
        setMessage({ type: "error", text: err.message || "Failed to register" });
      } finally {
        setIsRegisteringCohort(false);
      }
    };

    const dwsaBankAccounts = [
      { bankName: "Zenith Bank", accountNumber: "1312782600", accountName: "Digital World Systems Africa Ltd" },
      { bankName: "Fidelity Bank", accountNumber: "5601785436", accountName: "Digital World Systems Africa Ltd" },
      { bankName: "United Bank for Africa (UBA)", accountNumber: "1031059065", accountName: "Digital World Systems Africa Ltd" },
    ];

    const copyAccountNumber = (accNo: string) => {
      navigator.clipboard.writeText(accNo);
      setCopiedAccount(accNo);
      setTimeout(() => setCopiedAccount(null), 2000);
    };

    return (
      <div className="max-w-2xl mx-auto my-12 space-y-6">
        {message && (
          <div
            className={`p-4 rounded-2xl border text-xs font-semibold flex items-center justify-between gap-3 ${
              message.type === "success"
                ? "bg-[#F0FDF4] border-[#15803D]/30 text-[#15803D]"
                : message.type === "info"
                ? "bg-blue-50 border-blue-200 text-blue-800"
                : "bg-red-50 border-red-200 text-red-700"
            }`}
          >
            <span>{message.text}</span>
            <button
              onClick={() => refetch()}
              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[#0F172A] font-bold text-[10px] shrink-0 hover:bg-slate-50 flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3 text-[#15803D]" /> Refresh Status
            </button>
          </div>
        )}

        <div className="p-8 rounded-3xl border border-slate-200 bg-white space-y-6 shadow-sm">
          <div className="flex items-center gap-4 border-b border-slate-100 pb-6">
            <div className="w-14 h-14 rounded-2xl bg-[#FEFCE8] flex items-center justify-center border border-[#D4A017]/30 shrink-0">
              <Lock className="w-7 h-7 text-[#D4A017]" />
            </div>
            <div>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FEFCE8] border border-[#D4A017]/30 text-[#D4A017] text-[10px] font-black uppercase tracking-wider">
                {isPendingPayment ? "Enrolment Pending Payment" : "Active Enrolment Required"}
              </span>
              <h2 className="text-xl font-black text-[#0F172A] mt-1">
                School of Generative Artificial Intelligence
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Complete your tuition payment to unlock your active cohort workspace &amp; digital campus tools.
              </p>
            </div>
          </div>

          {isPendingPayment && enrollment ? (
            <div className="space-y-6">
              {/* Invoice Breakdown Card */}
              <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Programme</span>
                    <p className="text-sm font-extrabold text-[#0F172A]">Generative AI for Work &amp; Productivity</p>
                    <p className="text-xs text-slate-500 font-mono mt-0.5">Cohort: {enrollment.cohort?.cohortCode || "GENAI-WP-001"}</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] text-xs font-black">
                    {enrollment.paymentPlan || "FULL UPFRONT"}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-3 pt-2 border-t border-slate-200/60 text-center">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Total Tuition</span>
                    <strong className="text-sm font-black text-[#0F172A]">₦{totalAmount.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Amount Paid</span>
                    <strong className="text-sm font-black text-[#15803D]">₦{amountPaid.toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Outstanding Balance</span>
                    <strong className="text-sm font-black text-[#D4A017]">₦{outstandingBalance.toLocaleString()}</strong>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <div className="flex rounded-xl bg-slate-100 p-1 border border-slate-200">
                  <button
                    onClick={() => setPaymentTab("paystack")}
                    className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition-all flex items-center justify-center gap-2 ${
                      paymentTab === "paystack" ? "bg-white text-[#0F172A] shadow-sm" : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    <CreditCard className="w-3.5 h-3.5 text-[#15803D]" />
                    Pay via Paystack (Instant)
                  </button>
                  <button
                    onClick={() => setPaymentTab("bank")}
                    className={`flex-1 py-2 text-xs font-extrabold rounded-lg transition-all flex items-center justify-center gap-2 ${
                      paymentTab === "bank" ? "bg-white text-[#0F172A] shadow-sm" : "text-slate-500 hover:text-slate-900"
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5 text-[#D4A017]" />
                    Manual Bank Transfer
                  </button>
                </div>

                {paymentTab === "paystack" ? (
                  <div className="p-5 rounded-2xl border border-slate-200 bg-white text-center space-y-4">
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Pay securely with Debit Card, Bank Transfer, USSD, or Apple Pay via Paystack. Your workspace will activate automatically upon payment verification.
                    </p>
                    <button
                      onClick={handlePaystackCheckout}
                      disabled={isInitializingPaystack}
                      className="w-full py-3.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-black flex items-center justify-center gap-2 shadow-md disabled:opacity-50 transition-colors"
                    >
                      <CreditCard className="w-4 h-4" />
                      {isInitializingPaystack ? "Initializing Paystack Gateway…" : `Proceed to Pay ₦${outstandingBalance.toLocaleString()}`}
                    </button>
                  </div>
                ) : (
                  <div className="p-5 rounded-2xl border border-slate-200 bg-white space-y-5">
                    <p className="text-xs text-slate-600">
                      Transfer tuition to any of the official DWSA corporate bank accounts below and submit your transaction reference:
                    </p>

                    <div className="space-y-3">
                      {dwsaBankAccounts.map((bank) => (
                        <div key={bank.accountNumber} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1 text-xs">
                          <div className="flex justify-between items-center text-slate-500 font-semibold text-[11px]">
                            <span className="font-extrabold text-[#0F172A]">{bank.bankName}</span>
                            <span className="text-[10px] text-slate-400">{bank.accountName}</span>
                          </div>
                          <div className="flex justify-between items-center pt-1 border-t border-slate-200/60">
                            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Account No.</span>
                            <div className="flex items-center gap-1.5">
                              <strong className="text-[#15803D] font-mono text-xs tracking-wider">{bank.accountNumber}</strong>
                              <button
                                type="button"
                                onClick={() => copyAccountNumber(bank.accountNumber)}
                                className="p-1 text-slate-400 hover:text-[#15803D] rounded transition-colors"
                                title="Copy Account Number"
                              >
                                {copiedAccount === bank.accountNumber ? (
                                  <Check className="w-3.5 h-3.5 text-[#15803D]" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <form onSubmit={handleBankDepositSubmit} className="space-y-3">
                      <div>
                        <label className="block text-[11px] font-extrabold text-[#0F172A] mb-1">
                          Deposit / Transfer Reference Number
                        </label>
                        <input
                          type="text"
                          required
                          value={depositRefInput}
                          onChange={(e) => setDepositRefInput(e.target.value)}
                          placeholder="e.g. GTB/TRSF/20260814/99120"
                          className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs font-mono text-[#0F172A] focus:ring-2 focus:ring-[#15803D] focus:outline-none"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmittingDeposit || !depositRefInput.trim()}
                        className="w-full py-3 rounded-xl bg-[#D4A017] hover:bg-[#b58712] text-white text-xs font-extrabold flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 transition-colors"
                      >
                        {isSubmittingDeposit ? "Submitting Deposit Claim…" : "Submit Deposit Claim for Admin Verification"}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-[#15803D] uppercase tracking-wider flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#15803D]" /> Available Flagship Programme
                  </span>
                  <span className="text-[10px] font-mono font-bold text-slate-500">Cohort GENAI-WP-001</span>
                </div>

                <div>
                  <h3 className="text-base font-extrabold text-[#0F172A]">Generative AI for Work &amp; Productivity</h3>
                  <p className="text-xs text-slate-600 mt-1">
                    Master workplace AI automation, prompt engineering, agentic workflows, custom GPT construction, and document intelligence.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200/60 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Duration</span>
                    <strong className="text-xs font-black text-[#0F172A]">8 Weeks (Live-Online)</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-semibold uppercase block">Academic Unit</span>
                    <strong className="text-xs font-black text-[#15803D]">School of Generative AI</strong>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#0F172A] mb-2">Select Tuition Payment Plan</label>
                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setRegisteringPlan("FULL_UPFRONT")}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      registeringPlan === "FULL_UPFRONT"
                        ? "bg-[#F0FDF4] border-[#15803D] text-[#0F172A] shadow-xs"
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold">Full Tuition</span>
                      {registeringPlan === "FULL_UPFRONT" && <CheckCircle2 className="w-4 h-4 text-[#15803D]" />}
                    </div>
                    <strong className="text-base font-black text-[#15803D] block mt-1">₦150,000</strong>
                    <span className="text-[10px] text-slate-400 block">Instant access upon payment</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRegisteringPlan("INSTALLMENT")}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      registeringPlan === "INSTALLMENT"
                        ? "bg-[#F0FDF4] border-[#15803D] text-[#0F172A] shadow-xs"
                        : "bg-white border-slate-200 text-slate-600 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold">2 Installments</span>
                      {registeringPlan === "INSTALLMENT" && <CheckCircle2 className="w-4 h-4 text-[#15803D]" />}
                    </div>
                    <strong className="text-base font-black text-[#D4A017] block mt-1">₦75,000 × 2</strong>
                    <span className="text-[10px] text-slate-400 block">50% initial deposit</span>
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSelfEnroll}
                disabled={isRegisteringCohort}
                className="w-full py-3.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-black flex items-center justify-center gap-2 shadow-md disabled:opacity-50 transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                {isRegisteringCohort ? "Registering for Cohort…" : "Register for Cohort & Proceed to Payment"}
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Active Enrolled Learner View
  const { enrollment, track } = data;
  const modules = track?.modules || [];
  const activeModule = modules.find((m: any) => m.id === selectedModuleId) || modules[0];
  const liveClasses = liveClassesData?.liveClasses || [];

  const handleQuizSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeQuizId) return;
    setIsSubmittingQuiz(true);
    setQuizResult(null);
    try {
      const res = await fetch(`/api/student/assessments/${activeQuizId}/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ submittedAnswers: quizAnswers }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Quiz submission failed");

      setQuizResult({
        score: json.score,
        passed: json.passed,
        passScore: json.passScore,
      });
      refetchQuiz();
    } catch (err: any) {
      alert(err.message || "Failed to submit quiz");
    } finally {
      setIsSubmittingQuiz(false);
    }
  };

  return (
    <div className="space-y-8 pb-12 animate-fadeInUp">
      {/* Welcome Banner */}
      <div className="p-6 sm:p-8 bg-white border border-slate-200 rounded-3xl space-y-5 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] text-xs font-extrabold flex items-center gap-1.5">
                <GraduationCap className="w-3.5 h-3.5" />
                DIGITAL CAMPUS WORKSPACE
              </span>
              <span className="px-3 py-1 rounded-full bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] text-xs font-bold">
                Cohort Active (ENROLLED)
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
              Welcome to Campus Home, <span className="text-[#15803D]">{enrollment?.user?.name || "Learner"}</span> 👋
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-2xl">
              You are enrolled in the <strong className="text-[#0F172A]">{track?.title || "Generative AI for Work & Productivity"}</strong>. Your coursework, live sessions, and verifiable certification portal are active.
            </p>
          </div>

          <div className="shrink-0 p-4 bg-[#F0FDF4] border border-[#15803D]/20 rounded-2xl space-y-1.5 min-w-[200px]">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Primary Learning Goal
            </span>
            <strong className="text-xs font-extrabold text-[#0F172A] flex items-center gap-1.5">
              <Target className="w-3.5 h-3.5 text-[#15803D]" />
              Generative AI Engineer
            </strong>
          </div>
        </div>

        {/* Phase 4 Main Workspace Navigation Tabs */}
        <div className="flex rounded-2xl bg-slate-100 p-1 border border-slate-200 overflow-x-auto">
          <button
            onClick={() => setActiveTab("curriculum")}
            className={`px-4 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "curriculum" ? "bg-white text-[#0F172A] shadow-sm" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#15803D]" /> Curriculum &amp; Video Lessons
          </button>
          <button
            onClick={() => setActiveTab("live")}
            className={`px-4 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "live" ? "bg-white text-[#0F172A] shadow-sm" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Video className="w-3.5 h-3.5 text-[#15803D]" /> Live Classes ({liveClasses.length})
          </button>
          <button
            onClick={() => setActiveTab("quizzes")}
            className={`px-4 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "quizzes" ? "bg-white text-[#0F172A] shadow-sm" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-[#D4A017]" /> Assessments &amp; Quizzes
          </button>
          <button
            onClick={() => setActiveTab("credentials")}
            className={`px-4 py-2 text-xs font-black rounded-xl transition-all flex items-center gap-2 whitespace-nowrap ${
              activeTab === "credentials" ? "bg-white text-[#0F172A] shadow-sm" : "text-slate-500 hover:text-slate-900"
            }`}
          >
            <Award className="w-3.5 h-3.5 text-[#15803D]" /> My Credentials
          </button>
        </div>
      </div>

      {/* TAB 1: CURRICULUM & LESSONS */}
      {activeTab === "curriculum" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-5">
            {activeModule ? (
              <div className="rounded-2xl border border-slate-200 overflow-hidden bg-white shadow-sm">
                <div className="p-5 pb-3">
                  <YouTubePlayer
                    youtubeId={activeModule.youtubeId}
                    title={activeModule.title}
                    durationMinutes={activeModule.durationMinutes}
                    isFreePreview={activeModule.isFreePreview}
                  />
                </div>

                <div className="px-5 py-4 border-t border-slate-100 flex justify-between items-center">
                  <h2 className="text-xl font-black text-[#0F172A]">{activeModule.title}</h2>
                  {activeModule.assessments?.[0] && (
                    <button
                      onClick={() => {
                        setActiveQuizId(activeModule.assessments[0].id);
                        setActiveTab("quizzes");
                      }}
                      className="px-3.5 py-1.5 rounded-xl bg-[#FEFCE8] border border-[#D4A017]/30 text-[#D4A017] text-xs font-extrabold flex items-center gap-1.5"
                    >
                      <HelpCircle className="w-3.5 h-3.5" /> Take Module Quiz
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="rounded-2xl border border-slate-200 bg-white flex flex-col items-center justify-center min-h-[300px] p-8 text-center">
                <p className="text-xs text-slate-500">Select a lesson module from your playlist.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: LIVE CLASSES */}
      {activeTab === "live" && (
        <div className="space-y-4">
          <h3 className="text-lg font-black text-[#0F172A]">Scheduled Cohort Live Sessions</h3>
          {liveClasses.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center text-slate-500 text-xs font-semibold shadow-sm">
              No live classes currently scheduled for your cohort. Check back soon!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {liveClasses.map((cls: any) => (
                <div key={cls.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-black text-[#15803D] uppercase tracking-wider block">Live Session</span>
                      <h4 className="text-base font-extrabold text-[#0F172A]">{cls.title}</h4>
                      <p className="text-xs text-slate-500 mt-0.5">Instructor: {cls.instructorName}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] text-[10px] font-black">
                      {cls.durationMins} mins
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-600 font-medium border-t border-slate-100 pt-3">
                    <Clock className="w-3.5 h-3.5 text-[#D4A017]" />
                    <span>{new Date(cls.scheduledAt).toLocaleString("en-GB", { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
                  </div>

                  <div className="pt-2">
                    <a
                      href={cls.meetingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-black flex items-center justify-center gap-2 shadow-sm transition-colors"
                    >
                      <Video className="w-4 h-4" /> Join Virtual Classroom
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 3: ASSESSMENTS & QUIZZES */}
      {activeTab === "quizzes" && (
        <div className="space-y-6">
          {!activeQuizId ? (
            <div className="space-y-4">
              <h3 className="text-lg font-black text-[#0F172A]">Module Quizzes &amp; Competency Assessments</h3>
              <p className="text-xs text-slate-500">Select an assessment to evaluate your knowledge and satisfy academic graduation criteria.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {modules.map((m: any) => (
                  <div key={m.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-mono text-slate-400 uppercase">Module {m.order}</span>
                        <h4 className="text-base font-extrabold text-[#0F172A]">{m.title}</h4>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#FEFCE8] border border-[#D4A017]/30 text-[#D4A017] text-[10px] font-black">
                        Pass: 70%
                      </span>
                    </div>

                    <p className="text-xs text-slate-500">Evaluates generative AI prompt engineering, code structure, and agent workflow principles.</p>

                    <button
                      onClick={() => setActiveQuizId(m.assessments?.[0]?.id || m.id)}
                      className="w-full py-2.5 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
                    >
                      <HelpCircle className="w-4 h-4 text-[#D4A017]" /> Launch Assessment
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm space-y-6">
              <div className="flex justify-between items-center border-b border-slate-100 pb-4">
                <div>
                  <button
                    onClick={() => { setActiveQuizId(null); setQuizResult(null); }}
                    className="text-xs font-bold text-[#15803D] hover:underline flex items-center gap-1 mb-1"
                  >
                    ← Back to Assessments List
                  </button>
                  <h3 className="text-xl font-black text-[#0F172A]">{quizData?.assessment?.title || "Module Quiz"}</h3>
                  <p className="text-xs text-slate-500">{quizData?.assessment?.moduleTitle} · Pass Score: {quizData?.assessment?.passScore}%</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-[#FEFCE8] border border-[#D4A017]/30 text-[#D4A017] text-xs font-black">
                  Max Attempts: {quizData?.assessment?.maxAttempts || 3}
                </span>
              </div>

              {quizResult && (
                <div
                  className={`p-5 rounded-2xl border text-xs font-bold space-y-2 ${
                    quizResult.passed
                      ? "bg-[#F0FDF4] border-[#15803D]/30 text-[#15803D]"
                      : "bg-red-50 border-red-200 text-red-700"
                  }`}
                >
                  <div className="flex items-center gap-2 text-sm font-black">
                    {quizResult.passed ? <CheckCircle2 className="w-5 h-5" /> : <Lock className="w-5 h-5" />}
                    {quizResult.passed ? "Congratulations! You PASSED!" : "Assessment Result: FAILED"}
                  </div>
                  <p>Your Score: <strong>{quizResult.score}%</strong> (Required Pass Score: {quizResult.passScore}%)</p>
                </div>
              )}

              {quizData?.assessment?.questions?.length > 0 ? (
                <form onSubmit={handleQuizSubmit} className="space-y-6">
                  {quizData.assessment.questions.map((q: any, idx: number) => {
                    const qId = q.id || `q_${idx + 1}`;
                    return (
                      <div key={qId} className="p-5 rounded-2xl bg-[#F8FAFC] border border-slate-200 space-y-3">
                        <p className="text-xs font-extrabold text-[#0F172A]">
                          Question {idx + 1}: {q.question || q.text}
                        </p>

                        <div className="space-y-2">
                          {(q.options || ["Option A", "Option B", "Option C", "Option D"]).map((opt: string, optIdx: number) => (
                            <label
                              key={optIdx}
                              className={`flex items-center gap-3 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-colors ${
                                quizAnswers[qId] === opt
                                  ? "bg-white border-[#15803D] text-[#15803D] shadow-xs"
                                  : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                              }`}
                            >
                              <input
                                type="radio"
                                name={qId}
                                value={opt}
                                checked={quizAnswers[qId] === opt}
                                onChange={() => setQuizAnswers((p) => ({ ...p, [qId]: opt }))}
                                className="text-[#15803D] focus:ring-[#15803D]"
                              />
                              <span>{opt}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    );
                  })}

                  <button
                    type="submit"
                    disabled={isSubmittingQuiz}
                    className="w-full py-3.5 rounded-xl bg-[#15803D] hover:bg-[#166534] text-white text-xs font-black flex items-center justify-center gap-2 shadow-md disabled:opacity-50 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    {isSubmittingQuiz ? "Submitting Quiz for Server Evaluation…" : "Submit Quiz Answers"}
                  </button>
                </form>
              ) : (
                <p className="text-xs text-slate-500 text-center py-4">No questions loaded for this assessment.</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: MY CREDENTIALS */}
      {activeTab === "credentials" && (
        <div className="space-y-4">
          <h3 className="text-lg font-black text-[#0F172A]">My Verified Academic Credentials</h3>

          {enrollment?.certificates?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {enrollment.certificates.map((cert: any) => (
                <div key={cert.id} className="p-6 rounded-2xl bg-white border border-[#D4A017]/40 shadow-sm space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[10px] font-black text-[#15803D] uppercase tracking-wider block">Official Diploma</span>
                      <h4 className="text-base font-extrabold text-[#0F172A]">{cert.certificateType}</h4>
                      <p className="text-xs font-bold text-[#D4A017]">{cert.programmeTitleSnapshot}</p>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] text-[10px] font-black">
                      {cert.verificationStatus}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-slate-600 font-mono">
                    <p>Number: <strong>{cert.certificateNumber}</strong></p>
                    <p>Issued: {new Date(cert.issueDate).toLocaleDateString()}</p>
                  </div>

                  <Link
                    href={`/certificates/verify/${encodeURIComponent(cert.verificationCode)}`}
                    target="_blank"
                    className="w-full py-2.5 rounded-xl bg-[#0F172A] hover:bg-slate-800 text-white text-xs font-black flex items-center justify-center gap-2 shadow-sm transition-colors"
                  >
                    <ShieldCheck className="w-4 h-4 text-[#D4A017]" /> View Public Verification Badge
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-2xl bg-white border border-slate-200 text-center space-y-3 shadow-sm">
              <Award className="w-10 h-10 text-[#D4A017] mx-auto" />
              <h4 className="text-sm font-extrabold text-[#0F172A]">Certificate Pending Graduation Eligibility</h4>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Complete 100% of module assessments and receive approved status on your practical GitHub PR assignments to be awarded your official DTA Professional Diploma.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
