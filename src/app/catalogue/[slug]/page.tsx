import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import {
  CAT_BY_SLUG_QUERY,
  CAT_SLUGS_QUERY,
  RELATED_CATS_QUERY,
} from "@/sanity/queries";
import type { Cat, CatDetail } from "@/sanity/types";
import { PhotoGallery } from "@/components/catalogue/PhotoGallery";
import { AdoptionInquiryForm } from "@/components/forms/AdoptionInquiryForm";
import { ScrollReveal } from "@/components/animations/ScrollReveal";
import { CatCard } from "@/components/catalogue/CatCard";

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
    const cat = await client.fetch<CatDetail | null>(CAT_BY_SLUG_QUERY, {
      slug,
    });
    if (!cat) return { title: "Cat Not Found" };
    return {
      title: cat.name,
      description: cat.description
        ? `Meet ${cat.name} — ${cat.description}`
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
      role="status"
      aria-label={`${label}: ${active ? "Yes" : "No"}`}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-bold border-2 ${
        active
          ? "bg-green-100 text-green-800 border-green-300"
          : "bg-gray-100 text-gray-500 border-gray-200"
      }`}
    >
      {active ? (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
      ) : (
        <svg
          className="w-4 h-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      )}
      {label}
    </span>
  );
}

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-cream rounded-xl border-3 border-dark p-4 shadow-[3px_3px_0_0_var(--color-dark)]">
      <p className="text-sm text-gray-500 font-semibold mb-1">{label}</p>
      <p className="font-black text-gray-900">{value}</p>
    </div>
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

  const relatedCats = await client
    .fetch<Cat[]>(RELATED_CATS_QUERY, {
      id: cat._id,
      ageCategory: cat.ageCategory || "",
      tags: cat.tags || [],
    })
    .catch(() => [] as Cat[]);

  const shareUrl = `https://guardiansofgoodness.org/catalogue/${cat.slug}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Meet ${cat.name}! 🐱 ${shareUrl}`)}`;

  return (
    <>
      {/* Hero header */}
      <section className="bg-primary border-b-[6px] border-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-bold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 16l-4-4m0 0l4-4m-4 4h18"
              />
            </svg>
            Back to CATalogue
          </Link>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-white mt-4">
            {cat.name}
          </h1>
          {cat.adoptionStatus === "pending" && (
            <span className="inline-block mt-3 bg-yellow-400 text-dark text-sm font-black px-4 py-1.5 rounded-lg border-2 border-dark">
              Adoption Pending
            </span>
          )}
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Photo gallery */}
          <ScrollReveal>
            {cat.photos && cat.photos.length > 0 ? (
              <PhotoGallery photos={cat.photos} name={cat.name} />
            ) : (
              <div className="aspect-square rounded-2xl border-3 border-dark bg-gray-100 flex items-center justify-center shadow-[6px_6px_0_0_var(--color-primary)]" role="img" aria-label={`No photo available for ${cat.name}`}>
                <span className="text-8xl" aria-hidden="true">🐱</span>
              </div>
            )}
          </ScrollReveal>

          {/* Cat details */}
          <ScrollReveal>
            <div>
              {/* Share buttons */}
              <div className="flex items-center gap-2 mb-6">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-4 py-2 rounded-lg border-3 border-dark font-black text-sm shadow-[3px_3px_0_0_var(--color-dark)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--color-dark)] transition-all min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  aria-label={`Share ${cat.name}'s profile on WhatsApp`}
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Share
                </a>
              </div>

              {/* Info cards grid */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {cat.age && <InfoCard label="Age" value={cat.age} />}
                <InfoCard
                  label="Gender"
                  value={cat.gender === "male" ? "Male" : "Female"}
                />
                {cat.breed && <InfoCard label="Breed" value={cat.breed} />}
                {cat.color && <InfoCard label="Color" value={cat.color} />}
                {cat.location && (
                  <InfoCard label="Location" value={cat.location} />
                )}
                <InfoCard
                  label="Status"
                  value={
                    cat.adoptionStatus === "available"
                      ? "Available"
                      : cat.adoptionStatus === "pending"
                        ? "Pending"
                        : "Adopted"
                  }
                />
                {cat.adoptionFee != null && (
                  <InfoCard
                    label="Adoption Fee"
                    value={`€${cat.adoptionFee}`}
                  />
                )}
              </div>

              {/* Tags */}
              {cat.tags && cat.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {cat.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-bold bg-primary/10 text-primary border-2 border-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Description */}
              {cat.description && (
                <div className="mb-8">
                  <h2 className="font-display text-xl font-black text-dark mb-3">
                    About {cat.name}
                  </h2>
                  <p className="leading-relaxed text-gray-600">
                    {cat.description}
                  </p>
                </div>
              )}

              {/* Health & Status */}
              <div className="mb-8">
                <h2 className="font-display text-xl font-black text-dark mb-3">
                  Health & Status
                </h2>
                <div className="flex flex-wrap gap-2">
                  <HealthBadge label="Neutered" active={cat.neutered} />
                  <HealthBadge label="Vaccinated" active={cat.vaccinated} />
                  <HealthBadge label="Microchipped" active={cat.microchipped} />
                  <HealthBadge
                    label="Ready to Travel"
                    active={cat.readyToTravelAbroad}
                  />
                </div>
              </div>

              {/* Bonded pair callout */}
              {cat.bond?.bondedCat && (
                <div className="mb-8 bg-primary/10 border-3 border-primary rounded-xl p-5 shadow-[3px_3px_0_0_var(--color-primary)]">
                  <h2 className="font-display text-xl font-black text-primary mb-2">
                    Bonded Pair
                  </h2>
                  <p className="text-gray-700 font-medium">
                    {cat.name} is bonded with{" "}
                    <Link
                      href={`/catalogue/${cat.bond.bondedCat.slug}`}
                      className="text-primary font-black hover:underline underline-offset-2"
                    >
                      {cat.bond.bondedCat.name}
                    </Link>
                    {cat.bond.type && ` (${cat.bond.type})`}. They should be
                    adopted together.
                  </p>
                </div>
              )}

              {/* Special needs */}
              {cat.specialNeeds &&
                cat.specialNeeds.toLowerCase() !== "none" && (
                  <div className="mb-8 bg-yellow-50 border-3 border-yellow-400 rounded-xl p-5 shadow-[3px_3px_0_0_#ca8a04]">
                    <h2 className="font-display text-xl font-black text-yellow-800 mb-2">
                      Special Needs
                    </h2>
                    <p className="leading-relaxed text-gray-600">
                      {cat.specialNeeds}
                    </p>
                  </div>
                )}

              {/* Instagram link */}
              {cat.instagramPostUrl && (
                <div className="mb-8">
                  <a
                    href={cat.instagramPostUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`See ${cat.name} on Instagram (opens in new tab)`}
                    className="inline-flex items-center gap-2 bg-gradient-to-r from-primary via-pink to-secondary text-white px-5 py-2.5 rounded-lg border-3 border-dark font-black text-sm shadow-[3px_3px_0_0_var(--color-dark)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_var(--color-dark)] transition-all min-h-[44px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                    See {cat.name} on Instagram
                  </a>
                </div>
              )}

              {/* Adoption inquiry form */}
              <div className="border-t-3 border-dark pt-8 mt-8">
                <h2 className="font-display text-2xl font-black text-dark mb-6">
                  Interested in {cat.name}?
                </h2>
                <AdoptionInquiryForm catName={cat.name} />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Related cats section */}
      {relatedCats.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <ScrollReveal>
            <div className="border-t-3 border-dark pt-12">
              <h2 className="font-display text-3xl font-black text-dark mb-8 text-center">
                You Might Also Like
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedCats.map((relatedCat) => (
                  <CatCard key={relatedCat._id} cat={relatedCat} />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>
      )}
    </>
  );
}
