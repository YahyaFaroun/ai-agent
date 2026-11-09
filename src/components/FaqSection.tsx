"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "Was ist ein KI-Agent?",
      answer:
        "Ein KI-Agent ist ein spezialisiertes Softwaresystem auf Basis moderner Sprachmodelle, das im Gegensatz zu simplen Chatbots eigenständig Aufgaben planen, Daten interpretieren und konkrete Aktionen in Drittprogrammen ausführen kann – beispielsweise E-Mails beantworten, Termine im Kalender eintragen oder Kundendaten im CRM aktualisieren.",
    },
    {
      question: "Welche Aufgaben kann er übernehmen?",
      answer:
        "Typische Einsatzbereiche umfassen den 24/7 First-Level Kundensupport, die Beantwortung wiederkehrender E-Mail-Anfragen, automatisierte Terminabstimmungen, Vorqualifizierung von Vertriebskontakten, Stammdatenerfassung sowie die strukturierte Zusammenfassung und Weiterleitung komplexer Vorgänge an menschliche Mitarbeiter.",
    },
    {
      question: "Kann ich bestehende Programme verbinden?",
      answer:
        "Ja. Sofern deine bestehenden Programme über dokumentierte Schnittstellen (APIs, Webhooks) verfügen oder gängige Cloud-Tools wie HubSpot, Salesforce, Pipedrive, Google Workspace, Microsoft 365 oder WhatsApp Business genutzt werden, kann der Agent direkt an deine bestehende Systemlandschaft angebunden werden.",
    },
    {
      question: "Fallen monatliche Kosten an?",
      answer:
        "Neben der einmaligen Konzeption und Einrichtung können laufende Betriebskosten anfallen. Diese setzen sich in der Regel aus dem tatsächlichen Verbrauch der Sprachmodell-Tokens (z. B. OpenAI, Anthropic oder eigenes Hosting) und optionalen Wartungs- bzw. Betreuungsvereinbarungen zusammen. Alle laufenden Kostenpunkte schlüsseln wir vorab transparent für dich auf.",
    },
    {
      question: "Wie lange dauert die Einrichtung?",
      answer:
        "Die Dauer hängt von der Komplexität deiner Prozesse ab. Einfache Assistenten (Starter) können in der Regel innerhalb von 1 bis 2 Wochen einsatzbereit sein. Umfangreichere Business- und Enterprise-Lösungen mit mehrstufigen Integrationen und individuellen Freigabeprozessen benötigen üblicherweise 3 bis 6 Wochen.",
    },
    {
      question: "Sind meine Unternehmensdaten geschützt?",
      answer:
        "Ja, Datenschutz hat oberste Priorität. Wir konfigurieren deine KI-Lösung nach europäischen DSGVO-Standards mit Auftragsverarbeitungsverträgen (AVV) und Opt-outs gegen das Training öffentlicher Modelle. Auf Kundenwunsch können im Enterprise-Paket auch europäische Hosting-Standorte oder isolierte Private-Cloud-Instanzen gewählt werden.",
    },
  ];

  const toggleAccordion = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-[#ff8c42]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b2b]"></span>
            <span>[ 06 // HÄUFIGE FRAGEN ]</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Transparente Antworten.
          </h2>

          <p className="text-base sm:text-lg text-zinc-400">
            Alles Wissenswerte rund um die Implementierung, Technologie und
            Konditionen deines KI-Mitarbeiters.
          </p>
        </div>

        {/* Accordion Container */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`hud-panel rounded-xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "border-[#ff6b2b]/50 shadow-[0_4px_20px_rgba(255,107,43,0.1)]"
                    : "border-zinc-800/80 hover:border-zinc-700"
                }`}
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                >
                  <span className="flex items-center gap-3 text-base sm:text-lg font-bold text-white">
                    <HelpCircle className="w-5 h-5 text-[#ff8c42] shrink-0" />
                    <span>{faq.question}</span>
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-zinc-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#ff8c42] border-[#ff6b2b]/50" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-zinc-400 leading-relaxed border-t border-zinc-800/60 animate-in fade-in slide-in-from-top-2 duration-200">
                    <p>{faq.answer}</p>
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
