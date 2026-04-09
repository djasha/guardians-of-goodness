import { client } from "@/sanity/client";
import { INSTAGRAM_POSTS_QUERY, SITE_SETTINGS_QUERY } from "@/sanity/queries";
import type { InstagramPost, SiteSettings } from "@/sanity/types";

/** Shape consumed by the InstagramFeed component */
export interface NormalizedPost {
  id: string;
  src: string;
  lqip?: string;
  alt: string;
  caption?: string;
  postUrl: string;
  /** True when image is a Sanity asset (use next/image with sanity domain) */
  isSanityImage: boolean;
}

/** Behold API response shape */
interface BeholdMedia {
  id: string;
  mediaUrl: string;
  thumbnailUrl?: string;
  caption?: string;
  permalink: string;
  mediaType: string;
}

interface BeholdResponse {
  media: BeholdMedia[];
}

const INSTAGRAM_URL = "https://www.instagram.com/guardians_of_goodness/";

async function fetchBehold(feedId: string): Promise<NormalizedPost[]> {
  const res = await fetch(`https://feeds.behold.so/${feedId}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) return [];

  const data: BeholdResponse = await res.json();

  return data.media
    .filter((m) => m.mediaType === "IMAGE" || m.mediaType === "CAROUSEL_ALBUM")
    .slice(0, 12)
    .map((m) => ({
      id: m.id,
      src: m.mediaUrl,
      alt: m.caption ? m.caption.substring(0, 80) : "Instagram post",
      caption: m.caption ?? undefined,
      postUrl: m.permalink,
      isSanityImage: false,
    }));
}

function normalizeSanityPosts(posts: InstagramPost[]): NormalizedPost[] {
  return posts.map((p) => {
    // If image was uploaded to Sanity, use it directly
    if (p.image?.asset?.url) {
      return {
        id: p._id,
        src: p.image.asset.url,
        lqip: p.image.asset.metadata?.lqip,
        alt: p.caption ? p.caption.substring(0, 80) : "Instagram post",
        caption: p.caption ?? undefined,
        postUrl: p.postUrl || INSTAGRAM_URL,
        isSanityImage: true,
      };
    }

    // Otherwise, use our API route to proxy the Instagram image
    const proxyUrl = p.postUrl
      ? `/api/instagram-image?url=${encodeURIComponent(p.postUrl)}`
      : "/images/generated/hero-cat-hd.jpg"; // ultimate fallback

    return {
      id: p._id,
      src: proxyUrl,
      alt: p.caption ? p.caption.substring(0, 80) : "Instagram post",
      caption: p.caption ?? undefined,
      postUrl: p.postUrl || INSTAGRAM_URL,
      isSanityImage: false,
    };
  });
}

/**
 * Fetches Instagram posts using the two-tier strategy:
 * 1. If beholdFeedId is set in site settings, fetch from Behold
 * 2. Otherwise, fetch curated posts from Sanity
 * Returns empty array if both fail.
 */
export async function getInstagramPosts(): Promise<NormalizedPost[]> {
  try {
    const settings = await client.fetch<SiteSettings>(SITE_SETTINGS_QUERY);

    if (settings?.beholdFeedId) {
      const beholdPosts = await fetchBehold(settings.beholdFeedId);
      if (beholdPosts.length > 0) return beholdPosts;
    }

    const sanityPosts = await client.fetch<InstagramPost[]>(INSTAGRAM_POSTS_QUERY);
    if (sanityPosts && sanityPosts.length > 0) {
      return normalizeSanityPosts(sanityPosts);
    }

    return [];
  } catch {
    return [];
  }
}
