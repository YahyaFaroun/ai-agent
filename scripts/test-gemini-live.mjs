// Test script for live Gemini API invocation
// Usage: GEMINI_API_KEY="your-key" node scripts/test-gemini-live.mjs

import { readFileSync, existsSync } from "fs";

// Load .env.local if present
if (existsSync(".env.local")) {
  const content = readFileSync(".env.local", "utf8");
  for (const line of content.split("\n")) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || "";
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (!process.env[key]) {
        process.env[key] = value.trim();
      }
    }
  }
}

const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const model = process.env.GEMINI_MODEL || "gemini-2.0-flash";

console.log(`--- GEMINI LIVE TEST ---`);
console.log(`Target Model: ${model}`);

if (!key) {
  console.log(`[INFO] Kein lokaler GEMINI_API_KEY gefunden.`);
  console.log(`Der Schlüssel ist sicher in Vercel (Production) hinterlegt.`);
  console.log(`Um diesen Test lokal auszuführen: GEMINI_API_KEY="AIzaSy..." node scripts/test-gemini-live.mjs`);
  process.exit(0);
}

console.log(`[OK] GEMINI_API_KEY lokal vorhanden (Länge: ${key.length} Zeichen). Sende Testanfrage...`);

try {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`;
  const start = Date.now();

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: "Du bist Arslan von YY-AI-Agent. Antworte in 1 kurzen Satz auf Deutsch." }],
      },
      contents: [
        {
          role: "user",
          parts: [{ text: "Hallo Arslan, wer bist du?" }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 60,
        temperature: 0.4,
      },
    }),
  });

  const duration = Date.now() - start;
  const data = await res.json();

  if (!res.ok) {
    console.error(`[ERROR] API-Aufruf fehlgeschlagen mit Status ${res.status}:`, JSON.stringify(data, null, 2));
    process.exit(1);
  }

  const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
  console.log(`[SUCCESS] Erfolgreicher Modellaufruf in ${duration}ms!`);
  console.log(`Antwort von ${model}: "${reply?.trim()}"`);
} catch (err) {
  console.error(`[FATAL] Netzwerk- oder Laufzeitfehler:`, err.message);
  process.exit(1);
}
