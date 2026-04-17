# Mobile & Touch Target Standards

The site must pass WCAG 2.1 Level AAA touch targets (44×44 CSS px minimum) on mobile and tablet, while remaining visually compact on desktop.

## The responsive pattern

Use Tailwind's `lg:` breakpoint (1024 px) as the cutoff between "touch-sized" and "mouse-compact":

| Viewport | Width | Target min size |
|---|---|---|
| Mobile | < 640 px | 44 px |
| Tablet | 640–1023 px | 44 px |
| Desktop | ≥ 1024 px | 36 px (compact, optional) |

**Tailwind snippet:**

```tsx
// Button-shaped CTA
className="... min-h-11 lg:min-h-0 lg:py-2 touch-manipulation"

// Icon-only tap target (share, close, toggle)
className="... w-11 h-11 lg:w-9 lg:h-9 touch-manipulation"
```

The `lg:` breakpoint is deliberate — `sm:` (640) and `md:` (768) are still tablet territory where users tap with fingers, not click with a mouse.

## Rules

1. **Every interactive element that looks like a button** (filled/outlined CTA, icon button, chip, close, toggle, form submit) must be ≥ 44 px tall and wide on viewports below `lg`.
2. **Inline text links in nav/prose** may stay at their text height (WCAG 2.2 AA allows 24 px for text-style links). Don't inflate them — it breaks typography.
3. **`touch-manipulation`** goes on every tap target. Kills the 300 ms click delay and disables pinch-zoom double-tap gestures on the element itself.
4. **Bounding box = hit area.** If you wrap a sized child in a `Link`/`a`/`button`, the wrapper must be `display: inline-flex` (or block) so the parent element actually reports the hit area's dimensions. A default `<a>` is `display: inline`, which collapses to the line-height of the surrounding text regardless of the child's size.

That fourth rule caught us in `MagneticButton` — the inner div was 44 px but the outer anchor reported 21 px because it was still inline. Fix: the wrapping `Link`/`a`/`button` gets `className="inline-flex"`.

## Primitives that already enforce this

- `src/components/ui/MagneticButton.tsx` — all sizes are ≥ 44 px on mobile+tablet; `sm` compacts to ~36 px at `lg`.
- `src/components/catalogue/CatGrid.tsx` — view-mode toggle is `w-11 h-11 lg:w-9 lg:h-9`.
- `src/components/catalogue/CatFilters.tsx` — tag chips are `min-h-[40px] lg:min-h-[36px]`.
- `src/components/forms/FormField.tsx` — radio labels are `min-h-11`.
- `src/components/theme/ThemeToggle.tsx` — `size="sm"` is desktop-only (hidden below `lg`).

When adding a new tap target, mirror one of these — don't invent a new sizing system.

## Verifying

Before merging UI changes:

1. Open the preview at 375 × 812 (iPhone) and 768 × 1024 (iPad).
2. Walk every page that changed.
3. For each interactive element, confirm `getBoundingClientRect()` returns ≥ 44 × 44.
4. Check there are no overlapping hit areas — two adjacent buttons must have ≥ 4 px breathing room, or a visible separator.

The `preview_inspect` and `preview_snapshot` tools expose these dimensions without screenshots.

## Known exceptions

- **Text-style nav links** (Header, Footer, Hero quick links) intentionally stay at 28 px — WCAG 2.2 AA compliant for text-style navigation, and inflating them breaks the visual rhythm.
- **Form labels** (label text only, no click behavior) don't need 44 px. The attached input does.
