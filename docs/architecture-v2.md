# Architecture v2 — Puck covers the public site

Goal: let admins build every **public-facing** page in Puck. Admin routes (`/admin`, `/studio`, `/api`) and entity detail pages (`/catalogue/[slug]`, `/education/[slug]`) stay hand-coded.

Based on research (see `docs/research-notes.md` inline cites) and the audit (`docs/page-audit-v2.md`).

## Division of labour

| Layer | Owned by | Used for |
|---|---|---|
| **Sanity structured content** | Sanity Studio schemas | SEO fields (`title`, `metaDescription`, `ogImage`, `noIndex`), page hierarchy (`parent`, `slug`), publish state, nav/chrome, asset library. Anything queryable. |
| **Puck `root.props`** | Puck editor | Render-only flags: `theme`, `headerVariant`, `hideChrome`. |
| **Puck `content`** | Puck editor | The body blocks. |
| **Hand-coded React** | source | `/catalogue/[slug]`, `/education/[slug]`, forms, cat grid, Header, Footer. |

## Foundation changes

### 1. Page tree
Extend the existing `landingPage` doc type (rename to `contentPage` conceptually; doc type stays `landingPage` for back-compat) with:
- `parent` — self-reference, optional. Root pages have no parent.
- `path` — auto-computed full path from slug + ancestor slugs (e.g. `/about/team`).
- `isHomepage` — boolean on the single home doc.

Instead of introducing a dependency, we build the tree resolution in-repo since it's ~30 lines. `@q42/sanity-plugin-page-tree` is the reference pattern.

### 2. Catch-all route
Replace `src/app/(site)/p/[slug]/page.tsx` with `src/app/(site)/[[...path]]/page.tsx`:
1. Join `params.path` into `"/" + segments.join("/")` (or `"/"` for empty).
2. GROQ-fetch the `landingPage` whose computed `path` matches.
3. Hand `puckData` to `<Render>`; generate metadata from the doc's SEO fields.
4. Existing hardcoded routes (e.g. `src/app/(site)/catalogue/page.tsx`) take precedence over the catch-all — Next.js routes specificity handles this.

### 3. Site chrome singleton
`siteChrome` singleton with:
- `header.nav[]` — each item `{ label, href | pageRef, children[] }`.
- `footer.columns[]` — each column `{ heading, links[] }`.
- `footer.address`, `footer.legal`.

Header + Footer React components read this singleton once in `src/app/(site)/layout.tsx`; fall back to hardcoded `NAV_ITEMS` constants if the singleton isn't published yet.

### 4. Draft / publish split
- **Auto-save** in `onChange` → write to `drafts.<id>` via `/api/puck/[slug]` with `?draft=1`.
- **Publish** in `onPublish` → Sanity `publish` mutation (writeClient).
- Public catch-all fetches `published` perspective; `/preview/[...path]` route gated by draft mode uses `drafts` perspective.
- Existing PUT endpoint gains `?draft=1` flag — when set, writes to draft doc; when absent, publishes.

### 5. Asset reuse
New `/api/puck/assets` GET lists recent Sanity `image` assets. `ImagePickerField` gains a "Choose from library" tab alongside the upload button.

### 6. Columns block
New `Columns` block with `left` + `right` (or `left/middle/right`) slot fields. Drops into any page; nested blocks go inside each slot.

### 7. Config split
- `src/puck/config.tsx` — current file, stays client-safe (imports custom fields with `"use client"`).
- `src/puck/config.server.tsx` — same components, no custom fields (fields are no-ops in `<Render>`), no client imports. Used by the public catch-all route.

In practice, importing the current config into a server component already works because field `render` functions are never called by `<Render>`. We keep one config unless type errors surface.

## Migration plan (incremental — existing site keeps working throughout)

**Phase 1 — foundation (this commit):**
1. ✅ Save research (`page-audit-v2.md`, `architecture-v2.md`)
2. Extend `landingPage` schema with `parent` + computed `path`.
3. Add catch-all `src/app/(site)/[[...path]]/page.tsx`; keep `/p/[slug]` working as alias.
4. Add `siteChrome` singleton; wire Header/Footer with fallback.
5. Add `Columns` slot block.
6. Add draft/publish split: PUT accepts `?draft=1`, editor auto-saves on change, Publish button commits.
7. Add `PageHero` Puck block (replaces 6 duplicated heroes).
8. Add asset-library tab to `ImagePickerField`.

**Phase 2 — port easy wins:**
- `Privacy` → move prose into a `contentPage` doc at `/privacy` with a single `RichText` block. Delete `src/app/(site)/privacy/page.tsx`.
- `Support CTA` → existing `CTABand`.
- `Contact → SocialLinks + ContactInfo` blocks.
- `About Quote` → existing `Quote`.

**Phase 3 — medium blocks:**
- `MissionVision`, `HistoryTimeline`, `PartnersStrip`, `ImpactStats`, `InstagramFeed`, `ArticleGrid`, `HelpMethodsGrid`, `ProjectContentSplit`, `PhilosophyPillars`.
- Each new block = one PR.

**Phase 4 — delete old routes:**
- Once a page has an equivalent `contentPage` doc and is verified, delete the hand-coded route file. Route specificity: the catch-all takes over.
- `/catalogue` index gets a `CatalogueHeader` block on top; the filtered grid stays in a fixed React component below a `<CatalogueSlot />` the page renders unconditionally.

**Phase 5 — home page:**
- Rewrite `HomeHero` without framer-motion entrance animations (or use CSS transitions), then port.

**Phase 6 — cleanup:**
- Delete the per-page singleton schemas (`aboutPage`, `supportPage`, etc.) once their docs are migrated. Keep `siteSettings` and `siteChrome`.

## Non-goals (explicitly out)

- Replacing Sanity Studio with Puck.
- Puck editing `/admin`, `/studio`, `/api/*`.
- Replacing form pipelines.
- Editing `/catalogue/[slug]` or `/education/[slug]` detail pages (they're entity views, not marketing pages).
- Multi-tenant. Still one deploy per org.

## Key decisions

- **Keep Sanity as the structured brain.** Tree, SEO, assets, nav live in structured schema, not inside a JSON blob.
- **Puck handles "what changed"; Sanity handles "is it published".** No parallel version store.
- **Header/Footer stay React.** They're not Puck blocks — they're chrome with client state. Editable via Sanity singleton.
- **One catch-all, reserved routes take precedence.** No special per-page wiring required to "opt in" to Puck.
- **Progressive migration.** Existing routes work forever; each port is independent and reversible.
