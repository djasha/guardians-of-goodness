"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { CountUp } from "@/components/animations/CountUp";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const stats = [
  { value: 200, suffix: "+", label: "Cats Rescued", color: "bg-secondary neo-shadow-teal" },
  { value: 7, suffix: "", label: "Partner Clinics", color: "bg-primary neo-shadow-purple" },
  { value: 2, suffix: "", label: "Active Projects", color: "bg-accent neo-shadow" },
];

export function ImpactStats() {
  const reduced = useReducedMotion();

  return (
    <section className="relative bg-dark py-20 sm:py-28 overflow-hidden">
      {/* Background cat peek */}
      <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 hidden lg:block">
        <Image
          src="/images/generated/gentle-cat.jpg"
          alt=""
          fill
          className="object-cover object-left"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="neo-border-sm bg-white/10 text-white/60 inline-block px-4 py-1.5 mb-10 border-white/20">
          <span className="text-xs font-bold uppercase tracking-widest">Our Impact</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-3xl">
          {stats.map((stat, i) => {
            const W = reduced ? "div" : motion.div;
            return (
              <W
                key={stat.label}
                {...(!reduced && {
                  initial: { opacity: 0, y: 20 },
                  whileInView: { opacity: 1, y: 0 },
                  viewport: { once: true },
                  transition: { duration: 0.4, delay: i * 0.15 },
                })}
                className={`neo-border ${stat.color} neo-hover p-6 text-center cursor-default`}
              >
                <div className="font-display text-5xl sm:text-6xl font-black text-white mb-2">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-white/70 text-xs font-bold uppercase tracking-widest">
                  {stat.label}
                </p>
              </W>
            );
          })}
        </div>
      </div>
    </section>
  );
}
