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
    <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-4 shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-[#15803D]" />
          <div>
            <h3 className="text-sm font-extrabold text-[#0F172A]">Faculty Teaching Intelligence &amp; Productivity</h3>
            <p className="text-[10px] text-slate-500">Module completion, SLA compliance, student ratings &amp; research output</p>
          </div>
        </div>
        <span className="px-3 py-1 rounded-full bg-[#FEFCE8] border border-[#D4A017]/30 text-[#D4A017] text-[10px] font-black">
          Productivity Index: {productivityIndex}/100
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200 p-4 space-y-1">
          <span className="text-[9px] font-black text-slate-500 uppercase">Student Satisfaction Rating</span>
          <p className="text-xl font-extrabold text-[#D4A017] flex items-center gap-1">
            <Star className="w-4 h-4 fill-[#D4A017]" /> {facultyData.avgStudentRating} / 5.0
          </p>
          <p className="text-[9px] text-[#15803D] font-bold">+0.2 vs Faculty Baseline</p>
        </div>

        <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200 p-4 space-y-1">
          <span className="text-[9px] font-black text-slate-500 uppercase">PR Grading Turnaround SLA</span>
          <p className="text-xl font-extrabold text-[#15803D]">{facultyData.onTimeGradingPercentage}%</p>
          <p className="text-[9px] text-slate-500">Avg 2.4 hours response</p>
        </div>

        <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200 p-4 space-y-1">
          <span className="text-[9px] font-black text-slate-500 uppercase">Published Lessons</span>
          <p className="text-xl font-extrabold text-[#0F172A]">{facultyData.publishedLessonsCount}</p>
          <p className="text-[9px] text-slate-500">Across 3 Active Modules</p>
        </div>

        <div className="rounded-2xl bg-[#F8FAFC] border border-slate-200 p-4 space-y-1">
          <span className="text-[9px] font-black text-slate-500 uppercase">Active Research Projects</span>
          <p className="text-xl font-extrabold text-[#0F172A]">{facultyData.researchCount}</p>
          <p className="text-[9px] text-[#15803D] font-bold">Pan-African AI Labs</p>
        </div>
      </div>
    </div>
  );
}
