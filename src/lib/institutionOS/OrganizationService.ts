/**
 * OrganizationService.ts
 * InstitutionOS v4.0 — Multi-Tenant Organization & Governance Engine
 * Manages institutional hierarchy, campuses, organizational units, and multi-tenant nodes.
 */

import { TenantService } from "./TenantService";
import type { Tenant } from "@/types/tenant";

export interface OrganizationNode {
  id: string;
  tenantId: string;
  name: string;
  code: string;
  type: "university" | "faculty" | "department" | "school" | "corporate_unit" | "campus";
  parentId?: string;
  headName?: string;
  headEmail?: string;
  status: "active" | "inactive";
  learnerCount: number;
  facultyCount: number;
}

const MOCK_ORGANIZATIONS: OrganizationNode[] = [
  {
    id: "org_dta_main",
    tenantId: "tenant_dta_001",
    name: "Digital Technology Academy Flagship Campus",
    code: "DTA-HQ",
    type: "university",
    headName: "Dr. Adaeze Okonkwo",
    headEmail: "adaeze@dwsa.africa",
    status: "active",
    learnerCount: 1180,
    facultyCount: 32,
  },
  {
    id: "org_dta_eng",
    tenantId: "tenant_dta_001",
    name: "School of Software & AI Engineering",
    code: "DTA-ENG",
    type: "school",
    parentId: "org_dta_main",
    headName: "Prof. Kwame Mensah",
    headEmail: "kwame@dwsa.africa",
    status: "active",
    learnerCount: 750,
    facultyCount: 20,
  },
  {
    id: "org_dta_data",
    tenantId: "tenant_dta_001",
    name: "School of Data & Cloud Architecture",
    code: "DTA-CLOUD",
    type: "school",
    parentId: "org_dta_main",
    headName: "Dr. Chidi Eze",
    headEmail: "chidi@dwsa.africa",
    status: "active",
    learnerCount: 430,
    facultyCount: 12,
  },
  {
    id: "org_unilag_main",
    tenantId: "tenant_unilag_002",
    name: "University of Lagos Tech Campus",
    code: "UNILAG-TC",
    type: "campus",
    headName: "Prof. Tokunbo Ayinde",
    headEmail: "vc@unilag.edu.ng",
    status: "active",
    learnerCount: 52,
    facultyCount: 5,
  },
];

export class OrganizationService {
  public static getOrganizationsForTenant(tenantId: string): OrganizationNode[] {
    return MOCK_ORGANIZATIONS.filter((o) => o.tenantId === tenantId);
  }

  public static getOrganizationById(id: string): OrganizationNode | undefined {
    return MOCK_ORGANIZATIONS.find((o) => o.id === id);
  }

  public static getAllOrganizations(): OrganizationNode[] {
    return [...MOCK_ORGANIZATIONS];
  }

  public static getTenantSummary(tenantId: string) {
    const orgs = this.getOrganizationsForTenant(tenantId);
    const tenant = TenantService.getTenantById(tenantId);
    return {
      tenantId,
      tenantName: tenant?.name ?? "Unknown",
      totalUnits: orgs.length,
      totalLearners: orgs.reduce((sum, o) => sum + o.learnerCount, 0),
      totalFaculty: orgs.reduce((sum, o) => sum + o.facultyCount, 0),
    };
  }
}
