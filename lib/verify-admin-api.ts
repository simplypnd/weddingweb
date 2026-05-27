import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  getAdminSecrets,
  verifySessionToken,
} from "@/lib/admin-session";

export async function requireAdminApi(): Promise<NextResponse | null> {
  const { sessionSecret } = getAdminSecrets();
  if (!sessionSecret) {
    return NextResponse.json(
      { error: "Admin is not configured" },
      { status: 503 },
    );
  }

  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  if (!token || !(await verifySessionToken(token, sessionSecret))) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return null;
}
