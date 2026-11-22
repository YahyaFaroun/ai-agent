"use client";

import {
  Check,
  Clock,
  Laptop,
  Network,
  Server,
  ShieldCheck,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

interface PackageItem {
  name: string;
  badge: string;
  icon: LucideIcon;
  positioning: string;
  price: string;
  priceNote: string;
  description: string;
  motto: string;
  duration: string;
  support: string;
  features: string[];
  featured: boolean;
}

export default function PricingSection() {
  const packages: PackageItem[] = [
    {
      name: "KI-Assistent",
      badge: "Empfohlen",
      icon: Laptop,
      positioning: "Dein persönlicher Assistent.",
      price: "1.000 €",
      priceNote: "Einmalige Einrichtung",
      description:
        "Deine persönliche KI, direkt auf deinem Computer. Sie unterstützt dich bei deinen täglichen Aufgaben, verwaltet Projekte, recherchiert und vereinfacht deine Arbeitsabläufe.",
      motto: "Du arbeitest mit KI.",
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
      featured: true, // Erstes Leistungspaket hervorgehoben
    },
    {
      name: "KI-Agent 24/7",
      badge: "Autonom",
      icon: Server,
      positioning: "Dein digitaler Mitarbeiter.",
      price: "ab 3.000 €",
      priceNote: "Einmalige Einrichtung",
      description:
        "Dein eigener KI-Agent auf einem Server. Er arbeitet auch bei ausgeschaltetem Computer, erledigt geplante Aufgaben selbstständig und ist von überall über Telegram und dein eigenes Web-Dashboard erreichbar.",
      motto: "Die KI arbeitet für dich.",
      duration: "Einrichtungsdauer: 7–14 Tage",
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
      featured: false,
    },
    {
      name: "KI-Unternehmenslösungen",
      badge: "Enterprise",
      icon: Network,
      positioning: "Dein intelligentes KI-Team.",
      price: "ab 10.000 €",
      priceNote: "Einmalige Einrichtung",
      description:
        "Ein individuell entwickeltes KI-System, das spezialisierte Agenten, Softwarelösungen und deine Geschäftsprozesse miteinander vernetzt.",
      motto: "Ein KI-Team arbeitet für dein Unternehmen.",
      duration: "Umsetzungsdauer: 14–30 Tage (nach Umfang)",
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

  const handleSelectPackage = (pkgName: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("select-package", { detail: pkgName })
      );
      const el = document.getElementById("warteliste");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section
      id="pakete"
      aria-labelledby="packages-heading"
      className="relative px-4 sm:px-6 py-14"
    >
      {/* Bessere Desktop-Breitenausnutzung mit max-w-5xl xl:max-w-6xl */}
      <div className="max-w-5xl xl:max-w-6xl mx-auto space-y-8 font-mono">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-zinc-800/80 pb-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#3ECF8E] block font-semibold">
              Leistungspakete
            </span>
            <h2
              id="packages-heading"
              className="text-2xl sm:text-3xl font-extrabold text-white mt-1"
            >
              Transparente Angebote für deine KI
            </h2>
          </div>
          <span className="text-xs sm:text-sm font-mono text-zinc-400">
            Einmalige Einrichtungspreise
          </span>
        </div>

        {/* 3 Preiskarten mit einheitlichen Höhen und Subgrid-Ausrichtung auf Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-y-0 items-stretch">
          {packages.map((pkg) => {
            const Icon = pkg.icon;
            return (
              <div
                key={pkg.name}
                className={`min-w-0 rounded-2xl p-6 sm:p-7 lg:p-6 xl:p-7 flex flex-col gap-5 lg:grid lg:row-span-7 lg:grid-rows-subgrid lg:gap-y-5 transition-all ${
                  pkg.featured
                    ? "hud-panel-active border-[#3ECF8E]/70 shadow-[0_0_36px_rgba(62,207,142,0.22)] lg:-translate-y-1"
                    : "hud-panel border border-zinc-800/90 hover:border-zinc-700"
                }`}
              >
                {/* 1. Dezentes Icon, Badge, Titel & Positionierung */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3.5">
                    <div
                      aria-hidden="true"
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${
                        pkg.featured
                          ? "bg-[#3ECF8E]/15 border-[#3ECF8E]/45 text-[#3ECF8E]"
                          : "bg-zinc-900/90 border-zinc-800 text-[#3ECF8E]"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span
                      className={`text-xs font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                        pkg.featured
                          ? "bg-[#3ECF8E]/20 border-[#3ECF8E]/55 text-[#3ECF8E] flex items-center gap-1 font-bold"
                          : "bg-zinc-900 border-zinc-800 text-zinc-300"
                      }`}
                    >
                      {pkg.featured && <Sparkles className="w-3 h-3" />}
                      {pkg.badge}
                    </span>
                  </div>
                  <h3 className="text-lg xl:text-xl font-bold text-white tracking-tight">
                    {pkg.name}
                  </h3>
                  <p className="text-[14px] font-medium text-[#3ECF8E] mt-1">
                    {pkg.positioning}
                  </p>
                </div>

                {/* 2. Preis */}
                <div>
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight">
                    {pkg.price}
                  </div>
                  <div className="text-xs font-mono text-zinc-400 mt-1">
                    {pkg.priceNote}
                  </div>
                </div>

                {/* 3. Beschreibung (Fließtext 15 px) */}
                <p className="text-[15px] text-zinc-200 leading-relaxed">
                  {pkg.description}
                </p>

                {/* 4. Leitsatz */}
                <div
                  className={`rounded-xl px-3.5 py-2.5 border text-[14px] font-semibold flex items-center gap-2.5 ${
                    pkg.featured
                      ? "bg-[#3ECF8E]/12 border-[#3ECF8E]/40 text-[#3ECF8E]"
                      : "bg-zinc-900/85 border-zinc-800 text-zinc-100"
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3ECF8E] shrink-0" />
                  <span className="leading-snug">{pkg.motto}</span>
                </div>

                {/* 5. Konditionen (Dauer & Support, 14 px) */}
                <div className="pt-4 border-t border-zinc-800/80 space-y-2 text-[14px] font-mono text-zinc-200">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#3ECF8E] shrink-0" />
                    <span className="font-medium">{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-zinc-300">
                    <ShieldCheck className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span>{pkg.support}</span>
                  </div>
                </div>

                {/* 6. Enthaltene Leistungen (14 px) */}
                <div className="pt-4 border-t border-zinc-800/80">
                  <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 block mb-3 font-semibold">
                    Enthaltene Leistungen:
                  </span>
                  <ul className="space-y-2.5 text-[14px] text-zinc-200">
                    {pkg.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-[#3ECF8E] shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 7. CTA Button (14 px) */}
                <div className="pt-3 mt-auto lg:mt-0 self-end w-full">
                  <button
                    type="button"
                    onClick={() => handleSelectPackage(pkg.name)}
                    className={`w-full py-3 px-4 xl:px-5 rounded-xl text-[14px] font-bold text-center whitespace-nowrap block transition-all cursor-pointer ${
                      pkg.featured
                        ? "supabase-button shadow-lg text-[#060709]"
                        : "metallic-button text-zinc-100 hover:text-white"
                    }`}
                  >
                    Auf die Warteliste setzen
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Allgemeine Geschäftsregeln – 14 px */}
        <div className="rounded-2xl p-5 sm:p-6 bg-zinc-950/85 border border-zinc-800 text-[14px] text-zinc-300 space-y-2.5">
          <div className="font-mono text-xs uppercase tracking-wider text-zinc-100 flex items-center gap-2 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#3ECF8E]" />
            Transparente Geschäftsregeln
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[14px] text-zinc-300 leading-relaxed list-disc list-inside">
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
