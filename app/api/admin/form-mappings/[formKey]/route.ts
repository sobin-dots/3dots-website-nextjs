import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ formKey: string }> }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { formKey } = await params;
    await prisma.formEmailMapping.delete({ where: { formKey } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to delete mapping", error);
    return NextResponse.json({ error: "Failed to delete mapping" }, { status: 500 });
  }
}
