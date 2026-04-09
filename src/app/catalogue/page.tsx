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
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
            CATalogue
          </h1>
          <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Find your furry friend with us. Over 200 rescued cats are waiting
            for loving families.
          </p>
        </div>
      </section>

      {/* Cat Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {error ? (
          <ScrollReveal>
            <div className="text-center py-20">
              <div className="text-6xl mb-6">🐱</div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">
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
              <div className="text-6xl mb-6">🐱</div>
              <h2 className="font-display text-2xl font-bold text-gray-900 mb-3">
                No Cats Available Right Now
              </h2>
              <p className="text-gray-600 max-w-md mx-auto">
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
