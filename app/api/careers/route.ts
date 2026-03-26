/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { jobSchema } from "@/lib/validations";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(jobs);
  } catch (error) {
    console.error("GET Careers Error:", error);
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const json = await req.json();
    const result = jobSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
    }
    
    // Auto-generate a readable slug from the title if it wasn't provided
    if (!result.data.slug) {
      result.data.slug = result.data.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }

    const job = await prisma.job.create({
      data: result.data,
    });
    return NextResponse.json(job);
  } catch (error: any) {
    console.error("DEBUG JOB POST ERROR:", error);
    // Log Prisma error code if it exists
    if (error.code) {
      console.error("Prisma Error Code:", error.code);
      console.error("Prisma Meta:", error.meta);
    }
    return NextResponse.json({ 
      error: "Failed to create job", 
      details: error.message || String(error),
      code: error.code
    }, { status: 500 });
  }
}
