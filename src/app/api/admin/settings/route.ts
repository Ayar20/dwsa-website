import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { getSystemPricingConfig, updateSystemPricingConfig } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = (session.user as any).role || "LEARNER";
    const isAdmin = role === "DTA_ADMINISTRATOR" || role === "ADMIN" || role === "SUPER_ADMINISTRATOR" || role === "DTA_MANAGEMENT";

    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const config = await getSystemPricingConfig();
    return NextResponse.json(config);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to load admin settings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const role = (session.user as any).role || "LEARNER";
    const isAdmin = role === "DTA_ADMINISTRATOR" || role === "ADMIN" || role === "SUPER_ADMINISTRATOR" || role === "DTA_MANAGEMENT";

    if (!isAdmin) {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const body = await req.json();
    const updated = await updateSystemPricingConfig({
      standardPrice: body.standardPrice !== undefined ? Number(body.standardPrice) : undefined,
      earlyBirdPrice: body.earlyBirdPrice !== undefined ? Number(body.earlyBirdPrice) : undefined,
      earlyBirdSeats: body.earlyBirdSeats !== undefined ? Number(body.earlyBirdSeats) : undefined,
      earlyBirdActive: body.earlyBirdActive !== undefined ? Boolean(body.earlyBirdActive) : undefined,
      paystackCheckoutUrl: body.paystackCheckoutUrl !== undefined ? String(body.paystackCheckoutUrl) : undefined,
    });

    return NextResponse.json({ success: true, config: updated, message: "Settings saved successfully to database!" });
  } catch (error: any) {
    console.error("Failed to update admin settings:", error);
    return NextResponse.json({ error: error.message || "Failed to save admin settings" }, { status: 500 });
  }
}
