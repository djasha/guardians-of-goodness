import "server-only";
import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/writeClient";

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

  if (!ALLOWED_TYPES.includes(file.type) || !ALLOWED_EXTENSIONS.test(file.name)) {
    return NextResponse.json(
      { error: `Unsupported file type: ${file.type || "unknown"}` },
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

  try {
    const asset = await writeClient.assets.upload("image", buffer, {
      contentType: file.type,
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
