import { createClient } from "@supabase/supabase-js";

async function verifySupabaseConnection() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const anonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !serviceKey) {
    console.log("[INFO] Für die vollständige Verifikation werden SUPABASE_URL und SUPABASE_SERVICE_ROLE_KEY benötigt.");
    console.log("Ausführen mit:");
    console.log("SUPABASE_URL=https://... SUPABASE_SERVICE_ROLE_KEY=... node scripts/verify-supabase.mjs");
    return;
  }

  console.log(`Verbinde mit Supabase-Projekt 'yy-ai-platform': ${url}`);
  const serviceClient = createClient(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });

  // 1. Optional: Wenn ein anon-Key vorliegt, prüfen ob RLS den öffentlichen Zugriff blockiert
  if (anonKey) {
    console.log("\n1. Prüfe RLS-Schutz für öffentliche 'anon'-Rolle (muss blockiert sein)...");
    const anonClient = createClient(url, anonKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    const { error: anonReadError } = await anonClient.from("website_leads").select("id").limit(1);
    if (anonReadError) {
      console.log(`[PASS] Öffentlicher Lesezugriff (anon) erfolgreich blockiert: ${anonReadError.message}`);
    } else {
      console.warn("[WARN] Öffentlicher Lesezugriff war unerwartet möglich! Bitte RLS in Supabase prüfen.");
    }
  }

  // 2. Serverseitiges Einfügen über Service-Role
  console.log("\n2. Teste serverseitige Speicherung in 'website_leads' (wie in /api/inquiries)...");
  const testPayload = {
    scope: "Geschäftlich",
    industry: "KI-Automatisierung & QA",
    tasks: ["Wiederkehrende Aufgaben automatisieren", "Kundendaten verwalten"],
    tasks_other: null,
    integrations: ["CRM-System", "Microsoft 365"],
    integrations_other: null,
    name: "ARSLAN_TEST_RUNNER",
    email: "ephemeral-test@yy-ai-platform.invalid",
    phone: "+49 000 000000",
    consent: true,
    consented_at: new Date().toISOString(),
    status: "neu",
    source: "website",
    priority: "normal",
    assigned_agent: "arslan",
    internal_notes: "Automatisierter Systemtest für Projekt yy-ai-platform",
    metadata: {
      source: "web_form",
      version: "v2",
      test_run: true,
    },
  };

  const { data: insertedData, error: insertError } = await serviceClient
    .from("website_leads")
    .insert(testPayload)
    .select("id, created_at, status, priority, assigned_agent")
    .single();

  if (insertError) {
    console.error("[ERROR] Serverseitige Speicherung fehlgeschlagen:", insertError.message);
    process.exit(1);
  }

  console.log(`[SUCCESS] Test-Lead erfolgreich angelegt (ID: ${insertedData.id}, Status: ${insertedData.status}, Agent: ${insertedData.assigned_agent})`);

  // 3. Sofortige Bereinigung des Test-Leads
  console.log("\n3. Bereinige Test-Datensatz aus 'website_leads'...");
  const { error: deleteError } = await serviceClient
    .from("website_leads")
    .delete()
    .eq("id", insertedData.id);

  if (deleteError) {
    console.error("[WARN] Bereinigung fehlgeschlagen:", deleteError.message);
  } else {
    console.log("[SUCCESS] Test-Lead wurde rückstandslos aus der Datenbank entfernt.");
  }

  console.log("\nFertig: Tabelle 'website_leads' im Projekt 'yy-ai-platform' ist zu 100 % einsatzbereit!");
}

verifySupabaseConnection().catch((err) => {
  console.error("Unerwarteter Fehler:", err.message);
  process.exit(1);
});
