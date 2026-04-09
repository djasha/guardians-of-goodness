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

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const res = await fetch(embedUrl, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.5",
      },
    });

    clearTimeout(timeout);

    if (!res.ok) {
      return NextResponse.json(
        { error: `Embed fetch failed: ${res.status} ${res.statusText}` },
        { status: 502 }
      );
    }

    const html = await res.text();

    // Extract all base64 images (png or jpeg)
    const base64Matches = html.match(/data:image\/(?:png|jpeg|jpg|webp);base64,[A-Za-z0-9+/=]+/g);
    if (!base64Matches || base64Matches.length === 0) {
      // Debug: return what we got
      return NextResponse.json(
        {
          error: "No base64 image found in embed page",
          htmlLength: html.length,
          hasImages: html.includes("<img"),
          sample: html.substring(0, 500),
        },
        { status: 404 }
      );
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
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Failed to process image: ${message}` }, { status: 500 });
  }
}
