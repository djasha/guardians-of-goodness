# Guardians of Goodness — Test & Verification Guide

A simple checklist you can follow to make sure everything works. No coding needed — just click through the site and check each item.

---

## 1. Catalogue Page (`/catalogue`)

### Hero
- [ ] Title "CATalogue" is visible and readable
- [ ] Stats pills show correct counts (Available, Pending, Adopted, Total)
- [ ] Stats update when you change a cat's status in Studio

### Filters
- [ ] **Search** — type a cat name (e.g. "Trisha") and only that cat shows
- [ ] **Status** — click "Available" → only available cats show. Click "Pending" → only pending. Click "All" → all visible cats
- [ ] **Gender** — click "Male" → only males. "Female" → only females. "All" → both
- [ ] **Age** — click "Kitten", "Young", "Adult", "Senior" → correct cats filter
- [ ] **Sort** — "Featured" shows starred cats first. "Newest" sorts by date. "A-Z" sorts alphabetically
- [ ] **More Filters** — expands/collapses. Travel Ready, Special Needs, Bonded Pairs, Personality tags all work
- [ ] **Clear all** — resets everything
- [ ] **Count** — "X of Y cats" updates correctly with filters

### Cat Cards
- [ ] Each card shows: photo, name, gender badge (M/F), status badge, age category, breed
- [ ] Featured cats have a star icon
- [ ] EU Ready cats have a plane icon
- [ ] Adopted cats show "Found a Home!" ribbon and are slightly dimmed
- [ ] Clicking a card goes to the detail page

### Pagination
- [ ] Shows when there are 25+ cats
- [ ] Page numbers are clickable
- [ ] Prev/Next buttons work
- [ ] Current page is highlighted

---

## 2. Cat Detail Page (`/catalogue/[name]`)

### Hero Section
- [ ] Cat name is large and readable
- [ ] Status badge shows next to the name (green Available, amber Pending, etc.)
- [ ] Specs line shows: gender, age, breed, color (no labels, just values separated by dots)
- [ ] Location shows with pin icon (if set)
- [ ] Back arrow goes to catalogue

### Content
- [ ] Photo loads correctly (or shows placeholder if no photo)
- [ ] Health badges show: Neutered, Vaccinated, Microchipped, Travel Ready
- [ ] Inactive health items are crossed out and dimmed
- [ ] Personality tags display as colored chips
- [ ] Description/story text is readable
- [ ] Special Needs callout appears (yellow box) if the cat has special needs
- [ ] Bonded Pair callout appears with link to the bonded cat

### Actions
- [ ] Instagram link works (if set)
- [ ] WhatsApp share button works
- [ ] Adoption form loads with the cat name pre-filled

### Related Cats
- [ ] "You Might Also Like" shows 2-4 similar cats
- [ ] On phone: shows 2 columns (compact cards)
- [ ] Clicking a related cat goes to their detail page

---

## 3. Adoption Form

- [ ] Form fields are visible (name, email, phone, message)
- [ ] Labels are readable (not invisible on dark theme)
- [ ] Form validates — try submitting empty → shows errors
- [ ] Fill in all fields and submit → shows success message
- [ ] Check Sanity Studio → new form submission appears in Messages > New

---

## 4. Sanity Studio (`/studio`)

### Login
- [ ] Studio loads at `/studio`
- [ ] Can log in with Google

### Dashboard (first tab)
- [ ] Shows stats: Available Cats, Pending Cats, New Messages
- [ ] Quick Actions cards are visible with descriptions
- [ ] Welcome text appears

### Content (second tab)
- [ ] **Cats** section shows: All Cats, Available, Pending, Adopted
- [ ] Clicking a cat opens the editor
- [ ] Cat editor shows fieldsets: Core Info (open), Details/Health/Bonds/Advanced (collapsed)
- [ ] Each field has a helpful description tooltip
- [ ] Can add a new cat with: name, photo, gender, age category
- [ ] Slug auto-generates from name
- [ ] Can change adoption status
- [ ] Can toggle Featured and Visible

### Messages
- [ ] Shows: New, All Messages, Adoption Inquiries, Join Us, Consultations, Archived, Spam
- [ ] Each submission shows: name, form type, date in the list
- [ ] Can change status (New → Read → Responded → Archived → Spam)
- [ ] Admin Notes field is editable

### Site Settings
- [ ] Opens as a single document (no "Create new" confusion)
- [ ] Can edit: hero heading, subtitle, email, phone, address
- [ ] Social links (Facebook, Instagram, LinkedIn) are editable
- [ ] Impact stats are editable (label, value, suffix)

### Status Board (top nav tool)
- [ ] Shows all cats with photos in a grid
- [ ] Filter tabs work (All, Available, Pending, Adopted)
- [ ] Search works
- [ ] Clicking a status pill cycles: Available → Pending → Adopted
- [ ] Change saves immediately (no save button needed)
- [ ] Legend at bottom explains how it works

### Bulk Add (top nav tool)
- [ ] Can upload multiple photos at once
- [ ] Each photo becomes a row with: preview, name, gender, age
- [ ] Can edit name before creating
- [ ] "Create All" button works
- [ ] Progress bar shows during creation
- [ ] Created cats appear in the catalogue

---

## 5. Page Builder (`/admin`)

### Automated Guard
- [ ] Run `npm run test:puck` locally before changing Puck routes, configs, or draft/publish behavior

### Dashboard + Editor
- [ ] `/admin` lists landing pages and opens each page in `/admin/editor/<document-id>`
- [ ] The editor header shows the public path, not the internal document id
- [ ] Old slug editor URLs still work, e.g. `/admin/editor/test`
- [ ] If two nested pages share the same URL segment under different parents, each dashboard card opens the correct document-id-backed editor URL

### Draft / Publish
- [ ] Open a clean published page and wait 2 seconds → no "Draft saved" status appears, and `GET /api/puck/<id>?draft=1` reports `hasDraft: false`
- [ ] Type into a block and wait ~1.2s → header shows draft saved
- [ ] `GET /api/puck/<id>?draft=1` returns the edited draft content and `hasDraft: true`
- [ ] Close and reopen the editor → header shows unpublished draft
- [ ] Click Publish → public page updates on next request
- [ ] After publish, `GET /api/puck/<id>?draft=1` reports `hasDraft: false`
- [ ] Change content and immediately click Publish → no stale unpublished draft reappears after publish

### Public Render
- [ ] Catch-all route `/<page-path>` renders ArticleGrid and PartnersStrip with live Sanity data
- [ ] Legacy route `/p/<slug>` renders the same dynamic Puck data
- [ ] Columns block renders nested slot content on both routes

---

## 6. Mobile (test on phone)

- [ ] Hamburger menu works
- [ ] Catalogue filters scroll horizontally or wrap properly
- [ ] Cat cards are single column on narrow phones
- [ ] Detail page is readable — no horizontal scrolling
- [ ] Related cats show in 2 columns (compact)
- [ ] Adoption form is usable with phone keyboard
- [ ] Studio is accessible (may be tight but functional)

---

## 7. Production (`guardiansofgoodness.vercel.app`)

- [ ] Homepage loads with cat hero image
- [ ] All navigation links work
- [ ] Catalogue shows cats (not "Coming Soon")
- [ ] Cat detail pages load
- [ ] Studio login works at `/studio`
- [ ] Form submission works
- [ ] Content changes in Studio appear on the site (may take ~30 seconds due to revalidation webhook)

---

## Known Limitations (not bugs)

- **Local dev** — Sanity API may be slow/timeout from certain networks. Production (Vercel) doesn't have this issue.
- **Email notifications** — Need to verify `guardiansofgoodness.org` domain in Resend before emails can be sent to `office@guardiansofgoodness.org`. Until then, form data is still saved in Studio Messages.
- **Theme flash** — On first load, the page may briefly show the light theme before switching to dark. This is a known hydration timing issue.
