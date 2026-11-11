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

/**
 * Server-only AI Provider für YY-AI-Agent
 * Verwendet Google Gemini (gemini-1.5-flash) als hocheffizientes, kostengünstiges Standardmodell.
 * Maximal token-optimiert:
 * - Native system_instruction
 * - Trunkiertes Verlaufsfenster (max. 2 Vor-Nachrichten)
 * - Begrenzte Ausgabe (max. 140 Tokens / ~2-3 Sätze)
 * - Antwortlatenz < 500 ms
 */
export async function generateArslanReply(
  history: ChatMessage[],
  userMessage: string
): Promise<AIResponse> {
  // Kontext strikt auf die letzten 2 Nachrichten begrenzen (Token-Minimierung um ~50%)
  const recentHistory = history.slice(-2);

  const geminiKey = cleanEnv(process.env.GEMINI_API_KEY) || cleanEnv(process.env.GOOGLE_API_KEY);
  const openAiKey = cleanEnv(process.env.OPENAI_API_KEY);

  // 1. Google Gemini Flash (Empfohlenes Modell für YY-AI-Agent)
  if (geminiKey) {
    const model = cleanEnv(process.env.GEMINI_MODEL) || "gemini-1.5-flash";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;

    const contents = [
      ...recentHistory.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content.substring(0, 280) }],
      })),
      {
        role: "user",
        parts: [{ text: userMessage.substring(0, 280) }],
      },
    ];

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: ARSLAN_SYSTEM_PROMPT }],
        },
        contents,
        generationConfig: {
          maxOutputTokens: 140,
          temperature: 0.4,
        },
      }),
    });

    if (!res.ok) {
      throw new Error(`Gemini API error: HTTP ${res.status}`);
    }

    const data = await res.json();
    const replyText =
      data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "Ich helfe dir gerne bei der Wahl des passenden KI-Pakets. Schau dir am besten direkt unser Anfrageformular unten an.";

    return {
      reply: replyText,
      model,
      usage: {
        promptTokens: data.usageMetadata?.promptTokenCount,
        completionTokens: data.usageMetadata?.candidatesTokenCount,
      },
    };
  }

  // 2. OpenAI Fallback (gpt-4o-mini)
  if (openAiKey) {
    const model = cleanEnv(process.env.OPENAI_MODEL) || "gpt-4o-mini";
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${openAiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: ARSLAN_SYSTEM_PROMPT },
          ...recentHistory.map((m) => ({
            role: m.role === "user" ? "user" : "assistant",
            content: m.content.substring(0, 280),
          })),
          { role: "user", content: userMessage.substring(0, 280) },
        ],
        max_tokens: 140,
        temperature: 0.4,
      }),
    });

    if (!res.ok) {
      throw new Error(`OpenAI API error: HTTP ${res.status}`);
    }

    const data = await res.json();
    const replyText =
      data.choices?.[0]?.message?.content?.trim() ||
      "Gerne unterstütze ich dich bei deiner Anfrage. Nutze gerne das Formular unten für ein unverbindliches Angebot.";

    return {
      reply: replyText,
      model,
      usage: {
        promptTokens: data.usage?.prompt_tokens,
        completionTokens: data.usage?.completion_tokens,
      },
    };
  }

  // 3. Wenn noch kein Schlüssel hinterlegt ist
  throw new Error("NO_API_KEY_CONFIGURED");
}
