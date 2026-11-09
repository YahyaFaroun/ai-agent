"use client";

import { Check, Sparkles, ArrowRight, Shield } from "lucide-react";

interface PricingSectionProps {
  onSelectPackage?: (packageName: string) => void;
}

export default function PricingSection({ onSelectPackage }: PricingSectionProps) {
  const plans = [
    {
      id: "starter",
      name: "STARTER",
      price: "ab 1.000 €",
      subtitle: "Ein persönlicher KI-Assistent für grundlegende Aufgaben.",
      description:
        "Perfekt für Solopreneure, Kanzleien und kleinere Teams, die standardisierte Anfragen automatisieren wollen.",
      highlight: false,
      badge: "EINSTIEG",
      features: [
        "1 spezialisierter KI-Assistent",
        "Automatisierte Beantwortung häufiger Kundenanfragen",
        "Kalenderanbindung für selbstständige Terminbuchungen",
        "E-Mail-Benachrichtigungen bei Neuanfragen",
        "Grundlegende Wissensbasis & FAQ-Feinabstimmung",
        "Web-Chat Widget für deine Website",
      ],
      ctaText: "Starter anfragen",
    },
    {
      id: "business",
      name: "BUSINESS",
      price: "ab 2.000 €",
      subtitle:
        "Ein KI-Agent für Unternehmen mit individuellen Integrationen und Arbeitsabläufen.",
      description:
        "Die ideale Lösung für wachsende Unternehmen mit bestehender Softwarelandschaft und höherem Anfragevolumen.",
      highlight: true,
      badge: "EMPFOHLEN // MEISTGEWÄHLT",
      features: [
        "Vollwertiger KI-Mitarbeiter mit individueller Geschäftslogik",
        "Direkte Anbindung an CRM (HubSpot, Pipedrive, Salesforce etc.)",
        "Mehrstufige Lead-Qualifizierung & Ticket-Routing",
        "Multi-Kanal Anbindung (Web-Chat, E-Mail, optional WhatsApp)",
        "Dynamischer Datenabgleich mit Live-Datenbanken",
        "Dediziertes Prompt-Engineering auf Firmentonalität",
        "Regelmäßige Leistungs- & Qualitäts-Reviews",
      ],
      ctaText: "Business anfragen",
    },
    {
      id: "enterprise",
      name: "ENTERPRISE",
      price: "ab 5.000 €",
      subtitle:
        "Komplexe KI-Automatisierungen und maßgeschneiderte Lösungen.",
      description:
        "Für etablierte Unternehmen, Agenturen und Konzerne mit anspruchsvollen Sicherheitsanforderungen.",
      highlight: false,
      badge: "MASSGESCHNEIDERT",
      features: [
        "Multi-Agenten-Architektur für vernetzte Abteilungen",
        "Vollständig maßgeschneiderte Backend- & ERP-Workflows",
        "DSGVO-konformes Hosting (auf Wunsch Private Cloud / On-Premise)",
        "Schnittstellen zu komplexen internen Fachanwendungen",
        "Individuelle Service-Level-Agreements (SLA)",
        "Persönlicher Account Manager & Schulung deiner Teams",
      ],
      ctaText: "Enterprise anfragen",
    },
  ];

  const handleSelect = (planName: string) => {
    if (onSelectPackage) {
      onSelectPackage(planName);
    }
    const el = document.getElementById("warteliste");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="pakete" className="py-24 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#ff6b2b]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-[#ff8c42]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b2b]"></span>
            <span>[ 03 // INVESTITION & PAKETE ]</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Transparente <span className="text-metallic">KI-Pakete</span> für dein Wachstum.
          </h2>

          <p className="text-base sm:text-lg text-zinc-400">
            Wähle das Modell, das am besten zu deinen Anforderungen passt. Alle
            Preise sind einmalige Einrichtungs-Richtwerte für ein schlüsselfertiges
            System.
          </p>
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative rounded-2xl flex flex-col justify-between transition-all duration-300 ${
                plan.highlight
                  ? "hud-panel-active p-8 lg:p-9 -translate-y-2 lg:-translate-y-3 z-10"
                  : "hud-panel p-8 hover:border-zinc-700 hover:-translate-y-1"
              }`}
            >
              {/* Highlight Badge */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`text-[10px] font-mono tracking-widest px-2.5 py-1 rounded-full uppercase ${
                    plan.highlight
                      ? "bg-[#ff6b2b]/20 text-[#ff8c42] border border-[#ff6b2b]/50 shadow-[0_0_12px_rgba(255,107,43,0.3)] font-semibold"
                      : "bg-zinc-900 text-zinc-500 border border-zinc-800"
                  }`}
                >
                  {plan.badge}
                </span>

                {plan.highlight && (
                  <span className="flex items-center gap-1 text-xs text-[#ff8c42] font-mono">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>PREMIUM</span>
                  </span>
                )}
              </div>

              {/* Title & Price */}
              <div>
                <h3 className="text-2xl font-extrabold text-white tracking-wide">
                  {plan.name}
                </h3>
                <div className="mt-3 mb-2 flex items-baseline gap-1">
                  <span className="text-3xl sm:text-4xl font-black font-mono text-white">
                    {plan.price}
                  </span>
                  <span className="text-xs text-zinc-500 font-mono">*</span>
                </div>

                <p className="text-sm font-semibold text-[#ff8c42] mb-3">
                  {plan.subtitle}
                </p>

                <p className="text-xs text-zinc-400 leading-relaxed mb-6">
                  {plan.description}
                </p>

                {/* Features List */}
                <div className="pt-6 border-t border-zinc-800/80 space-y-3 mb-8">
                  <span className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase block mb-3">
                    Enthaltene Leistungen:
                  </span>
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                      <Check className="w-4 h-4 text-[#ff6b2b] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Action */}
              <div className="pt-4">
                <button
                  onClick={() => handleSelect(plan.name)}
                  className={`w-full py-3.5 rounded-xl font-semibold text-sm tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    plan.highlight
                      ? "ember-button text-white shadow-lg shadow-[#ff6b2b]/30"
                      : "metallic-button text-zinc-200 hover:text-white"
                  }`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mandatory Transparency Disclaimer */}
        <div className="mt-14 max-w-3xl mx-auto p-5 rounded-2xl bg-zinc-950/80 border border-zinc-800 text-center space-y-2">
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-zinc-300">
            <Shield className="w-4 h-4 text-[#ff6b2b]" />
            <span className="font-semibold text-white">
              Transparenz &amp; Verbindlichkeit:
            </span>
          </div>
          <p className="text-xs text-zinc-400 leading-relaxed">
            * Alle genannten Preise sind unverbindliche Richtwerte für die
            Konzeption und Ersteinrichtung. Der tatsächliche Leistungsumfang,
            etwaige variable API-/Infrastrukturkosten (z. B. Modell-Tokens) sowie
            optionale laufende Betreuungs- und Wartungsverträge werden vorab
            individuell, transparent und schriftlich mit dir vereinbart. Keine
            versteckten Kosten.
          </p>
        </div>
      </div>
    </section>
  );
}
