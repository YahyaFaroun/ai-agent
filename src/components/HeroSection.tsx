"use client";

import Image from "next/image";
import { Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      aria-label="Arslan KI-Avatar"
      className="relative pt-8 sm:pt-12 pb-4 flex flex-col items-center justify-center overflow-hidden select-none"
    >
      <h1 className="sr-only">YY-AI-Agent – Persönlicher KI-Agent</h1>
      {/* Subtle Ambient Ember Backlight matching Saifullah-2050 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[520px] md:w-[620px] h-[340px] sm:h-[520px] md:h-[580px] rounded-full bg-[radial-gradient(circle,rgba(195,58,18,0.26)_0%,rgba(110,24,10,0.14)_42%,transparent_72%)] blur-2xl -z-10"
      />

      {/* Central Avatar Stage */}
      <div className="relative w-full max-w-[340px] sm:max-w-[460px] md:max-w-[520px] aspect-[460/400] flex items-center justify-center mx-auto px-2">
        {/* Fine Concentric HUD Rings */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute w-[78%] aspect-square rounded-full border border-dashed border-[#ff6b2b]/20 animate-spin-slow"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute w-[62%] aspect-square rounded-full border border-zinc-700/25 animate-spin-slow-reverse"
        />

        {/* Subtle HUD Crosshair Ticks */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 sm:inset-x-10 top-1/2 -translate-y-1/2 flex justify-between opacity-40"
        >
          <span className="w-2.5 h-[1px] bg-[#ff6b2b]" />
          <span className="w-2.5 h-[1px] bg-[#ff6b2b]" />
        </div>

        {/* Central Brushed-Zinc Avatar */}
        <div className="relative w-full h-full z-10">
          <Image
            src="/arslan_hero.png"
            alt="Arslan – Zentraler KI-Avatar aus gebürstetem Zink"
            fill
            priority
            sizes="(max-width: 640px) 340px, (max-width: 768px) 460px, 520px"
            className="object-contain drop-shadow-[0_18px_42px_rgba(255,94,26,0.22)]"
          />
        </div>

        {/* Bottom HUD Status Pill like Saifullah-2050 */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 z-20">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#120b08]/90 border border-[#ff6b2b]/40 shadow-[0_0_24px_rgba(255,107,43,0.22)] backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-[#ff8c42]" />
            <span className="font-mono text-xs font-semibold tracking-[0.2em] text-zinc-100 uppercase">
              BEREIT
            </span>
            <span className="w-2 h-2 rounded-full bg-[#ff6b2b] shadow-[0_0_8px_#ff6b2b] animate-pulse" />
          </div>
        </div>
      </div>

      {/* Subtle glowing progress accent line under BEREIT pill */}
      <div
        aria-hidden="true"
        className="mt-4 w-44 sm:w-56 h-[2px] rounded-full bg-zinc-900 overflow-hidden relative"
      >
        <div className="w-8 h-full rounded-full bg-gradient-to-r from-[#ff6b2b] to-[#ffb07a]" />
      </div>
    </section>
  );
}
