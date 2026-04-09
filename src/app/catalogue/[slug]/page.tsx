import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { CAT_BY_SLUG_QUERY, CAT_SLUGS_QUERY } from "@/sanity/queries";
import type { CatDetail } from "@/sanity/types";
import { PhotoGallery } from "@/components/catalogue/PhotoGallery";
import { AdoptionInquiryForm } from "@/components/forms/AdoptionInquiryForm";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const cats = await client.fetch<{ slug: string }[]>(CAT_SLUGS_QUERY);
    return cats.map((cat) => ({ slug: cat.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  try {
    const cat = await client.fetch<CatDetail | null>(CAT_BY_SLUG_QUERY, { slug });
    if (!cat) return { title: "Cat Not Found" };
    return {
      title: cat.name,
      description: cat.personality
        ? `Meet ${cat.name} — ${cat.personality}`
        : `Meet ${cat.name}, a rescued cat looking for a forever home.`,
      openGraph: {
        images: cat.photos?.[0]?.asset?.url
          ? [{ url: cat.photos[0].asset.url }]
          : [],
      },
    };
  } catch {
    return { title: "Cat Profile" };
  }
}

function HealthBadge({ label, active }: { label: string; active: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
        active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-500"
      }`}
    >
      {active ? (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
      {label}
    </span>
  );
}

export default async function CatProfilePage({ params }: Props) {
  const { slug } = await params;

  let cat: CatDetail | null = null;
  try {
    cat = await client.fetch<CatDetail | null>(CAT_BY_SLUG_QUERY, { slug });
  } catch {
    notFound();
  }

  if (!cat) notFound();

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/catalogue"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-primary transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          Back to CATalogue
        </Link>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          <ScrollReveal>
            {cat.photos && cat.photos.length > 0 ? (
              <PhotoGallery photos={cat.photos} name={cat.name} />
            ) : (
              <div className="aspect-square rounded-2xl bg-gray-100 flex items-center justify-center">
                <span className="text-8xl">🐱</span>
              </div>
            )}
          </ScrollReveal>

          <ScrollReveal>
            <div>
              <div className="flex items-start justify-between gap-4 mb-6">
                <h1 className="font-display text-4xl sm:text-5xl font-bold text-gray-900">
                  {cat.name}
                </h1>
                {cat.adoptionStatus === "pending" && (
                  <span className="shrink-0 bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
                    Adoption Pending
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {cat.age && (
                  <div className="bg-cream rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Age</p>
                    <p className="font-semibold text-gray-900">{cat.age}</p>
                  </div>
                )}
                <div className="bg-cream rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">Gender</p>
                  <p className="font-semibold text-gray-900 capitalize">{cat.gender}</p>
                </div>
                {cat.breed && (
                  <div className="bg-cream rounded-xl p-4">
                    <p className="text-sm text-gray-500 mb-1">Breed</p>
                    <p className="font-semibold text-gray-900">{cat.breed}</p>
                  </div>
                )}
                <div className="bg-cream rounded-xl p-4">
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <p className="font-semibold text-gray-900 capitalize">{cat.adoptionStatus}</p>
                </div>
              </div>

              {cat.personality && (
                <div className="mb-8">
                  <h2 className="font-display text-xl font-bold text-gray-900 mb-3">Personality</h2>
                  <p className="leading-relaxed text-gray-600">{cat.personality}</p>
                </div>
              )}

              <div className="mb-8">
                <h2 className="font-display text-xl font-bold text-gray-900 mb-3">Health & Status</h2>
                <div className="flex flex-wrap gap-2">
                  <HealthBadge label="Neutered" active={cat.neutered} />
                  <HealthBadge label="Vaccinated" active={cat.vaccinated} />
                  <HealthBadge label="Microchipped" active={cat.microchipped} />
                  <HealthBadge label="Ready to Travel" active={cat.readyToTravelAbroad} />
                </div>
              </div>

              {cat.bond?.bondedCat && (
                <div className="mb-8 bg-primary/5 border border-primary/20 rounded-xl p-4">
                  <h2 className="font-display text-xl font-bold text-gray-900 mb-2">Bonded Pair</h2>
                  <p className="text-gray-600">
                    {cat.name} is bonded with{" "}
                    <Link href={`/catalogue/${cat.bond.bondedCat.slug}`} className="text-primary font-semibold hover:underline">
                      {cat.bond.bondedCat.name}
                    </Link>
                    {cat.bond.type && ` (${cat.bond.type})`}. They should be adopted together.
                  </p>
                </div>
              )}

              {cat.specialNeeds && cat.specialNeeds.toLowerCase() !== "none" && (
                <div className="mb-8 bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                  <h2 className="font-display text-xl font-bold text-gray-900 mb-2">Special Needs</h2>
                  <p className="leading-relaxed text-gray-600">{cat.specialNeeds}</p>
                </div>
              )}

              <div className="border-t border-gray-200 pt-8 mt-8">
                <h2 className="font-display text-2xl font-bold text-gray-900 mb-6">
                  Interested in {cat.name}?
                </h2>
                <AdoptionInquiryForm catName={cat.name} />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
