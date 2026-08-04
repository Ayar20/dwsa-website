/**
 * KnowledgeRetrievalService.ts
 * InstitutionOS AI Operating Layer — Grounding Engine & Vector Knowledge Search
 */

export interface KnowledgeSnippet {
  id: string;
  title: string;
  category: "Policy" | "Curriculum" | "Research" | "Handbook" | "Operations";
  content: string;
  relevanceScore: number;
}

const mockKnowledgeBase: KnowledgeSnippet[] = [
  { id: "KNG-01", title: "DTA Academic Integrity & Code Conduct Policy", category: "Policy", content: "All code submitted via GitHub PRs must be original or appropriately attributed. Automated plagiarism checks run on every submission.", relevanceScore: 0.94 },
  { id: "KNG-02", title: "Full-Stack Web Engineering Curriculum Blueprint 2026", category: "Curriculum", content: "Covers TypeScript, React 18 App Router, Next.js, Node.js, Express, PostgreSQL, Prisma ORM, REST APIs, and Docker containerisation.", relevanceScore: 0.98 },
  { id: "KNG-03", title: "Faculty Grading SLA & Assessment Standard Operating Procedure", category: "Operations", content: "Instructors must evaluate and provide constructive code review feedback on all assigned student PRs within 48 hours of submission.", relevanceScore: 0.91 },
  { id: "KNG-04", title: "DTA Graduate Career & Employer Placement Framework", category: "Handbook", content: "Graduates achieving an overall Competency Score of 85%+ and 100% PR completion qualify for priority placement interviews with employer partners.", relevanceScore: 0.89 },
  { id: "KNG-05", title: "AI-Assisted Adaptive Learning Research Paper 2026", category: "Research", content: "Demonstrates a 24% reduction in student drop-off when personalized AI tutoring prompts are integrated into weekly coding assignments.", relevanceScore: 0.87 },
];

export class KnowledgeRetrievalService {
  public static retrieveRelevantContext(query: string): KnowledgeSnippet[] {
    const q = query.toLowerCase();
    return mockKnowledgeBase.filter(
      (item) => item.title.toLowerCase().includes(q) || item.content.toLowerCase().includes(q)
    );
  }

  public static getAllSnippets(): KnowledgeSnippet[] {
    return [...mockKnowledgeBase];
  }
}
