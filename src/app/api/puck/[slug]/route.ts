import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/client";
import { writeClient } from "@/sanity/writeClient";

type Params = { slug: string };

const LANDING_PAGE_QUERY = `*[_type == "landingPage" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  description,
  puckData
}`;

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const doc = await client.fetch(LANDING_PAGE_QUERY, { slug });
  if (!doc) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({
    _id: doc._id,
    title: doc.title,
    slug: doc.slug,
    description: doc.description ?? "",
    puckData: doc.puckData ? safeParse(doc.puckData) : null,
  });
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  const { slug } = await params;
  const body = await req.json();

  const { puckData, title, description } = body as {
    puckData?: unknown;
    title?: string;
    description?: string;
  };

  if (!puckData || typeof puckData !== "object") {
    return NextResponse.json({ error: "Invalid puckData" }, { status: 400 });
  }

  const existing = await client.fetch(LANDING_PAGE_QUERY, { slug });
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const patch: Record<string, unknown> = {
    puckData: JSON.stringify(puckData),
  };
  if (typeof title === "string") patch.title = title;
  if (typeof description === "string") patch.description = description;

  const result = await writeClient.patch(existing._id).set(patch).commit();

  return NextResponse.json({ success: true, _rev: result._rev });
}

function safeParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
