import { defineType, defineField, defineArrayMember } from "sanity";
import { RocketIcon } from "@sanity/icons";

export default defineType({
  name: "projectPage",
  title: "Project Page",
  type: "document",
  icon: RocketIcon,
  fieldsets: [
    {
      name: "hero",
      title: "Hero Section",
      description: "The banner at the top of this project page.",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "content",
      title: "Main Content",
      description: "The text and images that describe this project.",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "facts",
      title: "Key Facts",
      description: "The 2 highlight boxes with key stats or facts.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "cta",
      title: "Call to Action",
      description: "The button at the bottom of the page.",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    // Internal identifier
    defineField({
      name: "slug",
      title: "Page Slug",
      type: "slug",
      description: "Must match the URL path: 'tnr' for /projects/tnr, 'hbs' for /projects/hbs.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "internalTitle",
      title: "Internal Title",
      type: "string",
      description: "Only shown in the Studio sidebar — not on the website.",
      validation: (rule) => rule.required(),
    }),

    // === HERO ===
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      fieldset: "hero",
      description: "The big heading on the project page.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroSubtext",
      title: "Hero Subtext",
      type: "text",
      fieldset: "hero",
      rows: 2,
      description: "A one-line summary of this project.",
    }),
    defineField({
      name: "heroBadge",
      title: "Badge Text",
      type: "string",
      fieldset: "hero",
      description: "The small label above the title (e.g. 'Project').",
      initialValue: "Project",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      fieldset: "hero",
      options: { hotspot: true },
      description: "The banner photo for this project page.",
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),

    // === CONTENT ===
    defineField({
      name: "contentBadge",
      title: "Section Badge",
      type: "string",
      fieldset: "content",
      description: "The small label above the content title (e.g. 'About TNR').",
    }),
    defineField({
      name: "contentTitle",
      title: "Content Title",
      type: "string",
      fieldset: "content",
      description: "The heading for the main content section (e.g. 'What is TNR?').",
    }),
    defineField({
      name: "contentBody",
      title: "Content Body",
      type: "array",
      fieldset: "content",
      description: "The main text content. You can add multiple paragraphs.",
      of: [defineArrayMember({ type: "block" })],
    }),
    defineField({
      name: "contentImage",
      title: "Content Image",
      type: "image",
      fieldset: "content",
      options: { hotspot: true },
      description: "The main photo shown alongside the text.",
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),

    // === FACTS ===
    defineField({
      name: "facts",
      title: "Key Facts",
      type: "array",
      fieldset: "facts",
      description: "Two highlight boxes with important numbers or facts.",
      validation: (rule) => rule.max(4),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Value / Title",
              type: "string",
              description: "The bold text (e.g. '1-1.5', 'Safe Space').",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "description",
              title: "Description",
              type: "string",
              description: "Explanation below the value.",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "value", subtitle: "description" },
          },
        }),
      ],
    }),

    // === CTA ===
    defineField({
      name: "ctaText",
      title: "Button Text",
      type: "string",
      fieldset: "cta",
      description: "The call-to-action button text (e.g. 'Join Our TNR Initiative').",
    }),
    defineField({
      name: "ctaLink",
      title: "Button Link",
      type: "string",
      fieldset: "cta",
      description: "Where the button goes (e.g. '/consultation').",
      initialValue: "/consultation",
    }),
  ],
  preview: {
    select: { title: "internalTitle", subtitle: "slug.current" },
    prepare({ title, subtitle }) {
      return {
        title: title || "Untitled Project",
        subtitle: subtitle ? `/projects/${subtitle}` : "No slug set",
      };
    },
  },
});
