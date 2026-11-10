"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Send, Info, RotateCcw } from "lucide-react";

interface ChatEntry {
  id: string;
  role: "arslan" | "user" | "system";
  text: string;
}

const INITIAL_GREETING =
  "Hallo, ich bin Arslan, dein digitaler KI-Berater. Möchtest du wissen, wie ein eigener KI-Agent dein Unternehmen unterstützen kann?";

export default function ArslanChatDemo() {
  const [entries, setEntries] = useState<ChatEntry[]>([
    {
      id: "greeting",
      role: "arslan",
      text: INITIAL_GREETING,
    },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed) return;

    const nowId = Date.now().toString();
    setEntries((prev) => [
      ...prev,
      { id: `${nowId}-u`, role: "user", text: trimmed },
      {
        id: `${nowId}-s`,
        role: "system",
        text: "Demo-Oberfläche ohne aktive KI-Anbindung: Es werden keine simulierten KI-Antworten ausgegeben. Bitte nutze das Anfrageformular direkt darunter, um deinen Wunsch-Agenten zusammenzustellen.",
      },
    ]);
    setInput("");
  };

  const handleReset = () => {
    setEntries([{ id: "greeting", role: "arslan", text: INITIAL_GREETING }]);
    setInput("");
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
                Arslan · KI-Berater
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono tracking-wider uppercase bg-[#ff6b2b]/12 text-[#ff8c42] border border-[#ff6b2b]/30 shrink-0">
                Demo
              </span>
            </div>

            {entries.length > 1 && (
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900/90 border border-zinc-800 text-[11px] font-mono text-zinc-400 hover:text-zinc-200 hover:border-zinc-700 transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Zurücksetzen</span>
              </button>
            )}
          </div>

          {/* Chat Feed */}
          <div
            ref={scrollRef}
            className="p-4 sm:p-5 space-y-3.5 max-h-[280px] overflow-y-auto bg-[#07080b]/85"
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
                    <div className="max-w-[92%] sm:max-w-[85%] rounded-xl px-3.5 py-2.5 bg-[#160d08]/90 border border-[#ff6b2b]/30 text-xs text-zinc-300 leading-relaxed flex items-start gap-2.5">
                      <Info className="w-4 h-4 text-[#ff8c42] shrink-0 mt-0.5" />
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
                  <div className="max-w-[88%] sm:max-w-[82%] rounded-2xl rounded-tl-sm px-4 py-3 bg-zinc-900/90 border border-zinc-800/90 text-sm text-zinc-200 leading-relaxed">
                    {entry.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSubmit}
            className="p-3 sm:p-4 bg-[#090a0e]/95 border-t border-zinc-800/80"
          >
            <div className="flex items-center gap-2.5">
              <label htmlFor="arslan-chat-input" className="sr-only">
                Nachricht an Arslan eingeben
              </label>
              <input
                id="arslan-chat-input"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Nachricht an Arslan eingeben …"
                className="flex-1 min-w-0 bg-zinc-900/90 border border-zinc-800 focus:border-[#ff6b2b]/60 rounded-xl px-3.5 py-2.5 text-base sm:text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#ff6b2b]/60 transition-colors"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                aria-label="Nachricht senden"
                className="ember-button h-[42px] sm:h-[40px] px-4 rounded-xl text-white font-medium inline-flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none cursor-pointer shrink-0"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline text-xs font-semibold">
                  Senden
                </span>
              </button>
            </div>
            <p className="mt-2 text-[11px] font-mono text-zinc-500 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b2b]/70 shrink-0" />
              <span>
                Optische Chat-Vorschau · Produktive KI-Anbindung folgt im nächsten Schritt
              </span>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
