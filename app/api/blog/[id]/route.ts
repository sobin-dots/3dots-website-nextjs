/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { blogPostSchema } from "@/lib/validations";

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
    const json = await req.json();
    
    const result = blogPostSchema.partial().safeParse(json);
    if (!result.success) {
      console.error("DEBUG: Zod Validation Error:", result.error.flatten());
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
    }

    const { 
      title, slug, excerpt, content, image, thumbnail, 
      category, readTime, published, status, reviewComment, tags
    } = result.data;

    // Construct valid update payload
    const updatePayload: any = {};
    if (title !== undefined) updatePayload.title = title;
    if (slug !== undefined) updatePayload.slug = slug;
    if (excerpt !== undefined) updatePayload.excerpt = excerpt;
    if (content !== undefined) updatePayload.content = content;
    if (image !== undefined) updatePayload.image = image;
    if (thumbnail !== undefined) updatePayload.thumbnail = thumbnail;
    if (category !== undefined) updatePayload.category = category;
    if (readTime !== undefined) updatePayload.readTime = readTime;
    if (published !== undefined) updatePayload.published = published;
    if (status !== undefined) updatePayload.status = status;
    if (reviewComment !== undefined) updatePayload.reviewComment = reviewComment;
    if (tags !== undefined) updatePayload.tags = { set: tags };

    console.log("DEBUG: Target ID:", id);
    console.log("DEBUG: Final updatePayload:", JSON.stringify(updatePayload, null, 2));

    const post = await prisma.post.update({
      where: { id },
      data: updatePayload,
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
