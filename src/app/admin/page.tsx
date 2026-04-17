import Link from "next/link";
import { client } from "@/sanity/client";

const LANDING_PAGES_QUERY = `*[_type == "landingPage"] | order(_updatedAt desc){
  _id,
  title,
  "slug": slug.current,
  description,
  _updatedAt,
  "hasContent": defined(puckData)
}`;

type LandingPageSummary = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  _updatedAt: string;
  hasContent: boolean;
};

export default async function AdminIndex() {
  const pages: LandingPageSummary[] = await client.fetch(LANDING_PAGES_QUERY);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <header className="mb-10">
        <p className="uppercase tracking-widest text-xs font-semibold opacity-60 mb-2">
          Admin
        </p>
        <h1 className="font-display text-3xl md:text-4xl font-bold">
          Landing Pages
        </h1>
        <p className="mt-2 opacity-70">
          Drag-and-drop editor for marketing and campaign pages.
        </p>
      </header>

      {pages.length === 0 ? (
        <div className="border-2 border-dark bg-white p-8 text-center shadow-[4px_4px_0_0_#1a1a2e]">
          <p className="mb-4">No landing pages yet.</p>
          <Link
            href="/studio/structure/landingPage"
            className="inline-block bg-primary text-pure-white font-semibold px-6 py-3 border-2 border-dark shadow-[4px_4px_0_0_#1a1a2e] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_#1a1a2e] transition-transform"
          >
            Create one in Studio
          </Link>
        </div>
      ) : (
        <ul className="space-y-3">
          {pages.map((page) => (
            <li
              key={page._id}
              className="border-2 border-dark bg-white shadow-[4px_4px_0_0_#1a1a2e]"
            >
              <Link
                href={`/admin/editor/${page.slug}`}
                className="flex items-center justify-between p-5 hover:bg-cream transition-colors"
              >
                <div className="min-w-0">
                  <h2 className="font-display text-xl font-bold truncate">
                    {page.title || "Untitled"}
                  </h2>
                  <p className="text-sm opacity-70 truncate">
                    /p/{page.slug} {page.hasContent ? "" : "• empty"}
                  </p>
                </div>
                <span className="ml-4 text-sm opacity-60 whitespace-nowrap">
                  {new Date(page._updatedAt).toLocaleDateString()}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <footer className="mt-10 text-sm opacity-60">
        New pages are created in{" "}
        <Link href="/studio/structure/landingPage" className="underline">
          Sanity Studio
        </Link>
        . Set a title and URL, then come back here to design the layout.
      </footer>
    </div>
  );
}
