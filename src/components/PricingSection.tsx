import { Check, Clock, ShieldCheck, Sparkles } from "lucide-react";

export default function PricingSection() {
  const packages = [
    {
      name: "KI-Assistent",
      badge: "Persönlich",
      price: "1.000 €",
      priceNote: "Einmalige Einrichtung",
      description: "Persönlicher KI-Assistent passend zu deinen Aufgaben, Zielen und Arbeitsabläufen.",
      duration: "Einrichtungsdauer: 3–5 Tage",
      support: "Kein verpflichtender Supportvertrag",
      features: [
        "Persönlicher KI-Assistent",
        "Individuelle Konfiguration",
        "Persönliches Gedächtnis",
        "Projekt- und Aufgabenverwaltung",
        "Recherche und Informationsverarbeitung",
        "Unterstützung bei täglichen Arbeitsabläufen",
        "Nutzung eigener kompatibler KI-Zugänge",
        "Eigenständige Verwaltung",
      ],
      featured: false,
    },
    {
      name: "KI-Agent 24/7",
      badge: "Empfohlen",
      price: "ab 3.000 €",
      priceNote: "Einmalige Einrichtung",
      description: "Autonomer KI-Mitarbeiter im durchgehenden 24/7-Serverbetrieb mit Dashboard.",
      duration: "Einrichtungsdauer: 14–30 Tage",
      support: "Support ab 100 € monatlich",
      features: [
        "Eigener KI-Agent",
        "24/7-Serverbetrieb",
        "Individuelle Einrichtung",
        "Langzeitgedächtnis und Projektwissen",
        "Eigenes Web-Dashboard",
        "Telegram-Anbindung",
        "Integration externer Dienste",
        "Zeitgesteuerte Aufgaben",
        "Automatische Berichte und Benachrichtigungen",
      ],
      featured: true,
    },
    {
      name: "KI-Unternehmenslösungen",
      badge: "Enterprise",
      price: "ab 10.000 €",
      priceNote: "Einmalige Einrichtung",
      description: "Prozessoptimierung, individuelle Software & vernetzte Multi-Agenten-Systeme.",
      duration: "Umsetzungsdauer: 14–30 Tage, abhängig vom Projektumfang",
      support: "Support ab 200 € monatlich",
      features: [
        "Alle Leistungen des KI-Agenten 24/7",
        "Analyse bestehender Geschäftsprozesse",
        "Identifikation von Automatisierungspotenzialen",
        "Optimierung interner Arbeitsabläufe",
        "Individuelle Softwarelösungen",
        "Vernetzung bestehender Systeme",
        "Komplexe KI-Automatisierungen",
        "Zusammenarbeit mehrerer KI-Agenten",
        "Individuelle Dashboards",
      ],
      featured: false,
    },
  ];

  return (
    <section
      id="pakete"
      aria-labelledby="packages-heading"
      className="relative px-4 sm:px-6 py-12"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#ff8c42] block">
              Leistungspakete
            </span>
            <h2
              id="packages-heading"
              className="text-xl sm:text-2xl font-bold text-white mt-0.5"
            >
              Transparente Angebote für deine KI
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            Einmalige Einrichtungspreise
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`rounded-2xl p-5 sm:p-6 flex flex-col justify-between transition-all ${
                pkg.featured
                  ? "hud-panel-active border-[#ff8c42]/60 shadow-[0_0_32px_rgba(255,107,43,0.18)]"
                  : "hud-panel border border-zinc-800/90"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                    {pkg.name}
                  </h3>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                      pkg.featured
                        ? "bg-[#ff8c42]/20 border-[#ff8c42]/50 text-[#ffb07a] flex items-center gap-1"
                        : "bg-zinc-900 border-zinc-800 text-zinc-400"
                    }`}
                  >
                    {pkg.featured && <Sparkles className="w-2.5 h-2.5" />}
                    {pkg.badge}
                  </span>
                </div>

                <div>
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-zinc-100">
                    {pkg.price}
                  </div>
                  <div className="text-[11px] font-mono text-zinc-500 mt-0.5">
                    {pkg.priceNote}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {pkg.description}
                </p>

                <div className="pt-2 border-t border-zinc-800/70 space-y-1.5 text-xs font-mono text-zinc-300">
                  <div className="flex items-center gap-2 text-zinc-300">
                    <Clock className="w-3.5 h-3.5 text-[#ff8c42] shrink-0" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>{pkg.support}</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-800/70">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 block mb-2">
                    Enthaltene Leistungen:
                  </span>
                  <ul className="space-y-2 text-xs sm:text-sm text-zinc-300">
                    {pkg.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#ff8c42] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6">
                <a
                  href="#warteliste"
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-center block transition-all ${
                    pkg.featured
                      ? "ember-button text-white shadow-md"
                      : "metallic-button text-zinc-200 hover:text-white"
                  }`}
                >
                  Auf die Warteliste setzen
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Allgemeine Geschäftsregeln */}
        <div className="rounded-xl p-4 bg-zinc-950/70 border border-zinc-800/90 text-xs text-zinc-400 space-y-1.5">
          <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-300 flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff8c42]" />
            Transparente Geschäftsregeln
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-zinc-400 leading-relaxed list-disc list-inside">
            <li>Die Einrichtungspreise sind einmalige Fixkosten.</li>
            <li>KI-Verbrauch und ggf. Hosting trägst du direkt über deine eigenen Anbieterzugänge.</li>
            <li>Keine versteckten Gebühren oder künstlich gebündelten Token-Pakete.</li>
            <li>Individuelle Erweiterungen und Softwareanpassungen werden separat vereinbart.</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
