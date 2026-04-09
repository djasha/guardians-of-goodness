#!/usr/bin/env node
/**
 * Fetches Instagram embed pages, extracts the base64 images,
 * and uploads them to Sanity, then patches each instagramPost document.
 */
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "tkfaqa7c",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN || undefined,
});

const posts = [
  { order: 1, url: "https://www.instagram.com/guardians_of_goodness/p/DHvROmNNRND/" },
  { order: 2, url: "https://www.instagram.com/guardians_of_goodness/p/DHwCe-3N72x/" },
  { order: 3, url: "https://www.instagram.com/guardians_of_goodness/p/DHTsSM1NiIs/" },
  { order: 4, url: "https://www.instagram.com/guardians_of_goodness/p/DFu8YKZNNys/" },
  { order: 5, url: "https://www.instagram.com/guardians_of_goodness/p/DF26uaGNSGL/" },
  { order: 6, url: "https://www.instagram.com/guardians_of_goodness/p/DF01XsyuFV4/" },
  { order: 7, url: "https://www.instagram.com/guardians_of_goodness/p/DNv4SQRWrUV/" },
  { order: 8, url: "https://www.instagram.com/guardians_of_goodness/p/DOUAAjuDe7G/" },
  { order: 9, url: "https://www.instagram.com/guardians_of_goodness/p/DOOx9p2DbUn/" },
  { order: 10, url: "https://www.instagram.com/guardians_of_goodness/p/DWHMxwcDAQU/" },
];

async function extractImageFromEmbed(embedUrl) {
  const res = await fetch(embedUrl + "embed/");
  const html = await res.text();

  // Find the largest base64 image (the main post image)
  const base64Matches = html.match(/data:image\/[a-z]+;base64,[A-Za-z0-9+/=]+/g);
  if (!base64Matches || base64Matches.length === 0) {
    console.log("  No base64 images found");
    return null;
  }

  // Pick the largest one (main post image)
  let largest = base64Matches[0];
  for (const m of base64Matches) {
    if (m.length > largest.length) largest = m;
  }

  // Convert to buffer
  const [header, data] = largest.split(",");
  const mimeType = header.match(/data:(image\/[a-z]+)/)?.[1] || "image/jpeg";
  const ext = mimeType.split("/")[1] === "png" ? "png" : "jpg";
  const buffer = Buffer.from(data, "base64");

  console.log(`  Extracted ${ext} image: ${(buffer.length / 1024).toFixed(0)}KB`);
  return { buffer, mimeType, ext };
}

async function uploadToSanity(buffer, filename) {
  const asset = await client.assets.upload("image", buffer, { filename });
  console.log(`  Uploaded to Sanity: ${asset._id}`);
  return asset;
}

async function main() {
  // Get all instagramPost documents
  const docs = await client.fetch('*[_type == "instagramPost"] | order(order asc) { _id, order, postUrl }');
  console.log(`Found ${docs.length} Instagram posts in Sanity\n`);

  for (const post of posts) {
    const doc = docs.find((d) => d.order === post.order);
    if (!doc) {
      console.log(`Post order ${post.order}: NOT FOUND in Sanity, skipping`);
      continue;
    }

    console.log(`Post ${post.order}: ${post.url}`);

    try {
      const image = await extractImageFromEmbed(post.url);
      if (!image) continue;

      const asset = await uploadToSanity(image.buffer, `instagram-${post.order}.${image.ext}`);

      // Patch the document with the image reference
      await client.patch(doc._id).set({
        image: {
          _type: "image",
          asset: { _type: "reference", _ref: asset._id },
        },
      }).commit();

      console.log(`  ✅ Patched document ${doc._id}\n`);
    } catch (err) {
      console.log(`  ❌ Error: ${err.message}\n`);
    }
  }

  console.log("Done!");
}

main().catch(console.error);
