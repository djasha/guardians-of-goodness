import { defineType, defineField, defineArrayMember } from "sanity";
import { HomeIcon } from "@sanity/icons";

export default defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  icon: HomeIcon,
  fieldsets: [
    {
      name: "hero",
      title: "Hero Section",
      description: "The big banner at the top of the homepage with the main message and photo.",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "stats",
      title: "Bottom Stats",
      description: "The numbers shown at the bottom of the hero (e.g. '200+ Cats Rescued').",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "quote",
      title: "Quote",
      description: "The inspirational quote shown in the hero section.",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    // === HERO ===
    defineField({
      name: "heroHeading",
      title: "Hero Heading",
      type: "text",
      fieldset: "hero",
      rows: 2,
      description: "The big headline text. Keep it short and emotional — 2 lines max.",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "heroHighlight",
      title: "Highlighted Words",
      type: "string",
      fieldset: "hero",
      description: "The part of the heading shown in teal color (e.g. 'need your help'). Must match text in the heading exactly.",
    }),
    defineField({
      name: "heroSubtext",
      title: "Hero Subtext",
      type: "text",
      fieldset: "hero",
      rows: 2,
      description: "The smaller paragraph below the heading. One or two sentences about your mission.",
      validation: (rule) => rule.max(200),
    }),
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      fieldset: "hero",
      options: { hotspot: true },
      description: "The full-width background photo. Use a warm, emotional cat photo (landscape, at least 1920px wide).",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Describe the image for accessibility (e.g. 'A beautiful rescue cat with golden eyes')",
        }),
      ],
    }),
    defineField({
      name: "ctaPrimary",
      title: "Primary Button Text",
      type: "string",
      fieldset: "hero",
      description: "Text for the main call-to-action button (e.g. 'Adopt a Cat').",
      initialValue: "Adopt a Cat",
    }),
    defineField({
      name: "ctaPrimaryLink",
      title: "Primary Button Link",
      type: "string",
      fieldset: "hero",
      description: "Where the main button goes (e.g. '/catalogue').",
      initialValue: "/catalogue",
    }),
    defineField({
      name: "ctaSecondary",
      title: "Secondary Button Text",
      type: "string",
      fieldset: "hero",
      description: "Text for the second button (e.g. 'Consultation').",
      initialValue: "Consultation",
    }),
    defineField({
      name: "ctaSecondaryLink",
      title: "Secondary Button Link",
      type: "string",
      fieldset: "hero",
      description: "Where the second button goes (e.g. '/consultation').",
      initialValue: "/consultation",
    }),

    // === STATS ===
    defineField({
      name: "heroStats",
      title: "Hero Stats",
      type: "array",
      fieldset: "stats",
      description: "The impact numbers shown at the bottom of the hero. Keep to 2-3 items.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "value",
              title: "Number",
              type: "string",
              description: "The stat value (e.g. '200+', '7', '2')",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "What the number represents (e.g. 'Cats Rescued')",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "value" },
          },
        }),
      ],
    }),

    // === QUOTE ===
    defineField({
      name: "quoteText",
      title: "Quote Text",
      type: "text",
      fieldset: "quote",
      rows: 2,
      description: "An inspirational quote about animals.",
    }),
    defineField({
      name: "quoteAuthor",
      title: "Quote Author",
      type: "string",
      fieldset: "quote",
      description: "Who said the quote.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Homepage" };
    },
  },
});
