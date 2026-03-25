import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const [
      totalPosts,
      activeJobs,
      newInquiries,
      pendingLaunchpad,
      recentPosts,
      recentAppointments
    ] = await Promise.all([
      prisma.post.count(),
      prisma.job.count({ where: { active: true } }),
      prisma.contactInquiry.count({ where: { status: "NEW" } }),
      prisma.launchpadApplication.count({ where: { status: "NEW" } }),
      prisma.post.findMany({
        take: 5,
        orderBy: { updatedAt: "desc" },
        select: { id: true, title: true, updatedAt: true, category: true }
      }),
      prisma.appointment.findMany({
        take: 5,
        orderBy: { date: "asc" },
        where: { date: { gte: new Date() } },
        include: { expert: { select: { name: true } } }
      })
    ]);

    return NextResponse.json({
      stats: [
        { name: "Total Posts", value: totalPosts.toString() },
        { name: "Active Jobs", value: activeJobs.toString() },
        { name: "New Inquiries", value: newInquiries.toString() },
        { name: "Pending Launchpad", value: pendingLaunchpad.toString() },
      ],
      recentPosts,
      recentAppointments
    });
  } catch (error) {
    console.error("Dashboard data fetch error:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
  }
}
