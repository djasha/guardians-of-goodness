import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { z } from "zod";
import { requireAdminAuth } from "@/lib/adminAuth";
import { requireSameOrigin } from "@/lib/sameOrigin";
import { draftReadClient, writeClient } from "@/sanity/writeClient";

export const dynamic = "force-dynamic";

type Params = { slug: string };

const MAX_PUCK_DATA_BYTES = 1_000_000;
const encoder = new TextEncoder();

const puckComponentSchema = z.object({
  type: z.string().min(1).max(64),
  props: z.record(z.string(), z.unknown()),
});

const puckDataSchema = z.object({
  content: z.array(puckComponentSchema),
  root: z.object({ props: z.record(z.string(), z.unknown()) }),
  zones: z.record(z.string(), z.array(puckComponentSchema)).optional(),
});

const LANDING_PAGE_QUERY = `*[
  _type == "landingPage" &&
  !(_id in path("drafts.**")) &&
  (_id == $identifier || slug.current == $identifier)
][0]{
  _id,
  title,
  "slug": slug.current,
  description,
  puckData,
  "draft": *[_id == "drafts." + ^._id][0]{ puckData, _rev }
}`;

function draftId(publishedId: string): string {
  return publishedId.startsWith("drafts.") ? publishedId : `drafts.${publishedId}`;
}

function normalizeIdentifier(identifier: string): string {
  return identifier.replace(/^drafts\./, "");
}

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const authFailure = requireAdminAuth(req);
  if (authFailure) return authFailure;

  const { slug: rawIdentifier } = await params;
  const identifier = normalizeIdentifier(rawIdentifier);
  const url = new URL(req.url);
  const useDraft = url.searchParams.get("draft") === "1";
  const doc = await draftReadClient.fetch(LANDING_PAGE_QUERY, { identifier });
  if (!doc) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  const activePuckData =
    useDraft && doc.draft?.puckData ? doc.draft.puckData : doc.puckData;
  return NextResponse.json({
    _id: doc._id,
    title: doc.title,
    slug: doc.slug,
    description: doc.description ?? "",
    puckData: activePuckData ? safeParse(activePuckData) : null,
    hasDraft: Boolean(doc.draft?.puckData),
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const originFailure = requireSameOrigin(req);
  if (originFailure) return originFailure;

  const authFailure = requireAdminAuth(req);
  if (authFailure) return authFailure;

  const { slug: rawIdentifier } = await params;
  const identifier = normalizeIdentifier(rawIdentifier);
  const url = new URL(req.url);
  const isDraft = url.searchParams.get("draft") === "1";
  const body = await req.json();

  const parsed = puckDataSchema.safeParse((body as { puckData?: unknown })?.puckData);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid puckData", issues: parsed.error.issues.slice(0, 5) },
      { status: 400 }
    );
  }
  const puckData = parsed.data;

  const serialized = JSON.stringify(puckData);
  if (encoder.encode(serialized).byteLength > MAX_PUCK_DATA_BYTES) {
    return NextResponse.json(
      { error: "Page content is too large" },
      { status: 413 }
    );
  }

  const existing = await draftReadClient.fetch(LANDING_PAGE_QUERY, { identifier });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const publishedId = existing._id;

  if (isDraft) {
    const did = draftId(publishedId);
    const published = (await writeClient.getDocument(publishedId)) ?? null;
    const {
      _id: _ignoredId,
      _rev: _ignoredRev,
      _createdAt: _ignoredCreatedAt,
      _updatedAt: _ignoredUpdatedAt,
      ...rest
    } = (published ?? {}) as Record<string, unknown>;
    void _ignoredId;
    void _ignoredRev;
    void _ignoredCreatedAt;
    void _ignoredUpdatedAt;
    const draftDoc: { _id: string; _type: string; puckData: string } & Record<string, unknown> = {
      ...rest,
      _id: did,
      _type: "landingPage",
      puckData: serialized,
    };
    const result = await writeClient.createOrReplace(draftDoc);
    return NextResponse.json({
      success: true,
      _rev: result._rev,
      mode: "draft",
    });
  }

  const result = await writeClient
    .patch(publishedId)
    .set({ puckData: serialized })
    .commit();

  try {
    await writeClient.delete(draftId(publishedId));
  } catch {
    // no draft to delete
  }

  revalidateTag(`landingPage:${existing.slug}`, "max");
  revalidateTag("landingPage:tree", "max");

  return NextResponse.json({
    success: true,
    _rev: result._rev,
    mode: "published",
  });
}

function safeParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
