/**
 * TranscriptService.ts
 * InstitutionOS Core Service — Official Digital Transcript Generation Engine
 */

export interface DigitalTranscriptData {
  transcriptId: string;
  studentId: string;
  studentName: string;
  programmeTitle: string;
  cohortName: string;
  overallProgress: number;
  gpaEquivalent: number; // 4.0 Scale
  completionPercentage: number;
  issueDate: string;
  verificationCode: string;
  modulesCompleted: Array<{ code: string; title: string; credits: number; grade: string; score: number }>;
  competenciesSummary: Array<{ name: string; score: number; level: string }>;
  facultyRemarks: string;
}

const mockTranscript: DigitalTranscriptData = {
  transcriptId: "TRX-2026-9041",
  studentId: "std_01",
  studentName: "Kofi Asante",
  programmeTitle: "Full-Stack Software Engineering (DLX)",
  cohortName: "Cohort Alpha (2026)",
  overallProgress: 94,
  gpaEquivalent: 3.92,
  completionPercentage: 88,
  issueDate: "August 04, 2026",
  verificationCode: "DTA-VERIFY-9041-XYZ",
  modulesCompleted: [
    { code: "MOD-101", title: "HTML5, Vanilla CSS & Modern Responsive Web Design", credits: 10, grade: "A", score: 95 },
    { code: "MOD-102", title: "JavaScript Core, Async Execution & DOM Manipulation", credits: 15, grade: "A", score: 92 },
    { code: "MOD-103", title: "React.js State Architecture, Hooks & Component Styling", credits: 15, grade: "A", score: 94 },
    { code: "MOD-104", title: "TypeScript Foundations, Generics & Utility Types", credits: 10, grade: "A-", score: 88 },
    { code: "MOD-105", title: "Next.js App Router, SSR & API Integrations", credits: 10, grade: "A", score: 96 },
  ],
  competenciesSummary: [
    { name: "Programming & Syntax", score: 92, level: "Advanced" },
    { name: "Problem Solving", score: 88, level: "Advanced" },
    { name: "Collaboration & Git", score: 98, level: "Expert" },
    { name: "Software Design", score: 82, level: "Proficient" },
  ],
  facultyRemarks: "Kofi has demonstrated exceptional academic rigor, outstanding PR submission quality, and active leadership in peer code reviews.",
};

export class TranscriptService {
  public static getTranscriptForStudent(studentId: string): DigitalTranscriptData {
    return { ...mockTranscript, studentId };
  }
}
