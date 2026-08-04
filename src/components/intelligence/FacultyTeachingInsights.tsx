"use client";

import React from "react";
import { GraduationCap, Star, Clock, CheckCircle2, TrendingUp, Sparkles, BarChart3 } from "lucide-react";
import { AnalyticsEngine, FacultyAnalyticsData } from "@/lib/institutionOS/AnalyticsEngine";

interface FacultyTeachingInsightsProps {
  facultyData?: FacultyAnalyticsData;
}

const defaultFacultyData: FacultyAnalyticsData = {
  modulesTaught: 3,
  totalStudents: 120,
  avgStudentRating: 4.9,
  onTimeGradingPercentage: 98,
  publishedLessonsCount: 14,
  researchCount: 2,
};

export default function FacultyTeachingInsights({ facultyData = defaultFacultyData }: FacultyTeachingInsightsProps) {
  const productivityIndex = AnalyticsEngine.calculateFacultyPerformance(facultyData);

  return (
    <div className="rounded-3xl bg-[#061428] border border-[#1a2f4a] p-6 space-y-4 shadow-xl">
      <div className="flex items-center justify-between border-b border-[#1a2f4a] pb-3">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-[#d4a017]" />
          <div>
            <h3 className="text-sm font-extrabold text-white">Faculty Teaching Intelligence &amp; Productivity</h3>
            <p className="text-[10px] text-[#8899b4]">Module completion, SLA compliance, student ratings &amp; research output</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#d4a017]/10 border border-[#d4a017]/30 text-[#d4a017] text-[10px] font-black">
          Productivity Index: {productivityIndex}/100
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-2xl bg-[#030e1f] border border-[#1a2f4a] p-4 space-y-1">
          <span className="text-[9px] font-black text-[#8899b4] uppercase">Student Satisfaction Rating</span>
          <p className="text-xl font-extrabold text-[#d4a017] flex items-center gap-1">
            <Star className="w-4 h-4 fill-[#d4a017]" /> {facultyData.avgStudentRating} / 5.0
          </p>
          <p className="text-[9px] text-[#4ade80]">+0.2 vs Faculty Baseline</p>
        </div>

        <div className="rounded-2xl bg-[#030e1f] border border-[#1a2f4a] p-4 space-y-1">
          <span className="text-[9px] font-black text-[#8899b4] uppercase">PR Grading Turnaround SLA</span>
          <p className="text-xl font-extrabold text-[#4ade80]">{facultyData.onTimeGradingPercentage}%</p>
          <p className="text-[9px] text-[#8899b4]">Avg 2.4 hours response</p>
        </div>

        <div className="rounded-2xl bg-[#030e1f] border border-[#1a2f4a] p-4 space-y-1">
          <span className="text-[9px] font-black text-[#8899b4] uppercase">Published Lessons</span>
          <p className="text-xl font-extrabold text-white">{facultyData.publishedLessonsCount}</p>
          <p className="text-[9px] text-[#8899b4]">Across 3 Active Modules</p>
        </div>

        <div className="rounded-2xl bg-[#030e1f] border border-[#1a2f4a] p-4 space-y-1">
          <span className="text-[9px] font-black text-[#8899b4] uppercase">Active Research Projects</span>
          <p className="text-xl font-extrabold text-[#818cf8]">{facultyData.researchCount}</p>
          <p className="text-[9px] text-[#8899b4]">DWSA Innovation Labs</p>
        </div>
      </div>
    </div>
  );
}
