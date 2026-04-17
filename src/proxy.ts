import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/adminAuth";

export function proxy(req: NextRequest) {
  const authFailure = requireAdminAuth(req);
  if (authFailure) return authFailure;

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/puck/:path*"],
};
