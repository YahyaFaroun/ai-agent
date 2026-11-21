/**
 * Serverseitige Themenbegrenzung und Guardrails für Alp Arsalan (KI-Verkaufsberater von Yahya).
 * 
 * Regelt:
 * 1. Autorisierte Selbstvorstellung bei Fragen wie „Wer bist du?“
 * 2. Erkennung und Abwehr von Prompt-Injections („Ignoriere deine Anweisungen...“)
 * 3. Serverseitige Ablehnung themenfremder Anfragen (Religion, Wetter, Uhrzeit, Allgemeinwissen etc.)
 * 4. Durchlassen aller branchen- und geschäftsbezogenen Beratungsanfragen
 */

export interface TopicGuardResult {
  isHandled: boolean;
  reply?: string;
  category?: "identity" | "injection" | "off_topic" | "on_topic";
}

export const AUTHORIZED_SELF_INTRODUCTION =
  "Ich bin Alp Arsalan, der KI-Berater von Yahya. Ich zeige dir, wie du mit individuell eingerichteten KI-Assistenten und Automatisierungen Zeit sparen und deine Arbeitsabläufe vereinfachen kannst. Gemeinsam finden wir heraus, welche Lösung zu deinen Anforderungen passt.";

export const OFF_TOPIC_REJECTION =
  "Ich bin auf KI-Assistenten und Automatisierung spezialisiert. Damit du unser Gespräch optimal nutzen kannst, konzentrieren wir uns auf diese Themen. Was möchtest du mit KI verbessern?";

export const INJECTION_REJECTION =
  "Ich bleibe auf die Beratung zu unseren KI-Assistenten und Automatisierungslösungen von Yahya konzentriert. Wie kann ich dir bei deinen Arbeitsprozessen weiterhelfen?";

// 1. Regex für Selbstvorstellungs-Fragen
const IDENTITY_QUERY_REGEX =
  /^\s*(wer\s+(bist\s+du|sind\s+sie|ist\s+alp\s+arsalan)|was\s+bist\s+du|wer\s+spricht\s+hier|stell\s+dich\s+(kurz\s+)?vor|wie\s+heißt\s+du)\s*[?!.]*\s*$/i;

// 2. Regex für Prompt-Injection & Jailbreak-Versuche
const PROMPT_INJECTION_REGEX =
  /(ignoriere|ignore|vergiss|forget).*(anweisungen|instruktionen|regeln|instructions|rules|system\s*prompt|vorgaben)|(jailbreak|developer\s*mode|dan\s*mode)|(beantworte\s+(jetzt\s+)?(alle|beliebige|allgemeine)\s+fragen)/i;

// 3. Regex für klar themenfremde Fragen (Religion, Uhrzeit, Wetter, Trivia, Kochen etc.)
const EXPLICIT_OFF_TOPIC_PATTERNS: RegExp[] = [
  // Religion & Theologie
  /\b(wer|was)\s+ist\s+(allah|gott|jesus|christus|mohammed|muhammad|buddha|der\s+schöpfer|der\s+prophet)\b/i,
  /\b(welche\s+religion|was\s+sagt\s+der\s+koran|was\s+sagt\s+die\s+bibel|gibt\s+es\s+einen\s+gott|was\s+ist\s+der\s+islam|was\s+ist\s+das\s+christentum)\b/i,

  // Uhrzeit & Datum
  /\b(wie\s+spät\s+ist\s+es|wieviel\s+uhr\s+ist\s+es|welche\s+uhrzeit|uhrzeit\s+jetzt)\b/i,

  // Wetter
  /\b(wie\s+wird\s+das\s+wetter|wie\s+ist\s+das\s+wetter|wetterbericht|regnet\s+es\s+morgen)\b/i,

  // Allgemeinwissen / Politik / Sport-Trivia (ohne KI-Bezug)
  /\b(wer\s+(ist|war)\s+(bundeskanzler|präsident|könig|kaiser|weltmeister))\b/i,
  /\b(hauptstadt\s+von|wie\s+viele\s+einwohner\s+hat|wer\s+hat\s+(19\d\d|20\d\d)\s+die\s+wm\s+gewonnen)\b/i,

  // Kochen, Rezepte, Witze, Gedichte
  /\b(rezept\s+für|kuchen\s+backen|wie\s+kocht\s+man|wie\s+backt\s+man)\b/i,
  /\b(erzähle\s+(mir\s+)?(einen\s+)?witz|schreibe\s+(mir\s+)?(ein\s+)?gedicht)\b/i,
];

// 4. Positive Indikatoren für legitime KI-, Automatisierungs- oder Branchenberatung
const BUSINESS_OR_AI_INDICATOR_REGEX =
  /(ki|ai|agent|assistent|automatis|preis|kosten|paket|warteliste|business|prozess|workflow|software|crm|tool|schnittstelle|system|praxis|kanzlei|unternehmen|betrieb|firma|agentur|shop|e-commerce|handwerk|büro|beratung|recherche|marketing|email|e-mail|telegram|kalender|daten|hosting|modell|yahya|arsalan)/i;

/**
 * Überprüft eine Benutzernachricht serverseitig auf Themenkonformität.
 * 
 * Gibt `isHandled: true` zurück, wenn die Nachricht direkt serverseitig
 * beantwortet oder abgewiesen werden muss (z. B. Identitätsfrage, Injection, Off-Topic).
 */
export function checkTopicGuard(userMessage: string): TopicGuardResult {
  const trimmed = userMessage.trim();

  // 1. Identitätsfrage („Wer bist du?“)
  if (IDENTITY_QUERY_REGEX.test(trimmed)) {
    return {
      isHandled: true,
      category: "identity",
      reply: AUTHORIZED_SELF_INTRODUCTION,
    };
  }

  // 2. Prompt-Injection / Anweisungs-Überschreibung („Ignoriere deine Anweisungen...“)
  if (PROMPT_INJECTION_REGEX.test(trimmed)) {
    return {
      isHandled: true,
      category: "injection",
      reply: INJECTION_REJECTION,
    };
  }

  // 3. Eindeutig themenfremde Fragen (Religion, Uhrzeit, Wetter, Allgemeinwissen)
  // Wichtig: Nur greifen, wenn kein legitimer Business/KI-Bezug vorliegt
  const hasBusinessIndicator = BUSINESS_OR_AI_INDICATOR_REGEX.test(trimmed);

  for (const pattern of EXPLICIT_OFF_TOPIC_PATTERNS) {
    if (pattern.test(trimmed) && !hasBusinessIndicator) {
      return {
        isHandled: true,
        category: "off_topic",
        reply: OFF_TOPIC_REJECTION,
      };
    }
  }

  // 4. On-Topic: Nachricht wird zur dynamischen Beantwortung an das Modell übergeben
  return {
    isHandled: false,
    category: "on_topic",
  };
}
