import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { requireAdminAuth } from "@/lib/adminAuth";
import { client } from "@/sanity/client";
import { writeClient } from "@/sanity/writeClient";

type Params = { slug: string };

const MAX_PUCK_DATA_BYTES = 1_000_000;

const LANDING_PAGE_QUERY = `*[_type == "landingPage" && slug.current == $slug][0]{
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

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const url = new URL(req.url);
  const useDraft = url.searchParams.get("draft") === "1";
  const doc = await client.fetch(LANDING_PAGE_QUERY, { slug });
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
  const authFailure = requireAdminAuth(req);
  if (authFailure) return authFailure;

  const { slug } = await params;
  const url = new URL(req.url);
  const isDraft = url.searchParams.get("draft") === "1";
  const body = await req.json();

  const { puckData } = body as { puckData?: unknown };

  if (!puckData || typeof puckData !== "object") {
    return NextResponse.json({ error: "Invalid puckData" }, { status: 400 });
  }

  const serialized = JSON.stringify(puckData);
  if (serialized.length > MAX_PUCK_DATA_BYTES) {
    return NextResponse.json(
      { error: "Page content is too large" },
      { status: 413 }
    );
  }

  const existing = await client.fetch(LANDING_PAGE_QUERY, { slug });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const publishedId = existing._id;

  if (isDraft) {
    const did = draftId(publishedId);
    const published = (await client.getDocument(publishedId)) ?? null;
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

  revalidateTag(`landingPage:${slug}`, "max");
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
