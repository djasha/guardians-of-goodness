"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const quickLinks = [
  { label: "TNR Project", href: "/projects/tnr" },
  { label: "Home Shelter", href: "/projects/hbs" },
  { label: "About Us", href: "/about" },
];

// Defaults — used when no Sanity data exists yet
const DEFAULTS = {
  heroHeading: "Our four-legged furry friends need your help",
  heroHighlight: "need your help",
  heroSubtext:
    "We invite you to participate with us in creating a better environment for cats and dogs in Jordan.",
  ctaPrimary: "Adopt a Cat",
  ctaPrimaryLink: "/catalogue",
  ctaSecondary: "Consultation",
  ctaSecondaryLink: "/consultation",
  heroStats: [
    { _key: "s1", value: "200+", label: "Cats Rescued" },
    { _key: "s2", value: "7", label: "Vet Partners" },
    { _key: "s3", value: "2", label: "Projects" },
  ],
  quoteText:
    "The greatness of a nation can be judged by the way its animals are treated.",
  quoteAuthor: "Mahatma Gandhi",
};

interface HeroData {
  heroHeading?: string;
  heroHighlight?: string;
  heroSubtext?: string;
  heroImage?: { asset: { url: string }; alt?: string };
  ctaPrimary?: string;
  ctaPrimaryLink?: string;
  ctaSecondary?: string;
  ctaSecondaryLink?: string;
  heroStats?: { _key: string; value: string; label: string }[];
  quoteText?: string;
  quoteAuthor?: string;
}

export function Hero({ data }: { data?: HeroData | null }) {
  const reduced = useReducedMotion();
  const M = reduced ? "div" : motion.div;

  // Merge Sanity data with defaults
  const d = { ...DEFAULTS, ...data };
  const heading = d.heroHeading || DEFAULTS.heroHeading;
  const highlight = d.heroHighlight || DEFAULTS.heroHighlight;
  const heroImageSrc = d.heroImage?.asset?.url || "/images/generated/hero-cat-hd.jpg";
  const heroImageAlt = d.heroImage?.alt || "A beautiful rescue cat with warm golden eyes";
  const stats = d.heroStats && d.heroStats.length > 0 ? d.heroStats : DEFAULTS.heroStats;

  // Split heading around the highlight text
  const highlightIndex = heading.toLowerCase().indexOf(highlight.toLowerCase());
  const beforeHighlight = highlightIndex >= 0 ? heading.slice(0, highlightIndex) : heading;
  const highlightText = highlightIndex >= 0 ? heading.slice(highlightIndex, highlightIndex + highlight.length) : "";
  const afterHighlight = highlightIndex >= 0 ? heading.slice(highlightIndex + highlight.length) : "";

  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden">
      {/* Full-width background cat image */}
      <div className="absolute inset-0">
        <Image
          src={heroImageSrc}
          alt={heroImageAlt}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        {/* Overlays for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-dark/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/70 via-dark/30 to-transparent" />
      </div>

      {/* Content — all above the fold */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 pt-32 sm:pt-36">
        <div className="max-w-2xl">
          {/* Badge */}
          <M {...(!reduced && { initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4 } })}>
            <div className="inline-flex items-center gap-2 text-white/70 mb-6">
              <span className="w-6 h-px bg-white/50" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">For Animal Welfare in Jordan</span>
            </div>
          </M>

          {/* Heading — dynamically highlights the specified text in teal */}
          <M {...(!reduced && { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.1 } })}>
            <h1 className="font-display text-[2.25rem] sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] font-extrabold text-white leading-[1.1] mb-5" style={{ fontVariationSettings: "'opsz' 48, 'WONK' 1" }}>
              {beforeHighlight}
              {highlightText && (
                <span className="text-secondary italic" style={{ fontVariationSettings: "'opsz' 48, 'WONK' 1" }}>
                  {highlightText}
                </span>
              )}
              {afterHighlight}
            </h1>
          </M>

          {/* Subtext */}
          <M {...(!reduced && { initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: 0.2 } })}>
            <p className="text-white/80 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              {d.heroSubtext}
            </p>
          </M>

          {/* Primary CTAs */}
          <M {...(!reduced && { initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: 0.3 } })}>
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <MagneticButton href={d.ctaPrimaryLink || "/catalogue"} variant="secondary" size="md">
                {d.ctaPrimary}
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </MagneticButton>
              <MagneticButton href={d.ctaSecondaryLink || "/consultation"} variant="primary" size="md">
                {d.ctaSecondary}
              </MagneticButton>
            </div>
          </M>

          {/* Quick links */}
          <M {...(!reduced && { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, delay: 0.4 } })}>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8">
              {quickLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/70 hover:text-secondary text-sm font-semibold transition-colors inline-flex items-center gap-1"
                >
                  {i > 0 && <span className="text-white/15 mr-2">|</span>}
                  {link.label}
                </Link>
              ))}
            </div>
          </M>
        </div>

        {/* Bottom info bar — stats + quote */}
        <M {...(!reduced && { initial: { opacity: 0, y: 10 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.5 } })}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pt-6 border-t border-white/10">
            {/* Stats */}
            <div className="flex gap-8">
              {stats.map((stat) => (
                <div key={stat._key || stat.label}>
                  <div className="font-display text-xl sm:text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-white/75 text-[11px] font-semibold uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Quote */}
            {d.quoteText && (
              <div className="hidden md:block neo-border-sm bg-white/10 backdrop-blur-sm border-white/10 px-4 py-3 max-w-xs">
                <p className="text-white/70 text-xs italic font-display leading-snug">
                  &ldquo;{d.quoteText}&rdquo;
                </p>
                {d.quoteAuthor && (
                  <p className="text-white/50 text-[10px] mt-1 font-bold">
                    {d.quoteAuthor}
                  </p>
                )}
              </div>
            )}
          </div>
        </M>
      </div>
    </section>
  );
}
