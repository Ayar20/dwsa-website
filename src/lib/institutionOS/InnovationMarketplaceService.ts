/**
 * InnovationMarketplaceService.ts
 * InstitutionOS Core Service — Student Innovation, Startup Ideas & Research Publication Engine
 */

export interface InnovationSubmission {
  id: string;
  studentName: string;
  title: string;
  category: "Startup Idea" | "Capstone Project" | "Research Paper" | "Open Source" | "AI Project";
  description: string;
  techStack: string[];
  repoUrl?: string;
  liveUrl?: string;
  submittedAt: string;
  likes: number;
  views: number;
  fundingInterest: boolean;
  status: "Published" | "Under Review" | "Featured";
}

const mockSubmissions: InnovationSubmission[] = [
  { id: "INN-101", studentName: "Kofi Asante", title: "AgriChain: Blockchain-Based Supply Chain for West African Farmers", category: "Startup Idea", description: "A decentralised platform enabling smallholder farmers to receive micropayments directly via Ethereum smart contracts, bypassing exploitative middlemen.", techStack: ["Solidity", "React", "IPFS", "Node.js"], liveUrl: "https://agrichain.vercel.app", submittedAt: "Aug 01, 2026", likes: 87, views: 412, fundingInterest: true, status: "Featured" },
  { id: "INN-102", studentName: "Aisha Ibrahim", title: "EdAssist: AI-Powered Adaptive Learning Companion for African Languages", category: "AI Project", description: "A context-aware tutoring LLM fine-tuned for Hausa, Yoruba, and Swahili learners to democratise quality programming education.", techStack: ["Python", "PyTorch", "FastAPI", "Next.js"], submittedAt: "Jul 28, 2026", likes: 64, views: 289, fundingInterest: true, status: "Published" },
  { id: "INN-103", studentName: "Zainab Al-Mansoor", title: "HealthID: Decentralised Patient Records for Nigerian Hospitals", category: "Capstone Project", description: "A secure patient-owned medical records system built on Hyperledger Fabric for interoperability across Nigerian hospitals.", techStack: ["Hyperledger", "React", "Express.js"], repoUrl: "https://github.com/zainab/healthid", submittedAt: "Jul 20, 2026", likes: 45, views: 197, fundingInterest: false, status: "Published" },
];

export class InnovationMarketplaceService {
  private static submissions: InnovationSubmission[] = [...mockSubmissions];

  public static getSubmissions(): InnovationSubmission[] {
    return [...this.submissions];
  }

  public static likeSubmission(id: string): void {
    const sub = this.submissions.find((s) => s.id === id);
    if (sub) sub.likes++;
  }
}
