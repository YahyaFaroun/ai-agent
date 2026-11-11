import { NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabaseServer";

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
  hp_website?: string;
}

const VALID_SCOPES = new Set(["Privat", "Geschäftlich", "Beides"]);

// In-Memory Rate Limiting: Max 5 Anfragen pro IP innerhalb von 10 Minuten
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 5;
const ipRequestTimestamps = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipRequestTimestamps.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= MAX_REQUESTS_PER_WINDOW) {
    ipRequestTimestamps.set(ip, recent);
    return true;
  }

  recent.push(now);
  ipRequestTimestamps.set(ip, recent);
  return false;
}

// Periodische Bereinigung alter Rate-Limit-Einträge
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [ip, times] of ipRequestTimestamps.entries()) {
      const active = times.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
      if (active.length === 0) {
        ipRequestTimestamps.delete(ip);
      } else {
        ipRequestTimestamps.set(ip, active);
      }
    }
  }, 5 * 60 * 1000).unref?.();
}

export async function POST(request: Request) {
  // 1. IP-Ermittlung und Rate-Limiting gegen Denial-of-Service / Spam-Flooding
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const clientIp = (forwardedFor?.split(",")[0] || realIp || "127.0.0.1").trim();

  if (isRateLimited(clientIp)) {
    return NextResponse.json(
      {
        saved: false,
        code: "RATE_LIMITED",
        message:
          "Zu viele Anfragen in kurzer Zeit. Bitte versuche es in wenigen Minuten erneut.",
      },
      { status: 429 }
    );
  }

  // 2. JSON-Parsing mit Größenbeschränkung
  let body: Partial<StructuredInquiryPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { saved: false, code: "INVALID_JSON", message: "Ungültiges Anfrageformat." },
      { status: 400 }
    );
  }

  // 3. Spam Honeypot Prüfung: Falls vom Bot ausgefüllt, still abfangen
  if (body.hp_website && body.hp_website.trim().length > 0) {
    // Erfolgreiche Antwort simulieren, ohne Daten in Supabase zu speichern
    return NextResponse.json({
      saved: true,
      message: "Vielen Dank! Deine Anfrage wurde erfolgreich gespeichert.",
    });
  }

  // 4. Validierung Schritt 1: Einsatzbereich & Branche
  const usageScope = body.usageScope;
  if (!usageScope || !VALID_SCOPES.has(usageScope)) {
    return NextResponse.json(
      { saved: false, code: "VALIDATION_ERROR", message: "Bitte wähle einen Einsatzbereich aus." },
      { status: 400 }
    );
  }

  const needsIndustry = usageScope === "Geschäftlich" || usageScope === "Beides";
  let industry = needsIndustry ? (body.industry ?? "").trim() : null;
  if (needsIndustry) {
    if (!industry) {
      return NextResponse.json(
        { saved: false, code: "VALIDATION_ERROR", message: "Bitte gib deine Branche an." },
        { status: 400 }
      );
    }
    if (industry.length > 120) {
      industry = industry.substring(0, 120);
    }
  }

  // 5. Validierung Schritt 2: Aufgaben (Multi-Select & Freitext)
  const tasksRaw = Array.isArray(body.tasks)
    ? body.tasks.map((t) => String(t).trim()).filter(Boolean)
    : [];
  if (tasksRaw.length === 0) {
    return NextResponse.json(
      { saved: false, code: "VALIDATION_ERROR", message: "Bitte wähle mindestens eine gewünschte Aufgabe aus." },
      { status: 400 }
    );
  }
  const tasks = tasksRaw.slice(0, 15).map((t) => t.substring(0, 100));

  const hasTasksOther = tasks.includes("Sonstiges");
  let tasksOther = hasTasksOther ? (body.tasksOther ?? "").trim() : null;
  if (hasTasksOther) {
    if (!tasksOther) {
      return NextResponse.json(
        { saved: false, code: "VALIDATION_ERROR", message: "Bitte beschreibe unter „Sonstiges“ deine gewünschten Aufgaben." },
        { status: 400 }
      );
    }
    if (tasksOther.length > 500) {
      tasksOther = tasksOther.substring(0, 500);
    }
  }

  // 6. Validierung Schritt 3: Integrationen (Multi-Select & Freitext)
  const integrationsRaw = Array.isArray(body.integrations)
    ? body.integrations.map((i) => String(i).trim()).filter(Boolean)
    : [];
  if (integrationsRaw.length === 0) {
    return NextResponse.json(
      { saved: false, code: "VALIDATION_ERROR", message: "Bitte wähle mindestens eine Option bei den Integrationen aus." },
      { status: 400 }
    );
  }
  const integrations = integrationsRaw.slice(0, 25).map((i) => i.substring(0, 100));

  const hasIntegrationsOther = integrations.includes("Sonstiges");
  let integrationsOther = hasIntegrationsOther
    ? (body.integrationsOther ?? "").trim()
    : null;
  if (hasIntegrationsOther) {
    if (!integrationsOther) {
      return NextResponse.json(
        { saved: false, code: "VALIDATION_ERROR", message: "Bitte trage unter „Sonstiges“ deine gewünschten Systeme oder Programme ein." },
        { status: 400 }
      );
    }
    if (integrationsOther.length > 500) {
      integrationsOther = integrationsOther.substring(0, 500);
    }
  }

  // 7. Validierung Schritt 4: Kontaktdaten & Pflicht-Einwilligung
  const nameRaw = (body.contact?.name ?? "").trim();
  const emailRaw = (body.contact?.email ?? "").trim();
  const phoneRaw = (body.contact?.phone ?? "").trim();
  const privacyConsent = Boolean(body.contact?.privacyConsent);

  if (!nameRaw || nameRaw.length < 2) {
    return NextResponse.json(
      { saved: false, code: "VALIDATION_ERROR", message: "Bitte gib deinen Namen ein (mindestens 2 Zeichen)." },
      { status: 400 }
    );
  }
  const name = nameRaw.substring(0, 100);

  if (!emailRaw || emailRaw.length > 150 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailRaw)) {
    return NextResponse.json(
      { saved: false, code: "VALIDATION_ERROR", message: "Bitte gib eine gültige E-Mail-Adresse ein." },
      { status: 400 }
    );
  }
  const email = emailRaw;

  const phone = phoneRaw ? phoneRaw.substring(0, 40) : null;

  // Speicherung erfolgt ausschließlich bei ausdrücklicher Einwilligung
  if (!privacyConsent) {
    return NextResponse.json(
      { saved: false, code: "VALIDATION_ERROR", message: "Bitte bestätige die erforderliche Datenschutzeinwilligung." },
      { status: 400 }
    );
  }

  const consentedAt = new Date().toISOString();

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
      phone,
      privacyConsent: true,
    },
    submittedAt: consentedAt,
  };

  // 8. Speicherung in Supabase (serverseitig, RLS-geschützt in isolierter Tabelle arslan_leads)
  const supabase = getSupabaseServerClient();

  if (supabase) {
    try {
      const { error } = await supabase
        .from("arslan_leads")
        .insert({
          scope: usageScope,
          industry,
          tasks,
          tasks_other: tasksOther,
          integrations,
          integrations_other: integrationsOther,
          name,
          email,
          phone,
          consent: true,
          consented_at: consentedAt,
          status: "neu",
          source: "website",
          priority: "normal",
          assigned_agent: "arslan",
          metadata: {
            source: "web_form",
            version: "v2",
          },
        });

      if (error) {
        return NextResponse.json(
          {
            saved: false,
            code: "DATABASE_ERROR",
            dbCode: error.code,
            dbMessage: error.message,
            message:
              "Die Anfrage konnte vorübergehend nicht in der Datenbank gespeichert werden. Bitte versuche es in Kürze erneut.",
          },
          { status: 500 }
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
          code: "DATABASE_UNAVAILABLE",
          message:
            "Die Datenbank ist aktuell nicht erreichbar. Deine Anfrage konnte nicht übermittelt werden.",
        },
        { status: 503 }
      );
    }
  }

  // 9. Fallback auf Webhook (falls Supabase-Keys noch nicht hinterlegt, aber INQUIRY_WEBHOOK_URL vorhanden)
  const webhookUrl = process.env.INQUIRY_WEBHOOK_URL?.trim();
  if (webhookUrl) {
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

  // 10. Weder Supabase noch Webhook konfiguriert: Keine Täuschung (Vorgabe 4 & 7)
  return NextResponse.json(
    {
      saved: false,
      code: "BACKEND_NOT_CONFIGURED",
      message:
        "Die Datenbankverbindung (Supabase) ist auf dem Server noch nicht mit Umgebungsvariablen eingerichtet. Deine Angaben wurden strukturiert zusammengefasst, aber noch nicht dauerhaft gespeichert.",
      inquiry: structuredInquiry,
    },
    { status: 503 }
  );
}
