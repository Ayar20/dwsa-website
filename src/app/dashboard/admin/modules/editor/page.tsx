"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import {
  BookOpen,
  CheckCircle2,
  ChevronDown,
  Clapperboard,
  Code,
  Eye,
  FilePen,
  Layers,
  Loader2,
  PlusCircle,
  Save,
  ShieldAlert,
  Sparkles,
  Video,
  Play,
  RotateCcw,
} from "lucide-react";

// Dynamic import — avoids SSR hydration mismatch
const MDEditor = dynamic(() => import("@uiw/react-md-editor"), { ssr: false });

// --------------- Zod Validation Schema ---------------
const moduleSchema = z.object({
  trackId: z.string().min(1, "Please select a track."),
  title: z.string().min(3, "Title must be at least 3 characters."),
  order: z.coerce.number().int().min(1, "Order must be a positive integer."),
  contentMarkdown: z.string().min(10, "Lesson content must be at least 10 characters."),
  githubStarterRepo: z.string().url("Must be a valid URL.").or(z.literal("")).optional(),
  youtubeId: z
    .string()
    .regex(/^[a-zA-Z0-9_-]{11}$/, "YouTube ID must be exactly 11 characters.")
    .or(z.literal(""))
    .optional(),
  durationMinutes: z.coerce.number().int().min(1).or(z.literal("")).optional(),
  isFreePreview: z.boolean().optional(),
});

type ModuleFormValues = z.infer<typeof moduleSchema>;

interface Track {
  id: string;
  title: string;
  slug: string;
  modules: Module[];
}

interface Module {
  id: string;
  trackId: string;
  title: string;
  order: number;
  contentMarkdown: string;
  githubStarterRepo?: string | null;
  youtubeId?: string | null;
  durationMinutes?: number | null;
  isFreePreview: boolean;
}

const defaultForm: ModuleFormValues & { id?: string } = {
  trackId: "",
  title: "",
  order: 1,
  contentMarkdown: "## Module Title\n\nWrite your lesson content here...\n\n### Objectives\n- Objective 1\n- Objective 2",
  githubStarterRepo: "",
  youtubeId: "",
  durationMinutes: "" as any,
  isFreePreview: false,
};

export default function ModuleEditorPage() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState<ModuleFormValues & { id?: string }>(defaultForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toast, setToast] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [selectedTrackId, setSelectedTrackId] = useState<string>("all");

  // Fetch tracks + modules
  const { data, isLoading } = useQuery<{ tracks: Track[] }>({
    queryKey: ["admin-modules"],
    queryFn: async () => {
      const res = await fetch("/api/admin/modules");
      if (!res.ok) throw new Error("Failed to load modules");
      return res.json();
    },
  });

  // Save mutation (create / update)
  const saveMutation = useMutation({
    mutationFn: async (payload: typeof form) => {
      const res = await fetch("/api/admin/modules", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Save failed");
      return json;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-modules"] });
      setToast({ type: "success", text: form.id ? "Module updated successfully!" : "New module created successfully!" });
      setForm(defaultForm);
      setErrors({});
      setTimeout(() => setToast(null), 4000);
    },
    onError: (err: any) => {
      setToast({ type: "error", text: err.message });
      setTimeout(() => setToast(null), 5000);
    },
  });

  // Load module into form for editing
  const handleEditModule = (mod: Module) => {
    setForm({
      id: mod.id,
      trackId: mod.trackId,
      title: mod.title,
      order: mod.order,
      contentMarkdown: mod.contentMarkdown,
      githubStarterRepo: mod.githubStarterRepo || "",
      youtubeId: mod.youtubeId || "",
      durationMinutes: mod.durationMinutes || ("" as any),
      isFreePreview: mod.isFreePreview,
    });
    setErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNewModule = () => {
    setForm(defaultForm);
    setErrors({});
  };

  // Handle form submit with Zod validation
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = moduleSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((e) => {
        if (e.path[0]) fieldErrors[String(e.path[0])] = e.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    saveMutation.mutate(form);
  };

  const tracks = data?.tracks || [];
  const filteredTracks =
    selectedTrackId === "all"
      ? tracks
      : tracks.filter((t) => t.id === selectedTrackId);

  const youtubePreviewUrl = form.youtubeId
    ? `https://img.youtube.com/vi/${form.youtubeId}/mqdefault.jpg`
    : null;

  return (
    <div className="space-y-8">
      {/* Top Banner & Header — IEDS v2.0 */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] rounded-full text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1.5 shadow-xs">
                <FilePen className="w-3 h-3" />
                Curriculum Management
              </span>
              <span className="px-3 py-1 bg-[#F0FDF4] border border-[#15803D]/20 text-[#15803D] rounded-full text-[10px] font-extrabold uppercase tracking-widest">
                DWSA Tech Academy
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-[#0F172A] tracking-tight">
              Module &amp; Track Studio
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-2xl leading-relaxed">
              Create, edit, and organize academic modules, video lectures, coding assignments, and track progression across the DWSA curriculum engine.
            </p>
          </div>

          <button
            onClick={handleNewModule}
            className="px-5 py-2.5 bg-gradient-to-r from-[#d4a017] to-[#e5a910] hover:from-[#e5a910] hover:to-[#d4a017] text-[#030e1f] font-black text-xs rounded-xl shadow-lg shadow-[#d4a017]/25 transition-all flex items-center gap-2 hover:scale-105 shrink-0 w-fit"
          >
            <PlusCircle className="w-4 h-4" />
            Create New Module
          </button>
        </div>
      </div>

      {/* Toast Alert */}
      {toast && (
        <div
          className={`p-4 rounded-2xl border text-xs font-semibold flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-200 ${
            toast.type === "success"
              ? "bg-emerald-950/70 border-emerald-500/50 text-emerald-300 shadow-lg shadow-emerald-950/50"
              : "bg-red-950/70 border-red-500/50 text-red-300 shadow-lg shadow-red-950/50"
          }`}
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          ) : (
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
          )}
          <span>{toast.text}</span>
        </div>
      )}

      {/* --- MAIN EDITOR SPLIT LAYOUT --- */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">

        {/* === LEFT: Module Editor Form === */}
        <div className="xl:col-span-2 space-y-6">
          <form onSubmit={handleSubmit} className="dwsa-glass-card rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#d4a017]/20 pb-4">
              <h2 className="text-base font-extrabold text-white flex items-center gap-2.5">
                <Layers className="w-5 h-5 text-[#00d2ff]" />
                {form.id ? "Edit Module Content" : "Create New Track Module"}
              </h2>
              {form.id && (
                <span className="px-3 py-1 bg-[#d4a017]/10 border border-[#d4a017]/40 text-[#d4a017] rounded-full text-[10px] font-bold">
                  Editing ID: {form.id.slice(0, 8)}...
                </span>
              )}
            </div>

            {/* Row 1: Track + Order */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[10px] font-extrabold text-[#8899b4] uppercase tracking-wider mb-1.5">
                  Assign to Track *
                </label>
                <div className="relative">
                  <select
                    value={form.trackId}
                    onChange={(e) => setForm((f) => ({ ...f, trackId: e.target.value }))}
                    className="w-full px-3.5 py-2.5 bg-[#061428] border border-[#d4a017]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#00d2ff] focus:ring-1 focus:ring-[#00d2ff] appearance-none pr-8 font-semibold"
                  >
                    <option value="">— Select Course Track —</option>
                    {tracks.map((t) => (
                      <option key={t.id} value={t.id}>{t.title}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 text-[#8899b4] absolute right-3 top-3 pointer-events-none" />
                </div>
                {errors.trackId && <p className="text-[10px] text-red-400 mt-1">{errors.trackId}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-[#8899b4] uppercase tracking-wider mb-1.5">
                  Module Sequence Order *
                </label>
                <input
                  type="number"
                  min={1}
                  value={form.order}
                  onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
                  className="w-full px-3.5 py-2.5 bg-[#061428] border border-[#d4a017]/30 rounded-xl text-xs text-white focus:outline-none focus:border-[#00d2ff] font-bold"
                />
                {errors.order && <p className="text-[10px] text-red-400 mt-1">{errors.order}</p>}
              </div>
            </div>

            {/* Row 2: Module Title */}
            <div>
              <label className="block text-[10px] font-extrabold text-[#8899b4] uppercase tracking-wider mb-1.5">
                Module Title *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Module 4: Database Modeling & Schema Management with Prisma"
                className="w-full px-3.5 py-2.5 bg-[#061428] border border-[#d4a017]/30 rounded-xl text-xs text-white placeholder-[#8899b4]/60 focus:outline-none focus:border-[#00d2ff] focus:ring-1 focus:ring-[#00d2ff]"
              />
              {errors.title && <p className="text-[10px] text-red-400 mt-1">{errors.title}</p>}
            </div>

            {/* Row 3: YouTube ID + Duration + Free Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label className="block text-[10px] font-extrabold text-[#8899b4] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Clapperboard className="w-3.5 h-3.5 text-rose-400" />
                  YouTube Video ID
                </label>
                <input
                  type="text"
                  value={form.youtubeId || ""}
                  onChange={(e) => setForm((f) => ({ ...f, youtubeId: e.target.value }))}
                  placeholder="e.g. dQw4w9WgXcQ"
                  maxLength={11}
                  className="w-full px-3.5 py-2.5 bg-[#061428] border border-[#d4a017]/30 rounded-xl text-xs text-white placeholder-[#8899b4]/60 focus:outline-none focus:border-rose-400 font-mono tracking-wider"
                />
                {errors.youtubeId && <p className="text-[10px] text-red-400 mt-1">{errors.youtubeId}</p>}
              </div>

              <div>
                <label className="block text-[10px] font-extrabold text-[#8899b4] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-[#00d2ff]" />
                  Duration (Minutes)
                </label>
                <input
                  type="number"
                  min={1}
                  value={form.durationMinutes || ""}
                  onChange={(e) => setForm((f) => ({ ...f, durationMinutes: e.target.value as any }))}
                  placeholder="e.g. 45"
                  className="w-full px-3.5 py-2.5 bg-[#061428] border border-[#d4a017]/30 rounded-xl text-xs text-white placeholder-[#8899b4]/60 focus:outline-none focus:border-[#00d2ff]"
                />
              </div>

              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-3 cursor-pointer select-none group h-full pb-1 p-2 bg-[#061428] border border-[#d4a017]/20 rounded-xl">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={form.isFreePreview}
                      onChange={(e) => setForm((f) => ({ ...f, isFreePreview: e.target.checked }))}
                      className="sr-only"
                    />
                    <div
                      className={`w-10 h-5 rounded-full transition-colors border ${
                        form.isFreePreview
                          ? "bg-gradient-to-r from-[#d4a017] to-[#e5a910] border-[#d4a017]"
                          : "bg-[#030e1f] border-slate-700"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-[#030e1f] shadow-sm absolute top-0.5 transition-transform ${
                          form.isFreePreview ? "translate-x-5 bg-white" : "translate-x-0.5"
                        }`}
                      />
                    </div>
                  </div>
                  <div>
                    <span className="block text-[10px] font-extrabold text-white uppercase tracking-wider">Free Preview</span>
                    <span className="block text-[9px] text-[#8899b4]">Accessible without tuition payment</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Row 4: GitHub Starter Repo */}
            <div>
              <label className="block text-[10px] font-extrabold text-[#8899b4] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-[#00d2ff]" />
                GitHub Starter Repository URL
              </label>
              <input
                type="url"
                value={form.githubStarterRepo || ""}
                onChange={(e) => setForm((f) => ({ ...f, githubStarterRepo: e.target.value }))}
                placeholder="https://github.com/dwsa-academy/module-starter"
                className="w-full px-3.5 py-2.5 bg-[#061428] border border-[#d4a017]/30 rounded-xl text-xs text-white placeholder-[#8899b4]/60 focus:outline-none focus:border-[#00d2ff]"
              />
              {errors.githubStarterRepo && (
                <p className="text-[10px] text-red-400 mt-1">{errors.githubStarterRepo}</p>
              )}
            </div>

            {/* Row 5: Markdown Lesson Content */}
            <div>
              <label className="block text-[10px] font-extrabold text-[#8899b4] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#d4a017]" />
                Lesson Curriculum Content (Markdown) *
              </label>
              <div
                data-color-mode="dark"
                className="rounded-2xl overflow-hidden border border-[#d4a017]/30 shadow-inner"
              >
                <MDEditor
                  value={form.contentMarkdown}
                  onChange={(val) => setForm((f) => ({ ...f, contentMarkdown: val || "" }))}
                  height={420}
                  preview="live"
                  className="!bg-[#061428]"
                />
              </div>
              {errors.contentMarkdown && (
                <p className="text-[10px] text-red-400 mt-1">{errors.contentMarkdown}</p>
              )}
            </div>

            {/* Submit Action Row */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#d4a017]/20">
              <button
                type="button"
                onClick={handleNewModule}
                className="px-4 py-2.5 bg-[#061428] hover:bg-[#0f223d] border border-slate-700 text-slate-300 text-xs font-extrabold rounded-xl transition-all flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#8899b4]" />
                Clear Form
              </button>

              <button
                type="submit"
                disabled={saveMutation.isPending}
                className="px-6 py-2.5 bg-gradient-to-r from-[#d4a017] to-[#e5a910] hover:from-[#e5a910] hover:to-[#d4a017] text-[#030e1f] text-xs font-black rounded-xl shadow-lg shadow-[#d4a017]/25 transition-all flex items-center gap-2 hover:scale-105"
              >
                {saveMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving Module...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    {form.id ? "Update Module Content" : "Publish New Module"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* === RIGHT: YouTube Video Preview + Module Library — IEDS v2.0 === */}
        <div className="space-y-6">

          {/* YouTube Video Preview Card */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
            <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-2">
              <Eye className="w-4 h-4 text-rose-500" />
              YouTube Video Stream Preview
            </h3>
            {youtubePreviewUrl ? (
              <div className="space-y-3">
                <div className="aspect-video rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-black relative group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={youtubePreviewUrl}
                    alt="YouTube thumbnail preview"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="p-3 bg-[#15803D] text-white rounded-full shadow-md">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                  </div>
                </div>
                <p className="text-[10px] text-slate-500 text-center font-mono font-bold">
                  Video ID: <span className="text-[#15803D] font-bold">{form.youtubeId}</span>
                </p>
              </div>
            ) : (
              <div className="aspect-video rounded-2xl border border-dashed border-slate-200 bg-slate-50 flex flex-col items-center justify-center space-y-2 text-slate-400">
                <Clapperboard className="w-8 h-8 text-slate-400" />
                <p className="text-[11px] text-center">Enter a valid 11-character YouTube ID to preview thumbnail</p>
              </div>
            )}
          </div>

          {/* Module Library Directory */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-4 shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs font-extrabold text-slate-500 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#15803D]" />
                Curriculum Library
              </h3>

              {/* Track Filter */}
              <div className="relative">
                <select
                  value={selectedTrackId}
                  onChange={(e) => setSelectedTrackId(e.target.value)}
                  className="pl-2.5 pr-6 py-1 bg-slate-50 border border-slate-200 rounded-xl text-[10px] text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#15803D] appearance-none font-bold"
                >
                  <option value="all">All Tracks</option>
                  {tracks.map((t) => (
                    <option key={t.id} value={t.id}>{t.title}</option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-slate-400 absolute right-1.5 top-2 pointer-events-none" />
              </div>
            </div>

            {isLoading ? (
              <div className="py-8 flex items-center justify-center gap-2 text-xs text-slate-500">
                <Loader2 className="w-4 h-4 animate-spin text-[#15803D]" />
                <span>Fetching curriculum modules...</span>
              </div>
            ) : (
              <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                {filteredTracks.length === 0 ? (
                  <p className="text-xs text-slate-400 text-center py-6">No track modules created yet.</p>
                ) : (
                  filteredTracks.map((track) => (
                    <div key={track.id} className="space-y-2">
                      <p className="text-[10px] uppercase tracking-widest font-black text-[#15803D] px-1">
                        {track.title}
                      </p>
                      {track.modules.length === 0 ? (
                        <p className="text-[10px] text-slate-400 italic px-2">No modules yet in this track.</p>
                      ) : (
                        track.modules.map((mod) => (
                          <button
                            key={mod.id}
                            onClick={() => handleEditModule(mod)}
                            className={`w-full p-3.5 rounded-2xl border text-left transition-all group ${
                              form.id === mod.id
                                ? "bg-[#F0FDF4] border-[#15803D] text-[#0F172A] shadow-xs"
                                : "bg-slate-50 border-slate-200 text-slate-700 hover:border-[#15803D]/30 hover:bg-[#F0FDF4]/40"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0 space-y-1">
                                <span className="block text-xs font-bold truncate group-hover:text-[#15803D] transition-colors">
                                  {mod.order}. {mod.title}
                                </span>
                                <div className="flex items-center gap-2 flex-wrap">
                                  {mod.youtubeId && (
                                    <span className="text-[9px] text-rose-600 flex items-center gap-0.5 font-bold">
                                      <Clapperboard className="w-2.5 h-2.5" />
                                      Video
                                    </span>
                                  )}
                                  {mod.isFreePreview && (
                                    <span className="text-[9px] text-[#15803D] font-bold">Free Preview</span>
                                  )}
                                  {mod.durationMinutes && (
                                    <span className="text-[9px] text-slate-500 font-semibold">{mod.durationMinutes} mins</span>
                                  )}
                                </div>
                              </div>
                              <FilePen className="w-4 h-4 text-slate-400 group-hover:text-[#15803D] transition-colors shrink-0 mt-0.5" />
                            </div>
                          </button>
                        ))
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

