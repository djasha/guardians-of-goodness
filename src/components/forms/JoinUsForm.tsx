"use client";

import { useState } from "react";
import { joinUsSchema } from "@/lib/validation";
import {
  FormField,
  Input,
  Textarea,
  Select,
  RadioGroup,
} from "./FormField";
import { FormSuccess } from "./FormSuccess";

const cooperationOptions = [
  { value: "become-member", label: "Become a member" },
  { value: "volunteer", label: "Volunteer with us" },
  { value: "support", label: "Support us" },
  { value: "other", label: "Other" },
];

const youAreOptions = [
  { value: "pet-owner", label: "Pet owner" },
  { value: "animal-lover", label: "Animal lover" },
  { value: "rescuer", label: "Animal rescuer/activist" },
  { value: "service-provider", label: "Animal service provider" },
  { value: "donor", label: "Donor/sponsor" },
  { value: "other", label: "Other" },
];

export function JoinUsForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    cooperationType: "",
    youAre: "",
    countryCity: "",
    description: "",
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

    const result = joinUsSchema.safeParse(formData);
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
        body: JSON.stringify({ formType: "join-us", ...result.data }),
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
      <FormSuccess message="Welcome aboard! We're thrilled to have you." />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <FormField label="Full Name" name="fullName" error={errors.fullName}>
          <Input
            id="fullName"
            placeholder="Your full name"
            value={formData.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
            hasError={!!errors.fullName}
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
            placeholder="00-country code-number"
            value={formData.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            hasError={!!errors.phone}
          />
        </FormField>
        <FormField
          label="Country & City"
          name="countryCity"
          error={errors.countryCity}
        >
          <Input
            id="countryCity"
            placeholder="Your country and city"
            value={formData.countryCity}
            onChange={(e) => handleChange("countryCity", e.target.value)}
            hasError={!!errors.countryCity}
          />
        </FormField>
      </div>

      <FormField
        label="Type of Cooperation"
        name="cooperationType"
        error={errors.cooperationType}
      >
        <Select
          id="cooperationType"
          options={cooperationOptions}
          placeholder="Select the type of cooperation"
          value={formData.cooperationType}
          onChange={(e) => handleChange("cooperationType", e.target.value)}
          hasError={!!errors.cooperationType}
        />
      </FormField>

      <FormField label="You Are" name="youAre" error={errors.youAre}>
        <RadioGroup
          name="youAre"
          options={youAreOptions}
          value={formData.youAre}
          onChange={(v) => handleChange("youAre", v)}
          hasError={!!errors.youAre}
        />
      </FormField>

      <FormField
        label="Description"
        name="description"
        error={errors.description}
      >
        <Textarea
          id="description"
          placeholder="Please describe with maximum details what exactly you can offer or expect from our cooperation"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          hasError={!!errors.description}
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
