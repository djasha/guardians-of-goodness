import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const metadata: Metadata = {
  title: "TNR — Trap-Neuter-Return",
  description:
    "Learn about our Trap-Neuter-Return program — the most humane and efficient way to manage stray animal populations in Jordan.",
};

export default function TNRPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <Image
          src="/images/backgrounds/cat-background-2-11.png"
          alt="TNR Program"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 to-dark/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
            Trap-Neuter-Return
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            The most humane approach to managing stray populations
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <ScrollReveal>
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/content/tnr-image.png"
                alt="TNR process — Trap Neuter Return"
                fill
                className="object-cover"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                What is TNR?
              </h2>
              <p className="leading-relaxed text-gray-600 mb-6">
                Neutering stray animals is the most humane and efficient way to
                avoid overpopulation and improve the quality of lives of the
                animals at the same time. Each intact cat or dog roaming in the
                streets is a source of the rapidly growing number of stray
                animals in Jordan.
              </p>
              <p className="leading-relaxed text-gray-600 mb-6">
                Besides, the duration and quality of their lives are extremely
                low. An average stray cat lives from several months to 1-1.5
                years if not helped by humans. TNR can significantly improve
                quality of life and add at least a few more years to the
                lifespan.
              </p>
              <p className="leading-relaxed text-gray-600 mb-8">
                We encourage you to join our initiative and participate in
                neutering stray cats and dogs in your neighborhood. We can
                support you with knowledge and tools needed for this activity.
              </p>

              <Link
                href="/consultation"
                className="inline-flex items-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-full hover:bg-primary/90 transition-colors"
              >
                Get Involved
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
        </div>
      </section>
    </>
  );
}
