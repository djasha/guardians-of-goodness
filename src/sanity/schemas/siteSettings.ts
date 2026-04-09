import { defineType, defineField } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "heroHeading",
      title: "Hero Heading",
      type: "string",
    }),
    defineField({
      name: "heroSubtext",
      title: "Hero Subtext",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      fields: [
        defineField({
          name: "facebook",
          title: "Facebook",
          type: "url",
        }),
        defineField({
          name: "instagram",
          title: "Instagram",
          type: "url",
        }),
        defineField({
          name: "linkedin",
          title: "LinkedIn",
          type: "url",
        }),
      ],
    }),
    defineField({
      name: "beholdFeedId",
      title: "Behold.so Feed ID (Optional)",
      type: "string",
      description:
        "Paste your Behold.so feed ID here to auto-sync Instagram posts. Leave empty to use manually curated posts below.",
    }),
    defineField({
      name: "impactStats",
      title: "Impact Stats",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "number",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "suffix",
              title: "Suffix",
              type: "string",
            }),
          ],
          preview: {
            select: {
              title: "label",
              value: "value",
              suffix: "suffix",
            },
            prepare({ title, value, suffix }) {
              return {
                title,
                subtitle: `${value ?? ""}${suffix ?? ""}`,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
