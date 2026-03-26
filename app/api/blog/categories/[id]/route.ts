import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { blogCategorySchema } from "@/lib/validations";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const json = await req.json();
    const result = blogCategorySchema.safeParse(json);
    
    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
    }

    const { name, slug } = result.data;

    // Check if another category has same name or slug
    const existing = await prisma.blogCategory.findFirst({
      where: {
        OR: [{ name }, { slug }],
        NOT: { id: params.id },
      },
    });

    if (existing) {
      return NextResponse.json({ 
        error: "Another category with this name or slug already exists" 
      }, { status: 400 });
    }

    const category = await prisma.blogCategory.update({
      where: { id: params.id },
      data: { name, slug },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.error("DEBUG: Category Update Error:", error);
    return NextResponse.json({ error: "Failed to update category" }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    await prisma.blogCategory.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: "Category deleted" });
  } catch {
    return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
  }
}
