export interface QualityReport {
  extensionId: string;
  installSuccessRatePercent: number;
  crashRatePercent: number;
  performanceScore: number;
  securityScore: number;
  accessibilityScore: number;
  csatRating: number;
  overallQualityScore: number;
}

export class ExtensionQualityService {
  static getQualityReport(extensionId: string): QualityReport {
    return {
      extensionId,
      installSuccessRatePercent: 99.8,
      crashRatePercent: 0.02,
      performanceScore: 98.5,
      securityScore: 99.0,
      accessibilityScore: 96.0,
      csatRating: 4.9,
      overallQualityScore: 98.4,
    };
  }
}
