import { defineType, defineField, defineArrayMember } from "sanity";
import { HeartIcon } from "@sanity/icons";

export default defineType({
  name: "supportPage",
  title: "Support Page",
  type: "document",
  icon: HeartIcon,
  fieldsets: [
    {
      name: "hero",
      title: "Hero Section",
      description: "The banner at the top of the Support page.",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "content",
      title: "How to Help",
      description: "The section explaining how people can support you.",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "cta",
      title: "Bottom Call to Action",
      description: "The big card at the bottom that encourages people to reach out.",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    // === HERO ===
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      fieldset: "hero",
      initialValue: "Your Support is Crucial",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroSubtext",
      title: "Hero Subtext",
      type: "string",
      fieldset: "hero",
      initialValue: "Every act of kindness makes a difference",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      fieldset: "hero",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),

    // === CONTENT ===
    defineField({
      name: "contentTitle",
      title: "Section Title",
      type: "string",
      fieldset: "content",
      initialValue: "How You Can Help",
    }),
    defineField({
      name: "contentSubtext",
      title: "Section Description",
      type: "text",
      fieldset: "content",
      rows: 3,
    }),
    defineField({
      name: "helpMethods",
      title: "Ways to Help",
      type: "array",
      fieldset: "content",
      description: "The cards showing different ways people can support (Donate, Volunteer, Share).",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "text",
              rows: 2,
            }),
            defineField({
              name: "icon",
              title: "Icon Name",
              type: "string",
              description: "Icon from lucide-react (e.g. 'dollar-sign', 'users', 'share-2'). Ask your developer if unsure.",
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        }),
      ],
    }),

    // === CTA ===
    defineField({
      name: "ctaTitle",
      title: "CTA Title",
      type: "string",
      fieldset: "cta",
      initialValue: "Ready to Make a Difference?",
    }),
    defineField({
      name: "ctaText",
      title: "CTA Text",
      type: "text",
      fieldset: "cta",
      rows: 2,
    }),
    defineField({
      name: "ctaButtonText",
      title: "Button Text",
      type: "string",
      fieldset: "cta",
      initialValue: "Contact Us",
    }),
    defineField({
      name: "ctaButtonLink",
      title: "Button Link",
      type: "string",
      fieldset: "cta",
      initialValue: "mailto:office@guardiansofgoodness.org",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Support Page" };
    },
  },
});
