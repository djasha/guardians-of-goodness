import { defineType, defineField } from "sanity";
import { UsersIcon } from "@sanity/icons";

export default defineType({
  name: "partner",
  title: "Partner",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      fields: [
        defineField({
          name: "alt",
          title: "Alt Text",
          type: "string",
          description: "Describe the logo for accessibility (e.g. 'Vet clinic name logo')",
        }),
      ],
    }),
    defineField({
      name: "website",
      title: "Website",
      type: "url",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "logo",
    },
  },
});
