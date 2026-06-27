import { z } from "zod";

export const bookingStatusSchema = z.enum([
  "pending",
  "approved",
  "rejected",
  "rescheduled",
  "completed",
]);

export const bookingSchema = z.object({
  bookingCode: z.string().min(1),
  customer_name: z.string().min(1),
  phone: z.string().min(1),
  email: z.string().optional().or(z.literal("")),
  service_name: z.string().min(1),
  booking_date: z.string().min(1),
  booking_time: z.string().min(1),
  status: bookingStatusSchema,
  notes: z.string().optional().or(z.literal("")),
});

export type BookingFormData = z.infer<typeof bookingSchema>;

export const serviceSchema = z.object({
  title: z.string().min(1),
  category: z.enum(["bridal", "parlour", "academy"]),
  description: z.string().min(1),
  price_label: z.string().min(1),
  duration_label: z.string().min(1),
  featured: z.boolean().default(false),
  image_url: z.string().optional().or(z.literal("")),
  is_active: z.boolean().default(true),
});

export type ServiceFormData = z.infer<typeof serviceSchema>;

export const gallerySchema = z.object({
  title: z.string().min(1),
  category: z.enum(["bridal", "parlour", "before_after", "academy"]),
  image_url: z.string().min(1),
  alt_text: z.string().min(1),
  sort_order: z.coerce.number().int().default(0),
  is_active: z.boolean().default(true),
});

export type GalleryFormData = z.infer<typeof gallerySchema>;

export const testimonialSchema = z.object({
  customer_name: z.string().min(1),
  service_name: z.string().min(1),
  rating: z.coerce.number().int().min(1).max(5),
  review_text: z.string().min(1),
  status: z.enum(["visible", "draft"]),
  wedding_month_year: z.string().optional().nullable(),
});

export type TestimonialFormData = z.infer<typeof testimonialSchema>;

export const offerSchema = z.object({
  title: z.string().min(1),
  discount_label: z.string().min(1),
  description: z.string().min(1),
  valid_from: z.string().min(1),
  valid_until: z.string().min(1),
  status: z.enum(["scheduled", "active", "expired"]),
});

export type OfferFormData = z.infer<typeof offerSchema>;

export const pricingPackageSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().int().min(0),
  popular: z.boolean().default(false),
  features_text: z.string().min(1),
  sort_order: z.coerce.number().int().default(0),
  is_active: z.boolean().default(true),
});

export type PricingPackageFormData = z.infer<typeof pricingPackageSchema>;

export const adSchema = z.object({
  title: z.string().min(1),
  asset_url: z.string().min(1),
  asset_type: z.enum(["poster", "banner"]),
  start_date: z.string().min(1),
  end_date: z.string().min(1),
  status: z.enum(["active", "paused", "archived"]),
});

export type AdFormData = z.infer<typeof adSchema>;

export const heroContentSchema = z.object({
  heading: z.string().min(1),
  subtitle: z.string().min(1),
  primary_cta_label: z.string().min(1),
  primary_cta_url: z.string().min(1),
  secondary_cta_label: z.string().min(1),
  secondary_cta_url: z.string().min(1),
  hero_image_url: z.string().optional().or(z.literal("")),
  hero_image_alt: z.string().optional().or(z.literal("")),
  is_active: z.boolean().default(true),
});

export type HeroContentFormData = z.infer<typeof heroContentSchema>;

export const aboutContentSchema = z.object({
  headline: z.string().min(1),
  body: z.string().min(1),
  bullet_points: z.string().optional(),
  founder_name: z.string().min(1),
  founder_title: z.string().min(1),
  founder_image_url: z.string().optional().or(z.literal("")),
  gallery_image_url: z.string().optional().or(z.literal("")),
  is_active: z.boolean().default(true),
});

export type AboutContentFormData = z.infer<typeof aboutContentSchema>;

export const contactSettingsSchema = z.object({
  phone: z.string().min(1),
  whatsapp: z.string().min(1),
  email: z.string().min(1),
  address: z.string().min(1),
  map_url: z.string().optional().or(z.literal("")),
  working_hours: z.string().min(1),
  is_active: z.boolean().default(true),
});

export type ContactSettingsFormData = z.infer<typeof contactSettingsSchema>;

export const socialLinksSchema = z.object({
  instagram: z.string().optional().or(z.literal("")),
  facebook: z.string().optional().or(z.literal("")),
  youtube: z.string().optional().or(z.literal("")),
  whatsapp: z.string().optional().or(z.literal("")),
  is_active: z.boolean().default(true),
});

export type SocialLinksFormData = z.infer<typeof socialLinksSchema>;

export const seoSettingsSchema = z.object({
  meta_title: z.string().min(1),
  meta_description: z.string().min(1),
  keywords: z.string().min(1),
  canonical_url: z.string().min(1),
  og_image_url: z.string().optional().or(z.literal("")),
  is_active: z.boolean().default(true),
});

export type SeoSettingsFormData = z.infer<typeof seoSettingsSchema>;

export const faqSectionSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  items_text: z.string().min(1),
  sort_order: z.coerce.number().int().default(0),
  is_active: z.boolean().default(true),
});

export type FaqSectionFormData = z.infer<typeof faqSectionSchema>;

export const serviceAreaSchema = z.object({
  name: z.string().min(1),
  summary: z.string().min(1),
  search_intent: z.string().min(1),
  highlights_text: z.string().min(1),
  sort_order: z.coerce.number().int().default(0),
  is_active: z.boolean().default(true),
});

export type ServiceAreaFormData = z.infer<typeof serviceAreaSchema>;
