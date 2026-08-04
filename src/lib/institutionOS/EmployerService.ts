/**
 * EmployerService.ts
 * InstitutionOS Core Service — Employer Portal & Recruitment Analytics Engine
 */

export interface CandidateProfile {
  id: string;
  studentName: string;
  programme: string;
  gpaEquivalent: number;
  readinessScore: number;
  topSkills: string[];
  verificationCode: string;
  status: "Available" | "Interview Scheduled" | "Hired";
}

const mockCandidates: CandidateProfile[] = [
  { id: "CAN-1", studentName: "Kofi Asante", programme: "Full-Stack Software Engineering (DLX)", gpaEquivalent: 3.92, readinessScore: 94, topSkills: ["React", "TypeScript", "Next.js", "Node.js"], verificationCode: "DTA-VERIFY-9041-XYZ", status: "Available" },
  { id: "CAN-2", studentName: "Aisha Ibrahim", programme: "Full-Stack Software Engineering (DLX)", gpaEquivalent: 3.85, readinessScore: 92, topSkills: ["React", "TailwindCSS", "PostgreSQL"], verificationCode: "DTA-VERIFY-8802", status: "Available" },
  { id: "CAN-3", studentName: "Zainab Al-Mansoor", programme: "AI & Data Engineering Track", gpaEquivalent: 3.96, readinessScore: 95, topSkills: ["Python", "PyTorch", "LLMs", "Data Pipelines"], verificationCode: "DTA-VERIFY-8804", status: "Interview Scheduled" },
  { id: "CAN-4", studentName: "Emeka Nwosu", programme: "Blockchain & Smart Contract Architecture", gpaEquivalent: 3.88, readinessScore: 90, topSkills: ["Solidity", "TypeScript", "Web3.js"], verificationCode: "DTA-VERIFY-8805", status: "Hired" },
];

export class EmployerService {
  public static getCandidates(): CandidateProfile[] {
    return [...mockCandidates];
  }

  public static getRecruitmentStats() {
    return {
      totalCandidatesAvailable: mockCandidates.length,
      avgReadinessScore: 92.7,
      interviewsCompleted: 14,
      offersAccepted: 6,
    };
  }
}
