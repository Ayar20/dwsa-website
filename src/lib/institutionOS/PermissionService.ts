import { Permission, UserRole } from "@/types/institutionOS";

const rolePermissionMatrix: Record<UserRole, Permission[]> = {
  SUPER_ADMIN: [
    "CanApproveCertificates",
    "CanManageFaculty",
    "CanReviewAssignments",
    "CanPublishResearch",
    "CanManageFinance",
    "CanCreateProgrammes",
    "CanViewExecutiveReports",
    "CanManageAdmissions",
    "CanAccessDigitalTwin",
    "CanManageSystemSettings",
  ],
  ADMIN: [
    "CanApproveCertificates",
    "CanManageFaculty",
    "CanReviewAssignments",
    "CanPublishResearch",
    "CanManageFinance",
    "CanCreateProgrammes",
    "CanViewExecutiveReports",
    "CanManageAdmissions",
    "CanAccessDigitalTwin",
    "CanManageSystemSettings",
  ],
  INSTRUCTOR: [
    "CanReviewAssignments",
    "CanPublishResearch",
    "CanCreateProgrammes",
  ],
  STUDENT: [],
  CORPORATE_LEARNER: [],
};

export class PermissionService {
  public static hasPermission(role: UserRole, permission: Permission): boolean {
    const permissions = rolePermissionMatrix[role] || [];
    return permissions.includes(permission);
  }

  public static getPermissions(role: UserRole): Permission[] {
    return rolePermissionMatrix[role] || [];
  }
}
