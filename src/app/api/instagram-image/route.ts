import { NextRequest, NextResponse } from "next/server";

/**
 * API route that fetches an Instagram post's embed page,
 * extracts the base64 image, and returns it as an actual image.
 *
 * Usage: /api/instagram-image?url=https://www.instagram.com/p/CODE/
 *
 * Caches for 24 hours to avoid hammering Instagram.
 */
export async function GET(request: NextRequest) {
  const postUrl = request.nextUrl.searchParams.get("url");

  if (!postUrl || !postUrl.includes("instagram.com")) {
    return NextResponse.json({ error: "Missing or invalid Instagram URL" }, { status: 400 });
  }

  try {
    // Fetch the embed page
    const embedUrl = postUrl.endsWith("/") ? postUrl + "embed/" : postUrl + "/embed/";
    const res = await fetch(embedUrl, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch embed" }, { status: 502 });
    }

    const html = await res.text();

    // Extract all base64 images
    const base64Matches = html.match(/data:image\/[a-z]+;base64,[A-Za-z0-9+/=]+/g);
    if (!base64Matches || base64Matches.length === 0) {
      return NextResponse.json({ error: "No image found in embed" }, { status: 404 });
    }

    // Pick the largest one (main post image, not the profile pic)
    let largest = base64Matches[0];
    for (const m of base64Matches) {
      if (m.length > largest.length) largest = m;
    }

    // Parse base64
    const [header, data] = largest.split(",");
    const mimeMatch = header.match(/data:(image\/[a-z]+)/);
    const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";
    const buffer = Buffer.from(data, "base64");

    // Return as image with 24h cache
    return new NextResponse(buffer, {
      headers: {
        "Content-Type": mimeType,
        "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      },
    });
  } catch {
    return NextResponse.json({ error: "Failed to process image" }, { status: 500 });
  }
}
