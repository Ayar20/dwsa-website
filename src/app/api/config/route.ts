import { NextResponse } from "next/server";
import { getSystemPricingConfig } from "@/lib/settings";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const config = await getSystemPricingConfig();
    return NextResponse.json(config);
  } catch (error: any) {
    return NextResponse.json({ error: error.message || "Failed to fetch config" }, { status: 500 });
  }
}
