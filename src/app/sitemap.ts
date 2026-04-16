import type { MetadataRoute } from "next";
import { client } from "@/sanity/client";

const BASE_URL = "https://guardiansofgoodness.org";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/catalogue`, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/consultation`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/contact`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/education`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/projects/tnr`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/projects/hbs`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/support`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/privacy`, changeFrequency: "yearly", priority: 0.2 },
  ];

  const cats = await client
    .fetch<{ slug: string; _updatedAt: string }[]>(
      `*[_type == "cat" && visible != false]{ "slug": slug.current, _updatedAt }`
    )
    .catch(() => []);

  const catPages: MetadataRoute.Sitemap = cats.map((cat) => ({
    url: `${BASE_URL}/catalogue/${cat.slug}`,
    lastModified: new Date(cat._updatedAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const articles = await client
    .fetch<{ slug: string; _updatedAt: string }[]>(
      `*[_type == "article" && defined(publishedAt) && publishedAt <= now()]{ "slug": slug.current, _updatedAt }`
    )
    .catch(() => []);

  const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${BASE_URL}/education/${article.slug}`,
    lastModified: new Date(article._updatedAt),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...catPages, ...articlePages];
}
