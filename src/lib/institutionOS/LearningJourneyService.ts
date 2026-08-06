export interface LearningMilestone {
  id: string;
  title: string;
  targetCompetency: string;
  status: "COMPLETED" | "IN_PROGRESS" | "UPCOMING";
  targetDate: string;
}

export interface LearningJourneyRoadmap {
  learnerId: string;
  targetRole: string;
  currentMaturity: string;
  completionPercent: number;
  milestones: LearningMilestone[];
  aiRecommendedNextAction: string;
}

export class LearningJourneyService {
  static getJourneyRoadmap(learnerId: string): LearningJourneyRoadmap {
    return {
      learnerId,
      targetRole: "AI Engineer",
      currentMaturity: "Proficient",
      completionPercent: 78,
      milestones: [
        { id: "m-1", title: "Master React & TypeScript Architecture", targetCompetency: "TypeScript & React Architecture", status: "COMPLETED", targetDate: "2026-06-15" },
        { id: "m-2", title: "Build Autonomous Multi-Agent Workflows", targetCompetency: "AI Agent Orchestration", status: "COMPLETED", targetDate: "2026-07-20" },
        { id: "m-3", title: "Deploy RAG Vector Store & Knowledge Graphs", targetCompetency: "AI Skills", status: "IN_PROGRESS", targetDate: "2026-08-30" },
        { id: "m-4", title: "Pass InstitutionOS AI Agent Certification Exam", targetCompetency: "AI Skills", status: "UPCOMING", targetDate: "2026-09-30" },
      ],
      aiRecommendedNextAction: "Complete the vector database index optimization module in RAG Studio.",
    };
  }
}
