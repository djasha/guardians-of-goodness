import { groq } from "next-sanity";

export const ALL_CATS_QUERY = groq`
  *[_type == "cat" && adoptionStatus != "adopted"] | order(dateAdded desc) {
    _id,
    name,
    slug,
    "photo": photos[0] {
      asset-> {
        _id,
        url
      },
      hotspot,
      crop
    },
    age,
    gender,
    breed,
    adoptionStatus,
    bond {
      type,
      bondedCat-> {
        _id,
        name,
        slug
      }
    },
    dateAdded
  }
`;

export const CAT_BY_SLUG_QUERY = groq`
  *[_type == "cat" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    photos[] {
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
    age,
    gender,
    breed,
    personality,
    specialNeeds,
    neutered,
    vaccinated,
    microchipped,
    readyToTravelAbroad,
    adoptionStatus,
    bond {
      type,
      bondedCat-> {
        _id,
        name,
        slug
      }
    },
    dateAdded
  }
`;

export const CAT_SLUGS_QUERY = groq`
  *[_type == "cat" && defined(slug.current)].slug.current
`;

export const PARTNERS_QUERY = groq`
  *[_type == "partner"] | order(order asc) {
    _id,
    name,
    logo {
      asset-> {
        _id,
        url
      }
    },
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
    beholdFeedId,
    impactStats[] {
      label,
      value,
      suffix
    },
    heroHeading,
    heroSubtext
  }
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

export const ARTICLES_QUERY = groq`
  *[_type == "article"] | order(publishedAt desc) {
    _id,
    title,
    slug,
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

export const ARTICLE_BY_SLUG_QUERY = groq`
  *[_type == "article" && slug.current == $slug][0] {
    _id,
    title,
    slug,
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
      crop
    },
    body,
    publishedAt,
    tags
  }
`;
