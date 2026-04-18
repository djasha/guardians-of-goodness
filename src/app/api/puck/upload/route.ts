import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/adminAuth";
import { requireSameOrigin } from "@/lib/sameOrigin";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import { writeClient } from "@/sanity/writeClient";

export const dynamic = "force-dynamic";

const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
];
const ALLOWED_EXTENSIONS = /\.(jpe?g|png|webp|gif|avif)$/i;

export async function POST(req: NextRequest) {
  const originFailure = requireSameOrigin(req);
  if (originFailure) return originFailure;

  const authFailure = requireAdminAuth(req);
  if (authFailure) return authFailure;

  const ip = getClientIp(req.headers);
  const limit = checkRateLimit(`puck-upload:${ip}`);
  if (!limit.allowed) {
    return NextResponse.json(
      { error: "Too many uploads. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(limit.retryAfterSeconds ?? 3600),
        },
      }
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: "Expected multipart form data" }, { status: 400 });
  }

  const file = form.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "Missing file" }, { status: 400 });
  }

  if (!ALLOWED_EXTENSIONS.test(file.name)) {
    return NextResponse.json(
      { error: "Unsupported file extension" },
      { status: 415 }
    );
  }

  if (file.size > MAX_UPLOAD_BYTES) {
    return NextResponse.json(
      { error: `File too large (${Math.round(file.size / 1024)}KB, max ${MAX_UPLOAD_BYTES / 1024 / 1024}MB)` },
      { status: 413 }
    );
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const detectedType = detectImageMime(buffer);
  if (!detectedType || !ALLOWED_TYPES.includes(detectedType)) {
    return NextResponse.json(
      { error: "Unsupported or invalid image file" },
      { status: 415 }
    );
  }

  try {
    const asset = await writeClient.assets.upload("image", buffer, {
      contentType: detectedType,
      filename: file.name,
    });
    return NextResponse.json({
      url: asset.url,
      width: asset.metadata?.dimensions?.width,
      height: asset.metadata?.dimensions?.height,
      assetId: asset._id,
    });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Upload to Sanity failed" },
      { status: 500 }
    );
  }
}

function detectImageMime(buffer: Buffer): string | null {
  if (
    buffer.length >= 3 &&
    buffer[0] === 0xff &&
    buffer[1] === 0xd8 &&
    buffer[2] === 0xff
  ) {
    return "image/jpeg";
  }

  if (
    buffer.length >= 8 &&
    buffer[0] === 0x89 &&
    buffer[1] === 0x50 &&
    buffer[2] === 0x4e &&
    buffer[3] === 0x47 &&
    buffer[4] === 0x0d &&
    buffer[5] === 0x0a &&
    buffer[6] === 0x1a &&
    buffer[7] === 0x0a
  ) {
    return "image/png";
  }

  if (
    buffer.length >= 6 &&
    (buffer.subarray(0, 6).toString("ascii") === "GIF87a" ||
      buffer.subarray(0, 6).toString("ascii") === "GIF89a")
  ) {
    return "image/gif";
  }

  if (
    buffer.length >= 12 &&
    buffer.subarray(0, 4).toString("ascii") === "RIFF" &&
    buffer.subarray(8, 12).toString("ascii") === "WEBP"
  ) {
    return "image/webp";
  }

  if (isAvif(buffer)) {
    return "image/avif";
  }

  return null;
}

function isAvif(buffer: Buffer): boolean {
  if (buffer.length < 12 || buffer.subarray(4, 8).toString("ascii") !== "ftyp") {
    return false;
  }

  // The major brand at bytes 8-12 declares the actual file format.
  // Earlier versions scanned all compatible brands, which let polyglot
  // MP4/HEIC files slip through if they listed "avif" as a secondary brand.
  const majorBrand = buffer.subarray(8, 12).toString("ascii");
  return majorBrand === "avif" || majorBrand === "avis";
}
