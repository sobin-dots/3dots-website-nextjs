import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { blogCategorySchema } from "@/lib/validations";

export async function GET() {
  try {
    const categories = await prisma.blogCategory.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(categories);
  } catch {
    return NextResponse.json({ error: "Failed to fetch categories" }, { status: 500 });
  }
}

export async function POST(req: Request) {
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

    // Check if slug or name exists
    const existing = await prisma.blogCategory.findFirst({
      where: {
        OR: [
          { name },
          { slug }
        ]
      }
    });

    if (existing) {
      return NextResponse.json({ 
        error: "A category with this name or slug already exists" 
      }, { status: 400 });
    }

    const category = await prisma.blogCategory.create({
      data: { name, slug },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.error("DEBUG: Category Create Error:", error);
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
}
