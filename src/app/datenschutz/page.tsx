import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import LegalLinks from "@/components/LegalLinks";

export const metadata = {
  title: "Datenschutzerklärung – YY-AI-Agent",
  description: "Vorbereitete Datenschutzerklärung gemäß DSGVO.",
};

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-[#050507] text-zinc-300 flex flex-col">
      <main className="flex-1 pt-12 pb-12 px-4 sm:px-6 max-w-3xl mx-auto w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-[#ff8c42] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zurück</span>
        </Link>

        <div className="hud-panel rounded-2xl p-6 sm:p-10 border border-zinc-800 space-y-7">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-[#ff8c42] mb-3">
              <Lock className="w-3.5 h-3.5" />
              <span>VORBEREITETE SEITE // DSGVO</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Datenschutzerklärung
            </h1>
            <p className="text-xs text-zinc-500 mt-2">
              Hinweis: Bitte ergänze die gekennzeichneten Platzhalter vor dem produktiven Einsatz um deine rechtsgültigen Angaben.
            </p>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-zinc-300">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">1. Verantwortliche Stelle</h2>
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 font-mono text-xs text-zinc-300 space-y-1">
                <p>[Unternehmensbezeichnung / Name]</p>
                <p>[Straße und Hausnummer, PLZ Ort]</p>
                <p>E-Mail: [Datenschutz-Kontaktadresse eintragen]</p>
              </div>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">2. Technischer Seitenaufruf</h2>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Beim Aufruf dieser Website verarbeitet der Hosting-Anbieter technisch erforderliche Verbindungsdaten (z. B. IP-Adresse, Zeitpunkt des Zugriffs, aufgerufene Seite sowie Browserinformationen), um die Auslieferung und Betriebssicherheit der Website zu gewährleisten.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">3. Mehrstufiges Anfrageformular</h2>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Im Anfrageformular werden Angaben zum gewünschten Einsatzbereich (ggf. inklusive Branche), zu gewünschten Aufgaben, zu gewünschten Integrationen sowie deine Kontaktdaten (Name, E-Mail-Adresse und optional Telefonnummer) erfasst. Die Verarbeitung erfolgt auf Grundlage deiner Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sowie zur Durchführung vorvertraglicher Maßnahmen (Art. 6 Abs. 1 lit. b DSGVO).
              </p>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Solange noch keine produktive Backend-Schnittstelle angebunden ist, findet keine dauerhafte Speicherung oder Übermittlung deiner Formulareingaben statt; das Formular weist hierauf ausdrücklich hin.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">4. Rechte betroffener Personen</h2>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Dir stehen im Rahmen der gesetzlichen Vorgaben der DSGVO unter anderem Rechte auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerruf erteilter Einwilligungen zu. Zudem besteht ein Beschwerderecht bei einer zuständigen Datenschutz-Aufsichtsbehörde.
              </p>
            </section>
          </div>
        </div>
      </main>
      <LegalLinks />
    </div>
  );
}
