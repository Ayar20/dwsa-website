"use client";

import React from "react";
import Link from "next/link";
import PublicNav from "@/components/PublicNav";
import PublicFooter from "@/components/PublicFooter";
import { Building2, Cpu, ShieldCheck, Code2, TrendingUp, Zap, Lightbulb, Compass, ArrowRight } from "lucide-react";

export default function SchoolsPage() {
  const schools = [
    {
      title: "School of Artificial Intelligence",
      desc: "Deep learning, Natural Language Processing, Computer Vision, Autonomous Agents, and Enterprise Generative AI Architectures.",
      badge: "Future Academic Expansion",
      icon: Cpu,
    },
    {
      title: "School of Blockchain & Digital Trust",
      desc: "Distributed Ledger Technology, Smart Contract Auditing, Cryptographic Systems, Zero-Knowledge Proofs, and Web3 Protocols.",
      badge: "Future Academic Expansion",
      icon: ShieldCheck,
    },
    {
      title: "School of Software Engineering",
      desc: "Advanced Full-Stack Engineering, Cloud-Native Architectures, Microservices, Systems Programming, and High-Scale Systems.",
      badge: "Future Academic Expansion",
      icon: Code2,
    },
    {
      title: "School of Cybersecurity",
      desc: "Offensive & Defensive Security, Threat Intelligence, Network Infrastructure Defense, Ethical Hacking, and Regulatory Compliance.",
      badge: "Future Academic Expansion",
      icon: ShieldCheck,
    },
    {
      title: "School of Data Intelligence",
      desc: "Big Data Pipelines, Predictive Analytics, Data Engineering, Spatial Data Analysis, and Decision Science for African Enterprises.",
      badge: "Future Academic Expansion",
      icon: TrendingUp,
    },
    {
      title: "School of Emerging Technologies",
      desc: "Internet of Things (IoT), Edge Computing, Robotics, Spatial Computing, and Frontier Technological Innovation.",
      badge: "Future Academic Expansion",
      icon: Zap,
    },
  ];

  const centres = [
    {
      title: "Innovation & Research Centre (IRC)",
      desc: "DTA's focal point for applied AI research, student innovation challenges, annual hackathons, and technology showcases.",
      status: "Active Pillar",
      statusColor: "text-[#4ade80] bg-[#4ade80]/10 border-[#4ade80]/30",
    },
    {
      title: "Centre for Digital Transformation",
      desc: "Strategic advisory and executive capability development for African enterprises, government agencies, and educational institutions.",
      status: "Future Initiative",
      statusColor: "text-[#d4a017] bg-[#d4a017]/10 border-[#d4a017]/30",
    },
    {
      title: "Centre for Responsible Artificial Intelligence",
      desc: "Formulating ethical AI governance frameworks, data privacy standards, and algorithmic fairness guidelines for African AI deployment.",
      status: "Future Initiative",
      statusColor: "text-[#d4a017] bg-[#d4a017]/10 border-[#d4a017]/30",
    },
    {
      title: "Centre for Technology Entrepreneurship",
      desc: "Incubating student technical startups, providing MVP development support, seed mentorship, and access to venture networks.",
      status: "Future Initiative",
      statusColor: "text-[#4ade80] bg-[#4ade80]/10 border-[#4ade80]/30",
    },
  ];

  return (
    <div className="min-h-screen bg-[#030e1f] text-[#f0f4ff] flex flex-col font-sans">
      <PublicNav />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-14 space-y-14">
        
        {/* Header */}
        <div className="text-center space-y-4 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017] text-xs font-bold">
            <Building2 className="w-3.5 h-3.5" aria-hidden="true" />
            INSTITUTIONAL ARCHITECTURE
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            Schools &amp; <span className="text-[#d4a017]">Centres</span>
          </h1>
          <p className="text-xs sm:text-sm font-bold text-[#d4a017]/70 uppercase tracking-widest">
            PLANNED ACADEMIC EXPANSION
          </p>
          <p className="text-[#8899b4] text-base leading-relaxed">
            As DWSA expands its institutional footprint, the Digital Technology Academy is structured to launch dedicated academic schools and specialized research centres to cultivate technical leadership across Africa.
          </p>

          <div className="p-4 bg-[#061428] border border-amber-500/30 rounded-xl text-xs text-amber-300 max-w-2xl mx-auto">
            📌 <strong>Institutional Note:</strong> Cards labeled <em>Future Academic Expansion</em> represent DTA&apos;s long-term academic roadmap and are planned for future deployment. Current active programmes are available under <Link href="/programmes" className="underline font-bold text-white">Programmes &amp; Bootcamps</Link>.
          </div>
        </div>

        {/* Schools Section */}
        <div className="space-y-6">
          <div className="border-b border-[#d4a017]/20 pb-3">
            <h2 className="text-2xl font-extrabold text-white">Academic Schools</h2>
            <p className="text-xs text-[#8899b4]">Future degree &amp; diploma granting academic faculties</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schools.map((school) => {
              const Icon = school.icon;
              return (
                <div
                  key={school.title}
                  className="p-7 bg-[#061428] border border-[#d4a017]/25 rounded-3xl space-y-4 hover:border-[#d4a017]/60 transition-all hover:shadow-xl hover:shadow-[#d4a017]/10 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-3 bg-[#d4a017]/10 text-[#d4a017] rounded-xl border border-[#d4a017]/30">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[9px] font-extrabold text-[#8899b4] bg-[#0f223d] border border-slate-700 px-3 py-1 rounded-full uppercase tracking-wider">
                        {school.badge}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white">{school.title}</h3>
                    <p className="text-xs text-[#8899b4] leading-relaxed">{school.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Centres Section */}
        <div className="space-y-6 pt-6">
          <div className="border-b border-[#d4a017]/20 pb-3">
            <h2 className="text-2xl font-extrabold text-white">Specialized Research &amp; Innovation Centres</h2>
            <p className="text-xs text-[#8899b4]">Focused institutional hubs driving research, enterprise transformation, and ethics</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {centres.map((centre) => (
              <div key={centre.title} className="p-7 bg-[#061428] border border-slate-800 rounded-3xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border uppercase tracking-wider ${centre.statusColor}`}>
                    {centre.status}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white">{centre.title}</h3>
                <p className="text-xs text-[#8899b4] leading-relaxed">{centre.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-[#020914] border border-[#d4a017]/30 rounded-3xl p-8 text-center space-y-4">
          <h3 className="text-xl font-bold text-white">Explore Current Active Programmes</h3>
          <p className="text-xs text-[#8899b4]">Enrolling for 8-Week AI Coding Academy Cohort 2026</p>
          <div className="pt-2">
            <Link href="/admissions" className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#4ade80] to-[#22c55e] text-[#030e1f] font-extrabold text-xs shadow-lg shadow-[#4ade80]/20">
              Apply for Current Cohort →
            </Link>
          </div>
        </div>

      </main>

      <PublicFooter />
    </div>
  );
}
