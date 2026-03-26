import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const subscriber = await prisma.newsletterSubscriber.findUnique({
      where: { email }
    });

    if (!subscriber) {
      return NextResponse.json({ error: "Subscription not found" }, { status: 404 });
    }

    // Update status to UNSUBSCRIBED instead of deleting to keep record (best practice)
    const updated = await prisma.newsletterSubscriber.update({
      where: { email },
      data: { status: "UNSUBSCRIBED" }
    });

    return NextResponse.json({ 
      message: "Unsubscribed successfully",
      email: updated.email 
    });
  } catch (error) {
    console.error("Unsubscribe Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
