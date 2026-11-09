import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Impressum – Arslan AI",
  description: "Rechtliche Anbieterkennzeichnung von Arslan AI nach § 5 DDG.",
};

export default function ImpressumPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-zinc-300">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-[#ff8c42] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zurück zur Startseite</span>
        </Link>

        <div className="hud-panel rounded-2xl p-8 sm:p-12 border border-zinc-800 space-y-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-[#ff8c42] mb-3">
              <Shield className="w-3.5 h-3.5" />
              <span>RECHTLICHE HINWEISE // § 5 DDG</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Impressum
            </h1>
          </div>

          <div className="space-y-6 text-sm sm:text-base leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">Angaben gemäß § 5 DDG:</h2>
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 font-mono text-xs sm:text-sm text-zinc-300 space-y-1">
                <p><strong>[Unternehmen / Agenturname]</strong></p>
                <p>Arslan AI – Agentur für KI-Automatisierung</p>
                <p>Vertreten durch: [Vorname Nachname / Vertretungsberechtigter]</p>
                <p>[Musterstraße 12]</p>
                <p>[12345 Musterstadt, Deutschland]</p>
              </div>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">Kontakt:</h2>
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 font-mono text-xs sm:text-sm text-zinc-300 space-y-1">
                <p>Telefon: [+49 (0) 123 456789]</p>
                <p>E-Mail: [kontakt@arslan-ai.de]</p>
                <p>Website: [www.arslan-ai.de]</p>
              </div>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">Registereintrag (sofern zutreffend):</h2>
              <p className="text-zinc-400 text-sm">
                Eintragung im Handelsregister.<br />
                Registergericht: [Amtsgericht Musterstadt]<br />
                Registernummer: [HRB XXXXX]
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">Umsatzsteuer-ID:</h2>
              <p className="text-zinc-400 text-sm">
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
                [DE XXX XXX XXX]
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV:</h2>
              <p className="text-zinc-400 text-sm">
                [Vorname Nachname]<br />
                [Musterstraße 12]<br />
                [12345 Musterstadt]
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">Streitschlichtung:</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
                https://ec.europa.eu/consumers/odr/. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
