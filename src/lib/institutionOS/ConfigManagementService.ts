/**
 * ConfigManagementService.ts
 * InstitutionOS Operations — Centralized Environment & Multi-Tenant Configuration Layer
 */

export type EnvironmentMode = "Development" | "Staging" | "Production";

export interface SystemConfig {
  environment: EnvironmentMode;
  institutionName: string;
  institutionCode: string;
  multiTenantModeEnabled: boolean;
  maxActiveStudentsLimit: number;
  paystackLiveMode: boolean;
  githubPRSyncEnabled: boolean;
  aiOrchestratorProvider: string;
  allowedOrigins: string[];
}

const mockConfig: SystemConfig = {
  environment: "Production",
  institutionName: "Digital Technology Academy (DWSA)",
  institutionCode: "DTA-NG",
  multiTenantModeEnabled: true,
  maxActiveStudentsLimit: 500,
  paystackLiveMode: true,
  githubPRSyncEnabled: true,
  aiOrchestratorProvider: "Gemini / OpenAI Abstraction",
  allowedOrigins: ["https://dwsa-academy.vercel.app", "http://localhost:3000"],
};

export class ConfigManagementService {
  public static getConfig(): SystemConfig {
    return { ...mockConfig };
  }
}
