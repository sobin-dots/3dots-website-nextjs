import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { commentSchema } from "@/lib/validations";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await req.json();
    
    // Validate input
    const validatedData = commentSchema.parse({
      ...body,
      postId: id
    });

    const comment = await prisma.comment.create({
      data: {
        postId: id,
        author: validatedData.author,
        content: validatedData.content,
      },
    });

    return NextResponse.json(comment);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to post comment";
    console.error("Comment error:", error);
    return NextResponse.json(
      { error: message },
      { status: 400 }
    );
  }
}
