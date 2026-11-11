"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Send, RotateCcw, ArrowDownCircle, Sparkles } from "lucide-react";

interface ChatEntry {
  id: string;
  role: "arslan" | "user" | "system";
  text: string;
  showCta?: boolean;
}

const INITIAL_GREETING =
  "Hallo, ich bin Arslan, dein digitaler KI-Verkaufsberater. Welche Prozesse in deinem Unternehmen oder Alltag möchtest du mit einem eigenen KI-Agenten automatisieren?";

const QUICK_SUGGESTIONS = [
  "Welche Pakete gibt es?",
  "Wie läuft die Einrichtung ab?",
  "Welches Paket passt zu mir?",
];

export default function ArslanChatDemo() {
  const [entries, setEntries] = useState<ChatEntry[]>([
    {
      id: "greeting",
      role: "arslan",
      text: INITIAL_GREETING,
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries, isLoading]);

  const sendQuestion = async (userText: string) => {
    const trimmed = userText.trim();
    if (!trimmed || isLoading) return;

    const nowId = Date.now().toString();
    const newEntry: ChatEntry = { id: `${nowId}-u`, role: "user", text: trimmed };

    const currentHistory = entries
      .filter((e) => e.role === "arslan" || e.role === "user")
      .map((e) => ({
        role: (e.role === "arslan" ? "assistant" : "user") as "assistant" | "user",
        content: e.text,
      }));

    setEntries((prev) => [...prev, newEntry]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          history: currentHistory,
        }),
      });

      const data = await res.json();
      const replyText =
        data.reply ||
        "Ich empfehle dir unser 4-stufiges Anfrageformular direkt darunter, um deinen Bedarf exakt abzustimmen.";

      const mentionsForm =
        replyText.toLowerCase().includes("formular") ||
        replyText.toLowerCase().includes("paket") ||
        replyText.toLowerCase().includes("starter") ||
        replyText.toLowerCase().includes("business");

      setEntries((prev) => [
        ...prev,
        {
          id: `${nowId}-a`,
          role: "arslan",
          text: replyText,
          showCta: mentionsForm,
        },
      ]);
    } catch {
      setEntries((prev) => [
        ...prev,
        {
          id: `${nowId}-err`,
          role: "system",
          text: "Verbindungsfehler. Bitte nutze direkt unser Anfrageformular darunter.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendQuestion(input);
  };

  const handleReset = () => {
    setEntries([{ id: "greeting", role: "arslan", text: INITIAL_GREETING }]);
    setInput("");
  };

  const scrollToForm = () => {
    const el = document.getElementById("anfrage");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="chat"
      aria-label="Arslan KI-Chatfeld"
      className="relative px-4 sm:px-6 pt-2 pb-12"
    >
      <div className="max-w-3xl mx-auto">
        <div className="hud-panel rounded-2xl border border-zinc-800/90 shadow-[0_12px_48px_rgba(0,0,0,0.75)] overflow-hidden">
          {/* Subtle HUD Top Bar */}
          <div className="px-4 sm:px-5 py-3 bg-[#090a0e]/95 border-b border-zinc-800/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[#ff6b2b]/45 bg-zinc-900 shrink-0">
                <Image
                  src="/arslan_avatar_round.png"
                  alt="Arslan"
                  width={28}
                  height={28}
                  className="object-cover"
                />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-zinc-100 truncate">
                Arslan · KI-Verkaufsberater
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase bg-[#ff6b2b]/15 text-[#ff8c42] border border-[#ff6b2b]/35 shrink-0 flex items-center gap-1">
                <Sparkles className="w-2.5 h-2.5" />
                Live-Berater
              </span>
            </div>

            {entries.length > 1 && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Neu starten</span>
              </button>
            )}
          </div>

          {/* Chat Feed */}
          <div
            ref={scrollRef}
            className="p-4 sm:p-5 space-y-3.5 max-h-[300px] overflow-y-auto bg-[#07080b]/85"
          >
            {entries.map((entry) => {
              if (entry.role === "user") {
                return (
                  <div key={entry.id} className="flex justify-end">
                    <div className="max-w-[85%] sm:max-w-[78%] rounded-2xl rounded-tr-sm px-4 py-2.5 bg-zinc-800/90 border border-zinc-700/80 text-sm text-zinc-100 leading-relaxed">
                      {entry.text}
                    </div>
                  </div>
                );
              }

              if (entry.role === "system") {
                return (
                  <div key={entry.id} className="flex justify-start">
                    <div className="max-w-[92%] sm:max-w-[85%] rounded-xl px-3.5 py-2.5 bg-[#160d08]/90 border border-[#ff6b2b]/30 text-xs text-zinc-300 leading-relaxed">
                      <span>{entry.text}</span>
                    </div>
                  </div>
                );
              }

              return (
                <div key={entry.id} className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-700/80 bg-zinc-900 shrink-0 mt-0.5">
                    <Image
                      src="/arslan_avatar_round.png"
                      alt="Arslan"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  <div className="max-w-[88%] sm:max-w-[82%] space-y-2">
                    <div className="rounded-2xl rounded-tl-sm px-4 py-3 bg-zinc-900/90 border border-zinc-800/90 text-sm text-zinc-200 leading-relaxed">
                      {entry.text}
                    </div>
                    {entry.showCta && (
                      <button
                        type="button"
                        onClick={scrollToForm}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#ff6b2b]/15 border border-[#ff6b2b]/40 text-xs font-medium text-[#ff8c42] hover:text-white hover:bg-[#ff6b2b]/25 transition-all cursor-pointer"
                      >
                        <ArrowDownCircle className="w-3.5 h-3.5" />
                        <span>Zum Anfrageformular (Schritt 1 von 4)</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-700/80 bg-zinc-900 shrink-0 mt-0.5">
                  <Image
                    src="/arslan_avatar_round.png"
                    alt="Arslan"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <div className="rounded-2xl rounded-tl-sm px-4 py-3 bg-zinc-900/90 border border-zinc-800/90 text-xs font-mono text-zinc-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ff6b2b] animate-pulse" />
                  <span>Arslan berät …</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Suggestions Chips */}
          {entries.length <= 2 && (
            <div className="px-4 py-2 bg-[#08090d] border-t border-zinc-900/80 flex items-center gap-2 overflow-x-auto no-scrollbar">
              <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 shrink-0">
                Vorschläge:
              </span>
              {QUICK_SUGGESTIONS.map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => sendQuestion(sug)}
                  disabled={isLoading}
                  className="px-2.5 py-1 rounded-lg bg-zinc-900/80 border border-zinc-800/90 text-[11px] text-zinc-300 hover:text-white hover:border-[#ff6b2b]/40 whitespace-nowrap transition-all cursor-pointer"
                >
                  {sug}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <form
            onSubmit={handleSubmit}
            className="p-3 sm:p-4 bg-[#090a0e]/95 border-t border-zinc-800/80"
          >
            <div className="flex items-center gap-2.5">
              <label htmlFor="arslan-chat-input" className="sr-only">
                Frage an Arslan stellen
              </label>
              <input
                id="arslan-chat-input"
                type="text"
                maxLength={350}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Frag Arslan zu Paketen, Preisen oder Integrationen …"
                className="flex-1 min-w-0 bg-zinc-900/90 border border-zinc-800 focus:border-[#ff6b2b]/60 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#ff6b2b]/60 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Nachricht senden"
                className="ember-button h-[42px] sm:h-[40px] px-4 rounded-xl text-white font-medium inline-flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline text-xs font-semibold">
                  Senden
                </span>
              </button>
            </div>
            <p className="mt-2 text-[11px] font-mono text-zinc-500 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 shrink-0" />
                <span>Fokussierte Verkaufsberatung · Antwortzeit &lt; 1 Sekunde</span>
              </span>
              <span className="hidden sm:inline text-zinc-600">
                {input.length}/350 Zeichen
              </span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
