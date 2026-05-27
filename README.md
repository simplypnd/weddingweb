# Wedding Invitation Website

A mobile-first wedding invitation built with Next.js, Tailwind CSS, and Supabase for RSVP storage.

## Features

- Single-page invitation with hero, countdown, story, schedule, venue map, gallery, FAQ, and RSVP
- Beige and dusty blue design
- Mobile hamburger navigation with touch-friendly controls
- RSVP stored in Supabase
- Password-protected **admin dashboard** at `/admin` to view RSVPs and **edit invitation content** in focused sub-pages under `/admin/content/*`
- **Color motif** — seven swatches below dress code on the invitation (no labels), synced with site theme colors
- Optional background music toggle

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Open the SQL Editor and run the full script in [`supabase/schema.sql`](supabase/schema.sql) (creates `rsvp_responses`, `site_settings`, and the `wedding-assets` storage bucket). If you already ran an older version of the script, also run [`supabase/site_settings.sql`](supabase/site_settings.sql) for the content editor.
3. If storage bucket creation fails in SQL, create bucket **`wedding-assets`** manually in Storage → New bucket → **Public**
4. Copy your project URL and **service role** key (Settings → API)

### 3. Environment variables

Copy `.env.example` to `.env.local` and fill in:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Admin dashboard (generate a long random string for SESSION_SECRET)
ADMIN_PASSWORD=your-chosen-password
ADMIN_SESSION_SECRET=your-long-random-secret
```

> The service role key is used only on the server. Never expose it in client code.

### View RSVP responses (admin)

1. Set `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` in `.env.local`
2. Restart the dev server
3. Open [http://localhost:3000/admin/login](http://localhost:3000/admin/login) and sign in
4. Bookmark `/admin` — it is not linked from the public invitation

**Security:** Use a strong admin password. Do not share the `/admin` URL publicly. If env files were ever committed, rotate your Supabase keys and change the admin password.

### Edit invitation content (admin CMS)

1. Sign in at `/admin/login`
2. Open **Edit site** (`/admin/content` redirects to **Couple**)
3. Use the section nav to edit one area at a time: Couple, Wedding, RSVP, Story, Schedule, **Details & colors**, Venues, Gallery, FAQ, Contact, Music
4. Click **Save all changes** from any section (shared state), then hard-refresh the public site

Unsaved edits persist while you move between sub-pages in the same browser session.

### Details, motif, and theme colors

On **Details & colors** (`/admin/content/details`):

- Edit dress code text
- Set an optional **motif heading** (shown above the color circles; leave blank to hide)
- Customize all seven palette colors with pickers — these drive both the **color motif** below dress code on the invitation and site-wide styling (background, accents, text)

Use **Reset colors to defaults** to restore the original beige and dusty blue look.

Photos upload to Supabase Storage (`wedding-assets` bucket). You can also paste image URLs. Defaults live in [`lib/site-config-defaults.ts`](lib/site-config-defaults.ts) until you save from admin.

### 4. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push this repo to GitHub
2. Import the project on [vercel.com](https://vercel.com)
3. Add the same environment variables in Project Settings → Environment Variables
4. Deploy

After deploy, submit a test RSVP and confirm it appears on `/admin` (and in Supabase → Table Editor → `rsvp_responses`). Add `ADMIN_PASSWORD` and `ADMIN_SESSION_SECRET` to Vercel environment variables as well.

## Scripts

| Command        | Description          |
| -------------- | -------------------- |
| `npm run dev`  | Start dev server     |
| `npm run build`| Production build     |
| `npm run start`| Start production     |
| `npm run lint` | Run ESLint           |

## Project structure

```
app/              # Pages and API routes
components/       # UI sections
lib/              # Config loader, validation, Supabase client
app/admin/        # Admin RSVP + content editor
public/           # Static assets (gallery, audio)
supabase/         # Database schema
```
