import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;

    const programme = await prisma.programme.findUnique({
      where: { slug },
      include: {
        cohorts: {
          where: { status: { in: ["UPCOMING", "ACTIVE"] } },
          include: {
            instructor: {
              select: { name: true, email: true },
            },
          },
        },
        modules: {
          orderBy: { order: "asc" },
        },
      },
    });

    if (!programme || !programme.isPublished) {
      return NextResponse.json(
        { error: "Programme not found or is currently an unpublished draft." },
        { status: 404 }
      );
    }

    return NextResponse.json({ programme });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Failed to fetch programme syllabus details" }, { status: 500 });
  }
}
