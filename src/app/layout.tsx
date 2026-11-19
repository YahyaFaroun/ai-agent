import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "YY-AI-Agent – Dein eigener KI-Mitarbeiter. Rund um die Uhr.",
  description:
    "Automatisiere Kundenanfragen, Termine und wiederkehrende Büroaufgaben mit einem KI-Agenten, der maßgeschneidert auf dein Unternehmen trainiert ist.",
  keywords: [
    "YY-AI-Agent",
    "KI-Agentur",
    "KI Mitarbeiter",
    "Automatisierung",
    "Kundenservice KI",
    "Büroautomatisierung",
    "Business KI",
  ],
  authors: [{ name: "YY-AI-Agent" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080808",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${jetbrainsMono.variable} scroll-smooth antialiased dark`}
    >
      <body className="min-h-screen bg-[#060709] text-zinc-100 flex flex-col font-mono selection:bg-[#3ECF8E] selection:text-black">
        {children}
      </body>
    </html>
  );
}
