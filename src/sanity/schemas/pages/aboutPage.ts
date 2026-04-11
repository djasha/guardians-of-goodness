import { defineType, defineField, defineArrayMember } from "sanity";
import { UsersIcon } from "@sanity/icons";

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  icon: UsersIcon,
  fieldsets: [
    {
      name: "hero",
      title: "Hero Section",
      description: "The banner at the top of the About page.",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "missionVision",
      title: "Mission & Vision",
      description: "The two cards that describe your mission and vision.",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "timeline",
      title: "Our Journey (Timeline)",
      description: "The story milestones shown on the About page. Add new events as your org grows!",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "quote",
      title: "Inspirational Quote",
      description: "The quote card at the bottom of the page.",
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
      description: "The main heading (e.g. 'Who We Are').",
      initialValue: "Who We Are",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroSubtext",
      title: "Hero Subtext",
      type: "text",
      fieldset: "hero",
      rows: 3,
      description: "Brief intro paragraph about your organization.",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Background Image",
      type: "image",
      fieldset: "hero",
      options: { hotspot: true },
      description: "A wide photo for the top banner. Landscape works best.",
      fields: [
        defineField({ name: "alt", title: "Alt Text", type: "string" }),
      ],
    }),

    // === MISSION & VISION ===
    defineField({
      name: "missionTitle",
      title: "Mission Title",
      type: "string",
      fieldset: "missionVision",
      initialValue: "Our Mission",
    }),
    defineField({
      name: "missionText",
      title: "Mission Text",
      type: "text",
      fieldset: "missionVision",
      rows: 3,
      description: "What your organization does and why.",
    }),
    defineField({
      name: "visionTitle",
      title: "Vision Title",
      type: "string",
      fieldset: "missionVision",
      initialValue: "Our Vision",
    }),
    defineField({
      name: "visionText",
      title: "Vision Text",
      type: "text",
      fieldset: "missionVision",
      rows: 3,
      description: "The future you're working toward.",
    }),

    // === TIMELINE ===
    defineField({
      name: "timelineEvents",
      title: "Timeline Events",
      type: "array",
      fieldset: "timeline",
      description: "Your organization's milestones. Add a new one whenever something big happens!",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({
              name: "year",
              title: "Year",
              type: "string",
              description: "The year this happened (e.g. '2020').",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "title",
              title: "Title",
              type: "string",
              description: "A short name for this milestone.",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "text",
              title: "Description",
              type: "text",
              rows: 4,
              description: "Tell the story of this milestone.",
            }),
            defineField({
              name: "image",
              title: "Photo",
              type: "image",
              options: { hotspot: true },
              description: "A photo from this period.",
              fields: [
                defineField({ name: "alt", title: "Alt Text", type: "string" }),
              ],
            }),
          ],
          preview: {
            select: { title: "title", subtitle: "year", media: "image" },
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
    }),
    defineField({
      name: "quoteAuthor",
      title: "Quote Author",
      type: "string",
      fieldset: "quote",
    }),
  ],
  preview: {
    prepare() {
      return { title: "About Page" };
    },
  },
});
