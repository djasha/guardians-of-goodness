import { Hero } from "@/components/home/Hero";
import { PhilosophyPillars } from "@/components/home/PhilosophyPillars";
import { PartnersCarousel } from "@/components/home/PartnersCarousel";
import { ImpactStats } from "@/components/home/ImpactStats";
import { JoinCTA } from "@/components/home/JoinCTA";
import { InstagramFeed } from "@/components/home/InstagramFeed";
import { getInstagramPosts } from "@/lib/instagram";

export default async function HomePage() {
  const instagramPosts = await getInstagramPosts();

  return (
    <>
      <Hero />
      <PhilosophyPillars />
      <PartnersCarousel />
      <ImpactStats />
      <InstagramFeed posts={instagramPosts} />
      <JoinCTA />
    </>
  );
}
