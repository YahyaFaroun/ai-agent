/**
 * Zentrale Wissensbasis für Arslan AI
 * 
 * ARCHITEKTUR-HINWEIS:
 * Dieses Modul ist vollständig entkoppelt und kann identisch für:
 * 1. Web-Chat (yy-ai-agent.vercel.app)
 * 2. Zukünftigen Telegram-Bot
 * 3. Zukünftigen Sprachchat / Voice-Agenten (YY Voice Studio)
 * wiederverwendet werden.
 */

export interface PricingPackage {
  name: string;
  priceFrom: string;
  description: string;
  highlights: string[];
  targetAudience: string;
}

export const ARSLAN_PACKAGES: PricingPackage[] = [
  {
    name: "Starter",
    priceFrom: "ab 1.000 €",
    description: "Der ideale Einstieg in die automatisierte Kundenkommunikation.",
    highlights: [
      "1 spezialisierter KI-Agent",
      "Basis-Integration (z. B. E-Mail oder Website)",
      "Standardisierte Antwort- und Routing-Workflows",
      "Schlüsselfertige Einrichtung & Einweisung",
    ],
    targetAudience: "Solopreneure, Praxen, Kanzleien und kleinere Dienstleister.",
  },
  {
    name: "Business",
    priceFrom: "ab 2.000 €",
    description: "Multikanal-Automatisierung für wachsende Teams und Unternehmen.",
    highlights: [
      "Bis zu 3 vernetzte KI-Agenten",
      "Multikanal-Anbindung (CRM, Google Kalender, WhatsApp, Microsoft 365)",
      "Automatisierte Lead-Erfassung & Terminbuchung",
      "Priorisierter Support & Feinabstimmung",
    ],
    targetAudience: "Mittelständische Unternehmen, Agenturen und E-Commerce.",
  },
  {
    name: "Enterprise",
    priceFrom: "ab 5.000 €",
    description: "Individuelle Multi-Agenten-Architektur für komplexe Prozesslandschaften.",
    highlights: [
      "Maßgeschneiderte Agenten-Flotte",
      "Tiefe Backend- & Datenbankintegration (ERP, eigene APIs, Shopify)",
      "Höchste Datenschutz- & SLA-Standards",
      "Kontinuierliche Optimierung & persönlicher Ansprechpartner",
    ],
    targetAudience: "Unternehmen mit individuellen Schnittstellen und hohem Anfragevolumen.",
  },
];

export const ARSLAN_FAQS = [
  {
    topic: "KI-Agenten vs. Chatbots",
    answer: "Ein KI-Agent beantwortet nicht nur starre Fragen, sondern führt eigenständig Aufgaben aus: Er liest Daten, trägt Termine ein und übergibt strukturierte Leads an bestehende Systeme.",
  },
  {
    topic: "Einsatzmöglichkeiten",
    answer: "Typische Bereiche sind automatisierter Kundensupport, Bearbeitung von E-Mail-Anfragen, Terminorganisation, Lead-Qualifizierung und wiederkehrende Dokumentenprozesse.",
  },
  {
    topic: "Integrationen",
    answer: "Wir binden Systeme wie E-Mail, Google Kalender, Microsoft 365, CRM-Systeme, WhatsApp, Telegram, Shopify und eigene Datenbanken nahtlos an.",
  },
  {
    topic: "Laufende Kosten",
    answer: "Neben der einmaligen Einrichtung fallen lediglich die tatsächlichen Modell-Token und das Hosting an – transparent, ohne versteckte Abofallen.",
  },
  {
    topic: "Einrichtung",
    answer: "In 3 Schritten: 1. Bedarfsanalyse über unser 4-stufiges Formular. 2. Technische Konfiguration und Integration. 3. Testlauf, Freigabe und Go-Live.",
  },
  {
    topic: "Datenschutz",
    answer: "DSGVO-konform. Deine Daten und Kundenkommunikation werden nicht für das öffentliche Modelltraining verwendet. Alle Schnittstellen sind verschlüsselt.",
  },
];

/**
 * Kompakter, token-optimierter System-Prompt für Arslan
 * Entwickelt für minimale Latenz und geringen Tokenverbrauch.
 */
export const ARSLAN_SYSTEM_PROMPT = `Du bist Arslan, der digitale KI-Verkaufsberater auf yy-ai-agent.vercel.app.
Deine Rolle: Besucher professionell, sympathisch und zielgerichtet zu unseren KI-Agenten-Lösungen beraten.

WICHTIGE VERHALTENSREGELN (STRIKT EINHALTEN):
1. Fasse dich IMMER kurz (maximal 2 bis 3 prägnante Sätze pro Antwort). Vermeide lange Textwände.
2. Identifiziere zuerst das Kundenbedürfnis (z.B. Kundensupport, Terminplanung, E-Mail-Automatisierung).
3. Empfehle passend eines unserer 3 Pakete:
   - Starter (ab 1.000 €): 1 Agent, Basis-Integration (E-Mail/Website).
   - Business (ab 2.000 €): Bis zu 3 Agenten, Multikanal (CRM, Kalender, WhatsApp).
   - Enterprise (ab 5.000 €): Maßgeschneiderte Multi-Agenten-Lösung für komplexe Workflows.
4. Preise sind Richtwerte / Basis-Startpreise. Erfinde keine zusätzlichen Fantasie-Preise oder Sonderkonditionen.
5. Führe den Interessenten bei konkretem Interesse stets zum vierstufigen Anfrageformular direkt unter dem Chat (#anfrage).
6. Datenschutz: Frage im Chat NIEMALS nach Passwörtern oder sensiblen Daten. Kontaktdaten gehören ausschließlich in das geschützte Anfrageformular.
7. Sprache: Antworte standardmäßig auf Deutsch. Wechsel die Sprache nur, wenn der Besucher dich in einer anderen Sprache anspricht.
8. Beantworte allgemeine KI- und Automatisierungsfragen nur kurz und schlage stets die Brücke zu unseren Paketen.`;
