import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const bodyText = await req.text();
    const signature = req.headers.get("x-paystack-signature");
    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;

    // Fail-Closed: Require PAYSTACK_SECRET_KEY and signature
    if (!paystackSecret) {
      console.error("Paystack Webhook: Missing PAYSTACK_SECRET_KEY in server environment");
      return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
    }

    if (!signature) {
      return NextResponse.json({ error: "Missing x-paystack-signature header" }, { status: 400 });
    }

    // 1. Validate HMAC SHA512 signature
    const hash = crypto
      .createHmac("sha512", paystackSecret)
      .update(bodyText)
      .digest("hex");

    if (hash !== signature) {
      console.warn("Paystack Webhook: Invalid signature detected!");
      return NextResponse.json({ error: "Invalid webhook signature" }, { status: 400 });
    }

    const payload = JSON.parse(bodyText);
    const event = payload.event;

    // Process charge.success events
    if (event === "charge.success") {
      const data = payload.data;
      const reference = data.reference;

      if (!reference) {
        return NextResponse.json({ error: "Missing transaction reference" }, { status: 400 });
      }

      // 2. Locate PaymentRecord by providerRef
      const paymentRecord = await prisma.paymentRecord.findUnique({
        where: { providerRef: reference },
        include: { enrollment: true },
      });

      if (!paymentRecord) {
        console.warn(`Paystack Webhook: PaymentRecord with reference ${reference} not found.`);
        return NextResponse.json({ error: "Transaction reference not found" }, { status: 404 });
      }

      // 3. Strict Idempotency Check: If already marked SUCCESSFUL, return 200 without double crediting
      if (paymentRecord.status === "SUCCESSFUL") {
        console.log(`Paystack Webhook: Reference ${reference} already processed as SUCCESSFUL (Idempotent).`);
        return NextResponse.json({ received: true, message: "Transaction already processed" });
      }

      // 4. Verify transaction directly against Paystack Verification API
      const verifyRes = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${paystackSecret}`,
          "Content-Type": "application/json",
        },
      });

      const verifyData = await verifyRes.json();

      if (!verifyData.status || verifyData.data.status !== "success") {
        console.error(`Paystack Webhook: Paystack API verification failed for ref ${reference}`);
        await prisma.paymentRecord.update({
          where: { id: paymentRecord.id },
          data: { status: "FAILED" },
        });
        return NextResponse.json({ error: "Payment verification failed on Paystack API" }, { status: 400 });
      }

      const verifiedTx = verifyData.data;

      // 5. Verify reference, currency, and amount match expected values
      if (verifiedTx.reference !== reference) {
        console.error(`Paystack Webhook: Reference mismatch! Expected ${reference}, got ${verifiedTx.reference}`);
        return NextResponse.json({ error: "Transaction reference mismatch" }, { status: 400 });
      }

      if (verifiedTx.currency !== "NGN") {
        console.error(`Paystack Webhook: Currency mismatch! Expected NGN, got ${verifiedTx.currency}`);
        return NextResponse.json({ error: "Currency mismatch" }, { status: 400 });
      }

      const enrollment = paymentRecord.enrollment;
      const totalAmount = Number(enrollment.totalAmount);
      const amountPaid = Number(enrollment.amountPaid);
      const expectedKobo = Math.round(Number(paymentRecord.amount) * 100);

      // Verify exact expected kobo amount
      if (verifiedTx.amount < expectedKobo) {
        console.error(`Paystack Webhook: Underpayment detected! Expected ${expectedKobo} kobo, received ${verifiedTx.amount} kobo.`);
        return NextResponse.json({ error: "Payment amount does not satisfy required balance" }, { status: 400 });
      }

      // 6. Perform Atomic Database Transaction
      const paidNaira = verifiedTx.amount / 100;
      const newAmountPaid = amountPaid + paidNaira;
      const isFullyPaid = newAmountPaid >= totalAmount;
      const newStatus = isFullyPaid ? "ENROLLED" : enrollment.status;

      const transactionOps: any[] = [
        // Update PaymentRecord
        prisma.paymentRecord.update({
          where: { id: paymentRecord.id },
          data: {
            status: "SUCCESSFUL",
            amount: paidNaira,
            verificationDate: new Date(),
          },
        }),
        // Update Enrollment
        prisma.enrollment.update({
          where: { id: enrollment.id },
          data: {
            amountPaid: newAmountPaid,
            status: newStatus,
          },
        }),
        // Write AuditLog
        prisma.auditLog.create({
          data: {
            userId: enrollment.userId,
            action: "PAYMENT_SUCCESSFUL",
            targetId: enrollment.id,
            details: `Paystack payment verified via Webhook. Ref: ${reference}, Amount: ₦${paidNaira.toLocaleString()}`,
          },
        }),
      ];

      if (isFullyPaid) {
        transactionOps.push(
          prisma.auditLog.create({
            data: {
              userId: enrollment.userId,
              action: "ENROLLMENT_ACTIVATED",
              targetId: enrollment.id,
              details: `Enrollment activated to ENROLLED state for Cohort ${enrollment.cohortId}`,
            },
          })
        );
      }

      await prisma.$transaction(transactionOps);

      console.log(`Paystack Webhook Success: Activated enrollment ${enrollment.id} for reference ${reference}`);
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Paystack Webhook Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
