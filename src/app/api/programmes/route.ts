import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Strictly filter by isPublished === true to prevent draft exposure
    const programmes = await prisma.programme.findMany({
      where: { isPublished: true },
      include: {
        cohorts: {
          where: { status: { in: ["UPCOMING", "ACTIVE"] } },
          select: {
            id: true,
            cohortCode: true,
            title: true,
            startDate: true,
            endDate: true,
            capacity: true,
            status: true,
          },
        },
        modules: {
          select: {
            id: true,
            title: true,
            order: true,
            durationMinutes: true,
            isFreePreview: true,
          },
          orderBy: { order: "asc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ programmes });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch published programmes" }, { status: 500 });
  }
}
