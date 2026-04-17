import type { Metadata } from "next";
import Image from "next/image";
import { Zap, Eye } from "lucide-react";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { PawPrint } from "@/components/ui/PawPrint";
import { client } from "@/sanity/client";
import { ABOUT_PAGE_QUERY } from "@/sanity/queries";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Guardians of Goodness — a non-profit organization dedicated to creating a friendly environment for cats and dogs in Jordan.",
};

const defaultTimelineEvents = [
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

export default async function AboutPage() {
  const pageData = await client.fetch(ABOUT_PAGE_QUERY, {}, { next: { tags: ["aboutPage"] } }).catch(() => null);

  const heroTitle = pageData?.heroTitle || "Who We Are";
  const heroSubtext = pageData?.heroSubtext || "Guardians of Goodness is a non-profit organization that focuses on creating a friendly environment for cats and dogs in Jordan and empowering people active in the mentioned above sphere with knowledge, expertise and technical support.";
  const heroImage = pageData?.heroImage?.asset?.url || "/images/real-cats/free-1.png";
  const missionTitle = pageData?.missionTitle || "Our Mission";
  const missionText = pageData?.missionText || "To decrease the number of stray cats and dogs in Jordan and improve the quality of their lives through creating a friendly environment for them.";
  const visionTitle = pageData?.visionTitle || "Our Vision";
  const visionText = pageData?.visionText || "Every life on this planet is valuable and deserves to be treated decently and live in harmony with all creatures on the Globe.";
  const timelineEvents: { year: string; title: string; text: string; image: string }[] =
    pageData?.timelineEvents?.length > 0
      ? pageData.timelineEvents.map(
          (event: { year: string; title: string; text: string; image?: { asset?: { url?: string } } }, index: number) => ({
            year: event.year,
            title: event.title,
            text: event.text,
            image: event.image?.asset?.url || `/images/content/about-timeline-${index + 1}.png`,
          })
        )
      : defaultTimelineEvents;
  const quoteText = pageData?.quoteText || "The greatness of a nation can be judged by the way its animals are treated.";
  const quoteAuthor = pageData?.quoteAuthor || "Mahatma Gandhi";

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-dark overflow-hidden">
        <div className="absolute inset-0">
          <Image src={heroImage} alt="" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-dark/90 via-dark/60 to-dark/25" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-16 sm:pb-24">
          <div className="max-w-3xl">
            <ScrollReveal>
              <div>
                <div className="neo-border-sm neo-shadow-sm bg-primary text-white inline-block px-4 py-1.5 mb-6">
                  <span className="text-xs font-bold uppercase tracking-widest">About Us</span>
                </div>
                <h1 className="font-display font-black text-white text-4xl sm:text-5xl lg:text-6xl mb-6">
                  {heroTitle}
                </h1>
                <p className="text-lg sm:text-xl leading-relaxed text-white/80">
                  {heroSubtext}
                </p>
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
                <Zap className="w-8 h-8 text-primary" aria-hidden="true" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-dark mb-4">
                {missionTitle}
              </h2>
              <p className="leading-relaxed text-dark/60">
                {missionText}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative bg-white neo-border neo-shadow p-8 sm:p-10 h-full overflow-hidden">
              <div className="absolute top-0 left-0 w-16 h-16 bg-secondary" style={{ clipPath: "polygon(0 0, 100% 0, 0 100%)" }} />
              <div className="inline-flex items-center justify-center w-14 h-14 neo-border-sm bg-secondary/10 mb-6">
                <Eye className="w-8 h-8 text-secondary" aria-hidden="true" />
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-black text-dark mb-4">
                {visionTitle}
              </h2>
              <p className="leading-relaxed text-dark/60">
                {visionText}
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
                        <p className="leading-relaxed text-dark/60">
                          {event.text}
                        </p>
                      </div>
                    </div>

                    {/* Center paw print */}
                    <div className="hidden md:flex items-center justify-center shrink-0 z-10">
                      <div className="bg-warm-gray p-1">
                        <PawPrint className="w-6 h-6 text-primary" />
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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
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
              &ldquo;{quoteText}&rdquo;
            </blockquote>
            <p className="text-dark/60 text-lg">
              &mdash; {quoteAuthor}
            </p>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}
