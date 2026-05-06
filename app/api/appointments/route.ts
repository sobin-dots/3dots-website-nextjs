import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { appointmentSchema } from "@/lib/validations";
import { dispatchFormEmail, getAdminEmail } from "@/lib/email-service";

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
      data: { ...result.data, date: new Date(result.data.date) },
      include: { expert: true },
    });

    const variables = {
      clientName: appointment.clientName,
      clientEmail: appointment.clientEmail,
      expertName: appointment.expert?.name || "our team",
      date: appointment.date.toLocaleString(),
      reason: appointment.reason || "N/A",
    };

    dispatchFormEmail({
      formKey: "appointment_user",
      to: appointment.clientEmail,
      variables,
      fallback: {
        subject: `Your appointment with {{expertName}} is confirmed`,
        body: `<p>Hi {{clientName}},</p>
          <p>Your appointment with <strong>{{expertName}}</strong> is confirmed for <strong>{{date}}</strong>.</p>
          <p><strong>Reason:</strong> {{reason}}</p>
          <p>— 3Dots</p>`,
      },
    });

    dispatchFormEmail({
      formKey: "appointment_admin",
      to: getAdminEmail(),
      variables,
      fallback: {
        subject: `New appointment booked — {{clientName}}`,
        body: `<p>{{clientName}} ({{clientEmail}}) booked an appointment with {{expertName}} on {{date}}.</p>
          <p><strong>Reason:</strong> {{reason}}</p>`,
      },
    });

    return NextResponse.json(appointment);
  } catch (_error) {
    return NextResponse.json({ error: "Failed to book appointment" }, { status: 500 });
  }
}
