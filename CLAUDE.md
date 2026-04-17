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
3. **`writeClient` is server-only.** It lives in `src/sanity/writeClient.ts` with an `import "server-only"` guard. The read client is in `src/sanity/client.ts` (barrel re-export from `lib/client.ts`).
4. **Sanity read client:** `useCdn: true` in development (fast), `useCdn: false` in production (tag-based revalidation via `/api/revalidate`).
5. **The end user is non-technical.** She manages from her phone. Any admin UX must be as simple as posting to Instagram. All Studio fields have friendly descriptions.
6. **Forms save to Sanity + send email via Resend.** Single endpoint at `POST /api/form`. Zod validation runs on both client and server.
7. **Design system:** Dark mystical cat sanctuary theme + neo-brutalist. Purple (#9b4dca) primary, teal (#4ecdc4) secondary, dark (#1a1a2e). Two themes: default (cream bg) and mystical (dark bg). CSS variables throughout — no hardcoded hex in components.
8. **No purple hero blocks.** Catalogue pages blend with the page background. Stats use subtle inline text with dots, not flashy colored pills.
9. **Sanity webhook** configured at `/api/revalidate` — content changes auto-revalidate the site. Secret: `REVALIDATION_SECRET` env var.

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
- **Presentation** — live preview + click-to-edit for every page singleton, cat, article, and landingPage. Landing pages show a "Open in Page Builder" deep link to `/admin/editor/[slug]`.

## Page Builder (Puck)

Visual drag-and-drop editor for marketing/campaign pages. Lives on top of the Sanity `landingPage` document.

- **Package:** `@puckeditor/core` (NOT the deprecated `@measured/puck`).
- **Admin dashboard:** `/admin` — lists all landingPages, click-through to editor.
- **Editor:** `/admin/editor/[slug]` — full-screen Puck editor, Publish saves via PUT.
- **Public render:** `/(site)/p/[slug]` — SSR with `sanityFetch`, tagged `landingPage:[slug]`, has empty-state fallback.
- **API:** `GET/PUT /api/puck/[slug]` — PUT caps body at 1MB, calls `revalidateTag(\`landingPage:\${slug}\`, "max")` so saves appear immediately (no webhook latency).
- **Auth:** `/admin/*` and `/api/puck/*` gated by `proxy.ts` Basic auth (env: `ADMIN_PASSWORD`). No-op when unset (local dev).
- **Storage:** `puckData` field on landingPage is a JSON string (read-only in Studio). Saved as `JSON.stringify(data)` on PUT, parsed on read. Keeps Sanity the source of truth without needing a parallel object schema.
- **Blocks** (`src/puck/blocks/`): Hero, FeatureGrid (lucide icons), CTABand, Image, RichText, Stats, Quote. Themed via CSS variables.
- **Image uploads:** custom Puck field `ImagePickerField` posts to `/api/puck/upload` which uploads to Sanity via `writeClient.assets.upload`. Caps 5MB, validates both `Content-Type` and filename extension (JPEG/PNG/WebP/GIF/AVIF).
- **Seed:** one published landingPage exists — slug `test` (doc id `7c0b9048-4c00-44a5-8edf-4e423ffd2a79`).
- **Full guide:** see [docs/page-builder.md](docs/page-builder.md) for how-to-add-a-block, how-to-add-a-landing-page, and the full route/file map.

### Adding a new Puck block
1. Create `src/puck/blocks/MyBlock.tsx` exporting `MyBlock` + `MyBlockProps`.
2. Add to `Props` union + `components` map in `src/puck/config.tsx` (fields, defaultProps, render).
3. Block renders on both the editor canvas (client) and the public page (server) — no `"use client"` unless you need client-only APIs. Prefer server-compatible components.

### Known follow-ups
- No Sanity asset reuse in the Image picker — every upload creates a new asset. Could list recent assets for re-selection.
- No draft/publish split for Puck data — every save goes to the published doc. Future: save to a draft landingPage, publish button promotes to published.
- No "duplicate landing page" flow — useful for reusing a template.
- No slot-based column block — everything is top-level sections.
- `FeatureGrid` has no block-level image field (only icons).

## Environment Variables

| Variable | Where | Purpose |
|----------|-------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Vercel + .env.local | `tkfaqa7c` |
| `NEXT_PUBLIC_SANITY_DATASET` | Vercel + .env.local | `production` |
| `SANITY_API_TOKEN` | Vercel + .env.local | Write token (server-only) |
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
