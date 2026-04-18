import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { requireAdminAuth } from "@/lib/adminAuth";
import { requireSameOrigin } from "@/lib/sameOrigin";
import { draftReadClient, writeClient } from "@/sanity/writeClient";

export const dynamic = "force-dynamic";

const SOURCE_QUERY = `*[
  _type == "landingPage" &&
  !(_id in path("drafts.**")) &&
  _id == $id
][0]{
  title,
  description,
  puckData,
  noIndex,
  "parentRef": parent._ref
}`;

const UNIQUE_SLUG_QUERY = `count(*[_type == "landingPage" && slug.current == $slug])`;

async function makeUniqueSlug(base: string): Promise<string> {
  const normalized = base.replace(/^drafts\./, "").replace(/-copy(-\d+)?$/, "");
  const candidate = `${normalized}-copy`;

  const initialCount = await draftReadClient.fetch<number>(UNIQUE_SLUG_QUERY, {
    slug: candidate,
  });
  if (initialCount === 0) return candidate;

  for (let n = 2; n < 100; n++) {
    const next = `${candidate}-${n}`;
    const count = await draftReadClient.fetch<number>(UNIQUE_SLUG_QUERY, {
      slug: next,
    });
    if (count === 0) return next;
  }
  return `${candidate}-${Date.now()}`;
}

export async function POST(req: NextRequest) {
  const originFailure = requireSameOrigin(req);
  if (originFailure) return originFailure;

  const authFailure = requireAdminAuth(req);
  if (authFailure) return authFailure;

  let body: { sourceId?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const sourceId = typeof body.sourceId === "string" ? body.sourceId : "";
  if (!sourceId || !/^[a-zA-Z0-9_.-]+$/.test(sourceId)) {
    return NextResponse.json({ error: "Invalid sourceId" }, { status: 400 });
  }

  const source = await draftReadClient.fetch(SOURCE_QUERY, { id: sourceId });
  if (!source) {
    return NextResponse.json({ error: "Source page not found" }, { status: 404 });
  }

  const sourceSlug =
    (await draftReadClient.fetch<string | null>(
      `*[_type == "landingPage" && _id == $id][0].slug.current`,
      { id: sourceId }
    )) ?? "page";
  const newSlug = await makeUniqueSlug(sourceSlug);

  const newTitle = source.title ? `${source.title} (copy)` : "Untitled (copy)";

  const doc = {
    _type: "landingPage" as const,
    title: newTitle,
    slug: { _type: "slug" as const, current: newSlug },
    description: source.description ?? "",
    puckData: source.puckData ?? "",
    noIndex: true,
    isHomepage: false,
    ...(source.parentRef
      ? { parent: { _type: "reference" as const, _ref: source.parentRef } }
      : {}),
  };

  const created = await writeClient.create(doc);

  revalidateTag("landingPage:tree", "max");

  return NextResponse.json({ _id: created._id, slug: newSlug });
}
