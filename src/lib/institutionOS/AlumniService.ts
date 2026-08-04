/**
 * AlumniService.ts
 * InstitutionOS Core Service — Alumni Network & Graduate Directory Engine
 */

export interface AlumniProfile {
  id: string;
  name: string;
  gradYear: string;
  currentRole: string;
  company: string;
  location: string;
  isMentorAvailable: boolean;
  avatar: string;
  bio: string;
}

const mockAlumni: AlumniProfile[] = [
  { id: "ALM-1", name: "David Okonjo", gradYear: "Cohort 2025", currentRole: "Senior Frontend Engineer", company: "Paystack", location: "Lagos, Nigeria", isMentorAvailable: true, avatar: "D", bio: "DTA graduate leading React UI engineering at Paystack." },
  { id: "ALM-2", name: "Fatima Bello", gradYear: "Cohort 2025", currentRole: "AI Data Engineer", company: "Google Africa Labs", location: "Nairobi, Kenya", isMentorAvailable: true, avatar: "F", bio: "Building low-resource LLM pipelines for West African languages." },
  { id: "ALM-3", name: "Kwame Mensah", gradYear: "Cohort 2024", currentRole: "Blockchain Lead", company: "Interswitch", location: "Accra, Ghana", isMentorAvailable: false, avatar: "K", bio: "Architecting cross-border settlement rails on Ethereum." },
];

export class AlumniService {
  public static getAlumniDirectory(): AlumniProfile[] {
    return [...mockAlumni];
  }
}
