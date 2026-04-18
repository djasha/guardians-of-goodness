import "server-only";
import { createClient } from "next-sanity";
import { projectId, dataset, apiVersion } from "./client";

/**
 * Write client — SERVER-ONLY.
 *
 * Uses SANITY_API_TOKEN for document mutations (form submissions, etc.).
 * The `server-only` import above will cause a build error if any client
 * component ever tries to import this file.
 */
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

/**
 * Draft read client — SERVER-ONLY.
 *
 * Uses `perspective: "raw"` so admin/editor reads can see `drafts.<id>`.
 * Prefers `SANITY_READ_TOKEN` (read-only) when set — keeps draft reads
 * on a token with no mutation scope, so a leaked read token cannot be
 * used to modify content. Falls back to the write token for projects
 * that only have one token configured.
 */
const readToken = process.env.SANITY_READ_TOKEN ?? process.env.SANITY_API_TOKEN;
export const draftReadClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  perspective: "raw",
  token: readToken,
});
