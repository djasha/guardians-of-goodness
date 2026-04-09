"use client";

import { motion, useReducedMotion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Cat } from "@/sanity/types";

interface CatCardProps {
  cat: Cat;
}

const statusStyles = {
  available: {
    badge: "bg-emerald-500 text-white",
    shadow: "shadow-[4px_4px_0_0_#4ecdc4]",
    label: "Available",
  },
  pending: {
    badge: "bg-amber-500 text-white",
    shadow: "shadow-[4px_4px_0_0_#ff8c42]",
    label: "Pending",
  },
  adopted: {
    badge: "bg-gray-500 text-white",
    shadow: "shadow-[4px_4px_0_0_#999]",
    label: "Found a Home!",
  },
};

export function CatCard({ cat }: CatCardProps) {
  const status = statusStyles[cat.adoptionStatus] || statusStyles.available;
  const isAdopted = cat.adoptionStatus === "adopted";
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      layout={!prefersReducedMotion}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.3 }}
    >
      <Link
        href={`/catalogue/${cat.slug}`}
        aria-label={`View ${cat.name}'s profile — ${status.label}, ${cat.gender}, ${cat.ageCategory || "unknown age"}`}
        className={cn(
          "group block rounded-xl bg-white border-3 border-dark overflow-hidden transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
          status.shadow,
          "hover:-translate-y-1 hover:shadow-[6px_6px_0_0_#9b4dca]",
          isAdopted && "opacity-75"
        )}
      >
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden">
          {cat.photo ? (
            <Image
              src={cat.photo}
              alt={`Photo of ${cat.name}, a ${cat.gender} ${cat.breed || "cat"}`}
              fill
              className={cn(
                "object-cover transition-transform duration-700 group-hover:scale-105",
                isAdopted && "grayscale-[40%]"
              )}
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center" role="img" aria-label={`No photo available for ${cat.name}`}>
              <span className="text-6xl" aria-hidden="true">🐱</span>
            </div>
          )}

          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <span
              className={cn(
                "inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wide border-2 border-dark",
                status.badge
              )}
            >
              {status.label}
            </span>
          </div>

          {/* Travel badge */}
          {cat.readyToTravelAbroad && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-black bg-white border-2 border-dark text-dark" title="Ready to travel to EU">
                <span aria-hidden="true">✈️</span> EU
              </span>
            </div>
          )}

          {/* Featured star */}
          {cat.featured && (
            <div className="absolute bottom-3 right-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary border-2 border-dark text-white text-sm" title="Featured cat" aria-label="Featured">
                <span aria-hidden="true">⭐</span>
              </span>
            </div>
          )}

          {/* Adopted ribbon */}
          {isAdopted && (
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <div className="bg-dark/80 text-white px-6 py-2 rounded-lg border-2 border-white font-black text-sm uppercase tracking-wider -rotate-12">
                Found a Home!
              </div>
            </div>
          )}

          {/* Hover overlay */}
          {!isAdopted && (
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-4">
              <span className="text-white font-display font-bold text-lg">
                Meet {cat.name} →
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4 border-t-3 border-dark">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-display text-xl font-black text-dark group-hover:text-primary transition-colors">
              {cat.name}
            </h3>
            <span className="text-lg mt-0.5" aria-label={cat.gender === "male" ? "Male" : "Female"} role="img">
              {cat.gender === "male" ? "♂️" : "♀️"}
            </span>
          </div>

          {/* Meta chips */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {cat.ageCategory && (
              <span className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary font-bold border border-primary/20">
                {cat.ageCategory}
              </span>
            )}
            {cat.breed && (
              <span className="text-xs px-2 py-1 rounded-md bg-secondary/10 text-secondary-dark font-bold border border-secondary/20">
                {cat.breed}
              </span>
            )}
          </div>

          {/* Personality tags (first 3) */}
          {cat.tags && cat.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {cat.tags.slice(0, 3).map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] px-2 py-0.5 rounded-full bg-warm-gray text-gray-600 font-semibold"
                >
                  {tag}
                </span>
              ))}
              {cat.tags.length > 3 && (
                <span className="text-[11px] px-2 py-0.5 rounded-full bg-warm-gray text-gray-400 font-semibold">
                  +{cat.tags.length - 3}
                </span>
              )}
            </div>
          )}

          {/* Health indicators */}
          <div className="flex gap-2 text-xs text-gray-500" aria-label="Health status">
            {cat.neutered && (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-secondary" aria-hidden="true" />
                Neutered
              </span>
            )}
            {cat.vaccinated && (
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-secondary" aria-hidden="true" />
                Vaccinated
              </span>
            )}
          </div>

          {/* Bond info */}
          {cat.bond?.bondedCat && (
            <div className="mt-3 pt-3 border-t-2 border-dashed border-primary/20">
              <span className="text-xs text-primary font-bold">
                💕 Bonded with {cat.bond.bondedCat.name}
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
