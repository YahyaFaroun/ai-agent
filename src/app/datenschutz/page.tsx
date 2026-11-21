import Link from "next/link";
import { ArrowLeft, Lock } from "lucide-react";
import LegalLinks from "@/components/LegalLinks";

export const metadata = {
  title: "Datenschutzerklärung – DigitaleLeads",
  description: "Datenschutzerklärung gemäß DSGVO.",
};

export default function DatenschutzPage() {
  return (
    <div className="min-h-screen bg-[#060709] text-zinc-300 flex flex-col font-mono selection:bg-[#3ECF8E] selection:text-black">
      <main className="flex-1 pt-12 pb-12 px-4 sm:px-6 max-w-3xl mx-auto w-full">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-[#3ECF8E] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Zurück</span>
        </Link>

        <div className="hud-panel rounded-2xl p-6 sm:p-10 border border-zinc-800 space-y-7">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-[#3ECF8E] mb-3">
              <Lock className="w-3.5 h-3.5" />
              <span>{"//"} DATENSCHUTZINFORMATION DSGVO</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Datenschutzerklärung
            </h1>
          </div>

          <div className="space-y-6 text-sm leading-relaxed text-zinc-300">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">1. Verantwortliche Stelle</h2>
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 font-mono text-[14px] text-zinc-200 space-y-1">
                <p className="font-semibold text-white">DigitaleLeads</p>
                <p>Yahya Faroun</p>
                <p>Robert-Hansen-Straße 38</p>
                <p>40593 Düsseldorf</p>
                <p>
                  E-Mail:{" "}
                  <a
                    href="mailto:yy.faroun.ai@gmail.com"
                    className="text-[#3ECF8E] hover:underline"
                  >
                    yy.faroun.ai@gmail.com
                  </a>
                </p>
              </div>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">2. Technischer Seitenaufruf</h2>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Beim Aufruf dieser Website verarbeitet der Hosting-Anbieter technisch erforderliche Verbindungsdaten (z. B. IP-Adresse, Zeitpunkt des Zugriffs, aufgerufene Seite sowie Browserinformationen), um die Auslieferung und Betriebssicherheit der Website zu gewährleisten.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">3. Wartelisten- und Kontaktformular</h2>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Wenn du dich über unser Formular für die Warteliste anmeldest, werden deine eingegebenen Kontaktdaten (Name, E-Mail-Adresse, Telefonnummer), die gewünschten Aufgaben, Schnittstellen und deine gewählte Paketpräferenz zur Bearbeitung deiner Anfrage und zur persönlichen Kontaktaufnahme gespeichert. Rechtsgrundlage ist Art. 6 Abs. 1 lit. a und b DSGVO.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">4. Interaktiver KI-Chatberater</h2>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Die im interaktiven Beratungsfenster eingegebenen Fragen werden zur Erzeugung automatisierter Lösungsvorschläge serverseitig verarbeitet. Gib in das Chatfenster keine vertraulichen Passwörter oder Zahlungsdaten ein.
              </p>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">5. Deine Rechte</h2>
              <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Du hast nach der DSGVO das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung deiner personenbezogenen Daten sowie das Recht, eine erteilte Einwilligung jederzeit mit Wirkung für die Zukunft zu widerrufen.
              </p>
            </section>
          </div>
        </div>
      </main>

      <LegalLinks />
    </div>
  );
}
