import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { PawPrint } from "@/components/ui/PawPrint";
import { client } from "@/sanity/client";
import { PROJECT_PAGE_QUERY } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "TNR — Trap-Neuter-Return",
  description:
    "Learn about our Trap-Neuter-Return program — the most humane and efficient way to manage stray animal populations in Jordan.",
};

export default async function TNRPage() {
  const pageData = await client.fetch(PROJECT_PAGE_QUERY, { id: "projectPage-tnr" }, { next: { tags: ["projectPage"] } }).catch(() => null);
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-secondary overflow-hidden">
        <div className="absolute inset-0">
          <Image src={pageData?.heroImage?.asset?.url || "/images/real-cats/free-3.png"} alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-secondary/85 via-secondary/60 to-secondary/25" />
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
                  {pageData?.heroTitle || "Trap-Neuter-Return (TNR)"}
                </h1>
                <PawPrint className="w-10 h-11 text-white/30 hidden sm:block flex-shrink-0" />
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <p className="text-lg sm:text-xl text-white/80 max-w-2xl">
                {pageData?.heroSubtext || "The most humane and efficient approach to managing stray animal populations and improving their quality of life."}
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
                  src={pageData?.contentImage?.asset?.url || "/images/content/tnr-image.png"}
                  alt="TNR process — Trap Neuter Return"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Text Content */}
          <div>
            <ScrollReveal>
              <div className="neo-border-sm neo-shadow-sm bg-secondary text-white inline-block px-4 py-1.5 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest">{pageData?.contentBadge || "About TNR"}</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-dark mb-6">
                {pageData?.contentTitle || "What is TNR?"}
              </h2>
              <p className="leading-relaxed text-dark/60 mb-6">
                Neutering stray animals is the most humane and efficient way to
                avoid overpopulation and improve the quality of lives of the
                animals at the same time. Each intact cat or dog roaming in the
                streets is a source of the rapidly growing number of stray
                animals in Jordan.
              </p>
            </ScrollReveal>

            {/* Key Fact Cards */}
            <ScrollReveal>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {pageData?.facts ? (
                  pageData.facts.map((fact: { _key: string; value: string; description: string }, index: number) => (
                    <div key={fact._key} className="neo-border-sm bg-cream p-4">
                      <p className={`font-display font-black ${index === 0 ? "text-dark" : "text-secondary"} text-2xl mb-1`}>{fact.value}</p>
                      <p className="text-dark/60 text-sm">{fact.description}</p>
                    </div>
                  ))
                ) : (
                  <>
                    <div className="neo-border-sm bg-cream p-4">
                      <p className="font-display font-black text-dark text-2xl mb-1">1-1.5</p>
                      <p className="text-dark/60 text-sm">years — average lifespan of an unhelped stray cat</p>
                    </div>
                    <div className="neo-border-sm bg-cream p-4">
                      <p className="font-display font-black text-secondary text-2xl mb-1">+3-5</p>
                      <p className="text-dark/60 text-sm">extra years TNR can add to a stray cat&apos;s life</p>
                    </div>
                  </>
                )}
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <p className="leading-relaxed text-dark/60 mb-6">
                Besides, the duration and quality of their lives are extremely
                low. An average stray cat lives from several months to 1-1.5
                years if not helped by humans. TNR can significantly improve
                quality of life and add at least a few more years to the
                lifespan.
              </p>
              <p className="leading-relaxed text-dark/60 mb-8">
                We encourage you to join our initiative and participate in
                neutering stray cats and dogs in your neighborhood. We can
                support you with knowledge and tools needed for this activity.
              </p>
            </ScrollReveal>

            {/* Paw Decoration */}
            <ScrollReveal>
              <div className="flex gap-2 mb-8">
                <PawPrint className="w-5 h-5 text-secondary/30" />
                <PawPrint className="w-5 h-5 text-secondary/30" />
                <PawPrint className="w-5 h-5 text-secondary/30" />
              </div>

              <MagneticButton href={pageData?.ctaLink || "/consultation"} variant="primary" size="md">
                {pageData?.ctaText || "Join Our TNR Initiative"}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </MagneticButton>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
