import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

const initializeSchema = z.object({
  enrollmentId: z.string().min(1, "Enrollment ID is required"),
  amount: z.number().min(100, "Minimum payment amount is ₦100").optional(),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized: Authentication required" }, { status: 401 });
    }

    const body = await req.json();
    const validated = initializeSchema.parse(body);

    // 1. Fetch enrollment and verify ownership
    const enrollment = await prisma.enrollment.findUnique({
      where: { id: validated.enrollmentId },
      include: { user: true, cohort: { include: { programme: true } } },
    });

    if (!enrollment) {
      return NextResponse.json({ error: "Enrollment record not found" }, { status: 404 });
    }

    // IDOR Protection: Confirm enrollment belongs to authenticated user
    if (enrollment.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden: Access denied to this enrollment" }, { status: 403 });
    }

    // Check if already fully enrolled
    if (enrollment.status === "ENROLLED" || enrollment.status === "COMPLETED") {
      return NextResponse.json({ error: "Enrollment is already fully active and paid" }, { status: 400 });
    }

    // 2. Authoritative server-side amount calculation
    const totalAmount = Number(enrollment.totalAmount);
    const amountPaid = Number(enrollment.amountPaid);
    const outstandingBalance = totalAmount - amountPaid;

    if (outstandingBalance <= 0) {
      return NextResponse.json({ error: "No outstanding tuition balance remains for this enrollment" }, { status: 400 });
    }

    // Determine charge amount: if user specified a partial amount, validate min ₦100 up to outstanding balance
    const chargeAmount = validated.amount
      ? Math.min(Math.max(validated.amount, 100), outstandingBalance)
      : outstandingBalance;

    // Convert to Paystack currency subunit (kobo integer)
    const amountInKobo = Math.round(chargeAmount * 100);

    // 3. Hyphen-only Paystack reference format: DWSA-DTA-GENAI-<suffix>-<timestamp>
    const reference = `DWSA-DTA-GENAI-${enrollment.id.slice(-6)}-${Date.now()}`;

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;

    // Fail-Closed & Mock Safety: If secret key is missing
    if (!paystackSecret) {
      if (process.env.NODE_ENV === "production") {
        console.error("CRITICAL: PAYSTACK_SECRET_KEY is unconfigured in production environment");
        return NextResponse.json({ error: "Payment gateway misconfigured. Please contact support." }, { status: 500 });
      }

      console.warn("PAYSTACK_SECRET_KEY missing in dev environment. Returning unconfigured status (does NOT activate learner).");

      // In dev mode without Paystack key, create INITIATED record but do NOT activate learner
      await prisma.paymentRecord.create({
        data: {
          enrollmentId: enrollment.id,
          provider: "PAYSTACK",
          providerRef: reference,
          amount: outstandingBalance,
          currency: "NGN",
          status: "INITIATED",
        },
      });

      return NextResponse.json({
        mock: true,
        reference,
        message: "Paystack secret key is unconfigured in local environment. Payment initialized in PENDING state.",
        checkoutUrl: "/dashboard/student?payment=unconfigured_notice",
      });
    }

    // 4. Initialize real Paystack Transaction via Server API
    const callbackUrl = `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/dashboard/student?payment=processing&ref=${reference}`;

    const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${paystackSecret}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: enrollment.user.email,
        amount: amountInKobo,
        reference,
        callback_url: callbackUrl,
        metadata: {
          enrollmentId: enrollment.id,
          userId: session.user.id,
          programmeTitle: enrollment.cohort.programme?.title || "Generative AI for Work & Productivity",
        },
      }),
    });

    const paystackData = await paystackResponse.json();

    if (!paystackData.status) {
      return NextResponse.json({ error: paystackData.message || "Paystack initialization failed" }, { status: 500 });
    }

    // 5. Create PaymentRecord in INITIATED status
    await prisma.paymentRecord.create({
      data: {
        enrollmentId: enrollment.id,
        provider: "PAYSTACK",
        providerRef: reference,
        amount: outstandingBalance,
        currency: "NGN",
        status: "INITIATED",
      },
    });

    // Write audit log for initialization
    await prisma.auditLog.create({
      data: {
        userId: session.user.id,
        action: "PAYMENT_INITIALIZED",
        targetId: enrollment.id,
        details: `Paystack payment initialized. Ref: ${reference}, Amount: ₦${outstandingBalance.toLocaleString()}`,
      },
    });

    return NextResponse.json({
      success: true,
      checkoutUrl: paystackData.data.authorization_url,
      accessCode: paystackData.data.access_code,
      reference,
    });
  } catch (error: any) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Validation Error", details: error.issues }, { status: 400 });
    }
    console.error("Payment initialization error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
