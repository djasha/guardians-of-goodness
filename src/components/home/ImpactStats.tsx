"use client";

import Image from "next/image";
import Link from "next/link";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const highlights = [
  {
    title: "Rescue & Care",
    stat: "200+",
    statLabel: "cats rescued",
    desc: "Each provided with veterinary care, microchipping, vaccination, and neutering.",
    color: "bg-secondary",
    borderColor: "border-secondary",
    link: "/catalogue",
    linkText: "Browse CATalogue",
  },
  {
    title: "Community Network",
    stat: "7",
    statLabel: "vet partners",
    desc: "Clinics across Amman working together to provide medical care for rescued animals.",
    color: "bg-primary",
    borderColor: "border-primary",
    link: "/projects/tnr",
    linkText: "TNR Program",
  },
  {
    title: "Active Programs",
    stat: "2",
    statLabel: "running projects",
    desc: "TNR and Home Shelter programs empowering communities to create safe spaces.",
    color: "bg-accent",
    borderColor: "border-accent",
    link: "/projects/hbs",
    linkText: "Home Shelter",
  },
];

export function ImpactStats() {
  const reduced = useReducedMotion();

  return (
    <section className="relative py-20 sm:py-28 overflow-hidden">
      {/* Full bleed cat image background */}
      <div className="absolute inset-0">
        <Image
          src="/images/generated/cat-closeup.jpg"
          alt=""
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-dark/85" />
      </div>

      {/* Decorative paw prints */}
      <div className="absolute top-12 right-[10%] opacity-[0.04]">
        <svg className="w-32 h-32 text-white rotate-12" viewBox="0 0 40 44" fill="currentColor">
          <ellipse cx="20" cy="30" rx="10" ry="9" /><circle cx="8" cy="16" r="4.5" /><circle cx="17" cy="10" r="4" /><circle cx="27" cy="10" r="4" /><circle cx="35" cy="16" r="4.5" />
        </svg>
      </div>
      <div className="absolute bottom-16 left-[5%] opacity-[0.03]">
        <svg className="w-20 h-20 text-white -rotate-20" viewBox="0 0 40 44" fill="currentColor">
          <ellipse cx="20" cy="30" rx="10" ry="9" /><circle cx="8" cy="16" r="4.5" /><circle cx="17" cy="10" r="4" /><circle cx="27" cy="10" r="4" /><circle cx="35" cy="16" r="4.5" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 text-white/70 mb-4">
            <svg className="w-4 h-4 text-secondary" viewBox="0 0 40 44" fill="currentColor">
              <ellipse cx="20" cy="30" rx="10" ry="9" /><circle cx="8" cy="16" r="4.5" /><circle cx="17" cy="10" r="4" /><circle cx="27" cy="10" r="4" /><circle cx="35" cy="16" r="4.5" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-[0.2em]">What We Do</span>
            <svg className="w-4 h-4 text-secondary" viewBox="0 0 40 44" fill="currentColor">
              <ellipse cx="20" cy="30" rx="10" ry="9" /><circle cx="8" cy="16" r="4.5" /><circle cx="17" cy="10" r="4" /><circle cx="27" cy="10" r="4" /><circle cx="35" cy="16" r="4.5" />
            </svg>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight">
            Making a real <span className="text-secondary">difference</span>
          </h2>
        </div>

        {/* Cards — colored backgrounds, not white */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {highlights.map((item, i) => {
            const W = reduced ? "div" : motion.div;
            return (
              <W
                key={item.title}
                {...(!reduced && {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.4, delay: i * 0.12 },
                })}
                className={`neo-border ${item.color} neo-hover p-6 sm:p-7 relative overflow-hidden group ${item.borderColor}`}
              >
                {/* Background paw watermark */}
                <div className="absolute -bottom-4 -right-4 opacity-10">
                  <svg className="w-24 h-24 text-white rotate-12" viewBox="0 0 40 44" fill="currentColor">
                    <ellipse cx="20" cy="30" rx="10" ry="9" /><circle cx="8" cy="16" r="4.5" /><circle cx="17" cy="10" r="4" /><circle cx="27" cy="10" r="4" /><circle cx="35" cy="16" r="4.5" />
                  </svg>
                </div>

                {/* Big stat */}
                <div className="font-display text-6xl sm:text-7xl font-black text-white/90 mb-1">
                  {item.stat}
                </div>
                <div className="text-white/60 text-xs font-bold uppercase tracking-widest mb-4">
                  {item.statLabel}
                </div>

                {/* Title + desc */}
                <h3 className="font-display text-lg font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed mb-5">
                  {item.desc}
                </p>

                {/* Link */}
                <MagneticButton
                  href={item.link}
                  variant="ghost"
                  size="sm"
                >
                  {item.linkText}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </MagneticButton>
              </W>
            );
          })}
        </div>
      </div>
    </section>
  );
}
