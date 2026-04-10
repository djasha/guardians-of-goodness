import { z } from "zod";

export const joinUsSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full name must be at least 2 characters")
    .max(100, "Full name must be under 100 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email must be under 254 characters"),
  phone: z
    .string()
    .min(5, "Phone number must be at least 5 characters")
    .max(30, "Phone number must be under 30 characters"),
  cooperationType: z.enum(
    ["become-member", "volunteer", "support", "other"],
    { message: "Please select a cooperation type" }
  ),
  youAre: z.enum(
    ["pet-owner", "animal-lover", "rescuer", "service-provider", "donor", "other"],
    { message: "Please select who you are" }
  ),
  countryCity: z
    .string()
    .min(2, "Country/City must be at least 2 characters")
    .max(100, "Country/City must be under 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(2000, "Description must be under 2000 characters"),
});

export const consultationSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email must be under 254 characters"),
  phone: z
    .string()
    .min(5, "Phone number must be at least 5 characters")
    .max(30, "Phone number must be under 30 characters"),
  youAre: z.enum(
    ["pet-owner", "animal-lover", "rescuer", "other"],
    { message: "Please select who you are" }
  ),
  city: z
    .string()
    .min(2, "City must be at least 2 characters")
    .max(100, "City must be under 100 characters"),
  inquiry: z
    .string()
    .min(10, "Inquiry must be at least 10 characters")
    .max(2000, "Inquiry must be under 2000 characters"),
});

export const adoptionInquirySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be under 100 characters"),
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(254, "Email must be under 254 characters"),
  phone: z
    .string()
    .min(5, "Phone number must be at least 5 characters")
    .max(30, "Phone number must be under 30 characters"),
  catName: z
    .string()
    .min(1, "Please provide the cat's name")
    .max(100, "Cat name must be under 100 characters"),
  livingSituation: z
    .string()
    .min(5, "Please describe your living situation")
    .max(1000, "Living situation must be under 1000 characters"),
  petExperience: z.enum(["yes", "some", "no"], {
    message: "Please select your pet experience level",
  }),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must be under 2000 characters"),
});

export type JoinUsFormData = z.infer<typeof joinUsSchema>;
export type ConsultationFormData = z.infer<typeof consultationSchema>;
export type AdoptionInquiryFormData = z.infer<typeof adoptionInquirySchema>;
