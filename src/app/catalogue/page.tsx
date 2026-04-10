import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { ALL_CATS_QUERY, CATALOGUE_STATS_QUERY } from "@/sanity/queries";
import type { Cat, CatalogueStats } from "@/sanity/types";
import { CatGrid } from "@/components/catalogue/CatGrid";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { Cat as CatIcon, Home, Heart } from "lucide-react";

export const metadata: Metadata = {
  title: "CATalogue",
  description:
    "Browse our rescued cats looking for forever homes. Over 200 cats rescued and counting.",
};

export default async function CataloguePage() {
  const cats = await client
    .fetch<Cat[]>(ALL_CATS_QUERY, {}, { signal: AbortSignal.timeout(10000) })
    .catch(() => null);

  const stats = await client
    .fetch<CatalogueStats>(CATALOGUE_STATS_QUERY, {}, { signal: AbortSignal.timeout(5000) })
    .catch(() => undefined);

  const error = cats === null;

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-primary border-b-[6px] border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tight">
            CATalogue
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8">
            Every cat deserves a loving home. Browse our rescued cats and find
            your perfect companion.
          </p>

          {/* Stats pills */}
          {stats && (
            <div className="flex flex-wrap justify-center gap-3" role="status" aria-label="Catalogue statistics">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm text-white font-bold text-sm border-2 border-white/30">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" aria-hidden="true" />
                {stats.available} Available
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm text-white font-bold text-sm border-2 border-white/30">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" aria-hidden="true" />
                {stats.pending} Pending
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/20 backdrop-blur-sm text-white font-bold text-sm border-2 border-white/30">
                <Home className="w-4 h-4" strokeWidth={2} aria-hidden="true" />
                {stats.adopted} Adopted
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/80 text-white font-black text-sm border-2 border-white/30">
                <Heart className="w-4 h-4 fill-current" strokeWidth={0} aria-hidden="true" />
                {stats.total} Total Rescued
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Cat Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {error ? (
          <ScrollReveal>
            <div className="text-center py-20">
              <CatIcon className="w-16 h-16 text-primary/25 mx-auto mb-6" strokeWidth={1.5} aria-hidden="true" />
              <h2 className="font-display text-2xl font-black text-dark mb-3">
                Catalogue Coming Soon
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                We are setting up our catalogue. Please check back soon to meet
                our adorable cats!
              </p>
            </div>
          </ScrollReveal>
        ) : cats.length === 0 ? (
          <ScrollReveal>
            <div className="text-center py-20">
              <CatIcon className="w-16 h-16 text-primary/25 mx-auto mb-6" strokeWidth={1.5} aria-hidden="true" />
              <h2 className="font-display text-2xl font-black text-dark mb-3">
                No Cats Available Right Now
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
                All our cats have found loving homes! Check back soon for new
                arrivals.
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <CatGrid cats={cats} stats={stats} />
        )}
      </section>
    </>
  );
}
