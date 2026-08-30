import { NextResponse } from "next/server";

/**
 * Basic hardening headers applied to every response. Rate limiting
 * lives per-route in the API handlers (see lib/rateLimit.ts) so it
 * can be tuned per endpoint and stays next to the code it protects.
 */
export function middleware() {
  const res = NextResponse.next();
  res.headers.set("X-Frame-Options", "DENY");
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
