import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { client } from "@/sanity/client";
import { ARTICLE_BY_SLUG_QUERY, ARTICLE_SLUGS_QUERY } from "@/sanity/queries";
import { PortableText } from "@portabletext/react";
import type { Article } from "@/sanity/types";
import { formatDate } from "@/lib/utils";
import { SITE } from "@/lib/constants";
import { articleJsonLd, breadcrumbJsonLd, safeJsonLd } from "@/lib/jsonLd";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const articles = await client.fetch<{ slug: string }[]>(ARTICLE_SLUGS_QUERY);
    return articles.map((article) => ({ slug: article.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  try {
    const article = await client.fetch<Article | null>(
      ARTICLE_BY_SLUG_QUERY,
      { slug },
      { next: { tags: ["article"] } }
    );

    if (!article) {
      return { title: "Article Not Found" };
    }

    return {
      title: article.seoTitle || article.title,
      description: article.seoDescription
        || article.excerpt || `Read "${article.title}" on Guardians of Goodness.`,
      alternates: { canonical: `/education/${slug}` },
      openGraph: {
        images: article.coverImage?.asset?.url ? [{ url: article.coverImage.asset.url }] : [],
      },
    };
  } catch {
    return { title: "Article" };
  }
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;

  let article: Article | null = null;
  try {
    article = await client.fetch<Article | null>(ARTICLE_BY_SLUG_QUERY, {
      slug,
    }, { next: { tags: ["article"] } });
  } catch {
    notFound();
  }

  if (!article) {
    notFound();
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(articleJsonLd({
            title: article.title,
            slug: article.slug,
            excerpt: article.excerpt,
            publishedAt: article.publishedAt,
            coverImageUrl: article.coverImage?.asset?.url,
          })),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(breadcrumbJsonLd([
            { name: "Home", url: SITE.url },
            { name: "Education", url: `${SITE.url}/education` },
            { name: article.title, url: `${SITE.url}/education/${article.slug}` },
          ])),
        }}
      />
      {/* Back link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link
          href="/education"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-secondary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" aria-hidden="true" />
          Back to Information Center
        </Link>
      </div>

      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            {/* Header */}
            <header className="mb-10">
              {article.tags && article.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-secondary/10 text-secondary font-medium px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                {article.title}
              </h1>
              {article.publishedAt && (
                <p className="text-gray-500">
                  {formatDate(article.publishedAt)}
                </p>
              )}
            </header>

            {/* Cover Image */}
            {article.coverImage?.asset?.url && (
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-lg mb-10">
                <Image
                  src={article.coverImage.asset.url}
                  alt={article.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Body */}
            <div className="prose prose-gray prose-lg max-w-none prose-headings:font-display prose-a:text-primary">
              {article.excerpt && (
                <p className="text-xl leading-relaxed text-gray-600 mb-8">
                  {article.excerpt}
                </p>
              )}

              {article.body ? (
                <PortableText value={article.body} />
              ) : (
                <p className="text-gray-500 italic">
                  Article content is being prepared.
                </p>
              )}
            </div>
          </ScrollReveal>
        </div>
      </article>
    </>
  );
}
