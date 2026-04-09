import type { Metadata } from "next";
import Image from "next/image";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Guardians of Goodness — a non-profit organization dedicated to creating a friendly environment for cats and dogs in Jordan.",
};

const timelineEvents = [
  {
    year: "2020",
    title: "Where It All Began",
    text: "Our journey started in Jordan from rescuing street cats in Amman. In 2020, the Corona outbreak and its impact on social activities made survival of street animals harder than ever before. Millions of street cats and dogs in Jordan lost their usual source of food when due to curfew, restaurants, groceries, and shops suspended their work. That is when our founder fostered her first cat family. Shortly, more and more cats appeared, and gradually their number reached one hundred.",
    image: "/images/content/about-timeline-1.png",
  },
  {
    year: "2022",
    title: "Building Networks",
    text: "In 2022, the first steps were made towards connecting with other players in the field of animal rescue in Jordan and building networks of activists who share the same values.",
    image: "/images/content/about-timeline-2.png",
  },
  {
    year: "2023",
    title: "Official Launch",
    text: "After months of organizational process, in 2023 Guardians of Goodness finally got its legal status and launched its first official project for improving one of the neighborhoods in Jabal Amman.",
    image: "/images/content/about-timeline-3.png",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center">
        <Image
          src="/images/backgrounds/cat-background-1-3.png"
          alt="About Guardians of Goodness"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/70 to-dark/50" />
        <div className="relative z-10 text-center px-4">
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
            Who We Are
          </h1>
        </div>
      </section>

      {/* Intro Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <ScrollReveal>
          <p className="text-lg sm:text-xl leading-relaxed text-gray-600 max-w-4xl mx-auto text-center">
            Guardians of Goodness is a non-profit organization that focuses on
            creating a friendly environment for cats and dogs in Jordan and
            empowering people active in the mentioned above sphere with
            knowledge, expertise and technical support.
          </p>
        </ScrollReveal>
      </section>

      {/* Mission & Vision Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="grid md:grid-cols-2 gap-8">
          <ScrollReveal>
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 h-full border-t-4 border-primary">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
                <svg
                  className="w-7 h-7 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Our Mission
              </h2>
              <p className="leading-relaxed text-gray-600">
                To decrease the number of stray cats and dogs in Jordan and
                improve the quality of their lives through creating a friendly
                environment for them.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10 h-full border-t-4 border-secondary">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-secondary/10 mb-6">
                <svg
                  className="w-7 h-7 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                Our Vision
              </h2>
              <p className="leading-relaxed text-gray-600">
                Every life on this planet is valuable and deserves to be treated
                decently and live in harmony with all creatures on the Globe.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* History Timeline */}
      <section className="bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <ScrollReveal>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-16">
              Our Journey
            </h2>
          </ScrollReveal>

          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2" />

            <div className="space-y-16 md:space-y-24">
              {timelineEvents.map((event, index) => (
                <ScrollReveal key={event.year}>
                  <div
                    className={`flex flex-col md:flex-row items-center gap-8 md:gap-12 ${
                      index % 2 === 1 ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Content */}
                    <div className="flex-1 md:w-1/2">
                      <div
                        className={`${
                          index % 2 === 1 ? "md:text-left" : "md:text-right"
                        }`}
                      >
                        <span className="inline-block font-display text-5xl sm:text-6xl font-bold text-primary/20 mb-2">
                          {event.year}
                        </span>
                        <h3 className="font-display text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                          {event.title}
                        </h3>
                        <p className="leading-relaxed text-gray-600">
                          {event.text}
                        </p>
                      </div>
                    </div>

                    {/* Center dot */}
                    <div className="hidden md:flex items-center justify-center w-5 h-5 rounded-full bg-primary border-4 border-cream shrink-0 z-10" />

                    {/* Image */}
                    <div className="flex-1 md:w-1/2">
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg">
                        <Image
                          src={event.image}
                          alt={`${event.title} - ${event.year}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
