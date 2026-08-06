export interface DWSAConsultant {
  id: string;
  name: string;
  role: "Project Manager" | "Solution Architect" | "Implementation Engineer" | "Training Specialist" | "Customer Success Manager";
  assignedAccountsCount: number;
  location: string;
  utilizationRatePercent: number;
  csatRating: number;
}

export class ConsultantManagementService {
  static getConsultants(): DWSAConsultant[] {
    return [
      { id: "c-01", name: "Amina Yusuf (PMP)", role: "Project Manager", assignedAccountsCount: 4, location: "Lagos, Nigeria", utilizationRatePercent: 88, csatRating: 4.9 },
      { id: "c-02", name: "Dr. Olayinka Cole", role: "Solution Architect", assignedAccountsCount: 6, location: "Accra, Ghana", utilizationRatePercent: 92, csatRating: 5.0 },
      { id: "c-03", name: "Tunde Ednut", role: "Implementation Engineer", assignedAccountsCount: 5, location: "Abuja, Nigeria", utilizationRatePercent: 85, csatRating: 4.8 },
      { id: "c-04", name: "Blessing Okon", role: "Customer Success Manager", assignedAccountsCount: 8, location: "Nairobi, Kenya", utilizationRatePercent: 90, csatRating: 4.9 },
    ];
  }
}
