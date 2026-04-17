# Page Audit v2 — Puck migration inventory

Scope: `src/app/(site)/**`, `src/components/**`, `src/sanity/schemas/pages/**`.
Admin, Studio, API routes, and `/catalogue/[slug]` / `/education/[slug]` detail pages are **out of scope** — they stay hand-coded.

## Page-by-page

| Route | Sanity doc | Sections | Port? |
|---|---|---|---|
| `/` | `homePage` singleton | HomeHero (motion) · PhilosophyPillars · PartnersCarousel · ImpactStats · InstagramFeed · JoinCTA (form) | Sections yes, HomeHero deferred (framer-motion), JoinCTA stays |
| `/about` | `aboutPage` singleton | AboutHero · MissionVision · HistoryTimeline · QuoteCard | All portable |
| `/catalogue` | no singleton | CatalogueHeader · CatGrid (client filters) | Header yes, CatGrid stays |
| `/catalogue/[slug]` | `cat` | detail page | Keep hand-coded |
| `/consultation` | `consultationPage` singleton | ConsultationHero (embeds form) | Split later |
| `/contact` | `contactPage` singleton | ContactHero · SocialLinksGrid · ContactDetails | All portable |
| `/education` | no singleton | EducationHero · ArticleGrid | Both portable |
| `/education/[slug]` | `article` | detail page | Keep hand-coded |
| `/privacy` | none (static) | prose | Port to RichText |
| `/projects/tnr` + `/projects/hbs` | `projectPage` docs | ProjectHero · ProjectContentSplit | Single block covers both |
| `/support` | `supportPage` singleton | SupportHero · HelpMethodsGrid · DonateWays · SupportCTA | All portable |

## Shared patterns

- **6 of 6 page singletons** have identical `heroTitle/heroSubtext/heroImage` fields — one `PageHero` Puck block replaces all six.
- `quoteText/quoteAuthor` appears in `homePage` and `aboutPage` — maps to existing `Quote` block.
- `ctaText/ctaLink` variants across `homePage`, `projectPage`, `supportPage` — maps to existing `CTABand`.

## Chrome (Header / Footer) today

- **Header** (`src/components/layout/Header.tsx`) — client component. Nav labels from `NAV_ITEMS` in `src/lib/constants.ts:15` (hardcoded, 5 top-level items, Projects has 3 children). Logo path hardcoded. Scroll + theme state client-side.
- **Footer** (`src/components/layout/Footer.tsx`) — server component. Its own `navLinks` local array (does NOT reuse `NAV_ITEMS` — divergence risk). Social from `SOCIAL` constant. Email + address hardcoded text.
- **No Sanity query** in either — zero editable nav today.

## Easy wins (<1 hr each)

1. `PageHero` — unified block, replaces 6 duplicated heroes
2. `QuoteCard` — already exists in Puck config as `Quote`
3. `PrivacyContent` — maps to existing `RichText` block
4. `SocialLinksGrid` — `SocialLinks` block pulling from site-chrome singleton
5. `SupportCTA` → existing `CTABand`
6. `ContactDetails` → simple `ContactInfo` block (email + address from singleton)

## Medium (2-4 hr each)

1. `PartnersCarousel` — unwire hardcoded logos, read from `partner` Sanity docs
2. `ImpactStats` — promote to a site-level `impactStats[]` array, Puck block reads via prop or singleton
3. `InstagramFeed` — move `getInstagramPosts()` fetch into block wrapper
4. `ArticleGrid` — server-rendered, configurable `limit`/`emptyStateCTAs`
5. `HelpMethodsGrid` — extract from Support page
6. `ProjectContentSplit` — one block, TNR and HBS become different landing-page docs
7. `PhilosophyPillars` — unwire hardcoded pillars
8. `MissionVision` — straight extract
9. `HistoryTimeline` — generalize index-based alternating layout

## Hard / keep hand-coded

- All forms (consultation, adoption inquiry, join-us) — Zod + honeypot + `/api/form`, pure client
- `CatGrid` — 9-dimension filter, pagination, animated reorder
- `CatProfilePage`, `PhotoGallery`, Education detail — entity pages
- Header + Footer — global chrome with client-side scroll/theme state
- HomeHero with framer-motion entrance animations (needs motion-rewrite before Puck)
