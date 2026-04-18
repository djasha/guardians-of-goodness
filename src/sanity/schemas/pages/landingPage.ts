import { defineType, defineField } from "sanity";

// Slugs that would collide with app routes or required filenames.
// Keep in sync with src/app/ top-level segments + Next.js special names.
const RESERVED_SLUGS = new Set([
  "admin",
  "api",
  "studio",
  "_next",
  "favicon.ico",
  "robots.txt",
  "sitemap.xml",
  "catalogue",
  "consultation",
  "contact",
  "education",
  "about",
  "support",
  "privacy",
  "projects",
  "p",
]);

export default defineType({
  name: "landingPage",
  title: "Page",
  type: "document",
  icon: () => "✨",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
    { name: "advanced", title: "Advanced" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      group: "content",
      description: "Used for the browser tab and search results.",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "URL segment",
      type: "slug",
      group: "content",
      description:
        "The URL segment for this page. 'spring-campaign' under a parent 'campaigns' will be at /campaigns/spring-campaign. A root page uses just this segment (e.g. 'about' → /about).",
      options: {
        source: "title",
        maxLength: 80,
        isUnique: (slug, context) => context.defaultIsUnique(slug, context),
      },
      validation: (rule) =>
        rule.required().custom((value) => {
          const current = value?.current;
          if (!current) return true;
          if (RESERVED_SLUGS.has(current.toLowerCase())) {
            return `"${current}" is a reserved route segment. Try a different slug.`;
          }
          if (!/^[a-z0-9][a-z0-9-]*$/i.test(current)) {
            return "Use lowercase letters, numbers, and hyphens only (no spaces or symbols).";
          }
          return true;
        }),
    }),
    defineField({
      name: "parent",
      title: "Parent page (optional)",
      type: "reference",
      group: "content",
      description:
        "Nest this page under another page. Leave empty for top-level pages.",
      to: [{ type: "landingPage" }],
      options: {
        filter: ({ document }) =>
          document?._id
            ? { filter: "_id != $id && _id != $draftId", params: { id: document._id.replace(/^drafts\./, ""), draftId: `drafts.${document._id.replace(/^drafts\./, "")}` } }
            : {},
      },
    }),
    defineField({
      name: "isHomepage",
      title: "Use as homepage",
      type: "boolean",
      group: "advanced",
      description:
        "When checked, this page renders at /. Only one page should have this set — if multiple are marked, the first found wins.",
      initialValue: false,
    }),
    defineField({
      name: "description",
      title: "Meta Description",
      type: "text",
      rows: 2,
      group: "seo",
      description: "Short summary shown in Google search results.",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "noIndex",
      title: "Hide from search engines",
      type: "boolean",
      group: "seo",
      description: "Adds <meta name=\"robots\" content=\"noindex\"> to this page.",
      initialValue: false,
    }),
    defineField({
      name: "puckData",
      title: "Page Content",
      type: "text",
      readOnly: true,
      group: "advanced",
      description:
        "Managed by the visual Page Editor. Use the 'Open in Page Builder' action above to edit.",
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: "title",
      slug: "slug.current",
      parentSlug: "parent.slug.current",
      isHomepage: "isHomepage",
    },
    prepare: ({ title, slug, parentSlug, isHomepage }) => {
      const subtitle = isHomepage
        ? "/  (homepage)"
        : slug
          ? parentSlug
            ? `/${parentSlug}/${slug}`
            : `/${slug}`
          : "No URL set";
      return {
        title: title || "Untitled",
        subtitle,
      };
    },
  },
});
