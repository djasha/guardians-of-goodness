import { NextResponse } from "next/server";

const AUTH_HEADER = 'Basic realm="Admin", charset="UTF-8"';

function authChallenge() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": AUTH_HEADER,
    },
  });
}

export function requireAdminAuth(req: Request): NextResponse | null {
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    if (process.env.NODE_ENV !== "production") return null;

    return new NextResponse("Admin password is not configured", {
      status: 503,
    });
  }

  const auth = req.headers.get("authorization");
  if (!auth?.startsWith("Basic ")) {
    return authChallenge();
  }

  let decoded: string;
  try {
    decoded = atob(auth.slice(6));
  } catch {
    return authChallenge();
  }

  const idx = decoded.indexOf(":");
  const supplied = idx === -1 ? decoded : decoded.slice(idx + 1);

  if (!timingSafeEqual(supplied, password)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  return null;
}

function timingSafeEqual(a: string, b: string): boolean {
  const len = Math.max(a.length, b.length);
  let result = a.length ^ b.length;
  for (let i = 0; i < len; i++) {
    const ai = i < a.length ? a.charCodeAt(i) : 0;
    const bi = i < b.length ? b.charCodeAt(i) : 0;
    result |= ai ^ bi;
  }
  return result === 0;
}
