import { createFileRoute, Link } from "@tanstack/react-router";
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type FormEvent,
} from "react";
import {
  CalendarClock,
  Sparkles,
  Star,
  GalleryHorizontalEnd,
  Tag,
  Users,
  Coins,
  Megaphone,
  LayoutDashboard,
  User,
  Phone,
  Globe,
  HelpCircle,
  MapPin,
  Sliders,
  Shield,
  Bell,
  LogOut,
  Plus,
} from "lucide-react";

import "./admin.css";
import { StatCard } from "./components/StatCard";
import { SidebarNav } from "./components/SidebarNav";
import { RecordTable } from "./components/RecordTable";
import { ModalDrawer } from "./components/ModalDrawer";

import { appointmentSlots } from "@/admin/data";
import {
  getAdminSessionStatus,
  loginAdmin,
  logoutAdmin,
} from "@/admin/api";
import {
  deleteAdminAdvertisement,
  deleteAdminAboutContent,
  deleteAdminBooking,
  deleteAdminContactSettings,
  deleteAdminGalleryItem,
  deleteAdminHeroContent,
  deleteAdminFaqSection,
  deleteAdminOffer,
  deleteAdminPricingPackage,
  deleteAdminSeoSettings,
  deleteAdminSocialLinks,
  deleteAdminServiceArea,
  deleteAdminService,
  deleteAdminTestimonial,
  listAdminAdvertisements,
  listAdminAboutContent,
  listAdminBookings,
  listAdminFaqSections,
  listAdminContactSettings,
  listAdminGalleryItems,
  listAdminHeroContent,
  listAdminOffers,
  listAdminPricingPackages,
  listAdminSeoSettings,
  listAdminSocialLinks,
  listAdminServiceAreas,
  listAdminServices,
  listAdminTestimonials,
  listAdminCustomerPreferences,
  type AdminAdvertisementRecord,
  type AdminAboutContentRecord,
  type AdminBookingRecord,
  type AdminFaqSectionRecord,
  type AdminContactSettingsRecord,
  type AdminGalleryRecord,
  type AdminHeroContentRecord,
  type AdminOfferRecord,
  type AdminPricingPackageRecord,
  type AdminSeoSettingsRecord,
  type AdminSocialLinksRecord,
  type AdminServiceAreaRecord,
  type AdminServiceRecord,
  type AdminTestimonialRecord,
  type AdminCustomerPreferenceRecord,
  updateAdminBooking,
  upsertAdminAdvertisement,
  upsertAdminAboutContent,
  upsertAdminFaqSection,
  upsertAdminContactSettings,
  upsertAdminHeroContent,
  upsertAdminSeoSettings,
  upsertAdminSocialLinks,
  upsertAdminServiceArea,
  upsertAdminGalleryItem,
  upsertAdminOffer,
  upsertAdminPricingPackage,
  upsertAdminService,
  upsertAdminTestimonial,
  uploadAdminAsset,
} from "@/admin/api";
import { getSiteConfig } from "@/lib/site-config";

const siteConfig = getSiteConfig();

type AdminSection =
  | "Bookings"
  | "Services"
  | "Gallery"
  | "Testimonials"
  | "Offers"
  | "Pricing Packages"
  | "Ads"
  | "Hero"
  | "About"
  | "Contact"
  | "Social"
  | "FAQ"
  | "Service Areas"
  | "SEO"
  | "Customers";

type AdminBookingView = {
  id: string;
  name: string;
  service: string;
  date: string;
  time: string;
  status: "Pending" | "Approved" | "Rejected" | "Rescheduled" | "Completed" | "Cancelled";
  phone: string;
  email?: string | null;
  notes?: string | null;
};

type DraftValue = string | number | boolean;
type DraftState = Record<string, DraftValue>;
type EditorMode = "view" | "create" | "edit";

type DashboardData = {
  bookings: AdminBookingView[];
  services: AdminServiceRecord[];
  gallery: AdminGalleryRecord[];
  testimonials: AdminTestimonialRecord[];
  offers: AdminOfferRecord[];
  pricingPackages: AdminPricingPackageRecord[];
  advertisements: AdminAdvertisementRecord[];
  heroContent: AdminHeroContentRecord[];
  aboutContent: AdminAboutContentRecord[];
  contactSettings: AdminContactSettingsRecord[];
  socialLinks: AdminSocialLinksRecord[];
  faqSections: AdminFaqSectionRecord[];
  serviceAreas: AdminServiceAreaRecord[];
  seoSettings: AdminSeoSettingsRecord[];
  customers: AdminCustomerPreferenceRecord[];
};

const sectionDataKeys: Record<AdminSection, keyof DashboardData> = {
  Bookings: "bookings",
  Services: "services",
  Gallery: "gallery",
  Testimonials: "testimonials",
  Offers: "offers",
  "Pricing Packages": "pricingPackages",
  Ads: "advertisements",
  Hero: "heroContent",
  About: "aboutContent",
  Contact: "contactSettings",
  Social: "socialLinks",
  FAQ: "faqSections",
  "Service Areas": "serviceAreas",
  SEO: "seoSettings",
  Customers: "customers",
};

interface FieldDef {
  key: string;
  label: string;
  kind: "text" | "number" | "textarea" | "select" | "file" | "checkbox" | "date";
  placeholder?: string;
  options?: Array<{ label: string; value: string }>;
}

interface SectionConfig {
  key: AdminSection;
  title: string;
  summary: string;
  canCreate: boolean;
  fields: FieldDef[];
}

const sectionConfigs: Record<AdminSection, SectionConfig> = {
  Bookings: {
    key: "Bookings",
    title: "Bookings",
    summary: "Approve, reschedule, or review client wedding makeup appointments.",
    canCreate: false,
    fields: [
      { key: "customer_name", label: "Customer Name", kind: "text" },
      { key: "phone", label: "Phone number", kind: "text" },
      { key: "email", label: "Email", kind: "text" },
      { key: "service_name", label: "Service Name", kind: "text" },
      { key: "booking_date", label: "Booking Date", kind: "date" },
      {
        key: "booking_time",
        label: "Time",
        kind: "select",
        options: appointmentSlots.map((slot) => ({ label: slot, value: slot })),
      },
      {
        key: "status",
        label: "Status",
        kind: "select",
        options: [
          { label: "Pending", value: "pending" },
          { label: "Approved", value: "approved" },
          { label: "Rejected", value: "rejected" },
          { label: "Rescheduled", value: "rescheduled" },
          { label: "Completed", value: "completed" },
        ],
      },
      { key: "notes", label: "Notes", kind: "textarea" },
    ],
  },
  Services: {
    key: "Services",
    title: "Services",
    summary: "Create, edit, hide, or delete any service entry.",
    canCreate: true,
    fields: [
      { key: "title", label: "Title", kind: "text" },
      {
        key: "category",
        label: "Category",
        kind: "select",
        options: [
          { label: "Bridal", value: "bridal" },
          { label: "Parlour", value: "parlour" },
          { label: "Academy", value: "academy" },
        ],
      },
      { key: "description", label: "Description", kind: "textarea" },
      { key: "price_label", label: "Price", kind: "text" },
      { key: "duration_label", label: "Duration", kind: "text" },
      { key: "image_url", label: "Image upload", kind: "file" },
      { key: "featured", label: "Featured", kind: "checkbox" },
      { key: "is_active", label: "Active", kind: "checkbox" },
    ],
  },
  Gallery: {
    key: "Gallery",
    title: "Gallery",
    summary: "Manage gallery assets and sort order.",
    canCreate: true,
    fields: [
      { key: "title", label: "Title", kind: "text" },
      {
        key: "category",
        label: "Category",
        kind: "select",
        options: [
          { label: "Bridal", value: "bridal" },
          { label: "Parlour", value: "parlour" },
          { label: "Before & After", value: "before_after" },
          { label: "Academy", value: "academy" },
        ],
      },
      { key: "image_url", label: "Image upload", kind: "file" },
      { key: "alt_text", label: "Alt text", kind: "text" },
      { key: "sort_order", label: "Sort order", kind: "number" },
      { key: "is_active", label: "Active", kind: "checkbox" },
    ],
  },
  Testimonials: {
    key: "Testimonials",
    title: "Testimonials",
    summary: "Publish or draft reviews and remove unwanted entries.",
    canCreate: true,
    fields: [
      { key: "customer_name", label: "Customer", kind: "text" },
      { key: "service_name", label: "Service", kind: "text" },
      { key: "rating", label: "Rating", kind: "number" },
      { key: "wedding_month_year", label: "Wedding Date (e.g. December 2025)", kind: "text" },
      { key: "review_text", label: "Review", kind: "textarea" },
      {
        key: "status",
        label: "Status",
        kind: "select",
        options: [
          { label: "Visible", value: "visible" },
          { label: "Draft", value: "draft" },
        ],
      },
    ],
  },
  Offers: {
    key: "Offers",
    title: "Offers",
    summary: "Adjust active campaigns, schedules, and expiry windows.",
    canCreate: true,
    fields: [
      { key: "title", label: "Title", kind: "text" },
      { key: "discount_label", label: "Discount", kind: "text" },
      { key: "description", label: "Description", kind: "textarea" },
      { key: "valid_from", label: "Starts", kind: "date" },
      { key: "valid_until", label: "Ends", kind: "date" },
      {
        key: "status",
        label: "Status",
        kind: "select",
        options: [
          { label: "Scheduled", value: "scheduled" },
          { label: "Active", value: "active" },
          { label: "Expired", value: "expired" },
        ],
      },
    ],
  },
  "Pricing Packages": {
    key: "Pricing Packages",
    title: "Pricing Packages",
    summary: "Edit bridal package names, prices, popularity flags, and included features.",
    canCreate: true,
    fields: [
      { key: "name", label: "Package name", kind: "text" },
      { key: "price", label: "Price", kind: "number" },
      { key: "popular", label: "Popular", kind: "checkbox" },
      {
        key: "features_text",
        label: "Features",
        kind: "textarea",
        placeholder: "One feature per line",
      },
      { key: "sort_order", label: "Sort order", kind: "number" },
      { key: "is_active", label: "Active", kind: "checkbox" },
    ],
  },
  Ads: {
    key: "Ads",
    title: "Ads",
    summary: "Manage posters and banners shown in promotions.",
    canCreate: true,
    fields: [
      { key: "title", label: "Title", kind: "text" },
      { key: "asset_url", label: "Poster upload", kind: "file" },
      {
        key: "asset_type",
        label: "Type",
        kind: "select",
        options: [
          { label: "Poster", value: "poster" },
          { label: "Banner", value: "banner" },
        ],
      },
      { key: "start_date", label: "Start date", kind: "date" },
      { key: "end_date", label: "End date", kind: "date" },
      {
        key: "status",
        label: "Status",
        kind: "select",
        options: [
          { label: "Active", value: "active" },
          { label: "Paused", value: "paused" },
          { label: "Archived", value: "archived" },
        ],
      },
    ],
  },
  Hero: {
    key: "Hero",
    title: "Hero",
    summary: "Edit the homepage hero heading, CTA buttons, and hero image.",
    canCreate: true,
    fields: [
      { key: "heading", label: "Heading", kind: "text" },
      { key: "subtitle", label: "Subtitle", kind: "textarea" },
      { key: "primary_cta_label", label: "Primary CTA", kind: "text" },
      { key: "primary_cta_url", label: "Primary URL", kind: "text" },
      { key: "secondary_cta_label", label: "Secondary CTA", kind: "text" },
      { key: "secondary_cta_url", label: "Secondary URL", kind: "text" },
      { key: "hero_image_url", label: "Hero image", kind: "file" },
      { key: "hero_image_alt", label: "Hero image alt", kind: "text" },
      { key: "is_active", label: "Active", kind: "checkbox" },
    ],
  },
  About: {
    key: "About",
    title: "About",
    summary: "Manage about-section text, highlights, and supporting images.",
    canCreate: true,
    fields: [
      { key: "headline", label: "Headline", kind: "text" },
      { key: "body", label: "Body", kind: "textarea" },
      {
        key: "bullet_points",
        label: "Bullet points",
        kind: "textarea",
        placeholder: "One point per line",
      },
      { key: "founder_name", label: "Founder name", kind: "text" },
      { key: "founder_title", label: "Founder title", kind: "text" },
      { key: "founder_image_url", label: "Founder image", kind: "file" },
      { key: "gallery_image_url", label: "Gallery image", kind: "file" },
      { key: "is_active", label: "Active", kind: "checkbox" },
    ],
  },
  Contact: {
    key: "Contact",
    title: "Contact",
    summary: "Update the public contact details, address, and working hours.",
    canCreate: true,
    fields: [
      { key: "phone", label: "Phone", kind: "text" },
      { key: "whatsapp", label: "WhatsApp", kind: "text" },
      { key: "email", label: "Email", kind: "text" },
      { key: "address", label: "Address", kind: "textarea" },
      { key: "map_url", label: "Map URL", kind: "text" },
      { key: "working_hours", label: "Working hours", kind: "text" },
      { key: "is_active", label: "Active", kind: "checkbox" },
    ],
  },
  Social: {
    key: "Social",
    title: "Social",
    summary: "Manage the social links displayed in the client footer and contact area.",
    canCreate: true,
    fields: [
      { key: "instagram", label: "Instagram", kind: "text" },
      { key: "facebook", label: "Facebook", kind: "text" },
      { key: "youtube", label: "YouTube", kind: "text" },
      { key: "whatsapp", label: "WhatsApp", kind: "text" },
      { key: "is_active", label: "Active", kind: "checkbox" },
    ],
  },
  FAQ: {
    key: "FAQ",
    title: "FAQ",
    summary: "Manage public FAQ sections and their question/answer entries.",
    canCreate: true,
    fields: [
      { key: "title", label: "Section title", kind: "text" },
      { key: "slug", label: "Section slug", kind: "text", placeholder: "booking" },
      { key: "description", label: "Description", kind: "textarea" },
      {
        key: "items_text",
        label: "Items",
        kind: "textarea",
        placeholder: "Question || Answer per line",
      },
      { key: "sort_order", label: "Sort order", kind: "number" },
      { key: "is_active", label: "Active", kind: "checkbox" },
    ],
  },
  "Service Areas": {
    key: "Service Areas",
    title: "Service Areas",
    summary: "Manage local coverage areas shown on the public site.",
    canCreate: true,
    fields: [
      { key: "name", label: "Area name", kind: "text" },
      { key: "summary", label: "Summary", kind: "textarea" },
      { key: "search_intent", label: "Search intent", kind: "textarea" },
      {
        key: "highlights_text",
        label: "Highlights",
        kind: "textarea",
        placeholder: "One highlight per line",
      },
      { key: "sort_order", label: "Sort order", kind: "number" },
      { key: "is_active", label: "Active", kind: "checkbox" },
    ],
  },
  SEO: {
    key: "SEO",
    title: "SEO",
    summary: "Control meta titles, descriptions, keywords, canonical URLs, and OG images.",
    canCreate: true,
    fields: [
      { key: "meta_title", label: "Meta title", kind: "text" },
      { key: "meta_description", label: "Meta description", kind: "textarea" },
      {
        key: "keywords",
        label: "Keywords",
        kind: "textarea",
        placeholder: "Comma-separated keywords",
      },
      { key: "canonical_url", label: "Canonical URL", kind: "text" },
      { key: "og_image_url", label: "OG image", kind: "file" },
      { key: "is_active", label: "Active", kind: "checkbox" },
    ],
  },
  Customers: {
    key: "Customers",
    title: "Customers",
    summary: "View customer profiles, preferences, and aggregate booking stats.",
    canCreate: false,
    fields: [],
  },
};

function emptyDraftFor(section: AdminSection): DraftState {
  switch (section) {
    case "Bookings":
      return {
        customer_name: "",
        phone: "",
        email: "",
        service_name: "",
        booking_date: "",
        booking_time: "",
        status: "pending",
        notes: "",
      };
    case "Services":
      return {
        title: "",
        category: "bridal",
        description: "",
        price_label: "",
        duration_label: "",
        image_url: "",
        featured: false,
        is_active: true,
      };
    case "Gallery":
      return {
        title: "",
        category: "bridal",
        image_url: "",
        alt_text: "",
        sort_order: 0,
        is_active: true,
      };
    case "Testimonials":
      return {
        customer_name: "",
        service_name: "",
        rating: 5,
        review_text: "",
        status: "visible",
        wedding_month_year: "",
      };
    case "Offers":
      return {
        title: "",
        discount_label: "",
        description: "",
        valid_from: "",
        valid_until: "",
        status: "active",
      };
    case "Pricing Packages":
      return {
        name: "",
        price: 0,
        popular: false,
        features_text: "",
        sort_order: 0,
        is_active: true,
      };
    case "Ads":
      return {
        title: "",
        asset_url: "",
        asset_type: "poster",
        start_date: "",
        end_date: "",
        status: "active",
      };
    case "Hero":
      return {
        heading: "",
        subtitle: "",
        primary_cta_label: "",
        primary_cta_url: "",
        secondary_cta_label: "",
        secondary_cta_url: "",
        hero_image_url: "",
        hero_image_alt: "",
        is_active: true,
      };
    case "About":
      return {
        headline: "",
        body: "",
        bullet_points: "",
        founder_name: "",
        founder_title: "",
        founder_image_url: "",
        gallery_image_url: "",
        is_active: true,
      };
    case "Contact":
      return {
        phone: "",
        whatsapp: "",
        email: "",
        address: "",
        map_url: "",
        working_hours: "",
        is_active: true,
      };
    case "Social":
      return {
        instagram: "",
        facebook: "",
        youtube: "",
        whatsapp: "",
        is_active: true,
      };
    case "FAQ":
      return {
        title: "",
        slug: "",
        description: "",
        items_text: "",
        sort_order: 0,
        is_active: true,
      };
    case "Service Areas":
      return {
        name: "",
        summary: "",
        search_intent: "",
        highlights_text: "",
        sort_order: 0,
        is_active: true,
      };
    case "SEO":
      return {
        meta_title: "",
        meta_description: "",
        keywords: "",
        canonical_url: "",
        og_image_url: "",
        is_active: true,
      };
    case "Customers":
      return {};
  }
}

function draftFromRecord(section: AdminSection, record: Record<string, unknown>): DraftState {
  switch (section) {
    case "Bookings":
      return {
        customer_name: String(record.name ?? ""),
        phone: String(record.phone ?? ""),
        email: String(record.email ?? ""),
        service_name: String(record.service ?? ""),
        booking_date: String(record.date ?? ""),
        booking_time: String(record.time ?? ""),
        status: String(record.status ?? "").toLowerCase(),
        notes: String(record.notes ?? ""),
      };
    case "Services":
      return {
        title: String(record.title ?? ""),
        category: String(record.category ?? "bridal"),
        description: String(record.description ?? ""),
        price_label: String(record.price_label ?? ""),
        duration_label: String(record.duration_label ?? ""),
        image_url: String(record.image_url ?? ""),
        featured: Boolean(record.featured),
        is_active: Boolean(record.is_active ?? true),
      };
    case "Gallery":
      return {
        title: String(record.title ?? ""),
        category: String(record.category ?? "bridal"),
        image_url: String(record.image_url ?? ""),
        alt_text: String(record.alt_text ?? ""),
        sort_order: Number(record.sort_order ?? 0),
        is_active: Boolean(record.is_active ?? true),
      };
    case "Testimonials":
      return {
        customer_name: String(record.customer_name ?? ""),
        service_name: String(record.service_name ?? ""),
        rating: Number(record.rating ?? 5),
        review_text: String(record.review_text ?? ""),
        status: String(record.status ?? "visible"),
        wedding_month_year: String(record.wedding_month_year ?? ""),
      };
    case "Offers":
      return {
        title: String(record.title ?? ""),
        discount_label: String(record.discount_label ?? ""),
        description: String(record.description ?? ""),
        valid_from: String(record.valid_from ?? ""),
        valid_until: String(record.valid_until ?? ""),
        status: String(record.status ?? "active"),
      };
    case "Pricing Packages":
      return {
        name: String(record.name ?? ""),
        price: Number(record.price ?? 0),
        popular: Boolean(record.popular),
        features_text: String(record.features_text ?? ""),
        sort_order: Number(record.sort_order ?? 0),
        is_active: Boolean(record.is_active ?? true),
      };
    case "Ads":
      return {
        title: String(record.title ?? ""),
        asset_url: String(record.asset_url ?? ""),
        asset_type: String(record.asset_type ?? "poster"),
        start_date: String(record.start_date ?? ""),
        end_date: String(record.end_date ?? ""),
        status: String(record.status ?? "active"),
      };
    case "Hero":
      return {
        heading: String(record.heading ?? ""),
        subtitle: String(record.subtitle ?? ""),
        primary_cta_label: String(record.primary_cta_label ?? ""),
        primary_cta_url: String(record.primary_cta_url ?? ""),
        secondary_cta_label: String(record.secondary_cta_label ?? ""),
        secondary_cta_url: String(record.secondary_cta_url ?? ""),
        hero_image_url: String(record.hero_image_url ?? ""),
        hero_image_alt: String(record.hero_image_alt ?? ""),
        is_active: Boolean(record.is_active ?? true),
      };
    case "About": {
      const points = Array.isArray(record.bullet_points)
        ? record.bullet_points.join("\n")
        : String(record.bullet_points ?? "");

      return {
        headline: String(record.headline ?? ""),
        body: String(record.body ?? ""),
        bullet_points: points,
        founder_name: String(record.founder_name ?? ""),
        founder_title: String(record.founder_title ?? ""),
        founder_image_url: String(record.founder_image_url ?? ""),
        gallery_image_url: String(record.gallery_image_url ?? ""),
        is_active: Boolean(record.is_active ?? true),
      };
    }
    case "Contact":
      return {
        phone: String(record.phone ?? ""),
        whatsapp: String(record.whatsapp ?? ""),
        email: String(record.email ?? ""),
        address: String(record.address ?? ""),
        map_url: String(record.map_url ?? ""),
        working_hours: String(record.working_hours ?? ""),
        is_active: Boolean(record.is_active ?? true),
      };
    case "Social":
      return {
        instagram: String(record.instagram ?? ""),
        facebook: String(record.facebook ?? ""),
        youtube: String(record.youtube ?? ""),
        whatsapp: String(record.whatsapp ?? ""),
        is_active: Boolean(record.is_active ?? true),
      };
    case "FAQ":
      return {
        title: String(record.title ?? ""),
        slug: String(record.slug ?? ""),
        description: String(record.description ?? ""),
        items_text: String(record.items_text ?? ""),
        sort_order: Number(record.sort_order ?? 0),
        is_active: Boolean(record.is_active ?? true),
      };
    case "Service Areas":
      return {
        name: String(record.name ?? ""),
        summary: String(record.summary ?? ""),
        search_intent: String(record.search_intent ?? ""),
        highlights_text: String(record.highlights_text ?? ""),
        sort_order: Number(record.sort_order ?? 0),
        is_active: Boolean(record.is_active ?? true),
      };
    case "SEO":
      return {
        meta_title: String(record.meta_title ?? ""),
        meta_description: String(record.meta_description ?? ""),
        keywords: String(record.keywords ?? ""),
        canonical_url: String(record.canonical_url ?? ""),
        og_image_url: String(record.og_image_url ?? ""),
        is_active: Boolean(record.is_active ?? true),
      };
    case "Customers":
      return {};
  }
}

function isDataUrl(value: unknown) {
  return typeof value === "string" && value.startsWith("data:");
}

async function persistMediaAsset(section: AdminSection, title: string, value: unknown) {
  if (!isDataUrl(value)) {
    return typeof value === "string" ? value : "";
  }

  const folder =
    section === "Ads"
      ? "advertisements"
      : section === "Gallery"
        ? "gallery"
        : section === "Hero" || section === "About" || section === "SEO"
          ? "site-content"
          : "services";
  const fileName = title || `${section.toLowerCase()}-asset`;
  const uploaded = await uploadAdminAsset({
    data: {
      bucket: "",
      folder,
      fileName,
      dataUrl: String(value),
    },
  });

  return uploaded.publicUrl;
}

async function safeLoadList<T>(loader: () => Promise<T[]>) {
  try {
    const data = await loader();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function loadDashboardData(): Promise<DashboardData> {
  const [
    bookings,
    services,
    gallery,
    testimonials,
    offers,
    pricingPackages,
    advertisements,
    heroContent,
    aboutContent,
    contactSettings,
    socialLinks,
    faqSections,
    serviceAreas,
    seoSettings,
    customers,
  ] = await Promise.all([
    safeLoadList(listAdminBookings),
    safeLoadList(listAdminServices),
    safeLoadList(listAdminGalleryItems),
    safeLoadList(listAdminTestimonials),
    safeLoadList(listAdminOffers),
    safeLoadList(listAdminPricingPackages),
    safeLoadList(listAdminAdvertisements),
    safeLoadList(listAdminHeroContent),
    safeLoadList(listAdminAboutContent),
    safeLoadList(listAdminContactSettings),
    safeLoadList(listAdminSocialLinks),
    safeLoadList(listAdminFaqSections),
    safeLoadList(listAdminServiceAreas),
    safeLoadList(listAdminSeoSettings),
    safeLoadList(listAdminCustomerPreferences),
  ]);

  return {
    bookings,
    services,
    gallery,
    testimonials,
    offers,
    pricingPackages,
    advertisements,
    heroContent,
    aboutContent,
    contactSettings,
    socialLinks,
    faqSections,
    serviceAreas,
    seoSettings,
    customers,
  };
}

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard - Elegance Makeover & Academy" },
      {
        name: "description",
        content:
          "Manage bookings, services, gallery content, testimonials and offers for Elegance Makeover & Academy.",
      },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [email, setEmail] = useState(siteConfig.adminEmail);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionError, setActionError] = useState("");
  const [activeSection, setActiveSection] = useState<AdminSection>("Bookings");
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    bookings: [],
    services: [],
    gallery: [],
    testimonials: [],
    offers: [],
    pricingPackages: [],
    advertisements: [],
    heroContent: [],
    aboutContent: [],
    contactSettings: [],
    socialLinks: [],
    faqSections: [],
    serviceAreas: [],
    seoSettings: [],
    customers: [],
  });
  const [selectedId, setSelectedId] = useState<string | number | null>(null);
  const [editorMode, setEditorMode] = useState<EditorMode>("view");
  const [draft, setDraft] = useState<DraftState>(emptyDraftFor("Bookings"));
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

  // Top Nav global search shared with local record search query
  const [searchQuery, setSearchQuery] = useState("");

  const showToast = (message: string, type: "success" | "error" = "success") => {
    setToast({ message, type });
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 3000);
    return () => clearTimeout(timer);
  }, [toast]);

  useEffect(() => {
    let cancelled = false;

    async function hydrateSession() {
      try {
        const session = await getAdminSessionStatus();
        if (!cancelled && session.authenticated) {
          setEmail(session.email ?? "");
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error(error);
      }
    }

    void hydrateSession();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const data = await loadDashboardData();
        if (!cancelled) {
          setDashboardData(data);
        }
      } catch (error) {
        console.error(error);
        if (!cancelled) {
          setActionError(
            error instanceof Error
              ? `Could not load admin data from Supabase: ${error.message}`
              : "Could not load admin data from Supabase.",
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  const activeItems = Array.isArray(dashboardData[sectionDataKeys[activeSection]])
    ? (dashboardData[sectionDataKeys[activeSection]] as Array<
        Record<string, unknown> & { id: string | number }
      >)
    : [];

  const selectedRecord = activeItems.find((item) => String(item.id) === String(selectedId));
  const initialDraft = useMemo(() => {
    if (editorMode === "create") {
      return emptyDraftFor(activeSection);
    }

    return selectedRecord
      ? draftFromRecord(activeSection, selectedRecord)
      : emptyDraftFor(activeSection);
  }, [activeSection, editorMode, selectedRecord]);
  const draftSignature = JSON.stringify(draft);
  const initialDraftSignature = JSON.stringify(initialDraft);
  const hasUnsavedChanges = editorMode !== "view" && draftSignature !== initialDraftSignature;

  useEffect(() => {
    if (!selectedRecord) {
      setDraft(emptyDraftFor(activeSection));
      return;
    }

    setDraft(draftFromRecord(activeSection, selectedRecord));
  }, [activeSection, selectedRecord]);

  useEffect(() => {
    setSelectedId(null);
    setEditorMode("view");
    setSearchQuery(""); // Clear search query on section transition
  }, [activeSection]);

  const closeEditor = useCallback(
    (force = false) => {
      if (!force && hasUnsavedChanges) {
        const shouldDiscard = window.confirm(
          "You have unsaved changes. Close the editor and discard them?",
        );
        if (!shouldDiscard) {
          return;
        }
      }

      setDraft(initialDraft);
      setEditorMode("view");
    },
    [hasUnsavedChanges, initialDraft],
  );

  useEffect(() => {
    if (editorMode === "view") {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeEditor();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [editorMode, activeSection, selectedRecord, closeEditor]);

  const liveStats = useMemo(() => [
    { label: "Total Bookings", value: String(dashboardData.bookings.length) },
    { label: "Customers", value: String(dashboardData.customers.length) },
    { label: "Active Offers", value: String(dashboardData.offers.filter((offer) => offer.status === "active").length) },
    { label: "Gallery Images", value: String(dashboardData.gallery.filter((item) => item.is_active).length) },
    { label: "Upcoming Appointments", value: String(dashboardData.bookings.filter((booking) => booking.status !== "Rejected").length) },
  ], [dashboardData]);

  const sectionCounts = useMemo(() => ({
    Bookings: dashboardData.bookings.length,
    Services: dashboardData.services.length,
    Gallery: dashboardData.gallery.length,
    Testimonials: dashboardData.testimonials.length,
    Offers: dashboardData.offers.length,
    Customers: dashboardData.customers.length,
    "Pricing Packages": dashboardData.pricingPackages.length,
    Ads: dashboardData.advertisements.length,
    Hero: dashboardData.heroContent.length,
    About: dashboardData.aboutContent.length,
    Contact: dashboardData.contactSettings.length,
    Social: dashboardData.socialLinks.length,
    FAQ: dashboardData.faqSections.length,
    "Service Areas": dashboardData.serviceAreas.length,
    SEO: dashboardData.seoSettings.length,
  }), [dashboardData]);

  async function handleUnlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setAuthError("");
    setLoading(true);
    try {
      const result = await loginAdmin({ data: { email, password } });
      if (result.authorized) {
        setPassword("");
        setAuthError("");
        setIsAuthenticated(true);
        return;
      }

      setAuthError("Unable to sign in. Please check your email and password.");
    } catch (error) {
      const message = error instanceof Error ? error.message : "";
      if (message.toLowerCase().includes("invalid login credentials")) {
        setAuthError(
          "Invalid email or password. Please try again.",
        );
        return;
      }
      setAuthError("Auth request failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string | number) {
    setActionError("");
    try {
      switch (activeSection) {
        case "Bookings":
          await deleteAdminBooking({ data: { bookingCode: String(id) } });
          break;
        case "Services":
          await deleteAdminService({ data: { id: Number(id) } });
          break;
        case "Gallery":
          await deleteAdminGalleryItem({ data: { id: Number(id) } });
          break;
        case "Testimonials":
          await deleteAdminTestimonial({ data: { id: Number(id) } });
          break;
        case "Offers":
          await deleteAdminOffer({ data: { id: Number(id) } });
          break;
        case "Pricing Packages":
          await deleteAdminPricingPackage({ data: { id: Number(id) } });
          break;
        case "Ads":
          await deleteAdminAdvertisement({ data: { id: Number(id) } });
          break;
        case "Hero":
          await deleteAdminHeroContent({ data: { id: Number(id) } });
          break;
        case "About":
          await deleteAdminAboutContent({ data: { id: Number(id) } });
          break;
        case "Contact":
          await deleteAdminContactSettings({ data: { id: Number(id) } });
          break;
        case "Social":
          await deleteAdminSocialLinks({ data: { id: Number(id) } });
          break;
        case "FAQ":
          await deleteAdminFaqSection({ data: { id: Number(id) } });
          break;
        case "Service Areas":
          await deleteAdminServiceArea({ data: { id: Number(id) } });
          break;
        case "SEO":
          await deleteAdminSeoSettings({ data: { id: Number(id) } });
          break;
      }

      if (String(selectedId) === String(id)) {
        setSelectedId(null);
        setEditorMode("view");
      }

      showToast("Successfully deleted record.");
      await refreshData();
    } catch (error) {
      console.error(error);
      setActionError("Delete failed. Please check the Supabase connection and try again.");
      showToast("Delete failed.", "error");
    }
  }

  async function handleBulkAction(action: "approve" | "reject" | "delete", ids: Array<string | number>) {
    setActionError("");
    try {
      if (action === "delete") {
        for (const id of ids) {
          switch (activeSection) {
            case "Bookings":
              await deleteAdminBooking({ data: { bookingCode: String(id) } });
              break;
            case "Services":
              await deleteAdminService({ data: { id: Number(id) } });
              break;
            case "Gallery":
              await deleteAdminGalleryItem({ data: { id: Number(id) } });
              break;
            case "Testimonials":
              await deleteAdminTestimonial({ data: { id: Number(id) } });
              break;
            case "Offers":
              await deleteAdminOffer({ data: { id: Number(id) } });
              break;
            case "Pricing Packages":
              await deleteAdminPricingPackage({ data: { id: Number(id) } });
              break;
            case "Ads":
              await deleteAdminAdvertisement({ data: { id: Number(id) } });
              break;
            case "Hero":
              await deleteAdminHeroContent({ data: { id: Number(id) } });
              break;
            case "About":
              await deleteAdminAboutContent({ data: { id: Number(id) } });
              break;
            case "Contact":
              await deleteAdminContactSettings({ data: { id: Number(id) } });
              break;
            case "Social":
              await deleteAdminSocialLinks({ data: { id: Number(id) } });
              break;
            case "FAQ":
              await deleteAdminFaqSection({ data: { id: Number(id) } });
              break;
            case "Service Areas":
              await deleteAdminServiceArea({ data: { id: Number(id) } });
              break;
            case "SEO":
              await deleteAdminSeoSettings({ data: { id: Number(id) } });
              break;
          }
        }
        showToast(`Successfully deleted ${ids.length} records.`);
      } else {
        for (const id of ids) {
          const record = activeItems.find((item) => String(item.id) === String(id));
          if (!record) continue;

          if (activeSection === "Bookings") {
            await updateAdminBooking({
              data: {
                bookingCode: String(id),
                status: action === "approve" ? "approved" : "rejected",
              },
            });
          } else if (activeSection === "Testimonials") {
            await upsertAdminTestimonial({
              data: {
                id: Number(id),
                customer_name: String(record.customer_name),
                service_name: String(record.service_name),
                rating: Number(record.rating),
                review_text: String(record.review_text),
                status: action === "approve" ? "visible" : "draft",
                wedding_month_year: record.wedding_month_year ? String(record.wedding_month_year) : undefined,
              },
            });
          } else if (activeSection === "Offers") {
            await upsertAdminOffer({
              data: {
                id: Number(id),
                title: String(record.title),
                discount_label: String(record.discount_label),
                description: String(record.description),
                valid_from: String(record.valid_from),
                valid_until: String(record.valid_until),
                status: action === "approve" ? "active" : "expired",
              },
            });
          } else if (activeSection === "Ads") {
            await upsertAdminAdvertisement({
              data: {
                id: Number(id),
                title: String(record.title),
                asset_url: String(record.asset_url),
                asset_type: String(record.asset_type) as "poster" | "banner",
                start_date: String(record.start_date),
                end_date: String(record.end_date),
                status: action === "approve" ? "active" : "paused",
              },
            });
          }
        }
        showToast(`Successfully updated ${ids.length} records.`);
      }
      await refreshData();
    } catch (e) {
      console.error(e);
      setActionError("Bulk action failed. Please check the Supabase connection and try again.");
      showToast("Bulk action failed.", "error");
    }
  }

  async function handleSave(event?: FormEvent<HTMLFormElement>) {
    if (event) event.preventDefault();
    setActionError("");

    try {
      let savedId: string | number | null = null;

      switch (activeSection) {
        case "Bookings": {
          if (!selectedRecord) {
            setActionError("Pick an existing booking before saving edits.");
            return;
          }

          const saved = await updateAdminBooking({
            data: {
              bookingCode: String(selectedRecord.id),
              customer_name: String(draft.customer_name ?? ""),
              phone: String(draft.phone ?? ""),
              email: String(draft.email ?? ""),
              service_name: String(draft.service_name ?? ""),
              booking_date: String(draft.booking_date ?? ""),
              booking_time: String(draft.booking_time ?? ""),
              status: String(draft.status ?? "pending") as
                | "pending"
                | "approved"
                | "rejected"
                | "rescheduled"
                | "completed",
              notes: String(draft.notes ?? ""),
            },
          });
          savedId = saved.id;
          break;
        }
        case "Services": {
          const imageUrl = await persistMediaAsset(
            activeSection,
            String(draft.title ?? "service"),
            draft.image_url,
          );
          const saved = await upsertAdminService({
            data: {
              id: selectedRecord ? Number(selectedRecord.id) : undefined,
              title: String(draft.title ?? ""),
              category: String(draft.category ?? "bridal") as "bridal" | "parlour" | "academy",
              description: String(draft.description ?? ""),
              price_label: String(draft.price_label ?? ""),
              duration_label: String(draft.duration_label ?? ""),
              image_url: imageUrl,
              featured: Boolean(draft.featured),
              is_active: Boolean(draft.is_active),
            },
          });
          savedId = saved.id;
          break;
        }
        case "Gallery": {
          const imageUrl = await persistMediaAsset(
            activeSection,
            String(draft.title ?? "gallery"),
            draft.image_url,
          );
          const saved = await upsertAdminGalleryItem({
            data: {
              id: selectedRecord ? Number(selectedRecord.id) : undefined,
              title: String(draft.title ?? ""),
              category: String(draft.category ?? "bridal") as
                | "bridal"
                | "parlour"
                | "before_after"
                | "academy",
              image_url: imageUrl,
              alt_text: String(draft.alt_text ?? ""),
              sort_order: Number(draft.sort_order ?? 0),
              is_active: Boolean(draft.is_active),
            },
          });
          savedId = saved.id;
          break;
        }
        case "Testimonials": {
          const saved = await upsertAdminTestimonial({
            data: {
              id: selectedRecord ? Number(selectedRecord.id) : undefined,
              customer_name: String(draft.customer_name ?? ""),
              service_name: String(draft.service_name ?? ""),
              rating: Number(draft.rating ?? 5),
              review_text: String(draft.review_text ?? ""),
              status: String(draft.status ?? "visible") as "visible" | "draft",
              wedding_month_year: draft.wedding_month_year ? String(draft.wedding_month_year) : undefined,
            },
          });
          savedId = saved.id;
          break;
        }
        case "Offers": {
          const saved = await upsertAdminOffer({
            data: {
              id: selectedRecord ? Number(selectedRecord.id) : undefined,
              title: String(draft.title ?? ""),
              discount_label: String(draft.discount_label ?? ""),
              description: String(draft.description ?? ""),
              valid_from: String(draft.valid_from ?? ""),
              valid_until: String(draft.valid_until ?? ""),
              status: String(draft.status ?? "active") as "scheduled" | "active" | "expired",
            },
          });
          savedId = saved.id;
          break;
        }
        case "Pricing Packages": {
          const saved = await upsertAdminPricingPackage({
            data: {
              id: selectedRecord ? Number(selectedRecord.id) : undefined,
              name: String(draft.name ?? ""),
              price: Number(draft.price ?? 0),
              popular: Boolean(draft.popular),
              features_text: String(draft.features_text ?? ""),
              sort_order: Number(draft.sort_order ?? 0),
              is_active: Boolean(draft.is_active),
            },
          });
          savedId = saved.id;
          break;
        }
        case "Ads": {
          const assetUrl = await persistMediaAsset(
            activeSection,
            String(draft.title ?? "advertisement"),
            draft.asset_url,
          );
          const saved = await upsertAdminAdvertisement({
            data: {
              id: selectedRecord ? Number(selectedRecord.id) : undefined,
              title: String(draft.title ?? ""),
              asset_url: assetUrl,
              asset_type: String(draft.asset_type ?? "poster") as "poster" | "banner",
              start_date: String(draft.start_date ?? ""),
              end_date: String(draft.end_date ?? ""),
              status: String(draft.status ?? "active") as "active" | "paused" | "archived",
            },
          });
          savedId = saved.id;
          break;
        }
        case "Hero": {
          const heroImageUrl = await persistMediaAsset(
            activeSection,
            String(draft.heading ?? "hero"),
            draft.hero_image_url,
          );
          const saved = await upsertAdminHeroContent({
            data: {
              id: selectedRecord ? Number(selectedRecord.id) : undefined,
              heading: String(draft.heading ?? ""),
              subtitle: String(draft.subtitle ?? ""),
              primary_cta_label: String(draft.primary_cta_label ?? ""),
              primary_cta_url: String(draft.primary_cta_url ?? ""),
              secondary_cta_label: String(draft.secondary_cta_label ?? ""),
              secondary_cta_url: String(draft.secondary_cta_url ?? ""),
              hero_image_url: heroImageUrl,
              hero_image_alt: String(draft.hero_image_alt ?? ""),
              is_active: Boolean(draft.is_active),
            },
          });
          savedId = saved.id;
          break;
        }
        case "About": {
          const founderImageUrl = await persistMediaAsset(
            activeSection,
            String(draft.founder_name ?? "founder"),
            draft.founder_image_url,
          );
          const galleryImageUrl = await persistMediaAsset(
            activeSection,
            String(draft.headline ?? "about-gallery"),
            draft.gallery_image_url,
          );
          const saved = await upsertAdminAboutContent({
            data: {
              id: selectedRecord ? Number(selectedRecord.id) : undefined,
              headline: String(draft.headline ?? ""),
              body: String(draft.body ?? ""),
              bullet_points: String(draft.bullet_points ?? ""),
              founder_name: String(draft.founder_name ?? ""),
              founder_title: String(draft.founder_title ?? ""),
              founder_image_url: founderImageUrl,
              gallery_image_url: galleryImageUrl,
              is_active: Boolean(draft.is_active),
            },
          });
          savedId = saved.id;
          break;
        }
        case "Contact": {
          const saved = await upsertAdminContactSettings({
            data: {
              id: selectedRecord ? Number(selectedRecord.id) : undefined,
              phone: String(draft.phone ?? ""),
              whatsapp: String(draft.whatsapp ?? ""),
              email: String(draft.email ?? ""),
              address: String(draft.address ?? ""),
              map_url: String(draft.map_url ?? ""),
              working_hours: String(draft.working_hours ?? ""),
              is_active: Boolean(draft.is_active),
            },
          });
          savedId = saved.id;
          break;
        }
        case "Social": {
          const saved = await upsertAdminSocialLinks({
            data: {
              id: selectedRecord ? Number(selectedRecord.id) : undefined,
              instagram: String(draft.instagram ?? ""),
              facebook: String(draft.facebook ?? ""),
              youtube: String(draft.youtube ?? ""),
              whatsapp: String(draft.whatsapp ?? ""),
              is_active: Boolean(draft.is_active),
            },
          });
          savedId = saved.id;
          break;
        }
        case "FAQ": {
          const saved = await upsertAdminFaqSection({
            data: {
              id: selectedRecord ? Number(selectedRecord.id) : undefined,
              title: String(draft.title ?? ""),
              slug: String(draft.slug ?? ""),
              description: String(draft.description ?? ""),
              items_text: String(draft.items_text ?? ""),
              sort_order: Number(draft.sort_order ?? 0),
              is_active: Boolean(draft.is_active),
            },
          });
          savedId = saved.id;
          break;
        }
        case "Service Areas": {
          const saved = await upsertAdminServiceArea({
            data: {
              id: selectedRecord ? Number(selectedRecord.id) : undefined,
              name: String(draft.name ?? ""),
              summary: String(draft.summary ?? ""),
              search_intent: String(draft.search_intent ?? ""),
              highlights_text: String(draft.highlights_text ?? ""),
              sort_order: Number(draft.sort_order ?? 0),
              is_active: Boolean(draft.is_active),
            },
          });
          savedId = saved.id;
          break;
        }
        case "SEO": {
          const ogImageUrl = await persistMediaAsset(
            activeSection,
            String(draft.meta_title ?? "seo"),
            draft.og_image_url,
          );
          const saved = await upsertAdminSeoSettings({
            data: {
              id: selectedRecord ? Number(selectedRecord.id) : undefined,
              meta_title: String(draft.meta_title ?? ""),
              meta_description: String(draft.meta_description ?? ""),
              keywords: String(draft.keywords ?? ""),
              canonical_url: String(draft.canonical_url ?? ""),
              og_image_url: ogImageUrl,
              is_active: Boolean(draft.is_active),
            },
          });
          savedId = saved.id;
          break;
        }
        case "Customers": {
          break;
        }
      }

      showToast("Successfully saved changes.");
      await refreshData();
      setSelectedId(savedId);
      if (savedId !== null) {
        setEditorMode("edit");
      } else {
        setEditorMode("view");
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error instanceof Error ? error.message : "Unknown save failure.";

      if (errorMessage.includes("Bucket not found")) {
        setActionError(
          "Upload failed because the configured Supabase storage bucket does not exist. Set SUPABASE_MEDIA_BUCKET in .env and create that public bucket in Supabase.",
        );
        showToast("Asset upload failed.", "error");
        return;
      }

      setActionError("Save failed. Please check the Supabase connection and try again.");
      showToast("Save operation failed.", "error");
    }
  }

  async function refreshData() {
    const data = await loadDashboardData();
    setDashboardData(data);
  }

  const startCreate = () => {
    setSelectedId(null);
    setEditorMode("create");
    setDraft(emptyDraftFor(activeSection));
  };

  const selectRecord = (id: string | number) => {
    setSelectedId(id);
    setEditorMode("edit");
  };

  const config = sectionConfigs[activeSection];

  const sidebarConfig = [
    {
      group: "Collections",
      items: [
        { key: "Bookings", label: "Bookings", icon: CalendarClock },
        { key: "Services", label: "Services", icon: Sparkles },
        { key: "Testimonials", label: "Testimonials", icon: Star },
        { key: "Gallery", label: "Gallery", icon: GalleryHorizontalEnd },
        { key: "Offers", label: "Offers", icon: Tag },
        { key: "Customers", label: "Customers", icon: Users },
        { key: "Pricing Packages", label: "Pricing Packages", icon: Coins },
        { key: "Ads", label: "Ads", icon: Megaphone },
      ],
    },
    {
      group: "Site Config",
      items: [
        { key: "Hero", label: "Hero Banner", icon: LayoutDashboard },
        { key: "About", label: "About Content", icon: User },
        { key: "Contact", label: "Contact Details", icon: Phone },
        { key: "Social", label: "Social Links", icon: Globe },
        { key: "FAQ", label: "FAQ Sections", icon: HelpCircle },
        { key: "Service Areas", label: "Service Areas", icon: MapPin },
        { key: "SEO", label: "SEO Settings", icon: Sliders },
      ],
    },
  ];

  return (
    <main className="relative min-h-screen bg-[#0d0a07] text-[#c5b399] flex flex-col font-body pb-16 select-none">
      {!isAuthenticated ? (
        <section className="px-5 py-24 flex items-center justify-center flex-1">
          <div className="mx-auto w-full max-w-xl rounded-3xl border border-border bg-[#161009] p-6 shadow-luxury md:p-10">
            <div className="flex items-center gap-3 text-[#c9a96e]">
              <Shield className="h-5 w-5" />
              <span className="text-xs uppercase tracking-[0.3em] font-semibold">Admin Login</span>
            </div>
            <h2 className="mt-4 font-display text-3xl text-[#f5e6d0]">
              Unlock the dashboard
            </h2>
            <p className="mt-2 text-sm text-[#c5b399]/85">
              Sign in with the email and password from your `.env` file.
            </p>

            <form onSubmit={handleUnlock} className="mt-8 space-y-4">
              <div>
                <label className="text-xs uppercase tracking-widest text-[#c5b399] font-semibold">
                  Email address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="username"
                  className="mt-1.5 w-full rounded-2xl border border-[#2a2015] bg-[#0d0a07] px-4 py-3 text-sm text-[#f5e6d0] outline-none transition-colors focus:border-[#c9a96e]"
                  placeholder="Enter admin email"
                />
              </div>
              <div>
                <label className="text-xs uppercase tracking-widest text-[#c5b399] font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  className="mt-1.5 w-full rounded-2xl border border-[#2a2015] bg-[#0d0a07] px-4 py-3 text-sm text-[#f5e6d0] outline-none transition-colors focus:border-[#c9a96e]"
                  placeholder="Enter password"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-luxe inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#c9a96e] px-6 py-3.5 font-semibold text-[#0d0a07] shadow-gold cursor-pointer"
              >
                <LayoutDashboard className="h-4 w-4" />
                {loading ? "Signing in..." : "Enter Dashboard"}
              </button>
            </form>

            {authError ? (
              <p className="mt-4 text-sm font-medium text-rose-500">{authError}</p>
            ) : null}
          </div>
        </section>
      ) : (
        <div className="flex flex-col flex-1">
          {/* TOP NAV BAR */}
          <header className="sticky top-0 z-40 bg-[#161009] border-b border-[#2a2015] h-[64px] flex items-center justify-between px-6">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-[#c9a96e]">
                ELEGANCE ADMIN
              </span>
            </div>

            {/* Global search */}
            <div className="relative hidden md:block w-[280px]">
              <SearchIcon className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#c5b399]/60" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Global search..."
                className="w-full pl-9 pr-4 py-1.5 bg-[#0d0a07] border border-[#2a2015] text-xs text-[#f5e6d0] rounded-full outline-none placeholder-[#c5b399]/50 transition-colors focus:border-[#c9a96e]"
              />
            </div>

            {/* Notification & Sign Out */}
            <div className="flex items-center gap-4">
              <button
                type="button"
                className="relative p-1.5 text-[#c5b399] hover:text-[#c9a96e] cursor-pointer"
              >
                <Bell className="h-4 w-4" />
                {dashboardData.bookings.filter((b) => b.status === "Pending").length > 0 && (
                  <span className="absolute top-1 right-1 h-1.5 w-1.5 bg-[#f59e0b] rounded-full" />
                )}
              </button>
              <button
                type="button"
                onClick={async () => {
                  try {
                    await logoutAdmin();
                  } finally {
                    setIsAuthenticated(false);
                  }
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#2a2015] bg-[#0d0a07] hover:border-[#c9a96e] text-xs font-semibold text-[#f5e6d0] rounded-full transition cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5 text-[#c9a96e]" />
                Sign Out
              </button>
            </div>
          </header>

          {/* STATS ROW */}
          <div className="px-6 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {liveStats.map((stat) => (
                <StatCard key={stat.label} label={stat.label} value={stat.value} />
              ))}
            </div>
          </div>

          {/* MAIN SPACE */}
          <div className="flex-1 flex flex-col lg:flex-row gap-6 p-6 min-h-[500px]">
            {/* LEFT SIDEBAR */}
            <aside className="w-full lg:w-[240px] shrink-0 bg-[#161009] border border-[#2a2015] rounded-2xl overflow-y-auto max-h-[calc(100vh-200px)]">
              <SidebarNav
                activeSection={activeSection}
                onSectionChange={setActiveSection}
                counts={sectionCounts}
                sectionsConfig={sidebarConfig}
              />
            </aside>

            {/* RIGHT WORKSPACE */}
            <div className="flex-1 bg-[#161009] border border-[#2a2015] rounded-2xl p-6 flex flex-col min-w-0">
              {/* Eyebrow info */}
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#c9a96e]/70 mb-1">
                {activeSection} Queue ({activeItems.length} records)
              </div>

              {/* Workspace Header */}
              <div className="flex items-center justify-between border-b border-[#2a2015] pb-4">
                <div className="flex items-baseline gap-3">
                  <h2 className="font-display text-2xl text-[#f5e6d0] font-semibold">
                    {config.title}
                  </h2>
                  <span className="text-xs text-[#c5b399]/60 font-semibold">
                    {activeItems.length} entries
                  </span>
                </div>
                {config.canCreate && (
                  <button
                    type="button"
                    onClick={startCreate}
                    className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#0d0a07] text-xs font-semibold text-[#c9a96e] rounded-full transition cursor-pointer"
                  >
                    <Plus className="h-4 w-4" />
                    New Record
                  </button>
                )}
              </div>

              {/* Error messages if any */}
              {actionError && (
                <p className="mt-4 rounded-xl bg-rose-500/10 p-3 text-xs text-rose-500 border border-rose-500/20">
                  {actionError}
                </p>
              )}

              {/* RECORD TABLE */}
              <RecordTable
                section={activeSection}
                items={activeItems}
                onEdit={selectRecord}
                onDelete={handleDelete}
                onBulkAction={handleBulkAction}
                config={config}
              />
            </div>
          </div>

          {/* EDITOR DRAWER */}
          <ModalDrawer
            isOpen={editorMode !== "view"}
            title={
              selectedRecord
                ? `Edit ${config.title.slice(0, -1)}`
                : `New ${config.title.slice(0, -1)}`
            }
            description={config.summary}
            onClose={() => closeEditor()}
            onSave={() => handleSave()}
            onReset={() => setDraft(initialDraft)}
            hasUnsavedChanges={hasUnsavedChanges}
          >
            <div className="space-y-4">
              {config.fields.map((field) => (
                <FieldControl
                  key={field.key}
                  field={field}
                  value={draft[field.key]}
                  onChange={(value) =>
                    setDraft((current) => ({ ...current, [field.key]: value }))
                  }
                />
              ))}
            </div>
          </ModalDrawer>
        </div>
      )}

      {/* TOAST FEEDBACK */}
      {toast && (
        <div className={`fixed top-4 right-4 z-[100] flex items-center gap-2.5 px-4 py-3 rounded-xl border shadow-luxury animate-toast ${
          toast.type === "error" 
            ? "bg-rose-500/10 border-rose-500/30 text-rose-500" 
            : "bg-[#1e1408] border-[#c9a96e]/30 text-[#f5e6d0]"
        }`}>
          <div className={`h-2 w-2 rounded-full ${toast.type === "error" ? "bg-rose-500" : "bg-[#c9a96e]"}`} />
          <span className="text-xs font-semibold">{toast.message}</span>
        </div>
      )}
    </main>
  );
}

// Inline search icon helper since we don't want to import Search again
function SearchIcon(props: any) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

import type { ChangeEvent } from "react";

function FieldControl({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: DraftValue | undefined;
  onChange: (value: DraftValue) => void;
}) {
  const baseInputClass =
    "mt-1.5 w-full rounded-2xl border border-[#2a2015] bg-[#0d0a07] text-[#f5e6d0] placeholder-[#c5b399]/50 px-4 py-3 text-sm outline-none transition focus:border-[#c9a96e] focus:ring-1 focus:ring-[#c9a96e]";

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      onChange(String(reader.result ?? ""));
    };
    reader.readAsDataURL(file);
  }

  const showPreview = typeof value === "string" && value.length > 0;

  if (field.kind === "textarea") {
    return (
      <div>
        <label className="text-xs uppercase tracking-widest text-[#c9a96e] font-semibold">{field.label}</label>
        <textarea
          rows={4}
          value={String(value ?? "")}
          onChange={(event) => onChange(event.target.value)}
          className={baseInputClass}
          placeholder={field.placeholder}
        />
      </div>
    );
  }

  if (field.kind === "file") {
    return (
      <div>
        <label className="text-xs uppercase tracking-widest text-[#c9a96e] font-semibold">{field.label}</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={`${baseInputClass} cursor-pointer px-3 py-2`}
        />
        {showPreview ? (
          <div className="mt-3 overflow-hidden rounded-2xl border border-[#2a2015] bg-[#0d0a07] shadow-sm">
            <img src={String(value)} alt={field.label} className="h-40 w-full object-cover" />
          </div>
        ) : (
          <p className="mt-2 text-xs text-[#c5b399]/65">
            Upload an image to replace the current asset.
          </p>
        )}
      </div>
    );
  }

  if (field.kind === "select") {
    return (
      <div>
        <label className="text-xs uppercase tracking-widest text-[#c9a96e] font-semibold">{field.label}</label>
        <select
          value={String(value ?? "")}
          onChange={(event) => onChange(event.target.value)}
          className={`${baseInputClass} appearance-none cursor-pointer`}
        >
          {field.options?.map((option) => (
            <option key={option.value} value={option.value} className="bg-[#161009] text-[#f5e6d0]">
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  if (field.kind === "checkbox") {
    return (
      <label className="flex items-center gap-3 rounded-2xl border border-[#2a2015] bg-[#0d0a07] px-4 py-3 shadow-sm cursor-pointer">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(event) => onChange(event.target.checked)}
          className="h-4 w-4 rounded border-[#2a2015] accent-[#c9a96e] cursor-pointer"
        />
        <span className="text-sm font-medium text-[#c5b399]">{field.label}</span>
      </label>
    );
  }

  return (
    <div>
      <label className="text-xs uppercase tracking-widest text-[#c9a96e] font-semibold">{field.label}</label>
      <input
        type={field.kind === "number" ? "number" : field.kind}
        value={value === undefined ? "" : String(value)}
        onChange={(event) =>
          onChange(field.kind === "number" ? Number(event.target.value) : event.target.value)
        }
        className={baseInputClass}
        placeholder={field.placeholder}
      />
    </div>
  );
}
