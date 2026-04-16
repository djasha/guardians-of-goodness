import { defineType, defineField, defineArrayMember } from "sanity";
import { CaseIcon } from "@sanity/icons";

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
  icon: CaseIcon,
  fieldsets: [
    {
      name: "core",
      title: "Core Info",
      description: "The essential info needed to list a cat. Fill this in first.",
      options: { collapsible: false },
    },
    {
      name: "details",
      title: "Details",
      description: "Extra info that makes the profile richer. You can add these later.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "health",
      title: "Health & Travel",
      description: "Medical status and travel readiness.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "bonds",
      title: "Bonds",
      description: "Link bonded cats together so they show up as a pair on the website.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "advanced",
      title: "Advanced",
      description: "Optional extras like Instagram links and adoption fees.",
      options: { collapsible: true, collapsed: true },
    },
    {
      name: "seo",
      title: "SEO",
      description: "Override how this cat appears in Google search results.",
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
      description: "Auto-generated from the name. This is the URL path for the cat's page.",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "photos",
      title: "Photos",
      type: "array",
      fieldset: "core",
      description: "Upload at least one photo. The first photo is the main one shown in the catalogue.",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
          fields: [
            defineField({
              name: "alt",
              title: "Alt Text",
              type: "string",
              description: "Describe the photo for accessibility (e.g. 'Orange tabby cat playing with a toy')",
            }),
          ],
        }),
      ],
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
      description: "Pick the closest age range — this is used for the filter buttons on the website.",
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
      description: "Controls whether this cat shows as Available, Pending, or Adopted on the website.",
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
      description: "e.g. Persian, Siamese, Domestic Shorthair. Leave blank if unknown.",
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
      description: "Select personality traits — these show as tags on the cat's profile and help with filtering.",
      of: [defineArrayMember({ type: "string" })],
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
      description: "Toggle on if this cat has been neutered.",
      initialValue: true,
    }),
    defineField({
      name: "vaccinated",
      title: "Vaccinated",
      type: "boolean",
      fieldset: "health",
      description: "Toggle on if this cat has been vaccinated.",
      initialValue: true,
    }),
    defineField({
      name: "microchipped",
      title: "Microchipped",
      type: "boolean",
      fieldset: "health",
      description: "Toggle on if this cat has been microchipped.",
      initialValue: true,
    }),
    defineField({
      name: "readyToTravelAbroad",
      title: "Ready to Travel Abroad",
      type: "boolean",
      fieldset: "health",
      description: "Turn on if this cat has an EU pet passport and is ready to travel.",
      initialValue: false,
    }),
    defineField({
      name: "specialNeeds",
      title: "Special Needs",
      type: "string",
      fieldset: "health",
      description: "Describe any special care needed (e.g. medication, diet, mobility). Leave blank if none.",
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
          description: "How is this cat bonded with another?",
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
          description: "Select the cat this one is bonded with. They'll be shown together on the website.",
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
      description: "Paste the Instagram post URL for this cat (optional). Shows a link on their profile.",
    }),
    defineField({
      name: "adoptionFee",
      title: "Adoption Fee",
      type: "number",
      fieldset: "advanced",
      description: "Set an adoption fee in euros (optional). Shows on the cat's profile page.",
    }),
    defineField({
      name: "dateAdded",
      title: "Date Added",
      type: "date",
      fieldset: "advanced",
      description: "When this cat was added. Auto-fills to today.",
      initialValue: () => new Date().toISOString().split("T")[0],
    }),

    // === SEO (collapsed) ===
    defineField({
      name: "seoTitle",
      title: "SEO Title",
      type: "string",
      fieldset: "seo",
      description: "Override the page title for search engines. Leave empty to use the cat's name.",
      validation: (rule) => rule.max(60).warning("Keep under 60 characters for best search results"),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO Description",
      type: "text",
      fieldset: "seo",
      rows: 3,
      description: "Override the page description. Leave empty to use the cat's description.",
      validation: (rule) => rule.max(160).warning("Keep under 160 characters for best search results"),
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
