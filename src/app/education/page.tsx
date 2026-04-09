import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/client";
import { ARTICLES_QUERY } from "@/sanity/queries";
import type { Article } from "@/sanity/types";
import { formatDate } from "@/lib/utils";
import { ScrollReveal } from "@/components/animations/ScrollReveal";

export const metadata: Metadata = {
  title: "Information Center",
  description:
    "Helpful and useful information about cats, dogs, and related subjects from Guardians of Goodness.",
};

export default async function EducationPage() {
  let articles: Article[] = [];
  let error = false;

  try {
    articles = await client.fetch<Article[]>(ARTICLES_QUERY);
  } catch {
    error = true;
  }

  const hasContent = !error && articles.length > 0;

  return (
    <>
      {/* Hero Section */}
      <section className="bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          <ScrollReveal>
            <div className="neo-border-sm neo-shadow-sm bg-primary text-white inline-block px-4 py-1.5 mb-6">
              <span className="text-xs font-bold uppercase tracking-widest">Learn</span>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4">
              Information Center
            </h1>
          </ScrollReveal>
          <ScrollReveal>
            <p className="text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
              Helpful and useful information about cats &amp; dogs and related
              subjects.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Articles or Coming Soon */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        {hasContent ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <ScrollReveal key={article._id}>
                <Link
                  href={`/education/${article.slug}`}
                  className="group block neo-border neo-shadow neo-hover bg-white overflow-hidden"
                >
                  {article.coverImage ? (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={article.coverImage}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/10] bg-cream flex items-center justify-center">
                      <svg className="w-12 h-12 text-primary/20" viewBox="0 0 40 44" fill="currentColor"><ellipse cx="20" cy="30" rx="10" ry="9"/><circle cx="8" cy="16" r="4.5"/><circle cx="17" cy="10" r="4"/><circle cx="27" cy="10" r="4"/><circle cx="35" cy="16" r="4.5"/></svg>
                    </div>
                  )}
                  <div className="p-6">
                    {article.publishedAt && (
                      <p className="text-sm text-dark/50 mb-2">
                        {formatDate(article.publishedAt)}
                      </p>
                    )}
                    <h2 className="font-display text-xl font-bold text-dark mb-2 group-hover:text-primary transition-colors">
                      {article.title}
                    </h2>
                    {article.excerpt && (
                      <p className="text-dark/50 text-sm line-clamp-3">
                        {article.excerpt}
                      </p>
                    )}
                    {article.tags && article.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {article.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs neo-border-sm bg-cream text-dark/50 px-2 py-1"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <ScrollReveal>
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 neo-border neo-shadow bg-white mb-6">
                <svg className="w-12 h-12 text-primary/20" viewBox="0 0 40 44" fill="currentColor"><ellipse cx="20" cy="30" rx="10" ry="9"/><circle cx="8" cy="16" r="4.5"/><circle cx="17" cy="10" r="4"/><circle cx="27" cy="10" r="4"/><circle cx="35" cy="16" r="4.5"/></svg>
              </div>
              <h2 className="font-display text-3xl font-bold text-dark mb-3">
                Coming Soon
              </h2>
              <p className="text-dark/50 max-w-md mx-auto">
                We are preparing educational content to help you better
                understand and care for animals. Stay tuned!
              </p>
            </div>
          </ScrollReveal>
        )}
      </section>
    </>
  );
}
