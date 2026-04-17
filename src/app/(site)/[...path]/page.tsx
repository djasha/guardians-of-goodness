import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Render } from "@puckeditor/core";
import { puckConfig, type PuckData } from "@/puck/config";
import { getLandingPageByPath } from "@/sanity/lib/pageTree";

type Params = { path: string[] };

function pathFromParams(segments: string[]): string {
  if (!segments || segments.length === 0) return "/";
  return "/" + segments.join("/");
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { path } = await params;
  const page = await getLandingPageByPath(pathFromParams(path));
  if (!page) return {};
  return {
    title: page.title,
    description: page.description || undefined,
    robots: page.noIndex ? { index: false, follow: false } : undefined,
  };
}

export default async function CatchAllPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { path } = await params;
  const resolved = pathFromParams(path);
  const page = await getLandingPageByPath(resolved);

  if (!page) notFound();

  const puckData: PuckData | null = page.puckData
    ? safeParse(page.puckData)
    : null;

  if (!puckData) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-bold mb-4">{page.title}</h1>
        <p className="opacity-70">
          This page hasn&rsquo;t been built yet. Open the Page Builder from
          Studio to add content.
        </p>
      </div>
    );
  }

  return <Render config={puckConfig} data={puckData} />;
}

function safeParse(text: string): PuckData | null {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
