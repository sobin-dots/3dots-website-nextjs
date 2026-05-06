import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { formEmailMappingSchema } from "@/lib/validations";
import { FORM_EVENTS, getFormEvent } from "@/lib/email-forms";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    type MappingRow = {
      id: string;
      formKey: string;
      templateId: string;
      enabled: boolean;
      template: { id: string; name: string; subject: string; isActive: boolean };
    };

    const mappings = (await prisma.formEmailMapping.findMany({
      include: { template: { select: { id: true, name: true, subject: true, isActive: true } } },
    })) as MappingRow[];

    const byKey = new Map<string, MappingRow>(mappings.map((m) => [m.formKey, m]));

    const merged = FORM_EVENTS.map((event) => ({
      ...event,
      mapping: byKey.get(event.key) || null,
    }));

    return NextResponse.json({ events: merged });
  } catch (error) {
    console.error("Failed to fetch form mappings", error);
    return NextResponse.json({ error: "Failed to fetch mappings" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const json = await req.json();
    const result = formEmailMappingSchema.safeParse(json);
    if (!result.success) {
      return NextResponse.json({ error: result.error.flatten() }, { status: 400 });
    }
    const { formKey, templateId, enabled = true } = result.data;

    if (!getFormEvent(formKey)) {
      return NextResponse.json({ error: `Unknown formKey: ${formKey}` }, { status: 400 });
    }

    const template = await prisma.emailTemplate.findUnique({ where: { id: templateId } });
    if (!template) return NextResponse.json({ error: "Template not found" }, { status: 404 });

    const mapping = await prisma.formEmailMapping.upsert({
      where: { formKey },
      update: { templateId, enabled },
      create: { formKey, templateId, enabled },
      include: { template: { select: { id: true, name: true } } },
    });

    return NextResponse.json(mapping);
  } catch (error) {
    console.error("Failed to upsert form mapping", error);
    return NextResponse.json({ error: "Failed to save mapping" }, { status: 500 });
  }
}
