"use client";

export default function PositioningSection() {
  const valueProps = [
    {
      title: "Persönliches Gedächtnis",
      desc: "Eine KI, die dich und deine Projekte kennt.",
    },
    {
      title: "Automatisierung",
      desc: "Weniger Routinearbeit, mehr Zeit fürs Wesentliche.",
    },
    {
      title: "Vernetzte Systeme",
      desc: "Deine Werkzeuge und Programme arbeiten zusammen.",
    },
    {
      title: "Individuelle Lösungen",
      desc: "Exakt angepasst an deine spezifischen Anforderungen.",
    },
  ];

  const useCases = [
    "Büro & Organisation",
    "Recherche & Marktanalysen",
    "Marketing & Content",
    "Projektmanagement",
    "Softwareentwicklung",
    "Prozessautomatisierung",
  ];

  return (
    <section
      id="positionierung"
      aria-label="Positionierung und Mehrwerte"
      className="relative px-4 sm:px-6 py-12"
    >
      <div className="max-w-5xl xl:max-w-6xl mx-auto text-center space-y-6">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-mono">
          Deine eigene KI. <br className="hidden sm:inline" />
          <span className="text-metallic">Für dein Leben.</span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#3ECF8E] via-[#6ee7b7] to-[#10b981]">
            Für dein Business.
          </span>
        </h2>

        {/* Fließtext um 15–20 % vergrößert, verbesserter Kontrast (text-zinc-200) */}
        <p className="text-base sm:text-lg text-zinc-200 leading-relaxed max-w-3xl mx-auto font-mono">
          Ob persönlicher KI-Assistent, autonomer KI-Mitarbeiter oder intelligente Unternehmenslösung – wir entwickeln deine KI passend zu deinen Aufgaben, Zielen und Arbeitsabläufen.
        </p>

        {/* 4 Zentrale Verkaufsargumente mit besserer Desktop-Breite und hohem Kontrast */}
        <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-left">
          {valueProps.map((prop) => (
            <div
              key={prop.title}
              className="p-4 sm:p-5 rounded-2xl bg-zinc-900/80 border border-zinc-800/90 shadow-md hover:border-[#3ECF8E]/40 transition-colors"
            >
              <span className="text-sm sm:text-base font-bold text-zinc-100 flex items-center gap-2 font-mono">
                <span className="w-2 h-2 rounded-full bg-[#3ECF8E] shrink-0" />
                {prop.title}
              </span>
              <span className="text-xs sm:text-sm text-zinc-300 block mt-2 leading-relaxed font-mono">
                {prop.desc}
              </span>
            </div>
          ))}
        </div>

        {/* Anwendungsbereiche */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm">
          <span className="text-xs font-mono uppercase tracking-wider text-zinc-400 mr-1">
            Anwendungsbereiche:
          </span>
          {useCases.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-zinc-200 font-mono text-xs sm:text-sm shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
