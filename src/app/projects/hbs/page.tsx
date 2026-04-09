import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <Image
          src="/images/content/keanu1.png"
          alt="Home Based Shelter Program"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 to-dark/50" />
        <div className="relative z-10 text-center px-4">
          <ScrollReveal>
            <div className="neo-border-sm neo-shadow-sm bg-primary text-white inline-block px-4 py-1.5 mb-6">
              <span className="text-xs font-bold uppercase tracking-widest">Our Programs</span>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
              Home Based Shelter
            </h1>
          </ScrollReveal>
          <ScrollReveal>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
              Creating safe spaces for community cats
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollReveal>
            <div>
              <div className="neo-border-sm neo-shadow-sm bg-primary text-white inline-block px-4 py-1.5 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest">About HBS</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-dark mb-6">
                What is HBS?
              </h2>
              <p className="leading-relaxed text-dark/50 mb-6">
                We promote the understanding that stray animals are an integral
                part of the environment. Taking into account all the challenges
                that the modern world brings to their lives (including
                consequences of urbanization) should be a common responsibility
                of each society member.
              </p>
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

              {/* Cat paw decoration */}
              <div className="flex gap-2 mb-8">
                <svg className="w-5 h-5 text-primary/20" viewBox="0 0 40 44" fill="currentColor"><ellipse cx="20" cy="30" rx="10" ry="9"/><circle cx="8" cy="16" r="4.5"/><circle cx="17" cy="10" r="4"/><circle cx="27" cy="10" r="4"/><circle cx="35" cy="16" r="4.5"/></svg>
                <svg className="w-5 h-5 text-primary/20" viewBox="0 0 40 44" fill="currentColor"><ellipse cx="20" cy="30" rx="10" ry="9"/><circle cx="8" cy="16" r="4.5"/><circle cx="17" cy="10" r="4"/><circle cx="27" cy="10" r="4"/><circle cx="35" cy="16" r="4.5"/></svg>
                <svg className="w-5 h-5 text-primary/20" viewBox="0 0 40 44" fill="currentColor"><ellipse cx="20" cy="30" rx="10" ry="9"/><circle cx="8" cy="16" r="4.5"/><circle cx="17" cy="10" r="4"/><circle cx="27" cy="10" r="4"/><circle cx="35" cy="16" r="4.5"/></svg>
              </div>

              <Link
                href="/consultation"
                className="neo-border-sm neo-shadow-sm neo-hover bg-primary text-white font-bold px-6 py-3 inline-flex items-center gap-2"
              >
                Apply for Membership
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Link>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative aspect-[4/3] neo-border neo-shadow bg-white overflow-hidden">
              <Image
                src="/images/content/hbs-image.png"
                alt="Home Based Shelter — safe space for cats"
                fill
                className="object-cover"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
