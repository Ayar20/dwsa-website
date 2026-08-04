/**
 * CommunityService.ts
 * InstitutionOS Core Service — Campus Community, Discussion Forums & Study Groups Engine
 */

export interface DiscussionThread {
  id: string;
  category: "General" | "Tech Help" | "Announcements" | "Innovation" | "Hackathon" | "Alumni";
  title: string;
  author: string;
  replies: number;
  views: number;
  postedAt: string;
  isPinned: boolean;
}

const mockThreads: DiscussionThread[] = [
  { id: "THR-101", category: "Announcements", title: "🏆 DTA Hackathon 2026 — Registration Now Open!", author: "Academic Office", replies: 42, views: 834, postedAt: "1 day ago", isPinned: true },
  { id: "THR-102", category: "Tech Help", title: "How do I fix a merge conflict in my GitHub PR?", author: "Kofi Asante", replies: 9, views: 147, postedAt: "3 hours ago", isPinned: false },
  { id: "THR-103", category: "Innovation", title: "Pitch Deck Submission Guidelines for Innovation Sprint Q3", author: "Innovation Lab Team", replies: 18, views: 312, postedAt: "2 days ago", isPinned: true },
  { id: "THR-104", category: "General", title: "Best resources for learning TypeScript generics?", author: "Aisha Ibrahim", replies: 6, views: 95, postedAt: "5 hours ago", isPinned: false },
  { id: "THR-105", category: "Alumni", title: "How I landed my first remote engineering role at Paystack", author: "David Okonjo (Alumni)", replies: 31, views: 657, postedAt: "4 days ago", isPinned: false },
];

export class CommunityService {
  public static getThreads(): DiscussionThread[] {
    return [...mockThreads];
  }
}
