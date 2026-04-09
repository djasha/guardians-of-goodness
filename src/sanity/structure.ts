import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Guardians of Goodness")
    .items([
      // --- Cats ---
      S.listItem()
        .title("Cats")
        .icon(() => "🐱")
        .child(
          S.list()
            .title("Cats")
            .items([
              S.listItem()
                .title("All Cats")
                .child(
                  S.documentTypeList("cat")
                    .title("All Cats")
                    .filter('_type == "cat"')
                ),
              S.listItem()
                .title("Available")
                .icon(() => "🟢")
                .child(
                  S.documentTypeList("cat")
                    .title("Available Cats")
                    .filter('_type == "cat" && adoptionStatus == "available"')
                ),
              S.listItem()
                .title("Pending")
                .icon(() => "🟡")
                .child(
                  S.documentTypeList("cat")
                    .title("Pending Cats")
                    .filter('_type == "cat" && adoptionStatus == "pending"')
                ),
              S.listItem()
                .title("Adopted")
                .icon(() => "🏠")
                .child(
                  S.documentTypeList("cat")
                    .title("Adopted Cats")
                    .filter('_type == "cat" && adoptionStatus == "adopted"')
                ),
            ])
        ),

      S.divider(),

      // --- Messages ---
      S.listItem()
        .title("Messages")
        .icon(() => "📬")
        .child(
          S.list()
            .title("Messages")
            .items([
              S.listItem()
                .title("All Messages")
                .child(
                  S.documentTypeList("formSubmission")
                    .title("All Messages")
                    .filter('_type == "formSubmission"')
                    .defaultOrdering([
                      { field: "submittedAt", direction: "desc" },
                    ])
                ),
              S.listItem()
                .title("New")
                .icon(() => "🔴")
                .child(
                  S.documentTypeList("formSubmission")
                    .title("New Messages")
                    .filter('_type == "formSubmission" && status == "new"')
                    .defaultOrdering([
                      { field: "submittedAt", direction: "desc" },
                    ])
                ),
              S.listItem()
                .title("Adoption Inquiries")
                .icon(() => "🐾")
                .child(
                  S.documentTypeList("formSubmission")
                    .title("Adoption Inquiries")
                    .filter(
                      '_type == "formSubmission" && formType == "adoption-inquiry"'
                    )
                    .defaultOrdering([
                      { field: "submittedAt", direction: "desc" },
                    ])
                ),
            ])
        ),

      S.divider(),

      // --- Content ---
      S.documentTypeListItem("article").title("Articles").icon(() => "📰"),
      S.documentTypeListItem("partner").title("Partners").icon(() => "🤝"),

      S.divider(),

      // --- Settings ---
      S.listItem()
        .title("Site Settings")
        .icon(() => "⚙️")
        .id("siteSettings")
        .child(
          S.document().schemaType("siteSettings").documentId("siteSettings")
        ),
    ]);
