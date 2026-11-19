"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  {
    topic: "Unterschied",
    question: "Was unterscheidet meinen KI-Assistenten von ChatGPT?",
    answer:
      "Dein KI-Assistent wird individuell auf dich, deine Projekte und deine Arbeitsabläufe eingerichtet. Er kann mit deinen bestehenden Werkzeugen verbunden werden und dich gezielt bei deinen Aufgaben unterstützen.",
  },
  {
    topic: "Aufgaben",
    question: "Was kann meine KI für mich übernehmen?",
    answer:
      "Von Recherche, E-Mails und Dokumenten über Marketing und Projektmanagement bis hin zur Automatisierung ganzer Geschäftsprozesse. Der Funktionsumfang richtet sich nach deinem Leistungspaket.",
  },
  {
    topic: "Vorkenntnisse",
    question: "Benötige ich technische Vorkenntnisse?",
    answer:
      "Nein. Wir übernehmen die technische Einrichtung und erklären dir, wie du deine KI im Alltag nutzt.",
  },
  {
    topic: "Laufende Kosten",
    question: "Welche laufenden Kosten entstehen?",
    answer:
      "Die Kosten für KI-Modelle und gegebenenfalls Hosting trägst du direkt über deine eigenen Anbieterzugänge.",
  },
  {
    topic: "Schnittstellen",
    question: "Welche Programme lassen sich anbinden?",
    answer:
      "Beispielsweise Google Drive, Gmail, Google Kalender, Telegram, CRM-Systeme, Onlineshops und Datenbanken. Weitere Schnittstellen sind nach Absprache möglich.",
  },
  {
    topic: "Datenschutz",
    question: "Was passiert mit meinen Daten?",
    answer:
      "Du behältst die Kontrolle über deine eigenen Konten und Zugänge. Die Datenverarbeitung richtet sich nach den eingesetzten Diensten und der gewählten Infrastruktur.",
  },
  {
    topic: "Dauer",
    question: "Wie lange dauert die Einrichtung?",
    answer:
      "KI-Assistent: 3–5 Tage. KI-Agent 24/7: 14–30 Tage. KI-Unternehmenslösungen: 14–30 Tage, abhängig vom Projektumfang.",
  },
  {
    topic: "Erweiterung",
    question: "Kann ich meine KI später erweitern?",
    answer:
      "Ja. Zusätzliche Funktionen, Schnittstellen und Automatisierungen können nachträglich ergänzt werden.",
  },
  {
    topic: "Support",
    question: "Benötige ich einen Supportvertrag?",
    answer:
      "Beim KI-Assistenten ist kein Supportvertrag erforderlich. Für den KI-Agenten 24/7 bieten wir Support ab 100 € monatlich und für KI-Unternehmenslösungen ab 200 € monatlich an.",
  },
  {
    topic: "Ablauf",
    question: "Wie funktioniert die Warteliste?",
    answer:
      "Du trägst dich unverbindlich ein und beschreibst deine Anforderungen. Anschließend kontaktieren wir dich persönlich, um die passende Lösung zu besprechen.",
  },
] as const;

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="relative px-4 sm:px-6 py-10"
    >
      <div className="max-w-3xl mx-auto space-y-4">
        <div>
          <span className="text-[11px] font-mono uppercase tracking-widest text-[#ff8c42] block">
            Fragen &amp; Antworten
          </span>
          <h2
            id="faq-heading"
            className="text-lg sm:text-xl font-bold text-white mt-0.5"
          >
            FAQ
          </h2>
        </div>

        <div className="space-y-2.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={item.topic}
                className={`hud-panel rounded-xl border transition-colors overflow-hidden ${
                  isOpen
                    ? "border-[#ff6b2b]/45"
                    : "border-zinc-800/85 hover:border-zinc-700"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full px-4 sm:px-5 py-3.5 text-left flex items-center justify-between gap-3 cursor-pointer"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 block">
                      {item.topic}
                    </span>
                    <span className="text-sm font-semibold text-zinc-100 block mt-0.5">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#ff8c42]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-4 pt-1 text-xs sm:text-sm text-zinc-400 leading-relaxed border-t border-zinc-800/60">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
