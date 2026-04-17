import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteChrome",
  title: "Site Chrome",
  type: "document",
  icon: () => "🧱",
  groups: [
    { name: "header", title: "Header", default: true },
    { name: "footer", title: "Footer" },
  ],
  fields: [
    // -------- Header --------
    defineField({
      name: "headerNav",
      title: "Header navigation",
      type: "array",
      group: "header",
      of: [{ type: "navItem" }],
      description:
        "Main navigation shown in the top header. Leave empty to fall back to the built-in defaults.",
    }),
    defineField({
      name: "headerCtaLabel",
      title: "Header CTA button label",
      type: "string",
      group: "header",
      description: "The primary action button next to the nav (default: 'Support Us').",
    }),
    defineField({
      name: "headerCtaHref",
      title: "Header CTA button link",
      type: "string",
      group: "header",
      description: "Path for the CTA button (default: /support).",
    }),
    // -------- Footer --------
    defineField({
      name: "footerDescription",
      title: "Footer short description",
      type: "text",
      rows: 3,
      group: "footer",
      description: "Small paragraph shown in the footer left column.",
    }),
    defineField({
      name: "footerAddressLine1",
      title: "Address — line 1",
      type: "string",
      group: "footer",
    }),
    defineField({
      name: "footerAddressLine2",
      title: "Address — line 2",
      type: "string",
      group: "footer",
    }),
    defineField({
      name: "footerNav",
      title: "Footer navigation",
      type: "array",
      group: "footer",
      of: [{ type: "navItem" }],
      description:
        "Quick links shown in the footer. Leave empty to fall back to the built-in defaults.",
    }),
    defineField({
      name: "footerLegal",
      title: "Footer legal line",
      type: "string",
      group: "footer",
      description: "Bottom tagline (default: 'Made with care for cats in Jordan').",
    }),
  ],
  preview: {
    prepare: () => ({
      title: "Site Chrome",
      subtitle: "Header and footer settings",
    }),
  },
});
