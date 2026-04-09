import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site Settings")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
      S.divider(),
      S.documentTypeListItem("cat").title("Cats"),
      S.documentTypeListItem("partner").title("Partners"),
      S.documentTypeListItem("article").title("Articles"),
      S.documentTypeListItem("instagramPost").title("Instagram Posts"),
      S.divider(),
      S.documentTypeListItem("formSubmission").title("Form Submissions"),
    ]);
