import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ ref: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized: Authentication required" }, { status: 401 });
    }

    const { ref } = await params;
    const reference = decodeURIComponent(ref);

    if (!reference) {
      return NextResponse.json({ error: "Transaction reference is required" }, { status: 400 });
    }

    // Locate PaymentRecord
    const paymentRecord = await prisma.paymentRecord.findFirst({
      where: { providerRef: reference },
      include: { enrollment: { include: { user: true, cohort: true } } },
    });

    if (!paymentRecord) {
      return NextResponse.json({ error: "Payment record not found" }, { status: 404 });
    }

    // Verify ownership
    if (paymentRecord.enrollment.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden: Access denied" }, { status: 403 });
    }

    // If already marked SUCCESSFUL
    if (paymentRecord.status === "SUCCESSFUL") {
      return NextResponse.json({
        success: true,
        status: "SUCCESSFUL",
        enrolled: paymentRecord.enrollment.status === "ENROLLED",
        enrollmentStatus: paymentRecord.enrollment.status,
        amountPaid: Number(paymentRecord.enrollment.amountPaid),
        totalAmount: Number(paymentRecord.enrollment.totalAmount),
        message: "Payment verified successfully.",
      });
    }

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecret) {
      return NextResponse.json({ error: "Payment gateway key not configured." }, { status: 500 });
    }

    // Call Paystack verification API
    const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${paystackSecret}`,
        "Content-Type": "application/json",
      },
    });

    const verifyData = await verifyRes.json();

    if (!verifyData.status || verifyData.data.status !== "success") {
      return NextResponse.json({
        success: false,
        status: verifyData.data?.status || "pending",
        message: verifyData.data?.gateway_response || "Payment pending or not confirmed on gateway yet.",
      });
    }

    const verifiedTx = verifyData.data;
    const paidNaira = verifiedTx.amount / 100;
    const enrollment = paymentRecord.enrollment;
    const currentPaid = Number(enrollment.amountPaid);
    const totalAmount = Number(enrollment.totalAmount);
    const newAmountPaid = currentPaid + paidNaira;
    const isFullyPaid = newAmountPaid >= totalAmount;
    const newStatus = isFullyPaid ? "ENROLLED" : enrollment.status;

    // Atomic update
    await prisma.$transaction([
      prisma.paymentRecord.update({
        where: { id: paymentRecord.id },
        data: {
          status: "SUCCESSFUL",
          amount: paidNaira,
          verificationDate: new Date(),
        },
      }),
      prisma.enrollment.update({
        where: { id: enrollment.id },
        data: {
          amountPaid: newAmountPaid,
          status: newStatus,
        },
      }),
      prisma.auditLog.create({
        data: {
          userId: enrollment.userId,
          action: "PAYMENT_VERIFIED_SYNC",
          targetId: enrollment.id,
          details: `Paystack payment verified via student sync. Ref: ${reference}, Amount: ₦${paidNaira.toLocaleString()}`,
        },
      }),
    ]);

    return NextResponse.json({
      success: true,
      status: "SUCCESSFUL",
      enrolled: isFullyPaid,
      enrollmentStatus: newStatus,
      amountPaid: newAmountPaid,
      totalAmount,
      message: isFullyPaid
        ? "Full tuition payment confirmed! Your digital campus workspace is now unlocked."
        : `Payment of ₦${paidNaira.toLocaleString()} confirmed! Remaining balance: ₦${(totalAmount - newAmountPaid).toLocaleString()}. Full payment is required to unlock course modules.`,
    });
  } catch (error: any) {
    console.error("Payment sync verification error:", error);
    return NextResponse.json({ error: error.message || "Verification failed" }, { status: 500 });
  }
}
