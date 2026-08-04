/**
 * CareerPlacementService.ts
 * InstitutionOS Core Service — Career Opportunities & Placement Tracking Engine
 */

export interface JobOpportunity {
  id: string;
  companyName: string;
  companyLogo: string;
  title: string;
  location: string;
  type: "Full-Time" | "Internship" | "Contract" | "Remote";
  salaryRange: string;
  skillsRequired: string[];
  matchPercentage: number;
  postedDate: string;
  status: "Open" | "Applied" | "Saved";
}

const mockJobs: JobOpportunity[] = [
  { id: "JOB-101", companyName: "First Bank PLC", companyLogo: "FB", title: "Full-Stack Software Engineer", location: "Lagos, Nigeria (Hybrid)", type: "Full-Time", salaryRange: "₦850,000 - ₦1,200,000 / mo", skillsRequired: ["React", "Node.js", "TypeScript", "PostgreSQL"], matchPercentage: 94, postedDate: "2 days ago", status: "Open" },
  { id: "JOB-102", companyName: "MTN Group", companyLogo: "MTN", title: "Frontend React & Next.js Developer", location: "Accra, Ghana (Remote)", type: "Full-Time", salaryRange: "₦950,000 - ₦1,400,000 / mo", skillsRequired: ["React", "Next.js", "TailwindCSS", "REST APIs"], matchPercentage: 92, postedDate: "3 days ago", status: "Open" },
  { id: "JOB-103", companyName: "Paystack", companyLogo: "PS", title: "DevOps & Cloud Systems Associate", location: "Lagos, Nigeria (Remote)", type: "Internship", salaryRange: "₦500,000 / mo", skillsRequired: ["GitHub Actions", "Docker", "AWS", "CI/CD"], matchPercentage: 88, postedDate: "1 week ago", status: "Open" },
  { id: "JOB-104", companyName: "Access Bank", companyLogo: "AB", title: "Smart Contract & Blockchain Engineer", location: "Abuja, Nigeria", type: "Full-Time", salaryRange: "₦1,100,000 - ₦1,600,000 / mo", skillsRequired: ["Solidity", "TypeScript", "Web3.js", "Cryptography"], matchPercentage: 85, postedDate: "5 days ago", status: "Open" },
];

export class CareerPlacementService {
  private static jobs: JobOpportunity[] = [...mockJobs];

  public static getOpportunities(): JobOpportunity[] {
    return [...this.jobs];
  }

  public static applyToJob(id: string): void {
    const job = this.jobs.find((j) => j.id === id);
    if (job) job.status = "Applied";
  }
}
