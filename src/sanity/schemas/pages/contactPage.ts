import { defineType, defineField } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

export default defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  icon: EnvelopeIcon,
  fieldsets: [
    {
      name: "hero",
      title: "Hero Section",
      description: "The banner at the top of the Contact page.",
      options: { collapsible: true, collapsed: false },
    },
    {
      name: "info",
      title: "Contact Info",
      description: "Email, address, phone — also editable in Site Settings. Changes here override Site Settings for this page only.",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      fieldset: "hero",
      initialValue: "Get in Touch",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroSubtext",
      title: "Hero Subtext",
      type: "text",
      fieldset: "hero",
      rows: 2,
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
      name: "emailOverride",
      title: "Email (Override)",
      type: "string",
      fieldset: "info",
      description: "Leave empty to use the email from Site Settings.",
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: "addressOverride",
      title: "Address (Override)",
      type: "string",
      fieldset: "info",
      description: "Leave empty to use the address from Site Settings.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contact Page" };
    },
  },
});
