# Instagram Integration — Design Spec

**Date:** 2026-04-09
**Status:** Approved
**Goal:** Replace placeholder Instagram section with real posts from @guardians_of_goodness, managed through Sanity CMS, with an optional auto-feed upgrade path via Behold.so.

## Context

The Guardians of Goodness website has an Instagram section on the homepage showing 8 placeholder images. The org is non-technical and cannot manage API credentials. Their Instagram account (@guardians_of_goodness) is public and features cat rescue stories.

## Architecture: Two-Tier Feed

### Tier 1: Sanity-Managed Curated Feed (Primary)

A new `instagramPost` document type in Sanity, allowing editors to manage which Instagram posts appear on the website.

**Schema fields:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `image` | Sanity image (with hotspot/crop) | Yes | The Instagram photo, uploaded to Sanity |
| `caption` | Text | No | The rescue story / caption text shown on hover |
| `postUrl` | URL | No | Link to the original Instagram post |
| `visible` | Boolean (default: true) | Yes | Toggle to show/hide without deleting |
| `order` | Number | No | Display order (lower = first). Falls back to creation date |

**Initial content:** Manually add their 10 best recent posts with rescue captions.

**GROQ query:**
```groq
*[_type == "instagramPost" && visible == true] | order(order asc, _createdAt desc) {
  _id,
  "image": image {
    asset-> { _id, url, metadata { dimensions, lqip } },
    hotspot, crop
  },
  caption,
  postUrl
}
```

### Tier 2: Behold.so Auto-Feed (Optional Upgrade)

A new `beholdFeedId` string field added to the existing `siteSettings` schema.

**Behavior:**
- When `beholdFeedId` is empty (default) → component fetches from Sanity instagramPost documents
- When `beholdFeedId` is set → component fetches from `https://feeds.behold.so/{feedId}` JSON endpoint
- Fallback chain: Behold API → Sanity posts → empty state with CTA to visit Instagram

**Behold JSON response structure** (for reference):
```json
{
  "media": [
    {
      "id": "...",
      "mediaUrl": "https://...",
      "thumbnailUrl": "https://...",
      "caption": "Meet Luna! She was found...",
      "permalink": "https://www.instagram.com/p/...",
      "mediaType": "IMAGE"
    }
  ]
}
```

## Component: InstagramFeed

**Location:** `src/components/home/InstagramFeed.tsx`

**Data fetching:** Server component fetches data, passes to client component for animations.

**Existing design preserved:**
- Neo-brutalist masonry grid (2 cols mobile → 3 tablet → 4 desktop)
- Large items at index 0 and 5 (span 2 cols + 2 rows)
- Staggered entrance animations with reduced-motion support
- "Follow Us" badge + @guardians_of_goodness CTA button

**New hover interaction:**
- On hover/tap, show a pink overlay (bg-primary/85) with the caption displayed as a styled quote
- Decorative open/close quotation marks above and below the text
- Caption text truncated to ~120 chars with ellipsis for long captions
- Instagram icon in corner as visual indicator it links out
- Click goes to the individual post URL (if available) or the main Instagram page

**Fallback behavior:**
1. If Behold feed ID is configured and returns data → use Behold data
2. If no Behold or it fails → use Sanity instagramPost documents
3. If no Sanity posts exist → show current placeholder images (graceful degradation)

## Site Settings Schema Update

Add to existing `siteSettings.ts`:

```typescript
defineField({
  name: "beholdFeedId",
  title: "Behold.so Feed ID (Optional)",
  type: "string",
  description: "Paste your Behold.so feed ID here to auto-sync Instagram posts. Leave empty to use manually curated posts.",
  group: "instagram",
})
```

## Real Instagram Photos for Site Design

Separately from the feed component, download high-quality cat photos from their Instagram to replace AI-generated placeholder images used as backgrounds and design elements across the site. This is a follow-up task, not part of the core Instagram feed work.

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `src/sanity/schemas/instagramPost.ts` | Create | New schema for curated posts |
| `src/sanity/schemas/index.ts` | Modify | Register instagramPost schema |
| `src/sanity/schemas/siteSettings.ts` | Modify | Add beholdFeedId field |
| `src/sanity/queries.ts` | Modify | Add INSTAGRAM_POSTS_QUERY |
| `src/sanity/types.ts` | Modify | Add InstagramPost type |
| `src/components/home/InstagramFeed.tsx` | Rewrite | Two-tier data fetching + caption overlay |
| `src/lib/instagram.ts` | Create | Behold fetch + normalize helper. Normalizes both Sanity image assets and Behold external URLs into a common `{ src, alt, caption, postUrl }` shape for the component |
| `next.config.ts` | Modify | Add Behold image domain if needed |

## Out of Scope

- Instagram API / Meta Developer credentials — not needed
- Automatic scraping — too fragile, against TOS
- Card readability improvements — tracked separately in design backlog
- Downloading real photos for site backgrounds — follow-up task

## Success Criteria

1. Instagram section shows real photos with captions from Sanity
2. Hovering a photo reveals the rescue caption as a styled quote
3. Clicking goes to the original Instagram post
4. Editors can hide/show and reorder posts in Sanity Studio
5. Pasting a Behold feed ID in Site Settings switches to auto-feed with no code changes
6. Removing the Behold ID falls back to Sanity posts seamlessly
