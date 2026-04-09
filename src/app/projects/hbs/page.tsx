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
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
            Home Based Shelter
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Creating safe spaces for community cats
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollReveal>
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                What is HBS?
              </h2>
              <p className="leading-relaxed text-gray-600 mb-6">
                We promote the understanding that stray animals are an integral
                part of the environment. Taking into account all the challenges
                that the modern world brings to their lives (including
                consequences of urbanization) should be a common responsibility
                of each society member.
              </p>
              <p className="leading-relaxed text-gray-600 mb-6">
                Based on this belief, we launched an initiative to help people
                create a safe space in their neighborhood for community cats. As
                long as the cats are vaccinated and neutered, the main challenge
                is to find a place where they can survive extreme heat in summer
                and cold and rains in winter, as well as find food and hide from
                danger.
              </p>
              <p className="leading-relaxed text-gray-600 mb-8">
                We encourage people to turn their gardens and yards into such a
                safe space, and we are happy to guide and support everyone on
                this path.
              </p>

              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 bg-secondary text-white font-semibold px-8 py-4 rounded-full hover:bg-secondary-dark transition-colors"
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
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
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
