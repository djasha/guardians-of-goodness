import { defineType, defineField } from "sanity";

export default defineType({
  name: "landingPage",
  title: "Landing Page",
  type: "document",
  icon: () => "✨",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      description: "Used for the browser tab and search results.",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "URL",
      type: "slug",
      description:
        "The URL path, e.g. 'spring-campaign' will be at /p/spring-campaign",
      options: { source: "title", maxLength: 80 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Meta Description",
      type: "text",
      rows: 2,
      description: "Short summary shown in Google search results.",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "puckData",
      title: "Page Content",
      type: "text",
      readOnly: true,
      description:
        "This is managed by the visual Page Editor. Click the 'Edit in Page Builder' button below to change the layout.",
      rows: 3,
    }),
  ],
  preview: {
    select: { title: "title", slug: "slug.current" },
    prepare: ({ title, slug }) => ({
      title: title || "Untitled",
      subtitle: slug ? `/p/${slug}` : "No URL set",
    }),
  },
});
