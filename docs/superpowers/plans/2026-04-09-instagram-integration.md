# Instagram Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the placeholder Instagram section with real curated posts from Sanity CMS, with an optional auto-feed upgrade via Behold.so.

**Architecture:** New `instagramPost` Sanity schema stores curated posts (image, caption, URL, visibility toggle). A helper module (`instagram.ts`) normalizes data from either Sanity or Behold into a common shape. The homepage fetches data server-side and passes it to the client InstagramFeed component for animation.

**Tech Stack:** Next.js 16 (App Router), Sanity CMS, TypeScript, Tailwind CSS, Motion (Framer Motion)

**Spec:** `docs/superpowers/specs/2026-04-09-instagram-integration-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `src/sanity/schemas/instagramPost.ts` | Create | Sanity document schema for curated Instagram posts |
| `src/sanity/schemas/index.ts` | Modify | Register the new schema |
| `src/sanity/schemas/siteSettings.ts` | Modify | Add `beholdFeedId` optional field |
| `src/sanity/queries.ts` | Modify | Add `INSTAGRAM_POSTS_QUERY` and extend `SITE_SETTINGS_QUERY` |
| `src/sanity/types.ts` | Modify | Add `InstagramPost` type and update `SiteSettings` |
| `src/lib/instagram.ts` | Create | Fetch + normalize posts from Sanity or Behold into common shape |
| `src/components/home/InstagramFeed.tsx` | Rewrite | Server data fetching + client grid with caption overlay |
| `src/app/page.tsx` | Modify | Pass fetched Instagram data to InstagramFeed |
| `next.config.ts` | Modify | Add Behold image domain |

---

### Task 1: Create the instagramPost Sanity schema

**Files:**
- Create: `src/sanity/schemas/instagramPost.ts`
- Modify: `src/sanity/schemas/index.ts`

- [ ] **Step 1: Create the schema file**

```typescript
// src/sanity/schemas/instagramPost.ts
import { defineType, defineField } from "sanity";

export default defineType({
  name: "instagramPost",
  title: "Instagram Post",
  type: "document",
  icon: () => "📸",
  fields: [
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "text",
      rows: 4,
      description: "The rescue story or caption text. Shown as a quote overlay on hover.",
    }),
    defineField({
      name: "postUrl",
      title: "Instagram Post URL",
      type: "url",
      description: "Link to the original Instagram post.",
    }),
    defineField({
      name: "visible",
      title: "Visible",
      type: "boolean",
      initialValue: true,
      description: "Toggle off to hide this post without deleting it.",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first. Leave empty to sort by date added.",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "caption",
      media: "image",
      visible: "visible",
    },
    prepare({ title, media, visible }) {
      return {
        title: title ? title.substring(0, 60) + (title.length > 60 ? "…" : "") : "No caption",
        subtitle: visible === false ? "🔴 Hidden" : "🟢 Visible",
        media,
      };
    },
  },
});
```

- [ ] **Step 2: Register the schema**

In `src/sanity/schemas/index.ts`, add the import and register it:

```typescript
import cat from "./cat";
import partner from "./partner";
import article from "./article";
import siteSettings from "./siteSettings";
import formSubmission from "./formSubmission";
import instagramPost from "./instagramPost";

export const schemaTypes = [cat, partner, article, siteSettings, formSubmission, instagramPost];
```

- [ ] **Step 3: Verify Sanity Studio loads**

Run: `cd guardians-of-goodness && npx next dev`

Open Sanity Studio (usually at `/studio`). Confirm "Instagram Post" appears as a document type in the sidebar. Create a test post with any image and caption to verify the schema works. Delete the test post afterward.

- [ ] **Step 4: Commit**

```bash
git add src/sanity/schemas/instagramPost.ts src/sanity/schemas/index.ts
git commit -m "feat: add instagramPost Sanity schema"
```

---

### Task 2: Add Behold feed ID to Site Settings

**Files:**
- Modify: `src/sanity/schemas/siteSettings.ts`

- [ ] **Step 1: Add the beholdFeedId field**

Add this field after the `socialLinks` field in `src/sanity/schemas/siteSettings.ts`:

```typescript
defineField({
  name: "beholdFeedId",
  title: "Behold.so Feed ID (Optional)",
  type: "string",
  description:
    "Paste your Behold.so feed ID here to auto-sync Instagram posts. Leave empty to use manually curated posts below.",
}),
```

The full fields array becomes (showing context around the insertion point):

```typescript
fields: [
    defineField({
      name: "heroHeading",
      title: "Hero Heading",
      type: "string",
    }),
    defineField({
      name: "heroSubtext",
      title: "Hero Subtext",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({
          name: "facebook",
          title: "Facebook",
          type: "url",
        }),
        defineField({
          name: "instagram",
          title: "Instagram",
          type: "url",
        }),
        defineField({
          name: "linkedin",
          title: "LinkedIn",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "beholdFeedId",
      title: "Behold.so Feed ID (Optional)",
      type: "string",
      description:
        "Paste your Behold.so feed ID here to auto-sync Instagram posts. Leave empty to use manually curated posts below.",
    }),
    defineField({
      name: "impactStats",
      // ... rest unchanged
```

- [ ] **Step 2: Commit**

```bash
git add src/sanity/schemas/siteSettings.ts
git commit -m "feat: add beholdFeedId field to site settings"
```

---

### Task 3: Add types and queries

**Files:**
- Modify: `src/sanity/types.ts`
- Modify: `src/sanity/queries.ts`

- [ ] **Step 1: Add InstagramPost type and update SiteSettings**

Append to the bottom of `src/sanity/types.ts`:

```typescript
/** Normalized Instagram post for the feed component */
export interface InstagramPost {
  _id: string;
  image: {
    asset: {
      _id: string;
      url: string;
      metadata?: {
        dimensions?: { width: number; height: number };
        lqip?: string;
      };
    };
    hotspot?: { x: number; y: number };
    crop?: { top: number; bottom: number; left: number; right: number };
  };
  caption?: string;
  postUrl?: string;
}
```

Update the `SiteSettings` interface to include `beholdFeedId`:

```typescript
export interface SiteSettings {
  email?: string;
  address?: string;
  phone?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  beholdFeedId?: string;
  impactStats?: {
    label: string;
    value: number;
    suffix?: string;
  }[];
  heroHeading?: string;
  heroSubtext?: string;
}
```

- [ ] **Step 2: Add INSTAGRAM_POSTS_QUERY and update SITE_SETTINGS_QUERY**

Add to `src/sanity/queries.ts`:

```typescript
export const INSTAGRAM_POSTS_QUERY = groq`
  *[_type == "instagramPost" && visible == true] | order(order asc, _createdAt desc) {
    _id,
    image {
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      hotspot,
      crop
    },
    caption,
    postUrl
  }
`;
```

Update the existing `SITE_SETTINGS_QUERY` to include `beholdFeedId`:

```typescript
export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    email,
    address,
    phone,
    socialLinks {
      facebook,
      instagram,
      linkedin
    },
    beholdFeedId,
    impactStats[] {
      label,
      value,
      suffix
    },
    heroHeading,
    heroSubtext
  }
`;
```

- [ ] **Step 3: Commit**

```bash
git add src/sanity/types.ts src/sanity/queries.ts
git commit -m "feat: add Instagram types and queries"
```

---

### Task 4: Create the instagram helper module

**Files:**
- Create: `src/lib/instagram.ts`

- [ ] **Step 1: Create the fetch + normalize helper**

```typescript
// src/lib/instagram.ts
import { client } from "@/sanity/client";
import { INSTAGRAM_POSTS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/queries";
import type { InstagramPost, SiteSettings } from "@/sanity/types";

/** Shape consumed by the InstagramFeed component */
export interface NormalizedPost {
  id: string;
  src: string;
  lqip?: string;
  alt: string;
  caption?: string;
  postUrl: string;
  /** True when image is a Sanity asset (use next/image with sanity domain) */
  isSanityImage: boolean;
}

/** Behold API response shape */
interface BeholdMedia {
  id: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  caption?: string;
  permalink: string;
  mediaType: string;
}

interface BeholdResponse {
  media: BeholdMedia[];
}

const INSTAGRAM_URL = "https://www.instagram.com/guardians_of_goodness/";

async function fetchBehold(feedId: string): Promise<NormalizedPost[]> {
  const res = await fetch(`https://feeds.behold.so/${feedId}`, {
    next: { revalidate: 3600 }, // cache for 1 hour
  });

  if (!res.ok) return [];

  const data: BeholdResponse = await res.json();

  return data.media
    .filter((m) => m.mediaType === "IMAGE" || m.mediaType === "CAROUSEL_ALBUM")
    .slice(0, 12)
    .map((m) => ({
      id: m.id,
      src: m.mediaUrl,
      alt: m.caption ? m.caption.substring(0, 80) : "Instagram post",
      caption: m.caption ?? undefined,
      postUrl: m.permalink,
      isSanityImage: false,
    }));
}

function normalizeSanityPosts(posts: InstagramPost[]): NormalizedPost[] {
  return posts.map((p) => ({
    id: p._id,
    src: p.image.asset.url,
    lqip: p.image.asset.metadata?.lqip,
    alt: p.caption ? p.caption.substring(0, 80) : "Instagram post",
    caption: p.caption ?? undefined,
    postUrl: p.postUrl || INSTAGRAM_URL,
    isSanityImage: true,
  }));
}

/**
 * Fetches Instagram posts using the two-tier strategy:
 * 1. If beholdFeedId is set in site settings, fetch from Behold
 * 2. Otherwise, fetch curated posts from Sanity
 * Returns empty array if both fail.
 */
export async function getInstagramPosts(): Promise<NormalizedPost[]> {
  try {
    // Check if Behold is configured
    const settings = await client.fetch<SiteSettings>(SITE_SETTINGS_QUERY);

    if (settings?.beholdFeedId) {
      const beholdPosts = await fetchBehold(settings.beholdFeedId);
      if (beholdPosts.length > 0) return beholdPosts;
      // Fall through to Sanity if Behold fails
    }

    // Fetch from Sanity curated posts
    const sanityPosts = await client.fetch<InstagramPost[]>(INSTAGRAM_POSTS_QUERY);
    if (sanityPosts && sanityPosts.length > 0) {
      return normalizeSanityPosts(sanityPosts);
    }

    return [];
  } catch {
    return [];
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/instagram.ts
git commit -m "feat: add instagram fetch + normalize helper"
```

---

### Task 5: Add Behold image domain to Next.js config

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: Add feeds.behold.so and scontent patterns**

Update `next.config.ts` to allow Behold image URLs:

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
      {
        protocol: "https",
        hostname: "**.cdninstagram.com",
      },
      {
        protocol: "https",
        hostname: "feeds.behold.so",
      },
    ],
  },
};

export default nextConfig;
```

- [ ] **Step 2: Commit**

```bash
git add next.config.ts
git commit -m "feat: add Behold and Instagram image domains to next config"
```

---

### Task 6: Rewrite the InstagramFeed component

**Files:**
- Rewrite: `src/components/home/InstagramFeed.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Rewrite InstagramFeed as a client component that accepts data props**

Replace the entire contents of `src/components/home/InstagramFeed.tsx`:

```typescript
"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { SOCIAL } from "@/lib/constants";
import type { NormalizedPost } from "@/lib/instagram";

// Fallback placeholders when no data is available
const fallbackImages = [
  { src: "/images/generated/hero-cat-hd.jpg", alt: "Rescue cat portrait" },
  { src: "/images/generated/hero-cat-cinematic.jpg", alt: "Cat close-up" },
  { src: "/images/generated/gentle-cat.jpg", alt: "Ginger cat relaxing" },
  { src: "/images/generated/cat-group.jpg", alt: "Cat on stairs" },
  { src: "/images/generated/rescue-cat.jpg", alt: "Kitten being held" },
  { src: "/images/content/cat-photo.jpg", alt: "Cats at shelter" },
  { src: "/images/cats/cat-card-1.png", alt: "Cat for adoption" },
  { src: "/images/cats/cat-card-2.png", alt: "Cat for adoption" },
];

function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return text.substring(0, max).replace(/\s+\S*$/, "") + "…";
}

interface Props {
  posts?: NormalizedPost[];
}

export function InstagramFeed({ posts }: Props) {
  const reduced = useReducedMotion();
  const hasPosts = posts && posts.length > 0;

  // Use real posts or fallback
  const items = hasPosts
    ? posts.map((p) => ({
        id: p.id,
        src: p.src,
        alt: p.alt,
        caption: p.caption,
        postUrl: p.postUrl,
        isSanityImage: p.isSanityImage,
        lqip: p.lqip,
      }))
    : fallbackImages.map((img, i) => ({
        id: `fallback-${i}`,
        src: img.src,
        alt: img.alt,
        caption: undefined as string | undefined,
        postUrl: SOCIAL.instagram,
        isSanityImage: false,
        lqip: undefined as string | undefined,
      }));

  return (
    <section className="bg-cream py-20 sm:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <div className="neo-border-sm neo-shadow-sm bg-pink text-white inline-block px-4 py-1.5 mb-5">
              <span className="text-xs font-bold uppercase tracking-widest">
                Follow Us
              </span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-black text-dark leading-tight">
              See our daily rescue stories on{" "}
              <span className="text-primary">Instagram</span>
            </h2>
          </div>
          <a
            href={SOCIAL.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="neo-border neo-shadow neo-hover bg-white px-6 py-3 font-bold text-sm text-dark inline-flex items-center gap-2 self-start"
          >
            <svg
              className="w-5 h-5 text-pink"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
            </svg>
            @guardians_of_goodness
          </a>
        </div>
      </div>

      {/* Photo grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {items.map((item, i) => {
            const W = reduced ? "div" : motion.div;
            const isLarge = i === 0 || i === 5;
            return (
              <W
                key={item.id}
                {...(!reduced && {
                  initial: { opacity: 0, y: 15 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.2 },
                  transition: { duration: 0.4, delay: i * 0.05 },
                })}
                className={isLarge ? "sm:col-span-2 sm:row-span-2" : ""}
              >
                <a
                  href={item.postUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neo-border neo-shadow-sm neo-hover block overflow-hidden relative group aspect-square"
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes={
                      isLarge
                        ? "(max-width: 640px) 100vw, 50vw"
                        : "(max-width: 640px) 50vw, 25vw"
                    }
                    {...(item.lqip && {
                      placeholder: "blur" as const,
                      blurDataURL: item.lqip,
                    })}
                    {...(!item.isSanityImage &&
                      !item.src.startsWith("/") && {
                        unoptimized: true,
                      })}
                  />

                  {/* Hover overlay with caption */}
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/85 transition-colors duration-300 flex items-center justify-center p-4">
                    {item.caption ? (
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center text-white max-w-[90%]">
                        <span className="block text-3xl leading-none mb-2">
                          &ldquo;
                        </span>
                        <p className="text-sm sm:text-base font-medium leading-relaxed italic">
                          {truncate(item.caption, 120)}
                        </p>
                        <span className="block text-3xl leading-none mt-2">
                          &rdquo;
                        </span>
                      </div>
                    ) : (
                      <svg
                        className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63z" />
                      </svg>
                    )}
                  </div>
                </a>
              </W>
            );
          })}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Update the homepage to fetch and pass data**

Update `src/app/page.tsx` to fetch Instagram posts server-side:

```typescript
import { Hero } from "@/components/home/Hero";
import { PhilosophyPillars } from "@/components/home/PhilosophyPillars";
import { PartnersCarousel } from "@/components/home/PartnersCarousel";
import { ImpactStats } from "@/components/home/ImpactStats";
import { JoinCTA } from "@/components/home/JoinCTA";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { getInstagramPosts } from "@/lib/instagram";

export default async function HomePage() {
  const instagramPosts = await getInstagramPosts();

  return (
    <>
      <Hero />
      <PhilosophyPillars />
      <PartnersCarousel />
      <ImpactStats />
      <InstagramFeed posts={instagramPosts} />
      <JoinCTA />
    </>
  );
}
```

- [ ] **Step 3: Verify the build compiles**

Run: `cd guardians-of-goodness && npx next build`

Expected: Build succeeds. The homepage should still show the fallback placeholder images since no Instagram posts exist in Sanity yet.

- [ ] **Step 4: Commit**

```bash
git add src/components/home/InstagramFeed.tsx src/app/page.tsx
git commit -m "feat: rewrite InstagramFeed with real data + caption overlay"
```

---

### Task 7: Manual verification and add initial content

- [ ] **Step 1: Run the dev server**

Run: `cd guardians-of-goodness && npx next dev`

Open `http://localhost:3000` and scroll to the Instagram section. Confirm it renders with fallback placeholder images (since no Sanity posts exist yet).

- [ ] **Step 2: Add a test Instagram post via Sanity Studio**

Open Sanity Studio. Create one "Instagram Post" document:
- Upload any cat image
- Caption: "Meet our latest rescue! This little one was found abandoned..."
- Post URL: `https://www.instagram.com/guardians_of_goodness/`
- Visible: true
- Order: 1

Publish the document.

- [ ] **Step 3: Verify the real post appears**

Refresh the homepage. The Instagram section should now show:
- The 1 real post from Sanity (with caption overlay on hover)
- The remaining grid slots should be empty or only show the 1 post

Hover over the post — verify the caption appears as a styled quote with quotation marks.

- [ ] **Step 4: Test the visibility toggle**

In Sanity Studio, toggle the test post's "Visible" to false and publish. Refresh the homepage — the post should disappear and fallback images should return.

Toggle it back to true and publish.

- [ ] **Step 5: Final commit with any fixes**

If any adjustments were needed during testing:

```bash
git add -u
git commit -m "fix: adjust InstagramFeed after manual testing"
```

---

### Task 8: Add the initial 10 curated posts

This is a content task. Visit https://www.instagram.com/guardians_of_goodness/ and select 10 posts that:
- Feature cat photos (not graphics/flyers)
- Have good rescue story captions
- Are recent and representative

- [ ] **Step 1: Download images and add to Sanity**

For each of the 10 selected posts:
1. Save the image from Instagram
2. In Sanity Studio, create a new "Instagram Post" document
3. Upload the image
4. Copy the caption text
5. Copy the Instagram post URL (right-click post → "Copy link")
6. Set visible to true
7. Set order (1–10)
8. Publish

- [ ] **Step 2: Verify all 10 posts render**

Refresh the homepage. The Instagram grid should show all 10 real posts with their rescue captions on hover. The masonry layout should have 2 large items (positions 0 and 5) and 8 regular items.

- [ ] **Step 3: Take a screenshot and verify design quality**

Check that:
- Images fill their grid cells properly
- Caption overlay is readable (white text on pink/primary overlay)
- Quotation marks render correctly
- Links open the correct Instagram posts
- Hover animation is smooth

---

## Summary

| Task | What it does | Commit message |
|------|-------------|----------------|
| 1 | Sanity instagramPost schema | `feat: add instagramPost Sanity schema` |
| 2 | Behold feed ID in site settings | `feat: add beholdFeedId field to site settings` |
| 3 | Types + GROQ queries | `feat: add Instagram types and queries` |
| 4 | Fetch + normalize helper | `feat: add instagram fetch + normalize helper` |
| 5 | Next.js image domains | `feat: add Behold and Instagram image domains to next config` |
| 6 | Component rewrite + homepage wiring | `feat: rewrite InstagramFeed with real data + caption overlay` |
| 7 | Manual verification | `fix: adjust InstagramFeed after manual testing` |
| 8 | Add 10 curated posts | Content task — no code commit |
