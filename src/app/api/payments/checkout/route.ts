import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { enrollmentId, amount } = await req.json();
    if (!enrollmentId || !amount || amount <= 0) {
      return NextResponse.json({ error: "Invalid payment parameters" }, { status: 400 });
    }

    const enrollment = await prisma.enrollment.findUnique({
      where: { id: enrollmentId },
      include: { user: true },
    });

    if (!enrollment) {
      return NextResponse.json({ error: "Enrollment not found" }, { status: 404 });
    }

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;

    if (!paystackSecret) {
      console.warn("PAYSTACK_SECRET_KEY is missing. Simulating mock payment...");

      // Update enrollment directly in mock mode
      const newAmountPaid = enrollment.amountPaid + amount;
      let newStatus = enrollment.status;

      if (enrollment.paymentPlan === "FULL_UPFRONT" && newAmountPaid >= 180000) {
        newStatus = "ACTIVE";
      } else if (enrollment.paymentPlan === "INSTALLMENT" && newAmountPaid >= 100000) {
        newStatus = "ACTIVE"; // Week 1-4 unlocked, active
      }

      await prisma.$transaction([
        prisma.enrollment.update({
          where: { id: enrollmentId },
          data: {
            amountPaid: newAmountPaid,
            status: newStatus,
          },
        }),
        prisma.paymentRecord.create({
          data: {
            enrollmentId,
            paystackRef: `MOCK_PAY_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
            amount,
            channel: "mock_gateway",
          },
        }),
      ]);

      return NextResponse.json({
        mock: true,
        checkoutUrl: "/dashboard/student?mock_payment=success",
      });
    }

    // Real Paystack integration
    const paystackUrl = "https://api.paystack.co/transaction/initialize";
    const callbackUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/dashboard/student?payment=success`;

    const response = await fetch(paystackUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${paystackSecret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: enrollment.user.email,
        amount: amount * 100, // Paystack requires amount in kobo
        callback_url: callbackUrl,
        metadata: {
          enrollmentId,
          amount,
        },
      }),
    });

    const data = await response.json();

    if (!data.status) {
      return NextResponse.json({ error: data.message || "Paystack initialization failed" }, { status: 500 });
    }

    return NextResponse.json({
      checkoutUrl: data.data.authorization_url,
      reference: data.data.reference,
    });
  } catch (error: any) {
    console.error("Checkout error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
