import { defaultSiteConfig } from "@/lib/site-config-defaults";
import { siteConfigSchema, type SiteConfig } from "@/lib/site-config-schema";

type LegacyVenue = {
  name?: string;
  address?: string;
  mapEmbedUrl?: string;
  mapsLink?: string;
  label?: string;
};

/** Convert DB JSON to SiteConfig, including legacy single `venue` objects. */
export function normalizeSiteConfig(raw: unknown): SiteConfig {
  if (!raw || typeof raw !== "object") return defaultSiteConfig;

  const obj = { ...(raw as Record<string, unknown>) };

  if (obj.venue && !obj.venues) {
    const v = obj.venue as LegacyVenue;
    obj.venues = [
      {
        label: v.label ?? "Venue",
        name: v.name ?? "",
        address: v.address ?? "",
        mapEmbedUrl: v.mapEmbedUrl ?? "",
        mapsLink: v.mapsLink ?? "",
      },
    ];
    delete obj.venue;
  }

  if (!obj.theme) {
    obj.theme = defaultSiteConfig.theme;
  }

  if (obj.details && typeof obj.details === "object") {
    const details = obj.details as Record<string, unknown>;
    obj.details = {
      ...details,
      motifTitle:
        typeof details.motifTitle === "string"
          ? details.motifTitle
          : defaultSiteConfig.details.motifTitle,
      motifColors:
        Array.isArray(details.motifColors) && details.motifColors.length === 5
          ? details.motifColors
          : defaultSiteConfig.details.motifColors,
    };
  }

  const parsed = siteConfigSchema.safeParse(obj);
  if (parsed.success) return parsed.data;

  return defaultSiteConfig;
}

export function createEmptyVenue(label = "") {
  return {
    label,
    name: "",
    address: "",
    mapEmbedUrl: "",
    mapsLink: "",
  };
}
