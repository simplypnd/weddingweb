import { z } from "zod";
import { defaultSiteConfig } from "@/lib/site-config-defaults";
import type { SiteConfig } from "@/lib/site-config-schema";
import { normalizeHex } from "@/lib/theme";

/** Clean admin form data before Zod validation so empty rows do not block save. */
export function prepareSiteConfigForSave(body: unknown): SiteConfig {
  const raw =
    body && typeof body === "object"
      ? (body as Partial<SiteConfig>)
      : ({} as Partial<SiteConfig>);

  const gallery = (raw.gallery ?? [])
    .filter((g) => g?.src?.trim())
    .map((g, i) => ({
      src: g.src.trim(),
      alt: g.alt?.trim() || `Photo ${i + 1}`,
    }));

  const schedule = (raw.schedule ?? []).filter(
    (s) => s?.time?.trim() || s?.title?.trim() || s?.description?.trim(),
  );

  const venues = (raw.venues ?? []).filter(
    (v) => v?.name?.trim() || v?.label?.trim() || v?.address?.trim(),
  );

  const paragraphs = (raw.story?.paragraphs ?? []).filter((p) => p?.trim());

  const faq = (raw.faq ?? []).filter(
    (f) => f?.question?.trim() && f?.answer?.trim(),
  );

  const musicSrc = raw.music?.src?.trim() || defaultSiteConfig.music.src;

  const theme = { ...defaultSiteConfig.theme };
  if (raw.theme) {
    for (const key of Object.keys(theme) as (keyof typeof theme)[]) {
      const normalized = normalizeHex(String(raw.theme[key] ?? ""));
      if (normalized) theme[key] = normalized;
    }
  }

  return {
    ...defaultSiteConfig,
    ...raw,
    couple: { ...defaultSiteConfig.couple, ...raw.couple },
    wedding: { ...defaultSiteConfig.wedding, ...raw.wedding },
    rsvp: { ...defaultSiteConfig.rsvp, ...raw.rsvp },
    story: {
      ...defaultSiteConfig.story,
      ...raw.story,
      paragraphs:
        paragraphs.length > 0 ? paragraphs : defaultSiteConfig.story.paragraphs,
      image: raw.story?.image?.trim() || defaultSiteConfig.story.image,
      imageAlt: raw.story?.imageAlt?.trim() || defaultSiteConfig.story.imageAlt,
      title: raw.story?.title?.trim() || defaultSiteConfig.story.title,
    },
    schedule: schedule.length > 0 ? schedule : defaultSiteConfig.schedule,
    details: { ...defaultSiteConfig.details, ...raw.details },
    venues: venues.length > 0 ? venues : defaultSiteConfig.venues,
    gallery,
    faq: faq.length > 0 ? faq : defaultSiteConfig.faq,
    contact: { ...defaultSiteConfig.contact, ...raw.contact },
    music: {
      enabled: raw.music?.enabled ?? defaultSiteConfig.music.enabled,
      src: musicSrc,
    },
    theme,
    nav:
      raw.nav && raw.nav.length > 0 ? raw.nav : defaultSiteConfig.nav,
  } as SiteConfig;
}

export function formatConfigValidationError(issues: z.ZodIssue[]): string {
  const issue = issues[0];
  if (!issue) return "Invalid config";

  const field = issue.path.length > 0 ? issue.path.join(" → ") : "config";
  const msg = issue.message;

  if (msg.includes("array") && msg.includes(">=1")) {
    const hints: Record<string, string> = {
      schedule: "Add at least one schedule item with time and title.",
      venues: "Add at least one venue (e.g. Ceremony and Reception).",
      paragraphs: "Add at least one paragraph in Our Story.",
      nav: "Navigation cannot be empty.",
    };
    const key = String(issue.path[0]);
    if (hints[key]) return hints[key];
  }

  return `${field}: ${msg}`;
}
