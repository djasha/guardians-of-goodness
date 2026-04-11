import type { PortableTextBlock } from "next-sanity";

/** Projected cat from ALL_CATS_QUERY (list view) */
export interface Cat {
  _id: string;
  name: string;
  slug: string;
  age?: string;
  ageCategory?: "kitten" | "young" | "adult" | "senior";
  gender: "male" | "female";
  breed?: string;
  color?: string;
  tags?: string[];
  description?: string;
  location?: string;
  specialNeeds?: string;
  neutered: boolean;
  vaccinated: boolean;
  microchipped: boolean;
  readyToTravelAbroad: boolean;
  adoptionStatus: "available" | "pending" | "adopted";
  featured?: boolean;
  visible?: boolean;
  photo?: string;
  bond?: {
    type?: string;
    bondedCat?: {
      _id: string;
      name: string;
      slug: string;
    };
  };
  dateAdded?: string;
}

/** Full cat from CAT_BY_SLUG_QUERY (detail view) */
export interface CatDetail extends Omit<Cat, "photo"> {
  photos: {
    _key: string;
    asset: {
      url: string;
      metadata?: {
        dimensions?: { width: number; height: number };
        lqip?: string;
      };
    };
    alt?: string;
  }[];
  instagramPostUrl?: string;
  adoptionFee?: number;
  seoTitle?: string;
  seoDescription?: string;
  bond?: {
    type?: string;
    bondedCat?: {
      _id: string;
      name: string;
      slug: string;
    };
  };
}

/** Stats for catalogue hero */
export interface CatalogueStats {
  available: number;
  pending: number;
  adopted: number;
  total: number;
}

/** Projected partner from PARTNERS_QUERY */
export interface Partner {
  _id: string;
  name: string;
  logo: string;
  website?: string;
}

/** Projected article from ARTICLES_QUERY */
export interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage?: {
    asset: {
      _id: string;
      url: string;
      metadata?: {
        dimensions?: { width: number; height: number };
        lqip?: string;
      };
    };
    hotspot?: { x: number; y: number };
    crop?: { top: number; bottom: number; left: number; right: number };
    alt?: string;
  };
  body?: PortableTextBlock[];
  publishedAt?: string;
  tags?: string[];
  seoTitle?: string;
  seoDescription?: string;
}

export interface SiteSettings {
  email?: string;
  address?: string;
  phone?: string;
  socialLinks?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  beholdFeedId?: string;
  impactStats?: {
    label: string;
    value: number;
    suffix?: string;
  }[];
  heroHeading?: string;
  heroSubtext?: string;
}

/** Normalized Instagram post for the feed component */
export interface InstagramPost {
  _id: string;
  image?: {
    asset: {
      _id: string;
      url: string;
      metadata?: {
        dimensions?: { width: number; height: number };
        lqip?: string;
      };
    };
    hotspot?: { x: number; y: number };
    crop?: { top: number; bottom: number; left: number; right: number };
  };
  caption?: string;
  postUrl?: string;
}

export interface FormSubmission {
  _id: string;
  formType: "join-us" | "consultation" | "adoption-inquiry";
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  extraFields?: string;
  submittedAt?: string;
  status: "new" | "read" | "responded";
  cat?: { _id: string; name: string };
}
