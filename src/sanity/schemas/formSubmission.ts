import { defineType, defineField } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

const statusEmoji: Record<string, string> = {
  new: "🔴",
  read: "🟡",
  responded: "🟢",
  archived: "📦",
  spam: "🚫",
};

const formTypeLabel: Record<string, string> = {
  "join-us": "Join Us",
  consultation: "Consultation",
  "adoption-inquiry": "Adoption",
};

export default defineType({
  name: "formSubmission",
  title: "Form Submission",
  type: "document",
  icon: EnvelopeIcon,
  groups: [
    { name: "submission", title: "Submission", default: true },
    { name: "admin", title: "Admin" },
  ],
  fields: [
    /* ── Submission data (read-only) ────────────── */
    defineField({
      name: "formType",
      title: "Form Type",
      type: "string",
      group: "submission",
      options: {
        list: [
          { title: "Join Us", value: "join-us" },
          { title: "Consultation", value: "consultation" },
          { title: "Adoption Inquiry", value: "adoption-inquiry" },
        ],
      },
      readOnly: true,
    }),
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "submission",
      readOnly: true,
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "submission",
      readOnly: true,
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      group: "submission",
      readOnly: true,
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      group: "submission",
      readOnly: true,
    }),
    defineField({
      name: "extraFields",
      title: "All Submitted Data",
      type: "text",
      group: "submission",
      description: "Full form data as JSON — includes fields like cooperation type, living situation, etc.",
      readOnly: true,
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      group: "submission",
      readOnly: true,
    }),
    defineField({
      name: "cat",
      title: "Related Cat",
      type: "reference",
      to: [{ type: "cat" }],
      group: "submission",
      description: "Auto-linked for adoption inquiries",
      readOnly: true,
    }),

    /* ── Admin fields (editable) ────────────── */
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: "admin",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Read", value: "read" },
          { title: "Responded", value: "responded" },
          { title: "Archived", value: "archived" },
          { title: "Spam", value: "spam" },
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "new",
    }),
    defineField({
      name: "adminNotes",
      title: "Internal Notes",
      type: "text",
      group: "admin",
      description: "Private notes for your team — not visible to the person who submitted the form.",
      rows: 4,
    }),
    defineField({
      name: "assignedTo",
      title: "Assigned To",
      type: "string",
      group: "admin",
      description: "Team member handling this submission",
    }),
  ],
  orderings: [
    {
      title: "Newest first",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
    {
      title: "Oldest first",
      name: "submittedAtAsc",
      by: [{ field: "submittedAt", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "name",
      formType: "formType",
      date: "submittedAt",
      status: "status",
      catName: "cat.name",
    },
    prepare({ title, formType, date, status, catName }) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString("en-GB")
        : "";
      const emoji = statusEmoji[status ?? "new"] ?? "";
      const type = formTypeLabel[formType ?? ""] ?? formType ?? "";
      const catInfo = catName ? ` — 🐱 ${catName}` : "";
      return {
        title: `${emoji} ${title ?? "Unknown"}`,
        subtitle: `${type} — ${formattedDate}${catInfo}`,
      };
    },
  },
});
