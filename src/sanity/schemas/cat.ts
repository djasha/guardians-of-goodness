import { defineType, defineField } from "sanity";

export default defineType({
  name: "cat",
  title: "Cat",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "age",
      title: "Age",
      type: "string",
    }),
    defineField({
      name: "gender",
      title: "Gender",
      type: "string",
      options: {
        list: [
          { title: "Male", value: "male" },
          { title: "Female", value: "female" },
        ],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "breed",
      title: "Breed",
      type: "string",
    }),
    defineField({
      name: "personality",
      title: "Personality",
      type: "text",
    }),
    defineField({
      name: "specialNeeds",
      title: "Special Needs",
      type: "string",
    }),
    defineField({
      name: "neutered",
      title: "Neutered",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "vaccinated",
      title: "Vaccinated",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "microchipped",
      title: "Microchipped",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "readyToTravelAbroad",
      title: "Ready to Travel Abroad",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "adoptionStatus",
      title: "Adoption Status",
      type: "string",
      options: {
        list: [
          { title: "Available", value: "available" },
          { title: "Pending", value: "pending" },
          { title: "Adopted", value: "adopted" },
        ],
      },
      initialValue: "available",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "bond",
      title: "Bond",
      type: "object",
      fields: [
        defineField({
          name: "type",
          title: "Bond Type",
          type: "string",
          options: {
            list: [
              { title: "Bonded Pair", value: "bonded-pair" },
              { title: "Bonded Trio", value: "bonded-trio" },
              { title: "Prefers Company", value: "prefers-company" },
            ],
          },
        }),
        defineField({
          name: "bondedCat",
          title: "Bonded Cat",
          type: "reference",
          to: [{ type: "cat" }],
        }),
      ],
    }),
    defineField({
      name: "dateAdded",
      title: "Date Added",
      type: "date",
      initialValue: () => new Date().toISOString().split("T")[0],
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "adoptionStatus",
      media: "photos.0",
    },
  },
});
