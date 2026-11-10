import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import LegalLinks from "@/components/LegalLinks";

export const metadata = {
  title: "Impressum – Arslan AI",
  description: "Vorbereitete Anbieterkennzeichnung gemäß § 5 DDG.",
};

export default function ImpressumPage() {
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
              <Shield className="w-3.5 h-3.5" />
              <span>VORBEREITETE SEITE // § 5 DDG</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Impressum
            </h1>
            <p className="text-xs text-zinc-500 mt-2">
              Hinweis: Bitte ersetze die gekennzeichneten Platzhalter vor der öffentlichen Freischaltung durch deine rechtsgültigen Unternehmensangaben.
            </p>
          </div>

          <div className="space-y-6 text-sm leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">Angaben gemäß § 5 DDG</h2>
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 font-mono text-xs text-zinc-300 space-y-1">
                <p>[Unternehmensbezeichnung / Rechtsform]</p>
                <p>Vertreten durch: [Vorname Nachname]</p>
                <p>[Straße und Hausnummer]</p>
                <p>[PLZ Ort, Land]</p>
              </div>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">Kontakt</h2>
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 font-mono text-xs text-zinc-300 space-y-1">
                <p>Telefon: [Telefonnummer eintragen]</p>
                <p>E-Mail: [E-Mail-Adresse eintragen]</p>
              </div>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">Registereintrag (falls vorhanden)</h2>
              <p className="text-zinc-400 text-xs sm:text-sm">
                Registergericht: [Registergericht eintragen]<br />
                Registernummer: [Registernummer eintragen]
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">Umsatzsteuer-ID (falls vorhanden)</h2>
              <p className="text-zinc-400 text-xs sm:text-sm">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz: [USt-IdNr. eintragen]
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">Verantwortlich gemäß § 18 Abs. 2 MStV</h2>
              <p className="text-zinc-400 text-xs sm:text-sm">
                [Vorname Nachname, Anschrift eintragen]
              </p>
            </section>
          </div>
        </div>
      </main>
      <LegalLinks />
    </div>
  );
}
