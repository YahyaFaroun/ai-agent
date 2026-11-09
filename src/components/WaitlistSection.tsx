"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, ShieldCheck, CheckCircle2, AlertCircle } from "lucide-react";

interface WaitlistSectionProps {
  selectedPackage?: string;
  onPackageChange?: (pkg: string) => void;
}

export default function WaitlistSection({
  selectedPackage = "",
  onPackageChange,
}: WaitlistSectionProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [packageChoice, setPackageChoice] = useState(selectedPackage || "");
  const [description, setDescription] = useState("");
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Sync when prop changes
  if (selectedPackage && selectedPackage !== packageChoice && !submitted) {
    setPackageChoice(selectedPackage);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!name.trim()) {
      setErrorMessage("Bitte gib deinen Namen ein.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Bitte gib eine gültige E-Mail-Adresse ein.");
      return;
    }
    if (!consent) {
      setErrorMessage("Bitte stimme der Datenschutzerklärung zu, um fortzufahren.");
      return;
    }

    // In accordance with instructions:
    // "Keine Formulardaten ohne sichere Backend-Anbindung als erfolgreich gespeichert ausgeben."
    setSubmitted(true);
  };

  return (
    <section id="warteliste" className="py-24 relative overflow-hidden bg-zinc-950/60">
      {/* Background Section Accent */}
      <div className="absolute top-1/2 right-1/4 w-[600px] h-[350px] bg-[#ff6b2b]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-mono text-[#ff8c42]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b2b]"></span>
            <span>[ 05 // EXKLUSIVE VORMERKUNG ]</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Auf die <span className="text-metallic">Warteliste</span> setzen.
          </h2>

          <p className="text-base sm:text-lg text-zinc-400">
            Wir schalten Neuprojekte schrittweise frei, um eine reibungslose
            persönliche Betreuung und höchste Qualität bei der Einrichtung deines
            KI-Agenten zu sichern.
          </p>
        </div>

        {/* Waitlist Box */}
        <div className="hud-panel rounded-2xl p-6 sm:p-10 border border-zinc-700/80 shadow-2xl relative">
          {submitted ? (
            <div className="text-center py-10 space-y-5 animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 rounded-full bg-[#ff6b2b]/15 border border-[#ff6b2b]/50 text-[#ff8c42] flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(255,107,43,0.3)]">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold text-white">
                Vormerkung erfasst (Demo-Modus)
              </h3>

              <div className="max-w-lg mx-auto bg-zinc-900/90 border border-zinc-800 rounded-xl p-5 text-sm text-zinc-300 space-y-3 text-left">
                <div className="flex items-start gap-2.5 text-xs text-[#ff8c42] font-mono">
                  <ShieldCheck className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>TRANSPARENZ-HINWEIS:</span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  Deine Daten wurden im aktuellen Frontend-Demo-Modus temporär
                  lokal erfasst:
                </p>
                <div className="font-mono text-xs text-zinc-300 space-y-1 bg-black/40 p-3 rounded border border-zinc-800">
                  <div>Name: <span className="text-white">{name}</span></div>
                  <div>E-Mail: <span className="text-white">{email}</span></div>
                  {company && <div>Unternehmen: <span className="text-white">{company}</span></div>}
                  {packageChoice && <div>Paket: <span className="text-[#ff8c42]">{packageChoice}</span></div>}
                </div>
                <p className="text-xs text-zinc-400">
                  Die verschlüsselte Backend-Datenbankanbindung (z. B. CRM / Webhook)
                  wird mit dem finalen Produktions-Setup scharfgeschaltet. Es wurden
                  noch keine Drittanbieter-Dienste kontaktiert.
                </p>
              </div>

              <button
                onClick={() => setSubmitted(false)}
                className="metallic-button px-6 py-2.5 rounded-lg text-sm text-zinc-300 hover:text-white font-medium cursor-pointer"
              >
                Weitere Anfrage stellen
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="p-4 rounded-xl bg-red-950/40 border border-red-800/80 text-red-200 text-xs sm:text-sm flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="waitlist-name"
                    className="text-xs font-mono text-zinc-300 uppercase tracking-wider block"
                  >
                    Vollständiger Name <span className="text-[#ff6b2b]">*</span>
                  </label>
                  <input
                    id="waitlist-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="z. B. Alex Miller"
                    className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-[#ff6b2b]/60 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#ff6b2b]"
                  />
                </div>

                {/* E-Mail */}
                <div className="space-y-2">
                  <label
                    htmlFor="waitlist-email"
                    className="text-xs font-mono text-zinc-300 uppercase tracking-wider block"
                  >
                    Geschäftliche E-Mail <span className="text-[#ff6b2b]">*</span>
                  </label>
                  <input
                    id="waitlist-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@unternehmen.de"
                    className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-[#ff6b2b]/60 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#ff6b2b]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Unternehmen */}
                <div className="space-y-2">
                  <label
                    htmlFor="waitlist-company"
                    className="text-xs font-mono text-zinc-300 uppercase tracking-wider block"
                  >
                    Unternehmen <span className="text-zinc-500">(optional)</span>
                  </label>
                  <input
                    id="waitlist-company"
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="z. B. Miller Solutions GmbH"
                    className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-[#ff6b2b]/60 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#ff6b2b]"
                  />
                </div>

                {/* Gewünschtes Paket */}
                <div className="space-y-2">
                  <label
                    htmlFor="waitlist-package"
                    className="text-xs font-mono text-zinc-300 uppercase tracking-wider block"
                  >
                    Gewünschtes Paket <span className="text-zinc-500">(optional)</span>
                  </label>
                  <select
                    id="waitlist-package"
                    value={packageChoice}
                    onChange={(e) => {
                      setPackageChoice(e.target.value);
                      if (onPackageChange) onPackageChange(e.target.value);
                    }}
                    className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-[#ff6b2b]/60 rounded-xl px-4 py-3 text-sm text-zinc-200 focus:outline-none focus:ring-1 focus:ring-[#ff6b2b]"
                  >
                    <option value="">Bitte auswählen...</option>
                    <option value="STARTER">Starter (ab 1.000 €)</option>
                    <option value="BUSINESS">Business (ab 2.000 €) – Empfohlen</option>
                    <option value="ENTERPRISE">Enterprise (ab 5.000 €)</option>
                    <option value="BERATUNG">Noch unentschlossen / Individuelle Beratung</option>
                  </select>
                </div>
              </div>

              {/* Kurze Beschreibung des Bedarfs */}
              <div className="space-y-2">
                <label
                  htmlFor="waitlist-desc"
                  className="text-xs font-mono text-zinc-300 uppercase tracking-wider block"
                >
                  Kurze Beschreibung deines Bedarfs{" "}
                  <span className="text-zinc-500">(optional)</span>
                </label>
                <textarea
                  id="waitlist-desc"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Welche Aufgaben oder Kanäle möchtest du mit deinem KI-Mitarbeiter automatisieren?"
                  className="w-full bg-zinc-900/90 border border-zinc-800 focus:border-[#ff6b2b]/60 rounded-xl p-4 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-[#ff6b2b] resize-none"
                />
              </div>

              {/* DSGVO Einwilligung */}
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-[#ff6b2b] focus:ring-[#ff6b2b] focus:ring-offset-zinc-950 cursor-pointer"
                  />
                  <span className="text-xs text-zinc-400 leading-relaxed">
                    Ich stimme zu, dass meine Angaben zur Kontaktaufnahme und
                    Vormerkung verarbeitet werden. Weitere Informationen findest du
                    in unserer{" "}
                    <Link
                      href="/datenschutz"
                      className="text-zinc-200 hover:text-[#ff8c42] underline underline-offset-2"
                    >
                      Datenschutzerklärung
                    </Link>
                    .
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="ember-button w-full py-4 rounded-xl font-bold text-white text-base tracking-wide flex items-center justify-center gap-2 shadow-lg shadow-[#ff6b2b]/25 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-200" />
                  <span>Jetzt unverbindlich vormerken</span>
                </button>
              </div>

              {/* Status Note */}
              <p className="text-[11px] font-mono text-zinc-500 text-center">
                KEINE SPAM-GARANTIE // DS-GVO KONFORM // KEINE VERTRAGSBINDUNG
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
