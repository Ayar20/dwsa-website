"use client";

import React, { useState, useEffect } from "react";
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
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
            <FilePen className="w-6 h-6 text-indigo-400" />
            Admin Module Editor
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Create, edit, and manage curriculum modules — including markdown lesson content, YouTube video streams, GitHub repositories, and preview access flags.
          </p>
        </div>
        <button
          onClick={handleNewModule}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs rounded-xl shadow-lg shadow-indigo-600/20 transition-all w-fit shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          New Module
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div
          className={`p-4 rounded-xl border text-xs flex items-center gap-3 ${
            toast.type === "success"
              ? "bg-emerald-950/60 border-emerald-800/60 text-emerald-300"
              : "bg-red-950/60 border-red-800/60 text-red-300"
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
          <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
            <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              {form.id ? "Edit Existing Module" : "Create New Module"}
            </h2>

            {/* Row 1: Track + Order */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Assign to Track *
                </label>
                <div className="relative">
                  <select
                    value={form.trackId}
                    onChange={(e) => setForm((f) => ({ ...f, trackId: e.target.value }))}
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 appearance-none pr-8"
                  >
                    <option value="">— Select a Track —</option>
                    {tracks.map((t) => (
                      <option key={t.id} value={t.id}>{t.title}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-3 pointer-events-none" />
                </div>
                {errors.trackId && <p className="text-[10px] text-red-400 mt-1">{errors.trackId}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                  Module Order *
                </label>
                <input
                  type="number"
                  min={1}
                  value={form.order}
                  onChange={(e) => setForm((f) => ({ ...f, order: Number(e.target.value) }))}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
                />
                {errors.order && <p className="text-[10px] text-red-400 mt-1">{errors.order}</p>}
              </div>
            </div>

            {/* Row 2: Module Title */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">
                Module Title *
              </label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                placeholder="e.g. Module 4: Database Design with Prisma ORM"
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              {errors.title && <p className="text-[10px] text-red-400 mt-1">{errors.title}</p>}
            </div>

            {/* Row 3: YouTube ID + Duration + Free Preview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Clapperboard className="w-3.5 h-3.5 text-red-500" />
                  YouTube Video ID
                </label>
                <input
                  type="text"
                  value={form.youtubeId || ""}
                  onChange={(e) => setForm((f) => ({ ...f, youtubeId: e.target.value }))}
                  placeholder="e.g. dQw4w9WgXcQ"
                  maxLength={11}
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-red-500 font-mono tracking-wider"
                />
                {errors.youtubeId && <p className="text-[10px] text-red-400 mt-1">{errors.youtubeId}</p>}
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <Video className="w-3.5 h-3.5 text-slate-500" />
                  Duration (minutes)
                </label>
                <input
                  type="number"
                  min={1}
                  value={form.durationMinutes || ""}
                  onChange={(e) => setForm((f) => ({ ...f, durationMinutes: e.target.value as any }))}
                  placeholder="e.g. 45"
                  className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex flex-col justify-end">
                <label className="flex items-center gap-3 cursor-pointer select-none group h-full pb-1">
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
                          ? "bg-emerald-600 border-emerald-500"
                          : "bg-slate-800 border-slate-700"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full bg-white shadow-sm absolute top-0.5 transition-transform ${
                          form.isFreePreview ? "translate-x-5" : "translate-x-0.5"
                        }`}
                      />
                    </div>
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider">Free Preview</span>
                    <span className="block text-[10px] text-slate-500">Visible without enrollment</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Row 4: GitHub Starter Repo */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Code className="w-3.5 h-3.5 text-blue-400" />
                GitHub Starter Repository URL
              </label>
              <input
                type="url"
                value={form.githubStarterRepo || ""}
                onChange={(e) => setForm((f) => ({ ...f, githubStarterRepo: e.target.value }))}
                placeholder="https://github.com/dwsa-academy/module-starter"
                className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 placeholder-slate-600 focus:outline-none focus:border-blue-500"
              />
              {errors.githubStarterRepo && (
                <p className="text-[10px] text-red-400 mt-1">{errors.githubStarterRepo}</p>
              )}
            </div>

            {/* Row 5: Markdown Editor */}
            <div>
              <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-purple-400" />
                Lesson Content (Markdown) *
              </label>
              <div
                data-color-mode="dark"
                className="rounded-xl overflow-hidden border border-slate-700 shadow-inner"
              >
                <MDEditor
                  value={form.contentMarkdown}
                  onChange={(val) => setForm((f) => ({ ...f, contentMarkdown: val || "" }))}
                  height={400}
                  preview="live"
                  className="!bg-slate-950"
                />
              </div>
              {errors.contentMarkdown && (
                <p className="text-[10px] text-red-400 mt-1">{errors.contentMarkdown}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
              <button
                type="button"
                onClick={handleNewModule}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-xs font-semibold rounded-xl transition-all"
              >
                Clear Form
              </button>
              <button
                type="submit"
                disabled={saveMutation.isPending}
                className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/25 transition-all flex items-center gap-2"
              >
                {saveMutation.isPending ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    Saving Module...
                  </>
                ) : (
                  <>
                    <Save className="w-3.5 h-3.5" />
                    {form.id ? "Update Module" : "Create Module"}
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* === RIGHT: YouTube Thumbnail Preview + Module Library === */}
        <div className="space-y-5">

          {/* YouTube Thumbnail Preview */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Eye className="w-3.5 h-3.5 text-red-500" />
              YouTube Video Preview
            </h3>
            {youtubePreviewUrl ? (
              <div className="space-y-2">
                <div className="aspect-video rounded-xl overflow-hidden border border-slate-700 shadow-lg bg-slate-950">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={youtubePreviewUrl}
                    alt="YouTube thumbnail preview"
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-[10px] text-slate-500 text-center">
                  Thumbnail for ID:{" "}
                  <code className="text-indigo-400 font-mono">{form.youtubeId}</code>
                </p>
              </div>
            ) : (
              <div className="aspect-video rounded-xl border border-dashed border-slate-700 bg-slate-950/60 flex flex-col items-center justify-center space-y-2 text-slate-500">
                <Clapperboard className="w-8 h-8 text-slate-700" />
                <p className="text-[11px]">Enter a YouTube ID above to preview</p>
              </div>
            )}
          </div>

          {/* Module Library Panel */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                Module Library
              </h3>

              {/* Track Filter */}
              <div className="relative">
                <select
                  value={selectedTrackId}
                  onChange={(e) => setSelectedTrackId(e.target.value)}
                  className="pl-2 pr-6 py-1 bg-slate-950 border border-slate-800 rounded-lg text-[10px] text-slate-300 focus:outline-none focus:border-indigo-500 appearance-none"
                >
                  <option value="all">All Tracks</option>
                  {tracks.map((t) => (
                    <option key={t.id} value={t.id}>{t.title}</option>
                  ))}
                </select>
                <ChevronDown className="w-3 h-3 text-slate-500 absolute right-1.5 top-1.5 pointer-events-none" />
              </div>
            </div>

            {isLoading ? (
              <div className="py-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Loading modules...</span>
              </div>
            ) : (
              <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
                {filteredTracks.length === 0 ? (
                  <p className="text-xs text-slate-500 text-center py-4">No modules found.</p>
                ) : (
                  filteredTracks.map((track) => (
                    <div key={track.id} className="space-y-1.5">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-indigo-400 px-1 pt-1">
                        {track.title}
                      </p>
                      {track.modules.length === 0 ? (
                        <p className="text-[10px] text-slate-600 italic px-2">No modules yet.</p>
                      ) : (
                        track.modules.map((mod) => (
                          <button
                            key={mod.id}
                            onClick={() => handleEditModule(mod)}
                            className={`w-full p-3 rounded-xl border text-left transition-all group ${
                              form.id === mod.id
                                ? "bg-indigo-950/50 border-indigo-700/60 text-white"
                                : "bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                            }`}
                          >
                            <div className="flex items-start justify-between gap-2">
                              <div className="min-w-0">
                                <span className="block text-[11px] font-bold truncate">
                                  {mod.order}. {mod.title}
                                </span>
                                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                                  {mod.youtubeId && (
                                    <span className="text-[9px] text-red-400 flex items-center gap-0.5">
                                      <Clapperboard className="w-2.5 h-2.5" />
                                      Video
                                    </span>
                                  )}
                                  {mod.isFreePreview && (
                                    <span className="text-[9px] text-emerald-400">Free Preview</span>
                                  )}
                                  {mod.durationMinutes && (
                                    <span className="text-[9px] text-slate-500">{mod.durationMinutes}m</span>
                                  )}
                                </div>
                              </div>
                              <FilePen className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 transition-colors shrink-0 mt-0.5" />
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
