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

const PawPrint = ({ className = "" }: { className?: string }) => (
  <svg className={`w-5 h-5 text-primary/20 ${className}`} viewBox="0 0 40 44" fill="currentColor">
    <ellipse cx="20" cy="30" rx="10" ry="9" />
    <circle cx="8" cy="16" r="4.5" />
    <circle cx="17" cy="10" r="4" />
    <circle cx="27" cy="10" r="4" />
    <circle cx="35" cy="16" r="4.5" />
  </svg>
);

export default function AboutPage() {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-warm-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <ScrollReveal>
              <div>
                <div className="neo-border-sm neo-shadow-sm bg-primary text-white inline-block px-4 py-1.5 mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest">About Us</span>
                </div>
                <h1 className="font-display font-black text-dark text-4xl sm:text-5xl lg:text-6xl mb-6">
                  Who We Are
                </h1>
                <p className="text-lg sm:text-xl leading-relaxed text-dark/50">
                  Guardians of Goodness is a non-profit organization that focuses on
                  creating a friendly environment for cats and dogs in Jordan and
                  empowering people active in the mentioned above sphere with
                  knowledge, expertise and technical support.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="neo-border neo-shadow bg-white p-3">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src="/images/generated/gentle-cat.jpg"
                    alt="A gentle cat cared for by Guardians of Goodness"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="grid md:grid-cols-2 gap-8">
          <ScrollReveal>
            <div className="relative bg-white neo-border neo-shadow p-8 sm:p-10 h-full overflow-hidden">
              <div className="absolute top-0 left-0 w-16 h-16 bg-primary" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
              <div className="inline-flex items-center justify-center w-14 h-14 neo-border-sm bg-primary/10 mb-6">
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
              <h2 className="font-display text-2xl sm:text-3xl font-black text-dark mb-4">
                Our Mission
              </h2>
              <p className="leading-relaxed text-dark/50">
                To decrease the number of stray cats and dogs in Jordan and
                improve the quality of their lives through creating a friendly
                environment for them.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative bg-white neo-border neo-shadow p-8 sm:p-10 h-full overflow-hidden">
              <div className="absolute top-0 left-0 w-16 h-16 bg-secondary" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
              <div className="inline-flex items-center justify-center w-14 h-14 neo-border-sm bg-secondary/10 mb-6">
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
              <h2 className="font-display text-2xl sm:text-3xl font-black text-dark mb-4">
                Our Vision
              </h2>
              <p className="leading-relaxed text-dark/50">
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
            <div className="text-center mb-16">
              <div className="neo-border-sm neo-shadow-sm bg-accent text-white inline-block px-4 py-1.5 mb-6">
                <span className="text-xs font-bold uppercase tracking-widest">Our Story</span>
              </div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-dark">
                Our Journey
              </h2>
            </div>
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
                        <span className="inline-block font-display text-5xl sm:text-6xl font-black text-primary/20 mb-2">
                          {event.year}
                        </span>
                        <h3 className="font-display text-2xl sm:text-3xl font-black text-dark mb-4">
                          {event.title}
                        </h3>
                        <p className="leading-relaxed text-dark/50">
                          {event.text}
                        </p>
                      </div>
                    </div>

                    {/* Center paw print */}
                    <div className="hidden md:flex items-center justify-center shrink-0 z-10">
                      <div className="bg-warm-gray p-1">
                        <svg className="w-6 h-6 text-primary" viewBox="0 0 40 44" fill="currentColor">
                          <ellipse cx="20" cy="30" rx="10" ry="9" />
                          <circle cx="8" cy="16" r="4.5" />
                          <circle cx="17" cy="10" r="4" />
                          <circle cx="27" cy="10" r="4" />
                          <circle cx="35" cy="16" r="4.5" />
                        </svg>
                      </div>
                    </div>

                    {/* Image */}
                    <div className="flex-1 md:w-1/2">
                      <div className="neo-border neo-shadow bg-white p-2">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={event.image}
                            alt={`${event.title} - ${event.year}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Paw-themed Quote Card */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <ScrollReveal>
          <div className="max-w-3xl mx-auto relative bg-white neo-border neo-shadow p-10 sm:p-14 text-center">
            <div className="absolute top-4 left-4 opacity-30">
              <PawPrint className="w-8 h-8 text-primary" />
            </div>
            <div className="absolute bottom-4 right-4 opacity-30">
              <PawPrint className="w-8 h-8 text-secondary" />
            </div>
            <div className="absolute top-4 right-6 opacity-20">
              <PawPrint className="w-5 h-5 text-accent" />
            </div>
            <blockquote className="font-display text-2xl sm:text-3xl font-black text-dark mb-4 leading-snug">
              &ldquo;The greatness of a nation can be judged by the way its animals are treated.&rdquo;
            </blockquote>
            <p className="text-dark/50 text-lg">
              &mdash; Mahatma Gandhi
            </p>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
