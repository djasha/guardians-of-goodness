import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/client";
import { writeClient } from "@/sanity/writeClient";
import { sendFormNotification } from "@/lib/email";
import { checkRateLimit, getClientIp } from "@/lib/rateLimit";
import {
  joinUsSchema,
  consultationSchema,
  adoptionInquirySchema,
} from "@/lib/validation";

const schemas = {
  "join-us": joinUsSchema,
  consultation: consultationSchema,
  "adoption-inquiry": adoptionInquirySchema,
} as const;

/** Fake-success response for bot traffic so the attacker has no signal. */
const FAKE_SUCCESS = NextResponse.json({ success: true });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formType, website, ...data } = body;

    // ── 1. Honeypot — real users never fill the "website" field ──
    if (typeof website === "string" && website.trim() !== "") {
      // Don't tell the bot. Pretend it worked.
      return FAKE_SUCCESS;
    }

    // ── 2. Per-IP rate limit (best-effort in-memory) ──
    const ip = getClientIp(req.headers);
    const limit = checkRateLimit(`form:${ip}`);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: "Too many submissions. Please try again later." },
        {
          status: 429,
          headers: {
            "Retry-After": String(limit.retryAfterSeconds ?? 3600),
          },
        }
      );
    }

    // ── 3. Validate form type + payload ──
    const schema = schemas[formType as keyof typeof schemas];
    if (!schema) {
      return NextResponse.json({ error: "Invalid form type" }, { status: 400 });
    }

    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    // ── 4. Duplicate-submission guard (60s window) ──
    // Catches accidental double-clicks and simple bots reusing the same email.
    const sinceIso = new Date(Date.now() - 60_000).toISOString();
    const dupe = await client.fetch<{ _id: string } | null>(
      `*[_type == "formSubmission" && email == $email && formType == $formType && submittedAt > $since][0]{ _id }`,
      { email: parsed.data.email, formType, since: sinceIso }
    );
    if (dupe) {
      return FAKE_SUCCESS;
    }

    // ── 5. For adoption inquiries, try to link to the cat record ──
    let catRef: { _type: "reference"; _ref: string } | undefined;
    if (formType === "adoption-inquiry" && data.catName) {
      const cat = await client.fetch<{ _id: string } | null>(
        `*[_type == "cat" && lower(name) == lower($name)][0]{ _id }`,
        { name: data.catName }
      );
      if (cat) {
        catRef = { _type: "reference", _ref: cat._id };
      }
    }

    await writeClient.create({
      _type: "formSubmission",
      formType,
      name: data.name || data.fullName,
      email: data.email,
      phone: data.phone,
      message: data.message || data.inquiry || data.description,
      extraFields: JSON.stringify(parsed.data, null, 2),
      submittedAt: new Date().toISOString(),
      status: "new",
      ...(catRef && { cat: catRef }),
    });

    try {
      await sendFormNotification(formType, parsed.data);
    } catch (emailErr) {
      console.error("Email notification failed (form still saved):", emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Form submission error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
