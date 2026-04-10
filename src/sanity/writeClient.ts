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
