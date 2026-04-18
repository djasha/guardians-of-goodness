import Link from "next/link";
import { draftReadClient } from "@/sanity/writeClient";
import { pathForPage } from "@/sanity/lib/pageTree";
import { DuplicatePageButton } from "./DuplicatePageButton";

const LANDING_PAGES_QUERY = `*[
  _type == "landingPage" &&
  !(_id in path("drafts.**"))
] | order(_updatedAt desc){
  _id,
  title,
  "slug": slug.current,
  "parentId": parent._ref,
  isHomepage,
  description,
  _updatedAt,
  "hasContent": defined(puckData),
  "hasDraft": count(*[_id == "drafts." + ^._id]) > 0
}`;

type LandingPageSummary = {
  _id: string;
  title: string;
  slug: string;
  parentId?: string | null;
  isHomepage?: boolean;
  description?: string;
  _updatedAt: string;
  hasContent: boolean;
  hasDraft: boolean;
};

export const dynamic = "force-dynamic";

export default async function AdminIndex() {
  const pages: LandingPageSummary[] = await draftReadClient.fetch(LANDING_PAGES_QUERY);
  const pagesById = new Map(pages.map((page) => [page._id, page]));

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
              <div className="flex items-stretch">
                <Link
                  href={`/admin/editor/${encodeURIComponent(page._id)}`}
                  className="flex-1 flex items-center justify-between p-5 hover:bg-cream transition-colors min-w-0"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <h2 className="font-display text-xl font-bold truncate">
                        {page.title || "Untitled"}
                      </h2>
                      {page.hasDraft ? (
                        <span className="text-[10px] font-bold uppercase tracking-wider bg-yellow-400 text-dark border-2 border-dark px-1.5 py-0.5 whitespace-nowrap">
                          Draft
                        </span>
                      ) : null}
                    </div>
                    <p className="text-sm opacity-70 truncate">
                      {pathForPage(page, pagesById)} {page.hasContent ? "" : "• empty"}
                    </p>
                  </div>
                  <span className="ml-4 text-sm opacity-60 whitespace-nowrap">
                    {new Date(page._updatedAt).toLocaleDateString()}
                  </span>
                </Link>
                <DuplicatePageButton pageId={page._id} pageTitle={page.title || "Untitled"} />
              </div>
            </li>
          ))}
        </ul>
      )}

      <footer className="mt-10 text-sm opacity-60">
        New pages are created in{" "}
        <Link href="/studio/structure/landingPage" className="underline">
          Sanity Studio
        </Link>
        . Set a title and URL, publish the page once, then come back here to
        design the layout.
      </footer>
    </div>
  );
}
