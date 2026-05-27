import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { getSiteConfig, saveSiteConfig } from "@/lib/get-site-config";
import { defaultSiteConfig } from "@/lib/site-config-defaults";
import {
  formatConfigValidationError,
  prepareSiteConfigForSave,
} from "@/lib/sanitize-site-config";
import { siteConfigSchema } from "@/lib/site-config-schema";
import { parseDisplayToIso } from "@/lib/wedding-date";
import { requireAdminApi } from "@/lib/verify-admin-api";

export async function GET() {
  const authError = await requireAdminApi();
  if (authError) return authError;

  const config = await getSiteConfig();
  return NextResponse.json({ config });
}

export async function PUT(request: NextRequest) {
  const authError = await requireAdminApi();
  if (authError) return authError;

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const prepared = prepareSiteConfigForSave(body);
  const parsed = siteConfigSchema.safeParse(prepared);
  if (!parsed.success) {
    return NextResponse.json(
      { error: formatConfigValidationError(parsed.error.issues) },
      { status: 400 },
    );
  }

  const wedding = { ...parsed.data.wedding };
  const dateIso = parseDisplayToIso(wedding.dateDisplay, wedding.timeDisplay);
  if (dateIso) wedding.dateIso = dateIso;

  const config = {
    ...parsed.data,
    wedding,
    nav: parsed.data.nav.length > 0 ? parsed.data.nav : defaultSiteConfig.nav,
  };

  const { error } = await saveSiteConfig(config);
  if (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

  revalidatePath("/");

  return NextResponse.json({ ok: true, config });
}
