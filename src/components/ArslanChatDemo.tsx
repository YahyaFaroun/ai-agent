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
  "Hallo! Ich bin Alp Arsalan, dein KI-Unternehmensberater von YY-AI-Agent. Welche Prozesse in deinem Unternehmen oder Alltag möchtest du mit einer maßgeschneiderten KI automatisieren?";

const QUICK_SUGGESTIONS = [
  "Welche Pakete gibt es?",
  "Was unterscheidet euch von ChatGPT?",
  "Welche Lösung passt zu meiner Branche?",
  "Wie funktioniert die Warteliste?",
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

    const nowId = crypto.randomUUID();
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

      const data = (await res.json().catch(() => ({}))) as { reply?: string };
      if (!data.reply && !res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }
      const replyText =
        data.reply ||
        "Ich empfehle dir unsere Warteliste direkt darunter, um deinen Bedarf exakt abzustimmen.";

      const mentionsForm =
        replyText.toLowerCase().includes("warteliste") ||
        replyText.toLowerCase().includes("formular") ||
        replyText.toLowerCase().includes("paket") ||
        replyText.toLowerCase().includes("assistent") ||
        replyText.toLowerCase().includes("24/7");

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
          text: "Alp Arsalan ist gerade nicht erreichbar. Bitte versuche es gleich noch einmal oder trage dich direkt in unsere Warteliste darunter ein – wir melden uns persönlich bei dir.",
          showCta: true,
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
    setEntries([
      {
        id: "greeting",
        role: "arslan",
        text: INITIAL_GREETING,
      },
    ]);
    setInput("");
  };

  const scrollToForm = () => {
    const el = document.getElementById("warteliste");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="berater"
      aria-label="Alp Arsalan KI-Verkaufsberater"
      className="relative px-4 sm:px-6 pt-1 pb-10"
    >
      {/* Breiteres Chatfenster auf Desktop für bessere Ausnutzung der Bildschirmbreite */}
      <div className="max-w-4xl lg:max-w-5xl mx-auto">
        <div className="hud-panel rounded-2xl border border-zinc-800/90 shadow-[0_16px_56px_rgba(0,0,0,0.8)] overflow-hidden">
          {/* HUD Top Bar in Supabase-Grün */}
          <div className="px-4 sm:px-6 py-3.5 bg-[#090a0e]/95 border-b border-zinc-800/80 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#3ECF8E]/50 bg-zinc-900 shrink-0">
                <Image
                  src="/arslan_avatar_round.png"
                  alt="Alp Arsalan"
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <div className="flex items-baseline gap-2 min-w-0">
                <span className="text-sm sm:text-base font-bold text-white truncate font-mono">
                  Alp Arsalan
                </span>
                <span className="text-xs text-zinc-400 hidden xs:inline truncate font-mono">
                  · KI-Verkaufsberater (YY-AI-Agent)
                </span>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono tracking-wider uppercase bg-[#3ECF8E]/15 text-[#3ECF8E] border border-[#3ECF8E]/35 shrink-0 hidden sm:flex items-center gap-1 font-semibold">
                <Sparkles className="w-3 h-3" />
                Live-Berater
              </span>
            </div>

            {entries.length > 1 && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Neu starten</span>
              </button>
            )}
          </div>

          {/* Vergrößerter Chat-Bereich (min-h-[300px] max-h-[460px] sm:max-h-[500px]) */}
          <div
            ref={scrollRef}
            className="p-4 sm:p-6 space-y-4 min-h-[300px] max-h-[460px] sm:max-h-[500px] overflow-y-auto bg-[#07080b]/85"
          >
            {entries.map((entry) => {
              if (entry.role === "user") {
                return (
                  <div key={entry.id} className="flex justify-end">
                    <div className="max-w-[85%] sm:max-w-[78%] rounded-2xl rounded-tr-sm px-4 sm:px-5 py-3 bg-zinc-800/95 border border-zinc-700/80 text-sm sm:text-base text-zinc-100 leading-relaxed font-mono shadow-sm">
                      {entry.text}
                    </div>
                  </div>
                );
              }

              if (entry.role === "system") {
                return (
                  <div key={entry.id} className="flex justify-start">
                    <div className="max-w-[92%] sm:max-w-[85%] space-y-2">
                      <div className="rounded-xl px-4 py-3 bg-[#06140e]/90 border border-[#3ECF8E]/30 text-xs sm:text-sm text-zinc-200 leading-relaxed font-mono">
                        <span>{entry.text}</span>
                      </div>
                      {entry.showCta && (
                        <button
                          type="button"
                          onClick={scrollToForm}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#3ECF8E]/15 border border-[#3ECF8E]/40 text-xs sm:text-sm font-semibold text-[#3ECF8E] hover:text-white hover:bg-[#3ECF8E]/25 transition-all cursor-pointer font-mono"
                        >
                          <ArrowDownCircle className="w-4 h-4" />
                          <span>Zur Warteliste wechseln</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              }

              return (
                <div key={entry.id} className="flex items-start gap-3 sm:gap-3.5">
                  <div className="w-9 h-9 rounded-full overflow-hidden border border-zinc-700/80 bg-zinc-900 shrink-0 mt-0.5">
                    <Image
                      src="/arslan_avatar_round.png"
                      alt="Alp Arsalan"
                      width={36}
                      height={36}
                      className="object-cover"
                    />
                  </div>
                  <div className="max-w-[88%] sm:max-w-[82%] space-y-2.5">
                    <div className="rounded-2xl rounded-tl-sm px-4 sm:px-5 py-3.5 bg-zinc-900/95 border border-zinc-800/90 text-sm sm:text-base text-zinc-100 leading-relaxed whitespace-pre-line font-mono shadow-sm">
                      {entry.text}
                    </div>
                    {entry.showCta && (
                      <button
                        type="button"
                        onClick={scrollToForm}
                        className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#3ECF8E]/15 border border-[#3ECF8E]/40 text-xs sm:text-sm font-semibold text-[#3ECF8E] hover:text-white hover:bg-[#3ECF8E]/25 transition-all cursor-pointer font-mono"
                      >
                        <ArrowDownCircle className="w-4 h-4" />
                        <span>Zur Warteliste wechseln</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-start gap-3 sm:gap-3.5" role="status" aria-live="polite">
                <div className="w-9 h-9 rounded-full overflow-hidden border border-zinc-700/80 bg-zinc-900 shrink-0 mt-0.5">
                  <Image
                    src="/arslan_avatar_round.png"
                    alt="Alp Arsalan"
                    width={36}
                    height={36}
                    className="object-cover"
                  />
                </div>
                <div className="rounded-2xl rounded-tl-sm px-4 py-3 bg-zinc-900/90 border border-zinc-800/90 text-xs sm:text-sm font-mono text-zinc-300 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3ECF8E] animate-pulse" />
                  <span>Alp Arsalan berät …</span>
                </div>
              </div>
            )}
          </div>

          {/* Quick Suggestions Chips */}
          {entries.length <= 2 && (
            <div className="px-4 sm:px-6 py-2.5 bg-[#08090d] border-t border-zinc-900/80 flex items-center gap-2 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 shrink-0">
                Vorschläge:
              </span>
              {QUICK_SUGGESTIONS.map((sug) => (
                <button
                  key={sug}
                  type="button"
                  onClick={() => sendQuestion(sug)}
                  disabled={isLoading}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900/90 border border-zinc-800 text-xs sm:text-sm font-mono text-zinc-200 hover:text-white hover:border-[#3ECF8E]/50 whitespace-nowrap transition-all cursor-pointer"
                >
                  {sug}
                </button>
              ))}
            </div>
          )}

          {/* Input Bar */}
          <form
            onSubmit={handleSubmit}
            className="p-3.5 sm:p-5 bg-[#090a0e]/95 border-t border-zinc-800/80"
          >
            <div className="flex items-center gap-3">
              <label htmlFor="arslan-chat-input" className="sr-only">
                Frage an Alp Arsalan stellen
              </label>
              <input
                id="arslan-chat-input"
                type="text"
                maxLength={600}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Frag Alp Arsalan zu Paketen, Branchenlösungen oder der Warteliste …"
                className="flex-1 min-w-0 bg-zinc-900/90 border border-zinc-800 focus:border-[#3ECF8E]/60 rounded-xl px-4 py-3 text-base text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#3ECF8E]/60 transition-colors font-mono"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                aria-label="Nachricht senden"
                className="supabase-button h-[48px] px-5 sm:px-6 rounded-xl text-[#060709] font-bold text-sm inline-flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">
                  Senden
                </span>
              </button>
            </div>
            <p className="mt-2 text-xs font-mono text-zinc-400 flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#3ECF8E] shrink-0" />
                <span>Fokussierte Verkaufsberatung · Antwortzeit &lt; 1 Sekunde</span>
              </span>
              <span className="hidden sm:inline text-zinc-500">
                {input.length}/350 Zeichen
              </span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
