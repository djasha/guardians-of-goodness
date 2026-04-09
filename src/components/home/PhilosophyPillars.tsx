"use client";

import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const pillars = [
  {
    num: "01",
    title: "Right to Live Naturally",
    text: "All animals have the right to live in respect to their natural needs and behavioral patterns, in an environment that allows them to meet the basic calls of their kind.",
    color: "bg-secondary",
  },
  {
    num: "02",
    title: "Disease Prevention & Treatment",
    text: "All animals have the right to receive veterinary care in case of disease or accident, as well as preventive medicine like neutering and vaccination.",
    color: "bg-primary",
  },
  {
    num: "03",
    title: "Food, Water & Shelter",
    text: "Each animal, whether feral or domestic, should be granted constant access to food, water of proper quality, and a safe place to protect itself from harsh conditions.",
    color: "bg-accent",
  },
  {
    num: "04",
    title: "Freedom from Exploitation",
    text: "We are against any kind of animal exploitation that aims to please human desires at the cost of animal welfare. No animal abuse should be tolerated by society.",
    color: "bg-pink",
  },
];

export function PhilosophyPillars() {
  const reduced = useReducedMotion();

  return (
    <section className="bg-warm-gray py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="mb-14">
          <div className="neo-border-sm neo-shadow-sm bg-secondary text-white inline-block px-4 py-1.5 mb-6">
            <span className="text-xs font-bold uppercase tracking-widest">Our Philosophy</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-dark leading-tight max-w-3xl">
            We make this world better by protecting{" "}
            <span className="text-primary">those who can&apos;t protect themselves</span>
          </h2>
        </div>

        {/* Pillar cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {pillars.map((pillar, i) => {
            const W = reduced ? "div" : motion.div;
            return (
              <W
                key={pillar.num}
                {...(!reduced && {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.3 },
                  transition: { duration: 0.4, delay: i * 0.1 },
                })}
                className="neo-border neo-shadow bg-white neo-hover p-7 sm:p-8 relative cursor-default overflow-hidden"
              >
                {/* Color accent corner */}
                <div className={`absolute top-0 right-0 w-16 h-16 ${pillar.color} rounded-bl-[16px]`}>
                  <span className="absolute top-2 right-3 text-white font-display font-black text-sm">
                    {pillar.num}
                  </span>
                </div>

                <h3 className="font-display text-xl font-bold text-dark mb-3 pr-16">
                  {pillar.title}
                </h3>
                <p className="text-dark/50 leading-relaxed text-sm">
                  {pillar.text}
                </p>
              </W>
            );
          })}
        </div>
      </div>
    </section>
  );
}
