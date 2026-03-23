import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const { type } = await req.json();

    if (type === "LIKE") {
      await prisma.post.update({
        where: { id },
        data: { likes: { increment: 1 } },
      });
    } else if (type === "DISLIKE") {
      await prisma.post.update({
        where: { id },
        data: { dislikes: { increment: 1 } },
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reaction error:", error);
    return NextResponse.json({ error: "Failed to update reaction" }, { status: 500 });
  }
}
