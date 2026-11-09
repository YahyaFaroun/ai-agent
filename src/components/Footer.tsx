import Link from "next/link";
import Image from "next/image";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-[#050608] py-14 text-zinc-400 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-900">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg overflow-hidden border border-zinc-800 bg-zinc-900 p-0.5 flex items-center justify-center">
                <Image
                  src="/arslan_avatar_round.png"
                  alt="Arslan AI"
                  width={34}
                  height={34}
                  className="object-cover rounded-md"
                />
              </div>
              <span className="font-mono font-extrabold tracking-wider text-xl text-white">
                ARSLAN<span className="text-[#ff6b2b]">.AI</span>
              </span>
            </Link>

            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              Moderne KI-Agenten für anspruchsvolle Unternehmen. Maßgeschneiderte
              Automatisierung von Kundenanfragen, Terminen und Büroprozessen.
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
              <span>SYSTEMSTATUS: ALLE SYSTEME BEREIT</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-mono tracking-widest text-zinc-300 uppercase block font-semibold">
              Navigation
            </span>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#vorteile" className="hover:text-white transition-colors">
                  Vorteile
                </a>
              </li>
              <li>
                <a href="#ablauf" className="hover:text-white transition-colors">
                  So funktioniert es
                </a>
              </li>
              <li>
                <a href="#pakete" className="hover:text-white transition-colors">
                  KI-Pakete &amp; Preise
                </a>
              </li>
              <li>
                <a href="#berater" className="hover:text-white transition-colors">
                  Arslan Chat Demo
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#warteliste" className="hover:text-[#ff8c42] transition-colors">
                  Warteliste
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-mono tracking-widest text-zinc-300 uppercase block font-semibold">
              Rechtliches &amp; Datenschutz
            </span>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/impressum"
                  className="hover:text-white transition-colors"
                >
                  Impressum (Anbieterkennzeichnung)
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="hover:text-white transition-colors"
                >
                  Datenschutzerklärung (DSGVO)
                </Link>
              </li>
            </ul>
            <div className="pt-2 text-xs font-mono text-zinc-400">
              HOSTING: DSGVO-KONFORM // ENCRYPTED TRANSIT (TLS 1.3)
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
          <div>
            &copy; 2026 Arslan AI. Alle Rechte vorbehalten.
          </div>

          <a
            href="#"
            className="flex items-center gap-1.5 hover:text-white transition-colors py-1 px-2.5 rounded bg-zinc-900 border border-zinc-800"
          >
            <span>Nach oben</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
