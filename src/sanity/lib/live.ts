// Live Content API — pairs with <SanityLive /> in the root layout.
// `sanityFetch` returns stega-encoded strings in Draft Mode so the
// Presentation Tool can render click-to-edit overlays.
import { defineLive } from "next-sanity/live";
import { client } from "./client";

const token =
  process.env.SANITY_API_READ_TOKEN || process.env.SANITY_API_TOKEN || undefined;

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});
