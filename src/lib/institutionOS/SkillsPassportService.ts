export interface SkillsPassport {
  passportId: string;
  learnerId: string;
  learnerName: string;
  institutionName: string;
  issuedDate: string;
  verifiedCompetenciesCount: number;
  microCredentialsCount: number;
  industryCertificationsCount: number;
  overallMaturityLevel: "Novice" | "Competent" | "Proficient" | "Expert" | "Master";
  careerReadinessScore: number; // 0-100
  qrVerificationUrl: string;
}

export class SkillsPassportService {
  static getPassportForLearner(learnerId: string): SkillsPassport {
    return {
      passportId: "SP-AFR-2026-9982",
      learnerId,
      learnerName: "Chidimma Nnamdi",
      institutionName: "Digital Technology Academy (DTA)",
      issuedDate: "2026-08-04",
      verifiedCompetenciesCount: 24,
      microCredentialsCount: 8,
      industryCertificationsCount: 4,
      overallMaturityLevel: "Expert",
      careerReadinessScore: 94,
      qrVerificationUrl: "https://dwsa.africa/verify/sp-2026-9982",
    };
  }
}
