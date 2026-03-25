import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jobApplicationSchema } from "@/lib/validations";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const result = jobApplicationSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
    }

    const application = await prisma.jobApplication.create({
      data: result.data,
    });
    
    return NextResponse.json({ message: "Application submitted successfully", id: application.id });
  } catch (error) {
    console.error("DEBUG Application Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
