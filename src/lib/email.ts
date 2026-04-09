import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const RECIPIENT = "office@guardiansofgoodness.org";
const FROM = "Guardians of Goodness <noreply@guardiansofgoodness.org>";

type FormType = "join-us" | "consultation" | "adoption-inquiry" | "contact";

const subjectMap: Record<FormType, string> = {
  "join-us": "New Join Us Submission",
  consultation: "New Consultation Request",
  "adoption-inquiry": "New Adoption Inquiry",
  contact: "New Contact Form Submission",
};

function formatDataToHtml(data: Record<string, unknown>): string {
  const rows = Object.entries(data)
    .map(([key, value]) => {
      const label = key
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (s) => s.toUpperCase())
        .trim();
      return `
        <tr>
          <td style="padding: 8px 12px; border: 1px solid #e5e7eb; font-weight: 600; background: #f9fafb; white-space: nowrap;">
            ${label}
          </td>
          <td style="padding: 8px 12px; border: 1px solid #e5e7eb;">
            ${String(value ?? "")}
          </td>
        </tr>`;
    })
    .join("");

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #16a34a; color: white; padding: 20px 24px; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0; font-size: 20px;">Guardians of Goodness</h1>
      </div>
      <table style="width: 100%; border-collapse: collapse; margin-top: 0;">
        ${rows}
      </table>
      <p style="color: #6b7280; font-size: 12px; margin-top: 16px; padding: 0 12px;">
        This is an automated message from the Guardians of Goodness website.
      </p>
    </div>
  `;
}

export async function sendFormNotification(
  formType: FormType,
  data: Record<string, unknown>
) {
  const subject = subjectMap[formType];
  const html = formatDataToHtml(data);

  const { error } = await resend.emails.send({
    from: FROM,
    to: RECIPIENT,
    subject,
    html,
  });

  if (error) {
    console.error(`Failed to send ${formType} email:`, error);
    throw new Error(`Failed to send email: ${error.message}`);
  }

  return { success: true };
}
