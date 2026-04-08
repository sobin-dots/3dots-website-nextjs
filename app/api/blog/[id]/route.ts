/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: { name: true, email: true, role: true }
        }
      }
    });
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }
    return NextResponse.json(post);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    const data = await req.json();

    // ✅ Strip fields Prisma doesn't accept in update
    const {
      id: _id,
      author,
      comments,
      createdAt,
      updatedAt,
      authorId,
      ...updateData
    } = data;

    const post = await prisma.post.update({
      where: { id },
      data: {
        ...updateData,
        date: updateData.date ? new Date(updateData.date) : undefined,
      },
      include: { author: true }
    });

    // Create Notification if status changed and author exists
    if (post.authorId && ["PUBLISHED", "REJECTED", "CHANGES_REQUESTED"].includes(post.status)) {
        const titleMap: any = {
            "PUBLISHED": "Article Published! 🚀",
            "REJECTED": "Article Review Update",
            "CHANGES_REQUESTED": "Changes Requested on Article"
        };
        
        const messageMap: any = {
            "PUBLISHED": `Your article "${post.title}" is now live on the website.`,
            "REJECTED": `Your article "${post.title}" was not approved for publication. Feedback: ${post.reviewComment || 'None'}`,
            "CHANGES_REQUESTED": `The editor has requested changes on "${post.title}". Feedback: ${post.reviewComment || 'Check review comments.'}`
        };

        await prisma.notification.create({
            data: {
                userId: post.authorId,
                title: titleMap[post.status] || "Blog Update",
                message: messageMap[post.status] || "Your blog status has been updated.",
                type: post.status === "REJECTED" ? "ERROR" : post.status === "PUBLISHED" ? "SUCCESS" : "WARNING"
            }
        });
    }

    return NextResponse.json(post);

  } catch (error) {
    console.error("❌ Blog update error:", error); // ✅ always log
    return NextResponse.json({ 
      error: "Failed to update post",
      msg: error
    }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;
    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ message: "Post deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}
