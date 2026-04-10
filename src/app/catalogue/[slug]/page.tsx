import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Check, X, Plane, Heart, MapPin, ExternalLink, Share2 } from "lucide-react";
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
    const cat = await client.fetch<CatDetail | null>(CAT_BY_SLUG_QUERY, { slug });
    if (!cat) return { title: "Cat Not Found" };
    return {
      title: cat.name,
      description: cat.description
        ? `Meet ${cat.name} — ${cat.description}`
        : `Meet ${cat.name}, a rescued cat looking for a forever home.`,
      openGraph: {
        images: cat.photos?.[0]?.asset?.url ? [{ url: cat.photos[0].asset.url }] : [],
      },
    };
  } catch {
    return { title: "Cat Profile" };
  }
}

const statusColor = {
  available: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
  pending: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  adopted: "bg-gray-500/20 text-gray-400 border-gray-500/30",
};

const statusLabel = {
  available: "Available for Adoption",
  pending: "Adoption Pending",
  adopted: "Found a Home",
};

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
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(`Meet ${cat.name}! ${shareUrl}`)}`;

  // Compact specs — only truthy values
  const specs = [
    cat.gender === "male" ? "♂ Male" : "♀ Female",
    cat.age,
    cat.breed,
    cat.color,
  ].filter(Boolean);

  const healthItems = [
    { label: "Neutered", active: cat.neutered },
    { label: "Vaccinated", active: cat.vaccinated },
    { label: "Microchipped", active: cat.microchipped },
    { label: "Travel Ready", active: cat.readyToTravelAbroad },
  ];

  return (
    <>
      {/* Hero — name + status + specs, no separate cards */}
      <section className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <Link
            href="/catalogue"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors text-sm font-semibold mb-4"
          >
            <ArrowLeft className="w-4 h-4" aria-hidden="true" />
            Back to CATalogue
          </Link>

          <div className="flex flex-wrap items-center gap-3 mb-2">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-white">
              {cat.name}
            </h1>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-black uppercase tracking-wide border ${statusColor[cat.adoptionStatus]}`}>
              {statusLabel[cat.adoptionStatus]}
            </span>
          </div>

          {/* Inline specs — no labels, no boxes */}
          <p className="text-white/70 text-sm sm:text-base font-medium">
            {specs.join(" · ")}
            {cat.location && (
              <span className="inline-flex items-center gap-1 ml-2">
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" /> {cat.location}
              </span>
            )}
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">

          {/* Photo gallery */}
          <ScrollReveal>
            {cat.photos && cat.photos.length > 0 ? (
              <PhotoGallery photos={cat.photos} name={cat.name} />
            ) : (
              <div className="aspect-square rounded-2xl neo-border bg-warm-gray flex items-center justify-center">
                <span className="text-6xl opacity-20" aria-hidden="true">🐱</span>
              </div>
            )}
          </ScrollReveal>

          {/* Details column */}
          <ScrollReveal>
            <div className="space-y-6">

              {/* Health strip — compact inline badges */}
              <div className="flex flex-wrap gap-2">
                {healthItems.map(({ label, active }) => (
                  <span
                    key={label}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold border ${
                      active
                        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                        : "bg-warm-gray text-gray-400 border-gray-200 line-through opacity-50"
                    }`}
                  >
                    {active ? (
                      <Check className="w-3.5 h-3.5" strokeWidth={3} aria-hidden="true" />
                    ) : (
                      <X className="w-3.5 h-3.5" strokeWidth={3} aria-hidden="true" />
                    )}
                    {label}
                  </span>
                ))}
                {cat.readyToTravelAbroad && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-secondary/10 text-secondary border border-secondary/20">
                    <Plane className="w-3.5 h-3.5" strokeWidth={2.5} aria-hidden="true" />
                    EU Ready
                  </span>
                )}
              </div>

              {/* Personality tags */}
              {cat.tags && cat.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {cat.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/15"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Description / story */}
              {cat.description && (
                <div>
                  <h2 className="font-display text-lg font-black mb-2">
                    About {cat.name}
                  </h2>
                  <p className="leading-relaxed text-gray-600 text-sm sm:text-base">
                    {cat.description}
                  </p>
                </div>
              )}

              {/* Special needs callout */}
              {cat.specialNeeds && cat.specialNeeds.toLowerCase() !== "none" && (
                <div className="bg-yellow-50 border-2 border-yellow-400/40 rounded-xl p-4">
                  <p className="text-sm font-bold text-yellow-800 mb-1">Special Needs</p>
                  <p className="text-sm leading-relaxed text-yellow-700">{cat.specialNeeds}</p>
                </div>
              )}

              {/* Bonded pair */}
              {cat.bond?.bondedCat && (
                <div className="bg-primary/10 border-2 border-primary/20 rounded-xl p-4">
                  <p className="text-sm font-bold text-primary inline-flex items-center gap-1.5 mb-1">
                    <Heart className="w-4 h-4 fill-current" strokeWidth={0} aria-hidden="true" />
                    Bonded Pair
                  </p>
                  <p className="text-sm leading-relaxed">
                    {cat.name} must be adopted with{" "}
                    <Link
                      href={`/catalogue/${cat.bond.bondedCat.slug}`}
                      className="text-primary font-black hover:underline underline-offset-2"
                    >
                      {cat.bond.bondedCat.name}
                    </Link>
                    {cat.bond.type && ` (${cat.bond.type})`}.
                  </p>
                </div>
              )}

              {/* Price + share row */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                {cat.adoptionFee != null && (
                  <span className="text-lg font-black">€{cat.adoptionFee}</span>
                )}
                <div className="flex gap-2 ml-auto">
                  {cat.instagramPostUrl && (
                    <a
                      href={cat.instagramPostUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`See ${cat.name} on Instagram`}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-lg border-2 border-current/20 text-primary hover:bg-primary/10 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" strokeWidth={2} />
                    </a>
                  )}
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Share ${cat.name} on WhatsApp`}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-lg border-2 border-[#25D366]/30 text-[#25D366] hover:bg-[#25D366]/10 transition-colors"
                  >
                    <Share2 className="w-5 h-5" strokeWidth={2} />
                  </a>
                </div>
              </div>

              {/* Adoption form */}
              <div className="border-t-2 border-gray-200 pt-6">
                <h2 className="font-display text-xl font-black mb-4">
                  Interested in {cat.name}?
                </h2>
                <AdoptionInquiryForm catName={cat.name} />
              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Related cats */}
      {relatedCats.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <ScrollReveal>
            <div className="border-t-2 border-gray-200 pt-12">
              <h2 className="font-display text-2xl font-black mb-8 text-center">
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
