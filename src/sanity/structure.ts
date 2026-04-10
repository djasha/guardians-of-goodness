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
                .title("All Messages")
                .icon(() => "📋")
                .child(
                  S.documentTypeList("formSubmission")
                    .title("All Messages")
                    .filter('_type == "formSubmission" && status != "archived" && status != "spam"')
                    .defaultOrdering([
                      { field: "submittedAt", direction: "desc" },
                    ])
                ),
              S.divider(),
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
              S.listItem()
                .title("Join Us / Volunteers")
                .icon(() => "🤝")
                .child(
                  S.documentTypeList("formSubmission")
                    .title("Join Us Submissions")
                    .filter(
                      '_type == "formSubmission" && formType == "join-us"'
                    )
                    .defaultOrdering([
                      { field: "submittedAt", direction: "desc" },
                    ])
                ),
              S.listItem()
                .title("Consultations")
                .icon(() => "💬")
                .child(
                  S.documentTypeList("formSubmission")
                    .title("Consultation Requests")
                    .filter(
                      '_type == "formSubmission" && formType == "consultation"'
                    )
                    .defaultOrdering([
                      { field: "submittedAt", direction: "desc" },
                    ])
                ),
              S.divider(),
              S.listItem()
                .title("Archived")
                .icon(() => "📦")
                .child(
                  S.documentTypeList("formSubmission")
                    .title("Archived Messages")
                    .filter('_type == "formSubmission" && status == "archived"')
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
