"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="avatar"
      aria-label="Alp Arsalan KI-Avatar"
      className="relative pt-6 sm:pt-10 pb-4 flex flex-col items-center justify-center select-none"
    >
      <h1 className="sr-only">YY-AI-Agent – Alp Arsalan KI-Verkaufsberater</h1>

      {/* Supabase-grüner Glow abgestimmt auf die Lichteffekte */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] md:w-[620px] h-[340px] sm:h-[520px] md:h-[580px] rounded-full bg-[radial-gradient(circle,rgba(62,207,142,0.22)_0%,rgba(16,185,129,0.10)_42%,transparent_72%)] blur-2xl -z-10"
      />

      {/* Zentraler Avatar-Bereich – Kopf wird vollständig ohne oberen Beschnitt dargestellt */}
      <div className="relative w-full max-w-[340px] sm:max-w-[460px] md:max-w-[520px] aspect-[460/400] flex items-center justify-center mx-auto px-2 pt-2">
        {/* HUD Crosshair-Markierungen in Supabase-Grün */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 sm:inset-x-10 top-1/2 -translate-y-1/2 flex justify-between opacity-60"
        >
          <span className="w-3 h-[1px] bg-[#3ECF8E]" />
          <span className="w-3 h-[1px] bg-[#3ECF8E]" />
        </div>

        {/* Goldener Alp Arsalan Avatar – unverändert beibehalten, vollständiger Kopf ohne Beschnitt */}
        <div className="relative w-full h-full z-10 flex items-center justify-center">
          <Image
            src="/arslan_hero.png"
            alt="Alp Arsalan – Digitaler KI-Verkaufsberater von YY-AI-Agent"
            fill
            priority
            sizes="(max-width: 640px) 340px, (max-width: 768px) 460px, 520px"
            className="object-contain drop-shadow-[0_20px_45px_rgba(62,207,142,0.25)]"
          />
        </div>

        {/* Status-Badge am Fuß des Avatars mit Supabase-Grün Akzent */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 z-20">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#06140e]/95 border border-[#3ECF8E]/55 shadow-[0_0_24px_rgba(62,207,142,0.30)] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#3ECF8E]" />
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-zinc-100 uppercase">
              BEREIT
            </span>
            <span className="w-2 h-2 rounded-full bg-[#3ECF8E] shadow-[0_0_8px_#3ECF8E] animate-pulse" />
          </div>
        </div>
      </div>

      {/* Akzentlinie unter dem Badge in Supabase-Grün */}
      <div
        aria-hidden="true"
        className="mt-4 w-44 sm:w-56 h-[2px] rounded-full bg-zinc-900 overflow-hidden relative"
      >
        <div className="w-12 h-full rounded-full bg-gradient-to-r from-[#3ECF8E] via-[#6ee7b7] to-[#10b981]" />
      </div>
    </section>
  );
}
