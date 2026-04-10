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
      {/* Hero — compact, blends with page */}
      <section className="pt-24 lg:pt-28 pb-8 sm:pb-10 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black mb-3 tracking-tight">
            CATalogue
          </h1>
          <p className="text-sm sm:text-base text-gray-500 max-w-lg mx-auto mb-6">
            Every cat deserves a loving home. Browse our rescued cats and find
            your perfect companion.
          </p>

          {/* Stats — simple inline text, not flashy pills */}
          {stats && (
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-gray-500" role="status" aria-label="Catalogue statistics">
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400" aria-hidden="true" />
                {stats.available} Available
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <span className="w-2 h-2 rounded-full bg-amber-400" aria-hidden="true" />
                {stats.pending} Pending
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <Home className="w-3.5 h-3.5" strokeWidth={2} aria-hidden="true" />
                {stats.adopted} Adopted
              </span>
              <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
                <Heart className="w-3.5 h-3.5 fill-current" strokeWidth={0} aria-hidden="true" />
                {stats.total} Total Rescued
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Cat Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {error ? (
          <ScrollReveal>
            <div className="text-center py-20">
              <CatIcon className="w-16 h-16 text-primary/20 mx-auto mb-6" strokeWidth={1.5} aria-hidden="true" />
              <h2 className="font-display text-2xl font-black mb-3">
                Catalogue Coming Soon
              </h2>
              <p className="text-gray-500 max-w-md mx-auto">
                We are setting up our catalogue. Please check back soon to meet
                our adorable cats!
              </p>
            </div>
          </ScrollReveal>
        ) : cats.length === 0 ? (
          <ScrollReveal>
            <div className="text-center py-20">
              <CatIcon className="w-16 h-16 text-primary/20 mx-auto mb-6" strokeWidth={1.5} aria-hidden="true" />
              <h2 className="font-display text-2xl font-black mb-3">
                No Cats Available Right Now
              </h2>
              <p className="text-gray-500 max-w-md mx-auto">
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
