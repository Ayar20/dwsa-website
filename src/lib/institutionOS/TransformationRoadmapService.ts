export interface TransformationPhase {
  phaseNumber: number;
  phaseName: string;
  description: string;
  durationWeeks: number;
  status: "COMPLETED" | "IN_PROGRESS" | "UPCOMING";
  deliverables: string[];
}

export interface TransformationRoadmap {
  institutionName: string;
  totalPhases: number;
  currentPhase: number;
  overallProgressPercent: number;
  estimatedCompletionDate: string;
  phases: TransformationPhase[];
}

export class TransformationRoadmapService {
  static getRoadmap(institutionName: string): TransformationRoadmap {
    return {
      institutionName,
      totalPhases: 6,
      currentPhase: 3,
      overallProgressPercent: 48,
      estimatedCompletionDate: "2027-02-28",
      phases: [
        { phaseNumber: 1, phaseName: "Digital Assessment & Strategy", description: "12-dimension maturity assessment and executive alignment", durationWeeks: 3, status: "COMPLETED", deliverables: ["Maturity Assessment Report", "Executive Alignment Workshop", "Digital Strategy Document"] },
        { phaseNumber: 2, phaseName: "Infrastructure & Platform Setup", description: "Tenant provisioning, SSO, identity verification bridges", durationWeeks: 4, status: "COMPLETED", deliverables: ["Multi-Tenant Schema Provisioned", "SSO & NIN Integration", "Payment Gateway Configuration"] },
        { phaseNumber: 3, phaseName: "Data Migration & Configuration", description: "Student records, faculty profiles, course catalog migration", durationWeeks: 6, status: "IN_PROGRESS", deliverables: ["Student Records Migrated", "Course Catalog Imported", "Faculty Profiles Created"] },
        { phaseNumber: 4, phaseName: "Training & Adoption", description: "Faculty workshops, student orientation, admin training", durationWeeks: 4, status: "UPCOMING", deliverables: ["Faculty Training (450+ staff)", "Student Onboarding Campaign", "Admin Power-User Certification"] },
        { phaseNumber: 5, phaseName: "Pilot & Validation", description: "Controlled pilot with selected departments before full go-live", durationWeeks: 4, status: "UPCOMING", deliverables: ["Pilot Department Go-Live", "UAT Sign-Off", "Performance Benchmarks"] },
        { phaseNumber: 6, phaseName: "Full Go-Live & Hypercare", description: "Institution-wide launch with 30-day hypercare support", durationWeeks: 6, status: "UPCOMING", deliverables: ["Full Go-Live", "30-Day Hypercare Support", "Post-Launch Optimization Report"] },
      ],
    };
  }
}
