import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { blogPostSchema } from "@/lib/validations";

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { date: "desc" },
      include: {
        author: {
          select: { name: true, email: true, role: true }
        }
      }
    });
    return NextResponse.json(posts);
  } catch (_error) {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const json = await req.json();
    const result = blogPostSchema.safeParse(json);
    
    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
    }

    const { date, ...postData } = result.data;

    // Check if slug exists
    const existingPost = await prisma.post.findUnique({
      where: { slug: postData.slug },
    });

    if (existingPost) {
      return NextResponse.json({ 
        error: { fieldErrors: { slug: ["A post with this slug already exists"] } } 
      }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email as string }
    });

    const post = await prisma.post.create({
      data: {
        ...postData,
        date: date ? new Date(date) : new Date(),
        authorId: user?.id,
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    console.error("DEBUG: Blog Create Error:", error);
    const message = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ 
      error: "Failed to create post", 
      details: message 
    }, { status: 500 });
  }
}
