import type { Metadata } from "next";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const metadata: Metadata = {
  title: "HBS — Home Based Shelter",
  description:
    "Learn about our Home Based Shelter initiative — helping people create safe spaces for community cats in their neighborhoods.",
};

export default function HBSPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-accent overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/images/content/cat-photo.jpg" alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-accent/85 via-accent/60 to-accent/25" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div className="neo-border-sm neo-shadow-sm bg-dark text-white inline-block px-4 py-1.5 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest">Project</span>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="flex items-center gap-4 mb-6">
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white">
                  Home Based Shelter (HBS)
                </h1>
                <svg className="w-10 h-11 text-white/30 hidden sm:block flex-shrink-0" viewBox="0 0 40 44" fill="currentColor">
                  <ellipse cx="20" cy="30" rx="10" ry="9" />
                  <circle cx="8" cy="16" r="4.5" />
                  <circle cx="17" cy="10" r="4" />
                  <circle cx="27" cy="10" r="4" />
                  <circle cx="35" cy="16" r="4.5" />
                </svg>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <p className="text-lg sm:text-xl text-white/80 max-w-2xl">
                Creating safe spaces in your neighborhood for community cats to thrive and find shelter.
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
                  src="/images/content/hbs-image.png"
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
                <span className="text-xs font-bold uppercase tracking-widest">About HBS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-black text-dark mb-6">
                What is HBS?
              </h2>
              <p className="leading-relaxed text-dark/50 mb-6">
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
                <div className="neo-border-sm bg-cream p-4">
                  <p className="font-display font-black text-accent text-lg mb-1">Safe Space</p>
                  <p className="text-dark/50 text-sm">Shelter from extreme heat, cold, rain, and danger</p>
                </div>
                <div className="neo-border-sm bg-cream p-4">
                  <p className="font-display font-black text-accent text-lg mb-1">Community</p>
                  <p className="text-dark/50 text-sm">Turn gardens and yards into havens for cats</p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <p className="leading-relaxed text-dark/50 mb-6">
                Based on this belief, we launched an initiative to help people
                create a safe space in their neighborhood for community cats. As
                long as the cats are vaccinated and neutered, the main challenge
                is to find a place where they can survive extreme heat in summer
                and cold and rains in winter, as well as find food and hide from
                danger.
              </p>
              <p className="leading-relaxed text-dark/50 mb-8">
                We encourage people to turn their gardens and yards into such a
                safe space, and we are happy to guide and support everyone on
                this path.
              </p>
            </ScrollReveal>

            {/* Paw Decoration */}
            <ScrollReveal>
              <div className="flex gap-2 mb-8">
                <svg className="w-5 h-5 text-accent/30" viewBox="0 0 40 44" fill="currentColor"><ellipse cx="20" cy="30" rx="10" ry="9" /><circle cx="8" cy="16" r="4.5" /><circle cx="17" cy="10" r="4" /><circle cx="27" cy="10" r="4" /><circle cx="35" cy="16" r="4.5" /></svg>
                <svg className="w-5 h-5 text-accent/30" viewBox="0 0 40 44" fill="currentColor"><ellipse cx="20" cy="30" rx="10" ry="9" /><circle cx="8" cy="16" r="4.5" /><circle cx="17" cy="10" r="4" /><circle cx="27" cy="10" r="4" /><circle cx="35" cy="16" r="4.5" /></svg>
                <svg className="w-5 h-5 text-accent/30" viewBox="0 0 40 44" fill="currentColor"><ellipse cx="20" cy="30" rx="10" ry="9" /><circle cx="8" cy="16" r="4.5" /><circle cx="17" cy="10" r="4" /><circle cx="27" cy="10" r="4" /><circle cx="35" cy="16" r="4.5" /></svg>
              </div>

              <MagneticButton href="/consultation" variant="primary" size="md">
                Apply for Membership
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
              </MagneticButton>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
}
