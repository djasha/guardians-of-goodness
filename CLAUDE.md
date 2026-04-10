@AGENTS.md

# Guardians of Goodness

Cat rescue nonprofit website — Next.js 16 + Sanity CMS + Tailwind 4, deployed on Vercel.

## Quick Reference

- **Repo:** github.com/djasha/guardians-of-goodness
- **Sanity project:** tkfaqa7c / production dataset
- **Studio:** embedded at /studio route
- **Active code:** `src/` only — ignore `src-template-v1/` and `src-template-v2-brutalist/`

## Critical Rules

1. **Next.js 16 has breaking changes.** `revalidateTag(tag, "max")` takes 2 args. `params` is a Promise. Check `node_modules/next/dist/docs/` before assuming APIs match training data.
2. **No custom SVG illustrations.** Use `lucide-react` for all icons. Custom paw/cat SVGs were explicitly rejected as amateur.
3. **`writeClient` is server-only.** It lives in `src/sanity/writeClient.ts` with an `import "server-only"` guard. The read client is in `src/sanity/client.ts` (barrel re-export).
4. **Sanity read client uses `useCdn: false`** because the project uses tag-based revalidation via `/api/revalidate`.
5. **The end user is non-technical.** She manages from her phone. Any admin UX must be as simple as posting to Instagram.
6. **Forms save to Sanity + send email via Resend.** Single endpoint at `POST /api/form`. Zod validation runs on both client and server.
7. **Design system:** neo-brutalist — 3px borders, offset shadows, purple (#9b4dca) primary, teal (#4ecdc4) secondary, dark (#1a1a2e), cream (#faf7f2).

## Commands

```bash
npm run dev     # Start dev server
npm run build   # Production build
npm run lint    # ESLint
```
