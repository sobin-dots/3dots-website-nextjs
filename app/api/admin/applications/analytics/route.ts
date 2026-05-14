import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const jobId = searchParams.get("jobId");

  try {
    const whereClause: any = {};
    if (jobId && jobId !== "ALL") {
      whereClause.jobId = jobId;
    }

    const applications = await prisma.jobApplication.findMany({
      where: whereClause,
      include: {
        job: {
          select: { location: true, title: true }
        }
      }
    });

    // Aggregations
    const statusCounts: Record<string, number> = {};
    const interviewStatusCounts: Record<string, number> = {};
    const locationCounts: Record<string, number> = {};
    const instituteCounts: Record<string, number> = {};
    const experienceCounts: Record<string, number> = {};

    applications.forEach((app: { status: string | number; interviewStatus: string; job: { location: string; }; currentCompany: string; isStudent: any; experienceYear: any; }) => {
      // Overall Status
      statusCounts[app.status] = (statusCounts[app.status] || 0) + 1;

      // Interview Status
      const iStatus = app.interviewStatus || "NOT_SCHEDULED";
      interviewStatusCounts[iStatus] = (interviewStatusCounts[iStatus] || 0) + 1;

      // Location
      const location = app.job?.location || "General / Remote";
      locationCounts[location] = (locationCounts[location] || 0) + 1;

      // Institute (Current Company)
      const institute = app.currentCompany || "Not Specified";
      instituteCounts[institute] = (instituteCounts[institute] || 0) + 1;

      // Experience (Simple categorization)
      let exp = app.isStudent ? "Student" : (app.experienceYear || "Not Specified");
      experienceCounts[exp] = (experienceCounts[exp] || 0) + 1;
    });

    return NextResponse.json({
      total: applications.length,
      statusCounts,
      interviewStatusCounts,
      locationCounts,
      instituteCounts,
      experienceCounts,
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json({ error: "Failed to fetch analytics" }, { status: 500 });
  }
}
