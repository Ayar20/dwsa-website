"use client";

import React from "react";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import { BookOpen, FileText, ArrowRight, TrendingUp, Cpu, ShieldCheck } from "lucide-react";

export default function KnowledgeHubPage() {
  const articles = [
    {
      type: "TECHNOLOGY INSIGHT",
      title: "The AI Shift: How African Developers Leverage LLMs for Production Apps",
      date: "August 2026",
      readTime: "6 min read",
      author: "DTA Engineering Faculty",
      desc: "Analyzing how modern prompt engineering and AI assistants accelerate full-stack development cycles in emerging markets, allowing zero-experience developers to build enterprise features in 8 weeks.",
      tagColor: "text-[#d4a017] bg-[#d4a017]/10 border-[#d4a017]/30",
    },
    {
      type: "RESEARCH BRIEF",
      title: "Blockchain & Digital Trust Infrastructure in African Enterprise",
      date: "July 2026",
      readTime: "8 min read",
      author: "Innovation & Research Centre (IRC)",
      desc: "Examining distributed ledger technology applications in land registry, trade settlement, identity verification, and supply chain auditability across sub-Saharan Africa.",
      tagColor: "text-[#d4a017] bg-[#d4a017]/10 border-[#d4a017]/30",
    },
    {
      type: "CASE STUDY",
      title: "Automating Software Evaluation: The DWSA GitHub PR Grading System",
      date: "June 2026",
      readTime: "5 min read",
      author: "DTA Software Engineering Lab",
      desc: "How automated continuous integration, REST APIs, and instructor review desks combine to evaluate over 500+ student pull requests per month with strict industry code standards.",
      tagColor: "text-[#4ade80] bg-[#4ade80]/10 border-[#4ade80]/30",
    },
    {
      type: "WHITE PAPER",
      title: "Bridging the Tech Skills Gap: Experiential Education vs Traditional Academia",
      date: "May 2026",
      readTime: "12 min read",
      author: "DWSA Thought Leadership Group",
      desc: "A strategic analysis of curriculum latency in African universities and how project-first digital academies create job-ready software engineering capability.",
      tagColor: "text-white bg-white/10 border-white/30",
    },
  ];

  return (
    <div className="min-h-screen bg-[#030e1f] text-[#f0f4ff] flex flex-col font-sans">
      <PublicNav />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017] text-xs font-bold">
            <BookOpen className="w-3.5 h-3.5" />
            THOUGHT LEADERSHIP &amp; INSIGHTS
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Knowledge <span className="text-[#d4a017]">Hub</span>
          </h1>
          <p className="text-[#8899b4] text-base leading-relaxed">
            DTA&apos;s knowledge-sharing platform for white papers, research briefs, technology insights, and regional digital transformation reports.
          </p>
        </div>

        {/* Featured Report Box: Annual State of Digital Africa */}
        <div className="bg-gradient-to-br from-[#061428] via-[#0a1e3a] to-[#061428] border-2 border-[#d4a017] rounded-3xl p-8 sm:p-12 space-y-4 shadow-xl relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#d4a017]/20 text-[#d4a017] text-xs font-extrabold rounded-full border border-[#d4a017]/40 uppercase tracking-wider">
            FLAGSHIP PUBLICATION · COMING SOON
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white">
            Annual State of Digital Africa Report (2026 Edition)
          </h2>

          <p className="text-sm text-[#c8d8f0] leading-relaxed max-w-3xl">
            A comprehensive institutional survey mapping tech talent availability, AI adoption metrics, cloud infrastructure growth, and software engineering salaries across sub-Saharan Africa. Published annually by Digital World Systems Africa Ltd.
          </p>

          <div className="pt-2">
            <span className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#030e1f] border border-[#d4a017]/40 text-[#d4a017] font-bold text-xs">
              Publication Release Date: Q4 2026 (Pre-Registration Open Soon)
            </span>
          </div>
        </div>

        {/* Articles List */}
        <div className="space-y-6">
          <div className="border-b border-[#d4a017]/20 pb-3">
            <h2 className="text-2xl font-extrabold text-white">Articles &amp; Research Briefs</h2>
            <p className="text-xs text-[#8899b4]">Insights written by DTA engineering leads, researchers &amp; faculty</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {articles.map((item) => (
              <div key={item.title} className="p-7 bg-[#061428] border border-slate-800 rounded-3xl space-y-4 hover:border-[#d4a017]/40 transition-all flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 flex-wrap text-xs text-[#8899b4]">
                    <span className={`text-[10px] font-extrabold px-3 py-0.5 rounded-full border uppercase tracking-wider ${item.tagColor}`}>
                      {item.type}
                    </span>
                    <span>{item.date} • {item.readTime}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white leading-snug">{item.title}</h3>
                  <p className="text-xs text-[#8899b4] leading-relaxed">{item.desc}</p>
                </div>
                <div className="pt-2 border-t border-slate-800 flex justify-between items-center text-xs">
                  <span className="text-[#d4a017] font-semibold">Author: {item.author}</span>
                  <span className="text-[#d4a017] font-bold flex items-center gap-1">Read Article <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" /></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Taxonomy / Categories */}
        <div className="space-y-4 pt-2">
          <span className="text-[10px] font-extrabold text-[#d4a017]/70 uppercase tracking-widest block text-center">FUTURE KNOWLEDGE TAXONOMY</span>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
            {[
              "🎓 Digital Technology Academy",
              "💻 Enterprise Technology",
              "🤝 Technology Consulting",
              "🔬 Research & Innovation",
              "🧠 Artificial Intelligence",
              "⛓ Blockchain Technology",
              "🚀 InstitutionOS",
            ].map((cat) => (
              <span key={cat} className="px-3.5 py-1.5 rounded-full bg-[#061428] border border-slate-700 text-slate-300 font-semibold hover:border-[#d4a017] transition-all">
                {cat}
              </span>
            ))}
          </div>
        </div>

        {/* From Across DWSA Section */}
        <div className="bg-[#020914] border border-[#d4a017]/30 rounded-3xl p-8 sm:p-12 space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-extrabold text-[#d4a017] uppercase tracking-wider">ECOSYSTEM SYNDICATION</span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              From Across <span className="text-[#d4a017]">DWSA</span>
            </h2>
            <p className="text-xs text-[#8899b4]">Cross-pillar updates, product announcements &amp; enterprise technology research</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-[#061428] border border-slate-800 rounded-2xl space-y-3">
              <span className="text-[10px] font-bold text-[#d4a017] uppercase bg-[#d4a017]/10 px-2 py-0.5 rounded-full border border-[#d4a017]/30">Corporate News</span>
              <h4 className="text-sm font-bold text-white">DWSA Expands EnterpriseOS Deployment Across Sub-Saharan Africa</h4>
              <p className="text-xs text-[#8899b4]">Announcing multi-sector ERP rollouts for financial, educational, and hospitality institutions.</p>
              <span className="text-[10px] text-slate-400 block pt-1">Coming Soon • DWSA Newsroom</span>
            </div>

            <div className="p-6 bg-[#061428] border border-slate-800 rounded-2xl space-y-3">
              <span className="text-[10px] font-bold text-[#d4a017] uppercase bg-[#d4a017]/10 px-2 py-0.5 rounded-full border border-[#d4a017]/30">Research Update</span>
              <h4 className="text-sm font-bold text-white">Zero-Knowledge Identity Verification for African Land Registry</h4>
              <p className="text-xs text-[#8899b4]">A white paper detailing cryptographic land title verification protocols developed by DWSA Research.</p>
              <span className="text-[10px] text-slate-400 block pt-1">Coming Soon • DWSA R&amp;D</span>
            </div>

            <div className="p-6 bg-[#061428] border border-slate-800 rounded-2xl space-y-3">
              <span className="text-[10px] font-bold text-[#4ade80] uppercase bg-[#4ade80]/10 px-2 py-0.5 rounded-full border border-[#4ade80]/30">Consulting Insight</span>
              <h4 className="text-sm font-bold text-white">Digital Transformation Roadmaps for Government Agencies</h4>
              <p className="text-xs text-[#8899b4]">Best practices for cloud adoption, NDPR compliance, and legacy system modernization in public sector.</p>
              <span className="text-[10px] text-slate-400 block pt-1">Coming Soon • DWSA Consulting</span>
            </div>
          </div>
        </div>

      </main>

      <PublicFooter />
    </div>
  );
}
