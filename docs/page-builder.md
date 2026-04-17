# Page Builder Guide

How the site's pages are structured, and how to add a new one fast.

## Two kinds of pages

| Kind | Route | Editor | Use for |
|---|---|---|---|
| **Template pages** | `/`, `/about`, `/catalogue`, `/support`, `/contact`, `/consultation`, `/education`, `/projects/tnr`, `/projects/hbs`, `/privacy` | Sanity Studio — each has a singleton doc (`homePage`, `aboutPage`, etc.) | Core site sections with custom layouts (forms, cat grids, custom heroes). Hand-coded templates bound to Sanity fields. |
| **Landing pages** | `/p/[slug]` | Puck visual editor at `/admin/editor/[slug]` | Campaigns, one-off marketing pages, anything non-technical admins should build themselves. |

## Template pages — when content changes

All template pages fetch a Sanity singleton at request time, tagged for revalidation. When an editor publishes in Studio, the Sanity webhook at `/api/revalidate` fires and refreshes the affected tag.

To add a **new field** to an existing template page:
1. Add the field to the singleton schema in `src/sanity/schemas/pages/*.ts`.
2. Update the GROQ query in the page component (`src/app/(site)/<path>/page.tsx`).
3. Render the new field in the JSX.
4. No webhook change needed — the existing `sanity:*` tag covers the whole doc.

To add a **new template page** (e.g. `/volunteer`):
1. Create `src/sanity/schemas/pages/volunteerPage.ts` as a singleton.
2. Register it in `src/sanity/schemas/index.ts`.
3. Add it to `src/sanity/structure.ts` and `src/sanity/presentation/resolve.ts`.
4. Create `src/app/(site)/volunteer/page.tsx` that fetches the singleton via `sanityFetch` with tag `sanity:<docId>`.
5. Add nav links in `src/components/Header.tsx` / `Footer.tsx` as needed.

## Landing pages — the Puck flow

Admin opens `/admin`, picks a landing page (or creates one in Studio), drags blocks into the canvas at `/admin/editor/[slug]`, clicks Publish. Saved block data is stored as a JSON string on the `landingPage.puckData` field. The public route `/p/[slug]` reads that field and hands it to Puck's `Render` component.

### Create a new landing page in 3 steps

1. **Studio** → **Landing Pages** → **Create new** → set title + slug.
2. Save the doc. The slug controls the public URL.
3. Click the **Open in Page Builder** action (top-right of the doc), or go to `/admin` and click the card.
4. Drop blocks from the sidebar, fill in fields, upload images with the picker.
5. Click **Publish** (top-right of the editor).

Revalidation is automatic — `/p/<slug>` shows the new content on next request.

## Available blocks

All blocks live in `src/puck/blocks/` and are registered in `src/puck/config.tsx`.

| Block | What it is | Key fields |
|---|---|---|
| `Hero` | Headline + subheading + CTA + optional image banner | eyebrow, heading, subheading, cta, tone, image |
| `FeatureGrid` | 3-column icon + title + body cards | heading, items[] (title, body, icon) |
| `Image` | Standalone bordered image (4 ratios, contained/full) | src (picker), alt, width, ratio, tone |
| `RichText` | Heading + paragraphs (blank lines between) | heading, body, align, tone |
| `Stats` | Value/label grid (3 or 4 cols) | heading, items[] (value, label), tone |
| `Quote` | Large pull-quote with attribution | body, attribution, role, tone |
| `CTABand` | Full-width banner with 1–2 CTAs | heading, body, primary/secondary button + link |

All blocks accept a `tone` prop that maps to site CSS variables (cream / dark / primary) — they automatically inherit the site theme.

## Adding a new block — 5 steps

Suppose you want a `VideoEmbed` block:

1. **Component** — create `src/puck/blocks/VideoEmbed.tsx`:
   ```tsx
   export type VideoEmbedProps = { url: string; caption: string };
   export function VideoEmbed({ url, caption }: VideoEmbedProps) {
     return (
       <section className="bg-cream px-6 py-12">
         <div className="max-w-4xl mx-auto">
           <div className="aspect-video border-2 border-dark">
             <iframe src={url} className="w-full h-full" />
           </div>
           {caption && <p className="mt-3 text-sm opacity-70 text-center">{caption}</p>}
         </div>
       </section>
     );
   }
   ```
2. **Register** in `src/puck/config.tsx`:
   - Import component + props type.
   - Add to the `Props` type union.
   - Add an entry to `components` with `label`, `fields`, `defaultProps`, `render`.
3. **Fields** — use Puck field types: `text`, `textarea`, `select`, `array`, or `custom` (see `ImagePickerField` for a custom example).
4. **Test** — open `/admin/editor/test`, drag the new block in, publish, check `/p/test`.
5. **Ship** — commit. No schema changes required; the new block is just a new variant in the stored JSON.

### Field types cheat-sheet

```ts
{ type: "text", label: "Heading" }
{ type: "textarea", label: "Body" }
{ type: "select", label: "Tone", options: [{ label: "Dark", value: "dark" }] }
{ type: "array", label: "Items", getItemSummary: (i) => i.title, arrayFields: { title: { type: "text" } } }
{ type: "custom", label: "Image", render: ({ value, onChange, id }) => <MyPicker ... /> }
```

## Adding a new Puck field (custom widget)

Custom fields are **client-side** React components with `"use client"`. Put them in `src/puck/fields/`. Signature:

```tsx
type Props = { value: string; onChange: (v: string) => void; id: string };
```

Reference: `src/puck/fields/ImagePickerField.tsx` — uploads to `/api/puck/upload`, writes the returned Sanity CDN URL back via `onChange`.

## Routes + files — quick reference

| Concern | File |
|---|---|
| Block renderer components | `src/puck/blocks/*.tsx` |
| Puck config (block registry) | `src/puck/config.tsx` |
| Custom Puck fields | `src/puck/fields/*.tsx` |
| Public rendered page | `src/app/(site)/p/[slug]/page.tsx` |
| Editor UI | `src/app/admin/editor/[slug]/EditorClient.tsx` |
| Editor server loader | `src/app/admin/editor/[slug]/page.tsx` |
| Admin dashboard | `src/app/admin/page.tsx` |
| Save endpoint | `src/app/api/puck/[slug]/route.ts` (GET + PUT) |
| Image upload endpoint | `src/app/api/puck/upload/route.ts` |
| Basic auth gate | `src/proxy.ts` (matchers: `/admin/:path*`, `/api/puck/:path*`) |
| Sanity schema | `src/sanity/schemas/pages/landingPage.ts` |
| Studio action | `src/sanity/actions/editInPageBuilder.tsx` |
| Presentation deep link | `src/sanity/presentation/resolve.ts` (`landingPage`) |

## Operational notes

- **Auth.** `/admin` and `/api/puck/*` require the `ADMIN_PASSWORD` env var on Vercel. Without it, these routes are public.
- **Save size.** PUTs to `/api/puck/[slug]` cap puckData at 1MB, images at 5MB, JPEG/PNG/WebP/GIF/AVIF only.
- **Revalidation.** PUT calls `revalidateTag("landingPage:<slug>", "max")` — the public page updates on the next request.
- **Renames.** Rename the page title in Sanity Studio, not the editor. The editor never writes title/description, to avoid clobbering Studio edits made mid-session.
- **Every save publishes.** There is no draft/publish split yet. If you want to experiment, duplicate the doc first.
