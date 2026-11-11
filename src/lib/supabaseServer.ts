import { createClient, SupabaseClient } from "@supabase/supabase-js";

let cachedClient: SupabaseClient | null = null;

/**
 * Erstellt oder liefert den serverseitigen Supabase-Client für das Projekt 'yy-ai-platform'.
 * Verwendet den geheimen SUPABASE_SERVICE_ROLE_KEY für sichere, serverseitige
 * Schreibzugriffe auf die Tabelle 'website_leads'.
 *
 * SICHERHEIT:
 * - Läuft AUSSCHLIESSLICH serverseitig in der Next.js API Route (/api/inquiries).
 * - Wird NIEMALS im Browser ausgeführt oder an den Client übermittelt.
 * - Öffentliche Besucher ('anon') besitzen in Supabase keinerlei Rechte (weder SELECT noch INSERT).
 */
function cleanEnv(val?: string): string | undefined {
  if (!val) return undefined;
  const trimmed = val.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

export function getSupabaseServerClient(): SupabaseClient | null {
  const supabaseUrl =
    cleanEnv(process.env.SUPABASE_URL) ||
    cleanEnv(process.env.ARSLAN_SUPABASE_URL) ||
    cleanEnv(process.env.NEXT_PUBLIC_SUPABASE_URL);

  const supabaseKey =
    cleanEnv(process.env.SUPABASE_SERVICE_ROLE_KEY) ||
    cleanEnv(process.env.ARSLAN_SUPABASE_KEY) ||
    cleanEnv(process.env.SUPABASE_ANON_KEY);

  if (!supabaseUrl || !supabaseKey) {
    return null;
  }

  if (cachedClient) {
    return cachedClient;
  }

  cachedClient = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return cachedClient;
}
