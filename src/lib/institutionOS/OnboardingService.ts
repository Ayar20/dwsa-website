/**
 * OnboardingService.ts
 * InstitutionOS v4.1 — Enterprise Onboarding Workflow & Readiness Engine
 */

export type OnboardingStepId =
  | "organization_info"
  | "branding_setup"
  | "academic_config"
  | "module_selection"
  | "deployment_readiness";

export interface OnboardingStep {
  id: OnboardingStepId;
  title: string;
  description: string;
  icon: string;
  isCompleted: boolean;
}

export interface OnboardingState {
  tenantId?: string;
  currentStepIndex: number;
  steps: OnboardingStep[];
  organizationInfo: {
    institutionName: string;
    institutionType: "university" | "polytechnic" | "college" | "corporate" | "government";
    country: string;
    website: string;
    contactEmail: string;
  };
  brandingSetup: {
    logoUrl?: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    customDomain?: string;
  };
  academicConfig: {
    programmesCount: number;
    departmentsCount: number;
    academicCalendar: string;
    gradingStructure: string;
  };
  selectedModules: string[];
  readinessChecklist: {
    configurationComplete: boolean;
    brandingReady: boolean;
    usersReady: boolean;
    integrationsReady: boolean;
    launchStatus: "draft" | "ready" | "live";
  };
}

export class OnboardingService {
  public static getInitialState(): OnboardingState {
    return {
      currentStepIndex: 0,
      steps: [
        { id: "organization_info", title: "Organization Information", description: "Institution name, type, country, & contact", icon: "🏛", isCompleted: false },
        { id: "branding_setup", title: "Branding Setup", description: "Logo upload, brand colors, & domain config", icon: "🎨", isCompleted: false },
        { id: "academic_config", title: "Academic Configuration", description: "Programmes, departments, & grading scale", icon: "📚", isCompleted: false },
        { id: "module_selection", title: "Platform Modules Selection", description: "Select active enterprise modules", icon: "⚡", isCompleted: false },
        { id: "deployment_readiness", title: "Deployment Readiness Checklist", description: "Verify launch status & activate tenant", icon: "🚀", isCompleted: false },
      ],
      organizationInfo: {
        institutionName: "",
        institutionType: "university",
        country: "Nigeria",
        website: "",
        contactEmail: "",
      },
      brandingSetup: {
        primaryColor: "#d4a017",
        secondaryColor: "#4ade80",
        accentColor: "#f0c040",
      },
      academicConfig: {
        programmesCount: 4,
        departmentsCount: 8,
        academicCalendar: "2 Semesters (24 Weeks)",
        gradingStructure: "4.0 GPA Scale",
      },
      selectedModules: [
        "Digital Campus",
        "Faculty Workspace",
        "Institution Control Centre",
        "AI Intelligence",
        "Digital Credentials",
      ],
      readinessChecklist: {
        configurationComplete: true,
        brandingReady: true,
        usersReady: true,
        integrationsReady: true,
        launchStatus: "ready",
      },
    };
  }
}
