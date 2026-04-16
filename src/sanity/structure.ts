import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Guardians of Goodness")
    .items([
      // --- Pages (editable content for each website page) ---
      S.listItem()
        .title("Pages")
        .icon(() => "📄")
        .child(
          S.list()
            .title("Edit Page Content")
            .items([
              S.listItem()
                .title("Homepage")
                .icon(() => "🏠")
                .child(
                  S.document()
                    .schemaType("homePage")
                    .documentId("homePage")
                    .title("Homepage")
                ),
              S.listItem()
                .title("About")
                .icon(() => "👥")
                .child(
                  S.document()
                    .schemaType("aboutPage")
                    .documentId("aboutPage")
                    .title("About Page")
                ),
              S.divider(),
              S.listItem()
                .title("TNR Project")
                .icon(() => "🏥")
                .child(
                  S.document()
                    .schemaType("projectPage")
                    .documentId("projectPage-tnr")
                    .title("TNR Project Page")
                ),
              S.listItem()
                .title("Home Shelter Project")
                .icon(() => "🏡")
                .child(
                  S.document()
                    .schemaType("projectPage")
                    .documentId("projectPage-hbs")
                    .title("Home Shelter Page")
                ),
              S.divider(),
              S.listItem()
                .title("Support")
                .icon(() => "💜")
                .child(
                  S.document()
                    .schemaType("supportPage")
                    .documentId("supportPage")
                    .title("Support Page")
                ),
              S.listItem()
                .title("Consultation")
                .icon(() => "💬")
                .child(
                  S.document()
                    .schemaType("consultationPage")
                    .documentId("consultationPage")
                    .title("Consultation Page")
                ),
              S.listItem()
                .title("Contact")
                .icon(() => "📧")
                .child(
                  S.document()
                    .schemaType("contactPage")
                    .documentId("contactPage")
                    .title("Contact Page")
                ),
            ])
        ),

      S.divider(),

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
                    .filter(
                      '_type == "formSubmission" && status != "archived" && status != "spam"'
                    )
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
                    .filter(
                      '_type == "formSubmission" && status == "archived"'
                    )
                    .defaultOrdering([
                      { field: "submittedAt", direction: "desc" },
                    ])
                ),
              S.listItem()
                .title("Spam")
                .icon(() => "🚫")
                .child(
                  S.documentTypeList("formSubmission")
                    .title("Spam")
                    .filter(
                      '_type == "formSubmission" && status == "spam"'
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
      S.documentTypeListItem("instagramPost")
        .title("Instagram Posts")
        .icon(() => "📸"),

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
