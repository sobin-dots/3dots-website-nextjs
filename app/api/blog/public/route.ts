import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      where: {
        status: "PUBLISHED"
      },

      orderBy: { date: "desc" },
      include: {
        author: {
          select: { name: true, image: true }
        }
      }
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Public Blog Fetch Error:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
