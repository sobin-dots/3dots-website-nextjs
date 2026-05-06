import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const newsletters = await prisma.newsletter.findMany({
      orderBy: { updatedAt: "desc" },
      include: {
        targetGroups: {
          include: { group: { select: { id: true, name: true, color: true } } },
        },
      },
    });
    return NextResponse.json(newsletters);
  } catch (error) {
    console.error("Failed to fetch newsletters", error);
    return NextResponse.json({ error: "Failed to fetch newsletters" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const title = String(body.title || "").trim();
    const subject = String(body.subject || "").trim();
    const content = String(body.content || "");
    const preheader = body.preheader ? String(body.preheader).trim() : null;
    const sendToAll = Boolean(body.sendToAll);
    const groupIds: string[] = Array.isArray(body.groupIds) ? body.groupIds : [];

    if (!title || !subject) {
      return NextResponse.json({ error: "Title and subject are required" }, { status: 400 });
    }

    const newsletter = await prisma.newsletter.create({
      data: {
        title,
        subject,
        preheader,
        content,
        sendToAll,
        targetGroups: {
          create: groupIds.map((groupId) => ({ groupId })),
        },
      },
      include: {
        targetGroups: { include: { group: true } },
      },
    });
    return NextResponse.json(newsletter, { status: 201 });
  } catch (error) {
    console.error("Failed to create newsletter", error);
    return NextResponse.json({ error: "Failed to create newsletter" }, { status: 500 });
  }
}
