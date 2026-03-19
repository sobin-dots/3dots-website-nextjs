import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { launchpadApplicationSchema } from "@/lib/validations";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const apps = await prisma.launchpadApplication.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(apps);
  } catch (_error) {
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const result = launchpadApplicationSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
    }

    const app = await prisma.launchpadApplication.create({
      data: result.data,
    });
    return NextResponse.json(app);
  } catch (_error) {
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
