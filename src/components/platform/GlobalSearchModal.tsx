"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, X, ChevronRight, Sparkles, Command } from "lucide-react";
import { GlobalSearchService } from "@/lib/institutionOS/SearchService";
import { SearchResultItem } from "@/types/institutionOS";

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function GlobalSearchModal({ isOpen, onClose }: GlobalSearchModalProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [results, setResults] = useState<SearchResultItem[]>([]);

  useEffect(() => {
    if (query.trim().length > 0) {
      setResults(GlobalSearchService.search(query, selectedCategory as any));
    } else {
      setResults([]);
    }
  }, [query, selectedCategory]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const categories = GlobalSearchService.getCategories();

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#030e1f]/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative max-w-2xl mx-auto bg-[#061428] border border-[#d4a017]/40 rounded-3xl shadow-2xl text-[#f0f4ff] overflow-hidden animate-fadeInUp">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#1a2f4a] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#d4a017] shrink-0" />
          <input
            type="search"
            autoFocus
            placeholder="Search students, faculty, courses, research, certificates, policies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-white placeholder-[#8899b4] focus:outline-none"
          />
          <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-[#030e1f] border border-[#1a2f4a] text-[10px] font-mono text-[#8899b4]">
            <Command className="w-3 h-3" /> K
          </kbd>
          <button
            onClick={onClose}
            className="p-1 rounded-xl text-[#8899b4] hover:text-white hover:bg-[#0f223d]"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Pills */}
        <div className="px-4 py-3 border-b border-[#1a2f4a] bg-[#030e1f]/50 flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-xl text-[10px] font-black border whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-[#d4a017]/15 border-[#d4a017] text-[#d4a017]"
                  : "bg-[#061428] border-[#1a2f4a] text-[#8899b4] hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="p-4 max-h-96 overflow-y-auto space-y-2 custom-scrollbar">
          {query.trim().length === 0 ? (
            <div className="py-12 text-center space-y-2">
              <Sparkles className="w-8 h-8 text-[#d4a017] mx-auto animate-pulse" />
              <p className="text-xs font-extrabold text-white">Global Institutional Search Engine</p>
              <p className="text-[10px] text-[#8899b4]">Type a name, course title, certificate hash, or policy name to search.</p>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center text-[#8899b4] text-xs">
              No institutional assets found matching &ldquo;{query}&rdquo;.
            </div>
          ) : (
            results.map((r) => (
              <Link
                key={r.id}
                href={r.url}
                onClick={onClose}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-[#030e1f] border border-[#1a2f4a] hover:border-[#d4a017]/40 hover:bg-[#0f223d]/60 transition-all group"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#d4a017]/15 text-[#d4a017] text-[8px] font-black uppercase">
                      {r.category}
                    </span>
                    <h4 className="text-xs font-extrabold text-white group-hover:text-[#d4a017] transition-colors">{r.title}</h4>
                  </div>
                  <p className="text-[10px] text-[#8899b4] mt-0.5">{r.subtitle}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#8899b4] group-hover:text-[#d4a017] transition-colors shrink-0" />
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
