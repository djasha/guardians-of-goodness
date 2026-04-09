"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const pillars = [
  {
    num: "01",
    title: "Right to Live Naturally",
    text: "All animals have the right to live in respect to their natural needs and behavioral patterns, in an environment that allows them to meet the basic calls of their kind.",
    color: "bg-secondary",
    image: "/images/generated/cat-group.jpg",
  },
  {
    num: "02",
    title: "Disease Prevention & Treatment",
    text: "All animals have the right to receive veterinary care in case of disease or accident, as well as preventive medicine like neutering and vaccination.",
    color: "bg-primary",
    image: "/images/generated/rescue-cat.jpg",
  },
  {
    num: "03",
    title: "Food, Water & Shelter",
    text: "Each animal, whether feral or domestic, should be granted constant access to food, water of proper quality, and a safe place to protect itself from harsh conditions.",
    color: "bg-accent",
    image: "/images/generated/gentle-cat.jpg",
  },
  {
    num: "04",
    title: "Freedom from Exploitation",
    text: "We are against any kind of animal exploitation that aims to please human desires at the cost of animal welfare. No animal abuse should be tolerated by society.",
    color: "bg-pink",
    image: "/images/generated/pillar-freedom.jpg",
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

        {/* Pillar cards with images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((pillar, i) => {
            const W = reduced ? "div" : motion.div;
            return (
              <W
                key={pillar.num}
                {...(!reduced && {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true, amount: 0.2 },
                  transition: { duration: 0.4, delay: i * 0.1 },
                })}
                className="neo-border neo-shadow bg-white neo-hover cursor-default overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <Image
                    src={pillar.image}
                    alt={pillar.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
                  {/* Number badge on image */}
                  <div className={`absolute top-4 right-4 ${pillar.color} neo-border-sm w-10 h-10 flex items-center justify-center`}>
                    <span className="text-white font-display font-black text-sm">{pillar.num}</span>
                  </div>
                  {/* Title on image */}
                  <div className="absolute bottom-4 left-5 right-16">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white drop-shadow-lg">
                      {pillar.title}
                    </h3>
                  </div>
                </div>

                {/* Text content */}
                <div className="p-6 sm:p-7">
                  <p className="text-dark/50 leading-relaxed text-sm">
                    {pillar.text}
                  </p>
                </div>
              </W>
            );
          })}
        </div>
      </div>
    </section>
  );
}
