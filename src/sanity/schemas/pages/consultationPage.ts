import { defineType, defineField, defineArrayMember } from "sanity";
import { CommentIcon } from "@sanity/icons";

export default defineType({
  name: "consultationPage",
  title: "Consultation Page",
  type: "document",
  icon: CommentIcon,
  fieldsets: [
    {
      name: "hero",
      title: "Hero Section",
      description: "The banner and text on the consultation page.",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "trustPoints",
      title: "Trust Points",
      description: "The bullet points that reassure people (e.g. 'Expert guidance on stray cat care').",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    // === HERO ===
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "text",
      fieldset: "hero",
      rows: 2,
      description: "The big heading. You can use line breaks for emphasis.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroSubtext",
      title: "Hero Subtext",
      type: "text",
      fieldset: "hero",
      rows: 3,
      description: "The paragraph below the heading.",
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
    defineField({
      name: "formTitle",
      title: "Form Title",
      type: "string",
      fieldset: "hero",
      description: "The heading above the consultation form (e.g. 'Request a Consultation').",
      initialValue: "Request a Consultation",
    }),
    defineField({
      name: "formSubtext",
      title: "Form Description",
      type: "string",
      fieldset: "hero",
      description: "The small text below the form title.",
      initialValue: "Fill out the form and we'll get back to you.",
    }),

    // === TRUST POINTS ===
    defineField({
      name: "trustPoints",
      title: "Trust Points",
      type: "array",
      fieldset: "trustPoints",
      description: "Add bullet points that reassure visitors. Keep to 3-5 items.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "text",
              title: "Text",
              type: "string",
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: "text" },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Consultation Page" };
    },
  },
});
