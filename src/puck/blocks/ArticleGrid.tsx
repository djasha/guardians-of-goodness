import Link from "next/link";

export type ArticleGridArticle = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  publishedAt?: string;
  coverImage?: { url?: string; alt?: string };
};

export type ArticleGridProps = {
  heading: string;
  limit: number;
  emptyHeading: string;
  emptyBody: string;
  tone: "cream" | "dark";
  _articles?: ArticleGridArticle[];
};

const toneClasses: Record<ArticleGridProps["tone"], string> = {
  cream: "bg-cream text-dark",
  dark: "bg-dark text-cream",
};

export function ArticleGrid({
  heading,
  emptyHeading,
  emptyBody,
  tone,
  _articles,
}: ArticleGridProps) {
  const articles = Array.isArray(_articles) ? _articles : [];

  return (
    <section className={`${toneClasses[tone]} px-6 py-16`}>
      <div className="max-w-6xl mx-auto">
        {heading ? (
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-10 text-center">
            {heading}
          </h2>
        ) : null}
        {articles.length === 0 ? (
          <div className="text-center max-w-xl mx-auto opacity-80">
            <h3 className="font-display text-xl font-semibold mb-2">
              {emptyHeading}
            </h3>
            <p>{emptyBody}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((article) => (
              <Link
                key={article._id}
                href={`/education/${article.slug}`}
                className="group block border-2 border-dark bg-white text-dark shadow-[6px_6px_0_0_#1a1a2e] overflow-hidden hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#1a1a2e] transition-transform"
              >
                {article.coverImage?.url ? (
                  <div className="aspect-video border-b-2 border-dark bg-cream">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={article.coverImage.url}
                      alt={article.coverImage.alt || ""}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : null}
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold mb-2 leading-tight">
                    {article.title}
                  </h3>
                  {article.excerpt ? (
                    <p className="text-sm opacity-80 line-clamp-3">
                      {article.excerpt}
                    </p>
                  ) : null}
                  {article.publishedAt ? (
                    <p className="text-xs opacity-60 mt-3">
                      {new Date(article.publishedAt).toLocaleDateString(
                        undefined,
                        { year: "numeric", month: "short", day: "numeric" }
                      )}
                    </p>
                  ) : null}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
