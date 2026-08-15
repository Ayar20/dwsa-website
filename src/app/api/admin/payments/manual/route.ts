import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const manualDepositSchema = z.object({
  enrollmentId: z.string().min(1, "Enrollment ID is required"),
  depositReference: z.string().min(3, "Bank deposit reference is required"),
  notes: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized: Authentication required" }, { status: 401 });
    }

    const body = await req.json();
    const validated = manualDepositSchema.parse(body);

    // Fetch enrollment and check ownership
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: validated.enrollmentId },
    });

    if (!enrollment) {
      return NextResponse.json({ error: "Enrollment record not found" }, { status: 404 });
    }

    // IDOR Protection: Must belong to authenticated user (unless user is an admin)
    const role = session.user.role || "LEARNER";
    const isAdmin = role === "DTA_ADMINISTRATOR" || role === "ADMIN" || role === "SUPER_ADMINISTRATOR";

    if (enrollment.userId !== session.user.id && !isAdmin) {
      return NextResponse.json({ error: "Forbidden: Access denied to this enrollment" }, { status: 403 });
    }

    if (enrollment.status === "ENROLLED" || enrollment.status === "COMPLETED") {
      return NextResponse.json({ error: "Enrollment is already fully active" }, { status: 400 });
    }

    const totalAmount = Number(enrollment.totalAmount);
    const amountPaid = Number(enrollment.amountPaid);
    const outstandingBalance = totalAmount - amountPaid;

    const providerRef = `BANK-DEP-${validated.depositReference.trim().toUpperCase()}`;

    // Check if depositRef already submitted
    const existing = await prisma.paymentRecord.findFirst({
      where: { providerRef },
    });

    if (existing) {
      return NextResponse.json(
        { error: "A payment record with this deposit reference has already been submitted." },
        { status: 400 }
      );
    }

    // Create PaymentRecord in PENDING_VERIFICATION status
    const paymentRecord = await prisma.paymentRecord.create({
      data: {
        enrollmentId: enrollment.id,
        provider: "MANUAL_BANK_TRANSFER",
        providerRef,
        amount: outstandingBalance,
        currency: "NGN",
        status: "PENDING_VERIFICATION",
      },
    });

    // Write AuditLog
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "PAYMENT_MANUAL_SUBMITTED",
        targetId: paymentRecord.id,
        details: `Manual bank deposit claim submitted. Ref: ${providerRef}, Amount: ₦${outstandingBalance.toLocaleString()}`,
      },
    });

    // Dynamic official corporate bank accounts returned securely
    const bankDetails = [
      {
        bankName: "Zenith Bank",
        accountNumber: "1312782600",
        accountName: "Digital World Systems Africa Ltd",
      },
      {
        bankName: "Fidelity Bank",
        accountNumber: "5601785436",
        accountName: "Digital World Systems Africa Ltd",
      },
      {
        bankName: "United Bank for Africa (UBA)",
        accountNumber: "1031059065",
        accountName: "Digital World Systems Africa Ltd",
      },
    ];

    return NextResponse.json({
      success: true,
      message: "Bank transfer claim submitted successfully. Awaiting DTA Admin verification.",
      paymentRecord,
      bankDetails,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation Error", details: error.issues }, { status: 400 });
    }
    console.error("Manual deposit submission error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
