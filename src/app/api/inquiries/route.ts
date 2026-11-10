import { NextResponse } from "next/server";

export interface StructuredInquiryPayload {
  usageScope: "Privat" | "Geschäftlich" | "Beides";
  industry: string | null;
  tasks: string[];
  tasksOther: string | null;
  integrations: string[];
  integrationsOther: string | null;
  contact: {
    name: string;
    email: string;
    phone: string | null;
    privacyConsent: boolean;
  };
  submittedAt: string;
}

const VALID_SCOPES = new Set(["Privat", "Geschäftlich", "Beides"]);

export async function POST(request: Request) {
  let body: Partial<StructuredInquiryPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { saved: false, code: "INVALID_JSON", message: "Ungültiges Anfrageformat." },
      { status: 400 }
    );
  }

  const usageScope = body.usageScope;
  if (!usageScope || !VALID_SCOPES.has(usageScope)) {
    return NextResponse.json(
      { saved: false, code: "VALIDATION_ERROR", message: "Bitte wähle einen Einsatzbereich aus." },
      { status: 400 }
    );
  }

  const needsIndustry = usageScope === "Geschäftlich" || usageScope === "Beides";
  const industry = needsIndustry ? (body.industry ?? "").trim() : null;
  if (needsIndustry && !industry) {
    return NextResponse.json(
      { saved: false, code: "VALIDATION_ERROR", message: "Bitte gib deine Branche an." },
      { status: 400 }
    );
  }

  const tasks = Array.isArray(body.tasks)
    ? body.tasks.map((t) => String(t).trim()).filter(Boolean)
    : [];
  if (tasks.length === 0) {
    return NextResponse.json(
      { saved: false, code: "VALIDATION_ERROR", message: "Bitte wähle mindestens eine gewünschte Aufgabe aus." },
      { status: 400 }
    );
  }

  const hasTasksOther = tasks.includes("Sonstiges");
  const tasksOther = hasTasksOther ? (body.tasksOther ?? "").trim() : null;
  if (hasTasksOther && !tasksOther) {
    return NextResponse.json(
      { saved: false, code: "VALIDATION_ERROR", message: "Bitte beschreibe unter „Sonstiges“ deine gewünschten Aufgaben." },
      { status: 400 }
    );
  }

  const integrations = Array.isArray(body.integrations)
    ? body.integrations.map((i) => String(i).trim()).filter(Boolean)
    : [];
  if (integrations.length === 0) {
    return NextResponse.json(
      { saved: false, code: "VALIDATION_ERROR", message: "Bitte wähle mindestens eine Option bei den Integrationen aus." },
      { status: 400 }
    );
  }

  const hasIntegrationsOther = integrations.includes("Sonstiges");
  const integrationsOther = hasIntegrationsOther
    ? (body.integrationsOther ?? "").trim()
    : null;
  if (hasIntegrationsOther && !integrationsOther) {
    return NextResponse.json(
      { saved: false, code: "VALIDATION_ERROR", message: "Bitte trage unter „Sonstiges“ deine gewünschten Systeme oder Programme ein." },
      { status: 400 }
    );
  }

  const name = (body.contact?.name ?? "").trim();
  const email = (body.contact?.email ?? "").trim();
  const phoneRaw = (body.contact?.phone ?? "").trim();
  const privacyConsent = Boolean(body.contact?.privacyConsent);

  if (!name) {
    return NextResponse.json(
      { saved: false, code: "VALIDATION_ERROR", message: "Bitte gib deinen Namen ein." },
      { status: 400 }
    );
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { saved: false, code: "VALIDATION_ERROR", message: "Bitte gib eine gültige E-Mail-Adresse ein." },
      { status: 400 }
    );
  }

  if (!privacyConsent) {
    return NextResponse.json(
      { saved: false, code: "VALIDATION_ERROR", message: "Bitte bestätige die Datenschutzeinwilligung." },
      { status: 400 }
    );
  }

  const structuredInquiry: StructuredInquiryPayload = {
    usageScope,
    industry,
    tasks,
    tasksOther,
    integrations,
    integrationsOther,
    contact: {
      name,
      email,
      phone: phoneRaw || null,
      privacyConsent: true,
    },
    submittedAt: new Date().toISOString(),
  };

  const webhookUrl = process.env.INQUIRY_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    return NextResponse.json(
      {
        saved: false,
        code: "BACKEND_NOT_CONFIGURED",
        message:
          "Es ist aktuell noch keine Backend-Datenbank bzw. Empfangsschnittstelle angebunden. Deine Angaben wurden strukturiert zusammengefasst, aber noch nicht an uns übermittelt.",
        inquiry: structuredInquiry,
      },
      { status: 503 }
    );
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(process.env.INQUIRY_WEBHOOK_SECRET
          ? { Authorization: `Bearer ${process.env.INQUIRY_WEBHOOK_SECRET}` }
          : {}),
      },
      body: JSON.stringify(structuredInquiry),
    });

    if (!upstream.ok) {
      return NextResponse.json(
        {
          saved: false,
          code: "BACKEND_ERROR",
          message:
            "Die Anfrage konnte derzeit nicht gespeichert werden. Bitte versuche es später erneut.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      saved: true,
      message: "Vielen Dank! Deine Anfrage wurde erfolgreich gespeichert.",
    });
  } catch {
    return NextResponse.json(
      {
        saved: false,
        code: "BACKEND_UNREACHABLE",
        message:
          "Die Backend-Schnittstelle ist momentan nicht erreichbar. Deine Anfrage wurde nicht übermittelt.",
      },
      { status: 502 }
    );
  }
}
