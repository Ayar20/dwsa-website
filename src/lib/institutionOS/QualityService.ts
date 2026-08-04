/**
 * QualityService.ts
 * InstitutionOS Automation — Institution Quality Assurance & Continuous Improvement Engine
 */

export interface QualityMetric {
  id: string;
  area: string;
  score: number;
  benchmark: number;
  trend: "Improving" | "Stable" | "Declining";
  lastAssessed: string;
  notes: string;
}

const mockMetrics: QualityMetric[] = [
  { id: "QA-101", area: "Programme Quality Index", score: 91, benchmark: 85, trend: "Improving", lastAssessed: "Aug 01, 2026", notes: "Curriculum review complete. 3 new industry-aligned modules introduced." },
  { id: "QA-102", area: "Faculty Performance Rating", score: 94, benchmark: 88, trend: "Stable", lastAssessed: "Aug 01, 2026", notes: "Average student satisfaction 4.8/5. Grading SLA at 98%." },
  { id: "QA-103", area: "Learner Satisfaction Index", score: 89, benchmark: 80, trend: "Improving", lastAssessed: "Jul 28, 2026", notes: "Net Promoter Score: 72. Key feedback: more live corporate sessions requested." },
  { id: "QA-104", area: "Graduate Outcomes & Employment", score: 92, benchmark: 85, trend: "Improving", lastAssessed: "Aug 01, 2026", notes: "92% employment within 6 months. Avg salary ₦980K/mo." },
  { id: "QA-105", area: "Assessment Quality & Rigour", score: 87, benchmark: 80, trend: "Stable", lastAssessed: "Jul 25, 2026", notes: "PR-based assessment pass rate: 88%. Appeals rate: 2%." },
  { id: "QA-106", area: "Industry Alignment Score", score: 88, benchmark: 80, trend: "Improving", lastAssessed: "Aug 02, 2026", notes: "34 employer partners confirmed curriculum alignment. Blockchain module added Q3." },
];

export class QualityService {
  public static getMetrics(): QualityMetric[] {
    return [...mockMetrics];
  }

  public static getOverallScore(): number {
    const total = mockMetrics.reduce((sum, m) => sum + m.score, 0);
    return Math.round(total / mockMetrics.length);
  }
}
