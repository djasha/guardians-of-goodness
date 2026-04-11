import { groq } from "next-sanity";

export const ALL_CATS_QUERY = groq`
  *[_type == "cat" && visible != false] | order(featured desc, dateAdded desc) {
    _id,
    name,
    "slug": slug.current,
    "photo": photos[0].asset->url,
    age,
    ageCategory,
    gender,
    breed,
    color,
    tags,
    location,
    specialNeeds,
    neutered,
    vaccinated,
    microchipped,
    readyToTravelAbroad,
    adoptionStatus,
    featured,
    visible,
    bond {
      type,
      bondedCat-> {
        _id,
        name,
        "slug": slug.current
      }
    },
    dateAdded
  }
`;

export const CATALOGUE_STATS_QUERY = groq`{
  "available": count(*[_type == "cat" && visible != false && adoptionStatus == "available"]),
  "pending": count(*[_type == "cat" && visible != false && adoptionStatus == "pending"]),
  "adopted": count(*[_type == "cat" && visible != false && adoptionStatus == "adopted"]),
  "total": count(*[_type == "cat" && visible != false])
}`;

export const CAT_BY_SLUG_QUERY = groq`
  *[_type == "cat" && slug.current == $slug][0] {
    _id,
    name,
    "slug": slug.current,
    photos[] {
      _key,
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      alt
    },
    age,
    ageCategory,
    gender,
    breed,
    color,
    tags,
    description,
    location,
    specialNeeds,
    neutered,
    vaccinated,
    microchipped,
    readyToTravelAbroad,
    adoptionStatus,
    featured,
    visible,
    instagramPostUrl,
    adoptionFee,
    bond {
      type,
      bondedCat-> {
        _id,
        name,
        "slug": slug.current
      }
    },
    dateAdded,
    seoTitle,
    seoDescription
  }
`;

export const RELATED_CATS_QUERY = groq`
  *[_type == "cat" && visible != false && adoptionStatus == "available" && _id != $id && (ageCategory == $ageCategory || count((tags[])[@ in $tags]) > 0)] | order(dateAdded desc) [0...4] {
    _id,
    name,
    "slug": slug.current,
    "photo": photos[0].asset->url,
    age,
    ageCategory,
    gender,
    breed,
    adoptionStatus,
    featured,
    tags,
    readyToTravelAbroad,
    neutered,
    vaccinated,
    bond {
      type,
      bondedCat-> {
        _id,
        name,
        "slug": slug.current
      }
    },
    dateAdded
  }
`;

export const CAT_SLUGS_QUERY = groq`
  *[_type == "cat" && defined(slug.current)] { "slug": slug.current }
`;

export const INSTAGRAM_POSTS_QUERY = groq`
  *[_type == "instagramPost" && visible == true] | order(order asc, _createdAt desc) {
    _id,
    image {
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      hotspot,
      crop
    },
    caption,
    postUrl
  }
`;

export const PARTNERS_QUERY = groq`
  *[_type == "partner"] | order(order asc) {
    _id,
    name,
    "logo": logo.asset->url,
    website,
    description,
    order
  }
`;

export const SITE_SETTINGS_QUERY = groq`
  *[_type == "siteSettings"][0] {
    email,
    address,
    phone,
    socialLinks {
      facebook,
      instagram,
      linkedin
    },
    impactStats[] {
      label,
      value,
      suffix
    },
    heroHeading,
    heroSubtext,
    beholdFeedId
  }
`;

export const ARTICLES_QUERY = groq`
  *[_type == "article" && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage {
      asset-> {
        _id,
        url
      },
      hotspot,
      crop
    },
    publishedAt,
    tags
  }
`;

export const ARTICLE_SLUGS_QUERY = groq`
  *[_type == "article" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()] { "slug": slug.current }
`;

export const ARTICLE_BY_SLUG_QUERY = groq`
  *[_type == "article" && slug.current == $slug && defined(publishedAt) && publishedAt <= now()][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    coverImage {
      asset-> {
        _id,
        url,
        metadata {
          dimensions,
          lqip
        }
      },
      hotspot,
      crop,
      alt
    },
    body,
    publishedAt,
    tags,
    seoTitle,
    seoDescription
  }
`;

// ── Page singleton queries ────────────────────────────

export const HOME_PAGE_QUERY = groq`
  *[_type == "homePage" && _id == "homePage"][0] {
    heroHeading,
    heroHighlight,
    heroSubtext,
    heroImage {
      asset-> { _id, url, metadata { dimensions, lqip } },
      alt
    },
    ctaPrimary,
    ctaPrimaryLink,
    ctaSecondary,
    ctaSecondaryLink,
    heroStats[] { _key, value, label },
    quoteText,
    quoteAuthor
  }
`;

export const ABOUT_PAGE_QUERY = groq`
  *[_type == "aboutPage" && _id == "aboutPage"][0] {
    heroTitle,
    heroSubtext,
    heroImage {
      asset-> { _id, url, metadata { dimensions, lqip } },
      alt
    },
    missionTitle,
    missionText,
    visionTitle,
    visionText,
    timelineEvents[] {
      _key,
      year,
      title,
      text,
      image {
        asset-> { _id, url, metadata { dimensions, lqip } },
        alt
      }
    },
    quoteText,
    quoteAuthor
  }
`;

export const PROJECT_PAGE_QUERY = groq`
  *[_type == "projectPage" && _id == $id][0] {
    heroTitle,
    heroSubtext,
    heroBadge,
    heroImage {
      asset-> { _id, url, metadata { dimensions, lqip } },
      alt
    },
    contentBadge,
    contentTitle,
    contentBody,
    contentImage {
      asset-> { _id, url, metadata { dimensions, lqip } },
      alt
    },
    facts[] { _key, value, description },
    ctaText,
    ctaLink
  }
`;

export const SUPPORT_PAGE_QUERY = groq`
  *[_type == "supportPage" && _id == "supportPage"][0] {
    heroTitle,
    heroSubtext,
    heroImage {
      asset-> { _id, url, metadata { dimensions, lqip } },
      alt
    },
    contentTitle,
    contentSubtext,
    helpMethods[] { _key, title, description, icon },
    ctaTitle,
    ctaText,
    ctaButtonText,
    ctaButtonLink
  }
`;

export const CONSULTATION_PAGE_QUERY = groq`
  *[_type == "consultationPage" && _id == "consultationPage"][0] {
    heroTitle,
    heroSubtext,
    heroImage {
      asset-> { _id, url, metadata { dimensions, lqip } },
      alt
    },
    formTitle,
    formSubtext,
    trustPoints[] { _key, text }
  }
`;

export const CONTACT_PAGE_QUERY = groq`
  *[_type == "contactPage" && _id == "contactPage"][0] {
    heroTitle,
    heroSubtext,
    heroImage {
      asset-> { _id, url, metadata { dimensions, lqip } },
      alt
    },
    emailOverride,
    addressOverride
  }
`;
