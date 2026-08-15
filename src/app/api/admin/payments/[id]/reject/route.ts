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
      return NextResponse.json({ error: "Forbidden: Admin privileges required to reject payments" }, { status: 403 });
    }

    const { reason } = await req.json().catch(() => ({ reason: "Verification failed" }));

    const paymentRecord = await prisma.paymentRecord.findUnique({
      where: { id },
    });

    if (!paymentRecord) {
      return NextResponse.json({ error: "Payment record not found" }, { status: 404 });
    }

    const adminEmail = session.user.email || session.user.id;

    await prisma.$transaction([
      prisma.paymentRecord.update({
        where: { id: paymentRecord.id },
        data: {
          status: "FAILED",
          verificationDate: new Date(),
          verifiedBy: adminEmail,
        },
      }),
      prisma.auditLog.create({
        data: {
          userId: session.user.id,
          action: "PAYMENT_MANUAL_REJECTED",
          targetId: paymentRecord.id,
          details: `Manual bank deposit ${paymentRecord.providerRef} rejected by Admin (${adminEmail}). Reason: ${reason}`,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: `Payment record ${paymentRecord.providerRef} rejected.`,
    });
  } catch (error: any) {
    console.error("Payment rejection error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
