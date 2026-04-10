import { NextRequest, NextResponse } from "next/server";
import { client } from "@/sanity/client";
import { writeClient } from "@/sanity/writeClient";
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

    // For adoption inquiries, try to link to the cat record
    let catRef: { _type: "reference"; _ref: string } | undefined;
    if (formType === "adoption-inquiry" && data.catName) {
      const cat = await client.fetch<{ _id: string } | null>(
        `*[_type == "cat" && name == $name][0]{ _id }`,
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
