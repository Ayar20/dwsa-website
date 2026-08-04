/**
 * RecommendationService.ts
 * InstitutionOS AI Operating Layer — Role-Specific Intelligent Recommendation Engine
 */

export interface AIRecommendation {
  id: string;
  role: "Student" | "Faculty" | "Admin";
  title: string;
  description: string;
  actionUrl: string;
  priority: "High" | "Medium" | "Low";
  impactScore: number;
}

const mockRecommendations: AIRecommendation[] = [
  { id: "REC-01", role: "Student", title: "Complete Capstone Project Submission", description: "Completing your AgriChain project will increase your employer match score from 88% to 94%.", actionUrl: "/dashboard/student/innovation-marketplace", priority: "High", impactScore: 94 },
  { id: "REC-02", role: "Student", title: "Review TypeScript Generics Module", description: "AI detected a potential learning gap in async generics based on your recent PR submission.", actionUrl: "/dashboard/student/programme", priority: "Medium", impactScore: 82 },
  { id: "REC-03", role: "Faculty", title: "Grade 5 Pending PR Assessments", description: "Reviewing Cohort Alpha's PRs today maintains your 98% On-Time Grading SLA score.", actionUrl: "/dashboard/instructor/github-reviews", priority: "High", impactScore: 98 },
  { id: "REC-04", role: "Admin", title: "Approve Flutterwave Partnership MOU", description: "Finalizing agreement WF-1002 unlocks 12 new internship placements for Cohort Alpha.", actionUrl: "/dashboard/admin/approvals", priority: "High", impactScore: 96 },
];

export class RecommendationService {
  public static getRecommendationsForRole(role: "Student" | "Faculty" | "Admin"): AIRecommendation[] {
    return mockRecommendations.filter((r) => r.role === role);
  }
}
