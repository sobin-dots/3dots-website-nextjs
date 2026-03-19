import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { appointmentSchema } from "@/lib/validations";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const appointments = await prisma.appointment.findMany({
      include: { expert: true },
      orderBy: { date: "asc" },
    });
    return NextResponse.json(appointments);
  } catch (_error) {
    return NextResponse.json({ error: "Failed to fetch appointments" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const json = await req.json();
    const result = appointmentSchema.safeParse(json);

    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
    }

    const appointment = await prisma.appointment.create({
      data: {
        ...result.data,
        date: new Date(result.data.date),
      },
    });
    return NextResponse.json(appointment);
  } catch (_error) {
    return NextResponse.json({ error: "Failed to book appointment" }, { status: 500 });
  }
}
