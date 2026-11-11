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

/**
 * Server-only AI Provider
 * Unterstützt Google Gemini (gemini-1.5-flash / gemini-2.0-flash) und OpenAI (gpt-4o-mini).
 * Verwendet native fetch-Calls ohne externe Bibliotheken für maximale Performance und Sicherheit.
 */
export async function generateArslanReply(
  history: ChatMessage[],
  userMessage: string
): Promise<AIResponse> {
  // Kontext strikt auf die letzten 4 Nachrichten begrenzen (Token-Minimierung)
  const recentHistory = history.slice(-4);

  const geminiKey = process.env.GEMINI_API_KEY?.trim() || process.env.GOOGLE_API_KEY?.trim();
  const openAiKey = process.env.OPENAI_API_KEY?.trim();

  // 1. Google Gemini (Standardempfehlung: extrem günstig & schnell)
  if (geminiKey) {
    const model = process.env.GEMINI_MODEL?.trim() || "gemini-1.5-flash";
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${geminiKey}`;

    const contents = [
      {
        role: "user",
        parts: [{ text: `SYSTEM-ANWEISUNG:\n${ARSLAN_SYSTEM_PROMPT}\n\nAntworte bitte ab jetzt im Einklang mit diesen Regeln.` }],
      },
      {
        role: "model",
        parts: [{ text: "Verstanden. Ich berate als Arslan kurz, fokussiert und zielgerichtet." }],
      },
      ...recentHistory.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.content.substring(0, 350) }],
      })),
      {
        role: "user",
        parts: [{ text: userMessage.substring(0, 350) }],
      },
    ];

    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents,
        generationConfig: {
          maxOutputTokens: 200,
          temperature: 0.6,
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
    const model = process.env.OPENAI_MODEL?.trim() || "gpt-4o-mini";
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
            content: m.content.substring(0, 350),
          })),
          { role: "user", content: userMessage.substring(0, 350) },
        ],
        max_tokens: 200,
        temperature: 0.6,
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

  // 3. Wenn noch kein Schlüssel hinterlegt ist (Vorbereitungsmodus)
  throw new Error("NO_API_KEY_CONFIGURED");
}
