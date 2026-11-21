import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";
import LegalLinks from "@/components/LegalLinks";

export const metadata = {
  title: "Impressum – DigitaleLeads",
  description: "Anbieterkennzeichnung gemäß § 5 TMG.",
};

export default function ImpressumPage() {
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
              <Shield className="w-3.5 h-3.5" />
              <span>{"//"} RECHTLICHE ANGABEN § 5 TMG</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Impressum
            </h1>
          </div>

          <div className="space-y-6 text-sm leading-relaxed">
            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">Angaben gemäß § 5 TMG</h2>
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 font-mono text-[14px] text-zinc-200 space-y-1">
                <p className="font-semibold text-white">DigitaleLeads</p>
                <p>Yahya Faroun</p>
                <p>Robert-Hansen-Straße 38</p>
                <p>40593 Düsseldorf</p>
              </div>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">Kontakt</h2>
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 font-mono text-[14px] text-zinc-200 space-y-1">
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
              <h2 className="text-base font-bold text-white">Umsatzsteuer-ID</h2>
              <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 font-mono text-[14px] text-zinc-200 space-y-1">
                <p>Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:</p>
                <p className="font-semibold text-white">DE356418496</p>
              </div>
            </section>

            <section className="space-y-2">
              <h2 className="text-base font-bold text-white">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
              <p className="text-xs text-zinc-400">
                Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>
          </div>
        </div>
      </main>

      <LegalLinks />
    </div>
  );
}
