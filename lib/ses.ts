import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  body: string;
  isHtml?: boolean;
  replyTo?: string | string[];
  cc?: string | string[];
  bcc?: string | string[];
  from?: string;
}

export interface SendEmailResult {
  success: boolean;
  messageId?: string;
  error?: string;
}

export async function sendEmail({
  to,
  subject,
  body,
  isHtml = true,
  replyTo,
  cc,
  bcc,
  from,
}: SendEmailOptions): Promise<SendEmailResult> {
  const fromEmail = from || process.env.SES_FROM_EMAIL;

  if (!fromEmail) {
    console.error("SES_FROM_EMAIL is not defined in environment variables");
    return { success: false, error: "Sender email not configured" };
  }

  const toAddresses = (Array.isArray(to) ? to : [to]).filter(Boolean);
  if (toAddresses.length === 0) {
    return { success: false, error: "No recipient addresses provided" };
  }

  const command = new SendEmailCommand({
    Source: fromEmail,
    Destination: {
      ToAddresses: toAddresses,
      CcAddresses: cc ? (Array.isArray(cc) ? cc : [cc]) : undefined,
      BccAddresses: bcc ? (Array.isArray(bcc) ? bcc : [bcc]) : undefined,
    },
    ReplyToAddresses: replyTo
      ? Array.isArray(replyTo)
        ? replyTo
        : [replyTo]
      : undefined,
    Message: {
      Subject: { Data: subject, Charset: "UTF-8" },
      Body: {
        [isHtml ? "Html" : "Text"]: { Data: body, Charset: "UTF-8" },
      },
    },
  });

  try {
    const response = await sesClient.send(command);
    return { success: true, messageId: response.MessageId };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Error sending email via SES:", message);
    return { success: false, error: message };
  }
}

/**
 * Replaces {{var}} placeholders with values from `variables`.
 * Missing keys are replaced with an empty string so the template still renders.
 */
export function renderTemplate(
  template: string,
  variables: Record<string, string | number | null | undefined>
): string {
  return template.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_, key) => {
    const value = variables[key];
    return value === undefined || value === null ? "" : String(value);
  });
}
