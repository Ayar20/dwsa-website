import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/admin/modules — list all tracks with their modules
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const tracks = await prisma.track.findMany({
      include: {
        modules: {
          orderBy: { order: "asc" },
        },
      },
      orderBy: { title: "asc" },
    });

    return NextResponse.json({ tracks });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// POST /api/admin/modules — create or update a module
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const body = await req.json();
    const {
      id,          // present → update, absent → create
      trackId,
      title,
      order,
      contentMarkdown,
      githubStarterRepo,
      youtubeId,
      durationMinutes,
      isFreePreview,
    } = body;

    if (!trackId || !title || order == null || !contentMarkdown) {
      return NextResponse.json(
        { error: "trackId, title, order, and contentMarkdown are required." },
        { status: 400 }
      );
    }

    let module;
    if (id) {
      module = await prisma.module.update({
        where: { id },
        data: {
          trackId,
          title,
          order: Number(order),
          contentMarkdown,
          githubStarterRepo: githubStarterRepo || null,
          youtubeId: youtubeId || null,
          durationMinutes: durationMinutes ? Number(durationMinutes) : null,
          isFreePreview: Boolean(isFreePreview),
        },
      });
    } else {
      module = await prisma.module.create({
        data: {
          trackId,
          title,
          order: Number(order),
          contentMarkdown,
          githubStarterRepo: githubStarterRepo || null,
          youtubeId: youtubeId || null,
          durationMinutes: durationMinutes ? Number(durationMinutes) : null,
          isFreePreview: Boolean(isFreePreview),
        },
      });
    }

    return NextResponse.json({ success: true, module });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
