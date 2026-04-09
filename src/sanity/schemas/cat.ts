import { defineType, defineField } from "sanity";

const PERSONALITY_TAGS = [
  "playful",
  "shy",
  "calm",
  "curious",
  "affectionate",
  "independent",
  "energetic",
  "gentle",
  "talkative",
  "lap cat",
  "good with kids",
  "good with dogs",
  "good with cats",
  "needs patience",
  "food lover",
];

const AGE_CATEGORIES = [
  { title: "Kitten (0-1yr)", value: "kitten" },
  { title: "Young (1-3yr)", value: "young" },
  { title: "Adult (3-7yr)", value: "adult" },
  { title: "Senior (7+yr)", value: "senior" },
];

export default defineType({
  name: "cat",
  title: "Cat",
  type: "document",
  fieldsets: [
    {
      name: "core",
      title: "Core Info",
      options: { collapsible: false },
    },
    {
      name: "details",
      title: "Details",
      description: "Add more details about this cat",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "health",
      title: "Health & Travel",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "bonds",
      title: "Bonds",
      description: "Is this cat bonded with another?",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "advanced",
      title: "Advanced",
      options: { collapsible: true, collapsed: true },
    },
  ],
  fields: [
    // === CORE (always visible) ===
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      fieldset: "core",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      fieldset: "core",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      fieldset: "core",
      of: [{ type: "image", options: { hotspot: true } }],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "gender",
      title: "Gender",
      type: "string",
      fieldset: "core",
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
      name: "ageCategory",
      title: "Age Category",
      type: "string",
      fieldset: "core",
      options: { list: AGE_CATEGORIES, layout: "radio" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "age",
      title: "Age Detail",
      type: "string",
      fieldset: "core",
      description: 'e.g. "~2 years", "6 months"',
    }),
    defineField({
      name: "adoptionStatus",
      title: "Adoption Status",
      type: "string",
      fieldset: "core",
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
      name: "featured",
      title: "Featured",
      type: "boolean",
      fieldset: "core",
      description: "Pin to top of catalogue",
      initialValue: false,
    }),
    defineField({
      name: "visible",
      title: "Visible on Catalogue",
      type: "boolean",
      fieldset: "core",
      description: "Show this cat on the public catalogue",
      initialValue: true,
    }),

    // === DETAILS (collapsed) ===
    defineField({
      name: "breed",
      title: "Breed",
      type: "string",
      fieldset: "details",
    }),
    defineField({
      name: "color",
      title: "Color / Pattern",
      type: "string",
      fieldset: "details",
      description: 'e.g. "orange tabby", "black", "calico"',
    }),
    defineField({
      name: "tags",
      title: "Personality Tags",
      type: "array",
      fieldset: "details",
      of: [{ type: "string" }],
      options: {
        list: PERSONALITY_TAGS.map((tag) => ({ title: tag, value: tag })),
        layout: "tags",
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      fieldset: "details",
      rows: 4,
      description: "Tell their story — personality, background, quirks",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      fieldset: "details",
      description: "Foster home or area",
    }),

    // === HEALTH & TRAVEL (collapsed) ===
    defineField({
      name: "neutered",
      title: "Neutered",
      type: "boolean",
      fieldset: "health",
      initialValue: true,
    }),
    defineField({
      name: "vaccinated",
      title: "Vaccinated",
      type: "boolean",
      fieldset: "health",
      initialValue: true,
    }),
    defineField({
      name: "microchipped",
      title: "Microchipped",
      type: "boolean",
      fieldset: "health",
      initialValue: true,
    }),
    defineField({
      name: "readyToTravelAbroad",
      title: "Ready to Travel Abroad",
      type: "boolean",
      fieldset: "health",
      initialValue: false,
    }),
    defineField({
      name: "specialNeeds",
      title: "Special Needs",
      type: "string",
      fieldset: "health",
    }),

    // === BONDS (collapsed) ===
    defineField({
      name: "bond",
      title: "Bond",
      type: "object",
      fieldset: "bonds",
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

    // === ADVANCED (collapsed) ===
    defineField({
      name: "instagramPostUrl",
      title: "Instagram Post URL",
      type: "url",
      fieldset: "advanced",
    }),
    defineField({
      name: "adoptionFee",
      title: "Adoption Fee",
      type: "number",
      fieldset: "advanced",
    }),
    defineField({
      name: "dateAdded",
      title: "Date Added",
      type: "date",
      fieldset: "advanced",
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
