import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { PhilosophyPillars } from "@/components/home/PhilosophyPillars";
import { PartnersCarousel } from "@/components/home/PartnersCarousel";
import { ImpactStats } from "@/components/home/ImpactStats";
import { JoinCTA } from "@/components/home/JoinCTA";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { getInstagramPosts } from "@/lib/instagram";
import { organizationJsonLd, safeJsonLd } from "@/lib/jsonLd";
import { sanityFetch } from "@/sanity/lib/live";
import { HOME_PAGE_QUERY } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "Guardians of Goodness — For Animal Welfare",
  description:
    "Nonprofit animal welfare organization in Amman, Jordan. Browse rescued cats, learn about TNR programs, and join our mission.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [instagramPosts, pageResult] = await Promise.all([
    getInstagramPosts(),
    sanityFetch({ query: HOME_PAGE_QUERY, tags: ["homePage"] }).catch(() => ({ data: null })),
  ]);
  const pageData = pageResult.data;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(organizationJsonLd()),
        }}
      />
      <Hero data={pageData} />
      <PhilosophyPillars />
      <PartnersCarousel />
      <ImpactStats />
      <InstagramFeed posts={instagramPosts} />
      <JoinCTA />
    </>
  );
}
