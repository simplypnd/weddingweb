-- Run this in Supabase → SQL Editor if saving site content fails with
-- "Could not find the table 'public.site_settings'"

create table if not exists public.site_settings (
  id integer primary key,
  config jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

drop policy if exists "No public access on site_settings" on public.site_settings;

create policy "No public access on site_settings"
  on public.site_settings
  for all
  using (false);
