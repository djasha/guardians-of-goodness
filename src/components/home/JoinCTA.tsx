"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { JoinUsForm } from "@/components/forms/JoinUsForm";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useTheme } from "@/components/theme/ThemeProvider";

export function JoinCTA() {
  const reduced = useReducedMotion();
  const { theme } = useTheme();
  const isMystical = theme === "mystical";
  const M = reduced ? "div" : motion.div;

  return (
    <section className="relative bg-dark py-24 sm:py-32 overflow-hidden">
      {/* Background cat */}
      <div className="absolute inset-0 opacity-10">
        <Image src="/images/generated/cat-group.jpg" alt="" fill className="object-cover" />
      </div>
      {/* Gradient fades for smooth section blending */}
      {isMystical && (
        <>
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-dark-light to-transparent z-[1]" />
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-dark to-transparent z-[1]" />
        </>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Text */}
          <M
            {...(!reduced && {
              initial: { opacity: 0, x: -20 },
              whileInView: { opacity: 1, x: 0 },
              viewport: { once: true },
              transition: { duration: 0.5 },
            })}
          >
            <div className="neo-border-sm bg-secondary text-white inline-block px-4 py-1.5 mb-8 border-white/30">
              <span className="text-xs font-bold uppercase tracking-widest">Join Us</span>
            </div>

            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[0.95] mb-6">
              Let&apos;s make a{" "}
              <span className="text-secondary">difference</span> in their
              lives <span className="text-primary-light">together</span>
            </h2>

            <p className="text-white/75 text-lg leading-relaxed mb-10 max-w-md">
              Whether you want to volunteer, become a member, or support our
              mission — we&apos;d love to hear from you.
            </p>

            {/* Quote card */}
            <div className="neo-border bg-white/5 border-white/10 p-5 max-w-sm">
              <p className="text-white/70 text-sm italic font-display leading-relaxed">
                &ldquo;Until one has loved an animal, a part of one&apos;s soul remains unawakened.&rdquo;
              </p>
              <p className="text-white/25 text-xs mt-2 font-bold">
                — Anatole France
              </p>
            </div>
          </M>

          {/* Right: Form */}
          <M
            {...(!reduced && {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5, delay: 0.2 },
            })}
          >
            <div className="neo-border neo-shadow-purple bg-cream p-8 sm:p-10">
              <h3 className="font-display text-2xl font-bold text-dark mb-1">
                Get Involved
              </h3>
              <p className="text-dark/60 text-sm mb-6">
                Fill out the form and we&apos;ll reach out to you.
              </p>
              <JoinUsForm />
            </div>
          </M>
        </div>
      </div>
    </section>
  );
}
