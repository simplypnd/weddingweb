import type { SiteConfig } from "@/lib/site-config-schema";

export const themeColorKeys: (keyof SiteConfig["theme"])[] = [
  "sand",
  "beige",
  "cream",
  "dusty",
  "dustyDark",
  "ink",
  "inkMuted",
];

export const hexColorSchema = /^#[0-9A-Fa-f]{6}$/;

export function normalizeHex(value: string): string | null {
  const trimmed = value.trim();
  if (/^#[0-9A-Fa-f]{6}$/.test(trimmed)) return trimmed;
  if (/^[0-9A-Fa-f]{6}$/.test(trimmed)) return `#${trimmed}`;
  return null;
}

export const themeCssVars = (theme: SiteConfig["theme"]) => `
:root {
  --sand: ${theme.sand};
  --beige: ${theme.beige};
  --cream: ${theme.cream};
  --dusty: ${theme.dusty};
  --dusty-dark: ${theme.dustyDark};
  --ink: ${theme.ink};
  --ink-muted: ${theme.inkMuted};
}
`.trim();
