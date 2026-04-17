import { cache } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Render } from "@puckeditor/core";
import { sanityFetch } from "@/sanity/lib/live";
import { puckConfig, type PuckData } from "@/puck/config";

const LANDING_PAGE_QUERY = `*[_type == "landingPage" && slug.current == $slug][0]{
  title,
  description,
  puckData
}`;

const getLandingPage = cache(async (slug: string) => {
  const { data } = await sanityFetch({
    query: LANDING_PAGE_QUERY,
    params: { slug },
    tags: [`landingPage:${slug}`],
  });
  return data;
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getLandingPage(slug);
  if (!data) return {};
  return {
    title: data.title,
    description: data.description || undefined,
  };
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getLandingPage(slug);

  if (!data) notFound();

  const puckData: PuckData | null = data.puckData
    ? safeParse(data.puckData)
    : null;

  if (!puckData) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <h1 className="font-display text-3xl font-bold mb-4">{data.title}</h1>
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
