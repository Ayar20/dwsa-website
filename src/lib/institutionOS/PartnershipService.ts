/**
 * PartnershipService.ts
 * InstitutionOS Core Service — Enterprise & Academic Partnership Engine
 */

export interface InstitutionalPartner {
  id: string;
  partnerName: string;
  partnerType: "Corporate Enterprise" | "University Partner" | "Government Agency" | "Technology Vendor" | "NGO";
  status: "Active" | "Pending Renewal" | "Under Negotiation";
  activeProjectsCount: number;
  annualValueNaira: number;
  renewalDate: string;
  contactPerson: string;
}

const mockPartners: InstitutionalPartner[] = [
  { id: "PART-101", partnerName: "First Bank PLC", partnerType: "Corporate Enterprise", status: "Active", activeProjectsCount: 3, annualValueNaira: 14200000, renewalDate: "2027-01-15", contactPerson: "Chief Talent Officer" },
  { id: "PART-102", partnerName: "MTN Group", partnerType: "Corporate Enterprise", status: "Active", activeProjectsCount: 2, annualValueNaira: 18500000, renewalDate: "2027-03-30", contactPerson: "VP Enterprise Solutions" },
  { id: "PART-103", partnerName: "National Information Technology Development Agency (NITDA)", partnerType: "Government Agency", status: "Active", activeProjectsCount: 4, annualValueNaira: 25000000, renewalDate: "2026-11-01", contactPerson: "Director Digital Capacity" },
  { id: "PART-104", partnerName: "Google Africa Developer Ecosystem", partnerType: "Technology Vendor", status: "Active", activeProjectsCount: 2, annualValueNaira: 12000000, renewalDate: "2027-05-10", contactPerson: "Developer Relations Lead" },
];

export class PartnershipService {
  public static getPartners(): InstitutionalPartner[] {
    return [...mockPartners];
  }
}
