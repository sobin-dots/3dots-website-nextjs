import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const groups = await prisma.newsletterGroup.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        _count: { select: { members: true } },
      },
    });
    return NextResponse.json(groups);
  } catch (error) {
    console.error("Failed to fetch groups", error);
    return NextResponse.json({ error: "Failed to fetch groups" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const name: string = (body.name || "").trim();
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const group = await prisma.newsletterGroup.create({
      data: {
        name,
        description: body.description?.trim() || null,
        color: body.color?.trim() || null,
      },
    });
    return NextResponse.json(group, { status: 201 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create group";
    if (message.includes("Unique constraint")) {
      return NextResponse.json({ error: "A group with this name already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Failed to create group" }, { status: 500 });
  }
}
