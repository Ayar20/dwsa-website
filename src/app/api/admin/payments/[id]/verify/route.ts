import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = session.user.role || "LEARNER";
    const isAdmin = role === "DTA_ADMINISTRATOR" || role === "ADMIN" || role === "SUPER_ADMINISTRATOR";

    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden: Admin privileges required to verify payments" }, { status: 403 });
    }

    const paymentRecord = await prisma.paymentRecord.findUnique({
      where: { id },
      include: { enrollment: true },
    });

    if (!paymentRecord) {
      return NextResponse.json({ error: "Payment record not found" }, { status: 404 });
    }

    if (paymentRecord.status === "SUCCESSFUL") {
      return NextResponse.json({ error: "Payment record is already verified and marked SUCCESSFUL" }, { status: 400 });
    }

    const enrollment = paymentRecord.enrollment;
    const totalAmount = Number(enrollment.totalAmount);
    const adminEmail = session.user.email || session.user.id;

    // Perform atomic transaction to update PaymentRecord and activate Enrollment
    await prisma.$transaction([
      prisma.paymentRecord.update({
        where: { id: paymentRecord.id },
        data: {
          status: "SUCCESSFUL",
          verificationDate: new Date(),
          verifiedBy: adminEmail,
        },
      }),
      prisma.enrollment.update({
        where: { id: enrollment.id },
        data: {
          amountPaid: totalAmount,
          status: "ENROLLED",
        },
      }),
      prisma.auditLog.create({
        data: {
          userId: session.user.id,
          action: "PAYMENT_MANUAL_VERIFIED",
          targetId: paymentRecord.id,
          details: `Manual bank deposit ${paymentRecord.providerRef} verified by DTA Admin (${adminEmail}). Enrollment ${enrollment.id} set to ENROLLED.`,
        },
      }),
      prisma.auditLog.create({
        data: {
          userId: enrollment.userId,
          action: "ENROLLMENT_ACTIVATED",
          targetId: enrollment.id,
          details: `Enrollment activated via manual admin verification by ${adminEmail}`,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: `Payment record ${paymentRecord.providerRef} verified successfully. Enrollment activated.`,
    });
  } catch (error: any) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
