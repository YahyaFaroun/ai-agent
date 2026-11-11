-- ==============================================================================
-- Finales Schema für Arslan AI Leads (Projekt: yy-ai-platform)
-- 
-- SICHERHEIT:
-- - Row Level Security (RLS) ist strikt aktiviert.
-- - Weder 'anon' noch 'authenticated' haben Tabellenzugriff (weder SELECT noch INSERT/UPDATE/DELETE).
-- - Alle Rechte für 'anon' und 'authenticated' sind explizit entzogen.
-- - Schreibzugriff erfolgt AUSSCHLIESSLICH serverseitig über die Next.js API-Route
--   mit dem geheimen SUPABASE_SERVICE_ROLE_KEY.
-- - Das spätere Dashboard erhält erst bei seiner Implementierung eigene Berechtigungen.
-- ==============================================================================

create table if not exists public.arslan_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  
  -- Formular-Felder
  scope text not null check (scope in ('Privat', 'Geschäftlich', 'Beides')),
  industry text,
  tasks text[] not null default '{}',
  tasks_other text,
  integrations text[] not null default '{}',
  integrations_other text,
  name text not null,
  email text not null,
  phone text,
  consent boolean not null default false check (consent = true),
  consented_at timestamptz not null default now(),
  
  -- Workflow- & Dashboard-Felder (für späteres internes Dashboard vorbereitet)
  status text not null default 'neu' check (status in ('neu', 'in_bearbeitung', 'kontaktiert', 'qualifiziert', 'angebot_erstellt', 'abgeschlossen', 'archiviert')),
  source text not null default 'website',
  priority text not null default 'normal' check (priority in ('niedrig', 'normal', 'hoch', 'dringend')),
  assigned_agent text default 'arslan',
  internal_notes text,
  metadata jsonb not null default '{}'::jsonb,
  processed_at timestamptz
);

-- Indexe für spätere Filterung und Abfragen
create index if not exists idx_arslan_leads_created_at on public.arslan_leads (created_at desc);
create index if not exists idx_arslan_leads_status on public.arslan_leads (status);
create index if not exists idx_arslan_leads_priority on public.arslan_leads (priority);
create index if not exists idx_arslan_leads_email on public.arslan_leads (email);

-- Row Level Security (RLS) strikt aktivieren
alter table public.arslan_leads enable row level security;

-- Alte Policies restlos entfernen (falls zuvor angelegt)
drop policy if exists "Allow insert with consent on arslan_leads" on public.arslan_leads;
drop policy if exists "Allow public insert with consent" on public.arslan_leads;
drop policy if exists "Allow authenticated dashboard users read arslan_leads" on public.arslan_leads;
drop policy if exists "Allow authenticated dashboard select" on public.arslan_leads;
drop policy if exists "Allow authenticated dashboard update" on public.arslan_leads;

-- Weder 'anon' noch 'authenticated' erhalten Tabellenzugriff: Rechte explizit entziehen
revoke all on table public.arslan_leads from anon, authenticated;

-- Dokumentations-Kommentare
comment on table public.arslan_leads is 'Kundenanfragen der Arslan AI Website im Projekt yy-ai-platform (Zero Trust / Server-only Access)';
comment on column public.arslan_leads.priority is 'Priorität für das spätere interne Dashboard';
comment on column public.arslan_leads.assigned_agent is 'Zugewiesener Agent (Standard: arslan)';
comment on column public.arslan_leads.internal_notes is 'Interne Notizen';
