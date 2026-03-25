import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true, name: true, email: true, phone: true, role: true }
    });
    return NextResponse.json(user);
  } catch {
    return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const { name, email, phone, currentPassword, newPassword } = await req.json();

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const updateData: any = { name, email, phone };

    if (newPassword && newPassword.length >= 6) {
      if (currentPassword !== user.password) {
        return NextResponse.json({ error: "Incorrect current password" }, { status: 400 });
      }
      updateData.password = newPassword;
    }

    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: updateData,
      select: { id: true, name: true, email: true, phone: true, role: true }
    });

    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Settings update error:", error);
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
