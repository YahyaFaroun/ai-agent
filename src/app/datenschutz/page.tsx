import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Datenschutzerklärung – Arslan AI",
  description: "Datenschutzerklärung von Arslan AI gemäß Art. 13 DSGVO.",
};

export default function DatenschutzPage() {
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
              <Lock className="w-3.5 h-3.5" />
              <span>DSGVO-COMPLIANCE // DATENSCHUTZ</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Datenschutzerklärung
            </h1>
          </div>

          <div className="space-y-6 text-sm sm:text-base leading-relaxed text-zinc-300">
            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">1. Verantwortliche Stelle</h2>
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 font-mono text-xs sm:text-sm text-zinc-300 space-y-1">
                <p>[Unternehmen / Agenturname]</p>
                <p>[Vorname Nachname]</p>
                <p>[Musterstraße 12, 12345 Musterstadt]</p>
                <p>E-Mail: [datenschutz@arslan-ai.de]</p>
              </div>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">2. Erhebung und Speicherung personenbezogener Daten</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Beim Aufrufen unserer Website werden durch den auf deinem Endgerät zum Einsatz kommenden Browser automatisch Informationen an den Server unserer Website gesendet. Diese Informationen werden temporär in einem sogenannten Logfile gespeichert.
              </p>
              <ul className="list-disc pl-5 text-sm text-zinc-400 space-y-1">
                <li>IP-Adresse des anfragenden Rechners</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Name und URL der abgerufenen Datei</li>
                <li>Website, von der aus der Zugriff erfolgt (Referrer-URL)</li>
                <li>Verwendeter Browser und ggf. das Betriebssystem deines Rechners</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">3. Wartelisten- und Kontaktformular</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Wenn du dich auf unserer Warteliste eintragen möchtest, erheben wir deinen Namen, deine geschäftliche E-Mail-Adresse sowie optional dein Unternehmen, dein gewünschtes Paket und eine Bedarfsbeschreibung. Die Datenverarbeitung zum Zwecke der Kontaktaufnahme erfolgt nach Art. 6 Abs. 1 S. 1 lit. a DSGVO auf Grundlage deiner freiwillig erteilten Einwilligung.
              </p>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Im Rahmen der aktuellen Website-Vorschau werden Formulardaten nur lokal im Frontend zu Testzwecken erfasst. Eine dauerhafte Speicherung oder Weitergabe an Dritte erfolgt erst nach ausdrücklicher Anbindung und Inkrafttreten der entsprechenden Vereinbarungen.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">4. Keine Weitergabe an Dritte &amp; KI-Modelle</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Deine Daten werden ohne deine ausdrückliche Zustimmung nicht an Dritte weitergegeben. Wichtig: Kundendaten werden unter keinen Umständen für das Training öffentlicher KI-Modelle verwendet.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-lg font-bold text-white">5. Deine Rechte (Auskunft, Berichtigung, Löschung)</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">
                Du hast nach der DSGVO jederzeit das Recht auf Auskunft über deine gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten. Wende dich hierzu jederzeit an die oben angegebene Kontaktadresse.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
