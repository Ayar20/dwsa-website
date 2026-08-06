export interface CPDRecord {
  id: string;
  activityTitle: string;
  provider: string;
  cpdHoursEarned: number;
  category: "Technical Workshop" | "Conference" | "Peer Review" | "Certification" | "Publication";
  dateCompleted: string;
}

export interface ProfessionalMembership {
  id: string;
  organizationName: string;
  membershipTier: string;
  memberId: string;
  renewalDate: string;
  status: "ACTIVE" | "RENEWAL_DUE";
}

export class ProfessionalDevelopmentService {
  static getCPDRecords(learnerId: string): CPDRecord[] {
    return [
      { id: "cpd-01", activityTitle: "Pan-African AI & Cloud Summit 2026", provider: "DWSA Academy", cpdHoursEarned: 16, category: "Conference", dateCompleted: "2026-06-12" },
      { id: "cpd-02", activityTitle: "Enterprise Software Architecture Masterclass", provider: "IEEE Africa Section", cpdHoursEarned: 24, category: "Technical Workshop", dateCompleted: "2026-07-05" },
    ];
  }

  static getMemberships(learnerId: string): ProfessionalMembership[] {
    return [
      { id: "pm-01", organizationName: "Computer Professionals Registration Council of Nigeria (CPN)", membershipTier: "Full Member (MCPN)", memberId: "CPN-2025-8841", renewalDate: "2027-01-15", status: "ACTIVE" },
      { id: "pm-02", organizationName: "IEEE Computer Society Africa", membershipTier: "Senior Member", memberId: "IEEE-90481239", renewalDate: "2026-12-31", status: "ACTIVE" },
    ];
  }
}
