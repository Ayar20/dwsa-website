import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const bodyText = await req.text();
    const signature = req.headers.get("x-paystack-signature");
    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;

    if (paystackSecret && signature) {
      const hash = crypto
        .createHmac("sha512", paystackSecret)
        .update(bodyText)
        .digest("hex");

      if (hash !== signature) {
        return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
      }
    } else {
      console.warn("Paystack Webhook: Skipping signature verification (missing secret or header)");
    }

    const payload = JSON.parse(bodyText);
    const event = payload.event;

    if (event === "charge.success") {
      const data = payload.data;
      const amount = data.amount / 100; // convert kobo to Naira
      const reference = data.reference;
      const channel = data.channel;
      const enrollmentId = data.metadata?.enrollmentId;

      if (enrollmentId) {
        // Retrieve enrollment
        const enrollment = await prisma.enrollment.findUnique({
          where: { id: enrollmentId },
        });

        if (enrollment) {
          // Check if payment record already exists
          const existingPayment = await prisma.paymentRecord.findUnique({
            where: { paystackRef: reference },
          });

          if (!existingPayment) {
            const newAmountPaid = enrollment.amountPaid + amount;
            let newStatus = enrollment.status;

            if (enrollment.paymentPlan === "FULL_UPFRONT" && newAmountPaid >= 180000) {
              newStatus = "ACTIVE";
            } else if (enrollment.paymentPlan === "INSTALLMENT" && newAmountPaid >= 100000) {
              newStatus = "ACTIVE";
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
                  paystackRef: reference,
                  amount,
                  channel,
                },
              }),
            ]);

            console.log(`Webhook Success: Processed payment for enrollment ${enrollmentId}, amount: ₦${amount}`);
          }
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
