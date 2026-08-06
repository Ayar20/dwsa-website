export interface CRMInstitutionAccount {
  id: string;
  name: string;
  type: "University" | "Polytechnic" | "College" | "Corporate Academy" | "Government Agency" | "Professional Institute" | "NGO" | "Training Organisation";
  country: string;
  stateProvince: string;
  website: string;
  primaryContact: string;
  executiveContact: string;
  currentStatus: "PROSPECT" | "ACTIVE_CUSTOMER" | "IMPLEMENTATION" | "PILOT" | "EXPANSION";
  assignedAccountManager: string;
  opportunityStage: string;
  expectedValueUSD: number;
  implementationTimeline: string;
  healthScore: number;
  renewalDate: string;
  supportStatus: "HEALTHY" | "ATTENTION_REQUIRED" | "CRITICAL";
  notesTimeline: { date: string; author: string; note: string }[];
}

export class EnterpriseCRMService {
  private static accounts: CRMInstitutionAccount[] = [
    {
      id: "crm-acc-01",
      name: "Federal University of Technology, Akure (FUTA)",
      type: "University",
      country: "Nigeria",
      stateProvince: "Ondo State",
      website: "https://futa.edu.ng",
      primaryContact: "Dr. A. O. Bello (Director of ICT)",
      executiveContact: "Prof. Adenike Oladiji (Vice Chancellor)",
      currentStatus: "IMPLEMENTATION",
      assignedAccountManager: "Chidi Nnamdi (Senior Enterprise Lead)",
      opportunityStage: "Configuration & Migration",
      expectedValueUSD: 240000,
      implementationTimeline: "Q3 2026 Go-Live",
      healthScore: 94,
      renewalDate: "2027-08-15",
      supportStatus: "HEALTHY",
      notesTimeline: [
        { date: "2026-07-28", author: "Chidi Nnamdi", note: "NIMC Identity Verification connector configured and approved by Vice Chancellor." },
        { date: "2026-08-02", author: "Amina Yusuf", note: "Faculty orientation completed for 450 academic staff across 6 schools." },
      ],
    },
    {
      id: "crm-acc-02",
      name: "Kwame Nkrumah University of Science & Tech (KNUST)",
      type: "University",
      country: "Ghana",
      stateProvince: "Ashanti Region",
      website: "https://knust.edu.gh",
      primaryContact: "Kofi Mensah (Head of E-Learning)",
      executiveContact: "Prof. Rita Akosua Dickson (Vice Chancellor)",
      currentStatus: "PROSPECT",
      assignedAccountManager: "Kwame Asante (Regional VP West Africa)",
      opportunityStage: "Executive Presentation",
      expectedValueUSD: 310000,
      implementationTimeline: "Target Q4 2026",
      healthScore: 88,
      renewalDate: "N/A (Prospect)",
      supportStatus: "HEALTHY",
      notesTimeline: [
        { date: "2026-08-01", author: "Kwame Asante", note: "Executive briefing delivered to University Senate. Requested custom Moodle & SCORM integration assessment." },
      ],
    },
    {
      id: "crm-acc-03",
      name: "Kenyatta University Digital Campus",
      type: "University",
      country: "Kenya",
      stateProvince: "Nairobi",
      website: "https://ku.ac.ke",
      primaryContact: "David Ochieng (Chief Information Officer)",
      executiveContact: "Prof. Paul Wainaina (Vice Chancellor)",
      currentStatus: "ACTIVE_CUSTOMER",
      assignedAccountManager: "Faith Mutua (Enterprise Lead East Africa)",
      opportunityStage: "Expansion",
      expectedValueUSD: 185000,
      implementationTimeline: "Fully Deployed (v4.3A)",
      healthScore: 98,
      renewalDate: "2027-03-31",
      supportStatus: "HEALTHY",
      notesTimeline: [
        { date: "2026-07-15", author: "Faith Mutua", note: "AI Digital Workforce platform upgraded to v4.2 with custom Kenya NIN verification bridge." },
      ],
    },
    {
      id: "crm-acc-04",
      name: "National Open University of Nigeria (NOUN)",
      type: "University",
      country: "Nigeria",
      stateProvince: "Abuja FCT",
      website: "https://noun.edu.ng",
      primaryContact: "Engr. Mustapha Aliyu (Director of Software)",
      executiveContact: "Prof. Olufemi Peters (Vice Chancellor)",
      currentStatus: "PILOT",
      assignedAccountManager: "Chidi Nnamdi (Senior Enterprise Lead)",
      opportunityStage: "Pilot",
      expectedValueUSD: 450000,
      implementationTimeline: "100,000 Student Pilot Phase",
      healthScore: 92,
      renewalDate: "2027-01-15",
      supportStatus: "HEALTHY",
      notesTimeline: [
        { date: "2026-08-04", author: "Chidi Nnamdi", note: "Paystack & Flutterwave multi-gateway tuition collection tested for 12,000 pilot enrollments." },
      ],
    },
  ];

  static getAllAccounts(): CRMInstitutionAccount[] {
    return this.accounts;
  }

  static getAccountById(id: string): CRMInstitutionAccount | undefined {
    return this.accounts.find((a) => a.id === id);
  }
}
