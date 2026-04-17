import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { PawPrint } from "@/components/ui/PawPrint";
import { client } from "@/sanity/client";
import { PROJECT_PAGE_QUERY } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "HBS — Home Based Shelter",
  description:
    "Learn about our Home Based Shelter initiative — helping people create safe spaces for community cats in their neighborhoods.",
};

export default async function HBSPage() {
  const pageData = await client.fetch(PROJECT_PAGE_QUERY, { id: "projectPage-hbs" }, { next: { tags: ["projectPage"] } }).catch(() => null);
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-accent overflow-hidden">
        <div className="absolute inset-0">
          <Image src={pageData?.heroImage?.asset?.url || "/images/content/cat-photo.jpg"} alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-accent/85 via-accent/60 to-accent/25" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="neo-border-sm neo-shadow-sm bg-dark text-white inline-block px-4 py-1.5 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest">{pageData?.heroBadge || "Project"}</span>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-6">
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white">
                  {pageData?.heroTitle || "Home Based Shelter (HBS)"}
                </h1>
                <PawPrint className="w-10 h-11 text-white/30 hidden sm:block flex-shrink-0" />
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <p className="text-lg sm:text-xl text-white/80 max-w-2xl">
                {pageData?.heroSubtext || "Creating safe spaces in your neighborhood for community cats to thrive and find shelter."}
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: Image Card */}
          <ScrollReveal>
            <div className="neo-border neo-shadow bg-white p-3">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={pageData?.contentImage?.asset?.url || "/images/content/hbs-image.png"}
                  alt="Home Based Shelter — safe space for cats"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Text Content */}
          <div>
            <ScrollReveal>
              <div className="neo-border-sm neo-shadow-sm bg-accent text-white inline-block px-4 py-1.5 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest">{pageData?.contentBadge || "About HBS"}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-dark mb-6">
                {pageData?.contentTitle || "What is HBS?"}
              </h2>
              <p className="leading-relaxed text-dark/60 mb-6">
                We promote the understanding that stray animals are an integral
                part of the environment. Taking into account all the challenges
                that the modern world brings to their lives (including
                consequences of urbanization) should be a common responsibility
                of each society member.
              </p>
            </ScrollReveal>

            {/* Key Fact Cards */}
            <ScrollReveal>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {pageData?.facts ? (
                  pageData.facts.map((fact: { _key: string; value: string; description: string }) => (
                    <div key={fact._key} className="neo-border-sm bg-cream p-4">
                      <p className="font-display font-black text-accent text-lg mb-1">{fact.value}</p>
                      <p className="text-dark/60 text-sm">{fact.description}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="neo-border-sm bg-cream p-4">
                      <p className="font-display font-black text-accent text-lg mb-1">Safe Space</p>
                      <p className="text-dark/60 text-sm">Shelter from extreme heat, cold, rain, and danger</p>
                    </div>
                    <div className="neo-border-sm bg-cream p-4">
                      <p className="font-display font-black text-accent text-lg mb-1">Community</p>
                      <p className="text-dark/60 text-sm">Turn gardens and yards into havens for cats</p>
                    </div>
                  </>
                )}
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <p className="leading-relaxed text-dark/60 mb-6">
                Based on this belief, we launched an initiative to help people
                create a safe space in their neighborhood for community cats. As
                long as the cats are vaccinated and neutered, the main challenge
                is to find a place where they can survive extreme heat in summer
                and cold and rains in winter, as well as find food and hide from
                danger.
              </p>
              <p className="leading-relaxed text-dark/60 mb-8">
                We encourage people to turn their gardens and yards into such a
                safe space, and we are happy to guide and support everyone on
                this path.
              </p>
            </ScrollReveal>

            {/* Paw Decoration */}
            <ScrollReveal>
              <div className="flex gap-2 mb-8">
                <PawPrint className="w-5 h-5 text-accent/30" />
                <PawPrint className="w-5 h-5 text-accent/30" />
                <PawPrint className="w-5 h-5 text-accent/30" />
              </div>

              <MagneticButton href={pageData?.ctaLink || "/consultation"} variant="primary" size="md">
                {pageData?.ctaText || "Apply for Membership"}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </MagneticButton>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
