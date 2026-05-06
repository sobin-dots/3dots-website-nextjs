import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

interface Ctx {
  params: Promise<{ id: string }>;
}

export async function GET(_req: Request, { params }: Ctx) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const newsletter = await prisma.newsletter.findUnique({
      where: { id },
      include: {
        targetGroups: {
          include: { group: { select: { id: true, name: true, color: true } } },
        },
      },
    });
    if (!newsletter) {
      return NextResponse.json({ error: "Newsletter not found" }, { status: 404 });
    }
    return NextResponse.json(newsletter);
  } catch (error) {
    console.error("Failed to fetch newsletter", error);
    return NextResponse.json({ error: "Failed to fetch newsletter" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: Ctx) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    const body = await req.json();
    const existing = await prisma.newsletter.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Newsletter not found" }, { status: 404 });
    }
    if (existing.status === "SENT") {
      return NextResponse.json({ error: "Cannot edit a sent newsletter" }, { status: 400 });
    }

    const data: Record<string, unknown> = {};
    if (typeof body.title === "string") data.title = body.title.trim();
    if (typeof body.subject === "string") data.subject = body.subject.trim();
    if (typeof body.preheader === "string") data.preheader = body.preheader.trim() || null;
    if (typeof body.content === "string") data.content = body.content;
    if (typeof body.sendToAll === "boolean") data.sendToAll = body.sendToAll;

    const updated = await prisma.$transaction(async (tx: typeof prisma) => {
      const newsletter = await tx.newsletter.update({ where: { id }, data });
      if (Array.isArray(body.groupIds)) {
        await tx.newsletterTargetGroup.deleteMany({ where: { newsletterId: id } });
        if (body.groupIds.length > 0) {
          await tx.newsletterTargetGroup.createMany({
            data: body.groupIds.map((groupId: string) => ({ newsletterId: id, groupId })),
            skipDuplicates: true,
          });
        }
      }
      return newsletter;
    });

    const final = await prisma.newsletter.findUnique({
      where: { id: updated.id },
      include: { targetGroups: { include: { group: true } } },
    });
    return NextResponse.json(final);
  } catch (error) {
    console.error("Failed to update newsletter", error);
    return NextResponse.json({ error: "Failed to update newsletter" }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  try {
    await prisma.newsletter.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete newsletter", error);
    return NextResponse.json({ error: "Failed to delete newsletter" }, { status: 500 });
  }
}
