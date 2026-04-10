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
      description: "The big heading text on the homepage hero section.",
    }),
    defineField({
      name: "heroSubtext",
      title: "Hero Subtext",
      type: "text",
      rows: 3,
      description: "The smaller text below the heading on the homepage.",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      description: "Contact email shown in the footer and contact page.",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "string",
      description: "Physical address shown in the footer.",
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      description: "Phone number shown in the footer and contact page.",
    }),
    defineField({
      name: "socialLinks",
      title: "Social Links",
      type: "object",
      description: "Links to your social media profiles.",
      fields: [
        defineField({
          name: "facebook",
          title: "Facebook",
          type: "url",
          description: "Full URL to your Facebook page.",
        }),
        defineField({
          name: "instagram",
          title: "Instagram",
          type: "url",
          description: "Full URL to your Instagram profile.",
        }),
        defineField({
          name: "linkedin",
          title: "LinkedIn",
          type: "url",
          description: "Full URL to your LinkedIn page.",
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
      description: "The numbers shown on the homepage (e.g. 200+ cats rescued, 7 vet partners).",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "label",
              title: "Label",
              type: "string",
              description: "What this stat counts (e.g. 'Cats Rescued')",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "value",
              title: "Value",
              type: "number",
              description: "The number to display",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "suffix",
              title: "Suffix",
              type: "string",
              description: "Optional text after the number (e.g. '+' to show '200+')",
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
