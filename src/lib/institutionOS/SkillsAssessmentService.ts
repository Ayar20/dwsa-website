export interface SkillAssessmentResult {
  skillId: string;
  skillName: string;
  selfScore: number; // 0-100
  facultyScore: number; // 0-100
  employerScore: number; // 0-100
  aiScore: number; // 0-100
  verifiedScore: number; // 0-100
  gapAnalysis: string;
  assessmentDate: string;
}

export class SkillsAssessmentService {
  static getAssessmentsForLearner(learnerId: string): SkillAssessmentResult[] {
    return [
      { skillId: "sk-001", skillName: "TypeScript & React Architecture", selfScore: 85, facultyScore: 90, employerScore: 88, aiScore: 92, verifiedScore: 89, gapAnalysis: "Proficient — Minor gap in advanced WebAssembly optimization.", assessmentDate: "2026-08-01" },
      { skillId: "sk-002", skillName: "AI Agent Orchestration", selfScore: 80, facultyScore: 85, employerScore: 82, aiScore: 88, verifiedScore: 84, gapAnalysis: "Proficient — Mastered multi-agent loops, exploring custom tool schemas.", assessmentDate: "2026-08-02" },
      { skillId: "sk-003", skillName: "Enterprise System Architecture", selfScore: 70, facultyScore: 78, employerScore: 75, aiScore: 80, verifiedScore: 76, gapAnalysis: "Competent — Recommend further microservice deployment practice.", assessmentDate: "2026-07-28" },
      { skillId: "sk-004", skillName: "Agile Leadership & PR Review", selfScore: 90, facultyScore: 95, employerScore: 92, aiScore: 94, verifiedScore: 93, gapAnalysis: "Expert — Demonstrates top-tier code review and team mentoring.", assessmentDate: "2026-08-03" },
      { skillId: "sk-005", skillName: "Fintech & Payment Integration", selfScore: 82, facultyScore: 88, employerScore: 85, aiScore: 90, verifiedScore: 86, gapAnalysis: "Proficient — Successfully built multi-gateway payout bridges.", assessmentDate: "2026-07-30" },
    ];
  }
}
