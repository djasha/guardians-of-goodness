import type { Metadata } from "next";
import { client } from "@/sanity/client";
import { ALL_CATS_QUERY } from "@/sanity/queries";
import type { Cat } from "@/sanity/types";
import { CatGrid } from "@/components/catalogue/CatGrid";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const metadata: Metadata = {
  title: "CATalogue",
  description:
    "Browse our rescued cats looking for forever homes. Over 200 cats rescued and counting.",
};

export default async function CataloguePage() {
  let cats: Cat[] = [];
  let error = false;

  try {
    cats = await client.fetch<Cat[]>(ALL_CATS_QUERY);
  } catch {
    error = true;
  }

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <ScrollReveal>
            <div className="neo-border-sm neo-shadow-sm bg-white text-dark inline-block px-4 py-1.5 mb-6">
              <span className="text-xs font-bold uppercase tracking-widest">Adopt</span>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
              CATalogue
            </h1>
          </ScrollReveal>
          <ScrollReveal>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
              Find your furry friend with us. Over 200 rescued cats are waiting
              for loving families.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Cat Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {error ? (
          <ScrollReveal>
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 neo-border neo-shadow bg-white mb-6">
                <svg className="w-12 h-12 text-primary/20" viewBox="0 0 40 44" fill="currentColor"><ellipse cx="20" cy="30" rx="10" ry="9"/><circle cx="8" cy="16" r="4.5"/><circle cx="17" cy="10" r="4"/><circle cx="27" cy="10" r="4"/><circle cx="35" cy="16" r="4.5"/></svg>
              </div>
              <h2 className="font-display text-2xl font-bold text-dark mb-3">
                Catalogue Coming Soon
              </h2>
              <p className="text-dark/50 max-w-md mx-auto">
                We are setting up our catalogue. Please check back soon to meet
                our adorable cats!
              </p>
            </div>
          </ScrollReveal>
        ) : cats.length === 0 ? (
          <ScrollReveal>
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 neo-border neo-shadow bg-white mb-6">
                <svg className="w-12 h-12 text-primary/20" viewBox="0 0 40 44" fill="currentColor"><ellipse cx="20" cy="30" rx="10" ry="9"/><circle cx="8" cy="16" r="4.5"/><circle cx="17" cy="10" r="4"/><circle cx="27" cy="10" r="4"/><circle cx="35" cy="16" r="4.5"/></svg>
              </div>
              <h2 className="font-display text-2xl font-bold text-dark mb-3">
                No Cats Available Right Now
              </h2>
              <p className="text-dark/50 max-w-md mx-auto">
                All our cats have found loving homes! Check back soon for new
                arrivals.
              </p>
            </div>
          </ScrollReveal>
        ) : (
          <CatGrid cats={cats} />
        )}
      </section>
    </>
  );
}
