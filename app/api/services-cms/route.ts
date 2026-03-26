/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { serviceSchema } from "@/lib/validations";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(services);
  } catch (_error) {
    return NextResponse.json({ error: "Failed to fetch services" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const json = await req.json();
    const result = serviceSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
    }

    const service = await prisma.service.create({
      data: {
        ...result.data,
        features: result.data.features as any, // Json field
      },
    });
    return NextResponse.json(service);
  } catch (_error) {
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}
