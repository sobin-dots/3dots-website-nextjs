import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { sendFormEmail } from "@/lib/email-service";
import { renderTemplate, sendEmail } from "@/lib/ses";
import { getFormEvent } from "@/lib/email-forms";

/**
 * Sends an email to the candidate behind a job application.
 *
 * Two modes:
 *   1. formKey:    use the FormEmailMapping (e.g. "job_application_shortlist") -
 *                  picks up admin-mapped templates, supports overrides.
 *   2. templateId: render a specific EmailTemplate by id.
 *   3. customSubject + customBody: free-form ad-hoc email.
 *
 * Variables from the application are auto-injected ({{fullName}}, {{jobTitle}}, ...).
 * Caller may also pass extra `variables` to override / extend.
 */
export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const body = await req.json();
    const {
      formKey,
      templateId,
      customSubject,
      customBody,
      variables: extraVars = {},
    } = body as {
      formKey?: string;
      templateId?: string;
      customSubject?: string;
      customBody?: string;
      variables?: Record<string, string>;
    };

    const application = await prisma.jobApplication.findUnique({
      where: { id },
      include: { job: true },
    });
    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    const baseVars: Record<string, string> = {
      fullName: application.fullName,
      email: application.email,
      phone: application.phone || "",
      position: application.position || application.job?.title || "the position",
      jobTitle: application.job?.title || application.position || "the position",
      status: application.status,
      ...extraVars,
    };

    // Mode 1: Use a form mapping (admin-configured template)
    if (formKey) {
      if (!getFormEvent(formKey)) {
        return NextResponse.json({ error: `Unknown formKey: ${formKey}` }, { status: 400 });
      }
      const result = await sendFormEmail({
        formKey,
        to: application.email,
        variables: baseVars,
      });
      if (!result.success) {
        return NextResponse.json(
          { error: result.error || result.reason || "Failed to send" },
          { status: 500 }
        );
      }
      return NextResponse.json({ success: true, messageId: result.messageId });
    }

    // Mode 2 & 3: Direct template id, or free-form
    let subject = customSubject || "";
    let bodyHtml = customBody || "";
    let usedTemplateId: string | null = null;

    if (templateId) {
      const template = await prisma.emailTemplate.findUnique({ where: { id: templateId } });
      if (!template) {
        return NextResponse.json({ error: "Template not found" }, { status: 404 });
      }
      usedTemplateId = template.id;
      subject = customSubject || renderTemplate(template.subject, baseVars);
      bodyHtml = customBody || renderTemplate(template.body, baseVars);
    } else if (subject || bodyHtml) {
      // Render placeholders in custom content too
      subject = renderTemplate(subject, baseVars);
      bodyHtml = renderTemplate(bodyHtml, baseVars);
    }

    if (!subject || !bodyHtml) {
      return NextResponse.json({ error: "Subject and body are required" }, { status: 400 });
    }

    const sendResult = await sendEmail({ to: application.email, subject, body: bodyHtml });

    await prisma.emailLog.create({
      data: {
        formKey: "application_manual_reply",
        templateId: usedTemplateId,
        to: application.email,
        subject,
        status: sendResult.success ? "SENT" : "FAILED",
        error: sendResult.success ? undefined : sendResult.error,
        messageId: sendResult.messageId,
      },
    });

    if (!sendResult.success) {
      return NextResponse.json(
        { error: "Failed to send email", details: sendResult.error },
        { status: 500 }
      );
    }
    return NextResponse.json({ success: true, messageId: sendResult.messageId });
  } catch (error) {
    console.error("Error sending application email:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
