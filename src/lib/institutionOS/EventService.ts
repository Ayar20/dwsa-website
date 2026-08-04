/**
 * EventService.ts
 * InstitutionOS Core Service — Campus Events, Hackathons & Career Fair Engine
 */

export interface CampusEvent {
  id: string;
  title: string;
  category: "Hackathon" | "Career Fair" | "Bootcamp" | "Seminar" | "Corporate Session" | "Innovation Challenge";
  description: string;
  date: string;
  venue: string;
  registeredCount: number;
  capacity: number;
  isRegistered: boolean;
  hasCertificate: boolean;
}

const mockEvents: CampusEvent[] = [
  { id: "EVT-101", title: "DTA Global Hackathon 2026 — Build for Africa", category: "Hackathon", description: "48-hour AI + FinTech engineering sprint open to all active learners. Top 3 teams win corporate internship placements.", date: "Aug 18–20, 2026", venue: "DTA Virtual Hub + Lagos HQ", registeredCount: 84, capacity: 120, isRegistered: false, hasCertificate: true },
  { id: "EVT-102", title: "DTA Graduate Career Fair Q3 2026", category: "Career Fair", description: "Meet 30+ top employers including MTN, Access Bank, Paystack, and NITDA. On-the-spot interview slots available.", date: "Sept 5, 2026", venue: "DWSA Lagos Headquarters", registeredCount: 141, capacity: 200, isRegistered: false, hasCertificate: false },
  { id: "EVT-103", title: "React 18 & Next.js App Router — Deep Dive Bootcamp", category: "Bootcamp", description: "4-hour intensive session on React server components, streaming, and the new App Router architecture.", date: "Aug 9, 2026", venue: "Virtual — Zoom", registeredCount: 67, capacity: 80, isRegistered: true, hasCertificate: true },
  { id: "EVT-104", title: "DWSA Corporate Innovation Challenge 2026", category: "Innovation Challenge", description: "Student teams solve real-world corporate briefs. Top submissions reviewed by executives from First Bank & Google Africa.", date: "Aug 25 – Sept 8, 2026", venue: "Online Submission + Pitch Day Lagos", registeredCount: 48, capacity: 100, isRegistered: false, hasCertificate: true },
];

export class EventService {
  private static events: CampusEvent[] = [...mockEvents];

  public static getEvents(): CampusEvent[] {
    return [...this.events];
  }

  public static registerForEvent(id: string): void {
    const event = this.events.find((e) => e.id === id);
    if (event && !event.isRegistered && event.registeredCount < event.capacity) {
      event.isRegistered = true;
      event.registeredCount++;
    }
  }
}
