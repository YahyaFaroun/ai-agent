"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ_ITEMS = [
  {
    topic: "KI-Agenten",
    question: "Was ist ein KI-Agent?",
    answer:
      "Ein KI-Agent ist ein digitales System auf Basis moderner Sprachmodelle, das definierte Aufgaben nach klaren Vorgaben unterstützt oder automatisiert bearbeitet – abgestimmt auf deinen jeweiligen Einsatzbereich.",
  },
  {
    topic: "Einsatzmöglichkeiten",
    question: "Welche Aufgaben kann ein KI-Agent übernehmen?",
    answer:
      "Je nach Konfiguration kann der Agent unter anderem Kundenanfragen vorstrukturieren, E-Mails bearbeiten, Termine koordinieren, Dokumente vorbereiten, Informationen recherchieren und wiederkehrende Abläufe automatisieren.",
  },
  {
    topic: "Integrationen",
    question: "Welche bestehenden Systeme lassen sich anbinden?",
    answer:
      "Bestehende Programme und Kanäle wie E-Mail, Kalender, Website, CRM-Systeme, Datenbanken, Onlineshops oder Messenger lassen sich einbinden, sofern entsprechende Schnittstellen verfügbar sind.",
  },
  {
    topic: "Laufende Kosten",
    question: "Fallen neben der Einrichtung laufende Kosten an?",
    answer:
      "Je nach gewählter technischer Infrastruktur, Nutzungsintensität der Sprachmodelle und einer optionalen laufenden Betreuung können laufende Betriebskosten entstehen. Alle Konditionen werden vorab transparent und individuell abgestimmt.",
  },
  {
    topic: "Einrichtung",
    question: "Wie läuft die Einrichtung ab?",
    answer:
      "Auf Grundlage deiner Anfrage besprechen wir die gewünschten Aufgaben und Schnittstellen, definieren den konkreten Funktionsumfang und richten deinen KI-Agenten anschließend individuell für deinen Bedarf ein.",
  },
  {
    topic: "Datenschutz",
    question: "Wie wird der Datenschutz berücksichtigt?",
    answer:
      "Bei der Konzeption und Auswahl der technischen Komponenten werden die Anforderungen der DSGVO berücksichtigt. Welche Systeme und Datenverarbeitungen konkret zum Einsatz kommen, wird vor der Umsetzung gemeinsam festgelegt.",
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
