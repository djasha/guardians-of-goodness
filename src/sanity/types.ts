import type { PortableTextBlock } from "next-sanity";

/** Projected cat from ALL_CATS_QUERY (list view) */
export interface Cat {
  _id: string;
  name: string;
  slug: string;
  age?: string;
  gender: "male" | "female";
  breed?: string;
  personality?: string;
  specialNeeds?: string;
  neutered: boolean;
  vaccinated: boolean;
  microchipped: boolean;
  readyToTravelAbroad: boolean;
  adoptionStatus: "available" | "pending" | "adopted";
  photo?: string;
  bond?: {
    type?: string;
    bondedCat?: {
      name: string;
      slug: string;
      photo?: string;
    };
  };
  dateAdded?: string;
}

/** Full cat from CAT_BY_SLUG_QUERY (detail view) */
export interface CatDetail extends Omit<Cat, "photo"> {
  photos: {
    asset: {
      url: string;
      metadata?: {
        dimensions?: { width: number; height: number };
        lqip?: string;
      };
    };
  }[];
  bond?: {
    type?: string;
    bondedCat?: {
      _id: string;
      name: string;
      slug: string;
      photo?: string;
    };
  };
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
  coverImage?: string;
  body?: PortableTextBlock[];
  publishedAt?: string;
  tags?: string[];
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
  impactStats?: {
    label: string;
    value: number;
    suffix?: string;
  }[];
  heroHeading?: string;
  heroSubtext?: string;
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
