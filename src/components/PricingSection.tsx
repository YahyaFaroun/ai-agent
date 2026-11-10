export default function PricingSection() {
  const packages = [
    {
      name: "Starter",
      price: "ab 1.000 €",
      description:
        "Ein persönlicher KI-Assistent für grundlegende Aufgaben.",
      featured: false,
    },
    {
      name: "Business",
      price: "ab 2.000 €",
      description:
        "Ein KI-Agent für Unternehmen mit individuellen Integrationen und Arbeitsabläufen.",
      featured: true,
    },
    {
      name: "Enterprise",
      price: "ab 5.000 €",
      description:
        "Komplexe KI-Automatisierungen und maßgeschneiderte Lösungen.",
      featured: false,
    },
  ];

  return (
    <section
      id="pakete"
      aria-labelledby="packages-heading"
      className="relative px-4 sm:px-6 py-10"
    >
      <div className="max-w-3xl mx-auto space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#ff8c42] block">
              Orientierung
            </span>
            <h2
              id="packages-heading"
              className="text-lg sm:text-xl font-bold text-white mt-0.5"
            >
              KI-Pakete
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            Unverbindliche Richtwerte
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {packages.map((pkg) => (
            <div
              key={pkg.name}
              className={`rounded-2xl p-5 flex flex-col justify-between transition-colors ${
                pkg.featured
                  ? "hud-panel-active"
                  : "hud-panel border border-zinc-800/90"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-base font-bold text-white tracking-wide">
                    {pkg.name}
                  </h3>
                  <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-900/90 border border-zinc-800 text-zinc-400">
                    Richtwert
                  </span>
                </div>

                <div className="text-xl sm:text-2xl font-extrabold font-mono text-zinc-100 mb-2.5">
                  {pkg.price}
                </div>

                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  {pkg.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-zinc-500 leading-relaxed text-center pt-1">
          Alle Preise verstehen sich als unverbindliche Richtwerte. Leistungsumfang,
          etwaige laufende Kosten und optionale Betreuung werden individuell vereinbart.
        </p>
      </div>
    </section>
  );
}
