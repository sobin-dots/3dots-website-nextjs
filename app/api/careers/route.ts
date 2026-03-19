import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { jobSchema } from "@/lib/validations";

export async function GET() {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(jobs);
  } catch (_error) {
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

    const job = await prisma.job.create({
      data: result.data,
    });
    return NextResponse.json(job);
  } catch (_error) {
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}
