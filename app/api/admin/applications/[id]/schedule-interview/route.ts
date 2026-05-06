import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { sendFormEmail } from "@/lib/email-service";

const scheduleSchema = z.object({
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  mode: z.enum(["IN_PERSON", "VIDEO", "PHONE"]).optional().default("VIDEO"),
  location: z.string().optional().nullable(),
  interviewerName: z.string().optional().nullable(),
  requirements: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

const MODE_LABEL: Record<string, string> = {
  IN_PERSON: "In-person",
  VIDEO: "Video Call",
  PHONE: "Phone",
};

export async function POST(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { id } = await params;
    const json = await req.json();
    const result = scheduleSchema.safeParse(json);
    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
    }

    const application = await prisma.jobApplication.findUnique({
      where: { id },
      include: { job: true },
    });
    if (!application) {
      return NextResponse.json({ error: "Application not found" }, { status: 404 });
    }

    const { date, time, mode, location, interviewerName, requirements, notes } = result.data;

    const variables: Record<string, string> = {
      fullName: application.fullName,
      email: application.email,
      position: application.position || application.job?.title || "the position",
      jobTitle: application.job?.title || application.position || "the position",
      interviewDate: date,
      interviewTime: time,
      interviewMode: MODE_LABEL[mode] || mode,
      interviewLocation: location || (mode === "VIDEO" ? "Link will be shared separately" : ""),
      interviewerName: interviewerName || "the 3Dots team",
      requirements: requirements || "",
      notes: notes || "",
    };

    const sendResult = await sendFormEmail({
      formKey: "interview_invite",
      to: application.email,
      variables,
      fallback: {
        subject: `Interview invitation — {{jobTitle}} at 3Dots`,
        body: `<p>Hi {{fullName}},</p>
<p>We'd like to invite you to an interview for the <strong>{{jobTitle}}</strong> role.</p>
<table cellpadding="6" style="border-collapse:collapse;border:1px solid #eee;font-size:14px">
<tr><td><strong>Date</strong></td><td>{{interviewDate}}</td></tr>
<tr><td><strong>Time</strong></td><td>{{interviewTime}}</td></tr>
<tr><td><strong>Mode</strong></td><td>{{interviewMode}}</td></tr>
<tr><td><strong>Location / Link</strong></td><td>{{interviewLocation}}</td></tr>
<tr><td><strong>Interviewer</strong></td><td>{{interviewerName}}</td></tr>
</table>
<p><strong>What to prepare:</strong><br>{{requirements}}</p>
<p><strong>Notes:</strong><br>{{notes}}</p>
<p>Please confirm by replying to this email.</p>
<p>— 3Dots Talent Team</p>`,
      },
    });

    if (!sendResult.success) {
      return NextResponse.json(
        { error: sendResult.error || sendResult.reason || "Failed to send" },
        { status: 500 }
      );
    }
    return NextResponse.json({ success: true, messageId: sendResult.messageId });
  } catch (error) {
    console.error("Schedule interview error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
