"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  BookOpen,
  Plus,
  RefreshCw,
  Eye,
  EyeOff,
  CheckCircle2,
  ShieldAlert,
  Sparkles,
  Edit,
  DollarSign,
  Clock,
  Globe,
  Loader2,
} from "lucide-react";

export default function AdminProgrammesPage() {
  const [editingProg, setEditingProg] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [school, setSchool] = useState("School of Generative Artificial Intelligence");
  const [description, setDescription] = useState("");
  const [durationWeeks, setDurationWeeks] = useState(8);
  const [deliveryMode, setDeliveryMode] = useState("ONLINE_LIVE");
  const [price, setPrice] = useState(150000);
  const [earlyBirdPrice, setEarlyBirdPrice] = useState(120000);
  const [isPublished, setIsPublished] = useState(false);

  const [saving, setSaving] = useState(false);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["admin-programmes"],
    queryFn: async () => {
      const res = await fetch("/api/admin/programmes");
      if (!res.ok) throw new Error("Failed to fetch programmes");
      return res.json();
    },
  });

  const handleOpenModal = (prog?: any) => {
    if (prog) {
      setEditingProg(prog);
      setTitle(prog.title);
      setSlug(prog.slug);
      setSchool(prog.school || "School of Generative Artificial Intelligence");
      setDescription(prog.description);
      setDurationWeeks(prog.durationWeeks);
      setDeliveryMode(prog.deliveryMode);
      setPrice(Number(prog.price));
      setEarlyBirdPrice(prog.earlyBirdPrice ? Number(prog.earlyBirdPrice) : 120000);
      setIsPublished(prog.isPublished);
    } else {
      setEditingProg(null);
      setTitle("");
      setSlug("");
      setSchool("School of Generative Artificial Intelligence");
      setDescription("");
      setDurationWeeks(8);
      setDeliveryMode("ONLINE_LIVE");
      setPrice(150000);
      setEarlyBirdPrice(120000);
      setIsPublished(false);
    }
    setShowModal(true);
  };

  const handleSaveProgramme = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setToast(null);

    try {
      const res = await fetch("/api/admin/programmes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingProg?.id,
          title,
          slug: slug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          school,
          description,
          durationWeeks: Number(durationWeeks),
          deliveryMode,
          price: Number(price),
          earlyBirdPrice: earlyBirdPrice ? Number(earlyBirdPrice) : undefined,
          isPublished,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to save programme");

      setToast({ type: "success", text: json.message });
      setShowModal(false);
      refetch();
    } catch (err: any) {
      setToast({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  };

  const handleTogglePublish = async (progId: string, currentPublishedState: boolean) => {
    setActionLoading(progId);
    setToast(null);

    try {
      const res = await fetch("/api/admin/programmes", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: progId,
          isPublished: !currentPublishedState,
        }),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to update publication status");

      setToast({ type: "success", text: json.message });
      refetch();
    } catch (err: any) {
      setToast({ type: "error", text: err.message });
    } finally {
      setActionLoading(null);
    }
  };

  if (isLoading) {
    return (
      <div className="py-20 text-center text-slate-500 text-xs flex flex-col items-center justify-center gap-3">
        <div className="w-10 h-10 border-2 border-[#15803D] border-t-transparent rounded-full animate-spin" />
        <span className="font-extrabold text-[#0F172A]">Loading DTA Programme Catalogue Desk...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-8 bg-rose-950/20 border border-rose-800/40 rounded-3xl text-center space-y-3 max-w-md mx-auto my-10 text-rose-300">
        <ShieldAlert className="w-8 h-8 mx-auto text-rose-400" />
        <h3 className="text-base font-extrabold">Access Restricted</h3>
        <p className="text-xs text-slate-400">Admin privileges required to manage DTA programmes.</p>
      </div>
    );
  }

  const programmes = data?.programmes || [];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FEFCE8] border border-[#D4A017]/30 text-[#D4A017] rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-2">
              <Sparkles className="w-3 h-3" /> DTA Academic Management
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
              DTA Programme <span className="text-[#15803D]">Publishing Desk</span>
            </h1>
            <p className="text-xs text-slate-500 max-w-2xl mt-1">
              Create and edit academic programmes, manage tuition pricing, configure delivery modes, and toggle public publication states.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleOpenModal()}
              className="px-4 py-2.5 bg-[#15803D] hover:bg-[#166534] text-white rounded-xl text-xs font-extrabold flex items-center gap-2 transition-all shadow-sm"
            >
              <Plus className="w-4 h-4" />
              Create New Programme
            </button>
            <button
              onClick={() => refetch()}
              className="p-2.5 bg-[#F8FAFC] border border-slate-200 hover:border-[#15803D] text-[#0F172A] rounded-xl transition-all"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Toast Alert */}
      {toast && (
        <div
          className={`p-4 rounded-2xl border text-xs font-semibold flex items-center gap-3 ${
            toast.type === "success"
              ? "bg-emerald-950/80 border-emerald-500/50 text-emerald-300"
              : "bg-rose-950/80 border-rose-800/80 text-rose-300"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          ) : (
            <ShieldAlert className="w-4 h-4 text-rose-400" />
          )}
          <span>{toast.text}</span>
        </div>
      )}

      {/* Programmes List */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
        <h3 className="text-base font-extrabold text-[#0F172A] flex items-center gap-2 border-b border-slate-100 pb-3">
          <BookOpen className="w-5 h-5 text-[#15803D]" />
          Configured DTA Programmes ({programmes.length})
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {programmes.map((prog: any) => (
            <div
              key={prog.id}
              className={`p-6 rounded-3xl space-y-4 flex flex-col justify-between border transition-all ${
                prog.isPublished
                  ? "bg-[#F8FAFC] border-emerald-300 shadow-sm"
                  : "bg-amber-50/30 border-amber-200"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black text-[#15803D] uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    {prog.school}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${
                      prog.isPublished
                        ? "bg-emerald-100 border-emerald-300 text-emerald-800"
                        : "bg-amber-100 border-amber-300 text-amber-800"
                    }`}
                  >
                    {prog.isPublished ? "PUBLISHED" : "DRAFT (HIDDEN)"}
                  </span>
                </div>

                <h4 className="text-lg font-extrabold text-[#0F172A]">{prog.title}</h4>
                <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">{prog.description}</p>

                <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-slate-100">
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Tuition Price</span>
                    <strong className="text-[#0F172A]">₦{Number(prog.price).toLocaleString()}</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Duration</span>
                    <strong className="text-[#0F172A]">{prog.durationWeeks} Weeks</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Cohorts</span>
                    <strong className="text-[#0F172A]">{prog._count?.cohorts || 0} Configured</strong>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Applications</span>
                    <strong className="text-[#15803D]">{prog._count?.applications || 0} Candidates</strong>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <button
                  onClick={() => handleOpenModal(prog)}
                  className="px-3.5 py-2 bg-white border border-slate-200 hover:border-[#15803D] text-[#0F172A] text-xs font-bold rounded-xl transition-all flex items-center gap-1.5"
                >
                  <Edit className="w-3.5 h-3.5 text-[#15803D]" />
                  Edit Programme
                </button>

                <button
                  onClick={() => handleTogglePublish(prog.id, prog.isPublished)}
                  disabled={actionLoading === prog.id}
                  className={`px-4 py-2 rounded-xl text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-sm ${
                    prog.isPublished
                      ? "bg-amber-100 border border-amber-300 text-amber-800 hover:bg-amber-200"
                      : "bg-[#15803D] hover:bg-[#166534] text-white"
                  }`}
                >
                  {prog.isPublished ? (
                    <>
                      <EyeOff className="w-3.5 h-3.5" />
                      Unpublish to Draft
                    </>
                  ) : (
                    <>
                      <Eye className="w-3.5 h-3.5" />
                      Publish Publicly
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <div className="relative w-full max-w-xl bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <h3 className="text-lg font-extrabold text-[#0F172A]">
              {editingProg ? "Edit Programme Details" : "Create New DTA Programme"}
            </h3>

            <form onSubmit={handleSaveProgramme} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                    Programme Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                    URL Slug *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="generative-ai-for-work-and-productivity"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                  Academic School
                </label>
                <input
                  type="text"
                  required
                  value={school}
                  onChange={(e) => setSchool(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                  Description *
                </label>
                <textarea
                  required
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                    Duration (Weeks)
                  </label>
                  <input
                    type="number"
                    value={durationWeeks}
                    onChange={(e) => setDurationWeeks(Number(e.target.value))}
                    className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                    Tuition Price (NGN)
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-extrabold text-slate-500 uppercase tracking-wider mb-1">
                    Early Bird Price
                  </label>
                  <input
                    type="number"
                    value={earlyBirdPrice}
                    onChange={(e) => setEarlyBirdPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2 bg-[#F8FAFC] border border-slate-200 rounded-xl text-xs text-[#0F172A]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="pubCheck"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-4 h-4 text-[#15803D] rounded border-slate-300"
                />
                <label htmlFor="pubCheck" className="text-xs font-extrabold text-[#0F172A]">
                  Publish Publicly Immediately (Visible to visitors on /programmes)
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl text-xs font-bold text-slate-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2 bg-[#15803D] hover:bg-[#166534] text-white rounded-xl text-xs font-extrabold flex items-center gap-2"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Save Programme"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
