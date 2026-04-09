"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const primaryActions = [
  { label: "Adopt a Cat", href: "/catalogue", bg: "bg-secondary", shadow: "neo-shadow-teal" },
  { label: "Get Involved", href: "/consultation", bg: "bg-primary", shadow: "neo-shadow-purple" },
];

const quickLinks = [
  { label: "TNR Project", href: "/projects/tnr" },
  { label: "Home Shelter", href: "/projects/hbs" },
  { label: "Support Us", href: "/support" },
  { label: "About Us", href: "/about" },
];

export function Hero() {
  const reduced = useReducedMotion();
  const M = reduced ? "div" : motion.div;

  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden">
      {/* Full-width background cat image */}
      <div className="absolute inset-0">
        <Image
          src="/images/generated/hero-cat-hd.jpg"
          alt="A beautiful rescue cat with warm golden eyes"
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
            <div className="neo-border-sm bg-primary text-white inline-flex items-center px-4 py-1.5 mb-6">
              <span className="text-xs font-bold uppercase tracking-widest">For Animal Welfare in Jordan</span>
            </div>
          </M>

          {/* Heading — refined typography with paw decorations */}
          <M {...(!reduced && { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.1 } })}>
            <h1 className="font-display text-[2.25rem] sm:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] font-extrabold text-white leading-[1.1] mb-5" style={{ fontVariationSettings: "'opsz' 48, 'WONK' 1" }}>
              Our{" "}
              <span className="relative inline-block">
                four-legged
                {/* Decorative cat paw prints — round beans style */}
                <svg className="absolute -top-8 right-[40%] w-4 h-4 text-secondary/30 rotate-12" viewBox="0 0 50 50" fill="currentColor">
                  <circle cx="25" cy="32" r="12"/><circle cx="13" cy="17" r="6"/><circle cx="25" cy="12" r="5.5"/><circle cx="37" cy="17" r="6"/><circle cx="8" cy="28" r="4.5"/>
                </svg>
                <svg className="absolute -bottom-4 -left-6 w-3 h-3 text-primary/20 -rotate-20" viewBox="0 0 50 50" fill="currentColor">
                  <circle cx="25" cy="32" r="12"/><circle cx="13" cy="17" r="6"/><circle cx="25" cy="12" r="5.5"/><circle cx="37" cy="17" r="6"/><circle cx="8" cy="28" r="4.5"/>
                </svg>
              </span>{" "}
              furry friends{" "}
              <span className="text-secondary italic" style={{ fontVariationSettings: "'opsz' 48, 'WONK' 1" }}>
                need your help
              </span>
            </h1>
          </M>

          {/* Subtext */}
          <M {...(!reduced && { initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: 0.2 } })}>
            <p className="text-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
              We invite you to participate with us in creating a better
              environment for cats and dogs in Jordan.
            </p>
          </M>

          {/* Primary CTAs */}
          <M {...(!reduced && { initial: { opacity: 0, y: 15 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.4, delay: 0.3 } })}>
            <div className="flex flex-wrap gap-3 mb-5">
              {primaryActions.map((action) => (
                <Link
                  key={action.href}
                  href={action.href}
                  className={`neo-border ${action.bg} ${action.shadow} neo-hover text-white font-bold px-6 py-3.5 text-sm sm:text-base inline-flex items-center gap-2 border-white/20`}
                >
                  {action.label}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              ))}
            </div>
          </M>

          {/* Quick links */}
          <M {...(!reduced && { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.4, delay: 0.4 } })}>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8">
              {quickLinks.map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-white/40 hover:text-secondary text-sm font-semibold transition-colors inline-flex items-center gap-1"
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
              {[
                { num: "200+", label: "Cats Rescued" },
                { num: "7", label: "Vet Partners" },
                { num: "2", label: "Projects" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-xl sm:text-2xl font-black text-white">{stat.num}</div>
                  <div className="text-white/30 text-[11px] font-semibold uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="hidden md:block neo-border-sm bg-white/10 backdrop-blur-sm border-white/10 px-4 py-3 max-w-xs">
              <p className="text-white/50 text-xs italic font-display leading-snug">
                &ldquo;The greatness of a nation can be judged by the way its animals are treated.&rdquo;
              </p>
              <p className="text-white/25 text-[10px] mt-1 font-bold">
                Mahatma Gandhi
              </p>
            </div>
          </div>
        </M>
      </div>
    </section>
  );
}
