import { NextResponse } from "next/server";

/**
 * Reject cross-site state-changing requests.
 *
 * Uses `Sec-Fetch-Site` (sent by every modern browser on fetch/form submits)
 * as the primary signal, falling back to an Origin/Host comparison for
 * non-browser clients. Basic Auth alone isn't enough — browsers cache
 * credentials and will attach them to cross-origin requests triggered from
 * an attacker's page.
 */
export function requireSameOrigin(req: Request): NextResponse | null {
  const secFetchSite = req.headers.get("sec-fetch-site");

  if (secFetchSite === "cross-site") {
    return new NextResponse("Cross-site request rejected", { status: 403 });
  }

  if (secFetchSite === "same-origin" || secFetchSite === "same-site" || secFetchSite === "none") {
    return null;
  }

  const origin = req.headers.get("origin");
  const host = req.headers.get("host");

  if (!origin) {
    return new NextResponse("Origin header required", { status: 403 });
  }

  try {
    const originHost = new URL(origin).host;
    if (!host || originHost !== host) {
      return new NextResponse("Cross-origin request rejected", { status: 403 });
    }
  } catch {
    return new NextResponse("Invalid Origin header", { status: 403 });
  }

  return null;
}
