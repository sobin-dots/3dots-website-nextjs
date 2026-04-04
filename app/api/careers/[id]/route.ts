/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { jobSchema } from "@/lib/validations";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    await prisma.job.delete({ where: { id } });
    return NextResponse.json({ message: "Job deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const json = await req.json();
    const result = jobSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
    }

    if (!result.data.slug) {
      result.data.slug = result.data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    const job = await prisma.job.update({
      where: { id },
      data: result.data,
    });
    return NextResponse.json(job);
  } catch (error: any) {
    console.error("DEBUG JOB PUT ERROR:", error);
    // Log Prisma error code if it exists
    if (error.code) {
      console.error("Prisma Error Code:", error.code);
      console.error("Prisma Meta:", error.meta);
    }
    return NextResponse.json({ 
      error: "Failed to update job", 
      details: error.message || String(error),
      code: error.code
    }, { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const job = await prisma.job.findFirst({
      where: {
        OR: [{ id }, { slug: id }],
      },
    });

    if (!job) {
      return NextResponse.json({ error: "Job not found" }, { status: 404 });
    }

    return NextResponse.json(job);
  } catch (error) {
    console.error("DEBUG API ERROR:", error);
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
