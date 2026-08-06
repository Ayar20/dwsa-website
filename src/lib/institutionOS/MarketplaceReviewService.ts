export interface ReviewRecord {
  id: string;
  extensionId: string;
  authorName: string;
  institutionName: string;
  rating: number;
  comment: string;
  createdDate: string;
}

export class MarketplaceReviewService {
  static getReviews(extensionId: string): ReviewRecord[] {
    return [
      { id: "rev-01", extensionId, authorName: "Dr. Emmanuel K.", institutionName: "Digital Technology Academy", rating: 5, comment: "Transformative SCORM player. Zero latency during exams.", createdDate: "2026-07-20" },
      { id: "rev-02", extensionId, authorName: "Prof. Sarah O.", institutionName: "West Africa Business School", rating: 4.8, comment: "Easy installation and seamless Moodle sync.", createdDate: "2026-07-28" },
    ];
  }
}
