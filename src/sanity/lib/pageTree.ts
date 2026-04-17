import { cache } from "react";
import { client } from "@/sanity/client";

export type PageTreeRow = {
  _id: string;
  title: string;
  description?: string;
  slug?: string;
  parentId?: string | null;
  isHomepage?: boolean;
  noIndex?: boolean;
  puckData?: string | null;
};

const PAGE_TREE_QUERY = `*[_type == "landingPage" && defined(slug.current)]{
  _id,
  title,
  description,
  "slug": slug.current,
  "parentId": parent._ref,
  isHomepage,
  noIndex,
  puckData
}`;

export function pathForPage(
  page: PageTreeRow,
  byId: Map<string, PageTreeRow>
): string {
  if (page.isHomepage) return "/";
  const segments: string[] = [];
  let current: PageTreeRow | undefined = page;
  const seen = new Set<string>();
  while (current && current.slug) {
    if (seen.has(current._id)) break;
    seen.add(current._id);
    segments.unshift(current.slug);
    current = current.parentId ? byId.get(current.parentId) : undefined;
  }
  return "/" + segments.join("/");
}

export const getLandingPageByPath = cache(async (path: string) => {
  const normalised = path === "" || path === "/" ? "/" : path.replace(/\/+$/, "");
  let pages: PageTreeRow[] = [];
  try {
    const result = await client.fetch<PageTreeRow[]>(PAGE_TREE_QUERY, {}, {
      next: { tags: ["landingPage:tree"], revalidate: 60 },
    });
    pages = Array.isArray(result) ? result : [];
  } catch {
    pages = [];
  }
  const byId = new Map(pages.map((p) => [p._id, p]));
  for (const page of pages) {
    if (pathForPage(page, byId) === normalised) return page;
  }
  return null;
});
