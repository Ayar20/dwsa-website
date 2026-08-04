import { GlobalSettingsConfig } from "@/types/institutionOS";

const defaultConfig: GlobalSettingsConfig = {
  brand: {
    institutionName: "Digital Technology Academy (DTA)",
    parentCorporateEntity: "Digital World Systems Africa Ltd (DWSA)",
    primaryColor: "#d4a017",
    secondaryColor: "#4ade80",
    logoUrl: "/digital_world_systems_africa_logo.jpg",
  },
  campus: {
    activeAcademicYear: "2026 Academic Session",
    timezone: "West Africa Time (WAT / UTC+1)",
    defaultCurrency: "NGN (₦)",
  },
  notifications: {
    emailEnabled: true,
    smsEnabled: true,
    pushEnabled: true,
  },
  payments: {
    provider: "Paystack ERP Engine",
    publicKey: "pk_live_dta_************************",
  },
  security: {
    mfaRequired: true,
    sessionTimeoutMinutes: 60,
  },
};

export class GlobalSettingsService {
  private static config: GlobalSettingsConfig = { ...defaultConfig };

  public static getConfig(): GlobalSettingsConfig {
    return { ...this.config };
  }

  public static updateConfig(updates: Partial<GlobalSettingsConfig>): GlobalSettingsConfig {
    this.config = { ...this.config, ...updates };
    return { ...this.config };
  }
}
