import { defineType, defineField } from "sanity";
import { ImageIcon } from "@sanity/icons";

export default defineType({
  name: "instagramPost",
  title: "Instagram Post",
  type: "document",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "image",
      title: "Image (Optional)",
      type: "image",
      options: { hotspot: true },
      description: "Upload a photo, or leave empty to auto-embed from the Instagram Post URL below.",
    }),
    defineField({
      name: "caption",
      title: "Caption",
      type: "text",
      rows: 4,
      description: "The rescue story or caption text. Shown as a quote overlay on hover.",
    }),
    defineField({
      name: "postUrl",
      title: "Instagram Post URL",
      type: "url",
      description: "Link to the original Instagram post.",
    }),
    defineField({
      name: "visible",
      title: "Visible",
      type: "boolean",
      initialValue: true,
      description: "Toggle off to hide this post without deleting it.",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first. Leave empty to sort by date added.",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "caption",
      media: "image",
      visible: "visible",
    },
    prepare({ title, media, visible }) {
      return {
        title: title ? title.substring(0, 60) + (title.length > 60 ? "…" : "") : "No caption",
        subtitle: visible === false ? "🔴 Hidden" : "🟢 Visible",
        media,
      };
    },
  },
});
