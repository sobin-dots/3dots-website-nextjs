import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    
    const application = await prisma.jobApplication.findUnique({
      where: { id: resolvedParams.id },
      include: {
        job: {
          select: { id: true, title: true, tag: true, location: true, type: true }
        }
      }
    });

    if (!application) return NextResponse.json({ error: "Application not found" }, { status: 404 });
    
    return NextResponse.json(application);
  } catch (error) {
    console.error("Error fetching application:", error);
    return NextResponse.json({ error: "Failed to fetch application" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { status } = await req.json();
    const resolvedParams = await params;
    
    const updated = await prisma.jobApplication.update({
      where: { id: resolvedParams.id },
      data: { status },
    });
    
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json({ error: "Failed to update application" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const resolvedParams = await params;
    await prisma.jobApplication.delete({
      where: { id: resolvedParams.id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting application:", error);
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
