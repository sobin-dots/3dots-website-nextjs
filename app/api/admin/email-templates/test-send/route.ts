import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { emailTestSendSchema } from "@/lib/validations";
import { renderTemplate, sendEmail } from "@/lib/ses";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const json = await req.json();
    const result = emailTestSendSchema.safeParse(json);
    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
    }
    const { templateId, to, variables = {} } = result.data;

    const template = await prisma.emailTemplate.findUnique({ where: { id: templateId } });
    if (!template) return NextResponse.json({ error: "Template not found" }, { status: 404 });

    const stringVars: Record<string, string> = {};
    for (const [k, v] of Object.entries(variables)) stringVars[k] = String(v);

    const subject = renderTemplate(template.subject, stringVars);
    const body = renderTemplate(template.body, stringVars);

    const sendResult = await sendEmail({ to, subject, body });

    await prisma.emailLog.create({
      data: {
        formKey: "test_send",
        templateId,
        to,
        subject,
        status: sendResult.success ? "SENT" : "FAILED",
        error: sendResult.success ? undefined : sendResult.error,
        messageId: sendResult.messageId,
      },
    });

    if (!sendResult.success) {
      return NextResponse.json({ error: sendResult.error || "Failed to send" }, { status: 500 });
    }
    return NextResponse.json({ success: true, messageId: sendResult.messageId });
  } catch (error) {
    console.error("Test send error", error);
    return NextResponse.json({ error: "Failed to send test email" }, { status: 500 });
  }
}
