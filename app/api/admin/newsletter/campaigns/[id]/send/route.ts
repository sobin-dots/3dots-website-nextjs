import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { sendEmail } from "@/lib/ses";

interface Ctx {
  params: Promise<{ id: string }>;
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function wrapAsEmail(args: {
  subject: string;
  preheader: string | null;
  bodyHtml: string;
  unsubscribeUrl?: string;
}): string {
  const { subject, preheader, bodyHtml, unsubscribeUrl } = args;
  const safeSubject = escapeHtml(subject);
  const safePreheader = preheader ? escapeHtml(preheader) : "";
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${safeSubject}</title>
</head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#0f172a;">
${safePreheader ? `<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${safePreheader}</div>` : ""}
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#f8fafc;padding:32px 0;">
  <tr>
    <td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 1px 3px rgba(15,23,42,0.05);max-width:600px;width:100%;">
        <tr>
          <td style="padding:40px 40px 8px;">
            ${bodyHtml}
          </td>
        </tr>
        <tr>
          <td style="padding:24px 40px 40px;border-top:1px solid #f1f5f9;color:#94a3b8;font-size:12px;line-height:1.6;text-align:center;">
            <p style="margin:0 0 8px;">You're receiving this email because you subscribed to updates from 3Dots.</p>
            ${unsubscribeUrl ? `<p style="margin:0;"><a href="${escapeHtml(unsubscribeUrl)}" style="color:#94a3b8;text-decoration:underline;">Unsubscribe</a></p>` : ""}
          </td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

async function logEmail(args: {
  to: string;
  subject: string;
  status: "SENT" | "FAILED";
  error?: string;
  messageId?: string;
  newsletterId: string;
}) {
  try {
    await prisma.emailLog.create({
      data: {
        formKey: `newsletter:${args.newsletterId}`,
        to: args.to,
        subject: args.subject,
        status: args.status,
        error: args.error,
        messageId: args.messageId,
      },
    });
  } catch (err) {
    console.error("Failed to write EmailLog:", err);
  }
}

export async function POST(req: Request, { params }: Ctx) {
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  let testRecipient: string | null = null;
  try {
    const body = await req.json().catch(() => ({}));
    if (body && typeof body.testRecipient === "string" && body.testRecipient.trim()) {
      testRecipient = body.testRecipient.trim();
    }
  } catch {
    /* no body — production send */
  }

  const newsletter = await prisma.newsletter.findUnique({
    where: { id },
    include: { targetGroups: true },
  });
  if (!newsletter) {
    return NextResponse.json({ error: "Newsletter not found" }, { status: 404 });
  }
  if (!testRecipient && newsletter.status === "SENT") {
    return NextResponse.json(
      { error: "Newsletter has already been sent" },
      { status: 400 }
    );
  }

  let recipients: { email: string; name: string | null }[] = [];

  if (testRecipient) {
    recipients = [{ email: testRecipient, name: null }];
  } else if (newsletter.sendToAll) {
    const all = await prisma.newsletterSubscriber.findMany({
      where: { status: "ACTIVE" },
      select: { email: true, name: true },
    });
    recipients = all;
  } else {
    const groupIds = newsletter.targetGroups.map((g: { groupId: any; }) => g.groupId);
    if (groupIds.length === 0) {
      return NextResponse.json(
        { error: "No target groups selected. Pick at least one group or enable Send to all." },
        { status: 400 }
      );
    }
    const members = await prisma.newsletterGroupMember.findMany({
      where: { groupId: { in: groupIds } },
      select: { subscriber: { select: { email: true, name: true, status: true } } },
    });
    const map = new Map<string, { email: string; name: string | null }>();
    for (const m of members) {
      if (m.subscriber.status === "ACTIVE") {
        map.set(m.subscriber.email, { email: m.subscriber.email, name: m.subscriber.name });
      }
    }
    recipients = Array.from(map.values());
  }

  if (recipients.length === 0) {
    return NextResponse.json(
      { error: "No active subscribers in the selected groups" },
      { status: 400 }
    );
  }

  const html = wrapAsEmail({
    subject: newsletter.subject,
    preheader: newsletter.preheader,
    bodyHtml: newsletter.content,
  });

  let success = 0;
  let failure = 0;

  for (const recipient of recipients) {
    const result = await sendEmail({
      to: recipient.email,
      subject: newsletter.subject,
      body: html,
      isHtml: true,
    });
    if (result.success) {
      success += 1;
    } else {
      failure += 1;
    }
    await logEmail({
      to: recipient.email,
      subject: newsletter.subject,
      status: result.success ? "SENT" : "FAILED",
      error: result.success ? undefined : result.error,
      messageId: result.messageId,
      newsletterId: newsletter.id,
    });
  }

  if (!testRecipient) {
    await prisma.newsletter.update({
      where: { id },
      data: {
        status: failure === recipients.length ? "FAILED" : "SENT",
        sentAt: new Date(),
        recipientCount: recipients.length,
        successCount: success,
        failureCount: failure,
      },
    });
  }

  return NextResponse.json({
    success: failure === 0,
    test: !!testRecipient,
    total: recipients.length,
    sent: success,
    failed: failure,
  });
}
