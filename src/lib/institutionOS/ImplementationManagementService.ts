export interface ImplementationProject {
  id: string;
  institutionName: string;
  projectManager: string;
  solutionArchitect: string;
  leadEngineer: string;
  csm: string;
  overallProgressPercent: number;
  migrationStatus: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  configurationProgressPercent: number;
  dataMigrationPercent: number;
  testingPercent: number;
  goLiveReadinessScore: number;
  riskCount: number;
  targetGoLiveDate: string;
}

export class ImplementationManagementService {
  private static projects: ImplementationProject[] = [
    { id: "imp-01", institutionName: "Federal University of Tech, Akure (FUTA)", projectManager: "Amina Yusuf (PMP)", solutionArchitect: "Dr. Olayinka Cole", leadEngineer: "Tunde Ednut", csm: "Blessing Okon", overallProgressPercent: 88, migrationStatus: "IN_PROGRESS", configurationProgressPercent: 95, dataMigrationPercent: 82, testingPercent: 90, goLiveReadinessScore: 94, riskCount: 1, targetGoLiveDate: "2026-08-30" },
    { id: "imp-02", institutionName: "National Open University of Nigeria (NOUN)", projectManager: "Emeka Nwosu", solutionArchitect: "Dr. Olayinka Cole", leadEngineer: "Victor Igbo", csm: "Blessing Okon", overallProgressPercent: 42, migrationStatus: "IN_PROGRESS", configurationProgressPercent: 55, dataMigrationPercent: 35, testingPercent: 20, goLiveReadinessScore: 78, riskCount: 3, targetGoLiveDate: "2026-11-15" },
  ];

  static getProjects(): ImplementationProject[] {
    return this.projects;
  }
}
