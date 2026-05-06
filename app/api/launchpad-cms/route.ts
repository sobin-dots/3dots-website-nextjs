import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { launchpadApplicationSchema } from "@/lib/validations";
import { dispatchFormEmail, getAdminEmail } from "@/lib/email-service";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const apps = await prisma.launchpadApplication.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(apps);
  } catch (_error) {
    return NextResponse.json({ error: "Failed to fetch applications" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const result = launchpadApplicationSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
    }

    const app = await prisma.launchpadApplication.create({ data: result.data });

    const variables = {
      fullName: result.data.fullName,
      email: result.data.email,
      mobileNumber: result.data.mobileNumber || "N/A",
      startupName: result.data.startupName,
      category: result.data.category || "N/A",
      description: result.data.description,
      submittedAt: new Date().toLocaleString(),
    };

    dispatchFormEmail({
      formKey: "launchpad_admin",
      to: getAdminEmail(),
      replyTo: result.data.email,
      variables,
      fallback: {
        subject: `New Launchpad Application: {{startupName}}`,
        body: `<h1>New Launchpad Application</h1>
          <p><strong>Founder:</strong> {{fullName}} ({{email}})</p>
          <p><strong>Mobile:</strong> {{mobileNumber}}</p>
          <p><strong>Startup:</strong> {{startupName}}</p>
          <p><strong>Category:</strong> {{category}}</p>
          <p><strong>Pitch:</strong></p>
          <p>{{description}}</p>`,
      },
    });

    dispatchFormEmail({
      formKey: "launchpad_user",
      to: result.data.email,
      variables,
      fallback: {
        subject: `Your Launchpad application is in — {{startupName}}`,
        body: `<p>Hi {{fullName}},</p>
          <p>Thanks for applying to 3Dots Launchpad with <strong>{{startupName}}</strong>. Our team will review your pitch and reach out with next steps.</p>
          <p>— 3Dots Launchpad</p>`,
      },
    });

    return NextResponse.json(app);
  } catch (_error) {
    return NextResponse.json({ error: "Failed to submit application" }, { status: 500 });
  }
}
