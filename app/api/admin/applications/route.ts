import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Ensure we don't instantiate new PrismaClient instances too often in dev
const globalForPrisma = global as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export async function GET() {
  try {
    const applications = await prisma.jobApplication.findMany({
      include: {
        job: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}
