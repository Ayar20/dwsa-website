export interface IndustryCompetencyFramework {
  id: string;
  industrySector: "Technology" | "Healthcare" | "Finance" | "Government" | "Manufacturing" | "Education" | "Energy";
  frameworkName: string;
  version: string;
  governingBody: string;
  coreCompetenciesCount: number;
}

export class IndustryCompetencyService {
  private static frameworks: IndustryCompetencyFramework[] = [
    { id: "fw-tech", industrySector: "Technology", frameworkName: "African Software & AI Competency Standard (ASACS)", version: "v2026.1", governingBody: "DWSA & Tech Council Africa", coreCompetenciesCount: 48 },
    { id: "fw-fin", industrySector: "Finance", frameworkName: "Digital Banking & Open Finance Skills Framework", version: "v4.2", governingBody: "African Fintech Alliance", coreCompetenciesCount: 36 },
    { id: "fw-edu", industrySector: "Education", frameworkName: "National Higher Education Digital Pedagogy Framework", version: "v3.0", governingBody: "African University Council", coreCompetenciesCount: 28 },
    { id: "fw-gov", industrySector: "Government", frameworkName: "Public Sector Digital Transformation & GovTech Competencies", version: "v2.5", governingBody: "Smart Africa Alliance", coreCompetenciesCount: 32 },
  ];

  static getFrameworks(): IndustryCompetencyFramework[] {
    return this.frameworks;
  }
}
