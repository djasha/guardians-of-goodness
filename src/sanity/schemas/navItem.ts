import { defineType, defineField } from "sanity";

export default defineType({
  name: "navItem",
  title: "Nav item",
  type: "object",
  fields: [
    defineField({
      name: "label",
      type: "string",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "href",
      type: "string",
      description: "Path like /about or full URL. Used when no page reference is set.",
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "page",
      title: "Link to a page (optional)",
      type: "reference",
      to: [{ type: "landingPage" }],
      description: "Takes precedence over the manual href.",
    }),
    defineField({
      name: "children",
      title: "Dropdown items (optional)",
      type: "array",
      of: [
        {
          type: "object",
          name: "navChild",
          fields: [
            defineField({
              name: "label",
              type: "string",
              validation: (rule) => rule.required().max(40),
            }),
            defineField({ name: "href", type: "string", validation: (rule) => rule.max(200) }),
            defineField({
              name: "page",
              title: "Link to a page (optional)",
              type: "reference",
              to: [{ type: "landingPage" }],
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "href" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: "label",
      href: "href",
      childCount: "children.length",
    },
    prepare: ({ title, href, childCount }) => ({
      title: title || "(no label)",
      subtitle: childCount ? `${href || "—"} · ${childCount} children` : href || "—",
    }),
  },
});
