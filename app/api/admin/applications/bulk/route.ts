import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { dispatchFormEmail } from "@/lib/email-service";

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { ids, status, interviewStatus, remark, sendEmail, emailDetails } = await req.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ error: "No IDs provided" }, { status: 400 });
    }

    const dataToUpdate: any = {};
    if (status) dataToUpdate.status = status;
    if (interviewStatus) dataToUpdate.interviewStatus = interviewStatus;
    if (remark) dataToUpdate.statusRemark = remark;

    const updated = await prisma.jobApplication.updateMany({
      where: { id: { in: ids } },
      data: dataToUpdate,
    });

    if (sendEmail) {
      // Fetch applications to get names and emails
      const applications = await prisma.jobApplication.findMany({
        where: { id: { in: ids } },
        include: { job: true },
      });

      for (const app of applications) {
        let formKey = "";
        let variables: any = {
          fullName: app.fullName,
          email: app.email,
          position: app.job?.title || app.position || "the position",
          jobTitle: app.job?.title || app.position || "the position",
        };

        if (status === "SHORTLISTED") {
          formKey = "job_application_shortlist";
        } else if (status === "REJECTED") {
          formKey = "job_application_reject";
        } else if (status === "REVIEWING") {
          formKey = "job_application_reviewing";
        } else if (interviewStatus === "SCHEDULED") {
          formKey = "interview_invite";
          variables = {
            ...variables,
            ...emailDetails, // interviewDate, interviewTime, etc.
          };
        }

        if (formKey) {
          dispatchFormEmail({
            formKey,
            to: app.email,
            variables,
          });
        }
      }
    }

    return NextResponse.json({ success: true, count: updated.count });
  } catch (error) {
    console.error("Error in bulk update:", error);
    return NextResponse.json({ error: "Failed to perform bulk update" }, { status: 500 });
  }
}
