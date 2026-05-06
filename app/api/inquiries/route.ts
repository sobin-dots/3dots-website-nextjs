import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { contactInquirySchema } from "@/lib/validations";
import { dispatchFormEmail, getAdminEmail } from "@/lib/email-service";

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

    const inquiry = await prisma.contactInquiry.create({ data: result.data });

    const variables = {
      name: result.data.name,
      email: result.data.email,
      phone: result.data.phone || "N/A",
      message: result.data.message,
      submittedAt: new Date().toLocaleString(),
    };

    // Admin notification
    dispatchFormEmail({
      formKey: "contact_admin",
      to: getAdminEmail(),
      replyTo: result.data.email,
      variables,
      fallback: {
        subject: `New Contact Inquiry: {{name}}`,
        body: `<h1>New Contact Inquiry</h1>
          <p><strong>Name:</strong> {{name}}</p>
          <p><strong>Email:</strong> {{email}}</p>
          <p><strong>Phone:</strong> {{phone}}</p>
          <p><strong>Message:</strong></p>
          <p>{{message}}</p>`,
      },
    });

    // User auto-reply
    dispatchFormEmail({
      formKey: "contact_user",
      to: result.data.email,
      variables,
      fallback: {
        subject: `We received your message — 3Dots`,
        body: `<p>Hi {{name}},</p>
          <p>Thanks for reaching out to 3Dots. We've received your message and our team will get back to you shortly.</p>
          <p style="color:#666"><em>For your records:</em><br>{{message}}</p>
          <p>— The 3Dots Team</p>`,
      },
    });

    return NextResponse.json(inquiry);
  } catch (_error) {
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 });
  }
}
