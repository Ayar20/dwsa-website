/**
 * CompetencyService.ts
 * InstitutionOS Core Service — Persistent Competency Intelligence & Assessment Records
 */

export interface CompetencyRecordItem {
  id: string;
  studentId: string;
  competency: string;
  score: number;
  level: "Proficient" | "Advanced" | "Expert";
  assessedBy: string;
  assessmentType: "FacultyValidation" | "AutomatedRubric" | "PeerReview";
  remarks?: string;
  createdAt: string;
}

const mockCompetencyRecords: CompetencyRecordItem[] = [
  { id: "COMP-101", studentId: "std_01", competency: "Programming & Syntax", score: 92, level: "Advanced", assessedBy: "Dr. Olumide Adeleke", assessmentType: "FacultyValidation", remarks: "Demonstrated strong clean code principles.", createdAt: "2026-07-15" },
  { id: "COMP-102", studentId: "std_01", competency: "Problem Solving & Algorithmic", score: 88, level: "Advanced", assessedBy: "Aisha Mohammed, MSc", assessmentType: "AutomatedRubric", remarks: "Passed all algorithmic test cases.", createdAt: "2026-07-20" },
  { id: "COMP-103", studentId: "std_01", competency: "Collaboration & Teamwork", score: 95, level: "Expert", assessedBy: "Dr. Olumide Adeleke", assessmentType: "FacultyValidation", remarks: "Excellent PR review leadership.", createdAt: "2026-07-25" },
  { id: "COMP-104", studentId: "std_01", competency: "Version Control & GitHub", score: 98, level: "Expert", assessedBy: "Automated GitHub Action", assessmentType: "AutomatedRubric", remarks: "24 verified commits and zero merge conflicts.", createdAt: "2026-08-01" },
];

export class CompetencyService {
  private static records: CompetencyRecordItem[] = [...mockCompetencyRecords];

  public static getStudentCompetencies(studentId: string): CompetencyRecordItem[] {
    return this.records.filter((r) => r.studentId === studentId || studentId === "std_01");
  }

  public static getAverageCompetencyScore(studentId: string): number {
    const studentRecs = this.getStudentCompetencies(studentId);
    if (studentRecs.length === 0) return 0;
    const sum = studentRecs.reduce((acc, r) => acc + r.score, 0);
    return Math.round(sum / studentRecs.length);
  }

  public static addValidation(record: Omit<CompetencyRecordItem, "id" | "createdAt">): CompetencyRecordItem {
    const newRecord: CompetencyRecordItem = {
      ...record,
      id: `COMP-${Date.now()}`,
      createdAt: new Date().toISOString().split("T")[0],
    };
    this.records.unshift(newRecord);
    return newRecord;
  }
}
