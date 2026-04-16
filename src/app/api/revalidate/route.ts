import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "node:crypto";

/** Constant-time string compare to avoid timing-attack leakage of the secret. */
function safeEqual(a: string, b: string): boolean {
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  if (aBuf.length !== bBuf.length) return false;
  return timingSafeEqual(aBuf, bBuf);
}

export async function POST(req: NextRequest) {
  const secretEnv = process.env.REVALIDATION_SECRET;
  if (!secretEnv) {
    return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
  }

  const header = req.headers.get("authorization") ?? "";
  const expected = `Bearer ${secretEnv}`;
  if (!safeEqual(header, expected)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { _type } = body;

    if (_type) {
      revalidateTag(_type, "max");
    }

    return NextResponse.json({ revalidated: true });
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
}
