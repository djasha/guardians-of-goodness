import { defineLocations, type PresentationPluginOptions } from "sanity/presentation";

export const resolve: PresentationPluginOptions["resolve"] = {
  locations: {
    homePage: defineLocations({
      message: "This document shows on the home page.",
      tone: "positive",
      locations: [{ title: "Home", href: "/" }],
    }),
    aboutPage: defineLocations({
      message: "This document shows on the About page.",
      tone: "positive",
      locations: [{ title: "About", href: "/about" }],
    }),
    supportPage: defineLocations({
      message: "This document shows on the Support page.",
      tone: "positive",
      locations: [{ title: "Support", href: "/support" }],
    }),
    consultationPage: defineLocations({
      message: "This document shows on the Consultation page.",
      tone: "positive",
      locations: [{ title: "Consultation", href: "/consultation" }],
    }),
    contactPage: defineLocations({
      message: "This document shows on the Contact page.",
      tone: "positive",
      locations: [{ title: "Contact", href: "/contact" }],
    }),
    projectPage: defineLocations({
      select: { id: "_id", title: "heroTitle" },
      resolve: (doc) => {
        const slug = doc?.id === "tnrPage" ? "tnr" : doc?.id === "hbsPage" ? "hbs" : null;
        return {
          locations: slug
            ? [{ title: doc?.title || "Project", href: `/projects/${slug}` }]
            : [],
        };
      },
    }),
    cat: defineLocations({
      select: { title: "name", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || "Cat", href: `/catalogue/${doc?.slug}` },
          { title: "All cats", href: "/catalogue" },
        ],
      }),
    }),
    article: defineLocations({
      select: { title: "title", slug: "slug.current" },
      resolve: (doc) => ({
        locations: [
          { title: doc?.title || "Article", href: `/education/${doc?.slug}` },
          { title: "Education", href: "/education" },
        ],
      }),
    }),
    siteSettings: defineLocations({
      message: "Changes here appear sitewide (header, footer, stats).",
      tone: "caution",
      locations: [{ title: "Home", href: "/" }],
    }),
    siteChrome: defineLocations({
      message: "Header and footer appear on every page.",
      tone: "caution",
      locations: [{ title: "Home", href: "/" }],
    }),
    landingPage: defineLocations({
      select: {
        title: "title",
        slug: "slug.current",
        parentSlug: "parent.slug.current",
        grandparentSlug: "parent.parent.slug.current",
        isHomepage: "isHomepage",
      },
      resolve: (doc) => {
        if (!doc?.slug) return { locations: [] };
        if (doc.isHomepage) {
          return {
            locations: [
              { title: doc?.title || "Home", href: "/" },
              { title: "Open in Page Builder", href: `/admin/editor/${doc.slug}` },
            ],
          };
        }
        const segments = [doc.grandparentSlug, doc.parentSlug, doc.slug].filter(
          (s): s is string => typeof s === "string" && s.length > 0
        );
        const href = "/" + segments.join("/");
        return {
          locations: [
            { title: doc?.title || "Page", href },
            { title: "Open in Page Builder", href: `/admin/editor/${doc.slug}` },
          ],
        };
      },
    }),
  },
};
