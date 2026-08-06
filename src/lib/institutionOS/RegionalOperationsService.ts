export interface RegionalOffice {
  id: string;
  regionName: string;
  headOfRegion: string;
  headquartersCity: string;
  countriesCovered: string[];
  activeDealsCount: number;
  totalPipelineValueUSD: number;
  quarterlyTargetUSD: number;
  quarterlyAchievedUSD: number;
  attainmentPercent: number;
}

export class RegionalOperationsService {
  private static regions: RegionalOffice[] = [
    { id: "reg-wa", regionName: "West Africa", headOfRegion: "Kwame Asante (Regional VP)", headquartersCity: "Lagos, Nigeria", countriesCovered: ["Nigeria", "Ghana", "Senegal", "Côte d'Ivoire", "Sierra Leone"], activeDealsCount: 22, totalPipelineValueUSD: 3800000, quarterlyTargetUSD: 950000, quarterlyAchievedUSD: 780000, attainmentPercent: 82 },
    { id: "reg-ea", regionName: "East Africa", headOfRegion: "Faith Mutua (Regional VP)", headquartersCity: "Nairobi, Kenya", countriesCovered: ["Kenya", "Uganda", "Rwanda", "Tanzania", "Ethiopia"], activeDealsCount: 15, totalPipelineValueUSD: 2600000, quarterlyTargetUSD: 700000, quarterlyAchievedUSD: 620000, attainmentPercent: 89 },
    { id: "reg-sa", regionName: "Southern Africa", headOfRegion: "Thabo Mbeki (Regional VP)", headquartersCity: "Johannesburg, South Africa", countriesCovered: ["South Africa", "Botswana", "Namibia", "Zimbabwe", "Zambia"], activeDealsCount: 10, totalPipelineValueUSD: 2100000, quarterlyTargetUSD: 600000, quarterlyAchievedUSD: 490000, attainmentPercent: 82 },
  ];

  static getRegions(): RegionalOffice[] {
    return this.regions;
  }
}
