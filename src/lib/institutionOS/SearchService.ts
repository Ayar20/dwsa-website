import { SearchResultItem, SearchCategory } from "@/types/institutionOS";

const searchIndex: SearchResultItem[] = [
  { id: "S-1", title: "Kofi Asante", subtitle: "Learner · Cohort Alpha · Full-Stack Software Engineering", category: "Students", url: "/dashboard/admin/students" },
  { id: "S-2", title: "Aisha Ibrahim", subtitle: "Learner · Cohort Beta · Full-Stack Software Engineering", category: "Students", url: "/dashboard/admin/students" },
  { id: "F-1", title: "Dr. Olumide Adeleke", subtitle: "Senior Lead Instructor & Dean · School of Software Engineering", category: "Faculty", url: "/dashboard/instructor/profile" },
  { id: "F-2", title: "Prof. Amina Bello", subtitle: "Professor of Data Science & AI · School of AI & Data", category: "Faculty", url: "/dashboard/admin/faculty" },
  { id: "P-1", title: "Full-Stack Software Engineering (DLX)", subtitle: "24 Weeks · 60 Credits · Active", category: "Programmes", url: "/programmes" },
  { id: "P-2", title: "AI & Data Engineering Track", subtitle: "16 Weeks · 40 Credits · Active", category: "Programmes", url: "/programmes" },
  { id: "P-3", title: "Blockchain & Smart Contract Architecture", subtitle: "12 Weeks · 30 Credits · Enrolling", category: "Programmes", url: "/programmes" },
  { id: "R-1", title: "LLM Fine-Tuning for African Banking Codebases", subtitle: "Lead: Prof. Amina Bello · Active Research", category: "Research", url: "/dashboard/admin/research" },
  { id: "C-1", title: "CERT-2026-8801 — Kofi Asante Diploma", subtitle: "Verified Cryptographic Diploma · Digital Seal Approved", category: "Certificates", url: "/dashboard/admin/certificates" },
  { id: "POL-1", title: "DWSA Academic Operations Manual 2026", subtitle: "Ratified Policy POL-ACAD-01", category: "Policies", url: "/dashboard/admin/governance" },
  { id: "A-1", title: "Week 4 Live Class Schedule Update", subtitle: "Institutional Announcement · Published", category: "Announcements", url: "/dashboard/instructor/announcements" },
];

export class GlobalSearchService {
  public static search(query: string, categoryFilter?: SearchCategory): SearchResultItem[] {
    if (!query || query.trim().length === 0) return [];
    const q = query.toLowerCase().trim();

    return searchIndex.filter((item) => {
      const matchCat = !categoryFilter || categoryFilter === "All" as any || item.category === categoryFilter;
      const matchText = item.title.toLowerCase().includes(q) || item.subtitle.toLowerCase().includes(q);
      return matchCat && matchText;
    });
  }

  public static getCategories(): string[] {
    return [
      "All",
      "Students",
      "Faculty",
      "Programmes",
      "Research",
      "Certificates",
      "Policies",
      "Announcements",
    ];
  }
}
