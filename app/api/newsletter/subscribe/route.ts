import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { dispatchFormEmail, getAdminEmail } from "@/lib/email-service";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const existing = await prisma.newsletterSubscriber.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Already subscribed" }, { status: 400 });
    }

    const subscriber = await prisma.newsletterSubscriber.create({ data: { email } });

    const baseUrl =
      process.env.NEXTAUTH_URL || process.env.NEXT_PUBLIC_BASE_URL || "https://3dots.co";
    const variables = {
      email,
      unsubscribeUrl: `${baseUrl}/api/newsletter/unsubscribe?email=${encodeURIComponent(email)}`,
      submittedAt: new Date().toLocaleString(),
    };

    dispatchFormEmail({
      formKey: "newsletter_user",
      to: email,
      variables,
      fallback: {
        subject: `Welcome to 3Dots`,
        body: `<p>Hi,</p>
          <p>Thanks for subscribing to the 3Dots newsletter. You'll get our latest stories, AI insights, and product updates straight to your inbox.</p>
          <p style="font-size:12px;color:#888">No longer interested? <a href="{{unsubscribeUrl}}">Unsubscribe</a>.</p>`,
      },
    });

    dispatchFormEmail({
      formKey: "newsletter_admin",
      to: getAdminEmail(),
      variables,
      fallback: {
        subject: `New Newsletter Subscriber`,
        body: `<p>{{email}} subscribed to the newsletter at {{submittedAt}}.</p>`,
      },
    });

    return NextResponse.json(subscriber);
  } catch (error) {
    console.error("Newsletter Subscription Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
