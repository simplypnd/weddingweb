-- Run this in the Supabase SQL Editor for your project

create table if not exists public.rsvp_responses (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  attending boolean not null,
  guest_count integer not null default 1,
  dietary_notes text,
  message text,
  created_at timestamptz not null default now()
);

alter table public.rsvp_responses enable row level security;

-- No public read access
create policy "No public select on rsvp"
  on public.rsvp_responses
  for select
  using (false);

-- Inserts are handled via service role in the Next.js API route.
-- No anon insert policy is required when using the service role key.

-- Site content (editable via /admin/content)
create table if not exists public.site_settings (
  id integer primary key,
  config jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

create policy "No public access on site_settings"
  on public.site_settings
  for all
  using (false);

-- Storage bucket for gallery/story uploads (run after enabling Storage in project)
insert into storage.buckets (id, name, public)
values ('wedding-assets', 'wedding-assets', true)
on conflict (id) do nothing;

create policy "Public read wedding assets"
  on storage.objects for select
  using (bucket_id = 'wedding-assets');

-- Uploads use service role in API routes (bypasses RLS)
