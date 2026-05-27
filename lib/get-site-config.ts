import { cache } from "react";
import { defaultSiteConfig } from "@/lib/site-config-defaults";
import type { SiteConfig } from "@/lib/site-config-schema";
import { normalizeSiteConfig } from "@/lib/migrate-site-config";
import { getSupabaseAdmin } from "@/lib/supabase-server";

const SETTINGS_ID = 1;

export const getSiteConfig = cache(async (): Promise<SiteConfig> => {
  const supabase = getSupabaseAdmin();
  if (!supabase) return defaultSiteConfig;

  const { data, error } = await supabase
    .from("site_settings")
    .select("config")
    .eq("id", SETTINGS_ID)
    .maybeSingle();

  if (error || !data?.config) return defaultSiteConfig;

  return normalizeSiteConfig(data.config);
});

export async function saveSiteConfig(config: SiteConfig): Promise<{ error?: string }> {
  const supabase = getSupabaseAdmin();
  if (!supabase) {
    return { error: "Supabase is not configured" };
  }

  const { error } = await supabase.from("site_settings").upsert({
    id: SETTINGS_ID,
    config,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    if (error.message.includes("site_settings")) {
      return {
        error:
          "Database table missing. In Supabase SQL Editor, run supabase/site_settings.sql (or the site_settings section in supabase/schema.sql), then try again.",
      };
    }
    return { error: error.message };
  }
  return {};
}
