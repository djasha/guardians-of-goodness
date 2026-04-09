"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Cat } from "@/sanity/types";

interface CatCardProps {
  cat: Cat;
}

export function CatCard({ cat }: CatCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={`/catalogue/${cat.slug}`}
        className="group block neo-border neo-shadow neo-hover bg-white overflow-hidden"
      >
        {/* Image */}
        <div className="relative aspect-[4/5] overflow-hidden">
          {cat.photo ? (
            <Image
              src={cat.photo}
              alt={cat.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
              <svg className="w-16 h-16 text-primary/20" viewBox="0 0 40 44" fill="currentColor">
                <ellipse cx="20" cy="30" rx="10" ry="9"/><circle cx="8" cy="16" r="4.5"/><circle cx="17" cy="10" r="4"/><circle cx="27" cy="10" r="4"/><circle cx="35" cy="16" r="4.5"/>
              </svg>
            </div>
          )}

          {/* Status badge */}
          <div className="absolute top-3 left-3">
            <span
              className={cn(
                "inline-flex items-center px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm",
                cat.adoptionStatus === "available" &&
                  "bg-emerald-500/90 text-white",
                cat.adoptionStatus === "pending" &&
                  "bg-amber-500/90 text-white",
                cat.adoptionStatus === "adopted" &&
                  "bg-gray-500/90 text-white"
              )}
            >
              {cat.adoptionStatus === "available" && "Available"}
              {cat.adoptionStatus === "pending" && "Pending"}
              {cat.adoptionStatus === "adopted" && "Adopted"}
            </span>
          </div>

          {/* Travel badge */}
          {cat.readyToTravelAbroad && (
            <div className="absolute top-3 right-3">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-white/90 backdrop-blur-sm text-primary">
                ✈️ EU Ready
              </span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-5">
            <span className="text-white font-display font-bold text-lg">
              Meet {cat.name} →
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-display text-xl font-bold text-dark group-hover:text-primary transition-colors">
              {cat.name}
            </h3>
            <span className="text-sm text-gray-400 mt-1">
              {cat.gender === "male" ? "♂" : "♀"}
            </span>
          </div>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {cat.age && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-warm-gray text-gray-600 font-medium">
                {cat.age}
              </span>
            )}
            {cat.breed && (
              <span className="text-xs px-2.5 py-1 rounded-full bg-warm-gray text-gray-600 font-medium">
                {cat.breed}
              </span>
            )}
          </div>

          {/* Health badges */}
          <div className="flex gap-2 text-xs text-gray-400">
            {cat.neutered && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-secondary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Neutered
              </span>
            )}
            {cat.vaccinated && (
              <span className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5 text-secondary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Vaccinated
              </span>
            )}
          </div>

          {/* Bond info */}
          {cat.bond?.bondedCat && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <span className="text-xs text-primary font-semibold">
                💕 {cat.bond.type} with{" "}
                <span className="text-dark">{cat.bond.bondedCat.name}</span>
              </span>
            </div>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
