import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/client";

const RECENT_IMAGES_QUERY = `*[_type == "sanity.imageAsset"] | order(_createdAt desc)[0...$limit]{
  _id,
  url,
  originalFilename,
  metadata {
    dimensions { width, height }
  }
}`;

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const rawLimit = Number(url.searchParams.get("limit") ?? "24");
  const limit = Math.min(Math.max(Number.isFinite(rawLimit) ? rawLimit : 24, 1), 60);

  try {
    const assets = await client.fetch(RECENT_IMAGES_QUERY, { limit });
    return NextResponse.json({ assets });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Failed to load assets" },
      { status: 500 }
    );
  }
}
