# Sanity Best Practices Audit & Fix Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all issues found by auditing against all 4 Sanity official skills (schema best practices, content modeling, SEO/AEO, content experimentation).

**Architecture:** Fixes grouped by impact — SEO-critical files first (sitemap, robots, JSON-LD, metadata), then schema quality (defineArrayMember, icons, SEO fields, alt text), then fetch revalidation tags. Each task is independent and produces a working commit.

**Tech Stack:** Next.js 16 App Router, Sanity v5, TypeScript, @sanity/icons, @sanity/image-url

---

## Audit Summary

### Critical (SEO — nonprofit needs to be findable)
- **No `sitemap.ts`** — search engines can't discover pages
- **No `robots.ts`** — no crawl directives
- **No JSON-LD structured data** — no Organization, Article, or BreadcrumbList schema
- **Homepage has NO metadata export** — missing title/description for Google
- **No canonical URLs** — duplicate content risk
- **Incomplete Open Graph tags** — no OG image, locale, or twitter card on root layout

### High (Schema Quality)
- **Missing `defineArrayMember`** — arrays in cat, article, siteSettings use plain objects instead of `defineArrayMember()`
- **No `@sanity/icons`** — schemas use emoji functions or nothing; should use proper icons
- **No SEO fields on schemas** — cat and article have no seoTitle/seoDescription override
- **No image alt text fields** — photos, coverImage, logo all lack alt text
- **`urlFor` helper exists but is never used** — all queries use raw `.asset->url`

### Medium (Performance/Revalidation)
- **No fetch revalidation tags** — `client.fetch()` calls don't pass `next: { tags }`, so the revalidation webhook has nothing to invalidate
- **Missing `_key` in array projections** — breaks React reconciliation and Visual Editing

### Low (Content Modeling)
- **No author on articles** — hurts EEAT credibility
- **Validation gaps** — no max-length on titles, no email validation on siteSettings

---

## File Structure

**Create:**
- `src/app/sitemap.ts` — dynamic sitemap from Sanity
- `src/app/robots.ts` — crawl rules
- `src/lib/jsonLd.ts` — JSON-LD helper functions
- `src/sanity/schemas/shared/seoFields.ts` — reusable SEO fields

**Modify:**
- `src/app/layout.tsx` — add OG defaults, canonical, twitter card, JSON-LD
- `src/app/page.tsx` — add metadata export + Organization JSON-LD
- `src/app/catalogue/[slug]/page.tsx` — add JSON-LD, improve OG
- `src/app/education/[slug]/page.tsx` — add Article JSON-LD, improve OG
- `src/sanity/schemas/cat.ts` — defineArrayMember, icon, SEO fields, alt text
- `src/sanity/schemas/article.ts` — defineArrayMember, icon, SEO fields, alt text, author
- `src/sanity/schemas/siteSettings.ts` — icon, validation
- `src/sanity/schemas/partner.ts` — icon, alt text
- `src/sanity/schemas/instagramPost.ts` — icon
- `src/sanity/schemas/formSubmission.ts` — icon
- `src/sanity/queries.ts` — add _key projections, SEO fields
- `src/sanity/types.ts` — update types for new fields
- `src/app/catalogue/page.tsx` — add revalidation tags to fetch
- `src/app/catalogue/[slug]/page.tsx` — add revalidation tags
- `src/app/education/page.tsx` — add revalidation tags
- `src/app/education/[slug]/page.tsx` — add revalidation tags
- `src/app/page.tsx` — add revalidation tags

---

### Task 1: Create sitemap.ts

**Files:**
- Create: `src/app/sitemap.ts`

- [ ] **Step 1: Create dynamic sitemap**

```typescript
// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";

const BASE_URL = "https://guardiansofgoodness.org";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/catalogue`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/consultation`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/education`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/projects/tnr`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/projects/hbs`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/support`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];

  // Dynamic: cats
  const cats = await client
    .fetch<{ slug: string; _updatedAt: string }[]>(
      `*[_type == "cat" && visible != false]{ "slug": slug.current, _updatedAt }`
    )
    .catch(() => []);

  const catPages: MetadataRoute.Sitemap = cats.map((cat) => ({
    url: `${BASE_URL}/catalogue/${cat.slug}`,
    lastModified: new Date(cat._updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dynamic: articles
  const articles = await client
    .fetch<{ slug: string; _updatedAt: string }[]>(
      `*[_type == "article" && defined(publishedAt) && publishedAt <= now()]{ "slug": slug.current, _updatedAt }`
    )
    .catch(() => []);

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/education/${article.slug}`,
    lastModified: new Date(article._updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...catPages, ...articlePages];
}
```

- [ ] **Step 2: Verify build**

Run: `npm run build` (check sitemap route compiles)

- [ ] **Step 3: Commit**

```bash
git add src/app/sitemap.ts
git commit -m "feat: add dynamic sitemap for SEO"
```

---

### Task 2: Create robots.ts

**Files:**
- Create: `src/app/robots.ts`

- [ ] **Step 1: Create robots.ts**

```typescript
// src/app/robots.ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/studio", "/api/"],
      },
    ],
    sitemap: "https://guardiansofgoodness.org/sitemap.xml",
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/app/robots.ts
git commit -m "feat: add robots.ts with studio/api exclusions"
```

---

### Task 3: Create JSON-LD helpers

**Files:**
- Create: `src/lib/jsonLd.ts`

- [ ] **Step 1: Create JSON-LD utility functions**

```typescript
// src/lib/jsonLd.ts
import { SITE, SOCIAL } from "./constants";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: SITE.name,
    url: SITE.url,
    description:
      "Nonprofit animal welfare organization in Amman, Jordan dedicated to TNR programs, humane behavior support, education, and community outreach.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Amman",
      addressRegion: "Jabal Amman",
      addressCountry: "JO",
    },
    email: SITE.email,
    sameAs: [SOCIAL.facebook, SOCIAL.instagram, SOCIAL.linkedin],
  };
}

export function articleJsonLd(article: {
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  coverImageUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    url: `${SITE.url}/education/${article.slug}`,
    ...(article.excerpt && { description: article.excerpt }),
    ...(article.publishedAt && { datePublished: article.publishedAt }),
    ...(article.coverImageUrl && { image: article.coverImageUrl }),
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
```

- [ ] **Step 2: Commit**

```bash
git add src/lib/jsonLd.ts
git commit -m "feat: add JSON-LD helpers for Organization, Article, Breadcrumb"
```

---

### Task 4: Fix root layout metadata + homepage metadata

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Update root layout metadata with OG defaults**

In `src/app/layout.tsx`, replace the existing `metadata` export with:

```typescript
export const metadata: Metadata = {
  title: {
    template: "%s | Guardians of Goodness",
    default: "Guardians of Goodness — For Animal Welfare",
  },
  description:
    "Guardians of Goodness is a nonprofit organization based in Amman, Jordan, dedicated to animal welfare through TNR programs, humane behavior support, education, and community outreach.",
  metadataBase: new URL("https://guardiansofgoodness.org"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Guardians of Goodness",
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: "/",
  },
};
```

- [ ] **Step 2: Add homepage metadata + Organization JSON-LD**

In `src/app/page.tsx`, add metadata export and JSON-LD:

```typescript
import type { Metadata } from "next";
import { organizationJsonLd } from "@/lib/jsonLd";

export const metadata: Metadata = {
  title: "Guardians of Goodness — For Animal Welfare",
  description:
    "Nonprofit animal welfare organization in Amman, Jordan. Browse rescued cats, learn about TNR programs, and join our mission.",
  alternates: { canonical: "/" },
};

// In the component return, add before <Hero />:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(organizationJsonLd()),
  }}
/>
```

- [ ] **Step 3: Commit**

```bash
git add src/app/layout.tsx src/app/page.tsx
git commit -m "feat: add OG defaults, canonical URLs, and Organization JSON-LD"
```

---

### Task 5: Add JSON-LD to article and cat detail pages

**Files:**
- Modify: `src/app/catalogue/[slug]/page.tsx`
- Modify: `src/app/education/[slug]/page.tsx`

- [ ] **Step 1: Add breadcrumb + cat JSON-LD to cat detail page**

In `src/app/catalogue/[slug]/page.tsx`, import `breadcrumbJsonLd` from `@/lib/jsonLd` and `SITE` from `@/lib/constants`. Add inside the component return before the first `<section>`:

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(breadcrumbJsonLd([
      { name: "Home", url: SITE.url },
      { name: "CATalogue", url: `${SITE.url}/catalogue` },
      { name: cat.name, url: `${SITE.url}/catalogue/${cat.slug}` },
    ])),
  }}
/>
```

Also add `alternates: { canonical: `/catalogue/${slug}` }` to the `generateMetadata` return.

- [ ] **Step 2: Add Article JSON-LD to article detail page**

In `src/app/education/[slug]/page.tsx`, import `articleJsonLd` and `breadcrumbJsonLd` from `@/lib/jsonLd`. Add inside the component return:

```typescript
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(articleJsonLd({
      title: article.title,
      slug: article.slug,
      excerpt: article.excerpt,
      publishedAt: article.publishedAt,
      coverImageUrl: article.coverImage?.asset?.url,
    })),
  }}
/>
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(breadcrumbJsonLd([
      { name: "Home", url: SITE.url },
      { name: "Education", url: `${SITE.url}/education` },
      { name: article.title, url: `${SITE.url}/education/${article.slug}` },
    ])),
  }}
/>
```

Also add `alternates: { canonical: `/education/${slug}` }` to `generateMetadata`.

- [ ] **Step 3: Commit**

```bash
git add src/app/catalogue/[slug]/page.tsx src/app/education/[slug]/page.tsx
git commit -m "feat: add JSON-LD structured data to article and cat pages"
```

---

### Task 6: Fix schemas — defineArrayMember + @sanity/icons

**Files:**
- Modify: `src/sanity/schemas/cat.ts`
- Modify: `src/sanity/schemas/article.ts`
- Modify: `src/sanity/schemas/siteSettings.ts`
- Modify: `src/sanity/schemas/partner.ts`
- Modify: `src/sanity/schemas/instagramPost.ts`
- Modify: `src/sanity/schemas/formSubmission.ts`

- [ ] **Step 1: Install @sanity/icons (check if already available)**

Run: `grep "@sanity/icons" package.json` — if not present, `npm install @sanity/icons`

(Note: `@sanity/icons` ships with `sanity` v5, so it should already be available. Verify with `ls node_modules/@sanity/icons`.)

- [ ] **Step 2: Fix cat.ts**

Add imports at top:
```typescript
import { defineType, defineField, defineArrayMember } from "sanity";
import { CatIcon } from "@sanity/icons"; // or use a suitable icon
```

Add `icon` to the type:
```typescript
export default defineType({
  name: "cat",
  title: "Cat",
  type: "document",
  icon: CatIcon, // Add this line
```

Change `photos` array to use defineArrayMember:
```typescript
of: [defineArrayMember({ type: "image", options: { hotspot: true } })],
```

Change `tags` array:
```typescript
of: [defineArrayMember({ type: "string" })],
```

- [ ] **Step 3: Fix article.ts**

Add imports:
```typescript
import { defineType, defineField, defineArrayMember } from "sanity";
import { DocumentTextIcon } from "@sanity/icons";
```

Add icon, fix arrays:
```typescript
icon: DocumentTextIcon,
// body array:
of: [
  defineArrayMember({ type: "block" }),
  defineArrayMember({ type: "image", options: { hotspot: true } }),
],
// tags array:
of: [defineArrayMember({ type: "string" })],
```

- [ ] **Step 4: Fix siteSettings.ts**

```typescript
import { CogIcon } from "@sanity/icons";
// Add icon:
icon: CogIcon,
// impactStats array of: use defineArrayMember
```

- [ ] **Step 5: Fix partner.ts, instagramPost.ts, formSubmission.ts**

```typescript
// partner.ts
import { UsersIcon } from "@sanity/icons";
icon: UsersIcon,

// instagramPost.ts — replace emoji icon
import { ImageIcon } from "@sanity/icons";
icon: ImageIcon,
// Remove: icon: () => "📸",

// formSubmission.ts
import { EnvelopeIcon } from "@sanity/icons";
icon: EnvelopeIcon,
```

- [ ] **Step 6: Commit**

```bash
git add src/sanity/schemas/
git commit -m "fix: add defineArrayMember and @sanity/icons to all schemas"
```

---

### Task 7: Add SEO fields + alt text to schemas

**Files:**
- Create: `src/sanity/schemas/shared/seoFields.ts`
- Modify: `src/sanity/schemas/cat.ts`
- Modify: `src/sanity/schemas/article.ts`

- [ ] **Step 1: Create shared SEO fields**

```typescript
// src/sanity/schemas/shared/seoFields.ts
import { defineField } from "sanity";

export const seoFields = [
  defineField({
    name: "seoTitle",
    title: "SEO Title",
    type: "string",
    group: "seo",
    description: "Override the page title for search engines. Leave empty to use the default.",
    validation: (rule) =>
      rule.max(60).warning("Keep under 60 characters for best search results"),
  }),
  defineField({
    name: "seoDescription",
    title: "SEO Description",
    type: "text",
    group: "seo",
    rows: 3,
    description: "Override the page description for search engines. Leave empty to use the default.",
    validation: (rule) =>
      rule.max(160).warning("Keep under 160 characters for best search results"),
  }),
];
```

- [ ] **Step 2: Add SEO fields to cat schema**

Add a new group and fieldset at the end of the `cat` schema:

```typescript
groups: [
  // Add to existing fieldsets concept — use a group for SEO
  { name: "seo", title: "SEO", hidden: true },
],
```

Actually for cat.ts which uses fieldsets, add a new fieldset:

```typescript
{
  name: "seo",
  title: "SEO",
  description: "Override how this cat appears in Google search results.",
  options: { collapsible: true, collapsed: true },
},
```

Then spread `seoFields` into the fields array (remove `group: "seo"` and add `fieldset: "seo"`):

```typescript
defineField({
  name: "seoTitle",
  title: "SEO Title",
  type: "string",
  fieldset: "seo",
  description: "Override the page title for search engines. Leave empty to use the cat's name.",
  validation: (rule) => rule.max(60).warning("Keep under 60 characters for best search results"),
}),
defineField({
  name: "seoDescription",
  title: "SEO Description",
  type: "text",
  fieldset: "seo",
  rows: 3,
  description: "Override the page description. Leave empty to use the cat's description.",
  validation: (rule) => rule.max(160).warning("Keep under 160 characters for best search results"),
}),
```

- [ ] **Step 3: Add SEO fields to article schema**

Add group and fields to `article.ts`. Articles use groups, so add:

```typescript
groups: [
  { name: "content", title: "Content", default: true },
  { name: "seo", title: "SEO" },
],
```

Assign existing fields to `content` group, then add SEO fields to `seo` group.

- [ ] **Step 4: Add image alt text fields**

For `cat.ts` photos array, change the image type to include alt:

```typescript
defineArrayMember({
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      description: "Describe the photo for accessibility (e.g. 'Orange tabby cat playing with a toy')",
    }),
  ],
}),
```

For `article.ts` coverImage:

```typescript
defineField({
  name: "coverImage",
  title: "Cover Image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alt Text",
      type: "string",
      description: "Describe the image for accessibility and SEO",
    }),
  ],
}),
```

- [ ] **Step 5: Commit**

```bash
git add src/sanity/schemas/
git commit -m "feat: add SEO fields and image alt text to cat and article schemas"
```

---

### Task 8: Add revalidation tags to all fetch calls

**Files:**
- Modify: `src/app/catalogue/page.tsx`
- Modify: `src/app/catalogue/[slug]/page.tsx`
- Modify: `src/app/education/[slug]/page.tsx`
- Modify: `src/app/page.tsx`

- [ ] **Step 1: Add tags to catalogue page fetches**

In `src/app/catalogue/page.tsx`, change the fetch calls:

```typescript
const [cats, stats] = await Promise.all([
  client.fetch<Cat[]>(ALL_CATS_QUERY, {}, {
    signal: AbortSignal.timeout(10000),
    next: { tags: ["cat"] },
  }).catch(() => null),
  client.fetch<CatalogueStats>(CATALOGUE_STATS_QUERY, {}, {
    signal: AbortSignal.timeout(5000),
    next: { tags: ["cat"] },
  }).catch(() => undefined),
]);
```

- [ ] **Step 2: Add tags to cat detail page fetches**

In `src/app/catalogue/[slug]/page.tsx`, all `client.fetch` calls should include `{ next: { tags: ["cat"] } }`.

- [ ] **Step 3: Add tags to article page fetches**

In `src/app/education/[slug]/page.tsx`, all `client.fetch` calls should include `{ next: { tags: ["article"] } }`.

- [ ] **Step 4: Add tags to homepage fetches**

In `src/app/page.tsx`, the `getInstagramPosts()` call — check its implementation and add tags. Also any other fetch calls on the page.

- [ ] **Step 5: Commit**

```bash
git add src/app/
git commit -m "feat: add revalidation tags to all Sanity fetch calls"
```

---

### Task 9: Update queries — add _key to array projections + SEO fields

**Files:**
- Modify: `src/sanity/queries.ts`
- Modify: `src/sanity/types.ts`

- [ ] **Step 1: Update CAT_BY_SLUG_QUERY to include _key and SEO fields**

```groq
photos[] {
  _key,
  asset-> { ... },
  alt
},
// Add at end:
seoTitle,
seoDescription,
```

- [ ] **Step 2: Update ARTICLE_BY_SLUG_QUERY similarly**

Add `_key` to body array projection, add `seoTitle`, `seoDescription`, and `"coverImageAlt": coverImage.alt`.

- [ ] **Step 3: Update types.ts**

Add to `CatDetail`:
```typescript
seoTitle?: string;
seoDescription?: string;
```

Add to `Article`:
```typescript
seoTitle?: string;
seoDescription?: string;
```

Update photos type to include `_key` and `alt`:
```typescript
photos: {
  _key: string;
  asset: { ... };
  alt?: string;
}[];
```

- [ ] **Step 4: Update generateMetadata to use SEO fields**

In cat detail page's `generateMetadata`:
```typescript
title: cat.seoTitle || cat.name,
description: cat.seoDescription || cat.description || `Meet ${cat.name}...`,
```

In article page's `generateMetadata`:
```typescript
title: article.seoTitle || article.title,
description: article.seoDescription || article.excerpt || `Read "${article.title}"...`,
```

- [ ] **Step 5: Commit**

```bash
git add src/sanity/queries.ts src/sanity/types.ts src/app/catalogue/[slug]/page.tsx src/app/education/[slug]/page.tsx
git commit -m "feat: add _key projections, SEO field support in queries and metadata"
```

---

### Task 10: Add validation improvements

**Files:**
- Modify: `src/sanity/schemas/article.ts`
- Modify: `src/sanity/schemas/siteSettings.ts`

- [ ] **Step 1: Add validation to article title**

```typescript
defineField({
  name: "title",
  title: "Title",
  type: "string",
  validation: (rule) => rule.required().max(100),
}),
```

- [ ] **Step 2: Add email validation to siteSettings**

```typescript
defineField({
  name: "email",
  title: "Email",
  type: "string",
  description: "Contact email shown in the footer and contact page.",
  validation: (rule) => rule.email(),
}),
```

- [ ] **Step 3: Add excerpt max-length warning to article**

```typescript
defineField({
  name: "excerpt",
  title: "Excerpt",
  type: "text",
  rows: 3,
  validation: (rule) => rule.max(200).warning("Keep under 200 characters for best SEO"),
}),
```

- [ ] **Step 4: Commit**

```bash
git add src/sanity/schemas/article.ts src/sanity/schemas/siteSettings.ts
git commit -m "fix: add validation rules to article and siteSettings schemas"
```

---

### Task 11: Build verification

- [ ] **Step 1: Run build**

```bash
npm run build
```

Expected: Clean build with no errors.

- [ ] **Step 2: Run lint**

```bash
npm run lint
```

Expected: No new lint errors.

- [ ] **Step 3: Verify sitemap output**

Start dev server, check `http://localhost:3000/sitemap.xml` renders valid XML.

- [ ] **Step 4: Verify robots.txt output**

Check `http://localhost:3000/robots.txt` shows correct rules.

- [ ] **Step 5: Final commit if any fixes needed**

```bash
git add -A
git commit -m "fix: resolve build/lint issues from audit fixes"
```
