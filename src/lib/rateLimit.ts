/**
 * Best-effort, in-memory rate limiter for lightweight server endpoints.
 *
 * NOTE on serverless: On Vercel, multiple Lambda instances may each hold
 * their own copy of `buckets`, so an attacker hitting different instances
 * can exceed the nominal limit. This is still useful as a first line of
 * defense — combined with endpoint-specific validation,
 * it stops trivial bots and accidental double-submits.
 *
 * For production-grade rate limiting, add `@upstash/ratelimit` with an
 * Upstash Redis URL/token in env. Until then, this is a zero-dependency
 * stopgap that does not require any new infra.
 */

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_PER_WINDOW = 10; // 10 submissions/hour/IP is plenty for a contact form

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

let cleanupCounter = 0;
function maybeCleanup() {
  // Sweep expired buckets every ~500 requests to keep memory bounded
  if (++cleanupCounter % 500 !== 0) return;
  const now = Date.now();
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt < now) buckets.delete(key);
  }
}

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  retryAfterSeconds?: number;
};

export function checkRateLimit(key: string): RateLimitResult {
  maybeCleanup();
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt < now) {
    buckets.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_PER_WINDOW - 1 };
  }

  if (bucket.count >= MAX_PER_WINDOW) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  bucket.count++;
  return { allowed: true, remaining: MAX_PER_WINDOW - bucket.count };
}

/**
 * Extracts the client IP from Vercel / Cloudflare / standard proxy headers.
 *
 * Prefers `x-real-ip` (Vercel) and `cf-connecting-ip` (Cloudflare) because
 * edge infra sets those to the actual client. `x-forwarded-for`'s leftmost
 * value is user-controllable — attackers can prepend a fake IP to dodge
 * per-IP rate limits — so when falling back, we take the rightmost entry,
 * which is the last hop our proxy actually observed.
 */
export function getClientIp(headers: Headers): string {
  const realIp = headers.get("x-real-ip");
  if (realIp) return realIp.trim();

  const cfIp = headers.get("cf-connecting-ip");
  if (cfIp) return cfIp.trim();

  const xff = headers.get("x-forwarded-for");
  if (xff) {
    const entries = xff.split(",").map((s) => s.trim()).filter(Boolean);
    if (entries.length > 0) return entries[entries.length - 1];
  }

  return "unknown";
}
