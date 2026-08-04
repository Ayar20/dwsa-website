/**
 * KnowledgeService.ts
 * InstitutionOS Automation — Institutional Knowledge Repository Engine
 */

export type KnowledgeCategory =
  | "Policy" | "Procedure" | "Template" | "Guideline"
  | "Research" | "Teaching Resource" | "Operational Manual";

export interface KnowledgeArticle {
  id: string;
  category: KnowledgeCategory;
  title: string;
  description: string;
  author: string;
  version: string;
  status: "Approved" | "Under Review" | "Draft";
  lastUpdated: string;
  tags: string[];
}

const mockArticles: KnowledgeArticle[] = [
  { id: "KB-101", category: "Policy", title: "Student Code of Conduct & Academic Integrity Policy v2.1", description: "Governing rules for academic behaviour, plagiarism, attendance, and disciplinary procedures.", author: "Office of the Registrar", version: "2.1", status: "Approved", lastUpdated: "Jun 15, 2026", tags: ["conduct", "integrity", "policy"] },
  { id: "KB-102", category: "Procedure", title: "GitHub PR Submission & Grading Standard Operating Procedure", description: "Step-by-step guide for submitting assignments via GitHub PRs and the instructor grading rubric.", author: "Faculty Senate", version: "1.4", status: "Approved", lastUpdated: "Jul 01, 2026", tags: ["github", "grading", "assessment"] },
  { id: "KB-103", category: "Template", title: "Corporate Partnership MOU Template — Standard Edition", description: "Pre-approved Memorandum of Understanding template for corporate sponsorships and placement agreements.", author: "Legal Office", version: "3.0", status: "Approved", lastUpdated: "May 20, 2026", tags: ["MOU", "template", "partnership"] },
  { id: "KB-104", category: "Research", title: "AI-Assisted Adaptive Learning Study — Phase 1 Findings", description: "Preliminary outcomes from the DTA AI tutoring pilot across 3 cohorts.", author: "Research Office", version: "1.0", status: "Under Review", lastUpdated: "Aug 01, 2026", tags: ["AI", "learning", "research"] },
  { id: "KB-105", category: "Operational Manual", title: "InstitutionOS Administrator Operations Manual v1.0", description: "Comprehensive guide for ICC administrators to manage the DTA Digital Campus.", author: "Operations Office", version: "1.0", status: "Approved", lastUpdated: "Aug 04, 2026", tags: ["admin", "operations", "manual"] },
];

export class KnowledgeService {
  private static articles: KnowledgeArticle[] = [...mockArticles];

  public static getAll(): KnowledgeArticle[] {
    return [...this.articles];
  }

  public static search(query: string): KnowledgeArticle[] {
    const q = query.toLowerCase();
    return this.articles.filter(
      (a) => a.title.toLowerCase().includes(q) || a.tags.some((t) => t.includes(q))
    );
  }
}
