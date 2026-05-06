import { prisma } from "./prisma";
import { renderTemplate, sendEmail, SendEmailResult } from "./ses";
import { getFormEvent } from "./email-forms";

export interface SendFormEmailInput {
  formKey: string;
  to: string | string[];
  variables?: Record<string, string | number | null | undefined>;
  /** Sent only if the mapped template is missing or disabled. */
  fallback?: { subject: string; body: string };
  replyTo?: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
}

export interface SendFormEmailResult extends SendEmailResult {
  skipped?: boolean;
  reason?: string;
}

async function logEmail(args: {
  formKey: string;
  templateId?: string | null;
  to: string;
  subject: string;
  status: "SENT" | "FAILED" | "SKIPPED";
  error?: string;
  messageId?: string;
}) {
  try {
    await prisma.emailLog.create({
      data: {
        formKey: args.formKey,
        templateId: args.templateId ?? undefined,
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

/**
 * Sends an email tied to a form event:
 *   1. Looks up the FormEmailMapping by formKey
 *   2. Loads the linked EmailTemplate
 *   3. Renders subject + body with the supplied variables
 *   4. Dispatches via AWS SES, logging success/failure
 *
 * If no mapping exists (or it's disabled / template inactive) and a `fallback`
 * is supplied, the fallback content is sent so the system never silently drops
 * a notification before the admin has configured templates.
 */
export async function sendFormEmail(
  input: SendFormEmailInput
): Promise<SendFormEmailResult> {
  const { formKey, to, variables = {}, fallback, replyTo, cc, bcc } = input;
  const recipients = Array.isArray(to) ? to.filter(Boolean) : to ? [to] : [];

  if (recipients.length === 0) {
    return { success: false, skipped: true, reason: "No recipient" };
  }

  if (!getFormEvent(formKey)) {
    console.warn(`sendFormEmail: unknown formKey "${formKey}"`);
  }

  const mapping = await prisma.formEmailMapping.findUnique({
    where: { formKey },
    include: { template: true },
  });

  let subject: string;
  let body: string;
  let templateId: string | null = null;

  if (mapping && mapping.enabled && mapping.template.isActive) {
    templateId = mapping.templateId;
    subject = renderTemplate(mapping.template.subject, variables);
    body = renderTemplate(mapping.template.body, variables);
  } else if (fallback) {
    subject = renderTemplate(fallback.subject, variables);
    body = renderTemplate(fallback.body, variables);
  } else {
    const reason = !mapping
      ? "No template mapped for form"
      : !mapping.enabled
      ? "Mapping disabled"
      : "Template inactive";
    await logEmail({
      formKey,
      to: recipients.join(", "),
      subject: "(skipped)",
      status: "SKIPPED",
      error: reason,
    });
    return { success: false, skipped: true, reason };
  }

  const result = await sendEmail({
    to: recipients,
    subject,
    body,
    replyTo,
    cc,
    bcc,
  });

  await logEmail({
    formKey,
    templateId,
    to: recipients.join(", "),
    subject,
    status: result.success ? "SENT" : "FAILED",
    error: result.success ? undefined : result.error,
    messageId: result.messageId,
  });

  return result;
}

export function getAdminEmail(): string {
  return process.env.ADMIN_EMAIL || process.env.SES_FROM_EMAIL || "";
}

/**
 * Convenience helper that fires-and-forgets the form email so route handlers
 * never fail because of an email problem.
 */
export function dispatchFormEmail(input: SendFormEmailInput): void {
  sendFormEmail(input).catch((err) => {
    console.error(`dispatchFormEmail[${input.formKey}] failed:`, err);
  });
}
