import { defineType, defineField } from "sanity";

export default defineType({
  name: "formSubmission",
  title: "Form Submission",
  type: "document",
  fields: [
    defineField({
      name: "formType",
      title: "Form Type",
      type: "string",
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
      readOnly: true,
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "phone",
      title: "Phone",
      type: "string",
      readOnly: true,
    }),
    defineField({
      name: "message",
      title: "Message",
      type: "text",
      readOnly: true,
    }),
    defineField({
      name: "extraFields",
      title: "Extra Fields (JSON)",
      type: "text",
      readOnly: true,
    }),
    defineField({
      name: "submittedAt",
      title: "Submitted At",
      type: "datetime",
      readOnly: true,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Read", value: "read" },
          { title: "Responded", value: "responded" },
        ],
      },
      initialValue: "new",
    }),
    defineField({
      name: "cat",
      title: "Related Cat",
      type: "reference",
      to: [{ type: "cat" }],
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "formType",
      date: "submittedAt",
    },
    prepare({ title, subtitle, date }) {
      const formattedDate = date
        ? new Date(date).toLocaleDateString("en-GB")
        : "";
      return {
        title: title ?? "Unknown",
        subtitle: `${subtitle ?? ""} — ${formattedDate}`,
      };
    },
  },
});
