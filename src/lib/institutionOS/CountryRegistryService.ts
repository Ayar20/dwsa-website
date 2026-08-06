export interface AfricanCountryProfile {
  countryCode: string;
  countryName: string;
  region: "West Africa" | "East Africa" | "Southern Africa" | "North Africa" | "Central Africa";
  readinessScore: number;
  activeInstitutionsCount: number;
  pipelineDealsCount: number;
  totalMarketValueUSD: number;
  strategicPriority: "TIER_1_CRITICAL" | "TIER_2_HIGH_GROWTH" | "TIER_3_EMERGING";
  ministryContact: string;
}

export class CountryRegistryService {
  private static countries: AfricanCountryProfile[] = [
    { countryCode: "NG", countryName: "Nigeria", region: "West Africa", readinessScore: 96, activeInstitutionsCount: 8, pipelineDealsCount: 14, totalMarketValueUSD: 2400000, strategicPriority: "TIER_1_CRITICAL", ministryContact: "Federal Ministry of Education (Abuja)" },
    { countryCode: "GH", countryName: "Ghana", region: "West Africa", readinessScore: 92, activeInstitutionsCount: 4, pipelineDealsCount: 6, totalMarketValueUSD: 1100000, strategicPriority: "TIER_1_CRITICAL", ministryContact: "Ministry of Education (Accra)" },
    { countryCode: "KE", countryName: "Kenya", region: "East Africa", readinessScore: 94, activeInstitutionsCount: 5, pipelineDealsCount: 8, totalMarketValueUSD: 1600000, strategicPriority: "TIER_1_CRITICAL", ministryContact: "Ministry of Education Science & Tech (Nairobi)" },
    { countryCode: "ZA", countryName: "South Africa", region: "Southern Africa", readinessScore: 90, activeInstitutionsCount: 3, pipelineDealsCount: 5, totalMarketValueUSD: 1900000, strategicPriority: "TIER_1_CRITICAL", ministryContact: "Department of Higher Education & Training (Pretoria)" },
    { countryCode: "RW", countryName: "Rwanda", region: "East Africa", readinessScore: 95, activeInstitutionsCount: 2, pipelineDealsCount: 4, totalMarketValueUSD: 750000, strategicPriority: "TIER_2_HIGH_GROWTH", ministryContact: "Ministry of Education (Kigali)" },
    { countryCode: "UG", countryName: "Uganda", region: "East Africa", readinessScore: 88, activeInstitutionsCount: 2, pipelineDealsCount: 3, totalMarketValueUSD: 620000, strategicPriority: "TIER_2_HIGH_GROWTH", ministryContact: "Ministry of Education & Sports (Kampala)" },
  ];

  static getCountries(): AfricanCountryProfile[] {
    return this.countries;
  }
}
