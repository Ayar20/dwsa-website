import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Test database connectivity
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      database: "connected",
      environment: process.env.NODE_ENV || "development",
      institution: "DWSA Digital Technology Academy (DTA)",
      operatingEntity: "Digital World Systems Africa Ltd (RC 9718724)",
      programme: "Generative AI for Work & Productivity (GENAI-WP-001)",
    });
  } catch (error: any) {
    console.error("Health check error:", error);
    return NextResponse.json(
      {
        status: "error",
        timestamp: new Date().toISOString(),
        database: "disconnected",
        error: error.message || "Database connection failure",
      },
      { status: 500 }
    );
  }
}
