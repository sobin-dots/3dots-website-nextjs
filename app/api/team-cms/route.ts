import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { teamMemberSchema } from "@/lib/validations";

export async function GET() {
  try {
    const team = await prisma.teamMember.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(team);
  } catch (_error) {
    return NextResponse.json({ error: "Failed to fetch team" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const json = await req.json();
    const result = teamMemberSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
    }

    const member = await prisma.teamMember.create({
      data: {
        ...result.data,
        socials: result.data.socials as any, // Json field
      },
    });
    return NextResponse.json(member);
  } catch (_error) {
    return NextResponse.json({ error: "Failed to create member" }, { status: 500 });
  }
}
