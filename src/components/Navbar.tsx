"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, Cpu, Sparkles } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Vorteile", href: "#vorteile" },
    { name: "Ablauf", href: "#ablauf" },
    { name: "Pakete", href: "#pakete" },
    { name: "Arslan Chat", href: "#berater" },
    { name: "FAQ", href: "#faq" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#060709]/85 backdrop-blur-xl border-b border-zinc-800/80 shadow-2xl shadow-black/80 py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-lg overflow-hidden border border-zinc-700/80 bg-zinc-900/90 p-0.5 flex items-center justify-center shadow-lg group-hover:border-[#ff6b2b]/60 transition-colors">
              <Image
                src="/arslan_avatar_round.png"
                alt="Arslan AI Avatar"
                width={38}
                height={38}
                className="object-cover rounded-md group-hover:scale-105 transition-transform"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#ff6b2b] border border-black shadow-[0_0_8px_#ff6b2b]"></span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-extrabold tracking-wider text-lg text-white font-mono">
                  ARSLAN<span className="text-[#ff6b2b]">.AI</span>
                </span>
                <span className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono uppercase tracking-widest text-[#ff8c42] bg-[#ff6b2b]/10 border border-[#ff6b2b]/30 rounded">
                  2050 HUD
                </span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400 tracking-wider flex items-center gap-1.5">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                AGENT KERNEL ONLINE
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-zinc-900/60 border border-zinc-800/80 backdrop-blur-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs lg:text-sm font-medium text-zinc-300 hover:text-white px-3 py-1.5 rounded-md hover:bg-zinc-800/50 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="#warteliste"
              className="ember-button text-xs lg:text-sm font-semibold text-white px-4 py-2 rounded-lg flex items-center gap-2 tracking-wide cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>Auf die Warteliste</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <a
              href="#warteliste"
              className="ember-button text-xs font-semibold text-white px-3 py-1.5 rounded-md"
            >
              Warteliste
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-zinc-900/80 border border-zinc-800 text-zinc-300 hover:text-white focus:outline-none"
              aria-label="Menü öffnen"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0c10]/95 border-b border-zinc-800 backdrop-blur-2xl px-4 pt-3 pb-6 mt-3 animate-in fade-in slide-in-from-top-4">
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-zinc-300 hover:text-white py-2 px-3 rounded-lg hover:bg-zinc-800/60 transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-zinc-600 font-mono text-xs">→</span>
              </a>
            ))}
            <div className="pt-3 border-t border-zinc-800 mt-2">
              <a
                href="#warteliste"
                onClick={() => setMobileMenuOpen(false)}
                className="ember-button w-full text-center text-sm font-semibold text-white py-2.5 rounded-lg flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>Jetzt unverbindlich vormerken</span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
