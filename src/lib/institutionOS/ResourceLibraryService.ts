import { ResourceItem } from "@/types/institutionOS";

const resources: ResourceItem[] = [
  { id: "RES-101", title: "Full-Stack Software Engineering Curriculum Guide v3.0", category: "Academic Resources", type: "PDF Document", size: "2.8 MB", updated: "1 week ago", url: "#", tags: ["React", "TypeScript", "Next.js"], version: "v3.0" },
  { id: "RES-102", title: "DWSA Academic Operations & Faculty Governance Code", category: "Policies", type: "PDF Document", size: "1.4 MB", updated: "2 weeks ago", url: "#", tags: ["Governance", "Ethics", "Faculty"], version: "v2.1" },
  { id: "RES-103", title: "LLM Fine-Tuning in Low-Resource Languages Paper", category: "Research Papers", type: "Research Paper", size: "3.2 MB", updated: "3 days ago", url: "#", tags: ["AI", "NLP", "Research"], version: "v1.0" },
  { id: "RES-104", title: "GitHub PR Assessment Rubric & Competency Framework", category: "Faculty Resources", type: "Guide", size: "840 KB", updated: "1 month ago", url: "#", tags: ["Rubric", "Grading", "GitHub"], version: "v1.5" },
];

export class ResourceLibraryService {
  public static getResources(categoryFilter?: string): ResourceItem[] {
    if (!categoryFilter || categoryFilter === "All") return [...resources];
    return resources.filter((r) => r.category === categoryFilter);
  }

  public static getCategories(): string[] {
    return ["All", "Academic Resources", "Faculty Resources", "Research Papers", "Policies"];
  }
}
