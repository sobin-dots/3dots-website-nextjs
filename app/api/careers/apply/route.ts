import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { jobApplicationSchema } from "@/lib/validations";
import { dispatchFormEmail, getAdminEmail } from "@/lib/email-service";

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const result = jobApplicationSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
    }

    const application = await prisma.jobApplication.create({ data: result.data });

    const job = result.data.jobId
      ? await prisma.job.findUnique({ where: { id: result.data.jobId } })
      : null;

    const variables = {
      fullName: result.data.fullName,
      email: result.data.email,
      phone: result.data.phone || "N/A",
      position: result.data.position || job?.title || "General Application",
      jobTitle: job?.title || result.data.position || "General Application",
      resumeUrl: result.data.resumeUrl,
      coverLetter: result.data.coverLetter || "N/A",
      submittedAt: new Date().toLocaleString(),
    };

    dispatchFormEmail({
      formKey: "job_application_admin",
      to: getAdminEmail(),
      replyTo: result.data.email,
      variables,
      fallback: {
        subject: `New Job Application: {{fullName}} — {{jobTitle}}`,
        body: `<h1>New Job Application</h1>
          <p><strong>Name:</strong> {{fullName}}</p>
          <p><strong>Email:</strong> {{email}}</p>
          <p><strong>Phone:</strong> {{phone}}</p>
          <p><strong>Position:</strong> {{jobTitle}}</p>
          <p><strong>Resume:</strong> <a href="{{resumeUrl}}">View Resume</a></p>
          <p><strong>Cover Letter:</strong></p>
          <p>{{coverLetter}}</p>`,
      },
    });

    dispatchFormEmail({
      formKey: "job_application_user",
      to: result.data.email,
      variables,
      fallback: {
        subject: `We received your application for {{jobTitle}} — 3Dots`,
        body: `<p>Hi {{fullName}},</p>
          <p>Thanks for applying for the <strong>{{jobTitle}}</strong> role at 3Dots. We've received your application and our team will be in touch if there's a strong fit.</p>
          <p>— 3Dots Talent Team</p>`,
      },
    });

    return NextResponse.json({
      message: "Application submitted successfully",
      id: application.id,
    });
  } catch (error) {
    console.error("DEBUG Application Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
