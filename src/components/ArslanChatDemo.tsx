"use client";

import { useState } from "react";
import Image from "next/image";
import { Send, Sparkles, Terminal, Info, RefreshCw } from "lucide-react";

interface Message {
  id: string;
  sender: "arslan" | "user";
  text: string;
  timestamp: string;
}

export default function ArslanChatDemo() {
  const initialGreeting =
    "Hallo, ich bin Arslan, dein digitaler KI-Berater. Möchtest du wissen, wie ein eigener KI-Agent dein Unternehmen unterstützen kann?";

  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "arslan",
      text: initialGreeting,
      timestamp: "Gerade eben",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const samplePrompts = [
    {
      title: "Welche Aufgaben kannst du übernehmen?",
      answer:
        "Als KI-Mitarbeiter übernehme ich z. B. Erstqualifizierung von Kundenanfragen, 24/7 Terminbuchungen über deinen Kalender, Beantwortung wiederkehrender E-Mails, automatisierte CRM-Datenerfassung und die Statusauskunft für bestehende Kunden.",
    },
    {
      title: "Wie läuft die Einrichtung ab?",
      answer:
        "In drei Schritten: 1. Kurzes Beratungsgespräch zur Bedarfsanalyse. 2. Technische Konfiguration und Training auf deine Firmentonalität & Dokumente. 3. Testphase und schlüsselfertiger Go-Live ohne IT-Aufwand für dein Team.",
    },
    {
      title: "Passt Arslan zu bestehenden Systemen?",
      answer:
        "Ja! Über moderne REST-APIs und Webhooks binden wir Arslan an gängige CRM-Systeme (HubSpot, Salesforce, Pipedrive), Kalender (Google, Outlook) sowie Kommunikationskanäle (Web-Chat, E-Mail, WhatsApp) an.",
    },
    {
      title: "Was kostet die Umsetzung?",
      answer:
        "Unsere Pakete starten bei 1.000 € für grundlegende Assistenten und 2.000 € für integrierte Unternehmens-Agenten (Business-Paket). Der genaue Umfang wird vorab transparent und verbindlich vereinbart.",
    },
  ];

  const handleSendPrompt = (promptText: string, simulatedAnswer?: string) => {
    if (!promptText.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: promptText,
      timestamp: "Gerade eben",
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Provide pre-defined educational consultation responses
    const targetAnswer =
      simulatedAnswer ||
        "Vielen Dank für deine Frage! In der echten Anbindung greife ich auf die individuellen Schnittstellen und Dokumente deines Unternehmens zu. Für ein maßgeschneidertes Konzept trage dich gerne unten auf die Warteliste ein.";

    setTimeout(() => {
      setIsTyping(false);
      const arslanMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "arslan",
        text: targetAnswer,
        timestamp: "Gerade eben",
      };
      setMessages((prev) => [...prev, arslanMsg]);
    }, 700);
  };

  const handleResetChat = () => {
    setMessages([
      {
        id: "1",
        sender: "arslan",
        text: initialGreeting,
        timestamp: "Gerade eben",
      },
    ]);
  };

  return (
    <section id="berater" className="py-24 relative overflow-hidden">
      {/* Background Section Accent */}
      <div className="absolute top-1/2 left-1/4 w-[600px] h-[350px] bg-[#ff6b2b]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-[#ff8c42]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b2b]"></span>
            <span>[ 04 // INTERAKTIVE DEMO ]</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Arslan – <span className="text-metallic">Dein digitaler Berater</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400">
            Erlebe hier eine optische Vorschau der Chat-Oberfläche. Teste typische
            Fragen direkt über die Schnellwahl oder tippe dein eigenes Anliegen ein.
          </p>
        </div>

        {/* High-Tech HUD Chat Console */}
        <div className="relative rounded-2xl hud-panel border border-zinc-700/80 shadow-2xl overflow-hidden">
          {/* Top HUD Telemetry Header */}
          <div className="bg-zinc-950/90 px-5 py-3.5 border-b border-zinc-800/80 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative w-9 h-9 rounded-full overflow-hidden border border-[#ff6b2b]/50 p-0.5 bg-zinc-900">
                <Image
                  src="/arslan_avatar_round.png"
                  alt="Arslan Avatar"
                  width={36}
                  height={36}
                  className="object-cover rounded-full"
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-black shadow-[0_0_6px_#10b981]"></span>
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white tracking-wide">
                    Arslan • KI-Berater
                  </span>
                  <span className="text-[10px] font-mono text-[#ff8c42] bg-[#ff6b2b]/15 px-2 py-0.5 rounded border border-[#ff6b2b]/30">
                    DEMO-KONSOLE
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400">
                  <span>STATUS: BEREIT</span>
                  <span>•</span>
                  <span>LATENZ: ~28ms</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleResetChat}
                className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors flex items-center gap-1.5 cursor-pointer"
                title="Chat zurücksetzen"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reset</span>
              </button>
              <div className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 text-[11px] font-mono text-zinc-500">
                <Terminal className="w-3 h-3 text-[#ff6b2b]" />
                <span>UI // PREVIEW</span>
              </div>
            </div>
          </div>

          {/* Chat Messages Area */}
          <div className="p-5 sm:p-6 min-h-[340px] max-h-[440px] overflow-y-auto space-y-4 bg-[#08090d]/80">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 items-start ${
                  msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {msg.sender === "arslan" ? (
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-700 shrink-0 mt-1">
                    <Image
                      src="/arslan_avatar_round.png"
                      alt="Arslan"
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center shrink-0 text-xs font-mono text-zinc-300 mt-1">
                    DU
                  </div>
                )}

                <div
                  className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed ${
                    msg.sender === "user"
                      ? "bg-zinc-800/90 text-white border border-zinc-700 rounded-tr-none"
                      : "bg-zinc-900/90 text-zinc-200 border border-zinc-800/90 rounded-tl-none shadow-md"
                  }`}
                >
                  <p>{msg.text}</p>
                  <span className="text-[10px] font-mono text-zinc-500 block text-right mt-1.5">
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 items-center">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-700 shrink-0">
                  <Image
                    src="/arslan_avatar_round.png"
                    alt="Arslan"
                    width={32}
                    height={32}
                    className="object-cover"
                  />
                </div>
                <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#ff6b2b] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#ff6b2b] animate-bounce delay-150" />
                  <span className="w-2 h-2 rounded-full bg-[#ff6b2b] animate-bounce delay-300" />
                </div>
              </div>
            )}
          </div>

          {/* Quick Prompt Chips */}
          <div className="px-5 py-3 bg-zinc-950/60 border-t border-zinc-800/80">
            <span className="text-[11px] font-mono text-zinc-500 block mb-2">
              Häufige Fragen testen:
            </span>
            <div className="flex flex-wrap gap-2">
              {samplePrompts.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendPrompt(item.title, item.answer)}
                  className="px-3 py-1.5 rounded-lg bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-[#ff6b2b]/40 text-xs text-zinc-300 hover:text-white transition-all text-left flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3 text-[#ff8c42]" />
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Input Field */}
          <div className="p-4 bg-zinc-950/90 border-t border-zinc-800/80">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendPrompt(inputValue);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Schreibe eine Nachricht an Arslan..."
                className="flex-1 bg-zinc-900/90 border border-zinc-800 focus:border-[#ff6b2b]/60 rounded-xl px-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#ff6b2b]"
              />

              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="ember-button px-4 py-2.5 rounded-xl text-white font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                aria-label="Nachricht absenden"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            {/* Mandatory Disclaimer */}
            <div className="mt-3 flex items-start gap-2 text-[11px] font-mono text-zinc-500">
              <Info className="w-3.5 h-3.5 text-[#ff8c42] shrink-0 mt-0.5" />
              <span>
                Optische Demo-Konsole: Die echte KI- und Sprachsteuerung wird im
                Rahmen der individuellen Kundenkonfiguration an deine spezifischen
                Unternehmensdaten und CRM-Schnittstellen angebunden.
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
