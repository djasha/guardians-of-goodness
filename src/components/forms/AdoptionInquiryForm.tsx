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
  const [honeypot, setHoneypot] = useState("");
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
          website: honeypot,
          ...result.data,
        }),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const payload = await res.json().catch(() => null);
          const fieldErrors = payload?.error;
          if (fieldErrors && typeof fieldErrors === "object") {
            const next: Record<string, string> = {};
            for (const [key, msgs] of Object.entries(fieldErrors)) {
              if (Array.isArray(msgs) && msgs[0]) next[key] = String(msgs[0]);
            }
            if (Object.keys(next).length > 0) {
              setErrors(next);
              setStatus("idle");
              return;
            }
          }
        } else if (res.status === 429) {
          setErrors({
            form: "Too many submissions. Please try again in a little while.",
          });
          setStatus("idle");
          return;
        }
        throw new Error("Failed");
      }
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
      {/* Honeypot — hidden from humans and assistive tech */}
      <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
        <label htmlFor="website-url-adopt">Website (leave blank)</label>
        <input
          id="website-url-adopt"
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>
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
            name="name"
            autoComplete="name"
            placeholder="Your name"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
            hasError={!!errors.name}
          />
        </FormField>
        <FormField label="Email" name="email" error={errors.email}>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            spellCheck={false}
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
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
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
          name="livingSituation"
          placeholder="Describe your home (apartment/house, other pets, family members)…"
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
          name="message"
          placeholder="Tell us about yourself and why you'd like to adopt…"
          value={formData.message}
          onChange={(e) => handleChange("message", e.target.value)}
          hasError={!!errors.message}
        />
      </FormField>

      {errors.form && (
        <p className="text-red-500 text-sm text-center" role="alert">{errors.form}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full neo-border-sm neo-shadow-teal bg-secondary text-white font-bold py-3.5 px-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0_var(--color-dark)]"
      >
        {status === "submitting" ? "Sending…" : "Submit Adoption Inquiry"}
      </button>
    </form>
  );
}
