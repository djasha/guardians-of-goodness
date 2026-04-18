@AGENTS.md

# Guardians of Goodness

Cat rescue nonprofit website — Next.js 16 + Sanity CMS + Tailwind 4, deployed on Vercel.

## Quick Reference

- **Repo:** github.com/djasha/guardians-of-goodness
- **Live site:** guardians-of-goodness.vercel.app (auto-deploys from main)
- **Sanity project:** tkfaqa7c / production dataset
- **Studio:** embedded at /studio route (login with Google)
- **Database:** Sanity Content Lake — no separate database needed. Stores cats, form submissions, articles, partners, settings, and Instagram posts.
- **Active code:** `src/` only — ignore `src-template-v1/` and `src-template-v2-brutalist/`

## Critical Rules

1. **Next.js 16 has breaking changes.** `revalidateTag(tag, "max")` takes 2 args. `params` is a Promise. Check `node_modules/next/dist/docs/` before assuming APIs match training data.
2. **No custom SVG illustrations.** Use `lucide-react` for all icons. Custom paw/cat SVGs were explicitly rejected as amateur.
3. **`writeClient` is server-only.** It lives in `src/sanity/writeClient.ts` with an `import "server-only"` guard. `draftReadClient` also lives there and uses Sanity `perspective: "raw"` for admin/editor reads that must see `drafts.<id>`. The public read client is in `src/sanity/client.ts` (barrel re-export from `lib/client.ts`).
4. **Sanity read client:** `useCdn: true` in development (fast), `useCdn: false` in production (tag-based revalidation via `/api/revalidate`).
5. **The end user is non-technical.** She manages from her phone. Any admin UX must be as simple as posting to Instagram. All Studio fields have friendly descriptions.
6. **Forms save to Sanity + send email via Resend.** Single endpoint at `POST /api/form`. Zod validation runs on both client and server.
7. **Design system:** Dark mystical cat sanctuary theme + neo-brutalist. Purple (#9b4dca) primary, teal (#4ecdc4) secondary, dark (#1a1a2e). Two themes: default (cream bg) and mystical (dark bg). CSS variables throughout — no hardcoded hex in components.
8. **No purple hero blocks.** Catalogue pages blend with the page background. Stats use subtle inline text with dots, not flashy colored pills.
9. **Sanity webhook** configured at `/api/revalidate` — content changes auto-revalidate the site. Secret: `REVALIDATION_SECRET` env var.
10. **Touch targets ≥ 44 px on mobile + tablet**, compact at `lg` (1024+). Button-shaped CTAs use `min-h-11 lg:min-h-0`; icon buttons use `w-11 h-11 lg:w-9 lg:h-9`. Full rules + the `inline-flex` wrapper gotcha in [docs/mobile-standards.md](docs/mobile-standards.md).

## Database

**Sanity Content Lake** is the only database. It stores everything:
- **cat** — 9 real cats with Instagram photos, progressive disclosure fieldsets
- **formSubmission** — adoption inquiries, consultations, join-us forms
- **article** — blog/education posts with Portable Text body
- **partner** — vet clinic partners
- **siteSettings** — singleton for hero text, contact info, social links, impact stats
- **instagramPost** — curated Instagram feed posts

Free tier: 100K API requests/month, 500K documents, 20GB assets. More than enough.

## Studio Tools

Custom plugins at `/studio`:
- **Dashboard** — stats overview + quick action guide
- **Status Board** — click to cycle cat status (available → pending → adopted)
- **Bulk Add** — upload multiple photos, batch create cats (auto-generates slugs)
- **Content** — standard Sanity desk with filtered cat lists + message inbox
- **Presentation** — live preview + click-to-edit for every page singleton, cat, article, and landingPage. Landing pages show an "Open in Page Builder" deep link to `/admin/editor/[id-or-slug]`.

## Page Builder (Puck)

Visual drag-and-drop editor for marketing/campaign pages. Lives on top of the Sanity `landingPage` document.

- **Package:** `@puckeditor/core` (NOT the deprecated `@measured/puck`).
- **Admin dashboard:** `/admin` — lists all landingPages, click-through to editor.
- **Editor:** `/admin/editor/[id-or-slug]` — dashboard and Studio links use Sanity document `_id`; slug fallback still works for old bookmarks.
- **Public render:** `/(site)/[...path]` and legacy `/(site)/p/[slug]` both run `resolveAllData` with the server-safe Puck config before `<Render>`.
- **API:** `GET/PUT /api/puck/[id-or-slug]` — PUT caps body at 1MB, calls `revalidateTag(\`landingPage:\${slug}\`, "max")` so saves appear immediately (no webhook latency).
- **Auth:** `/admin/*` and `/api/puck/*` gated by `proxy.ts` Basic auth (env: `ADMIN_PASSWORD`). Missing password is allowed only in local development; production fails closed.
- **Storage:** `puckData` field on landingPage is a JSON string (read-only in Studio). Saved as `JSON.stringify(data)` on PUT, parsed on read. Keeps Sanity the source of truth without needing a parallel object schema.
- **Configs:** `src/puck/config.tsx` is the client editor config with custom fields. `src/puck/config.server.tsx` is the public render config; update both when adding/removing blocks.
- **Draft reads:** editor/API reads use `draftReadClient` and exclude `drafts.**` for the primary page document before reading the matching draft payload. Do not switch these reads back to the default published perspective.
- **Autosave normalization:** editor autosave compares canonical Puck data, ignoring object key order, empty `zones`, resolver-only underscored props like `_articles`, and `PageHero.overlay` string/boolean drift. Opening an unchanged page should not create a draft.
- **Blocks** (`src/puck/blocks/`): PageHero, Hero, FeatureGrid (lucide icons), CTABand, Image, RichText, Stats, Quote, Columns, SocialLinks, ContactInfo, ArticleGrid, PartnersStrip, ImpactStats. Themed via CSS variables.
- **Image uploads:** custom Puck field `ImagePickerField` posts to `/api/puck/upload` which uploads to Sanity via `writeClient.assets.upload`. Caps 5MB, rate-limits by IP, checks filename extension, verifies image magic bytes (JPEG/PNG/WebP/GIF/AVIF), and can pick recent Sanity image assets.
- **Guard tests:** `npm run test:puck` checks resolver parity, publish/autosave ordering, id-backed editor links, and server/client config separation.
- **Seed:** one published landingPage exists — slug `test` (doc id `7c0b9048-4c00-44a5-8edf-4e423ffd2a79`).
- **Full guide:** see [docs/page-builder.md](docs/page-builder.md) for how-to-add-a-block, how-to-add-a-landing-page, and the full route/file map.

### Adding a new Puck block
1. Create `src/puck/blocks/MyBlock.tsx` exporting `MyBlock` + `MyBlockProps`.
2. Add to `Props` union in `src/puck/types.ts`.
3. Add to the editor `components` map in `src/puck/config.tsx` (fields, defaultProps, render).
4. Add to the server `components` map in `src/puck/config.server.tsx` (render, plus any `resolveData`; include slot fields if it owns slots).
5. Block renders on both the editor canvas (client) and the public page (server) — no `"use client"` unless you need client-only APIs. Prefer server-compatible components.

### Known follow-ups
- No "duplicate landing page" flow — useful for reusing a template.
- `FeatureGrid` has no block-level image field (only icons).

## Environment Variables

| Variable | Where | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Vercel + .env.local | `tkfaqa7c` |
| `NEXT_PUBLIC_SANITY_DATASET` | Vercel + .env.local | `production` |
| `SANITY_API_TOKEN` | Vercel + .env.local | Write token (server-only) |
| `SANITY_READ_TOKEN` | Vercel (optional) | Read-only token for `draftReadClient`; falls back to write token if unset |
| `REVALIDATION_SECRET` | Vercel + .env.local | Webhook auth |
| `RESEND_API_KEY` | Vercel + .env.local | Email notifications via Resend |
| `RESEND_FROM_EMAIL` | Vercel (optional) | Custom sender once domain is verified |
| `NOTIFICATION_EMAIL` | Vercel (optional) | Override recipient (default: office@guardiansofgoodness.org) |

## Commands

```bash
npm run dev     # Start dev server (port 3000)
npm run build   # Production build
npm run lint    # ESLint
```
