import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { contactInquirySchema } from "@/lib/validations";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const inquiries = await prisma.contactInquiry.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(inquiries);
  } catch (_error) {
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const result = contactInquirySchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
    }

    const inquiry = await prisma.contactInquiry.create({
      data: result.data,
    });
    return NextResponse.json(inquiry);
  } catch (_error) {
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}
