import { ARSLAN_SYSTEM_PROMPT } from "./knowledgeBase";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

export interface AIResponse {
  reply: string;
  model: string;
  usage?: {
    promptTokens?: number;
    completionTokens?: number;
  };
}

function cleanEnv(val?: string): string | undefined {
  if (!val) return undefined;
  const trimmed = val.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

// Abbruch, falls der Modellanbieter nicht rechtzeitig antwortet
const REQUEST_TIMEOUT_MS = 15000;
// Ausreichend Kontext für mehrstufige geschäftliche Beratungsgespräche
const HISTORY_WINDOW = 10;
const MAX_CHARS_PER_MESSAGE = 600;
const MAX_OUTPUT_TOKENS = 450;

// Standardmodelle (per GEMINI_MODEL / GEMINI_FALLBACK_MODEL überschreibbar).
// gemini-2.5-flash ist für diesen Schlüssel nicht mehr freigegeben (HTTP 404,
// "no longer available to new users"); Google empfiehlt gemini-3.8-flash.
const DEFAULT_GEMINI_MODEL = "gemini-3.8-flash";
const DEFAULT_GEMINI_FALLBACK_MODEL = "gemini-3.5-flash-lite";

/** Fehler eines Modellanbieters inkl. Info, ob ein anderes Modell helfen kann. */
class ProviderError extends Error {
  constructor(
    message: string,
    readonly retryable: boolean
  ) {
    super(message);
    this.name = "ProviderError";
  }
}

/**
 * Server-only AI Provider für YY-AI-Agent
 * Reihenfolge:
 * 1. Gemini-Primärmodell (Standard: gemini-3.8-flash)
 * 2. Gemini-Ersatzmodell (Standard: gemini-3.5-flash-lite) bei 404, 429, Timeout, 5xx o. Ä.
 * 3. OpenAI (optional, nur wenn OPENAI_API_KEY gesetzt ist)
 * 4. Schlägt alles fehl, liefert die Route die regelbasierte Antwort (letzte Absicherung).
 * Token-optimiert:
 * - Native system_instruction
 * - Begrenztes Verlaufsfenster (letzte 6 Nachrichten) für individuelle Beratung
 * - Begrenzte Ausgabe (max. 260 Tokens / ~3-4 Sätze)
 * - API-Schlüssel ausschließlich im Request-Header (nicht in der URL)
 * - Protokolliert nur Modellname, Status und Dauer – keine Schlüssel, keine Kundendaten
 */
export async function generateArslanReply(
  history: ChatMessage[],
  userMessage: string
): Promise<AIResponse> {
  const recentHistory = history
    .filter((m) => m.role === "user" || m.role === "assistant")
    .slice(-HISTORY_WINDOW);
  // Modelle erwarten, dass der Verlauf mit einer Nutzernachricht beginnt
  while (recentHistory.length && recentHistory[0].role !== "user") {
    recentHistory.shift();
  }

  const geminiKey = cleanEnv(process.env.GEMINI_API_KEY) || cleanEnv(process.env.GOOGLE_API_KEY);
  const openAiKey = cleanEnv(process.env.OPENAI_API_KEY);

  if (!geminiKey && !openAiKey) {
    // Wenn noch kein Schlüssel hinterlegt ist
    throw new Error("NO_API_KEY_CONFIGURED");
  }

  // 1. + 2. Google Gemini: Primärmodell, bei geeigneten Fehlern Ersatzmodell
  if (geminiKey) {
    const models = [
      cleanEnv(process.env.GEMINI_MODEL) || DEFAULT_GEMINI_MODEL,
      cleanEnv(process.env.GEMINI_FALLBACK_MODEL) || DEFAULT_GEMINI_FALLBACK_MODEL,
    ].filter((m, i, all) => all.indexOf(m) === i);

    for (const [index, model] of models.entries()) {
      const started = Date.now();
      try {
        const res = await callGemini(geminiKey, model, recentHistory, userMessage);
        console.info(
          `[aiProvider] Antwort von gemini:${model}${index > 0 ? " (Ersatzmodell)" : ""} in ${Date.now() - started} ms`
        );
        return res;
      } catch (err) {
        const retryable = !(err instanceof ProviderError) || err.retryable;
        console.warn(`[aiProvider] gemini:${model} fehlgeschlagen (${errorText(err)})`);
        // z. B. 400/401/403: ein anderes Gemini-Modell würde ebenfalls scheitern
        if (!retryable) break;
      }
    }

    if (!openAiKey) throw new Error("Gemini API error: alle Modelle fehlgeschlagen");
    console.warn("[aiProvider] Wechsle zu OpenAI");
  }

  // 3. OpenAI Fallback (gpt-4o-mini)
  const started = Date.now();
  const res = await callOpenAI(openAiKey!, recentHistory, userMessage);
  console.info(`[aiProvider] Antwort von openai:${res.model} in ${Date.now() - started} ms`);
  return res;
}

/**
 * Entfernt Markdown-Sonderzeichen, die der Chat sonst wörtlich anzeigen würde,
 * und normalisiert Absätze (max. eine Leerzeile).
 */
export function toPlainChatText(text: string): string {
  return text
    .replace(/\r\n?/g, "\n")
    .replace(/```[a-z]*\n?|```/gi, "") // Codeblöcke
    .replace(/`([^`]*)`/g, "$1") // Inline-Code
    .replace(/\*\*([^*]+)\*\*/g, "$1") // **fett**
    .replace(/__([^_]+)__/g, "$1") // __fett__
    .replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s).,!?:;]|$)/g, "$1$2") // *kursiv*
    .replace(/^\s{0,3}#{1,6}\s+/gm, "") // Überschriften
    .replace(/^\s{0,3}>\s?/gm, "") // Zitate
    .replace(/^\s*[*+-]\s+/gm, "– ") // Aufzählungen → Gedankenstrich
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // [Link](url) → Link
    .replace(/\*\*|__/g, "") // übrig gebliebene Marker
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function errorText(err: unknown): string {
  if (err instanceof Error) {
    // Timeouts/Netzwerkfehler ohne Detailtexte protokollieren
    return err.name === "ProviderError" ? err.message : err.name;
  }
  return "unbekannter Fehler";
}

/**
 * 400 (z. B. modellspezifisch nicht unterstützte Parameter), 404 (Modell nicht verfügbar),
 * 408, 429 (Kontingent) und 5xx → anderes Modell versuchen.
 * 401/403 (Schlüssel/Berechtigung) betreffen alle Gemini-Modelle gleichermaßen.
 */
function isRetryableStatus(status: number): boolean {
  return status !== 401 && status !== 403;
}

/**
 * Denk-Einstellung je Modellfamilie: Denken kostet Latenz und zählt zum
 * Ausgabelimit, für kurze Verkaufsberatung genügt minimales Denken.
 * - 2.5 Flash: Denken abschalten
 * - 3.5 Flash / Flash-Lite: "minimal" (getestet)
 * - neuere 3.x Flash (z. B. 3.8): "minimal" nicht unterstützt → "low" + Token-Puffer
 */
function geminiThinking(model: string): {
  config?: Record<string, unknown>;
  extraTokens: number;
} {
  if (/^gemini-2\.5-flash/.test(model)) return { config: { thinkingBudget: 0 }, extraTokens: 0 };
  if (/^gemini-3\.5-flash/.test(model)) return { config: { thinkingLevel: "minimal" }, extraTokens: 0 };
  if (/^gemini-3\.\d+-flash/.test(model)) return { config: { thinkingLevel: "low" }, extraTokens: 512 };
  return { extraTokens: 0 };
}

async function callGemini(
  apiKey: string,
  model: string,
  history: ChatMessage[],
  userMessage: string
): Promise<AIResponse> {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`;
  const thinking = geminiThinking(model);

  const contents = [
    ...history.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content.substring(0, MAX_CHARS_PER_MESSAGE) }],
    })),
    {
      role: "user",
      parts: [{ text: userMessage.substring(0, MAX_CHARS_PER_MESSAGE) }],
    },
  ];

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    cache: "no-store",
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: ARSLAN_SYSTEM_PROMPT }],
      },
      contents,
      generationConfig: {
        maxOutputTokens: MAX_OUTPUT_TOKENS + thinking.extraTokens,
        temperature: 0.5,
        ...(thinking.config ? { thinkingConfig: thinking.config } : {}),
      },
    }),
  });

  if (!res.ok) {
    throw new ProviderError(`HTTP ${res.status}`, isRetryableStatus(res.status));
  }

  const data = await res.json();
  const parts: { text?: string }[] = data.candidates?.[0]?.content?.parts ?? [];
  const replyText = toPlainChatText(parts.map((p) => p.text ?? "").join(""));
  if (!replyText) {
    throw new ProviderError("leere Antwort", true);
  }

  return {
    reply: replyText,
    model,
    usage: {
      promptTokens: data.usageMetadata?.promptTokenCount,
      completionTokens: data.usageMetadata?.candidatesTokenCount,
    },
  };
}

async function callOpenAI(
  apiKey: string,
  history: ChatMessage[],
  userMessage: string
): Promise<AIResponse> {
  const model = cleanEnv(process.env.OPENAI_MODEL) || "gpt-4o-mini";
  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
    cache: "no-store",
    body: JSON.stringify({
      model,
      messages: [
        { role: "system", content: ARSLAN_SYSTEM_PROMPT },
        ...history.map((m) => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.content.substring(0, MAX_CHARS_PER_MESSAGE),
        })),
        { role: "user", content: userMessage.substring(0, MAX_CHARS_PER_MESSAGE) },
      ],
      max_tokens: MAX_OUTPUT_TOKENS,
      temperature: 0.5,
    }),
  });

  if (!res.ok) {
    throw new Error(`OpenAI API error: HTTP ${res.status}`);
  }

  const data = await res.json();
  const replyText = toPlainChatText(data.choices?.[0]?.message?.content ?? "");
  if (!replyText) {
    throw new Error("OpenAI API error: leere Antwort");
  }

  return {
    reply: replyText,
    model,
    usage: {
      promptTokens: data.usage?.prompt_tokens,
      completionTokens: data.usage?.completion_tokens,
    },
  };
}
