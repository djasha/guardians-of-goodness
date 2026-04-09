import { NextRequest, NextResponse } from "next/server";
import { writeClient } from "@/sanity/client";
import { sendFormNotification } from "@/lib/email";
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

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formType, ...data } = body;

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

    await writeClient.create({
      _type: "formSubmission",
      formType,
      name: data.name || data.fullName,
      email: data.email,
      phone: data.phone,
      message: data.message || data.inquiry || data.description,
      extraFields: JSON.stringify(data),
      submittedAt: new Date().toISOString(),
      status: "new",
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
