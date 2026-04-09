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

/* ── Inline SVG Icons ── */
function PlaneIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth={1}>
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

function CatSilhouette({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="currentColor" opacity={0.15}>
      <ellipse cx="30" cy="20" rx="12" ry="18" />
      <ellipse cx="70" cy="20" rx="12" ry="18" />
      <circle cx="50" cy="55" r="30" />
      <circle cx="40" cy="50" r="3" opacity={0.5} />
      <circle cx="60" cy="50" r="3" opacity={0.5} />
      <ellipse cx="50" cy="57" rx="4" ry="2" opacity={0.5} />
    </svg>
  );
}

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
            <div className="w-full h-full bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center" role="img" aria-label={`No photo available for ${cat.name}`}>
              <CatSilhouette className="w-24 h-24 text-dark" />
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
                <PlaneIcon className="w-3.5 h-3.5" aria-hidden="true" /> EU
              </span>
            </div>
          )}

          {/* Featured star */}
          {cat.featured && (
            <div className="absolute bottom-3 right-3">
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary border-2 border-dark text-white" title="Featured cat" aria-label="Featured">
                <StarIcon className="w-4 h-4" aria-hidden="true" />
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
                Meet {cat.name} &rarr;
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
            <span
              className={cn("text-sm font-black mt-0.5 px-1.5 py-0.5 rounded border", cat.gender === "male" ? "text-blue-600 border-blue-200 bg-blue-50" : "text-pink-600 border-pink-200 bg-pink-50")}
              aria-label={cat.gender === "male" ? "Male" : "Female"}
            >
              {cat.gender === "male" ? "M" : "F"}
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
                <CheckIcon className="w-3 h-3 text-secondary" aria-hidden="true" />
                Neutered
              </span>
            )}
            {cat.vaccinated && (
              <span className="flex items-center gap-1">
                <CheckIcon className="w-3 h-3 text-secondary" aria-hidden="true" />
                Vaccinated
              </span>
            )}
          </div>

          {/* Bond info */}
          {cat.bond?.bondedCat && (
            <div className="mt-3 pt-3 border-t-2 border-dashed border-primary/20">
              <span className="text-xs text-primary font-bold inline-flex items-center gap-1">
                <HeartIcon className="w-3 h-3" aria-hidden="true" />
                Bonded with {cat.bond.bondedCat.name}
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
