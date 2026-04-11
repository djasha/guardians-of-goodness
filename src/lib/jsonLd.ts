import { SITE, SOCIAL } from "./constants";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: SITE.name,
    url: SITE.url,
    description:
      "Nonprofit animal welfare organization in Amman, Jordan dedicated to TNR programs, humane behavior support, education, and community outreach.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Amman",
      addressRegion: "Jabal Amman",
      addressCountry: "JO",
    },
    email: SITE.email,
    sameAs: [SOCIAL.facebook, SOCIAL.instagram, SOCIAL.linkedin],
  };
}

export function articleJsonLd(article: {
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  coverImageUrl?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    url: `${SITE.url}/education/${article.slug}`,
    ...(article.excerpt && { description: article.excerpt }),
    ...(article.publishedAt && { datePublished: article.publishedAt }),
    ...(article.coverImageUrl && { image: article.coverImageUrl }),
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
