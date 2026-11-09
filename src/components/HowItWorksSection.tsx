import { MessageSquareText, Cpu, Rocket, CheckCircle } from "lucide-react";

export default function HowItWorksSection() {
  const steps = [
    {
      num: "01",
      icon: MessageSquareText,
      title: "Beratung & Analyse",
      subtitle: "Wir analysieren deine Anforderungen.",
      description:
        "In einem fokussierten Erstgespräch identifizieren wir deine zeitraubendsten Prozesse. Gemeinsam legen wir fest, welche Aufgaben dein KI-Mitarbeiter eigenständig übernehmen darf und welche Systeme angebunden werden.",
      details: ["Prozess-Audit", "Aufgabendefinition", "System-Check"],
    },
    {
      num: "02",
      icon: Cpu,
      title: "Einrichtung & Training",
      subtitle: "Wir konfigurieren deinen persönlichen KI-Agenten.",
      description:
        "Wir trainieren Arslan auf dein Firmenwissen, etablieren Leitplanken für höchste Datensicherheit und binden deine Kalender-, CRM- oder E-Mail-Schnittstellen an. Nach internen Testläufen stimmen wir das Verhalten ab.",
      details: ["Wissensbasis einpflegen", "API-Integration", "Qualitätssicherung"],
    },
    {
      num: "03",
      icon: Rocket,
      title: "Einsatz & Entlastung",
      subtitle: "Dein Agent unterstützt dich bei deinen täglichen Aufgaben.",
      description:
        "Arslan geht live in den Produktivbetrieb. Er empfängt Kunden, beantwortet Standardfragen und entlastet dein Team ab Tag 1. Bei komplexen Ausnahmefällen übergibt er lückenlos an deine Mitarbeiter.",
      details: ["Go-Live Begleitung", "Mitarbeiter-Briefing", "Laufende Optimierung"],
    },
  ];

  return (
    <section id="ablauf" className="py-24 relative overflow-hidden bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-[#ff8c42]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b2b]"></span>
            <span>[ 02 // WORKFLOW IN 3 SCHRITTEN ]</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            So einfach startest du mit{" "}
            <span className="text-metallic">Arslan AI</span>.
          </h2>

          <p className="text-base sm:text-lg text-zinc-400">
            Transparenter Ablauf ohne technischen Mehraufwand für dich. Wir
            begleiten dich von der ersten Prozessanalyse bis zum erfolgreichen
            Go-Live.
          </p>
        </div>

        {/* Steps Grid with Connector Lines */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.num}
                className="relative hud-panel rounded-2xl p-8 flex flex-col justify-between group hover:border-[#ff6b2b]/40 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Step Index Header */}
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#ff8c42] group-hover:bg-[#ff6b2b] group-hover:text-white transition-colors duration-300 shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-3xl font-extrabold font-mono text-zinc-700 group-hover:text-[#ff8c42]/80 transition-colors">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm font-medium text-[#ff8c42] mb-4">
                    {step.subtitle}
                  </p>

                  <p className="text-sm text-zinc-400 leading-relaxed mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Sub-steps checklist */}
                <div className="pt-4 border-t border-zinc-800/80 space-y-2">
                  {step.details.map((detail, dIdx) => (
                    <div
                      key={dIdx}
                      className="flex items-center gap-2 text-xs font-mono text-zinc-400"
                    >
                      <CheckCircle className="w-3.5 h-3.5 text-[#ff6b2b] shrink-0" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Workflow Bottom Summary */}
        <div className="mt-12 max-w-2xl mx-auto p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-center flex flex-col sm:flex-row items-center justify-center gap-3 text-xs font-mono text-zinc-400">
          <span className="text-[#ff6b2b] font-bold">FAZIT:</span>
          <span>Kein Programmieraufwand für dein Team. Wir liefern schlüsselfertige KI-Automatisierung.</span>
        </div>
      </div>
    </section>
  );
}
