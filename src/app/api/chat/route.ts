import { NextResponse } from "next/server";
import { generateArslanReply, ChatMessage } from "@/lib/aiProvider";
import { buildFallbackReply } from "@/lib/knowledgeBase";

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
          "Du hast in kurzer Zeit viele Nachrichten gesendet. Um den Chat für alle Besucher schnell zu halten, nutze bitte direkt unser Anfrageformular unten.",
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
    .slice(-6)
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
    const userTexts = [
      ...sanitizedHistory.filter((m) => m.role === "user").map((m) => m.content),
      userMessage,
    ];

    // Wenn noch kein Key eingerichtet ist (Vorbereitungsphase)
    if (errorMsg === "NO_API_KEY_CONFIGURED") {
      return NextResponse.json({
        reply: buildFallbackReply(userTexts),
        unconfigured: true,
      });
    }

    // Modell nicht erreichbar (Timeout, HTTP-Fehler, leere Antwort):
    // intern protokollieren, dem Besucher eine sinnvolle Beratung anbieten.
    console.error("[api/chat] KI-Anbieter nicht verfügbar:", errorMsg);
    return NextResponse.json({
      reply: buildFallbackReply(userTexts),
      fallback: true,
    });
  }
}
