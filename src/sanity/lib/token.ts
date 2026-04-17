import "server-only";

export const readToken =
  process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN || "";

if (!readToken && process.env.NODE_ENV !== "production") {
  console.warn(
    "[sanity] No SANITY_API_READ_TOKEN set — Presentation live preview will not load drafts.",
  );
}
