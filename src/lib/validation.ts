import { z } from "zod";

export const joinUsSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(5, "Phone number must be at least 5 characters"),
  cooperationType: z.enum(
    ["volunteer", "partner", "sponsor", "other"],
    { message: "Please select a cooperation type" }
  ),
  youAre: z.enum(
    ["individual", "organization", "business", "student"],
    { message: "Please select who you are" }
  ),
  countryCity: z
    .string()
    .min(2, "Country/City must be at least 2 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters"),
});

export const consultationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(5, "Phone number must be at least 5 characters"),
  youAre: z.enum(
    ["individual", "organization", "business", "student"],
    { message: "Please select who you are" }
  ),
  city: z
    .string()
    .min(2, "City must be at least 2 characters"),
  inquiry: z
    .string()
    .min(10, "Inquiry must be at least 10 characters"),
});

export const adoptionInquirySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters"),
  email: z
    .string()
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(5, "Phone number must be at least 5 characters"),
  catName: z
    .string()
    .min(1, "Please provide the cat's name"),
  livingSituation: z
    .string()
    .min(5, "Please describe your living situation"),
  petExperience: z.enum(["yes", "some", "no"], {
    message: "Please select your pet experience level",
  }),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters"),
});

export type JoinUsFormData = z.infer<typeof joinUsSchema>;
export type ConsultationFormData = z.infer<typeof consultationSchema>;
export type AdoptionInquiryFormData = z.infer<typeof adoptionInquirySchema>;
