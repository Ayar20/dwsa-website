import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
import { z } from "zod";

const issueSchema = z.object({
  enrollmentId: z.string().min(1, "Enrollment ID is required"),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized: Authentication required" }, { status: 401 });
    }

    const role = session.user.role || "LEARNER";
    const isAdmin = role === "DTA_ADMINISTRATOR" || role === "ADMIN" || role === "SUPER_ADMINISTRATOR" || role === "DTA_MANAGEMENT";

    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden: Admin privileges required to issue certificates" }, { status: 403 });
    }

    const body = await req.json();
    const { enrollmentId } = issueSchema.parse(body);

    // 1. Fetch enrollment details
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: {
        user: true,
        cohort: {
          include: {
            programme: true,
          },
        },
      },
    });

    if (!enrollment) {
      return NextResponse.json({ error: "Enrollment record not found" }, { status: 404 });
    }

    // 2. Strict Paid Access Requirement: Enrollment.status === ENROLLED
    if (enrollment.status !== "ENROLLED" && enrollment.status !== "COMPLETED") {
      return NextResponse.json({
        error: "Eligibility Error: Certificate issuance requires an active, paid enrollment (ENROLLED status). Current status is " + enrollment.status,
      }, { status: 400 });
    }

    // 3. Idempotency Check: Return existing certificate if already issued
    const existingCert = await prisma.certificateRecord.findUnique({
      where: { enrollmentId },
    });

    if (existingCert) {
      console.log(`Certificate already exists for enrollment ${enrollmentId}. Returning idempotent result.`);
      return NextResponse.json({
        success: true,
        idempotent: true,
        certificate: existingCert,
      });
    }

    const programmeId = enrollment.cohort?.programmeId || enrollment.cohort?.programme?.id;
    const programmeTitle = enrollment.cohort?.programme?.title || "Generative AI for Work & Productivity";

    // 4. Server-Side Academic Requirements Eligibility Verification
    if (programmeId) {
      // Check required module assessments
      const moduleAssessments = await prisma.assessment.findMany({
        where: { module: { programmeId } },
      });

      if (moduleAssessments.length > 0) {
        const attempts = await prisma.assessmentAttempt.findMany({
          where: {
            userId: enrollment.userId,
            assessmentId: { in: moduleAssessments.map((a) => a.id) },
            passed: true,
          },
        });

        const passedAssessmentIds = new Set(attempts.map((a) => a.assessmentId));
        const allAssessmentsPassed = moduleAssessments.every((a) => passedAssessmentIds.has(a.id));

        if (!allAssessmentsPassed) {
          return NextResponse.json({
            error: "Eligibility Error: Learner has not passed all required module assessments for this programme.",
          }, { status: 400 });
        }
      }

      // Check required module assignments (GitHub PR submissions)
      const moduleAssignments = await prisma.assignment.findMany({
        where: { module: { programmeId } },
      });

      if (moduleAssignments.length > 0) {
        const approvedSubmissions = await prisma.submission.findMany({
          where: {
            userId: enrollment.userId,
            assignmentId: { in: moduleAssignments.map((a) => a.id) },
            status: "APPROVED",
          },
        });

        const approvedAssignmentIds = new Set(approvedSubmissions.map((s) => s.assignmentId));
        const allAssignmentsApproved = moduleAssignments.every((a) => approvedAssignmentIds.has(a.id));

        if (!allAssignmentsApproved) {
          return NextResponse.json({
            error: "Eligibility Error: Learner has not received APPROVED faculty status on all required practical assignments.",
          }, { status: 400 });
        }
      }
    }

    // 5. Certificate Number & Verification Code Generation
    const currentYear = new Date().getFullYear();
    const certCount = await prisma.certificateRecord.count();
    const sequentialNum = String(certCount + 1).padStart(5, "0");
    const certificateNumber = `DWSA-DTA-GENAI-${currentYear}-${sequentialNum}`;

    const rawRandomBytes = crypto.randomBytes(8).toString("hex").toUpperCase();
    const verificationCode = `DWSA-VERIFY-${rawRandomBytes.slice(0, 4)}-${rawRandomBytes.slice(4, 8)}`;

    const learnerName = enrollment.user.name || "DTA Graduate";

    // 6. Create CertificateRecord in DB
    const certificate = await prisma.certificateRecord.create({
      data: {
        certificateNumber,
        userId: enrollment.userId,
        programmeId: programmeId || "default_prog_id",
        cohortId: enrollment.cohortId,
        enrollmentId: enrollment.id,
        certificateType: "DTA Professional Diploma in Generative AI",
        verificationCode,
        verificationStatus: "VALID",
        signatoryName: "Digital Technology Academy Senate",
        learnerNameSnapshot: learnerName,
        programmeTitleSnapshot: programmeTitle,
      },
    });

    // 7. Write AuditLog entry
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "CERTIFICATE_ISSUED",
        targetId: certificate.id,
        details: `Certificate ${certificateNumber} issued to ${learnerName} for ${programmeTitle}. Code: ${verificationCode}`,
      },
    });

    return NextResponse.json({
      success: true,
      certificate,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation Error", details: error.issues }, { status: 400 });
    }
    console.error("Certificate issuance error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
