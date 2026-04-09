"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const highlights = [
  {
    title: "Rescue & Care",
    desc: "Over 200 cats rescued from the streets of Jordan, each provided with veterinary care, microchipping, vaccination, and neutering.",
    color: "bg-secondary",
    link: "/catalogue",
    linkText: "Browse CATalogue",
  },
  {
    title: "Community Network",
    desc: "7 partner veterinary clinics across Amman working together to provide medical care and support for rescued animals.",
    color: "bg-primary",
    link: "/projects/tnr",
    linkText: "TNR Program",
  },
  {
    title: "Active Programs",
    desc: "Trap-Neuter-Return and Home Based Shelter programs empowering communities to create safe spaces for cats in their neighborhoods.",
    color: "bg-accent",
    link: "/projects/hbs",
    linkText: "Home Shelter",
  },
];

export function ImpactStats() {
  const reduced = useReducedMotion();

  return (
    <section className="relative bg-dark py-20 sm:py-28 overflow-hidden">
      {/* Background cat image — right side peek */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block">
        <Image
          src="/images/generated/cat-closeup.jpg"
          alt=""
          fill
          className="object-cover object-left"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/90 to-dark/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 text-white/70 mb-6">
            <span className="w-6 h-px bg-white/40" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em]">What We Do</span>
          </div>

          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-12">
            Making a real <span className="text-secondary">difference</span> for
            animals in Jordan
          </h2>

          {/* Highlight cards */}
          <div className="space-y-4">
            {highlights.map((item, i) => {
              const W = reduced ? "div" : motion.div;
              return (
                <W
                  key={item.title}
                  {...(!reduced && {
                    initial: { opacity: 0, x: -20 },
                    whileInView: { opacity: 1, x: 0 },
                    viewport: { once: true },
                    transition: { duration: 0.4, delay: i * 0.1 },
                  })}
                  className="neo-border neo-shadow bg-white p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center gap-4 neo-hover"
                >
                  {/* Color dot */}
                  <div className={`${item.color} neo-border-sm w-12 h-12 flex-shrink-0 flex items-center justify-center`}>
                    <svg className="w-5 h-5 text-white" viewBox="0 0 40 44" fill="currentColor">
                      <ellipse cx="20" cy="30" rx="10" ry="9" />
                      <circle cx="8" cy="16" r="4.5" />
                      <circle cx="17" cy="10" r="4" />
                      <circle cx="27" cy="10" r="4" />
                      <circle cx="35" cy="16" r="4.5" />
                    </svg>
                  </div>

                  {/* Text */}
                  <div className="flex-1">
                    <h3 className="font-display text-lg font-bold text-dark mb-1">
                      {item.title}
                    </h3>
                    <p className="text-dark/50 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Link */}
                  <Link
                    href={item.link}
                    className={`${item.color} neo-border-sm neo-hover text-white font-bold text-xs px-4 py-2 flex-shrink-0 inline-flex items-center gap-1.5`}
                  >
                    {item.linkText}
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </Link>
                </W>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
