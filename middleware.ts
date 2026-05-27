import { type NextRequest, NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  getAdminSecrets,
  verifySessionToken,
} from "@/lib/admin-session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";
  const { sessionSecret } = getAdminSecrets();

  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const isValid =
    Boolean(token && sessionSecret) &&
    (await verifySessionToken(token!, sessionSecret!));

  if (isLoginPage) {
    if (isValid) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  if (!isValid) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};
