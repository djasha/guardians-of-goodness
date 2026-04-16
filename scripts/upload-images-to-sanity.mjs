import { createClient } from "@sanity/client";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "tkfaqa7c",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-04-09",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

if (!process.env.SANITY_API_TOKEN) {
  console.error("Missing SANITY_API_TOKEN. Export a Sanity write token before running this script.");
  process.exit(1);
}

const IMG_DIR = "/Users/Djasha/Claude COde/guardians of goodness/instagram temp pics";

// Read actual files from directory, sorted by name (timestamp order)
const files = readdirSync(IMG_DIR)
  .filter((f) => f.endsWith(".png") || f.endsWith(".jpg"))
  .sort();

console.log(`Found ${files.length} images in folder\n`);

// Map each sorted file to a Sanity post order
// Based on visual identification:
// 0: Vera (order 2), 1: Jarjeer (order 3), 2: Houdini (order 4),
// 3: Krivetka & Tartar (order 5), 4: Trisha (order 1), 5: Archibald (order 6),
// 6: Sweetest Pumpkin (order 7), 7: Yawning Ginger (order 8), 8: Inseparable Couple (order 10)
const mapping = [
  { order: 2, name: "Vera" },
  { order: 3, name: "Jarjeer" },
  { order: 4, name: "Houdini" },
  { order: 5, name: "Krivetka & Tartar" },
  { order: 1, name: "Trisha" },
  { order: 6, name: "Archibald" },
  { order: 7, name: "Sweetest Pumpkin", newCaption: "The sweetest pumpkin is looking for adoption! This gorgeous white fluffball is gentle, cuddly, and absolutely adorable." },
  { order: 8, name: "Yawning Ginger Cat", newCaption: "This playful ginger boy is full of energy and personality! Always ready for adventure and fun." },
  { order: 10, name: "Inseparable Couple" },
];

async function main() {
  const docs = await client.fetch(
    '*[_type == "instagramPost"] | order(order asc) { _id, order, caption }'
  );
  console.log(`Found ${docs.length} posts in Sanity\n`);

  for (let i = 0; i < Math.min(files.length, mapping.length); i++) {
    const file = files[i];
    const map = mapping[i];
    const doc = docs.find((d) => d.order === map.order);

    if (!doc) {
      console.log(`Order ${map.order} (${map.name}): No document found, skipping`);
      continue;
    }

    const filePath = join(IMG_DIR, file);
    console.log(`Uploading ${map.name} (order ${map.order}): ${file}`);

    try {
      const buffer = readFileSync(filePath);
      const asset = await client.assets.upload("image", buffer, {
        filename: `instagram-${map.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}.png`,
      });
      console.log(`  Asset uploaded: ${asset._id} (${(buffer.length / 1024).toFixed(0)}KB)`);

      const patchData = {
        image: {
          _type: "image",
          asset: { _type: "reference", _ref: asset._id },
        },
      };

      if (map.newCaption) {
        patchData.caption = map.newCaption;
      }

      await client.patch(doc._id).set(patchData).commit();
      console.log(`  ✅ Done\n`);
    } catch (err) {
      console.log(`  ❌ Error: ${err.message}\n`);
    }
  }

  console.log("All images uploaded!");
}

main().catch(console.error);
