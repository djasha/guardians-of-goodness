import type { Metadata } from "next";
import Image from "next/image";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Support Us",
  description:
    "Support Guardians of Goodness — your contribution helps us rescue and care for stray animals in Jordan.",
};

export default function SupportPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 text-center">
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
            Support Us
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Every act of kindness makes a difference
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Your Support is Crucial
            </h2>
            <p className="text-lg leading-relaxed text-gray-600 mb-12">
              We are non-profit, which means our abilities are defined by the
              level of your participation. We appreciate any contribution that
              may help us get closer to our goals.
            </p>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid sm:grid-cols-3 gap-8 mb-16">
              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
                  Donate
                </h3>
                <p className="text-gray-600 text-sm">
                  Financial contributions help cover vet costs, food, and
                  shelter.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
                  <svg
                    className="w-8 h-8 text-secondary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
                  Volunteer
                </h3>
                <p className="text-gray-600 text-sm">
                  Give your time and skills to help with our rescue and care
                  programs.
                </p>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <svg
                    className="w-8 h-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                    />
                  </svg>
                </div>
                <h3 className="font-display text-xl font-bold text-gray-900 mb-2">
                  Spread the Word
                </h3>
                <p className="text-gray-600 text-sm">
                  Share our mission with friends and family to raise awareness.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <a
              href={`mailto:${SITE.email}`}
              className="inline-flex items-center gap-3 bg-primary text-white font-semibold text-lg px-10 py-5 rounded-full hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Contact us to offer your help
            </a>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
