export interface ExtensionItem {
  id: string;
  name: string;
  publisher: string;
  version: string;
  category: "Academic" | "Administration" | "Finance" | "Research" | "AI" | "Security" | "Library" | "Hostel" | "Healthcare" | "Assessment" | "Communication" | "Developer" | "Analytics";
  description: string;
  supportedInstitutionTypes: string[];
  subscriptionTier: "Free" | "Starter" | "Growth" | "Enterprise";
  permissionsRequired: string[];
  averageRating: number;
  downloads: number;
  installStatus: "installed" | "available" | "update_available" | "disabled";
  priceMonthlyUSD: number;
  icon: string;
}

export class ExtensionRegistryService {
  private static extensions: ExtensionItem[] = [
    {
      id: "ext-scorm-player-pro",
      name: "SCORM 2004 Ultra Interactive Player",
      publisher: "DWSA Learning Systems",
      version: "v2.4",
      category: "Academic",
      description: "High-performance interactive SCORM 1.2/2004 player with offline caching and progress checkpointing.",
      supportedInstitutionTypes: ["University", "Polytechnic", "Corporate Academy"],
      subscriptionTier: "Free",
      permissionsRequired: ["scorm.play", "grades.write"],
      averageRating: 4.9,
      downloads: 1420,
      installStatus: "installed",
      priceMonthlyUSD: 0,
      icon: "BookOpen",
    },
    {
      id: "ext-smart-hostel-mgr",
      name: "Smart Hostel & Campus Housing Manager",
      publisher: "CampuSoft Africa",
      version: "v1.8",
      category: "Hostel",
      description: "Automated bed allocation, maintenance dispatching, visitor logging, and biometric gate sync.",
      supportedInstitutionTypes: ["University", "Residential College"],
      subscriptionTier: "Growth",
      permissionsRequired: ["students.read", "hostel.allocate", "notifications.send"],
      averageRating: 4.8,
      downloads: 890,
      installStatus: "installed",
      priceMonthlyUSD: 49,
      icon: "Building2",
    },
    {
      id: "ext-medical-centre-pro",
      name: "Campus Health & Clinic EHR Bridge",
      publisher: "HealthTech Solutions",
      version: "v3.1",
      category: "Healthcare",
      description: "Electronic Health Records (EHR) sync for campus clinics, medical fitness waivers, and emergency alerts.",
      supportedInstitutionTypes: ["University", "Polytechnic"],
      subscriptionTier: "Enterprise",
      permissionsRequired: ["health.records.write", "students.medical.read"],
      averageRating: 4.9,
      downloads: 640,
      installStatus: "available",
      priceMonthlyUSD: 120,
      icon: "HeartPulse",
    },
    {
      id: "ext-library-rfid-sync",
      name: "Koha RFID Library & E-Book Vault",
      publisher: "OpenLib Systems",
      version: "v2.0",
      category: "Library",
      description: "Koha ILS integration, RFID gate checkout, digital journal proxy, and overdue fine auto-billing.",
      supportedInstitutionTypes: ["University", "Research Institute"],
      subscriptionTier: "Starter",
      permissionsRequired: ["library.catalog.read", "finance.bill.student"],
      averageRating: 4.7,
      downloads: 1120,
      installStatus: "installed",
      priceMonthlyUSD: 29,
      icon: "Library",
    },
    {
      id: "ext-pan-african-tax",
      name: "Pan-African Tax & WHT Automated Ledger",
      publisher: "FinTech Compliance Africa",
      version: "v1.5",
      category: "Finance",
      description: "Withholding Tax (WHT), VAT, and statutory deduction calculation across 14 African tax jurisdictions.",
      supportedInstitutionTypes: ["University", "Corporate Academy"],
      subscriptionTier: "Enterprise",
      permissionsRequired: ["finance.ledger.read", "reports.tax.write"],
      averageRating: 5.0,
      downloads: 410,
      installStatus: "available",
      priceMonthlyUSD: 199,
      icon: "DollarSign",
    },
  ];

  static getAllExtensions(): ExtensionItem[] {
    return this.extensions;
  }

  static getExtensionsByCategory(category: ExtensionItem["category"]): ExtensionItem[] {
    return this.extensions.filter((e) => e.category === category);
  }
}
