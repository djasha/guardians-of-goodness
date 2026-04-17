import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import { EditorClient } from "./EditorClient";

const LANDING_PAGE_QUERY = `*[_type == "landingPage" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  description,
  puckData
}`;

export default async function EditorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = await client.fetch(LANDING_PAGE_QUERY, { slug });
  if (!doc) notFound();

  const initialData = doc.puckData ? safeParse(doc.puckData) : null;

  return (
    <EditorClient
      slug={doc.slug}
      title={doc.title}
      initialData={initialData}
    />
  );
}

function safeParse(text: string) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}
