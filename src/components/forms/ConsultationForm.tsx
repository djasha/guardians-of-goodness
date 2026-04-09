"use client";

import { useState } from "react";
import { consultationSchema } from "@/lib/validation";
import { FormField, Input, Textarea, RadioGroup } from "./FormField";
import { FormSuccess } from "./FormSuccess";

const youAreOptions = [
  { value: "pet-owner", label: "Pet owner" },
  { value: "animal-lover", label: "Animal lover" },
  { value: "rescuer", label: "Animal rescuer/activist" },
  { value: "other", label: "Other" },
];

export function ConsultationForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    youAre: "",
    city: "",
    inquiry: "",
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

    const result = consultationSchema.safeParse(formData);
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
        body: JSON.stringify({ formType: "consultation", ...result.data }),
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
      <FormSuccess message="We're here to help you help them!" />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Name" name="name" error={errors.name}>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Phone" name="phone" error={errors.phone}>
          <Input
            id="phone"
            placeholder="Your phone number"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            hasError={!!errors.phone}
          />
        </FormField>
        <FormField label="City" name="city" error={errors.city}>
          <Input
            id="city"
            placeholder="Your city"
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
            hasError={!!errors.city}
          />
        </FormField>
      </div>

      <FormField label="You Are" name="youAre" error={errors.youAre}>
        <RadioGroup
          name="youAre"
          options={youAreOptions}
          value={formData.youAre}
          onChange={(v) => handleChange("youAre", v)}
          hasError={!!errors.youAre}
        />
      </FormField>

      <FormField label="Your Inquiry" name="inquiry" error={errors.inquiry}>
        <Textarea
          id="inquiry"
          placeholder="Tell us how we can help..."
          value={formData.inquiry}
          onChange={(e) => handleChange("inquiry", e.target.value)}
          hasError={!!errors.inquiry}
        />
      </FormField>

      {errors.form && (
        <p className="text-red-500 text-sm text-center">{errors.form}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full neo-border-sm neo-shadow-sm bg-primary text-white font-bold py-3.5 px-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_#1a1a2e]"
      >
        {status === "submitting" ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
