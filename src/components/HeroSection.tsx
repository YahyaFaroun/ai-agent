"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="avatar"
      aria-label="Alp Arsalan KI-Avatar"
      className="relative pt-6 sm:pt-10 pb-2 flex flex-col items-center justify-center select-none"
    >
      <h1 className="sr-only">YY-AI-Agent – Alp Arsalan KI-Verkaufsberater</h1>

      {/* Warmer gold-bersteinfarbener Glow abgestimmt auf den goldenen Avatar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] md:w-[620px] h-[340px] sm:h-[520px] md:h-[580px] rounded-full bg-[radial-gradient(circle,rgba(230,138,34,0.24)_0%,rgba(160,75,15,0.12)_42%,transparent_72%)] blur-2xl -z-10"
      />

      {/* Zentraler Avatar-Bereich – Kopf wird vollständig ohne oberen Beschnitt dargestellt */}
      <div className="relative w-full max-w-[340px] sm:max-w-[460px] md:max-w-[520px] aspect-[460/400] flex items-center justify-center mx-auto px-2 pt-2">
        {/* HUD Crosshair-Markierungen */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 sm:inset-x-10 top-1/2 -translate-y-1/2 flex justify-between opacity-50"
        >
          <span className="w-2.5 h-[1px] bg-[#ff8c42]" />
          <span className="w-2.5 h-[1px] bg-[#ff8c42]" />
        </div>

        {/* Goldener Alp Arsalan Avatar – vollständiger Kopf ohne Beschnitt */}
        <div className="relative w-full h-full z-10 flex items-center justify-center">
          <Image
            src="/arslan_hero.png"
            alt="Alp Arsalan – Digitaler KI-Verkaufsberater von YY-AI-Agent"
            fill
            priority
            sizes="(max-width: 640px) 340px, (max-width: 768px) 460px, 520px"
            className="object-contain drop-shadow-[0_20px_45px_rgba(230,138,34,0.28)]"
          />
        </div>

        {/* Status-Badge am Fuß des Avatars */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 z-20">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#120b08]/90 border border-[#ff8c42]/45 shadow-[0_0_24px_rgba(240,140,30,0.25)] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#ffb07a]" />
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-zinc-100 uppercase">
              BEREIT
            </span>
            <span className="w-2 h-2 rounded-full bg-[#ff8c42] shadow-[0_0_8px_#ff8c42] animate-pulse" />
          </div>
        </div>
      </div>

      {/* Akzentlinie unter dem Badge */}
      <div
        aria-hidden="true"
        className="mt-4 w-44 sm:w-56 h-[2px] rounded-full bg-zinc-900 overflow-hidden relative"
      >
        <div className="w-10 h-full rounded-full bg-gradient-to-r from-[#ff8c42] via-[#ffb07a] to-[#ff6b2b]" />
      </div>

      {/* Positionierung & Website-Texte */}
      <div className="mt-8 sm:mt-10 text-center max-w-3xl mx-auto px-4 space-y-4">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
          Deine eigene KI. <br className="hidden sm:inline" />
          <span className="text-metallic">Für dein Leben.</span>{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff8c42] via-[#ffb07a] to-[#ff6b2b]">
            Für dein Business.
          </span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl mx-auto">
          Ob persönlicher KI-Assistent, autonomer KI-Mitarbeiter oder intelligente Unternehmenslösung – wir entwickeln deine KI passend zu deinen Aufgaben, Zielen und Arbeitsabläufen.
        </p>

        {/* Zentrale Verkaufsargumente */}
        <div className="pt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-left">
          <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800/80 shadow-sm">
            <span className="text-xs font-bold text-zinc-100 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff8c42]" />
              Persönliches Gedächtnis
            </span>
            <span className="text-xs text-zinc-400 block mt-1 leading-snug">
              Eine KI, die dich und deine Projekte kennt.
            </span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800/80 shadow-sm">
            <span className="text-xs font-bold text-zinc-100 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff8c42]" />
              Automatisierung
            </span>
            <span className="text-xs text-zinc-400 block mt-1 leading-snug">
              Weniger Routinearbeit, mehr Zeit fürs Wesentliche.
            </span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800/80 shadow-sm">
            <span className="text-xs font-bold text-zinc-100 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff8c42]" />
              Vernetzte Systeme
            </span>
            <span className="text-xs text-zinc-400 block mt-1 leading-snug">
              Deine Werkzeuge und Programme arbeiten zusammen.
            </span>
          </div>

          <div className="p-3 rounded-xl bg-zinc-900/70 border border-zinc-800/80 shadow-sm">
            <span className="text-xs font-bold text-zinc-100 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff8c42]" />
              Individuelle Lösungen
            </span>
            <span className="text-xs text-zinc-400 block mt-1 leading-snug">
              Exakt angepasst an deine spezifischen Anforderungen.
            </span>
          </div>
        </div>

        {/* Anwendungsbereiche */}
        <div className="pt-2 flex flex-wrap items-center justify-center gap-1.5 text-xs">
          <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 mr-1">
            Anwendungsbereiche:
          </span>
          {[
            "Büro & Organisation",
            "Recherche & Marktanalysen",
            "Marketing & Content",
            "Projektmanagement",
            "Softwareentwicklung",
            "Prozessautomatisierung",
          ].map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-0.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-zinc-300 font-mono text-[11px]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
