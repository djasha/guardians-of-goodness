/**
 * Seed page content documents into Sanity.
 * Run: node scripts/seed-pages.mjs
 *
 * This creates the initial page documents so the admin can start editing.
 * Safe to run multiple times — uses createOrReplace with fixed IDs.
 */
import { createClient } from "next-sanity";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, "../.env.local") });

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2026-04-09",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

const documents = [
  {
    _id: "homePage",
    _type: "homePage",
    heroHeading: "Our four-legged furry friends need your help",
    heroHighlight: "need your help",
    heroSubtext:
      "We invite you to participate with us in creating a better environment for cats and dogs in Jordan.",
    ctaPrimary: "Adopt a Cat",
    ctaPrimaryLink: "/catalogue",
    ctaSecondary: "Consultation",
    ctaSecondaryLink: "/consultation",
    heroStats: [
      { _key: "stat1", value: "200+", label: "Cats Rescued" },
      { _key: "stat2", value: "7", label: "Vet Partners" },
      { _key: "stat3", value: "2", label: "Projects" },
    ],
    quoteText:
      "The greatness of a nation can be judged by the way its animals are treated.",
    quoteAuthor: "Mahatma Gandhi",
  },
  {
    _id: "aboutPage",
    _type: "aboutPage",
    heroTitle: "Who We Are",
    heroSubtext:
      "Guardians of Goodness is a non-profit organization that focuses on creating a friendly environment for cats and dogs in Jordan and empowering people active in the mentioned above sphere with knowledge, expertise and technical support.",
    missionTitle: "Our Mission",
    missionText:
      "To decrease the number of stray cats and dogs in Jordan and improve the quality of their lives through creating a friendly environment for them.",
    visionTitle: "Our Vision",
    visionText:
      "Every life on this planet is valuable and deserves to be treated decently and live in harmony with all creatures on the Globe.",
    timelineEvents: [
      {
        _key: "evt2020",
        year: "2020",
        title: "Where It All Began",
        text: "Our journey started in Jordan from rescuing street cats in Amman. In 2020, the Corona outbreak and its impact on social activities made survival of street animals harder than ever before. Millions of street cats and dogs in Jordan lost their usual source of food when due to curfew, restaurants, groceries, and shops suspended their work. That is when our founder fostered her first cat family. Shortly, more and more cats appeared, and gradually their number reached one hundred.",
      },
      {
        _key: "evt2022",
        year: "2022",
        title: "Building Networks",
        text: "In 2022, the first steps were made towards connecting with other players in the field of animal rescue in Jordan and building networks of activists who share the same values.",
      },
      {
        _key: "evt2023",
        year: "2023",
        title: "Official Launch",
        text: "After months of organizational process, in 2023 Guardians of Goodness finally got its legal status and launched its first official project for improving one of the neighborhoods in Jabal Amman.",
      },
    ],
    quoteText:
      "The greatness of a nation can be judged by the way its animals are treated.",
    quoteAuthor: "Mahatma Gandhi",
  },
  {
    _id: "projectPage-tnr",
    _type: "projectPage",
    slug: { _type: "slug", current: "tnr" },
    internalTitle: "TNR — Trap-Neuter-Return",
    heroTitle: "Trap-Neuter-Return (TNR)",
    heroSubtext:
      "The most humane and efficient approach to managing stray animal populations and improving their quality of life.",
    heroBadge: "Project",
    contentBadge: "About TNR",
    contentTitle: "What is TNR?",
    facts: [
      {
        _key: "fact1",
        value: "1-1.5",
        description:
          "years — average lifespan of an unhelped stray cat",
      },
      {
        _key: "fact2",
        value: "+3-5",
        description: "extra years TNR can add to a stray cat's life",
      },
    ],
    ctaText: "Join Our TNR Initiative",
    ctaLink: "/consultation",
  },
  {
    _id: "projectPage-hbs",
    _type: "projectPage",
    slug: { _type: "slug", current: "hbs" },
    internalTitle: "HBS — Home Based Shelter",
    heroTitle: "Home Based Shelter (HBS)",
    heroSubtext:
      "Creating safe spaces in your neighborhood for community cats to thrive and find shelter.",
    heroBadge: "Project",
    contentBadge: "About HBS",
    contentTitle: "What is HBS?",
    facts: [
      {
        _key: "fact1",
        value: "Safe Space",
        description:
          "Shelter from extreme heat, cold, rain, and danger",
      },
      {
        _key: "fact2",
        value: "Community",
        description: "Turn gardens and yards into havens for cats",
      },
    ],
    ctaText: "Apply for Membership",
    ctaLink: "/consultation",
  },
  {
    _id: "supportPage",
    _type: "supportPage",
    heroTitle: "Your Support is Crucial",
    heroSubtext: "Every act of kindness makes a difference",
    contentTitle: "How You Can Help",
    contentSubtext:
      "We are non-profit, which means our abilities are defined by the level of your participation. We appreciate any contribution that may help us get closer to our goals.",
    helpMethods: [
      {
        _key: "donate",
        title: "Donate",
        description:
          "Financial contributions help cover vet costs, food, and shelter.",
        icon: "dollar-sign",
      },
      {
        _key: "volunteer",
        title: "Volunteer",
        description:
          "Give your time and skills to help with our rescue and care programs.",
        icon: "users",
      },
      {
        _key: "share",
        title: "Spread the Word",
        description:
          "Share our mission with friends and family to raise awareness.",
        icon: "share-2",
      },
    ],
    ctaTitle: "Ready to Make a Difference?",
    ctaText:
      "Reach out and let us know how you would like to help. Every contribution counts.",
    ctaButtonText: "Contact Us",
    ctaButtonLink: "mailto:office@guardiansofgoodness.org",
  },
  {
    _id: "consultationPage",
    _type: "consultationPage",
    heroTitle: "We are here to help you to help them",
    heroSubtext:
      "Whether you have questions about TNR, want to set up a home based shelter, or need advice on caring for community cats, our team is ready to support you.",
    formTitle: "Request a Consultation",
    formSubtext: "Fill out the form and we'll get back to you.",
    trustPoints: [
      { _key: "tp1", text: "Expert guidance on stray cat care" },
      { _key: "tp2", text: "TNR program support and training" },
      { _key: "tp3", text: "Home shelter setup assistance" },
      { _key: "tp4", text: "Completely free of charge" },
    ],
  },
  {
    _id: "contactPage",
    _type: "contactPage",
    heroTitle: "Get in Touch",
    heroSubtext:
      "Whether you want to adopt, volunteer, or just say hi — we'd love to hear from you.",
  },
];

async function seed() {
  console.log(`Seeding ${documents.length} page documents...`);

  for (const doc of documents) {
    try {
      await client.createOrReplace(doc);
      console.log(`  ✓ ${doc._type} (${doc._id})`);
    } catch (err) {
      console.error(`  ✗ ${doc._type} (${doc._id}):`, err.message);
    }
  }

  console.log("\nDone! Open /studio to see the pages.");
}

seed();
