export interface DeveloperOrg {
  id: string;
  name: string;
  type: "Company" | "Individual" | "Verified Partner" | "Government Tech Partner" | "University Lab" | "Corporate Provider";
  verificationStatus: "VERIFIED" | "PENDING" | "UNVERIFIED";
  country: string;
  website: string;
  publishedExtensionsCount: number;
  publishedAIAgentsCount: number;
  totalDownloads: number;
  rating: number;
}

export class DeveloperOrganizationService {
  static getOrganizations(): DeveloperOrg[] {
    return [
      { id: "org-001", name: "CampuSoft Africa Ltd", type: "Verified Partner", verificationStatus: "VERIFIED", country: "Nigeria", website: "https://campusoft.africa", publishedExtensionsCount: 4, publishedAIAgentsCount: 2, totalDownloads: 4820, rating: 4.9 },
      { id: "org-002", name: "HealthTech Solutions Labs", type: "Corporate Provider", verificationStatus: "VERIFIED", country: "Ghana", website: "https://healthtech.africa", publishedExtensionsCount: 2, publishedAIAgentsCount: 1, totalDownloads: 1240, rating: 4.8 },
      { id: "org-003", name: "Federal Ministry of Education Tech Hub", type: "Government Tech Partner", verificationStatus: "VERIFIED", country: "Nigeria", website: "https://education.gov.ng", publishedExtensionsCount: 3, publishedAIAgentsCount: 1, totalDownloads: 8900, rating: 5.0 },
    ];
  }
}
