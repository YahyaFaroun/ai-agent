import { Clock, CheckCircle2, Sliders, Network, ArrowUpRight } from "lucide-react";

export default function AdvantagesSection() {
  const advantages = [
    {
      id: "01",
      icon: Clock,
      title: "24/7 erreichbar",
      tag: "DAUEREINSATZ",
      description:
        "Keine verpassten Leads, Anrufe oder Kundenanliegen mehr außerhalb der Bürozeiten. Arslan antwortet sekundenschnell, qualifiziert Anfragen vor und bucht Termine rund um die Uhr.",
    },
    {
      id: "02",
      icon: CheckCircle2,
      title: "Weniger Verwaltungsaufwand",
      tag: "EFFIZIENZ",
      description:
        "Befreie dein Kernteam von zeitraubenden Standardaufgaben. E-Mail-Sortierung, Datenerfassung, Statusauskünfte und Dokumentenabgleiche erledigt dein Agent autonom im Hintergrund.",
    },
    {
      id: "03",
      icon: Sliders,
      title: "Individuell anpassbar",
      tag: "MASSGESCHNEIDERT",
      description:
        "Kein starrer 08/15-Chatbot. Dein KI-Mitarbeiter wird exakt auf deine Firmentonalität, deine spezifischen FAQs, Preislisten und internen Freigaberegeln feinjustiert.",
    },
    {
      id: "04",
      icon: Network,
      title: "Integration in bestehende Arbeitsabläufe",
      tag: "INTEROPERABILITÄT",
      description:
        "Nahtlose Einbindung in deine vorhandene Tool-Landschaft: CRM-Systeme (HubSpot, Salesforce, Pipedrive), Kalender, WhatsApp Business, E-Mail-Postfächer und Slack.",
    },
  ];

  return (
    <section id="vorteile" className="py-24 relative overflow-hidden">
      {/* Background Section Accent */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#ff6b2b]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with HUD Styling */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-[#ff8c42]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b2b]"></span>
            <span>[ 01 // VORTEILE FÜR DEIN UNTERNEHMEN ]</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Warum erfolgreiche Firmen auf{" "}
            <span className="text-metallic">Arslan AI</span> setzen.
          </h2>

          <p className="text-base sm:text-lg text-zinc-400">
            Ersetze manuelle Routinearbeit durch intelligente, fehlertolerante
            Automatisierung. Dein Team gewinnt wertvolle Zeit für strategische
            Kundenbetreuung.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {advantages.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative hud-panel rounded-2xl p-7 lg:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-[#ff6b2b]/40 hover:shadow-[0_10px_30px_rgba(255,107,43,0.1)] flex flex-col justify-between"
              >
                {/* Tech corner marks */}
                <div className="absolute top-3 right-3 text-[10px] font-mono text-zinc-600 group-hover:text-[#ff8c42] transition-colors">
                  {item.id}
                </div>

                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-zinc-700/80 flex items-center justify-center text-[#ff8c42] group-hover:text-white group-hover:bg-[#ff6b2b] group-hover:border-[#ff6b2b] transition-all duration-300 shadow-md">
                      <Icon className="w-6 h-6" />
                    </div>

                    <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase px-2 py-0.5 rounded bg-zinc-900/60 border border-zinc-800">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-zinc-100 flex items-center gap-2">
                    {item.title}
                  </h3>

                  <p className="text-sm lg:text-base text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-500 group-hover:text-zinc-300 transition-colors">
                  <span>SYSTEM_CHECK: OPTIMAL</span>
                  <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-[#ff8c42] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
