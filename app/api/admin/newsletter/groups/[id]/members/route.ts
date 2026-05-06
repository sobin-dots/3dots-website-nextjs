import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

interface Ctx {
  params: Promise<{ id: string }>;
}

export async function POST(req: Request, { params }: Ctx) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: groupId } = await params;
  try {
    const body = await req.json();
    const subscriberIds: string[] = Array.isArray(body.subscriberIds) ? body.subscriberIds : [];
    if (subscriberIds.length === 0) {
      return NextResponse.json({ error: "No subscribers provided" }, { status: 400 });
    }

    const group = await prisma.newsletterGroup.findUnique({ where: { id: groupId } });
    if (!group) {
      return NextResponse.json({ error: "Group not found" }, { status: 404 });
    }

    await prisma.newsletterGroupMember.createMany({
      data: subscriberIds.map((subscriberId) => ({ groupId, subscriberId })),
      skipDuplicates: true,
    });

    return NextResponse.json({ success: true, added: subscriberIds.length });
  } catch (error) {
    console.error("Failed to add members", error);
    return NextResponse.json({ error: "Failed to add members" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: Ctx) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: groupId } = await params;
  try {
    const body = await req.json();
    const subscriberIds: string[] = Array.isArray(body.subscriberIds) ? body.subscriberIds : [];
    if (subscriberIds.length === 0) {
      return NextResponse.json({ error: "No subscribers provided" }, { status: 400 });
    }

    await prisma.newsletterGroupMember.deleteMany({
      where: { groupId, subscriberId: { in: subscriberIds } },
    });

    return NextResponse.json({ success: true, removed: subscriberIds.length });
  } catch (error) {
    console.error("Failed to remove members", error);
    return NextResponse.json({ error: "Failed to remove members" }, { status: 500 });
  }
}
