# Guardians of Goodness — Design System

**Style**: Neobrutalism — bold borders, hard shadows, rounded corners, playful colors, cat-friendly
**Framework**: Next.js 15 + Tailwind v4 + Motion (Framer Motion)

---

## Design Tokens

### Colors

| Token | Hex | Tailwind Class | Usage |
|-------|-----|----------------|-------|
| Primary | `#9b4dca` | `text-primary`, `bg-primary` | Main brand purple (from logo). CTA buttons, headings, accents |
| Primary Light | `#c084fc` | `text-primary-light`, `bg-primary-light` | Hover states, lighter accents |
| Primary Dark | `#7b3aa0` | `text-primary-dark`, `bg-primary-dark` | Active states, deeper accents |
| Secondary | `#4ecdc4` | `text-secondary`, `bg-secondary` | Teal (from logo). Links, success states, "need your help" text |
| Secondary Light | `#6fd8d1` | `text-secondary-light` | Lighter teal accents |
| Secondary Dark | `#3baba3` | `text-secondary-dark` | Darker teal |
| Accent | `#ff8c42` | `text-accent`, `bg-accent` | Orange. Third brand color for variety |
| Pink | `#ff6b9d` | `text-pink`, `bg-pink` | Fourth accent, used sparingly |
| Dark | `#1a1a2e` | `text-dark`, `bg-dark` | Body text, borders, dark sections |
| Dark Light | `#2d2d44` | `bg-dark-light` | Slightly lighter dark |
| Cream | `#faf7f2` | `bg-cream` | Page background |
| Warm Gray | `#f0ebe4` | `bg-warm-gray` | Section backgrounds, input backgrounds |

### Typography

| Token | Font | Tailwind Class | Usage |
|-------|------|----------------|-------|
| Display | Fraunces (variable, opsz + WONK) | `font-display` | All headings, numbers, badges |
| Body | DM Sans | `font-body` (default) | Body text, labels, inputs |

**Heading Scale:**
- Page titles: `text-5xl sm:text-6xl lg:text-7xl font-black`
- Section headings: `text-3xl sm:text-4xl lg:text-5xl font-black`
- Card headings: `text-xl sm:text-2xl font-bold`
- Subheadings: `text-lg font-bold`

**Text Colors:**
- Primary text: `text-dark` (never `text-gray-900`)
- Secondary text: `text-dark/50` (never `text-gray-600`)
- On dark bg: `text-white` and `text-white/60`

### Spacing

Standard Tailwind spacing scale. Key patterns:
- Page section padding: `py-24 sm:py-32`
- Section inner: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Card padding: `p-6 sm:p-7` or `p-8 sm:p-10`
- Grid gap: `gap-6` (cards), `gap-3` (buttons)

### Borders & Shadows (Neobrutalist)

| Class | CSS | Usage |
|-------|-----|-------|
| `neo-border` | `border: 3px solid #1a1a2e; border-radius: 16px` | Cards, large containers |
| `neo-border-sm` | `border: 2px solid #1a1a2e; border-radius: 12px` | Buttons, badges, inputs, small elements |
| `neo-shadow` | `box-shadow: 4px 4px 0 #1a1a2e` | Card depth |
| `neo-shadow-sm` | `box-shadow: 3px 3px 0 #1a1a2e` | Button/badge depth |
| `neo-shadow-purple` | `box-shadow: 4px 4px 0 #9b4dca` | Purple-themed cards |
| `neo-shadow-teal` | `box-shadow: 4px 4px 0 #4ecdc4` | Teal-themed cards |
| `neo-hover` | `hover: translate(-2px,-2px) shadow(6px 6px 0)` | Interactive card lift |

### Motion

Library: `motion/react` (Framer Motion)
- All animations respect `prefers-reduced-motion`
- Page load: staggered fade-in-up (0.1s delay between elements)
- Scroll reveal: `whileInView` with `once: true`
- Hover: CSS transitions (0.2s ease) via `neo-hover`
- Marquee: 25s linear infinite (partners carousel)

---

## Components

### Layout

| Component | Type | Path | Description |
|-----------|------|------|-------------|
| Header | Client | `layout/Header.tsx` | Sticky, glass-morphism on scroll, transparent on homepage hero. Dropdown nav, mobile hamburger |
| Footer | Server | `layout/Footer.tsx` | Dark bg, logo + description, nav columns, social SVG icons (FB/IG/LI), paw decorations |
| MobileNav | Client | `layout/MobileNav.tsx` | Slide-in panel, AnimatePresence, Escape key close |
| Section | Server | `layout/Section.tsx` | Reusable section wrapper with max-width and padding |

### UI Primitives

| Component | Path | Variants | Description |
|-----------|------|----------|-------------|
| Button | `ui/Button.tsx` | primary, secondary, ghost, outline / sm, md, lg | Polymorphic (Link when href). Rounded-full shape |
| Badge | `ui/Badge.tsx` | available, pending, adopted, default | Status pill for cat cards |
| SectionLabel | `ui/SectionLabel.tsx` | — | Em-dash prefixed uppercase label |
| SocialIcons | `ui/SocialIcons.tsx` | light, dark | FB/IG/LI SVG icon links |
| Card | `ui/Card.tsx` | — | Base card wrapper |

### Animation Components

| Component | Path | Description |
|-----------|------|-------------|
| PawCursor | `animations/PawCursor.tsx` | Custom purple paw cursor, teal trails on move, purple splash on click. Desktop only, respects reduced motion |
| ScrollReveal | `animations/ScrollReveal.tsx` | Viewport-triggered fade-in with configurable variants |
| CountUp | `animations/CountUp.tsx` | Number counter animation (IntersectionObserver) |
| FloatingElement | `animations/FloatingElement.tsx` | Gentle y-axis float loop |
| StaggerChildren | `animations/StaggerChildren.tsx` | Viewport-triggered stagger container |
| PawPrint | `animations/PawPrint.tsx` | Decorative SVG paw (size, color props) |

### Home Page Sections

| Component | Path | Description |
|-----------|------|-------------|
| Hero | `home/Hero.tsx` | Full-width cat photo bg, overlaid heading + CTAs + stats bar |
| PhilosophyPillars | `home/PhilosophyPillars.tsx` | 4 cards with full-bleed cat photos + colored text panels |
| PartnersCarousel | `home/PartnersCarousel.tsx` | Infinite marquee of partner logos in neo-border cards |
| ImpactStats | `home/ImpactStats.tsx` | 3 colored stat cards (200+ cats, 7 partners, 2 projects) |
| InstagramFeed | `home/InstagramFeed.tsx` | Photo grid linking to @guardians_of_goodness |
| JoinCTA | `home/JoinCTA.tsx` | Join form + quote card on dark bg |

### CATalogue

| Component | Path | Description |
|-----------|------|-------------|
| CatGrid | `catalogue/CatGrid.tsx` | Filterable grid with AnimatePresence |
| CatCard | `catalogue/CatCard.tsx` | Neo-border card with photo, status badge, health badges |
| CatFilters | `catalogue/CatFilters.tsx` | Search + filter pills (gender, travel, special needs) |
| PhotoGallery | `catalogue/PhotoGallery.tsx` | Thumbnail strip + main image + lightbox |

### Forms

| Component | Path | Description |
|-----------|------|-------------|
| FormField | `forms/FormField.tsx` | Label + error wrapper. Also exports Input, Textarea, Select, RadioGroup |
| FormSuccess | `forms/FormSuccess.tsx` | Animated success state with checkmark |
| JoinUsForm | `forms/JoinUsForm.tsx` | Homepage join form (7 fields) |
| ConsultationForm | `forms/ConsultationForm.tsx` | Consultation request (6 fields) |
| AdoptionInquiryForm | `forms/AdoptionInquiryForm.tsx` | Adoption inquiry (7 fields, pre-fills cat name) |

---

## Patterns

### Page Hero Sections

Each page has a hero section. Patterns:

| Pattern | Used On | Description |
|---------|---------|-------------|
| Full-width image + overlay | Homepage | Cat photo fills viewport, dark gradient overlay, text + CTAs on top |
| Solid color + badge | Catalogue (`bg-primary`), Education (`bg-secondary`), Consultation (`bg-primary`), TNR (`bg-secondary`), HBS (`bg-accent`) | Colored bg, neo-border badge, white heading + subtext |
| Solid color (dark) | Contact (`bg-dark`) | Dark hero with white text |
| Warm gray + two-column | About | Left: text content, Right: cat photo in neo-frame |

### Section Badge Pattern

```tsx
<div className="neo-border-sm neo-shadow-sm bg-primary text-white inline-block px-4 py-1.5 mb-6">
  <span className="text-xs font-bold uppercase tracking-widest">Label</span>
</div>
```

Vary the bg color: `bg-primary`, `bg-secondary`, `bg-accent` for visual variety.

### Neo Card Pattern

```tsx
<div className="neo-border neo-shadow neo-hover bg-white p-6 sm:p-7">
  {/* content */}
</div>
```

With colored corner accent:
```tsx
<div className="neo-border neo-shadow bg-white neo-hover p-7 relative overflow-hidden">
  <div className="absolute top-0 right-0 w-16 h-16 bg-secondary rounded-bl-[16px]">
    <span className="absolute top-2 right-3 text-white font-display font-black text-sm">01</span>
  </div>
  {/* content */}
</div>
```

### Cat Paw SVG (Decorative)

```tsx
<svg className="w-5 h-5 text-primary/20" viewBox="0 0 40 44" fill="currentColor">
  <ellipse cx="20" cy="30" rx="10" ry="9"/>
  <circle cx="8" cy="16" r="4.5"/>
  <circle cx="17" cy="10" r="4"/>
  <circle cx="27" cy="10" r="4"/>
  <circle cx="35" cy="16" r="4.5"/>
</svg>
```

### Form Input Pattern

All inputs use `neo-border-sm`:
```tsx
<input className="w-full neo-border-sm bg-white px-4 py-3 text-dark placeholder:text-dark/30 outline-none focus:border-primary" />
```

---

## Pages

| Route | File | Hero Style | Key Components |
|-------|------|------------|----------------|
| `/` | `page.tsx` | Full-width image | Hero, PhilosophyPillars, PartnersCarousel, ImpactStats, InstagramFeed, JoinCTA |
| `/about` | `about/page.tsx` | Warm gray two-column | Timeline, Mission/Vision cards |
| `/projects/tnr` | `projects/tnr/page.tsx` | Solid teal | Two-column (image + text), fact cards |
| `/projects/hbs` | `projects/hbs/page.tsx` | Solid orange | Two-column (image + text), fact cards |
| `/catalogue` | `catalogue/page.tsx` | Solid purple | CatGrid + CatFilters |
| `/catalogue/[slug]` | `catalogue/[slug]/page.tsx` | — | PhotoGallery + cat details + AdoptionInquiryForm |
| `/education` | `education/page.tsx` | Solid teal | Article grid (Sanity) |
| `/education/[slug]` | `education/[slug]/page.tsx` | — | Article detail |
| `/support` | `support/page.tsx` | Solid purple | Support method cards + CTA |
| `/contact` | `contact/page.tsx` | Solid dark | Social cards + contact info |
| `/consultation` | `consultation/page.tsx` | Solid purple | ConsultationForm |
| `/privacy` | `privacy/page.tsx` | — | Legal text (prose) |
| `/studio` | `studio/[[...tool]]/page.tsx` | — | Sanity Studio (admin) |

---

## Sanity CMS Schemas

| Schema | Document Type | Admin Can Manage |
|--------|-------------|-----------------|
| Cat | `cat` | Name, photos, age, gender, breed, personality, health status, adoption status, travel readiness, bonded pairs |
| Partner | `partner` | Name, logo, website, display order |
| Article | `article` | Title, cover image, body (rich text), tags, publish date |
| SiteSettings | `siteSettings` | Email, address, phone, social links, impact stats, hero text |
| FormSubmission | `formSubmission` | Read-only submissions from Join Us / Consultation / Adoption forms. Status (new/read/responded) is editable |

**Admin access**: `/studio` route (embedded Sanity Studio)

---

## Do's and Don'ts

| Do | Don't |
|----|-------|
| Use `neo-border` + `neo-shadow` for all cards | Use `rounded-2xl shadow-lg` (old editorial style) |
| Use `text-dark` and `text-dark/50` | Use `text-gray-900` or `text-gray-600` |
| Use `font-display` for all headings | Use default system font for headings |
| Use theme color classes (`bg-primary`) | Use hardcoded hex (`bg-[#9b4dca]`) |
| Use SVG paw prints for decorations | Use emoji paw prints |
| Wrap sections in `ScrollReveal` | Leave sections without scroll animation |
| Use solid colored hero sections for inner pages | Use wallpaper/pattern backgrounds |
| Keep font-black for page titles | Use lighter font weights on main headings |
| Respect reduced motion preferences | Force animations on all users |
