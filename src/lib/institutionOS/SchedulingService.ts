/**
 * SchedulingService.ts
 * InstitutionOS Automation — Smart Academic & Operational Scheduling Engine
 */

export type ScheduleItemType = "LiveSession" | "Assessment" | "MentorSession" | "CorporateEvent" | "Hackathon" | "ResourceBooking";

export interface ScheduleItem {
  id: string;
  type: ScheduleItemType;
  title: string;
  organiser: string;
  participants: string;
  startTime: string;
  endTime: string;
  venue: string;
  hasConflict: boolean;
  status: "Confirmed" | "Tentative" | "Cancelled";
}

const mockSchedule: ScheduleItem[] = [
  { id: "SCH-101", type: "LiveSession", title: "React 18 App Router Deep Dive — Module 5", organiser: "Dr. Olumide Adeleke", participants: "Cohort Alpha (32 students)", startTime: "Aug 06, 2026 14:00 WAT", endTime: "Aug 06, 2026 16:00 WAT", venue: "Virtual — Zoom Room A", hasConflict: false, status: "Confirmed" },
  { id: "SCH-102", type: "Assessment", title: "TypeScript Generics & Utility Types — Module 4 Final Assessment", organiser: "Academic Office", participants: "Cohort Alpha", startTime: "Aug 08, 2026 10:00 WAT", endTime: "Aug 08, 2026 12:00 WAT", venue: "DTA Online Assessment Platform", hasConflict: false, status: "Confirmed" },
  { id: "SCH-103", type: "MentorSession", title: "Portfolio Architecture Review — Kofi Asante", organiser: "David Okonjo (Mentor)", participants: "Kofi Asante", startTime: "Aug 09, 2026 11:00 WAT", endTime: "Aug 09, 2026 12:00 WAT", venue: "Google Meet", hasConflict: false, status: "Confirmed" },
  { id: "SCH-104", type: "CorporateEvent", title: "MTN Group Campus Recruitment Briefing", organiser: "Career Placement Office", participants: "Final Cohort Students (16)", startTime: "Aug 12, 2026 15:00 WAT", endTime: "Aug 12, 2026 17:00 WAT", venue: "DWSA Lagos HQ — Board Room", hasConflict: true, status: "Tentative" },
  { id: "SCH-105", type: "Hackathon", title: "DTA Global Hackathon 2026 Kick-Off", organiser: "Innovation Lab", participants: "All Active Students (84 registered)", startTime: "Aug 18, 2026 09:00 WAT", endTime: "Aug 20, 2026 09:00 WAT", venue: "Virtual + Lagos HQ", hasConflict: false, status: "Confirmed" },
];

export class SchedulingService {
  private static schedule: ScheduleItem[] = [...mockSchedule];

  public static getSchedule(): ScheduleItem[] {
    return [...this.schedule];
  }

  public static getConflicts(): ScheduleItem[] {
    return this.schedule.filter((s) => s.hasConflict);
  }
}
