import { notFound } from "next/navigation";
import { draftReadClient } from "@/sanity/writeClient";
import { getLandingPagePathById } from "@/sanity/lib/pageTree";
import { EditorClient } from "./EditorClient";

const EDITOR_QUERY = `*[
  _type == "landingPage" &&
  !(_id in path("drafts.**")) &&
  (_id == $identifier || slug.current == $identifier)
][0]{
  _id,
  title,
  "slug": slug.current,
  description,
  puckData,
  "draft": *[_id == "drafts." + ^._id][0]{ puckData }
}`;

export default async function EditorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug: rawIdentifier } = await params;
  const identifier = rawIdentifier.replace(/^drafts\./, "");
  const doc = await draftReadClient.fetch(EDITOR_QUERY, { identifier });
  if (!doc) notFound();

  const hasDraft = Boolean(doc.draft?.puckData);
  const sourceText = hasDraft ? doc.draft.puckData : doc.puckData;
  const initialData = sourceText ? safeParse(sourceText) : null;
  const publicPath = (await getLandingPagePathById(doc._id)) ?? `/${doc.slug}`;

  return (
    <EditorClient
      pageId={doc._id}
      publicPath={publicPath}
      title={doc.title}
      initialData={initialData}
      initialHasDraft={hasDraft}
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
