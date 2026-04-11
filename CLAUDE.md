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
