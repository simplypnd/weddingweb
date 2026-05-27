import { z } from "zod";

const hexColor = z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Use a 6-digit hex color (e.g. #7a8fa3)");

export const themeSchema = z.object({
  sand: hexColor,
  beige: hexColor,
  cream: hexColor,
  dusty: hexColor,
  dustyDark: hexColor,
  ink: hexColor,
  inkMuted: hexColor,
});

const navItemSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

export const siteConfigSchema = z.object({
  couple: z.object({
    partner1: z.string().min(1),
    partner2: z.string().min(1),
    displayNames: z.string().min(1),
  }),
  wedding: z.object({
    dateIso: z.string().min(1),
    dateDisplay: z.string().min(1),
    timeDisplay: z.string().min(1),
    tagline: z.string().min(1),
  }),
  rsvp: z.object({
    deadline: z.string().min(1),
    maxGuests: z.number().int().min(1).max(20),
  }),
  story: z.object({
    title: z.string().min(1),
    paragraphs: z.array(z.string().min(1)).min(1),
    image: z.string().min(1),
    imageAlt: z.string().min(1),
  }),
  schedule: z
    .array(
      z.object({
        time: z.string().min(1),
        title: z.string().min(1),
        description: z.string().min(1),
      }),
    )
    .min(1),
  details: z.object({
    dressCode: z.string().min(1),
    motifTitle: z.string(),
  }),
  venues: z
    .array(
      z.object({
        label: z.string().min(1),
        name: z.string().min(1),
        address: z.string().min(1),
        mapEmbedUrl: z.string().min(1),
        mapsLink: z.string().min(1),
      }),
    )
    .min(1),
  gallery: z.array(
    z.object({
      src: z.string().min(1),
      alt: z.string().min(1),
    }),
  ),
  faq: z.array(
    z.object({
      question: z.string().min(1),
      answer: z.string().min(1),
    }),
  ),
  contact: z.object({
    email: z.string().email(),
  }),
  music: z.object({
    src: z.string().min(1),
    enabled: z.boolean(),
  }),
  theme: themeSchema,
  nav: z.array(navItemSchema).min(1),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;
export type SiteTheme = z.infer<typeof themeSchema>;

export const STORAGE_BUCKET = "wedding-assets";
