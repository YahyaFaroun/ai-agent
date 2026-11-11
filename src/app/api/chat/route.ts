import { NextResponse } from "next/server";
import { generateArslanReply, ChatMessage } from "@/lib/aiProvider";

// Rate-Limiting: Maximal 8 Chat-Anfragen pro IP innerhalb von 10 Minuten
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_CHAT_REQUESTS = 8;
const ipChatTimestamps = new Map<string, number[]>();

function isChatRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = ipChatTimestamps.get(ip) || [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= MAX_CHAT_REQUESTS) {
    ipChatTimestamps.set(ip, recent);
    return true;
  }

  recent.push(now);
  ipChatTimestamps.set(ip, recent);
  return false;
}

export async function POST(request: Request) {
  // 1. IP-Ermittlung & Rate Limiting
  const forwardedFor = request.headers.get("x-forwarded-for");
  const realIp = request.headers.get("x-real-ip");
  const clientIp = (forwardedFor?.split(",")[0] || realIp || "127.0.0.1").trim();

  if (isChatRateLimited(clientIp)) {
    return NextResponse.json(
      {
        reply:
          "Du hast in kurzer Zeit viele Nachrichten gesendet. Um Arslan für alle Besucher schnell zu halten, nutze bitte direkt unser Anfrageformular unten.",
        rateLimited: true,
      },
      { status: 429 }
    );
  }

  // 2. Body-Parsing
  let body: { message?: string; history?: ChatMessage[] };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { reply: "Ungültiges Nachrichtenformat." },
      { status: 400 }
    );
  }

  const rawMessage = (body.message ?? "").trim();
  if (!rawMessage) {
    return NextResponse.json(
      { reply: "Bitte gib eine Frage oder Nachricht ein." },
      { status: 400 }
    );
  }

  // 3. String-Längenbegrenzung (Schutz vor Token-Flooding / Injection)
  const userMessage = rawMessage.substring(0, 350);

  const historyRaw = Array.isArray(body.history) ? body.history : [];
  const sanitizedHistory: ChatMessage[] = historyRaw
    .slice(-4)
    .filter((m) => m && (m.role === "user" || m.role === "assistant"))
    .map((m) => ({
      role: m.role,
      content: String(m.content || "").substring(0, 350),
    }));

  // 4. KI-Antwort generieren
  try {
    const aiRes = await generateArslanReply(sanitizedHistory, userMessage);
    return NextResponse.json({
      reply: aiRes.reply,
      model: aiRes.model,
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);

    // Wenn noch kein Key eingerichtet ist (Vorbereitungsphase)
    if (errorMsg === "NO_API_KEY_CONFIGURED") {
      return NextResponse.json({
        reply:
          "Vielen Dank für dein Interesse! Ich berate dich gerne zu unseren Paketen Starter (ab 1.000 €), Business (ab 2.000 €) und Enterprise (ab 5.000 €). Für ein konkretes Angebot nutze gerne unser 4-stufiges Formular direkt darunter.",
        unconfigured: true,
      });
    }

    return NextResponse.json(
      {
        reply:
          "Entschuldige, ich konnte deine Anfrage gerade nicht verarbeiten. Bitte nutze unser Anfrageformular direkt darunter.",
      },
      { status: 500 }
    );
  }
}
