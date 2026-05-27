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

  if (Array.isArray(obj.nav)) {
    obj.nav = obj.nav.map((item) => {
      if (!item || typeof item !== "object") return item;
      const navItem = item as { label?: string; href?: string };
      if (navItem.href !== "#story") return navItem;
      const label =
        navItem.label === "Story" || navItem.label === "Our Story"
          ? "Sponsors"
          : (navItem.label ?? "Sponsors");
      return { ...navItem, href: "#sponsors", label };
    });
  }

  if (obj.story && typeof obj.story === "object") {
    const story = obj.story as Record<string, unknown>;
    if (story.title === "Our Story" || story.title === "Story") {
      obj.story = { ...story, title: "Sponsors" };
    }
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
