import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ code: string }> }) {
  try {
    const { code } = await params;

    if (!code || code.trim().length < 3) {
      return NextResponse.json({ error: "Invalid verification code" }, { status: 400 });
    }

    const cleanCode = code.trim();

    // Look up certificate by verificationCode or certificateNumber
    const certificate = await prisma.certificateRecord.findFirst({
      where: {
        OR: [
          { verificationCode: cleanCode },
          { certificateNumber: cleanCode },
        ],
      },
      include: {
        programme: {
          select: {
            title: true,
            school: true,
          },
        },
      },
    });

    if (!certificate) {
      return NextResponse.json({
        valid: false,
        error: "Credential not found. The verification code or certificate number does not match any record issued by DWSA Digital Technology Academy.",
      }, { status: 404 });
    }

    // Record public audit event
    await prisma.auditLog.create({
      data: {
        action: "CERTIFICATE_VERIFIED",
        targetId: certificate.id,
        details: `Public certificate verification lookup for code: ${cleanCode}. Status: ${certificate.verificationStatus}`,
      },
    });

    // Return ONLY safe public credential information
    return NextResponse.json({
      valid: certificate.verificationStatus === "VALID",
      credential: {
        certificateNumber: certificate.certificateNumber,
        verificationCode: certificate.verificationCode,
        verificationStatus: certificate.verificationStatus,
        certificateType: certificate.certificateType,
        recipientName: certificate.learnerNameSnapshot,
        programmeTitle: certificate.programmeTitleSnapshot || certificate.programme?.title,
        school: certificate.programme?.school || "School of Generative Artificial Intelligence",
        institution: "DWSA Digital Technology Academy (DTA)",
        operatingEntity: "Digital World Systems Africa Ltd (RC 9718724)",
        signatoryName: certificate.signatoryName,
        issueDate: certificate.issueDate,
        completionDate: certificate.completionDate,
      },
    });
  } catch (error: any) {
    console.error("Public certificate verification error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
