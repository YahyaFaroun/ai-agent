import Link from "next/link";

export default function LegalLinks() {
  return (
    <div
      aria-label="Rechtliche Hinweise"
      className="relative z-10 px-4 pt-6 pb-10 flex items-center justify-center gap-4 text-xs text-zinc-600"
    >
      <Link
        href="/impressum"
        className="hover:text-zinc-400 transition-colors"
      >
        Impressum
      </Link>
      <span aria-hidden="true" className="text-zinc-800">
        ·
      </span>
      <Link
        href="/datenschutz"
        className="hover:text-zinc-400 transition-colors"
      >
        Datenschutz
      </Link>
    </div>
  );
}
