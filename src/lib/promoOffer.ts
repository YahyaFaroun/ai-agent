/**
 * Zentrale Zeitsteuerung für das befristete Aktionsangebot beim mittleren Paket „KI-Agent 24/7“.
 *
 * - Regulärer Preis: ab 3.000 € (einmalige Einrichtung)
 * - Befristeter Aktionspreis: 2.000 € bis einschließlich 15. Dezember 2026 (23:59:59.999 MEZ)
 * - Ab dem 16. Dezember 2026 (00:00:00 MEZ) wird überall automatisch wieder ausschließlich
 *   der reguläre Preis angezeigt und kommuniziert.
 */

export const AGENT_PROMO_DEADLINE_ISO = "2026-12-15T23:59:59.999+01:00";
// 2026-12-15T23:59:59.999+01:00 (MEZ) === 2026-12-15T22:59:59.999Z
export const AGENT_PROMO_DEADLINE_MS = 1797375599999;

export const AGENT_REGULAR_PRICE_LABEL = "ab 3.000 €";
export const AGENT_PROMO_HEADLINE = "Jetzt nur 2.000 €";
export const AGENT_PROMO_UNTIL_TEXT = "Bis 15. Dezember 2026";

export function isAgentPromoActive(now?: Date): boolean {
  const timestamp = now ? now.getTime() : Date.now();
  return timestamp <= AGENT_PROMO_DEADLINE_MS;
}

/** Client-Snapshot für useSyncExternalStore (wertet die reale Besucherzeit im Browser aus). */
export function getAgentPromoClientSnapshot(): boolean {
  return Date.now() <= AGENT_PROMO_DEADLINE_MS;
}

/** Deterministischer Server-Snapshot für statisches Next.js-Prerendering (ohne Date-Aufruf). */
export function getAgentPromoServerSnapshot(): boolean {
  return true;
}

export function subscribeAgentPromo(onStoreChange: () => void): () => void {
  const remainingMs = AGENT_PROMO_DEADLINE_MS - Date.now();
  if (remainingMs <= 0) {
    return () => {};
  }
  const timeoutMs = Math.min(remainingMs + 250, 2_147_483_647);
  const timer = setTimeout(onStoreChange, timeoutMs);
  return () => clearTimeout(timer);
}

export function formatAgentWaitlistOptionName(promoActive: boolean): string {
  return promoActive
    ? "KI-Agent 24/7 (Jetzt 2.000 € statt 3.000 €)"
    : "KI-Agent 24/7 (ab 3.000 €)";
}

export function formatAgentWaitlistOptionDesc(promoActive: boolean): string {
  return promoActive
    ? "Aktionspreis bis 15.12.2026 · 24/7-Server, Dashboard, Telegram"
    : "Autonomer 24/7-Serverbetrieb, Dashboard, Telegram";
}

export function getAgentWaitlistOptionName(now?: Date): string {
  return formatAgentWaitlistOptionName(isAgentPromoActive(now));
}

export function getAgentWaitlistOptionDesc(now?: Date): string {
  return formatAgentWaitlistOptionDesc(isAgentPromoActive(now));
}
