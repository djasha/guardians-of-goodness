import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { ALL_CATS_QUERY, CATALOGUE_STATS_QUERY } from "@/sanity/queries";
import type { Cat, CatalogueStats } from "@/sanity/types";
import { CatGrid } from "@/components/catalogue/CatGrid";
import { CatWhiskersText } from "@/components/ui/CatWhiskersText";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const metadata: Metadata = {
  title: "CATalogue",
  description:
    "Browse our rescued cats looking for forever homes. Over 200 cats rescued and counting.",
};


export default async function CataloguePage() {
  let cats: Cat[] = [];
  let stats: CatalogueStats | undefined;
  let error = false;

  try {
    [cats, stats] = await Promise.all([
      client.fetch<Cat[]>(ALL_CATS_QUERY),
      client.fetch<CatalogueStats>(CATALOGUE_STATS_QUERY),
    ]);
  } catch {
    error = true;
  }

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-primary border-b-[6px] border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white mb-4 tracking-tight">
            <CatWhiskersText whiskerClassName="text-white opacity-40" />
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
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                </svg>
                {stats.adopted} Adopted
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/80 text-white font-black text-sm border-2 border-white/30">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 21c-1.5 0-3-.5-4-1.5-2-2-2-5 0-7l4-4 4 4c2 2 2 5 0 7-1 1-2.5 1.5-4 1.5z" />
                  <path d="M3.5 14.5c-.5-2 0-4 1.5-5.5L8 6" />
                  <path d="M20.5 14.5c.5-2 0-4-1.5-5.5L16 6" />
                </svg>
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
              <svg className="w-16 h-16 text-primary/30 mx-auto mb-6" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
                <ellipse cx="30" cy="20" rx="12" ry="18" />
                <ellipse cx="70" cy="20" rx="12" ry="18" />
                <circle cx="50" cy="55" r="30" />
              </svg>
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
              <svg className="w-16 h-16 text-primary/30 mx-auto mb-6" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
                <ellipse cx="30" cy="20" rx="12" ry="18" />
                <ellipse cx="70" cy="20" rx="12" ry="18" />
                <circle cx="50" cy="55" r="30" />
              </svg>
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
