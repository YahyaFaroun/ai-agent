"use client";

import Image from "next/image";
import { ArrowRight, Sparkles, ShieldCheck, Zap, Activity } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-[92vh] pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center justify-center overflow-hidden">
      {/* Background Radial Glow: Warm Ember & Deep Obsidian */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] lg:w-[1000px] h-[550px] bg-gradient-to-b from-[#e04e0a]/20 via-[#451206]/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Decorative Grid Lines / Coordinates */}
      <div className="absolute inset-0 pointer-events-none opacity-20 -z-10 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]">
        <div className="absolute top-1/3 left-10 text-[10px] font-mono text-zinc-600 tracking-widest hidden xl:block">
          LAT: 52.5200° N // LNG: 13.4050° E<br />
          NODE: DE-CENTRAL-01<br />
          ZINC-ARCHITECTURE // V2.8
        </div>
        <div className="absolute top-1/3 right-10 text-[10px] font-mono text-zinc-600 tracking-widest text-right hidden xl:block">
          STATUS: OPERATIONAL<br />
          UPTIME: 99.98%<br />
          RESPONSE: &lt; 350MS
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        {/* Top Reference-Style HUD Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 max-w-4xl mx-auto mb-8 px-4 py-2 rounded-xl bg-zinc-950/60 border border-zinc-800/80 backdrop-blur-md text-xs font-mono text-zinc-400 shadow-xl">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#ff6b2b] animate-ping" />
            <span className="text-zinc-200 font-semibold tracking-wider">
              ARSLAN • AVATAR 2050
            </span>
            <span className="text-zinc-600 hidden sm:inline">|</span>
            <span className="text-zinc-500 hidden sm:inline">ZINC-V2 DE/EN</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Mode Selector Pill inspired by reference */}
            <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-full p-0.5 text-[11px]">
              <span className="px-2.5 py-0.5 rounded-full bg-[#ff6b2b]/20 border border-[#ff6b2b]/50 text-[#ff8c42] font-semibold flex items-center gap-1.5 shadow-[0_0_10px_rgba(255,107,43,0.3)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b2b]"></span>
                Ember
              </span>
              <span className="px-2 py-0.5 text-zinc-500">Cyber</span>
              <span className="px-2 py-0.5 text-zinc-500 hidden sm:inline">Royal</span>
            </div>

            {/* Simulated Audio Spectrum */}
            <div className="hidden md:flex items-center gap-1 pl-2 border-l border-zinc-800 h-4">
              <span className="w-1 bg-[#ff6b2b] h-3 animate-pulse rounded-full" />
              <span className="w-1 bg-amber-400 h-4 animate-pulse delay-75 rounded-full" />
              <span className="w-1 bg-zinc-500 h-2 animate-pulse delay-150 rounded-full" />
              <span className="w-1 bg-[#ff6b2b] h-3.5 animate-pulse delay-100 rounded-full" />
              <span className="text-[10px] text-zinc-400 ml-1">1.20×</span>
            </div>
          </div>
        </div>

        {/* Central Layout: Avatar & Conversion Messaging */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Headlines & Actionable Pitch */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-zinc-800/80 text-xs font-mono text-zinc-300 shadow-md">
              <span className="w-2 h-2 rounded-full bg-[#ff6b2b]"></span>
              <span className="tracking-wide">AUTONOME BÜRO- &amp; KUNDENPROZESSE</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Dein eigener{" "}
              <span className="text-metallic block sm:inline">KI-Mitarbeiter.</span>{" "}
              <span className="text-ember-gradient block sm:inline">
                Rund um die Uhr.
              </span>
            </h1>

            <p className="text-base sm:text-lg lg:text-xl text-zinc-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Automatisiere Kundenanfragen, Termine und wiederkehrende
              Büroaufgaben mit einem KI-Agenten, der auf dein Unternehmen
              zugeschnitten ist.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#pakete"
                className="ember-button w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-white tracking-wide flex items-center justify-center gap-3 text-base shadow-lg shadow-[#ff6b2b]/20 group cursor-pointer"
              >
                <span>KI-Agenten entdecken</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#warteliste"
                className="metallic-button w-full sm:w-auto px-7 py-3.5 rounded-xl font-semibold text-zinc-200 hover:text-white tracking-wide flex items-center justify-center gap-2 text-base cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-[#ff8c42]" />
                <span>Auf die Warteliste</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 border-t border-zinc-800/60 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1.5 text-zinc-200 font-bold text-lg font-mono">
                  <Zap className="w-4 h-4 text-[#ff6b2b]" />
                  <span>&lt; 5 Sek.</span>
                </div>
                <span className="text-xs text-zinc-400">Reaktionszeit</span>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1.5 text-zinc-200 font-bold text-lg font-mono">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>24 / 7</span>
                </div>
                <span className="text-xs text-zinc-400">Dauereinsatz</span>
              </div>

              <div className="flex flex-col items-center lg:items-start">
                <div className="flex items-center gap-1.5 text-zinc-200 font-bold text-lg font-mono">
                  <ShieldCheck className="w-4 h-4 text-zinc-300" />
                  <span>100%</span>
                </div>
                <span className="text-xs text-zinc-400">DSGVO-konform</span>
              </div>
            </div>
          </div>

          {/* Right Column: Prominent Arslan Metallic Avatar with HUD Reticles */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Animated HUD Rings Behind Avatar */}
            <div className="relative w-[320px] sm:w-[400px] lg:w-[440px] aspect-[4/5] flex items-center justify-center">
              {/* Outer HUD Reticle Circle */}
              <div className="absolute inset-4 rounded-full border border-dashed border-[#ff6b2b]/30 animate-spin-slow pointer-events-none" />

              {/* Inner HUD Tech Circle */}
              <div className="absolute inset-12 rounded-full border border-zinc-700/50 animate-spin-slow-reverse pointer-events-none" />

              {/* Corner HUD Markers */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#ff6b2b]/80" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#ff6b2b]/80" />
              <div className="absolute bottom-6 left-2 w-4 h-4 border-b-2 border-l-2 border-[#ff6b2b]/80" />
              <div className="absolute bottom-6 right-2 w-4 h-4 border-b-2 border-r-2 border-[#ff6b2b]/80" />

              {/* Central Metallic Zinc Avatar */}
              <div className="relative w-full h-full flex items-center justify-center z-10 transition-transform duration-700 hover:scale-[1.02]">
                <div className="relative w-full h-full">
                  <Image
                    src="/arslan_hero.png"
                    alt="Arslan – Dein digitaler KI-Mitarbeiter aus gebürstetem Zink"
                    fill
                    priority
                    sizes="(max-width: 768px) 320px, (max-width: 1200px) 400px, 440px"
                    className="object-contain filter drop-shadow-[0_15px_35px_rgba(255,107,43,0.35)]"
                  />
                </div>
              </div>

              {/* Bottom HUD Badge: ✨ BEREIT • KERN AKTIV */}
              <div className="absolute -bottom-2 z-20">
                <div className="px-4 py-1.5 rounded-full bg-zinc-950/90 border border-[#ff6b2b]/60 text-xs font-mono font-medium text-white shadow-[0_0_20px_rgba(255,107,43,0.4)] flex items-center gap-2 backdrop-blur-xl">
                  <span className="text-[#ff8c42]">✨</span>
                  <span className="tracking-wider uppercase font-semibold">
                    BEREIT
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#ff6b2b] animate-ping" />
                </div>
              </div>
            </div>

            <p className="text-[11px] font-mono text-zinc-500 mt-4 tracking-wider text-center">
              ARSLAN KERNEL // GEBÜRSTETES ZINK-CHASSIS // 2050 EDITION
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
