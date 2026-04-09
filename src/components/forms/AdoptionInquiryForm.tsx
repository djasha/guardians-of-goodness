"use client";

import { useState } from "react";
import { adoptionInquirySchema } from "@/lib/validation";
import { FormField, Input, Textarea, RadioGroup } from "./FormField";
import { FormSuccess } from "./FormSuccess";

const petExperienceOptions = [
  { value: "yes", label: "Yes, experienced" },
  { value: "some", label: "Some experience" },
  { value: "no", label: "First-time pet parent" },
];

interface AdoptionInquiryFormProps {
  catName?: string;
}

export function AdoptionInquiryForm({ catName }: AdoptionInquiryFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    catName: catName || "",
    livingSituation: "",
    petExperience: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = adoptionInquirySchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const [key, msgs] of Object.entries(
        result.error.flatten().fieldErrors
      )) {
        if (msgs?.[0]) fieldErrors[key] = msgs[0];
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "adoption-inquiry",
          ...result.data,
        }),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("success");
    } catch {
      setErrors({ form: "Something went wrong. Please try again." });
      setStatus("idle");
    }
  };

  if (status === "success") {
    return (
      <FormSuccess
        message={`Paw-some! We'll connect you with ${catName || "your future friend"} soon.`}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {catName && (
        <div className="rounded-xl bg-secondary/5 border border-secondary/20 p-4">
          <p className="text-sm text-secondary-dark font-semibold">
            Inquiring about: <span className="text-dark">{catName}</span>
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Your Name" name="name" error={errors.name}>
          <Input
            id="name"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            hasError={!!errors.name}
          />
        </FormField>
        <FormField label="Email" name="email" error={errors.email}>
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
            hasError={!!errors.email}
          />
        </FormField>
      </div>

      <FormField label="Phone" name="phone" error={errors.phone}>
        <Input
          id="phone"
          placeholder="Your phone number"
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          hasError={!!errors.phone}
        />
      </FormField>

      <FormField
        label="Living Situation"
        name="livingSituation"
        error={errors.livingSituation}
      >
        <Textarea
          id="livingSituation"
          placeholder="Describe your home (apartment/house, other pets, family members...)"
          value={formData.livingSituation}
          onChange={(e) => handleChange("livingSituation", e.target.value)}
          hasError={!!errors.livingSituation}
          rows={3}
        />
      </FormField>

      <FormField
        label="Experience with Pets"
        name="petExperience"
        error={errors.petExperience}
      >
        <RadioGroup
          name="petExperience"
          options={petExperienceOptions}
          value={formData.petExperience}
          onChange={(v) => handleChange("petExperience", v)}
          hasError={!!errors.petExperience}
        />
      </FormField>

      <FormField label="Message" name="message" error={errors.message}>
        <Textarea
          id="message"
          placeholder="Tell us about yourself and why you'd like to adopt..."
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          hasError={!!errors.message}
        />
      </FormField>

      {errors.form && (
        <p className="text-red-500 text-sm text-center">{errors.form}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full neo-border-sm neo-shadow-teal bg-secondary text-white font-bold py-3.5 px-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#4ecdc4]"
      >
        {status === "submitting" ? "Sending..." : "Submit Adoption Inquiry"}
      </button>
    </form>
  );
}
