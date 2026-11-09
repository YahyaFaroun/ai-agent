import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Arslan AI – Dein eigener KI-Mitarbeiter. Rund um die Uhr.",
  description:
    "Automatisiere Kundenanfragen, Termine und wiederkehrende Büroaufgaben mit einem KI-Agenten, der maßgeschneidert auf dein Unternehmen trainiert ist.",
  keywords: [
    "KI-Agentur",
    "KI Mitarbeiter",
    "Arslan AI",
    "Automatisierung",
    "Kundenservice KI",
    "Büroautomatisierung",
    "Business KI",
  ],
  authors: [{ name: "Arslan AI" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#060709",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="de"
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth antialiased dark`}
    >
      <body className="min-h-screen bg-[#060709] text-zinc-100 flex flex-col font-sans selection:bg-[#ff6b2b] selection:text-white">
        {children}
      </body>
    </html>
  );
}
